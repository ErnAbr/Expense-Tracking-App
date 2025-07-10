namespace Server.Dtos
{
    public class AddSubcategoriesToCategoryDto
    {
        public int CategoryId {get;set;}
        public required List<AddSubcategoryDto> Subcategory { get; set; }
    }
}