import unirest from 'unirest'
import cheerio from 'cheerio'

function parseLinks(url, className, maxLinks = 5) {
    return new Promise((resolve, reject) => {
        let links = []

        unirest.get(url)
            .end(({body}) => {
                const $ = cheerio.load(body)
                const domain = url.match(/\/\/(.*?)\//)[1]

                $(className).each((i, e) => {
                    if (i + 1 <= maxLinks)
                        links.push("http://" + domain + $(e).attr('href'))
                })

                resolve(links)
            })
        if(!links.length)reject()
    })
}

function parsePost(url, elem) {
    return new Promise((resolve, reject) => {
        unirest.get(url)
            .then(({body}) => {
                const $ = cheerio.load(body);

                const domain = url.match(/\/\/(.*?)\//)[1]
                const title = $(elem.title).text().trim()
                let image = $(elem.image).attr('src').trim()
                image = image.indexOf('http') >= 0 ? image : `https://${domain}${image}`
                const description = $(elem.description).text().trim()
                const view = $(elem.views).text().trim()
                resolve({
                        title: title,
                        image: image,
                        description: description,
                        views: view
                    }
                )
            })
    })
}

export {parseLinks, parsePost}