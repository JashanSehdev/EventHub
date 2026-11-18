'use client'
import { EventOutput } from "@/components/event/event-form/event-form.type";
import { createEventAsync } from "@/features/events/handle-events/events.action";
import { useAppDispatch } from "@/features/store";
import { IEvent } from "@/type/event.type"
import { useState } from "react"


export function UseEvents () {
    const [events, setEvents] = useState<IEvent[]>([]);
    const dispatch = useAppDispatch()

    const createEvent = (data : EventOutput) => {
        dispatch(createEventAsync(data));
        
    }
    return{
        events,
        createEvent
    }
}