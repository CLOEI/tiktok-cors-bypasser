# Tiktok-CORS-Bypasser

As we know, TikTok block all cors from third party domain.
This node application can bypass the CORS with CORS Proxy method.

I seen some php based ones notably from [TufayelLus](https://github.com/TufayelLUS)
I didn't know anything about PHP but without his site, i probably be stuck.

## Installation & Usage

```bash
$ npm install
$ node app.js

```

```
For HTML : https://example.com/bypass?url=url_here
For video : https://example.com/bypass?url=url_here&d=1
```
Live demo : [Tiktok-bypasser](https://tiktok-bypass.herokuapp.com/)

## How does it works

When you open tiktok link, cookie will be set automaticly the most import one was tt_webid_v2 without this when you do a GET request on the video link response will be 403(Forbidden). i might be wrong but i notice there a special params which if it gone you can't do a GET request.
So how does it work? 

Get request to get the cookie and save it on cookie jar => Get request to the video link