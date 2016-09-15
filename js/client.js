/**
 * Created by Admin on 9/15/16.
 */
(function (window) {
    'use strict';

    function MosaicEffect(vars) {
        this.vars = vars;

        if (vars.image.complete) {
            this.applyEffect()
        }
    }

    MosaicEffect.prototype.applyEffect = function () {
        var vars = this.vars;

        // number of vertical tiles
        var xTiles = Math.floor(vars.width / vars.TILE_WIDTH);

        // number of horizontal tiles
        var yTiles = Math.floor(vars.height / vars.TILE_HEIGHT);


        // display image into original canvas
        var originCtx = vars.originCanvas.getContext('2d');
        originCtx.drawImage(vars.image, 0, 0);

        var calWorker = new Worker('worker.js');
        calWorker.onmessage = function (e) {
            var imgData = originCtx.getImageData(e.data.x, e.data.y, e.data.width, e.data.height);
            drawSquare(imgData)
        }

    };

    MosaicEffect.prototype.drawSquare = function (imgData) {

    }

    window.MosaicEffect = MosaicEffect;

}(window));