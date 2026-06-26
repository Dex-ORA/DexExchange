import { Copyright } from "lucide-react";
import { BiLogoTelegram } from "react-icons/bi";
import { BsDiscord, BsMedium, BsTwitterX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
    'Quick Links': [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
    ],
    'Dexora Ecosystem': [
        { label: 'Dexorbit', href: 'https://www.dexora.exchange/dashboard', external: true },
        { label: 'Dexora Exchange', href: '/trade/BTC' },
        { label: 'Dexora DEX', href: 'https://dex.dexora.live/', external: true },
        { label: 'Cross-Chain Bridge', href: 'https://dex.dexora.live/bridge', external: true },
    ],
    'Others': [
        { label: 'Staking', href: '/staking' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Terms', href: '/terms-and-conditions' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
};

export default function Footer() {
    const noFooter = ["perp", "spot", "trade"];
    const location = useLocation();
    const firstSegment = location.pathname.split("/")[1];
    const hideFooter = noFooter.includes(firstSegment);

    if (hideFooter) return null;

    return (
        <footer className="w-full relative bg-transparent border-t border-white/10">
            <div className="max-w-[1350px] mx-auto px-6 md:px-8 lg:px-24 2xl:px-0 py-12 sm:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="inline-block transition-transform hover:scale-105">
                            <img src="/images/Dexora.png" alt="Dexora" className="h-14 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The most trusted platform for trading, staking & crypto utilities.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: BsTwitterX, label: 'Twitter' },
                                { icon: BiLogoTelegram, label: 'Telegram' },
                                { icon: BsDiscord, label: 'Discord' },
                                { icon: BsMedium, label: 'Medium' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4A843] hover:border-[#D4A843]/50 transition-all"
                                >
                                    <s.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-400 hover:text-[#D4A843] transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.href}
                                                className="text-sm text-gray-400 hover:text-[#D4A843] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/10 my-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="flex gap-1 text-gray-500 text-sm">
                        <Copyright size={16} /> {new Date().getFullYear()} Dexora. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500">
                        Your Keys, Your Crypto.
                    </p>
                </div>
            </div>
        </footer>
    );
}
