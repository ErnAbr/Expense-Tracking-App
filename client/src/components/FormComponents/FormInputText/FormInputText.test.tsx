import { render, screen } from "@testing-library/react";
import { FormInputText } from "./FormInputText";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userEvent from "@testing-library/user-event";

type TestFormValues = {
  testField: string;
};

const schema = yup.object({
  testField: yup.string().required("This field is required"),
});

const TestWrapper = () => {
  const { control, handleSubmit } = useForm<TestFormValues>({
    defaultValues: { testField: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = vi.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText
        name="testField"
        label="Test Label"
        type="text"
        control={control}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

test("renders the input with label", async () => {
  render(<TestWrapper />);
  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
});

test("shows error if field is empty upon submission", async () => {
  render(<TestWrapper />);

  const button = screen.getByRole("button");
  const input = screen.getByLabelText("Test Label");

  await userEvent.click(button);

  expect(input).toHaveAttribute("aria-invalid", "true");
});

test("updates values on change", async () => {
  render(<TestWrapper />);

  const input = screen.getByLabelText("Test Label");

  await userEvent.type(input, "test value");

  expect(input).toHaveValue("test value");
});
