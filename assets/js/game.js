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
glass_wall.src = "assets/images/Textures/Walls/GlassPanelV.png";
let glass_wall2 = new Image();
glass_wall2.src = "assets/images/Textures/Walls/GlassPanelH.png";
let glass_floor = new Image();
glass_floor.src = "assets/images/Textures/Floor/GlassFloor.png";
let heavy_wall = new Image();
heavy_wall.src = "assets/images/Textures/Walls/sprWallHeavyH.png";
let brick_wallh = new Image();
brick_wallh.src = "assets/images/Textures/Walls/sprWallBrickH.png"
let brick_wallv = new Image();
brick_wallv.src = "assets/images/Textures/Walls/sprWallBrickV.png"
let walk_sprite = {
    

    w: 256,
    h: 32,
    count: 8,
    speed: 150,
    select_frame: 0,
    side: "left"

}


//
let city = [
    {
        "buildname": "BrickH",
        "x": 160,
        "y": 340,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 160,
        "y": 300,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 160,
        "y": 260,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 160,
        "y": 220,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 200,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 160,
        "y": 180,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 180,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 280,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 220,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 320,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 340,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 360,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 380,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 400,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickV",
        "x": 420,
        "y": 180,
        "img": brick_wallv,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 480,
        "y": 180,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 480,
        "y": 240,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 480,
        "y": 280,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 480,
        "y": 320,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "BrickH",
        "x": 480,
        "y": 340,
        "img": brick_wallh,
        "h": "60",
        "w": "20",
        "type": "1"
    },
    {
        "buildname": "HeavyH",
        "x": 220,
        "y": 380,
        "img": heavy_wall,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "HeavyH",
        "x": 160,
        "y": 380,
        "img": heavy_wall,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "glassH",
        "x": 260,
        "y": 380,
        "img": glass_wall2,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "glassH",
        "x": 300,
        "y": 380,
        "img": glass_wall2,
        "h": "20",
        "w": "60",
        "type": "1"
    },
    {
        "buildname": "glassV",
        "x": 340,
        "y": 340,
        "img": glass_wall,
        "h": "60",
        "w": "20",
        "type": "1"
    }
];
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
    angle: 180,
    status:"run"
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
            switch (select_image_name) {
                case "glassV":
                    city.push({
                        buildname:"glassV",
                        x: x,
                        y: y,
                        img: glass_wall,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
                    });
                    break;
                case "HeavyH":
                    city.push({
                        buildname:"HeavyH",
                        x: x,
                        y: y,
                        img: heavy_wall,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
                    });
                    break;
                    case "BrickV":
                    city.push({
                        buildname:"BrickV",
                        x: x,
                        y: y,
                        img: brick_wallv,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
                    });
                    break;
                    case "BrickH":
                    city.push({
                        buildname:"BrickH",
                        x: x,
                        y: y,
                        img: brick_wallh,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
                    });
                    break;
                case "glassH":
                    city.push({
                        buildname:"glassH",
                        x: x,
                        y: y,
                        img: glass_wall2,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
                    });

                    break;
                    break;
                case "glassFl":
                    city.push({
                        buildname:"glassFl",
                        x: x,
                        y: y,
                        img: glass_floor,
                        h: select_image_h,
                        w: select_image_w,
                        type: select_image_type
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
   
    // context.clearRect(0, 0, width_screen, height_screen);
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
        walk_sprite.side = "up";
        if(collision().length == 0 ){
            player.y -= player.speed;
            player.angle = 180;
            
        }
        else{
                
            player.y += player.speed*3;
        }
        break;
        case 65:
            walk_sprite.side = "left";
            if(collision().length == 0){
                player.x -= player.speed;
                
            }
            else{
                
                player.x += player.speed*3;
            }
            break;
        case 83:
        walk_sprite.side = "down";
        if(collision().length == 0){
            player.y += player.speed;
            player.angle = 360;
           
        }
        else{
                
            player.y -= player.speed*3;
        }
           
            break;
        case 68:
        walk_sprite.side = "right";
        if(collision().length == 0){
          player.x += player.speed;
              
        }
        else{
                
            player.x -= player.speed*3;
        }
            
            
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
    function collision() {
        var cities = city.filter(item => item.x+cell.w > player.x+16 &&
            item.x < player.x+player.w-16 &&
            item.y  < player.y+player.h - 16 &&
            item.y + Number(item.h)> player.y + 16
            && item.type == "1");  
        return cities;              
        
    }
}
