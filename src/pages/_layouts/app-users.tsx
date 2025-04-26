import { Header_users } from "@/components/header/header-user";
import { Outlet } from "react-router-dom";

export function AppLayoutUsers(){
    return (
        <div className=" flex w-full flex-col bg-muted/400">
        <Header_users/>
        <Outlet/>
        
        </div>
    )
}