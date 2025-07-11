interface OverviewSectionProps {
  overview: string;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <section className="mt-6 px-4 md:px-8">
      <h2 className="text-3xl font-semibold text-white mb-2 ">خلاصه داستان</h2>
      <p className="text-md max-w-2xl text-gray-300 leading-relaxed">
        {overview || "خلاصه‌ای برای این محتوا موجود نیست."}
      </p>
    </section>
  );
}
