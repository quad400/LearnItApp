import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CATEGORY_LOADED_SUCCESS,CATEGORY_LOADED_FAIL} from "../constants/types";
import axios from "axios";


const Dropdowns = () => {

	const dispatch = useDispatch();

	const [categories, setCategories] = useState([])

	useEffect(() => {
		const getCategory = async () => {
			try{

				const {data} = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/category/`);
				// console.log(res.data)
				// const new_res = parseResponse(res.data)
				setCategories(data)
				dispatch({
					type: CATEGORY_LOADED_SUCCESS,
					payload: data
				})
			}
			catch(error){
				dispatch({
					type: CATEGORY_LOADED_FAIL,
					payload: error.response
				})	
			}}
			getCategory()
	}, [dispatch])


  return (
    <div className="dropdown">
      <button className="category">Categories</button>
      <div className="dropdown__items">
		{
			categories.map((category,i) => {
          
		  return (
			<li key={category.category_id}>
				<Link key={category.category_id} className="link" to={`category/${category.category_id}`}>{category.name}</Link>
			</li>
		  )
			})
		}
      </div>
    </div>
  );
};

export default Dropdowns;
