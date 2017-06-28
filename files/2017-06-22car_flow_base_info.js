/**
 * User: Phoenix
 * Date: 13-4-27
 * Time: 上午10:45
 * Base info handler for car flow.
 */

$(function() {
	
 if($("#open_off")){
 		var proCode=$("#proSelect").val();
 		var cityCode=$("#citySelect").val();
 		if(openProList[proCode]!=undefined){
 			if(openProList[proCode].isOpen){
 				if(openProList[proCode].citys[cityCode]!=undefined){
 					if(openProList[proCode].citys[cityCode].city){
 		 	 			$("#open_off").show();
 		 	 				$("input[name='carInfo.switchOn_Off']").val(1);
 		 	 			}else{
 		 	 				$("#open_off").hide();
 		 	 				$("input[name='carInfo.switchOn_Off']").val(0);
 		 	 			}
 				}
                
 	 		}else{
 	 			if(openProList[proCode].citys[cityCode]!=undefined){
 	 				 if(openProList[proCode].citys[cityCode].city){
 	 	        	    $("#open_off").show();
 	 					$("input[name='carInfo.switchOn_Off']").val(1);
 	 	           }else{
 	 	        	    $("#open_off").hide();
 	 				$("input[name='carInfo.switchOn_Off']").val(0);
 	 	           }
 	 			}
 	          
 	 		}
 		
 		}
 	}
	

	if($("#flogWindow").length>0){
		if($("#flogWindow").val()=="1")
		{
			$.fn.popup({ 'msg': "您的暂存单起保日期已过期，<br/>目前已经将起保日期调整为最早可生效日期！"});

		}
	}
	//判断第三方情况并做错email
	if(""!=$("#comName").val()){
		var email = $("input[name='carInfo.appliEmail']").val();
		$("#AppliEmail").val(email);
	}
	
	if($("#cooperId").val()!=""&&$("#licenseNo").val()!=""){
		
		$("#blanclistflag").val("true")
		var LicenseNo = $("#licenseNo").val();
		$("#licenseNo_show").val(LicenseNo);
		jsPlateNumber();
		if($("#blanclistflag").val()=="true"){
			if(checkLicenseNo(LicenseNo)){
				isRenewal();
				
		}
		}
		
	}
	var proSelect=$("#proSelect").val();
	var citySelect=$("#citySelect").val();
	var ccaFlag=$("#ccaFlag1").val();
	var ccaEntryId=$("#ccaEntryId").val();
	var ccaID=$("#ccaID1").val();
	var mssFlag = $("input[name='carInfo.mssFlag']").val();
	if(mssFlag == 'mss'){
		$("#headBar").hide();
		$("#stepDiv").hide();
	}
	if(ccaFlag!='' && ccaFlag!=undefined){
		$("#proSelected").val(proSelect);
		$("#citySelected").val(citySelect);
		$("#ccaFlag").val(ccaFlag);
		$("#ccaId").val(ccaID);
		
	}
	if($("#ccaId").val()!=""){
		$("#groupBuyId").val($("#ccaId").val());
		getYeWuType();
	}
	centerSelectNum('CarYears');
	if($("input[name='qFlag']").val()=='quick'){
		var carYears=document.getElementById("CarYears");
		carYears.style.background="no-repeat right center transparent";
	}
	if($("input[name='carInfo.isRenewal']").val()==1){		//appliPhone赋值（用于从下一步返回时）
		var apphoneNo = $("input[name='carInfo.appliMobile']").val();
		document.getElementById("xinche").style.display="none";
		if($("#isModify_t").val()!=1){
			//appliPhone赋值（用于从下一步返回时）
			var apphoneNo = $("input[name='carInfo.appliMobile']").val();
			apphoneNo=apphoneNo.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
			$("#AppliMobile").val(apphoneNo);
		}else{			//appliMobile  1
			$("#AppliMobile").val($("input[name='carInfo.appliMobile']").val());
		}
	}else{			//appliMobile  1
		$("#AppliMobile").val($("input[name='carInfo.appliMobile']").val());
	}
	
	//流程步骤
	if($("input[name='carInfo.progressBar']").val() == ""){
		$("input[name='carInfo.progressBar']").val(1);
	}
	if($("input[name='carInfo.progressBar']").val()>1){
		$("#step_2").attr("data-status","finished");
		if($("input[name='carInfo.progressBar']").val()>2){
			$("#step_3").attr("data-status","finished");
			if($("input[name='carInfo.progressBar']").val()>3){
				$("#step_4").attr("data-status","finished");
				if($("input[name='carInfo.progressBar']").val()>4){
					$("#step_5").attr("data-status","finished");
				}
			}
		}
	}
	
	//团购账户处理  对于城市code
	if($("#cityCode").val()!=""&&$("#cityCode").length>0){
		$("#citySelected").val($("#cityCode").val())
		var pro = ($("#cityCode").val()).substring(0,2)+"000000"
		$("#proSelected").val(pro)
		
	}
	var areaCode = $("#proSelected").val();
	var cityCode = $("#citySelected").val();
	var appliMobile_input = $("#AppliMobile");
	var appliEmail_input = $("#AppliEmail");
    //北京地区邮箱和电话不显示
    if("11000000"==$("#citySelected").val()){
		$("#mobemailDiv1").hide();
		$("#mobemailDiv2").hide();
		if($("input[name='carInfo.carKindCI']").val()==1||$("input[name='carInfo.isNewCar']").val()=='0'){//北京添加平台校验  carKindCI这个隐藏域（天津的）北京不用
			$("#bjFrameNo").hide();
		}else{
			$("#bjFrameNo").show();
		}
		
	}
    if($("#xincheShow").length==0 ){
    	$("#xinche").hide()
    	document.getElementById("new_car_behind")?document.getElementById("new_car_behind").style.display="none":"";
    }
    //新车未上牌勾选情况
    var jianC =$("#data-shortname").val();
    if($("input[name='carInfo.isNewCar']").val()=='0'&&$("#isNewCar").is(":visible")){
    	$(".new_client_like_last").hide();
    	$("#NewCarSpan").addClass("checked");   	//被选中
//    	$("#isNewCar").attr("checked","checked");
    	
    	$("#mobemailDiv1").show();
    	$("#mobemailDiv2").show();
    	$("#licenseNo_show").val(jianC.substring(0,1)+"*");
//		$("#licenseNo_show").attr("data-shortname",jianC.substring(0,1)+"*");
		if(cityCode == "13110000"){
			$("#licenseNo_show").val("暂未上牌");
		}
		$("#licenseNo_show").attr("readonly","readonly");
//		$("#licenseNo_show").prev("label.short-name").html($("#licenseNo_show").attr("data-shortname"));
	 }else{
		$("input[name='carInfo.licenseNo']").val()
		$("#NewCarSpan").removeClass("checked");	//未选中状态
		
		if($("input[name='carInfo.isRenewal']").val()=='1'){
			$("#licenseNo_show").attr("readonly",true);
		}else{
			$("#licenseNo_show").attr("readonly",false);
		}
//		$("#licenseNo_show").attr("data-shortname",jianC);
//		$("#licenseNo_show").prev("label.short-name").html($("#licenseNo_show").attr("data-shortname"));
		var licenseNo_show = $("input[name='carInfo.licenseNo']").val();
		if(licenseNo_show==""){
			$("#licenseNo_show").val(jianC)
		}else{
		    $("#licenseNo_show").val(licenseNo_show);
		}
		if($("input[name='carInfo.callUrl']").val().length > 0 ){//第三方回传非新车未上牌特殊处理
	    	$("#licenseNo_show").val($("#licenseNo_show").val().replace("*",""));
	    	$("input[name='carInfo.isNewCar']").val(1);
		}
    }
    if($("input[name='carInfo.isNewCar']").val()==""){
    	$("input[name='carInfo.isNewCar']").val(1);
    }
    if($("input[name='carInfo.isRenewal']").val()==""){
    	$("input[name='carInfo.isRenewal']").val(0);
    }
    //费改新加事件绑定（新绑定写在前面便于事件复用）
	$("#new_client_like_last").click(function() {//点击上年度投保城市与本次一致（选填）触发事件
		if($(this).attr("class").indexOf("checked") > 0){
			$(this).removeClass("checked");
			$("#city_picker").parent().show();
			$("#lastCityCheck").val("0");
			$("#areaCodeLast").val("");
			$("#cityCodeLast").val("");
		}else{
			$(this).addClass("checked");
			$("#areaCodeLast").val($("#proSelect").val());
			$("#cityCodeLast").val($("#citySelect").val());
			$("#city_picker").parent().hide();
			$("#city_picker").val("");
			$("#lastCityCheck").val("1");
			showInvalidTips($("#city_picker").parent(), "", true);
		}
	});
	$(".new_client div a").click(function() {
		last_city_sel();
	});
	$("#insuredIdentifyNumber").blur(function(){
		insuredIdentifyNumberJY();
	}).keyup(function() {
		$(this).val($(this).val().toUpperCase());
	}).change(function() {
		$(this).val($(this).val().toUpperCase());
    });
	$("#InsuredIdentifyType").change(function() {
		
		if($("#InsuredIdentifyType").val()=="31"){
			  if(($("#insuredIdentifyNumber").val()).match(/^[a-zA-Z0-9]{8}[0-9|X]$/)!= null){
				  showInvalidTips($("#insuredIdentifyNumber").parent(),"",true); 
			  }else{
				    showInvalidTips($("#insuredIdentifyNumber").parent(),"请输入被保险人证件号",true);
					var maxlength = $("#insuredIdentifyNumber").attr("maxlength","9");
					
					var tab = $("#insuredIdentifyNumber");
					if(tab.val()!="")tab.blur();
					return false;
			  }
		}else{
			
			var maxlength = $("#insuredIdentifyNumber").attr("maxlength","18");
		}
		insuredIdentifyNumberJY();
	});
	$("#InsuredIdentifSexOnePage label span").click(function() {
		if($(this).attr("class").indexOf("radioed") <= 0){
			$("#man").removeClass("radioed");
			$("#woman").removeClass("radioed");
			$(this).addClass("radioed");
			$("#insuredIdentifSex").val($(this).attr("value"));
			removeInvalidTips($("#InsuredIdentifSexOnePage"));
		}
	});

    
 // 新车未上牌勾选的操作需要添加 
	$("#isNewCar").click(function(){
		var citySelected = $("#citySelected").val();
		var areaCode = $("#proSelected").val();
		var isXuBao = $("#isXuBao");
		var jianC =$("#data-shortname").val();
		
		if($("#NewCarSpan").hasClass('checked')){
			$(".new_client_like_last").show();
			$("#NewCarSpan").removeClass("checked");	//未选中状态
			$("input[name='carInfo.isRenewal']").val(0);
			$("#licenseNo_show").attr("readonly",false);
			$("#licenseNo_show").val(jianC.substring(0,1));
			$("#RunMiles").val("10000");
			isXuBao.val("0");
			$("input[name='carInfo.isNewCar']").val(1);
			if(areaCode == "11000000"){
				$("#mobemailDiv1").hide();
				$("#mobemailDiv2").hide();
				if($("input[name='carInfo.carKindCI']").val()!=1){//北京添加平台校验  carKindCI这个隐藏域（天津的）北京不用
					$("#bjFrameNo").show();
				}
			}else if(areaCode =="64000000"){
				$("#LicenseFlag").val("1");
			}
			$("#over_new_client_like_last").hide();//费改控制上年城市选择
		}else{
			$(".new_client_like_last").hide();
			$("#NewCarSpan").addClass("checked");   	//被选中
			var cityCody = $("#proSelected").val();
			var tishi = "温馨提示：由于承保政策限制，本地区只承保河北、北京、天津、山东地区的新车盗抢险，其它地区车辆请勿投保盗抢险，以免造成经济损失。"
			if(cityCody=="13000000"){
                $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		  		$("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
			}
			$("input[name='carInfo.isRenewal']").val(2);
			$("#licenseNo_show").val(jianC.substring(0,1)+"*");
//			$("#licenseNo_show").attr("data-shortname",jianC.substring(0,1)+"*");
			isXuBao.val("2");
			$("#RunMiles").val("1");
			$("#UseYears").val("0");
			$("input[name='carInfo.isNewCar']").val(0);
			
			if(areaCode == "11000000"){
				$("#mobemailDiv1").show();
				$("#mobemailDiv2").show();
				$("#bjFrameNo").hide();//隐藏北京 车架
			}else if(areaCode == "13000000"){
//				alert("温馨提示：由于承保政策限制，本地区只承保河北、北京、天津、山东地区的新车盗抢险，其它地区车辆请勿投保盗抢险，以免造成经济损失。");
				if(citySelected == "13110000"){
					$("#licenseNo_show").val("暂未上牌");
				}
			}
			removeInvalidTips($("#licenseNo_show").parents(".field_wrap"));
			$("#licenseNo_show").attr("readonly","readonly");
			//如果勾选新车上牌会调用此车牌校验接口，武汉有返回信息
			jsPlateNumber("newcar");
			//勾选新车未上牌获取当前日期
			var d = new Date();
			var month =d.getMonth()+ 1;
			if (month <= 9) {
				month = "0" + month;
			}
			var day = d.getDate();
				if(day<=9){
				day = "0"+day;
				}
				//用户如果勾选新车未上牌;初登日期变成当前日期
				$("#EnrollDate").val(d.getFullYear() + "-" + month+"-"+day);
			if(!$("#new_client_like_last").hasClass("checked")){
				$("#new_client_like_last").click();
			}	
			$("#over_new_client_like_last").show();//费改控制上年城市选择
		}
			
	});	
    //车牌号校验方法
    $("#licenseNo_show").focus(function(){
	}).change(function(){	//onchange 方法，还缺几个
		 $("#licenseNo_show").val( $("#licenseNo_show").val().toUpperCase()); // 车牌号转换成大写
	}).keydown(function(){
		enterToTab();
	}).keyup(function(){
		$("#licenseNo_show").val( $("#licenseNo_show").val().toUpperCase()); // 车牌号转换成大写
	}).blur(function(){
		//TODO 验证车牌号的方法
		if(!$("#NewCarSpan").hasClass('checked')){
			$(this).val(trimAll($(this).val()));
			 $("#licenseNo").val($("#licenseNo_show").val());
			var LicenseNo = $("#licenseNo").val();
			var cooperE=$("#cooperE").val();
			var comName=$("#comName").val();
			jsPlateNumber();
			if($("#blanclistflag").val()=="true"){
				if(checkLicenseNo(LicenseNo)){
					if($("input[name='carInfo.interimNo']").val()!=""){
						return false
					}else{
						isRenewal();
					}
			}
			}
		}
	});
    
    //保单号或者身份证号
    $("#beforeProposalNo").focus(function(){
	}).change(function(){
		//去空
    	$policyNo = trim($("#beforeProposalNo").val());
		//P字头
		$head=$policyNo.substring(0,1);
		if($head=="P" || $head=="p"){	//校验保单号
			$("#beforeProposalNo").val($("#beforeProposalNo").val().toUpperCase()); // 保单号转换成大写
		}
	}).keydown(function(){
		enterToTab();
	}).keyup(function(){
		//去空
    	$policyNo = trim($("#beforeProposalNo").val());
		//P字头
		$head=$policyNo.substring(0,1);
		if($head=="P" || $head=="p"){	//校验保单号
			$("#beforeProposalNo").val($("#beforeProposalNo").val().toUpperCase()); // 保单号转换成大写
		}
	}).blur(function(){
		//去空
    	$policyNo = trim($("#beforeProposalNo").val());
		//P字头
		$head=$policyNo.substring(0,1);
		if($head=="P" || $head=="p"){	//校验保单号
			$("#beforeProposalNo").val($("#beforeProposalNo").val().toUpperCase()); // 保单号转换成大写
		}
	});
    
  //车主输入域 验证
    var carOwner_input = $("#CarOwner"); 
	carOwner_input.focus(function(){
		if(areaCode == "52000000"){
//			$(".input_tips").html("车主必须为行驶证上面的行驶证车主");
		}else{
//			$(".input_tips").html("请输入《机动车行驶证》上登记的\“所有人\”姓名");
		}
		
	}).keyup(function(){
		
	}).keydown(function(){
		enterToTab();
	}).change(function(){
	}).blur(function(){
//		$(".input_tips").hide();
		checkCarOwnerName_CI_1(carOwner_input);
	});
	//联系人电话输入域 验证
	appliMobile_input.focus(function(){
		//当为续保且手机号码没被修改用户点击文本框要清空
//		if($("#onclickNumber").val()=='0'){
//			$("#AppliMobile").val("");
//			$("#onclickNumber").val('1');
//			 $("#onclickInsuredMobile").val('1');
//		}
		
	}).keyup(function(){
		
	}).keydown(function(){
		enterToTab();
	}).change(function(){
		$("#isModify_t").val(1);
		$("#isModify_b").val(1);
	}).blur(function(){
		var mobile = appliMobile_input.val();
//		if(trim(mobile) != ""){
			checkCarItemMobile(appliMobile_input);
//		}else{
//			removeInvalidTips(appliMobile_input.parents(".field_wrap"));
//		}
	});
	//车架号 验证
	var FrameNo = $("#frameNoInput");
	var EngineNo = $("#engineNoInput");
	FrameNo.focus(function() {
	}).blur(function() {
		checkFrameNo();
		$("input[name='carInfo.frameNo']").val(FrameNo.val());
		$("input[name='carInfo.vinNo']").val(FrameNo.val());
	}).keyup(function() {
		FrameNo.val(FrameNo.val().toUpperCase());
		enterToTab();
	}).change(function() {
		FrameNo.val(FrameNo.val().toUpperCase());
    });
	//发动机号 验证
	EngineNo.focus(function() {
	}).blur(function() {
		$("input[name='carInfo.engineNo']").val(EngineNo.val());
		checkEngineNo(EngineNo);
	}).keyup(function() {
		EngineNo.val(EngineNo.val().toUpperCase());
		enterToTab();
	}).change(function() {
		EngineNo.val(EngineNo.val().toUpperCase());
	});
	//联系人电子邮箱输入域 验证
	appliEmail_input.focus(function(){
		
	}).keyup(function(){
		
	}).keydown(function(){
		enterToTab();
	}).change(function(){
		
	}).blur(function(){
		var email = appliEmail_input.val();
//		if(trim(email) != ""){
			checkCarItemEmail(appliEmail_input);
//		}else{
//			removeInvalidTips(appliEmail_input.parents(".field_wrap"));
//		}
	});
  //点击下一步需要进行的操作
	var test_flag ="";
	var next_btn = $("#stepNext");
	next_btn.click(function(){
		setTimeout(zanCun,0);
		//清空提示错误元素
	   	$(".validate_tip").remove();
	   	removeInvalidTips($("#mobemailDiv"))
		//TODO 下一步时页面验证需要调整
		var plate = $("#licenseNo");
		var carname = $("#CarOwner");
	 	var tel = $("#AppliMobile");
	   	var email = $("#AppliEmail");
	   	var newcar = $("#isNewCar");
	   	//下一步 校验 车牌号
	   	if(!$("#NewCarSpan").hasClass('checked')){
			if(!(checkLicenseNo(plate.val())&&isRenewal())){
				$("#licenseNo_show").focus()
				return false;
			};
		}else{
//			$("#licenseNo").val(($("#licenseNo_show").attr("data-shortname")).substring(0,1));
			$("#licenseNo").val("");
		}
		
	//下一步校验 车主姓名
		if(!checkCarOwnerName_CI_1(carname)){
			carname.focus();
			return false;
		};
    	var proSelected = $("#proSelected").val();
    	var CarOwner = $("#CarOwner").val();
        if(proSelected=="53000000"){
    	   var reg = /^[A-Za-z0-9]+$/;
    	   if(reg.test(CarOwner)){
    		   showInvalidTips($("#CarOwner").parents(".field_wrap"), "姓名不能含有数字或字母！", true, $("#CarOwner"));
    		   return false;
    	   }
        }
		
		//接口车牌号
		if($("input[name='carInfo.isNewCar']").val()=='1'){
			if($("#blanclistflag").val()!="true"){
				var mobileWrap = $("#licenseNo_show").parents(".field_wrap");
				showInvalidTips(mobileWrap, "请输入正确的车牌号码！", true);
				$("#licenseNo_show").focus();
				return  false;
			}
		}
		//验证 车架号 发动机号
		if ($("#bjFrameNo").is(":visible")) {
			if (checkFrameNo()) {
				removeInvalidTips(FrameNo.parents(".field_wrap"));
			} else {
				FrameNo.focus();
				return false;
			}
			if (checkEngineNo(EngineNo)) {
				removeInvalidTips(EngineNo.parents(".field_wrap"));
			} else {
				EngineNo.focus();
				return false;
			}
		}
		//费改校验start
		if(document.getElementById("new_client_like_last")&&!last_city_sel()){
			return false;
		}
		if(document.getElementById("insuredIdentifyNumber")&&!insuredIdentifyNumberJY()){
			return false;
		}
		if(document.getElementById("InsuredIdentifSexOnePage")){
			if($("#man").attr("class").indexOf("radioed") <= 0 && $("#woman").attr("class").indexOf("radioed") <= 0 ){
				showInvalidTips($("#InsuredIdentifSexOnePage"), "请选择性别", true);
				return false;
			}
		}
		//费改校验end
		//费改赋值start
		if(document.getElementById("birthDayCar")){
			$("#insuredBirthday").val(replace($("#birthDayCar").val(),"-","/"));
		}
		if(document.getElementById("AppliEmail_fg")){ 
			$("input[name='carInfo.insuredEmail']").val($("#AppliEmail").val());
			if(""==$("input[name='carInfo.appliEmail']").val()){
				$("input[name='carInfo.appliEmail']").val($("#AppliEmail").val());
			}
		}else{
			$("input[name='carInfo.appliEmail']").val($("#AppliEmail").val());
			if(""==$("input[name='carInfo.insuredEmail']").val()){
				$("input[name='carInfo.insuredEmail']").val($("#AppliEmail").val());
			}
		}
		if(document.getElementById("InsuredNameOnePage")){
			if(""==$("input[name='carInfo.carOwner']").val()){
				$("input[name='carInfo.carOwner']").val($("#CarOwner").val());
			}
			if(""==$("input[name='carInfo.appliName']").val()){
				$("input[name='carInfo.appliName']").val($("#CarOwner").val());
			}
		}
		if(document.getElementById("insuredIdentifyNumber")){
			$("input[name='carInfo.insuredIdentifyType']").val($("#InsuredIdentifyType").val());
			$("input[name='carInfo.insuredIdentifyNumber']").val($("#insuredIdentifyNumber").val());
			if(""==$("input[name='carInfo.appliIdentifyType']").val()){
				$("input[name='carInfo.appliIdentifyType']").val($("#InsuredIdentifyType").val());
			}
			if(""==$("input[name='carInfo.appliIdentifyNumber']").val()){
				$("input[name='carInfo.appliIdentifyNumber']").val($("#insuredIdentifyNumber").val());
			}
			if(""==$("input[name='carInfo.carIdentifyType']").val()){
				$("input[name='carInfo.carIdentifyType']").val($("#InsuredIdentifyType").val());
			}
			if(""==$("input[name='carInfo.carIdentifyNumber']").val()){
				$("input[name='carInfo.carIdentifyNumber']").val($("#insuredIdentifyNumber").val());
			}
		}
		//费改赋值end
		//手机 邮箱 校验
		if(("11000000"==$("#citySelected").val()&&$("#NewCarSpan").hasClass('checked')) || "11000000"!=$("#citySelected").val()){
			//电话号码校验
			if(!checkCarItemMobile(tel)){
				tel.focus();
				return false;
			}
			//将所填手机号放入隐藏域
			var apliNo=tel.val();
			if(apliNo.indexOf("****")<=-1){
				$("input[name='carInfo.appliMobile']").val(apliNo);
				$("input[name='carInfo.insuredMobile']").val(apliNo);
			}
			//邮箱校验
			if(!checkCarItemEmail(email)){
				email.focus();
				return false;
			}
			var ctx = $("#ctx").val();
			var mobileWrap = $("#AppliMobile").parents(".field_wrap");
			
			var mobile;
			var carDataReuse = $("#carDataReuse").val();
			if($("input[name='carInfo.isRenewal']").val()==1 || carDataReuse=='1'){	//续保时
				if($("#isModify_t").val()==1){		//续保被修改时
					mobile = $("#AppliMobile").val();
				}else{
					mobile = $("input[name='carInfo.appliMobile']").val();
				}
			}else{
				mobile = $("#AppliMobile").val();
			}
			$.ajax({
				  url:ctx+"/carProposal/fastPrice/ajaxBlacklist",
				  type:"post",
				  data: {
					      channelNo:$("input[name='head.channelNo']").val(),
						  areaCode:$("input[name='carInfo.proSelected']").val(),
						  cityCode:$("input[name='carInfo.citySelected']").val(),
						  ccaFlag:$("input[name='ccaFlag']").val(),
						  mobile:mobile
				         },
				  dataType:"json",
			  success: function(data)
				 {
				  	var flag = data.message;
				  	if("1"!=flag){
				  		showInvalidTips(mobileWrap, "请输入其他的手机号!", true);
				  		return false;
				  	}else{
			  			removeInvalidTips(mobileWrap);
				  		$("input[name='carCodex']").val('');	//置空 通过过滤
						zanCun();
				  		$("#form").submit();
				  	}
				  },
					error:function(){
						window.location.href="/wap/views/carProposal/errorPage.jsp";
					}
			});
		}
		//北京地区转保车要走北京车辆查询接口
  		if($("#proSelected").val()=="11000000" && $("input[name='carInfo.isNewCar']").val()=="1"){
  			carQuery();
  		}
  		
	  //Insight监测代码获取投保人信息
		var certType;
		var type = $("#InsuredIdentifyType").val();
		if(type == "01"){
			certType = "身份证" ;
		}else if(type == "02"){
			certType = "户口薄" ;
		}else if(type == "03"){
			certType = "护照" ;
		}else if(type == "04"){
			certType = "军官证" ;
		}else if(type == "05"){
			certType = "驾驶执照" ;
		}else if(type == "06"){
			certType = "返乡证" ;
		}else if(type == "07"){
			certType = "港澳身份证" ;
		}else{
			certType = "其他" ;
		}
		dwb_picc = {}
		dwb_picc. eVar7 = $("#CarOwner").val();  
		dwb_picc. eVar8 = $("#AppliMobile").val();
		dwb_picc. eVar9 = $("#AppliEmail").val();
		dwb_picc. eVar10 = certType ;
		dwb_picc. eVar11 =$("#insuredIdentifyNumber").val();
		trkIstObject(dwb_picc);
		//Insight监测代码获取投保人信息
//		alert(certType)
	});
	
	
	//点击提交
    $("#renewalCitySubmit").click(function() {
    	//去空
    	$policyNo = trim($("#beforeProposalNo").val());
    	$idenfynumber = trim($("#beforeProposalNo").val());
    	
		//校验是否为空	
		if($policyNo ==''){
			//车险复用数据提示不一样
			if($("#carDataReuse").val()=='1'){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "请输入被保险人证件号！", true, $("#beforeProposalNo"));
			}else{
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "请输入证件号或上年保单号！", true, $("#beforeProposalNo"));
			}
			return false;	
		}else{
			removeInvalidTips($("#beforeProposalNo").parents(".field_wrap"));
		}
		//P字头
		$head=$policyNo.substring(0,1);
		if($head=="P"){	//校验保单号
			//校验格式是否正确
			var testNo = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
			var testNo1 = /[\uFF00-\uFFEF]/;  
			if(testNo.test($policyNo)||testNo1.test($policyNo)){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "证件号或上年保单号不匹配！", true, $("#beforeProposalNo"));
				return false;
			}
			var patternszOther ="[`~!@#%$^&*=|{}\\[\\]<>/?~@#￥……&*―|{}【】？]";
			if($("#beforeProposalNo").val().match(patternszOther)){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "请输入正确的保单号码！", true, $("#beforeProposalNo"));
				return false;
			}
			
			
			$riskcode=$policyNo.substring(1,4);//字母校验，必须全是字母
			if($policyNo.substring(1,4).toUpperCase()=="YAE"||$policyNo.substring(1,4).toUpperCase()=="YAF"){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "预约协议，代理协议的保单不可查询！", true, $("#beforeProposalNo"));
				return false;
			}
			if($policyNo.length!=22&&$policyNo.substring(0,2).toUpperCase()!="RC"){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "证件号或上年保单号不匹配！", true, $("#beforeProposalNo"));
				return false;
			}
			if($riskcode.search("^[A-Za-z]+$")!=0&&$policyNo.substring(0, 2).toUpperCase()!="RC"){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap3"), "证件号或上年保单号不匹配！", true, $("#otherInsureQueryPolicyNo"));

				return false;
			}
			if($policyNo.substring(1,2)=="K"||$policyNo.substring(1,2)=="O"||$policyNo.substring(1,2)=="N"){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "<font style='font-size:14px'>您好，您的保单号为：<font color='blue' >"+$policyNo+"</font> 的保险为特险业务，不能在此处查询保单信息，请见谅。</font>", true, $("#beforeProposalNo"));
				gosubmit=false;
				return false;
			}
			if($policyNo.substring(0,2).toUpperCase()=="RC"&&$policyNo.length!=18){
				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "证件号或上年保单号不匹配！", true, $("#beforeProposalNo"));
				return false;
			}
		}else {		//校验身份证号
//			if($idenfynumber.length==18){
//				for(var i =0;i<17;i++){
//					if(parseInt($idenfynumber.charAt(i))>=0 && parseInt($idenfynumber.charAt(i))<=9){
//					}else{
//						showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//						return false;
//					}
//				}
//				
//				if(!/^\d{17}(\d|x)$/i.test($idenfynumber)){
//					showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//					return false;
//				}
//				var iSum=0 ;
//				$idenfynumber=$idenfynumber.replace(/x$/i,"a");
//				for(var i = 17;i>=0;i--){
//					iSum += (Math.pow(2,i) % 11) * parseInt($idenfynumber.charAt(17 - i),11);
//				}
//				if(iSum%11!=1){
//					showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//					return false;
//				}
//			}
//			if($idenfynumber.length==15){
//				for(var i =0;i<15;i++){
//					if(parseInt($idenfynumber.charAt(i))>=0 && parseInt($idenfynumber.charAt(i))<=9){
//						
//					}else{
//						showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//						return false;
//					}
//				}
//			}
//			var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
//			
//			$idenfynumber=$idenfynumber.replace(/x$/i,"a");
//			if(aCity[parseInt($idenfynumber.substr(0,2))]==null){
//				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//				return false;
//			}
//			var sBirthday=$idenfynumber.substr(6,4)+"-"+Number($idenfynumber.substr(10,2))+"-"+Number($idenfynumber.substr(12,2));
//			var d=new Date(sBirthday.replace(/-/g,"/")) ;
//			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
//				showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "身份证号或上年保单号不匹配！", true, $("#beforeProposalNo"));
//				return false;
//			}
			
			//现在改成了证件号码
			
		}
		
		randWrap = $("#rand") .parents(".field_wrap");
        if($("#rand").val()==""){
            showInvalidTips(randWrap, "请输入验证码！", true);
            randWrap.focus();
            return false;
        }
        validdateCode();
    });
    
    
