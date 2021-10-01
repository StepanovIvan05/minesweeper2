class Tile {
    constructor(x, y, image_src) {
        this.x = x;
        this.y = y;
        this.wrong = false;
        this.bombed = false;
        this.mine = false;
        this.width = DIMENSIONS.tile_width;
        this.height = DIMENSIONS.tile_height;
        this.image = new Image();
        this.image.src = image_src;
        this.opened = false;
        this.flagged = false;
    }

    draw(context) {
        if(this.wrong){
            context.drawImage(WRONG_FIELD,this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
        }else if (this.flagged) {
            context.drawImage(FLAGGED_FIELD,this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
        } else if (this.bombed){
            context.drawImage(BOMBED_FIELD,this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
        } else if (this.opened) {
            context.drawImage(this.image, this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
        } else if(this.flagged && this.opened){
        } else {
            context.drawImage(EMPTY_FIELD, this.x * DIMENSIONS.tile_width, this.y * DIMENSIONS.tile_height, this.width, this.height);
        }
    }
}