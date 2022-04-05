<div style="display: flex; flex-direction: column; align-items: center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
  <h1>Sync clock via api</h1>
  <p>
    This page created with api (http://worldtimeapi.org/) and webpack
  </p>
  <p>Author: <a href="https://portfolio-vitaliy.ru/" target="_blank">To portfolio</a>
</div>


## Build Setup:

``` bash
# Download repository:
git clone https://github.com/pilotvitalik/clock.git sync_clock

# Go to the app:
cd sync_clock

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8081/ (browser auto open)
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

* `build/` - webpack settings
* `src/index.html` - main app HTML
* `src/index.js` - main app file where you include/import all required libs and init app
* `src/assets/fonts` - put local fonts here.
* `src/assets/img` - put images here.
* `src/assets/less` - put custom app LESS styles here.
* `src/assets/less/main.less` - common file for custom styles
* `src/js` - put custom app scripts here
* `src/js/index.js` - common file for custom scripts
* `src/static/` - folder with extra static assets that will be copied into output folder

Copyright (c) 2019-present, [Vitalij Kozhushko](https://github.com/pilotvitalik)
