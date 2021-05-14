const express = require('express');
const got = require('got').default;
const { CookieJar } = require('tough-cookie');
const cors = require('cors');
const urlRegex = require('url-regex-safe');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());


app.get('/bypass', async (req, res) => {
    const cookieJar = new CookieJar();
    let link = req.query.url;

    if (req.query.url == null) return res.sendStatus('403');
    if (!req.query.url.startsWith('https://www')) {
        const newData = await got(req.query.url);
        link = newData.redirectUrls[0].replace('https://t', 'https://www');
    }

    got(link, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-G950F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36'
        },
        cookieJar
    }).then(async (data) => {
        if (req.query.d) {
            const videoLink = data.body.match(urlRegex()).find(el => el.startsWith('https://v'));
            console.log(videoLink)
            const decodedLink = videoLink.replace(/&amp;/g, '&');
            got.stream(decodedLink, {
                headers: {
                    'Referer': 'https://www.tiktok.com/'
                },
                cookieJar
            }).pipe(res);
        } else res.send(data.body);
    })
});


app.listen(port, () => console.log(port));