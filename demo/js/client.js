
// setup elements
var fileEl = document.getElementById('file'),
	targetCanvasEl = document.getElementById('mosaic'),
	progressBar = document.getElementById('progress'),
	uploaderEl = document.getElementById('uploader'),
	fileLabelEl = document.getElementById('file-label')

/*
*	This function is used to apply effect after image selected
*	FileReader is used to read image data
*	then send it to apply mosaic effect \m/
*/
function apply() {

	var fileImage = document.getElementById('file').files[0]
	try {
		if (fileImage.name != undefined) {
			progressBar.style.display = 'inline-block'

			document.getElementById('file-label').innerHTML = 'loading ' + fileImage.name

			var renderImage = new Image();
			var fr = new FileReader();
			fr.onload = function () {
				renderImage.src = fr.result;
			}

			renderImage.onload = function () {
				
				// apply effect
				new MosaicEffect({
					image: this,
					targetCanvas: targetCanvasEl,
					progressBar: progressBar,
					uploaderEl: uploaderEl,
					height: this.height,
					width: this.width
				})
			}
			fr.readAsDataURL(fileImage);
		}
	} catch (error) {
		// case fileImage.name undefined
	}
}