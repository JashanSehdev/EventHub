import CreateEvent from "@/components/event/create-event/create-event";
import ListCreatedEvents from "@/components/event/list-created-events/list-created-events";
import ListEvents from "@/components/event/list-events/list-events";
import { Container } from "@mui/material";


export default function DashbardPage () {
    return (
        <Container sx={{paddingTop: '3rem'}}>
            <CreateEvent/>
            <ListCreatedEvents/>
        </Container>
    )
}