import { api, getErrorMessage } from "@/api/api";
import { EventOutput } from "@/components/event/event-form/event-form.type";
import { EventFilter, IEvent } from "@/type/event.type";
import { PaginationResponse, ResponseType } from "@/type/meta.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const createEventAsync = createAsyncThunk< ResponseType<IEvent>, EventOutput>(
    'events/create',
    async(data ,thunkApi) => {
        try {
            const response = await api.post('/event', data);
            enqueueSnackbar('Event Created Successfully')
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchEventAsync = createAsyncThunk< PaginationResponse<IEvent>, EventFilter>(
    'events/fetch',
    async(filters ,thunkApi) => {
        try {
            const response = await api.get('/event', {
                params: filters
            });
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchCreatedEventAsync = createAsyncThunk< PaginationResponse<IEvent>, EventFilter>(
    'events/fetch',
    async(filters ,thunkApi) => {
        try {
            const response = await api.get('/event', {
                params: filters
            });
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchEventWithIdAsync = createAsyncThunk< ResponseType<IEvent>, number>(
    'events/fetchbyId',
    async(eventId ,thunkApi) => {
        try {
            const response = await api.get('/event/' + eventId)
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const registerEventAsync = createAsyncThunk< unknown, number>(
    'events/fetchbyId',
    async(eventId ,thunkApi) => {
        try {
            const response = await api.post('/event/' + eventId + "/registration");
            console.log(response.data)
            enqueueSnackbar( 'Registration successfull', {variant : 'success'})
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)