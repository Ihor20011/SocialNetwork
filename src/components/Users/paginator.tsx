import s from "./Newuser.module.css"

import React, { useState } from "react";

type paginatorType={
    totalItemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChange:(page:number)=>void,
    portionSize?:number
}
let Paginator : React.FC<paginatorType>=({totalItemsCount,pageSize,currentPage,onPageChange, portionSize=7,})=>{
    let pageAmount=Math.ceil(totalItemsCount/ pageSize);
    let pages: Array<number> = [];
    for (let i:number=1;i<=pageAmount;i++){
        pages.push(i)
    }
    let  totalPortion=pageAmount / portionSize;
    let [currentPortion,chngeCurrentPortion]=useState(1);
    let leftPortionElement=(currentPortion-1) * portionSize + 1;
    let rightPortinElement= currentPortion * portionSize;
      return( 
            <div className={s.block}>
                {
                    currentPortion > 1 &&
                    <button  className={s.buttoncolor} onClick={()=>{chngeCurrentPortion(currentPortion-1)}}>Prev</button>
                }
                {pages
                 .filter((p)=>{
                    if (p >= leftPortionElement && p <= rightPortinElement){
                        return true
                    }})
                 .map((p)=>{
                        return <button  onClick={()=>{
                            onPageChange(p)
                        }}   className={currentPage === p? s.selectedpage :s.page}>{p}</button>})}

                { totalPortion > currentPortion&&
                   <button className={s.buttoncolor}  
                   onClick={()=>{chngeCurrentPortion(currentPortion+1)}} >Next</button>
                
                }
            </div>
            )
        }
        export default Paginator
