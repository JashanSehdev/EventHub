import z from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(4, "title must be at least 4 charaters"),
    description: z.string().min(4, "description must be at least 4 charaters"),
    publish: z.boolean().default(false),
    startTime: z.string().min(6, "start date required"),
    endTime: z.string().min(6, "start date required"),
    location: z.string().min(1, "location Required"),
  })
  .refine((data) => {
    const startDate = new Date(data.startTime);
    const now = new Date();

    return !isNaN(startDate.getTime()) && startDate > now;
  }, {
    message : 'Start Time should be in future',
    path : ['startTime']
  })
  .refine((data) => {
    const startDate = new Date(data.startTime);
    const endDate = new Date(data.endTime);

    return !isNaN(endDate.getTime()) && endDate > startDate;
  }, {
    message : 'EndTime should be after start time',
    path : ['endTime']
  })
  

export type EventInput = z.input<typeof eventSchema>;

export type EventOutput = z.infer<typeof eventSchema>;
