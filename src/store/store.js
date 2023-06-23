import { configureStore } from '@reduxjs/toolkit'
import  homeSlice  from './counterSlice'

export const store = configureStore({
  reducer: {
    home:homeSlice
  },
}) 
export default store