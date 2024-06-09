import React from "react";
import "./SearchResult.css"


export const SearchResult = ({result, id}) => {

    return (
    <div className="search-result" key={id}>
        <a href={`/users/${result._id}`}>
            {/* <img src={user.avatar} className='smallcirclemask' alt="Image Alt Text" /> */}
            <img className='smallcirclemask' src={result.avatar} alt='Profile'/>
            <span className='who-liked-this-span'>{`${result.firstName} ${result.lastName}`}</span>
        </a>
    </div>
    )
}