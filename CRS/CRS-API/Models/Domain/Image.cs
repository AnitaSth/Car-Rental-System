namespace CRS_API.Models.Domain
{
	public class Image
	{
		public int Id { get; set; }
		public IFormFile File { get; set; }
		public string FileName { get; set; }
		public string FileExtension { get; set; }
		public long FileSizeInBytes { get; set; }
		public string FilePath { get; set; }
	}
}
