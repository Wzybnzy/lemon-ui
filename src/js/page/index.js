require(['./js/config.js'],function(){
	require(['mui','picker'],function(mui,picker){
		console.log(mui,picker);
// 		document.querySelector('#aslideBtn').addEventListener('tap',function(){
// 			mui('.mui-off-canvas-wrap').offCanvas('show');
// 		})
		var selectType = document.querySelector('#selectType');
		var selectDate = document.querySelector('#selectDate');
		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth() + 1;
		var picker,dtPicker;
		init();
		function init(){
			var offCanvasInner = document.querySelector('.mui-inner-wrap');  
			offCanvasInner.addEventListener('drag', function(event) {  
				event.stopPropagation();  
			}); 
			picker = new mui.PopPicker();
			picker.setData([{value:'year',text:'年'},{value:'month',text:'月'}]);
			dtPicker = new mui.DtPicker({
				type:'month'
			}); 
			
		}
		
		
		addEvent();
		function addEvent(){
			selectType.addEventListener('tap',function(){
				 picker.show(function (selectItems) {
					selectType.innerHTML = selectItems[0].text;
					if(selectItems[0].text == '年'){
						selectDate.innerHTML = nowYear;
					} else {
						nowMonth = nowMonth < 10 ? '0'+ nowMonth*1 : nowMonth * 1;
						selectDate.innerHTML = nowYear + '-' + nowMonth;
					}
					console.log(selectItems);//智子
					console.log(selectItems[0].value);//zz 
				  })
			});
			//点击年月
			selectDate.addEventListener('tap',function(){
				dtPicker.show(function (selectItems) { 
					console.log(selectItems.y);//{text: "2016",value: 2016} 
					console.log(selectItems.m);//{text: "05",value: "05"} 
				})
			})
		}
		
		
	})
})