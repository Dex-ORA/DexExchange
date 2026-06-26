import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroScene = lazy(() => import("../three/HeroScene"));

export const Intro = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Three.js Background */}
            <Suspense fallback={null}>
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <HeroScene />
                </div>
            </Suspense>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0b0b0f] to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 site-width text-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5 mb-8 animate-glow-ring"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
                        <span className="text-sm text-[#D4A843] font-medium">Decentralized Trading Platform</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h1-tag font-bold mb-6 max-w-[910px] text-center mx-auto text-3d"
                    >
                        We make crypto{" "}
                        <span className="gradient-text-animated">clear and simple</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
                    >
                        A secure, ultra-fast, and transparent decentralized exchange
                        ecosystem. Trade, swap, and bridge with confidence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Link
                            to="/trade/BTC"
                            className="btn-3d inline-flex px-8 py-3.5 bg-gradient-to-r from-[#D4A843] to-[#B8862D] text-black text-[20px] rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#D4A843]/20"
                        >
                            Trade on Dexora
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
