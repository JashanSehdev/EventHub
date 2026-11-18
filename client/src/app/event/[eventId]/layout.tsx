import EventHeader from "@/components/event/details/event-header";
import Navbar from "@/components/navbar/navbar";
import { Box, Container} from "@mui/material";
import { ReactNode } from "react";

export default async function Layout ({params, children} : {params: Promise<{eventId : number}>, children : ReactNode}) {

    const {eventId} = await params;

    return (
        <>
        <Navbar />
        <Container>
            <Box>
                <EventHeader eventId={eventId}/>
            </Box>

            {children}
        </Container>
        </>
    )
}