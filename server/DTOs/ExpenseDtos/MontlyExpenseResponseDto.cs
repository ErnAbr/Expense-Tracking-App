namespace Server.Dtos
{
    public class MontlyExpenseResponseDto
    {
        public DateTime AmountDate { get; set; }
        public decimal Amount { get; set; }
        public int SubcategoryId { get; set; }
    }
}