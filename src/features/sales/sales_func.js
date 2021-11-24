export function Dinamika(props) {
  let temp = props.mass;
  let id = props.id;
  console.log(props);

  return temp
    .map(function (item) {
      if(id === "beznal"){
        return item.beznal;
      }else if (id === "nal") {
        return item.nal;
      }else if (id === "kreditki") {
        return item.kreditki;
      }else if (id === "udaldo") {
        return item.udaldo;
      }else if (id === "udalposle") {
        return item.udalposle;
      }else if (id === "gostey") {
        return item.gostey;
      }else if (id === "chekov") {
        return item.chekov;
      }else if (id === "sredcheck") {
        return item.sredcheck;
      }else if (id === "sredguest") {
        return item.sredguest;
      }




    })
    .join(", ");
}
export function Procent(props){
  let x = props.day1;
  let y = props.day2;
  let z = 0;
  let back = "";
  if(x > y){
    z = (x - y)/y * 100;
    if(z > 5){back = "green-back";}
    return(
      <td className={back}>{y}<span className="green-text">+{z.toFixed(2)}%</span></td>
    );
  }
  else if (x < y) {
    z = (x - y)/ y * 100;
      if(z < -5){back = "red-back";}
    return(
      <td className={back}>{y}<span className="red-text">{z.toFixed(2)}%</span></td>
    );
  }else{
    return (<td>{y}</td>);
  }
}
