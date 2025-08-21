namespace Server.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public decimal PlannedExpense { get; set; }
        public DateTime PlannedExpenseDate { get; set; }
        public int SubcategoryId { get; set; }
        public Subcategory Subcategory { get; set; } = null!;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
    
}