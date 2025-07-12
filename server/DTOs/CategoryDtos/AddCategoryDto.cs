namespace Server.Dtos
{
    public class AddCategoryDto
{
    public string Name { get; set; } = "";
    public string IconName { get; set; } = "";
    public required List<AddSubcategory> Subcategory { get; set; }
}

}

