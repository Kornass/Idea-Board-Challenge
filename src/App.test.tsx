import App from "./App";
import { fireEvent, render, screen, within } from "@testing-library/react";

describe("Initial screen", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Should have my ideas board heading", () => {
    const heading = screen.queryByText(/My ideas board/i);
    expect(heading).toBeInTheDocument();
  });
  test("Should render a button", () => {
    // const { container } = render(<App />);
    // const button = container.querySelector("button");
    // expect(button).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
describe("Opening form button", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Should have onClick event that fires when button clicked", () => {
    const button = screen.getByRole("button");
    const handleClick = vi.fn();
    expect(button.onclick).not.toBe(null);
    button.onclick = handleClick;
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
  test("Should display modal with a form inside when button clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    within(modal).getByRole("form");
  });
});
describe("Modal", () => {
  beforeEach(() => {
    render(<App />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });
  test("Should have title and description fields", () => {
    // https://testing-library.com/docs/queries/bylabeltext
    const titleInputNode = screen.getByLabelText("Title");
    const descriptionInputNode = screen.getByLabelText("Description");
    expect(titleInputNode).toBeInTheDocument();
    expect(descriptionInputNode).toBeInTheDocument();
  });
  test("Should have submitting button", () => {
    // https://testing-library.com/docs/queries/bylabeltext
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeInTheDocument();
  });
  test("Should display submit button when title and description fields are filled with some text", () => {
    const titleInputNode = screen.getByLabelText("Title");
    const descriptionInputNode = screen.getByLabelText("Description");
    // inputting text into inputs
    fireEvent.change(titleInputNode, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInputNode, {
      target: { value: "Test Description" },
    });
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeDisabled();
  });
});
