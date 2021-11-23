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
  if(x > y){
    z = (x - y)/y * 100;
    return(
      <span className="green-text">+{z.toFixed(2)}%</span>
    );
  }
  else if (x < y) {
    z = (x - y)/ y * 100;
    return(
      <span className="red-text">{z.toFixed(2)}%</span>
    );
  }else{
    return "";
  }
}
