'use client'
import AlertBox from "@/components/admin/alert/alertBox";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import EventForm from "../event-form/event-form";
import { EventOutput } from "../event-form/event-form.type";
import { useState } from "react";
import { UseEvents } from "@/hooks/use-events";

export default function CreateEvent() {
    const [open, setOpen] = useState<boolean>(false)
    const {createEvent} = UseEvents()
    const handleSubmit = (data : EventOutput) => {
        createEvent(data);
    }
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Create Event
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