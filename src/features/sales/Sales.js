import React, { useState } from "react";
import { Labels, Rows } from "./sales_func";
import "./Sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export function Salestable() {

  //перенёс отмеченные строки в стейт редукса
  //rowVisible вообще оказался не нужен
  const [optionsViz, setViz] = useState(false);

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
            <Labels/>{/* функция выводит список отмеченных строк*/}
        </div>
      </div>

      <table className="sales-table">
        <tbody>
          <tr className="table-legend">
            <td>Показатель</td>
            <td>Сегодня</td>
            <td>Вчера</td>
            <td>Неделю назад</td>
          </tr>
          <Rows/>{/* функция выводящая строки при условии что они отмечены */}
        </tbody>
      </table>
    </div>
  );
}
