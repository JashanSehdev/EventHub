'use client'
import { IRegistrations, RegistrationFilters } from "@/type/registration.type"
import usePaginatedList from "./use-paginatinated-list"
import { useAppDispatch } from "@/features/store"
import { fetchRegistrationsAsync } from "@/features/registrations/handle-registrations/registrations.action"
import { useCallback } from "react"


export default function UseRegistrations (eventId : number) {
    const dispatch = useAppDispatch()
    const fetch = useCallback(async(params : RegistrationFilters) => {
        return await dispatch(fetchRegistrationsAsync({...params, eventId})).unwrap()
    },[dispatch, eventId])

    return usePaginatedList <IRegistrations, RegistrationFilters>({
        fetchData : fetch,
        limit : 10
    })
}   