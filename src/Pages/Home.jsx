import { useEffect, useState } from "react";
import Card from "../Components/Card";
import FilterCard from "../Components/FilterCard";
import Pagination from "../Components/Pagination";
import FilterBar from "../Components/FilterBar";

export const Home = () => {
  const [data, setData] = useState([]);
  const [maxPage, setmaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const getProduct = async (page) => {
    try{
    const response = await fetch(`https://localhost:7165/page?page=${page}`);
    const res = await response.json();
    setData(res.products);
    setmaxPage(Math.ceil(res.total / 10));
    console.log(res);
}
     catch(err ) {
      console.log(err);
      };
  }

 

  useEffect(() => {
   getProduct(1);
  }, []);

  let cards;

  if (data === null) {
    cards = <div>Please Wait the Content is Loading...</div>;
  } else {
    cards = data.map((ele) => {
        return (
          <Card
            className="card"
            key={ele.id}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            thumbnail={ele.thumbnail}
          />
        );
    });
  }

  return (
    <div className="App" >
      <h1 id="heading">CarWale Shooping App</h1>
      <FilterBar setData = {setData} setCurrentPage = {setCurrentPage} />
      <div className="card-wrapper">{cards}</div>
      <Pagination maxPage = {maxPage} getProduct = {getProduct} currentPage = {currentPage}  setCurrentPage = {setCurrentPage} />
    </div>
  );
};