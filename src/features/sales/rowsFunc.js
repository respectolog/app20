import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectVisMassive,
  selectDaysMassive,
  changeGrafData,
} from "./mainAppSlice";

export function Rows(props) {
  const rowChecked = useSelector(selectVisMassive);
  const daysMassive = useSelector(selectDaysMassive);
  const today = props.today;
  const selectedDay = props.selectDay;
  const dayDate = new Date(today);
  const getYesterday = new Date(dayDate.setDate(dayDate.getDate() - 1)); // тут надо будет переделать
  const getSelectedDay = new Date(selectedDay); // когда сделаю выбор даты
  let anotherDay = [
    getSelectedDay.getFullYear(),
    getSelectedDay.getMonth() + 1,
    getSelectedDay.getDate(),
  ];
  let yesterday = [
    getYesterday.getFullYear(),
    getYesterday.getMonth() + 1,
    getYesterday.getDate(),
  ];
  anotherDay = anotherDay.join("-"); //одно из значений
  yesterday = yesterday.join("-"); //будет выбранным днём
  const dispatch = useDispatch();

  for (let dataDay of daysMassive) {
    //использую for-ы потому что забыл синтаксис который ты мне показывала :(
    if (dataDay["date"].value === today) {
      var column1 = dataDay;
    } else if (dataDay["date"].value === yesterday) {
      var column2 = dataDay;
    } else if (dataDay["date"].value === anotherDay) {
      var column3 = dataDay;
    }
  }

  var rows = Object.keys(column1).map((item) => {
    if (item !== "date" && rowChecked[item].value === true) {
      //рендеринг конечно условный но мне кажется не сильно красиво получилось
      return (
        <tr
          key={item}
          id={item}
          onClick={(event) => dispatch(changeGrafData(event.currentTarget.id))}
        >
          <td>{column1[item].name}</td>
          <td>{column1[item].value}</td>
          <Procents todayValue={column1[item].value} day={column2} id={item} />
          <Procents todayValue={column1[item].value} day={column3} id={item} />
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
  let val = props.todayValue;
  let day = props.day;
  let id = props.id;
  let proc = 0;
  let back = "";

  let secVal = day[id].value;
  if (val > secVal) {
    proc = ((val - secVal) / secVal) * 100;
    if (proc > 5) {
      back = "green-back";
    }
    return (
      <td className={back}>
        {secVal}
        <span className="green-text">+{proc.toFixed(2)}%</span>
      </td>
    );
  } else if (val < secVal) {
    proc = ((val - secVal) / secVal) * 100;
    if (proc < -5) {
      back = "red-back";
    }
    return (
      <td className={back}>
        {secVal}
        <span className="red-text">{proc.toFixed(2)}%</span>
      </td>
    );
  } else {
    return <td>{secVal}</td>;
  }
}
