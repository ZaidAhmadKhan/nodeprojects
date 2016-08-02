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
        throw new Error('MediaValet\'s JavaScript requires jQuery version 1.9.1 or higher');
    }
}(jQuery);
+(function (source, $) {
    var mediaValetDrupal = function () {

        mediaValetDrupal.prototype.InsertAsset = function (imageurl) {
             try {
                var ckeditorInstance = mediaValetDrupal.prototype.GetParametor('CKEditor');
                var mvreplacetype = mediaValetDrupal.prototype.GetParametor('mvreplacetype');
                
                var mvfolderpath = mediaValetDrupal.prototype.GetParametor('mvfolderpath');
                var file_path = imageurl;

                var actual_data = file_path + '||||' + ckeditorInstance + '||||' + mvreplacetype + '||||' + mvfolderpath;

                window.parent.postMessage(actual_data, '*');
            } catch (e) {

            }
        }
        mediaValetDrupal.prototype.GetParametor = function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results == null)
                return "";
            else
                return results[1];
        }



        /**Function ApplicationInsights
          *@param instrumentationkey 
          */
        mediaValetDrupal.prototype.ApplicationInsights = function (instrumentationkey) {
            var appInsights = window.appInsights || function (config) {
                function r(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f; s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(s); try { t.cookie = u.cookie } catch (h) { } for (t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; i.length;) r("track" + i.pop()); return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) { var s = f && f(config, r, u, e, o); return s !== !0 && t["_" + i](config, r, u, e, o), s }), t
            }({
                instrumentationKey: instrumentationkey
            });
            window.appInsights = appInsights;
            appInsights.trackPageView();
        }
    };
    source.mvAppSdkCore = new mediaValetDrupal();
    
})(typeof window !== "undefined" ? window : this, jQuery);
