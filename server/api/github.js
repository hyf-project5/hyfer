'use strict';
const httpRequest = require('request');
const marked = require('marked');

const API_END_POINT = 'https://api.github.com/repos';

function getReadMeAsHtml(req, res) {
    let owner = req.params.owner;
    let repo = req.params.repo;

    let request = {
        url: `${API_END_POINT}/${owner}/${repo}/readme`,
        json: true,
        headers: {
            'User-Agent': 'hackyourfuture'
        }
    }

    httpRequest.get(request, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let md = Buffer.from(body.content, 'base64').toString();
            let html = marked(md, {
                breaks: true,
                smartypants: true
            });
            return res.send(html);
        }

        res.statusStatus(404);
    })
}

module.exports = {
    getReadMeAsHtml
}