import React from 'react';
import './App.css';


const Search = ({auth}) => {
    const {token} = auth;

 return ( 
    <div className={"App"}>
        <h2>Hello I'm logged in and now we can search albums by artist's name</h2>
    </div> 
    
    )
}
export default Search;