import Card from "../../components/Card/Card";
import App from "../../App";
import { IdeasContextProvider } from "../../context/IdeasContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { Idea } from "../../types";

describe("Card component", () => {
  const idea: Idea = {
    id: "1",
    title: "Test Idea Title",
    description: "Test Idea Description",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  test("Should display title heading and description paragraph", () => {
    const { container } = render(
      <IdeasContextProvider>
        <Card idea={idea} />
      </IdeasContextProvider>
    );
    const titleHeading = screen.getByRole("heading");
    expect(titleHeading).toBeInTheDocument();
    const descParagraph = container.querySelector("p");
    expect(descParagraph).toBeInTheDocument();
  });
});
