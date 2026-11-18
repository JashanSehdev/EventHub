"use client";

import { Box, Button, CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import EventCard from "./list-event-card/event-card";
import { useAllEvents } from "@/hooks/use-events";

export default function ListAllEvents() {
  const allEvents = useAllEvents();

  return (
    <Stack spacing={ 2}>
      <Stack direction={"row"} sx={{ flexWrap: "wrap" }} useFlexGap spacing={2}>
        {allEvents.loading && <CircularProgress />}

        {!allEvents.loading &&
          (allEvents.data.length === 0 ? (
            <Typography>No Events</Typography>
          ) : (
            allEvents.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ))}
      </Stack>
      <Box>
      <Pagination
        page={allEvents.page}
        onChange={(_, page: number) => allEvents.setPage(page)}
        count={allEvents.totalPages}
      />
      </Box>
    </Stack>
  );
}
