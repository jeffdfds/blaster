namespace Blaster.WebApi.Features.Channels.Models
{
    public class ChannelConnectionRequest
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientType { get; set; }
        public string ChannelId { get; set; }
        public string ChannelName { get; set; }
        public string ChannelType { get; set; }
    }
}