import './App.css';
import Header from './Header/Header';
import Home from './components/Home';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import AddWatchLater from './components/Watch_Later/AddWatchLater';
import Recommend from './components/MovieRecommender/Recommend';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/movies/:id" element={<MovieDetail/>}/>
          <Route path="/movie/:type" element={<MovieList/>}/>
          <Route path="/movieK/Watch_Later" element={<AddWatchLater/>}/>
          <Route path="/movieR/Recommend" element={<Recommend/>}/>
          <Route path='*/' element={<h1>Error page</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
