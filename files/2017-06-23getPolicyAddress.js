
//通过省 得到全国寄送地址的  市
function getProAddress(){
	var ctx = $("#ctx").val();
	var pro = $("#proAddrAll").val()+"00";
	
	if(pro=="11000000"||pro=="12000000"||pro=="50000000"||pro=="31000000"){
		$("#ifCityNo").remove();
		$.ajax({
			url:ctx+"/carProposal/address/getCountry",
			data:{
	    		channelNo:$("input[name='head.channelNo']").val(),
				proSelected:$("#proSelected").val(),
				citySelected:$("#citySelected").val(),
				isRenewal:$("input[name='carInfo.isRenewal']").val(),
				ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
				enrolldate:$("input[name='carInfo.enrollDate']").val(),
				startdate:$("input[name='carInfo.startDateSY']").val(),
				xubaocomcode:"",
				targetCity:pro,
				sessionId:$("#sessionId").val()
			},
			type:'post',
			async:false,
			dataType:'json',
			success: function(data) {
				var json = data.message;
				json = eval("("+json+")");
				var country = "<option value='0'>请选择</option>";
					for(var i=0; i<(json.body.areaList).length; i++){
						country = country + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
						if($("input[name='carInfo.deliverInfoDistrict']").val()==json.body.areaList[i].code){
							$(".input_tips").html(json.body.areaList[i].message)
						}
					}
				$("input[name='carInfo.queryCityCode']").val(pro);
				$("#deliverInfoDistrict").html(country)
				$("input[name='carInfo.deliverInfoPro']").val($("#proAddrAll").val());
			}
		});
		return false;
	}
	
	$.ajax({
		url:ctx+"/carProposal/address/getCity",
		data:{
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			isRenewal:$("input[name='carInfo.isRenewal']").val(),
			ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
			enrolldate:$("input[name='carInfo.enrollDate']").val(),
			startdate:$("input[name='carInfo.startDateSY']").val(),
			xubaocomcode:"",
			targetProvince:pro,
			sessionId:$("#sessionId").val()
			},
		type:'post',
		async:false,
		dataType:'json',
		success: function(data) {
			var json = data.message;
			json = eval("("+json+")");
			
			var cityAddrAll = "<option value='0'>请选择</option>";
			for(var i=0; i<(json.body.areaList).length; i++){
				cityAddrAll = cityAddrAll + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
			}
			if(pro=="11000000"||pro=="12000000"||pro=="50000000"||pro=="31000000"){
				$("#ifCityNo").remove();
				$("#deliverInfoDistrict").html(cityAddrAll);
			}else{
				if($("#ifCityNo").length==0){
					$("<label id='ifCityNo'><select id='cityAddrAll' onchange='getCityAddress()'></select></label>").insertBefore("#ifcountyNo");
				}
				$("#cityAddrAll").html(cityAddrAll);
				$("#deliverInfoDistrict").html("<option value='0'>请选择</option>")
			}
			
			$("input[name='carInfo.deliverInfoPro']").val($("#proAddrAll").val())
			if(pro=="46000000"){
				$("#ifcountyNo").remove()
			}
			if($("#ifcountyNo").length==0&&pro!="46000000"){
				$("#ifCityNo").after("<label id='ifcountyNo'><select style='width: 95%' id='deliverInfoDistrict' onchange='showMsg()'><option>请选择</option></select></label>");
			}
		}
	});
}
//得到区县
function getCityAddress(){
	var ctx = $("#ctx").val();
	var pro = $("#proAddrAll").val()+"00";
	var city = $("#cityAddrAll").val()+"00";
	if(pro=="46000000"){
		$("input[name='carInfo.deliverInfoCity']").val($("#cityAddrAll").val())
		return false;
	}
	$.ajax({
		url:ctx+"/carProposal/address/getCountry",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			isRenewal:$("input[name='carInfo.isRenewal']").val(),
			ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
			xubaocomcode:"",
			targetCity:city,
			enrolldate:$("input[name='carInfo.enrollDate']").val(),
			startdate:$("input[name='carInfo.startDateSY']").val(),
			sessionId:$("#sessionId").val()
		},
		type:'post',
		async:false,
		dataType:'json',
		success: function(data) {
			var json = data.message;
			json = eval("("+json+")");
			var country = "<option value='0'>请选择</option>";
				if((json.body.areaList).length=="0"){
					$("#ifcountyNo").remove()
				}
				for(var i=0; i<(json.body.areaList).length; i++){
					country = country + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
					if($("input[name='carInfo.deliverInfoDistrict']").val()==json.body.areaList[i].code){
						$(".input_tips").html(json.body.areaList[i].message)
					}
				}
			$("input[name='carInfo.queryCityCode']").val(city);
			$("#deliverInfoDistrict").html(country)
			$("input[name='carInfo.deliverInfoCity']").val($("#cityAddrAll").val())
		}
	});
}