namespace Server.Dtos
{
    public class AddExpenseDto
    {
        public int Id { get; set; }
        public int SubcategoryId { get; set; }
        public DateTime AmountDate { get; set; }
        public decimal Amount { get; set; }
    }
}