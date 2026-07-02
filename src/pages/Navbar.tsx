import { useEffect, useState } from "react";
import { Globe, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthAddress } from "../lib/hooks/useAuthAddress";
import { DepositBtn } from "../components/Dexpages/DepositBtn";
import { formatWalletAddress } from "../utils";

const navLinks = [
    { name: "Trade", path: "/trade/BTC", status: "live" },
   { name: "Portfolio", path: "/portfolio", status: "live" },
    { name: "DEX", path: "https://dex.dexora.live/", status: "live", external: true },
    // { name: "Bridge", path: "https://dex.dexora.live/bridge", status: "live", external: true },
 { name: "About", path: "/about", status: "live" },
    { name: "FAQ", path: "/faq", status: "live" },
    
];

const LANGUAGES = [
    { code: '', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh-CN', label: '中文' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'tr', label: 'Türkçe' },
];

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(() => {
        return localStorage.getItem('dexora-lang-label') || 'English';
    });
    const location = useLocation();
    const { address, login, handleLogout } = useAuthAddress();

    const isActive = (path: string) => location.pathname.startsWith(path);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close lang dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.lang-dropdown')) setLangOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const changeLanguage = (langCode: string, label: string) => {
        setSelectedLang(label);
        localStorage.setItem('dexora-lang-label', label);
        setLangOpen(false);

        if (langCode === '') {
            // Reset to English: clear cookies and reload
            localStorage.setItem('dexora-lang-label', 'English');
            const hostname = window.location.hostname;
            const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
            document.cookie = `googtrans=; ${expiry}; path=/;`;
            document.cookie = `googtrans=; ${expiry}; path=/; domain=${hostname};`;
            document.cookie = `googtrans=; ${expiry}; path=/; domain=.${hostname};`;
            window.location.reload();
            return;
        }

        // Set the googtrans cookie directly and reload for reliable translation
        const hostname = window.location.hostname;
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${hostname};`;
        window.location.reload();
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#0b0b0f]/90 backdrop-blur-xl border-b border-white/10'
                    : 'bg-transparent border-b border-transparent'
            }`}
            style={{
                boxShadow: scrolled
                    ? '0 4px 20px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)'
                    : 'none',
            }}
        >
            <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <img src="/images/Dexora.png" alt="Dexora" className="h-8 sm:h-14 w-auto notranslate" />
                        </motion.div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden xl:flex items-center gap-1 2xl:gap-3 flex-shrink min-w-0">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                whileHover={{ y: -2 }}
                            >
                                {link.external ? (
                                    <a
                                        href={link.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 2xl:px-4 py-1.5 text-sm text-white hover:text-[#D4A843] transition-colors whitespace-nowrap notranslate"
                                    >
                                     <b>   {link.name}</b>
                                    </a>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`px-3 2xl:px-4 py-1.5 text-sm hover:text-[#D4A843] transition-colors whitespace-nowrap notranslate ${
                                            isActive(link.path) ? "text-[#D4A843]" : "text-white"
                                        }`}
                                    >
                                     <b>   {link.name}</b>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-w-0">
                        {/* Deposit & Wallet */}
                        {address ? (
                            <>
                                <DepositBtn />
                                <button
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-[#D4A843] to-[#B8862D] text-black p-2 sm:px-5 sm:py-2 font-semibold rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 hover:opacity-90 transition-all shadow-lg shadow-[#D4A843]/20"
                                >
                                    <span className="hidden sm:inline truncate">{formatWalletAddress(address)}</span>
                                    <LogOut className="w-4 h-4 shrink-0" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={login}
                                className="bg-gradient-to-r from-[#D4A843] to-[#B8862D] text-black px-3 sm:px-5 py-1.5 sm:py-2 font-semibold rounded-full text-xs sm:text-sm hover:opacity-90 transition-all shadow-lg shadow-[#D4A843]/20 whitespace-nowrap"
                            >
                                Connect Wallet
                            </button>
                        )}

                        {/* Language Selector */}
                        <div className="relative hidden lg:block notranslate lang-dropdown" translate="no">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200"
                                style={{
                                    background: 'rgba(212, 168, 67, 0.1)',
                                    borderColor: langOpen ? 'rgba(212, 168, 67, 0.5)' : 'rgba(212, 168, 67, 0.25)',
                                    color: '#F0D070',
                                }}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold max-w-[60px] truncate">{selectedLang}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {langOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-44 rounded-xl border overflow-hidden z-[9999] shadow-2xl"
                                    style={{
                                        background: '#111117',
                                        borderColor: 'rgba(212, 168, 67, 0.25)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 168, 67, 0.1)',
                                    }}
                                >
                                    <div className="max-h-[300px] overflow-y-auto py-1 custom-scroll">
                                        {LANGUAGES.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code, lang.label)}
                                                className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between"
                                                style={{
                                                    color: selectedLang === lang.label ? '#F0D070' : '#9CA3AF',
                                                    background: selectedLang === lang.label ? 'rgba(212, 168, 67, 0.1)' : 'transparent',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(212, 168, 67, 0.15)';
                                                    e.currentTarget.style.color = '#F0D070';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = selectedLang === lang.label ? 'rgba(212, 168, 67, 0.1)' : 'transparent';
                                                    e.currentTarget.style.color = selectedLang === lang.label ? '#F0D070' : '#9CA3AF';
                                                }}
                                            >
                                                <span className="font-medium">{lang.label}</span>
                                                {selectedLang === lang.label && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="xl:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="xl:hidden border-t border-white/10 bg-[#0b0b0f]/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {link.external ? (
                                        <a
                                            href={link.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block py-2 text-sm text-gray-400 hover:text-[#D4A843] transition-colors notranslate"
                                            onClick={() => setOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className={`block py-2 text-sm hover:text-[#D4A843] transition-colors notranslate ${
                                                isActive(link.path) ? "text-[#D4A843] font-semibold" : "text-gray-400"
                                            }`}
                                            onClick={() => setOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}

                            {/* Mobile Social */}
                            <div className="pt-3 border-t border-white/10 space-y-3">
                                <div className="flex items-center gap-4 text-lg text-white">
                                    <FaTwitter className="cursor-pointer hover:text-[#D4A843]" />
                                    <FaTelegram className="cursor-pointer hover:text-[#D4A843]" />
                                    <FaDiscord className="cursor-pointer hover:text-[#D4A843]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
