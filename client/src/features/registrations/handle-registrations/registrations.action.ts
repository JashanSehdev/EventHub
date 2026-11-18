import { api, getErrorMessage } from "@/api/api";
import { PaginationResponse } from "@/type/meta.type";
import { IRegistrations, RegistrationFilters } from "@/type/registration.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";


export const fetchRegistrationsAsync = createAsyncThunk <PaginationResponse<IRegistrations>, RegistrationFilters & {eventId : number}>(
    'event/fetch-registrations',
    async (data, thunkApi) => {
        try {
            const {eventId, ...params} = data
            const response = await api.get('event/'+ eventId + '/registration', {params})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), { variant : 'error'});
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }   
    }
)