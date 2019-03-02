require(['../js/config.js'],function(){
	require(['mui','picker','getuid'],function(mui,picker,getuid){
// 		var gallery = mui('.mui-slider');
// 			gallery.slider({
// 			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
// 			});
		var year = new Date().getFullYear();
		var month = new Date().getMonth() + 1;
		var date = new Date().getDate();
		var type = 1,time = year + '-' + month + '-' +date;
		document.querySelector('#mui-time').innerHTML = month + '月' + date + '日';
		var dtPicker = new mui.DtPicker({
			type:'date'
		}); 
			init();
		function init(){
			getClass();
			
			
			
		}	
		
		function getClass(){
			getuid(function(uid){
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
						html += `<dl data-cid=${val._id}>
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
			var sliderGroup = document.querySelector('#mui-slider-group');
			mui('#mui-slider-group').on('tap','dl',function(){
				var dls = [...document.querySelectorAll('dl')];
				dls.forEach(function(v,i){
					v.classList.remove('active');
				})
				this.classList.add('active');
			});
			//点击tab
			var spans = [...document.querySelector('#mui-bill-tab').querySelectorAll('span')];
			mui('#mui-bill-tab').on('tap','span',function(){
				sliderGroup.innerHTML  = '';
				spans.forEach(function(v,i){
					v.classList.remove('active');
				});
				this.classList.add('active');
				
				type = this.dataset.id;
				init();
			});
			
			//点击日期
			document.querySelector('#mui-bill-time').addEventListener('tap',function(){
				 dtPicker.show(function (selectItems) { 
					console.log(selectItems);//{text: "2016",value: 2016} 
					console.log(selectItems.m);//{text: "05",value: "05"} 
					time = selectItems.value;
					document.querySelector('#mui-time').innerHTML = selectItems.m.text +'月'+ selectItems.d.text+'日';
				})
			});
			//点击键盘
			var money = document.querySelector('#mui-bill-money');
			mui('#mui-keycode').on('tap','li',function(){
				var txt = this.innerHTML;
				var val = money.value;
				
				if(txt == 'X'){
					money.value = money.value.substr(0,val.length-1);
					if(money.value.length == 0){
						money.value = '0.00';
					}
					return;
				}
				
				
				if(val == '0.00' && txt !='.'){
					money.value = txt;
				} else if(val == '0' && txt != '.'){
					money.value = txt;
				} else if((val.indexOf('.') != -1 && txt == '.') || (val.indexOf('.') != -1 && val.split('.')[1].length == 2)){
					money.value = val;
				} else {
					money.value += txt;
				}
			});
			//点击完成
			document.querySelector('.mui-sure').addEventListener('tap',function(){
				Money = money.value; 
				var dl = sliderGroup.querySelector('.active');
				var iname = dl.querySelector('dt').className;
				var cname = dl.querySelector('dd').innerHTML;
				var cid = dl.dataset.cid;
				getuid(function(uid){
					mui.ajax('/addbill',{
						dataType:'json',
						data:{
							type:type,
							money:Money,
							iname:iname,
							cname:cname,
							cid:cid,
							uid:uid,
							time:time
						},
						type:'post',
						success:function(data){
							
							console.log(data);
							if(data.code == 0){
								location.href = '../index.html';
							}
						}
					});
				});
				console.log(iname,cname,cid);
			})
		}
		
	})
});