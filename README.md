# Play Store Scraper

A simple and fast way to get search results and more from Google Play Store.
However, keep in mind that this module may break without any warning if updates are made to the Google Play Store's website!

## Installation

```bash
npm install playstore-scraper
```

## Usage

```js
const playstore = require("playstore-scraper");

// A simple search:

playstore
  .search("TWDG")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

## Response:

```js
[
  results: [
    {
      title: 'The Walking Dead: Season Two',
      description: 'Sequel to the critically acclaimed and award-winning game series!',
      icon: 'https://play-lh.googleusercontent.com/XDbml9kNG4ziL-K0eINJ_l5iLsyuj35QOG16gFToTgvZkew_mTDa5Um4uqoBsGaCXbI=s256-rw',
      rating: '4.5',
      developer: 'Howyaknow, LLC',
      link: 'https://play.google.com/store/apps/details?id=com.telltalegames.walkingdead200'
    },
    {
      title: 'The Walking Dead: Season One',
      description: 'Critically acclaimed game series and winner of over 90 Game of the Year awards!',
      icon: 'https://play-lh.googleusercontent.com/Z4DBaIKoo88TwrBNzaUvsgJWs5f0CiIo8kOVIt-EAB9vajKeia3d6WTvdCp4ExTuLlQ=s256-rw',
      rating: '4.5',
      developer: 'Howyaknow, LLC',
      link: 'https://play.google.com/store/apps/details?id=com.telltalegames.walkingdead100'
    },
    .....
  ],
  found: true
]
```

## If you need to get more info about a certain item:

```js
playstore
  .search("TWDG")
  .then((res) => {
    playstore
      .getExtendedInfo(res.results[0].link)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

// Or:

playstore
  .getExtendedInfoById("com.telltalegames.walkingdead200")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

## The expected output:

```js
[
  title: 'The Walking Dead: Season Two',
  snippet: 'Sequel to the critically acclaimed and award-winning game series!',
  version: '1.35',
  whatsnew: 'Updates for episode 5.',
  description: 'The Walking Dead: Season Two is a five-part (Episodes 2-5 can be purchased via in-app) game series that continues the story of Clementine, a young girl orphaned by the undead apocalypse. Left to fend for herself, she has been forced to learn how to survive in a world gone mad. Many months have passed since the events seen in Season One of The Walking Dead, and Clementine is searching for safety. But what can an ordinary child do to stay alive when the living can be just as bad – and sometimes worse – than the dead? As Clementine, you will be tested by situations and dilemmas that will test your morals and your instinct for survival. Your decisions and actions will change the story around you, in this sequel to 2012’s Game of the Year.\n' +
    '\n' +
    '• Decisions you made in Season One and in 400 Days will affect your story in Season Two\n' +
    '• Play as Clementine, an orphaned girl forced to grow up fast by the world around her\n' +
    '• Meet new survivors, explore new locations and make gruesome choices\n' +
    '\n' +
    '- - - -\n' +
    '\n' +
    'SYSTEM REQUIREMENTS\n' +
    '\n' +
    'Minimum specs:\n' +
    'GPU: Adreno 300 series, Mali-T600 series, PowerVR SGX544, or Tegra 4 \n' +
    'CPU: Dual core 1.2GHz \n' +
    'Memory: 1GB\n' +
    '\n' +
    '- - - -\n' +
    '\n' +
    'The game will run on the following devices but users may experience performance issues:\n' +
    '\n' +
    '  - Galaxy S2 – Adreno \n' +
    '  - Droid RAZR\n' +
    '  - Galaxy S3 Mini\n' +
    '\n' +
    'Unsupported Device(s):\n' +
    '\n' +
    '  - Galaxy Tab3',
  genre: 'Adventure',
  price: 'Free',
  icon: 'https://play-lh.googleusercontent.com/XDbml9kNG4ziL-K0eINJ_l5iLsyuj35QOG16gFToTgvZkew_mTDa5Um4uqoBsGaCXbI=s360-rw',
  trailer: 'https://youtu.be/sSG_IlSksso',
  rating: '4.5',
  ratings: '676,319 ratings',
  screenshots: [
    'https://play-lh.googleusercontent.com/erO075wiQfn8ULD4ug8tkH57nR1qSS05RTYbhspi443TUpCEzhXPzo02YcZqhG-EQIQu=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/fSAshoC4C9-J5mqzKg6nxxxi8GWQXTzobvVyy4p9KiMgQUE-Bk3fmKL6ylCEdtpXdQ=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/zYxjjP10KQ7dYqF3GlgHdT0tDY272Zrar0QZyDXA_Eb-cS_JWF82FKy8CYr7VZ03WzdU=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/hoqZiv8vtYDTywMfNffqpOqxiG_H4egrN8J_jltujbivZoeNy5Zc-FhWXcdOG0Fw8g=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/GNLRYyCmVcEg3VRisBhQd9BUDgs6RlvXXbMsEMHHCSWeNGw7Vp8yBiyYukzgeMVgiA=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/MGMTV7tKVu92co6zGVWSGFxy3YHz-RjD10KNt1PSQ0YHMPfdLdcmseBXEfAki5skExM=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/WBmwVbgNa-Qv8x47BA2No124-IkwKIQzrD2yy0wIgdtfjtfe0lVM1yd991YbD5lFvw=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/mtiT3rTj3_4UxI3kAkRcPkiE92w3bHj3wgjTViMEGokA5cir-Qxkef5XMb3dLdtgXCr3=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/Bmvr-DUeykhhttGX6NVjfoxmrJCzpxwRLTHtCDMfDrs9fUd48CAe4Fv9nDyF3_i1NA=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/56X8CpQOO5jZsCZgfE9C_abQMYsYkehgbLQGlsA-dwlqcL6sjTHV42hm4QxUaaEksz5h=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/OU28SrYA5uCFzVceENJvQzomMoKlKQmeXkeuk06wqn_-4GUk-mxZNhR2bR1CkM5tVBo=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/MJJK-qsM4SP23ftORN9u1CbjU-JmlNNGUQ4Fqbioprh62pMR4DCBMF6ZthoI0lrIn_1G=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/0styed95pVXQ3hLnqzaCGHskxJojjCwbuNSrj6_NcGtpmZ26qeChrEbLC0BYBLXQcA=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/Z4o0gg6lfGziXkyuYx__oa57PzcZF33Wyb424EX9jQG3pTeVlgxUae2d-oSPFz-Nh1E=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/AxYTVMjbZvzu6Jp7bGs-RyNaO5lDLdyp9zf-kmyLEB52cYiEv2nJeXdMKjwZHuIYtfmg=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/UZTH2LSpmgOlVBjufWqMrKy74fsAyyFjctIfGjWeQJhWvjWDCtcWn44yUqG3QWYQdtE=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/0EDO5AMspwBISoBcFUz034z6VwlckGVyYpL-XwcXdqhoOUv8TBNMLVqznptTmiYCa_M=w1440-h620-rw',
    'https://play-lh.googleusercontent.com/aGy4UirR-thBLGhTd-K48lHeqPtORT3xKXlRNiISYzaVFwkIeblXvZ6Mt2Z3MR5C1Yg=w1440-h620-rw'
  ],
  additional_info: [
    content_rating: 'Rated 16+',
    inapp_purchases: 'R$15.99 - R$47.99 per item',
    developer: 'Howyaknow, LLC',
    developer_url: 'https://play.google.com/store/apps/developer?id=Howyaknow,+LLC',
    installs: '10,000,000+',
    updated: 'November 29, 2016',
    size: '12M'
  ]
]
```

## License

[MIT](/LICENSE)
