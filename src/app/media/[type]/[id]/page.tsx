import MediaDetailHeader from "@/components/MediaDetailsHeader";




export default async function MediaDetailsPage() {
  
  return (
    <div className="mb-20 md:mb-0 bg-black min-h-screen">
      <MediaDetailHeader />
      <div className="container mx-auto px-4">
        <h1 className="text-white text-2xl">Media Details</h1>
        <p className="text-gray-400">This is where the media details will be displayed.</p>
      </div>
    </div>
  );
}
