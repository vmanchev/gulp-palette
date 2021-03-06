var gulp = require('gulp');
var chalk = require('chalk');
var convert = require('color-convert');

gulp.task('palette', function () {

  //because of yargs and leading zeroes
  var baseHex = process.argv.slice(2)[2];

  if (baseHex === undefined) {
    console.error('Usage: gulp palette -c 64de21');
    return;
  }

  if (baseHex.length !== 6) {
    console.error('Invalid HEX color');
    return;
  }

  function normalizeRgb(rgbArr) {

    rgbArr.forEach(function (value, i, arr) {
      if (value > 255) {
        arr[i] = 255;
      }
    });

    return rgbArr;
  }

  baseRgb = convert.hex.rgb(baseHex.toLowerCase());

  var hoverRgb = normalizeRgb([baseRgb[0] + 40, baseRgb[1] + 10, baseRgb[2] + 30]);
  var hoverHex = convert.rgb.hex(hoverRgb[0], hoverRgb[1], hoverRgb[2]).toLowerCase();

  var pressedRgb = normalizeRgb([baseRgb[0] + 70, baseRgb[1] + 20, baseRgb[2] + 20]);
  var pressedHex = convert.rgb.hex(pressedRgb[0], pressedRgb[1], pressedRgb[2]).toLowerCase();

  console.log(chalk.rgb(baseRgb)(`\n\tBase:\t\t${baseHex}`));
  console.log(chalk.rgb(hoverRgb)(`\tHover:\t\t${hoverHex}`));
  console.log(chalk.rgb(pressedRgb)(`\tPressed:\t${pressedHex}\n`));

});
