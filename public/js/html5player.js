window.addEventListener('load',function(){
			var playerbox,vid,playpausebtn,progress,progressleft,time,current,duration,html5playercontrolbar,fullscreen,mute,volume,volumeleft;
			var userAgent =navigator.userAgent;
			var myBrowser =userAgent.indexOf('Edge')>-1? 'Edge':(userAgent.indexOf('Opera')>-1?'Opera':(userAgent.indexOf('Chrome')>-1?'Chrome':(userAgent.indexOf('.NET')>-1?'Ie':(userAgent.indexOf('Mozilla')>-1?'Firefox':'other'))));
			playerbox=document.getElementById('html5playerbox');
			vid=document.getElementById('html5player');
			playpausebtn=document.getElementById('playpausebtn');
			progress=document.getElementById('progress');
			progressleft=document.getElementById('progress-left');
			time=document.getElementById('time');
			current=document.getElementById('current');
			duration=document.getElementById('duration');
			html5playercontrolbar=document.getElementById('html5playercontrolbar');
			fullscreen=document.getElementById('fullscreen');
			mute=document.getElementById('mute');
			volume=document.getElementById('volume');
			volumeleft=document.getElementById('volumeleft');


			//html5playercontrolbar event
			html5playercontrolbar.addEventListener('click',function(event){
				event.stopPropagation();
			},false);

			// play pause function
			function playpause(){
				if(vid.paused){
					vid.play()
					playpausebtn.getElementsByTagName('path')[0].setAttribute('d','M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z');
				}else{
					vid.pause();
					playpausebtn.getElementsByTagName('path')[0].setAttribute('d','M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z');
				}
			};
			//time function
			function formatTime(second){
				var min=parseInt(second/60);
				var sec=parseInt(second)%60>9?parseInt(second)%60:'0'+parseInt(second)%60;
				return min+':'+sec
			};
			//play&pause btn event
			playpausebtn.addEventListener('click',function(event){
				event.stopPropagation();
				if(vid.paused){
					vid.play();
					playpausebtn.getElementsByTagName('path')[0].setAttribute('d','M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z')
				}else{
					vid.pause()
					playpausebtn.getElementsByTagName('path')[0].setAttribute('d','M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z');
				}
			},false);
			//box event
			playerbox.addEventListener('click',playpause,false)
			var timer='';
			playerbox.addEventListener('mousemove',function(){
				html5playercontrolbar.style.display='';
				clearTimeout(timer);
				document.onkeydown=function(event){
					var e=event;
					if(e && e.keyCode==32){
						playpause();
					}
					if(e&& e.keyCode==37){
						vid.currentTime=vid.currentTime<5?0:vid.currentTime-5;
					}
					if(e&& e.keyCode==39){
						vid.currentTime=vid.duration-vid.currentTime<5?vid.duration:vid.currentTime+5;
						vid.currentTime==vid.duration && playpausebtn.getElementsByTagName('path')[0].setAttribute('d','M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z');
					}
					if(e.keyCode ==38){
						vid.volume=1-vid.volume<0.08?1:vid.volume+0.08;
						volumeleft.style.width=vid.volume*100+'%';
						mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10 7.98,10 l 0,0 Z');//mute.getElementsByTagName('path')[1].style.display='none'
						vid.muted=false;
					}
					if(e.keyCode ==40){
						vid.volume=vid.volume<0.08?0:vid.volume-0.08;
						if(vid.volume==0)
							mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z');//mute.getElementsByTagName('path')[1].style.display='block'
						volumeleft.style.width=vid.volume*100+'%';
					}
					e.preventDefault();
				};
				timer=setTimeout(function(){
					html5playercontrolbar.style.display='none';
				},5000);
			},false);
			playerbox.addEventListener('mouseout',function(){
				document.onkeydown='';
			},false);

			//progress event
			progress.addEventListener('click',function(event){
				event.stopPropagation();
				var width=progress.offsetWidth;
				var left=event.offsetX;
				progressleft.style.width=left/width*100+'%';;
				vid.currentTime=vid.duration*left/width;
			},false);

			//video event
			vid.oncanplay=function(){
				duration.innerHTML=formatTime(vid.duration);
				current.innerHTML=formatTime(0);
			};
			vid.oncanplaythrough=vid.oncanplay;
			vid.ondurationchange=function(){
				duration.innerHTML=formatTime(vid.duration);
				current.innerHTML=formatTime(0);
			};
			vid.addEventListener('timeupdate',function(){
				var left=vid.currentTime/vid.duration*100;
				progressleft.style.width=left+'%';
				current.innerHTML=formatTime(vid.currentTime);
				if(vid.currentTime==vid.duration){
					vid.pause();
					playpausebtn.getElementsByTagName('path')[0].setAttribute('d',"M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z");
				}
			},false);
			vid.addEventListener('loadeddata',function(event){
				if(!vid.poster){
					vid.play()
					setTimeout(function(){
						vid.pause()
					},500)
				}
			},false)

			// fullscreen btn event
			var Ds=['m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z','m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z','m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z','M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z','m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z','m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z','m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z','m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z'];
			fullscreen.addEventListener('click',function(event){
				if(document.msFullscreenElement!=null || document.webkitIsFullScreen || document.mozFullScreen){
					//this.getElementsByTagName('svg')[1].style.display='none';
					//this.getElementsByTagName('svg')[0].style.display='block';
					var paths=fullscreen.getElementsByTagName('path');
					for(var i=0;i<4;i++){
						paths[i].setAttribute('d',Ds[i]);
					}
					if(document.msExitFullscreen){
						document.msExitFullscreen();
					}
					if(document.webkitCancelFullScreen){
						document.webkitCancelFullScreen();
					}
					if(document.mozCancelFullScreen){
						document.mozCancelFullScreen();
					}
				}else{
					//this.getElementsByTagName('svg')[0].style.display='none';
					//this.getElementsByTagName('svg')[1].style.display='block';
					var paths=fullscreen.getElementsByTagName('path');
					for(var i=0;i<4;i++){
						paths[i].setAttribute('d',Ds[i+4]);
					}
					if(vid.webkitRequestFullScreen){//edge chrome
						vid.parentNode.webkitRequestFullScreen();
					}
					if(vid.mozRequestFullScreen){//firefox
						vid.parentNode.mozRequestFullScreen();
					}
					if(vid.msRequestFullscreen){//ie
						vid.parentNode.msRequestFullscreen();
					}
				}
				event.stopPropagation();
			},false);
			window.onresize=function(){
				if(document.msFullscreenElement!=null || document.webkitIsFullScreen || document.mozFullScreen){
					//fullscreen.getElementsByTagName('svg')[0].style.display='none';
					//fullscreen.getElementsByTagName('svg')[1].style.display='block';
					var paths=fullscreen.getElementsByTagName('path');
					for(var i=0;i<4;i++){
						paths[i].setAttribute('d',Ds[i+4]);
					}
				}else{
					//fullscreen.getElementsByTagName('svg')[1].style.display='none'
					//fullscreen.getElementsByTagName('svg')[0].style.display='block'
					var paths=fullscreen.getElementsByTagName('path');
					for(var i=0;i<4;i++){
						paths[i].setAttribute('d',Ds[i]);
					}
				}
			};

			//mute btn event
			mute.addEventListener('click',function(){
				if(vid.muted){
					vid.muted=false;
					//mute.getElementsByTagName('path')[1].style.display='none';
					mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10 7.98,10 l 0,0 Z');
					//console.log(vid.volume);
					volumeleft.style.width=vid.volume*100+'%';
				}else{
					vid.muted=true;
					mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z');
					//mute.getElementsByTagName('path')[1].style.display='block';
					volumeleft.style.width=0+'px';
				}
			},false);
			//volume bar event
			vid.volume=0.58;
			volume.addEventListener('click',function(event){
				var width=volume.offsetWidth;
				var left=event.offsetX;
				volumeleft.style.width=left+'px';
				if(left==0){
					//mute.getElementsByTagName('path')[1].style.display='block'
					mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z');
				}else{
					vid.muted=false;
					mute.getElementsByTagName('path')[1].setAttribute('d','M 9.25,9 7.98,10 7.98,10 l 0,0 Z');
				}
				vid.volume=left/width;
			},false)

			//消除浏览器默认
			for(var item=0;item<document.getElementsByTagName('button').length;item++){
				document.getElementsByTagName('button')[item].onkeydown=function(){
					return false;
				};
			}
		},false);