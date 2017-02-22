window.onload=function(){
	function setheight(){
		if($('#mcontent').width()>1040+10)
			$('#mul').width('1040px');
		else if($('#mcontent').width()>830+10)
			$('#mul').width('830px');
		else if($('#mcontent').width()>620+10)
			$('#mul').width('620px');
		else
			$('#mul').width('410px');
	};
	setheight();
	window.onresize=setheight;
	console.log("you can visit /movielist /visitorlist /video.html /upload.html")
}
