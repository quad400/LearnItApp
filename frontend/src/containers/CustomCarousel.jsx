import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { allCourses } from "../actions/course";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {Skeleton} from 'antd';
import { responsive } from '../constants';


const CustomCarousel = () => {

    const dispatch = useDispatch();

    const popularCourse = useSelector((state) => state.course)
    const {loading, courses} = popularCourse
    useEffect(()=>{
        dispatch(allCourses())
    }, [dispatch])


    return (!loading?
        <Carousel
            swipeable={true} draggable={true} showDots={false} responsive={responsive}
            ssr={true} infinite={true} autoPlaySpeed={1000} keyBoardControl={true}
            customTransition="all .5" transitionDuration={500} containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]} dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">
                {
                        courses.map((cou, index) => (
                            <Card props={cou} key={index} />
                        ))
                }
        </Carousel>:
        <Skeleton active />
  );
};


export default CustomCarousel