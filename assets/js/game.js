let canvas = document.getElementById('game_zone');
let context = canvas.getContext("2d");

let width_screen = window.innerWidth;
let height_screen = window.innerHeight;
let type;

canvas.width = width_screen;
canvas.height = height_screen;
let game_status = false;

let select_image_h;
let select_image_w;
let select_image_type;
let select_image_name;
//1-режим
let game_mode = 1;
//Изображения


let player_image = new Image();

let glass_wall = new Image();
glass_wall.src="assets/images/Textures/Walls/GlassPanelV.png";
let glass_wall2 = new Image();
glass_wall2.src="assets/images/Textures/Walls/GlassPanelH.png";
let glass_floor = new Image();
glass_floor.src="assets/images/Textures/Floor/GlassFloor.png";

let walk_sprite = {

    w: 256,
    h: 32,
    count: 8,
    speed: 150,
    select_frame: 0,
    side: "left"

}


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
//Сколько клеток вмещается
const count_cell_width = Math.ceil(width_screen / cell.w);
const count_cell_height = Math.ceil(height_screen / cell.h);

//Карта
const array_map = [];
const array_texture = [];
//Прорисовка клеток
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
        if (select_image_h != "" && select_image_w != "" && index_cell.length == 0) {
            switch(select_image_name){
                case "glassV":
                    city.push({
                        x:x,
                        y:y,
                        img:glass_wall,
                        h:select_image_h,
                        w:select_image_w,
                        type:select_image_type
                    });
                break;
                case "glassH":
                city.push({
                    x:x,
                    y:y,
                    img:glass_wall2,
                    h:select_image_h,
                    w:select_image_w,
                    type:select_image_type
                });
                break;
                case "glassFl":
                city.push({
                    x:x,
                    y:y,
                    img:glass_floor,
                    h:select_image_h,
                    w:select_image_w,
                    type:select_image_type
                });
                break;
            }
            
        }
        else {
            let index = city.findIndex(item => item.x == x && item.y == y);

            city.splice(index, 1);

        }
    }
});

function animate_hero() {
    context.clearRect(0, 0, width_screen, height_screen);
    if (walk_sprite.select_frame == walk_sprite.count) {
        walk_sprite.select_frame = 0;
    }
    switch (walk_sprite.side) {

        case "left":
            walk_sprite.h = 32;
            walk_sprite.w = 256;
            player_image.src = "assets/images/main hero/left.png";
            break;
        case "right":
            walk_sprite.h = 32;
            walk_sprite.w = 256;
            player_image.src = "assets/images/main hero/right.png";
            break;
        case "up":
            walk_sprite.h = 32;
            walk_sprite.w = 256;
            player_image.src = "assets/images/main hero/up.png";
            break;
        case "down":
            walk_sprite.h = 32;
            walk_sprite.w = 256;
            player_image.src = "assets/images/main hero/down.png";
            break;

    }
    if (walk_sprite.side == "left" || walk_sprite.side == "right") {
        context.drawImage(
            player_image,
            (walk_sprite.w / walk_sprite.count) * walk_sprite.select_frame,
            walk_sprite.h * 0,
            walk_sprite.w / walk_sprite.count,
            walk_sprite.h,
            player.x,
            player.y,
            player.w,
            player.h
        );
    }
    else {
        context.drawImage(
            player_image,
            (walk_sprite.w / walk_sprite.count) * 0,
            walk_sprite.h * walk_sprite.select_frame,
            walk_sprite.w / walk_sprite.count,
            walk_sprite.h,
            player.x,
            player.y,
            player.w,
            player.h
        );
    }
    walk_sprite.select_frame += 1;
}

function Game() {
    
    //context.clearRect(0, 0, width_screen, height_screen);
    for (let i = 0; i < array_map.length; i++) {
        
        context.strokeRect(
            array_map[i].x,
            array_map[i].y,
            cell.w,
            cell.h);
            
    }
    for (let i = 0; i < city.length; i++) {
        context.drawImage(
            city[i].img,
            city[i].x,
             city[i].y,
             city[i].w,
             city[i].h
        );
    }
    if (game_status == false) {
        setInterval(animate_hero, walk_sprite.speed);
        game_status = true;
    }
    // drawRotatedImage(player_image, player.x, player.y, player.angle);
    document.addEventListener('keydown', movePlayer);
    requestAnimationFrame(Game);
}
// var TO_RADIANS = Math.PI / 180;
// function drawRotatedImage(image, x, y, angle) {
//     context.save();
//     context.translate(x, y);
//     context.rotate(angle * TO_RADIANS);

//     animate_hero(-(image.width / 2),-(image.height / 2));
//     // context.drawImage(image, -(image.width / 2), -(image.height / 2));
//     // and restore the co-ords to how they were when we began
//     context.restore();
// }
function movePlayer(pressKey) {
    console.log(pressKey.keyCode);
    let index_intersection;
    switch (pressKey.keyCode) {
        case 87:
            
            player.y -= player.speed;
            player.angle = 180;
            walk_sprite.side = "up";
            
            collision();
            break;
        case 65:
            player.x -= player.speed;
            walk_sprite.side = "left";
            index_intersection = city.filter(item => item.x < player.x + player.w && item.x + item.w > player.x && item.y < player.y + player.h && item.y + item.h > player.y);
            console.log(index_intersection);
            collision();
            break;
        case 83:
            player.y += player.speed;
            player.angle = 360;
            walk_sprite.side = "down";
            collision();
            break;
        case 68:
            player.x += player.speed;
            walk_sprite.side = "right";
            collision();
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
    function collision()
{
    var cities= city.filter(item => item.x < player.x + player.w && item.x + item.w > player.x && item.y < player.y + player.h && item.y + item.h > player.y&& item.type=="1");
    
        if(item=>player.x>0 && player.x<item.w)
        {
          console.log("столкновение по оси х");  
        } 
        if(item=>player.x<0 && player.x>item.w)
        {
          console.log("столкновение по оси х");  
        } 
        if(item=>player.y>0 && player.y<item.h)
        {
          console.log("столкновение по оси y");  
        } 
        if(item=>player.x<0 && player.y>item.h)
        {
          console.log("столкновение по оси y");  
        } 
    
   
   
    
   
}
}
