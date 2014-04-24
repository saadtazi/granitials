
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var gm = require('gm');

// transparency: play with last digit
gm(48, 48, '#ffffffff') // transparent
  .fill("#e4e4e4")
  .drawCircle(23, 23, 0, 23)
  .fontSize(17)
  .font('./fonts/OpenSans-Bold.ttf')
  // .antialias(false) // yeark :(
  // .stroke("#efe", 2)
  .fill("#555")
  .drawText(15, 28, "JP")
  // .fill("#fa0")
  
  .write('./test.png', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
);

/23x23/Text?bg=