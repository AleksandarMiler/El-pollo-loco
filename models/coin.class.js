/** Class representing the Coins, as a subcategorie/subclass of movableObject */

class Coin extends movableobject {
    /**
     * values defined needed for Coins to be shown, move etc..
     */
    width = 80;
    height = 80;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };


    /**
     * array containing images of Coins 
     */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];


    /**
     *  constructor function incharge of loading and showing images of coins
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 250 + Math.random() * 2000;
        this.y = 20 + Math.random() * 200;
        this.animate();
    }


    /**
     * function incharge of animating the coins 
     */
    animate() {
        setInterval(() => {
            if (pause === false) {
            this.playAnimation(this.IMAGES);
        }
        }, 1000/2);
    } 
}