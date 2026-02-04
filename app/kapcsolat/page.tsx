import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "KAPCSOLAT | TITOK",
    description: "Lépj kapcsolatba velünk.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050505] cursor-none-custom">
            <Header />
            <div className="pt-24">
                <ContactForm />
            </div>
            <Footer />
        </main>
    );
}
