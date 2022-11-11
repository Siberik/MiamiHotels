$(document).ready(function() {
	let audio = $(".IntroAudio");
	$(".start_game").click(function() {
		let name_user = $('.name').val();
		let block_menu = $('#menu');
		let block_game = $('#game');
		if (name_user != "") {
			block_menu.css("display", "none");
			block_game.css("display", "block");
			Game();
			audio.get(0).pause();
			audio.attr("src", "assets/sounds/Hydrogen.mp3");
			audio.get(0).play();



		} else {
			alert("Побежал кабанчиком имя заполнять!");
		}
		console.log(name_user);
		console.log(block_menu);
		console.log(block_game);
	});
	$('.settings').click(function() {
		let settings_window = $('.settings_window');
		settings_window.fadeIn();
	});
	$('.close').click(function() {
		let settings_window = $('.settings_window');
		settings_window.fadeOut();
	});
	$('.builds li').click(function() {
		select_image_h = $(this).attr("h");
		select_image_w = $(this).attr("w");
		select_image_type = $(this).attr("type");
		select_image_name = $(this).attr("name");
		$('.builds ul li img').css('background', 'none');
		$(this).find('img').css('background', 'red');

	});



	$('.MusicButton').click(function() {
		audio.get(0).play();

	});
	



	var audio_player = document.getElementById('audio-player');
	var range = document.getElementById('MusicSlider');
	range.onchange = function(){
	  if (this.value == this.min){
		audio_player.volume = 0;
	  } else if(this.value == this.max){
		audio_player.volume = 1;
	  }
	}

});