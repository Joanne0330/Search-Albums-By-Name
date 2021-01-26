import axios from 'axios';
import React, {Fragment, useState} from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'


const Search = ({auth}) => {
    const {token} = auth;
    const [name, setName] = useState("");
    const [albumData, setAlbumData] = useState([]);

    const searchAlbum = async (name) => {
        setName(name);

        const {data} = await axios.get(`/auth/search/${token}/${name}`) // proxy issues cannot use localhost:8080

        setAlbumData(data)        
    }
        console.log(albumData)
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
        <Fragment>
            <Container fluid>
                <div style={pageStyle}>
                    {albumData.map((album, id) => (
                        <Card key={album.id} style={cardStyle}>
                            <Card.Img variant="top" src={album.images[1].url}></Card.Img>
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    ) )}
                </div>
            </Container>
        </Fragment>
    </div>    
    )
}

const cardStyle = {
    maxHeight: '35rem', 
    maxWidth: '30rem', 
    padding: '5rem', 
    margin: '2rem'
}

const pageStyle = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justfyContent: 'space-evenly'
}


export default Search;