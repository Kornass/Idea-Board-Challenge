import Card from "../Card/Card.tsx";
import "./cards.css";
import { getDate } from "../../utils/utils.js";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext } from "react";
import { Idea } from "../../types.ts";
import { ContextType } from "../../types.ts";

function Cards() {
  const { ideas, activeSorting, setModalOpen } = useContext(
    IdeasContext
  ) as ContextType;

  const sortIdeas = (ideas: Idea[]) => {
    if (activeSorting === "Date") {
      return ideas.toSorted((a, b) => {
        const latestA: Date = getDate(a);
        const latestB: Date = getDate(b);
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
      <button
        className="card first animate"
        aria-label="new"
        onClick={() => setModalOpen(true)}
      >
        <span>+</span>
      </button>
      {/* Conditional render of different type of sorting  */}
      {sortIdeas(ideas).map((idea: Idea) => (
        <Card idea={idea} key={idea.id} />
      ))}
    </section>
  );
}

export default Cards;
