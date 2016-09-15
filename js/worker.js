this.onmessage = function(e) {

    for (var x = 0; x < xTiles; x++) {
        for (var y = 0; y < yTiles; y++) {

            if (e.width % x == 0 && e.height % y == 0) {
                postMessage({
                    x: x,
                    y: y
               })
            }
        }
    }

}