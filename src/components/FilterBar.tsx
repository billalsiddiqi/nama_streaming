interface FilterBarProps {
  search: string;
  onSearch: (value: string) => void;
  filters: {
    genre: string;
    year: string;
    country: string;
  };
  onFilterChange: (value: any) => void;
  type: "movie" | "tv";
}

const genreOptions = [
  { value: "", label: "ژانر" },
  { value: "28", label: "اکشن" },
  { value: "18", label: "درام" },
  { value: "35", label: "کمدی" },
  { value: "14", label: "فانتزی" },
  { value: "878", label: "علمی تخیلی" }
];

const countryOptions = [
  { value: "", label: "کشور" },
  { value: "en", label: "آمریکا" },
  { value: "fr", label: "فرانسه" },
  { value: "hi", label: "هند" },
  { value: "ja", label: "ژاپن" },
  { value: "fa", label: "ایران" }
];

const yearOptions = [
  { value: "", label: "سال" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "older", label: "قدیمی‌تر" }
];

export default function FilterBar({ search, onSearch, filters, onFilterChange, type }: FilterBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="جستجو..."
        className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="px-4 py-2 rounded-md bg-gray-900 text-white"
      >
        {genreOptions.map((g) => (
          <option key={g.value} value={g.value}>{g.label}</option>
        ))}
      </select>

      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        className="px-4 py-2 rounded-md bg-gray-900 text-white"
      >
        {yearOptions.map((y) => (
          <option key={y.value} value={y.value}>{y.label}</option>
        ))}
      </select>

      <select
        name="country"
        value={filters.country}
        onChange={handleChange}
        className="px-4 py-2 rounded-md bg-gray-900 text-white"
      >
        {countryOptions.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
    </div>
  );
}
