let canvas= document.getElementById('game_zone');
let context=canvas.getContext("2d");

let width_screen=window.innerWidth;
let height_screen=window.innerHeight;
let type;

canvas.width=width_screen;
canvas.height=height_screen;
let select_image_x;
let select_image_y;
//1-режим
let game_mode=1;
//Изображения
let cell_image=new Image();
cell_image.src="Assets/Images/cell.svg"

//
let city=[];
let cell={
    w:20,
    h:20 
    
};



const count_cell_width=Math.ceil(width_screen/cell.w);
const count_cell_height=Math.ceil(height_screen/cell.h); 


const array_map=[];

for( let i=0;i<=count_cell_width;i++)
{
    for(let j=0;j<=count_cell_height;j++)
    {
        array_map.push({
        x:i*cell.w,
        y:j*cell.h

        });
    }
}
canvas.addEventListener('mouseup',function(e){
    const rect=canvas.getBoundingClientRect();
    let x=Math.floor((e.clientX-rect.left)/cell.w)*cell.w;
    let y=Math.floor((e.clientY-rect.top)/cell.h)*cell.h;
    console.log("x:"+x+" y:"+y);
    let index_cell=city.filter(item=>item.x==x && item.y==y);
    console.log(index_cell);
    if(game_mode==2){
    if(select_image_x!=""&& select_image_y!=""&& index_cell.length==0){
        city.push({
        x:x,
        y:y,
        w:cell.w,
        h:cell.h,
        x_sprite:Number(select_image_x),
        y_sprite:Number(select_image_y),
        w_sprite:16,
        h_sprite:16,
        type:type,
    });
    }
    else{
        let index=city.findIndex(item=>item.x==x && item.y==y);
       
            city.splice(index,1);
     
    }
    }
});

function Game(){
    context.clearRect(0,0,width_screen,height_screen);
    for(let i=0;i<array_map.length;i++)
    {
    context.strokeRect(
        array_map[i].x,
        array_map[i].y, 
        cell.w,
        cell.h);
    }
    for(let i=0; i<city.length; i++){
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
}
