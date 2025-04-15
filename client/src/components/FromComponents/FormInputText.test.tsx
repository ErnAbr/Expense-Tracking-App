import { render, screen } from "@testing-library/react";
import { FormInputText } from "./FormInputText";
import { useForm } from "react-hook-form";

type TestFormValues = {
  testField: string;
};

const TestWrapper = () => {
  const { control } = useForm<TestFormValues>({
    defaultValues: { testField: "" },
  });

  return (
    <form>
      <FormInputText
        name="testField"
        label="Test Label"
        type="text"
        control={control}
      />
    </form>
  );
};

test("renders the input with label", () => {
  render(<TestWrapper />);
  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
});