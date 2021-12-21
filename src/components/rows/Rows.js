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
    function Changeday(){
      let day_date = new Date(today);
      let get_yesterday = new Date(day_date.setDate(day_date.getDate() - 1));
      let get_selected_day = new Date(selected_day);
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

      for (let dataday of days_massive) {
        if (dataday["date"].value === today) {
          setColumns((prevState) => ({
            ...prevState,
            column1: dataday,
          }));
        }
         if (dataday["date"].value === yesterday) {
           setColumns((prevState) => ({
             ...prevState,
             column2: dataday,
           }));
        }
        if (dataday["date"].value === another_day) {
          setColumns((prevState) => ({
            ...prevState,
            column3: dataday,
          }));
        }
      }

    };
    Changeday();
  },[today, selected_day, days_massive]);

  let rows = Object.keys(columns.column1).map((item) => {
    if (item !== "date" && rowChecked[item].value === true) {
      return (
        <tr
          key={item}
          id={item}
          onClick={(event) => dispatch(changeGrafData(event.currentTarget.id))}
        >
          <td>{columns.column1[item].name}</td>
          <td>{columns.column1[item].value}</td>
          <Procents today_value={columns.column1[item].value} day={columns.column2} id={item} />
          <Procents today_value={columns.column1[item].value} day={columns.column3} id={item} />
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
  let sec_value = day[id].value;
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
