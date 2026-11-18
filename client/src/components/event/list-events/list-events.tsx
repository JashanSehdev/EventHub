'use client'
import { fetchEventAsync } from "@/features/events/handle-events/events.action";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import EventCard from "./list-event-card/event-card";

export default function ListEvents () {
    const dispatch = useAppDispatch()
    const {events, loading} = useAppSelector((state) => state.event)

    useEffect(() => {
        dispatch(fetchEventAsync());
    },[dispatch])


    return (
       <Stack direction={'row'} sx={{flexWrap: 'wrap'}} useFlexGap spacing={2}>
        {   
            loading && <CircularProgress />
        }

        {
            !loading && (
                events.length === 0 ? (
                    <Typography>No Events</Typography>
                ) : (
                    events.map((event) => <EventCard key={event.id} event={event} />)
                )
            )
        }
       </Stack>
    )

}