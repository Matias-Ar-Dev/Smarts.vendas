import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function Terminar_se (){
    return(<>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Terminar sessão
              
            </DialogTitle>
            <div className="grid grid-cols-2 gap-3">
                    <Button> Não</Button>
                    <Button>sair</Button>
                </div>
        </DialogHeader>

    </DialogContent>
    </>)
}