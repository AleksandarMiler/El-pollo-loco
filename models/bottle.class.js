/** Class representing the Bottle, as a subcategorie/subclass of movableObject */

class Bottle extends movableobject {
    y = 340;
    height = 80;
    width = 80;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10
    };


    /**
     * array containing images
     */
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * constructor function incharge of loading and showing the elements of the class
     * depending on a X value
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 250 + Math.random() * 2000; //preuzeto od kokoski
        // this.y = 20 + Math.random() * 200;
        this.animate();
    }


    /**
     * function incharge of animating of bottles being moved
     */
    animate() {
        setInterval(() => {
            if (pause === false) {
            this.playAnimation(this.IMAGES);
        }
        }, 1000/6);
    }

}