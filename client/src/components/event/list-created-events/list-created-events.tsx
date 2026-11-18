"use client";
import useCreatedEvents from "@/hooks/use-created-events";
import { CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import EventCard from "../list-events/list-event-card/event-card";

export default function ListCreatedEvents() {
  const createdEvents = useCreatedEvents();
  return (
    <Stack spacing={2}>
      <Typography className="styleLetters">Organized Events</Typography>
      <Stack direction={'row'} useFlexGap spacing={2} sx={{flexWrap: 'wrap'}}>
        {createdEvents.loading ? (
          <CircularProgress />
        ) : (
          createdEvents.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </Stack>
      <Pagination page={createdEvents.page} count={createdEvents.totalPages} onChange={(_, page) => createdEvents.setPage(page)}/>
    </Stack>
  );
}
