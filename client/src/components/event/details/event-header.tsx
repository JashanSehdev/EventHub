"use client";
import { RoleEnum } from "@/enum/user.enum";
import {
  fetchEventWithIdAsync,
  registerEventAsync,
} from "@/features/events/handle-events/events.action";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { IEvent } from "@/type/event.type";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const format_date = (date: Date) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDay();

  return `${d}, ${shortMonths[month]}, ${year} ' ${days[day]}`;
};

export default function EventHeader({ eventId }: { eventId: number }) {
  const dispatch = useAppDispatch();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [enrolled, setEnrolled] = useState<boolean>(
    event?.isRegistered ?? false,
  );

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let isActive = true;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchEventWithIdAsync(eventId)).unwrap();
        if (isActive) {
          setEvent(result.data);
          setEnrolled(result.data?.isRegistered ?? false);
        }
      } catch {
        isActive = false;

        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    return () => {
      isActive = false;
    };
  }, [dispatch, eventId]);

  if (loading) return <CircularProgress />;

  console.log("event", event);
  if (error || !event) {
    return (
      <Typography variant="h5">{error ?? "404 Event not found"}</Typography>
    );
  }

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const eventData = {
    "start time": format_date(startDate),
    "end time": format_date(endDate),
    location: event.location,
    "event created at": format_date(new Date(event.createdAt)),
    Attendees: event.registeredUsers,
  };

  return (
    <Stack>
      <Stack spacing={2}>
        <Typography variant="h2" className="styleLetters">
          {event.title} hi
        </Typography>
        <Typography>{event.description}</Typography>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ width: "fit-content", margin: "2rem" }}
      >
        <table>
          <TableBody>
            {Object.entries(eventData).map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data[0]}</TableCell>
                <TableCell>{data[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
      {user?.role !== RoleEnum.ORGANIZER && (
        <Button
          disabled={enrolled}
          variant="contained"
          className="styleLetters"
          sx={{ borderRadius: 0, maxWidth: "300px" }}
          onClick={() => {
            setEnrolled(true);
            dispatch(registerEventAsync(eventId));
          }}
        >
          {enrolled ? "Enrolled" : "ENROLL IN EVENT"}
        </Button>
      )}
    </Stack>
  );
}
