"use client";

import {useMemo, useState} from "react";
import NewsHero from "./NewsHero";
import NewsCategoryFilters from "./NewsCategoryFilters";
import FeaturedStory from "./FeaturedStory";
import NewsSidebar from "./NewsSidebar";
import RecentUpdatesSection from "./RecentUpdatesSection";
import type {NewsPageContent} from "@/types/cms";
import {publishedItems} from "@/lib/visibility";

const PAGE_SIZE = 3;

export default function NewsPageClient({content}: {content: NewsPageContent}) {
  const [activeCategory, setActiveCategory] = useState<string>("All Updates");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredUpdates = useMemo(() => {
    const publishedUpdates = publishedItems(content.updates);
    if (activeCategory === "All Updates") return publishedUpdates;
    return publishedUpdates.filter((item) => item.category === activeCategory);
  }, [activeCategory, content.updates]);

  const visibleUpdates = filteredUpdates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUpdates.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="mx-auto max-w-screen-2xl bg-surface px-4 pb-16 pt-24 font-body text-on-surface sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
      <NewsHero content={content.hero} />
      <NewsCategoryFilters categories={content.categories} activeCategory={activeCategory} onChange={handleCategoryChange} />
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8"><FeaturedStory content={content.featuredStory} /></div>
        <div className="lg:col-span-4"><NewsSidebar retreatCard={content.retreatCard} keyDates={content.keyDates} /></div>
      </section>
      <RecentUpdatesSection updates={visibleUpdates} hasMore={hasMore} onLoadMore={() => setVisibleCount((prev) => prev + PAGE_SIZE)} />
    </main>
  );
}
