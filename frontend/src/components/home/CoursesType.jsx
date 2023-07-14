import { useDispatch, useSelector } from "react-redux";
import CarouselSlickCourse from "../../containers/CarouselSlickCourse";
import { allCourses } from "../../actions/course";
import { useEffect, useState } from "react";
import Loader from "../../containers/Loader";
// import

const CoursesType = () => {

  const dispatch = useDispatch()
  const {loading, courses} = useSelector((state)=> state.course)
  const [popular, setPopular] = useState([])

  useEffect(()=> {
    dispatch(allCourses())

  }, [dispatch])


  return (
    <section>
      <>
        <h3>Popular Course</h3>
        <div className="courses">
        {loading ? <Loader /> : 
           <CarouselSlickCourse courses={courses} />
        }
        </div>
      </>
    </section>
  );
};

export default CoursesType;
