import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectVisMassive, changeVisibility } from "./mainAppSlice";

export function Labels() {
  const rowChecked = useSelector(selectVisMassive);
  const dispatch = useDispatch();

  return Object.keys(rowChecked).map((item) => {
    return (
      <label key={rowChecked[item].id}>
        {rowChecked[item].name}
        <input
          name={rowChecked[item].id}
          type="checkbox"
          checked={rowChecked[item].value}
          onChange={() => dispatch(changeVisibility(item))}
        />
      </label>
    );
  });
}
