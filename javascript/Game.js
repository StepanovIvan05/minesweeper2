let sec = 0;
class Game {
    constructor() {
        this.canvas = null;
        this.context = null;

    }

    init(canvas_id, width, height) {
        this.canvas = document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.field = new Field(DIMENSIONS.field_width, DIMENSIONS.field_height);
        this.field.init();
        this.top = 99999;
    }

    start(p, time) {
        if(time) sec = Math.floor(time / 1000);
        if(p === 1 && game.isPause === true) {
            game.stop();
        }
        console.log(Math.floor(performance.now() / 1000) - sec);
        if (!game.isPause) {
            document.getElementById('condition').innerHTML = 'PLAYING, GAME TIME: '
                + (Math.floor(performance.now() / 1000) - sec).toString()+'s';
            document.getElementById('condition2').innerHTML = '';
            console.log('RESTART');
            game.engine();
            window.requestAnimationFrame(game.start);
        }
    }

    stop(wl) {
        console.log('STOP');
        if(wl){
            this.top = Math.min(this.top, Math.floor(performance.now() / 1000) - sec)
            document.getElementById('condition').innerHTML = 'CONGRATULATIONS!!! YOU ARE WINNER!' +
            ' YOUR TIME IS ' + (Math.floor(performance.now() / 1000) - sec).toString() + 's';
            document.getElementById('condition2').innerHTML = 'BEST TIME IS: ' + this.top.toString()+'s';
        }
        else {
            if(this.top === 99999) {
                document.getElementById('condition').innerHTML = 'YOU ARE LOSER.';
                document.getElementById('condition2').innerHTML = 'NO SUCCESSFUL ATTEMPTS';
            }
            else {
                document.getElementById('condition').innerHTML = 'YOU ARE LOSER. ';
                document.getElementById('condition2').innerHTML = 'BEST TIME IS: ' + this.top.toString()+'s';
            }
        }
        this.isPause = !this.isPause;
        window.requestAnimationFrame(game.start);
    }

    engine() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.field.draw(this.context);
    }
}