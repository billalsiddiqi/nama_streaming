import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import AvailableTabs from "@/components/home/AvailableTabs.lazy";
import SearchHeroSection from "@/components/home/SearchHeroSection";

export default async function Home() {

  return (
    <div className="pb-24 md:pb-0 transition-all duration-300">
      <section>
        <Header />
      </section>
      
      <section>
        <SearchHeroSection />
      </section>

      <section>
        <AvailableTabs />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
