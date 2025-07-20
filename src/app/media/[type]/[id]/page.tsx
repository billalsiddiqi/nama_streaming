// app/media/[type]/[id]/page.tsx
import { notFound } from "next/navigation";
import MediaDetailHeader from "@/components/MediaDetailsHeader";




export default async function MediaDetailsPage({ params }: { params: { type: string, id: string } }) {
  const { type, id } = params;

  if (type !== "movie" && type !== "tv") return notFound();

  
  return (
    <div className="mb-20 md:mb-0 bg-black min-h-screen">
      <MediaDetailHeader />
    </div>
  );
}
