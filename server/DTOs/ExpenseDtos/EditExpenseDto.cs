namespace Server.Dtos
{
    public class EditExpenseDto
   {
    public string CategoryId { get; set; } = "";
    public string SubcategoryId { get; set; } = "";
    public int ExpenseId { get; set; }
    public decimal ExpenseAmount { get; set; }
    public DateTime ExpenseDate { get; set; }
    }
}
