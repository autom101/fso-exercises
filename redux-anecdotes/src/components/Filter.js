import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const newFilter = event.target.value;
    dispatch(changeFilter(newFilter));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
