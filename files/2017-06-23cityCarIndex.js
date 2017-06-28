$(function(){
	if (window.navigator.geolocation) {
		var options = {
				enableHighAccuracy: true,
		};
		window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
	} else {
		//alert("浏览器不支持html5来获取地理位置信息");							
	}
	
	function handleSuccess(position){
	    // 获取到当前位置经纬度  本例中是chrome浏览器取到的是google地图中的经纬度
	    var lng = position.coords.longitude;
	    var lat = position.coords.latitude;
	    
	    // 调用百度地图api显示
	    var gc = new BMap.Geocoder();
		var point = new BMap.Point(lng, lat);
		
		// 获取定位城市
	    gc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			var city = addComp.city;					
			var cityCode="";					
			if(city!="福州市区"){
				city = city.replace("市", "");
			}
			if(city.indexOf("福州")>-1){
				city="福州市区";
			}
			if(city=="晋江" || city=="石狮"){
				city="晋江石狮";
			}
			if(city!=""){
				$("#city_picker").val(city);
			}else{
				$("#city_picker").val("");
			}
		});
	}

	function handleError(error){
		//
	}
});
function getCity() {
	var cityVal = $("#city_picker").val();
	var flag = 0;
	for (i = 0; i < cities.length; i++) {
		if (cityVal == cities[i][2]) {
			$("input[name='proSelected']").val(cities[i][0]);
			$("input[name='citySelected']").val(cities[i][1]);
			if($("input[name='citySelectedName']")) $("input[name='citySelectedName']").val(cities[i][2]);
			flag = 1;
		}
	}
	//单列市
	if ("2102,3302,3502,3702,4403,3302".indexOf($("input[name='citySelected']")
			.val().substring(0, 4)) > -1) {
		$("input[name='proSelected']").val(
				$("input[name='citySelected']").val());
	}
	if ($("#city_picker").val() == "") {
		$(".city_error").text("请输入城市！");
		return false;
	}
	if (flag == 0) {
		$(".city_error").text("请输入正确的城市！");//增加
		return false;
	}
	$(".city_error").text("");
	return true;
}
function validateCity(){
	//如果是嘉兴地区，要显示机构码WAP-5499
//	var cityVal = $("#city_picker").val();
//	for (i = 0; i < cities.length; i++) {
//		if (cityVal == cities[i][2]) {
//			$("input[name='proSelected']").val(cities[i][0]);
//			$("input[name='citySelected']").val(cities[i][1]);
//		}
//	}
//	if($("input[name='citySelected']").val()=="33040000" &&  cityVal!=""){
//		$("#JXcomcode").show();
//	}else{
//		$("#comcodeErr").html("");
//		$("#JXcomcode").hide();
//	}
	$(".city_error").text("");
}
var flag = 1;//标示如果是嘉兴地区，是否是第一次点击报价
$(function() {
	
	var city_picker = $('#city_picker');
	resize_hot_city();

	city_picker.focus(function(){
		$(".city_error").text("");
		$(".hot_city").fadeIn();
	});
	city_picker.blur(function(){
		$(".hot_city").fadeOut();
	});

	$(".hot_city a").click(function() {
		if(!$(this).is($(".hot_city_ico"))){
			$(this).parent("div").fadeOut();
			city_picker.val($(this).html()).blur();
		}
		return false;
	});	
	//提交绑定事件
	$("#productCarSubmit").click(function() {
		if($("input[name='citySelected']").val()=="33040000" &&  $("#city_picker").val()!="" && flag==1 && $(".hot_city").is(":visible")){
			flag = 2;
			return false;
		}
		if($("#comcode").val()!="" && $("#comcode").is(":visible")){
			if(!checkComcode()){
				return false;
			}
		}
		else if (!getCity()) {
			return false;
		}
		
		//WD code
		if (window.GridsumWebDissector) {
			var _gsTracker = GridsumWebDissector.getTracker('GWD-002236');
			_gsTracker.track('/targetpage/chexian/quote.html');
		}
		if($("#jchGroupBuyId").val() != "" && $("#jchGroupBuyId").val() != undefined){
			if (window.GridsumWebDissector) {
				var _gsTracker = GridsumWebDissector.getTracker('GWD-002236');
				_gsTracker.track('/targetpage/chexian/quote.html');
			}
			//若是交叉销售需要记录下当前连接传递到下一个页面，下一个页面app使用回退时要转到这个连接上
			var jchURL = window.location.href;
			jchURL = jchURL.replace(/&/g,"%26");
			window.location.href = "/wap/carProposal/ZCarProposal/groupbuy?channelNo=1&cityCode="+$("input[name='citySelected']").val()+"&jchURL="+jchURL+"&machineID="+$("input[name='carInfo.machineID']").val();
			return null;
		}
		//<!-- 北京分公司亿玛DSP检测代码部署 -->
		var dspParam=getUrlParam("cmpid")==null?"":getUrlParam("cmpid");
		$("#cmpid").val(dspParam);
		if($("input[name='citySelected']").val()=="11000000" && dspParam.indexOf('8di')>=0){
			_adwq.push(['_trackPageview']); 
		}
		//北京分公司悠易DSP代码部署
		if($("input[name='citySelected']").val()=="11000000" && dspParam.indexOf('11ds')>=0){
			YoRegTrack();
		}
		var form = $("#form");
		form.submit();
	})
	var cityData;
	$.ajax({
		type : 'get',
		url : '/wap/js/citySelect/cityCar.json',
		dataType : 'json',
		success : function(data) {
			cityData = data;
				if($("#carCityCode").val() != "" && $("#carCityCode").val() != undefined){		//交叉销售人员有指定城市时禁止选择其他地区
					var cityCode = carCityCode + "00";
					var cityName = null;

					for(var i=0;i<cityData.length;i++ ){
						if(cityData[i].id == cityCode){
							cityName = cityData[i].value;
							break;
						}
					}
					
					if(cityName != null){
						$("#city_picker").val(cityName);
						$("#city_picker").attr("disabled","disabled");
					}
					return null;
				}

			$("#city_picker").autocomplete({
				'source' : cityData,
				'select' : function(event, ui) {
					$("input[name='citySelected']").val(ui.id);
				}
			});
		}
	});
	var secondRenewalFlag = "";		//标志位
	//一键续保数据
    $("#renewalSubmit").click(function() {
    	var dspParam=getUrlParam("cmpid")==null?"":getUrlParam("cmpid");
    	$("#form1 #cmpid").val(dspParam);
    	if($("input[name='citySelected']").val()=="11000000" && dspParam.indexOf('8di')>=0){
			_adwq.push(['_trackPageview']); 
		}
		//北京分公司悠易DSP代码部署
		if($("input[name='citySelected']").val()=="11000000" && dspParam.indexOf('11ds')>=0){
			YoRegTrack();
		}
    	//Gridsum Web Dissector量化代码部署方案
    	if(window.GridsumWebDissector){
    		var _gsTracker =GridsumWebDissector.getTracker('GWD-002236');
    		_gsTracker.track('/targetpage/chexian/xubao.html');
    	}
    	if(!checkLicenseNo()){
	    	return false;
    	}
    	//校验是否为空	
		$tokenNo=removeAllSpace($("#proposalNoOrIdenfyNo").val());
		if($tokenNo =='' || $tokenNo =='请输入保单号或证件号'){
			$(".city_error2").text("请输入被保险人证件号或上年保单号！");
			return false;	
		}
    	//根据P字头区分证件号、保单号
		$head=$("#proposalNoOrIdenfyNo").val().substring(0,1);
		if($head!="P"){
			if(checkIdenfyNumber())
			{
				var citySelected = $("#citySelected").val();
				secondRenewalFlag = queryRenewal(citySelected, secondRenewalFlag);
			}
		}else{
			if(checkPolicyNo()){
				var citySelected = $("#citySelected").val();
				secondRenewalFlag = queryRenewal(citySelected, secondRenewalFlag);
			}
		}
    });
    //车牌号校验
    $("#licenseNo_show").focus(function(){
	}).change(function(){	//onchange 方法，还缺几个
		$("#licenseNo_show").val( $("#licenseNo_show").val().toUpperCase()); // 车牌号转换成大写
	}).keydown(function(){
		enterToTab();
	}).keyup(function(){
		$("#licenseNo_show").val( $("#licenseNo_show").val().toUpperCase()); // 车牌号转换成大写
	}).blur(function(){
		checkLicenseNo();
	});
    
    //证件或保单号校验
    $("#proposalNoOrIdenfyNo").focus(function(){
	}).blur(function(){
		$(this).val(trimAll($(this).val()));
		//校验是否为空	
		$tokenNo=removeAllSpace($("#proposalNoOrIdenfyNo").val());
		if($tokenNo ==''||$tokenNo =='请输入保单号或证件号'){
			$(".city_error2").text("请输入被保险人证件号或上年保单号！");
			return false;	
		}
		//根据P字头区分证件号、保单号
		$head=$("#proposalNoOrIdenfyNo").val().substring(0,1);
		if($head!="P"){
			checkIdenfyNumber();
		}else{
			checkPolicyNo();
		}
	}).change(function(){
		//去空 P或者 p
    	$policyNo = trim($("#proposalNoOrIdenfyNo").val());
		$head=$policyNo.substring(0,1);
		if($head=="P" || $head=="p"){	//校验保单号
			$("#proposalNoOrIdenfyNo").val($("#proposalNoOrIdenfyNo").val().toUpperCase()); // 保单号转换成大写
		}
	}).keydown(function(){
		enterToTab();
	}).keyup(function(){
		//去空 P或者 p
    	$policyNo = trim($("#proposalNoOrIdenfyNo").val());
		$head=$policyNo.substring(0,1);
		if($head=="P" || $head=="p"){	//校验保单号
			$("#proposalNoOrIdenfyNo").val($("#proposalNoOrIdenfyNo").val().toUpperCase()); // 保单号转换成大写
		}
	});
    
    emailIsNull();
});
function emailIsNull(){
	if($("#ccaID1").val()!=""){
		if($("#AppliEmail").val()!=""){
	    	$("#AppliEmail").attr("disabled","disabled");
	    }
	    else if($("#AppliEmail").val()==""){
	    	$("#AppliEmail").attr("disabled",false);
	    }
	}
}
function removeAllSpace(str){   
    var localString = '';   
    for(var index = 0; index<str.length; index++)   
        if(str.charCodeAt(index)!= 32){   
            localString += str.charAt(index);   
        }  
    return localString;   
}
function checkLicenseNo(){
	var LicenseNo = $("#licenseNo_show").val();
	if(trim(LicenseNo)== ""){
    	$(".city_error1").text("车牌号码不能为空！");
    	return false;
  	}
  	//车牌号格式验证
  	var pattern=/^[\u4e00-\u9fa5][A-Z](\s)?[A-Z0-9]{5}$/;
  	if(pattern.test(LicenseNo)==false){
  		$(".city_error1").text("请输入正确的车牌号码！");
    	return false;
  	}
  	$(".city_error1").text("");
  	return true;
}

