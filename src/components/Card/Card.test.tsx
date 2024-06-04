import Card from "../../components/Card/Card";
import NewIdeaModal from "../NewIdeaModal/NewIdeaModal";
import userEvent from "@testing-library/user-event";
import { render } from "../../test-utils";
import { screen } from "@testing-library/react";
import { Idea } from "../../types";

const idea: Idea = {
  id: "1",
  title: "Test Idea Title",
  description: "Test Idea Description",
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

  // I tried to do to make this function to alter the modalOpen here, don't know if it's a right direction

  // setModalOpen: (modalState)=>{
  //   modalContext.modalOpen = modalState;
  // }
};

describe("Card component render", () => {
  test("Should display title heading and description paragraph", () => {
    const { container } = render(<Card idea={idea} />, cardContext);
    const titleHeading = screen.getByRole("heading");
    expect(titleHeading).toBeInTheDocument();
    const descParagraph = container.querySelector("p");
    expect(descParagraph).toBeInTheDocument();
  });
});
describe("Card component interaction", () => {
  test("Should open editable modal on card click containing card content and submit it when content changed and confirmed with submit button", async () => {
    const { container } = render(
      <>
        <Card idea={idea} />
        <NewIdeaModal />
      </>,
      { ...cardContext, ...modalContext }
    );
    const user = userEvent.setup();
    const card = screen.getByRole("button", {
      name: /edit/i,
    });
    await user.click(card);
    expect(cardContext.setEditId).toHaveBeenCalledWith(idea.id);
    expect(cardContext.setModalOpen).toHaveBeenCalledWith(true);

    // test here if modal is on the screen ? Can we successfully trigger the modal to open in this test case? Is it a right place/way to go ?

    // await user.type(screen.getByLabelText("Title"), "Test Title");
    // await user.type(screen.getByLabelText("Description"), "Test Description");
  });
});
