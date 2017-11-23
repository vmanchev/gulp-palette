var gulp = require('gulp');
var args = require('yargs').argv;
var toRgb = require('hex-rgb');
var toHex = require('rgb-hex');

var chalk = require('chalk');
var convert = require('color-convert');

gulp.task('palette', function(){

  if(args.c === undefined) {
    console.error('Usage: gulp palette 64de21');
    return;
  }

  var baseHex = args.c.toString();

  if(baseHex.length !== 6){
    console.error('Invalid HEX color');
    return;
  }

  function normalizeRgb(rgbArr) {

    rgbArr.forEach(function(value, i, arr){
      if(value > 255) {
        arr[i] = 255;
      }
    });

    return rgbArr;
  }

  baseRgb = convert.hex.rgb(baseHex);

  var hoverRgb = normalizeRgb([baseRgb[0] + 80, baseRgb[1] + 40, baseRgb[2] + 60]);
  var hoverHex = convert.rgb.hex(hoverRgb[0], hoverRgb[1], hoverRgb[2]);

  var pressedRgb = normalizeRgb([ baseRgb[0] + 10, baseRgb[1] + 10, baseRgb[1] + 20 ]);
  var pressedHex = convert.rgb.hex(pressedRgb[0], pressedRgb[1], pressedRgb[2]);

  console.log(chalk.rgb(baseRgb)(`\n\tBase:\t\t${baseHex}`));
  console.log(chalk.rgb(hoverRgb)(`\tHover:\t\t${hoverHex}`));
  console.log(chalk.rgb(pressedRgb)(`\tPressed:\t${baseHex}\n`));

});
