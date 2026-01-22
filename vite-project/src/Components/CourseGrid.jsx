import React from "react";
import { useFetchCourseData } from "../hooks";
import CourseCard from "./CourseCard";

const CourseGrid = () => {
  const courseData = useFetchCourseData();
  
  if (!courseData) return <div className="text-center p-20 text-indigo-600 font-bold animate-pulse text-xl">Loading Excellence...</div>;

  return (
    <div className="bg-[#fcfdff] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-indigo-950 py-24 sm:py-32 mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold leading-7 text-indigo-400 uppercase tracking-widest">Digital Learning Portfolio</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Master the Skills <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-orange-400">
                That Define Tomorrow
              </span>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Curated courses from India's top industry veterans. Dive into localized content designed for the global tech landscape.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Popular Learning Paths</h2>
            <p className="mt-2 text-gray-500 font-medium italic">Handpicked excellence for ambitious learners.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...new Set(courseData.map(c => c.category))].map((cat) => (
              <button key={cat} className="px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-gray-500 hover:text-indigo-600 bg-white shadow-sm hover:shadow-indigo-100">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {courseData.map((dataObj) => (
            <CourseCard key={dataObj.id} courseData={dataObj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;