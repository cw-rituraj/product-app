import React, { useState, useRef, useEffect } from 'react';

const FilterCard = ({ filterData,setFilter,setData,filter,hideFilter,setHideFilter,setCurrentPage}) => {
  //const [activeFilter, setactiveFilter] = useState(filter);
  const [brandF, setbrandF] = useState("");
  const [categoryF, setCategoryF] = useState("");
  const [minPrice,setminPrice] = useState(0);
  const [maxPrice,setmaxPrice] = useState(100000);

  const reference = useRef();

  const handleCLick = (e) => {
    console.log(e.target.id);
    handleFilter(false);
    setFilter(e.target.id);
    //setactiveFilter(e.target.id);
  }

  const handleFilter = (fetch) => {
    let currentFilters = "";
    console.log(currentFilters);

    reference.current.childNodes.forEach(item =>
       {
      if(item.childNodes[0].checked) 
      currentFilters += "'" + item.childNodes[1].textContent + "'" + ",";
      if(filter == 'price' && item.childNodes[0].value > 0) setminPrice(item.childNodes[0].value); 
      if(filter == 'price' && item.childNodes[1].value > 0) setmaxPrice(item.childNodes[0].value); 
      }
       );
       if(filter === 'brand') setbrandF(currentFilters);
       else if(filter === 'category') setCategoryF(currentFilters);
       console.log(currentFilters);
       console.log("min" + minPrice)
       if(fetch){
       getFilterdProducts(currentFilters);
      setCurrentPage(1);
      }
  }

  const getFilterdProducts = async (currentFilters) => {
    let brand  = filter === 'brand' ? currentFilters:brandF;
    let category  = filter === 'category' ? currentFilters:categoryF;

    let url = `https://localhost:7165/filter?brand=${brand.length > 0 ? brand.substring(0,brand.length - 1):"none"}&category=${category.length > 0 ? category.substring(0,category.length - 1):"none"}&minprice=${minPrice}&maxprice=${maxPrice}`;
    const response = await fetch(url);
    const res = await response.json();
    setData(res.products);
    console.log(url ,res);
  }

  return (
    <div className={`filter-container ${hideFilter ? "close":""}`}>
      <div className='filter-name'>Filter</div>
      <div className='filter-wrapper'>
        <div className='filter-type'  onClick={handleCLick}>
          <p id='brand' style={filter === 'brand' ? { background: `rgb(112, 201, 112)` } : { background: 'gray'}}>Brand</p>
          <p id='category' style={filter === 'category' ? { background: 'rgb(112, 201, 112)' } : { background: 'gray' }}>Category</p>
          <p id='price' style={filter === 'price' ? { background: `rgb(112, 201, 112)` } : { background: 'gray' }}>Price</p>
        </div>
        <div className='filter-option' ref={reference}>
          {
            filter!= 'price' && filterData && filterData.map(item => {
              return (
                <label htmlFor="">
                  <input type="checkbox" />
                  {item}
                </label>
              )
            })
          }
          <div id='price-input-container' style={filter == 'price' ? {display:'block' } : {display:'none' } }>
          <input id = "min" placeholder = "Min Price"  type="text" onChange={(e) => {setminPrice(e.target.value)}}/>
          <input id = "max" placeholder = "Max Price" type="text" onChange={(e) => setmaxPrice(e.target.value)}/>
          </div>

        </div>
      </div>
      <div id='filter-buttons'>
    <button className='secondary-button apply' onClick={() => {handleFilter(true);setHideFilter(true);}}>Apply Filters</button>
    <button className='secondary-button ' style={{background : 'red'}} onClick={()=> {setHideFilter(true);console.log("close");}} >Close</button>
</div>

    </div>
  )
}

export default FilterCard