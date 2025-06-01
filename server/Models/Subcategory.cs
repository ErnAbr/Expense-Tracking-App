namespace Server.Models
{
    public class Subcategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string IconName { get; set; } = "";

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public ICollection<Expense> Expenses { get; set; } = [];
    }
}