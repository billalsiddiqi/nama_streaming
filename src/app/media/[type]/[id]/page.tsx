import { notFound } from "next/navigation";
import HeroSection from "@/components/MediaHeroSection";
import OverviewSection from "@/components/OverviewSection";
import InfoPanel from "@/components/InfoPanel";
import CastList from "@/components/CastList";
import SuggestionGrid from "@/components/SuggestionGrid";
import MediaDetailHeader from "@/components/MediaDetailsHeader";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default async function MediaDetailsPage(props: any) {
  const { type, id } = props.params;

  if (type !== "movie" && type !== "tv") return notFound();

  const [resDetails, resCredits, resRecs, resVideos, resSeasons] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      { cache: "no-store" }
    ),
    type === "tv"
      ? fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR&append_to_response=season/1`,
          { cache: "no-store" }
        )
      : Promise.resolve({ ok: true, json: async () => ({}) }),
  ]);

  if (!resDetails.ok) return notFound();

  const data = await resDetails.json();
  const credits = await resCredits.json();
  const recs = await resRecs.json();
  const videos = await resVideos.json();
  const seasonMeta = type === "tv" ? data.seasons || [] : [];

  let episodesBySeason: Record<number, any[]> = {};

  if (type === "tv") {
    for (const season of seasonMeta) {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fa-IR`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const seasonData = await res.json();
        episodesBySeason[season.season_number] = seasonData.episodes.map((ep: any) => ({
          id: ep.id,
          name: ep.name,
          episode_number: ep.episode_number,
          season_number: ep.season_number,
        }));
      }
    }
  }

  return (
    <div className="mb-20 md:mb-0 bg-black min-h-screen">
      <MediaDetailHeader />
      <main className="p-0 md:pb-10">
        <HeroSection
          type={type}
          backdrop={data.backdrop_path}
          poster={data.poster_path}
          title={data.title || data.name || "بدون عنوان"}
          rating={data.vote_average}
          releaseDate={data.release_date || data.first_air_date || ""}
          runtime={data.runtime || data.episode_run_time?.[0]}
          seasons={seasonMeta}
          episodesBySeason={episodesBySeason}
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
