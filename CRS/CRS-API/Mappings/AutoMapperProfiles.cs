using AutoMapper;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;

namespace CRS_API.Mappings
{
	public class AutoMapperProfiles : Profile
	{
        public AutoMapperProfiles()
        {
            CreateMap<Car, CarDto>().ReverseMap();
            CreateMap<Car, CarRequestDto>().ReverseMap();
			CreateMap<User, UserDto>().ReverseMap();
		}
	}
}
