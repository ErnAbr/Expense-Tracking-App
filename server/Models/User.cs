namespace Server.Models
{
    public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Country { get; set; } = "";
    public string Gender { get; set; } = "";
    public DateTime BirthDate { get; set; }
}
}

