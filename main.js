"use strict";

let renderer = PIXI.autoDetectRenderer(512,512);
renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();
let gol = new Gol(stage, 512, 6); 

setInterval(function() {
    gol.update();
}, 1 * 100);