//    $("#closer1").bind('click', function() {
//    	var jianC =$("#data-shortname").val();
//    	$("#licenseNo_show").val(jianC.substring(0,1)+"*");
//    });
    $("#CarOwner").bind('blur', function() {
    	var proSelected = $("#proSelected").val();
    	var CarOwner = $("#CarOwner").val();
       if(proSelected=="53000000"){
    	   var reg = /^[A-Za-z0-9]+$/;
    	   if(reg.test(CarOwner)){
    		   showInvalidTips($("#CarOwner").parents(".field_wrap"), "姓名不能含有数字或字母！", true, $("#CarOwner"));
    	   }
       }
    });
  //弹出层关闭
    $(".popup_dialog").on('click', ".closer", function() {
        $(this).parents(".overlay").fadeOut();
        return false;
    });
    $(".popup_dialog").on('click', ".closerButton", function() {
    	$(this).parents(".overlay").fadeOut();
    	return false;
    });
    
    //费改初始化赋值（初始化放在后面便于调用方法）
    if($("#lastCityCheck").length>0){//上年城市
    	if(""!=$("#cityCodeLast").val()&&$("#citySelected").val()!=$("#cityCodeLast").val()){
			$("#lastCityCheck").val("0")
		}
    	if($("#lastCityCheck").val()=='0'){
    		for (i = 0; i < cities.length; i++) {
				if ($("#cityCodeLast").val() == cities[i][1]) {
					$("#city_picker").val(cities[i][2]);
					last_city_sel();
				}
			}
    	}else{
        	$("#new_client_like_last").click();
        }
    }
    if($("#birthDayCar").length>0){//出生日期
    	if($("#insuredBirthday").val()==""){
    		var mydate = new Date();
     	   var str = "" + mydate.getFullYear() + "-";
     	   str += (mydate.getMonth()+1) + "-";
     	   str += mydate.getDate();
     	$("#birthDayCar").val(getDateFull(str));
    	}else{
    		$("#birthDayCar").val(replace($("#insuredBirthday").val(),"/","-"))
    	}
    }
    $("#InsuredIdentifyType").val($("input[name='carInfo.insuredIdentifyType']").val())
    if($("input[name='carInfo.insuredIdentifyType']").val()=="01"){
    	$("#insuredIdentifyNumber").blur();
    }
    if($("#insuredIdentifSex").val() == "2"){//性别
			$("#woman").click();
	}else{
		$("#man").click();
	}
    
});
//点击显示获取验证码
function chengeRand(id){ 
	  $("#"+id).attr("src","/wap/CreateImage?next="+Math.random()); 
}
//判断验证码是否输入正确并进行续保查询
function validdateCode(){
	var ctx = $("#ctx").val();
    $.ajax({ 
    	type:"post", 
    	url:ctx+"/personelCenter/customer/verifyCodeCheck?signOnForm="+$("#rand").val(), 
    	dataType:"json", 
    	success:function (data) { 
    		var registerRand = $("#rand"), randWrap = registerRand.parents(".field_wrap"); 
        	if(data.message == "success"){ 
        		removeInvalidTips(randWrap);
        		//车辆信息复用标识
        		var carDataReuse = $("#carDataReuse").val();
        		if(carDataReuse=='1'){
        			query_carDataReuse();
        		}else{
        			query_renewal();
        		}
            	//去除提示
        		removeInvalidTips($("#beforeProposalNo").parents(".field_wrap"));
        	}else{ 
        		chengeRand("randImage");
	        	showInvalidTips(randWrap, "验证码不正确！", true); 
        	} 
    	} 
    }); 
}
function isNull(){
	if(document.getElementById("birthDayCar")){
		$("#insuredBirthday").val(replace($("#birthDayCar").val(),"-","/"));
	}
	if(document.getElementById("AppliEmail_fg")){ 
		$("input[name='carInfo.insuredEmail']").val($("#AppliEmail").val());
		if(""==$("input[name='carInfo.appliEmail']").val()){
			$("input[name='carInfo.appliEmail']").val($("#AppliEmail").val());
		}
	}else{
		$("input[name='carInfo.appliEmail']").val($("#AppliEmail").val());
		if(""==$("input[name='carInfo.insuredEmail']").val()){
			$("input[name='carInfo.insuredEmail']").val($("#AppliEmail").val());
		}
	}
	if(document.getElementById("InsuredNameOnePage")){
		if(""==$("input[name='carInfo.carOwner']").val()){
			$("input[name='carInfo.carOwner']").val($("#CarOwner").val());
		}
		if(""==$("input[name='carInfo.appliName']").val()){
			$("input[name='carInfo.appliName']").val($("#CarOwner").val());
		}
	}
	if(document.getElementById("insuredIdentifyNumber")){
		$("input[name='carInfo.insuredIdentifyType']").val($("#InsuredIdentifyType").val());
		$("input[name='carInfo.insuredIdentifyNumber']").val($("#insuredIdentifyNumber").val());
		if(""==$("input[name='carInfo.appliIdentifyType']").val()){
			$("input[name='carInfo.appliIdentifyType']").val($("#InsuredIdentifyType").val());
		}
		if(""==$("input[name='carInfo.appliIdentifyNumber']").val()){
			$("input[name='carInfo.appliIdentifyNumber']").val($("#insuredIdentifyNumber").val());
		}
		if(""==$("input[name='carInfo.carIdentifyType']").val()){
			$("input[name='carInfo.carIdentifyType']").val($("#InsuredIdentifyType").val());
		}
		if(""==$("input[name='carInfo.carIdentifyNumber']").val()){
			$("input[name='carInfo.carIdentifyNumber']").val($("#insuredIdentifyNumber").val());
		}
	}
	//将所填手机号放入隐藏域
	var apliNo=$("#AppliMobile").val();
	if(apliNo.indexOf("****")<=-1){
		$("input[name='carInfo.appliMobile']").val(apliNo);
		$("input[name='carInfo.insuredMobile']").val(apliNo);
	}
	if($("#AppliMobile").val()!=""){
		zanCun()
	}
}
//暂存
function zanCun(){
	var ctx = $("#ctx").val();
	$.ajax({
		url:ctx+"/carProposal/car/interim",
		type:"post",
		async:false,
		data:{
			mobileflag:"1",
			licenseno:$("input[name='carInfo.licenseNo']").val() || $('#licenseNo_show').val(),
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			//费改增加字段start
			areaCodeLast:$("#areaCodeLast").val(),
			cityCodeLast:$("#cityCodeLast").val(),
			insuredIdentifSex:$("#insuredIdentifSex").val(),
			insuredBirthday:$("#insuredBirthday").val(),
			//费改增加字段end
			lastcarownername:$("input[name='carInfo.lastcarownername']").val(),
			startdate:$("input[name='carInfo.startDateSY']").val(),
			starthour:$("input[name='carInfo.startHourSY']").val(),
            enddate:$("input[name='carInfo.endDateSY']").val(),
            endhour:$("input[name='carInfo.endHourSY']").val(),
            startDateCI:$("input[name='carInfo.startDateCI']").val(),
            startHourCI:$("input[name='carInfo.starthourCI']").val(),
            endDateCI:$("input[name='carInfo.endDateCI']").val(),
            endHourCI:$("input[name='carInfo.endhourCI']").val(),
            engineno:$("input[name='carInfo.engineNo']").val(),
            vinno:$("input[name='carInfo.vinNo']").val(),
            frameno:$("input[name='carInfo.frameNo']").val(),
            enrolldate:$("input[name='carInfo.enrollDate']").val(),
            standardName:$("input[name='carInfo.vehicle_modelsh']").val(),		//品牌型号
            seatcount:$("input[name='carInfo.seatCount']").val(),
            linkAddress:$("input[name='carInfo.deliverInfoAddress']").val(),
            runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
            assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
            carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
            haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
            LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
            guohuselect:$("input[name='carInfo.guohuselect']").val(),
            transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
            fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
            appliEmail:$("input[name='carInfo.appliEmail']").val(),
            appliIdentifyNumber:$("input[name='carInfo.appliIdentifyNumber']").val(),
            appliIdentifyType:$("input[name='carInfo.appliIdentifyType']").val(),
            appliMobile:$("input[name='carInfo.appliMobile']").val(),
            appliName:$("input[name='carInfo.appliName']").val(),
            taxPayerIdentNo:$("input[name='carInfo.taxPayerIdentNo']").val(),
            taxPayerName:$("input[name='carInfo.taxPayerName']").val(),
            aliasName:$("input[name='carInfo.aliasName']").val(),
            carOwerIdentifyType:$("input[name='carInfo.carOwerIdentifyType']").val(),
            carOwner:$("input[name='carInfo.carOwner']").val(),
            insuredEmail:$("input[name='carInfo.insuredEmail']").val(),
            insuredIdentifyAddr:$("input[name='carInfo.insuredIdentifyAddr']").val(),
            insuredIdentifyType:$("#InsuredIdentifyType").val(),
            insuredIdentifyNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
            insuredMobile:$("input[name='carInfo.insuredMobile']").val()||$('input[name="carInfo.appliMobile"]').val(),
            insuredName:$("#InsuredName").val(),
            argueSolution:$("input[name='carInfo.argueSolution']").val(),
            insuredAndOwnerrelate:$("input[name='carInfo.insuredAndOwnerrelate']").val(),
            arbitboardname:$("input[name='carInfo.arbitboardname']").val(),
            appliAddName:$("input[name='carInfo.appliAddName']").val(),
            deliverInfoPro:$("input[name='carInfo.deliverInfoPro']").val(),
            deliverInfoCity:$("input[name='carInfo.deliverInfoCity']").val(),
            deliverInfoDistrict:$("input[name='carInfo.deliverInfoDistrict']").val(),
            appliPhoneNumber:$("input[name='carInfo.appliPhoneNumber']").val(),
            invoiceTitle:$("input[name='carInfo.invoiceTitle']").val(),
            isBZ:$("#hasBz").val(),
            hasSy:$("input[name='carInfo.hasSy']").val(),
            itemKindFlag:'1',
        	travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
            licenseflag:$("input[name='carInfo.isNewCar']").val(),//$("input[name='carInfo.licenseFlag']").val(),
            certificatedate:replace($("input[name='carInfo.certificatedate']").val(),"-","/"),
            monopolyname:$("input[name='carInfo.majorFactoryName']").val(),		//专修厂名称
            weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
            isRenewal:$("input[name='carInfo.isRenewal']").val(),
            interimNo:$("input[name='carInfo.interimNo']").val(),		//暂存单号
            beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),   
            taxPayerIdentType:$("input[name='carInfo.taxpayertype']").val(),
            carKindCI:$("input[name='carInfo.carKindCI']").val(),
            bjfuel_type:$("input[name='carInfo.bjfuel_type']").val(),
        	certificate_type:$("input[name='carInfo.certificate_type']").val(),
    		certificate_no:$("input[name='carInfo.certificate_no']").val(),
			certificate_date:replace($("input[name='carInfo.certificate_date']").val(),"-","/"),
			carIdentifyAddressSX:$("input[name='carInfo.carIdentifyAddressSXId']").val(),		//（山西）车主身份证地址
			carNameSX:$("input[name='carInfo.carNameSXId']").val(),				//（山西）车辆名称、品牌
			carKindSX:$("input[name='carInfo.carKindSXId']").val(),				//（山西）车辆种类
			ccaId:$("input[name='carInfo.ccaId']").val(),
            cmpid:$('input[name="carInfo.cmpid"]').val(),
            comname:$('input[name="carInfo.comName"]').val()
			
//            nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
//            newcarflag:$("input[name='carInfo.isNewCar']").val(),
//			seatflag :$("input[name='carInfo.seatFlag']").val(),
//			isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
//			shanxiHighPriRem:shanxiHighPriRem
		 },
		 dataType:"json",
	     success: function(data)
		 {
	    	 var comm = data.common;
	    	 var resultCode = (JSON.parse(comm)).resultCode;
	    	 if(resultCode == 1){
	    		 $("input[name='carInfo.interimNo']").val(data.interimNo);
//	           	 setTimeout(function(){},2000);                   	 
	    	 }
		 }
	});
}

