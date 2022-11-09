let canvas = document.getElementById('game_zone');
let context = canvas.getContext("2d");

let width_screen = window.innerWidth;
let height_screen = window.innerHeight;
let type;

canvas.width = width_screen;
canvas.height = height_screen;
let select_image_x;
let select_image_y;
//1-режим
let game_mode = 1;
//Изображения


let player_image = new Image();
player_image.src = "./assets/images/bucket.png";

let sprite_city = new Image();
sprite_city.src = "Assets/Images/city.png";
//
let city = [];
let cell = {
    w: 20,
    h: 20

};

let player = {
    w: cell.w * 3,
    h: cell.h * 3,
    x: width_screen / 2,
    y: height_screen / 2,
    speed: 4,
    image_h: 900 / 5,
    image_w: 900 / 5,
    angle: 180
}

const count_cell_width = Math.ceil(width_screen / cell.w);
const count_cell_height = Math.ceil(height_screen / cell.h);


const array_map = [];

for (let i = 0; i <= count_cell_width; i++) {
    for (let j = 0; j <= count_cell_height; j++) {
        array_map.push({
            x: i * cell.w,
            y: j * cell.h

        });
    }
}
canvas.addEventListener('mouseup', function (e) {
    const rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / cell.w) * cell.w;
    let y = Math.floor((e.clientY - rect.top) / cell.h) * cell.h;
    console.log("x:" + x + " y:" + y);
    let index_cell = city.filter(item => item.x == x && item.y == y);
    console.log(index_cell);
    if (game_mode == 2) {
        if (select_image_x != "" && select_image_y != "" && index_cell.length == 0) {
            city.push({
                x: x,
                y: y,
                w: cell.w,
                h: cell.h,
                x_sprite: Number(select_image_x),
                y_sprite: Number(select_image_y),
                w_sprite: 16,
                h_sprite: 16,
                type: type,
            });
        }
        else {
            let index = city.findIndex(item => item.x == x && item.y == y);

            city.splice(index, 1);

        }
    }
});

function Game() {
    context.clearRect(0, 0, width_screen, height_screen);
    for (let i = 0; i < array_map.length; i++) {
        context.strokeRect(
            array_map[i].x,
            array_map[i].y,
            cell.w,
            cell.h);
    }
    for (let i = 0; i < city.length; i++) {
        context.drawImage(

            sprite_city,
            city[i].x_sprite,
            city[i].y_sprite,
            city[i].w_sprite,
            city[i].h_sprite,
            city[i].x,
            city[i].y,
            city[i].w,
            city[i].h
        )
    }
    drawRotatedImage(player_image, player.x, player.y, player.angle);
    document.addEventListener('keydown', movePlayer);
    requestAnimationFrame(Game);
}
var TO_RADIANS = Math.PI / 180;
function drawRotatedImage(image, x, y, angle) {

    // save the current co-ordinate system 
    // before we screw with it
    context.save();

    // move to the middle of where we want to draw our image
    context.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    context.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    context.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    context.restore();
}
function movePlayer(pressKey) {
    console.log(pressKey.keyCode);
    let index_intersection;
    switch (pressKey.keyCode) {
        case 87:
            player.y -= player.speed;
            player.angle = 180;
            break;
        case 65:
            player.x -= player.speed;
            player.angle = 90;
            index_intersection = city.filter(item => item.x < player.x + player.w && item.x + item.w > player.x && item.y < player.y + player.h && item.y + item.h > player.y);
            console.log(index_intersection);

            break;
        case 83:
            player.y += player.speed;
            player.angle = 360;
            break;
        case 68:
            player.x += player.speed;
            player.angle = 270;
            break;
        case 73:
            let builds_window = document.getElementsByClassName("builds")[0];
            if (game_mode == 2) {
                builds_window.style = "display: none";
                console.log(builds_window);
                if (builds_window.getAttribute("status") == "active") {
                    builds_window.style = "display: none";
                    builds_window.setAttribute("status", "noactive");
                }
                else {
                    builds_window.style = "display:grid";
                    builds_window.setAttribute("status", "active");
                }
            }

            break;
        case 82:
            if (game_mode == 2) {
                game_mode = 1;
                select_image_x = "";
                select_image_y = "";
            }
            else {
                game_mode = 2;
            }

            break;
    }
}