//机构码校验，看是否城市不可选
function checkComcode(){
	var ctx = $("#ctx").val();
	var comcode = $("#comcode").val();
	var flag = true;
	if(comcode != ""){
		$.ajax({
			 url:ctx+"/carProposal/car/carTG",
			 data:{
				 groupBuyid:comcode
			 },
			 dataType:"json",
			 type:"post",
			 async:false,
			 success:function(data){
				 var common  = eval("("+data.common+")");//转换为json对象data.common
				 if(common.resultCode != 1 || (data.ccaEntryId).indexOf('tghz_')==-1){
					 $("#comcodeErr").html("请输入正确的推荐码！");
					 flag = false;
					 
				 }else{
					 $("#comcodeErr").html("");
					 $("#city_picker").attr("disabled",true);
					 $("#netAddress").val(data.ccaID);
					 $("#ccaFlag").val(data.ccaFlag);
					 $("#ccaEntryId").val(data.ccaEntryId);
				 }
			 }
		 
		 })
	}else{
		$("#comcodeErr").html("");
		$("#city_picker").attr("disabled",false);
	}
	return flag;
}
/**
 * 被保险人身份证号校验
 */
function checkIdenfyNumber(){
		$idenfynumber=$("#proposalNoOrIdenfyNo").val();
		
		if($idenfynumber.length==18){
			for(var i =0;i<17;i++){
				if(parseInt($idenfynumber.charAt(i))>=0 && parseInt($idenfynumber.charAt(i))<=9){
				}else{
					$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
					return false;
				}
			}
			if(!/^\d{17}(\d|x)$/i.test($idenfynumber)){
				$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
				return false;
			}
			var iSum=0 ;
			$idenfynumber=$idenfynumber.replace(/x$/i,"a");
			for(var i = 17;i>=0;i --){
				iSum += (Math.pow(2,i) % 11) * parseInt($idenfynumber.charAt(17 - i),11);
			}
			if(iSum%11!=1){
				$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
				return false;
			}
		}
		if($idenfynumber.length==15){
			for(var i =0;i<15;i++){
				if(parseInt($idenfynumber.charAt(i))>=0 && parseInt($idenfynumber.charAt(i))<=9){
					
				}else{
					$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
					return false;
				}
			}
		}
		var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
		
		$idenfynumber=$idenfynumber.replace(/x$/i,"a");
		if(aCity[parseInt($idenfynumber.substr(0,2))]==null){
			$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
			return false;
		}
		var sBirthday=$idenfynumber.substr(6,4)+"-"+Number($idenfynumber.substr(10,2))+"-"+Number($idenfynumber.substr(12,2));
		var d=new Date(sBirthday.replace(/-/g,"/")) ;
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
			$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
			return false;
		}
		$(".city_error2").text("");
		return true;
}
/**
 * 校验保单号
 * @returns {Boolean}
 */
