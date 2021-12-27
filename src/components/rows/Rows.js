import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectVisMassive,
  selectDaysMassive,
  changeGrafData,
} from "../../utils/mainAppSlice";

export function Rows(props) {
  const dispatch = useDispatch();
  const { today, selected_day } = props;
  const rowChecked = useSelector(selectVisMassive);
  const days_massive = useSelector(selectDaysMassive);

  const [columns, setColumns] = useState({
    column1: {},
    column2: {},
    column3: {}
  });

  useEffect(() => {

      const day_date = new Date(today);
      const get_yesterday = new Date(day_date.setDate(day_date.getDate() - 1));
      const get_selected_day = new Date(selected_day);
      let another_day = ([
        get_selected_day.getFullYear(),
        get_selected_day.getMonth() + 1,
        get_selected_day.getDate(),
      ]).join("-");
      let yesterday = ([
        get_yesterday.getFullYear(),
        get_yesterday.getMonth() + 1,
        get_yesterday.getDate(),
      ]).join("-");

      const cols = {
        column1: {},
        column2: {},
        column3: {}
      }

      for (let dataday of days_massive) {
        if (dataday.date === today) {
          cols.column1 = dataday;
        }
         if (dataday.date === yesterday) {
          cols.column2 = dataday;
        }
        if (dataday.date === another_day) {
          cols.column3 = dataday;
        }
      }
      setColumns(cols);

  },[today, selected_day, days_massive]);

  let rows = Object.keys(columns.column1).map((item) => {

    if (item !== "date" && rowChecked[item].value === true) {
      return (
        <tr
          key={item}
          id={item}
          onClick={(event) => dispatch(changeGrafData(event.currentTarget.id))}
        >
          <td>{rowChecked[item].name}</td>
          <td>{columns.column1[item]}</td>
          <Procents today_value={columns.column1[item]} day={columns.column2} id={item} />
          <Procents today_value={columns.column1[item]} day={columns.column3} id={item} />
        </tr>
      );
    } else {
      return null;
    }
  });
  return rows;
}

function Procents(props) {
  //заменил старую функцию процентов и сделал её не экспортной потому что она отсюда же вызывается
  let { today_value, day, id} = props;
  let proc = 0;
  let back = "";
  let sec_value = day[id];
  if (today_value > sec_value) {
    proc = ((today_value - sec_value) / sec_value) * 100;
    if (proc > 5) {
      back = "green-back";
    }
    return (
      <td className={back}>
        {sec_value}
        <span className="green-text">+{proc.toFixed(2)}%</span>
      </td>
    );
  } else if (today_value < sec_value) {
    proc = ((today_value - sec_value) / sec_value) * 100;
    if (proc < -5) {
      back = "red-back";
    }
    return (
      <td className={back}>
        {sec_value}
        <span className="red-text">{proc.toFixed(2)}%</span>
      </td>
    );
  } else {
    return <td>{sec_value}</td>;
  }
}
