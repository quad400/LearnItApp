import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../../containers/Message";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, categoryLists, removeCategory } from "../../actions/course";
import Loader from "../../containers/Loader";

const AdminCategory = () => {
  const params = useParams();
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState("");
  const { sucess, error } = useSelector((state) => state.categoryCreate);
  const {
    categories,
    loading,
    error: errorSyllabus,
  } = useSelector((state) => state.categoryList);

  const dispatch = useDispatch();

  const courseId = params.course_id;

  useEffect(() => {
    if (localStorage.getItem("access") == null)
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    dispatch(categoryLists());
  }, [dispatch]);

  const handleClick = (categoryId) => {
    dispatch(removeCategory(categoryId))
    dispatch(categoryLists());
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(createCategory(name));
    dispatch(categoryLists());
  };


  return (
    <div className="course_update">
     { error && 
        <Message type="error" message={error} />
     }
        <>
          <div>
            <h4>Create new Category</h4>
            <form onSubmit={handleSubmit}>
              <div className="dual_form">
                <div className="profile_container">
                  <input
                    className="profile_control"
                    onChange={handleChange}
                    placeholder="e.g deep knowledge of python"
                    type="text"
                    required
                    value={name}
                    name="name"
                  />
                </div>
                <div className="tide">
                  <button type="submit" className="new">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="syllabus_list">
            <h4>List of Categories</h4>
            {loading ? (
        <Loader />
      ) :(categories.length == 0 ? (
              <div>
                <p>Your Cattegory is empty</p>
              </div>
            ) : 
              categories.map((item, index) => {
                return (
                  <div className="dual_form sylla">
                    <div className="list">
                      <strong>{index + 1}.</strong>
                      <Link className="list_link"
                        key={item.category_id}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="inline_edit">
                      {/* <div className=""> */}
                      {/* </div> */}
                      {/* <div className=""> */}
                        <Link className="cust_link delete" onClick={()=>handleClick(item.category_id)}>
                          Remove
                        </Link>
                      {/* </div> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
    </div>
  );
};

export default AdminCategory;
