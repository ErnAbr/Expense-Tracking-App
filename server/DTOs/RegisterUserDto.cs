namespace Server.Dto
{
    public class RegisterUserDto
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Gender { get; set; } = "";
    public string Country { get; set; } = "";
    public DateTime BirthDate { get; set; }
}
}