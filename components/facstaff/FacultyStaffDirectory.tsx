"use client";

import {useMemo, useState} from "react";
import {Search} from "lucide-react";
import FacultyStaffCard from "./FacultyStaffCard";
import FacultyCTA from "./FacultyCTA";
import type {FacultyPageContent} from "@/types/cms";
import {publishedItems} from "@/lib/visibility";

export default function FacultyStaffDirectory({categories, staff}: {categories: FacultyPageContent["categories"]; staff: FacultyPageContent["staff"]}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All Staff");

  const filteredStaff = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return publishedItems(staff).filter((member) => {
      const matchesCategory = activeCategory === "All Staff" || member.category === activeCategory;
      const matchesSearch = [member.name, member.role, member.category, member.description, member.email].some((value) => value.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, staff]);

  return (
    <>
      <section className="bg-gray-200 p-4 sm:p-5 md:p-6 rounded-[1.5rem] sm:rounded-[2rem] mb-10 md:mb-12 flex flex-col lg:flex-row gap-5 lg:gap-6 lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-gray-500 w-5 h-5" />
          <input className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 placeholder:text-outline" placeholder="Search by name or specialty..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/30"}`}>
                {category}
              </button>
            );
          })}
        </div>
      </section>
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredStaff.map((member) => <FacultyStaffCard key={member.id} staff={member} />)}
          <FacultyCTA />
        </div>
      ) : (
        <div className="text-center bg-surface-container-lowest rounded-[2rem] p-10 sm:p-14">
          <h3 className="text-2xl font-bold text-primary mb-2">No staff found</h3>
          <p className="text-on-surface-variant text-sm">Try searching another name, role, specialty, or category.</p>
        </div>
      )}
    </>
  );
}
