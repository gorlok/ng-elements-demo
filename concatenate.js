const fs = require('fs-extra');
const concat = require('concat');
const compressing = require('compressing');
(async function build() {
  const files = [
    './dist/elements-demo/runtime-es5.js',
    './dist/elements-demo/polyfills-es5.js',
    './dist/elements-demo/main-es5.js',
    './dist/elements-demo/scripts.js',
  ];
  await concat(files, 'elements.js');
  await fs.copyFile('./dist/elements-demo/styles.css', 'styles.css');
  //await fs.copy('./dist/elements-demo/assets/', 'elements/assets/' );
  await fs.createReadStream('elements.js')
    .pipe(new compressing.gzip.FileStream())
    .pipe(fs.createWriteStream('elements.js.gz'))
  await fs.remove('elements.js')
})()
