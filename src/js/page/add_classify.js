require(['../js/config.js'],function(){
	require(['mui'],function(mui){
		console.log(mui);
		init();
		function init(){
			mui.ajax('/iconlist',{
				dataType:'json',
				success:function(data){
					console.log(data);
					if(data.code == 0){
						render(data.data);
					}
				}
			});
		}
		function render(data){
			console.log(data);// [] 17 
			var num = Math.ceil(data.length / 15);
			// [[15],[2]]
			var arr = [];
			for(var i =0;i<num;i++){
				arr.push(data.splice(0,15));
			}
			var html = '';
			arr.forEach(function(v,i){
				html += `<div class="mui-slider-item">
						<div>`;
					v.forEach(function(val,key){
						html += `<div >
								<span class="${val.icon}" data-name="${val.icon}">
							</div>`;
					});		
						html +=`</div>	
					</div>`;
			});
			document.querySelector('#mui-slider-group').innerHTML = html;
			var gallery = mui('.mui-slider');
			gallery.slider({
			  // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
		addEvent();
		function addEvent(){
			//点击所有的icon
			mui('#mui-slider-group').on('tap','span',function(){
				var name = this.dataset.name;
				document.querySelector('#addClassify').className = name;
			});
			//点击保存
			document.querySelector('#btnClassify').addEventListener('tap',function(){
				var cname = document.querySelector('#Classifyname').value,
					iname = document.querySelector('#addClassify').className,
					type = 1;
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
									uid = data.uid;
									localStorage.setItem('uid',uid);
								}
							}
						});
					}
					
					//添加分类
					
					mui.ajax('/addClassify',{
						dataType:'json',
						type:'post',
						data:{
							uid:uid,
							type:type,
							iname:iname,
							cname:cname
						},
						success:function(data){
							if(data.code == 0){
								location.href = './add_bill.html';
							}
						}
					});
					console.log(cname,iname);
					
			})
		}
	});
});