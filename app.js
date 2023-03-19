import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellers } from "./actions/sellerActions";

const SellerList = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  const handlePriceSort = (order) => {
    let sortedSellers = sellers.sort((a, b) => {
      return order === "desc" ? b.minimumPrice - a.minimumPrice : a.minimumPrice - b.minimumPrice;
    });
    dispatch({ type: "SORT_SELLERS_BY_PRICE", payload: sortedSellers });
  };

  const handleCategoryFilter = (category) => {
    let filteredSellers = sellers.filter((seller) => {
      return seller.categories.includes(category);
    });
    dispatch({ type: "FILTER_SELLERS_BY_CATEGORY", payload: filteredSellers });
  };

  return (
    <div>
      <h1>List of Sellers</h1>
      <button onClick={() => handlePriceSort("asc")}>Sort by Price - Low to High</button>
      <button onClick={() => handlePriceSort("desc")}>Sort by Price - High to Low</button>
      <button onClick={() => handleCategoryFilter("job_assist")}>Filter by Job Assist</button>
      <button onClick={() => handleCategoryFilter("exam_assist")}>Filter by Exam Assist</button>
      {sellers.map((seller) => (
        <div key={seller._id}>
          <img src={seller.profileImg} alt={seller.name} />
          <h3>{seller.name}</h3>
          <p>{seller.about}</p>
          <p>Price: {seller.minimumPrice}</p>
          <p>Categories: {seller.categories.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default SellerList;
