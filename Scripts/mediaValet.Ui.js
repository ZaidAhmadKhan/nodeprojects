/**!
 *MediaValet
 *@version 0.0.1
 *Copyright 2015-2016 MediaValet.
 */
/**
*Checks mvCore dependencies
*/
+function ($, mvCore, mvAppSdkCore) {
    'use strict';
    if (typeof mvAppSdkCore === "undefined") {
        throw new Error("MediaValetSdk Error : Media Valet Office  Core is not loaded. First load Media Valet Core then load SDK.")
    }
    if (typeof mvCore === "undefined") {
        throw new Error("Media Valet Sdk Error: Media Valet Sdk Core is not loaded. First load Media Valet Core then load SDK.")
    }

}(jQuery, mvCore, mvAppSdkCore);

/**
*Sets variables.
*Defines and calls the functions for SDK UI.
*/
(function ($) {
    $.fn.hasScrollBar = function () {
        return this.height() > $(window).height();
    }
})(jQuery);
+function ($, source, mvCore, mvAppSdkCore) {
    'use strict';
   /* All Global Vairables Declaration Start Here */
   var eloquaoauth_consumer_key = '', eloquainstanceid = ''; var lastplayedeloquavideo = '', lastplayedvideoid='';
   var myididididdss = '';
   var sasurlcount = 1;
   var thumbsimageheighteloqua = 0;
    var videotagidlist = [];
    var renditionsidlist = [];
    var rendtiondescription = [];
    var renditiondescriptionforimage = [];
    /** Global variables */
    var globalvarclientid = '';
    var cancelmetabuttonlist = "";
    var cancelmetabuttonlistchckornot = '';
    var globalvarbrowsername = '';
    var globalvarmedataidlist = [];
    var globalvarmetadatalist = [];
    var globalvartempmetalist = [];
    var globalvartempmetaidlist = [];
    var globalhootsuiteoverlayheight = 0;
    var glovalthubdivheight = 0;
    var globalimageperowhootsuite = 0;
    var globalappname = '';
    var usernameglobalvar = '';
    var assetOfflineList = [];
    var flydownheight = 0;
    var scrollbarrun = true;
    var duplicateAssetOfflineList = [];
    var imagecounter = 0;
    var offsetcount = 0;
    var defaultsettings = new Object();
    /** Paging variables */
    var recentlyviewedoffset = 0;
    var recentlyviewedcount = 10;
    var mostviewedoffset = 0;
    var mostviewedcount = 10;
    var containerid = '';
    /** Screen name Navigation Variable. */
    var screenname = "login";
    /** Creates all basic template models.  */
    var isRequestSent = true;
    var selecteditemsassetid = [];
    var selecteditemsasseturl = [];
    var selecteditemsassetsize = [];

    /**
    Variable to store user-specific category list
    */
    var domaincatlist = [];
    var currentView = {
        Assets: 1,
        RecentUpload: 2,
        MostViewed: 3,
        Categories: 4
    };
    var hootsuiteopenview = '';
    var categoryname = '';
    var imagecountonscroll = 0;
    var checkstatus = false;
    /*
    All Global Variables End here
    */
    var TemplateModel = {
        /**
        *@param {bool} activity - The desired value of Loader to show or hide.
        */
        Loader: function (activity) {
            if (activity === true) {
                var divheight = $(document).height();
                $('#mydiv').css('height', divheight);
                $('#mydiv').css('display', 'flex');
            } else {
                $('#mydiv').css('display', 'none');
            }
        },
        LargeViewLoader: function (activity) {
            $("#mydiv").find("img").hide();
            if (activity === true) {
                $('#mydiv').height($(window).height() + 3000);
                $('#mydiv').attr("style", "display:block;");

            } else {
                $('#mydiv').attr("style", "display:none");

            }
        },

        /**
        *@param {string} msg - The desired message to show.
        */
        Message: function (msg) {
            var message = '<div id="mv-message" style="background-color: rgba(255, 0, 0, 0.18); color:#000; width:300">' + msg + '</div>';
            $('body').append(message).show();
            setTimeout(function () {
                $('#mv-message').fadeOut().delay();
                setTimeout(function () { $('#mv-message').remove(); }, 1000);
            }, 4000);
        },

        /**
        *Login template ios defined here
        *@return {html} User interface for the login screen.
        */
        LoginTemplate: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            var mvurl = options.mediavaleturl;
            var ui = '<div class="logo"><img src="images/mv-logo.png" alt="MediaValet" /></div>' +
                '<div class="login-comment"><h4>The Mediavalet add-in lets you search and pick relevant assets from your enterprise media library</h4> Get started by logging into your Mediavalet library</div>' +
                '<div class="login-block">' +
                        '<h1>' + defaults.customText + '</h1>' +
                        '<input type="text" id="urltxt" placeholder="Enter URL"  class="textbox" style="display:none" />' +
                        '<input type="text" value="" placeholder="Username" id="useremailtxt" />' +
                        '<input type="password" value="" placeholder="Password" id="passwordtxt" />' +
                        '<input type="button" value="Submit" id="mv-login" class="loginbutton" />' +
                '<div class="learn-more">Don&#8217;t have a MediaValet account? <a href=' + mvurl + ' target="_blank" >Learn more about MediaValet</a></div>' +
                        '<div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div>' +
                    '</div>'
            return ui;
        },

        /**
        Search Template 
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for search screen.
        */
        SearchTemplate: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            var searchpanels = '';
            defaults = options;
            if (options.setting != null || options.setting != undefined) {
                if (options.setting == true) {
                    searchpanels = '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox"><button class="officedots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;" id="menubtnimg"  /></button><button class="edit" id="searchsettingsbtn" style="display: block;"><img src="images/setting.png" style="max-width: 24px;"  /></button><div class="styled-select" id="selectassetcategories"><p id="selectassetcategoriesparagraph" data-clicked="no" class="paragraphdropdown" >Featured Categories</p><img src="images/down_arrow.png" id="selectassetcategoriesimgid"><div class="selectOfficeDropdown" id="selectOfficeDropdownid"><ul id="selectOfficeDropdownul">' +
                '<li id="recentview">Recently Uploaded</li>' +
                '<li id="mostviewed">Most Viewed</li>' +
                '</ul></div></div><input class="officesearchbtn" type="text" placeholder="Search all asset" id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="officemenu1"><ol id="officemenuol"><li id="liEditMetaData" style="display:none">Edit Attributes</li><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="pptexcelmessagediv"></div>';
                } else {
                    searchpanels = '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox"><button class="officedots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;" id="menubtnimg"  /></button><button class="edit" id="searchsettingsbtn" style="display: block;"><img src="images/setting.png" style="max-width: 24px;"  /></button><input class="officesearchbtn" type="text" placeholder="Search all assets" id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="styled-select" id="selectassetcategories"><p id="selectassetcategoriesparagraph" class="paragraphdropdown" >Featured Categories</p><img id="selectassetcategoriesimgid" src="images/down_arrow.png" style="height: 10px;margin: auto;"><div class="selectOfficeDropdown" id="selectOfficeDropdownid"><ul id="selectOfficeDropdownul">' + '<li id="recentview">Recently Uploaded</li>' + '<li id="mostviewed">Most Viewed</li>' + '</ul></div></div><div class="officemenu1"><ol id="officemenuol"><li style="display:none" id="liEditMetaData">Edit Metadata</li><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="pptexcelmessagediv"></div>';
                }
            } else {
                searchpanels = '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox"><button class="officedots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;" id="menubtnimg"  /></button><button class="edit" id="searchsettingsbtn" style="display: block;"><img src="images/setting.png" style="max-width: 24px;"  /></button><div class="styled-select" id="selectassetcategories"><p class="paragraphdropdown" id="selectassetcategoriesparagraph" >Featured Categories</p><img id="selectassetcategoriesimgid" src="images/down_arrow.png"><div class="selectOfficeDropdown selectOfficeDropdown" id="selectOfficeDropdownid"><ul id="selectOfficeDropdownul">' +
                '<li id="recentview">Recently Uploaded</li>' +
                '<li id="mostviewed">Most Viewed</li>' +
                '</ul></div></div><input class="officesearchbtn" type="text" placeholder="Search all assets" id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="officemenu1"><ol id="officemenuol"><li id="liEditMetaData" style="display:none">Edit Attributes</li><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="pptexcelmessagediv"></div>';
            }


            return searchpanels;
        },

        /**
        Hootsuite Template
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for hootsuite app search screen.
        */
        HootSuitSearchTemplate: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            var menuliclass = '', dropdownmenu = '', dropdownsort = '';
            hootsuiteopenview = mvCore.GetQueryStringValue('view');
        
            dropdownmenu = '<div class="hootsuitestyled-select" id="selectassetcategories"><p class="paragraphdropdown" id="selectassetcategoriesparagraph" >Featured Categories</p><img id="selectassetcategoriesimgid" src="images/down_arrow.png" style="height: 10px; width: 10px;margin: auto;"><div class="selecthootsuiteDropdown"><ul id="selectDropdownul"><li id="recentview">Recently Uploaded</li><li id="mostviewed">Most Viewed</li></ul></div></div>';
            menuliclass = 'menu1';
            dropdownsort = '<div class="hootsuitestyled-sortselect" ><div id="selectsortdivid" class="paragraphwithimg"><p class="paragraphsortdropdown" id="selectsortparaid" >Select</p><img id="selectsortimgid" src="images/down_arrow.png" style="height: 10px; width: 10px;margin: auto;" /></div><div class="selecthootsuitesortDropdown"><ul id="selectsortulid"><li id="sortedbyname">Name</li><li id="sortbydateid">Date</li></ul></div></div>';
            return '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="hootsuiteSearchBox"><label id="countingselectionlabel" class="countingselection"><svg class="icon icon-share-square-o"><use xlink:href="#icon-share-square-o"></use></svg><span class="counting--text">Attach and Compose</span> (<label id="countofimageslabel">0</label>)</label><div class="viewBlock"><label>View</label>' + dropdownmenu + '</div><div class="searchBlock"><input type="text" placeholder="Search.." id="searchtxt" class="hootsuitesearchbtn"/><div id="searchbtn" class="hootsuitesearch"><svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg></div></div><div class="sortBlock"><label>Sort By</label>' + dropdownsort + '</div><div id="hootsuitgeardiv"><div id="hootsuitebtnwithimgid"><button id="hootsuitgearbtn"  class="hootsuitegear"  style="display: block;"><svg class="icon icon-cog"><use xlink:href="#icon-cog"></use></svg></div></button></div><label id="logout">Logout</label><div class="hootsuitegearmenu1"><ol><li id="liEditMetaData" style="display:none">Edit Attributes</li><li style="display:none" id="liHootsuiteFeaturedCategory">Edit Featured Category</li><li id="liAbout">About</li>' +
                                '</ol></div><div class="' + menuliclass + '"><ol><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="imagesexcelandpowerpointdiv"><img id="imagesexcelandpowerpointimg" style="display:none" /></div><div id="pptexcelmessagediv"></div>';
        },

        /**
        Drupal  Template 
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for Drupal search screen.
        */
        DrupalSearchTemplete: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            var searchpanels = '';
            defaults = options;
            searchpanels = '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox"><button class="officedots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;" id="menubtnimg"  /></button><button class="edit" id="searchsettingsbtn" style="display: block;"><img id="searchsettingsimg" src="images/setting.png" style="max-width: 24px;"  /></button><div class="styled-select" id="selectassetcategories"><p id="selectassetcategoriesparagraph" class="paragraphdropdown" >Featured Categories</p><img src="images/down_arrow.png" id="selectassetcategoriesimgid" style="height: 10px;margin: auto;"><div class="selectOfficeDropdown" id="selectOfficeDropdownid"><ul id="selectOfficeDropdownul">' + '<li id="recentview">Recently Uploaded</li>' + '<li id="mostviewed">Most Viewed</li>' + '</ul></div></div><input class="officesearchbtn" type="text" placeholder="Search all assets" id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="officemenu1"><ol id="officemenuol"><li id="liEditMetaData" style="display:none">Edit Attributes</li><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="pptexcelmessagediv"></div>';
            return searchpanels;
        },

        /**
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for Edit Categories screen.
        */
        EditCatTemplate: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            return '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox"><button class="officedots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;"  /></button><button class="edit" id="searchsettingsbtn" style="display: block;"><img src="images/setting.png" style="max-width: 24px;"  /></button><select id="selectassetcategories"><option value="selectcategory">Featured Category</option><option value="recentview">Recently Uploaded</option><option value="mostvisited">Most Viewed</option>' +
                '<option value="editcategories">Edit Categories</option>' +    //Hard-coded Edit Categories temporarily
                '</select><input type="text" placeholder="Search.." id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="officemenu1"><ol id="officemenuol"><li id="liEditMetaData" style="display:none">Edit Attributes</li><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="categorieslistdiv"><strong>Hello <hr /></strong> This is category list div. </div>';
        },

        /**
        Hootsuite  Template 
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for hootsuite edit category screen.
        */
        HootSuitEditCatTemplate: function (options) {
            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            return '<div class="mainlogindiv"><div class="medialibraryMain" id="mycontainertestid"><div class="searchBox hootsuiteSearchBox"><label id="countingselectionlabel">0 Item Selected</label><button class="hootsuiteedit" id="hootsuitmenubtn" style="display: block;"><img src="images/edit.png" style="max-width: 24px;"  /></button><button class="dots" id="menubtn" href="#modal"><img src="images/dots.png" style="max-width: 24px;"  /></button><div class="styled-select" id="selectassetcategories"><p style="margin: 0;font-size:15px;width: 87%;" >Featured Categories</p><img src="images/down.png"><div class="selectOfficeDropdown"><ul><li>Recently Uploaded</li><li>Most Viewed</li><li>halloween</li></ul></div></div><input type="text" placeholder="Search.." id="searchtxt" /><div id="searchbtn" class="search"><img src="images/search-icon.png" /></div><div class="menu1"><ol><li id="liSortbyName">Sort by Name<span id="sortnamespan"></span></li><li id="liSortbyDate" >Sort by Date<span id="sortdatespan"> </span></li><li id="liAbout">About</li><li id="liLogout">Logout</li></ol></div><div class="menu2"><ol><li id="liSmall">Small</li><li id="liMedium">Medium</li><li id="liLarge">Large</li></ol></div><div class="menu3"><ol><li>1st image</li><li>2nd image</li><li>3rd image</li><li>4th image</li></ol></div></div><div class="clear"></div><div id="errormessagediv" class="alert-box error" ></div><div id="infomessagediv" class="infoalert-box info" ></div><div class="medialibrary"><div class="clear"></div><p id="mediavaletlibraryparaid"></p><div class="contentBox" id="bindsearchdatadiv" ></div></div></div> </div><div id="categorieslistdiv"><strong>Hello <hr /></strong> This is HootSuite category list div. </div>';
        },

        /**
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for Recently Uploaded category.
        */
        RecentlyUploadedTemplate: function (options) {

            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            return '<section class="ac-container"><div><input id="ac-1" name="accordion-1" checked type="checkbox"><label for="ac-1">Recently Uploaded</label><article class="ac-small"><div class="" id="recentlyuploadeddiv"></div></article></div></section>';
        },

        /**
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for Most Viewed category.
        */
        MostViewedTemplate: function (options) {

            var defaults = {
                customText: 'Welcome'
            }
            defaults = options;
            return '<section class="ac-container"><div><input id="ac-2" name="accordion-1" checked type="checkbox"><label for="ac-2">Most Viewed</label><article class="ac-small"><div class="" id="mostvieweddiv"></div></article></div></section>';
        },

        /**
        *@param {string} options - The desired welcome message to show.
        *@return {html} User interface for About Us page.
        */
        AboutTemplate: function (activity) {
            var about = '<div id="mv-about" class="modal-box"> ' +
                    '<header>' +
                        '<a class="js-modal-close close" onclick="javascript:$(&#39;#mv-about&#39;).remove()">×</a>' +
                    '</header>' +
                    '<div class="modal-body">' +
                        '<div class="divLogo"><img src="images/mv-logo.png" alt="MediaValet" /></div>' +
                        '<h3>MediaValet  v1.2.0.0</h3>' +
                        '<p>&copy; 2015 MediaValet </p>' +
                        '<p>The MediaValet name, associated trademarks and logo are trademarks of MediaValet or related entities.</p>' +
                        '<p>Warning: This program is protected by copyright law and international treaties. Unauthorized reproduction or' +
                        ' distribution of this program, or any portions of it, may result in severe civil and criminal penalties, and will' +
                        ' be prosecuted to the maximum extent possible under the law.</p>' +
                    '</div><br />' +
                    '</div>';

            if (activity === true) {
                $('body').append(about);
            } else {
                $('#mv-about').remove();
            }
        },

        /**
        Session Expired PopUp Template  
        *@param {string} activecheck - activecheck true or false value will set if it should be shown or hidden.
        *@return {html} User interface for search screen.
        */
        SessionExpiredPopUp: function (activecheck) {
            var popup = '<div id="sessionexpiredpopupdiv" class="modal-box"> ' +
                    '<header>' +
                        '' +
                    '</header>' +
                    '<div class="modal-body">' +
                        '<div class="divLogo"><img src="images/mv-logo.png" alt="MediaValet" /></div>' +
                        '<h3></h3>' +
                        '<p>Your session has expired</p>' +
                        '<p>Please log-in again</p>' +
                        '<p><input id="sessionexpiredlogin" style=" background:none!important; border:none;   padding:0!important;font: inherit;       border-bottom:1px solid #444; cursor: arrow;" type="submit" value="Log-in" /></p>' +
                    '</div><br />' +
                    '</div>';

            if (activecheck === true) {
                $('body').append(popup);

            } else {
                $('#sessionexpiredpopupdiv').remove();
            }
            $('#sessionexpiredclosebtn').click(function () {
                Events.SessionExpirePopUpEvent();

            }); $(document).on("click", "#sessionexpiredlogin", function () {
                Events.SessionExpirePopUpEvent();
            });
        },

    };

    /**
    *Creates basic model with all the basic events
    *@return {html} Templates for different UI screens.
    */
    var Model = (function () {
        return {
            /** @private */
            ShowLoader: function () {
                TemplateModel.Loader(true);
            },
            /** @private */
            HideLoader: function () {
                TemplateModel.Loader(false);
            },
            /** @private */
            ShowLargeViewLoader: function () {
                TemplateModel.LargeViewLoader(true);
            },
            /** @private */
            HideLargeViewLoader: function () {
                TemplateModel.LargeViewLoader(false);
            },
            /** @private */
            Message: function (message) {
                return TemplateModel.Message(message);
            },
            /** @private */
            LoginPanel: function (options) {
                return TemplateModel.LoginTemplate(options);
            },
            /** @private */
            SearchPanel: function (options) {
                hootsuiteopenview = mvCore.GetQueryStringValue('view');
                if (options.apps == 'office' || options.apps == 'outlook' || options.apps == 'eloqua' || options.apps == 'mobileapp') {
                    return TemplateModel.SearchTemplate(options);
                } else if (options.apps === 'hootsuite') {
                   
                    return TemplateModel.HootSuitSearchTemplate(options);
                   
                } else if (options.apps == 'default') {
                    return TemplateModel.SearchTemplate(options);
                } else if (options.apps == 'drupal') {
                    return TemplateModel.DrupalSearchTemplete(options);
                }
            },
            EditCatPanel: function (options) {
                 if (options.apps == 'office' ) {
                    return TemplateModel.EditCatTemplate(options);
                 } else if (options.apps == 'mobileapp') {
                     return TemplateModel.EditCatTemplate(options);
                 } else if (options.apps === 'hootsuite') {
                    return TemplateModel.HootSuitEditCatTemplate(options);
                } else if (options.apps == 'default' || options.apps == '') {
                    return TemplateModel.EditCatTemplate(options);
                } else if (options.apps == 'drupal' || options.apps == '') {
                    return TemplateModel.EditCatTemplate(options);
                } else if (options.apps === 'outlook') {
                    return TemplateModel.HootSuitEditCatTemplate(options);
                } else if (options.apps === 'eloqua') {
                    return TemplateModel.HootSuitEditCatTemplate(options);
                }
            },
            /** @private */
            RecentlyUploadedPanel: function (options) {
                return TemplateModel.RecentlyUploadedTemplate(options);
            },
            MostViewedPanel: function (options) {
                return TemplateModel.MostViewedTemplate(options);
            },
            /** @private */
            //AboutPanel: function (options) {
            //    return TemplateModel.AboutTemplate(options);
            //}
            /** @private */
            ShowAboutPanel: function () {
                TemplateModel.AboutTemplate(true);
            },
            SessionExpirePanel: function () {
                TemplateModel.SessionExpiredPopUp(true);
            },
            /** @private */
            HideAboutPanel: function () {
                TemplateModel.AboutTemplate(false);
            }
        };
    })();

    /**
    *Renders images returned as searched result on search UI
    *@return {images} Searched images
    */
    var SearchingScreen = (function () {
        return {
            ImageLoading: function (token, asset, offset, category) {
                try {
                    $('.error').css({
                        "border-color": "#fa8072", "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                    });
                    var payloadassets = 0;
                    var totalassets = 0;

                    $('#showmoreassetbtndiv').off('click');
                    //   $('#bindsearchdatadiv div.showmoreassetdiv').unbind().on("click", 'div[id="showmoreassetbtndiv"]');
                    $('#errormessagediv').css('display', 'none');
                    $('#infomessagediv').css('display', 'none');
                    $('#errormessagediv').html('');
                    var appsname = defaultsettings.apps;
                    var selectdropdownassetsizestyle = '';
                    var selectbuttonstyle = '';

                    if (asset.payload.assetCount != null && asset.payload.assetCount != 0) {
                        // var databind = '<section class="image-grid">';
                        payloadassets = asset.payload.assets.length;
                        totalassets = asset.payload.assetCount;
                        var databind = '';
                        var inc = imagecounter;
                        if (asset.payload != null) {     /**
                                     *Offset is 0 means image div loading
                                     *first time so it should be empty before going to
                                     *load all images into it
                            */
                            var assetcreateddate = '', flydowndownplaybtn = '', flydownazureplayerdiv = '';
                            var assetname = '', overallassetrating = '', userrating = '', assetid = '', insertbtncsshideshow = '', assetcheckboxid = '', hootsuitdiv = '', hootsuitrating = '', assetcheckboxdiv = '', hootsuitebggrey = '', lowerhootsuitediv = '', imageinserthootsuitebtn = '', hootsuiteborderradius = '', hootsuitelowerdivid = '', arrowimagehootsuite = '', titledipayornot = '', shareassetmenuol = '', largeviewimgid = '';
                            var lishareassetmedium = '', lishareassetlarge = '', lishareassetsmall = '', lishareassetoriginal = '', liextralarge = '', outlookarrowimage = '', shareassetmenuclass = '', strempath = '';
                            /**/
                            var filename = '', filetype = '', filesize = '', title = '', _title = '', description = '', descriptionstyle = '', expirydate = '', modified = '', uploadedat = '', keywords = '', imageheight = '', imagewidth = '', approveddate = '', descriptionsdiv = '', originalfileformat = '', price = '', publicurl = '', userratingtr = '', overallratingtr = '', uploadedby='';
                            if (offset === 0) {
                                sasurlcount = 1;
                                $('#bindsearchdatadiv').off("click");
                                $('#bindsearchdatadiv').html('');
                                 var apps = defaultsettings.apps;
                                $('#bindsearchdatadiv').load();
                                $('#bindsearchdatadiv').empty();
                                $('#bindsearchdatadiv').remove();
                                $('.medialibrary').append('<div class="contentBox" id="bindsearchdatadiv"></div>');
                                imagecounter = 1;
                                inc = imagecounter;
                                assetOfflineList = [];
                                if (appsname === 'hootsuite') {
                                    selecteditemsassetid.splice(0, selecteditemsassetid.length);
                                    selecteditemsasseturl.splice(0, selecteditemsasseturl.length);
                                    selecteditemsassetsize.splice(0, selecteditemsassetsize.length);
                                }
                            }
                            /** Binding all images fetched from API */
                            var assets = asset.payload.assets;
                            $(assets).each(function (index, alllinks) {
                           var checkifimage = '', extensions = '';
                                if (alllinks.file != null && alllinks.file != undefined) {
                                    checkifimage = mvCore.CheckExtension(alllinks.file.fileType.toLowerCase());
                                }
                                //if (checkifimage !== 'noimage') {
                                $(alllinks).each(function (k, medialinks) {
                                  outlookarrowimage = '';
                                    /** IsoString Date format (UTC dateformat with world time line) */
                                    if (medialinks.record.createdAt !== null && medialinks.record.createdAt !== '') {
                                        arrowimagehootsuite = '';
                                        var getdate = new Date(medialinks.record.createdAt);
                                        assetcreateddate = getdate.getFullYear() + '-' + (getdate.getMonth() + 1) + '-' + getdate.getDate();
                                        if (medialinks.file != undefined) {
                                            assetname = medialinks.file.fileName;
                                        }
                                        assetid = medialinks.id;
                                        overallassetrating = medialinks.rating.average;
                                        userrating = medialinks.rating.user;
                                        if (medialinks.file != undefined) {
                                            filename = medialinks.filename;
                                        }
                                        description = '';
                                        if (medialinks.title != undefined) {
                                            if (globalvarmetadatalist.indexOf('title') != -1) {
                                                titledipayornot = "style=display:none";
                                            } else {
                                                titledipayornot = '';
                                            }
                                            title = medialinks.title;
                                        } else if (medialinks.file.title != undefined && medialinks.file.title != '') {
                                            if (globalvarmetadatalist.indexOf('title') != -1) {
                                                titledipayornot = "style=display:none";
                                            } else {
                                                titledipayornot = '';
                                            }
                                            title = medialinks.file.title;
                                        } else if (medialinks.file != undefined) {
                                            title = medialinks.file.fileName;
                                        }
                                        if (medialinks.description !== undefined) {
                                            description = medialinks.description;
                                        } else {
                                            description = '';
                                        }
                                    }
                                    if (assetOfflineList.indexOf(assetid) < 0) {    //Code to prevent duplicate assets to get loaded on screen disabled
                                        $(medialinks.media).each(function (index, links) {
                                            var large = 'noimage', small = 'noimage', original = 'noimage', thumbs = 'noimage', medium = 'noimage';
                                            var elassettype = '';
                                              var assettypes = links.type.toLowerCase();
                                            var flydowndiv = '';
                                             selectbtnid = category + '_' + inc + '_' + 'selectbtn' + '_' + assetid;

                                            if (links.large !== undefined) {
                                                large = links.large.trim(); //mvCore.CheckExtension(links.large.trim());
                                            }
                                            if (links.small !== undefined) {
                                                small = links.small.trim(); // mvCore.CheckExtension(links.small.trim());
                                            }
                                            if (links.original !== undefined) {
                                                original = links.original.trim(); // mvCore.CheckExtension(links.original.trim());
                                            }
                                            if (links.thumb !== undefined) {
                                                thumbs = links.thumb.trim(); //mvCore.CheckExtension(links.thumb.trim());
                                            }
                                            if (links.medium !== undefined) {
                                                medium = links.medium.trim(); //mvCore.CheckExtension(links.medium.trim());
                                            }

                                            if (appsname == "outlook" || appsname == "eloqua") {
                                                strempath = links.stream;
                                                elassettype= alllinks.file.fileType;
                                            }

                                            if (links.download != undefined && links.download != '') {
                                                if (appsname == 'office' || appsname == 'default' || appsname == 'drupal' || appsname == 'outlook' || appsname == 'eloqua' || appsname == 'mobileapp') {
                                                    //this time not in use this code of block
                                                    selectbuttonstyle = ''; // 'style="margin-left:10%;"';
                                                }
                                                else if (appsname.toLowerCase() == "hootsuite") {
                                                    selectbuttonstyle = 'style="display:none;"';

                                                }
                                            } else {
                                                selectbuttonstyle = 'style="display:none;"';
                                            }
                                            var selectassetbtnname = 'Select Asset'; var tooltiptile = '';
                                            if (appsname.toLowerCase() == 'office') {
                                                selectassetbtnname = 'Insert Asset';
                                                selectdropdownassetsizestyle = 'style="display:none"';
                                                hootsuitebggrey = '';
                                                hootsuiteborderradius = '';
                                            }  else if (appsname.toLowerCase() == 'outlook' || appsname.toLowerCase() == 'eloqua') {
                                                //outlookarrowimage = '<img src="images/outlookarrows.png" style="max-width:10px;position: absolute;margin-left: 5px;margin-top:2px;" />';
                                                selectassetbtnname = "Insert Asset";
                                                selectdropdownassetsizestyle = 'style="display:none"';
                                                hootsuitebggrey = '';
                                                hootsuiteborderradius = '';
                                                selectbuttonstyle = '';
                                                lishareassetmedium = 'lisharedassetmedium_' + imagecounter + '_' + assetid;
                                                lishareassetlarge = 'lisharedassetlarge_' + imagecounter + '_' + assetid;
                                                lishareassetsmall = 'lisharedassesmall_' + imagecounter + '_' + assetid;
                                                lishareassetoriginal = 'lisharedasseoriginal_' + imagecounter + '_' + assetid;
                                                liextralarge = 'lisharedasseextralarge_' + imagecounter + '_' + assetid;
                                                if (assettypes == "image") {
                                                    shareassetmenuclass = 'shareassetdropdown';
                                                    shareassetmenuol = '';
                                                } else if (assettypes == "file") {
                                                    shareassetmenuclass = 'shareassetdropdown';
                                                    original = links.download;
                                                } else if (assettypes == "video") {
                                                   // original = links.original;
                                                    shareassetmenuclass = 'shareassetdropdownvideo';
                                                } else if (assettypes == "audio") {
                                                  //  original = links.download;
                                                    shareassetmenuclass = 'shareassetdropdownvideo';
                                                }
                                            } else if (appsname == 'hootsuite') {
                                                arrowimagehootsuite = '<img src="images/arrows.png" />';
                                                selectdropdownassetsizestyle = 'style="display:none"';
                                                hootsuiteborderradius = 'border-radius:4px !important';
                                                assetcheckboxid = 'assetcheckbox' + imagecounter + '_' + assetid;
                                                var tootipspan = '', longassetnamebrief = '';
                                                if (assetname.length > 24) {
                                                    longassetnamebrief = assetname.trim().substr(0, 24);
                                                    longassetnamebrief = longassetnamebrief + '<b>..</b>';
                                                    tootipspan = ' <span> ' + assetname + '  </span>';
                                                    tooltiptile = 'tooltiptile';
                                                } else if (assetname.trim.length <= 24) {
                                                    longassetnamebrief = assetname;
                                                    tootipspan = '';
                                                    tooltiptile = '';
                                                }

                                                assetcheckboxdiv = category + 'assetcheckboxdiv' + imagecounter + '_' + assetid;
                                                hootsuitelowerdivid = category + '_' + imagecounter + '_' + assetid;
                                                //hootsuitebggrey = 'hootsuitebggrey';
                                                hootsuitrating = 'images/star' + overallassetrating + '.png';
                                                var h_overallratingimagepath = 'images/' + overallassetrating + '.png';
                                                var h_overallratingimg = '<img src="' + h_overallratingimagepath + '" height="10px" />';
                                                var h_userratingimgpath = 'images/' + userrating + '.png';
                                                var h_userratingimg = '<img src="' + h_userratingimgpath + '" height="10px" />';

                                                imageinserthootsuitebtn = '<div id=' + assetcheckboxdiv + ' class="imageSelectBox"> <input type="checkbox" id=' + assetcheckboxid + '></div>';
                                                lowerhootsuitediv = '<div class="lowerDiv"><button type="button" id=' + hootsuitelowerdivid + '><svg class="icon icon-share-square-o"><use xlink:href="#icon-share-square-o"></use></svg></button></div>';
                                                hootsuitdiv = '<table width="100%" class="data-table"><tr><td colspan="2">' + longassetnamebrief.trim() + '</td></tr><tr><td>User Rating</td><td>' + h_userratingimg + '</td></tr><tr><td>Overall Rating</td><td>' + h_overallratingimg + '</td></tr><tr><td><input style="display:none;" type="checkbox" id=""></td></tr></table>';
                                            } else if (appsname.toLowerCase() == 'drupal') {
                                                selectassetbtnname = "Upload Asset";
                                            }
                                            var descriptionbrief = '', descriptiontooltip = '', wrapper = '';
                                            var descripptioninlinecss = '';
                                            if (description != '') {

                                                if (description.length > 60) {
                                                    if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "eloqua" ||appsname.toLowerCase() == "mobileapp") {
                                                        descriptionbrief = description.trim().substr(0, 60);
                                                    } else if (appsname.toLowerCase() == "drupal") {
                                                        descriptionbrief = description.substr(0, 60);

                                                    } else {
                                                        descriptionbrief = description.trim().substr(0, 60);
                                                    }
                                                    descriptionbrief = descriptionbrief + '...';
                                                    descriptiontooltip = 'class="tooltip"'; wrapper = 'wrapper';
                                                } else {
                                                    descriptionbrief = description.trim().substr(0, 60);
                                                    descriptionbrief = '';
                                                    descriptiontooltip = '';
                                                    wrapper = '';
                                                }
                                                descriptionstyle = '';
                                            } else {
                                                descriptionstyle = 'display:none';
                                            }
                                            var hootsuitratong = 'images/star' + overallassetrating + '.png';
                                            var imagesmallhidden = category + 'imagesmall' + inc;
                                            var imagelargehidden = category + 'imagelarge' + inc;
                                            var imagemediumhidden = category + 'imagemedium' + inc;
                                            var imageoriginalhidden = category + 'imageoriginal' + inc;
                                            var imagethumbhidden = category + 'imagethumb' + inc;
                                            var imagedivid = category + 'imagediv' + inc;
                                            var imageid = category + 'img' + inc;
                                            var selectbtnid = category + '_' + inc + '_' + 'selectbtn' + '_' + assetid;
                                            var dropdown = category + 'dropdown' + inc;
                                            var overallratingimagepath = 'images/' + overallassetrating + '.png';
                                            var overallratingimg = '<img src="' + overallratingimagepath + '" height="10px" />';
                                            var userratingimgpath = 'images/' + userrating + '.png';
                                            var userratingimg = '<img src="' + userratingimgpath + '" height="10px" />';
                                            var spanmessage = category + '_spanpowerexcelmsg' + inc;

                                            var mainlargediv = 'mainlargediv' + imagecounter + '_' + assetid;
                                            var largediv = 'largeviewdiv' + imagecounter + "_" + assetid;
                                            var largeimageid = 'largeimageid' + assetid;

                                            /**/
                                            /*MetaData Code Logic*/
                                            _title = '<tr><td class="attrib-name attrib-name--title">Title: </td><td class="attrib-value attrib-name--title">' + title + '</td></tr>';
                                                    if (descriptionstyle != 'display:none') {
                                                        descriptionsdiv = '<tr  id="descriptiontr' + imagecounter + "_" + assetid + '" ><td class="attrib-name " id="descriptiontdlabel' + imagecounter + "_" + assetid + '">Description: </td><td class="attrib-value ' + wrapper + '" id="descriptiontdval' + imagecounter + "_" + assetid + '">' + descriptionbrief + '<div ' + descriptiontooltip + '> ' + description + '     </div></td></tr>';
                                                    } else {
                                                        descriptionsdiv = "";
                                                    }
                                                    var date = new Date(alllinks.record.createdAt);
                                                    var newformateddate=date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
                                                    uploadedat = '<tr ><td class="attrib-name">Uploaded Date:</td><td class="attrib-value">' + newformateddate + '</td></tr>';
                                                    if (globalvarmetadatalist.indexOf('approved date') != -1) {
                                                        var date = new Date(alllinks.file.approvedAt);
                                                        var newformateddate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
                                                        approveddate = '<tr ><td class="attrib-name">Approved Date:</td><td class="attrib-value">' + newformateddate + '</td></tr>';
                                                   
                                                } else {
                                                    approveddate = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('expiry date') != -1) {
                                                    if (alllinks.file.expiresAt != undefined) {
                                                        var date = new Date(alllinks.file.expiresAt);
                                                        var newformateddate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
                                                        expirydate = ' <tr ><td class="attrib-name">Expiry Date: </td><td class="attrib-value">' + newformateddate + '</td></tr>';
                                                    } else {
                                                        expirydate = '';
                                                    }
                                                } else {
                                                    expirydate = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('file name') != -1) {
                                                    if (medialinks.file != undefined) {
                                                        filename = '<tr ><td class="attrib-name">File Name: </td><td class="attrib-value">' + medialinks.file.fileName + '</td></tr>';

                                                    } else {
                                                        filename = '';
                                                    }
                                                } else {
                                                    filename = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('original file size') != -1) {
                                                    filesize = '<tr ><td class="attrib-name">Original File Size: </td><td class="attrib-value">' + alllinks.file.sizeInBytes + '</td></tr>';;

                                                } else {
                                                    filesize = '';
                                                }

                                                if (globalvarmetadatalist.indexOf('original format') != -1) {//File Type =original format
                                                    filetype = '<tr ><td class="attrib-name">Original Format: </td><td class="attrib-value">' + alllinks.file.fileType + '</td></tr>';

                                                } else {
                                                    filetype = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('original image height') != -1) {
                                                    imageheight = '<tr ><td class="attrib-name">Original Image Height: </td><td class="attrib-value">' + alllinks.file.imageHeight + '</td></tr>';;

                                                } else {
                                                    imageheight = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('original image width') != -1) {
                                                    imagewidth = '<tr><td class="attrib-name">Original Image Width: </td><td class="attrib-value">' + alllinks.file.imageWidth + '</td></tr>';

                                                } else {
                                                    imagewidth = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('keywords') != -1) {
                                                    var keywordbrief = '', keywordtooltip = '', keywrapper = '';
                                                    var getkeyword = mvCore.GetAssetKeyword(token,assetid);
                                                    $.when(getkeyword).done(function (data) {
                                                        var keywordvalue = '';
                                                        if (data.recordCount.totalRecordsFound > 0) {
                                                            for (var i = 0; i < data.recordCount.totalRecordsFound; i++) {
                                                                if (i == 0) {
                                                                    keywordvalue = keywordvalue + data.payload[i].keywordName;
                                                                } else {
                                                                    keywordvalue = keywordvalue + ', ' + data.payload[i].keywordName ;
                                                                }
                                                            }
                                                            if (keywordvalue != '') {
                                                         if (appsname.toLowerCase() == "hootsuite") {
                                                             if (keywordvalue.length > 60) {
                                                                 keywordbrief = keywordvalue.substr(0, 100);
                                                                 keywordbrief = keywordbrief + '...';
                                                                 keywordtooltip = 'class="tooltip"';
                                                                 keywrapper = 'wrapper';
                                                             }
                                                         } else if (appsname.toLowerCase() == "drupal") {
                                                             if (keywordvalue.length > 40) {
                                                                 keywordbrief = keywordvalue.substr(0, 40);
                                                                 keywordbrief = keywordbrief + '...';
                                                                 keywordtooltip = 'class="tooltip"';
                                                                 keywrapper = 'wrapper';
                                                             }
                                                         } else if (appsname.toLowerCase() == "office") {
                                                             if (keywordvalue.length > 60) {
                                                                 keywordbrief = keywordvalue.substr(0, 60);
                                                                 keywordbrief = keywordbrief + '...';
                                                                 keywordtooltip = 'class="tooltip"';
                                                                 keywrapper = 'wrapper';
                                                             }
                                                         } else if (appsname.toLowerCase() == "mbileapp") {
                                                             if (keywordvalue.length > 60) {
                                                                 keywordbrief = keywordvalue.substr(0, 60);
                                                                 keywordbrief = keywordbrief + '...';
                                                                 keywordtooltip = 'class="tooltip"';
                                                                 keywrapper = 'wrapper';
                                                             }
                                                         } else {
                                                             if (keywordvalue.length > 60) {
                                                                 keywordbrief = keywordvalue.substr(0, 40);
                                                                 keywordbrief = keywordbrief + '...';
                                                                 keywordtooltip = 'class="tooltip"';
                                                                 keywrapper = 'wrapper';
                                                             }
                                                         }
                                                        } else {
                                                                keywords = '';
                                                          }
                                                            keywords = '<tr  id="keydescriptiontr' + imagecounter + "_" + assetid + '" ><td class="attrib-name"  id="keywordtdlabel' + imagecounter + "_" + assetid + '">Keywords:</td><td class="attrib-value ' + keywrapper + '" id="keywordtdval' + imagecounter + "_" + assetid + '">' + keywordbrief + '<div ' + keywordtooltip + '> ' + keywordvalue + '     </div></td></tr>';
                                                        } else {
                                                            keywords = '';
                                                        }
                                                    }).fail(function() {
                                                        keywords = '';
                                                    });
                                                } else {
                                                    keywords = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('modified date') != -1) {
                                                    var date = new Date(alllinks.record.modifiedAt);
                                                    var newformateddate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
                                                    modified = '<tr ><td class="attrib-name">Modified Date:</td><td class="attrib-value">' + newformateddate + '</td></tr>';
                                                } else {
                                                    modified = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('price') != -1) {
                                                    if (alllinks.file.price != undefined) {
                                                        price = '<tr ><td class="attrib-name">Price:</td><td class="attrib-value">' + alllinks.file.price + '</td></tr>';
                                                    } else {
                                                        price = '';
                                                    }
                                                } else {
                                                    price = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('public url') != -1) {
                                                    if (alllinks.file.publicurl != undefined) {
                                                        publicurl = '<tr ><td class="attrib-name">Public URL:</td><td class="attrib-value">' + alllinks.file.publicurl + '</td></tr>';
                                                    } else {
                                                        publicurl = '';
                                                    }

                                                } else {
                                                    publicurl = '';
                                                }
                                              
                                                if (globalvarmetadatalist.indexOf('uploaded by') != -1) {
                                                    uploadedby = '<tr ><td class="attrib-name">Uploaded By:</td><td class="attrib-value">' + alllinks.record.createdBy.username + '</td></tr>';

                                                } else {
                                                    uploadedby = '';
                                                }
                                                if (globalvarmetadatalist.indexOf('original file format') != -1) {
                                                    originalfileformat = '<tr ><td class="attrib-name">Original File Format:</td><td class="attrib-value">' + alllinks.file.fileType + '</td></tr>';

                                                } else {
                                                    originalfileformat = '';
                                                }
                                            if (globalvarmetadatalist.length != 0) {
                                                if (globalvarmetadatalist.indexOf('user rating') != -1) {
                                                    userratingtr = '<tr><td class="attrib-name">User Rating: </td><td class="attrib-value"  >' + userratingimg + '</td></tr>';

                                                } else {
                                                    userratingtr = '';
                                                }
                                            } else {
                                                userratingtr = '<tr><td class="attrib-name">User Rating: </td><td class="attrib-value"  >' + userratingimg + '</td></tr>';
                                            }
                                            if (globalvarmetadatalist.length != 0) {
                                                if (globalvarmetadatalist.indexOf('overall rating') != -1) {
                                                    overallratingtr = '<tr><td class="attrib-name">Overall Rating: </td><td class="attrib-value">' + overallratingimg + '</td></tr>';

                                                } else {
                                                    overallratingtr = '';
                                                }
                                            } else {
                                                overallratingtr = '<tr><td class="attrib-name">Overall Rating: </td><td class="attrib-value">' + overallratingimg + '</td></tr>';
                                            }
                                            // Changes for Outlook Flydown Play video autdio 
                                            var thumbsplaydiv = '';
                                            if (appsname == 'outlook' || appsname == 'eloqua') {
                                                var azuremediaplayerdiv = '', azuremediaplayer = '';
                                                if (assettypes == 'image') {

                                                    flydowndiv = '<img class="image--large" src="' + large + '" alt="' + assetname + '1" id=' + largeimageid + ' />';
                                                } else if (assettypes == 'video') {
                                                    flydowndownplaybtn = 'flydowndownplaybtn_' + imagecounter + '_' + assetid;
                                                    azuremediaplayer = 'azuremediaplayer_' + imagecounter + '_' + assetid;
                                                    var azurehidden = 'azurehidden_' + imagecounter + '_' + assetid;

                                                    flydowndiv = '<video  id=' + azuremediaplayer + ' poster=' + large + ' class="azuremediaplayer amp-default-skin amp-big-play-centered" tabindex="0" > </video><input type="hidden" id=' + azurehidden + ' value=' + strempath + ' />';

                                                    thumbsplaydiv = '<div class="thumbsplaybutton"></div>';
                                                } else if (assettypes == 'file') {
                                                    flydowndiv = '<img class="image--large" src="' + large + '" alt="' + assetname + '1" id=' + largeimageid + ' />';
                                                    largeviewimgid = 'largviewimage_' + imagecounter + '_' + assetid;
                                                
                                                } else if (assettypes == 'audio') {
                                                    flydowndownplaybtn = 'flydowndownplaybtn_' + imagecounter + '_' + assetid;
                                                    azuremediaplayer = 'azuremediaplayer_' + imagecounter + '_' + assetid;
                                                    var azurehidden = 'azurehidden_' + imagecounter + '_' + assetid;
                                                    flydowndiv = '<video id=' + azuremediaplayer + ' poster=' + large + ' class="azuremediaplayer amp-default-skin amp-big-play-centered" tabindex="0" > </video><input type="hidden" id=' + azurehidden + ' value=' + links.stream + ' />';
                                                    thumbsplaydiv = '<div class="thumbsplaybutton"></div>';
                                                }
                                            } else {
                                                flydowndiv = '<img class="image--large" src="' + large + '" alt="' + assetname + '1" id=' + largeimageid + ' />';
                                            }
                                            var selectassetdropdown = "selectassetdropdown_" + imagecounter + "_" + assetid;
                                            databind += '<div  id=' + mainlargediv + ' class="image__cell is-collapsed"><div  id="hootsuiteOverlay' + inc + '"></div>' + imageinserthootsuitebtn + '<div  class="image--basic " id=' + largediv + '><div  ></div> <span class="helper"></span>' + thumbsplaydiv + '<img id="' + imageid + '" class="basic__img" src="' + small + '" alt="' + assetname + '" style=' + hootsuiteborderradius + ' /></div>' + hootsuitdiv + '' + lowerhootsuitediv + '<div class="arrow--up">' + arrowimagehootsuite + '</div><div class="image--expand"><a id="a_tagclose" class="expand__close"></a><div class="image-holder">' +
                                            '<span class="helper"></span>' + flydowndiv+
                                            '<div id="officeinsertimg' + assetid + '" ><img   src="' + medium + '" style="display:none" /></div></div>' +
                                        '<div class="image-attribs">' +
                                        '<div class="attrib-box"><table class="attrib-table">' +
                                        _title + filename + descriptionsdiv + userratingtr +
                                            overallratingtr + filesize + filetype + expirydate + imagewidth
                                            + imageheight + modified + uploadedat + approveddate + uploadedby + price + publicurl + originalfileformat + keywords+
                                        '<tr><td colspan="2" class="attrib-value"></td></tr>' +
                                        '</table><div class="image-select">' +
                                            '<select  class="select-dropdown" ' + selectdropdownassetsizestyle + ' id="' + dropdown + '">' + '<option class="small" value="small" dataattribute=' + small + ' dataassetid=' + assetid + '>Small</option>' +
                                            '<option class="medium" value="medium" dataattribute=' + medium + ' dataassetid=' + assetid + '>Medium</option>' +
                                          '<option class="large" value="large" dataattribute=' + large + ' dataassetid=' + assetid + '>Large</option>' +
                                        '</select>' +
                                                '<button class="select-button"' + selectbuttonstyle + ' id="' + selectbtnid + '"  >' + selectassetbtnname + outlookarrowimage + '<span id=' + spanmessage + '>Your asset has been copied overto the clipboard , you can now paste into your document by using cntr+v or paste in the contexual menu</span> </button><div id=' + selectassetdropdown + ' class=' + shareassetmenuclass + ' ></div>' +
                                        '</div></div></div></div></div>';

                                            var imgid = '#images' + inc;

                                            /* Hoot Suit Logic Start  here */
                                            if (appsname === 'hootsuite') {
                                                $('#bindsearchdatadiv').bind().on("click", 'button[id="' + hootsuitelowerdivid + '"]', function () {
                                                    var spiltcouterandname = (this.id).split('_');
                                                    var index = selecteditemsassetid.indexOf(spiltcouterandname[2]);
                                                    var hootsuiteoverlaydiv = '#hootsuiteOverlay' + spiltcouterandname[1];
                                                    var dropdwonid = '#' + spiltcouterandname[0] + 'dropdown' + spiltcouterandname[1];
                                                    var seletassetbtnid = spiltcouterandname[0] + '_' + spiltcouterandname[1] + '_selectbtn_' + spiltcouterandname[2];
                                                    var divid = '#' + spiltcouterandname[0] + 'assetcheckboxdiv' + spiltcouterandname[1] + '_' +
                                                    spiltcouterandname[2];
                                                    var checkboxid = '#assetcheckbox' + spiltcouterandname[1] + '_' + spiltcouterandname[2];
                                                    var imageurl = $(dropdwonid + '  option[value=medium]').attr('dataattribute');
                                                    if (index < 0) {
                                                        var data = mvAppSdkCore.insertAsset(imageurl);
                                                    } else {
                                                        var data = mvAppSdkCore.insertAsset(imageurl);
                                                    }
                                                });

                                                $('#bindsearchdatadiv').bind().on("click", 'div[id="' + assetcheckboxdiv + '"]', function () {
                                                    var length = selecteditemsassetid.length;
                                                    var size = mvCore.GetCookies('cookiesettings');
                                                    var divid = this.id;
                                                    var catname = divid.split('assetcheckboxdiv');
                                                    var countnum = catname[1].split('_');
                                                    var checkboxid = '#assetcheckbox' + countnum[0] + '_' + countnum[1];
                                                    var dropdwonid = '#' + catname[0] + 'dropdown' + countnum[0];
                                                    var hootsuiteoverlaydiv = '#hootsuiteOverlay' + countnum[0];
                                                    var seletassetbtnid = catname[0] + '_' + countnum[0] + '_selectbtn_' + countnum[1];
                                                    var imageurl = $(dropdwonid + '  option[value=' + size + ']').attr('dataattribute');
                                                    var index = selecteditemsassetid.indexOf(countnum[1]);
                                                    var $thisCell = $('#' + largediv).closest('.image__cell');
                                                    if (index < 0 && !$(checkboxid).is(":checked")) {
                                                        $(hootsuiteoverlaydiv).css('height', globalhootsuiteoverlayheight + 'px');
                                                        selecteditemsassetid[length] = countnum[1];
                                                        $(checkboxid).prop("checked", true);
                                                        selecteditemsasseturl[length] = imageurl;
                                                        $('#countofimageslabel').html(selecteditemsassetid.length);
                                                        var sty = "background-image:url('images/tick.png')";
                                                        $("#" + divid).append('<label style=' + sty + ' ></label>');
                                                        if (selecteditemsassetid.length == 1) {
                                                            $('#countingselectionlabel').removeClass("countingselection");
                                                            $('#countingselectionlabel').addClass("countingselected");
                                                        }
                                                        selecteditemsassetsize[length] = size + '_' + catname[0] + '_' + countnum[0];
                                                        $(dropdwonid).attr('disabled', true);
                                                        $("button[id=" + seletassetbtnid + "]").text('UnSelect');
                                                        $(hootsuiteoverlaydiv).addClass('hootsuiteOverlay');
                                                        /**Closing of Div */
                                                        $thisCell.removeAttr("style");
                                                        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
                                                        var now = new Date();
                                                        var utc_timestamp = (now.getTime());
                                                        var mainlargeid = 'mainlargediv' + countnum[0] + '_' + countnum[1];
                                                        var titles = $('#' + mainlargeid).find('table.attrib-table tr').find('td.attrib-value').html();
                                                        mvCore.TrackingAssets(globalvarclientid, countnum[1], usernameglobalvar, utc_timestamp, 'Download', globalappname, titles);
                                                        /*End Here*/
                                                    } else if (index >= 0 && $(checkboxid).is(":checked")) {
                                                        $("#" + divid + ">label").remove();
                                                        $(hootsuiteoverlaydiv).css('height', 0 + 'px');
                                                        $(dropdwonid).attr('disabled', false);
                                                        selecteditemsassetid.splice(index, 1);
                                                        selecteditemsasseturl.splice(index, 1);
                                                        selecteditemsassetsize.splice(index, 1);
                                                        $('#countofimageslabel').html(selecteditemsassetid.length);
                                                        if (selecteditemsassetid.length == 0) {
                                                            $('#countingselectionlabel').removeClass("countingselected");
                                                            $('#countingselectionlabel').addClass("countingselection");
                                                        }
                                                        $(dropdwonid + ' option[value=' + size.toLowerCase() + ']').attr('selected', 'selected');
                                                        $(dropdwonid).attr('disabled', false);
                                                        $("button[id=" + seletassetbtnid + "]").text('Select Asset'); $(checkboxid).prop("checked", false);
                                                        $(hootsuiteoverlaydiv).removeClass('hootsuiteOverlay');
                                                    }
                                                    $thisCell.off("scroll");
                                                });
                                            }
                                            /*  Hoot Suit Logic Ends Here */
                                            $('#bindsearchdatadiv').bind().on("click", 'button[id="' + selectbtnid + '"]', function () {
                                                $.holdReady(true);
                                                $('#' + this.id).attr('disabled', true);
                                                var bindassetid = this.id.split('_');
                                                var dropdwonid = '#' + bindassetid[0] + 'dropdown' + bindassetid[1];
                                                var appsname = '';
                                                appsname = defaultsettings.apps;
                                                var spliting = dropdown.split('dropdown');
                                                var spanid = bindassetid[0] + '_spanpowerexcelmsg' + bindassetid[1];
                                                if (appsname.toLowerCase() == 'drupal') {
                                                    try {
                                                        var dropselectval = "select" + dropdwonid + " option:selected";
                                                        var size = $(dropselectval).val();
                                                        var imageurl = $(dropdwonid + '  option[value=' + size + ']').attr('dataattribute');
                                                        mvAppSdkCore.InsertAsset(imageurl);
                                                    } catch (ex) {
                                                        $('#errormessagediv').css('display', 'block');
                                                        $('#errormessagediv').html(ex.message.toString());
                                                    }
                                                }
                                                var now = new Date();
                                                var utc_timestamp = (now.getTime());
                                                var mainlargeid = 'mainlargediv' + bindassetid[1] + '_' + bindassetid[3];;
                                                var titles = $('#' + mainlargeid).find('table.attrib-table tr').find('td.attrib-value').html();
                                                mvCore.TrackingAssets(globalvarclientid, bindassetid[3], usernameglobalvar, utc_timestamp, 'Download', globalappname, titles);
                                                var spliting = dropdown.split('dropdown');
                                                var spanid = bindassetid[0] + '_spanpowerexcelmsg' + bindassetid[1];
                                                var str = $('#' + dropdown + ' option:selected').text().toLowerCase();
                                                if (appsname.toLowerCase() === "office") {
                                                    if (mvAppSdkCore.InsertAsset != undefined) {
                                                        var larviewid = "#largeviewdiv" + bindassetid[1] + "_" + bindassetid[3];
                                                        var getassetname = $(larviewid).next().next().find('table tbody tr .attrib-value').html();
                                                        mvAppSdkCore.InsertAsset(medium, getassetname, spanid, bindassetid[3], 'nothumbsforoffice', 'image');
                                                    }

                                                } else if (appsname.toLowerCase() === "outlook" || appsname.toLowerCase() == "eloqua") {
                                                    var larviewid = "#largeviewdiv" + bindassetid[1] + "_" + bindassetid[3];
                                                    var getassetname = $(larviewid).next().next().find('table tbody tr .attrib-value').html();
                                                    //Sas Url Rendition binds on Dropdown
                                                    var selectdropol = "#selectassetdropdow_" + bindassetid[1] + '_' + bindassetid[3];
                                                    if ($(selectdropol).html() == undefined) {
                                                        Events.GetEloquaRenditionBindings(token, bindassetid[3], this.id, assettypes, getassetname);
                                                    }
                                                    $('.shareassetdropdown').toggle();
                                                    $('.shareassetdropdownvideo').toggle();
                                                }
                                                else if (appsname.toLowerCase() === "hootsuite") {
                                                    // selecteditemsassetid.indexOf(countnum[1]);
                                                    var seletassetbtnid = this.id;
                                                    var selectbtntext = $("button[id=" + seletassetbtnid + "]").text();
                                                    var hootsuiteoverlaydiv = '#hootsuiteOverlay' + bindassetid[1];
                                                    var assetid = bindassetid[3];
                                                    var chkdivid = '#' + bindassetid[0] + 'assetcheckboxdiv' + bindassetid[1] + '_' +
                                                                        bindassetid[3];
                                                    var indexvalue = selecteditemsassetid.indexOf(bindassetid[3]);
                                                    // assetcheckbox3_cafecf82-95cd-4bd0-b96d-37e9adca0006
                                                    var checkboxid = '#assetcheckbox' + bindassetid[1] + '_' + bindassetid[3];
                                                    var len = selecteditemsassetid.length;
                                                    var $thisCell = $('#' + largediv).closest('.image__cell');
                                                    if (indexvalue >= 0) {
                                                        $(hootsuiteoverlaydiv).css('height', 0 + 'px');
                                                        selecteditemsassetid.splice(indexvalue, 1);
                                                        selecteditemsasseturl.splice(indexvalue, 1);
                                                        selecteditemsassetsize.splice(indexvalue, 1);
                                                        $(chkdivid + '>label').remove();
                                                        //  $(checkboxid).attr('checked', false);
                                                        if (selecteditemsassetid.length == 0) {
                                                            $('#countofimageslabel').html('0');
                                                            if (selecteditemsassetid.length == 0) {
                                                                $('#countingselectionlabel').removeClass("countingselected");
                                                                $('#countingselectionlabel').addClass("countingselection");
                                                            }
                                                        }
                                                        $(checkboxid).prop("checked", false);
                                                        $('#countofimageslabel').html(selecteditemsassetid.length);
                                                        if (selecteditemsassetid.length == 0) {
                                                            $('#countingselectionlabel').removeClass("countingselected");
                                                            $('#countingselectionlabel').addClass("countingselection");
                                                        }
                                                        $(dropdwonid).attr('disabled', false);
                                                        $("button[id=" + seletassetbtnid + "]").text('Select Asset');
                                                        $(hootsuiteoverlaydiv).removeClass('hootsuiteOverlay');
                                                    } else if (indexvalue < 0) {
                                                        $(hootsuiteoverlaydiv).addClass('hootsuiteOverlay');
                                                        $(hootsuiteoverlaydiv).css('height', globalhootsuiteoverlayheight + 'px');
                                                        $(checkboxid).prop("checked", true);
                                                        var imageurl = $(dropdwonid + '  option[value=' + str + ']').attr('dataattribute');
                                                        var sty = "background-image:url('images/tick.png')";
                                                        $(chkdivid).append('<label style=' + sty + ' ></label>');

                                                        selecteditemsassetid[len] = assetid;
                                                        selecteditemsasseturl[len] = imageurl;
                                                        selecteditemsassetsize[len] = str + '_' + bindassetid[0] + '_' + bindassetid[1];
                                                        $(dropdwonid).attr('disabled', true);
                                                        $("button[id=" + seletassetbtnid + "]").text('Unselect');
                                                        $('#countofimageslabel').html(selecteditemsassetid.length);
                                                        if (selecteditemsassetid.length == 1) {
                                                            $('#countingselectionlabel').removeClass("countingselection");
                                                            $('#countingselectionlabel').addClass("countingselected");
                                                        }
                                                        $thisCell.removeAttr("style");
                                                        $thisCell.removeClass('is-expanded').addClass('is-collapsed');

                                                    }
                                                }
                                                $('#' + this.id).attr('disabled', false);
                                                $.holdReady(false);
                                            });
                                            $('#bindsearchdatadiv').bind().on("click", 'div[id="' + largediv + '"]', function () {
                                                var appsname = defaultsettings.apps;
                                                var getassetname = $('#' + this.id).next().next().find('table tbody tr .attrib-value').html();
                                                var dropdownsplitidandcategory = dropdown.split('dropdown');
                             
                                                var scorllposition = $(window).scrollTop();
                                                scrollbarrun = false;
                                                var categories = '';
                                                var assetidarr = largediv.split('largeviewdiv');
                                                var assetidarrspit = assetidarr[1].split('_');
                                                // Video Playing for outlook and Eloqua APP start from Here 
                                                var azurehidden = '#azurehidden_' + dropdownsplitidandcategory[1] + '_' + assetidarrspit[1];
                                                var selectbtnid = dropdownsplitidandcategory[0] + "_" + dropdownsplitidandcategory[1] + "_selectbtn_" + assetidarrspit[1];
                                                if (appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "eloqua") {
                                                    $('.shareassetdropdown').css('display', 'none');
                                                    $('.shareassetdropdownvideo').css('display', 'none');
                                                
                                                    var playerbtn = 'azuremediaplayer_' + assetidarrspit[0] + '_' + assetidarrspit[1];
                                                    var $thisCell = $(this).closest('.image__cell');
                                                    if ($('#' + playerbtn).html() != undefined) {
                                                        if (defaultsettings.apps != "outlook") {
                                                            lastplayedvideoid = playerbtn + "_flashSS_api";
                                                        } else {
                                                            lastplayedvideoid = playerbtn + "_html5_api";
                                                        }
                                                        if (($thisCell).hasClass('is-expanded')) {
                                                            lastplayedeloquavideo = $('#' + this.id).next().next().find('.image-holder').html();
                                                            var element = $("#" + this.id).find(".thumbsplaybutton");
                                                            if (element[0] != undefined && element[0].className == "thumbsplaybutton") {
                                                                //This settings for Outlook
                                                                var myOptions = '';
                                                                var azhidden = 'azurehidden_' + assetidarrspit[0] + '_' + assetidarrspit[1];
                                                                if (defaultsettings.apps == "outlook") {

                                                                    Events.OutlookPlayerSettings(azhidden, playerbtn);

                                                                } else {
                                                                    Events.PlayerSettingsExceptOutlook(azhidden, playerbtn);
                                                                       
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                scrollbarrun = false;
                                                var categories = '';
                                                //Video code ends here 
                                                var flydownlargeimageheight = '#largeimageid' + assetidarrspit[1];
                                                var imageflydownheight = $(flydownlargeimageheight).height();
                                                if ($(document).width() >= 928) {
                                                    $('.image-holder').css('min-height', imageflydownheight + 50);
                                   

                                                }
                                                if ($(document).width() >= 743 && $(document).width() <= 927) {
                                                    $('.image-holder').css('min-height', imageflydownheight + 50);
                                               

                                                }
                                                if ($(document).width() >= 531 && $(document).width() <= 742) {
                                                    $('.image-holder').css('min-height', imageflydownheight + 50);
                                                   

                                                }
                                                if ($(document).width() <= 530) {
                                                    $('.image-holder').css('min-height', imageflydownheight + 50);
                                                
                                                }
                                                var dropdownsplitidandcategory = dropdown.split('dropdown');
                                                var assetcheckboxid = '', sizedropdownid = '', selectbtnindex = '';
                                                var now = new Date;
                                                var utc_timestamp = (now.getTime());
                                                var mainlargeid = 'mainlargediv' + assetidarrspit[0] + '_' + assetidarrspit[1];
                                                var titles = $('#' + mainlargeid).find('table.attrib-table tr').find('td.attrib-value').html();
                                                mvCore.TrackingAssets(globalvarclientid, assetidarrspit[1], usernameglobalvar, utc_timestamp, 'view', globalappname, titles);
                                                if (appsname === 'hootsuite') {
                                                    assetcheckboxid = '#assetcheckbox' + assetidarrspit[0] + '_' + assetidarrspit[1];
                                                    sizedropdownid = '#' + dropdownsplitidandcategory[0] + 'dropdown' + assetidarrspit[0];
                                                    selectbtnindex = 'select' + dropdownsplitidandcategory[0] + 'img' + assetidarrspit[0];
                                                    var indexval = selecteditemsassetid.indexOf(assetidarrspit[1]);
                                                    if (indexval >= 0 && $(assetcheckboxid).is(":checked")) {
                                                        var spiltstr = selecteditemsassetsize[indexval].split('_');
                                                        $(sizedropdownid + ' option[value=' + spiltstr[0].toLowerCase() + ']').attr('selected', 'selected');
                                                        $(sizedropdownid).attr('disabled', true);
                                                        $("button[index=" + selectbtnindex + "]").text('Unselect');
                                                    }
                                                }
                                                /*Hoot Suite Logic Ends Here */
                                                /**Scrolling up the Image Details to top of screen */
                                                //Adding extra space to keep the Image Details always at top at some specific screen widths
                                                var extraspace = 20;
                                                var counter = 0;
                                                //Acual document width rendered on browser is 17px less than that of #bindsearchdatadiv
                                                var scorlling = $('#' + this.id).next().next().find('.image-holder').height();
                                                var larheight = $('#' + this.id).height();
                                                //scorlling = scorlling / 2;
                                                var scl = scorlling * larheight;
                                                if (appsname.toLowerCase() == "hootsuite") {
                                                    counter = parseInt((assetidarrspit[0] - 1) / globalimageperowhootsuite);
                                                    counter += 1;
                                                    $("html, body").animate({
                                                        scrollTop: counter * glovalthubdivheight
                                                    }, "slow");
                                                }
                                                else {
                                                    /*  this logic will be applied if apps name not hootsuite */
                                                    if ($(document).width() >= 1097) {  //1114-17=1097
                                                        counter = parseInt((assetidarrspit[0] - 1) / 7);
                                                        //counter = counter <= 0 ? 1 : counter;
                                                        counter += 1;
                                                        if (defaultsettings.apps == "eloqua") {
                                                            Events.EloquaScrolling(counter, this.id);
                                                        }
                                                        else {
                                                            $("html, body").animate({
                                                                scrollTop: counter * 140
                                                            }, "slow");
                                                        }
                                                    }
                                                    if ($(document).width() < 1097 && $(document).width() >= 911) {  //1114-17=1097, 928-17=911
                                                        counter = parseInt((assetidarrspit[0] - 1) / 7);
                                                        counter += 1;
                                                        
                                                        if (defaultsettings.apps == "eloqua") {
                                                            Events.EloquaScrolling(counter, this.id);
                                                        }
                                                        else {
                                                            $("html, body").animate({ scrollTop: counter * 126 }, "slow");
                                                        }
                                                    }
                                                    else if ($(document).width() < 911 && $(document).width() >= 726) {  //928-17=911, 743-17=726
                                                        counter = parseInt((assetidarrspit[0] - 1) / 5);
                                                        counter += 1;
                                                        if (defaultsettings.apps == "eloqua") {
                                                            if (defaultsettings.apps == "eloqua") {
                                                                Events.EloquaScrolling(counter, this.id);
                                                            }
                                                            else {
                                                                $("html, body").animate({
                                                                    scrollTop: 126
                                                                }, "slow");
                                                            }
                                                        }
                                                    }
                                                    else if ($(document).width() < 726 && $(document).width() >= 514) { //743-17=726, 531-17=514
                                                        counter = parseInt((assetidarrspit[0] - 1) / 5);
                                                        counter += 1;
                                                        if (defaultsettings.apps == "eloqua") {
                                                            Events.EloquaScrolling(counter, this.id);
                                                        }
                                                        else {
                                                            $("#" + this.id).animate({
                                                                scrollTop: counter * 95
                                                            }, "slow");
                                                        }
                                                    }
                                                    else if ($(document).width() < 514 && $(document).width() >= 383) { //531-17=514, 400-17=383
                                                        counter = parseInt((assetidarrspit[0] - 1) / 3);
                                                        counter += 1;
                                                     
                                                        if (defaultsettings.apps == "eloqua") {
                                                            Events.EloquaScrolling(counter, this.id);
                                                        }
                                                        else {
                                                            $("html, body").animate({
                                                                scrollTop: counter * 90
                                                            }, "slow");
                                                        }
                                                    }
                                                    else if ($(document).width() < 383 && $(document).width() >= 253) { //400-17=383, 270-17=253
                                                        counter = parseInt((assetidarrspit[0] - 1) / 3);
                                                        counter += 1;
                                                      
                                                        if (defaultsettings.apps == "eloqua") {
                                                            Events.EloquaScrolling(counter, this.id);
                                                        }
                                                        else {
                                                            $("html, body").animate({
                                                                scrollTop: counter * 73 + extraspace
                                                            }, "slow");
                                                        }
                                                    }
                                                    else if ($(document).width() < 253) {  //270-17=253
                                                        counter = parseInt((assetidarrspit[0] - 1) / 3);
                                                        counter += 1;
                                                      
                                                        $("html, body").animate({
                                                            scrollTop: counter * 63 + extraspace
                                                        }, "slow");
                                                    }
                                                }
                                            });
                                            inc++;
                                            imagecounter++;
                                        });
                                        assetOfflineList.push(assetid);
                                    }
                                });
                            });
                            databind += '';
                            if (inc === 0 && offset === 0) {
                                $('#bindsearchdatadiv').html('<div class="alert-box error">No Asset Found</div>');
                            } else {

                                if (payloadassets == totalassets) {
                                    $('.showmoreassetdiv').remove();
                                } else if (totalassets == offset + payloadassets) {
                                    $('.showmoreassetdiv').remove();
                                } else {
                                    $('.showmoreassetdiv').remove();
                                    databind = databind + '<div class="showmoreassetdiv" ><div id="showmoreassetbtndiv"><button class="showmoreassetbtn" id="showmoreassetbtn" >Show More Assets</button></div></div>';
                                }
                                $('#bindsearchdatadiv').append(databind);
                            }
                        } else {
                            if (asset.assets.errormessage != null) {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html(asset.assets.errormessage);
                            } else if (asset.assets.exception != null) {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html(asset.assets.errormessage);
                            }
                        }
                    } else {
                        if (offset == 0) {
                            $('#bindsearchdatadiv').html('<div class="alert-box error">No Asset Found</div>');
                        }
                    }
                    // Model.HideLoader();
                    return assetOfflineList.length;  //returning actual no. of assets loaded on screen so far
                } catch (e) {
                    /**
                     *If Exception is going to be caught then it will be displayed in error div and its
                     *style display will be set at runtime with display as none or block according to the need.
                     */
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);

                }
            } /** Functions End Here */
        }
    })();

   
    var MetaDataBind = (function () {
        return {
            DataBinding: function (data) {
                /*Changing
                Error Message Css according to need*/
                $('.error').css({
                    "border-color": "#f5aca6",
                    "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                });
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                $('#errormessagediv').html('');
                globalvartempmetaidlist = [];
                globalvartempmetalist = [];
                //assigning all values in global Vairable ids and their tag name
                for (var i = 0; i < globalvarmedataidlist.length; i++) {
                    globalvartempmetaidlist[i] = globalvarmedataidlist[i];
                    globalvartempmetalist[i] = globalvarmetadatalist[i];
                }
                //Binding Here  Meta data into table
                var binddata = '<table class="tableMetadata tablesorter" id="hor-minimalist-a"><thead><tr><th scope="col" colspan="2">Please select the Attributes to display<div class="divider"></div></th><th></th></tr></thead></tbody>';
                if (data.errormessage == null) {
                    var increment = 1; var checkedornot = '', checkboxdisable = '';
                    $('#bindsearchdatadiv').off("click");
                    if (data.payload != null) {
                        if (data.payload.length > 0) {
                            //maintaning the list of checkbox if they are already slected 
                            for (var ind = 0; ind < data.payload.length; ind++) {
                                var checkboxid = 'attributecheckbox_' + data.payload[ind].id;
                                var indexof = globalvartempmetaidlist.indexOf(data.payload[ind].id);
                                if (indexof >= 0) {
                                    checkedornot = 'checked';
                                    cancelmetabuttonlistchckornot = cancelmetabuttonlistchckornot + 'checked' + ',';

                                } else {
                                    checkedornot = '';
                                    cancelmetabuttonlistchckornot = cancelmetabuttonlistchckornot + 'notchecked' + ',';
                                }
                                var tagName = data.payload[ind].tagName;
                                if (tagName.toLowerCase() == "title") {
                                    var _indexof = data.payload[ind].tagName.indexOf('title');
                                    if (_indexof >= 0) {
                                        checkboxdisable = 'disabled';
                                        checkedornot = 'checked';
                                    }
                                }
                                else if (tagName.toLowerCase() == "description") {
                                    var _indexof = data.payload[ind].tagName.indexOf('description');
                                    if (_indexof >= 0) {
                                        checkboxdisable = 'disabled';
                                        checkedornot = 'checked';
                                    }
                                }
                                else if (tagName.toLowerCase() == "uploaded date") {
                                    var _indexof = data.payload[ind].tagName.indexOf('uploaded date');
                                    if (_indexof >= 0) {
                                        checkboxdisable = 'disabled';
                                        checkedornot = 'checked';
                                    }
                                } else {
                                    checkboxdisable = '';
                                }
                                var ltagname = data.payload[ind].tagName;
                                if (ltagname == "image width") {
                                    ltagname = "Original Image Width";
                                } else if (ltagname == "image height") {
                                    ltagname = "Original Image Height";
                                } else if (ltagname == 'file size') {
                                    ltagname = "Original File Size";
                                } else if (ltagname == 'file type') {
                                    ltagname = "Original Format";
                                }
                                cancelmetabuttonlist = cancelmetabuttonlist + checkboxid + ',';
                                var divid = 'attributediv_' + data.payload[ind].id;
                                var label = 'atributelabel_' + data.payload[ind].id;
                                if (data.payload[ind].tagName.indexOf('disapproved date') < 0) {
                                    binddata = binddata + '<tr><td><label id=' + label + '>' + ltagname + '<label></td><td><div class="metadatadiv"  id=' + divid + '>	<input ' + checkedornot + ' type="checkbox"   id=' + checkboxid + '   ' + checkboxdisable + '    /></div></td></tr>';
                                    if (checkboxdisable == '') {
                                        //before Binding First I need to off click
                                        $('#' + divid).off("click");
                                        //Binding Click Events of Checkbox
                                        Events.MetaDataChkboxClickEvent(divid);
                                    }
                                    increment++;
                                }
                            }
                        }
                    }
                    //hadnlign here the meta data that are not in lists
                    var chkid = '', dvid = '', lblid = '';
                    //Custom Meta Data Custom Ids 
                    dvid = 'attributediv_' + '100011-mv-33993';
                    lblid = 'atributelabel_' + '100011-mv-33993';
                    chkid = 'attributecheckbox_' + "100011-mv-33993";
                    if (globalvarmetadatalist.length != 0) {
                        if (globalvarmetadatalist.indexOf("overall rating") >= 0) {
                            checkedornot = "checked";
                        } else {
                            checkedornot = "";
                        }
                    } else {
                        checkedornot = "checked";
                    }
                    binddata = binddata + '<tr><td><label id=' + lblid + '>Overall Rating<label></td><td><div class="metadatadiv" id=' + dvid + ' >	<input ' + checkedornot + ' type="checkbox"   id=' + chkid + '   /></div></td></tr>';
                    //binding Here Click Events of the check box (custom Meta Data Handling )
                    Events.MetaDataChkboxClickEvent(dvid);

                    //Custom meta Data Ids
                    chkid = 'attributecheckbox_' + "100011-mv-775411";
                    dvid = 'attributediv_' + '100011-mv-775411';
                    lblid = 'atributelabel_' + '100011-mv-775411';
                    if (globalvarmetadatalist.length != 0) {
                        if (globalvarmetadatalist.indexOf("user rating") >= 0) {
                            checkedornot = "checked";
                        } else {
                            checkedornot = "";
                        }
                    } else {
                        checkedornot = "checked";
                    }
                    binddata = binddata + '<tr><td><label id=' + lblid + '>User Rating<label></td><td><div id=' + dvid + ' class="metadatadiv">	<input ' + checkedornot + ' type="checkbox"   id=' + chkid + '  /></div></td></tr>';
                    $('#' + dvid).off('click');
                    //Custom MetaData event Binding 
                    Events.MetaDataChkboxClickEvent(dvid);
                    increment++;

                    if (globalvarmetadatalist.indexOf("uploaded by") >= 0) {
                        checkedornot = "checked";
                    } else {
                        checkedornot = "";
                    }
                    // Custom Meta Data Binding
                    chkid = 'attributecheckbox_' + "100011-mv-775422";
                    dvid = 'attributediv_' + '100011-mv-775422';
                    lblid = 'atributelabel_' + '100011-mv-775422';
                    binddata = binddata + '<tr><td><label id=' + lblid + '>Uploaded By<label></td><td><div class="metadatadiv" id=' + dvid + '>	<input ' + checkedornot + ' type="checkbox"   id=' + chkid + '  /></div></td></tr>';
                    $('#' + dvid).off('click');
                    Events.MetaDataChkboxClickEvent(dvid);
                    increment++;
                    // Original File Format By Meta 
                    chkid = 'attributecheckbox_' + "100011-mv-775424";
                    dvid = 'attributediv_' + '100011-mv-775424';
                    lblid = 'atributelabel_' + '100011-mv-775424';
                    if (globalvarmetadatalist.indexOf("original file format") >= 0) {
                        checkedornot = "checked";
                    } else {
                        checkedornot = "";
                    }
                    binddata = binddata + '<tr><td><label id=' + lblid + '>Original File Format<label></td><td><div class="metadatadiv" id=' + dvid + '>	<input ' + checkedornot + ' type="checkbox"   id=' + chkid + '  /></div></td></tr>';
                    $('#' + dvid).off('click');
                    //Custom Meta Data Event Binding 
                    Events.MetaDataChkboxClickEvent(dvid);
                    Model.HideLoader();
                    //Binding Here all Html of Meta List into Bindsearchdatadiv
                    $('#bindsearchdatadiv').html(binddata);
                    var tableData = document.getElementById('hor-minimalist-a').getElementsByTagName('tbody').item(0);
                    var rowData = tableData.getElementsByTagName('tr');
                    for (var i = 0; i < rowData.length - 1; i++) {
                        for (var j = 0; j < rowData.length - (i + 1) ; j++) {
                            var temp = $(rowData.item(j).getElementsByTagName('td').item(0)).text();
                            var temp1 = $(rowData.item(j + 1).getElementsByTagName('td').item(0)).text();
                            if (temp.localeCompare(temp1) == 1) {
                                tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
                            }
                        }
                    }
                    var allbutton = '<tr class="metadatalastr"><td colspan="2" class="metadatalastd"><a id="cancelmetabtn" class="metadatabtn">Cancel</a><a id="savemetadatabtn" class="metadatabtn">Save</a></td></tr></tobdy></table>';
                    $('#hor-minimalist-a').append(allbutton);
                    $('#savemetadatabtn').off("click");
                    $('#cancelmetabtn').off("click");
                    /**
                     * Save Button click  Meta Data
                     */
                    $('#savemetadatabtn').click(function () {
                        Model.ShowLoader();
                        if (globalvartempmetaidlist.length != 0) {
                            //Changing Css Here according to our for info message or Error message
                            $('.error').css({
                                "border-color": "#f5aca6",
                                "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                            });
                            var fetchchkids = [], templist = [];
                            cancelmetabuttonlistchckornot = '';
                            cancelmetabuttonlist = '';
                            var increment = 0;
                            $("input:checkbox[type=checkbox]").each(function (index, k) {
                                var tempsplit = $(this).attr("id").split('_');
                                var id = '#' + $(this).attr("id");
                                if ($(id).attr('disabled') != 'disabled' && $(id).attr('checked') != 'checked') {
                                    fetchchkids[increment] = $(this).attr("id");
                                    templist[increment] = tempsplit[1];
                                    increment++;
                                }
                            });
                            var datalist = '';
                            globalvarmetadatalist = [];
                            globalvarmedataidlist = [];
                            //Creating Local history in case of cancel or reset
                            for (var i = 0; i < globalvartempmetaidlist.length; i++) {
                                var indexof = templist.indexOf(globalvartempmetaidlist[i]);
                                cancelmetabuttonlist = cancelmetabuttonlist + fetchchkids[indexof] + ',';
                                cancelmetabuttonlistchckornot = cancelmetabuttonlistchckornot + 'checked' + ',';
                                datalist = datalist + globalvartempmetaidlist[i] + ',' + globalvartempmetalist[i] + ',';
                                globalvarmetadatalist[i] = globalvartempmetalist[i];
                                globalvarmedataidlist[i] = globalvartempmetaidlist[i];
                           
                                if (indexof < 0) {
                                    fetchchkids.splice(i, 1);
                                }
                            }
                            //Custom Meta Data 
                            if ($('#attributecheckbox_100011-mv-33993').prop('checked')) {
                                if (globalvartempmetaidlist.indexOf('100011-mv-33993') < 0) {
                                    globalvartempmetaidlist[globalvartempmetaidlist.length] = '100011-mv-33993';
                                    globalvartempmetalist[globalvartempmetalist.length] = 'overall rating';
                                    globalvarmetadatalist[globalvarmetadatalist.length] = 'overall rating';
                                    globalvarmedataidlist[globalvarmedataidlist.length] = '100011-mv-33993';
                                    datalist = datalist + '100011-mv-33993' + ',' + 'overall rating' + ',';
                                }
                            }
                            //Custom Meta Data
                            if ($('#attributecheckbox_100011-mv-775411').prop('checked')) {
                                if (globalvartempmetaidlist.indexOf('100011-mv-775411') < 0) {
                                    globalvartempmetaidlist[globalvartempmetaidlist.length] = '100011-mv-775411';
                                    globalvartempmetalist[globalvartempmetalist.length] = 'user rating';
                                    globalvarmetadatalist[globalvarmetadatalist.length] = 'user rating';
                                    globalvarmedataidlist[globalvarmedataidlist.length] = '100011-mv-775411';
                                    datalist = datalist + '100011-mv-775411' + ',' + 'user rating' + ',';
                                }
                            }
                        
                            var domainname = mvCore.GetCookies('coookiedomainname');
                            //Add MetaData list in DataBase here
                            var metadatalist = mvCore.AddMetaData(usernameglobalvar, globalvarclientid, defaultsettings.apps, domainname, datalist);
                            $.when(metadatalist).done(function (data) {
                                Model.HideLoader();
                                $('.error').css({
                                    "border-color": "#1e90ff",
                                    "background": "#ffecec url('images/notice.png') no-repeat 10px 50%"
                                });
                                $('#errormessagediv').html('MetaData List Successfully Updated');
                                $('#errormessagediv').css('display', 'block');

                            }).fail(function (data) {
                                $('.error').css({
                                    "border-color": "#fa8072",
                                    "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                                });
                                $('#errormessagediv').html('Meta List Not Updated');
                                $('#errormessagediv').css('display', 'block');
                                Model.HideLoader();
                            });
                        } else {
                            $('.error').css({
                                "border-color": "#fa8072",
                                "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                            });
                            $('#errormessagediv').html('Minimum one attribute should be selected');
                            $('#errormessagediv').css('display', 'block');
                            Model.HideLoader();
                        }
                    });
                    /**
                     * MetaData Cancel Click
                     */
                    $('#cancelmetabtn').click(function () {
                        Model.ShowLoader();
                       //Css Change through code according to need for error message
                        $('.error').css({
                            "border-color": "#f5aca6", "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                        });
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        globalvartempmetaidlist = [];
                        globalvartempmetalist = [];
               
                        //Reset Variable here
                        var mainlistlength = globalvarmedataidlist.length;
                        var metadatalistsplit = cancelmetabuttonlist.split(',');
                        var checkornotsplit = cancelmetabuttonlistchckornot.split(',');
                        cancelmetabuttonlistchckornot = '';
                        cancelmetabuttonlist = '';
                        var fetchchkids = [], templist = [];
                        var increment = 0;
                        globalvartempmetaidlist = [];
                        globalvartempmetalist = [];
                        $("input:checkbox[type=checkbox]").each(function (index, k) {
                            var tempsplit = $(this).attr("id").split('_');
                            var disabled = $('#' + $(this).attr("id")).prop("disabled");
                            if (disabled == false) {
                                if (globalvarmedataidlist.indexOf(tempsplit[1]) >= 0) {
                                    $('#' + $(this).attr("id")).prop('checked', true);
                                } else {
                                    fetchchkids[increment] = $(this).attr("id");
                                    templist[increment] = tempsplit[1];
                                    increment++;
                                }
                            }
                        });
                        for (var i = 0; i < globalvarmedataidlist.length; i++) {
                            globalvartempmetaidlist[i] = globalvarmedataidlist[i];
                            globalvartempmetalist[i] = globalvarmetadatalist[i];
                        }
                        //  var ind = 0;
                        for (var i = 0; i < fetchchkids.length; i++) {
                            if (fetchchkids[i] != "") {
                                $('#' + fetchchkids[i]).prop("checked", false);
                            }
                        }
                        Model.HideLoader();
                    });
                    /**
                     * Cancel button Event Over Here 
                     */

                } 
            }
        }
    })();
/**
*Renders the retrieved images for selected category on the relavent category UI.
*@return {images} Images for selected category.
*/
    /**
    * All Events Functions Start Here
    */
    var Events = (function () {
        return {
            /** Processes the login request. */
            BindLoginEvent: function (option) {
                //var message = '';
                $('#mv-login').on({
                    click: function () {
                        Model.ShowLoader();
                        if ($('#useremailtxt').val().trim() != '' && $('#passwordtxt').val().trim() != '') {
                            //Calling Here function to validate user namer and passowrd
                            Events.ValidateLogin(option);
                        } else {
                            Model.HideLoader();
                            $('#errormessagediv').show();
                            $('#errormessagediv').html('Please enter username and password');
                        }
                    }
                });
                //return message;
               //Binding Here Enter Key press event
                $(window).keypress(function (e) {
                    var codes = e.keyCode || e.which;
                    if (codes === 13) {
                        Model.ShowLoader();
                        if ($('#useremailtxt').val().trim() != '' && $('#passwordtxt').val().trim() != '') {
                            //Calling Here function to validate user namer and passowrd
                            Events.ValidateLogin(option);
                        } else {
                            Model.HideLoader();
                            $('#errormessagediv').show();
                            $('#errormessagediv').html('Please enter username and password');
                        }
                    }
                });
            },
            /** Validates the login request. */
            ValidateLogin: function (option) {
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                var message = '';
                var urlmappingresult = '';
                //Making Pattern here for checking user name if it looks like username@mywebsite.com
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                var checkusername = '';
                var domainnametosend = '', username = '';
                var index = $('#useremailtxt').val().trim().indexOf('@');
                var index2 = $('#useremailtxt').val().trim().indexOf(String.fromCharCode(92));
                var index3 = $('#useremailtxt').val().trim().indexOf(String.fromCharCode(47));
                if (index3 < 0) {
                    if (index >= 0 && index2 < 0) {
                        if (pattern.test($('#useremailtxt').val().trim())) {
                            checkusername = 'correct';
                            domainnametosend = $('#useremailtxt').val();
                            username = $('#useremailtxt').val();
                        } else {
                            checkusername == "";
                        }
                    } else if (index2 >= 0) {
                        domainnametosend = $('#useremailtxt').val().split(String.fromCharCode(92));//[1];
                        if (domainnametosend.length == 2) {
                            username = domainnametosend[1];
                            domainnametosend = $('#useremailtxt').val();
                            checkusername = 'correct';
                        } else {
                            checkusername = '';
                        }
                    }
                } else {
                    checkusername = '';
                }
                if ($('#useremailtxt').val().trim() != '' && $('#passwordtxt').val() != '') {
                    if (checkusername=='correct') {
                        urlmappingresult = mvCore.urlmapping(domainnametosend);//$('#useremailtxt').val().trim()); //, option.apps (new code)
                    $.when(urlmappingresult).done(function (res) {
                        var apiurl = '';
                        if (res.errormessage == null) {
                            if (res.data.ApiUrl.toLowerCase() != "domain name could not be resolved") {
                                $(res).each(function (inde, apidata) {
                                    apiurl = apidata.data.ApiUrl;
                                    var defaultOptions = {
                                        ApiUrl: apidata.data.ApiUrl
                                    }; 
                                    mvCore.initialize(defaultOptions);
                                    //Setting email and name of domain to a cookie
                                    mvCore.SetCookies('cookiedomainemail', apidata.data.EmailDomain, 7);
                                    mvCore.SetCookies('coookiedomainname', apidata.data.DomainName, 7);
                                    usernameglobalvar = username;
                                    mvCore.SetCookies('coookieusername', username, 7);
                                    var autdata = mvCore.authentication(username, $('#passwordtxt').val());
                                    $.when(autdata).done(function (resdata) {

                                        if (resdata.errormessage == null) {
                                            /**If Login Success then Unbind Keypress Event for login */
                                            $(window).unbind("keypress");
                                            message = 'success';
                                            mvCore.SetCookies('cookieurlapi', apiurl, 7);
                                            //Set Cookies token according to APP
                                            Events.SetLoginToken(option, resdata.Token, 7)
                                            mvCore.SetCookies('cookierefreshtoken', resdata.RefreshToken, 7);
                                            mvCore.SetCookies('cookietokenexpirytime', resdata.ExpiryToken, 7);
                                            mvCore.SetCookies('cookiecreateddate', resdata.LoginDate, 7);
                                            mvCore.SetCookies('cookiesettings', 'medium', 7);
                                            mvCore.SetCookies('cookiefilters', '', 7);
                                            //Start- Getting client id to refresh login (i.e. to get a new bearer token after it expires, using client id)
                                            var data1 = mvCore.GetClientId(Events.GetLoginToken(option));
                                            $.when(data1).done(function (cdata) {
                                                if (cdata.errormessage != null) { //if error in getting client id
                                                    $('#errormessagediv').css('display', 'block');
                                                    $('#errormessagediv').html('Error: client id could not be retrieved');
                                                } else {
                                                    if (cdata.clientid != null) { //if suceess
                                                        globalvarclientid = cdata.clientid;
                                                        mvCore.SetCookies('cookiesclientid', cdata.clientid, 7);
                                                       
                                                    } else {
                                                        $('#errormessagediv').css('display', 'block');
                                                        $('#errormessagediv').html('Error: client id is not available');
                                                    }
                                                }
                                            }).fail(function (cdata) {
                                                Model.HideLoader();
                                                Model.SessionExpirePanel(true);
                                                $('#errormessagediv').css('display', 'block');
                                                $('#errormessagediv').html('Error: client id could not be retrieved');
                                            });
                                            var data2 = mvCore.GetUserAuthType(Events.GetLoginToken(option));
                                            $.when(data2).done(function (uadata) {
                                                if (uadata.errormessage != null) {

                                                    $('#errormessagediv').css('display', 'block');
                                                    $('#errormessagediv').html('Error: defaultgroup not found');
                                                } else {
                                                    if (uadata.defaultGroup != null) { //if suceess
                                                        mvCore.SetCookies('cookiesdefaultgroup', uadata.defaultGroup, 7);
                                                        //Start- Get categories specified for user
                                                        var domaindata = mvCore.GetCookies('coookieusername').split('@');
                                                        Events.LoadEventGetUserCategories(mvCore.GetCookies('cookiesclientid'), domaindata[1], mvCore.GetCookies('coookieusername'), option.apps);

                                                    } else {
                                                        $('#errormessagediv').css('display', 'block');
                                                        $('#errormessagediv').html('Error: defaultgroup not available');
                                                    }
                                                }
                                            }).fail(function (authdata) {
                                                $('#errormessagediv').css('display', 'block');
                                                $('#errormessagediv').html('Error: defaultgroup not found');
                                            });
                                            //End- Getting user authentication type
                                            /**screenname variable is a global variable and is used for maintaining page state
                                             */
                                            screenname = "default";
                                            //Loading user's default page after successful login

                                            /*Tracking Media Valet Asset*/
                                            var appsname = '';
                                            if (defaultsettings.apps == 'hootsuite') {
                                                appsname = 'hootsuite'
                                            } else {
                                                if (defaultsettings.apps == 'office') {
                                                    appsname = 'office';
                                                } else {
                                                    appsname = defaultsettings.apps;
                                                }
                                            }
                                            var now = new Date;
                                        
                                            Events.ApplicationName();
                                            var utc_timestamp = (now.getTime());
                                            mvCore.TrackingAssets(globalvarclientid, '', usernameglobalvar, utc_timestamp, 'login', globalappname,'');

                                            /*Tracking Media Valet assets setting app name*/
                                            $('.bodyloderdiv').remove();
                                            $(containerid).SearchUI(option);
                                        } else {
                                            Model.HideLoader();
                                            $('#errormessagediv').css('display', 'block');
                                            $('#errormessagediv').html('Sorry, the username and password you entered does not match any user in our system');
                                        }
                                        //Model.hideloader();
                                    }).fail(function (authdata) {
                                        Model.HideLoader();
                                        $('#errormessagediv').css('display', 'block');
                                        $('#errormessagediv').html('Api not responding');
                                    });
                                })
                            } else {
                                Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Please contact support@mediavalet.com to start using this integration');
                            }
                        } else {
                            Model.HideLoader();
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html(res.errormessage);
                        }
                    }).fail(function (res) {
                        $('#errormessagediv').css('display', 'block');
                        $('#errormessagediv').html('API fail to response');
                    });
                    } else {
                        Model.HideLoader();
                        if (index3 >=0) {
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('use back slash in user name with domain name');
                        } else {
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('Plese check your user name ');
                        }
                    
                }
                } else {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Fill All Fields');
                }
            },
            /**
            *Retrieves the images based on search criteria and renders with search UI.
            */
            SearchingEvent: function (option) {
                $('#bindsearchdatadiv').off("click");
                $('#searchbtn').on({
                    click: function (e) {
                        $('.sortBlock').css('display', 'none');
                        if (option.apps === 'hootsuite') {
                            $('#countofimageslabel').html('0');
                            $('#countingselectionlabel').removeClass("countingselected");
                            $('#countingselectionlabel').addClass("countingselection");
                        }
                        $('#sortnamespan').html('');
                        $('#sortdatespan').html('');
                        mvCore.SetCookies('cookiesorting', '', 0);
                        Events.SearchingDataBind(option);
                    }
                });
                /*Binding here Enter Event*/
                $('#searchtxt').keypress(function (e) {
                    var codes = e.keyCode || e.which;
                    if (codes === 13) {
                        $('.sortBlock').css('display', 'none');
                        if (option.apps === 'hootsuite') {
                            $('#countofimageslabel').html('0');
                            $('#countingselectionlabel').removeClass("countingselected");
                            $('#countingselectionlabel').addClass("countingselection");
                        }
                        $('#sortnamespan').html('');
                        $('#sortdatespan').html('');
                        mvCore.SetCookies('cookiesorting', '', 0);
                        Events.SearchingDataBind(option);
                    }
                });
            },
            EditButtonEvent: function () {
                $('#countingselectionlabel').on({
                    click: function () {
                        if (selecteditemsassetid.length > 0) {
                            for (var i = 0; i < selecteditemsassetid.length; i++) {
                                var bindingvalues = selecteditemsassetsize[i].split('_');
                                var data = mvAppSdkCore.insertAsset(selecteditemsasseturl[i]);
                                //recentview_28_selectbtn_7c3b13ee-3f64-4cff-bd66-3a8be164661b
                                //recentviewdropdown28
                                //assetcheckbox28_7c3b13ee-3f64-4cff-bd66-3a8be164661b
                                //assetcheckbox1_a3a42b78-c252-4ccc-87d7-d88bd9b23c31
                                //assetcheckbox2_a827464c-4a1c-460f-8e4a-91696bf0c770
                                var hootsuiteoverlaydiv = '#hootsuiteOverlay' + bindingvalues[2];
                                var assetcheckboxid = '#assetcheckbox' + bindingvalues[2] + '_' + selecteditemsassetid[i];
                                $(hootsuiteoverlaydiv).css('height', '0px');
                                var dividnextlabel = '#' + bindingvalues[1] + 'assetcheckboxdiv' + bindingvalues[2] + '_' + selecteditemsassetid[i];
                                var sizedropdownid = '#' + bindingvalues[1] + 'dropdown' + bindingvalues[2];
                                var selectbtnid = bindingvalues[1] + '_' + bindingvalues[2] + '_selectbtn_' + selecteditemsassetid[i];
                                $(assetcheckboxid).prop("checked", false);
                                $(sizedropdownid).attr('disabled', false);
                                $("button[id=" + selectbtnid + "]").text('Select Asset');
                                $(hootsuiteoverlaydiv).removeClass('hootsuiteOverlay');
                                $(dividnextlabel + '>label').remove();
                            }
                            selecteditemsassetid.splice(0, selecteditemsassetid.length);
                            selecteditemsasseturl.splice(0, selecteditemsassetid.length);
                            selecteditemsassetsize.splice(0, selecteditemsassetid.length);
                            $('#countofimageslabel').html(selecteditemsassetid.length);

                            if (selecteditemsassetid.length == 0) {
                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");
                            }
                        }
                        $('#hootsuitmenubtn').data('clicked', true);
                        // $('.menu3').slideToggle('fast');
                        if (defaultsettings.apps === 'hootsuite') {
                            $('.menu1').css('display', 'none');
                            $('.composemenu1').css('display', 'none');
                        } else {
                            $('.officemenu1').hide();
                        }
                        $('.menu2').hide();
                        // $('.menu3').focusout(function () {
                        //     $('.menu3').hide();
                        // });
                    }
                });
            },
            SettingsButtonEvent: function () {
                var appsname = defaultsettings.apps;
                appsname = appsname.toLowerCase();
                if (appsname != "drupal") {
                    $('#searchsettingsbtn').on({
                        click: function () {
                            //$('#searchsettingsbtn').data('clicked', true);
                            $('.menu2').slideToggle('fast');
                            if (defaultsettings.apps === 'hootsuite') {
                                $('.menu1').hide();
                            } else {
                                $('.officemenu1').hide();

                            }
                            $('.menu3').hide();

                            /*Changing background color of default selection in Large View dropdownlist*/
                            //Events.DropdownSelectionChangeEvent();

                            /*Changing background color of default selection*/
                            if (mvCore.GetCookies('cookiesettings') !== '') {
                                $('.menu2 li').css('background-color', '');
                                if (mvCore.GetCookies('cookiesettings') === 'original') {
                                    $('#liOriginal').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'small') {
                                    $('#liSmall').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'medium') {
                                    $('#liMedium').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'large') {
                                    $('#liLarge').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                }
                            }

                            $('.menu2').focusout(function () {
                                $('.menu2').hide();
                            });
                        }
                    });
                } else {
                    var settingbtnid = '';
                    if (globalvarbrowsername == 'other') {
                        settingbtnid = 'searchsettingsimg';
                    } else {
                        settingbtnid = 'searchsettingsbtn';
                    }

                    $('#' + settingbtnid).on({
                        click: function () {
                            //$('#searchsettingsbtn').data('clicked', true);
                            $('.menu2').slideToggle('fast');
                            if (defaultsettings.apps === 'hootsuite') {
                                $('.menu1').hide();
                            } else {
                                $('.officemenu1').hide();

                            }
                            $('.menu3').hide();

                            /*Changing background color of default selection in Large View dropdownlist*/
                            //Events.DropdownSelectionChangeEvent();

                            /*Changing background color of default selection*/
                            if (mvCore.GetCookies('cookiesettings') !== '') {
                                $('.menu2 li').css('background-color', '');
                                if (mvCore.GetCookies('cookiesettings') === 'original') {
                                    $('#liOriginal').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'small') {
                                    $('#liSmall').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'medium') {
                                    $('#liMedium').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                } else if (mvCore.GetCookies('cookiesettings') === 'large') {
                                    $('#liLarge').css('background-color', 'rgba(51, 153, 255, 0.60)');
                                }
                            }

                            $('.menu2').focusout(function () {
                                $('.menu2').hide();
                            });
                        }
                    });
                }
                $('#liSmall').on({
                    click: function () {
                        $('.menu2').hide();
                        mvCore.SetCookies('cookiesettings', 'small', 7);
                        /*Changing background color of default selection in Large View dropdownlist*/
                        Events.DropdownSelectionChangeEvent();
                    }
                });
                $('#liMedium').on({
                    click: function () {
                        $('.menu2').hide();
                        mvCore.SetCookies('cookiesettings', 'medium', 7);
                        /*Changing background color of default selection in Large View dropdownlist*/
                        Events.DropdownSelectionChangeEvent();
                    }
                });
                $('#liLarge').on({
                    click: function () {
                        $('.menu2').hide();
                        mvCore.SetCookies('cookiesettings', 'large', 7);
                        /*Changing background color of default selection in Large View dropdownlist*/
                        Events.DropdownSelectionChangeEvent();
                    }
                });
            },
            MenuButtonEvent: function () {
                $('#menubtn').on({
                    click: function () {
                        $('#menubtn').data('clicked', true);

                        if (defaultsettings.apps === 'hootsuite') {
                            hootsuiteopenview = mvCore.GetQueryStringValue('view');
                            if (hootsuiteopenview != undefined) {
                                if (hootsuiteopenview == 'default') {
                                    $('.menu1').slideToggle('fast');
                                } else if (hootsuiteopenview == 'compose') {
                                    $('.composemenu1').slideToggle('fast');
                                }
                            } else {
                                $('.menu1').slideToggle('fast');
                            }
                        } else {
                            $('.officemenu1').slideToggle('fast');
                        }
                        $('.menu2').hide();

                        if (defaultsettings.apps === 'hootsuite') {
                            $('.menu1').focusout(function () {
                                $('.menu1').hide();
                            });
                        } else {
                            $('.officemenu1').focusout(function () {
                                $('.officemenu1').hide();
                            });

                        }

                    }
                });
                $('#liSortbyName').on({
                    click: function () {
                        if (defaultsettings.apps === 'hootsuite') {
                            $('.menu1').hide();
                        } else {
                            $('.officemenu1').hide();

                        }
                        if ($('#searchtxt').val().trim() !== '') {
                            $('#errormessagediv').css('display', 'none');
                            $('#infomessagediv').css('display', 'none');
                            $('#errormessagediv').html('');
                            $('#sortdatespan').html('');
                            var sortimgeid = $('#sortnamespan').find("img").attr("id");
                            if (sortimgeid === null || sortimgeid == undefined) {
                                mvCore.SetCookies('cookiesorting', 'name-down', 7);
                                $('#sortnamespan').html('<img id="sortimgdownid" src="images/down_arrow.png"  />');
                            } else if (sortimgeid === "sortimgdownid") {
                                $('#sortnamespan').html('<img id="sortupimageid" src="images/up_arrow.png"  />');
                                mvCore.SetCookies('cookiesorting', 'name-up', 7);
                            } else if (sortimgeid === "sortupimageid") {
                                $('#sortnamespan').html('<img id="sortimgdownid" src="images/down_arrow.png"  />');
                                mvCore.SetCookies('cookiesorting', 'name-down', 7);
                            }
                            if (screenname === "search") {
                                // Events.SearchingEvent(defaultsettings);
                                $('#countofimageslabel').html('0');

                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");

                                Events.SearchingDataBind(defaultsettings);
                            } else {
                                if (defaultsettings.apps == "eloqua") {
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Please search some thing  before sorting');
                                    setTimeout(function () {
                                        $('#errormessagediv').css('display', 'none');
                                        $('#errormessagediv').html('');
                                    }, 3000);
                                } else {
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Please search some thing  before sorting');
                                }
                            }
                        } else {
                            if (defaultsettings.apps == "eloqua") {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Enter search text into textbox');
                                setTimeout(function () {
                                    $('#errormessagediv').css('display', 'none');
                                    $('#errormessagediv').html('');
                                }, 3000);
                            } else {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Enter search text into textbox');
                            }
                            
                        }
                    }
                });
                $('#liSortbyDate').on({
                    click: function () {
                        if (defaultsettings.apps === 'hootsuite') {
                            $('.menu1').hide();
                        } else {
                            $('.officemenu1').hide();

                        }
                        if ($('#searchtxt').val().trim() !== '') {
                            $('#errormessagediv').css('display', 'none');
                            $('#infomessagediv').css('display', 'none');
                            $('#errormessagediv').html('');
                            $('#sortnamespan').html('');
                            var sortimgeid = $('#sortdatespan').find("img").attr("id");
                            if (sortimgeid === null || sortimgeid === undefined) {
                                mvCore.SetCookies('cookiesorting', 'date-down', 7);
                                $('#sortdatespan').html('<img id="sortimgdownid" src="images/down_arrow.png"  />');
                            } else if (sortimgeid === "sortimgdownid") {
                                $('#sortdatespan').html('<img id="sortupimageid" src="images/up_arrow.png"  />');
                                mvCore.SetCookies('cookiesorting', 'date-up', 7);
                            } else if (sortimgeid === "sortupimageid") {
                                $('#sortdatespan').html('<img id="sortimgdownid" src="images/down_arrow.png"  />');
                                mvCore.SetCookies('cookiesorting', 'date-down', 7);
                            }
                            if (screenname === "search") {
                                $('#countofimageslabel').html('0');
                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");

                                Events.SearchingDataBind(defaultsettings);
                                // Events.SearchingEvent(defaultsettings);
                            } else {
                                if (defaultsettings.apps == "eloqua") {
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Please search some thing  before sorting');
                                    setTimeout(function () {
                                        $('#errormessagediv').css('display', 'none');
                                        $('#errormessagediv').html('');
                                    }, 3000);
                                } else {
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Please search some thing  before sorting');
                                }
                            
                            }
                        } else {
                            if (defaultsettings.apps == "eloqua") {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Enter search text into textbox');
                                setTimeout(function () {
                                    $('#errormessagediv').css('display', 'none');
                                    $('#errormessagediv').html('');
                                }, 3000);
                            } else {
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Enter search text into textbox');
                            }
                        }
                    }
                });
                $('#liAbout').on({
                    click: function () {
                        if (defaultsettings.apps === 'hootsuite') {
                            $('.hootsuitegearmenu1').css('display', 'none');
                        } else {
                            $('.menu1').hide();
                        }
                        Model.ShowAboutPanel();
                    }
                });
                $('#liLogout').on({
                    click: function () {
                        globalvarmedataidlist = [];
                        globalvarmetadatalist = [];
                    
                        $('.officemenu1').hide();
                        //mvCore.SetCookies('cookiestoken', '', 0);
                        Events.SetLoginToken(defaultsettings, null, 0);
                        mvCore.SetCookies('cookiesdefaultgroup', '', 0);
                        mvCore.SetCookies('cookiedomaincategories', '', 0);
                        mvCore.SetCookies('cookiesclientid', '', 0);
                        mvCore.SetCookies('sortcookieval', '', 0);
                        var appsname = '';
                        if (defaultsettings.apps == 'hootsuite') {
                            appsname = 'hootsuite'
                        } else {
                            if (defaultsettings.apps == 'office') {
                                appsname = 'office';
                            } else {
                                appsname = defaultsettings.apps;
                            }
                        }
                        var now = new Date;
                        //var utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
                        //LogOut Tracking
                        var utc_timestamp = (now.getTime());
                        mvCore.TrackingAssets(globalvarclientid, '', usernameglobalvar, utc_timestamp, 'logout', globalappname,'');
                        window.location.reload();
                    }
                });

                //Open About Us page
                //$('#popup-wrapper').modalPopLite({ openButton: '#liAbout', closeButton: '#close-btn' });
            },
            LargeViewEvent: function () {
                /** Large View Event*/
                var $cell = $('.image__cell');
              
                $('.image--basic').on({
                    click: function (event) {
                        event.preventDefault();
                        $('.image--expand').css('overflow', 'hidden');
                        var $thisCell = $(this).closest('.image__cell');

                        var splits = $thisCell[0].id.split("mainlargediv");
                        var splitswithunscr = splits[1].split('_');

                        if ($thisCell.hasClass('is-collapsed')) {
                            var temp = $('#' + $thisCell[0].id).find('.image--expand').css('overflow', 'visible');
                            $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
                            $thisCell.removeClass('is-collapsed').addClass('is-expanded');
                          //  $thisCell.attr("style", "margin-bottom: -0.5%;");
                            //  video id format runtime looks like this azuremediaplayer_" + splitswithunscr[0] + "_" + splitswithunscr[1] + "_html5_api";
                            var indexof = videotagidlist.indexOf(lastplayedvideoid);
                            if (indexof >= 0) {
                                var myPlayer = amp(lastplayedvideoid);
                                myPlayer.dispose();
                                videotagidlist.splice(indexof, 1);
                            }
                            if (lastplayedeloquavideo != '') {
                                var splitids = lastplayedvideoid.split('_');
                                var largeviedivid = 'largeviewdiv' + splitids[1] + '_' + splitids[2];
                                $('#' + largeviedivid).next().next().find('.image-holder').html(lastplayedeloquavideo);
                                lastplayedeloquavideo = '';
                            }

                        } else {
                            $thisCell.removeClass('is-expanded').addClass('is-collapsed');
                            var temp = $('#' + $thisCell[0].id).find('.image--expand').css('overflow', 'hidden');
                            var indexof = videotagidlist.indexOf(lastplayedvideoid);
                            if (indexof >= 0) {
                                var myPlayer = amp(lastplayedvideoid);
                                myPlayer.dispose();
                                videotagidlist.splice(indexof, 1);
                            }
                            if (lastplayedeloquavideo != '') {
                                var splitids = lastplayedvideoid.split('_');
                                var largeviedivid = 'largeviewdiv' + splitids[1] + '_' + splitids[2];
                                $('#' + largeviedivid).next().next().find('.image-holder').html(lastplayedeloquavideo);
                                lastplayedeloquavideo = '';
                            }
                        }
                        $thisCell.off("scroll");
                    }
                });
                $cell.find('.expand__close').on({
                    click: function () {

                        var $thisCell = $(this).closest('.image__cell');
                        var splits = $thisCell[0].id.split("mainlargediv");
                        var splitswithunscr = splits[1].split('_');
                        var temp = $('#' + $thisCell[0].id).find('.image--expand').css('overflow', 'hidden');
                        $thisCell.removeAttr("style");
                        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
                        var videoid = "" + $thisCell[0].id;
                        var indexof = videotagidlist.indexOf(videoid);
                        if (indexof >= 0) {
                            var myPlayer = amp(videoid);
                            myPlayer.dispose();
                            videotagidlist.splice(indexof, 1);
                        }
                        var videoid = '';
                        if (defaultsettings.apps != "outlook") {
                            videoid = "azuremediaplayer_" + splitswithunscr[0] + "_" + splitswithunscr[1] + "_flashSS_api";
                        } else {
                            videoid = "azuremediaplayer_" + splitswithunscr[0] + "_" + splitswithunscr[1] + "_html5_api";
                            
                        }
                        var indexof = videotagidlist.indexOf(videoid);
                        if (indexof >= 0) {
                            var myPlayer = amp(videoid);
                            myPlayer.dispose();
                            videotagidlist.splice(indexof, 1);
                        }
                    }
                });
            },
            DropdownSelectionChangeEvent: function () {
                /*
                Change background color of default selection
                */
                if (mvCore.GetCookies('cookiesettings') !== '') {
                    $('.select-dropdown option').css('background-color', '');
                    if (mvCore.GetCookies('cookiesettings') === 'original') {
                        $('.select-dropdown .original').css('background-color', 'rgba(51, 153, 255, 0.60)');
                        $('.select-dropdown option[value=original]').attr('selected', 'selected');
                    } else if (mvCore.GetCookies('cookiesettings') === 'small') {
                        $('.select-dropdown .small').css('background-color', 'rgba(51, 153, 255, 0.60)');
                        $('.select-dropdown option[value=small]').attr('selected', 'selected');
                    } else if (mvCore.GetCookies('cookiesettings') === 'medium') {
                        $('.select-dropdown .medium').css('background-color', 'rgba(51, 153, 255, 0.60)');
                        $('.select-dropdown option[value=medium]').attr('selected', 'selected');
                    } else if (mvCore.GetCookies('cookiesettings') === 'large') {
                        $('.select-dropdown .large').css('background-color', 'rgba(51, 153, 255, 0.60)');
                        $('.select-dropdown option[value=large]').attr('selected', 'selected');
                    }
                }
            },
            
            /** Function NumberofImagesForFirstLoad
            * Parameter divid is the idin which we are bidning all our HTML
            * return number of image to bind (
            */
            NumberOfImagesForFirstLoad: function (divid) {
                var count = 0; 
                var divwidth = $(divid).width();
                var datadiv = '', seconddiv = '';
                var appsname = defaultsettings.apps;
                if (appsname.toLowerCase() != "hootsuite") {

                    /** Here is a demo sample ui for having all default height 
                    width of image and div that can be fit in any display if apps type not equal to hootsuite  */
                    datadiv = '<div id="testingdividforheigt" class="image__cell is-collapsed"><div id="hootsuiteOverlay1"></div><div class="image--basic " id="largeviewdiv1"><div></div> <span class="helper"></span><img id="recentviewimg1" class="basic__img" src="images/divheighttestingimage.jpg" alt="230H 2016-03-16T114333.jpg" style="/"></div><div class="arrow--up"></div><div class="image--expand"><a id="a_tagclose" class="expand__close"></a><div class="image-holder"><span class="helper"></span><img class="image--large" src="images/divheighttestingimage.jpg" alt="230H 2016-03-16T114333.jpg1" id="largeimageid8e9b9ef4-75f8-4c11-b76b-3ac235f11840"><div id="officeinsertimg8e9b9ef4-75f8-4c11-b76b-3ac235f11840"><img src="" style="display:none"></div></div><div class="image-attribs"><div class="attrib-box"><table class="attrib-table"><tbody><tr><td class="attrib-name">Title: </td><td class="attrib-value">230H</td></tr><tr id="descriptiontr1_8e9b9ef4-75f8-4c11-b76b-3ac235f11840" style="display:none"><td class="attrib-name " id="descriptiontdlabel1_8e9b9ef4-75f8-4c11-b76b-3ac235f11840">Description: </td><td class="attrib-value " id="descriptiontdval1_8e9b9ef4-75f8-4c11-b76b-3ac235f11840"><div>      </div></td></tr><tr><td class="attrib-name">User Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td class="attrib-name">Overall Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td colspan="2" class="attrib-value"></td></tr></tbody></table><div class="image-select"><select class="select-dropdown" style="display:none" id="recentviewdropdown1"><option class="small" value="small" dataassetid="8e9b9ef4-75f8-4c11-b76b-3ac235f11840">Small</option><option selected="selected" style="background-color: rgba(51, 153, 255, 0.6);" class="medium" value="medium"  dataassetid="8e9b9ef4-75f8-4c11-b76b-3ac235f11840">Medium</option><option class="large" value="large"  dataassetid="8e9b9ef4-75f8-4c11-b76b-3ac235f11840">Large</option></select><button class="select-button" id="recentview_1_selectbtn_8e9b9ef4-75f8-4c11-b76b-3ac235f11840">Insert Asset<span id="recentview_spanpowerexcelmsg1"></span> </button></div></div></div></div></div>';
                } else {
                    /** Here is a demo sample ui for having all default height 
                   width of image and div that can be fit in any display if apps type  equal to hootsuite  */
                    datadiv = '<div id="testingdividforheigt" class="image__cell is-collapsed"><div class="overlayBox"></div><div id="recentviewassetcheckboxdiv19_7203fd71-db43-49ac-ada1-e17cf46a679b" class="imageSelectBox"> <input type="checkbox" id="assetcheckbox19_7203fd71-db43-49ac-ada1-e17cf46a679b"><label></label></div><div class="image--basic " id="largeviewdiv1"><div id="hootsuiteOverlay19" class=""></div> <span class="helper"></span><img id="recentviewimg19" class="basic__img" src="images/divheighttestingimage.jpg" alt="ToSearchdup (91).jpg"></div><table width="100%" class="data-table"><tbody><tr><td colspan="2">ToSearchdup (91).jpg</td></tr><tr><td>User Rating</td><td><img src="images/0.png" height="10px"></td></tr><tr><td>Over All Rating</td><td><img src="images/0.png" height="10px"></td></tr><tr><td><input style="display:none;" type="checkbox" id=""></td></tr></tbody></table><div class="lowerDiv"><button type="button" ><svg class="icon icon-share-square-o"><use xlink:href="#icon-share-square-o"></use></svg></button></div><div class="arrow--up"></div><div class="image--expand"><a id="a_tagclose" class="expand__close"></a><div id="flaydowndivid" class="image-holder" style="min-height: 158px;"><span class="helper"></span><img class="images/divheighttestingimage.jpg" src="images/divheighttestingimgage.jpg" alt="ToSearchdup (91).jpg1" id="largeimageid7203fd71-db43-49ac-ada1-e17cf46a679b"><div id="officeinsertimg7203fd71-db43-49ac-ada1-e17cf46a679b"><img src="images/divheighttestingimage.jpg" style="display:none"></div></div><div class="image-attribs"><div class="attrib-box"><table class="attrib-table"><tbody><tr><td class="attrib-name">Title: </td><td class="attrib-value">ToSearchdup (91)</td></tr><tr id="descriptiontr19_7203fd71-db43-49ac-ada1-e17cf46a679b" style="display:none"><td class="attrib-name " id="descriptiontdlabel19_7203fd71-db43-49ac-ada1-e17cf46a679b">Description: </td><td class="attrib-value " id="descriptiontdval19_7203fd71-db43-49ac-ada1-e17cf46a679b"><div>      </div></td></tr><tr><td class="attrib-name">User Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td class="attrib-name">Overall Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td colspan="2" class="attrib-value"></td></tr></tbody></table><div class="image-select"><select class="select-dropdown" style="display:none" id="recentviewdropdown19"><option class="small" value="small" >Small</option><option class="medium" value="medium"  selected="selected" style="background-color: rgba(51, 153, 255, 0.6);">Medium</option><option class="large" value="large" >Large</option></select><button class="select-button" id="recentview_19_selectbtn_7203fd71-db43-49ac-ada1-e17cf46a679b">Select Asset</button></div></div></div></div></div>';
                    seconddiv = '<div id="testingdividforheigt2" class="image__cell is-expanded"><div class="overlayBox"></div><div id="recentviewassetcheckboxdiv19_7203fd71-db43-49ac-ada1-e17cf46a679b" class="imageSelectBox"> <input type="checkbox" id="assetcheckbox19_7203fd71-db43-49ac-ada1-e17cf46a679b"><label></label></div><div class="image--basic " id="largeviewdiv2"><div id="hootsuiteOverlay19" class=""></div> <span class="helper"></span><img id="recentviewimg19" class="basic__img" src="images/divheighttestingimage.jpg" alt="ToSearchdup (91).jpg"></div><table width="100%" class="data-table"><tbody><tr><td colspan="2">ToSearchdup (91).jpg</td></tr><tr><td>User Rating</td><td><img src="images/0.png" height="10px"></td></tr><tr><td>Over All Rating</td><td><img src="images/0.png" height="10px"></td></tr><tr><td><input style="display:none;" type="checkbox" id=""></td></tr></tbody></table><div class="lowerDiv"><button type="button" ><svg class="icon icon-share-square-o"><use xlink:href="#icon-share-square-o"></use></svg></button></div><div class="arrow--up"></div><div class="image--expand"><a id="a_tagclose" class="expand__close"></a><div id="flaydowndivid2" class="image-holder" style="min-height: 158px;"><span class="helper"></span><img class="image--large" src="images/divheighttestingimage.jpg" alt="ToSearchdup (91).jpg1" id="largeimageid7203fd71-db43-49ac-ada1-e17cf46a679b"><div id="officeinsertimg7203fd71-db43-49ac-ada1-e17cf46a679b"><img src="images/divheighttestingimage.jpg" style="display:none"></div></div><div class="image-attribs"><div class="attrib-box"><table class="attrib-table"><tbody><tr><td class="attrib-name">Title: </td><td class="attrib-value">ToSearchdup (91)</td></tr><tr id="descriptiontr19_7203fd71-db43-49ac-ada1-e17cf46a679b" style="display:none"><td class="attrib-name " id="descriptiontdlabel19_7203fd71-db43-49ac-ada1-e17cf46a679b">Description: </td><td class="attrib-value " id="descriptiontdval19_7203fd71-db43-49ac-ada1-e17cf46a679b"><div>      </div></td></tr><tr><td class="attrib-name">User Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td class="attrib-name">Overall Rating: </td><td class="attrib-value"><img src="images/0.png" height="10px"></td></tr><tr><td colspan="2" class="attrib-value"></td></tr></tbody></table><div class="image-select"><select class="select-dropdown" style="display:none" id="recentviewdropdown19"><option class="small" value="small" >Small</option><option class="medium" value="medium"  selected="selected" style="background-color: rgba(51, 153, 255, 0.6);">Medium</option><option class="large" value="large" >Large</option></select><button class="select-button" id="recentview_19_selectbtn_7203fd71-db43-49ac-ada1-e17cf46a679b">Select Asset</button></div></div></div></div></div>';
                    datadiv = datadiv + seconddiv;
                }
                $('#bindsearchdatadiv').html(datadiv);
                var divheight = $(document).height();
                var largerviewheight = $('#flaydowndivid').height();
                flydownheight = largerviewheight;
                var imageheight = '', imagewidth = '';
                imageheight = $('#testingdividforheigt').height();
                imagewidth = $('#testingdividforheigt').width();
                var imageheight2 = $('#testingdividforheigt2').height();
                var arrowheight = imageheight2 - (imageheight + flydownheight);
                if (appsname == "hootsuite") {
                    glovalthubdivheight = imageheight + arrowheight;
                } else {
                    glovalthubdivheight = imageheight;
                }
                //simple calculation for number of images fir to any screen
                globalhootsuiteoverlayheight = imageheight;
                var documentarea = divheight * divwidth;
                var imagedivarea = imageheight * imagewidth;
                var countofimage = documentarea / imagedivarea;
                var imageperrow = divwidth / imagewidth;
                imageperrow = parseInt(imageperrow);
                globalimageperowhootsuite = imageperrow;
                countofimage = parseInt(countofimage);
                var checkimg = countofimage % imageperrow;
                if (checkimg != 0) {
                    checkimg = imageperrow - checkimg;
                    countofimage = countofimage + checkimg;
                }
                $('#bindsearchdatadiv').html('');
                return countofimage;
            },
            /** SearchingDataBind Function 
            * parameters Option will contian all default setting 
            *
            */
            SearchingDataBind: function (option) {
                try {
                    var appsname = option.apps;
                    if (appsname != "eloqua") {
                        document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                    }
                    $(window).off('scroll');
                    if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "default" || appsname.toLowerCase() == "drupal" || appsname.toLowerCase() == "eloqua" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "mobileapp") {
                        $('#selectassetcategories p').text('Featured');
                    } else {
                        $('#selectassetcategories p').text('Featured Category');
                    }
                    /*Hoot Suit Requiement and changes */
                    if (appsname.toLowerCase() === 'hootsuite') {
                        $('#countofimageslabel').html('0');
                        $('#countingselectionlabel').removeClass("countingselected");
                        $('#countingselectionlabel').addClass("countingselection");
                    }
                    /*Hoot Suit Changes End Here*/
                    
                    var isfirstload = true;
                    $("html, body").css("padding-bottom", ""); //Removing the css style added after loading more assets on scrollilng
                    $('#bindsearchdatadiv').off("scroll");
                    if ($('#searchtxt').val().trim() !== '') {
                        ///Dispose Video if it s played  ok working correct
                        if (videotagidlist.length > 0) {
                            for (var i = 0; i < videotagidlist.length; i++) {
                                var videoid = videotagidlist[i];
                                var myPlayer = amp(videoid);
                                myPlayer.dispose();
                            }
                            videotagidlist.splice(0, videotagidlist.length);
                        }
                        $('#bindsearchdatadiv').html('');
                        Model.ShowLoader();
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        var sorting = mvCore.GetCookies('cookiesorting');
                        if (sorting == null) {
                            $('.sortBlock').css('display', 'none');
                        }
                        var img = '';
                        var sortmsg = '';
                        if (sorting === "name-up") {
                         
                            sortmsg = 'Sorted By : Name ';
                            img = '<img id="imgmsgup" src="images/up_arrow.png"  />';
                        }
                        if (sorting === "name-down") {
                       
                            sortmsg = 'Sorted By:  Name ';
                            img = '<img id="imgmsgdown" src="images/down_arrow.png"  />';
                        }
                        if (sorting === "date-up") {
                         
                            sortmsg = 'Sorted By :  Date ';
                            img = '<img id="imgmsgup" src="images/up_arrow.png"  />';
                        }
                        if (sorting === "date-down") {
                        
                            sortmsg = 'Sorted By: Date';
                            img = '<img id="imgmsgdown" src="images/down_arrow.png"  />';
                        }
                       
                        /**
                        *
                        * Code For MediaValet Link
                        */
                        if (defaultsettings.apps != "hootsuite") {
                            if (sortmsg != '') {
                                $('#mediavaletlibraryparaid').html('<button id="mediavaletlibraryparbtn" class="medialiabrarylink" ><label> ' + sortmsg + '' + img + '</label>');
                            }
                        }
                        /**
                       * screenname variable is a global variable and used for matainning page state
                        */
                        screenname = "search";
                        var searchtext = $('#searchtxt').val();
                        var searchingimagecount = Events.NumberOfImagesForFirstLoad('#bindsearchdatadiv');
                    
                        var token = Events.GetLoginToken(option);  
                        if (token == null || token == undefined) {
                            Model.HideLoader();
                            Model.SessionExpirePanel(true);
                        } else {
                            var urlapi = mvCore.GetCookies('cookieurlapi');
                            offsetcount = 0; 
                            var assets = mvCore.SearchingAssets(searchtext, token, 'filters', sorting, searchingimagecount, offsetcount, appsname.toLowerCase()); //0
                            $.when(assets).done(function (assetdata) {
                                if (assetdata.errormessage == null || assetdata.errormessage == undefined) {
                                    if (option.apps == "hootsuite") {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                      
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == 'compose') {
                                             
                                            } else {
                                                SearchingScreen.ImageLoading(token, assetdata, 0, 'search');
                                            }
                                        } else {
                                            hootsuiteopenview = 'default';
                                            SearchingScreen.ImageLoading(token, assetdata, 0, 'search');
                                        }
                                    } else {
                                        SearchingScreen.ImageLoading(token, assetdata, 0, 'search');
                                        /**  Eloqua Spacing 
                                        * 
                                        */
                                        if (defaultsettings.apps == "eloqua") {
                                            if (defaultsettings.apps == "eloqua" && sortmsg != "") {
                                                document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:0 !important');
                                                document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:8% !important');
                                            } else {
                                                document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:8% !important');
                                                document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                                            }
                                        }
                                    }
                                    setTimeout(function () { Model.HideLoader(); }, 1000);
                                  

                                    if (option.apps == "hootsuite") {
                                        if (hootsuiteopenview == 'default') {
                                            Events.LargeViewEvent();
                                        }
                                        //$("html, body").css('background-color', '#F5F5F5');
                                    } else {
                                        Events.LargeViewEvent();
                                    }
                                    /**
                                     * Enabling Sorting After Search Successful
                                     */
                                    $('.sortBlock').css('display', 'flex');
                                    Events.SearchLoadMoreEventBind(searchingimagecount, searchingimagecount);
                                } else {
                                    if (assetdata.errormessage == '401') {
                                        Model.HideLoader();
                                        Model.SessionExpirePanel(true);
                                    } else if (assetdata.errormessage == '500') {
                                        Model.HideLoader();
                                        $('#errormessagediv').css('display', 'block');
                                        $('#errormessagediv').html('Server Not Responding');
                                    }
                                }
                                isfirstload = false;
                            }).fail(function (assetdata) {
                                Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('API Failed To Fetch Data');
                            });
                        }
                        /**
                        Event for scrolling when seaching done
                        */
                        offsetcount = searchingimagecount;
                        var searchcount = searchingimagecount; //Events.NumberOfImagesOnScroll
                    } else {
                        if (defaultsettings.apps == "eloqua") {
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('Enter text in search text box');
                            setTimeout(function () { 
                                $('#errormessagediv').css('display', 'none');
                                $('#errormessagediv').html('');
                        }, 1000);
                        } else {
                                $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('Enter text in search text box');
                        }
                        
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                } 
            },
            /** Function LoadEventRecentlyUploadedAsset
            *@param Option contains all setting defaults values for app
            */
            LoadEventRecentlyUploadedAsset: function (option) {
                try {
                    if (checkstatus == false) {
                        checkstatus = true;  //change default value of global variable checkstatus
                        categoryname = 'recentview';
                        $("html, body").css("padding-bottom", "");
                        Model.ShowLoader();
                        $('#bindsearchdatadiv').html('');
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        $('#mediavaletlibraryparaid').html('');
                        var appsname=option.apps;
                        var count = Events.NumberOfImagesForFirstLoad('#bindsearchdatadiv');
                        //this will fecth the login Token according to the app
                        var token = Events.GetLoginToken(option);// mvCore.GetCookies("cookiestoken");
                        offsetcount = 0; //recentlyviewedoffset-count initialized here
                        
                        if (token != null || token != undefined) {
                            mvCore.SetCookies('currentview', currentView.RecentUpload, 7);
                            var recentlyviwed = mvCore.GetAssets('filter', token, 0, count, appsname.toLowerCase());
                            $.when(recentlyviwed).done(function (assetdata) {
                                if (assetdata.errormessage == null || assetdata.errormessage == undefined) {
                                    if (defaultsettings.apps == "hootsuite") {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == "default") {
                                                SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                                Events.DropdownSelectionChangeEvent();
                                                Events.LargeViewEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            } else if (hootsuiteopenview == "compose") {
                                                //  HootSuiteScreen.HootSuiteImageLoading(token, assetdata, 0, categoryname);
                                                Events.DropdownSelectionChangeEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            }
                                        } else {
                                            SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                            Events.DropdownSelectionChangeEvent();
                                            Events.LargeViewEvent();
                                            setTimeout(function () { Model.HideLoader(); }, 1000);
                                           // $('#bindsearchdatadiv').css('margin-top', '8%');
                                          //  $('#mediavaletlibraryparaid').css('margin-top', '0');
                                        }
                                        // $("html, body").css('background-color', '#F5F5F5');
                                        Events.AutoLoadScrollDownEvent();
                                    } else {
                                       
                                       // $('#mediavaletlibraryparaid').attr('style', 'margin-top:0px !important');
                                        //$('#bindsearchdatadiv').attr('style', 'margin-top: 8% !important');
                                        SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                        Events.DropdownSelectionChangeEvent();
                                        Events.LargeViewEvent();
                                        Events.AutoLoadScrollDownEvent();
                                      
                                        /**  Eloqua Spacing 
                                               * 
                                               */
                                        if (defaultsettings.apps == "eloqua") {
                                            document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:8% !important');
                                            document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                                        }
                                        setTimeout(function () { Model.HideLoader(); }, 1000);
                                      
                                        var rrt = $('body').height();
                                        $('body').height(rrt + 20);
                                        
                                    }


                                } else {
                                    if (assetdata.errormessage == '401') {
                                        Model.HideLoader();
                                        Model.SessionExpirePanel(true);
                                    } else if (assetdata.errormessage == '500') {
                                        Model.HideLoader();
                                        $('#errormessagediv').css('display', 'block');
                                        $('#errormessagediv').html('Server Not Responding');
                                    }
                                }

                                checkstatus = false;   //change back to the default value of global variable
                            }).fail(function (assetdata) {
                               Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Recent Upload API Failed To Fetch Data');
                            });
                            offsetcount = count;
                            imagecountonscroll = count;
                        }
                        else {
                            Model.HideLoader();
                            Model.SessionExpirePanel(true);
                        }
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },
            /** function LoadEventMostViewedAsset 
            *@param option will contain all default setting 
            */
            LoadEventMostViewedAsset: function (option) {
                try {
                    if (checkstatus == false) {
                        checkstatus = true;  //change default value of global variable checkstatus
                        offsetcount = 0;
                        $("html, body").css("padding-bottom", "");
                        Model.ShowLoader();
                        $('#bindsearchdatadiv').html('');
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        $('#mediavaletlibraryparaid').html('');
                        screenname = "mostviewmore";
                        categoryname = 'mostview';
                        //number of image fit to any screen size
                        var count = Events.NumberOfImagesForFirstLoad('#bindsearchdatadiv');
                        var appsname = option.apps;
                        //get token according to app
                        var token = Events.GetLoginToken(option);
                        if (token == null || token == undefined) {
                            Model.HideLoader();
                            //Session Expire Pop Up for relogin 
                            Model.SessionExpirePanel(true);
                        } else {
                          //set cookies values current view
                            mvCore.SetCookies('currentview', currentView.MostViewed, 7);
                            var mostviwed = mvCore.GetAssets('filter', token, 0, count, appsname.toLowerCase());
                            $.when(mostviwed).done(function (assetdata) {
                                if (assetdata.errormessage = null || assetdata.errormessage == undefined) {
                                    if (defaultsettings.apps == 'hootsuite') {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == 'default') {
                                                SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                                Events.DropdownSelectionChangeEvent();
                                                Events.LargeViewEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            } else if (hootsuiteopenview == 'compose') {
                                                Events.DropdownSelectionChangeEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            }
                                        } else {
                                            hootsuiteopenview = 'default';
                                            SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                            Events.DropdownSelectionChangeEvent();
                                            Events.LargeViewEvent();
                                            setTimeout(function () { Model.HideLoader(); }, 1000);
                                        }
                                        Events.AutoLoadScrollDownEvent();
                                    } else {
                                       
                                        SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                        Events.DropdownSelectionChangeEvent();
                                        Events.LargeViewEvent();
                                        Events.AutoLoadScrollDownEvent();
                                        if (defaultsettings.apps == "eloqua") {
                                            document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:8% !important');
                                            document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                                        }
                                        setTimeout(function () { Model.HideLoader(); }, 1000);
                                    }
                                } else {
                                    if (assetdata.errormessage == '401') {
                                        Model.HideLoader();
                                        Model.SessionExpirePanel(true);
                                    } else if (assetdata.errormessage == '500') {
                                        Model.HideLoader();
                                        $('#errormessagediv').css('display', 'block');
                                        $('#errormessagediv').html('Server Not Responding');
                                    }
                                }
                                
                                checkstatus = false;   //change back to the default value of global variable
                            }).fail(function (assetdata) {
                                Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Recent Upload API Failed To Fetch Data');
                            });
                            offsetcount = count;
                            imagecountonscroll = count;//Events.NumberOfImagesOnScroll('#bindsearchdatadiv');
                        }
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },
            /** Function LoadEventPinnedAsset  
            *@param option will contain all default values for the app
            *@param id of Ol->li id
            */
            LoadEventPinnedAsset: function (option, id) {
                try {
                    
                    if (checkstatus == false) {
                        checkstatus = true;  //change default value of global variable checkstatus
                        offsetcount = 0;
                        $("html, body").css("padding-bottom", "");
                        Model.ShowLoader();
                        //Dispose all played video 
                        if (videotagidlist.length > 0) {
                            for (var i = 0; i < videotagidlist.length; i++) {
                                var videoid = videotagidlist[i];
                                var myPlayer = amp(videoid);
                                myPlayer.dispose();
                            }
                            videotagidlist.splice(0, videotagidlist.length);
                        }
                        $('#bindsearchdatadiv').html('');
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        $('#mediavaletlibraryparaid').html('');
                        screenname = "mostviewmore";
                        categoryname = 'pinnedasset';
                        var appsname=option.apps;
                        var count = Events.NumberOfImagesForFirstLoad('#bindsearchdatadiv');

                        var token = Events.GetLoginToken(option);// mvCore.GetCookies("cookiestoken");
                        if (token == null || token == undefined) {
                            Model.HideLoader();
                            Model.SessionExpirePanel(true);
                        } else {
                            mvCore.SetCookies('currentview', id, 7);
                            var categoryassets = mvCore.GetAssets('filter', token, 0, count, appsname.toLowerCase());

                            $.when(categoryassets).done(function (assetdata) {
                                if (assetdata.errormessage == null || assetdata.errormessage == undefined) {
                                    //if (assetdata.payload.assetCount > mostviewedoffset) {
                                    var actualoffsetcount = '';
                                    if (defaultsettings.apps == 'hootsuite') {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == 'default') {
                                                //actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, mostviewedoffset, categoryname);
                                                SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                                Events.DropdownSelectionChangeEvent();
                                                Events.LargeViewEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            } else if (hootsuiteopenview == 'compose') {
                                                //   HootSuiteScreen.HootSuiteImageLoading(token, assetdata, 0, categoryname);
                                                Events.DropdownSelectionChangeEvent();
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            }
                                        } else {
                                            hootsuiteopenview = 'default';
                                            SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                            Events.DropdownSelectionChangeEvent();
                                            Events.LargeViewEvent();
                                            setTimeout(function () { Model.HideLoader(); }, 1000);
                                        }
                                       
                                        Events.AutoLoadScrollDownEvent(); //scrolling event
                                    } else {
                                        SearchingScreen.ImageLoading(token, assetdata, 0, categoryname);
                                        Events.DropdownSelectionChangeEvent();
                                        Events.LargeViewEvent();
                                        Events.AutoLoadScrollDownEvent();
                                        /**  Eloqua Spacing 
                                        * 
                                       */
                                        if (defaultsettings.apps == "eloqua") {
                                            document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:8% !important');
                                            document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                                        }
                                        setTimeout(function () { Model.HideLoader(); }, 1000);
                                    }

                                } else {
                                    if (assetdata.errormessage == '401') {
                                        Model.HideLoader();
                                        Model.SessionExpirePanel(true);
                                    } else if (assetdata.errormessage == '500') {
                                        Model.HideLoader();
                                        $('#errormessagediv').css('display', 'block');
                                        $('#errormessagediv').html('Server Not Responding');
                                    }
                                }
                                checkstatus = false;   //change back to the default value of global variable
                            }).fail(function (assetdata) {
                                Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Recent Upload API Failed To Fetch Data');
                            });
                            offsetcount = count;
                            imagecountonscroll = count;//Events.NumberOfImagesOnScroll('#bindsearchdatadiv');
                        }
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },

            selectDropdownOffice: function () {
                $('#selectassetcategories').click(function () {
                    $('.selectOfficeDropdown').toggle();
                });
                $('.hootsuitestyled-select').click(function () {
                    $('.selecthootsuiteDropdown').toggle();
                });
            },
            /** function selectDropdownList 
            *
            */
            selectDropdownList: function () {
                
                var appsname = defaultsettings.apps;
                if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "default" || appsname.toLowerCase() == "drupal" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "eloqua" ||appsname.toLowerCase() == "mobileapp" ) {
                    $("#selectassetcategories").off("click");
                    $(document).on("click", function (event) {
                        $("#selectassetcategories").off("click");
                        $("#selectassetcategories").on("click", function () {
                            var display = $('#selectOfficeDropdownid').css('display');
                            if (display == "block") {
                                $('#selectOfficeDropdownul').css('display', 'none');
                                $('.selectOfficeDropdown').css('display', 'none');
                                $('#selectOfficeDropdownid').removeAttr('display');
                                $('#selectOfficeDropdownid').css('display', 'none');
                            } else {
                                $('#selectOfficeDropdownul').css('display', 'block');
                                $('.selectOfficeDropdown').css('display', 'block');
                                $('#selectOfficeDropdownid').css('display', 'block');
                            }
                        });
                        $("#selectOfficeDropdownul li").off("click");
                        $("#selectOfficeDropdownul li").on("click", function () {
                            //Event for Dropdown video 
                            if (videotagidlist.length > 0) {
                                for (var i = 0; i < videotagidlist.length; i++) {
                                    var videoid = videotagidlist[i];
                                    var myPlayer = amp(videoid);
                                    myPlayer.dispose();
                                }
                                videotagidlist.splice(0, videotagidlist.length);
                            }
                            $('#bindsearchdatadiv').html('');
                            $('#sortnamespan').html('');
                            $('#sortdatespan').html('');
                            //Dispose All Video List which are played atlest once
                           
                            mvCore.SetCookies('cookiesorting', '', 0);
                            $('#searchtxt').val('');
                            $('.sortBlock').css('display', 'none');
                            var id = this.id;
                            var txt = $(this).text();
                            if (id == 'recentview') {
                                $('#selectOfficeDropdownul  recentview').remove();
                                $('#countofimageslabel').html('0');
                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");
                                //Loading Recelty Uploaded asset 
                                Events.LoadEventRecentlyUploadedAsset(defaultsettings);
                            } else if (id == 'mostviewed') {
                                $('#selectOfficeDropdownul mostviewed').remove();
                                $('#countofimageslabel').html('0');
                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");

                                Events.LoadEventMostViewedAsset(defaultsettings);
                            } else if (id == 'editcategories') {
                                //Edit Pinned Category called Here
                                $('#countofimageslabel').html('0');
                                $('#countingselectionlabel').removeClass("countingselected");
                                $('#countingselectionlabel').addClass("countingselection");
                                Events.EditPinnedCategoriesEvent(defaultsettings);
                              
                            }
                            else {
                                //Other Category Asset will bind here
                                Events.LoadEventPinnedAsset(defaultsettings, id);
                            }
                            $('#selectassetcategories p').text(txt);
                        });
                    });
                } else if (appsname == "hootsuite") {
                    //All Events are only for Hootsuite only
                    $("#selectassetcategories ul li").off("click");
                    $("#selectassetcategories ul li").on("click", function () {
                        $('#bindsearchdatadiv').html('');
                        $('#sortnamespan').html('');
                        $('#sortdatespan').html('');
                        mvCore.SetCookies('cookiesorting', '', 7);
                        $('.sortBlock').css('display', 'none');
                        $('#searchtxt').val('');
                        var id = this.id;
                        var txt = $(this).text();
                        if (id == 'recentview') {
                            //Selection Flush
                            Events.SelectionFlushEvent();
                            $('#selectsortparaid').html('Select');
                            $('.selecthootsuiteDropdown  recentview').remove();
                            $('#countofimageslabel').html(selecteditemsassetid.length);
                            $('#countingselectionlabel').removeClass("countingselected");
                            $('#countingselectionlabel').addClass("countingselection");
                            $('searchtxt').html('');
                            Events.LoadEventRecentlyUploadedAsset(defaultsettings);
                        } else if (id == 'mostviewed') {
                            Events.SelectionFlushEvent();
                            $('#selectsortparaid').html('Select');
                            $('.selecthootsuiteDropdown mostviewed').remove();
                            $('#countofimageslabel').html(selecteditemsassetid.length);
                            $('#countingselectionlabel').removeClass("countingselected");
                            $('#countingselectionlabel').addClass("countingselection");
                            Events.LoadEventMostViewedAsset(defaultsettings);
                        } else if (id == 'editcategories') {
                            Events.SelectionFlushEvent();
                            $('#selectsortparaid').html('Select');
                            $('#countofimageslabel').html(selecteditemsassetid.length);
                            $('#countingselectionlabel').removeClass("countingselected");
                            $('#countingselectionlabel').addClass("countingselection");
                            //$('searchtxt').html('');
                            Events.EditPinnedCategoriesEvent(defaultsettings);
                        }
                        else {
                            Events.SelectionFlushEvent();
                            Events.LoadEventPinnedAsset(defaultsettings, id);
                        }
                        $('#selectassetcategories p').text(txt);
                    });
                }
            },
            /** Function EditPinnedCategoryEvent
            *@param options will contain all parameters
            */
            EditPinnedCategoriesEvent: function (options) {  
                try {
                 
                    $('.error').css({
                        "border-color": "#fa8072", "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                    });
                    if (checkstatus == false) {
                        checkstatus = true;
                        Model.ShowLoader();
                        $("html, body").css("padding-bottom", "");
                        $('#bindsearchdatadiv').html('');
                        $('#bindsearchdatadiv').off('click');
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        screenname = "editcategories";
                        var databind = '<div class="categories">';
                        databind += '<span class="pinned"><strong>Featured Categories</strong></span>' +
                                        '<ol class="pintree">';
                        var appsname = defaultsettings.apps;  //getting app name user has logged into
                        var tempcatlist = '';
                        if (appsname == "default") { //get categories for default app
                            tempcatlist = mvCore.GetCookies('cookiedomaincategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomaincategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        } else if (appsname == "office") {  //get categories for pffice app
                            tempcatlist = mvCore.GetCookies('cookiedomainofficecategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomainofficecategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        } else if (appsname == "mobileapp") {  //get categories for pffice app
                            tempcatlist = mvCore.GetCookies('cookiedomainmobileappcategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomainmobileappcategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        } else if (appsname == "outlook") {  //get categories for outlook app
                            tempcatlist = mvCore.GetCookies('cookiedomainoutlookcategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomainoutlookcategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        }
                        else if (appsname == "eloqua") {  //get categories for outlook app
                            tempcatlist = mvCore.GetCookies('cookiedomaineloquacategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomaineloquacategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        } else if (appsname == "hootsuite") {  //get categories for hootsuite app
                            tempcatlist = mvCore.GetCookies('cookiedomainhootsuitecategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomainhootsuitecategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        } else if (appsname == "drupal") {  //get categories for drupal app
                            tempcatlist = mvCore.GetCookies('cookiedomaindrupalcategories');
                            if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                                domaincatlist = mvCore.GetCookies('cookiedomaindrupalcategories').split(','); //set values to global variable domaincatlist
                            } else {
                                domaincatlist = [];
                            }
                        }

                        var pinnedidlist = [];
                        if (domaincatlist[0] !== "" && domaincatlist[0] !== "Null" && domaincatlist !== undefined) {
                            //check if domaincatlist has value, if yes, bind them here
                            var upimgbtn = '<img src="images/button-up.png" class="up" />';
                            var downimgbtn = '<img src="images/button-down.png" class="down" />';
                            $.each(domaincatlist, function (key, value) {
                                pinnedidlist.push(value.split(':')[0]);  //To be used to toggle Featured Category pin image
                                var pinnedcatname = value.split(':')[1];
                                var pintreediv = 'pintreediv_' + value.split(':')[0];
                                var rowupdowndiv = 'rowupdowndiv_' + value.split(':')[0];
                                var imgupbtn = '<img src="images/button-up.png" class="up" id="up_' + value.split(':')[0] + '" />';
                                var imgdownbtn = '<img src="images/button-down.png" class="down" id="down_' + value.split(':')[0] + '" />';
                                if (key == 0) {
                                    imgupbtn = '<img src="images/button-up.png" class="up" id="up_' + value.split(':')[0] + '" style="display:none" />';
                                }
                                if (key == domaincatlist.length - 1) {
                                    imgdownbtn = '<img src="images/button-down.png" class="down" id="down_' + value.split(':')[0] + '" style="display:none" />';
                                }
                                databind += '<li id="pinli_' + value.split(':')[0] + '">' +
                                    
                                    imgupbtn +
                                    imgdownbtn + //'</div>' +
                                    '<img src="images/folder-symbol.png" class="fold">' +
                                    '<span class="pinnedcatname">' + pinnedcatname + '</span>' +
                                    '<div class = "pinicons" id=' + pintreediv + '>' +
                                    '<img class = "tick" src="images/delete.png" id="btn_' + value.toLowerCase() + '" />' +
                                    '<img class="pin" src="images/pin.png"' + 'id="' + value.toLowerCase() + '" /></div>' +
                                    '</li>';    //<div class="hoverer"></div>
                                Events.moveUp('up_' + value.split(':')[0]);
                                Events.moveDown('down_' + value.split(':')[0]);
                                Events.setRemovePinnedCategories(pintreediv, value.toLowerCase(), "btn_" + value.toLowerCase());
                               
                            });
                            databind += '</ol><hr />' +    //</li></ol> one level reduced
                                '<span class="main"><strong>All Categories</strong></span>' +
                                '<ol class="tree">';  //<li class="main">' +   //or opened new parent ol here
                        
                        } else {
                            databind += '</ol></li></ol><hr />' +
                                '<span class="main"><strong>All Categories</strong></span>' +
                                '<ol class="tree">';   //<li class="main">' +   //or opened new parent ol here
                        }
                       //made it global variable
                        var token = Events.GetLoginToken(options);
                        var folders = mvCore.GetFolders(token);  //get folders with subfolders

                        $.when(folders).done(function (folderdata) {
                            
                            if (folderdata.errormessage == null || folderdata.errormessage == undefined) {
                                if (folderdata.payload.length > 0) {
                                    for (var i = 1; i < folderdata.payload.length; i++) {
                                        var folderid = folderdata.payload[i].id;

                                        databind += '<li  id="' + folderid + '">' +    //class="file"
                                                '<label class="root" for="li_' + folderdata.payload[i].name.toLowerCase() + '" style="margin-left: -34px;">' +
                                            folderdata.payload[i].name + '</label>' +   
                                            '<input type="checkbox" checked id="li_' + folderdata.payload[i].name.toLowerCase() + '" />';
                                        if (folderdata.payload[i].subfolderCount > 0) { //if true call api to get subfolders against root folder id
                                            var subfolders = mvCore.GetSubFolders(token, folderid);
                                            $.when(subfolders).done(function (subfolderdata) {
                                               
                                                databind = "";
                                                if (subfolderdata.errormessage == null || subfolderdata.errormessage == undefined) {
                                                    if (subfolderdata.payload.length > 0) {
                                                        databind += '<ol class="subcategory">';  //<li>
                                                        var imgsrc = "";
                                                        var tickuntick = "";
                                                        for (var a = 0; a < subfolderdata.payload.length; a++) {
                                                            imgsrc = "images/pin-h.png";
                                                            tickuntick = "images/check.png";
                                                            $.each(pinnedidlist, function (key, value) {
                                                                if (value == subfolderdata.payload[a].id) {
                                                                    imgsrc = "images/pin.png";
                                                                    tickuntick = "images/delete.png";
                                                                }
                                                            });
                                                            //Implementation for showing plus icon aganist folders having subfoldercount > 0
                                                            var templi = '';
                                                            var tempcheckbox = '';
                                                            if (subfolderdata.payload[a].subfolderCount > 0) {
                                                                templi = '<li class="hascats"  id="' + subfolderdata.payload[a].id + '">';
                                                                tempcheckbox = '<input type="checkbox" checked:checked id="li_' + subfolderdata.payload[a].id + '" />';
                                                            } else {
                                                                templi = '<li  id="' + subfolderdata.payload[a].id + '">';
                                                                tempcheckbox = '<input type="checkbox" id="li_' + subfolderdata.payload[a].id + '" />';
                                                            }
                                                            var pinimageid = subfolderdata.payload[a].id + ':' + subfolderdata.payload[a].name;//.toLowerCase(); earlier it was small case now we are saving as it s coming from MV API
                                                            var subfolderdiv = 'subfolderdiv_' + subfolderdata.payload[a].id;
                                                           
                                                            databind += templi +
                                                                '<label for="li_' + subfolderdata.payload[a].id + '">' +
                                                                subfolderdata.payload[a].name + '</label>' +  //<div class="hoverer"></div>
                                                                '<div class="pinicons" id=' + subfolderdiv + '>' +
                                                                '<img class = "tick" src="' + tickuntick + '" id="btn_' + pinimageid + '" />' + //
                                                                '<img class="pin" src="' + imgsrc + '" id="' + pinimageid + '" /></div>' +
                                                                tempcheckbox +
                                                                '</li>';
                                                            Events.pinDivHover(subfolderdiv);
                                                            Events.setRemovePinnedCategories(subfolderdiv, pinimageid, "btn_" + pinimageid);
                                                            Events.getSubcategories(subfolderdata.payload[a].id);
                                                            Events.toggleCheckbox(subfolderdata.payload[a].id);
                                                        }
                                                        databind += '</ol>';  //</li> one li removed
                                                        databind += '</li></ol></div>'; //</ol> one level reduced //databind div closes here
                                                    }
                                                } else {
                                                    //handle expiry token here
                                                    if (subfolderdata.errormessage == '401') {
                                                        Model.HideLoader();
                                                        Model.SessionExpirePanel(true);
                                                    } else if (subfolderdata.errormessage == '500') {
                                                        Model.HideLoader();
                                                        $('#errormessagediv').css('display', 'block');
                                                        $('#errormessagediv').html('Server Not Responding');
                                                    }
                                                }
                                                $('li#' + folderid).append(databind);        //$('li.file').append(databind);
                                                checkstatus = false;   //change back to the default value of global variable
                                            }).fail(function (subfolderdata) {
                                                //error message
                                            });

                                        }
                                        databind += '</li>';
                                    }
                                    
                                }
                            } else {
                                //handle expiry token here
                                if (folderdata.errormessage == '401') {
                                    Model.HideLoader();
                                    Model.SessionExpirePanel(true);
                                } else if (folderdata.errormessage == '500') {
                                    Model.HideLoader();
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Server Not Responding');
                                }
                            }

                            $('#bindsearchdatadiv').append(databind);
                            Model.HideLoader();
                        }).fail(function (folderdata) {
                            Model.HideLoader();
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html("Error.");
                        });
                    }
                    $(window).off('scroll');
                              /**  Eloqua Spacing 
                              * 
                              */
                    if (defaultsettings.apps == "eloqua") {
                        document.getElementById("bindsearchdatadiv").setAttribute('style', 'margin-top:8% !important');
                        document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },
            pinDivHover: function (divid) {
                $(document).on("mouseenter", "div#" + divid, function () {//, "img#" + pinid
                    $('#' + divid).parent().children("label:first-child").css('background-color', 'rgba(105, 103, 103, 0.2)');
                    
                });
                $(document).on("mouseout", "div#" + divid, function () {  //, "img#" + pinid
                  
                    $('#' + divid).parent().children("label:first-child").removeAttr("style");
                });
            },
            moveUp: function (btnid) {
                //$('.up').click(function () {
                $(document).on("click", "img#" + btnid, function () {
                    var temp = $(this);
                    if (temp.data('requestRunning')) {
                        return;
                    }
                    temp.data('requestRunning', true);

                    $(this).parent().insertBefore($(this).parent().prev());
                    $("ol.pintree").children("li:first-child").children(".up").css('display', 'none');
                    $("ol.pintree").children("li:first-child").children(".down").css('display', 'block');
                    $("ol.pintree").children("li:last-child").children(".up").css('display', 'block');
                    $("ol.pintree").children("li:last-child").children(".down").css('display', 'none');
                   
                    var licount = $("ol.pintree").children("li").length;
                    for (var i = 2; i < licount; i++) {
                        $("ol.pintree").children("li:nth-child(" + i + ")").children(".up, .down").css('display', 'block');
                    }

                    /*setting the new order of featured categories in cookie, dropdownlist and azure table storage*/
                    var appsname = defaultsettings.apps;
                    Model.ShowLoader();
                    var clientid = mvCore.GetCookies('cookiesclientid');
                    var domaindata = mvCore.GetCookies('coookieusername');
                    var domaindatapart = domaindata.split('@');
                    //
                    var optionTexts = [];
                    $("ol.pintree li").each(function () {
                        optionTexts.push($(this).attr('id').split('_')[1] + ':' + $(this).text());
                    });
                    var catlist = optionTexts[0];
                    for (var i = 1; i < optionTexts.length; i++) {
                        catlist += ',' + optionTexts[i];
                    }
                    var updatedpinnedcats = mvCore.SetRemovePinnedCategoriesForUser(clientid, appsname, catlist, domaindata); //domaindatapart[1],
                    $.when(updatedpinnedcats).done(function (updatedcatsdata) {
                        
                        Events.LoadEventGetUserCategories(clientid, domaindatapart[1], domaindata, appsname);
                        Events.RefreshCategoryDropdownEvent();
                        Events.selectDropdownList();
                        Model.HideLoader();
                        temp.data('requestRunning', false);
                    });
                });
            },
            moveDown: function (btnid) {
                $(document).on("click", "img#" + btnid, function () {
                    var temp = $(this);
                    if (temp.data('requestRunning')) {
                        return;
                    }
                    temp.data('requestRunning', true);

                    $(this).parent().insertAfter($(this).parent().next());
                  
                    $("ol.pintree").children("li:first-child").children(".up").css('display', 'none');
                    $("ol.pintree").children("li:first-child").children(".down").css('display', 'block');
                    $("ol.pintree").children("li:last-child").children(".up").css('display', 'block');
                    $("ol.pintree").children("li:last-child").children(".down").css('display', 'none');
                  
                    var licount = $("ol.pintree").children("li").length;
                    for (var i = 2; i < licount; i++) {
                        $("ol.pintree").children("li:nth-child(" + i + ")").children(".up, .down").css('display', 'block');
                    }
                    /*setting the new order of featured categories in cookie, dropdownlist and azure table storage*/
                    var appsname = defaultsettings.apps;
                    Model.ShowLoader();
                    var clientid = mvCore.GetCookies('cookiesclientid');
                    var domaindata = mvCore.GetCookies('coookieusername');
                    var domaindatapart = domaindata.split('@');
                    //
                    var optionTexts = [];
                    $("ol.pintree li").each(function () {
                        optionTexts.push($(this).attr('id').split('_')[1] + ':' + $(this).text());
                    });
                   
                    var catlist = optionTexts[0];
                    for (var i = 1; i < optionTexts.length; i++) {
                        catlist += ',' + optionTexts[i];
                    }
                    var updatedpinnedcats = mvCore.SetRemovePinnedCategoriesForUser(clientid, appsname, catlist, domaindata); //domaindatapart[1],
                    $.when(updatedpinnedcats).done(function (updatedcatsdata) {
                      
                        Events.LoadEventGetUserCategories(clientid, domaindatapart[1], domaindata, appsname);
                        Events.RefreshCategoryDropdownEvent();
                        Events.selectDropdownList();
                        Model.HideLoader();
                        temp.data('requestRunning', false);
                    });
                });
            },
            /** Function toggleCheckbox  
            *@param subcatid with contain sub category li id
            */
            toggleCheckbox: function (subcatid) {
                $("ol.tree").on('click', 'input:checkbox[id="li_' + subcatid + '"]', function (e) {
                    if ($(this).closest("li").children("ol").length) {
                        if ($('ol').find('li#' + subcatid).hasClass('hascats')) {
                            $('ol').find('li#' + subcatid).removeClass('hascats');
                            $('ol').find('li#' + subcatid).addClass('hascatsexpanded');
                        }
                        else if ($('ol').find('li#' + subcatid).hasClass('hascatsexpanded')) {
                            $('ol').find('li#' + subcatid).removeClass('hascatsexpanded');
                            $('ol').find('li#' + subcatid).addClass('hascats');
                        }
                    }
                });
            },
            /** function getSubcategories 
            *@param categoryid Cateories Tree li id
            */
            getSubcategories: function (categoryid) {
                $("ol.tree").on('click', 'li[id="' + categoryid + '"]', function (e) {
                    var temp = $(this);
                    if (temp.data('requestRunning')) {
                        return;
                    }
                    temp.data('requestRunning', true);
                    Model.ShowLoader();
                    var appsname = defaultsettings.apps;  //getting app name user has logged into
                    var tempcatlist = '';

                    if (appsname == "default") { //get categories for office or default app
                        tempcatlist = mvCore.GetCookies('cookiedomaincategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaincategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "office") {  //get categories for hootsuite app
                        tempcatlist = mvCore.GetCookies('cookiedomainofficecategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainofficecategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "mobileapp") {  //get categories for hootsuite app
                        tempcatlist = mvCore.GetCookies('cookiedomainmobileappcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainmobileappcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "outlook") {  //get categories for outlook app
                        tempcatlist = mvCore.GetCookies('cookiedomainoutlookcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainoutlookcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "eloqua") {  //get categories for outlook app
                        tempcatlist = mvCore.GetCookies('cookiedomainelquacategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaineloquacategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "hootsuite") {  //get categories as per app name
                        tempcatlist = mvCore.GetCookies('cookiedomainhootsuitecategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainhootsuitecategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "drupal") {  //get categories as per app name
                        tempcatlist = mvCore.GetCookies('cookiedomaindrupalcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaindrupalcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    }
                   
                    var pinnedidlist2 = [];
                    $.each(domaincatlist, function (key, value) {
                        pinnedidlist2.push(value.split(':')[0]);  //To be used to toggle Featured Category pin image
                    });

                    var token = Events.GetLoginToken(defaultsettings);//mvCore.GetCookies("cookiestoken");
                    var childfolders = mvCore.GetSubFolders(token, categoryid);
                    $.when(childfolders).done(function (childfolderdata) {
                       
                        var databind = "";
                        var imgsrc2 = " ";
                        var tickuntick2 = "";
                        if (childfolderdata.errormessage == null || childfolderdata.errormessage == undefined) {
                            if (childfolderdata.payload.length > 0) {
                                databind += '<ol><li><ol>';
                                for (var a = 0; a < childfolderdata.payload.length; a++) {
                                    imgsrc2 = "images/pin-h.png";
                                    tickuntick2 = "images/check.png";
                                    $.each(pinnedidlist2, function (key, value) {
                                        if (value == childfolderdata.payload[a].id) {
                                            imgsrc2 = "images/pin.png";
                                            tickuntick2 = "images/delete.png";
                                        }
                                    });
                                    //Implementation for showing plus icon aganist folders having subfoldercount > 0
                                    var templi = '';
                                    var tempcheckbox = '';
                                    if (childfolderdata.payload[a].subfolderCount > 0) {
                                        templi = '<li class="hascats"  id="' + childfolderdata.payload[a].id + '">';
                                        tempcheckbox = '<input type="checkbox" checked:checked id="li_' + childfolderdata.payload[a].id + '" />';
                                    } else {
                                        templi = '<li  id="' + childfolderdata.payload[a].id + '">';
                                        tempcheckbox = '<input type="checkbox" id="li_' + childfolderdata.payload[a].id + '" />';
                                    }
                                    var imgid = childfolderdata.payload[a].id + ':' + childfolderdata.payload[a].name.toLowerCase();
                                    var childfolderdiv = 'subfolderdiv_' + childfolderdata.payload[a].id;
                                 
                                    databind += templi +
                                        '<label for="li_' + childfolderdata.payload[a].id + '">' +
                                        //'<img src="images/folder-symbol.png" class="fold">' +
                                        childfolderdata.payload[a].name + '</label>' +  //<div class="hoverer"></div>
                                        '<div class="pinicons" id=' + childfolderdiv + '>' +
                                        '<img class = "tick" src="' + tickuntick2 + '" id="btn_' + imgid + '" />' +  //
                                        '<img class="pin" src="' + imgsrc2 + '" id="' + imgid + '" /></div>' +
                                        tempcheckbox + '</li>';
                                  
                                    Events.pinDivHover(childfolderdiv);
                                    Events.setRemovePinnedCategories(childfolderdiv, imgid, "btn_" + imgid);
                                    Events.getSubcategories(childfolderdata.payload[a].id, token);
                                    Events.toggleCheckbox(childfolderdata.payload[a].id);
                                }
                                databind += '</ol></li></ol>';
                               
                            }
                        } else {
                      
                            if (childfolderdata.errormessage == '401') {
                                Model.HideLoader();
                                Model.SessionExpirePanel(true);
                            } else if (childfolderdata.errormessage == '500') {
                                Model.HideLoader();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Server Not Responding');
                            }
                        }
                        $('ol').find('li#' + categoryid).append(databind);
                        if ($('ol').find('li#' + categoryid).children('ol').length) {
                            $('ol').find('li#' + categoryid).removeClass('hascats');
                            $('ol').find('li#' + categoryid).addClass('hascatsexpanded');
                        }
                        Model.HideLoader();
                    }).fail(function (childfolderdata) {
                       
                        Model.HideLoader();
                    });
                });
            },
            /** Function setRemovedPinnedCategories 
            *@param pindivid 
            *@param pinimgeid 
            *param tickimageid
            */
            setRemovePinnedCategories: function (pindivid, pinimageid, tickimageid) {
                $('#bindsearchdatadiv').bind().on("click", 'div[id="' + pindivid + '"]', function (event) {
                    $('#errormessagediv').css('display', 'none');
                    $('#infomessagediv').css('display', 'none');
                    $('#errormessagediv').html("");
                    var temp = $(this);
                    var imgsrc = $("#" + this.id + " .pin").attr("src");
                    var imgticksrc = $("#" + this.id + " .tick").attr("src");
                    var parentolnameandid = this.id.split('_');
                    if (temp.data('requestRunning')) {
                        return;
                    }
                    temp.data('requestRunning', true);
                    var appsname = defaultsettings.apps;
                    Model.ShowLoader();
                    var tempcatlist = '';
                    if (appsname == "default") { //get categories for office or default app
                        tempcatlist = mvCore.GetCookies('cookiedomaincategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaincategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "office") {  //get categories for hootsuite app
                        tempcatlist = mvCore.GetCookies('cookiedomainofficecategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainofficecategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "mobileapp") {  //get categories for hootsuite app
                        tempcatlist = mvCore.GetCookies('cookiedomainmobileappcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainmobileappcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "outlook") {  //get categories for outlook app
                        tempcatlist = mvCore.GetCookies('cookiedomainoutlookcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainoutlookcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "eloqua") {  //get categories for outlook app
                        tempcatlist = mvCore.GetCookies('cookiedomaineloquacategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaineloquacategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "drupal") {  //get categories for hootsuite app
                        tempcatlist = mvCore.GetCookies('cookiedomaindrupalcategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomaindrupalcategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    } else if (appsname == "hootsuite") {  //get categories as per app name
                        tempcatlist = mvCore.GetCookies('cookiedomainhootsuitecategories');
                        if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                            domaincatlist = mvCore.GetCookies('cookiedomainhootsuitecategories').split(','); //set values to global variable domaincatlist
                        } else {
                            domaincatlist = [];
                        }
                    }
                    var domaindata = mvCore.GetCookies('coookieusername');
                    var domaindatapart = domaindata.split('@');

                    if (imgsrc == "images/pin.png" || imgticksrc == "images/delete.png") {
                        domaincatlist = $.grep(domaincatlist, function (value) {
                            return value != pinimageid;
                        });
                        var catlist = domaincatlist[0];
                        for (var i = 1; i < domaincatlist.length; i++) {
                            catlist += ',' + domaincatlist[i];
                        }
                        if (catlist == undefined) {
                            catlist = '';
                        }
                        var updatedpinnedcats = mvCore.SetRemovePinnedCategoriesForUser(mvCore.GetCookies('cookiesclientid'), appsname, catlist, domaindata); //
                        $.when(updatedpinnedcats).done(function (updatedcatsdata) {
                           
                            Events.LoadEventGetUserCategories(mvCore.GetCookies('cookiesclientid'), domaindatapart[1], domaindata, appsname);
                            var subfolderdivid = "#subfolderdiv_" + parentolnameandid[1];
                            $(subfolderdivid + " .pin").attr('src', 'images/pin-h.png');
                            $(subfolderdivid + " .tick").attr('src', 'images/check.png');
                            var pinli = "pinli_" + parentolnameandid[1];
                            $("ol.pintree").find('li#' + pinli + '').remove();  //removed this item from featured category
                            if ($("ol.pintree").children("li").length == 1) {
                                $("ol.pintree").children("li").children(".up, .down").css('display', 'none');
                            } else if ($("ol.pintree").children("li").length >= 2) {
                                $("ol.pintree").children("li:first-child").children(".up").css('display', 'none');
                                $("ol.pintree").children("li:first-child").children(".down").css('display', 'block');
                                $("ol.pintree").children("li:last-child").children(".up").css('display', 'block');
                                $("ol.pintree").children("li:last-child").children(".down").css('display', 'none');
                                var licount = $("ol.pintree").children("li").length;
                                for (var i = 2; i < licount; i++) {
                                    $("ol.pintree").children("li:nth-child(" + i + ")").children(".up, .down").css('display', 'block');
                                }
                            }

                            if (appsname.toLowerCase() == "default" || appsname.toLowerCase() == "drupal") {
                                $("ul#selectOfficeDropdownul").find('li#' + parentolnameandid[1] + '').remove();
                            } else if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "eloqua" || appsname.toLowerCase() == "mobileapp") {
                                $("ul#selectOfficeDropdownul").find('li#' + parentolnameandid[1] + '').remove();
                            } else if (appsname.toLowerCase() == "hootsuite") {
                                $("ul#selectDropdownul").find('li#' + parentolnameandid[1] + '').remove();
                            }
                            Events.RefreshCategoryDropdownEvent();
                            Events.selectDropdownList();
                            Model.HideLoader();
                            temp.data('requestRunning', false);
                        }).fail(function (updatedcatsdata) {
                        
                            Model.HideLoader();
                        });

                    } else if (imgsrc == "images/pin-h.png" || imgticksrc == "images/check.png") {
                        
                       
                        if (domaincatlist.length < 10) {
                            domaincatlist.push(pinimageid);
                            var catlist = domaincatlist[0];
                            for (var i = 1; i < domaincatlist.length; i++) {
                                catlist += ',' + domaincatlist[i];
                            }
                            var updatedpinnedcats = mvCore.SetRemovePinnedCategoriesForUser(mvCore.GetCookies('cookiesclientid'), appsname, catlist, domaindata); 
                            $.when(updatedpinnedcats).done(function (updatedcatsdata) {
                                Events.LoadEventGetUserCategories(mvCore.GetCookies('cookiesclientid'), domaindatapart[1], domaindata, appsname);
                                var subfolderdivid = "#subfolderdiv_" + parentolnameandid[1];
                                $(subfolderdivid + " .pin").attr('src', 'images/pin.png');
                                $(subfolderdivid + " .tick").attr('src', 'images/delete.png');
                                var litext = $(subfolderdivid).find('img').attr('id').split(':')[1];
                                var pintreediv = 'pintreediv_' + parentolnameandid[1];
                                if ($("ol.pintree li#" + parentolnameandid[1] + "").length == 0) {
                                    var pinli = '<li id="pinli_' + parentolnameandid[1] + '">' +
                                        '<img src="images/button-up.png" class="up" id="up_' + parentolnameandid[1] + '" />' +
                                        '<img src="images/button-down.png" class="down" id="down_' + parentolnameandid[1] + '" />' +
                                        '<img class="fold" src="images/folder-symbol.png">' +
                                        '<span class="pinnedcatname">' + litext + '</span>' +
                                        '<div class="pinicons" id=' + pintreediv + '>' +
                                        '<img class = "tick" src="images/delete.png" id="btn_' + parentolnameandid[1] + ':' + litext + '" />' +
                                        '<img class="pin" id="' + parentolnameandid[1] + ':' + litext + '" src="images/pin.png" /></div>' +
                                        '<div class="hoverer"></div></li>';
                                    $("ol.pintree").append(pinli);
                                    if ($("ol.pintree").children("li").length == 1) {
                                        $("ol.pintree").children("li").children(".up, .down").css('display', 'none');
                                    } else if ($("ol.pintree").children("li").length >= 2) {
                                        $("ol.pintree").children("li:first-child").children(".up").css('display', 'none');
                                        $("ol.pintree").children("li:first-child").children(".down").css('display', 'block');
                                        $("ol.pintree").children("li:last-child").children(".up").css('display', 'block');
                                        $("ol.pintree").children("li:last-child").children(".down").css('display', 'none');
                                        var licount = $("ol.pintree").children("li").length;
                                        for (var i = 2; i < licount; i++) {
                                            $("ol.pintree").children("li:nth-child(" + i + ")").children(".up, .down").css('display', 'block');
                                        }
                                    }
                                    Events.moveUp('up_' + parentolnameandid[1]);
                                    Events.moveDown('down_' + parentolnameandid[1]);
                                    Events.setRemovePinnedCategories(pintreediv, parentolnameandid[1] + ':' + litext, 'btn_' + parentolnameandid[1] + ':' + litext)
                                }
                                if (appsname.toLowerCase() == "default" || appsname.toLowerCase() == "drupal") {
                                    $("ul#selectOfficeDropdownul").append('<li id=' + parentolnameandid[1] + ' >' + litext + '</li>');
                                } else if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "eloqua" || appsname.toLowerCase() == "mobileapp") {
                                    $("ul#selectOfficeDropdownul").append('<li id=' + parentolnameandid[1] + ' >' + litext + '</li>');
                                } else if (appsname.toLowerCase() == "hootsuite") {
                                    $("ul#selectDropdownul").append('<li id=' + parentolnameandid[1] + ' >' + litext + '</li>');
                                }
                                Events.RefreshCategoryDropdownEvent();
                                Events.selectDropdownList();
                                Model.HideLoader();
                                temp.data('requestRunning', false);
                            }).fail(function (updatedcatsdata) {
                                Model.HideLoader();
                            });
                        } else {
                            Model.HideLoader();
                            $('#errormessagediv').html('');
                            temp.data('requestRunning', false);
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html("Can't add more, max 10 categories can be pinned only");
                        }
                    }

                });
                //Mouse Over Event for Changing background pincolors
                $('#bindsearchdatadiv').bind().on("mouseover", '.pinicons', function (event) {
                    $(this).closest('li').find('label').eq(0).css('background-color', 'rgba(105, 103, 103, 0.15)');
                });
            },
            /**Function LoadEventGetuserCategories
            *@param ,orgunitid it s organization id
            *@param ,domain it s domain name
            *@email  ,it is user name
            *@appname
            */
            LoadEventGetUserCategories: function (orgunitid, domain, email, appname) {
                var data3 = mvCore.GetCategoriesForUser(orgunitid, appname);    //domain, email,
                $.when(data3).done(function (catdata) {
                    if (catdata.errormessage != null && catdata.errormessage !== '') { //if error in getting categories for this user
                        var newcatrow = mvCore.AddNewCategoriesRow(orgunitid, domain, email, appname, ''); //no category passed
                        $.when(newcatrow).done(function (newcatrowdata) {
                            if (newcatrowdata.data !== null && newcatrowdata.data !== '') {
                                if (newcatrowdata.data === 'Data inserted successfully') {
                                    Events.LoadEventGetUserCategories(orgunitid, domain, email, appname);
                                }
                            }
                        }).fail(function (newcatrowdata) {
                           //There is no coding for fail here
                        });
                    } else {
                        if (catdata.data.Application !== null && catdata.data.Application === "default") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomaincategories', catdata.data.Categories, 7);
                               
                            } else {
                                mvCore.SetCookies('cookiedomaincategories', '', 0);
                                
                            }
                        } else if (catdata.data.Application !== null && catdata.data.Application === "office") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomainofficecategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomainofficecategories', '', 0);
                            }
                        } else if (catdata.data.Application !== null && catdata.data.Application === "mobileapp") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomainmobileappcategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomainmobileappcategories', '', 0);
                            }
                        } else if (catdata.data.Application !== null && catdata.data.Application === "outlook") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomainoutlookcategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomainoutlookcategories', '', 0);
                            }
                        } else if (catdata.data.Application !== null && catdata.data.Application === "eloqua") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomaineloquacategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomaineloquacategories', '', 0);
                            }
                        }
                        else if (catdata.data.Application !== null && catdata.data.Application === "drupal") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomaindrupalcategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomaindrupalcategories', '', 0);
                            }
                        } else if (catdata.data.Application !== null && catdata.data.Application === "hootsuite") {
                            if (catdata.data.Categories !== null && catdata.data.Categories !== "") { //if suceess
                                mvCore.SetCookies('cookiedomainhootsuitecategories', catdata.data.Categories, 7);
                            } else {
                                mvCore.SetCookies('cookiedomainhootsuitecategories', '', 0);
                            }
                        }
                    }
                }).fail(function (cdata) {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Error: User categories could not be retrieved');
                });
            },

            GwtDocumentHeight: function () {
                var D = document;
                return Math.max(
                    D.body.scrollHeight, D.documentElement.scrollHeight,
                    D.body.offsetHeight, D.documentElement.offsetHeight,
                    D.body.clientHeight, D.documentElement.clientHeight
                );
            },
            /** Function AutoLoadScrollDownEvent
            *this is for implementation of infinite asset loading using button
            */
            AutoLoadScrollDownEvent: function () {
                $('#showmoreassetbtn').off('click');
                $('#bindsearchdatadiv div.showmoreassetdiv').bind().on("click", 'button[id="showmoreassetbtn"]', function () {
                    $('#showmoreassetbtn').off('click');
                    Events.AutoLoadAssetBinding();
                });
            },
            /**Function AutoLoadAssetBinding 
            *this function will help to implement the infinite loading 
            */
            AutoLoadAssetBinding: function () {
                try {
                    var scrollpostion = $(window).scrollTop();
                    var appsname = defaultsettings.apps;
                    var token = Events.GetLoginToken(defaultsettings);// mvCore.GetCookies('cookiestoken');
                    if (token == null && token == undefined) {
                        Model.HideLoader();
                        Model.SessionExpirePanel(true);
                    } else {
                        $("html, body").css("padding-bottom", "");
                        Model.ShowLoader();
                        $('#errormessagediv').css('display', 'none');
                        $('#errormessagediv').html('');
                        var recentlyviwed = mvCore.GetAssets('filter', token, offsetcount, imagecountonscroll, appsname.toLowerCase());
                        $.when(recentlyviwed).done(function (assetdata) {
                            if (assetdata.errormessage == null || assetdata.errormessage == undefined) {
                                if (assetdata.payload.assetCount > offsetcount) {
                                
                                    var actualoffsetcount = '';
                                    if (defaultsettings.apps == "hootsuite") {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == 'default') {
                                                actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, categoryname);
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            } 
                                        } else {
                                            hootsuiteopenview = 'default';
                                            actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, categoryname);
                                            setTimeout(function () { Model.HideLoader(); }, 1000);
                                        }
                                    } else {
                                        actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, categoryname);
                                        setTimeout(function () { Model.HideLoader(); }, 1000);
                                    }

                                    if (offsetcount < actualoffsetcount) {
                                        offsetcount = actualoffsetcount;
                                    }
                                    else if (offsetcount == actualoffsetcount) {
                                        offsetcount++;
                                    }
                                
                                    $('.image--basic').off('click');

                                    Model.HideLoader();
                                    $("html, body").css("padding-bottom", "20px");
                                    Events.DropdownSelectionChangeEvent();
                                    if (defaultsettings.apps == 'hootsuite') {
                                        if (hootsuiteopenview == 'default') {
                                            Events.LargeViewEvent();
                                        }
                                    }
                                    else {
                                        Events.LargeViewEvent();
                                    }
                                    $('#showmoreassetbtn').off('click');
                                    $('#bindsearchdatadiv div.showmoreassetdiv').bind().on("click", 'button[id="showmoreassetbtn"]', function () {
                                        $('#showmoreassetbtn').off('click');
                                        Events.AutoLoadAssetBinding();
                                    });
                                    $("html, body").animate({ scrollTop: scrollpostion }, "fast");
                                } else {
                                    Model.HideLoader();
                                    $("html, body").css("padding-bottom", "20px");
                                    $('#showmoreassetbtn').off('click');
                                }

                            } else {
                                if (assetdata.errormessage == '401') {
                                    Model.HideLoader();
                                    Model.SessionExpirePanel(true);
                                }
                                else if (assetdata.errormessage == '500') {
                                    Model.HideLoader();
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Server Not Responding');
                                } else {
                                    Model.HideLoader();
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Api Asset fetching problem');
                                }
                            }
                          
                        }).fail(function (assetdata) {
                            Model.HideLoader();
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('Recent Upload API Failed To Fetch Data');
                        });
                    }
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },
            SearchLoadMoreEventBind: function (imagecount, offset) {
                $('#showmoreassetbtn').off('click');
                $('#bindsearchdatadiv div.showmoreassetdiv').bind().on("click", 'button[id="showmoreassetbtn"]', function () {
                    $('#showmoreassetbtn').off('click');
                    Events.SearchLoadMoreAsset(imagecount, offset);
                });
            },
            SearchLoadMoreAsset: function (imagecount, offset) {
                var scrollpostion = $(window).scrollTop();
                try {
                    $("html, body").css("padding-bottom", "");  //Removing the css style added after loading more assets on scrollilng
                    Model.ShowLoader();
                    var searchcount = imagecount;
                    var offsetcount = offset;
                    $('#errormessagediv').css('display', 'none');
                    $('#infomessagediv').css('display', 'none');
                    // $('.showmoreassetdiv').remove();
                    $('#errormessagediv').html('');
                    var searchtext = $('#searchtxt').val();
                    /**
                    * screenname variable is a global variable and used for maintaining page state
                     */
                    screenname = "search";
                    var appsname=defaultsettings.apps;
                    var token = Events.GetLoginToken(defaultsettings);//mvCore.GetCookies('cookiestoken'); //var
                    if (token == null || token == undefined) {
                        Model.HideLoader();
                        Model.SessionExpirePanel(true);
                    } else {
                        var urlapi = mvCore.GetCookies('cookieurlapi');
                        var sortings = mvCore.GetCookies('cookiesorting');

                        var assets = mvCore.SearchingAssets(searchtext, token, 'filters', sortings, searchcount, offsetcount, appsname.toLowerCase());
                        $.when(assets).done(function (assetdata) {
                            if (assetdata.errormessage == null || assetdata.errormessage == undefined) {
                                if (assetdata.payload.assetCount >= offsetcount) {
                                    var actualoffsetcount = '';
                                    /*Condition for Compose View Hoot Suite*/
                                    if (defaultsettings.apps == 'hootsuite') {
                                        hootsuiteopenview = mvCore.GetQueryStringValue('view');
                                        if (hootsuiteopenview != undefined) {
                                            if (hootsuiteopenview == 'compose') {
                                                // actualoffsetcount = HootSuiteScreen.HootSuiteImageLoading(token, assetdata, offsetcount, 'search');

                                            } else if (hootsuiteopenview == 'default') {
                                                actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, 'search');
                                                setTimeout(function () { Model.HideLoader(); }, 1000);
                                            }

                                        } else {
                                            hootsuiteopenview = 'default';
                                            actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, 'search');
                                            setTimeout(function () { Model.HideLoader(); }, 1000);
                                        }


                                    } else {
                                        actualoffsetcount = SearchingScreen.ImageLoading(token, assetdata, offsetcount, 'search');
                                        setTimeout(function () { Model.HideLoader(); }, 1000);
                                    }
                                    //Model.hideloader();
                                    if (offsetcount < actualoffsetcount) {
                                        offsetcount = actualoffsetcount; //offsetcount + searchcount; //+ 8; //5 changed to 8
                                    }
                                    else if (offsetcount == actualoffsetcount) {
                                        offsetcount++;
                                        $('#showmoreassetbtn').off('click');
                                        $('.showmoreassetdiv').remove();
                                    } else if (assetdata.payload.assetCount == offsetcount) {
                                        $('#showmoreassetbtn').off('click');
                                        $('.showmoreassetdiv').remove();
                                    }
                                    if (assetdata.payload.assetCount > offsetcount) {
                                        //  check it later
                                    }
                                    $('.image--basic').off('click');
                                    Model.HideLoader();
                                    if (defaultsettings.apps == 'hootsuite') {
                                        if (hootsuiteopenview == 'default') {
                                            Events.LargeViewEvent();
                                        }
                                    } else {
                                        Events.LargeViewEvent();
                                    }
                                    $("html, body").css("padding-bottom", "20px");
                                    Events.DropdownSelectionChangeEvent();
                                    $("#showmoreassetbtn").off("click");
                                    $('#bindsearchdatadiv div.showmoreassetdiv').bind().on("click", 'button[id="showmoreassetbtn"]', function () {
                                        $('#showmoreassetbtn').off('click');
                                        var scrollpos = $(window).scrollTop();
                                        Events.SearchLoadMoreAsset(imagecount, offsetcount);
                                        $(window).scrollTop(scrollpos);
                                       
                                    });
                                    $("html, body").animate({ scrollTop: scrollpostion }, "fast");
                                } else {
                                    Model.HideLoader();
                                    $("html, body").css("padding-bottom", "20px");
                                    $("#showmoreassetbtn").off("click");
                                    $('.showmoreassetdiv').remove();
                                }

                            } else {
                                if (assetdata.errormessage == '401') {
                                    Model.HideLoader();
                                    Model.SessionExpirePanel(true);
                                } else if (assetdata.errormessage == '500') {
                                    Model.HideLoader();
                                    $('#errormessagediv').css('display', 'block');
                                    $('#errormessagediv').html('Server Not Responding');
                                }
                            }
                        }).fail(function (assetdata) {
                            Model.HideLoader();
                            $('#errormessagediv').css('display', 'block');
                            $('#errormessagediv').html('API Failed To Fetch Data');
                        });
                    }//Else Close here for token Check if undefined
                } catch (e) {
                    Model.HideLoader();
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html(e.message);
                }
            },
            /** Function RerechCategoryDropdownEvent
            *Refresh all category in the div
            */
            RefreshCategoryDropdownEvent: function () {
                $('#selectassetcategories ul li').each(function (index, item) {  
                    if (index !== 0 && index !== 1) {
                        $(this).remove();
                    }
                });
                var domaincatlisting = [];
                var tempcatlist = '';
                if (defaultsettings.apps == "default") { //get categories for office or default app
                    tempcatlist = mvCore.GetCookies('cookiedomaincategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomaincategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                }
                else if (defaultsettings.apps == "drupal") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomaindrupalcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomaindrupalcategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                }/*  For drupal  */
                else if (defaultsettings.apps == "office") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomainofficecategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomainofficecategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                } else if (defaultsettings.apps == "mobileapp") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomainmobileappcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomainmobileappcategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                } else if (defaultsettings.apps == "outlook") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomainoutlookcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomainoutlookcategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                } else if (defaultsettings.apps == "eloqua") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomaineloquacategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomaineloquacategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                } else if (defaultsettings.apps == "hootsuite") {  //get categories for hootsuite app
                    tempcatlist = mvCore.GetCookies('cookiedomainhootsuitecategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlisting = mvCore.GetCookies('cookiedomainhootsuitecategories').split(',');
                    } else {
                        domaincatlisting = [];
                    }
                }

                if (domaincatlisting[0] !== "" && domaincatlisting[0] !== "Null" && domaincatlisting !== undefined) { //check if variable domaincatlist has value, if yes, bind them here
                    $.each(domaincatlisting, function (key, value) {
                        $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + ' " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                    });
                }

                //Check if user is Admin, if yes, add Edit Featured Categories link to dropdownlist
                var defaultgroup = mvCore.GetCookies('cookiesdefaultgroup');
                if (defaultgroup != undefined) {
                    if (defaultgroup.toLowerCase() === "system administrator" || defaultgroup.toLowerCase() === "administrators") {
                        if (defaultsettings.apps == 'office' || defaultsettings.apps == 'default' || defaultsettings.apps == 'drupal' || defaultsettings.apps == 'outlook' || defaultsettings.apps == 'eloqua' || defaultsettings.apps == 'mobileapp') {
                            $('#selectassetcategories ul').append('<li id="editcategories" class="hootsuiteadmin">Edit Featured Categories</li>');
                        }
                    }
                }
            },
            /**Function SessionExpirePopUpEvent
            *this will help SetLoginToken
            *
            */
            SessionExpirePopUpEvent: function () {
                /** function SessionExpirePopUoPopUpEvent
                *param defaultsettings will contain all default values
                */
                Events.SetLoginToken(defaultsettings, null, 0);
                window.location.reload();
            },
            /** Function SetLoginToken 
            *@param option will have all default values
            *@param tokenvalue will have the token values
            *param days will have the value to setcookies time
            */
            SetLoginToken: function (option, tokenvalue, days) {
                var appsname = option.apps;
                var cookiesname = 'cookiestoken' + appsname.toLowerCase();
                var token = '';
                token = mvCore.SetCookies(cookiesname, 'Bearer ' + tokenvalue, days);
                return token;
            },
            /** Funtion GetLoginToken
            *@param option will have all default values
            */
            GetLoginToken: function (option) {
                var appsname = option.apps;
                var token = '';
                var cookiesname = 'cookiestoken' + appsname.toLowerCase();
                token = mvCore.GetCookies(cookiesname);
                return token;
            },
            /**Function GetifScrolledByUser 
            *
            */
            GetIfScrolledByUser: function () {
                //for chrome and IE
                window.addEventListener("mousewheel", MouseWheelHandler, false);
                //For Firefox
                window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
                function MouseWheelHandler(e) {
                    e = window.event || e;
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY || -e.detail)));
              
                    if (delta < 0) {
                        scrollbarrun = true;
                    }
                }
                $(window).on('mousedown,moveup', function (eve) {
                    if (eve.target.id == '' || eve.target.id == null) {
                        scrollbarrun = true;
                    }
                });
            },
            /** Function ApplicationName
            *
            */
            ApplicationName: function () {
                var appsname = defaultsettings.apps;
                appsname = appsname.toLowerCase();
                if (defaultsettings.apps == "office") {
                    if (mvAppSdkCore.ApplicationName != undefined) {
                        globalappname = mvAppSdkCore.ApplicationName("office");
                        if (globalappname == undefined) {
                            globalappname = 'word';
                        }
                    } else {
                        //Tracking Asset App name
                        globalappname = 'word';
                    }
                }
                else  {
                    var appname = defaultsettings.apps.toLowerCase();
                    globalappname = appname;
                } 
            },
            HootsuiteGearBtnEvent: function () {
                if (globalvarbrowsername == 'internet-explorer' || globalvarbrowsername == 'firefox') {
                    $('#hootsuitgearbtn').click(function (e) {
                        $('.hootsuitegearmenu1').toggle();
                    });
                } else if (globalvarbrowsername == "other") {
                    $('#hootsuitgearbtn').click(function (e) {
                        e.stopPropagation();
                        $('.hootsuitegearmenu1').toggle();
                    });
                }
            },
            HootsuiteLogout: function () {
                $('#logout').click(function () {
                    Events.SetLoginToken(defaultsettings, null, 0);
                    mvCore.SetCookies('cookiesdefaultgroup', '', 0);
                    mvCore.SetCookies('cookiedomaincategories', '', 0);
                    mvCore.SetCookies('cookiesclientid', '', 0);
                    mvCore.SetCookies('sortcookieval', '', 0);
                    var appsname = '';
                    if (defaultsettings.apps == 'hootsuite') {
                        appsname = 'hootsuite'
                    } else {
                        if (defaultsettings.apps == 'office') {
                            appsname = 'office';
                        } else {
                            appsname = defaultsettings.apps;
                        }
                    }
                    var now = new Date;
                    var utc_timestamp = (now.getTime());
                    mvCore.TrackingAssets(globalvarclientid, '', usernameglobalvar, utc_timestamp, 'logout', globalappname,'');
                    window.location.reload();
                });
            },
            HootsuiteEditPinCategory: function () {
                $('#liHootsuiteFeaturedCategory').click(function (e) {
                    if ($('.hootsuitegearmenu1').css('display') == 'block') {
                        $('.hootsuitegearmenu1').css('display', 'none');
                        $('#searchtxt').val('');
                        $('.sortBlock').css('display', 'none');
                        $('#selectassetcategories p').text('Featured Category');
                    }
                });
            },
            HootsuiteSortEvent: function () {
                $('#selectsortdivid').click(function (ev) {
                    $('.selecthootsuitesortDropdown').toggle();
                    $("#sortedbyname").off("click");
                    $('#sortedbyname').click(function (ev) {
                        $('#errormessagediv').css('display', 'none');
                        $('#infomessagediv').css('display', 'none');
                        if ($('#searchtxt').val().trim() != '') {
                            var selectedtxt = $('.paragraphwithimg p').text();
                            var sortcookieval = mvCore.GetCookies('cookiesorting');
                            if (sortcookieval == 'name-down') {
                                mvCore.SetCookies('cookiesorting', 'name-up', 7);
                                $('.paragraphwithimg p').text('Name (Asc)');
                            } else if (sortcookieval == 'name-up') {
                                mvCore.SetCookies('cookiesorting', 'name-down', 7);
                                $('.paragraphwithimg p').text('Name (Desc)');
                            } else {
                                mvCore.SetCookies('cookiesorting', 'name-down', 7);
                                $('.paragraphwithimg p').text('Name (Desc)');
                            }
                            $('.selecthootsuitesortDropdown').toggle();
                            $('#selectassetcategories p').text('Edit Featured Category');
                            Events.SearchingDataBind(defaultsettings);
                        } else {
                            {
                                $('.selecthootsuitesortDropdown').toggle();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Search text Empty!');
                            }
                        }

                    });
                    $("#sortbydateid").off("click");
                    $('#sortbydateid').click(function (ev) {
                        if ($('#searchtxt').val().trim() != '') {
                            var selectedtxt = $('.paragraphwithimg p').text();
                            var sortcookieval = mvCore.GetCookies('cookiesorting');
                            if (sortcookieval == 'date-down') {
                                mvCore.SetCookies('cookiesorting', 'date-up', 7);
                                $('.paragraphwithimg p').text('Date (Asc)');
                            } else if (sortcookieval == 'date-up') {
                                mvCore.SetCookies('cookiesorting', 'date-down', 7);
                                $('.paragraphwithimg p').text('Date (Desc)');
                            } else {
                                mvCore.SetCookies('cookiesorting', 'date-down', 7);
                                $('.paragraphwithimg p').text('Date (Desc)');
                            }
                            $('.selecthootsuitesortDropdown').toggle();
                            $('#selectassetcategories p').text('Edit Featured Category');
                            Events.SearchingDataBind(defaultsettings);
                        } else {
                            {
                                $('.selecthootsuitesortDropdown').toggle();
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Search text Empty!');
                            }
                        }
                    });
                });
            },
            /**Function HootSuiteFeturedCat
            *
            */
            HootSuiteFeturedCat: function () {
                $('#liHootsuiteFeaturedCategory').click(function () {
                    if ($('.hootsuitegearmenu1').css('display') == 'block') {
                        $('.hootsuitegearmenu1').css('display', 'none');
                    }
                    //$('#selectassetcategories p').text('Featured Category');
                    $('#selectsortdivid p').text('Select');
                    $('#countingselectionlabel').removeClass("countingselected");
                    $('#countingselectionlabel').addClass("countingselection");
                    $('#countofimageslabel').html('0');
                    //flushing off Variable hootsuite images
                    Events.SelectionFlushEvent();
                    Events.EditPinnedCategoriesEvent(defaultsettings);
                });
            },
            /**Function SelectionFlushEvent
            *
            */
            SelectionFlushEvent: function () {
                if (selecteditemsassetid.length > 0) {
                    for (var i = 0; i < selecteditemsassetid.length; i++) {
                        var bindingvalues = selecteditemsassetsize[i].split('_');
                        var hootsuiteoverlaydiv = '#hootsuiteOverlay' + bindingvalues[2];
                        var assetcheckboxid = '#assetcheckbox' + bindingvalues[2] + '_' + selecteditemsassetid[i];

                        var dividnextlabel = '#' + bindingvalues[1] + 'assetcheckboxdiv' + bindingvalues[2] + '_' + selecteditemsassetid[i];
                        var sizedropdownid = '#' + bindingvalues[1] + 'dropdown' + bindingvalues[2];
                        var selectbtnid = bindingvalues[1] + '_' + bindingvalues[2] + '_selectbtn_' + selecteditemsassetid[i];
                        $(assetcheckboxid).prop("checked", false);
                        $(sizedropdownid).attr('disabled', false);
                        $("button[id=" + selectbtnid + "]").text('Select Asset');
                        $(hootsuiteoverlaydiv).removeClass('hootsuiteOverlay');
                        $(dividnextlabel + '>label').remove();
                    }
                    selecteditemsassetid.splice(0, selecteditemsassetid.length);
                    selecteditemsasseturl.splice(0, selecteditemsassetid.length);
                    selecteditemsassetsize.splice(0, selecteditemsassetid.length);
                    $('#countofimageslabel').html(selecteditemsassetid.length);
                    if (selecteditemsassetid.length == 0) {
                        $('#countingselectionlabel').removeClass("countingselected");
                        $('#countingselectionlabel').addClass("countingselection");
                    }
                }
            },
            /**Fucntion DocumentClickEvent
            *
            */
            DocumentClickEvent: function () {
                //this function will detect if user click on elements or not
                $(window).click(function (event) {
                    if (defaultsettings.apps != null) {
                        var appsname = defaultsettings.apps;
                        var body = document.body;
                        var target = event.target != null ? event.target : event.srcElement;
              
                        var getid = target.id;
                        if (appsname.toLowerCase() == "office" || appsname.toLowerCase() == "drupal" || appsname.toLowerCase() == "default" || appsname.toLowerCase() == "eloqua" || appsname.toLowerCase() == "outlook" || appsname.toLowerCase() == "mobileapp") {
                            if (appsname == 'outlook' || appsname == 'eloqua') {
                                if (getid == '') {
                                    $('.shareassetdropdown').css('display', 'none');
                                    $('.shareassetdropdownvideo').css('display', 'none');
                                }
                            }
                            if (globalvarbrowsername == "other") {
                                if (getid != 'searchsettingsimg') {
                                    $('.menu2').css('display', 'none');
                                }
                            } else {
                                if (getid != 'searchsettingsbtn') {
                                    $('.menu2').css('display', 'none');
                                }
                            }
                            $('.hootsuitegearmenu1').hide();
                            if (getid == "selectassetcategoriesparagraph" || getid == "selectassetcategories" || getid == "selectassetcategoriesimgid") {
                            } else {
                                $('#selectOfficeDropdownul').css('display', 'none');
                                $('.selectOfficeDropdown').css('display', 'none');
                            }
                            if (getid != "menubtnimg" && getid != "menubtn") {
                                $('.officemenu1').css('display', 'none');
                            }
                        } else if (appsname.toLowerCase() == "hootsuite") {

                            if (getid == 'selectsortparaid' || getid == "selectsortdivid" || getid == "selectsortimgid") {

                            } else {
                                $('.selecthootsuitesortDropdown').css('display', 'none');
                            }
                            if (getid == "selectassetcategoriesparagraph" || getid == "selectassetcategories" || getid == "selectassetcategoriesimgid") {
                            } else {
                                $('.selecthootsuiteDropdown').css('display', 'none');
                            }
                            if (getid != "menubtn") {
                                var composedisplay = $('.composemenu1').css('display');
                                var menudisplay = $('.menu1').css('display');
                            }
                            /* Gear Btn closing outside cli*/
                            if (globalvarbrowsername == 'internet-explorer' || globalvarbrowsername == 'firefox') {
                                if (getid != 'hootsuitgearbtn') {
                                    $('.hootsuitegearmenu1').css('display', 'none');
                                }
                            } else if (globalvarbrowsername == "other") {
                                if (getid != 'hootsuitgearimg') {
                                    $('.hootsuitegearmenu1').css('display', 'none');
                                }
                            }
                        }
                    }

                });
            },
            /**Fucntion GetIfBrowserName
            *
            */
            GetIfBrowserName: function () {
                var broswername = '';
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';
                var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;
                // Chrome 
                var isChrome = !!window.chrome && !!window.chrome.webstore;
                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;
                if (isOpera) {
                    broswername = 'other';
                } else if (isFirefox) {
                    broswername = 'firefox';
                } else if (isIE) {
                    broswername = 'internet-explorer';
                } else if (isChrome) {
                    broswername = 'other';
                } else if (isBlink) {
                    broswername = 'other';
                }
                else if (isEdge) {
                    broswername = 'other';
                }
          
                return broswername;
            },
            /**Function EditMetaDataLiClick
            *
            */
            EditMetaDataLiClick: function () {
                //Binding here MetaData Li click event
            $('#liEditMetaData').off("click");
            $('#liEditMetaData').click(function () {
                Model.ShowLoader();
                $('#bindsearchdatadiv').html('');
                $('#sortnamespan').html('');
                $('#sortdatespan').html('');
                mvCore.SetCookies('cookiesorting', '', 0);
                $('#searchtxt').val('');
                $('.sortBlock').css('display', 'none');
                if (defaultsettings.apps == "hootsuite") {
                    Events.SelectionFlushEvent();
                    $('#selectsortparaid').html('Select');
                    $('#countofimageslabel').html(selecteditemsassetid.length);
                    $('#countingselectionlabel').removeClass("countingselected");
                    $('#countingselectionlabel').addClass("countingselection");
                    $('#selectassetcategories p').text('Featured Category');
                } else {
                    $('#selectassetcategories p').text('Featured');
                }
                //Fetching for All attributes
                Events.FectchAttributes();
            });
            },
            /**Function FetchAttributes
            *
            */
        FectchAttributes: function () {
            $('#bindsearchdatadiv').html('');
            $('#errormessagediv').css('display', 'none');
            $('#infomessagediv').css('display', 'none');
            var token = Events.GetLoginToken(defaultsettings);
            var data = mvCore.GetAttributes(token);
            $.when(data).done(function (getdata) {
                MetaDataBind.DataBinding(getdata);
            }).fail(function(errormessage) {
                Model.HideLoader();
            });
        },
            /** Function GetMetaDataList
            *this will help to save all meata data list locally
            */
        GetMetaDataList: function () {
            globalvarmedataidlist = [];
            globalvarmetadatalist = [];
            $('#errormessagediv').css('display', 'none');
            $('#infomessagediv').css('display', 'none');
            var appsname = defaultsettings.apps;
            appsname = appsname.toLowerCase();
                var domainname = mvCore.GetCookies('coookiedomainname');
                var metadatalist = mvCore.GetMetaDataList(usernameglobalvar, globalvarclientid, appsname, domainname);
                $.when(metadatalist).done(function (data) {
                    if (data.Application == null) {
                    } else {
                        if (data.MetaDataList != "") {
                            var split = data.MetaDataList.slice(0, -1).split(',');
                            var len = split.length;
                            var loop = len % 2;
                            if (loop == 0) {
                                loop = len / 2;
                            } else {
                                var spl = len - 1;
                                loop = spl / 2;
                            }
                            var incrment = 0;
                            for (var i = 0; i < loop; i++) {
                                globalvarmedataidlist[i] = split[incrment];
                                globalvarmetadatalist[i] = split[incrment + 1];
                                incrment = incrment + 2;
                            }
                        } 
                    }
                }).fail(function (cdata) {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Metadata Api Failed');
                });
        },
            /**Functiion MetaDataChkboxClickEvent
            *binding here MetaData Checkbox Click event
            */
        MetaDataChkboxClickEvent: function (elementid) {
            var check = 0;
            $('#bindsearchdatadiv').bind().on("click", 'div[id="' + elementid + '"]', function () {
                $('.error').css({
                    "border-color": "#f5aca6", "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                });
                var split = this.id.split('_');
                var chkid = 'attributecheckbox_' + split[1];//+ '_' + split[2];
            
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                    $('#errormessagediv').html('');

                    var lblid = 'atributelabel_' + split[1];//+ '_' + split[2];
                if (chkid != 'attributecheckbox_100011-mv-33993') {
                    if ($('#attributecheckbox_100011-mv-33993').prop('checked')) {
                        if (globalvartempmetaidlist.indexOf('100011-mv-33993') < 0) {
                            if (globalvartempmetaidlist.length < 3) {
                                globalvartempmetaidlist[globalvartempmetaidlist.length] = '100011-mv-33993';
                                globalvartempmetalist[globalvartempmetalist.length] = 'overall rating';
                                check = 1;
                            }
                        }
                    }
                }
                if (chkid != 'attributecheckbox_100011-mv-775411') {
                    if ($('#attributecheckbox_100011-mv-775411').prop('checked')) {
                        if (globalvartempmetaidlist.indexOf('100011-mv-775411') < 0) {
                            if (globalvartempmetaidlist.length < 3) {
                                globalvartempmetaidlist[globalvartempmetaidlist.length] = '100011-mv-775411';
                                globalvartempmetalist[globalvartempmetalist.length] = 'user rating';
                                check = 1;
                            }
                        }
                    }
                }
                if ($('#' + chkid).is(':checked')) {
               
                        if (globalvartempmetaidlist.length < 3) {
                            var index = globalvartempmetaidlist.indexOf(split[1]);
                            if (index == -1) {
                                globalvartempmetaidlist[globalvartempmetaidlist.length] = split[1];
                                globalvartempmetalist[globalvartempmetalist.length] = $('#' + lblid).text().toLowerCase();
                            }
                            Model.HideLoader();
                        } else {
                                var indexof = globalvartempmetaidlist.indexOf(split[1]);
                                if (indexof != -1) {
                                    globalvartempmetaidlist.splice(indexof, 1);
                                    globalvartempmetalist.splice(indexof, 1);
                                }
                                Model.HideLoader();
                                $('#' + chkid).prop("checked", false);
                                $('#errormessagediv').css('display', 'block');
                                $('#errormessagediv').html('Maximum of 3 Attributes can be Selected');
                        }
                    } else {
                        var index = globalvartempmetaidlist.indexOf(split[1]);
                        if (index != -1) {
                            globalvartempmetalist.splice(index, 1);
                            globalvartempmetaidlist.splice(index, 1);
                        }
                    }
               
            });
        },
        /**Function EloquaBasicAuthorizationCode
        *@param options will contain all default vlaues for the app
        */
        EloquaBasicAuthorizationCode: function (options) {
            $('#errormessagediv').css('display', 'none');
            var vars = [], hash, code = '';
            //Get Token Here 
            var eloquaurl = window.location.href;//.getItem('eloquqafirsturl');
      
            if (eloquaurl != null) {
                var hashes = eloquaurl.slice(eloquaurl.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    if (hash[0] == 'code') {
                        code = hash[1];
                        break;
                    }
                }
                code = code.replace("%3d", "=");
            }
            var eloquaurl = localStorage.getItem('eloquqafirsturl');
      
            if (eloquaurl != null) {
                var hashes = eloquaurl.slice(eloquaurl.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    if (hash[0] == 'instance') {
                        eloquainstanceid = hash[1];
                    } else if (hash[0] == 'oauth_signature') {
                       
                    } else if (hash[0] == 'authversion') {
                       
                    } else if (hash[0] == 'oauth_consumer_key') {
                        eloquaoauth_consumer_key = hash[1];
                    } else if (hash[0] == 'oauth_nonce') {
                        
                    }
                    vars[hash[0]] = hash[1];
                }
            }
            /*Reading the file later it will be read from azure table base 64 authorization code*/
            if (options.eloquaurl != null) {
                var clientcode = mvAppSdkCore.GetOauthBase64ClientCode(eloquaoauth_consumer_key);
                $.when(clientcode).done(function (data) {
                    mvAppSdkCore.OauthRequestForToken(code, data, options.eloquaurl);
                }).done(function (fail) {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Eloqua API fails');
                });
            } else {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html('Client Details not saved in DataBase');
            }

        },
            /** Function GetRenditionConfig
            *Get Rendition Configuration 
            */
        GetRenditionConfig: function (token) {
            try {
                var getconfig = mvCore.Configrenditionkinds(token);
                var incre = 0;
                $.when(getconfig).done(function (data) {
                    $(data).each(function (ind, renditions) {
                        $(renditions.payload).each(function (index, ren) {
                            renditionsidlist[incre] = ren.renditionKindId;
                            rendtiondescription[incre] = ren.description;
                            renditiondescriptionforimage[incre] = ren.width + "X" + ren.height;
                            incre++;
                        });
                    })
                 
                }).fail(function (data) {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Configuration not fetched');
                });
              
            } catch (e) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html('Configuration not fetched');
            }
        },
            /**Function GetEloquaRendtionBindings
            *Bind all renditon for an asset here 
            */
        GetEloquaRenditionBindings: function (token, assetid, btnid, assettypes, assetname) {
            var shareassetmenuol = "";
            try {
                var videorendtion = '';
                var liids = [], incr = 0;
                var splits = btnid.split('_');
                var deferredobj = $.Deferred();
                var spanid = splits[0] + "_spanpowerexcelmsg" + splits[1];
                var dropdownid = "selectassetdropdown_" + splits[1] + "_" + splits[3];
                var check = $('#' + dropdownid).find('.dropdownbinded').html();
                if (check == undefined) {
                    var getrendtions = mvCore.GetRendition(token, assetid);

                    var increment = 1;
                    $.when(getrendtions).done(function (data) {
                    
                        $(data.payload).each(function (ind, renditions) {
                            var indexof = renditionsidlist.indexOf(renditions.renditionTypeId);
                            var type = renditions.mimeType.split('/');
                            type[0] = type[0].toLowerCase();
                            var descript = "";
                            if (indexof >= 0) {
                                var renditionid = "lishareassetoriginal_" + sasurlcount + "_" + renditions.renditionTypeId;

                                if (assettypes == type[0]) {
                                    if (assettypes != "image") {

                                        videorendtion = renditionid.split('_');

                                        shareassetmenuol = shareassetmenuol + " <li id=" + renditionid + ">" + rendtiondescription[indexof] + "</li>";
                                        liids[incr] = renditionid;
                                        incr++;
                                    } else {
                                        descript = type[1].toUpperCase() + " (" + renditiondescriptionforimage[indexof] + ")";
                                        shareassetmenuol = shareassetmenuol + " <li id=" + renditionid + ">" + descript + "</li>";
                                        liids[incr] = renditionid;
                                        incr++;
                                    }

                                    sasurlcount++;
                                    increment++;
                                } else if (assettypes == "file") {
                                    if (incr == 0) {
                                        descript = type[1].toUpperCase();
                                        var renditionid = "lishareassetoriginal_" + sasurlcount + "_" + renditions.renditionTypeId;
                                        shareassetmenuol = shareassetmenuol + " <li id=" + renditionid + ">" + originalfiletype.toUpperCase() + "</li>";
                                        liids[incr] = renditionid;
                                        incr++;
                                        increment++; sasurlcount++;
                                    }
                                }
                            }
                        });
                        deferredobj.resolve(shareassetmenuol);
                        if (shareassetmenuol != "") {
                            $('#' + dropdownid).html("<ol class='dropdownbinded'>" + shareassetmenuol+"</ol>");
                        } else {
                            $('#' + dropdownid).html("<ol class='dropdownbinded'><li id='noassetfound' </li>No Renditions Available</ol>");
                        }

                    }).fail(function (data) {
                        $('#errormessagediv').css('display', 'block');
                        $('#errormessagediv').html('Configuration not fetched');

                    });
                    for (var i = 0; i < liids.length; i++) {
                        Events.GetSasUrl(token, assetid, liids[i], assetname, assettypes, spanid);
                    }
                } 
            } catch (ex) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html('Rendition ids not fetched');

            }
            //return videorendtion;
        },
        GetSasUrl: function (token, assetid, elementid, assetname, assettypes, spanid) {
            $('#' + elementid).off("click");
            $('#' + elementid).click(function () {
                var splits = spanid.split('spanpowerexcelmsg');
                var largeviewid = '#largeviewdiv' + splits[1] + '_' + assetid;
                var $thisCell = $(largeviewid).closest('.image__cell');
                var $thisCell = $(largeviewid).closest('.image__cell');
                var azuremediaplayeid = '';
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                $('#errormessagediv').html(' ');
                var eloquabaseurl = '';
                var split = this.id.split('_');
                var rendtionsasurl = mvCore.GetSasUrl(token, assetid, split[2]);
                $.when(rendtionsasurl).done(function (data) {
                    if (assettypes != "video" && assettypes != "audio") {
                        if (defaultsettings.apps == "outlook") {
                            mvAppSdkCore.InsertAsset(data.payload.renditionUrl, assetname, spanid, assetid, data.payload.thumbnailUrl, assettypes);
                        } else {
                            eloquabaseurl = mvCore.GetCookies("eloquabaseurl");
                            mvAppSdkCore.InsertAsset(data.payload.renditionUrl, assetid, assetname, assettypes, eloquainstanceid, eloquaoauth_consumer_key, data.payload.thumbnailUrl, eloquabaseurl);
                              Events.LargeViewVideoStop($thisCell, lastplayedvideoid);
                            
                        }
                        if (assettypes == "video" || assettypes == "audio") {
                            $('.shareassetdropdownvideo').toggle();
                        } else {
                            $('.shareassetdropdown').toggle();
                        }
                        Model.HideLoader();
                    } else {
                        if (defaultsettings.apps == "outlook") {
                            mvAppSdkCore.InsertAsset(data.payload.renditionUrl, assetname, spanid, assetid, data.payload.thumbnailUrl, assettypes);
                        } else {
                            eloquabaseurl = mvCore.GetCookies("eloquabaseurl");
                            mvAppSdkCore.InsertAsset(data.payload.renditionUrl, assetid, assetname, assettypes, eloquainstanceid, eloquaoauth_consumer_key, data.payload.thumbnailUrl, eloquabaseurl);
                              Events.LargeViewVideoStop($thisCell, lastplayedvideoid);
                        }
                        if (assettypes == "video" || assettypes == "audio") {
                            $('.shareassetdropdownvideo').toggle();
                        } else {
                            $('.shareassetdropdown').toggle();
                        }
                        $('#errormessagediv').css('display', 'none');
                        Model.HideLoader();
                    }

                }).fail(function (data) {
                    $('#errormessagediv').css('display', 'block');
                    $('#errormessagediv').html('Sas URl API having some issues ');
                });

            });
            return "";
        }, LargeViewVideoStop: function (larviewdiv, azuremediaplayerid) {
            var test = larviewdiv[0].id;
            var temp = $('#' + larviewdiv[0].id).find('.image--expand').css('overflow', 'visible');
            var $cell = $('.image__cell');
            larviewdiv.removeClass('is-expanded').addClass('is-collapsed');
            var temp = $('#' + larviewdiv[0].id).find('.image--expand').css('overflow', 'hidden');
            $(window).scrollTop(0);
            var indexof = videotagidlist.indexOf(lastplayedvideoid);
            if (indexof >= 0) {
                var myPlayer = amp(lastplayedvideoid);
                myPlayer.dispose();
                videotagidlist.splice(indexof, 1);
            }
            if (lastplayedeloquavideo != '') {
                var splitids = lastplayedvideoid.split('_');
                var largeviedivid = 'largeviewdiv' + splitids[1] + '_' + splitids[2];
                $('#' + largeviedivid).next().next().find('.image-holder').html(lastplayedeloquavideo);
                lastplayedeloquavideo = '';
            }

        },
            /**Function EloquaScrolling 
            *@param counter row number where flydown is clicked
            *@param largeviewid is the flydown div id
            */

        EloquaScrolling: function (counter, largeviewid) {
            var   thumbsheight=  $('#bindsearchdatadiv div[id^="mainlargediv1_"]').next().next().find('.basic__img').height();
            var scrollposition = thumbsheight * counter;
            var searchboxh = $('.searchBox').height();
            scrollposition = scrollposition - searchboxh;
            /* Get Border Bottom of Arrow to scroll according to us  if this aroow remove some time then we have to change logic also for eloqua scorlling movement  */
            var arrowup = $('#' + largeviewid).next().css('border-bottom-width');
            arrowup = arrowup.split('px');
            var temp = arrowup[0] * counter;
            scrollposition = scrollposition + temp;
            $("html, body").animate({
                scrollTop: scrollposition
            }, "slow");
        },
            /**Function OutlookPlayerSettings
            *@param azhidden hidden tag for video url to bind with Azure Media player
            *@param playerbtn it s azure media player id
            */
        OutlookPlayerSettings: function (azhidden, playerbtn) {
            var   myOptions = {

                "logo": { "enabled": false },
                autoplay: true,
                controls: true,
                width: "100%",
                techOrder: ["azureHtml5JS"],

            };

            var val = $('#' + azhidden).val();
            var myPlayer = null;
            myPlayer = amp(playerbtn, myOptions);
            myPlayer.src([{ src: val, type: "application/vnd.ms-sstr+xml", }]);

            var indexof = videotagidlist.indexOf(playerbtn + "_html5_api");
            if (indexof < 0) {
                videotagidlist[videotagidlist.length] = playerbtn + "_html5_api";
            }

        },
            /**Function PlayerSettingsExceptOutlook
            *@param azhidden it s hidden tag id 
            *@param playerbtn it s player button id
            */
        PlayerSettingsExceptOutlook: function (azhidden, playerbtn) {
            var myOptions = {

                "logo": { "enabled": false },
                autoplay: true,
                controls: true,
                width: "100%",
                techOrder: ["flashSS"],

            };
            var val = $('#' + azhidden).val();
            var myPlayer = null;
            myPlayer = amp(playerbtn, myOptions);
            myPlayer.src([{ src: val, type: "application/vnd.ms-sstr+xml", }]);

            var indexof = videotagidlist.indexOf(playerbtn + "_flashSS_api");
            if (indexof < 0) {
                videotagidlist[videotagidlist.length] = playerbtn + "_flashSS_api";
            }
        },
        testapp: function () {
            console.log('Test App ')
        },
        };
    })();
    /**
    *All Events Functions End here
    */
    $.fn.LoginUI = function (options) {
        try {
            containerid = $(this).selector;
            $('#errormessagediv').css('display', 'none');
            $('#infomessagediv').css('display', 'none');
            $('#errormessagediv').html('');
            var cookiesvalue = Events.GetLoginToken(options);
            /*
            Loder Div in Body This Loader is for  Login Time 
            */
            $('#mydiv').empty();
            $('body').append(' <div id="mydiv" style="display: none;"><div class="ui-loading__spinner" style="transform:scale(0.28);"><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#FFFFFF;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div></div></div>');

            if (cookiesvalue == null) {
                screenname = "login";
                //this.html(Model.ShowLoader());
                var defaults = {
                    customText: 'Welcome',
                    redirect: '',
                    containerid: containerid,
                    apps: '',
                    mediavaleturl: 'http://www.mediavalet.com/',
                    view: {
                        recentview: true,
                        mostvisited: false
                    }
                }
                var settings = $.extend({}, defaults, options);
                defaultsettings = settings;
                if (defaultsettings.apps == 'eloqua') {
                    Events.EloquaBasicAuthorizationCode(defaultsettings);
                }
                this.html(Model.LoginPanel(settings));
                //this.html(Model.HideLoader());
                Events.BindLoginEvent(settings);
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                $('#errormessagediv').html('');
            } else {
                screenname = "default";
                //Loading user's default page if user's access token is still valid
                $(this).SearchUI(options);

            }
            
            var sessionexpiremessage = mvCore.GetCookies('sessionexipremessage');
            if (sessionexpiremessage != null && sessionexpiremessage != undefined) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html(sessionexpiremessage);
                mvCore.SetCookies('sessionexipremessage', '', 0);
            }
             
        } catch (e) {
            $('#errormessagediv').css('display', 'block');
            $('#errormessagediv').html(e.message);
        }
    }
    /**Function SearchUI 
    *@param options will contain all default values
    */
    $.fn.SearchUI = function (options) {
        globalvarmedataidlist = [];
        globalvarmetadatalist = [];

        /*Browser Name */
        globalvarbrowsername = Events.GetIfBrowserName();
        hootsuiteopenview = mvCore.GetQueryStringValue('view');
        var defaults =
        {
            token: token,
            url: apiurl,
            settings: true,
            menu: true,
            apps: 'default',
            view: {
                recentview: true,
            }
        }
        usernameglobalvar = mvCore.GetCookies('coookieusername');
        globalvarclientid = mvCore.GetCookies('cookiesclientid');

        var settings = $.extend({}, defaults, options);
        if (settings.apps == '') {
            settings.apps = 'default';
        } else {
            settings.apps = settings.apps.toLowerCase();
        } if (settings.apps == 'eloqua') {
            Events.EloquaBasicAuthorizationCode(settings);
        } 
        var token = Events.GetLoginToken(options);
        settings.token = token;
        var apiurl = mvCore.GetCookies('cookieurlapi');
        var defaultOptions = {
            ApiUrl: apiurl
        };
        defaultsettings = settings;

        mvCore.initialize(defaultOptions);
        if (token != null || token != undefined) {
            try {
                Model.ShowLoader();
                screenname = "default";
                /**
                 * Default setting for Sorting and filtering
                 */
                $(this).html(Model.SearchPanel(settings));
                //Appending user-assigned featured categories to category-dropdownlist
                $('#selectassetcategories ul li').each(function (index, item) {  
                    if (index !== 0 && index !== 1) {
                        $(this).remove();
                    }
                });
                var tempcatlist = '';
                if (defaultsettings.apps == "default") { //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomaincategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomaincategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                } else if (defaultsettings.apps == "office") {  //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomainofficecategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomainofficecategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                } else if (defaultsettings.apps == "mobileapp") {  //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomainmobileappcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomainmobileappcategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                } else if (defaultsettings.apps == "outlook") {  //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomainoutlookcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomainoutlookcategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                    Events.GetRenditionConfig(token);
                } else if (defaultsettings.apps == "eloqua") {  //get categories as per app name

                    tempcatlist = mvCore.GetCookies('cookiedomaineloquacategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomaineloquacategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                    //Eloqua Token
                    Events.GetRenditionConfig(token);
                } else if (defaultsettings.apps == "hootsuite") {
                    //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomainhootsuitecategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomainhootsuitecategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                } else if (defaultsettings.apps == "drupal") {  //get categories as per app name
                    tempcatlist = mvCore.GetCookies('cookiedomaindrupalcategories');
                    if (tempcatlist !== "" && tempcatlist !== "Null" && tempcatlist !== undefined) {
                        domaincatlist = mvCore.GetCookies('cookiedomaindrupalcategories').split(','); //set values to global variable domaincatlist
                        $.each(domaincatlist, function (key, value) {
                            $('#selectassetcategories ul').append('<li id="' + value.split(':')[0] + '" " style="text-transform: capitalize;">' + value.split(':')[1] + '</li>');
                        });
                    } else {
                        domaincatlist = [];
                    }
                }
                
                var defaultgroup = mvCore.GetCookies('cookiesdefaultgroup');
                if (defaultgroup != undefined) {
                    if (defaultgroup.toLowerCase() === "system administrator" || defaultgroup.toLowerCase() === "administrators") {
                        if (defaultsettings.apps == 'office' || defaultsettings.apps == 'default' || defaultsettings.apps == 'drupal' || defaultsettings.apps == 'outlook' || defaultsettings.apps == 'eloqua' || defaultsettings.apps == 'mobileapp') {
                            $('#selectassetcategories ul').append('<li id="editcategories" class="hootsuiteadmin">Edit Featured Categories</li>');
                            $('#liEditMetaData').css('display', 'block');
                            Events.EditMetaDataLiClick();

                        } else if (defaultsettings.apps == 'hootsuite') {
                            if (hootsuiteopenview == undefined || hootsuiteopenview == null || hootsuiteopenview == 'default') {
                                $('#liHootsuiteFeaturedCategory').css('display', 'block');
                                Events.HootsuiteEditPinCategory();
                                Events.HootSuiteFeturedCat();

                            }
                        }
                    }
                }
                /*For Meta Data Listing in Cookies */
                Events.GetMetaDataList();
                Events.SettingsButtonEvent();
                Events.MenuButtonEvent();
                Events.SearchingEvent(settings);
                Events.EditButtonEvent();
                $('#selectassetcategories p').text('Recently Uploaded');
                Events.LoadEventRecentlyUploadedAsset(settings);
                Events.selectDropdownOffice();
                Events.selectDropdownList();
                $('#errormessagediv').css('display', 'none');
                $('#infomessagediv').css('display', 'none');
                $('#errormessagediv').html('');


                /*Code For enabling and disabling setting menu and Apps options*/
                if (settings.apps === 'default' || settings.apps == 'drupal') {
                    $('#hootsuitmenubtn').css('display', 'none');
                    if (settings.settings == false) {
                        $('#searchsettingsbtn').css('display', 'none');
                    }
                    else {
                        $('#searchsettingsbtn').css('display', 'block');
                    }
                    if (settings.menu == false) {
                        $('#searchsettingsbtn').css('display', 'none');
                    }
                    else {
                        $('#searchsettingsbtn').css('display', 'block');
                    }

                }
                else if (settings.apps === 'office' || settings.apps === 'outlook' || settings.apps === 'eloqua' || settings.apps === 'mobileapp') {
                    $('#hootsuitmenubtn').css('display', 'none');
                    $('#searchsettingsbtn').css('display', 'none');
                    $('body').append('<div id="imagesexcelandpowerpointdiv" style="position: absolute;top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;display:none" ><img id="imagesexcelandpowerpointimg" style="display:none" /></div>');
                }
                else if (settings.apps === 'hootsuite') {
                    $('#hootsuitmenubtn').css('display', 'block');
                    Events.HootsuiteGearBtnEvent();
                    Events.HootsuiteLogout();

                    Events.HootsuiteSortEvent();

                    if (defaultgroup != undefined) {
                        if (defaultgroup.toLowerCase() === "system administrator" || defaultgroup.toLowerCase() === "administrators") {
                            $('#liEditMetaData').css('display', 'block');
                            Events.EditMetaDataLiClick();
                        }
                    }

                } else if (settings.apps == "drupal") {
                    $('body').append('<iframe style="display:none" src="https://telemetryservice.firstpartyapps.oaspapps.com/telemetryservice/telemetryproxy.html"></iframe>');
                }
                /*Setting App name for Trackign Reocrds*/
                Events.ApplicationName();
                /*Code For enabling and disabling setting menu and Apps options*/
                /*Document Click Event*/
                Events.DocumentClickEvent();
                /*Error Message Color Change in Case of Refresh*/
               
                $('.error').css({
                    "border-color": "#fa8072", "background": "#ffecec url('images/Error.png') no-repeat 10px 50%"
                });
                /*if (settings.apps != "eloqua") {
                 document.getElementById("mediavaletlibraryparaid").setAttribute('style', 'margin-top:0 !important');
                }*/
            } catch (e) {
                $('#errormessagediv').css('display', 'block');
                $('#errormessagediv').html(e.message);
            }
        }
    }

    
}(jQuery, typeof window !== "undefined" ? window : this, mvCore, mvAppSdkCore);

