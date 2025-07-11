import { notFound } from "next/navigation";
import HeroSection from "@/components/mediaDetails/MediaHeroSection";
import OverviewSection from "@/components/mediaDetails/OverviewSection";
import InfoPanel from "@/components/mediaDetails/InfoPanel";
import CastList from "@/components/mediaDetails/CastList";
import SuggestionGrid from "@/components/mediaDetails/SuggestionGrid";
import MediaDetailHeader from "@/components/MediaDetailsHeader";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  fetchMediaDetails,
  fetchMediaCredits,
  fetchMediaRecommendations,
  fetchMediaVideos,
  fetchTVSeasonMeta,
  fetchTVSeasonEpisodes
} from "@/lib/tmdb";

export default async function MediaDetailsPage(props: any) {
  const { type, id } = props.params;

  if (type !== "movie" && type !== "tv") return notFound();

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";

  const [resDetails, resCredits, resRecs, resVideos, resSeasons] = await Promise.all([
    fetchMediaDetails(type, id, apiKey, "fa-IR"),
    fetchMediaCredits(type, id, apiKey, "fa-IR"),
    fetchMediaRecommendations(type, id, apiKey, "fa-IR"),
    fetchMediaVideos(type, id, apiKey, "en-US"),
    type === "tv"
      ? fetchTVSeasonMeta(id, apiKey, "fa-IR")
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
      const res = await fetchTVSeasonEpisodes(id, season.season_number, apiKey, "fa-IR");
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
