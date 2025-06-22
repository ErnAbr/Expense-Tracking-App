namespace Server.Dtos
{
    public class EditCategoryDto
    {
        public int Id { set; get; }
        public string Type { set; get; } = "";
        public required EditCategoryDataDto Data { set; get; } 
    }

    public class EditCategoryDataDto
    {
        public string Name { set; get; } = "";
        public string IconName { set; get; } = "";
    }
}