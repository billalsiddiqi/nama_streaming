export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white/5 rounded-2xl p-2 backdrop-blur border border-white/10 shadow h-[260px]">
      <div className="w-full h-[180px] bg-white/10 rounded-lg mb-3" />
      <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
      <div className="h-3 w-1/2 bg-white/10 rounded" />
    </div>
  );
}
