var axios = require("axios");
var cheerio = require("cheerio");
var UserAgent = require("user-agents");
var escapeStringRegexp = require("escape-string-regexp");
var playstore_base_url = 'https://play.google.com';
  
const search = (query) => {
  var userAgent = new UserAgent();
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var formatted_search_query = `${playstore_base_url}/store/search?q=${search_query}`;
  
  return new Promise((resolve, reject) => {
    axios
      .get(formatted_search_query, {
        headers: {
          "User-Agent": userAgent,
          Referer: "https://www.google.com/",
          Accept: "text/html",
          "Accept-Language": "en-US",
          "Accept-Encoding": "gzip",
        },
      })
      .then((res) => {
        if (res.status != 200) return reject('Error status code: ' + res.status);
        var $ = cheerio.load(res.data);
        
        var titles = [];
        var descriptions = [];
        var developers = [];
        var rating = [];
        var icons = [];
        var final_data = [];
        
        $('span[class="kJ9uy K3IMke buPxGf"] > img').slice(0, 10).each(function(i, el) {
          icons.push(el.attribs['data-srcset'].slice(0, -2).trim());
        });
        
        $('div[class="pf5lIe"] > div').slice(0, 10).each(function(i, el) {
          rating.push(el.attribs['aria-label'].replace('Rated', '').replace('stars out of five stars', '').trim());
        });
        
        $('div > div[class="b8cIId f5NCO"]').slice(0, 10).each(function(i, el) {
          descriptions.push($(el).text()); 
        });
        
        $('div[class="WsMG1c nnK0zc"]').slice(0, 10).each(function(i, el) {
          titles.push(el.attribs.title);
        });
        
        $('div[class="KoLSrc"]').slice(0, 10).each(function(i, el) {
          developers.push(el.children[0].data);
        });
        
        $('div[class="b8cIId ReQCgd Q9MA7b"] > a').slice(0, 10). each(function(i, el) {
          final_data[i] = {
            title : titles[i],
            description : descriptions[i],
            icon : icons[i],
            rating : rating[i],
            developer  : developers[i],
            link : `${playstore_base_url}${el.attribs.href}`,
          };
        });
        if (final_data.length == 0) return reject({ found : false });
        resolve(final_data);
      }).catch((err) => {
        reject(err);
      });
  });
};

