/*!
 * MediaValet v0.0.1
 * Copyright 2015-2016 MediaValet. 
 */
//check jQuery dependencies
if (typeof jQuery === 'undefined') {
    throw new Error('MediaValet\'s JavaScript requires jQuery');
}
// check jQuery version
+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 1 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('MediaValet\'s JavaScript requires jQuery version 1.9.1 or higher');
    }
}(jQuery);
+(function (source, $) {

    /** apiEndPoints
    *All End Point for Media Valet API
    */
    var apiEndpoints = {
        authenticate: "/authorization/token",
        assets: "/assets",
        recentupload: "/recentlyUploaded",
        mostviewed: "/mostViewed",
        categories: "/categories",
        getclientid: "/OrganizationalUnits/current",
        getfolders: "/folders",
        getuserauthtype: "/users/current",
        attributes: "/attributes",
        renditionconfig: "/Config/renditionkinds",
        renditions: "/renditions"
    };
   
    /**Media Valet API Base Url
    */
    var mvapiUrl = {
        apiurl: 'https://mediavaletappsapi-dev.azurewebsites.net/api/mediavalet'
    }
    /**Api EndPouints
    */
    var mvapiEndpoints = {
        GetDomainData: '/getdomaindata',
        AddNewCategory: '/AddNewCategories',
        UpdateExistingCategory: '/updateexistingcategories',
        GetCategories: '/GetCategories',
        SaveTrackingData: '/SavetrackingData',
        GetMetaData: '/GetMetaData',
        UpdateMeatData: '/UpdateMeatData',
        AddMetaData: '/AddMetaData'

    }
    var currentView = {
        Assets: "1",
        RecentUpload: "2",
        MostViewed: "3"
    };
    /** API base URL
    */
    var defaultOptions = {
        ApiUrl: "https://api-test.mediavalet.net"
    };
    /** End Points for different Categories 
    */
    var returnEndPoint = function (value) {
        switch (value) {
            case currentView.MostViewed:
                return defaultOptions.ApiUrl + apiEndpoints.mostviewed;
                break;
            case currentView.RecentUpload:
                return defaultOptions.ApiUrl + apiEndpoints.recentupload;
                break;
            case 'id':
                return defaultOptions.ApiUrl + apiEndpoints.categories + '/' + mediaValet.prototype.GetCookies("currentview") + '/assets';
                break;
            default:
                return defaultOptions.ApiUrl + apiEndpoints.recentupload;
        }
    }
    var isInitialized = false;
    var isAuthenticated = false;
    var accessToken = null;
    /* So what we gonna do for now. 
        1.  Login
        2.  Search
   */
    var mediaValet = function () {
        /**
        TODO:To Do Comments Here
        * initialize function
        * @param {options}  
        */
        mediaValet.prototype.initialize = function (options) {
            defaultOptions = $.extend({}, defaultOptions, options || {});
            if (options === true) {
            
                isInitialized = true;
            }
        }
        /**
         * TODO:To DO Comments Here
         * SetCookies function
         * @param {cookiename} Cookiename 
         * @param {cookievalue} cookievalue 
         * @returns {expirydays} expirydays
         */
        mediaValet.prototype.IsGuid = function isGuid(value) {
            var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
            var match = regex.exec(value);
            return match != null;
        }
        mediaValet.prototype.SetCookies = function (cookiename, cookievalue, expirydays) {
            try {
                var d = new Date();
                d.setTime(d.getTime() + (expirydays * 1000 * 24 * 60 * 60));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cookiename + "=" + cookievalue + "; " + expires;
            } catch (e) {

            }
        }
        /**function urlmapping 
        *this will help to get the base api url to fetch the assets
        */
        mediaValet.prototype.urlmapping = function (username) { //, application (new code)
            var d = $.Deferred();
            var jsonobject = new Object();
            var emailDomain = username;//.split("@")[1];
            var data = {
                emailDomain: emailDomain //, application: application
            };
            var url = mvapiUrl.apiurl + mvapiEndpoints.GetDomainData + "?email=" + emailDomain + ""; //"&application=" + application (new code)
            var request = $.ajax({
                url: url,
                async: true
            });
            $.when(request).done(function (data) {
                jsonobject.data = data;
                d.resolve(jsonobject);
            }).fail(function (data) {
                if (data.status == 401) {
                    jsonobject.errormessage = "401";
                } else if (data.status == 500) {
                    jsonobject.errormessage = "500";
                } else {
                    jsonobject.errormessage = "Mapping Api Not Responding";
                }
                d.resolve(jsonobject);
            });
            return d.promise();
        }
        /**
       * GetCookies function
       * @param {cookiename} Cookiename 
       * @returns {Cookies} cookies Values
       */
        mediaValet.prototype.GetCookies = function (cname) {
            if (cname != null) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0)
                        return c.substring(name.length, c.length);
                }
            } else {
                return "";
            }
        }
        /**
         * TODO:TO Do Comments Here
        * authenticattion function
        * @param {UserName} userName 
        * @param {Password} password 
        * @param {URLAPI} Url API  
        * @param {function} errorCallback 
        * @returns {Object} Object,ErroMessage and Other Messages 
         * objectname.Token,objectname.RefreshToken,objectname.ExpiryToken,objectname.Message,objectname.errormessages, 
        */
        mediaValet.prototype.authentication = function (username, password, urlapi) {
            var jsonobject = new Object();
            var authCallUrl = defaultOptions.ApiUrl + apiEndpoints.authenticate;
            var d = $.Deferred();
            try {
                var request = $.ajax({
                    url: authCallUrl,
                    data: { grant_type: "password", username: username, password: password },
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("ocp-apim-subscription-key", "87b747cd3f5747489ac49cf8b4c17aa8");
                        xhr.setRequestHeader("cache-control", "no-cache");
                        xhr.setRequestHeader("contentType", "application/x-www-form-urlencoded");
                    }
                });
                $.when(request).done(function (data) {
                    jsonobject.data = data;
                    if (data.access_token != null) {
                        jsonobject.Token = data.access_token;
                        jsonobject.RefreshToken = data.refresh_token;
                        jsonobject.ExpiryToken = data.expires_in;
                        jsonobject.LoginDate = Date.UTC();
                        mediaValet.prototype.SetCookies('cookieurlapi', urlapi, 300);
                        d.resolve(jsonobject);
                    } else {
                        /**
                         * jsonObject.message will return custom error message
                         */
                        jsonobject.errormessage = "Sorry, the username and password you entered does not match any user in our system.";
                        d.resolve(jsonobject);
                    }


                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = " Sorry, the username and password you entered does not match any user in our system.";
                    }
                    d.resolve(jsonobject);
                });
            } catch (e) {
                jsonobject.exception = e.message;
                d.resolve(jsonobject);
            }
            return d.promise();

        }

        /**
        * TODO:To DO Comments Here
        * function GetClientId
        * @param {token} token
        */
        mediaValet.prototype.GetClientId = function (token) {
            var jsonobject = new Object();
            var idCallUrl = defaultOptions.ApiUrl + apiEndpoints.getclientid;
            var d = $.Deferred();
            try {
                var request = $.ajax({
                    url: idCallUrl,
                    data: null,
                    type: "GET",
                    async: false,  
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                });
                $.when(request).done(function (data) {
                    jsonobject.data = data;
                    if (data.payload.id !== null && data.payload.id !== '') {
                        jsonobject.clientid = data.payload.id;
                        d.resolve(jsonobject);
                    }
                    else {
                        jsonobject.errormessage = "Error: client id not found";
                        d.resolve(jsonobject);
                    }

                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = "Error: failed in getting client id";
                    }
                    d.resolve(jsonobject);
                });
            }
            catch (e) {
                jsonobject.exception = e;
                d.resolve(jsonobject);
            }
            return d.promise();
        }


        /**
        * function GetUserAuthType
        * get user Auth type if admin or not
        */
        mediaValet.prototype.GetUserAuthType = function (token) {
            var jsonobject = new Object();
            var d = $.Deferred();
            var userauthurl = defaultOptions.ApiUrl + apiEndpoints.getuserauthtype;
            try {
                var request = $.ajax({
                    url: userauthurl,
                    data: null,
                    type: "GET",
                    async: false,
                    crossdomain: true,
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                });

                $.when(request).done(function (data) {
                    jsonobject.data = data;
                    if (data.payload.defaultGroup !== null && data.payload.defaultGroup !== '') {
                        jsonobject.defaultGroup = data.payload.defaultGroup;
                        d.resolve(jsonobject);
                    }
                    else {
                        jsonobject.errormessage = "Error: defaultgroup not found";
                        d.resolve(jsonobject);
                    }
                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = "Error: defaultgroup not found";
                    }
                    d.resolve(jsonobject);
                });
            }
            catch (e) {
                jsonobject.exception = e;
                d.resolve(jsonobject);
            }
            return d.promise();
        }

        /** Function AddNewCategoriesRow
        *@param orgunitid Organnization Unit ID
        *@param domain is the domain name
        *@param emaild email id 
        *@param appname is the app name
        *@param categorylist is the category list  
        */
        mediaValet.prototype.AddNewCategoriesRow = function (orgunitid, domainname, emailid, appname, categorylist) {
            var jsonobject = new Object();
            var d = $.Deferred();
            /*https://mvo365demo.mediavalet.com/Mvapi/api/mediavalet/AddNewCategories */
            try {
                var request = $.ajax({
                    url: mvapiUrl.apiurl + mvapiEndpoints.AddNewCategory,
                    type: 'GET',
                    async: true,
                    crossDomain: true,
                    headers: {},
                    data: { orgunitid: orgunitid, domain: domainname, email: emailid, application: appname, categories: categorylist }
                });
                $.when(request).done(function (data) {
                
                    jsonobject.data = data;
                    if (data !== null && data !== '') {
                        d.resolve(jsonobject);
                    }
                    else {
                        jsonobject.errormessage = "Error: new categories row could not be added for new user/domain";
                        d.resolve(jsonobject);
                    }
                }).fail(function (data) {
                    jsonobject.errormessage = "Error: new categories row could not be added for new user/domain";
                    d.resolve(jsonobject);
                });
            }
            catch (e) {
                jsonobject.exception = e;
                d.resolve(jsonobject);
            }
            return d.promise();
        }

        /** Function SetRemovedPinnedCategoriesForUser
        *@param orgunitid Organnization Unit ID
        *@param domain is the domain name
        *@param emaild email id 
        *@param appname is the app name
        *@param categorylist is the category list  
        */
        mediaValet.prototype.SetRemovePinnedCategoriesForUser = function (orgunitid, appname, categorylist, email) { 
            var jsonobject = new Object();
            var d = $.Deferred();
            /*https://mvo365demo.mediavalet.com/Mvapi/api/mediavalet/updateexistingcategories*/
            try {
                var request = $.ajax({
                    url: mvapiUrl.apiurl + mvapiEndpoints.UpdateExistingCategory,
                    type: 'GET',
                    async: true,
                    crossDomain: true,
                    headers: {},
                    data: { orgunitid: orgunitid, application: appname, categories: categorylist, email: email }  
                });
                $.when(request).done(function (data) {
                  
                    if (data == "Data updated successfully") {
                        jsonobject.data = data;
                        d.resolve(jsonobject);
                    }
                    else {
                        jsonobject.errormessage = "Error: pinned categories not updated";
                        d.resolve(jsonobject);
                    }
                }).fail(function (data) {
                    jsonobject.errormessage = "Error: pinned categories not updated";
                    d.resolve(jsonobject);
                });
            }
            catch (e) {
                jsonobject.exception = e;
                d.resolve(jsonobject);
            }
            return d.promise();
        }
        /**
        * function GetCategoriesForUser
        *@param orgunitid is the organization unit
        *@param appname is the appname
        */
        mediaValet.prototype.GetCategoriesForUser = function (orgunitid, appname) {
            
            var jsonobject = new Object();
            var d = $.Deferred();
            /*'https://mvo365demo.mediavalet.com/Mvapi/api/mediavalet/GetCategories  */
            try {
                var request = $.ajax({
                    url: mvapiUrl.apiurl + mvapiEndpoints.GetCategories,
                    type: 'GET',
                    async: false, 
                    crossDomain: true,
                    headers: {},
                    data: { orgunitid: orgunitid, application: appname } 
                });
                $.when(request).done(function (data) {
                    jsonobject.data = data;
                    if (data.OrgUnitId == orgunitid) {  
                        jsonobject.Categories = data.Categories;
                        d.resolve(jsonobject);
                    }
                    else {
                        jsonobject.errormessage = "Error: categories row not found";
                        d.resolve(jsonobject);
                    }
                }).fail(function (data) {
                    jsonobject.errormessage = "Error: invalid input parameters";
                    d.resolve(jsonobject);
                });
            }
            catch (e) {
                jsonobject.exception = e;
                d.resolve(jsonobject);
            }
            return d.promise();
        }
        /** function GetFolders
        *@param token make valid request to get folders
        */
        mediaValet.prototype.GetFolders = function (token) {
            var foldersurl = defaultOptions.ApiUrl + apiEndpoints.getfolders;
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                if (defaultOptions.ApiUrl && apiEndpoints.getfolders !== null) {
                    var request = $.ajax({
                        url: foldersurl,
                        data: null,
                        type: "GET",
                        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                    });
                    $.when(request).done(function (data) {
                        deferredobj.resolve(data);
                    }).fail(function (data) {

                        jsonobject.errormessage = " API failed fetching categories";

                        deferredobj.resolve(jsonobject);
                    });
                } else {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = "API Failed to fetch Data";
                    }
                    d.resolve(jsonobject);
                }
                return deferredobj.promise();
            }
            catch (ex) {
                jsonobject.exception = ex;
                deferredobj.resolve(jsonobject);
            }
            return deferredobj.promise();
        }

        /** fucntion GetSubFolders
        *@param token is token valid request for having SubFolders
        *@param folderid get the folder ids
        */
        mediaValet.prototype.GetSubFolders = function (token, folderid) {
            var foldersurl = defaultOptions.ApiUrl + apiEndpoints.getfolders;
            foldersurl += '/' + folderid + '/subfolders?count=1000';
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                if (defaultOptions.ApiUrl && apiEndpoints.getfolders !== null) {
                    var request = $.ajax({
                        url: foldersurl,
                        data: null,
                        type: "GET",
                        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                    });
                    $.when(request).done(function (data) {
                        deferredobj.resolve(data);
                    }).fail(function (data) {

                        if (data.status == 401) {
                            jsonobject.errormessage = "401";
                        } else if (data.status == 500) {
                            jsonobject.errormessage = "500";
                        } else {
                            jsonobject.errormessage = "Api Failed to Fetch Data";
                        }
                        deferredobj.resolve(jsonobject);
                    });
                } else {
                    jsonobject.errormessage = " API failed fetching subcategories";
                    return jsonobject;
                }
                return deferredobj.promise();
            }
            catch (ex) {
                jsonobject.exception = ex;
                deferredobj.resolve(jsonobject);
            }
            return deferredobj.promise();
        }
        /** fucntion GetAssets
        *@param filter filter asset keyword
        *@param token for valid calls
        *@param offset skip number of asset
        *@param count number of asset to be taken 
        */
        mediaValet.prototype.GetAssets = function (filter, token, offset, count,appsname) {
            var apiEndValueFor = mediaValet.prototype.IsGuid(mediaValet.prototype.GetCookies("currentview")) == true ? 'id' : mediaValet.prototype.GetCookies("currentview");
            var asseturl = returnEndPoint(apiEndValueFor);
            var filters = '';
       
            if (appsname == 'outlook' || appsname == 'eloqua') {
                filters = '(Status+EQ+0)';
            } else {
                filters = '(AssetType+EQ+Image)AND(Status+EQ+0)';
            }
            var str = '?count=' + count + '&filters=' + filters + '&offset=' + offset + '&sort=title+A';
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {

                if (defaultOptions.ApiUrl !== null) {
                    if (apiEndpoints.assets !== null) {

                        var request = $.ajax({
                            url: asseturl + str,
                            data: null,
                            type: "GET",
                            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                        });
                        $.when(request).done(function (data) {
                            deferredobj.resolve(data);

                        }).fail(function (data) {
                            if (data.status == 401) {
                                jsonobject.errormessage = "401";
                            } else if (data.status == 500) {
                                jsonobject.errormessage = "500";
                            } else {
                                jsonobject.errormessage = "Api Failed to Fetch Data";
                            }
                            deferredobj.resolve(jsonobject);
                        });
                    } else {
                        /**
                         * jsonObject will return custom error message
                         */
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                        deferredobj.resolve(jsonobject);
                    }
                } else {
                    jsonobject.errormessage = " API Failed Fetching Data !!!";
                    deferredobj.resolve(jsonobject);
                }

                return deferredobj.promise();
            } catch (ex) {
                /**
                 * jsonObject.exception will return exception
                 */
                jsonobject.exception = ex;
                deferredobj.resolve(jsonobject);
            }
            return deferredobj.promise();
        }
        
        /**
         * Searching Assets
         * @param {url} url 
         * @param {seacrhing} seacrhing 
         * @param {token} token 
         * @param {setting} setting 
         * @param {filter} filter 
         * @param {sorting} sorting 
         * @param {count} count 
         * @param {offset} offset skip pages
         * @returns {jsonObject.assets will have  } 
         */
        mediaValet.prototype.SearchingAssets = function (searchtext, token, filter, sorting, count, offset, appsname) {

            var filters = '';
          
            if (sorting === 'name-down') {
                sorting = 'file.fileName+D'; 
            }
            else if (sorting === 'date-down') {
                sorting = 'record.modifiedAt+A'; 
            }
            else if (sorting === 'name-up') {
                sorting = 'file.fileName+A';  
            }
            else if (sorting === 'date-up') {
                sorting = 'record.modifiedAt+D';  
            }

            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            if (filter.toLowerCase() == 'filters') {
                if (appsname == "outlook" || appsname == "eloqua") {
                    filters = '&filters=(Status+EQ+0)';
                } else {
                    filters = '&filters=(AssetType+EQ+Image+OR+AssetType+EQ+File)AND(Status+EQ+0)';

                }
            }
            var searchCallUrl = defaultOptions.ApiUrl + apiEndpoints.assets;
            var otherparam = '?count=' + count + filters + '&offset=' + offset;
            var searchingtxt = '&search=' + searchtext;  
            var sortingtext = '&sort=' + sorting;
            var searchingurl = searchCallUrl + otherparam + searchingtxt + sortingtext; 
            try {

                if (defaultOptions.ApiUrl !== null) {
                    if (apiEndpoints.assets !== null) {
                        var request = $.ajax({
                            url: searchingurl,
                            data: null,
                            type: "GET",
                            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                        });

                        $.when(request).done(function (data) {
                            deferredobj.resolve(data);

                        }).fail(function (data) {
                            if (data.status == 401) {
                                jsonobject.errormessage = "401";
                            } else if (data.status == 500) {
                                jsonobject.errormessage = "500";
                            } else {
                                jsonobject.errormessage = " API Failed Fetching Data !!!";
                            }
                            deferredobj.resolve(jsonobject);
                        });
                    } else {
                        /**
                         * jsonObject will return custom error message
                         */
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                        deferredobj.resolve(jsonobject);
                    }
                } else {
                    jsonobject.errormessage = " API Failed Fetching Data !!!";
                    deferredobj.resolve(jsonobject);
                }
                return deferredobj.promise();
            } catch (ex) {
                /**
                 * jsonObject.exception will return exception
                 */
                jsonobject.exception = ex;
                deferredobj.resolve(jsonobject);
            }
            return deferredobj.promise();
        }
        /**
         * Validation Function
         * @param {textfieldvalue} textfieldvalue 
         * @returns {message} if Required value is not according to use else will return false 
         */
        mediaValet.prototype.Validation = function (inputtype, textfieldvalue) {
            var messages = '';
            if (inputtype.toLowerCase() === 'text' && textfieldvalue != undefined) {
                if (textfieldvalue.trim() != '') {
                    messages = '';
                } else {
                    messages = 'Please Enter value in textBox';
                }
            } else if (inputtype.toLowerCase() === 'url' && textfieldvalue != undefined) {
                if (textfieldvalue.trim() != '') {
                    messages = '';
                } else {
                    messages = 'Please Enter value in URL ' + inputtype + ' textBox';
                }
            } else if (inputtype.toLowerCase() === 'Email' && textfieldvalue != undefined) {
                if (textfieldvalue.trim() != '') {
                    messages = '';
                } else {
                    messages = 'Please Enter value in User ' + inputtype + ' Email';
                }
            } else if (inputtype.toLowerCase() === 'Password' && textfieldvalue != undefined) {
                if (textfieldvalue.trim() !== '') {
                    messages = '';
                } else {
                    messages = 'Please Enter value in ' + inputtype + ' textbox';
                }
            }
            return messages;
        }
        /** Fucntion TrackingAssets
        *@param orguinitid 
        @param assetid
        @param username
        @param timestamp
        @param events
        @application
        @assetname
        */
        mediaValet.prototype.TrackingAssets = function (orgunitId, assetId, username, timestamp, events, application,assetname) {
            try {

                var apiurl = mvapiUrl.apiurl + mvapiEndpoints.SaveTrackingData + '?orgunitId=' + orgunitId + '&assetId=' + assetId + '&username=' + username + '&events=' + events + '&application=' + application +'&assetname=' + assetname;
                $.ajax({
                    url: apiurl,
                    type: 'post',
                    async: true,
                });
            }
            catch (e) {
            }
        }

        /**function CheckExtension
        *@param, filename 
        */
        mediaValet.prototype.CheckExtension = function (filename) {
            var images = '';
            var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
            if ($.inArray(filename.toLowerCase(), fileExtension) === -1) {
                images = 'noimage';
            } else {
                images = filename;
            }
            return images;
        }
        /**Function GetQueryStringValue 
        *@param querystringvar 
        */
        mediaValet.prototype.GetQueryStringValue = function (querystringvar) {
            var qryval = '';
            var queryDict = {};
            location.search.substr(1).split("&").forEach(function (item) { queryDict[item.split("=")[0]] = item.split("=")[1] })
            $(queryDict).each(function (index, data) {
                qryval = data.view;
            });

            return qryval;
        }
        /**function GetAttributes
        *@param token
        */
        mediaValet.prototype.GetAttributes = function (token) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();

            try {
              
                var request = $.ajax({
                    url: defaultOptions.ApiUrl + apiEndpoints.attributes,
                    data: null,
                    type: "GET",
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                });

                $.when(request).done(function (data) {
                    deferredobj.resolve(data);

                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                    }
                    deferredobj.resolve(jsonobject);
                });
            } catch (ex) {

            } return deferredobj.promise();
        }

        /**fucntion AddmetaData
        *@param email 
        *@param orgunitid 
        *@param appname
        *@param domain
        *@metalist
        */
        mediaValet.prototype.AddMetaData = function (email, orgunitid, appname, domain,metalist) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();

            try {
                var qry = '?domainname=' + domain + '&email=' + email + '&orgunitid=' + orgunitid + '&metalist=' + metalist + '&application=' + appname
                var url=mvapiUrl.apiurl + mvapiEndpoints.AddMetaData + qry;
             
                var request = $.ajax({
                    url: url,
                    data: null,
                    type: "Get",
                    asyc:false,
                });

                $.when(request).done(function (data) {
                    deferredobj.resolve(data);

                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                    }
                    deferredobj.resolve(jsonobject);
                });
            } catch (ex) {

            } return deferredobj.promise();
        }
        /** function GetMetaDataList
        *@param email 
        *@param orgunitid
        *@param appname 
        *@domain
        */
        mediaValet.prototype.GetMetaDataList = function (email,orgunitid,appname,domain) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                var qry = '?domainname=' + domain + '&email=' + email + '&orgunitid=' + orgunitid + '&application=' + appname;
               
                var request = $.ajax({
                    url: mvapiUrl.apiurl + mvapiEndpoints.GetMetaData + qry,
                    data: null,
                    type: "GET",
                    asyn:false,
                });

                $.when(request).done(function (data) {
                    deferredobj.resolve(data);

                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                    }
                    deferredobj.resolve(jsonobject);
                });
            } catch (ex) {

            } return deferredobj.promise();
        }
        /** function GetAssetKeyword
        *@param token 
        *@param assetid
        */
        mediaValet.prototype.GetAssetKeyword=function(token,assetid) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();

            try {
                var url = defaultOptions.ApiUrl + apiEndpoints.assets + '/' + assetid + '/keywords';
               
                var request = $.ajax({
                    url: url,
                    data: null,
                    type: "GET",
                    async: false,
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                });
                $.when(request).done(function (data) {
                    deferredobj.resolve(data);

                }).fail(function (data) {
                    if (data.status == 401) {
                        jsonobject.errormessage = "401";
                    } else if (data.status == 500) {
                        jsonobject.errormessage = "500";
                    } else {
                        jsonobject.errormessage = " API Failed Fetching Data !!!";
                    }
                    deferredobj.resolve(jsonobject);
                });
            } catch (ex) {

            } return deferredobj.promise();
        }
        /**function Configrenditionkinds
        *@param token
        */
        mediaValet.prototype.Configrenditionkinds = function (token) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                var assetgeturl = defaultOptions.ApiUrl + apiEndpoints.renditionconfig;
                if (defaultOptions.ApiUrl !== null) {
                    if (apiEndpoints.assets !== null) {
                        var request = $.ajax({
                            url: assetgeturl,
                            data: null,
                            type: "Get",
                            async: true,
                            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                        });
                        $.when(request).done(function (data) {
                            deferredobj.resolve(data);
                        }).fail(function (data) {
                            jsonobject.errormessage = "API not responding";
                            deferredobj.resolve(jsonobject);

                        });
                    } else {
                        /**
                         * jsonObject.errormessage will return custom error message
                         */
                        jsonobject.errormessage = "Error in Asset Details";
                        deferredobj.resolve(jsonobject);
                    }
                } else {
                    /**
                     * jsonObject.errormessage will return custom error message
                     */
                    jsonobject.errormessage = "Asset Details No Error";
                    deferredobj.resolve(jsonobject);
                }
                // return jsonobject;
            } catch (ex) {

                jsonobject.exception = ex;
                deferredobj.resolve(jsonobject);
            }
            return deferredobj.promise();
        }
        /**function GetRendition
        *@param token
        *@param assetid
        */
        mediaValet.prototype.GetRendition = function (token, assetid) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                var assetgeturl = defaultOptions.ApiUrl + apiEndpoints.assets + "/" + assetid + apiEndpoints.renditions;
                if (defaultOptions.ApiUrl !== null) {
                    if (apiEndpoints.assets !== null) {
                        var request = $.ajax({
                            url: assetgeturl,
                            data: null,
                            type: "Get",
                            async: false,
                            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                        });
                        $.when(request).done(function (data) {
                            deferredobj.resolve(data);
                        }).fail(function (data) {


                        });
                    } else {
                        /**
                         * jsonObject.errormessage will return custom error message
                         */
                        jsonobject.errormessage = "Error in Asset Details";
                    }
                } else {
                    /**
                     * jsonObject.errormessage will return custom error message
                     */
                    jsonobject.errormessage = "Asset Details No Error";
                    deferredobj.resolve(jsonobject);
                }

            } catch (ex) {
                /**
                 * jsonObject.exception will return exception 
                 */
                jsonobject.exception = ex;
                deferredobj.resolve(ex);
            }
            return deferredobj.promise();
        }
        /** function GetSasUrl 
        *@param token 
        *@param assetid
        *@param renditionid
        */
        mediaValet.prototype.GetSasUrl = function (token, assetid, renditionid) {
            var jsonobject = new Object();
            var deferredobj = $.Deferred();
            try {
                var assetgeturl = defaultOptions.ApiUrl + apiEndpoints.assets + "/" + assetid + apiEndpoints.renditions + "/" + renditionid;
                var request = $.ajax({
                    url: assetgeturl,
                    data: null,
                    type: "Get",
                    async: false,
                    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); }
                });
                $.when(request).done(function (data) {
                    deferredobj.resolve(data);
                }).fail(function (data) {
                    deferredobj.resolve(data);

                });

            }
            catch (e) {
                deferredobj.resolve(e);
            }
            return deferredobj.promise();
        }
    };
    source.mvCore = new mediaValet();

})(typeof window !== "undefined" ? window : this, jQuery);