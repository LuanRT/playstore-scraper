"use strict";

var axios = require("axios");
var cheerio = require("cheerio");
var UserAgent = require("user-agents");
var playstore_base_url = "https://play.google.com";

var utils = require("./utils");

const search = (query) => {
  var userAgent = new UserAgent();
  var search_query = query.trim().split(/ +/).join("+").toLowerCase();
  var final_url = `${playstore_base_url}/store/search?q=${search_query}&c=apps`;

  return new Promise((resolve, reject) => {
    axios
      .get(final_url, {
        headers: {
          "User-Agent": userAgent,
          Referer: "https://www.google.com/",
          Accept: "text/html",
          "Accept-Language": "en-US",
          "Accept-Encoding": "gzip",
        },
      })
      .then((res) => {
        var $ = cheerio.load(res.data);

        var final_data = {};
        final_data.results = [];

        $(utils.url_selector)
          .slice(0, 10)
          .each(function (i, el) {
            var title = $($(utils.title_selector)[i]).attr("title");
            var description = $($(utils.description_selector)[i]).text();
            var developer = $(utils.developer_selector)[i].children[0].data;
            var icon = $($(utils.icon_selector)[i])
              .attr("data-srcset")
              .slice(0, -2)
              .trim();
            var link = `${playstore_base_url}${$(el).attr("href")}`;

            var rating = $($(utils.rating_selector)[i])
              .attr("aria-label")
              .replace("Rated", "")
              .replace("stars out of five stars", "")
              .trim();

            final_data.results[i] = {
              title: title,
              description: description,
              icon: icon,
              rating: rating,
              developer: developer,
              link: link,
            };
          });

        final_data.found = final_data.results.length === 0 ? false : true;
        resolve(final_data);
      })
      .catch((err) => {
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
        var $ = cheerio.load(res.data);

        var final_data = {};

        var title = $(
          $(utils.ext_title_selector)[0] || "<span>n/a</span>"
        ).text();

        var snippet = $(utils.ext_snippet_selector)[0]
          ? $($(utils.ext_snippet_selector)[0])
              .attr("content")
              .replace("\n", "")
              .trim()
          : "n/a";

        var description = $($(utils.ext_description_selector)[0])
          .html()
          .replace('<div jsname="sngebd">', "")
          .replace(/<br>/g, "\n")
          .replace(/<\/br>|<b>/g, " ")
          .replace(
            /<\/b>|<p>|<\/p>|<i>|<\/i>|<\/div>|<i>|<\/i>|<h2>|<\/h2>/g,
            ""
          );

        var whatsnew = getStringBetweenStrings(
          res.data,
          '<h2 class="Rm6Gwb">What&#39;s New</h2></div><div jscontroller="IsfMIf" jsaction="rcuQ6b:npT2md" class="PHBdkd" data-content-height="144" jsshadow><div jsname="bN97Pc" class="DWPxHb" itemprop="description"><span jsslot>',
          "</span><div"
        )
          ? getStringBetweenStrings(
              res.data,
              '<h2 class="Rm6Gwb">What&#39;s New</h2></div><div jscontroller="IsfMIf" jsaction="rcuQ6b:npT2md" class="PHBdkd" data-content-height="144" jsshadow><div jsname="bN97Pc" class="DWPxHb" itemprop="description"><span jsslot>',
              "</span><div"
            )
              .replace(/<br>/g, "\n")
              .replace(/&#39;/g, "'")
              .trim()
          : "n/a";

        var version = getStringBetweenStrings(
          res.data,
          'Current Version</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
          "</"
        )
          ? getStringBetweenStrings(
              res.data,
              'Current Version</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
              "</"
            ).trim()
          : "n/a";

        var icon = $(utils.ext_icon_selector)[0]
          ? $($(utils.ext_icon_selector)[0]).attr("srcset").slice(0, -2).trim()
          : "n/a";

        var dev = $(utils.ext_dev_selector)[0]
          ? $(utils.ext_dev_selector)[0].children[0].data
          : "n/a";

        var dev_url = $(utils.ext_dev_selector)[0]
          ? `${playstore_base_url}${$($(utils.ext_dev_selector)[0]).attr(
              "href"
            )}`
          : "n/a";

        var rating = $(utils.ext_rating_selector)[0]
          ? $($(utils.ext_rating_selector)[0])
              .attr("aria-label")
              .replace("Rated", "")
              .replace("stars out of five stars", "")
              .trim()
          : "n/a";

        var ratings = $(utils.ext_ratings_selector)[0]
          ? $($(utils.ext_ratings_selector)[0]).attr("aria-label")
          : "n/a";

        var updated = getStringBetweenStrings(
          res.data,
          'Updated</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
          "</"
        );
        var size = getStringBetweenStrings(
          res.data,
          'Size</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
          "</"
        );
        var installs = getStringBetweenStrings(
          res.data,
          'Installs</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
          "</"
        );
        var content_rating = getStringBetweenStrings(
          res.data,
          'Content Rating</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb"><div>',
          "</"
        );

        var inapp_purchases = getStringBetweenStrings(
          res.data,
          'In-app Products</div><span class="htlgb"><div class="IQ1z0d"><span class="htlgb">',
          "</"
        );

        var genre = $(
          $(utils.ext_genre_selector)[0] || "<span>n/a</span>"
        ).text();

        var price =
          $($(utils.ext_price_selector)[0]).attr("content") === "0"
            ? "Free"
            : $($(utils.ext_price_selector)[0]).attr("content");

        var youtube_trailer = $(utils.ext_trailer_selector)[0]
          ? $($(utils.ext_trailer_selector)[0])
              .attr("data-trailer-url")
              .split("?")[0]
              .replace("https://www.youtube.com/embed/", "https://youtu.be/")
          : "n/a";

        var screenshots = [];
        $(utils.ext_screenshots_selector)
          //    .slice(2)
          .each(function (i, el) {
            if ($(el).attr("data-srcset")) {
              screenshots.push($(el).attr("data-srcset").slice(0, -2).trim());
            } else {
              screenshots.push($(el).attr("srcset").slice(0, -2).trim());
            }
          });

        /* Still testing this
      var reviews = getReviews(res.data);
      */

        final_data.title = title;
        final_data.snippet = snippet;
        final_data.version = version;
        final_data.whatsnew = whatsnew;
        final_data.description = description;
        final_data.genre = genre;
        final_data.price = price;
        final_data.icon = icon;
        final_data.trailer =
          youtube_trailer.length === 0 ? "n/a" : youtube_trailer;
        final_data.rating = rating;
        final_data.ratings = ratings;
        final_data.screenshots = screenshots;
        //final_data.reviews = reviews;
        final_data.additional_info = {};
        final_data.additional_info.content_rating = content_rating || "n/a";
        final_data.additional_info.inapp_purchases = inapp_purchases || "n/a";
        final_data.additional_info.developer = dev;
        final_data.additional_info.developer_url = dev_url;
        final_data.additional_info.installs = installs || "n/a";
        final_data.additional_info.updated = updated || "n/a";
        final_data.additional_info.size = size || "n/a";

        resolve(final_data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getExtendedInfoById = (id) => {
  var formatted_url = `https://play.google.com/store/apps/details?id=${id}`;
  return new Promise((resolve, reject) => {
    getExtendedInfo(formatted_url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getReviews = (data) => {
  var regex = /,(.*?),null,"(.*?)",\[(.*?)\]\n,(.+?),null,null,\["(.+?)","(.*?)",null,\[\[null,(.+?),null,\[null,null,"(.*?)"\]/g;
  var parsed_data = regex.exec(data);
  var processed_data = [];

  while (parsed_data != null) {
    processed_data.push({
      author: parsed_data[6],
      profile_picture: parsed_data[8],
      review: parsed_data[2],
    });
    parsed_data = regex.exec(data);
  }
  return processed_data;
};

const getStringBetweenStrings = (data, start_string, end_string) => {
  const regex = new RegExp(
    `${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`,
    "s"
  );
  const match = data.match(regex);
  return match ? match[1] : undefined;
};

const escapeStringRegexp = (string) => {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
};

module.exports = {
  search,
  getExtendedInfo,
  getExtendedInfoById,
};
