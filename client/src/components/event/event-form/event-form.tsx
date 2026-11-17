'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { EventInput, EventOutput, eventSchema } from "./event-form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import ControlField from "@/components/form/controller-field/control-field";
import ControllerRadio from "@/components/form/controller-radio/controller-radio";


interface EventFormProp {
    defaultValues ?: Partial<EventInput>,
    onSuccess : (data : EventOutput) => void
    handleClose : () => void
}
export default function EventForm ({
    defaultValues,
    onSuccess,
    handleClose
} : EventFormProp) {
    
    const {control, handleSubmit} = useForm<EventInput, unknown, EventOutput>({
        resolver : zodResolver(eventSchema),
        defaultValues: {
            ...defaultValues,
            publish:false
        }
    })

    const options = [
        {
            label : "Publish",
            value : true
        },
        {
            label : "Draft",
            value : false
        }
    ]

    const onSubmit : SubmitHandler<EventOutput> = (data) => {
        onSuccess(data)
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'} sx={{flexWrap: 'wrap'}} useFlexGap spacing={3}>
                
                <ControlField 
                    name = "title"
                    control = {control}
                    label = 'Title'
                />

                <ControlField 
                    name = "description"
                    control = {control}
                    label = 'description'
                    multiline
                    rows={3}
                />

                <ControllerRadio 
                    name = "publish"
                    control = {control}
                    label = 'Publish Event?'
                    options={options}
                />

                <ControlField 
                    name = "startTime"
                    control = {control}
                    label = 'Start time'
                    type="date"
                />

                <ControlField 
                    name = "endTime"
                    control = {control}
                    label = 'End Time'
                    type = "date"
                />

                <ControlField 
                    name = "location"
                    control = {control}
                    label = 'Location'
                />

                <Stack>
                    <Button variant="contained" type="submit" >
                        Submit
                    </Button>
                    <Button type="outlined" onClick={handleClose}>
                        cancel
                    </Button>
                </Stack>

            </Stack>
        </form>
    )
}