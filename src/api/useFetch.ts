import { api } from "@/lib/axios";
import { useEffect, useState } from "react";





export function useFetch<T = unknown> (url: string) {
     const [users, setUsers] = useState<T | null>(null);
     const [isFetching, setisFetching] = useState(true);

    useEffect(() => {
       api.get(url)
        .then(response =>{
            setUsers(response.data);
        })
        .finally(() => {
            setisFetching(false)
        })

    }, []) 
    return { users, isFetching}
}  