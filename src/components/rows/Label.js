import { useDispatch } from "react-redux";
import { changeVisibility } from "../../utils/mainAppSlice";

export function Label(props) {
  const dispatch = useDispatch();
  const item = props.item;
  return (
    <label>
      {item.name}
      <input
        name={item.id}
        type="checkbox"
        checked={item.value}
        onChange={() => dispatch(changeVisibility(item.id))}
      />
    </label>
  );
}
