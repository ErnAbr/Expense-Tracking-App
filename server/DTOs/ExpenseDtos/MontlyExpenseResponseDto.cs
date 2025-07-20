namespace Server.Dtos
{
    public class MontlyExpenseResponseDto
    {
        public int Id { get; set; }
        public DateTime AmountDate { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
    }
}