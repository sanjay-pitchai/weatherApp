import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_KEY } from '../config';

const API_KEY = "9b30fbca3e404b218c5180439251803"
const BASE_URL = "https://api.weatherapi.com/v1"

export const fetchForecastByCity = createAsyncThunk(
  'weather/fetchForecastByCity',
  async (city) => {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`)
    return response.data;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    forecast: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(fetchForecastByCity.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.forecast = action.payload
    }
    )
  }
})

export default weatherSlice.reducer;