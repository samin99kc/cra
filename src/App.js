import Montly from './Component/Montly';
import React from 'react';
import { Week } from './Component/Week';
import Day from './Component/Day';
import moment from "moment";
import useApi from './CustomHooks/useApi';
function App(props) {
  const apitest=useApi();
  const datas = {}
  const monthWise = apitest[0].reduce((acc, tasks)=>{
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
        contractedHours: acc[key].contractedHours + apitest[1][day],
        actualHours: +((acc[key].actualHours + (actualHour || 0)/60)).toFixed(2)
      }

    }
    else{
      acc[key] = {
        contractedHours: apitest[1][day],
        actualHours: +((actualHour || 0)/60).toFixed(2)
      }
    }
 
  
    return acc
  }, {})
  return (
    <div className="App">
      <Montly monthWise={monthWise}/>
      <br/>
      <br/>
      <Week months={Object.keys(monthWise).map((item,index) => item)}/>
      <br/>
      <br/>
      <Day/>
    </div>
  )
}

export default App;
