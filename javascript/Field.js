let EMPTY_FIELD = new Image();
EMPTY_FIELD.src = 'images/sqt0.gif';
let FLAGGED_FIELD = new Image();
FLAGGED_FIELD.src = 'images/sqt1.gif';
let BOMBED_FIELD = new Image();
BOMBED_FIELD.src = 'images/minered.gif';
let WRONG_FIELD = new Image();
WRONG_FIELD.src = 'images/nomine.gif';
let lose = false;
let win = false;
const FIELDS_SPRITE = {
    'm': 'images/mine.gif',
    'e': 'images/sqt0.gif',
    '0': 'images/sq0.gif',
    '1': 'images/sq1.gif',
    '2': 'images/sq2.gif',
    '3': 'images/sq3.gif',
    '4': 'images/sq4.gif',
    '5': 'images/sq5.gif',
    '6': 'images/sq6.gif',
    '7': 'images/sq7.gif',
    '8': 'images/sq8.gif',
}

class Field {
    constructor(width, height) {
        this.fieldc = []
        this.field = []
        this.width = width;
        this.height = height;
    }

    init() {
        console.log(this.width,' ',this.height);
        for (let i = 0; i < this.height; i++) {
            this.field.push([]);
            this.fieldc.push([]);
            for (let j = 0; j < this.width; j++){
                this.field[i][j] = new Tile(j, i,);
            }
        }

    }

    clear(){
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++){
                this.field[i][j].opened = false;
                this.field[i][j].wrong = false;
                this.field[i][j].bombed = false;
                this.field[i][j].mine = false;
                this.field[i][j].flagged = false;
                this.fieldc[i][j] = 3;
            }
        }
    }

    generate(x, y){
        for (let i = 1; i <= 5; i++) {
            let m = Math.floor(Math.random()*100) % 15;
            let r = Math.floor(Math.random()*100) % 15;
            if ((Math.abs(x-m)>1 || Math.abs(y-r)>1) && this.fieldc[r][m] !== 1){console.log(x,' ',m,' ',y,' ',r);
                this.field[r][m] = new Tile(m, r, FIELDS_SPRITE['m']);
                this.fieldc[r][m] = 1;
            }
            else i--;
        }
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.fieldc[i][j] !== 1) {
                    let kol = 0;
                    for (let k = Math.max(0, i - 1); k < i + 2 && k < this.height; k++) {
                        for (let g = Math.max(0, j - 1); g < j + 2 && g < this.width; g++) {
                            if(this.fieldc[k][g] !== 1 &&  this.fieldc[k][g]) this.fieldc[k][g] = 2;
                            if(this.fieldc[k][g] === 1) kol++;
                        }
                    }
                    if (kol === 0){ this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['0'])
                        this.fieldc[i][j] = 0;}
                    if (kol === 1) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['1']);
                    if (kol === 2) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['2']);
                    if (kol === 3) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['3']);
                    if (kol === 4) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['4']);
                    if (kol === 5) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['5']);
                    if (kol === 6) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['6']);
                    if (kol === 7) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['7']);
                    if (kol === 8) this.field[i][j] = new Tile(j, i, FIELDS_SPRITE['8']);
                }
            }
        }
    }

    openkor(x, y){
        console.log('EMPTY');
        for (let k = Math.max(0, y - 1); k < y + 2 && k < this.height; k++) {
            for (let g = Math.max(0, x - 1); g < x + 2 && g < this.width; g++) {
                if(this.fieldc[k][g] === 0 && (k !== y || g !== x) && this.field[k][g].opened !== true) this.openkor(g, k);
                else this.field[k][g].opened = true;
            }
        }
        return 0;
    }

    clickCell(x, y, flag) {
        if (flag === 1) {
            this.field[y][x].opened = true;
            if (this.fieldc[y][x] === 1) this.field[y][x].mine = true;
        }
        else {
            this.field[y][x].flagged = this.field[y][x].flagged !== true;
        }
    }

    check(x, y) {
        let op = 0;
        if(this.field[y][x].mine && this.field[y][x].opened && this.field[y][x].flagged === false){
            this.field[y][x].bombed = true;
            for (let i in this.field) {
                for (let j in this.field[i]) {
                    if (this.fieldc[i][j] !== 1 && this.field[i][j].flagged) this.field[i][j].wrong = true;
                    this.field[i][j].opened = true;
                }
            }
            lose = true;
        }
        if(this.field[y][x].opened && this.fieldc[y][x] === 0){
            this.openkor(x, y);
        }
        for (let i in this.field) {
            for (let j in this.field[i]) {
                if (this.field[i][j].opened) op++;
            }
        }
        if(op === this.height * this.width - 5) win = true;
    }

    draw(context) {
        for (let i in this.field) {
            for (let j in this.field[i]) {
                this.field[i][j].draw(context);
            }
        }
        if(lose) {
            game.stop(0);
            lose = 0;
        }
        if(win) {
            game.stop(1);
            win = 0;
        }
    }

}