# MediaValet SDK
[MediaValet] SDK is a highly scalable, secure and flexible digital asset management system (DAMS) that empowers organizations and individual users to access a single, secure, well organized and searchable media library. 

It is a JavaScript plug-in for MediaValet applications which provides a sleek and responsive UI to access and use media assets into various office tools like Word, Excel, PowerPoint and Outlook compose message view or web based applications like [Hootsuite], WordPress, Joomla etc. It also supports single-sign-on feature that relieves users from passing their credentials for subsequent signing in.

# Install
##### For Developer: 
* **Configuration:** Open index.html file in a plain text editor and look for the function named LoginUI. Set the values of its variables according to different environments as follows:
    *	For Web: 
        * customText: \<a welcome message, optional\>
        * apps: ‘default’
        * view: \<set here the attributes value to ‘true’ which you want to enable, otherwise ‘false’, e.g. recentview: true\>
    *	For Hootsuite:
        *	customText: \<a welcome message, optional\>
        *	apps: ‘hootsuite’
        *	view: \<set attributes value to ‘true’ which you want to enable, otherwise ‘false’\>
    *	For Office tools:
        *	customText: \<a welcome message, optional\>
        *	apps: ‘office’
        *	view: \<set attributes value to ‘true’ which you want to enable, otherwise ‘false’\>
*	**Setup:** Different setup is required for web, Hootsuite and Office described as below:
    *	For Web - Host the SDK on web and pass the URL to user. User needs to create an account to get access.
    *	For Hootsuite -Host the app on web and pass the URL to user. User needs to create an account on Hootsuite to add the app there and access it further.
    *	For Office tools -Deploy the app on the Microsoft Office store. From here it will be available to users within the office applications.
	
##### For User:
*	**Setup:**
    *	For Web -No setup needed.
    *	For Hootsuite – Login to Hootsuite and create a new app. It will be now listed under My App section there. Now edit the app with the required configuration details of MediaValet SDK, e.g. ‘Api Callback URL’ value, and save it. It is now ready to be used in Hootsuite.
    *	For Office – Open Word/PowerPoint/Excel. Go to INSERT -> Apps for Office. In the popup window opened look for the MediaValet app under FEATURED APPS, select it and on next window click on ‘Trust it’ button. It is now added to your Office application to use.

# Getting Started
*	**For Web** - Using web browser login to the web version of MediaValet SDK and access and use the media assets.
*	**For Hootsuite** – Login to your Hootsuite account and go to Dashboard. On the left menu strip under ‘Publisher’ menu item look under the ‘Content Sources’ for your app and click on it. Login to it and use.
*	**For Microsoft Office** –Open Word/PowerPoint/Excel, go to INSERT -> Apps for Office and select MediaValet, presuming it is already added there. It will be opened in the right side of your document within your application. Login to it with your credentials and now it is ready to use.

# Examples
All examples assume you have already setup and logged in to the app.
* **Category-based asset search** – Click on the ‘More’ link at the bottom-right of any category block on default page and new page full of the assets of that category will be opened. Further scrolling down will load even more assets.
* **Keyword-based asset search** – Write your search text in the search box at top of the page and hit enter key or click the search button available next to search box. Loads of assets matching your keyword will be loaded. Further scrolling down will load even more assets.

# SDK Version
* Current SDK Version is 0.9.029

[//]: # (Reference links used in the body:)

[MediaValet]: <http://www.mediavalet.com/>
[Hootsuite]: <https://hootsuite.com/>

