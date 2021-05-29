var playstore = require('../lib/playstore');

async function start() {
  const response = await playstore.search('TWAU');
  console.log(response);
  const ext_info = await playstore.getExtendedInfo(response.results[0].link);
  console.log(ext_info);
}

start();
