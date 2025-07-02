import HeroSection from "@/components/MediaHeroSection";
import OverviewSection from "@/components/OverviewSection";
import InfoPanel from "@/components/InfoPanel";
import CastList from "@/components/CastList";
import SuggestionGrid from "@/components/SuggestionGrid";
import { notFound } from "next/navigation";
import MediaDetailHeader from "@/components/MediaDetailsHeader";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

interface PageProps {
  params: {
    type: "movie" | "tv";
    id: string;
  };
}

export default async function MediaDetailsPage({ params }: PageProps) {
  const { type, id } = params;

  if (type !== "movie" && type !== "tv") return notFound();

  const [resDetails, resCredits, resRecs] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`, { cache: "no-store" })
  ]);

  if (!resDetails.ok) return notFound();

  const data = await resDetails.json();
  const credits = await resCredits.json();
  const recs = await resRecs.json();

  return (
    <div className="mb-20 md:mb-0 bg-black min-h-screen">
      <MediaDetailHeader />
      <main className="p-0 md:py-10">
        <HeroSection
          backdrop={data.backdrop_path || data.poster_path}
          title={data.title || data.name || "بدون عنوان"}
          rating={data.vote_average}
          releaseDate={data.release_date || data.first_air_date || ""}
          runtime={data.runtime || data.episode_run_time?.[0]}
        />

        <OverviewSection overview={data.overview} />

        <InfoPanel
          genres={data.genres}
          originalLanguage={data.original_language}
          status={data.status}
          type={data.type}
          spokenLanguages={data.spoken_languages}
          productionCountries={data.production_countries}
        />

        <CastList cast={credits.cast?.slice(0, 10) || []} />

        <SuggestionGrid items={(recs.results || []).slice(0, 6)} type={type} />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
