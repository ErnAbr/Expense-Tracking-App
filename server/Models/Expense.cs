namespace Server.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        
        public int SubcategoryId { get; set; }
        public Subcategory Subcategory { get; set; } = null!;
    }
}