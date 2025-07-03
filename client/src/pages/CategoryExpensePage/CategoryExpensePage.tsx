import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";

// get setFilterExpenseMonth prop from spendingpage
// filter expenses by categoryID

export const CategoryExpensePage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  return (
    <div>
      <h2>Hello This Is CategoryExpensePage</h2>
      <button onClick={() => navigate(routes.SPENDING)}>
        go back to spending page
      </button>
    </div>
  );
};
