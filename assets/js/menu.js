$(document).ready(function(){
	$(".start_game").click(function(){
	let name_user = $('.name').val();
	let block_menu= $('#menu');
	let block_game= $('#game');
	if (name_user!="") {
block_menu.css("display","none");
	block_game.css("display","block");
	Game();
	audio.get(0).play();
	}
	else{
		alert("Побежал кабанчиком имя заполнять!");
	}
	console.log(name_user);
	console.log(block_menu);
	console.log(block_game); 
	});
	$('.settings').click(function(){
		let settings_window=$('.settings_window');
		settings_window.fadeIn();
	});
	$('.close').click(function(){
		let settings_window=$('.settings_window');
		settings_window.fadeOut();
	});
	$('.builds li').click(function(){
	 select_image_x=$(this).attr("x");
	 select_image_y=$(this).attr("y");
	 type=$(this).attr("type");
	 $('.builds ul li img').css('background','none');
	 $(this).find('img').css('background','red');
	 
	});


	
	let audio = $("audio");
	audio.ready(function(){
		console.log("музыка работает");
		
	});
});
