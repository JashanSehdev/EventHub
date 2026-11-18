'use client'
import AlertBox from "@/components/admin/alert/alertBox";
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import EventForm from "../event-form/event-form";
import { EventOutput } from "../event-form/event-form.type";
import { useState } from "react";
import { useAppDispatch } from "@/features/store";
import { createEventAsync } from "@/features/events/handle-events/events.action";
import styles from './create-event.module.css'

export default function CreateEvent() {
    const [open, setOpen] = useState<boolean>(false)
    const dispach = useAppDispatch()
    const handleSubmit = (data : EventOutput) => {
        dispach(createEventAsync(data))
    }
    return (
        <>
        <Typography variant="h2" className={`${styles.title} styleLetters`}>
            Dashboard
        </Typography>
            <Button onClick={() => setOpen(true)} variant="contained" className={styles.createButton} >
                <Typography className="styleLetters">Create Event</Typography>
            </Button>
            <AlertBox open={open} handleClose={() => setOpen(false)}>
                <Card>
                    <CardHeader 
                        title = "Create Event"
                    />
                    <CardContent>
                        <EventForm onSuccess={handleSubmit} handleClose={() => setOpen(false)}/>
                    </CardContent>
                </Card>
            </AlertBox>
        </>
    )
}