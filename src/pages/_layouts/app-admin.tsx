
import { Header_Admin } from "@/components/header/header_admin";
import { Outlet } from "react-router-dom";

export  function AppLayoutAdmin(){
  return(
    <div className=" flex w-full flex-col bg-muted/400" >
      <Header_Admin/>
    
        <Outlet/>
      </div>
    
  )
}