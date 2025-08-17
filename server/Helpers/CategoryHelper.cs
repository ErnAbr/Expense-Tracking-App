using Server.Models;

public static class CategoryHelper
{
    public static Category CloneCategory(Category original, User user)
    {
        return new Category
        {
            Name = original.Name,
            IconName = original.IconName,
            Subcategories = original.Subcategories.Select(s => new Subcategory
            {
                Name = s.Name,
                IconName = s.IconName,
                Budgets = new List<Budget>
                {
                    new Budget
                    {
                        PlannedExpense = 0,
                        User = user
                    }
                }
            }).ToList()
        };
    }
}
