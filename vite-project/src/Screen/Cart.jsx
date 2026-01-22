import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchCourseData } from "../hooks";
import { removeFromCartCourse, addToWishlistCourse } from "../store/geeksSlice";

const Cart = () => {
  useFetchCourseData();
  const cartData = useSelector((store) => store.geeks.cartCourses);
  const dispatch = useDispatch();

  const totalAmount = cartData.reduce((acc, course) => acc + course.price, 0);
  const tax = totalAmount * 0.18;
  const finalTotal = totalAmount + tax;

  const handleRemove = (id) => {
    dispatch(removeFromCartCourse(id));
  };

  const handleMoveToWishlist = (id) => {
    dispatch(addToWishlistCourse(id));
    handleRemove(id);
  };

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-indigo-50 w-32 h-32 rounded-[3rem] flex items-center justify-center mb-10 shadow-xl shadow-indigo-100/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Your Cart Awaits</h2>
        <p className="text-gray-500 mb-10 text-lg font-medium max-w-sm">
          It's looking a bit empty here. Discover the best tech courses designed for your career growth.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 text-lg"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdff] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">My Learning Basket</h1>
          <p className="text-gray-500 font-bold italic">Secure your future with world-class education.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Items */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                <h2 className="text-xl font-black text-gray-800 flex items-center gap-3">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">{cartData.length}</span>
                  Selected Programs
                </h2>
              </div>

              <div className="divide-y divide-gray-50">
                {cartData.map((course) => (
                  <div
                    key={course.id}
                    className="p-8 flex flex-col sm:flex-row gap-8 hover:bg-gray-50/50 transition-all items-center sm:items-start"
                  >
                    <div className="w-full sm:w-48 aspect-video flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full text-center sm:text-left">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                          <Link
                            to={`/course/${course.id}`}
                            className="text-2xl font-black text-gray-900 hover:text-indigo-600 transition-colors leading-tight"
                          >
                            {course.title}
                          </Link>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-indigo-600">₹{course.price}</span>
                            <span className="text-xs text-gray-400 line-through font-bold">₹{Math.floor(course.price * 1.5)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{course.category}</span>
                          <span className="text-sm font-bold text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 fill-yellow-500" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center justify-center sm:justify-start gap-6 border-t border-gray-50 pt-4">
                        <button
                          onClick={() => handleRemove(course.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleMoveToWishlist(course.id)}
                          className="text-sm text-gray-400 hover:text-indigo-600 font-black uppercase tracking-widest transition-colors"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-10 lg:sticky lg:top-28">
              <h2 className="text-2xl font-black text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4 tracking-tight text-center sm:text-left">
                Payment Summary
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center font-bold text-gray-500">
                  <span className="text-sm uppercase tracking-widest">Base Amount</span>
                  <span className="text-gray-900">₹{totalAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-500">
                  <span className="text-sm uppercase tracking-widest">Service Fee</span>
                  <span className="text-indigo-600 italic">Complementary</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-500">
                  <span className="text-sm uppercase tracking-widest">Digital Tax (18%)</span>
                  <span className="text-gray-900">₹{tax.toFixed(0)}</span>
                </div>
                <div className="border-t-2 border-dashed border-gray-100 pt-6 flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900 tracking-tight">Net Payable</span>
                  <span className="text-4xl font-black text-indigo-600 tracking-tighter">₹{finalTotal.toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 text-lg uppercase tracking-widest">
                  Secure Checkout
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Encrypted Learning Environment
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-10 p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Promotional Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button className="px-6 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-black transition-colors text-xs uppercase tracking-widest">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;