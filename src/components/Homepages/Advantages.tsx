import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Globe, Lock, Cpu } from "lucide-react";

const Advantages = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#2BC287]/10 blur-[120px]" />
                <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
            </div>

            <div className="site-width relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#2BC287]/30 bg-[#2BC287]/5 text-[#2BC287] text-sm font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(43,194,135,0.15)]"
                    >
                        Next-Gen Infrastructure
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
                    >
                        Engineered for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2BC287] to-cyan-400">Apex Trader</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Dominate the markets with our high-performance L1 architecture. Experience sub-millisecond execution, zero gas fees, and unified liquidity across all assets.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemAnim}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative group rounded-3xl p-[1px] overflow-hidden bg-gradient-to-b from-white/10 to-white/5 shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative h-full bg-[#141414]/90 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-8 border border-white/5 group-hover:border-white/10 transition-colors duration-500">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <item.icon className="text-white relative z-10" size={32} strokeWidth={1.5} />
                                </div>

                                <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Advantages;

const features = [
    {
        title: "Zero Gas Architecture",
        description: "Trade directly on our optimized application-specific chain. Never pay gas fees again while enjoying instant trade finality.",
        icon: Zap,
        color: "from-[#2BC287] to-teal-600",
    },
    {
        title: "Omnichain Liquidity",
        description: "Access seamless, unified liquidity across major ecosystems without fragmentation. Bridging happens instantly in the background.",
        icon: Globe,
        color: "from-purple-500 to-indigo-600",
    },
    {
        title: "Pro-Level Tooling",
        description: "Leverage advanced order types, real-time depth charts, trailing stops, and a fully robust REST/WebSocket API for algorithmic trading.",
        icon: Cpu,
        color: "from-cyan-400 to-blue-600",
    },
];

