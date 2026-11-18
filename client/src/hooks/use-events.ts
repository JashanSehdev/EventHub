"use client";
import {
  fetchEventAsync,
} from "@/features/events/handle-events/events.action";
import { useAppDispatch } from "@/features/store";
import { EventFilter, IEvent } from "@/type/event.type";
import usePaginatedList from "./use-paginatinated-list";
import { useCallback } from "react";

export function useAllEvents() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    (params: { page: number; limit: number } & EventFilter) =>
      dispatch(fetchEventAsync(params)).unwrap(),
    [dispatch],
  );

  return usePaginatedList<IEvent, EventFilter>({
    fetchData,
    limit: 5,
  });
}
