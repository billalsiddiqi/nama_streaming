interface InfoPanelProps {
  genres?: { id: number; name: string }[];
  originalLanguage?: string;
  status?: string;
  type?: string;
  spokenLanguages?: { name: string }[];
  productionCountries?: { name: string }[];
}

export default function InfoPanel({
  genres = [],
  originalLanguage,
  status,
  type,
  spokenLanguages = [],
  productionCountries = []
}: InfoPanelProps) {
  const valueStyle = "text-white font-bold tracking-wide";

  return (
    <section className="mt-8 mx-4 md:mx-8 bg-gray-900/50 p-4 rounded-xl shadow-md border border-white/10">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
        اطلاعات تکمیلی
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <span className="text-white font-medium">ژانرها:</span>{" "}
          <span className={valueStyle}>
            {genres.length > 0 ? genres.map((g) => g.name).join("، ") : "نامشخص"}
          </span>
        </div>
        <div>
          <span className="text-white font-medium">زبان اصلی:</span>{" "}
          <span className={valueStyle}>{originalLanguage?.toUpperCase() || "نامشخص"}</span>
        </div>
        {spokenLanguages.length > 0 && (
          <div>
            <span className="text-white font-medium">زبان‌های گفتگو:</span>{" "}
            <span className={valueStyle}>{spokenLanguages.map((l) => l.name).join("، ")}</span>
          </div>
        )}
        {productionCountries.length > 0 && (
          <div>
            <span className="text-white font-medium">کشور سازنده:</span>{" "}
            <span className={valueStyle}>{productionCountries.map((c) => c.name).join("، ")}</span>
          </div>
        )}
        {status && (
          <div>
            <span className="text-white font-medium">وضعیت:</span>{" "}
            <span className={valueStyle}>{status}</span>
          </div>
        )}
        {type && (
          <div>
            <span className="text-white font-medium">نوع:</span>{" "}
            <span className={valueStyle}>{type}</span>
          </div>
        )}
      </div>
    </section>
  );
}
