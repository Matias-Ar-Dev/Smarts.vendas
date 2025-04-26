import { Outlet } from "react-router-dom";
import Sm from "../../assets/sm.png"
export function AuthLayoutUser(){
    return (
        < div className="h-screen flex ">
        <div className=" hidden sm:w-4/5 bg-orange-500 sm:hidden md:flex flex-col">
        <img src={Sm} className="w-full px-8 mt-8 rounded-full"  />
        <div className="flex items-center justify-center mt-4 flex-col">
            <h2 className="tracking-tighter text-white font-semibold text-1xl">
                smarts.vendas
            </h2>
            <p className="text-white">Vendas de smarts-phone e acessorios tecnologicos . </p>
        </div>

             
              </div>
        <div className="w-full flex flex-col items-center justify-center sm:w-full bg-white md:w-1/2">
          <Outlet/>
        </div>
      </div>
    )
}