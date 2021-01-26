import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './App.css';


const Search = ({auth}) => {
    const {token} = auth;
    const [name, setName] = useState("");
    const [artistId, setArtistId] = useState(null)

    const searchAlbum = async (name) => {
        setName(name);


        const {data} = await axios.get(`/auth/search/${token}/${name}`) // proxy issues cannot use localhost:8080
        console.log(data)



            ////  if I call fetch the API from client:
            // const {data} = await axios.get(`http://api.spotify.com/v1/search?q=${name}&type=artist`, {
            //     headers: {
            //         "Authorization": `Bearer ${token}`
            //     }
            // })  
            // setArtistId(data.artists.items[0].id);
            // console.log(artistId)
            ////

       
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