const getExtendedInfo = (url) => {
  var userAgent = new UserAgent();
 
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "User-Agent": userAgent,
          Referer: "https://play.google.com/",
          Accept: "text/html",
          "Accept-Language": "en-US",
          "Accept-Encoding": "gzip",
        },
      })
      .then((res) => {
        if (res.status != 200) return reject('Error status code: ' + res.status);
        var $ = cheerio.load(res.data);
        
        var title =
        $('h1[class="AHFaub"] > span')[0] ?
        $('h1[class="AHFaub"] > span')[0].children[0].data :
        'n/a';
        
        var snippet = 
        $('meta[itemprop="description"]')[0] ?
        $('meta[itemprop="description"]')[0].attribs.content.replace('\n', '').trim() :
        'n/a';
        
        var description = $($('div[itemprop="description"] > span')[0]).html()
        .replace('<div jsname="sngebd">', '')
        .replace(/<br>/g, '\n')
        .replace(/<\/br>/g, ' ')
        .replace(/<b>/g, ' ')
        .replace(/<\/b>/g, '')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<i>/g, '')
        .replace(/<\/i>/g, '')
        .replace(/<\/div>/, '');
        
        var whatsnew =
        getStringBetweenStrings(res.data, '<h2 class="Rm6Gwb">What&#39;s New</h2></div><div jscontroller="IsfMIf" jsaction="rcuQ6b:npT2md" class="PHBdkd" data-content-height="144" jsshadow><div jsname="bN97Pc" class="DWPxHb" itemprop="description"><span jsslot>', '</span><div') ? 
        getStringBetweenStrings(res.data, '<h2 class="Rm6Gwb">What&#39;s New</h2></div><div jscontroller="IsfMIf" jsaction="rcuQ6b:npT2md" class="PHBdkd" data-content-height="144" jsshadow><div jsname="bN97Pc" class="DWPxHb" itemprop="description"><span jsslot>', '</span><div').replace(/<br>/g, '\n').replace(/&#39;/g, "'").trim() :
        'n/a';
        
        var version = 
        getStringBetweenStrings(res.data, 'Current Version</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</') ?
        getStringBetweenStrings(res.data, 'Current Version</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</').trim() :
        'n/a';
        
        var icon =
        $('div[class="xSyT2c"] > img')[0] ?
        $('div[class="xSyT2c"] > img')[0].attribs.srcset.slice(0, -2).trim() : 
        'n/a';
        
        var dev =
        $('span[class="T32cc UAO9ie"] > a')[0] ? 
        $('span[class="T32cc UAO9ie"] > a')[0].children[0].data :
        'n/a';
        
        var dev_url = 
        $('span[class="T32cc UAO9ie"] > a')[0] ?
        `${playstore_base_url}${$('span[class="T32cc UAO9ie"] > a')[0].attribs.href}` :
        'n/a';
        
        var rating = 
        $('div[class="pf5lIe"] > div')[0] ?
        $('div[class="pf5lIe"] > div')[0].attribs['aria-label'].replace('Rated', '').replace('stars out of five stars', '').trim() :
        'n/a';
        
        var ratings = 
        $('span > span[class=""]')[0] ?
        $('span > span[class=""]')[0].attribs["aria-label"] :
        'n/a';
        
        var updated = getStringBetweenStrings(res.data, 'Updated</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</');
        var size = getStringBetweenStrings(res.data, 'Size</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</');
        var installs = getStringBetweenStrings(res.data, 'Installs</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</');
        var content_rating = getStringBetweenStrings(res.data, 'Content Rating</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb"><div>', '</');
    
        var inapp_purchases = getStringBetweenStrings(res.data, 'In-app Products</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">', '</');
     
        var genre =
        $('span > a[itemprop="genre"]')[0] ?
        $('span > a[itemprop="genre"]')[0].children[0].data :
        'n/a';
        
        var price =
        ($('meta[itemprop="price"]')[0].attribs.content === "0") ?
        'Free' : 
        $('meta[itemprop="price"]')[0].attribs.content;
        
        var youtube_trailer = $('div[class="TdqJUe"] > button')[0] ? $('div[class="TdqJUe"] > button')[0].attribs["data-trailer-url"].split('?')[0].replace('https://www.youtube.com/embed/', 'https://youtu.be/') : 'n/a';
   
        var screenshots = [];
        $('div > button > img').slice(2).each(function(i, el) {
          screenshots.push(el.attribs["data-srcset"].slice(0, -2).trim());
        });
        
        var final_data = {
          title : title,
          snippet : snippet,
          version : version,
          whatsnew : whatsnew,
          description : description,
          genre : genre,
          price : price,
          icon : icon,
          trailer : youtube_trailer,
          rating : rating,
          ratings : ratings,
          screenshots : screenshots,
          additional_info : {
            content_rating : content_rating ? content_rating : 'n/a',
            inapp_purchases : inapp_purchases ? inapp_purchases : 'n/a',
            developer : dev,
            developer_url : dev_url,
            installs : installs ? installs : 'n/a',
            updated : updated ? updated : 'n/a',
            size : size ? size : 'n/a',
          },
          found : true
        };
        if (final_data.length == 0) return reject({ found : false });
        resolve(final_data);
      });
  });
};

const getExtendedInfoById = (id) => {
  var formatted_url = `https://play.google.com/store/apps/details?id=${id}`;
  return new Promise((resolve, reject) => {
    getExtendedInfo(formatted_url).then((res) => resolve(res)).catch((err) => reject(err));
  });
};

function getStringBetweenStrings(data, startString, endString) {
  const regex = new RegExp(`${escapeStringRegexp(startString)}(.*?)${escapeStringRegexp(endString)}`, 's');
  const match = data.match(regex);

  return match ? match[1] : undefined;
}

module.exports = { search, getExtendedInfo, getExtendedInfoById };