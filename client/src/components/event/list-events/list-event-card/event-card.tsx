import { IEvent } from "@/type/event.type"
import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material"
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

interface EventCardProp {
    event : IEvent
}
export default function EventCard ({   
    event
} : EventCardProp) {

    return(
        <Card sx={{minWidth: '300px', flex : '1 1 300px'}}>
            <CardHeader 
                title = {event.title}
            />

            <CardContent>
                <Stack direction={'row'} sx={{flexWrap : 'wrap'}} useFlexGap spacing={1}>
                    <Chip avatar={<PersonOutlinedIcon/>} label={event.registeredUsers} />
                <Chip avatar={<PersonOutlinedIcon/>} label={event.location} />
                </Stack>
                
            </CardContent>
        </Card>
    )
}