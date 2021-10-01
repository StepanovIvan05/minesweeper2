const DIMENSIONS = {
    'width': 585,
    'height': 585,
    'tile_width': 39,
    'tile_height': 39,
    'field_width': 15,
    'field_height': 15,
}
let game = null;
let gen = 0;

window.onload = function() {
    game = new Game();
    game.init('canvas', DIMENSIONS.width, DIMENSIONS.height);
}

document.getElementById('button').onclick = function() {
    console.log(performance.now());
    game.start(1, performance.now());
    if(gen){
        game.field.clear();
        gen = 0;
    }
}
console.log(gen);

document.getElementById('canvas').onclick = function (e) {
    let x;
    let y;
    x = Math.floor(e.offsetX / 40);
    y = Math.floor(e.offsetY / 40);
    console.log(x, ' ', y, ' ', e.which);
    if(gen) {
        if (e.which === 1) {
            game.field.clickCell(x, y, 1);
            game.field.check(x, y);
        }
    }
    else {
        if(e.which === 1) {
            game.field.generate(x, y);
            game.field.clickCell(x, y, 1);
            game.field.check(x, y);
        }
        gen = 1;
    }
}

document.getElementById('canvas').oncontextmenu = function (e) {
    let x ;
    let y ;
    x = Math.floor(e.offsetX / 40 );
    y = Math.floor(e.offsetY / 40 );
    console.log(x, ' ', y,' ', e.which);
    game.field.clickCell(x, y, 2);
    game.field.check(x, y);
    e.preventDefault();
}