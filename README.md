* Generate png image with centered text, save them to disk or stream them
* middleware for express (3, 4) to generate png images with centered text

Uses [gm](https://github.com/aheckmann/gm) package.

# Requirements

* GraphicsMagick
* ghostscript

To install those on Mac, assuming you have [`brew`](http://brew.sh/) installed:

```
brew install graphicsmagick
brew install ghostscript
```


# Generate images

```
var img = new Granitial({
  { width:   50,
    height:  50,
    bgColor: '#aaaaaa',
    fontSize: 14,
    color: '#ffffff'
    // other possible options:
    // font: 'path/to/font'
    // gravity: 'Center' // see http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity
    // translateX: null, // defaults to -width
    // translateY: null, // defaults to -height
    // translateX: null, // defaults to width
    // translateY: null, // defaults to height
  }
});

img.write(path, function(err) {
  //...
});

// OR
img.getStream(function(err, stream) {
  //...
});


// But you cannot use both at the same time due to a limitation of gm
// so use getStream and a fsStream if you need to stream and save to disk

img.getStream(function(err, stream) {
  if (err) return;
  stream.pipe(fs.createWriteStream(imgPath));
  stream.pipe(otherWriteStream); // otherWriteStream can be a htttp response
});

```

You can use aRGB format for colors (supports transparency).

For supported font format, see [GraphicsMagick](http://www.graphicsmagick.org/GraphicsMagick.html#details-font) documentation. Default is Arial... at least on my Mac.

# Middleware

## Usage

### png

```
app.get('/path/to/granitials/:size?/:text?', granitials.png({
  color: '#ff0000',
  allowQueryString: true
}));
```

Params are taken from req.params and the config which are merged at run time.

It supports the same params as `new Granitial()` described above, plus the following:

* `size`: expected format: '100x100'. Use either `width`and `height` or `size`
* `allowQueryString`: if `true`, then query string params are also used as config param. So you can mix route params and query string params in urls like this: `/granitials/200x200/textToInsert?color=%23ff00ff
* `savePath`: if specified, it will save the image everytime the route is hit. Good for storing generated images to `static` folder so the same image is not generated twice. The format of `savePath supports template from lodash and the config is passed to the template. So you can use the following:

```
// this will crash if <%-width%>x<%-height%>/ folder does not exist
savePath: 'path/to/folder/<%-width%>x<%-height%>/<%- text%>.png'
```

### svg

```
app.get('/path/to/svg/:size/:text', granitials.svg({
  color: '#ff0000',
  allowQueryString: false
}));
```

Supported options:

* `fontUrls`: JSON object with key = font format (ie. woff2, ttf...), value = url of the font file
* fontName: font name defined by fontUrls, or font family if fontUrls is not used


# Examples

* `npm install`
* `node examples/middleware.js` and follow the instructions in the console
* `node examples/generate.js` and check generated images in output/ folder


