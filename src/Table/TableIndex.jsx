import React,{useState} from 'react'

import {Button, Table,TableBody,TableCell,TableHead, TableRow, Typography} from "@mui/material"
const TableIndex = (props) => {
  const [click,setClick] = useState(false)
  return (
    <div className="table-data">
    <Table>
    <TableHead>
      <TableRow>
      <TableCell colSpan={3} sx={{backgroundColor:"#800080",color:"#ffffff"}}>
        <Typography component={"h2"} sx={{display:"inline-block"}}> Clean Ad Walker  </Typography> 
      {
      props.months && props.months.map((item)=>(
<Button key={item.id} sx={{color:"#ffffff", textAlign:"center"}} onclick={()=>setClick(!click)}>{item}</Button>
      ))
      }
      </TableCell>
      </TableRow>
   <TableRow sx={{backgroundColor:"#d580ff"}}>
    {props.header.map((head)=>{
        return <TableCell>{head}</TableCell>
    })}
     </TableRow>
     </TableHead>
       <TableBody>

       {Object.keys(props.wise).map((item,index) => {
              return (
                <TableRow style={{textAlign:"center"}}>
                <TableCell>{item}</TableCell>
                <TableCell><p>{props.wise[item].contractedHours}</p><p style = {{color: 'red', fontSize: '12px'}}>{(props.wise[item].actualHours - props.wise[item].contractedHours).toFixed(2)}</p></TableCell>
                <TableCell>{props.wise[item].actualHours}</TableCell>
              </TableRow>
              )
            })
      }
<TableRow sx={{backgroundColor:"#d580ff"}}>
           <TableCell>Total</TableCell>
           <TableCell>{Object.keys(props.wise).map((item,index) =>props.wise[item].contractedHours).reduce((acc,hr)=>{
            return acc += hr
           },0)}
           <br/>
           <p style = {{color: '#e62a2a', fontSize: '12px'}}>
           {Object.keys(props.wise).map((item,index) =>(props.wise[item].actualHours - props.wise[item].contractedHours)).reduce((acce,hree)=>{
            return acce += +hree
           },0).toFixed(2)} hrs
           </p> 
           </TableCell>        
           <TableCell> {Object.keys(props.wise).map((item,index) =>props.wise[item].actualHours).reduce((ac,hre)=>{
            return ac += +hre
           },0).toFixed(2)} hrs
             </TableCell>
         </TableRow>
         </TableBody>
</Table>
</div>
  )
}

export default TableIndex