interface AddSubcategoryToExistingCateogryProps {
  category: {
    id: number;
    name: string;
  };
}

export const AddSubcategoryToExistingCateogry = ({
  category,
}: AddSubcategoryToExistingCateogryProps) => {
  console.log(category);

  return <button onClick={() => console.log("Test")}>FORM SOON</button>;
};
