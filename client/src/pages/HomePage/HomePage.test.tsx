import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import userEvent from "@testing-library/user-event";

test("renders email and password inputs", () => {
  render(<HomePage />);
  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/your password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
});

test("shows validation errors if inputs are empty on submit", async () => {
  render(<HomePage />);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const emailInput = screen.getByLabelText(/your email/i);
  const passwordInput = screen.getByLabelText(/your password/i);

  await userEvent.click(submitButton);

  expect(emailInput).toHaveAttribute("aria-invalid", "true");
  expect(passwordInput).toHaveAttribute("aria-invalid", "true");
});

test("submits the form with valid inputs", async () => {
  render(<HomePage />);

  const emailInput = screen.getByLabelText(/your email/i);
  const passwordInput = screen.getByLabelText(/your password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(emailInput, "test@example.com");
  await userEvent.type(passwordInput, "securepassword");

  await userEvent.click(submitButton);

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");
});

test("clears the form when Clear button is clicked", async () => {
  render(<HomePage />);

  const emailInput = screen.getByLabelText(/your email/i);
  const passwordInput = screen.getByLabelText(/your password/i);
  const clearButton = screen.getByRole("button", { name: /clear/i });

  await userEvent.type(emailInput, "someone@email.com");
  await userEvent.type(passwordInput, "123456");

  await userEvent.click(clearButton);

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");
});
