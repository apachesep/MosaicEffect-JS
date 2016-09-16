this.onmessage = function(e) { 
	
	// tile cordinates (top left pixel)
	var x = e.data.x,
		y = e.data.y;
	
	// send back to main thread for drawing tile
	var colorCode = calculateColor(x, y, e.data.imgData)
	this.postMessage({
		colorCode: colorCode,
		x: x,
		y: y
	})
}

/*
*	This function is used to calculate average color
*	
* 	@param x: cordinate x top left of tile,
*	@param y: cordinate y top left of tile,
*	@param imgData: ImageData
*
*	return hex color code
*/
function calculateColor(x, y, imgData) {
	
	// calculate from rbg to hex color code
    function rgbToHex(rbg) {
        var colorCode = ''
        for (var prop in rbg) {
            var hex = rbg[prop].toString(16)

            colorCode += (hex.length == 1) ? "0" + hex : '' + hex
        }

        return colorCode
    }

    var rgb = {
            r: 0,
            g: 0,
            b: 0
        },
        length = imgData.data.length,
        blockSize = 5,
        i = -4,
        count = 0
	
	// detached data to enhance performance
	var imageData = imgData.data
	
	// get rgb values
    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += imageData[i];
        rgb.g += imageData[i + 1];
        rgb.b += imageData[i + 2];
    }
	
	// get an int as average value of each color represent
	// send to calculate to hex
    var colorCode = rgbToHex({
        r: Math.floor(rgb.r / count),
        g: Math.floor(rgb.g / count),
        b: Math.floor(rgb.b / count)
    })

    return colorCode
}
