namespace Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = "";
        public byte[] PasswordHash { get; set; } = [];
        public byte[] PasswordSalt { get; set; } = [];
        public string Country { get; set; } = "";
        public string Gender { get; set; } = "";
        public DateTime BirthDate { get; set; }

        public ICollection<Category> Categories { get; set; } = [];
        public ICollection<Expense> Expenses { get; set; } = [];
        public ICollection<Budget> Budgets { get; set; } = [];
    }
}

