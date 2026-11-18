import { IEvent } from "@/type/event.type";
import { createSlice } from "@reduxjs/toolkit";
import { createEventAsync, fetchEventAsync } from "./handle-events/events.action";

type InitialState = {
  events : IEvent[],
  loading : boolean,
};

const initialState: InitialState = {
  events : [],
  loading : false,
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEventAsync.fulfilled, (state, action) => {
        state.events.push(action.payload.data);
    }).addCase(fetchEventAsync.fulfilled, (state, action) => {
        state.events = (action.payload.data);
    })
  }
});


export default eventSlice.reducer
