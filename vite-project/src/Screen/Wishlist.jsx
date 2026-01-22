import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchCourseData, useIsCourseExistInCart } from "../hooks";
import { removeFromWishlistCourse, addToCartCourse } from "../store/geeksSlice";

const WishlistItem = ({ course, handleRemove }) => {
  const dispatch = useDispatch();
  const isInCart = useIsCourseExistInCart(course.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCartCourse(course.id));
    }
  };

  return (
    <div
      key={course.id}
      className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 hover:border-orange-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(249,115,22,0.1)] h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Link to={`/course/${course.id}`}>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <button
          onClick={() => handleRemove(course.id)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
            {course.category}
          </span>
        </div>

        <Link to={`/course/${course.id}`}>
          <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
            {course.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-6 text-yellow-500 font-bold text-sm bg-yellow-50/50 self-start px-3 py-1 rounded-lg">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {course.rating}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{course.price}</span>
            <Link
              to={`/course/${course.id}`}
              className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:text-indigo-800 transition-colors"
            >
              View Class
            </Link>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-lg ${
              isInCart
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100/50'
            }`}
          >
            {isInCart ? 'Already in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const Wishlist = () => {
  useFetchCourseData();
  const wishlistData = useSelector((store) => store.geeks.wishlistCourse);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlistCourse(id));
  };

  if (wishlistData.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-orange-50 w-32 h-32 rounded-[3.5rem] flex items-center justify-center mb-10 shadow-xl shadow-orange-100/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-10 text-lg font-medium max-w-sm italic">
          Start building your dream stack. Save the best learning paths for your future self.
        </p>
        <Link
          to="/"
          className="bg-gray-900 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-black transition-all shadow-2xl shadow-gray-200 text-lg flex items-center gap-3"
        >
          Discover New Skills
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdff] min-h-screen py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-3">Saved Ambitions</h1>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs border-l-4 border-orange-500 pl-4">
              Your personal library of future excellence.
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <span className="text-gray-400 font-bold text-sm">Target Balance:</span>
            <span className="text-2xl font-black text-gray-900">
              ₹{wishlistData.reduce((acc, c) => acc + c.price, 0)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {wishlistData.map((course) => (
            <WishlistItem key={course.id} course={course} handleRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;