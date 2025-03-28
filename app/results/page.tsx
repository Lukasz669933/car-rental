"use client";

import { Header } from "../components/header";
import { SearchResults } from "../components/search-results";

export default function SearchPage() {
  return (
    <div className="space-y-4">
      <div className="container mx-auto px-4 pt-4">
        <Header />
      </div>
      <SearchResults />
    </div>
  );
}
