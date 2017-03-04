'use strict';
const httpRequest = require('request');
const marked = require('marked');
const LRU = require('lru-cache');

const API_END_POINT = 'https://api.github.com/repos';
const ONE_DAY_IN_MSECS = 24 * 60 * 60 * 1000;

const cache = LRU({
    max: 100,
    maxAge: ONE_DAY_IN_MSECS
});

function getReadMeAsHtml(req, res) {
    let owner = req.params.owner;
    let repo = req.params.repo;
    let ownerAndRepo = `${owner}/${repo}`;

    let promise;
    let html = cache.get(ownerAndRepo);
    if (html) {
        console.log('README cache hit for: ' + ownerAndRepo)
        promise = Promise.resolve(html);
    } else {
        console.log('README cache miss for: ' + ownerAndRepo)
        promise = new Promise((resolve, reject) => {
            let request = {
                url: `${API_END_POINT}/${ownerAndRepo}/readme`,
                json: true,
                headers: {
                    'User-Agent': 'hackyourfuture'
                }
            }
            httpRequest.get(request, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    console.log('README received from GitHub');
                    let md = Buffer.from(body.content, 'base64').toString();
                    let html = marked(md, {
                        breaks: true,
                        smartypants: true
                    });
                    cache.set(ownerAndRepo, html)
                    resolve(html);
                } else {
                    reject(error);
                }
            })
        });
    }

    promise.then(html => res.send(html))
        .catch(() => res.statusStatus(404));
}

module.exports = {
    getReadMeAsHtml
}