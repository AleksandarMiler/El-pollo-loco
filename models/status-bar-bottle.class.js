/** Class representing the StatusBarBottle, as a subcategorie/subclass of drawableObject */


class StatusBarBottles extends drawableObject {

    
    /**
     * arrays containing images of statusBar
     */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];


    /**
     * variable who has been set to 0
     */
    setBottle = 0;


    /**
     * constructor function incharge of loading and showing images of statusBar
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 40;
        this.setBottlePercentage(0);
    }


    /**
     * the procentage of the gathered bottles will be shown depending on the number that is 
     * comming as a result of the function below
     * @param {string} setBottle - the value of the variable which is changing 
     * every time the function has been executed
     */
    setBottlePercentage(setBottle) {
        this.setBottle = setBottle;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
    /**
     * returning the value 0 to 5 which consists with the numbers or images in an array
     * @returns boolean
     */
    resolveImageIndex() {
        if (this.setBottle == 0) {
            return 0;
        }
        else if (this.setBottle < 2) {
            return 1;
        }
        else if (this.setBottle < 4) {
            return 2;
        }
        else if (this.setBottle < 6) {
            return 3;
        }
        else if (this.setBottle < 8) {
            return 4;
        }
        else {
            return 5;
        }
    }
}