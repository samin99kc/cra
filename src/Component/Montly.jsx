import React from "react";

import TableIndex from "../Table/TableIndex";
const Montly = (props) => {

  return (
    <div className="table-data">
      <TableIndex header={["Month","Contract Hours","Actual Hours"]}
      wise={props.monthWise} />
      </div>
  
            
          
  );
};

export default Montly;
