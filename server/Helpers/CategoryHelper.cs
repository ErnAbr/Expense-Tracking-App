using Server.Models;

public static class CategoryHelper
{
    public static Category CloneCategory(Category original)
    {
        return new Category
        {
            Name = original.Name,
            IconName = original.IconName,
            Subcategories = original.Subcategories.Select(s => new Subcategory
            {
                Name = s.Name,
                IconName = s.IconName,
            }).ToList()
        };
    }
}
