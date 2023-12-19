/** Class representing the Keyboard */


class Keyboard {


    /**
     * values defined in order to detect and react on the keyboard or touch commands
     */
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ANYKEY = false;
    D = false;


    /**
     * constructor function incharge of starting two functions in order to 
     * detect pressed keybord or touch commands
     */
    constructor() {
        this.keybordControls();
        this.prolongueStart(); 
    }


    /**
     * function incharge of delaying the detection of touch commands, 
     * because otherweise the function is starting before the Ids are loaded
     */
    prolongueStart() {
        setTimeout(() => {
            this.touchControls();  
        }, 5000);
    }


    /**
     * function that detects touch commands, simultaneously changing the value of a variables 
     * needed for taking action of our character
     */
    touchControls() {
            document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.LEFT = true;
            });
            document.getElementById('btnLeft').addEventListener('touchend', (e) => {
                e.preventDefault()
                keyboard.LEFT = false;
            });
            document.getElementById('btnRight').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.RIGHT = true;
            });

            document.getElementById('btnRight').addEventListener('touchend', (e) => {
                e.preventDefault()
                keyboard.RIGHT = false;
            });
            document.getElementById('btnJump').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.SPACE = true;
            });

            document.getElementById('btnJump').addEventListener('touchend', (e) => {
                e.preventDefault()
                keyboard.SPACE = false;
            });
            document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard.D = true;
            });

            document.getElementById('btnThrow').addEventListener('touchend', (e) => {
                e.preventDefault()
                keyboard.D = false;
            });

        }


     /**
     * function that detects keyboard commands, simultaneously changing the value of a variables 
     * needed for taking action of our character
     */
    keybordControls() {
            window.addEventListener("keydown", (e) => {

                if (e.keyCode === 37) {
                    keyboard.LEFT = true;
                }
                if (e.keyCode === 39) {
                    keyboard.RIGHT = true;
                }
                if (e.keyCode == 40) {
                    keyboard.DOWN = true;
                }
                if (e.keyCode == 38) {
                    keyboard.UP = true;
                }

                if (e.keyCode == 32) {
                    keyboard.SPACE = true;
                }

                if (e.keyCode == 68) {
                    keyboard.D = true;
                } 
            });


            window.addEventListener("keyup", (e) => {
                if (e.keyCode === 37) {
                    keyboard.LEFT = false;
                }
                if (e.keyCode === 39) {
                    keyboard.RIGHT = false;
                }
                if (e.keyCode == 40) {
                    keyboard.DOWN = false;
                }
                if (e.keyCode == 38) {
                    keyboard.UP = false;
                }
                if (e.keyCode == 32) {
                    keyboard.SPACE = false;
                }
                if (e.keyCode == 68) {
                    keyboard.D = false;
                }
            });

        }
}