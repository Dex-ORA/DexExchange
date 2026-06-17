import axios from 'axios';
import type { MetaMaskProvider } from '../DepositForm';
import { createWalletClient, custom } from 'viem';
import { arbitrum } from 'viem/chains';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { baseUrl, infoUrl, MAX_FEE_RATE, middlemanAddress, toastinfo } from '../../../utils';
export const handleApprove = async () => {

    const provider = new ethers.BrowserProvider(window.ethereum as MetaMaskProvider);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    if (!window.ethereum || !userAddress) {
        // console.log('Please connect your wallet.');
        return false;
    }
    try {
        const response = await axios.post(infoUrl, { "type": "maxBuilderFee", "user": userAddress, "builder": middlemanAddress });
        // console.log('Builder fee:', response.data);
        if (response.data < MAX_FEE_RATE) {
            // console.log(`Requesting approval for a max fee of ${MAX_FEE_RATE / 100}%...`);
            const { ExchangeClient, HttpTransport } = await import('@nktkas/hyperliquid');
            // 1. Create a proper viem wallet client
            const walletClient = createWalletClient({
                account: userAddress as `0x${string}`,
                chain: arbitrum,
                transport: custom(window.ethereum as MetaMaskProvider),
            });
            // 2. Create Hyperliquid client with the wallet client
            const client = new ExchangeClient({
                transport: new HttpTransport({
                    apiUrl: baseUrl
                }),
                wallet: walletClient
            });
            const approvalAction = { type: 'ApproveBuilderFee', builder: middlemanAddress, maxFeeRate: (MAX_FEE_RATE / 100) + "%" };
            const response = await client.approveBuilderFee(approvalAction);
            if (response && response.response) {
                // console.log('✅ Success! Tx Hash: ', response.response);
                return true;
            } else {
                toast.error('Approval failed: ' + response);
                // console.log(`Approval failed: ${response || 'Check console.'}`);
                return false;
            }
        } else {
            return true;
        }
    } catch (error) {
        toastinfo(`Error: ${error}`);
        console.error('Error getting Builder fee :', error);
        return false;
    }
};

export const getUserAgents = async (address: string, agentAddress: string) => {
    try {
        const response = await axios.post(infoUrl, { type: 'extraAgents', user: address });
        const data = response.data.filter((item: any) => item.address.toLowerCase() === agentAddress.toLowerCase());
        // console.log(data);
        return data;
    } catch (err) {
        if (err instanceof Error)
            console.error('Error fetching user trades:', err.message);
        throw err;
    }
};

/**
 * Checks if HIP-3 DEX abstraction is enabled for the given user address.
 * If it is enabled, silently disables it so the account behaves as a normal account.
 * Should be called once after a successful wallet connection.
 */
export const checkAndEnableDexAbstraction = async (
    userAddress: string,
    eip1193Provider: any,
): Promise<void> => {
    if (!userAddress || !eip1193Provider) return;

    // 1. Query current state
    const infoResponse = await axios.post(infoUrl, {
        type: 'userDexAbstraction',
        user: userAddress,
    });

    const isAbstractionEnabled: boolean | null = infoResponse.data;
    console.log('DEX abstraction state:', isAbstractionEnabled, 'for:', userAddress);

    // Already in Manual mode — nothing to do
    if (isAbstractionEnabled === true) return;

    // 2. It's Unified — switch to Manual (DEX abstraction ON)
    const { ExchangeClient, HttpTransport } = await import('@nktkas/hyperliquid');

    const walletClient = createWalletClient({
        account: userAddress as `0x${string}`,
        transport: custom(eip1193Provider),
    });

    const client = new ExchangeClient({
        transport: new HttpTransport({ apiUrl: baseUrl }),
        wallet: walletClient,
    });

    // ✅ enabled: true  →  switches account to Manual mode
    await client.userDexAbstraction({ user: userAddress as `0x${string}`, enabled: true });

    console.log('DEX abstraction (Manual mode) successfully enabled for:', userAddress);
};