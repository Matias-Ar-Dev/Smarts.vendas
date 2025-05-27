import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function Terminar_se_user (){
    return(<>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
               
                Terminar sessão
              
            </DialogTitle>
            <div className="w-full h-52 flex flex-col p-3 rounded-sm bg-orange-50 justify-center gap-4 ">
                  <Link to='/users_func'>
                  <Button className="w-full bg-orange-500 hover:bg-orange-300"> Não</Button>
                  </Link>  
                  <Link to='/sign-in'>
                    <Button className="w-full  bg-orange-500 hover:bg-orange-300">sair</Button>
                  </Link>
                  
                </div>
        </DialogHeader>

    </DialogContent>
    </>)
}