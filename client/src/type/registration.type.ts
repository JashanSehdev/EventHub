import { StatusEnum } from "@/enum/user.enum";

export interface IRegistrations {
  registrationId: number;
  eventId: number;
  userId: number;
  username: string;
  email: string;
  avatar: string;
  status: StatusEnum;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationFilters {
    search ?: string,

}