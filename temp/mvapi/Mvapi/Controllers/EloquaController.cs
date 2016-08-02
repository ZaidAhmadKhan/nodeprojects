using log4net;
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
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Mvapi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EloquaController : ApiController
    {
        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public EloquaController()
        {
            DataAccess.InitializeStorageAccount();
        }
        [AcceptVerbs("Post")]
        public string Create(string instance)
        {
            try
            {
                string response = "";
                logger.Info("Create Called with instance id");
                response = "{\r\n\"recordDefinition\": \r\n{\r\n\"ContactID\": \"{{Contact.Id}}\"\r\n}\r\n-\r\n\"height\": 256\r\n\"width\": 256\r\n\"editorImageUrl\": \"https://mvo365demo.mediavalet.com/develop/images/mv-logo.png\"\r\n\"requiresConfiguration\": true\r\n}";
                HttpContext.Current.Response.AddHeader("Content-type", "application/json");
                HttpContext.Current.Response.Write(response);
                HttpContext.Current.Response.End();
                logger.Info("Create Elouqa Call Done");
                return response;
            }
            catch (Exception ex)
            {
                logger.Error("Create Error");
                return ex.Message.ToString();

            }
        }


        [AcceptVerbs("Post")]
        public string Create()
        {
            string response = "";
            try
            {
                logger.Info("Create without parameter called");
                response = "{\r\n\"recordDefinition\": \r\n{\r\n\"ContactID\": \"{{Contact.Id}}\"\r\n}\r\n-\r\n\"height\": 256\r\n\"width\": 256\r\n\"editorImageUrl\": \"https://mvo365demo.mediavalet.com/develop/images/mv-logo.png\"\r\n\"requiresConfiguration\": true\r\n}";
                HttpContext.Current.Response.AddHeader("Content-type", "application/json");
                HttpContext.Current.Response.Write(response);
                HttpContext.Current.Response.End();
                logger.Info("Create without parameter is called successfully");
                return response;
            }
            catch (Exception ex)
            {
                logger.Error("Error In Create Elouuqa Controller Function Create no parameters");
                return ex.Message;
            }
        }
        [AcceptVerbs("Get")]
        public string Config()
        {
            string s = "";
            return s;
        }
        //{appId}/{installId}/{instanceId}/{userName}/{siteName}/{siteId}
        [AcceptVerbs("Post")]
        public string delete(string appId, string installId ,string instanceId,string userName,string siteName,string siteId)
        {
            //tempory function for testing purpose
            sendmail("deleting of eloqua called without instance id called  string appId, string installId ,string instanceId,string userName,string siteName,string siteId" + DateTime.Now.ToString());

            return null;
        }

        [AcceptVerbs("Post")]
        public string delete()
        {
            var param = Request.GetQueryNameValuePairs();
            string deleteresponse = "";
            try
            {
                logger.Info("Deleting of eloqua called without instance id called " + DateTime.Now.ToString());
                sendmail("Deleting of eloqua called without instance id called " + DateTime.Now.ToString());
                IDictionary<string, string> qs = param.ToDictionary(k => k.Key.ToLower(), v => v.Value.ToLower());
            
                if (qs.Count >= 1)
                {
                    string oauth_consumer_key = qs["oauth_consumer_key"];
                   
                }
                deleteresponse = "deleeted successfully";
            }
            catch (Exception ex)
            {
                sendmail("Delete Call Without Instance id" + DateTime.Now.ToString() + "   --->" + ex);
                logger.Error("Delete Call Without Instance id"+DateTime.Now.ToString()+"   --->"+ex);
                deleteresponse = ex.Message.ToString();
            }
            return deleteresponse;
        }
        [AcceptVerbs("Post")]
        public string delete(string instance)
        {
            var param = Request.GetQueryNameValuePairs();
            string deleteresponse = "";
            try
            {
            deleteresponse = DataAccess.DeleteEloquaClientDetailsWithInstanceid(instance);
            logger.Info("Deleting of eloqua called with instance id"+ instance);
            sendmail("Deleting of eloqua called with instance id-->"+instance);
            deleteresponse = "deleted successfully";
            }
            catch (Exception ex)
            {
                logger.Info("Deleting of eloqua called with instance id  "+ex);
                sendmail("Deleting of eloqua called with instance id  " + ex.Message + ex.StackTrace.ToString());
                deleteresponse = ex.Message.ToString();
            }
            return deleteresponse;
        }

        [AcceptVerbs("Post")]
        public void notify(string instance)
        {
           
            try
            {
                logger.Info("Deleting of notify called with instance id called " + DateTime.Now.ToString());
                var param = Request.GetQueryNameValuePairs();
                var imageurls = DataAccess.EloquaGetUrlforNotify(instance);
                imageurls[0] = imageurls[0].Replace(" ", "%20");
                string imageurl = "";
                var strName = ConfigurationManager.AppSettings["APIBaseUrl"];
                if (imageurls[2] == "video" || imageurls[2] == "audio" || imageurls[2] == "file")
                {
                    var urls =  HttpContext.Current.Server.UrlDecode(imageurls[1]);
                    var navurl = strName+"/eloquavideourl.html?videourl=" + imageurls[1];
                   // var playbtn = strName + "/Images/play.png";
                    imageurl="<div><a href=\"" + navurl + "\" target=\"_blank\"> <img src =\"" + imageurls[0] + "\" /><br/><span style=\"text-align:center;margin-left:20%;\">Play Video</span></a></div>"; 
                }
                else
                {
                    imageurl = "<div><a href=\"" + imageurls[0] + "\"> <img src =\"" + imageurls[0] + "\" /></a></div>";
                }

                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                HttpContext.Current.Response.AddHeader("Content-type", "text/html");
                HttpContext.Current.Response.Write(imageurl);
                logger.Info("notify image url " + imageurl);
                HttpContext.Current.Response.End();
                logger.Info("Notify with instanceid is called done");
            }
            catch (Exception ex)
            {
                logger.Info("Deleting of notify called with instance id called " + DateTime.Now.ToString()+" Error "+ex.Message.ToString());
                logger.Error("Notify with out parameter has some error " + ex);
            }
        }

        [AcceptVerbs("Post")]
        public string notify()
        {
            try
            {
                logger.Info("notify called without instance id called " + DateTime.Now.ToString());
                string notify = "";
                notify = "{\r\n\"recordDefinition\": \r\n{\r\n\"ContactID\": \"{{Contact.Id}}\"\r\n}\r\n-\r\n\"height\": 256\r\n\"width\": 256\r\n\"editorImageUrl\": \"https://mvo365demo.mediavalet.com/develop/images/mv-logo.png\"\r\n\"requiresConfiguration\": true\r\n}";
                notify = "{   < div >       < h1 > External Content </ h1 > < p > <img src=\"https://mvo365demo.mediavalet.com/develop/images/mv-logo.png\" /></ p >        </ div >}";
                HttpContext.Current.Response.AddHeader("Content-type", "text/html");
                HttpContext.Current.Response.Write(notify);
                HttpContext.Current.Response.End();
                logger.Info("Notify with no parameter is called successfully done");
                return notify;
            }
            catch (Exception ex)
            {
                logger.Error("Notify with out parameter is called without any parameters"+ex);
                return ex.Message.ToString();
            }
        }

        [AcceptVerbs("Get", "Post")]
        public string EloquaAssetTrackingSave(string instanceid, string customerid, string imageurl, string assetid, string assetname, string assettype, string token, string sasthumforvideo, string baseurl)
        {
           
            try
            {
                logger.Info("EloquaAssetTrackingSave called " + DateTime.Now.ToString());
               
                if (assettype.ToLower() == "audio" || assettype.ToLower() == "video" || assettype.ToLower() == "file")
                {
                    EloquaImageInsertBody(instanceid, customerid, sasthumforvideo, assetid, assetname, assettype, token, baseurl, imageurl);
                }
                else {
                    EloquaImageInsertBody(instanceid, customerid, imageurl, assetid, assetname, assettype, token, baseurl, "");
                }
                logger.Info("EloquaAssetTrackingSave  calling done "+DateTime.Now);
                return "success";
            }
            catch (Exception ex)
            {
                logger.Error("Error in EloquaAssetTrackingSave" + ex.Message.ToString());
                return ex.Message.ToString();

            }
        }

        public static string EloquaImageInsertBody(string instanceid, string customerid, string imageurl, string assetid, string assetname, string assettype, string token, string baseurl, string sasurl)
        {
            var response = "";
            try
            {
                string videosasurl = sasurl;
                var base64EncodedBytes = System.Convert.FromBase64String(token);
                string decodedString = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                var requesturl = baseurl + "/api/cloud/1.0/contents/instances/" + instanceid;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(requesturl);
                httpWebRequest.ContentType = "text/json";
                httpWebRequest.Method = "PUT";
                httpWebRequest.Headers.Add("Authorization", "Bearer " + decodedString);
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = "{   \"recordDefinition\": {      \"ContactID\": \"{{Contact.Id}}\",\r\n     \"EmailAddress\": \"{{Contact.Field(C_EmailAddress)}}\"\r\n  },   \"height\": 501,   \"width\": 750,   \"editorImageUrl\": \"" + imageurl + "\"  }\r\n";
                    streamWriter.Write(json);
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    response = SaveEloquaTrackingData(instanceid, customerid, imageurl, assetid, assetname, assettype, sasurl);

                }
            }
            catch (Exception ex) {
             
            }
                return response;
        }


        public static string SaveEloquaTrackingData(string instanceid, string customerid, string imageurl, string assetid, string assetname, string assettype, string sasurl)
        {
            try
            {
                /*Saving tracking data*/
                EloquaTrackingModel eloquaTracking = new EloquaTrackingModel();
                eloquaTracking.instanceid = instanceid;
                eloquaTracking.customerid = customerid;
                eloquaTracking.imageurl = imageurl;
                eloquaTracking.assetid = assetid;
                eloquaTracking.assetname = assetname;
                eloquaTracking.assettype = assettype;
                eloquaTracking.sasurl = sasurl;
                var saveornot = DataAccess.EloquaAssetTracking(eloquaTracking);
                /*Saving Eloqua Trakcing Data */

                return saveornot;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        [AcceptVerbs("Get", "Post")]
        public string EloquaAssetTrackingDelete(string baseurl, string instanceid, string customerid, string imageurl, string assetid, string assetname, string assettype)
        {

            try
            {
                logger.Info("EloquaAssetTrackingDelete Called");
                EloquaDeleteAsset(baseurl, instanceid, customerid, imageurl, assetid, assetname, assettype);
                return "";
            }
            catch (Exception ex)
            {
                logger.Error("EloquaAssetTrackingDelete Error and excetion " + ex);
                return ex.Message.ToString();
            }
        }

        public static bool EloquaDeleteAsset(string baseurl, string instanceid, string customerid, string imageurl, string assetid, string assetname, string assettype)
        {
            try
            {


                var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://secure.p02.eloqua.com/API/REST/1.0/assets/contentSection/4");
                httpWebRequest.ContentType = "text/json";
                httpWebRequest.Method = "DELETE";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var responseText = streamReader.ReadToEnd();
                }
            }
            catch (Exception)
            {

            }
            return true;
        }



        [AcceptVerbs("Get")]
        public string GetToken(string code, string base64, string appurl)
        {
            try
            {
             
                var base64EncodedBytes = System.Convert.FromBase64String(code);
                string decodedString = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                string postdata = "grant_type=authorization_code&code=" + decodedString + "&redirect_uri=" + appurl;
                var Response = PostWebAPIForToken(postdata, base64);
                if (Response == "The remote server returned an error: (400) Bad Request.")
                {
                    var returnstr = "{\"fail\":\"fail\"}";
                    return returnstr;
                }
                else
                {
                    return Response;
                }
            }
            catch (Exception ex)
            {
                return "fail";
            }
        }

        string PostWebAPIForToken(string parsedContent, string base64)
        {
            try
            {
                var baseAddress = "https://login.eloqua.com/auth/oauth2/token";
                var http = (HttpWebRequest)WebRequest.Create(new Uri(baseAddress));
                http.ContentType = "application/x-www-form-urlencoded";
                http.Method = "POST";
                http.Headers.Add("Authorization", "Basic " + base64);

                ASCIIEncoding encoding = new ASCIIEncoding();
                Byte[] bytes = encoding.GetBytes(parsedContent);

                Stream newStream = http.GetRequestStream();
                newStream.Write(bytes, 0, bytes.Length);
                newStream.Close();

                var response = http.GetResponse();

                var stream = response.GetResponseStream();
                var sr = new StreamReader(stream);
                string content = sr.ReadToEnd();
                var elouqaresponse = (JsonConvert.DeserializeObject(content)).ToString();
                return elouqaresponse;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        [AcceptVerbs("Get")]
        public string EloquaRefreshTokens(string refreshtoken, string base64, string appurl)
        {
            try
            {
                logger.Info("EloquaRefreshTokens Called" + DateTime.Now);
                var base64EncodedBytes = System.Convert.FromBase64String(refreshtoken);
                string decodedString = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                string postdata = "grant_type=refresh_token&refresh_token=" + decodedString + "&scope=full&redirect_uri=" + appurl;
                var Response = PostWebAPIForRefreshToken(postdata, refreshtoken, base64);
                return Response;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }

        }
        string PostWebAPIForRefreshToken(string parsedContent, string refreshtoken, string base64)
        {
            try
            {
                var baseAddress = "https://login.eloqua.com/auth/oauth2/token";
                var http = (HttpWebRequest)WebRequest.Create(new Uri(baseAddress));
                http.ContentType = "application/x-www-form-urlencoded";
                http.Method = "POST";
                http.Headers.Add("Authorization", "Basic " + base64);

                ASCIIEncoding encoding = new ASCIIEncoding();
                Byte[] bytes = encoding.GetBytes(parsedContent);

                Stream newStream = http.GetRequestStream();
                newStream.Write(bytes, 0, bytes.Length);
                newStream.Close();

                var response = http.GetResponse();

                var stream = response.GetResponseStream();
                var sr = new StreamReader(stream);
                var content = sr.ReadToEnd();

                var elouqaresponse = (JsonConvert.DeserializeObject(content)).ToString();
                return elouqaresponse;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        [AcceptVerbs("Get")]
        public string EloquaGetOauthCode(string clientid)
        {
            /*This will fetch client secret code  into base64 format for Oauth request to get token */
            try
            {
                string clientbase64 = DataAccess.EloquaGetOauthBase64(clientid);
                return clientbase64;
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        [AcceptVerbs("Get")]
        public string EloquaSaveClientSecret(string clientid, string clientsecret)
        {
            try
            {
                byte[] byt = System.Text.Encoding.UTF8.GetBytes(clientid + ":" + clientsecret);
            string clientbase64 = Convert.ToBase64String(byt);
            EloquaClientOauthModel model = new EloquaClientOauthModel();
            model.clientid = clientid;
            model.clientsecretcode = clientsecret;
            model.clientbase64 = clientbase64;
            
                DataAccess.EloquaSaveOauthBase64(model);
                return "Client ID " + clientid + " saved successfully in database";
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
        [AcceptVerbs("Get")]
        public string GetBaseUrl(string token)
        {
            string baseurl = "";
            var elouqaresponse = "";
            try
            {
                string decodedtoken = HttpUtility.UrlDecode(token);
                var baseAddress = "https://login.eloqua.com/id";
                var http = (HttpWebRequest)WebRequest.Create(new Uri(baseAddress));
                http.ContentType = "application/json";
                http.Method = "GET";
                http.Headers.Add("Authorization", "Bearer " + decodedtoken);
                var response = http.GetResponse();
                var stream = response.GetResponseStream();
                var sr = new StreamReader(stream);
                var content = sr.ReadToEnd();
                elouqaresponse = (JsonConvert.DeserializeObject(content)).ToString();
            }
            catch (Exception ex)
            {
                elouqaresponse = ex.Message.ToString();
            }
            return elouqaresponse;
        }
        public void sendmail(string messages)
        {
            var fromAddress = new MailAddress("zaidahmadkhan1001100@gmail.com", "Eloqua Delete Api");
            var toAddress = new MailAddress("zaidkhan@dynaptsolutions.com", "Dynapt");
            const string fromPassword = "MyNameisKhan";
            const string subject = "Eloqua Delete Apiis called";
             string body = messages;

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
