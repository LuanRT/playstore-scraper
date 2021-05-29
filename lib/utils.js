"use strict";

/* Search */
const title_selector = 'div[class="WsMG1c nnK0zc"]';
const description_selector = 'div > div[class="b8cIId f5NCO"]';
const developer_selector = 'div[class="KoLSrc"]';
const icon_selector = 'span[class="kJ9uy K3IMke buPxGf"] > img';
const rating_selector = 'div[class="pf5lIe"] > div';
const url_selector = 'div[class="b8cIId ReQCgd Q9MA7b"] > a';
/*****************/

/* Extended Info */
const ext_title_selector = 'h1[class="AHFaub"] > span';
const ext_snippet_selector = 'meta[itemprop="description"]';
const ext_description_selector = 'div[itemprop="description"] > span';
const ext_icon_selector = 'div[class="xSyT2c"] > img';
const ext_dev_selector = 'span[class="T32cc UAO9ie"] > a';
const ext_rating_selector = 'div[class="pf5lIe"] > div';
const ext_ratings_selector = 'span > span[class=""]';
const ext_genre_selector = 'span > a[itemprop="genre"]';
const ext_price_selector = 'meta[itemprop="price"]';
const ext_trailer_selector = 'div[class="TdqJUe"] > button';
const ext_screenshots_selector = 'div > button > img';
/*****************/

module.exports = {
  /******************/
  title_selector,
  description_selector,
  developer_selector,
  icon_selector,
  rating_selector,
  url_selector,
  /******************/
  ext_title_selector,
  ext_snippet_selector,
  ext_description_selector,
  ext_icon_selector,
  ext_dev_selector,
  ext_rating_selector,
  ext_ratings_selector,
  ext_genre_selector,
  ext_price_selector,
  ext_trailer_selector,
  ext_screenshots_selector
  /******************/
};