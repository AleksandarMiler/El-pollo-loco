/**
 * 
 */
let canvas;
let world;
let keyboard = new Keyboard();
let IntervalsfromGame = [];
let pause = false;



/**
 * function that is incharge of starting the game, by defining two variables,
 * first one the canvas,
 * second, the world containing all our game elements
 */

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    pause = false;
}


/**
 * after pressing the button the pause of the game will be initiated
 */
function initiatePause() {
    pauseResumeGame();
    document.getElementById('gamePause').innerHTML = `
    <img onclick="initiateResume()" class="icons" src="./img/icons_play_black.png"></img>`; 
}


/**
 * after pressing the button the resuming of the game will be initiated
 */
function initiateResume() {
    pauseResumeGame();
    document.getElementById('gamePause').innerHTML = `
    <img onclick="initiatePause()" class="icons" src="./img/icons_pause.png"></img>`; 
}




/**
 * function which if the condition has been fullfilled pauses/plays the game
 */
function pauseResumeGame() {
    if(pause == false) {
        pause = true;
    } else {
        pause = false;
    }
}


/**
 * by pressing the restart Button this function will be triggered,
 * some html elements will be hidden others will be shown in order to 
 * game to start from the begining
 */

function restartGame() {
    document.getElementById('endScreenLose').style = 'display: none';
    document.getElementById('restartGameLose').style = 'display: none';

    document.getElementById('endScreenGameOver').style = 'display: none';
    document.getElementById('restartGameWin').style = 'display: none';

    document.getElementById('startGame').style = 'display: block';
    document.getElementById('startScreen').classList.remove('fade-out');

    world.stopMusic();
    document.getElementById('btnSoundOnOff').innerHTML = `
        <img onclick="world.toggleSoundOff()" class="icons" src="./img/icons_sound_on.png"></img>`;
}



/**
 * the Controls Dialog will be shown
 */

function showControls() {
    document.getElementById('controls').style = "display: flex";
    document.getElementById('controlsImage').innerHTML = '<img onclick ="hideControls()" class="icons" src="./img/icons_settings_black.png">';
    document.getElementById('gamePause').classList.add('d-none');
    if (pause = false) {
        pause = true
    } else {
        pause = true
    }

}


/**
 * the Controls Dialog will be hidden
 */
function hideControls() {
    document.getElementById('controls').style = "display: none";
    document.getElementById('controlsImage').innerHTML = '<img onclick="showControls()" class="icons" src="./img/icons_settings.png" alt="">';
    document.getElementById('gamePause').classList.remove('d-none');
    if (pause = true) {
        pause = false
    } 
    document.getElementById('gamePause').innerHTML = `
    <img onclick="initiatePause()" class="icons" src="./img/icons_pause.png"></img>`;   
}


/**
 * adjusting the 'Rotate Your Screen' Window depending on a width or height of window
 */
window.addEventListener('onresize', () => {
    if (innerWidth === 600) {
        document.getElementById('rotateScreen').classList.remove('d-none');
    } else if (innerHeight <= 480) {
        document.getElementById('rotateScreen').classList.add('d-none');
    }
})




   
