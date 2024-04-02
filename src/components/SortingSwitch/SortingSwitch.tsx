import Switch from "react-switch";
import "./switch.css";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

function SortingSwitch() {
  const { activeSorting, setActiveSorting, ideas } = useContext(DataContext);

  return (
    <div className="switch">
      <span>Sort by date</span>
      <Switch
        checked={activeSorting === "Alphabetically"}
        onChange={() =>
          setActiveSorting((prev) =>
            prev === "Alphabetically" ? "Date" : "Alphabetically"
          )
        }
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={15}
        width={48}
        // disable sorting if there are no ideas or if there is only one
        disabled={ideas.length <= 1}
      />
      <span>Sort alphabetically</span>
    </div>
  );
}

export default SortingSwitch;