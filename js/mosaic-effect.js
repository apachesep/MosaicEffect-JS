/* 	Mosaic Effect for images
 *  HieuCNguyen - Canva
 *	16/09/2016
 */

(function(window) {
    'use strict';

    function MosaicEffect(vars) {
        this.vars = vars;

        // prevent image not completely loaded before effect applied
        if (vars.image.complete) {
            this.applyEffect()
        }
    }

    /* 	
     *	Magic happend here
	 *	Canvas, progressBar will be reconfig as begin
	 *	Calculate number of tiles and cordinates needed (xx, xy for each tile)
	 *	Send to web worker to calculate color code
	 *	Come back and draw tile, cool huh
     */
    MosaicEffect.prototype.applyEffect = function() {
		
		// varibles assign
        var vars = this.vars;
        var me = this; // short for mosaic-effect

        // number of tiles in a row
        var xTiles = Math.floor(vars.width / TILE_WIDTH);

        // number of tiles in a column
        var yTiles = Math.floor(vars.height / TILE_HEIGHT);

        // setup progressbar
        this.vars.progressBar.max = yTiles * xTiles
        this.vars.progressBar.value = 0

        // origin image canvas setup
        vars.originCanvas = document.createElement('canvas');
        vars.originCanvas.height = vars.height;
        vars.originCanvas.width = vars.width;

        // draw origin image
        var originCtx = vars.originCanvas.getContext('2d');
        originCtx.drawImage(vars.image, 0, 0);

        // target image canvas setup
        vars.targetCanvas.height = vars.height;
        vars.targetCanvas.width = vars.width;
        var targetCtx = vars.targetCanvas.getContext('2d');
        targetCtx.clearRect(0, 0, vars.width, vars.height);
        vars.targetCanvas.className = 'hide'

        // worker used calculate color
        var calWorker = new Worker('js/worker.js');
        calWorker.onmessage = function(e) {
            var promise = new Promise(
                function() {
                    me.draw(e.data.x, e.data.y, e.data.colorCode)
                },
                function() {

                }
            )
        }

		// loop use for getting cordinates xx, xy
		// then send cordinates with image data to worker
		// to calculate average color
        var x = 0,
            y = 0;
        for (y = 0; y < yTiles; y++) {
            for (x = 0; x < xTiles; x++) {
				
				// cordinates
                var xx = x * TILE_WIDTH,
                    xy = y * TILE_HEIGHT;
				
				// get a piece of image
                var imgData = originCtx.getImageData(xx, xy, TILE_WIDTH, TILE_HEIGHT);
				
				// send to worker
                calWorker.postMessage({
                    x: xx,
                    y: xy,
                    imgData: imgData
                })
            }
        }

    };
	
	/*
	*	This function get colorCode, fetch svg from nodejs server using same colorCode
	*	Then draw into canvas
	*	Also processing bar is incrementing here, when done, modify elememts
	*
	* 	@param x: cordinate x top left of tile,
	*	@param y: cordinate y top left of tile,
	*	@param colorCode: average color calculated for tile
	*/
    MosaicEffect.prototype.draw = function(x, y, colorCode) {
        var progressBar = this.vars.progressBar,
            targetCanvas = this.vars.targetCanvas,
            uploaderEl = this.vars.uploaderEl,
            image = new Image();

        image.src = '/color/' + colorCode

        image.onload = function() {
			
			// draw tile
            targetCanvas.getContext('2d').drawImage(image, x, y, TILE_WIDTH, TILE_HEIGHT)
            
			// incrementing process bar
			progressBar.value++;
			
			// when task completed / all tiles rendered
            if (progressBar.value == progressBar.max) {
                fileLabelEl.innerText = 'there ya go! try more?'
                uploaderEl.className = 'uploader loaded'
                targetCanvas.className = 'show'
                progressBar.style.display = 'none'
            }
        }
    }

    window.MosaicEffect = MosaicEffect;

}(window));
