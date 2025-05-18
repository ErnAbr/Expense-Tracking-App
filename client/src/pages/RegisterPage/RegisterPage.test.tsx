import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, handlers } from "../../test/server";
import { RegisterPage } from "./RegisterPage";

test("checks form values and submits the form", async () => {
  server.use(
    handlers("post", "/user/auth/register", "Registration Successful")
  );

  const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  render(<RegisterPage />);

  //user email
  await userEvent.type(screen.getByLabelText(/your email/i), "ern5@ern.lt");
  expect(screen.getByLabelText(/your email/i)).toHaveValue("ern5@ern.lt");

  //user password
  await userEvent.type(screen.getByLabelText(/your password/i), "string");
  expect(screen.getByLabelText(/your password/i)).toHaveValue("string");

  //user repPassword
  await userEvent.type(screen.getByLabelText(/repeat password/i), "string");
  expect(screen.getByLabelText(/repeat password/i)).toHaveValue("string");

  //user selectCountry
  const countryInput = screen.getByRole("combobox", {
    name: /select a country/i,
  });
  await userEvent.click(countryInput);
  const optionLithuania = await screen.findByText("Lithuania");
  await userEvent.click(optionLithuania);
  expect(countryInput).toHaveValue("Lithuania");

  //user birthDate
  const dayInput = screen.getByRole("spinbutton", { name: /day/i });
  await userEvent.clear(dayInput);
  await userEvent.type(dayInput, "018");
  expect(dayInput).toHaveValue(18);

  const monthInput = screen.getByRole("spinbutton", { name: /month/i });
  await userEvent.clear(monthInput);
  await userEvent.type(monthInput, "05");
  expect(monthInput).toHaveValue(5);

  const yearInput = screen.getByRole("spinbutton", { name: /year/i });
  await userEvent.clear(yearInput);
  await userEvent.type(yearInput, "02000");
  expect(yearInput).toHaveValue(2000);

  //user gender
  await userEvent.click(screen.getByDisplayValue("Male"));
  expect(screen.getByDisplayValue("Male")).toBeChecked();

  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith("Registration Successful");

    consoleSpy.mockRestore();
  });
});
