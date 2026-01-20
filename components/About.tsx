import RGBSplitText from "./effects/RGBSplitText";
import GlitchText from "./effects/GlitchText";

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-[#0b0b0b] border-y border-white/5 relative z-10">
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-heading text-white mb-8">
                    <GlitchText text="A VISSZATÉRÉS" />
                </h2>

                <div className="text-lg md:text-xl text-muted leading-relaxed mb-10 space-y-6">
                    <p>
                        Hosszú szünet után a <RGBSplitText text="TITOK" /> visszatér.
                        Amit eddig láttál, csak a bevezetés volt.
                    </p>
                    <p>
                        A <RGBSplitText text="negyedik évad" /> az eddigi legnagyobb szabású vállalkozásunk.
                        Új karakterek, mélyebb történet, és egy olyan világ, ami sokkal sötétebb,
                        mint bármi, amit eddig készítettünk.
                    </p>
                    <p className="italic opacity-60">
                        "<RGBSplitText text="Ez már nem az a Szefi, akit én ismerek..." autoTrigger={false} />"
                    </p>
                </div>
            </div>
        </section>
    );
}
