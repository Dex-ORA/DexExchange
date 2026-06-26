import { motion } from "framer-motion";

export const WhyBuiltABC = () => {
    return (
        <section
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,168,67,0.05) 0%, transparent 70%)',
            }}
        >
            <div className="site-width-sm">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold text-[#D4A843] uppercase tracking-[0.15em] mb-3">Our Foundation</p>
                    <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-white">
                        Why We Built{" "}
                        <span className="bg-gradient-to-r from-[#D4A843] to-[#F0D070] bg-clip-text text-transparent">
                            Dexora
                        </span>
                        ?
                    </h3>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-5 relative">
                    {whyabc.map((item, i) => (
                        <motion.div
                            key={item.header}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4, transition: { duration: 0.25 } }}
                            className="rounded-2xl border border-[#D4A843]/10 p-8 group relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(212,168,67,0.03) 100%)',
                                boxShadow: '0 0 0 1px rgba(212,168,67,0.05), 0 8px 32px rgba(0,0,0,0.3)',
                            }}
                        >
                            {/* Corner glow on hover */}
                            <div
                                className="absolute top-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                                style={{ background: 'radial-gradient(circle at top left, #D4A843, transparent 70%)' }}
                            />

                            {/* Number badge */}
                            <div className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-[#D4A843]">0{i + 1}</span>
                            </div>

                            <h4 className="text-lg font-semibold text-white mb-3 pr-12">{item.header}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.content}</p>
                        </motion.div>
                    ))}

                    {/* Center accent */}
                    <div className="md:block hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D4A843]/30 border border-[#D4A843]/50" />
                </div>
            </div>

            {/* Road Ahead */}
            <RoadAhead />
        </section>
    );
};

const RoadAhead = () => {
    return (
        <div className="pt-20 lg:pt-28">
            <div className="site-width-sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <p className="text-sm font-semibold text-[#D4A843] uppercase tracking-[0.15em] mb-3">Vision</p>
                    <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-white mb-6">The Road Ahead</h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-4">
                        Dexora is continuously evolving. We are expanding market coverage, introducing new financial instruments,
                        improving liquidity routing, and preparing community-led governance.
                    </p>
                    <p className="text-gray-400 text-base leading-relaxed">
                        Our vision is to establish foundational infrastructure for the next generation of decentralized derivatives trading.
                        The future of on-chain finance should be fast, transparent, permissionless, and accessible to all.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const whyabc = [
    {
        header: "CEX-Grade Performance On-Chain",
        content: "Dexora uses modern Layer-2 technology to deliver near-instant execution, deep liquidity access, low fees, and consistent high-throughput settlement. This is on-chain trading designed to meet the demands of professional markets.",
    },
    {
        header: "True Self-Custody",
        content: "We firmly believe in 'Not your keys, not your crypto.' On Dexora, there are no deposits in a centralized wallet. You connect your wallet, and your assets remain in your control until the moment a trade is executed via smart contract. We never hold your funds.",
    },
    {
        header: "Radical Transparency",
        content: "Everything on Dexora is visible and verifiable. Trade execution, funding calculations, risk parameters, and insurance movements are recorded on-chain in real time. There are no hidden operations or opaque internal systems.",
    },
    {
        header: "Built for Traders, by Traders",
        content: "The interface includes TradingView charting, a clean order book, responsive controls, and advanced order types. Margin and liquidation information is visible and updated. The workflow supports both high-frequency scalping and long-term directional strategies.",
    },
];
