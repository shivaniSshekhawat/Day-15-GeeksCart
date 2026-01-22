import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoursedata } from "./store/geeksSlice";

export function useFetchCourseData() {
  const dispatch = useDispatch();
  const courseData = useSelector((store) => store.geeks.courses);

  async function getData() {
    if (courseData.length !== 0) return;
    console.log("api called");
    let apiData = await fetch(
      `https://mocki.io/v1/646b6517-78be-4b54-b2ed-6cc91be331e5`,
    );
    let jsonData = await apiData.json();
    dispatch(setCoursedata(jsonData));
  }

  useEffect(() => {
    getData();
  }, []);
  return courseData;
}

export function useIsCourseExistInWishlist(id) {
  const wishlistData = useSelector((store) => store.geeks.wishlistCourse);
  console.log("wishlistData", wishlistData);
  const courseIdx = wishlistData.findIndex((data) => data.id == id);
  return courseIdx == -1 ? false : true;
}

export function useIsCourseExistInCart(id) {
  const cartData = useSelector((store) => store.geeks.cartCourses);
  const courseIdx = cartData.findIndex((data) => data.id == id);
  return courseIdx == -1 ? false : true;
}
