import { Suspense } from "react";
import Header from "@/components/Header";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-0">
      <div className="container mx-auto px-4 py-4">
        <Header />
      </div>

      <div className="container mx-auto mt-12 h-full">
        <Suspense fallback={<div className="text-center text-white mt-20">در حال بارگذاری نتایج...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
