import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormRadioInput } from "./FormRadioInput";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type TestFormValues = {
  testField: string;
};

const schema = yup.object({
  testField: yup.string().required("this field is required"),
});

const onSubmit = vi.fn();

const TestWrapper = () => {
  const { control, handleSubmit, reset } = useForm<TestFormValues>({
    defaultValues: { testField: "" },
    resolver: yupResolver(schema),
  });

  const testOptions = [
    { label: "Test Label", value: "testValue" },
    { label: "Test Label2", value: "testValue2" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRadioInput
        label="Test Label"
        name="testField"
        control={control}
        options={testOptions}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>
        Clear
      </button>
    </form>
  );
};

test("renders the input with label", async () => {
  render(<TestWrapper />);
  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
});

test("renders the radio inputs", async () => {
  render(<TestWrapper />);
  expect(screen.getAllByRole(`radio`).length).toBe(2);
});

test("one radio input is only selected", async () => {
  render(<TestWrapper />);
  const input = screen.getByLabelText("Test Label");
  const input2 = screen.getByLabelText("Test Label2");

  await userEvent.click(input2);
  await userEvent.click(input);
  expect(input).toBeChecked();
});

test("expect to render a error message if no input is selected", async () => {
  render(<TestWrapper />);
  const button = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });
});

test("submits the selected value", async () => {
  render(<TestWrapper />);
  const input = screen.getByLabelText("Test Label2");
  const button = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(input);
  await userEvent.click(button);

  expect(onSubmit.mock.calls[0][0]).toEqual({ testField: "testValue2" });
});

test("clears the selected input when Clear button is clicked", async () => {
  render(<TestWrapper />);

  const input = screen.getByLabelText("Test Label");
  const clearButton = screen.getByRole("button", { name: /clear/i });

  await userEvent.click(input);
  expect(input).toBeChecked();

  await userEvent.click(clearButton);
  expect(input).not.toBeChecked();
});
