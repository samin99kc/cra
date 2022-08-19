import React from "react";
import TableIndex from "../Table/TableIndex";
import moment from "moment";
import useApi from "../CustomHooks/useApi";
export const Week = (props) => {
  console.log(props.months,"pppp");
  const apitest = useApi();
  const datas = {};
  const WeekWise = apitest[0].reduce((acc, tasks) => {
    let weeks = moment(new Date(tasks["task_date"])).weeks() - moment(new Date(tasks["task_date"])).startOf('month').weeks() + 1;
weeks = (weeks + 52) % 52;
    const key = weeks;
    const day = moment(new Date(tasks["task_date"])).format("dddd");
    const actualHour =
      tasks.actual_out &&
      moment(tasks.actual_out).diff(tasks.actual_in, "minutes");
    datas[key] = datas[key]
      ? [
          ...datas[key],
          {
            actualHours: tasks.actual_in,
            actual_out: tasks.actual_out,
            task_date: tasks.task_date,
          },
        ]
      : [
          {
            actualHours: tasks.actual_in,
            actual_out: tasks.actual_out,
            task_date: tasks.task_date,
          },
        ];
    if (acc[key]) {
      acc[key] = {
        ...acc[key],
        contractedHours: acc[key].contractedHours + apitest[1][day],
        actualHours: +(acc[key].actualHours + (actualHour || 0) / 60).toFixed(
          2
        ),
      };
    } else {
      acc[key] = {
        contractedHours: apitest[1][day],
        actualHours: +((actualHour || 0) / 60).toFixed(2),
      };
    }

    return acc;
  }, {});

  return (
    <div className="table-data">
      <TableIndex
        header={["Week", "Contract Hours", "Actual Hours"]}
        wise={WeekWise}
        months={props.months}
      />
    </div>
  );
};
