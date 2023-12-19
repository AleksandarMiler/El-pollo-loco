/** Class representing the Clouds, as a subcategorie/subclass of movableObject */

class Cloud extends movableobject {

     /**
     * values defined needed for Clouds to be shown, move etc..
     */
    y = 50;
    width = 500;
    height = 250;
    

    /**
     * constructor function incharge of loading and showing images of clouds
     * @param {number} x - the values of x
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }


    /**
     * function incharge of animating the clouds 
     */
    animate() {
       setInterval(() => {
        if (pause === false) {
        this.moveLeft();
    }
    }, 1000 / 40);
    }
}