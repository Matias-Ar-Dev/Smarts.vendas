import { CircleArrowLeft, CircleArrowRight, DollarSign, Rotate3d, Rotate3D, RotateCcw, RotateCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card" 
function Doc() {
  return (
    <Card className="w-full md:w-1/2 max-w-600px">
<CardHeader> 

<div className="flex items-center justify-center">
    <CardTitle className="text-lg sm:text-xl text-gray-800">
    Trasnferências de Documentos
    </CardTitle>
    <div className="ml-auto w-4 h-4">
     <span className="cursor-pointer"><CircleArrowRight className="text-orange-500"/></span>
    </div>

</div>
</CardHeader>
<CardContent>

</CardContent>
    </Card>
  )
}

export default Doc
