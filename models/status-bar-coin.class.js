/** Class representing the StatusBarcoins, as a subcategorie/subclass of drawableObject */

class StatusBarCoins extends drawableObject {

    /**
     * arrays containing images of statusBar
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    
    /**
     * constructor function incharge of loading and showing images of statusBar
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 40;
        this.setCoinPercentage(0);
    }


    /**
     * variable who has been set to 0
     */

    setCoins = 0;


    /**
     * the procentage of the gathered coins will be shown depending on the number that is 
     * comming as a result of the function below
     * @param {string} setCoins - the value of the variable which is changing every time the function 
     * has been executed
     */
    setCoinPercentage(setCoins) {
        this.setCoins = setCoins; // 0..5
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    
    /**
     * returning the value 0 to 5 which consists with the numbers or images in an array
     * @returns boolean
     */
    resolveImageIndex() {
        if (this.setCoins == 0) {
            return 0;
        }
        else if (this.setCoins < 2) {
            return 1;
        }
        else if (this.setCoins < 4) {
            return 2;
        }
        else if (this.setCoins < 6) {
            return 3;
        }
        else if (this.setCoins < 8) {
            return 4;
        }
        else {
            return 5;
        }
    }
    }
