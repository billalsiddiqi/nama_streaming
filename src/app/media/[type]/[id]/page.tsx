import { notFound } from "next/navigation";
import { getCachedEmbedLinks } from "@/lib/embedLinks";
import MediaDetailHeader from "@/components/MediaDetailsHeader";

interface MediaPageParams {
  type: "movie" | "tv";
  id: string;
}

export default async function MediaDetailsPage({
  params,
}: {
  params: MediaPageParams;
}) {
  const { type, id } = params;

  // Validate route
  if (type !== "movie" && type !== "tv") return notFound();

  // ✅ Await the async function
  const embedLinks = await getCachedEmbedLinks();

  const isAvailable = embedLinks.some(
    (item: any) => item.tmdb_id === Number(id) && item.type === type
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <MediaDetailHeader />
      <h1 className="text-3xl font-bold mb-4">Media Detail Page</h1>
      <p>Type: {type}</p>
      <p>ID: {id}</p>
      <p>{isAvailable ? "✅ Available for streaming" : "⛔ Coming Soon"}</p>
    </div>
  );
}
