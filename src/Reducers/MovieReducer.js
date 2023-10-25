import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovie=createAsyncThunk("GetMovie/ALL",async(data,{rejectWithValue})=>{
          const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
          try {
            const result = await response.json();
            console.log(result);
            return result;
          } catch (error) {
            return rejectWithValue(error);
          }
        }
      );
export const GetPopularMovie=createAsyncThunk("GetMovie/popular",async(data,{rejectWithValue})=>{
  console.log("data.type",data.type);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${data.type ? data.type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
        try {
          const result = await response.json();
          console.log(result);
          return result;
        } catch (error) {
          return rejectWithValue(error);
        }
      }
    );
export const GetMovieById=createAsyncThunk("GetMovieById",async(data,{rejectWithValue})=>{
  const response=await fetch(`https://api.themoviedb.org/3/movie/${data.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
  try {
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
})
export const MovieData = createSlice({
name:"MovieData",
initialState:{
    movies:[],
    movieType:[],
    searchData:[],
    movieById:[],
    watchLater:[],
    loding:false,
    error:null,
},
reducers:{
  serachMovie:(state,action)=>{
    state.searchData=action.payload;
  },
  watchLater:(state,action)=>{
    const movieToAdd = action.payload;
    const filteredWatchLater = state.watchLater.filter(movie => movie.id !== movieToAdd.id);
    state.watchLater = [...filteredWatchLater, movieToAdd];
    localStorage.setItem('watchLater', JSON.stringify(state.watchLater));
  }

},
extraReducers:{
    [GetMovie.pending]:(state)=>{
        state.loding=true;
    },
    [GetMovie.fulfilled]:(state,action)=>{
        state.movies=action.payload.results;
        state.loding=false;
    },
    [GetMovie.rejected]:(state,action)=>{
        state.error=action.error;
        state.loding=false;
    },
    [GetPopularMovie.pending]:(state)=>{
      state.loding=true;
    },
    [GetPopularMovie.fulfilled]:(state,action)=>{
        state.movieType=action.payload.results;
        console.log("state.movieType",action.payload);
        state.loding=false;
    },
    [GetPopularMovie.rejected]:(state,action)=>{
        state.error=action.error;
        state.loding=false;
    },
    [GetMovieById.pending]:(state)=>{
      state.loding=true;
    },
    [GetMovieById.fulfilled]:(state,action)=>{
        state.movieById=action.payload;
        console.log("state.GetMovieById",action.payload);
        state.loding=false;
    },
    [GetMovieById.rejected]:(state,action)=>{
        state.error=action.error;
        state.loding=false;
    },
}
  
});
export default MovieData.reducer;
export const {serachMovie,watchLater}=MovieData.actions;