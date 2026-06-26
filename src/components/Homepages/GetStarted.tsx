import { UserPlus, Link2, Settings } from "lucide-react";

export const GetStarted = () => {
    const items = [
        { id: 1, icon: UserPlus, title: "Create", content: "Create Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor." },
        { id: 2, icon: Link2, title: "Connect", content: "Create Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor." },
        { id: 3, icon: Settings, title: "Manage", content: "Create Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor." },
    ]
    return (
        <section className="py-24 relative z-1">
            <div className="site-width-sm">
                <ul className="grid md:grid-cols-3 grid-cols-1 items-center justify-between gap-5">
                    {items.map((item) => {
                        return (
                            <li key={item.title}>
                                <div className="bg-[#1A1B23] px-6 py-6 rounded-xl text-center space-y-5">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#D4A843]/20 to-[#C8962A]/10 border border-[#D4A843]/30 flex items-center justify-center">
                                        <item.icon className="w-10 h-10 text-[#D4A843]" />
                                    </div>
                                    <h4 className="h3-tag ">{item.title}</h4>
                                    <p className="text-[#898CA9] text-[18px]">{item.content}</p>
                                    <button className="text-[#D4A843]">Get Started</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