//续保判断调用续保判断接口
function isRenewal(){
	var ctx = $("#ctx").val();
	var return_val = true;
	$.ajax({
		  url:ctx+"/carProposal/renewal/isRenewal",
		  type:"post",
		  async:false,
		  data: {
			  	 channelNo:$("input[name='head.channelNo']").val(),
			  	 citySelected:$("#citySelected").val(),
			  	 licenseNo:$("#licenseNo").val(),
			  	 ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
		         sessionId:$("#sessionId").val()
		         },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   	  success: function(data)	
		  {
   		  		  var code = data.resultCode;
   		  		  if(code==1){
   		  			 if($("input[name='carInfo.isRenewal']").val()!="1"){
   		  				document.getElementById("xinche").style.display="none";
//   		  			document.getElementById("xinche").style.visibility="hidden";
   		  			//续保判断弹出层 打开
   		  			document.getElementById("tiaoguocibu").style.display="none";//跳过此步按钮隐藏
   			        $("#renewalCity").removeClass("close").addClass("open").find(".collapse,.closer").bind('click', function() { 
   			        	$(this).parents(".declaration").addClass("close"); 
   			        	return_val = false; 
   			        });
   			        $("#beforeProposalNo").val($("input[name='carInfo.cooperIdNum']").val())
   			        $("#beforeProposalNo").focus(); 
   		  			  }
   		  			
   		  		  }else if(code==4){
   		  			var licenseNo = $("#licenseNo_show"), licenseNoWrap = licenseNo.parents(".field_wrap");
	   		  	    	showInvalidTips(licenseNoWrap, data.resultMsg, true);
   			        	return_val = false; 
   		  		  }else {
   		  			$("input[name='carInfo.isRenewal']").val(0);
   		  			var carDataReuse1 =  $("#carDataReuse").val();
   		  			if(carDataReuse1==""){
   		  				carDataReuse();
   		  			}
   		  		  }
		  },  
          error : function(XMLHttpRequest,textStatus,errorthrow){  
//              alert("XMLHttpRequest.status="+XMLHttpRequest.status);  

          } 
   });
   return return_val;
}
function carDataReuse(){
	    var ctx = $("#ctx").val();
		$.ajax({
			  url:ctx+"/carProposal/car/carDataReuse",
			  type:"post",
			  async:false,
			  data: {
		  	    	  channelNo:$("input[name='head.channelNo']").val(),
					  proSelected:$("input[name='carInfo.proSelected']").val(),
					  citySelected:$("input[name='carInfo.citySelected']").val(),
					  licenseflag:$("input[name='carInfo.isNewCar']").val(),
					  licenseNo:$("#licenseNo_show").val()
			        },
			  dataType:"html",
			  success: function(data){
				  data1 = eval('('+data+')');
				  data2= eval('('+data1.message+')');
				  var flag = data2.resultCode;
				  	if(flag=='1') {
						var skipStep = $('#skipStep').val();
						if (skipStep) {
							$("#carDataReuse").val('1');
						    $("#dataReuseReplace1").text('欢迎您再次浏览人保车险，输入被保险人证件号即可更便捷购买哦。');
						    $("#dataReuseReplace2").text('被保险人证件号');
					    }
				  		//弹出层
				  		document.getElementById("tiaoguocibu").style.display="block";//跳过此步按钮展示
	   			        $("#renewalCity").removeClass("close").addClass("open").find(".collapse,.closer").bind('click', function() { 
	   			        	$(this).parents(".declaration").addClass("close"); 
	   			        	return_val = false; 
	   			        });
				  	}
			  },
			  error:function(){
					window.location.href="/wap/views/carProposal/errorPage.jsp";
			  }
		});
}
//续保判断调用续保查询接口
function query_renewal(){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/renewal/queryRenewal",
		  type:"post",
		  data: {
			  	 proSelected:$("#proSelected").val(),
			  	 citySelected:$("#citySelected").val(),
			  	 beforeProposalNo:trim($("#beforeProposalNo").val()),
			  	 licenseNo:$("#licenseNo").val(),
		         sessionId:$("#sessionId").val()
		         },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   	  success: function(data)	
		  {
   		  			if(data==2||data==3||data==4){
	   		  			showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "证件号或上年保单号不匹配！", true, $("#beforeProposalNo"));
   		  			}else if(data==7){
   		  				window.location.href="/wap/views/carProposal/errorReject.jsp";
   		  			}else {
	   		  			$("#renewalCity").addClass("close");
		   		  		//清除误操作出现的错误提示
		   		  	    removeInvalidTips($("#CarOwner").parents(".field_wrap"));
		   		  	    removeInvalidTips($("#AppliMobile").parents(".field_wrap"));
		   		  	    removeInvalidTips($("#AppliEmail").parents(".field_wrap"));
		   		  	    removeInvalidTips($("#mobemailDiv"));
		   		  	    
			   		  	//是否续保标志 0: 转保 1：续保 2：新车
					    $("input[name='carInfo.isRenewal']").val(1);
					    //车主姓名
					    var carOwner = data.carOwnerInfo.carOwner
					    if(carOwner.indexOf("")>0){
					    	carOwner = carOwner.replace("", "  ");
					    }
					    $("input[name='carInfo.carOwner']").attr("value",carOwner);
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
//						//车牌号
//						$("input[name='carInfo.licenseNo']").attr("value",data.appliCarInfo.licenseNo);
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
						//车座数
						$("input[name='carInfo.seatCount']").attr("value",data.appliCarInfo.seat);
						
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
						//是否外地车
						$("input[name='carInfo.nonlocalflag']").attr("value", data.nonlocalflag);
						//是否过户车
						$("input[name='carInfo.guohuselect']").val(data.guoHuSelect);
						//是否指定行驶区域  03指定；11不指定
						$("input[name='carInfo.runAreaCodeName']").attr("value",data.runAreaCode);
						//是否上一年违法
						$("input[name='carInfo.weiFaName']").attr("value", data.weiFaName);
						
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
						$("input[name='carInfo.insuredEmail']").attr("value", data.insuredInfo.insuredEmail);
						
						
						//车牌标志
						$("input[name='carInfo.licenseFlag']").val(1);
						//车型
						$("input[name='carInfo.vehicle_modelsh']").val(data.appliCarInfo.standardName);
						$("input[name='carInfo.oldRNew']").val(data.common.resultMsg);
						
						//选择车型的标识
						if(data.common.resultCode == '5'){
							$("input[name='carInfo.isNeedQueryCarModel']").val(5);
						}else{
							$("input[name='carInfo.isNeedQueryCarModel']").val(1);
						}
						
						//商业险保单号
						$("input[name='carInfo.beforeProposalNo']").val(data.tokenNo);
						//争议解决方式
						$("input[name='carInfo.argueSolution']").val(data.insuredInfo.argueSolution);
						//纳税人姓名
						$("input[name='carInfo.taxPayerName']").val(data.carShipTax.taxPayerName);
						//纳税人证件号
						$("input[name='carInfo.taxPayerIdentNo']").val(data.carShipTax.taxPayerIdentNo);
						//发票抬头
						$("input[name='carInfo.invoiceTitle']").attr("value",data.invoice);
						
						$("input[name='carInfo.isOutRenewal']").val(data.isOutRenewal);
						$("input[name='carInfo.lastHas050200']").val(data.lastHas050200);
						$("input[name='carInfo.lastHas050210']").val(data.lastHas050210);
						$("input[name='carInfo.lastHas050500']").val(data.lastHas050500);
						$("input[name='carInfo.lastHas050291']").val(data.lastHas050291);
						//收件人姓名
						$("input[name='carInfo.appliAddName']").val(data.receiverInfo.receiver);
						//收件人联系电话carInfo.appliPhoneNumber
						$("input[name='carInfo.appliPhoneNumber']").val(data.receiverInfo.mobile);
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
						//收件人 邮编
						$("input[name='carInfo.postCode']").val(data.receiverInfo.postCode);
						//车座标志位   0否 1显示 
						$("input[name='carInfo.seatFlag']").attr("value", data.appliCarInfo.seatFlag);
						//上年出险次数  未出险年数
						$("input[name='carInfo.lastdamageBI']").attr("value", data.renewalPrpcitemCarExt.lastdamagedbi);
						$("input[name='carInfo.noDamyearsBI']").attr("value", data.renewalPrpcitemCarExt.nodamyearsbi);
						//上年车主姓名lastcarownername
						$("input[name='carInfo.lastcarownername']").attr("value", data.carOwnerInfo.carOwner);
						//隐藏手机号 中间4位
						//费改增加续保信息载入新加控件start
					    $("#InsuredIdentifyType").val($("input[name='carInfo.insuredIdentifyType']").val())
					    $("#insuredIdentifyNumber").val($("input[name='carInfo.insuredIdentifyNumber']").val())
					    if($("input[name='carInfo.insuredIdentifyType']").val()=="01"){
					    	$("#insuredIdentifyNumber").blur();
					    }
						if(document.getElementById("AppliEmail_fg")){
							$("#AppliEmail").val($("input[name='carInfo.insuredEmail']").val());
						}else{
							$("#AppliEmail").val($("input[name='carInfo.appliEmail']").val());
						}
						//费改增加将续保信息载入新加控件end
						var appliPhoneNO = "";
						if(document.getElementById("AppliEmail_fg")){
							appliPhoneNO = data.insuredInfo.insuredMobile;
						}else{
							appliPhoneNO = data.appliInfo.appliMobile;
						}
						appliPhoneNO=appliPhoneNO.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
						if(appliPhoneNO.length==11){//如果是座机号则不显示
							$("#AppliMobile").val(appliPhoneNO);
						}
						$("#isModify_t").val(0);	//设置 手机号是否修改标志位 （针对首次新保再改成续保的情况）
						
						 if("11000000"==$("#citySelected").val()){
							 $("input[name='carInfo.carKindCI']").val(1)
							 $("#bjFrameNo").hide();
							
						}
						 emailIsNull();
   		  			}
	   				
		  },  
          error : function(XMLHttpRequest,textStatus,errorthrow){  
          } 
   });
}
//页面跳转
function oneGoTwo(){
	
	$("#form").submit();
}

