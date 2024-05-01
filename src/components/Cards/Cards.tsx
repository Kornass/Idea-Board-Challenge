import Card from "../Card/Card.tsx";
import AddIdeaButton from "../InputCard/AddIdeaButton.tsx";
import "./cards.css";
import { obtainLatest } from "../../utils/utils.js";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext } from "react";
import { Idea } from "../../types.ts";
import { ContextType } from "../../types.ts";

function Cards() {
  const { ideas, activeSorting } = useContext(IdeasContext) as ContextType;

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
      <AddIdeaButton />
      {/* Conditional render of different type of sorting  */}
      {sortIdeas(ideas).map((idea) => (
        <Card idea={idea} key={idea.id} />
      ))}
    </section>
  );
}

export default Cards;
