require(['./js/config.js'],function(){
	require(['mui','picker','getuid','moment'],function(mui,picker,getuid,moment){
		console.log(mui,picker);
// 		document.querySelector('#aslideBtn').addEventListener('tap',function(){
// 			mui('.mui-off-canvas-wrap').offCanvas('show');
// 		});
		
		// mui('.mui-off-canvas-wrap').offCanvas('show');
		
		var selectType = document.querySelector('#selectType');
		var selectDate = document.querySelector('#selectDate');
		var muiChart = document.querySelector('.mui-chart');
		var muiBill = document.querySelector('.mui-bill');
		var muiYear = document.querySelector('.mui-year');
		var muiMonth = document.querySelector('.mui-month');
 		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth()+1;
		var picker,dtPicker,paylist,incomelist,classifyArr= [];
		init();
		addEvent();
		function init(){
			picker = new mui.PopPicker();
			picker.setData([{value:'year',text:'年'},{value:'month',text:'月'}]);
			dtPicker = new mui.DtPicker({
				type:'month'
			}); 
		}
		getClassify();
		//获取所有的分类
		function getClassify(){
			getuid(function(uid){
				console.log(uid);
				mui.ajax('/getClassify',{
					dataType:'json',
					data:{
						id:uid
					},
					success:function(data){
						console.log(data);
						if(data.code == 0){
							renderClassify(data.data);
						}
						
					}
				});
			});
		}
		function renderClassify(data){
			var payHtml = '',incomeHtml = '';
			data.forEach(function(v,i){
				classifyArr.push(v.cname);
				if(v.type == 1){
					payHtml += `<li>${v.cname}</li>`;
				} else {
					incomeHtml += `<li>${v.cname}</li>`;
				}
			});
			document.querySelector('#mui-aside-list-pay').innerHTML = payHtml;
			document.querySelector('#mui-aside-list-icome').innerHTML = incomeHtml;
			paylist = [...document.querySelectorAll('#mui-aside-list-pay li')];
			incomelist = [...document.querySelectorAll('#mui-aside-list-icome li')];
			loadbill();
		}
		//渲染账单
		function loadbill(){
			var name = classifyArr.join(',');
			getuid(function(uid){
				mui.ajax('/getbill',{
					dataType:'json',
					data:{
						uid:uid,
						time:selectDate.innerHTML,
						name:name
					},
					success:function(data){
						console.log(data);
						if(data.code ==0){
							renderYear(data.data);
// 							if(type  == 'year'){
// 								rednerYear(data.data);
// 							} else {
// 								
// 							}
						}
						
					}
				});
			});
		}
		function renderYear(data){
			console.log(data);
			var yearObj = {},yearArr =[];
			data.forEach(function(item){
				var time = moment(item.time).format('MM');
				console.log(time);
				if(!yearObj[time]){
					yearObj[time]={
						time:time,
						payTotal:0,
						incomeTotal:0,
						list:[]
					};
				}
				yearObj[time].list.push(item);
				if(item.type == 1){ //支出
					yearObj[time].payTotal += item.money *1;
				} else {
					yearObj[time].incomeTotal += item.money *1;
				}
				console.log(yearObj);
			});
			for(var j in yearObj){
				yearArr.push(yearObj[j])
			}
			console.log(yearArr);
			var yearHtml = '';
			yearArr.forEach(function(v,i){
				yearHtml += `<li class="mui-table-view-cell mui-collapse">
                                <a class="mui-navigate-right" href="#">
                                    <div class="mui-tabel-header-left">
                                        <span class="mui-icon mui-icon-email"></span>
                                        <span>${v.time}月</span>
                                    </div>
                                    <div class="mui-tabel-header-right">
                                        <dl class="pay">
                                            <dt>花费</dt>
                                            <dd>${v.payTotal}</dd>
                                        </dl>
                                        <dl class="income">
                                            <dt>收入</dt>
                                            <dd>${v.incomeTotal}</dd>
                                        </dl>
                                        <dl>
                                            <dt>结余</dt>
                                            <dd>${v.incomeTotal - v.payTotal}</dd>
                                        </dl>
                                    </div>

                                </a>`;
							v.list.forEach(function(bv,bi){
								yearHtml += `<div class="mui-collapse-content">
                                    <ul id="OA_task_1" class="mui-table-view">
                                        <li class="mui-table-view-cell">
                                            <div class="mui-slider-right mui-disabled">
                                                <a class="mui-btn mui-btn-red">删除</a>
                                            </div>
                                            <div class="mui-slider-handle">
                                                <div class="mui-collapse-list ${bv.type == 2? 'mui-collapse-active' :''}">
                                                    <span class="${bv.iname}"></span>
                                                    <div>
                                                        <div>${bv.cname}</div>
                                                        <span>${moment(bv.time).format('MM-DD')}</span>
                                                    </div>
                                                    <span>￥${bv.money}</span>
                                                </div>
                                            </div>  
										</li>
                                    </ul>
                                </div>`;
							});
                                
                                    
                            yearHtml += `</li>`;
			})
			document.querySelector('#mui-year').innerHTML = yearHtml;
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
						muiMonth.style.display = 'none';
						muiYear.style.display = 'block';	
					} else if(selectItems[0].value == 'month'){
						nowMonth = nowMonth < 10 ? '0' + nowMonth * 1 : nowMonth;
						selectDate.innerHTML = nowYear + '-' + nowMonth;
						titleM.style.display = 'inline-block';
						titleY.style.width = '50%';
						pickerM.style.display = 'inline-block';
						pickerY.style.width = '50%';
						muiMonth.style.display = 'block';
						muiYear.style.display = 'none';
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
			
			//点击tab
			mui('#muiTabBtns').on('tap','span',function(){
				if(this.innerHTML == '账单'){
					this.classList.add('active');
					muiChart.classList.add('none');
					muiBill.classList.remove('none');
					this.nextElementSibling.classList.remove('active');
				} else {
					muiBill.classList.add('none');
					muiChart.classList.remove('none');
					this.classList.add('active');
					this.previousElementSibling.classList.remove('active');				}
			});
			
			//点击加号
			document.querySelector('#box').addEventListener('tap',function(){
				location.href = './page/add_bill.html'
			})
			//点击展示侧边栏
			document.querySelector('#mui-aslide').addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas().show();
			})
			//点击全部支出收入
			mui('#mui-aside-list').on('tap','li',function(){
				var type = this.dataset.type;
				var list = type == 'pay' ? paylist : incomelist;
// 				if(type == 'pay'){ //支出
// 					var paylist = document.
// 				} else if(type == 'income'){ //收入
// 					
// 				}
				this.classList.toggle('asideActive');
				if(this.classList.contains('asideActive')){
					list.forEach(function(v,i){
						v.classList.add('asideActive');
					})
				} else {
					list.forEach(function(v,i){
						v.classList.remove('asideActive');
					})
				}
			})
			//点击全部支出
			mui('#mui-aside-list-pay').on('tap','li',function(){
				this.classList.toggle('asideActive');
				var bool = paylist.every(function(v,i){//&& 
					return v.classList.contains('asideActive')
				});
				if(bool){
					document.querySelector('[data-type="pay"]').classList.add('asideActive');
				} else {
					document.querySelector('[data-type="pay"]').classList.remove('asideActive');
				}
			});
			
			//点击全部收入
			mui('#mui-aside-list-icome').on('tap','li',function(){
				this.classList.toggle('asideActive');
				var bool = incomelist.every(function(v,i){//&& 
					return v.classList.contains('asideActive')
				});
				if(bool){
					document.querySelector('[data-type="income"]').classList.add('asideActive');
				} else {
					document.querySelector('[data-type="income"]').classList.remove('asideActive');
				}
			});
		}
		 
		
		
	})
})