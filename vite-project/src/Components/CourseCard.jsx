import React, { useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ courseData }) => {
  const {
    id,
    title,
    instructor,
    price,
    rating,
    category,
    bestseller,
    studentsEnrolled,
  } = courseData;

  const [img, setImg] = useState(courseData?.image ?? "");

  return (
    <Link
      to={`/course/${id}`}
      className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] h-full"
    >
      {/* Badge Overlay */}
      {bestseller && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-orange-200">
            Top Choice
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <p className="text-white/80 text-xs font-semibold mb-1">Last Updated 2026</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-bold">12+ Modules</span>
            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-bold">Lifetime Access</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-7">
        {/* Category & Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-2 py-1 rounded-md">
            {category}
          </span>
          <div className="flex items-center text-xs font-bold text-gray-400">
            <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            {(studentsEnrolled / 1000).toFixed(1)}k
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm font-semibold text-gray-400 mb-5 flex items-center">
          By <span className="text-gray-600 ml-1">{instructor}</span>
        </p>

        {/* Footer: Rating and Price */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-50">
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-600 font-black text-xs mr-1">{rating}</span>
            <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{price}</span>
            <span className="text-[10px] font-bold text-gray-400 line-through">₹{Math.floor(price * 1.4)}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Line (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default CourseCard;