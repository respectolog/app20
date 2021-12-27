import React, { useState, useEffect  } from "react";
import { Label } from "../rows/Label";
import { Rows } from "../rows/Rows";
import "./Sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { selectDaysMassive, selectVisMassive } from "../../utils/mainAppSlice";
import { useSelector } from "react-redux";

export function Salestable() {
  const days = useSelector(selectDaysMassive);

  const rowChecked = useSelector(selectVisMassive);

  const [optionsViz, setViz] = useState(false);
  const [selectDate, setNewDate] = useState({
    checked: "2021-11-9",
    avalibleDates: days.map((item) => {
      return item.date;
    }),
  });
  useEffect(() => {
      let add_day = days.map((item) => {
        return item.date;
      });
      setNewDate((prevState) => ({
        ...prevState,
        avalibleDates: add_day,
      }));

  },[days]);

  function handleChange(event) {
    setNewDate({ ...selectDate, checked: event.target.value});
  }

  return (
    <div>
      <div className="top">
        <p>Общая статистика</p>
        <button onClick={() => setViz(!optionsViz)}>
          {" "}
          <FontAwesomeIcon icon={faCog} />{" "}
        </button>
        <div className={optionsViz ? "options open" : "options close"}>
          <div id="menu-head">Отображаемые строки</div>
          {Object.keys(rowChecked).map((item) => {
            return <Label key={item} item={rowChecked[item]} itemname={item}/>;
          })}
          {/* функция выводит список отмеченных строк*/}
        </div>
      </div>

      <table className="sales-table">
        <tbody>
          <tr className="table-legend">
            <td>Показатель</td>
            <td>Сегодня</td>
            <td>Вчера</td>
            <td>
              <select value={selectDate.checked} onChange={handleChange}>
                {selectDate.avalibleDates.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <Rows today="2021-11-16" selected_day={selectDate.checked} />
          {/* функция выводящая строки при условии что они отмечены */}
        </tbody>
      </table>
    </div>
  );
}
