namespace Server.Dtos 
{
    public class BudgetResponseDto
    {
        public decimal PlannedExpense { get; set; }
        public DateTime PlannedExpenseDate { get; set; }
        public int SubcategoryId { get; set; }
    }
}