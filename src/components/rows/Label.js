import { useDispatch } from "react-redux";
import { changeVisibility } from "../../utils/mainAppSlice";

export function Label(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const item_name = props.itemname;

  return (
    <label>
      {item.name}
      <input
        name={item.name}
        type="checkbox"
        checked={item.value}
        onChange={() => dispatch(changeVisibility(item_name))}
      />
    </label>
  );
}
