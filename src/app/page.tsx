import Footer from "@/components/Footer";
import GenreList from "@/components/GenreList";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";


export default async function Home() {
  
  return (
    <div className="bg-gray-950 pb-24 md:pb-0 min-h-screen transition-all duration-300">
      <div className="">
        <div className="container mx-auto px-4 py-4">
          <Header />
        </div>
        {/* <div>
          <Hero />
        </div> */}
        
        <main className="">
        <GenreList />
        </main>

      </div>
        <Footer />
        <MobileBottomNav />
    </div>
  );
}
