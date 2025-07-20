"use client";

import dynamic from "next/dynamic";

const AvailableTabs = dynamic(() => import("./AvailableTabs"), {
  ssr: false,
  loading: () => (
    <div className="text-white text-center py-8">در حال بارگذاری بخش محتوا...</div>
  ),
});

export default AvailableTabs;
