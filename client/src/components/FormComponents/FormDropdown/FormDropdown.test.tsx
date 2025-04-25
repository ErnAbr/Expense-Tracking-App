import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormDropdown } from "./FormDropdown";
import { fireEvent, render, screen, within } from "@testing-library/react";
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
    { label: "Test Label1", value: "testValue" },
    { label: "Test Label2", value: "testValue2" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormDropdown
        label="dropdown Label"
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
  expect(screen.getByLabelText(/dropdown Label/i)).toBeInTheDocument();
});

test("renders the select inputs with correct options", async () => {
  render(<TestWrapper />);

  const selectInput = screen.getByRole("combobox");

  fireEvent.mouseDown(selectInput);

  const listbox = await screen.findByRole("listbox");

  const options = within(listbox).getAllByRole("option");
  expect(options.length).toBe(2);
  expect(within(listbox).getByText("Test Label1")).toBeInTheDocument();
  expect(within(listbox).getByText("Test Label2")).toBeInTheDocument();
});

test("one value is only selected", async () => {
  render(<TestWrapper />);

  const selectInput = screen.getByRole("combobox");
  fireEvent.mouseDown(selectInput);

  const option2 = await screen.findByText("Test Label2");
  await userEvent.click(option2);

  expect(screen.getByRole("combobox")).toHaveTextContent("Test Label2");
  expect(screen.getByRole("combobox")).not.toHaveTextContent("Test Label1");
});

test("submits the selected value", async () => {
  render(<TestWrapper />);

  const selectInput = screen.getByRole("combobox");
  fireEvent.mouseDown(selectInput);

  const option2 = await screen.findByText("Test Label2");
  await userEvent.click(option2);

  const button = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(button);

  expect(onSubmit.mock.calls[0][0]).toEqual({ testField: "Test Label2" });
});

test("clears the selected input when Clear button is clicked", async () => {
  render(<TestWrapper />);
  const selectInput = screen.getByRole("combobox");
  const clearButton = screen.getByRole("button", { name: /clear/i });

  fireEvent.mouseDown(selectInput);

  const option2 = await screen.findByText("Test Label2");
  await userEvent.click(option2);
  expect(screen.getByRole("combobox")).toHaveTextContent("Test Label2");

  await userEvent.click(clearButton);
  expect(screen.getByRole("combobox")).not.toHaveTextContent("Test Label2");
});

test("shows validation error on empty submit", async () => {
  render(<TestWrapper />);
  const submitBtn = screen.getByRole("button", { name: /submit/i });

  await userEvent.click(submitBtn);

  expect(await screen.findByText("this field is required")).toBeInTheDocument();
});