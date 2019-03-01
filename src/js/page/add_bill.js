require(['../js/config.js'],function(){
	require(['mui'],function(mui){
// 		var gallery = mui('.mui-slider');
// 			gallery.slider({
// 			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
// 			});
		var type = 1;
			init();
		function init(){
			var uid = localStorage.getItem('uid') || '';
			if(!uid){
				mui.ajax('/adduser',{
					dataType:'json',
					type:'post',
					data:{
						name:'小红'
					},
					success:function(data){
						console.log(data);
						if(data.code == 0){
							localStorage.setItem('uid',uid);
							uid = data.uid;
							getClass(uid);
						}
					}
				});
			} else {
				console.log(uid);
				getClass(uid)
			}
			
		}	
		
		function getClass(uid){
			console.log(uid);
			mui.ajax('/getClassify',{
				dataType:'json',
				data:{
					id:uid,
					type:type
				},
				success:function(data){
					console.log(data);
					if(data.code == 0){
						render(data.data);
					}
				}
			});
		}
		
		function render(data){
			var html  ='';
			var num = Math.ceil(data.length / 8);
			var arr = [];
			for(var i = 0; i< num;i++){
				arr.push(data.splice(0,8));
			}
			// [[8][4]]
			arr.forEach(function(v,i){
				html += `<div class="mui-slider-item">
						<div class="mui-slider-list">`;
					v.forEach(function(val,key){
						html += `<dl>
								<dt class="${val.iname}"></dt>
								<dd>${val.cname}</dd>
							</dl>`;
					});
							
						html += `</div>
					</div>`;
			});
			document.querySelector('#mui-slider-group').innerHTML = html;
			var gallery = mui('.mui-slider');
				gallery.slider({
				  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			var sliderGroup = document.querySelector('#mui-slider-group');
			var lastChildSlide = sliderGroup.lastChild;
			var len = lastChildSlide.querySelectorAll('dl').length;
			console.log(len);
			if(len == 8){
				sliderGroup.innerHTML += `<div class="mui-slider-item">
						<div class="mui-slider-list">
							<dl>
								<dt class="mui-icon mui-icon-plusempty"></dt>
								<dd>自定义</dd>
							</dl>
						</div>
						</div`;
			} else {
				lastChildSlide.children[0].innerHTML += `<dl>
								<dt class="mui-icon mui-icon-plusempty"></dt>
								<dd>自定义</dd>
							</dl>
				`;
			}
		}
		addEvent();
		function addEvent(){
			
			mui('#mui-slider-group').on('tap','dl',function(){
				var dls = [...document.querySelectorAll('dl')];
				dls.forEach(function(v,i){
					v.classList.remove('active');
				})
				this.classList.add('active');
			});
			//点击tab
			mui('#mui-bill-tab').on('tap','span',function(){
				type = this.dataset.id;
				init();
			});
		}
		
	})
});