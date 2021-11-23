import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeData } from "./graficSlice";
import data from "./data.json";
import { Procent } from "./sales_func";
import './Sales.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export function Salestable() {

  const datasales = data.days;
  const sales = datasales.map(function (item) {
    return {
      date: item.date,
      viruchka: item.nal+item.beznal+item.kreditki,
      nal: item.nal,
      beznal: item.beznal,
      kreditki: item.kreditki,
      udaldo: item.udaldo,
      udalposle: item.udalposle,
      gostey: item.gostey,
      chekov: item.chekov,
      sredcheck: ((item.nal+item.beznal+item.kreditki)/item.chekov).toFixed(),
      sredguest: ((item.nal+item.beznal+item.kreditki)/item.gostey).toFixed(),
    };
  });
  const dispatch = useDispatch();

  const [rowVisible, setVisible] = useState({
    viruchka: "visible",
    nal: "visible",
    beznal: "visible",
    kreditki: "visible",
    sredcheck: "visible",
    sredguest: "visible",
    udalposle: "visible",
    udaldo: "visible",
    chekov: "visible",
    gostey: "visible",
  });
  const [rowChecked, setChecked] = useState({
    viruchka: true,
    nal: true,
    beznal: true,
    kreditki: true,
    sredcheck: true,
    sredguest: true,
    udalposle: true,
    udaldo: true,
    chekov: true,
    gostey: true,
  });
  const [optionsViz, setViz] = useState(false);

  return (
    <div>
      <div className="top">
        <p>Общая статистика</p>
        <button onClick={() => setViz( optionsViz === false ? true : false)}> <FontAwesomeIcon icon={faCog} /> </button>
        <div className={optionsViz === true ? "options open": "options close"}>
          <p>Отображаемые строки</p>
          <label>
            Выручка
            <input
              name="viruchka"
              type="checkbox"
              checked={rowChecked.viruchka}
              onChange={() => {
                setVisible({...rowVisible, viruchka: rowVisible.viruchka === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked,viruchka: rowChecked.viruchka === true ? false : true,});
              }}
            />
          </label>
          <label>
            Нал
            <input
              name="nal"
              type="checkbox"
              checked={rowChecked.nal}
              onChange={() => {
                setVisible({...rowVisible, nal: rowVisible.nal === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, nal: rowChecked.nal === true ? false : true,});
              }}
            />
          </label>
          <label>
            Безнал
            <input
              name="beznal"
              type="checkbox"
              checked={rowChecked.beznal}
              onChange={() => {
                setVisible({...rowVisible, beznal: rowVisible.beznal === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, beznal: rowChecked.beznal === true ? false : true,});
              }}
            />
          </label>
          <label>
            Кредитки
            <input
              name="kreditki"
              type="checkbox"
              checked={rowChecked.kreditki}
              onChange={() => {
                setVisible({...rowVisible, kreditki: rowVisible.kreditki === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, kreditki: rowChecked.kreditki === true ? false : true,});
              }}
            />
          </label>
          <label>
            Средний чек
            <input
              name="sredcheck"
              type="checkbox"
              checked={rowChecked.sredcheck}
              onChange={() => {
                setVisible({...rowVisible, sredcheck: rowVisible.sredcheck === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked,sredcheck: rowChecked.sredcheck === true ? false : true,});
              }}
            />
          </label>
          <label>
            Средний гость
            <input
              name="sredguest"
              type="checkbox"
              checked={rowChecked.sredguest}
              onChange={() => {setVisible({...rowVisible, sredguest: rowVisible.sredguest === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, sredguest: rowChecked.sredguest === true ? false : true,});
              }}
            />
          </label>
          <label>
            Удалено после
            <input
              name="udalposle"
              type="checkbox"
              checked={rowChecked.udalposle}
              onChange={() => {
                setVisible({...rowVisible, udalposle: rowVisible.udalposle === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, udalposle: rowChecked.udalposle === true ? false : true,});
              }}
            />
          </label>
          <label>
            Удалено до
            <input
              name="udaldo"
              type="checkbox"
              checked={rowChecked.udaldo}
              onChange={() => {
                setVisible({ ...rowVisible, udaldo: rowVisible.udaldo === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, udaldo: rowChecked.udaldo === true ? false : true,});
              }}
            />
          </label>
          <label>
            Чеков
            <input
              name="chekov"
              type="checkbox"
              checked={rowChecked.chekov}
              onChange={() => {
                setVisible({...rowVisible, chekov: rowVisible.chekov === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked, chekov: rowChecked.chekov === true ? false : true,});
              }}
            />
          </label>
          <label>
            Гостей
            <input
              name="gostey"
              type="checkbox"
              checked={rowChecked.gostey}
              onChange={() => {
                setVisible({...rowVisible,gostey: rowVisible.gostey === "visible" ? "collapse" : "visible",});
                setChecked({...rowChecked,gostey: rowChecked.gostey === true ? false : true,});
              }}
            />
          </label>
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
          <tr
            id="viruchka"
            style={{ visibility: rowVisible.viruchka }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Выручка</td>
            <td>{sales[sales.length - 1].viruchka}</td>
            <td>{sales[sales.length - 2].viruchka}<Procent day1 = {sales[sales.length - 1].viruchka} day2={sales[sales.length - 2].viruchka}/></td>
            <td>{sales[sales.length - 8].viruchka}<Procent day1 = {sales[sales.length - 1].viruchka} day2={sales[sales.length - 8].viruchka}/></td>
          </tr>
          <tr
            id="nal"
            style={{ visibility: rowVisible.nal }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Нал</td>
            <td>{sales[sales.length - 1].nal}</td>
            <td>{sales[sales.length - 2].nal}<Procent day1 = {sales[sales.length - 1].nal} day2={sales[sales.length - 2].nal}/></td>
            <td>{sales[sales.length - 8].nal}<Procent day1 = {sales[sales.length - 1].nal} day2={sales[sales.length - 8].nal}/></td>
          </tr>
          <tr
            id="beznal"
            style={{ visibility: rowVisible.beznal }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Безнал</td>
            <td>{sales[sales.length - 1].beznal}</td>
            <td>{sales[sales.length - 2].beznal}<Procent day1 = {sales[sales.length - 1].beznal} day2={sales[sales.length - 2].beznal}/></td>
            <td>{sales[sales.length - 8].beznal}<Procent day1 = {sales[sales.length - 1].beznal} day2={sales[sales.length - 8].beznal}/></td>
          </tr>
          <tr
            id="kreditki"
            style={{ visibility: rowVisible.kreditki }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Кредитки</td>
            <td>{sales[sales.length - 1].kreditki}</td>
            <td>{sales[sales.length - 2].kreditki}<Procent day1 = {sales[sales.length - 1].kreditki} day2={sales[sales.length - 2].kreditki}/></td>
            <td>{sales[sales.length - 8].kreditki}<Procent day1 = {sales[sales.length - 1].kreditki} day2={sales[sales.length - 8].kreditki}/></td>
          </tr>
          <tr
            id="sredcheck"
            style={{ visibility: rowVisible.sredcheck }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Средний чек</td>
            <td>{sales[sales.length - 1].sredcheck}</td>
            <td>{sales[sales.length - 2].sredcheck}<Procent day1 = {sales[sales.length - 1].sredcheck} day2={sales[sales.length - 2].sredcheck}/></td>
            <td>{sales[sales.length - 8].sredcheck}<Procent day1 = {sales[sales.length - 1].sredcheck} day2={sales[sales.length - 8].sredcheck}/></td>
          </tr>
          <tr
            id="sredguest"
            style={{ visibility: rowVisible.sredguest }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Средний гость</td>
            <td>{sales[sales.length - 1].sredguest}</td>
            <td>{sales[sales.length - 2].sredguest}<Procent day1 = {sales[sales.length - 1].sredguest} day2={sales[sales.length - 2].sredguest}/></td>
            <td>{sales[sales.length - 8].sredguest}<Procent day1 = {sales[sales.length - 1].sredguest} day2={sales[sales.length - 8].sredguest}/></td>
          </tr>
          <tr
            id="udalposle"
            style={{ visibility: rowVisible.udalposle }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Удаление после</td>
            <td>{sales[sales.length - 1].udalposle}</td>
            <td>{sales[sales.length - 2].udalposle}<Procent day1 = {sales[sales.length - 1].udalposle} day2={sales[sales.length - 2].udalposle}/></td>
            <td>{sales[sales.length - 8].udalposle}<Procent day1 = {sales[sales.length - 1].udalposle} day2={sales[sales.length - 8].udalposle}/></td>
          </tr>
          <tr
            id="udaldo"
            style={{ visibility: rowVisible.udaldo }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Удаление до</td>
            <td>{sales[sales.length - 1].udaldo}</td>
            <td>{sales[sales.length - 2].udaldo}<Procent day1 = {sales[sales.length - 1].udaldo} day2={sales[sales.length - 2].udaldo}/></td>
            <td>{sales[sales.length - 8].udaldo}<Procent day1 = {sales[sales.length - 1].udaldo} day2={sales[sales.length - 8].udaldo}/></td>
          </tr>
          <tr
            id="chekov"
            style={{ visibility: rowVisible.chekov }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Чеков</td>
            <td>{sales[sales.length - 1].chekov}</td>
            <td>{sales[sales.length - 2].chekov}<Procent day1 = {sales[sales.length - 1].chekov} day2={sales[sales.length - 2].chekov}/></td>
            <td>{sales[sales.length - 8].chekov}<Procent day1 = {sales[sales.length - 1].chekov} day2={sales[sales.length - 8].chekov}/></td>
          </tr>
          <tr
            id="gostey"
            style={{ visibility: rowVisible.gostey }}
            onClick={(event) => dispatch(changeData(event.currentTarget.id))}
          >
            <td>Гостей</td>
            <td>{sales[sales.length - 1].gostey}</td>
            <td>{sales[sales.length - 2].gostey}<Procent day1 = {sales[sales.length - 1].gostey} day2={sales[sales.length - 2].gostey}/></td>
            <td>{sales[sales.length - 8].gostey}<Procent day1 = {sales[sales.length - 1].gostey} day2={sales[sales.length - 8].gostey}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
