import axios from 'axios';
import React, {useState} from 'react';
import './App.css';


const Search = ({auth}) => {
    const {token} = auth;
    const [name, setName] = useState("")

    const searchAlbum = async (name) => {
        console.log(name);
        console.log(token)
        console.log({token})
        const {data} = await axios.get(`/auth/search/${token}/${name}`)
        console.log(data)
    }


 return ( 
    <div className={"App"}>
        <h2>Hello I'm logged in and now we can search albums by artist's name</h2>
        <br></br>
        <a className="App-link" href={"/auth/logout"}>Logout</a>
        <br></br>
        <input 
            type='text'
            placeholder='Search the name of artist...'
            value={name}
            onChange={event => {
                event.preventDefault();
                setName(event.target.value)
            }}    
        />
        {'   '}
        <button
            onClick={() => searchAlbum(name)}
        >
            Search
        </button>
    </div> 
    
    )
}
export default Search;