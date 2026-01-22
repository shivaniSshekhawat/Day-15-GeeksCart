import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useFetchCourseData,
  useIsCourseExistInCart,
  useIsCourseExistInWishlist,
} from "../hooks";
import { useDispatch } from "react-redux";
import {
  addToWishlistCourse,
  removeFromWishlistCourse,
  addToCartCourse,
  removeFromCartCourse,
} from "../store/geeksSlice";

const Course = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const coursesData = useFetchCourseData();

  const isCourseInWishlist = useIsCourseExistInWishlist(id);
  const isCourseInCart = useIsCourseExistInCart(id);

  function handleAddToWishlist() {
    if (isCourseInWishlist) {
      dispatch(removeFromWishlistCourse(id));
    } else {
      dispatch(addToWishlistCourse(id));
    }
  }

  function handleAddToCart() {
    if (isCourseInCart) {
      dispatch(removeFromCartCourse(id));
    } else {
      dispatch(addToCartCourse(id));
    }
  }

  if (coursesData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fcfdff]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  const data = coursesData.find((course) => course.id === Number(id));

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfdff] p-6 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Course Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm">The course you're looking for might have been moved or renamed.</p>
        <Link
          to="/"
          className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
        >
          Return to Learning Hub
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    instructor,
    price,
    rating,
    image,
    category,
    studentsEnrolled,
    lastUpdated,
    language,
    whatYouWillLearn,
    prerequisites,
    reviews,
  } = data;

  return (
    <div className="bg-[#fcfdff] min-h-screen">
      {/* Dynamic Header */}
      <div className="bg-indigo-950 text-white pb-32 pt-16 lg:pb-48 lg:pt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/50 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="lg:w-2/3">
            <nav className="flex gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-orange-400">{category}</span>
            </nav>

            <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl text-indigo-100/80 mb-10 leading-relaxed max-w-2xl font-medium">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl ring-1 ring-white/20">
                <span className="text-yellow-400 font-black">{rating}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'opacity-30'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-indigo-200">({reviews?.length || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-200 font-bold">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {studentsEnrolled?.toLocaleString()} Learners
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-indigo-300 font-bold border-t border-white/10 pt-8">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-[10px]">{instructor.charAt(0)}</div>
                Mentor: <span className="text-white underline decoration-indigo-500">{instructor}</span>
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updated {lastUpdated}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {language || "English"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative -mt-24 lg:-mt-40 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Learning Box */}
            <section className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-indigo-100/20 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4">Mastery Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whatYouWillLearn?.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900">Curriculum Insight</h2>
              <div className="prose max-w-none text-gray-600 text-lg leading-relaxed">
                <p>{description}</p>
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100">
              <h2 className="text-xl font-black text-indigo-900 mb-6">Entry Requirements</h2>
              <ul className="space-y-3">
                {prerequisites?.map((prereq, i) => (
                  <li key={i} className="flex items-center gap-3 text-indigo-800 font-bold">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    {prereq}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900">Learner Voice</h2>
                <div className="text-indigo-600 font-black text-sm bg-indigo-50 px-4 py-2 rounded-full">
                  Verified Enrollment
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {reviews?.map((review, i) => (
                  <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center font-black text-indigo-600">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900">{review.user}</h4>
                          <span className="text-xs text-gray-400 font-bold">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 font-black text-sm bg-yellow-50 px-3 py-1.5 rounded-xl">
                        ★ {review.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:block">
            <div className="sticky top-28 bg-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-200/50 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500"></div>
              
              <div className="relative mb-8 aspect-video rounded-3xl overflow-hidden group">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform cursor-pointer">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl text-indigo-600">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900">₹{price}</span>
                    <span className="text-lg text-gray-400 line-through font-bold">₹{Math.floor(price * 1.6)}</span>
                  </div>
                  <span className="text-orange-500 font-black text-sm uppercase mt-2">Limited Time Offer: 40% OFF</span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-5 rounded-2xl font-black text-white transition-all transform active:scale-95 shadow-xl ${
                      isCourseInCart ? 'bg-gray-900 hover:bg-black' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                    }`}
                  >
                    {isCourseInCart ? "Remove From Cart" : "Register Now"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="w-full py-5 rounded-2xl font-black text-gray-900 border-2 border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className={`w-5 h-5 ${isCourseInWishlist ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {isCourseInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                <div className="space-y-4 pt-8 border-t border-gray-50">
                  <h4 className="font-black text-gray-900 text-sm italic">Premium Inclusions:</h4>
                  <ul className="space-y-4">
                    {[
                      { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', label: '24+ Hours HD Content' },
                      { icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: '15 Downloadable Assets' },
                      { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', label: 'Mobile-Optimized App' },
                      { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Industry Certificate' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors cursor-default">
                        <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;