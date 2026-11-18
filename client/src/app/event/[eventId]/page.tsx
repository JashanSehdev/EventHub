'use client'
import RegistrationsTable from "@/components/registrations/registration-table/registration-table";
import { RoleEnum } from "@/enum/user.enum";
import { useAppSelector } from "@/features/store";

export default function Page () {
    const {user} = useAppSelector((state) => state.auth)

    if (!user || user.role !== RoleEnum.ORGANIZER) return null 
    return <>
        <RegistrationsTable eventId={5}/>
    </>
}