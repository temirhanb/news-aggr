'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parsePost = exports.parseLinks = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseLinks(url, className) {
    var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    return new _promise2.default(function (resolve, reject) {
        var links = [];

        _unirest2.default.get(url).end(function (_ref) {
            var body = _ref.body;

            var $ = _cheerio2.default.load(body);
            var domain = url.match(/\/\/(.*?)\//)[1];

            $(className).each(function (i, e) {
                if (i + 1 <= maxLinks) links.push("http://" + domain + $(e).attr('href'));
            });

            resolve(links);
        });
        if (!links.length) reject();
    });
}

function parsePost(url, elem) {
    return new _promise2.default(function (resolve, reject) {
        _unirest2.default.get(url).then(function (_ref2) {
            var body = _ref2.body;

            var $ = _cheerio2.default.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            var title = $(elem.title).text().trim();
            var image = $(elem.image).attr('src').trim();
            image = image.indexOf('http') >= 0 ? image : 'https://' + domain + image;
            var description = $(elem.description).text().trim();
            var view = $(elem.views).text().trim();
            resolve({
                title: title,
                image: image,
                description: description,
                views: view
            });
        });
    });
}

exports.parseLinks = parseLinks;
exports.parsePost = parsePost;