/**
 * Class drawableObject, incharge as a super() class of showing/drawing all the elements
 */
class drawableObject {

    /**
     * values defined needed for Elements to be shown
     */
    img;
    imageCache = {}; //JSON object
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    

    /**
     * function incharge for loading the image depending on a path given as a parameter
     * @param {string} path - the path of an Image 
     * // loadImage('img/test.png');
     */
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image')  <img id="image" src ="">
        this.img.src = path;
    }


    /**
     * function incharge for drawing elements on a canvas
     * @param {string} ctx - 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * function incharge for drawing frame of elements on a canvas
     * @param {string} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * function incharge for drawing frame of elements on a canvas based on the offset values
     * is being used just for testing purpose
     * @param {*} ctx 
     */
    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.right), this.height - (this.offset.top + this.offset.bottom));
            ctx.stroke();
        }
    }


    /**
     * the images from the array will be loaded
     * @param {Array} arr  = ['img/image1.png', 'img/image2.png',.. ]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }  
}