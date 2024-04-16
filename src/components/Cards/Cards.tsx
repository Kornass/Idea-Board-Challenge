import Card from "../Card/Card.tsx";
import InputCard from "../InputCard/InputCard.tsx";
import "./cards.css";
import { obtainLatest } from "../../utils/utils.js";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

function Cards() {
  const { ideas, activeSorting } = useContext(DataContext);

  const sortIdeas = (ideas) => {
    if (activeSorting === "Date") {
      return ideas.toSorted((a, b) => {
        const latestA = obtainLatest(a);
        const latestB = obtainLatest(b);
        return latestB - latestA;
      });
    } else {
      return ideas.toSorted((a, b) => {
        const titleA = a.title;
        const titleB = b.title;
        return titleA === titleB ? 0 : titleA > titleB ? 1 : -1;
      });
    }
  };

  return (
    <section className="card-wrapper">
      <InputCard />
      {/* Conditional render of different type of sorting  */}
      {sortIdeas(ideas).map((idea, idx) => (
        <Card idea={idea} idx={idx + 1} key={idea.id} />
      ))}
    </section>
  );
}

export default Cards;
