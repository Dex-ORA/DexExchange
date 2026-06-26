import { motion } from "framer-motion";
import { Shield, Zap, Eye, Target } from "lucide-react";

export const AboutIntro = () => {
    return (
        <section
            className="relative pt-28 pb-16 overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,0.08) 0%, transparent 70%)',
            }}
        >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4A843]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="site-width relative z-10">
                {/* Hero Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative 2xl:py-32 py-20 px-8 md:px-16 rounded-2xl overflow-hidden border border-[#D4A843]/20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(212,168,67,0.06) 0%, rgba(15,15,20,0.95) 50%, rgba(212,168,67,0.04) 100%)',
                        boxShadow: '0 0 0 1px rgba(212,168,67,0.08), 0 20px 60px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Background image overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                        style={{ backgroundImage: "url('/images/about-bg.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f]/60 via-transparent to-[#0b0b0f]/80" />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-32 h-32 opacity-20" style={{ background: 'radial-gradient(circle at top left, #D4A843, transparent 70%)' }} />
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20" style={{ background: 'radial-gradient(circle at bottom right, #D4A843, transparent 70%)' }} />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5 mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
                            <span className="text-sm text-[#D4A843] font-medium">About Dexora</span>
                        </motion.div>

                        <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
                            The Future of Decentralized Trading is{" "}
                            <span className="bg-gradient-to-r from-[#D4A843] to-[#F0D070] bg-clip-text text-transparent">
                                Fast, Secure
                            </span>{" "}
                            and Non-Custodial.
                        </h1>
                        <p className="text-center max-w-3xl mx-auto mt-6 text-base md:text-lg text-gray-400 leading-relaxed">
                            Dexora is a next-generational decentralized exchange built for high-performance futures trading.
                            We focus on delivering CEX-level execution with the security and sovereignty of a DEX.
                            Our goal is to give traders a platform where speed, transparency, and self-custody work together
                            instead of working against each other.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Mission Section */}
            <OurMission />

            {/* Core Pillars */}
            <CorePillars />
        </section>
    );
};

const OurMission = () => {
    return (
        <section className="relative pt-20 lg:pt-28">
            <div className="site-width-sm">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-12 lg:gap-20 items-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm font-semibold text-[#D4A843] uppercase tracking-[0.15em] mb-3">Our Mission</p>
                        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white leading-tight">
                            Trade like a CEX.{" "}
                            <span className="bg-gradient-to-r from-[#D4A843] to-[#F0D070] bg-clip-text text-transparent">
                                Own like a DEX.
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-400 text-base leading-relaxed">
                            For years, traders have faced a difficult choice between CEX speed and DEX security.
                        </p>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="space-y-4 mb-6">
                            {[
                                "Choose a centralized exchange and surrender custody.",
                                "Choose a decentralized platform and sacrifice performance."
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <div className="w-2 h-2 rounded-full bg-[#D4A843] mt-2 flex-shrink-0" />
                                    <span className="text-gray-300 text-base">{text}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Dexora removes this compromise by providing instant execution, transparent pricing,
                            and complete control of your assets. Every action is verifiable on-chain, and your funds
                            remain in your wallet at all times until a trade is executed by smart contract.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const pillars = [
    { icon: Zap, title: "Lightning Fast", desc: "Near-instant execution powered by modern Layer-2 technology with deep liquidity and minimal fees." },
    { icon: Shield, title: "Self-Custody", desc: "Your keys, your crypto. Assets remain in your control until a trade is executed via smart contract." },
    { icon: Eye, title: "Transparent", desc: "Every trade, funding calculation, and risk parameter is recorded and verifiable on-chain in real time." },
    { icon: Target, title: "Built for Traders", desc: "Professional-grade interface with TradingView charts, advanced order types, and real-time margin data." },
];

const CorePillars = () => {
    return (
        <div className="site-width-sm pt-20 lg:pt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pillars.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        className="rounded-2xl border border-[#D4A843]/15 bg-white/[0.02] backdrop-blur-sm p-6 group relative overflow-hidden"
                        style={{ boxShadow: '0 0 0 1px rgba(212,168,67,0.06), 0 8px 32px rgba(0,0,0,0.35)' }}
                    >
                        <div
                            className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-15 transition-opacity"
                            style={{ background: 'radial-gradient(circle at top left, #D4A843, transparent 70%)' }}
                        />
                        <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center mb-4 group-hover:bg-[#D4A843]/20 transition-colors">
                            <p.icon className="w-5 h-5 text-[#D4A843]" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{p.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