/*
 *判断图片是否被点击
 */
function isCheck(){
	if($("input[name='carInfo.isNewCar']").val()==0 || $("input[name='carInfo.isNewCar']").val() == null){
		$("input[name='carInfo.isNewCar']").val(0);
		//北京地区邮箱和电话显示
	    if("11000000"==$("#citySelected").val()){
			$("#mobemailDiv1").show();
			$("#mobemailDiv2").show();
		}
	    $("#NewCarSpan").addClass("checked");
	}else{
	    $("input[name='carInfo.isNewCar']").val(1);
		//北京地区邮箱和电话bu显示
	    if("11000000"==$("#citySelected").val()){
			$("#mobemailDiv1").hide();
			$("#mobemailDiv2").hide();
		}
	    $("#NewCarSpan").removeClass("checked");
	}
}

/*
* Description: 验证车牌号码
* Parameter: LicenseNo：车牌号码
*			 isNewCar:新车标识位
*			 licensenoConf:车牌信息配置（隐藏域）
*			 citySelected：城市代码
* Author:  
*/
function checkLicenseNo(LicenseNo){
	var msg="";
	var citySelected = $("#citySelected").val();
	var isNewCar =false;
	var ccaFlag = 2;
	var expression = false;
	if($("input[name='carInfo.isNewCar']").val()=="0"){
		isNewCar = true;
	}
	//车牌号非空验证 
	var licenseNo = $("#licenseNo_show"), licenseNoWrap = licenseNo.parents(".field_wrap");
	if(trim(licenseNo.val())== "" && !isNewCar){
    	msg="车牌号码不能为空！";
    	showInvalidTips(licenseNoWrap, msg, true);
    	return false;
  	}
  	//车牌号格式验证
  	var pattern=/^[\u4e00-\u9fa5][A-Z](\s)?[A-Z0-9]{5}$/;
  	var patternsz = /^[\u4e00-\u9fa5][A-Z](\s)?[A-Z0-9]{5,7}$/;
  	if(patternsz.test(LicenseNo)==false && !isNewCar){
  		msg="请输入正确的车牌号码！";
  		showInvalidTips(licenseNoWrap, msg, true);
    	return false;
  	}
  	removeInvalidTips(licenseNoWrap);
  	return true;
}
/*
* Description: 验证车主姓名
* Parameter: 
* Author: 
*/
function checkCarOwnerName_CI_1(obj){
	var carOwnerWrap = obj.parents(".field_wrap");
	var msg = "";
	msg = trim(checkCarOwnerName());
	if(msg == "true"){
		removeInvalidTips(carOwnerWrap);
		return true;
	}else{
  		showInvalidTips(carOwnerWrap, msg, true);
		return false;
	}
	return true;
}
function checkCarOwnerName(){
	
	var msg="";
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/fastPrice/carOwner",
		  type:"post",
		  async:false,
		  data: {
		   		  channelNo:$("input[name='head.channelNo']").val(),
			      carOwner:$("#CarOwner").val(),
			      isRenewal:$("input[name='carInfo.isRenewal']").val(),
				  proSelected:$("input[name='carInfo.proSelected']").val()
		         },
		  dataType:"json",
	  success: function(data)
		 {
		  if(data.resultCode!='1'){
			  msg=data.resultMsg;	
			  if(msg=='请输入《机动车行驶证》上登记的<br>\\“所有人\\”姓名'){
				  msg = "请输入车主姓名！";
			  }
		  }else{
				msg="true";  
		  }
		  }
});
	return msg;
	
}
/*
 * Description: 验证手机号码 Parameter: Author: 
 */
