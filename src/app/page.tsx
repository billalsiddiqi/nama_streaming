import Footer from "@/components/Footer";
import GenreList from "@/components/GenreList";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileBottomNav from "@/components/MobileBottomNav";


export default async function Home() {
  
  return (
    <div className="bg-dark-text pb-24 md:pb-0 min-h-screen transition-all duration-300">
      <div className="">
        <div className="container mx-auto px-4">
          <Header />
        </div>
        <div>
          <Hero />
        </div>
        
        <main className="">
        <GenreList />
        </main>

      </div>
        <Footer />
        <MobileBottomNav />
    </div>
  );
}
