import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import ResultsSection from "../components/ResultsSection";
import ExploreMore from "../components/ExploreMore";
import FilterPanel from "../components/FilterPanel";
import RecentSearches from "../components/RecentSearches";

export default function Discover() {
  const [filters, setFilters] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 SAFE PARSE FUNCTION (prevents crashes)
  const safeParse = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  // 🔥 LOAD PROFILE
  useEffect(() => {
    const parsed = safeParse("userProfile");

    if (!parsed) {
      if (window.location.pathname !== "/quiz") {
        setTimeout(() => navigate("/quiz"), 500);
      }
      return;
    }

    setProfile(parsed);

    setFilters({
      query: "",
      categories: [],
      ambiance: [],
      price: Array.isArray(parsed?.budget) ? parsed.budget : [],
      location: {},
    });
  }, []);

  // 🔥 SCROLL TO RESULTS
  useEffect(() => {
    if (filters && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [filters]);

  // 🔥 SAFE + CLEAN SAVE SEARCH (DEDUP + LIMIT 5)
  const saveSearch = (newFilters) => {
    if (!newFilters || typeof newFilters !== "object") return;

    const existing = safeParse("recentSearches") || [];

    const cleaned = existing.filter(
      (s) => s && typeof s === "object"
    );

    const updated = [
      newFilters,
      ...cleaned.filter(
        (s) => JSON.stringify(s) !== JSON.stringify(newFilters)
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  return (
    <div>
      {/* 🔍 HERO */}
      <Hero
        onSearch={(newFilters) => {
          setFilters(newFilters);
          saveSearch(newFilters);
        }}
        onOpenFilters={() => setShowFilters(true)}
      />

      {/* 📊 RESULTS */}
      {filters && (
        <div ref={resultsRef}>
          <ResultsSection filters={filters} />
        </div>
      )}

      {/* 🎛 FILTER PANEL */}
      {showFilters && (
        <FilterPanel
          onClose={() => setShowFilters(false)}
          onApply={(newFilters) => {
            const merged = {
              ...filters,
              ...newFilters,
            };

            setFilters(merged);
            saveSearch(merged);
          }}
        />
      )}

      {/* 🕘 RECENT SEARCHES */}
      <div className="bg-cream px-6 pb-16 space-y-16">
        <div className="max-w-6xl mx-auto mb-10">
          <h3 className="text-xl font-heading mb-4">
            Your Recent Searches
          </h3>
          <div className="w-[70px] h-[3px] bg-[#c9a44c] mt-2"></div>

          <RecentSearches
            onSearch={(search) => {
              if (!search || typeof search !== "object") return;
              setFilters(search);
              saveSearch(search);
            }}
          />
        </div>
      </div>

      {/* 🔽 EXPLORE */}
      <ExploreMore />
    </div>
  );
}