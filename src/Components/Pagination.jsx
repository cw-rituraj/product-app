import React, { useState } from 'react';
import "../App.css"

const Pagination = ({maxPage,getProduct,currentPage,setCurrentPage}) => {

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onPageChange = (page) =>{
    if(maxPage >= page && page > 0){
    setCurrentPage(page);
    getProduct(page);
    window.scrollTo(0, 0);
    }
    console.log(currentPage);
  }

  return (
    <div className='pagination-wrapper' style = {maxPage <= 1 ? {display:"none"}:{display:"flex"}}>
        <div id='prev' onClick={onPrevious}>{"<- Prev"}</div>
        <div id='current-page'>{currentPage}</div>
        <div id='prev'  onClick={onNext}>{"Next ->"}</div>
    </div>
  )
}

export default Pagination