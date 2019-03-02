define(function(){
	var getUid = function(fn){
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
							fn(uid);
						}
					}
				});
			} else {
				console.log(uid);
				fn(uid)
			}
	}
	return getUid;
});