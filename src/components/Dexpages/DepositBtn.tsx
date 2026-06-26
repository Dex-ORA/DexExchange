import { useState } from "react"
import DepositPopupForm from "./DepositForm"
import { TbReportMoney } from "react-icons/tb"

export const DepositBtn = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button className="bg-gradient-to-r from-[#D4A843] to-[#B8862D] text-black px-5 py-2 font-semibold rounded-full text-sm flex items-center gap-1 hover:opacity-90 transition-all shadow-lg shadow-[#D4A843]/20" onClick={() => setOpen(true)}>
                Deposit<TbReportMoney className="w-5 h-5" /></button>
            <DepositPopupForm depositPopup={open} setDepositPopup={setOpen} />
        </>
    )
}