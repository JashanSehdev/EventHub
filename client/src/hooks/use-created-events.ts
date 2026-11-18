
'use client'
import { fetchEventAsync } from "@/features/events/handle-events/events.action";
import { useAppDispatch } from "@/features/store";
import { EventFilter } from "@/type/event.type";
import usePaginatedList from "./use-paginatinated-list";
import { useCallback } from "react";

export default function useCreatedEvents () {
    const dispatch = useAppDispatch();

    const fetchData = useCallback(
        (params: EventFilter) => {
            return dispatch(fetchEventAsync(params)).unwrap();
        },
        [dispatch]
    );

    return usePaginatedList({
        fetchData,
        limit : 10
    })
}