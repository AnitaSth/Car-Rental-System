using AutoMapper;
using CRS_API.Models.Domain;
using CRS_API.Models.DTO;
using CRS_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NotificationsController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly INotificationRepository notificationRepository;

		public NotificationsController(IMapper mapper, INotificationRepository notificationRepository)
        {
			this.mapper = mapper;
			this.notificationRepository = notificationRepository;
		}

		// Get all notifications
		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAll()
		{
			// Get Data From Database - Domain models
			var notificationsDomain = await notificationRepository.GetAllAsync();

			// Map Domain Models to DTOs
			var notificationsDto = mapper.Map<List<NotificationDto>>(notificationsDomain);

			return Ok(notificationsDto);
		}

		// Create notification
		[HttpPost]
		[Authorize(Roles = "Admin, VehicleOwner, Customer")]
		public async Task<IActionResult> Create([FromBody] NotificationRequestDto notificationRequestDto)
		{
			// Map or Convert DTO to Domain Model
			var notificationDomain = mapper.Map<Notification>(notificationRequestDto);

			// Use Domain Model to create Car
			notificationDomain = await notificationRepository.CreateAsync(notificationDomain);

			// Map Domain model back to DTO
			var notificationDto = mapper.Map<NotificationDto>(notificationDomain);

			return Ok(notificationDto);
		}

		// Update notification
		[HttpPut("{id:Guid}")]
		public async Task<IActionResult> Update([FromRoute] Guid id)
		{
			// Check if car exists
			var notificationDomain = await notificationRepository.UpdateAsync(id);

			if (notificationDomain == null)
			{
				return NotFound();
			}

			// Convert Domain Model to DTO
			var notificationDto = mapper.Map<NotificationDto>(notificationDomain);

			return Ok(notificationDto);
		}
	}
}
