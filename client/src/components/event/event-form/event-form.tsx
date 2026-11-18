"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventInput, EventOutput, eventSchema } from "./event-form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import ControlField from "@/components/form/controller-field/control-field";
import ControllerRadio from "@/components/form/controller-radio/controller-radio";
import styles from "./event-form.module.css";

interface EventFormProp {
  defaultValues?: Partial<EventInput>;
  onSuccess: (data: EventOutput) => void;
  handleClose: () => void;
}
export default function EventForm({
  defaultValues,
  onSuccess,
  handleClose,
}: EventFormProp) {
  const { control, handleSubmit } = useForm<EventInput, unknown, EventOutput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
        publish: false,
        title : "",
        description: "",
        startTime : "",
        endTime : "",
        location : "",
      ...defaultValues,
    },
  });

  const options = [
    {
      label: "Publish",
      value: true,
    },
    {
      label: "Draft",
      value: false,
    },
  ];

  const onSubmit: SubmitHandler<EventOutput> = (data) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"row"} sx={{ flexWrap: "wrap" }} useFlexGap spacing={3}>
        <Box className={styles.components}>
          <ControlField name="title" control={control} label="Title" />
        </Box>

        <Box sx={{flex: '1 1 700px'}}>
          <ControlField
            name="description"
            control={control}
            label="description"
            multiline
            rows={3}
          />
        </Box>

        <Box sx={{ flex: "1 1 100px" }}>
          <ControllerRadio
            name="publish"
            control={control}
            label="Publish Event?"
            options={options}
          />
        </Box>

        <Box sx={{ flex: "1 1 200px" }}>
          <ControlField
            name="startTime"
            control={control}
            label="Start time"
            type="date"
          />
        </Box>

        <Box  sx={{ flex: "1 1 200px" }}>
          <ControlField
            name="endTime"
            control={control}
            label="End Time"
            type="date"
          />
        </Box>

        <Box sx={{ flex: "1 1 200px" }}>
          <ControlField name="location" control={control} label="Location" />
        </Box>
      </Stack>

      <Stack sx={{ pt: 4, flexDirection :'row-reverse', alignItems:'center', gap: 1 }} direction={"row"} spacing={1}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button type="outlined" onClick={handleClose} variant="outlined">
          cancel
        </Button>
      </Stack>
    </form>
  );
}