function checkCarItemMobile(obj) {
	var mobileWrap = obj.parents(".field_wrap");
	var msg = ""
	if($("#isModify_t").val()==1){	//用户修改后
		msg = trim(checkMobilePhoneNum(obj));
	}else{
		msg = trim(checkMobilePhone(obj));
	}
	
	if (msg == "true") {
		removeInvalidTips(mobileWrap);
		return true;
	} else {
//		showTipsCo(obj,msg)
		showInvalidTips(mobileWrap, msg, true);
		return false;
	}
} 

/**
 * 手机号 新校验
 * @param dom
 * @returns {String}
 */
function checkMobilePhone(dom){
	var mobile = dom.val();
	var reg =/^0{0,1}(13[0-9]|17[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9|****]{4}[0-9]{4}$/;
   	var msg="";
   	if(trim(mobile)==""){
       	msg="请输入手机号码！";
	    return msg;
    }
   	if(reg.test(mobile) == false){
       	msg="请输入正确的手机号码！";
       	return msg;
 	}  
 	return "true";
}


/*
* Description: 验证 电子邮箱
* Parameter: 
* Author: 
*/
function checkCarItemEmail(obj){
	var emailWrap = obj.parents(".field_wrap");
	var msg = ""
	msg = trim(checkEmail(obj));
	if(msg == "true"){
		removeInvalidTips(emailWrap);
		return true;
	}else{
		showInvalidTips(emailWrap, msg, true);
		return false;
	}
}
function chackCarPrice(){
	var price = $("#CarPriceDiv").val();
	var msg = "";
	if(parseFloat(price)<1){
		msg="请在1-200万之间录入！";
	}else if(trim(price) == ""){
		msg="请输入车辆估价！";
	}else if(isNaN(price)){
		msg="车辆估价只能输入数字！";
	}
	var CarPriceWrap = $("#CarPriceDiv").parents(".field_wrap")
	if(msg==""){
		removeInvalidTips(CarPriceWrap);
		return true;
	}else{
		CarPriceWrap.focus()
		showInvalidTips(CarPriceWrap, msg, true);
		return false;
	}
}
function checkContactName(){
	if($("#baseInfoContactName").val()==""){
		showInvalidTips($("#baseInfoContactName").parents(".field_wrap"), "请输入联系人姓名！", true);
		return false;
	}
	removeInvalidTips($("#baseInfoContactName").parents(".field_wrap"));
	return true;
}

function forSubmit(){
	var ctx = $("#ctx").val();
	//清空提示错误元素
   	$(".validate_tip").remove();
	//TODO 下一步时页面验证需要调整
	var plate = $("#licenseNo_show");
	//var carname = $("#CarOwner");
 	var tel = $("#AppliMobile");
   	var email = $("#AppliEmail");
   	var newcar = $("#isNewCar");

	//下一步 校验 车牌号
   	if(!$("#NewCarSpan").hasClass('checked')){
		if(!checkLicenseNo(plate.val())){
			$("#licenseNo_show").focus()
			return false;
		};
	}else{
		plate.val("");
	}
	
////下一步校验 车主姓名
//	if(!checkCarOwnerName_CI_1(carname)){
//		carname.focus();
//		return false;
//	};
//	if(!chackCarPrice()){
//		return false;
//	}
//	if(!checkContactName()){
//		return false;
//	}
	//电话号码校验
	if(!checkCarItemMobile(tel)){
		tel.focus();
		return false;
	}
	
    //邮箱校验
	if(!checkCarItemEmail(email)){
		email.focus();
		return false;
	}
	//接口车牌号
	if($("input[name='carInfo.isNewCar']").val()=='1'){
		if($("#blanclistflag").val()!="true"){
			var mobileWrap = $("#licenseNo_show").parents(".field_wrap");
			showInvalidTips(mobileWrap, "请输入正确的车牌号码！", true);
			$("#licenseNo_show").focus();
			return  false;
		}
	}
	$.ajax({
		  url:ctx+"/carProposal/fastPrice/ajaxFastPrice",
		  type:"post",
		  data: {
				  requestType:$("input[name='head.requestType']").val(),
				  requestCode:$("input[name='head.requestCode']").val(),
				  sessionId:$("input[name='head.sessionId']").val(),
				  channelNo:$("input[name='head.channelNo']").val(),
				  proSelected:$("input[name='carInfo.proSelected']").val(),
				  citySelected:$("input[name='carInfo.citySelected']").val(),
				  licenseNo:$("input[name='carInfo.licenseNo']").val(),
				  cname:$("#baseInfoContactName").val(),
				  appliMobile:$("input[name='carInfo.appliMobile']").val(),
				  appliEmail:$("input[name='carInfo.appliEmail']").val(),
				  isNewCar:$("input[name='carInfo.isNewCar']").val(),
				  reDataFlag:$("input[name='carInfo.reDataFlag']").val(),
				  carPrice:$("input[name='carInfo.carPrice']").val(),
				  isfromStep2:$("input[name='carInfo.isfromStep2']").val(),
				  carYears:$("select[name='carYears']").val()
		         },
		  dataType:"json",
 	  success: function(data)
		 {
 		  	var listPu=eval(data);
 		  	if("1"==listPu[0]){
 		  		$("#body").attr("value",listPu[1]);
 		  		$("#estimatesForm").submit();
 		  	}
 		  	if("3"==listPu[0]){
 		  		var CarPriceWrap = $("#CarPriceDiv").parents(".field_wrap")
 		  		showInvalidTips(CarPriceWrap, "车价"+listPu[1]+"以上的客户请选择到我公司就近网点报价，或咨询4001234567-2.", true);
 		  		return false;
 		  	}
		  		
		  }
 });
}
function jsBlanclist(){
	var ctx = $("#ctx").val();
	if(checkCarItemMobile($("#AppliMobile"))==true){
		var mobile;
		if($("input[name='carInfo.isRenewal']").val()==1){	//续保时
			if($("#isModify_t").val()==1){	//被修改了
				mobile = $("#AppliMobile").val();
			}else{	
				mobile = $("input[name='carInfo.appliMobile']").val();
			}
		}else{
			mobile = $("#AppliMobile").val();
		}
		var mobileWrap = $("#AppliMobile").parents(".field_wrap");
		$.ajax({
			  url:ctx+"/carProposal/fastPrice/ajaxBlacklist",
			  type:"post",
			  data: {
				      channelNo:$("input[name='head.channelNo']").val(),
					  areaCode:$("input[name='carInfo.proSelected']").val(),
					  cityCode:$("input[name='carInfo.citySelected']").val(),
					  ccaFlag:$("input[name='ccaFlag']").val(),
					  mobile:mobile
			         },
			  dataType:"json",
		  success: function(data)
			 {
			  	var flag = data.message;
			  	if("1"!=flag){
			  		showInvalidTips(mobileWrap, "请输入其他的手机号!", true);
			  	}
			  	else{
			  		if($("#InsuredIdentifSexOnePage").length > 0){
			  			$("input[name='carInfo.insuredMobile']").val(mobile);
			  		}
			  		removeInvalidTips(mobileWrap);
			  	}
			  },
				error:function(){
					window.location.href="/wap/views/carProposal/errorPage.jsp";
				}
	});
	}
	
}

function jsPlateNumber(n){
	var ctx = $("#ctx").val();
		var mobileWrap = $("#licenseNo_show").parents(".field_wrap");
		$.ajax({
			  url:ctx+"/carProposal/car/ajaxPlateNumber",
			  type:"post",
			  async:false,
			  data: {
		  	    	  channelNo:$("input[name='head.channelNo']").val(),
					  proSelected:$("input[name='carInfo.proSelected']").val(),
					  citySelected:$("input[name='carInfo.citySelected']").val(),
					  licenseflag:$("input[name='carInfo.isNewCar']").val(),
					  licenseNo:$("#licenseNo_show").val(),
					  cooperE:$("#cooperE").val(),
					  comName:$("#comName").val()
			        },
			  dataType:"html",
			  success: function(data)
				 {
				  data1 = eval('('+data+')');
				  data2= eval('('+data1.message+')');
				  var flag = data2.resultCode;
				  if(flag=='5'){
					  window.location.href="/wap/views/carProposal/errorReject.jsp"; 
				  }
				  if(n == "newcar"&&flag=='4'){
					  $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
				  	  $("#alertMsg").html(data2.resultMsg+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
					
				  }else{
					  if("1"!=flag){
					  		var resultmsg=data2.resultMsg;
							if($("input[name='carInfo.proSelected']").val() == "43000000" && "车牌号码应为[湘]开头" == resultmsg){
								cueAlert("尊敬的用户，您好！<br>由于你的爱车不在湖南地区登记上户，请到附近的中国人保营业厅办理，感谢你对中国人保的信任！",{"name":"确定","fun":"closeCue"});
							}
					  		showInvalidTips(mobileWrap, resultmsg, true);
					  		$("#blanclistflag").attr("value","false");
					  	}
					  	else{
					  		removeInvalidTips(mobileWrap);
					  		$("#blanclistflag").attr("value","true");
					  	} 
				  }
				  	
				  },
					error:function(){
						window.location.href="/wap/views/carProposal/errorPage.jsp";
					}
		});
}

//北京地区非新车 车辆查询
function carQuery(){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/carSelect/carQuery",
		  type:"post",
		  data: {
				  proSelected:$("input[name='carInfo.proSelected']").val(),
				  citySelected:$("input[name='carInfo.citySelected']").val(),
				  carOwner:$("input[name='carInfo.carOwner']").val(),
				  licenseNo:$("#licenseNo_show").val(),
				  queryCode:$("input[name='carInfo.vehicle_modelsh']").val(),
				  engineNo:$("input[name='carInfo.engineNo']").val(),
				  enrollDate:$("input[name='carInfo.enrollDate']").val(),
				  frameNo:$("input[name='carInfo.frameNo']").val(),
				  licenseFlag:$("input[name='carInfo.isNewCar']").val(),
				  vinNo:$("input[name='carInfo.vinNo']").val(),
				  isRenewal:$("input[name='carInfo.isRenewal']").val(),
				  sessionId:$("#sessionId").val()
		        },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
			 {
			  var common = eval("("+data.common+")");
	 		  if(common.resultCode!=1||data.queryVehicle=="[]"){
	 			  //如果北京平台查不到车，显示车架号填写
	 			 $("#bjFrameNo").show();
	 			 $("input[name='carInfo.carKindCI']").val(1);//这是天津需要的隐藏域，北京不需要，使用他做一个标示，标示显示车架号
	 			 var tishi = "对不起，您输入的车辆信息在当地保险公共平台无匹配记录，请核实！";
	 			 $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
			  	 $("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
				
			  	if("11000000"==$("#citySelected").val()){
					 $("input[name='carInfo.carKindCI']").val("")
					 $("#bjFrameNo").show();
					
				}
	 			 return false;
	 		  }
	 		  	$("input[name='carInfo.frameNo']").val(data.frameNo);
	 		  	$("input[name='carInfo.enrollDate']").val(replace(data.enrollDate,"/","-"));
	 		  	$("input[name='carInfo.engineNo']").val(data.engineNo);
		  		$("input[name='carCodex']").val('');	//置空 通过过滤
		  		$("#form").submit();
			  },
				error:function(){
					window.location.href="/wap/views/carProposal/errorPage.jsp";
				}
	});
}
function checkFrameNo() {
	
	var ctx = $("#ctx").val();
	var FrameNoWrap = $("#frameNoInput").parents(".field_wrap");
	var flag = false;
	$.ajax({
		  url:ctx+"/carProposal/car/randFrameNo",
		  type:"post",
		  async:false,
		  data: {
			  channelNo:$("input[name='head.channelNo']").val(),
			  proSelected:$("input[name='carInfo.proSelected']").val(),
			  citySelected:$("input[name='carInfo.citySelected']").val(),
			  FrameNo:$("#frameNoInput").val(),
			  EnrollDate:replace($("#EnrollDate").val(),"-","/"),
			  isRenewal:$("input[name='carInfo.isRenewal']").val(),
			  isFocus:$("#isFocus").val()
		         },
		  dataType:"html",
	  success: function(data)
		 {
		  data1 = eval('('+data+')');
		  data2= eval('('+data1.message+')');
		  var flag1 = data2.resultCode;
		  	if("1"!=flag1){
		  		var resultmsg=data2.resultMsg+"!";
		  		showInvalidTips(FrameNoWrap,resultmsg , true);
		  		flag = false;
		  	}
		  	else{
		  		removeInvalidTips(FrameNoWrap);	
		  		flag = true;
		  	}
		  },
			error:function(){
				window.location.href="/wap/views/carProposal/errorPage.jsp";
			}
	});
	return flag;
}
/*
 * Description: 发动机号 输入域
 * Parameter: field 发动机号节点 $("#EngineNo")
 * Author: 
 */
function checkEngineNo(field) {
	var msg = "";
	var EngineNo = field.val();
	var length_1 = EngineNo.length;
	var engineNoWrap = field.parents(".field_wrap");

	EngineNo = trim(EngineNo);
	var length_2 = EngineNo.length;
	if (length_1 > length_2) {
		msg = "请输入正确的发动机号！";
		showInvalidTips(engineNoWrap, msg, true);
		return false;
	}

	var pattern=/^[.*0-9A-Za-z\s/-]+$/;
    var flag=pattern.test(EngineNo); 
    
    if(!flag){
      	msg="请输入正确的发动机号！";
      	showInvalidTips(engineNoWrap, msg, true);
      	return false;
	}
    
    var ctx = $("#ctx").val();
    var ajaxFlag = false;
	$.ajax({
		url:ctx +　"/carProposal/Verify/verifyEngineNo",
		type: "post",
		async:false,
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			engineNo:trim(EngineNo),
			citySelected:$("#citySelected").val(),
			sessionId:$("#sessionId").val()
		},
		dataType:"json",
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    success:function(data){
	    	if(data.resultCode != 1){
	    		showInvalidTips(engineNoWrap, data.resultMsg, true);
	    	}else{
	    		ajaxFlag = true;
	    	}
	    	
	    }
	});
	if(!ajaxFlag){
		return false;
	}else{
		removeInvalidTips(engineNoWrap);
	  	return true;
	}
    
}
//关闭续保弹出层
function closeXubao(){
	//关闭弹出层 时 清空所有信息   防止续保车走转保流程 
//	$(".declaration").addClass("close").find(".collapse,.closer")

	$(".declaration").addClass("close");		//关闭弹出层
	$("#licenseNo_show").attr("readonly",false);	//可修改
	$("#licenseNo_show").val($("#data-shortname").val());
	$("#CarOwner").val('');
	$("#AppliMobile").val('');
	$("#AppliEmail").val('');
	$("#rand").val('');
	$("#beforeProposalNo").val('');
	$("input[name='carInfo.isRenewal']").val('');
	$("input[name='carInfo.carOwner']").val('');
	$("input[name='carInfo.appliEmail']").val('');
	$("input[name='carInfo.appliMobile']").val('');
	if($("#xincheShow").length>0)
	document.getElementById("xinche").style.display="";		//显示新车未上牌
	//清除误操作出现的错误提示
    removeInvalidTips($("#CarOwner").parents(".field_wrap"));
    removeInvalidTips($("#AppliMobile").parents(".field_wrap"));
    removeInvalidTips($("#AppliEmail").parents(".field_wrap"));
    removeInvalidTips($("#rand").parents(".field_wrap"));
    removeInvalidTips($("#beforeProposalNo").parents(".field_wrap"));
    removeInvalidTips($("#mobemailDiv"));
    $("#carDataReuse").val('');
}
//关闭续保弹出层
function puseThisStep(){
	$(".declaration").addClass("close");		//关闭弹出层
    $("#carDataReuse").val(''); //将车辆数据复用标示设为空
	$('#skipStep').val('');
}
//费改新加函数start
/**
 * 点击城市控件弹出热门城市
 */
