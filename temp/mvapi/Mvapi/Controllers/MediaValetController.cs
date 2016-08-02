using Mvapi.DataAccessLayer;
using Mvapi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
//using System.Web.Mvc;

namespace Mvapi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MediaValetController : ApiController
    {
        log4net.ILog logger = log4net.LogManager.GetLogger(typeof(MediaValetController));
        //initialize storage account
        public MediaValetController()
        {
            DataAccess.InitializeStorageAccount();
        }
        [AcceptVerbs("Get", "Post")]
        public string TempFn()
        {
            string CS = ConfigurationManager.AppSettings["BaseUrl"];
            if (CS == null)
            {
                CS = "No Function is found!";
            }
            return CS;
        }
        //get categories data
        public CategoriesModel GetCategories()
        {
            //string domain = "";
            //string email = "";
            string orgunitid = "";
            string application = "";
            // string applki
            var param = Request.GetQueryNameValuePairs();

            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 2) //3 //2
                {
                    //domain = qs["domain"];
                    //email = qs["email"];
                    orgunitid = qs["orgunitid"];
                    application = qs["application"];
                }
            }

            CategoriesModel categoriesModel = new CategoriesModel();
            if (!string.IsNullOrEmpty(orgunitid)) //domain
            {
                //if (!string.IsNullOrEmpty(email))
                //{
                if (!string.IsNullOrEmpty(application))
                {
                    var data = DataAccess.GetCategoryData(orgunitid, application);  //domain, email,
                    if (data != null)
                    {
                        categoriesModel.Domain = data.DomainName;
                        categoriesModel.Email = data.Email;
                        categoriesModel.Categories = data.Categories;
                        categoriesModel.OrgUnitId = data.OrgUnitId;
                        categoriesModel.Application = data.Application.ToLower();
                        return categoriesModel;
                    }
                    categoriesModel.Domain = data.ToString(); //"Orgid/Application name not resolved.";  //Domain/Email
                    categoriesModel.Email = "";
                    categoriesModel.Categories = "";
                    categoriesModel.OrgUnitId = "";
                    categoriesModel.Application = "";
                    return categoriesModel;
                }
                categoriesModel.Application = "Application name missing";
                return categoriesModel;
                //}
                //categoriesModel.Email = "Please provide an email";
                //return categoriesModel;
            }
            categoriesModel.OrgUnitId = "Please provide Organization Id.";
            return categoriesModel;
        }

        //update categories data
        [AcceptVerbs("Get", "Post")]
        public string AddNewCategories()
        {
            string domain = "";
            string email = "";
            string orgunitid = "";
            string categories = "";
            string application = "";
            var param = Request.GetQueryNameValuePairs();

            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 5) //4 //3
                {
                    domain = qs["domain"];
                    email = qs["email"];
                    orgunitid = qs["orgunitid"];
                    categories = qs["categories"];
                    application = qs["application"];
                }
                else
                {
                    return "Parameters missing.";
                }
            }
            CategoriesModel categoriesModel = new CategoriesModel();
            if (!string.IsNullOrEmpty(domain))
            {
                if (!string.IsNullOrEmpty(email))
                {
                    if (!string.IsNullOrEmpty(orgunitid))
                    {
                        if (!string.IsNullOrEmpty(application))
                        {
                            //if (!string.IsNullOrEmpty(categories))
                            //{
                            categoriesModel.Domain = domain;
                            categoriesModel.Email = email;
                            categoriesModel.OrgUnitId = orgunitid;
                            categoriesModel.Categories = categories;
                            categoriesModel.Application = application.ToLower();
                            string result = DataAccess.InsertNewCategory(categoriesModel);
                            return result;
                            //}
                            //return "Categories can't be empty.";
                        }
                        return "Application name can't be empty.";
                    }
                    return "Organization id can't be empty.";
                }
                return "Empty email.";
            }
            return "Domain name not found.";
        }

        //update categories
        [AcceptVerbs("Get", "Put")]
        public string UpdateExistingCategories()
        {
            //string domain = "";
            string email = "";
            string orgunitid = "";
            string categories = "";
            string application = "";
            var param = Request.GetQueryNameValuePairs();

            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value);
                if (qs.Count == 4)   //4 
                {
                    //domain = qs["domain"];
                    email = qs["email"];
                    orgunitid = qs["orgunitid"];
                    categories = qs["categories"];
                    application = qs["application"];
                }
                else
                {
                    return "Parameters missing.";
                }
            }
            CategoriesModel categoriesModel = new CategoriesModel();
            if (!string.IsNullOrEmpty(orgunitid))  //domain
            {
                if (!string.IsNullOrEmpty(email))
                {
                    if (!string.IsNullOrEmpty(application))
                    {
                        categoriesModel.Email = email;
                        categoriesModel.OrgUnitId = orgunitid;
                        categoriesModel.Categories = categories;
                        categoriesModel.Application = application.ToLower();
                        string result = DataAccess.RefreshExistingCategory(categoriesModel);
                        return result;
                    }
                    return "Application name can't be empty.";
                }
                return "Empty email.";
            }
            return "Organization id can't be empty.";
        }

        //get domain data
        //set domain data
        [AcceptVerbs("Get", "Post")]
        public DomainDataModel GetDomainData()
        {
            string emailDomain = "";
            //var data=String.Empty;
            var param = Request.GetQueryNameValuePairs();
            DomainDataModel domainModel = new DomainDataModel();
            try
            {
                if (param != null)
                {
                    IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                    if (qs.Count == 1)
                    {
                        var getdomain = qs["email"];
                        var index = qs["email"].IndexOf('@');
                        char character = (char)92;
                        var index2 = qs["email"].IndexOf(character);
                        if (index >= 0 && index2 < 0)
                        {
                            var data = DataAccess.GetDomainData(getdomain, "email");
                            if (data == null)
                            {
                                domainModel.ApiUrl = "Domain name could not be resolved";
                                return domainModel;
                            }
                            else
                            {
                                domainModel.DomainName = data.DomainName;
                                domainModel.ApiUrl = data.ApiUrl;
                                domainModel.EmailDomain = data.EmailDomain;
                                return domainModel;

                            }
                        }
                        else if (qs["email"].IndexOf(character) >= 0)
                        {
                            var domainsplit = qs["email"].Split(character);
                            var data = DataAccess.GetDomainData(domainsplit[0], "domain");
                            var ind = 0;
                            if (domainsplit[1] != null)
                            {
                                ind = domainsplit[1].IndexOf('@');
                            }
                            if (data == null && ind >= 0)
                            {
                                data = DataAccess.GetDomainData(domainsplit[1], "email");
                                if (data == null)
                                {
                                    domainModel.ApiUrl = "Domain name could not be resolved";
                                    return domainModel;
                                }
                                else
                                {
                                    domainModel.DomainName = data.DomainName;
                                    domainModel.ApiUrl = data.ApiUrl;
                                    domainModel.EmailDomain = data.EmailDomain;
                                    return domainModel;
                                }
                            }
                            else
                            {
                                domainModel.DomainName = data.DomainName;
                                domainModel.ApiUrl = data.ApiUrl;
                                domainModel.EmailDomain = data.EmailDomain;
                                return domainModel;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                domainModel.ApiUrl = "Empty/Invalid domain name";
                return domainModel;
            }
            domainModel.ApiUrl = "Empty/Invalid domain name";
            return domainModel;
        }

        //set domain data
        [AcceptVerbs("Get", "Post")]
        public DomainDataModel SaveDomainData()
        {
            string domain = "";
            string apiUrl = "";
            string email = "";
            var param = Request.GetQueryNameValuePairs();
            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 3)
                {
                    try
                    {
                        domain = qs["domain"];  //qs["email"].Split('@')[1];
                    }
                    catch (Exception) { }
                    apiUrl = qs["apiurl"];
                    email = qs["email"];
                }
            }
            DomainDataModel domainModel = new DomainDataModel();

            if (!string.IsNullOrEmpty(domain) && domain.Contains("."))
            {
                if (!string.IsNullOrEmpty(email) && email.Contains("@") && email.Contains("."))
                {
                    if (!string.IsNullOrEmpty(apiUrl) && apiUrl.Contains("https://") && apiUrl.Contains("."))
                    {
                        string result = DataAccess.SaveDomainData(domain, apiUrl, email);
                        domainModel.ApiUrl = result;
                        return domainModel;
                    }
                    domainModel.ApiUrl = "Empty/Invalid ApiUrl.";
                    return domainModel;
                }

                domainModel.EmailDomain = "Empty/Invalid email.";
                return domainModel;
            }

            domainModel.ApiUrl = "Empty/Invalid domain name";
            return domainModel;
        }
        [AcceptVerbs("Get", "Post")]
        public void SavetrackingData()
        {
            string OrgUnitId;
            string AssetId;
            string Username;
            string TimeStamp;
            string Events;
            string Application;
            string Assetname;
            var param = Request.GetQueryNameValuePairs();
            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 6)
                {
                    try
                    {
                        OrgUnitId = qs["orgunitid"];
                        AssetId = qs["assetid"];
                        Username = qs["username"];
                        // TimeStamp = qs["timestamp"];
                        Events = qs["events"];
                        Application = qs["application"];
                        Assetname = qs["assetname"];
                        TrackingDataAcessLayer.SaveTrackingData(Guid.NewGuid().ToString(), AssetId, Username, OrgUnitId, Application, Events, Assetname);
                        // return "suuces";
                    }
                    catch (Exception ex)
                    {
                        // return ex.Message.ToString();
                    }

                }
            }
            // return "";
        }
        [AcceptVerbs("Get", "Post")]
        public string ImageToBase64(string imageurl)
        {
            Uri uri = new Uri(imageurl);
            WebClient client = new WebClient();
            byte[] imageBytes = client.DownloadData(uri);
            string base64String = Convert.ToBase64String(imageBytes);
            client.Dispose();
            return "data:image/png;base64," + base64String;
        }
        [AcceptVerbs("Get", "Post")]
        public string AddMetaData(string domainname, string email, string orgunitid, string metalist, string application)
        {
            string orgid;
            string domain;
            string mail;
            string metadatalist;
            string apps;

            var param = Request.GetQueryNameValuePairs();
            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 5)
                {
                    orgid = qs["orgunitid"];
                    domain = qs["domainname"];
                    mail = qs["email"];
                    metadatalist = qs["metalist"];
                    apps = qs["application"];
                    MetaDataModel meta = new MetaDataModel();
                    meta.Email = mail;
                    meta.DomainName = domain;
                    meta.OrgUnitId = orgid;
                    meta.MetaDataList = metadatalist;
                    meta.Application = application;
                    var data = DataAccess.AddMetaData(meta);

                }
            }
            return "success";
        }

        [AcceptVerbs("Get", "Post")]
        public string UpdateMetaData()
        {
            string partitionid;
            string metadatalist;
            var param = Request.GetQueryNameValuePairs();
            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 2)
                {
                    metadatalist = qs["metadatlist"];
                    partitionid = qs["partitionid"];
                    var data = DataAccess.UpdateMetaData(partitionid, metadatalist);

                }
            }
            return "success";
        }

        [AcceptVerbs("Get", "Post")]
        public MetaDataModel GetMetaData(string domainname, string email, string orgunitid, string application)
        { /**/
            /*Get MetaData*/
            string orgid;
            string domain;
            string mail;
            string apps;
            MetaDataModel mv = new MetaDataModel();// = null;
            var param = Request.GetQueryNameValuePairs();
            if (param != null)
            {
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
                if (qs.Count == 4)
                {
                    orgid = qs["orgunitid"];
                    domain = qs["domainname"];
                    mail = qs["email"];
                    apps = qs["application"];
                    var data = DataAccess.GetMetaData(mail, domain, orgid, apps);
                    if (data != null)
                    {

                        mv.DomainName = data.DomainName;
                        mv.Email = data.Email;
                        mv.OrgUnitId = data.OrgUnitId;
                        mv.Application = data.Application;
                        mv.MetaDataList = data.MetaDataList;
                        mv.partitionkey = data.PartitionKey;
                    }
                }
            }
            return mv;
        }
        
    }
}