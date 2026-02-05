
import { RootProvider } from '@/app/providers/RootProvider';
import { Navbar } from '@/layout/Navbar';
import { Hero } from '@/features/home/components/Hero';
import { About } from '@/features/about/components/About';
import { Skills } from '@/features/skills/components/Skills';
import { Projects } from '@/features/projects/components/Projects';
import { Experience } from '@/features/experience/components/Experience';
import { Contact } from '@/features/contact/components/Contact';
import { Footer } from '@/layout/Footer';

function App() {
    return (
        <RootProvider>
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
                <Navbar />
                <main className="flex flex-col gap-0">
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Contact />
                </main>
                <Footer />
            </div>
        </RootProvider>
    );
}

export default App;
