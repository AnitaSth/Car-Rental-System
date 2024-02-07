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
			CreateMap<Car, CarResponseDto>().ReverseMap();
			CreateMap<User, UserDto>().ReverseMap();
			CreateMap<Rental, RentalDto>().ReverseMap();
			CreateMap<Rental, RentalRequestDto>().ReverseMap();
			CreateMap<Payment, PaymentDto>().ReverseMap();	
			CreateMap<Payment, PaymentDomainDto>().ReverseMap();
			CreateMap<Feedback, FeedbackDto>().ReverseMap();
			CreateMap<Feedback, FeedbackRequestDto>().ReverseMap();	

		}
	}
}
