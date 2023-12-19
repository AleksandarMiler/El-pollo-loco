/** Class representing the Backround Objects */

class BackgroundObject extends movableobject {
    width = 720;
    height = 480;
    

    /**
     * backgroundObjects are going to be shown/drawn
     * @param {string} imagePath - the path of an Image 
     * @param {number} x - the x value
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;   
    }
}