# Mosaic Photo Effect

---

Front-end app for applying mosaic effect to images (.JPEG, .PNG, .GIF) using nodejs and javascript

## How to use

```javascript
	
	// applying effect
	new MosaicEffect({
		image: imageFile, 				// original image
		targetCanvas: targetCanvasEl, 	// canvas display mosaic image
		progressBar: progressBar,		// progress bar indicator <progress></progress>
		uploaderEl: uploaderEl,			// container element for upload elements (such as input[type=file], label)
		height: imageHeight,			// mosaic image height
		width: imageWidth				// mosaic image width
	})
```
See more inside demo folder

### Run Nodejs server
> node server.js

## How does it works
```
The goal of this task is to implement the following flow in a client-side app.
1. A user selects a local image file.
2. The app loads that image, divides the image into tiles, computes the average
   color of each tile, fetches each tile from the server, and composites the
   results into a photomosaic of the original image.
3. The composited photomosaic should be displayed according to the following
   constraints:
    - tiles should be rendered a complete row at a time (a user should never
      see a row with some completed tiles and some incomplete)
    - the mosaic should be rendered from the top row to the bottom row.
4. The client app should make effective use of parallelism and asynchrony.

The project skeleton contains a lightweight server (written in node) for
serving the client app and the tile images. To start it, run npm start.
  /              serves mosaic.html
  /(js|css)/*    serves static resources
  /color/<hex>   serves an SVG mosaic tile for color <hex>.  e.g., /color/0e4daa

The tile size should be configurable via the code constants in js/mosaic.js.
The project skeleton is already set up to include those constants in both the
```