
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { AlertCircle, BadgeDollarSign, Bell, DollarSign, FileText, Inbox, LogIn, Percent, Plus, Search, User2Icon, UserCheck, UserPlus, Users } from "lucide-react"
import { useEffect, useState } from "react"


export function Mobile (){

    const [userName, setUserName] = useState <String | null>(null)
     const [userEmail, setUserEmail] = useState<string | null>(null);

      useEffect(() => {
    setUserName(localStorage.getItem("name"));
    setUserEmail(localStorage.getItem("email"));
  }, []);
    
return (<>

 <section  className='sm:ml-14 pl-2 border-b-none sm:border-b '>
    <aside className=" bg-white hidden justify-between items-center sm:flex ">
    <div className="flex items-center gap-2">

<div className="flex items-center gap-2">
<h1 className="font-bold text-sm md:text-xl tracking-tight whitespace-nowrap">
smart.vendas
</h1>
</div>

</div>
    <div className="flex items-center gap-x-4">
            
              {
                userName && userEmail ? (
                    <div className="text-right p-2">
                        

                
                        <p className=" capitalize ">olá, {userName}</p>
                        <small className="text-gray-300">{userEmail}</small>
                         

                        
                        

                    </div>
                ):(
                    <p>Usuário não logado</p>
                )
            }


          
            <Button variant="outline" className="relative m-4 ">
                <p className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></p>
                <Bell className="h-6 w-6" />
            </Button>
           
            
            
        </div>
    </aside>
</section>
</>)
}