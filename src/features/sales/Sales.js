import React, { useState } from "react";
import { Labels } from "./labelsFunc";
import { Rows } from "./rowsFunc";
import "./Sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { selectDaysMassive } from "./mainAppSlice";
import { useSelector } from "react-redux";

export function Salestable() {
  let days = useSelector(selectDaysMassive);
  days = days.map((item) => {
    return item["date"].value;
  });

  const [optionsViz, setViz] = useState(false);
  const [selectDate, setNewDate] = useState({
    checked: "2021-11-9",
    avalibleDates: days,
  });

  function handleChange(event) {
    setNewDate({ checked: event.target.value, avalibleDates: days });
  }

  return (
    <div>
      <div className="top">
        <p>Общая статистика</p>
        <button onClick={() => setViz(optionsViz === false ? true : false)}>
          {" "}
          <FontAwesomeIcon icon={faCog} />{" "}
        </button>
        <div className={optionsViz === true ? "options open" : "options close"}>
          <div id="menu-head">Отображаемые строки</div>
          <Labels />
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
          <Rows today="2021-11-16" selectDay={selectDate.checked} />
          {/* функция выводящая строки при условии что они отмечены */}
        </tbody>
      </table>
    </div>
  );
}
