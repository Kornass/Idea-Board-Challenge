import Card from "../Card/Card.tsx";
import InputCard from "../InputCard/InputCard.tsx";
import "./cards.css";
import { obtainLatest } from "../../utils/utils.js";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { Idea } from "../../types.ts";
import { ContextType } from "../../types.ts";

function Cards() {
  const { ideas, activeSorting } = useContext(DataContext) as ContextType;

  const sortIdeas = (ideas: Idea[]) => {
    if (activeSorting === "Date") {
      return ideas.toSorted((a, b) => {
        const latestA: Date = obtainLatest(a);
        const latestB: Date = obtainLatest(b);
        return latestB.getTime() - latestA.getTime();
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
