import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Archive,
  Bell,
  HomeIcon,
  LogOut,
  LucideLogIn,
  MessageSquare,
  Package,
  PanelBottom,
  Settings2,
  ShoppingBag,
  User2,
  UserCheck,
  UserCog,
  Users,
  Users2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { EddUser } from "../edduser_list_doc/edd_users";
import { Terminar_se } from "../edduser_list_doc/terminar_s";
export function Header_Admin (){
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;
   
    return (<>
     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
    
    <nav className=" flex flex-col items-center gap-4 px-2 py-5">
    <TooltipProvider>
    
    <Link to='/'
     className=" flex h-9 w-9 shrink-0 items-center justify-center bg-orange-500 text-primary-foreground rounded-full" >
    
    <Package className="w-4 h-4"/>
    <span className="sr-only">Dashboard Avatar</span>
    </Link>
    
    <Tooltip>
        <TooltipTrigger asChild> 
    
    <Link to='/'
    className={` flex h-9 w-9 shrink-0 items-center justify-center   text-muted-foreground transition-colors hover:text-foreground rounded-lg ${isActive('/') ?'bg-orange-300 border-orange-500 border-t-[4px]  ':'bg-orange-500'} `} >
    <HomeIcon  className= {`h-5 w-5 transition-all  ${isActive('/') ? ` text-black`:''}    `} />
    <span className="sr-only">Inicio</span>
    </Link>

        </TooltipTrigger>
        <TooltipContent side="right">
            
    Inicio
        </TooltipContent>
    </Tooltip>
    
    
    <Tooltip>
        <TooltipTrigger asChild>
    
        <Link to='/notif'   className={` flex h-9 w-9 shrink-0 items-center justify-center   text-muted-foreground transition-colors hover:text-foreground rounded-lg ${isActive('/notif') ?'bg-orange-300 border-orange-500 border-t-[4px]  ':'bg-orange-500'} `} >
    
    <Bell  className= {`h-5 w-5 transition-all  ${isActive('/notfi') ? ` text-black`:''}    `} />
    <span className="sr-only">Notificação</span>
    </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
            
    Notificação
        </TooltipContent>
    </Tooltip>
    
    
    
    <Tooltip>
        <TooltipTrigger asChild>
    
        <Link to='/clies'    className={` flex h-9 w-9 shrink-0 items-center justify-center   text-muted-foreground transition-colors hover:text-foreground rounded-lg ${isActive('/clies') ?'bg-orange-300 border-orange-500 border-t-[4px]  ':'bg-orange-500'} `} >
    
    <Archive  className= {`h-5 w-5 transition-all  ${isActive('/clies') ? ` text-black`:''}    `} />
    <span className="sr-only">Arquivos</span>
    </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
            
    Arquivos
        </TooltipContent>
    </Tooltip>
    
    
    <Tooltip>
        <TooltipTrigger asChild>
    
        <Link to='/users_admin'   className={` flex h-9 w-9 shrink-0 items-center justify-center   text-muted-foreground transition-colors hover:text-foreground rounded-lg ${isActive('/users_admin') ?'bg-orange-300 border-orange-500 border-t-[4px]  ':'bg-orange-500'} `} >
    
    <User2  className= {`h-5 w-5 transition-all  ${isActive('/users_admin') ? ` text-black`:''}    `} />
    <span className="sr-only">users</span>
    </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
            
    users
        </TooltipContent>
    </Tooltip>
    
    
    
    </TooltipProvider>
    </nav>
    <nav className="mt-auto flex flex-col items-center justify-center gap-4 px-2 py-5">
    
        <TooltipProvider>
               
    <Tooltip>
        <TooltipTrigger asChild>
    
        <Link to='/' className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full  bg-orange-500 text-muted-foreground transition-colors hover:text-white " >
    
    <UserCog className="w-5 h-5 "/>
    <span className="sr-only">Editar</span>
    </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
            
    Editar
        </TooltipContent>
    </Tooltip>
            
        </TooltipProvider>
        <Dialog>
        <DialogTrigger asChild>
            <div className=" flex h-9 w-9 shrink-0 items-center justify-center  bg-orange-500 text-muted-foreground transition-colors hover:text-white rounded-full" >
            <LucideLogIn className="w-4 h-4"/> 
            </div>

        </DialogTrigger>
        <Terminar_se/>
    </Dialog>
    </nav>

    
    </aside>
    
    {/* divisão */}
          <div className="sm:hidden flex flex-col  sm:py-4 sm:pl-14">
            
            <header className="sticky top-0 z-30 flex items-center  h-14   px-4 border-b  gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelBottom className="w-5 h-5 " />
                    <span className=" sr-only">Abrir</span>
                  </Button>
                </SheetTrigger>
    
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      to="/erro"
                      className={` flex h-10 w-10  bg-orange-500 rounded-full items-center justify-center text-lg text-primary-foreground md:text-base gap-2 `}
                    >
                      <Package className="h-5 w-5 transition-all" />
                      <span className="sr-only">Logo do projecto</span>
                    </Link>
                    <Link
                      to="/"
                      className={` flex items-center gap-4 px-2.5 text-gray-500 hover:text-black ${isActive('/') ? ` text-black`:''}  `}
                    >
                      <HomeIcon className= {`h-5 w-5 transition-all  ${isActive('/') ? ` text-black`:''}    `} />
                      <span className={` ${isActive('/') ? ` text-black`:''} `}>inicio</span>
                    </Link>
                    <Link
                      to="/notfi"
                      className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground  "
                    >
                      <Bell className={`h-5 w-5 transition-all ${isActive('/notfi') ? ` text-black`:''}`} />
                     <span className={` ${isActive('/notfi') ? ` text-black`:''} `}>  notificações</span>
                   </Link>
                    <Link
                      to="/clies"
                      className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground  "
                    >
                      <Archive className= {`h-5 w-5 transition-all ${isActive('/notfi') ? ` text-black`:''}`} />
                      <span  className={` ${isActive('/clies') ? ` text-black`:''} `}>
                      Arquivos
                      </span>
                    </Link>
                    <Link
                      to="/users_admin"
                      className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground  "
                    >
                      <User2  className= {`h-5 w-5 transition-all ${isActive('/users') ? ` text-black`:''}`} />
                     <span  className={` ${isActive('/users') ? ` text-black`:''} `}>
                     usuarios

                      </span>
                    </Link>
                   
                  </nav>
                </SheetContent>
              </Sheet>
              <h2>Menu</h2>
            </header>
          </div>

    </>)

}