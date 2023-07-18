import React, { useEffect, useState } from "react";
import { categoryFilter, categoryFilterId } from "../../actions/course";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import Loader from "../../containers/Loader";

const CategoryFilter = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { loading, error, data } = useSelector((state) => state.courseFilters);
  const { load, dat } = useSelector((state) => state.courseFiltersId);
  const category_id = params.category_id;
  const [sort, setSort] = useState("most_popular");

  useEffect(() => {
    dispatch(categoryFilterId(category_id));
    dispatch(categoryFilter(category_id, sort, page));
  }, [dispatch, loading, category_id, sort]);

  const totalCount = data.count;
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(dat)
  const handlePreviousPagination = () => {
    if (page >= 1) {
      var newPage = page - 1;
      setPage(newPage);
      dispatch(categoryFilter(category_id, sort, newPage));
    }
    console.log("previous");
  };

  const handleNextPagination = () => {
    if (page <= totalCount) {
      var newPage = page + 1;
      setPage(newPage);
      dispatch(categoryFilter(category_id, sort, newPage));
    }
    console.log("next");
  };

  return (
    <div className="category__filter">
      {load ? <Loader /> : <h3>{dat.category_name} Courses</h3>}
      <h5>Courses to get you started</h5>
      <div className="all__course">
        <div className="top">
          <form onSubmit={handleSubmit}>
            <div className="sort">
              <div className="by">
                <div>
                  <p>sort by</p>
                </div>
                <select
                  name="sort"
                  value={sort}
                  className="profile_control"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="most_popular">Most Popular</option>
                  <option value="latest">Latest</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </form>
          {load ? <Loader /> : <p>{dat.total_category} results</p>}
        </div>
        <div className="body">
          <div className="right">
            {loading ? 
              <Loader />
            : (
              data?.results.map((course, index) => {
                return (
                  <CategoryCard
                    props={course}
                    loading={loading}
                    error={error}
                    key={index}
                  />
                );
              })
            )}
          </div>
        </div>
        <div>
          <ul className="pagin">
            {page !== 1 && (
              <li className="paginate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
                <Link
                  className="paginate_link"
                  onClick={() => handlePreviousPagination()}
                >
                  Previous
                </Link>
              </li>
            )}
            {page !== totalCount || page !== 1 && (
              <li className="paginate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <Link
                  className="paginate_link"
                  onClick={() => handleNextPagination()}
                >
                  Next
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
