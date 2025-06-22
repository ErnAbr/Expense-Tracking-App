namespace Server.Dtos
{
    public class AddCategoryDto
{
    public string Name { get; set; } = "";
    public string IconName { get; set; } = "";
    public required List<AddSubcategoryDto> Subcategory { get; set; }
}

    public class AddSubcategoryDto
    {
        public string Name { get; set; } = "";
        public string IconName { get; set; } = "";
    }
}

