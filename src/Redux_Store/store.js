import { configureStore } from '@reduxjs/toolkit'
import  MovieData  from '../../src/Reducers/MovieReducer'

export const store = configureStore({
  reducer: {
    MovieData:MovieData,
  },
})
