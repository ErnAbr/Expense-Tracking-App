import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, handlers } from "../../test/server";
import { RegisterPage } from "./RegisterPage";

it("submits form and returns response", async () => {
  server.use(
    handlers("post", "/user/auth/register", {
      message: "Registration Successful",
    })
  );
  const onSuccess = vi.fn();
  render(<RegisterPage onSuccess={onSuccess} />);

  await userEvent.type(screen.getByLabelText(/your email/i), "ern@ern.lt");
  await userEvent.type(screen.getByLabelText(/your password/i), "string");
  await userEvent.type(screen.getByLabelText(/repeat password/i), "string");
  await userEvent.type(screen.getByLabelText(/select a country/i), "Lithuania");
  await userEvent.keyboard("{Enter}");

  await userEvent.clear(screen.getByRole("spinbutton", { name: /day/i }));
  await userEvent.type(screen.getByRole("spinbutton", { name: /day/i }), "18");

  await userEvent.clear(screen.getByRole("spinbutton", { name: /month/i }));
  await userEvent.type(
    screen.getByRole("spinbutton", { name: /month/i }),
    "05"
  );

  await userEvent.clear(screen.getByRole("spinbutton", { name: /year/i }));
  await userEvent.type(
    screen.getByRole("spinbutton", { name: /year/i }),
    "2000"
  );

  await userEvent.click(screen.getByDisplayValue("Male"));
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledWith({
      message: "Registration Successful",
    });
  });
});
