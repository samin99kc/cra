import React from 'react'
import moment from "moment";
import useApi from "../CustomHooks/useApi";
import TableIndex from '../Table/TableIndex'
const Day = () => {
  const apitest=useApi();
  const datas = {}
  const dayWise = apitest[0].reduce((acc, tasks)=>{
    // const key = moment(new Date(tasks['task_date'])).day().format()
    const key = moment(new Date(tasks['task_date'])).format('dddd')
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
        contractedHours: acc[key].contractedHours + apitest[1][key],
        actualHours: +((acc[key].actualHours + (actualHour || 0)/60)).toFixed(2)
      }

    }
    else{
      acc[key] = {
        contractedHours: apitest[1][key],
        actualHours: +((actualHour || 0)/60).toFixed(2)
      }
    }
 
  
    return acc
  }, {})

  return (
    <div className="table-data">
    <TableIndex header={["Day", "Contract Hours","Actual Hours"]}
    wise={dayWise}
    />
 </div>
  )
}

export default Day