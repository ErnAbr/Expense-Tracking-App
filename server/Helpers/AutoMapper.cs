using AutoMapper;
using Server.Dtos;
using Server.Models;

namespace Server.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<RegisterUserDto, User>();
        }
    }

    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<AddCategoryDto, Category>();
            CreateMap<AddSubcategoryDto, Subcategory>();
        }
    }

    public class ExpenseMappingProfile : Profile
    {
        public ExpenseMappingProfile()
        {
            CreateMap<AddExpenseDto, Expense>();
        }
    }
}
