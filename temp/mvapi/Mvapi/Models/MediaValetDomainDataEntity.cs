using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace Mvapi.Models
{
    public class MediaValetDomainDataEntity : TableEntity
    {
        public MediaValetDomainDataEntity(string domainName, string apiUrl, string email)
        {
            this.PartitionKey = Guid.NewGuid().ToString();
            this.RowKey = Guid.NewGuid().ToString();
            this.DomainName = domainName;
            this.ApiUrl = apiUrl;
            this.EmailDomain = email;
        }

        public MediaValetDomainDataEntity()
        {
        }

        public string DomainName { get; set; }

        public string ApiUrl { get; set; }

        public string EmailDomain { get; set; }
    }
}