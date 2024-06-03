import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
