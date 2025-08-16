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
            CreateMap<AddSubcategory, Subcategory>();
        }
    }

    public class ExpenseMappingProfile : Profile
    {
        public ExpenseMappingProfile()
        {
            CreateMap<AddExpenseDto, Expense>();
            CreateMap<Expense, MontlyExpenseResponseDto>()
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Subcategory.CategoryId));
        }
    }

    public class BudgetMappingProfile : Profile
    {
    public BudgetMappingProfile()
        {
            CreateMap<AddSubcategoryBudgetDto, Budget>();
        }
    }
  
}
