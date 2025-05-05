import { CircleArrowLeft, CircleArrowRight, DollarSign, DownloadCloud, Rotate3d, Rotate3D, RotateCcw, RotateCw } from "lucide-react"
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
<article  className='flex items-center gap-2 border-b py-2  justify-between'>
  <div>
    <p  className='text-sm sm:text-base font-semibold capitalize'>relatório geral do ano</p>
    <span  className='text-[12px] sm:text-sm text-gray-400'>27/04/2025</span>
  </div>
  <div  className='flex items-center justify-center gap-6'>

  <div className='flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row' >
         <p className='text-sm sm:text-base font-semibold'>transferir</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'>
        <DownloadCloud className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/>
      </span>
      </div>
  </div>
</article>

<article  className='flex items-center gap-2 border-b py-2  justify-between'>
  <div>
    <p  className='text-sm sm:text-base font-semibold capitalize'>relatório geral do ano</p>
    <span  className='text-[12px] sm:text-sm text-gray-400'>27/04/2025</span>
  </div>
  <div  className='flex items-center justify-center gap-6'>

  <div className='flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row' >
         <p className='text-sm sm:text-base font-semibold'>transferir</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'>
        <DownloadCloud className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/>
      </span>
      </div>
  </div>
</article>

<article  className='flex items-center gap-2 border-b py-2  justify-between'>
  <div>
    <p  className='text-sm sm:text-base font-semibold capitalize'>relatório geral do ano</p>
    <span  className='text-[12px] sm:text-sm text-gray-400'>27/04/2025</span>
  </div>
  <div  className='flex items-center justify-center gap-6'>

  <div className='flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row' >
         <p className='text-sm sm:text-base font-semibold'>transferir</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'>
        <DownloadCloud className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/>
      </span>
      </div>
  </div>
</article>

<article  className='flex items-center gap-2 border-b py-2  justify-between'>
  <div>
    <p  className='text-sm sm:text-base font-semibold capitalize'>relatório geral do ano</p>
    <span  className='text-[12px] sm:text-sm text-gray-400'>27/04/2025</span>
  </div>
  <div  className='flex items-center justify-center gap-6'>

  <div className='flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row' >
         <p className='text-sm sm:text-base font-semibold'>transferir</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'>
        <DownloadCloud className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/>
      </span>
      </div>
  </div>
</article>

<article  className='flex items-center gap-2 border-b py-2  justify-between'>
  <div>
    <p  className='text-sm sm:text-base font-semibold capitalize'>relatório geral do ano</p>
    <span  className='text-[12px] sm:text-sm text-gray-400'>27/04/2025</span>
  </div>
  <div  className='flex items-center justify-center gap-6'>

  <div className='flex items-center flex-col justify-center gap-3 mr-9 sm:flex-row' >
         <p className='text-sm sm:text-base font-semibold'>transferir</p>
        <span className='text-[12px] sm:text-sm text-gray-400 cursor-pointer'>
        <DownloadCloud className='w-4 h-4 text-primary font-bold sm:w-5 sm:h-5'/>
      </span>
      </div>
  </div>
</article>
</CardContent>
    </Card>
  )
}

export default Doc
