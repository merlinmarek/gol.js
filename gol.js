class Gol {
    constructor(render_stage, size, subdivisions){
        this.neighbours = function(field, x, y){
            let count = 0;
            for(let i = -1; i <= 1; ++i){
                for(let j = -1; j <= 1; ++j){
                    if(i == 0 && j == 0)
                        continue;
                    let val = field[(x+i + this.cell_count)%this.cell_count][(y+j+this.cell_count)%this.cell_count] ? 1 : 0;
                    count += val;
                }
            }
            return count;
        }
        this.gen_rect = (x, y, width, height) => {
            let rect = new PIXI.Graphics();
            rect.beginFill(0x000000);
            rect.drawRect(x, y, width, height);
            rect.endFill();
            return rect;
        }

        this.render_stage = render_stage; 
        if(Math.pow(2, subdivisions) > size || size % Math.pow(2, subdivisions) != 0)
            throw new Error("Check size and subdivisions");
        this.field_size = size;
        this.cell_size = size / Math.pow(2, subdivisions);
        this.cell_count = Math.pow(2, subdivisions);
        this.field = [];
        this._field = [];
        this.rects = [];
        for(let i = 0; i < this.cell_count; ++i){
            this.rects[i] = [];
            this.field[i] = [];
            this._field[i] = [];
            for(let j = 0; j < this.cell_count; ++j){
                this.rects[i][j] = this.gen_rect(i*this.cell_size, j*this.cell_size, this.cell_size, this.cell_size);
                this.field[i][j] = Math.random() > 0.5;
                this._field[i][j] = false;
                render_stage.addChild(this.rects[i][j]);
            }
        }
    }
    update() {
        for(let i = 0; i < this.cell_count; ++i){
            for(let j = 0; j < this.cell_count; ++j){
                let neighbours = this.neighbours(this.field, i, j);
                this._field[i][j] = false;
                if((!this.field[i][j]) && neighbours == 3)
                    this._field[i][j] = true;
                if((this.field[i][j]) && (neighbours == 3 || neighbours == 2))
                    this._field[i][j] = true;
                this.rects[i][j].visible = this._field[i][j];
            }
        }
        [this.field, this._field] = [this._field, this.field];
        renderer.render(this.render_stage);
    }
}
