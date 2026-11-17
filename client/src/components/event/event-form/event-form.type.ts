import z from "zod";

export const eventSchema = z.object({
    title : z.string().min(4, 'title must be at least 4 charaters'),
    description : z.string().min(4, 'description must be at least 4 charaters'),
    publish : z.boolean().default(false),
    startTime : z.string().min(6, 'start date required'),
    endTime : z.string().min(6, 'start date required'),
    location : z.string(),
})

export type EventInput = z.input<typeof eventSchema> 

export type EventOutput = z.infer<typeof eventSchema> 