'use client'
import { useAppSelector } from "@/features/store";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleEnum } from "@/enum/user.enum";


export default function Layout ({children} : {children : ReactNode}) {
    const {user}  = useAppSelector((state) => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (!user || user.role !== RoleEnum.ORGANIZER){
            router.back()
        }
    })
    return (
        <>
        {children}
        </>
    )
}