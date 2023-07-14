import React, { useState } from 'react'

const ShowMoreOrLess = ({data, slicer}) => {

    const [showMore, setShowMore] = useState(false);

    // const {text} = data;


  return (
    <div className="more_less">
        <div className="text">
        {data.length < slicer ? data :`${data.substring(0, slicer)}... `
        
        }

        {data.length < slicer ? <></> : 
            <button className="show_btn" onClick={()=> setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
            </button>
        }
        </div>
    </div>
  )
}

export default ShowMoreOrLess