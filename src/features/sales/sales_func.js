import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import {
  selectVizMassive, selectSalesMassive,
} from './labelsSlice';
import { changeVisability } from "./labelsSlice";
import { changeData } from "./graficSlice";

//пока и labels и Rows в одном файле но я их разделю

export function Labels(){   //тут всё просто вроде получилось
  const rowChecked = useSelector(selectVizMassive);
  const dispatch = useDispatch();

  return(
     rowChecked.map((item) => {
       return(
        <label key={item.id}>
          {item.name}
          <input
            name={item.id}
            type="checkbox"
            checked={item.value}
            onChange={() => dispatch(changeVisability(item))}
          />
        </label>
      );
     }
    )
  );
}

export function Rows(){ //а тут немногоо непросто как то
  const rowChecked = useSelector(selectVizMassive);
  const sales = useSelector(selectSalesMassive);
  const day1 = "2021-11-16"; //дата поставлена условно, здесь через пропсы думаю получать дату при её выборе
  const dayDate = new Date(day1);
  const getYesterday = new Date(dayDate.setDate(dayDate.getDate() - 1)); // тут надо будет переделать
  const getWeekago = new Date(dayDate.setDate(dayDate.getDate() - 6)); // когда сделаю выбор даты
  let weekAgo = [ getWeekago.getFullYear(), getWeekago.getMonth()+1, getWeekago.getDate()];
  let yesterday = [ getYesterday.getFullYear(), getYesterday.getMonth()+1, getYesterday.getDate()];
  weekAgo = weekAgo.join('-');      //одно из значений
  yesterday = yesterday.join('-');  //будет выбранным днём
  const dispatch = useDispatch();

  for (let dataDay of sales) {      //использую for-ы потому что забыл синтаксис который ты мне показывала :(
    if(dataDay[0].value === day1 ){
      var column1 = dataDay;
    }else if (dataDay[0].value === yesterday) {
      var column2 = dataDay;
    }else if (dataDay[0].value === weekAgo) {
      var column3 = dataDay;
    }
}

var rows = column1.map((item) => {
  for (let check of rowChecked) {
    if (check.id === item.id){
      var viz = check.value;
    }
  }
  if (viz){ //рендеринг конечно условный но мне кажется не сильно красиво получилось
    return(
      <tr
        key={item.id}
        id={item.id}
        onClick={(event) => dispatch(changeData(event.currentTarget.id))}
      >
        <td>{item.name}</td>
        <td>{item.value}</td>
        <Procents
          todayValue={item.value}
          day={column2}
          id={item.id}
        />
        <Procents
          todayValue={item.value}
          day={column3}
          id={item.id}
        />
      </tr>
    )
  }else{
    return null;
  }
});
return rows;
}

function Procents(props){ //заменил старую функцию процентов и сделал её не экспортной потому что она отсюда же вызывается
  let val = props.todayValue;
  let day = props.day;
  let id = props.id;
  let proc = 0;
  let back = "";

  for (let item of day) {
    if(item.id === id){
      var secVal = item.value;
    }
  }
  if (val > secVal){
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
  }else if (val < secVal) {
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
  }else {
    return <td>{secVal}</td>;
  }

}
