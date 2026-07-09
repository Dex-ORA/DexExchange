import toast from "react-hot-toast";
import { getAssetIndex } from "./FetchAvailPairs";
import { ethers } from "ethers";
import { exchangeUrl, loadMsgpackFromCdn, toastinfo } from "../../../utils";

interface UpdateTradeModeParams {
    mode: 'cross' | 'isolated';
    wallets: any;
    market: any;
    leverage: any;
    setLoading: (v: boolean) => void;
}
export const updateTradeMode = async ({
    mode,
    wallets,
    market,
    leverage,
    setLoading
}: UpdateTradeModeParams) => {
    // console.log('Updating trade mode via Agent:', mode);
    const privyWallet = wallets.find((w: any) => w.walletClientType === 'privy');
    if (!privyWallet) {
        toast.error("Agent wallet not found.");
        throw new Error("No active Privy wallet instance.");
    }
    let toasted = false;
    try {
        setLoading(true);
        const eip1193Provider = await privyWallet.getEthereumProvider();
        // Ensure we have a valid asset index for the current market
        const assetIndex = await getAssetIndex(market || '');
        const nonce = Date.now();
        // 1. Build the Action
        const action = {
            type: "updateLeverage",
            asset: assetIndex,
            isCross: mode == "cross", // true for cross, false for isolated
            leverage: leverage // Default to 1x if not specified, or pass current leverage
        };
        // 2. Generate Connection ID (MsgPack + Nonce + Vault)
        const msgpackLib = await loadMsgpackFromCdn();
        const actionData = msgpackLib.encode(action);
        const nonceBytes = new Uint8Array(8);
        new DataView(nonceBytes.buffer).setBigUint64(0, BigInt(nonce), false);
        const combined = new Uint8Array([...actionData, ...nonceBytes, 0x00]);
        const connectionId = ethers.keccak256(combined);
        // 3. EIP-712 Signing Data (Standard Agent Format)
        const domain = {
            name: "Exchange",
            version: "1",
            chainId: 1337,
            verifyingContract: "0x0000000000000000000000000000000000000000",
        };
        const types = {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" }
            ],
            Agent: [
                { name: "source", type: "string" },
                { name: "connectionId", type: "bytes32" }
            ]
        };
        // 4. Request Headless Signature from Privy
        const signature = await eip1193Provider.request({
            method: 'eth_signTypedData_v4',
            params: [
                privyWallet.address,
                JSON.stringify({
                    domain,
                    types,
                    primaryType: "Agent",
                    message: { source: "a", connectionId }
                })
            ]
        });
        const sig = ethers.Signature.from(signature);
        // 5. Post to API
        const payload = {
            action,
            nonce,
            signature: { r: sig.r, s: sig.s, v: sig.v },
            vaultAddress: null
        };
        const response = await fetch(exchangeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        console.log('Margin mode API response:', JSON.stringify(result));
        if (result.status === "ok") {
            // Check if response is a string error (e.g. "Cannot switch leverage type with open position.")
            if (typeof result.response === "string") {
                toasted = true;
                toast.error(result.response);
                throw new Error(result.response);
            }
            const statuses = result.response?.data?.statuses;
            const errorStatus = statuses?.filter((status: any) => status.error);
            if (errorStatus && errorStatus.length > 0) {
                toasted = true;
                toast.error(`Failed: ${errorStatus[0].error}`);
                throw new Error(errorStatus[0].error);
            }
            toast.success(`Successfully switched to ${mode} margin!`);
            return result;
        } else {
            const errorMsg = typeof result.response === "string" ? result.response : "Mode update failed";
            toasted = true;
            toast.error(errorMsg);
            throw new Error(errorMsg);
        }
    } catch (error: any) {
        console.error('Failed to update trade mode:', error);
        if (!toasted) {
            toast.error(error.message || "Failed to update margin mode");
        }
    } finally {
        setLoading(false);
    }
};