function checkPolicyNo(){
	//去空
	$policyNo=removeAllSpace($("#proposalNoOrIdenfyNo").val());
	
	//保单号校验
	//校验格式是否正确
	var testNo = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	var testNo1 = /[\uFF00-\uFFEF]/;  
	if(testNo.test($policyNo)||testNo1.test($policyNo)){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	var patternszOther ="[`~!@#%$^&*=|{}\\[\\]<>/?~@#￥……&*―|{}【】？]";
	if($("#proposalNoOrIdenfyNo").val().match(patternszOther)){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	
	$riskcode=$policyNo.substring(1,4);//字母校验，必须全是字母
	if($policyNo.substring(1,4).toUpperCase()=="YAE"||$policyNo.substring(1,4).toUpperCase()=="YAF"){
		$(".city_error2").text("预约协议，代理协议的保单不可查询！");
		return false;
	}
	if($policyNo.length!=22&&$policyNo.substring(0,2).toUpperCase()!="RC"){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	if($riskcode.search("^[A-Za-z]+$")!=0&&$policyNo.substring(0, 2).toUpperCase()!="RC"){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	if($policyNo.substring(1,2)=="K"||$policyNo.substring(1,2)=="O"||$policyNo.substring(1,2)=="N"){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	if($policyNo.substring(0,2).toUpperCase()=="RC"&&$policyNo.length!=18){
		$(".city_error2").text("证件号码或上年保单号不匹配，请核对后重新输入！");
		return false;
	}
	$(".city_error2").text("");
	return true;
}
/**
 * 快速续保入口
 * @param str
 */
function queryRenewal(str, secondRenewalFlag){
	var ctx = $("#ctx").val();
	var citySelected = str; //地区代码
	var licenseNo = $("#licenseNo_show").val();		//车牌号
	var policyNO = $("#proposalNoOrIdenfyNo").val();
	var sessionId = $("#sessionId").val();
    $.ajax({
        url: ctx+"/carProposal/quickRenewal/queryQR",
        data: {
        			licenseNo:licenseNo,
        			tokenNo: policyNO,
        			sessionId:sessionId,
        			citySelected:citySelected,
        			secondRenewalFlag:secondRenewalFlag
        		},
        dataType:"json",	
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data) {
        	data = eval("("+data.message+")");//转换为json对象
        	var sessionId = data.head.sessionId;
        	data = data.body;
        	var resultCode = data.common.resultCode;
        	var cityCode=data.cityCode;
        	var dspParam=getUrlParam("cmpid")==null?"":getUrlParam("cmpid");
        	if(cityCode=="11000000" && dspParam.indexOf('8di')>=0){
    			_adwq.push(['_trackPageview']); 
    		}
    		//北京分公司悠易DSP代码部署
    		if(cityCode=="11000000" && dspParam.indexOf('11ds')>=0){
    			YoRegTrack();
    		}
        	if(resultCode==4){			//没有找到符合续保条件的保单信息
        			$(".city_error2").text("没有找到符合续保条件的保单信息，请核对您输入是否正确！");
        		return false;
        	}else if(resultCode == 2){	//系统异常
        		$(".city_error2").text("身份证号或上年保单号不匹配！");
        		return false;
            }else if(resultCode == 0){	//参数丢失异常
            	$(".city_error2").text("身份证号或上年保单号不匹配！");
        		return false;
            }else if(resultCode == 3){//走一般续保流程
            	var citySelected = data.cityCode;
            	var proSelected = data.areaCode;
            	//cityCode
				$("input[name='carInfo.citySelected']").val(citySelected);
				//proCode
				$("input[name='carInfo.proSelected']").val(proSelected);
            	toRenewal(citySelected, proSelected,sessionId);
            }else if(resultCode == 7){
            	$(".city_error2").text("身份证号或上年保单号不匹配！");
    	        return false;
            }else if(resultCode == 8){
            	$(".city_error2").text("您的车辆暂时不能在网上进行报价，请到当地营业厅进行查询！");
            	return false;
            }else{
            	//上年保单号
            	$("input[name='carInfo.beforeProposalNo']").val(data.tokenNo);
            	//是否新车，续保写死
            	$("input[name='carInfo.isNewCar']").val(1);
            	$("input[name='carInfo.isRenewal']").val(1);
            	//车牌标志
				$("input[name='carInfo.licenseFlag']").val(1);
	            //车主姓名
			    $("input[name='carInfo.carOwner']").attr("value",data.carOwnerInfo.carOwner);
			    //投保人邮箱
				$("input[name='carInfo.appliEmail']").attr("value",data.appliInfo.appliEmail);
				//投保人电话
				$("input[name='carInfo.appliMobile']").attr("value",data.appliInfo.appliMobile);
				//城市代码
				$("input[name='carInfo.citySelected']").attr("value",data.cityCode);
				//车牌号
				$("input[name='carInfo.licenseNo']").attr("value",data.appliCarInfo.licenseNo);
				//核定载客量标志
				$("input[name='carInfo.seatFlag']").attr("value",data.appliCarInfo.seatFlag);
				//发动机号
				$("input[name='carInfo.engineNo']").attr("value",data.appliCarInfo.engineNo);
				//vin码
				$("input[name='carInfo.vinNo']").attr("value",data.appliCarInfo.vinNo);
				//初登日期		转化日期格式2013/01/02  转换为 2013-06-28
				var enrollDate = data.appliCarInfo.enrollDate;
				enrollDate = replace(enrollDate,"/","-");
				$("input[name='carInfo.enrollDate']").attr("value",enrollDate);
				//车型别名
				$("input[name='carInfo.aliasName']").attr("value",data.appliCarInfo.aliasName);
				$("input[name='carInfo.aliasNameForIn']").attr("value", data.appliCarInfo.aliasNameViewFlag);
				//是否贷款车
				$("input[name='carInfo.haveLoan']").attr("value",data.haveLoan);
				//贷款机构名称
				$("input[name='carInfo.loanName']").attr("value",data.loanName);
				//是否足额  0 不足额投保；1足额
				$("input[name='carInfo.fullAmountName']").attr("value",data.fullAmountName);
				//是否指定驾驶员  0不指定；1指定
				$("input[name='carInfo.assignDriver']").attr("value",data.assignDriver);
				//商业险终保日期
				$("input[name='carInfo.endDateSY']").attr("value",replace(data.endDateSY,"/","-"));
				//商业险终保小时
				$("input[name='carInfo.endHourSY']").attr("value",data.endHourSY);
				//商业险起保小时
				$("input[name='carInfo.startHourSY']").attr("value",data.startHourSY);
				//商业险起保日期
				$("input[name='carInfo.startDateSY']").attr("value",replace(data.startDateSY,"/","-"));
				//交强险起保日期
				$("input[name='carInfo.startDateCI']").attr("value",replace(data.startDateJQ,"/","-"));
				//交强险起保小时
				$("input[name='carInfo.starthourCI']").attr("value",data.startHourJQ);
				//交强险终保小时
				$("input[name='carInfo.endhourCI']").attr("value",data.endHourJQ);
				//交强险终保日期
				$("input[name='carInfo.endDateCI']").attr("value",replace(data.endDateJQ,"/","-"));
				
				//被保险人证件类型01：身份证 02：户口薄 03：护照 04：军官证 05：驾驶执照 06：返乡证 07：港澳身份证 99：其他
				$("input[name='carInfo.insuredIdentifyType']").attr("value",data.insuredInfo.insuredIdentifyType);
				//被保险人身份证地址
				$("input[name='carInfo.insuredIdentifyAddr']").attr("value",data.insuredInfo.insuredIdentifyAddr);
				//被保险人姓名
				$("input[name='carInfo.insuredName']").attr("value",data.insuredInfo.insuredName);
				//被保险人证件号码
				$("input[name='carInfo.insuredIdentifyNumber']").attr("value",data.insuredInfo.insuredIdentifyNumber);
				//保单寄送地址 -- 被保险人地址
				$("input[name='carInfo.appliAddress']").attr("value",data.allAddress); 
				//被保险人电话
				$("input[name='carInfo.insuredMobile']").attr("value",data.insuredInfo.insuredMobile); 
				//被保险人性别
				$("input[name='carInfo.insuredIdentifSex']").attr("value",data.insuredInfo.sex); 
				//被保险人shengri
				$("input[name='carInfo.insuredBirthday']").attr("value",replace((data.insuredInfo.birthday).substring(0,10),"-","/"));
				//是否指定行驶区域  03指定；11不指定
				$("input[name='carInfo.runAreaCodeName']").attr("value",data.runAreaCode);
				//车架号
				$("input[name='carInfo.frameNo']").attr("value",data.appliCarInfo.rackNo);
				//发票抬头
				$("input[name='carInfo.invoiceTitle']").attr("value",data.receiverInfo.invoice);
				//车座数
				$("input[name='carInfo.seatCount']").attr("value",data.appliCarInfo.seat);
				//车型	0910
				$("input[name='carInfo.vehicle_modelsh']").val(data.appliCarInfo.brandName);
				$("input[name='carInfo.standardName']").val(data.appliCarInfo.standardName);
				//选择车型的标识
				$("input[name='carInfo.isNeedQueryCarModel']").val(1);
				//投保人证件号码
				$("input[name='carInfo.appliIdentifyNumber']").val(data.appliInfo.appliIdentifyNumber);
				//投保人证件类型
				$("input[name='carInfo.appliIdentifyType']").val(data.appliInfo.appliIdentifyType);
				//争议解决方式
				$("input[name='carInfo.argueSolution']").val(data.insuredInfo.argueSolution);
				//与投保人关系
				$("input[name='carInfo.insuredAndOwnerrelate']").val(data.insuredInfo.insuredAndOwnerrelate);
				//收件人联系电话carInfo.appliPhoneNumber
				$("input[name='carInfo.appliPhoneNumber']").val(data.receiverInfo.mobile);
				//收件人姓名
				$("input[name='carInfo.appliAddName']").val(data.receiverInfo.receiver);
				//是否过户车
				$("input[name='carInfo.guohuselect']").val(data.guoHuSelect);
				//指定驾驶员json串
				$("input[name='carInfo.assignDriverJson']").val(JSON.stringify(data.carDriverInfos));
				//纳税人姓名
				$("input[name='carInfo.taxPayerName']").val(data.carShipTax.taxPayerName);
				//纳税人证件号
				$("input[name='carInfo.taxPayerIdentNo']").val(data.carShipTax.taxPayerIdentNo);
				//投保人姓名
				$("input[name='carInfo.appliName']").val(data.appliInfo.appliName);
				//被保险人邮箱
				$("input[name='carInfo.insuredEmail']").val(data.insuredInfo.insuredEmail);
				//是否外地车
				$("input[name='carInfo.nonlocalflag']").val(data.nonlocalflag);
				//是否上年违法
				$("input[name='carInfo.weiFaName']").val(data.weiFaName);
				
				//cityCode
				$("input[name='carInfo.citySelected']").val(data.cityCode);
				//proCode
				$("input[name='carInfo.proSelected']").val(data.areaCode);
				
				//邮寄地址 省
				$("input[name='carInfo.deliverInfoPro']").val(data.receiverInfo.receiverprovince);
				//邮寄地址 市
				$("input[name='carInfo.deliverInfoCity']").val(data.receiverInfo.receivercity);
				//邮寄地址 区
				$("input[name='carInfo.deliverInfoDistrict']").val(data.receiverInfo.receivercounty);
				//街道地址   收件人地址
				$("input[name='carInfo.deliverInfoAddress']").val(data.linkAddress);
				//续保出单机构代码
				$("input[name='carInfo.xubaocomcode']").val(data.xubaocomcode);
				//邮编
				$("input[name='carInfo.postCode']").val(data.receiverInfo.postCode);
				//queryCityCode
				$("input[name='carInfo.queryCityCode']").val(data.cityCode+'00');
				//行驶里程
				$("input[name='carInfo.travelMilesvalue']").attr("value",data.runMiles);
				$("input[name='sessionIdSub']").attr("value",sessionId);
				$("input[name='carInfo.isOutRenewal']").val(data.isOutRenewal);
				$("input[name='carInfo.lastHas050200']").val(data.lastHas050200);
				$("input[name='carInfo.lastHas050500']").val(data.lastHas050500);
				$("input[name='carInfo.lastHas050210']").val(data.lastHas050210);
				//上年出险次数  未出险年数
				$("input[name='carInfo.lastdamageBI']").attr("value", data.renewalPrpcitemCarExt.lastdamagedbi);
				$("input[name='carInfo.noDamyearsBI']").attr("value", data.renewalPrpcitemCarExt.nodamyearsbi);
				//车牌标志 
				$("input[name='carInfo.blanclistflag']").val(true);
				$("#form1").submit();
            }
        }
    });
}
//请求一般续保
function toRenewal(citySelected, areaSelected, sessionId){
	var licenseNo = $("#licenseNo_show").val();		//车牌号
	var policyNO = $("#proposalNoOrIdenfyNo").val();
	
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/renewal/queryRenewal",
		  type:"post",
		  data: {
			  	 proSelected: areaSelected,
			  	 citySelected: citySelected,
			  	 beforeProposalNo:trim($("#proposalNoOrIdenfyNo").val()),
			  	 licenseNo:$("#licenseNo_show").val(),
		         sessionId:sessionId
		         },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)	
		  {
  			if(data==2||data==3||data==4){
	  			showInvalidTips($("#proposalNoOrIdenfyNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#proposalNoOrIdenfyNo"));
  			}else {
	   		  	//是否续保标志 0: 转保 1：续保 2：新车
			    $("input[name='carInfo.isRenewal']").val(1);
			  	//车主姓名
			    $("input[name='carInfo.carOwner']").attr("value",data.carOwnerInfo.carOwner);
			    //车主证件类型
			    $("input[name='carInfo.carOwerIdentifyType']").attr("value", data.carOwnerInfo.carOwerIdentifyType);
			    //车主 证件号
			    $("input[name='carInfo.carOwerIdentifyNo']").attr("value", data.carOwnerInfo.carOwnerIdentifyNumber);
			    //车主与被保险人关系
			    $("input[name='carInfo.insuredAndOwnerrelate']").attr("value", data.insuredInfo.insuredAndOwnerrelate);
			    
			    //投保人姓名
			    $("input[name='carInfo.appliName']").attr("value", data.appliInfo.appliName);
			    //投保人邮箱
				$("input[name='carInfo.appliEmail']").attr("value",data.appliInfo.appliEmail);
				//投保人电话
				$("input[name='carInfo.appliMobile']").attr("value",data.appliInfo.appliMobile);
				//投保人证件号码
				$("input[name='carInfo.appliIdentifyNumber']").val(data.appliInfo.appliIdentifyNumber);
				//投保人证件类型
				$("input[name='carInfo.appliIdentifyType']").val(data.appliInfo.appliIdentifyType);
				
				//城市代码
				$("input[name='carInfo.citySelected']").attr("value",data.cityCode);
				
				//车牌号
				$("input[name='carInfo.licenseNo']").attr("value",data.appliCarInfo.licenseNo);
				//设置车牌不可修改
				$("#licenseNo_show").attr("readonly",'true');
				
				//车架号
				$("input[name='carInfo.frameNo']").attr("value",data.appliCarInfo.rackNo);
				//发动机号
				$("input[name='carInfo.engineNo']").attr("value",data.appliCarInfo.engineNo);
				//vin码
				$("input[name='carInfo.vinNo']").attr("value",data.appliCarInfo.vinNo);
				//初登日期		转化日期格式2013/01/02  转换为 2013-01-02
				$("input[name='carInfo.enrollDate']").attr("value",replace(data.appliCarInfo.enrollDate, "/", "-"));
				//车型别名
				$("input[name='carInfo.aliasName']").attr("value",data.appliCarInfo.aliasName);
				//是否显示车型别名
				$("input[name='carInfo.aliasNameForIn']").attr("value", data.appliCarInfo.aliasNameViewFlag);
				//是否贷款车
				$("input[name='carInfo.haveLoan']").attr("value",data.haveLoan);
				//贷款机构名称
				$("input[name='carInfo.loanName']").attr("value",data.loanName);
				//是否足额  0 不足额投保；1足额
				$("input[name='carInfo.fullAmountName']").attr("value",data.fullAmountName);
				//是否指定驾驶员  0不指定；1指定
				$("input[name='carInfo.assignDriver']").attr("value",data.assignDriver);
				//指定驾驶员json串
				$("input[name='carInfo.assignDriverJson']").val(JSON.stringify(data.carDriverInfos));
				//是否上一年违法
				$("input[name='carInfo.weiFaName']").attr("value", data.weiFaName);
				//是否指定行驶区域  03指定；11不指定
				$("input[name='carInfo.runAreaCodeName']").attr("value",data.runAreaCode);
				//是否外地车
				$("input[name='carInfo.nonlocalflag']").attr("value", data.nonlocalflag);
				
				//商业险终保日期
				$("input[name='carInfo.endDateSY']").attr("value",replace(data.endDateSY,"/","-"));
				//商业险终保小时
				$("input[name='carInfo.endHourSY']").attr("value",data.endHourSY);
				//商业险起保小时
				$("input[name='carInfo.startHourSY']").attr("value",data.startHourSY);
				//商业险起保日期
				$("input[name='carInfo.startDateSY']").attr("value",replace(data.startDateSY,"/","-"));
				//交强险起保日期
				$("input[name='carInfo.startDateCI']").attr("value",replace(data.startDateJQ,"/","-"));
				//交强险起保小时
				$("input[name='carInfo.starthourCI']").attr("value",data.startHourJQ);
				//交强险终保小时
				$("input[name='carInfo.endhourCI']").attr("value",data.endHourJQ);
				//交强险终保日期
				$("input[name='carInfo.endDateCI']").attr("value",replace(data.endDateJQ,"/","-"));
				
				//被保险人证件类型01：身份证 02：户口薄 03：护照 04：军官证 05：驾驶执照 06：返乡证 07：港澳身份证 99：其他
				$("input[name='carInfo.insuredIdentifyType']").attr("value",data.insuredInfo.insuredIdentifyType);
				//被保险人身份证地址
				$("input[name='carInfo.insuredIdentifyAddr']").attr("value",data.insuredInfo.insuredIdentifyAddr);
				//被保险人姓名
				$("input[name='carInfo.insuredName']").attr("value",data.insuredInfo.insuredName);
				//被保险人证件号码
				$("input[name='carInfo.insuredIdentifyNumber']").attr("value",data.insuredInfo.insuredIdentifyNumber);
				//被保险人地址   保单寄送地址
				$("input[name='carInfo.appliAddress']").attr("value",data.insuredInfo.insuredIdentifyAddr); 
				//被保险人电话
				$("input[name='carInfo.insuredMobile']").attr("value",data.insuredInfo.insuredMobile); 
				//被保险人邮箱
				$("input[name='carInfo.insuredEmail']").attr("value",data.insuredInfo.insuredEmail);
				
				//发票抬头
				$("input[name='carInfo.invoiceTitle']").attr("value",data.invoice);
				//车座数
				$("input[name='carInfo.seatCount']").attr("value",data.appliCarInfo.seat);
				//车牌标志
				$("input[name='carInfo.licenseFlag']").val(1);
				
				$("input[name='carInfo.isOutRenewal']").val(data.isOutRenewal);
				$("input[name='carInfo.lastHas050200']").val(data.lastHas050200);
				$("input[name='carInfo.lastHas050210']").val(data.lastHas050210);
				$("input[name='carInfo.lastHas050500']").val(data.lastHas050500);
				$("input[name='carInfo.oldRNew']").val(data.common.resultMsg);
				//车型
				$("input[name='carInfo.vehicle_modelsh']").val(data.appliCarInfo.standardName);
				//选择车型的标识
				if(data.common.resultCode == '5'){
					$("input[name='carInfo.isNeedQueryCarModel']").val(5);
				}else{
					$("input[name='carInfo.isNeedQueryCarModel']").val(1);
				}
				//选择车型的标识
//						$("input[name='carInfo.isNeedQueryCarModel']").val(1);
				
				//投保人证件号码
				$("input[name='carInfo.appliIdentifyNumber']").val(data.appliInfo.appliIdentifyNumber);
				//投保人证件类型
				$("input[name='carInfo.appliIdentifyType']").val(data.appliInfo.appliIdentifyType);
				//争议解决方式
				$("input[name='carInfo.argueSolution']").val(data.insuredInfo.argueSolution);
				//收件人联系电话carInfo.appliPhoneNumber
				$("input[name='carInfo.appliPhoneNumber']").val(data.receiverInfo.mobile);
				//收件人姓名
				$("input[name='carInfo.appliAddName']").val(data.receiverInfo.receiver);
				//是否过户车
				$("input[name='carInfo.guohuselect']").val(data.guoHuSelect);
				
				//纳税人姓名
				$("input[name='carInfo.taxPayerName']").val(data.carShipTax.taxPayerName);
				//纳税人证件号
				$("input[name='carInfo.taxPayerIdentNo']").val(data.carShipTax.taxPayerIdentNo);
				//商业险保单号
				$("input[name='carInfo.beforeProposalNo']").val(data.tokenNo);
				
				//邮寄地址 省
				$("input[name='carInfo.deliverInfoPro']").val(data.receiverInfo.receiverprovince);
				//邮寄地址 市
				$("input[name='carInfo.deliverInfoCity']").val(data.receiverInfo.receivercity);
				//邮寄地址 区
				$("input[name='carInfo.deliverInfoDistrict']").val(data.receiverInfo.receivercounty);
				//街道地址   收件人地址
				$("input[name='carInfo.deliverInfoAddress']").val(data.linkAddress);
				//续保出单机构代码
				$("input[name='carInfo.xubaocomcode']").val(data.xubaocomcode);
				//邮编
				$("input[name='carInfo.postCode']").val(data.receiverInfo.postCode);
				//queryCityCode
				$("input[name='carInfo.queryCityCode']").val(data.cityCode+'00');
				//车牌号校验位 
				$("input[name='carInfo.blanclistflag']").val('true');
				//上年出险次数  未出险年数
				$("input[name='carInfo.lastdamageBI']").attr("value", data.renewalPrpcitemCarExt.lastdamagedbi);
				$("input[name='carInfo.noDamyearsBI']").attr("value", data.renewalPrpcitemCarExt.nodamyearsbi);
				//隐藏手机号 中间4位
				var appliPhoneNO=data.appliInfo.appliMobile;
				appliPhoneNO=appliPhoneNO.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
				$("#AppliMobile").val(appliPhoneNO);
				
				$("#isModify_t").val('0');	//设置 手机号是否修改标志位 （针对首次新保再改成续保的情况）
				
				$("#sessionId").val(sessionId);
				$("#form1").attr("action", ctx + "/carProposal/quickRenewal/toRenewal");
				$("#form1").submit();
  			}
		  }
   });

}


//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return ""; //返回参数值
}
function YoyiTrack(){
    var url='http://databank.yoyi.com.cn/e.gif?mon=155536afdeb';
    var d = new Image(1, 1);
    d.src = url+"&r="+Math.random();
        d.onload = function() {d.onload = null;}
      };
 function YoRegTrack(){
    YoyiTrack();
 }