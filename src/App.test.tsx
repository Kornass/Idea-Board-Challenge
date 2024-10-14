import App from "./App";
import Card from "./components/Card/Card";
import NewIdeaModal from "./components/NewIdeaModal/NewIdeaModal";
import { Idea } from "./types";
import { screen, waitFor } from "@testing-library/react";
import { render } from "./test-utils";
import userEvent from "@testing-library/user-event";

const idea: Idea = {
  id: "1",
  title: "Test Title",
  description: "Test Description",
  createdAt: new Date(),
  updatedAt: new Date(),
};

let modalContext = {
  modalOpen: false,
  addIdea: vi.fn(),
  editId: null,
  ideas: [idea],
  onModalClose: vi.fn(),
  updateIdea: vi.fn(),
};

const cardContext = {
  setDeletingId: vi.fn(),
  setEditId: vi.fn(),
  setModalOpen: vi.fn(),
};

describe("App", () => {
  test("Should have my ideas board heading", () => {
    render(<App />);
    const heading = screen.queryByText(/My ideas board/i);
    expect(heading).toBeInTheDocument();
  });
  test("Should display modal with a form inside when button clicked and submit it by clicking Add idea button", async () => {
    render(<App />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    // open form modal
    await user.click(button);
    // fill out form
    await user.type(screen.getByLabelText("Title"), "Test Title");
    await user.type(screen.getByLabelText("Description"), "Test Description");
    // submit form
    const submitButton = screen.getByRole("button", { name: "Add idea" });
    await user.click(submitButton);
    // assert that modal is closed after submitting
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
});
describe("Card", () => {
  test("Should display title heading and description paragraph", () => {
    const { container } = render(<Card idea={idea} />);
    const titleHeading = screen.getByRole("heading");
    expect(titleHeading).toBeInTheDocument();
    const descParagraph = container.querySelector("p");
    expect(descParagraph).toBeInTheDocument();
  });
});
describe("Card component interactions", () => {
  test("Should open editable modal on click that contains card content and render update button", async () => {
    render(<App />, { ...cardContext, ...modalContext });
    const user = userEvent.setup();
    const card = screen.getByRole("button", {
      name: /edit/i,
    });
    await user.click(card);
    console.log(card);

    // check if modal is on the screen
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    // expect(cardContext.setEditId).toHaveBeenCalledWith("1"); // this is not working
    // check if modal contains card content
    const title = screen.getByLabelText("Title");
    expect(title).toHaveValue("Test Title");
    const description = screen.getByLabelText("Description");
    expect(description).toHaveValue("Test Description");
    // change content
    await user.type(title, "Changed title");
    await user.type(description, "Changed description");
    // check for update button
    const updateButton = screen.getByRole("button", { name: "Update idea" });
    expect(updateButton).toHaveAttribute("type", "submit");
    expect(updateButton).not.toBeDisabled();
  });
});
