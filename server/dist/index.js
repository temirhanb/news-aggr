"use strict";

var _parsePost = require("./parsePost");

var _configs = require("./configs");

var site = 'https://www.ural56.ru/news/650670/';
// {site: 'http://1743.ru/news/40305-s-1-oktyabrya-jiteli-orenburga-orska-i-mednogorska-perehodyat-na-novuyu-sistemu-oplaty-otopleniya#'}
console.log(site);
var Post = (0, _parsePost.parsePost)(site, _configs.elem.ural56);

(0, _parsePost.parseLinks)(site, '.news-list__item p a');

Post.then(function (data) {
    return console.log(data);
});