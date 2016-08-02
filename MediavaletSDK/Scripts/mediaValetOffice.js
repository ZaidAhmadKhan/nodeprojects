/*!
 * MediaValet v0.0.1
 * Copyright 2015-2016 MediaValet Office 365 App Image Insetion. 
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
        throw new Error('MediaValet\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);
+(function (source, $) {
    var mediaValetOffice = function () {
        Office.initialize = function (reason) {
        };
        /*Function InserAsset
        *@param imageurl
        *@param imagename
        *@spanid 
        *@assetid
        *@param thubs
        *@assettype
        */
        mediaValetOffice.prototype.InsertAsset = function (imageurl, imagename, spanid, assetid, thumbs, assettype) {
            $('#errormessagediv').css('display', 'none');
            $('#errormessagediv').html('');
            try {
                var Filename = mediaValetOffice.prototype.CheckExtension(imageurl);
                if (Office.context.mailbox) {

                    var imageurldec = decodeURIComponent(imageurl);
                    imageurldec = imageurl.replace(/\ /g, '%20');


                    var img = '<img src=' + imageurl + ' />';
                    var outlookdiv = '';
                    if (assettype == 'image') {
                        outlookdiv = ' <div><a href=' + imageurldec + ' target="_blank">' + imagename + '</a></div>';
                        mediaValetOffice.prototype.OutlookImageInsert(outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype);
                    } else if (assettype == 'video') {
                        outlookdiv = ' <div><a href=' + imageurldec + ' target="_blank"><div ></div>' + imagename + '</a></div>';
                        mediaValetOffice.prototype.OutlookVideoInsert(outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype);
                    } else if (assettype == 'audio') {
                        outlookdiv = ' <div><a href=' + imageurldec + ' target="_blank"><div ><div ></div>' + imagename + '</a></div>';
                        mediaValetOffice.prototype.OutlookVideoInsert(outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype);
                    } else if (assettype == 'file') {
                        outlookdiv = ' <div><a href=' + imageurldec + ' target="_blank">' + imagename + '</a></div>';
                        mediaValetOffice.prototype.OutlookImageInsert(outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype);
                    }


                } else {
                    var windowurl = window.location.search.split('|');

                    if (windowurl[1] == "Web") {

                        var appname = windowurl[0].split('_host_Info=');
                        if (appname[1].toLowerCase() == 'powerpoint' || appname[1].toLowerCase() == 'word') {
                            var base64 = mediaValetOffice.prototype.ImageToBase64(imageurl);
                            $.when(base64).done(function (data) {
                                if (data != null) {
                                    var b64str = data.data;
                                    b64str = b64str.split('data:image/png;base64,');
                                    Office.context.document.setSelectedDataAsync(b64str[1], {
                                        coercionType: Office.CoercionType.Image,
                                        imageLeft: 50,
                                        imageTop: 50,
                                    },
                                        function (asyncResult) {
                                            if (asyncResult.status === Office.AsyncResultStatus.Failed) {

                                            }
                                        });
                                }
                            }).fail(function (data) {
                            });
                        }
                    } else {
                        Office.context.document.getSelectedDataAsync(Office.CoercionType.Html,
                            function (result) {
                                if (result.status === Office.AsyncResultStatus.Failed) {
                                    var base64 = mediaValetOffice.prototype.ImageToBase64(imageurl);
                                    $.when(base64).done(function (data) {
                                        if (data != null) {
                                            var b64str = data.data;
                                            b64str = b64str.split('data:image/png;base64,');
                                            Office.context.document.setSelectedDataAsync(b64str[1], {
                                                coercionType: Office.CoercionType.Image,
                                                imageLeft: 50,
                                                imageTop: 50,
                                            },
                                                function (asyncResult) {
                                                    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                                                        var divid = "officeinsertimg" + assetid;
                                                        var div = document.getElementById(divid);
                                                        var controlRange;
                                                        var scrollposition = $(window).scrollTop();
                                                        if (document.body.createControlRange) {
                                                            controlRange = document.body.createControlRange();
                                                            controlRange.addElement(div);
                                                            controlRange.execCommand('Copy');
                                                            controlRange.execCommand('Paste');
                                                            $('#' + spanid).css('display', 'inline');
                                                            $('#' + spanid).html('Your asset has been copied over to the clipboard , you can now paste into your document by using cntr+v or paste in the contexual menu')
                                                            setTimeout(function () {
                                                                $('#' + spanid).css('display', 'none');
                                                            }, 5000);
                                                        }
                                                        $("html, body").animate({ scrollTop: scrollposition }, "slow");
                                                    }
                                                });
                                        }
                                    }).fail(function (data) {
                                    });


                                } else {
                                    var imgHTML = "<img " + "src='" + imageurl + "'" + " alt ='apps for Office image' height='200px' width='200px' img/>";
                                    Office.context.document.setSelectedDataAsync(
                                        imgHTML, { coercionType: "html" },
                                        function (asyncResult) {
                                            if (asyncResult.status == "failed") {
                                                write('Error: ' + asyncResult.error.message);
                                            }
                                        });
                                }
                            }
                        );
                    }
                }
            } catch (e) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html('Errro in insertion of image');
            }
        }
        /**Function CheckExtension 
        *@param filename
        */
        mediaValetOffice.prototype.CheckExtension = function (filename) {
            var _filename = '';
            var fileExtension = filename.split('/');
            var len = fileExtension.length;
            _filename = fileExtension[len - 1];
            return _filename;
        }
        /**Function ApplicationName
        *@param mainappname
        */
        mediaValetOffice.prototype.ApplicationName = function (mainappname) {
            var apihostname = '';
            var issupport = Office.context.requirements;
            if (mainappname == "office") {
                if (window.location.search.indexOf('_host_Info=Excel') != -1) {
                    apihostname = 'Excel';
                } else if (window.location.search.indexOf('_host_Info=Word') != -1) {
                    apihostname = 'Word';
                } else if (window.location.search.indexOf('_host_Info=Powerpoint') != -1) {
                    apihostname = 'PowerPoint';
                } else {
                    apihostname = 'Office';
                }

            }
            return apihostname;
        }
        /** Function ImageToBase64
        *@param imageurl
        */
        mediaValetOffice.prototype.ImageToBase64 = function (imageurl) {
            try {
                var jsonobject = new Object();
                var deffered = $.Deferred();
                var request = $.ajax({
                    url: 'https://mvo365demo.mediavalet.com/Mvapi/api/mediavalet/ImageToBase64?imageurl=' + imageurl,
                    type: 'GET',
                    async: true
                });
                $.when(request).done(function (data) {

                    if (data != null) {
                        jsonobject.data = data;
                        deffered.resolve(jsonobject);
                    } else {
                        jsonobject.errormessage = "Api Having Issues";
                        deffered.resolve(jsonobject);
                    }
                }).fail(function (data) {
                    jsonobject.errormessage = "APi Not responding";
                    deffered.resolve(jsonobject);
                });
            } catch (ex) {
                jsonobject.exception = ex;
                deffered.resolve(jsonobject);
            }
            return deffered.promise();
        }
        /*Function OutlookImageInsert
        *@param outlookdiv
        *@param imagename
        *@param spanid
        *@param assetid
        *@param thumbs
        *@param assettype
        */
        mediaValetOffice.prototype.OutlookImageInsert = function (outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype) {
            $('#errormessagediv').css('display', 'none');
            Office.context.mailbox.item.body.setSelectedDataAsync(outlookdiv, { coercionType: Office.CoercionType.Html }, function (result) {
                if (result.status == 'failed') {

                    //Insert Asset Url If it s non Html
                    Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setAsync(imagename + " ( " + imageurl + " )");
                    Office.cast.item.toMessageCompose(Office.context.mailbox.item).addFileAttachmentAsync(imageurl, imagename, { asyncContext: imagename },
                        function (asyncResult) {

                            if (asyncResult.status === "failed") {

                                $('#' + spanid).removeAttr("style");
                                $('#' + spanid).html('Image not attached');
                                $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -55%;margin-top: 0%;display: inline;");
                                setTimeout(function () {
                                    $('#' + spanid).removeAttr("style");
                                    $('#' + spanid).html('');
                                    $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -65%;margin-top: 0%;display: none;");
                                }, 5000);

                            } else {
                                $('#' + spanid).removeAttr("style");
                                $('#' + spanid).html('Image attached successfully');
                                $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -65%;margin-top: 0%;display: inline;");
                                setTimeout(function () {
                                    $('#' + spanid).removeAttr("style");
                                    $('#' + spanid).html('');
                                    $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -65%;margin-top: 0%;display: none;");
                                }, 5000);
                            }
                        }
                    );
                }
            });
        }
        /** Function OutlookVideoInsert
        *@param outlookdiv 
        *@param imageurl 
        *@imagename 
        *@spanid
        *@assetid
        *@thumbs
        *@assettype
        */
        mediaValetOffice.prototype.OutlookVideoInsert = function (outlookdiv, imageurl, imagename, spanid, assetid, thumbs, assettype) {
            try {
                $('#errormessagediv').css('display', 'none');
                Office.context.mailbox.item.body.setSelectedDataAsync(outlookdiv, { coercionType: Office.CoercionType.Html }, function (result) {
                    if (result.status == 'failed') {
                        Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setAsync(imagename + " ( " + imageurl + " ) ");
                        $('#' + spanid).html('Asset URL inserted successfully');
                        $('#' + spanid).removeAttr("style");
                        $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -65%;margin-top: 0%;display: inline;");
                        setTimeout(function () {
                            $('#' + spanid).removeAttr("style");
                            $('#' + spanid).html('');
                            $('#' + spanid).attr("style", "position: absolute;color: #fff;border: 1px solid #E4E3DF;background: #454545;width: 250px;margin-left: -65%;margin-top: 0%;display: none;");
                        }, 5000);

                    }
                });
            } catch (e) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html('Errro in insertion of image');
            }
        }
        /**Function ApplicationInsights
        *@param instrumentationkey 
        */
        mediaValetOffice.prototype.ApplicationInsights = function (instrumentationkey) {
            var appInsights = window.appInsights || function (config) {
                function r(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f; s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(s); try { t.cookie = u.cookie } catch (h) { } for (t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; i.length;) r("track" + i.pop()); return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) { var s = f && f(config, r, u, e, o); return s !== !0 && t["_" + i](config, r, u, e, o), s }), t
            }({
                instrumentationKey: instrumentationkey
            });
            window.appInsights = appInsights;
            appInsights.trackPageView();
        }
    }
    source.mvAppSdkCore = new mediaValetOffice();

})(typeof window !== "undefined" ? window : this, jQuery);