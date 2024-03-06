using AutoMapper;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using CRS_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FeedbacksController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IFeedbackRepository feedbackRepository;

		public FeedbacksController(IMapper mapper, IFeedbackRepository feedbackRepository)
        {
			this.mapper = mapper;
			this.feedbackRepository = feedbackRepository;
		}

		[HttpGet]
		//[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			// Get Data From Database - Domain models
			var feeedbacksDomain = await feedbackRepository.GetAllAsync();

			// Map Domain Models to DTOs
			var feedbacksDto = mapper.Map<List<FeedbackDto>>(feeedbacksDomain);

			return Ok(feedbacksDto);
		}

		[HttpGet("{id:Guid}")]
		public async Task<IActionResult> GetByCarId([FromRoute] Guid id)
		{
			// Get Data From Database - Domain models
			var feeedbacksDomain = await feedbackRepository.GetByCarIdAsync(id);

			// Map Domain Models to DTOs
			var feedbacksDto = mapper.Map<List<FeedbackDto>>(feeedbacksDomain);

			return Ok(feedbacksDto);
		}


		[HttpPost]
		[Authorize]
		public async Task<IActionResult> Create([FromBody] FeedbackRequestDto feedbackRequestDto) 
		{
			// Map or Convert DTO to Domain Model
			var feedbackDomain = mapper.Map<Feedback>(feedbackRequestDto);

			// Use Domain Model to create Car
			feedbackDomain = await feedbackRepository.CreateAsync(feedbackDomain);

			// Map Domain model back to DTO
			var feedbackDto = mapper.Map<FeedbackDto>(feedbackDomain);

			return Ok(feedbackDto);
		}
    }
}
