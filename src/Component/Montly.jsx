
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Montly = () => {
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
  };
  useEffect(() => {
    fetchEmployeeTasks();  
    fetchContractedHours()
  },[]);
  const datas = {}
  const monthWise = employeeTasks.reduce((acc, tasks)=>{
   
    const key = moment.months(new Date(tasks['task_date']).getMonth())
    const day = moment(new Date(tasks['task_date'])).format('dddd')
    const actualHour = tasks.actual_out && moment((tasks.actual_out)).diff(tasks.actual_in, 'minutes')
    datas[key] = datas[key]? [...datas[key], {
      actualHours: tasks.actual_in,
      actual_out: tasks.actual_out,
      task_date: tasks.task_date
    }]: [{
      actualHours: tasks.actual_in,
      actual_out: tasks.actual_out,
      task_date: tasks.task_date
    }]
    if(acc[key]){
      acc[key] = {
        ...acc[key], 
        contractedHours: acc[key].contractedHours + contractTable[day],
        actualHours: +((acc[key].actualHours + (actualHour || 0)/60)).toFixed(2)
      }

    }
    else{
      acc[key] = {
        contractedHours: contractTable[day],
        actualHours: +((actualHour || 0)/60).toFixed(2)
      }
    }
 
  
    return acc
  }, {})

 console.log(datas)
  return (
    <div className="table-data">
            <table style={{width: '100%', height: '100%'}}>
              <tbody>
                <tr style={{width: '100%', height: '100%' ,color: '#FFFFFF' , backgroundColor: '#0692d5'}}>
                  <th>Month</th>
                  <th>Concat Hour</th>
                  <th>Actual Hour</th>
                </tr>
            
                {Object.keys(monthWise).map((item,index) => {
                     
                        return (
                          <tr style={{textAlign:"center"}}>
                          <td>{item}</td>
                          <td><p>{monthWise[item].contractedHours}</p><p style = {{color: 'red', fontSize: '12px'}}>{(monthWise[item].actualHours - monthWise[item].contractedHours).toFixed(2)}</p></td>
                          <td>{monthWise[item].actualHours}</td>
                        </tr>
                        )
                      })
                }
                 <tr style={{width: '100%', height: '100%' ,color: '#FFFFFF' , backgroundColor: '#0692d5'}}>
                  <th>Total</th>
                  <th>{Object.keys(monthWise).map((item,index) =>monthWise[item].contractedHours).reduce((acc,hr)=>{
                   return acc += hr
                  },0)}
                  <br/>
                  <p style = {{color: '#e62a2a', fontSize: '12px'}}>
                  {Object.keys(monthWise).map((item,index) =>(monthWise[item].actualHours - monthWise[item].contractedHours)).reduce((acce,hree)=>{
                   return acce += +hree
                  },0).toFixed(2)} hrs
                  </p> 
                  </th>        
                  <th> {Object.keys(monthWise).map((item,index) =>monthWise[item].actualHours).reduce((ac,hre)=>{
                   return ac += +hre
                  },0).toFixed(2)} hrs
                    </th>
                </tr>
              </tbody>
            </table>
          </div>
  );
};

export default Montly;
