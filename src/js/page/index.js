require(['./js/config.js'],function(){
	require(['mui','picker'],function(mui,picker){
		console.log(mui,picker);
// 		document.querySelector('#aslideBtn').addEventListener('tap',function(){
// 			mui('.mui-off-canvas-wrap').offCanvas('show');
// 		});
		
		// mui('.mui-off-canvas-wrap').offCanvas('show');
		
		var selectType = document.querySelector('#selectType');
		var selectDate = document.querySelector('#selectDate');
		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth()+1;
		var picker,dtPicker;
		init();
		addEvent();
		function init(){
			picker = new mui.PopPicker();
			picker.setData([{value:'year',text:'年'},{value:'month',text:'月'}]);
			dtPicker = new mui.DtPicker({
				type:'month'
			}); 
		}
		
		function addEvent(){
			selectType.addEventListener('tap',function(){
				picker.show(function (selectItems) {
					selectType.innerHTML = selectItems[0].text;
					var titleY = document.querySelector('[data-id="title-y"]');
					var titleM = document.querySelector('[data-id="title-m"]');
					var pickerY = document.querySelector('[data-id="picker-y"]');
					var pickerM = document.querySelector('[data-id="picker-m"]');
					if(selectItems[0].value == 'year'){
						selectDate.innerHTML = nowYear;
						titleM.style.display = 'none';
						titleY.style.width = '100%';
						pickerM.style.display = 'none';
						pickerY.style.width = '100%';
					} else if(selectItems[0].value == 'month'){
						nowMonth = nowMonth < 10 ? '0' + nowMonth * 1 : nowMonth;
						selectDate.innerHTML = nowYear + '-' + nowMonth;
						titleM.style.display = 'inline-block';
						titleY.style.width = '50%';
						pickerM.style.display = 'inline-block';
						pickerY.style.width = '50%';
					}
				 })
			});
			//点击日期
			selectDate.addEventListener('tap',function(){
				 dtPicker.show(function (selectItems) { 
					console.log(selectItems.y);//{text: "2016",value: 2016} 
					console.log(selectItems.m);//{text: "05",value: "05"} 
					if(selectType.innerHTML == '年'){
						selectDate.innerHTML = selectItems.y.text ;
					} else if(selectType.innerHTML == '月'){
						selectDate.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
					}
				})
			})
			
		}
		 
		
		
	})
})