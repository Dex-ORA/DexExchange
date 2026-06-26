import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface StartEarningProps {
    className?: string;
    title?: string;
    content?: string;
    btnText?: string;
}

export const StartEarning = ({
    className,
    title,
    content,
    btnText
}: StartEarningProps) => {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-bold leading-tight text-white">
                        {title}
                    </h3>
                    {content && (
                        <p className="text-gray-400 text-base md:text-lg mt-4">
                            {content}
                        </p>
                    )}
                    <Link to="/trade/BTC">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer mt-8 bg-gradient-to-r from-[#D4A843] to-[#B8862D] px-8 py-3.5
                                text-black font-semibold rounded-full text-lg
                                hover:opacity-90 transition-all shadow-lg shadow-[#D4A843]/20"
                        >
                            {btnText}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
