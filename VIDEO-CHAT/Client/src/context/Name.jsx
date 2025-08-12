import { createContext, useState } from "react";

export const nameContext = createContext('')

export const useHost = () => {
    const host = useContext(nameContext);
    return host;
};

export const NameProvider = ({childern})=>{
    
    const[host,setHost] = useState('')
    
    return(
    <nameContext.Provider value={{host,setHost}}>
        {childern}
    </nameContext.Provider>
)}
