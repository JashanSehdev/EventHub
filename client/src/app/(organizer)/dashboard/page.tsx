import CreateEvent from "@/components/event/create-event/create-event";
import ListEvents from "@/components/event/list-events/list-events";
import { Container } from "@mui/material";


export default function DashbardPage () {
    return (
        <Container>
            <CreateEvent/>
            <ListEvents/>
        </Container>
    )
}