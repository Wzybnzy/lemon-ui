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
			for(var i =0;i<data.length;i++){
				arr.push(data.splice(0,15));
			}
			var html = '';
			arr.forEach(function(v,i){
				html += `<div class="mui-slider-item">
						<div>`;
					v.forEach(function(val,key){
						html += `<div>
								<span class="${val.icon}">
							</div>`;
					});		
						html +=`</div>	
					</div>`;
			});
			document.querySelector('#mui-slider-group').innerHTML = html;
			var gallery = mui('.mui-slider');
			gallery.slider({
			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			console.log(arr);
		}
	});
});