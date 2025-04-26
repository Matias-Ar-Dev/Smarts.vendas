// import { createContext, ReactNode, useEffect, useState } from "react";
// import { api } from "../lib/axios";

// interface Health_Status
// {
//     healthStatus:[
//         {
//            id: number,
//            created_at:string,
//            blood_pressure:number,
//            blood_glucose: number,
//            cholesterol:number,
//            weigth: number,
//            status_now: 'BAD'|'GOOD'|'NORMAL'
//            triglycerides: number,
//            userId: string
//         }
//     ]
// } 


// interface HealthContextType {
    
//   HealthStatus:Health_Status[] 
//   FetchHealthStatus: ()=> Promise<void>
//   createNewHealthStatus : (data:CreateHealthInputs)=>Promise<void>
// }

// interface CreateHealthInputs{
//     blood_pressure: number;
//     blood_glucose:number
//     cholesterol:number , 
//     weigth:number,
//     triglycerides:number
// }

// interface TransactionsProviderProps
// {
//     children:ReactNode
// }
// export const  HealthStatusContext = createContext({} as HealthContextType)

// export function HealthStatusProvider({children}:TransactionsProviderProps){
//     const userId = localStorage.getItem('userId')
//     const [HealthStatus , setHealthStatus] = useState<Health_Status[]>([]) //tipei o meu estado

   
//      async function FetchHealthStatus(){
//         const response = await api.get(`/fetch/${userId}`)
//         console.log(response.data)
//         setHealthStatus(response.data)
//     }
    
//     async function createNewHealthStatus(data: CreateHealthInputs){
        
//         const { blood_glucose,blood_pressure,cholesterol,triglycerides,weigth} = data
        
//         const response =  await api.post(`/health/${userId}`,{
//             blood_glucose,blood_pressure,cholesterol,triglycerides,weigth
//         })
//         setHealthStatus(state=>[response.data,...state, ])
//         console.log(response.data)
//     }

//     useEffect(()=>{
//         FetchHealthStatus()
//     },[]) //useEffect esta garantindo que esse endpoint nao seja executado varias vezes
//     return(

//         <HealthStatusContext.Provider value={
//             {
//             HealthStatus,
//                createNewHealthStatus,
//                 FetchHealthStatus
                
//                 }} >
//            {children}
//         </HealthStatusContext.Provider>
//     )
// }