function resize_hot_city(){
	var city_wrap_width = ($(window).width()-20)*0.6557;
	var picker_width = Math.floor(city_wrap_width*0.6)+Math.floor(city_wrap_width*0.3266)+9;
	$('.hot_city').width(picker_width);
	
}
/**
 * 费改上年城市验证
 * @returns 返回验证结果
 */
function last_city_sel(){
	var cityVal = $("#city_picker").val();
	var flag = 0;
	for (i = 0; i < cities.length; i++) {
		if (cityVal == cities[i][2]) {
			$("#areaCodeLast").val(cities[i][0]);
			$("#cityCodeLast").val(cities[i][1]);
			flag = 1;
		}
	}
	//单列市
	if ("2102,3302,3502,3702,4403,3302".indexOf($("#cityCodeLast").val().substring(0, 4)) > -1) {
		$("#areaCodeLast").val($("#cityCodeLast").val());
	}
	if($("#new_client_like_last").attr("class").indexOf("checked") <= 0){
		if ($("#city_picker").val() == "") {
			showInvalidTips($("#city_picker").parent(), "请输入城市！", true);
			return false;
		} 
		if ($("#city_picker").val() != "" && flag == 0) {
			showInvalidTips($("#city_picker").parent(), "请输入正确的城市！", true);
			return false;
		}
	}
	showInvalidTips($("#city_picker").parent(), "", true);
	return true;
}
/**
 * 被保险人证件号验证
 * @returns 返回验证结果
 */
