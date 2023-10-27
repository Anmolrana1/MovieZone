import React, { useState} from 'react';
import { GetMovieById } from '../../Reducers/MovieReducer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Recommend.css'
import Card from '../Card/Card';
function App() {
  const [name, setName] = useState('');
  const [found, setFound] = useState(true);
  const dispatch = useDispatch();
  const [collection, setCollection] = useState([]);

  const searchData=useSelector((state)=>state.MovieData.searchData)
  const handleChange = (e) => {
    setFound(true);
    setName(e.target.value);
  }

  const addMovieToCollection = (movie) => {
    setCollection((prevCollection) => [...prevCollection, movie]);
  }

  const launch = (data) => {
    const ids = data.map(id => ({ id }));
    console.log("launch", ids);
    ids.forEach((element) => {
      dispatch(GetMovieById(element)).then((response) => {
        addMovieToCollection(response.payload);
      });
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       const response = await axios.post('/recommend', {'name': name}, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      if(response.data.not_found==='not found') {
        console.log("Movie not found:", response.data.not_found);
        setFound(false)
      } else {
        console.log('Recommended movie IDs:', response.data); 
        launch(response.data)
      }     
    } catch (error) {
      console.error('Error sending data:', error);
      setFound(false)
    }
    setCollection([])
  };

  return (
    <div>
      <div className='recommend_label'>
          Get Related movies</div>
      <form onSubmit={handleSubmit} method="post">  
          <input type="text" value={name} onChange={handleChange} className='recommendSearch' placeholder='Get related movies..'/>
        <button type="submit" className='recommend_button'>RECOMMEND</button>
      </form>
      <div className="movieList">
            <div className="listCards">
                {collection &&
                collection.filter((movie)=>{
                  if(searchData && searchData.length === 0){
                    return movie;}
                  else{
                    return movie.title.toLowerCase().includes(searchData.toLowerCase());
                  }
                })
                .map(movie =>( <Card key={movie.id} movie={movie} />
                  ))
                }
            </div>
        </div> 
        <div className='not_found'>{
          found?'':<h1>Movie Not Found</h1>
        }</div>
    </div>
  );
}

export default App;
