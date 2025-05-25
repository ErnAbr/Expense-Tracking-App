namespace Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string IconName { get; set; } = "";

        public int? UserId { get; set; }
        public User? User { get; set; } = null!;

        public ICollection<Subcategory> Subcategories { get; set; } = [];
    }
}