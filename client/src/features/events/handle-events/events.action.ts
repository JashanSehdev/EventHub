import { api, getErrorMessage } from "@/api/api";
import { EventOutput } from "@/components/event/event-form/event-form.type";
import { IEvent } from "@/type/event.type";
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

export const fetchEventAsync = createAsyncThunk< PaginationResponse<IEvent>>(
    'events/fetch',
    async(_ ,thunkApi) => {
        try {
            const response = await api.get('/event');
            return response.data

        } catch (error) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)