import { useEffect,useState } from "react";
import axios from "axios";
export default function useApi(){
    useEffect(() => {
        fetchEmployeeTasks();  
        fetchContractedHours()
      },[]);
    const [employeeTasks, setEmployeeTasks] = useState([])
    const [contractTable, setContractTable] = useState({})
    
  const fetchContractedHours = async()=>{
    const response = await axios.get('https://lordashboard.scodus.com/api/employee-contracted-hours')
    setContractTable(response.data)
    
  }
    const fetchEmployeeTasks = async () => {
      const response = await axios.get(
        "https://lordashboard.scodus.com/api/employee-tasks"
      );
    
      setEmployeeTasks(response.data)
      console.log("sfsa",response.data)
    };


    return [employeeTasks,contractTable];
    
}