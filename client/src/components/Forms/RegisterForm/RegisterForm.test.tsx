import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, handlers } from "../../../test/server";
import { RegisterPage } from "../../../pages/RegisterPage/RegisterPage";

const fillRegistrationForm = async ({
  email = "ern5@ern.lt",
  password = "string",
  repeatPassword = "string",
  country = "Lithuania",
  day = "18",
  month = "5",
  year = "2000",
  gender = "Male",
} = {}) => {
  await userEvent.type(screen.getByLabelText(/your email/i), email);
  await userEvent.type(screen.getByLabelText(/your password/i), password);
  await userEvent.type(
    screen.getByLabelText(/repeat password/i),
    repeatPassword
  );

  const countryInput = screen.getByRole("combobox", {
    name: /select a country/i,
  });
  await userEvent.click(countryInput);
  const option = await screen.findByText(country);
  await userEvent.click(option);

  const dayInput = screen.getByRole("spinbutton", { name: /day/i });
  await userEvent.type(dayInput, "18");
  expect(dayInput).toHaveValue(Number(day));

  const monthInput = screen.getByRole("spinbutton", { name: /month/i });
  await userEvent.type(monthInput, "05");
  expect(monthInput).toHaveValue(Number(month));

  const yearInput = screen.getByRole("spinbutton", { name: /year/i });
  await userEvent.type(yearInput, "02000");
  expect(yearInput).toHaveValue(Number(year));

  await userEvent.click(screen.getByDisplayValue(gender));
  expect(screen.getByDisplayValue(gender)).toBeChecked();
};

test("fills out the form fields correctly", async () => {
  render(<RegisterPage />);
  await fillRegistrationForm();
});

test("checks form values and submits the form", async () => {
  server.use(
    handlers("post", "/user/auth/register", "Registration Successful")
  );

  const consoleSpy = vi.spyOn(console, "log");

  render(<RegisterPage />);
  await fillRegistrationForm();

  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith("Registration Successful");
  });

  consoleSpy.mockRestore();
});
