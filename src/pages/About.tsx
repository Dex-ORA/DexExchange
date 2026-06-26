import { AboutIntro } from "../components/About/AboutIntro"
import { WhyBuiltABC } from "../components/About/WhyBuildABC"
import { StartEarning } from "../components/StartAbcDex"

export const AboutUs = () => {
    return (
        <section className="overflow-x-hidden">
            <AboutIntro />
            <WhyBuiltABC />
            <StartEarning title="Ready to explore Dexora?" content="Your capital. Your wallet. Your rules." btnText="Start Trading" className="pb-24 pt-12" />
        </section>
    )
}

