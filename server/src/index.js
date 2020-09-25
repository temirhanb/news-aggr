import {parseLinks, parsePost} from "./parsePost";
import {elem} from "./configs";

const site = 'https://www.ural56.ru/news/650670/'
// {site: 'http://1743.ru/news/40305-s-1-oktyabrya-jiteli-orenburga-orska-i-mednogorska-perehodyat-na-novuyu-sistemu-oplaty-otopleniya#'}
console.log(site)
const Post = parsePost(
    site,
    elem.ural56
)

parseLinks(site, '.news-list__item p a')
    .then(links => {
        for (let link of links)
            parsePost(
                links[link],
                elem.ural56
            )
    })