function insuredIdentifyNumberJY(){ 
	var InsuredIdentifyType = $("#InsuredIdentifyType");
	var insuredIdentifyNumber = $("#insuredIdentifyNumber");
	var msg = trim(checkIdentifyNum(insuredIdentifyNumber,InsuredIdentifyType.val()));
	var flag = true;
	var ctx = $("#ctx").val();
	
	if(msg == "true"){
		removeInvalidTips(insuredIdentifyNumber.parent());
	}else{
		if(msg == "请输入证件号码！"){
			msg = "请输入被保险人证件号码！";
		}
		showInvalidTips(insuredIdentifyNumber.parent(), msg, true);
		return false;
	}
	$.ajax({
		  url:ctx+"/carProposal/underWrite/identifyBlackList",
		  type:"post",
		  data: 
		  {
    		channelNo:$("input[name='head.channelNo']").val(),
		    proSelected:$("#proSelected").val(),	//省代码
		    citySelected:$("#citySelected").val(),	//市代码	
		    licenseno:$("input[name='carInfo.licenseNo']").val(),  
            engineno:$("input[name='carInfo.engineNo']").val(),
            frameno:$("input[name='carInfo.frameNo']").val(),
            identify:insuredIdentifyNumber.val(),		//纳税人身份证号
            licenseflag:$("input[name='carInfo.isNewCar']").val(),
            identifytype:InsuredIdentifyType.val(),
            isBZ:$("#hasBz").val(),
            insuredflag:"0100000",
            insuredName:$("input[name='carInfo.insuredName']").val(),
            hasSy:$("input[name='carInfo.hasSy']").val(),
		    sessionId:$("#sessionId").val()
	      },
		  dataType:"json",
		  async:false,
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
		  {
		  	if(data.body.common.resultCode == '6'){
		  		window.location.href="/wap/views/carProposal/errorReject.jsp";
		  	}
		  	if(data.body.common.resultCode != 1){
		  		showInvalidTips(insuredIdentifyNumber.parent(), data.resultMsg, true);
		  		flag = false;
		  	}else{
		  		if(InsuredIdentifyType.val() == "01"){
		  			var bir = data.body.birthday.replace("//g","-");
			  		$("#over_InsuredIdentifSexOnePage").show();
			  		$("#birthDayCar").attr("disabled","disabled");
			  		$("#birthDayCar").val(replace(bir,"/","-"));
			  		if(data.body.sex == "1"){
			  			$("#man").click();
			  		}else{
			  			$("#woman").click();
			  		}
		  		}else{
		  			$("#over_InsuredIdentifSexOnePage").hide();
		  			$("#birthDayCar").attr("disabled",false);
		  		}
		  	}
		  }
	});
	return flag;
}
//费改新加函数end
//车辆信息复用查询接口
function query_carDataReuse(){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/car/query_carDataReuse",
		  type:"post",
		  data: {
			  	 proSelected:$("#proSelected").val(),
			  	 citySelected:$("#citySelected").val(),
			  	 beforeProposalNo:trim($("#beforeProposalNo").val()),
			  	 licenseNo:$("#licenseNo").val(),
		         sessionId:$("#sessionId").val()
		         },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   	      success: function(data){
   	    	  	 data1= eval('('+data.message+')');
				 var common  = data1.common;
				 if(common.resultCode== 1 || common.resultCode== 5 ){
					 var appliCarInfo  = data1.appliCarInfo;
					 var insuredInfo  = data1.insuredInfo;
					 var appliInfo  = data1.appliInfo;
					 var carOwnerInfo  = data1.carOwnerInfo;
						$(".declaration").addClass("close");		//关闭弹出层
						$("#licenseNo_show").attr("readonly",false);	//可修改
					 	// 车主姓名
					    $("input[name='carInfo.carOwner']").attr("value",carOwnerInfo.carOwner);
					    $("#CarOwner").val(carOwnerInfo.carOwner);
					    
						var carOwnerWrap = $("#CarOwner").parents(".field_wrap");
			            removeInvalidTips(carOwnerWrap);
					    // 车主证件类型
					    $("input[name='carInfo.carOwerIdentifyType']").attr("value", carOwnerInfo.carOwerIdentifyType);
					    // 车主 证件号
					    $("input[name='carInfo.carOwerIdentifyNo']").attr("value", carOwnerInfo.carOwnerIdentifyNumber);
					    // 车主与被保险人关系
					    $("input[name='carInfo.insuredAndOwnerrelate']").attr("value", insuredInfo.insuredAndOwnerrelate);
					    
					    // 投保人姓名
					    $("input[name='carInfo.appliName']").attr("value", appliInfo.appliName);
					    // 投保人邮箱
						$("input[name='carInfo.appliEmail']").attr("value",appliInfo.appliEmail);
						// 投保人电话
						$("input[name='carInfo.appliMobile']").attr("value",appliInfo.appliMobile);
						
						// 设置车牌不可修改
//						$("#licenseNo_show").attr("readonly",'true');
						
						// 车架号
						$("input[name='carInfo.frameNo']").attr("value",appliCarInfo.rackNo);
						$("#frameNoInput").val(appliCarInfo.rackNo);
						// 发动机号
						$("input[name='carInfo.engineNo']").attr("value",appliCarInfo.engineNo);
						$("#engineNoInput").val(appliCarInfo.engineNo);
						// vin码
						$("input[name='carInfo.vinNo']").attr("value",appliCarInfo.vinNo);
						// 初登日期 转化日期格式2013/01/02 转换为 2013-01-02
						$("input[name='carInfo.enrollDate']").attr("value",replace(appliCarInfo.enrollDate, "/", "-"));
						// 车型别名
//						$("input[name='carInfo.aliasName']").attr("value",appliCarInfo.aliasName);
						// 是否显示车型别名
//						$("input[name='carInfo.aliasNameForIn']").attr("value", appliCarInfo.aliasNameViewFlag);
						// 车座数
//						$("input[name='carInfo.seatCount']").attr("value",appliCarInfo.seat);
						
						// 是否贷款车
//						$("input[name='carInfo.haveLoan']").attr("value",data.haveLoan);
						// 贷款机构名称
//						$("input[name='carInfo.loanName']").attr("value",data.loanName);
						// 是否足额 0 不足额投保；1足额
//						$("input[name='carInfo.fullAmountName']").attr("value",data.fullAmountName);
						// 是否指定驾驶员 0不指定；1指定
//						$("input[name='carInfo.assignDriver']").attr("value",data.assignDriver);
						// 指定驾驶员json串
//						$("input[name='carInfo.assignDriverJson']").val(JSON.stringify(data.carDriverInfos));
						// 是否外地车
//						$("input[name='carInfo.nonlocalflag']").attr("value", data.nonlocalflag);
						// 是否过户车
//						$("input[name='carInfo.guohuselect']").val(data.guoHuSelect);
						// 是否指定行驶区域 03指定；11不指定
//						$("input[name='carInfo.runAreaCodeName']").attr("value",data.runAreaCode);
						// 是否上一年违法
//						$("input[name='carInfo.weiFaName']").attr("value", data.weiFaName);
						
						// 商业险终保日期
//						$("input[name='carInfo.endDateSY']").attr("value",replace(data.endDateSY,"/","-"));
						// 商业险终保小时
//						$("input[name='carInfo.endHourSY']").attr("value",data.endHourSY);
						// 商业险起保小时
//						$("input[name='carInfo.startHourSY']").attr("value",data.startHourSY);
						// 商业险起保日期
//						$("input[name='carInfo.startDateSY']").attr("value",replace(data.startDateSY,"/","-"));
						// 交强险起保日期
//						$("input[name='carInfo.startDateCI']").attr("value",replace(data.startDateJQ,"/","-"));
						// 交强险起保小时
//						$("input[name='carInfo.starthourCI']").attr("value",data.startHourJQ);
						// 交强险终保小时
//						$("input[name='carInfo.endhourCI']").attr("value",data.endHourJQ);
						// 交强险终保日期
//						$("input[name='carInfo.endDateCI']").attr("value",replace(data.endDateJQ,"/","-"));
						
						// 被保险人证件类型01：身份证 02：户口薄 03：护照 04：军官证 05：驾驶执照 06：返乡证
						// 07：港澳身份证 99：其他
						if("11000000"!=$("#citySelected").val()){
							
							// 投保人证件号码
							$("input[name='carInfo.appliIdentifyNumber']").val(appliInfo.appliIdentifyNumber);
							// 投保人证件类型
							$("input[name='carInfo.appliIdentifyType']").val(appliInfo.appliIdentifyType);
							
							$("input[name='carInfo.insuredIdentifyType']").attr("value",insuredInfo.insuredIdentifyType);
							// 被保险人证件号码
							$("input[name='carInfo.insuredIdentifyNumber']").attr("value",insuredInfo.insuredIdentifyNumber);
						}
						// 被保险人身份证地址
						$("input[name='carInfo.insuredIdentifyAddr']").attr("value",insuredInfo.insuredIdentifyAddr);
						// 被保险人姓名
						$("input[name='carInfo.insuredName']").attr("value",insuredInfo.insuredName);
						// 被保险人地址 保单寄送地址
						$("input[name='carInfo.appliAddress']").attr("value",insuredInfo.insuredAddress); 
						// 被保险人电话
						$("input[name='carInfo.insuredMobile']").attr("value",insuredInfo.insuredMobile); 
						// 被保险人邮箱
						$("input[name='carInfo.insuredEmail']").attr("value", insuredInfo.insuredEmail);
						
						// 车牌标志
						$("input[name='carInfo.licenseFlag']").val(1);
						// 车型
						$("input[name='carInfo.vehicle_modelsh']").val(appliCarInfo.standardName);
						
						// 选择车型的标识
						if(common.resultCode == '5'){
							$("input[name='carInfo.isNeedQueryCarModel']").val(5);
						}else{
							$("input[name='carInfo.isNeedQueryCarModel']").val(1);
						}
						//车座数
						$("input[name='carInfo.seatCount']").attr("value",appliCarInfo.seat);
						// 商业险保单号
//						$("input[name='carInfo.beforeProposalNo']").val(data.tokenNo);
						// 争议解决方式
						$("input[name='carInfo.argueSolution']").val(insuredInfo.argueSolution);
						// 纳税人姓名
//						$("input[name='carInfo.taxPayerName']").val(carShipTax.taxPayerName);
						// 纳税人证件号
//						$("input[name='carInfo.taxPayerIdentNo']").val(data.carShipTax.taxPayerIdentNo);
						// 发票抬头
//						$("input[name='carInfo.invoiceTitle']").attr("value",data.invoice);
						
//						$("input[name='carInfo.isOutRenewal']").val(data.isOutRenewal);
//						$("input[name='carInfo.lastHas050200']").val(data.lastHas050200);
//						$("input[name='carInfo.lastHas050210']").val(data.lastHas050210);
//						$("input[name='carInfo.lastHas050500']").val(data.lastHas050500);
						// 收件人姓名
//						$("input[name='carInfo.appliAddName']").val(data.receiverInfo.receiver);
						// 收件人联系电话carInfo.appliPhoneNumber
//						$("input[name='carInfo.appliPhoneNumber']").val(data.receiverInfo.mobile);
						// 邮寄地址 省
//						$("input[name='carInfo.deliverInfoPro']").val(data.receiverInfo.receiverprovince);
						// 邮寄地址 市
//						$("input[name='carInfo.deliverInfoCity']").val(data.receiverInfo.receivercity);
						// 邮寄地址 区
//						$("input[name='carInfo.deliverInfoDistrict']").val(data.receiverInfo.receivercounty);
						// 街道地址 收件人地址
//						$("input[name='carInfo.deliverInfoAddress']").val(data.linkAddress);
						// 续保出单机构代码
//						$("input[name='carInfo.xubaocomcode']").val(data.xubaocomcode);
						// 收件人 邮编
//						$("input[name='carInfo.postCode']").val(data.receiverInfo.postCode);
						// 车座标志位 0否 1显示
//						$("input[name='carInfo.seatFlag']").attr("value", appliCarInfo.seatFlag);
						// 上年出险次数 未出险年数
//						$("input[name='carInfo.lastdamageBI']").attr("value", data.renewalPrpcitemCarExt.lastdamagedbi);
//						$("input[name='carInfo.noDamyearsBI']").attr("value", data.renewalPrpcitemCarExt.nodamyearsbi);
						// 上年车主姓名lastcarownername
						$("input[name='carInfo.lastcarownername']").attr("value", carOwnerInfo.carOwner);
						// 隐藏手机号 中间4位
						// 费改增加续保信息载入新加控件start
					    $("#InsuredIdentifyType").val($("input[name='carInfo.insuredIdentifyType']").val())
					    $("#insuredIdentifyNumber").val($("input[name='carInfo.insuredIdentifyNumber']").val())
					    if($("input[name='carInfo.insuredIdentifyType']").val()=="01"){
					    	$("#insuredIdentifyNumber").blur();
					    }
						if(document.getElementById("AppliEmail_fg")){
							$("#AppliEmail").val(appliInfo.appliEmail);
						}else{
							$("#AppliEmail").val(appliInfo.appliEmail);
						}
						// 费改增加将续保信息载入新加控件end
						var appliPhoneNO = "";
						if(document.getElementById("AppliEmail_fg")){
							appliPhoneNO = insuredInfo.insuredMobile;
						}else{
							appliPhoneNO = appliInfo.appliMobile;
						}
						appliPhoneNO=appliPhoneNO.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
						$("#AppliMobile").val(appliPhoneNO);
						$("#isModify_t").val(0);	// 设置 手机号是否修改标志位
						
//						if("11000000"==$("#citySelected").val()){
//							 $("input[name='carInfo.carKindCI']").val(1)
//							 $("#bjFrameNo").hide();
//							
//						}
						emailIsNull();
				 }else{
					 showInvalidTips($("#beforeProposalNo").parents(".field_wrap"), "证件号码不匹配 ！", true, $("#beforeProposalNo"));
					 return false;
				 }
		  },  
          error : function(XMLHttpRequest,textStatus,errorthrow){  
          } 
   });
}
function getYeWuType(){
	var ctx = $("#ctx").val();
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/getYewuType",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			sessionId:$("#sessionId").val(),
			ccaId:$("input[name='carInfo.ccaId']").val()	
		},
		dataType:"json",
		async:false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success:function(data){
			$("#ccaType").val(data.message);
		}
	});
}
/**
*作为初登日期假方法
*
**/
function changeEnrollDate(){
	return true;
}
