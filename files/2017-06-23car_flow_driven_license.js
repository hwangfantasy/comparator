/**
 * User: Phoenix
 * Date: 13-4-26
 * Time: 下午8:02
 * insure flow driven license info.
 */
$(function() {
	$("#enrollMax").val($("#carInfoEnrollMax").val());
	$("#enrollMin").val($("#carInfoEnrollMin").val());
	//弹出层关闭
    $(".popup_dialog").on('click', ".closer", function() {
        $(this).parents(".overlay").fadeOut();
        return false;
    });
    $(".popup_dialog").on('click', ".closerButton", function() {
    	$(this).parents(".overlay").fadeOut();
    	return false;
    });
  
    var mssFlag = $("input[name='carInfo.mssFlag']").val();
	//流程步骤
    if(mssFlag != 'mss'){
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
    }else{
    	$("#stepDiv").hide();
    }    	
  
	
	$(".home").click(function(){
		var ctx = $("#ctx").val();
		var form = $("#form");
		if(mssFlag == 'mss'){
			form.attr("action",ctx+"/carProposal/car/carBack");
		}else{
			form.attr("action",ctx);
		}
		$("input[name='carCodex']").val('');	//置空 通过过滤
		form.submit();
	});
	
	var FrameNo = $("#FrameNo");//车架号
	var EngineNo = $("#EngineNo");//发动机号
	var VINNo = $("#VINNo");//VIN码
	var VEHICLE_MODELSH = $("#vehicle_modelsh");//品牌型号
	var aliasName = $("#aliasName");//车型别名
	var btn = $("#itemCarInput_2_next_btn");//获得报价按钮
	var seatCount_input = $("#SeatCount"); //核定载客量
	var EnrollDate = $("#EnrollDate");//初登日期
	var appliMobile2_input = $("#AppliMobile2"); //北京地区 转保车 电话
	var appliEmail2_input = $("#AppliEmail2"); // 北京地区 转保车 电子邮件
	var loanName_input = $("#loanName"); //贷款机构
	var carLicenseDate = $("#carLicenseDateId"); //过户日期
	
	var onSearch = $("#onSearch");		//车型数据库中查找
	onSearch.bind("click", function() {   //车型数据库中查找
		$("#form").attr("action", "/wap/carProposal/car/toNewPage")
		$("input[name='carCodex']").val('');
		
		if ($(".driver_info").is(":visible")) {
//			封装驾驶员信息
			     packageDriverInfo();
			
			}
		
		$("#form").submit();
	});
	if($("input[name='carInfo.isRenewal']").val()==1){		//appliPhone赋值（用于从下一步返回时）
		var apphoneNo = $("input[name='carInfo.appliMobile']").val();
		if($("#isModify_t").val()!=1){
			//appliPhone赋值（用于从下一步返回时）
			var apphoneNo = $("input[name='carInfo.appliMobile']").val();
			apphoneNo=apphoneNo.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
			$("#AppliMobile").val(apphoneNo);
		}else{			//appliMobile  1
			$("#AppliMobile").val($("input[name='carInfo.appliMobile']").val());
		}
	}else{			//appliMobile  1
		appliPhoneNO=$("input[name='carInfo.appliMobile']").val().replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
		$("#AppliMobile").val(appliPhoneNO);
	}
	$("#AppliEmail").val($("input[name='carInfo.appliEmail']").val());	//赋值到 邮箱输入框
	
	
	var isRenewal = $("input[name='carInfo.isRenewal']").val();
	if(isRenewal==1){
		//当为续保时，隐藏快速报价相关信息
//		document.getElementById("quickQuote").style.display="none";
		$("#quickQuote").toggle();
		
	}else{
		$("input[name='carInfo.isOutRenewal']").val(0)
        $("input[name='carInfo.lastHas050200']").val(0)
        $("input[name='carInfo.lastHas050210']").val(0)
        $("input[name='carInfo.lastHas050500']").val(0)
	}
	if($("input[name='carInfo.isNewCar']").val()==0){
		  newCarLicenseNo()
	 }
	
	//北京地区如果是非新车可以确定唯一车，显示确定车型，隐藏别的元素
	if($("#proSelected").val()=="11000000" && $("input[name='carInfo.isNewCar']").val()=="1"){
		$("#quickQuote").hide();		//隐藏快速报价入口
		
		$("#beijingCar").show();
		$("#FrameNoDiv").hide();
		$("#ShowEnrollDate").hide();
		$("#EnrollDateDiv").hide();
		$("#vehicle_modelshDiv").hide();
		$("#mobemailDiv").show();		//显示手机 邮箱
		//为投保车辆下拉框赋值
		var queryVehicle = eval('(' + $("#queryVehicle").val() + ')');
		var selectList = "";
		for(var i=0; i<queryVehicle.length; i++){
			
			selectList = selectList + "<option value='" + queryVehicle[i].parentId + "' data-seat='" + queryVehicle[i].seat + "' data-modelCode='" + queryVehicle[i].modelCode + "'data-vehicleFgwCode='" + queryVehicle[i].vehicleFgwCode + "'>"+queryVehicle[i].vehicleFgwCode+"&nbsp;"+queryVehicle[i].seat+"座&nbsp;"+queryVehicle[i].parentVehName+"</option>"
			
		}
		
		$("#beijingSelect").html(selectList);
		if($("#bjSelect").val()!=""){
			$("#beijingSelect").val($("#bjSelect").val())
		}
		carChecked();
	}
	//保单生效日期最小值
//	var dayNext = getNextDayFullDate($("#now").val(),1)
	$("#StartDateSY").attr("min",replace($("#syMin").val(),"/","-"));
	$("#StartDateSY").attr("max",replace($("#syMax").val(),"/","-"));
	//查询初登日期的范围
	getEnrollDateScope();
	$("#EnrollDate").attr("max",replace($("#enrollMax").val(),"/","-"));
	
	if($("#EnrollDate").val()==""){
		$("#EnrollDate").val(replace($("#now").val(),"/","-"))
	}
	//初始化的时候看是否显示上年违法车,续保时判断。
	checkPolicytDate();
	//车型别名显示
	if ($("#aliasName").length>0) {
	  if($("#aliasNameForIn").val()==1){
		  $("#aliasNmaeInputDiv").show();
	  }
	}	  
	  //是否显示 核定车座数
	  if($("input[name='carInfo.seatFlag']").val()=="1"){
		  $("#seatCountDiv").show();
	  }else{
		  $("#seatCountDiv").hide();
	  }
	  if($("input[name='carInfoPrice.proSelected']").val() == "14000000"){ //山西地区
		  //是否显示 指定驾驶员选项
		  if($("input[name='carInfo.assignDriverFlag']").val()=="1"){
			  $("#carDriverDiv").show();
		  }else{
			  $("#carDriverDiv").hide();
		  }
		//是否显示 指定行驶区域选项
		  if($("input[name='carInfo.runAreaCodeFlag']").val()=="1"){
			  $("#drivAreaDiv").show();
		  }else{
			  $("#drivAreaDiv").hide();
		  }
	  }
	  
	//指定驾驶员地区显示 判断
	  if($("#drivenInfoSpecifiedDriver").length>0){
//		  青岛
		  if($("#proSelected").val()=="37020000"){
			  $("#driverLicenseNoDiv").remove()
			  $("#driverIdentityNumberDiv").remove()
		  }else{
			  $("#driverIdentityNumberDivqd").remove()
		  }
		  if($("#driverNameLength").length<=0){
			  $("#driverNameDiv").remove()
		  }
		  if($("#driverIdentityTypeLength").length<=0){
			  $("#driverIdentityTypeDiv").remove()
		  }
		  if($("#driverAgeLength").length<=0){
			  $("#driverAgeDiv").remove()
		  }
		  if($("#driverSexLength").length<=0){
			  $("#driverSexDiv").remove()
		  }
//		  上海、宁波
		  if($("#proSelected").val()=="31000000"||$("#proSelected").val()=="33020000"){
			  if($("#drivenInfoIDType").val()=="01")
			  {
				  $("#driverAgeDiv").hide();
			  }
			  $("#driverLicenseNoDiv").remove();
//			  性别单独一行显示
			  $("#driverSexDiv").attr("class","column_right w_100");
		  }
		  else
		  {
			  if($("#driverIdentityNumberLength").length<=0){
				  $("#driverIdentityNumberDiv").remove()
			  }
			  if($("#driverLicenseNoLength").length<=0){
				  $("#driverLicenseNoDiv").remove()
			  }
		  }
		  if($("#driverLiceseDateLength").length<=0){
			  $("#driverLicenseDateDiv").remove()
		  }
		 
	  }
	//是否指定驾驶员
	  if($("input[name='carInfo.assignDriver']").val() == 2){
	 	 $("#addDriver").hide();
	  }
	  if($("input[name='carInfo.assignDriver']").val()==""){
			$("input[name='carInfo.assignDriver']").val(2);
	  }
	  if($("#drivenInfoSpecifiedDriver").length==0){
		   $("input[name='carInfo.assignDriver']").val("2");
	  }
	  
	  //vinno码  如果存在输入域  则把隐藏域里的值  赋值给他
	  if($("#VINNo").length>0){
		  $("#VINNo").val($("input[name='carInfo.vinNo']").val());
	  }
	  
	//车架号 验证
	FrameNo.focus(function() {
		if($("input[name='carInfo.isRenewal']").val()=="1"){
			$("#isFocus").val("1");
		}else{
			$("#isFocus").val("0");
		}
	}).blur(function() {
		$('#form #jsJGFlag').val("");
		checkFrameNo();
		newCarLicenseNo()
		//如果没有vinno吗  则把车架号赋值给隐藏域
		if($("#VINNo").length<=0){
			$("input[name='carInfo.vinNo']").val(FrameNo.val());
		}else{
			$("#VINNo").val(FrameNo.val());
			$("input[name='carInfo.vinNo']").val(FrameNo.val());
		}
	}).keydown(function() {
		enterToTab();
	}).change(function() {
		FrameNo.val(FrameNo.val().toUpperCase());
		if($("#carModelChecked").length>0){//平台地区
			$("#isNeedQueryCarModel").val(0);	
		}
    });
	
	//VIN号 验证
	VINNo.blur(function() {
		checkVIN(VINNo);
	}).keydown(function() {
		enterToTab();
	}).change(function() {
		VINNo.val(VINNo.val().toUpperCase());
	});
	$("body").click(function(){
		$("#showVehicle").hide();
	})
	//车型对续保车的控制WAP-5820
//	if($("input[name='carInfo.isRenewal']").val()==1){
//		if(!($("#proSelected").val()=="32000000"||$("#proSelected").val()=="33000000"||$("#proSelected").val()=="37000000"||$("#proSelected").val()=="43000000"||$("#proSelected").val()=="11000000"||$("#proSelected").val()=="31000000"||$("#citySelected").val()=="44030000")){
//			VEHICLE_MODELSH.attr("readonly",true);
//		}
//	}
	VEHICLE_MODELSH.focus(function() {	
//		if(!($("#proSelected").val()=="32000000"||$("#proSelected").val()=="33000000"||$("#proSelected").val()=="37000000"||$("#proSelected").val()=="43000000"||$("#proSelected").val()=="11000000"||$("#proSelected").val()=="31000000"||$("#citySelected").val()=="44030000")){
//			if($("input[name='carInfo.isRenewal']").val()==1){
//				$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
//		  		$("#alertMsg").html('尊敬的续保客户，您无法更改投保车型，如需更改，请您拨打4001234567通过电话续保<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
//		  		VEHICLE_MODELSH.blur();
//		  		return false;
//			}
//		}
		if($("#queryCarModel_confirm").length>0){
			$("#carModelChecked").slideDown();
		}
		if($("#showVehiclePT").is(":visible")){   //当已有查询数据  再次获得焦点时隐藏列表
			$("#vehicleListPT").html("");
			$("#showVehiclePT").hide();
		}
		if($("#showVehicle").is(":visible")){   //当已有查询数据  再次获得焦点时隐藏列表
			$("#vehicleList").html("");
			$("#showVehicle").hide();
		}
	}).blur(function() {
		if ($.trim(VEHICLE_MODELSH.val()) == "") {
			if($("#carModelChecked").is(":visible")){
				showInvalidTips($("#carModelChecked"), "请输入品牌型号！", true);
			}else{
				showInvalidTips($("#vehicle_modelsh").parents(".field_wrap"), "请输入品牌型号！", true);
			}
			return false;
		} else {
			removeInvalidTips($("#vehicle_modelsh").parents(".field_wrap").parents().next());
			removeInvalidTips($("#vehicle_modelsh").parents(".field_wrap"));
		}
	}).keydown(function() {
		enterToTab();
	}).change(function() {
		$("#isNeedQueryCarModel").val(0);
	});
	//发动机号 验证
	EngineNo.focus(function() {
	}).blur(function() {
		checkEngineNo(EngineNo);
		newCarLicenseNo()
	}).keydown(function() {
		enterToTab();
	}).change(function() {
		EngineNo.val(EngineNo.val().toUpperCase());
		if($("#carModelChecked").length>0){//需要重新确认车型	  北京地区
			$("#isNeedQueryCarModel").val(0);	
		}
	});
	
	//核定载客量
	seatCount_input.blur(function() {
		$("input[name='carInfo.seatCount']").val($("#SeatCount").val())
		seatCountScope();
	});
	if($("input[name='carInfo.seatCount']").val()>=5&&$("#seatDisplay").val()=="true"){
		$("#seatCountDiv").show()
	}
	//贷款机构
	loanName_input.blur(function() {
		checkLoanName();
	});
	
	$("#guohuselect").click(function(){
		if($("#guohuselectSpan").hasClass('checked')) {
			$("#showLoanDate").hide();
			$("input[name='carInfo.guohuselect']").val(0);
			$("#guohuselectSpan").removeClass("checked");	//未选中状态
		} else {
			$("#showLoanDate").show();
			$("input[name='carInfo.guohuselect']").val(1);
			$("#guohuselectSpan").addClass("checked");   	//被选中
			if($("#carLicenseDateId").val()==""){
 				$("#carLicenseDateId").val(replace($("#ghValue").val(),"/","-"))
 			}
		}
	});
	if($("#carLicenseDateId").val()==""){
		$("#carLicenseDateId").val(replace($("#ghValue").val(),"/","-"));
	}
	if($("input[name='carInfo.guohuselect']").val()==1){
		$("#showLoanDate").show();
		$("#guohuselectSpan").addClass("checked");   	//被选中
	}
	if($("input[name='carInfo.guohuselect']").val()==""){
		$("input[name='carInfo.guohuselect']").val(0);
	}
	if($("#guohuselect").length==0){
		$("input[name='carInfo.guohuselect']").val("");
	}
	//是否是贷款车操作
	$("#haveLoan").click(function(){
		if($("#haveLoanSpan").hasClass('checked')) {
			
			$("#showLoanName").hide();
			$("input[name='carInfo.haveLoan']").val(2);
			$("#loanName").val('');		//
			$("#haveLoanSpan").removeClass("checked");	//未选中状态
		} else {
			$("#showLoanName").show();
			$("input[name='carInfo.haveLoan']").val(1);
			$("#haveLoanSpan").addClass("checked");   	//被选中
		}
	});
	if($("input[name='carInfo.haveLoan']").val()==1){
		$("#showLoanName").show();
		$("#haveLoanSpan").addClass("checked");   	//被选中
	}
	if($("input[name='carInfo.haveLoan']").val()=="" || $("input[name='carInfo.haveLoan']").val()=="0"){
		$("input[name='carInfo.haveLoan']").val(2)
	}
	if($("#haveLoan").length==0){
		$("input[name='carInfo.haveLoan']").val("")
	}
	
	//是否足额投保操作
	$("#fullAmountName").bind("click", function() {
		if ($("#fullPay").hasClass('checked')) {
			$("#fullPay").removeClass("checked");
			$("input[name='carInfo.fullAmountName']").val(6);
		} else {
			$("#fullPay").addClass("checked");
			$("input[name='carInfo.fullAmountName']").val(8);
		}
	});
	if($("input[name='carInfo.fullAmountName']").val()==8){
		$("#fullPay").addClass("checked");
	}
	if($("input[name='carInfo.fullAmountName']").val()==""){
		$("input[name='carInfo.fullAmountName']").val(6);
	}
	if($("#fullAmountName").length==0){
		$("input[name='carInfo.fullAmountName']").val("");
	}
	//行驶里程
	if($("#milesvalue").length>0){
		$("#milesvalue").val($("#travelMilesvalue").val())
	}
	//是否制定行驶区域操作
	$("#RunAreaCodeName").bind("click", function() {
		if ($("#areaName").hasClass('checked')) {
			$("#areaName").removeClass("checked");
			$("input[name='carInfo.runAreaCodeName']").val("11");
		} else {
			$("#areaName").addClass("checked");
			$("input[name='carInfo.runAreaCodeName']").val("03");
		}
	});
	if($("input[name='carInfo.runAreaCodeName']").val()=="03"){
		$("#areaName").addClass("checked");
	}
	if($("input[name='carInfo.runAreaCodeName']").val()==""){
		$("input[name='carInfo.runAreaCodeName']").val(11)
	}
	
	//外地车
	if($("input[name='carInfo.nonlocalflag']").val()==""){
		$("input[name='carInfo.nonlocalflag']").val(0)
	}
	if($("#RunAreaCodeName").length==0){
		$("input[name='carInfo.runAreaCodeName']").val("")
	}
	
	//上一保险年度是否有交通违法记录
	$("#WeiFaName").bind("click", function() {
		if ($("#isWeifaSpan").hasClass('checked')) {
			$("#isWeifaSpan").removeClass("checked");
			$("input[name='carInfo.weiFaName']").val(6);
			$("#WeiFaTips").show();
		} else {
			$("#isWeifaSpan").addClass("checked");
			$("input[name='carInfo.weiFaName']").val(8);
			$("#WeiFaTips").hide();
		}
	});
	if($("input[name='carInfo.weiFaName']").val()==8){
		$("#isWeifaSpan").addClass("checked");
		$("#WeiFaTips").hide();
	}
	if($("#WeiFaName").length>0&&$("input[name='carInfo.weiFaName']").val()==""){
		$("input[name='carInfo.weiFaName']").val(6)
		$("#WeiFaTips").show();
	}
	if($("#WeiFaName").length==0){
		$("input[name='carInfo.weiFaName']").val("")
	}
		
   
  //动态添加起保小时数
	for(i=0; i<24; i++){
		$("<option value='"+i+"'>"+i+"时</option>").appendTo("#StartHourSY");
	}
	$("#StartHourSY").val($("#hourSelect").val())
	if($("#syType").val()!="select"){
		$("#strHour_s").hide();
		$("#stHour_l").show();
	}
	centerSelect('StartHourSY');
	centerSelect('milesvalue');
	//如果有交强险生效日期，加一个标志位，如果商业或交强日期有改动，报价下一步的时候提示用
	if($("#jqDataFlag").val()==""){
		$("#jqDataFlag").val(1)
	}
    /* 切换证件类型时证件号码录入域获得焦点 */
    $("body").on('change', ".idType", function() {
        $($(this).attr("data-related")).focus();
    });

    var appliMobile_input = $("#AppliMobile");					//手机 邮箱 校验
	var appliEmail_input = $("#AppliEmail");
  //联系人电话输入域 验证
	appliMobile_input.keydown(function(){
		enterToTab();
	}).change(function(){
		$("#isModify_t").val(1);
	}).blur(function(){
		var mobile = appliMobile_input.val();
		if(checkCarItemMobile(appliMobile_input)){
			$("input[name='carInfo.appliMobile']").val($("#AppliMobile").val());
		}
	});
	//联系人电子邮箱输入域 验证
	appliEmail_input.keydown(function(){
		enterToTab();
	}).blur(function(){
		var email = appliEmail_input.val();
		if(checkCarItemEmail(appliEmail_input)){
			$("input[name='carInfo.appliEmail']").val($("#AppliEmail").val());
		}
	});
    /* '获得报价'按钮绑定事件 */
    $("#drivenInfoQuotedPrice").click(function() {
    	//Gridsum Web Dissector量化代码部署方案
    	if(window.GridsumWebDissector){
    		var _gsTracker =GridsumWebDissector.getTracker('GWD-002236');
    		_gsTracker.track('/targetpage/chexian/get_quote.html');
    	}
    	
    	if($("input[name='carInfo.oldRNew']").val().indexOf("尊敬的客户")>-1){
    		$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
      		$("#alertMsg").html($("input[name='carInfo.oldRNew']").val()+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
      		return false;
    	}
    	//清空提示错误元素
	   	$(".validate_tip").remove();
	   	
	   	if($("#mobemailDiv").is(":visible")){		//手机 邮箱区域可见时
			var tel = $("#AppliMobile");
		   	var email = $("#AppliEmail");
			//电话号码校验
			if(!checkCarItemMobile(tel)){
				tel.focus();
				return false;
			}
			//将所填手机号放入隐藏域
			var apliNo=tel.val();
			if(apliNo.indexOf("****")<=-1){
				$("input[name='carInfo.appliMobile']").val(apliNo);
			}
			
			//邮箱校验
			if(!checkCarItemEmail(email)){
				email.focus();
				return false;
			}else{
				$("input[name='carInfo.appliEmail']").val(email.val());		//将输入框的值放到隐藏域
			}
			
			var ctx = $("#ctx").val();
			var mobileWrap = $("#AppliMobile").parents(".field_wrap");
			
			var mobile;
			if($("input[name='carInfo.isRenewal']").val()==1){	//续保时
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
				  async:false,
				  data: {
					      channelNo:$("input[name='head.channelNo']").val(),
						  areaCode:$("input[name='carInfo.proSelected']").val(),
						  cityCode:$("input[name='carInfo.citySelected']").val(),
						    ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
						  mobile:mobile
				         },
				  dataType:"json",
			  success: function(data)
				 {
				  	var flag = data.message;
				  	if("1"!=flag){
				  		showInvalidTips(mobileWrap, "请输入其他的手机号!", true);
				  		return false;
				  	}
				  	else{
				  		removeInvalidTips(mobileWrap);	
				  	}
				  },
					error:function(){
						window.location.href="/wap/views/carProposal/errorPage.jsp";
					}
			});
		}
	   	
	  //验证 车辆识别码/车架号
		if (FrameNo.is(":visible")) {
			if (checkFrameNo()) {
				removeInvalidTips(FrameNo.parents(".field_wrap"));
			} else {
				FrameNo.focus();
				return false;
			}
		}

		//验证 VIN 码
		if (VINNo.is(":visible")) {
			if (checkVIN(VINNo)) {
				removeInvalidTips(VINNo.parents(".field_wrap"));
			} else {
				VINNo.focus();
				return false;
			}
		}

		//验证 发动机号
		if (EngineNo.is(":visible")) {
			if (checkEngineNo(EngineNo)) {
				removeInvalidTips(EngineNo.parents(".field_wrap"));
			} else {
				EngineNo.focus();
				return false;
			}
		}
		//如果初登日期是可见的   验证 初登日期
		if ($("#ShowEnrollDate").is(":visible")) {
			if (checkEnrollDate(EnrollDate)) {
				removeInvalidTips(EnrollDate.parents(".picker_wrap"));
			} else {
				return false;
			}
		}

		//验证品牌型号
		if ($("#vehicle_modelshDiv").is(":visible")) {
			if ($.trim(VEHICLE_MODELSH.val()) == "") {
				VEHICLE_MODELSH.focus();
				showInvalidTips($("#carModelChecked"), "请输入品牌型号！", true);
				return false;
			} else {
				removeInvalidTips(VEHICLE_MODELSH.parents(".field_wrap").parents().next());
			}
		}

		//验证是否选择了车型
		if (VEHICLE_MODELSH.is(":visible")) {
			var isNeedQueryCarModel = $("#isNeedQueryCarModel").val();
			if (trim(isNeedQueryCarModel) != "1") {
				VEHICLE_MODELSH.focus();
				return false;
			}else{
				var resultCode = $("#resultCode").val();
				if(resultCode!="" && resultCode!=1){	
					VEHICLE_MODELSH.focus();
					showInvalidTips($("#vehicle_modelsh").parents(".field_wrap"), "尊敬的客户，您好：您所选取的车型有误，请仔细核对您的行驶证原件后重新选择。", true);
					return false;
				}
			}
		}
		
		//车型别名
		
		//验证核定载客量
		if ($("#seatCountDiv").is(":visible")) {
			if (seatCountScope()) {
				
			} else {
				seatCount_input.focus();
				return false;
			}
		}

		//保单生效日期
		if (checkStartDate()) {
			removeInvalidTips($("#StartDateSY").parents(".block_w_100pc"));
		} else {
			$("#StartDateSY").focus();
			return false;
	    }
		
		//验证贷款机构
		if ($("#daikuanDiv").is(":visible")) {
			if($("#haveLoanSpan").hasClass('checked')){
				if (checkLoanName()) {
					removeInvalidTips(loanName_input.parents(".seatCount_input"));
				} else {
					loanName_input.focus();
					return false;
				}
			}
		}
		//校验驾驶员
		if ($(".driver_info").is(":visible")) {
			
			if(!checkLastDriver())
			{
				return false;
			}
			
			var x=$("#carDriverNumberConf").val();
			x=parseInt(x);
			var array=new Array();
			for(var i=1;i<x;i++)
			{
//				判断是否存在该Id
				var data=$("#drivenInfoDriverName_"+i).length;
				
				if(data>0)
				{
					array[i-1]=i;
				}
			}
//			验证被保险人信息
			for(var i=0; i<array.length;i++)
			{
				
				var j=array[i];
//				当添加一个被保人之后，又删除一个则此时为未定义，但数组长度不变，所以会有j==undefined的情况
				if(j!=undefined)
				{
					if(!checkData(j))
					{
						return false;
					}
				}
				
			}
			
			var len=array.length;
			if(len>1)
			{
				for(var i=0;i<len;i++)
				{
				  if(array[i]!=undefined)
				  {
					  for(var j=i+1;j<len;j++)
					  {
						if($("#drivenInfoDrivenLicenseNo").length>0){
							var id=$("#drivenInfoDrivenLicenseNo_"+array[i]).val();
							var id2=$("#drivenInfoDrivenLicenseNo_"+array[j]).val();
							if(id==id2)
							{
								
								var tip="同一个驾驶员只能指定一次！";
								
								showInvalidTips($("#drivenInfoDrivenLicenseNo_"+array[i]).parents(".driver_info"), tip, true,$("#drivenInfoDrivenLicenseNo_"+array[i]));
								showInvalidTips($("#drivenInfoDrivenLicenseNo_"+array[j]).parents(".driver_info"), tip, true,$("#drivenInfoDrivenLicenseNo_"+array[j]));
								return false;
							}
						}
						if($("#drivenInfoIDNo").length>0){id==id2
							var id=$("#drivenInfoIDNo_"+array[i]).val();
							var id2=$("#drivenInfoIDNo_"+array[j]).val();
							if(id==id2)
							{
								
								var tip="身份证号码相同！";
								
								showInvalidTips($("#drivenInfoIDNo_"+array[i]).parents(".driver_info"), tip, true,$("#drivenInfoIDNo_"+array[i]));
								showInvalidTips($("#drivenInfoIDNo_"+array[j]).parents(".driver_info"), tip, true,$("#drivenInfoIDNo_"+array[j]));
								return false;
							}
						}
					   }
					}
				}
			}
			if(len>0)
			{
				for(var i=0;i<len;i++)
				{
				  if(array[i]!=undefined)
				  {
					  if($("#drivenInfoDrivenLicenseNo").length>0){
							var id=$("#drivenInfoDrivenLicenseNo_"+array[i]).val();
							var id2=$("#drivenInfoDrivenLicenseNo").val();
							if(id==id2)
							{
								var tip="同一个驾驶员只能指定一次！";
								showInvalidTips($("#drivenInfoDrivenLicenseNo_"+array[i]).parents(".driver_info"), tip, true,$("#drivenInfoDrivenLicenseNo_"+array[i]));
								showInvalidTips($("#drivenInfoDrivenLicenseNo").parents(".driver_info"), tip, true,$("#drivenInfoDrivenLicenseNo"));
								return false;
							}
					  	}
					  if($("#drivenInfoIDNo").length>0){
							var id=$("#drivenInfoIDNo_"+array[i]).val();
							var id2=$("#drivenInfoIDNo").val();
							if(id==id2)
							{
								
								var tip="身份证号码相同！";
								
								showInvalidTips($("#drivenInfoIDNo_"+array[i]).parents(".driver_info"), tip, true,$("#drivenInfoIDNo_"+array[i]));
								showInvalidTips($("#drivenInfoIDNo").parents(".driver_info"), tip, true,$("#drivenInfoIDNo"));
								return false;
							}
						}
					   }
					}
				}
			removeInvalidTips($("#drivenInfoDrivenLicenseNo_"+array[i]));
			removeInvalidTips($("#drivenInfoDrivenLicenseNo_"+array[j]));
			removeInvalidTips($("#drivenInfoIDNo_"+array[i]));
			removeInvalidTips($("#drivenInfoIDNo_"+array[j]));
			
			setDriverInfoList(array);
		}
		else
		{
			 $("input[name='carInfo.assignDriverJson']").val("");
		}
		if(getBlackList()){
			return false;
		}
		getCalculation();
		/***增加监测代码***/
		dwb_picc = {}
		dwb_picc.eVar21= $("#EnrollDate").val(); 
		dwb_picc.eVar22= $("#price").val();
		trkIstObject(dwb_picc);
    });
    
    var enrollDate= $("#StartDateSY").val();
    var d2=new Date();//取今天的日期
    var d1 = new Date(Date.parse(enrollDate));
    var CurrentDate = "";
    if(d1<d2&&$("input[name='carInfo.retrieveFlag']").val() == 1){
    	CurrentDate = getNextDayFullDate(d2,1);
    	$("#StartDateSY").attr("value",CurrentDate);
    }
    	//起保截止日期方法
	 changeStartDateSY()
	 
	 
	$("#StartDateSY,#carLicenseDateId").bind("blur",function(){
		$("#guohuflag").val("0");
	});
	$("input[name='carInfo.frameNo']").bind("change",function(){//修改车架号使续保车变为转保车
		$("input[name='carInfo.isRenewal']").val("0");
	});
	if($("#citySelected").val()=="44010000"){
		var datenow = getNextDayFullDate($("#now").val(),1);
		 if(datenow==$("#StartDateSY").val()){
			 var startDateWrap = $("#mobemailDiv");
			 showInvalidTips(startDateWrap, "您选择了"+datenow+"日零时起保，请在"+$("#now").val()+"日17点之前完成保费支付。支付成功之后请提供您（被保险人）的身份证、行驶证复印件（电子版）等资料给工作人员留存备案。", true);
		  }
		 
	  }
	 if($("#citySelected").val()=="41010000"){
		 var startDateWrap = $("#mobemailDiv");
		 showInvalidTips(startDateWrap, "请在起保日期前进行付费，否则投保单将失效。", true); 
	 }
		if( "32000000" == $("#proSelected").val() && "1" != $('#form #jsJGFlag').val() && ("1" == $("input[name='carInfo.isRenewal']").val()||"1" == $("input[name='carInfo.carDataReuse']").val()) && $("input[name='carInfo.licenseNo']").val().indexOf("苏")>=0){
		jsObtainVerificationCode();
		return false;
	}
//	 if($("#syType").val()!='select'){
//		 $("#StartHourSY").attr("readonly",true);
//	 }
    if($("#certificatedateSH_p").length>0){//出生日期
    	if($("#certificatedateSH").val()==""){
    		var mydate = new Date();
     	   var str = "" + mydate.getFullYear() + "-";
     	   str += (mydate.getMonth()+1) + "-";
     	   str += mydate.getDate();
	     	$("#certificatedateSH_p").val(getDateFull(str));
	     	$("#certificatedateSH").val(replace($("#certificatedateSH_p").val(),"/","-"));
    	}else{
    		$("#certificatedateSH").val(replace($("#certificatedateSH_p").val(),"/","-"));
    	}
    }
    
    $("#EnrollDate").blur(function(){
    	setDateScope($("#enrollMin").val(),$("#enrollMax").val());
    });
});

function setDriverInfoList(array)
{
	var driverInfoList="[";
	var driverInfoList="[";
	var driName2=""
	if($("#driverNameDiv").length>0)
	{
		 driName2=$("#drivenInfoDriverName").val();
	}
	var driIdType2=""
	if($("#driverIdentityTypeDiv").length>0)
	{
		 driIdType2=$("#drivenInfoIDType").val();
	}
	var driId2=""
	if($("#driverIdentityNumberDiv").length>0)
	{
		driId2=$("#drivenInfoIDNo").val();
	}
	 if($("#driverIdentityNumberDivqd").length>0){
   	  driId2=$.trim($("#drivenInfoIDNo").val());
	  }
	var insured_gender2=""
	if($("#driverSexDiv").length>0)
	{
        var driGender=$("input[name='gender']");
		
		if($(driGender[0]).attr("class")=="checked")
	     {
		   insured_gender2="1"
	     }
	     else
	     {
		   insured_gender2="2"
	     }
	}
	var idLicen=""
	if($("#driverLicenseNoDiv").length>0)
	{
		 idLicen=$("#drivenInfoDrivenLicenseNo").val();
	}
	 if($("#proSelected").val()=="31000000"||$("#proSelected").val()=="33020000"){
		 idLicen=driId2;
	 }
	var drivenInfoDriverAge2=""
	if($("#driverAgeDiv").length>0)
	{
		drivenInfoDriverAge2=$("#drivenInfoDriverAge").val();
	}
	var drivenInfoLicensingDate=""
	if($("#driverLicenseDateDiv").length>0)
	{
		drivenInfoLicensingDate=$.trim($("#drivenInfoLicensingDate").val());
	}
	 if(drivenInfoLicensingDate!="")
     {
		  drivenInfoLicensingDate= replace(drivenInfoLicensingDate,"-","/"); 		
     }
	
	 for(var x=0;x<array.length;x++)
	 {
		  if(array[x]!=undefined)
		  {
			  var driName=""
			  if($("#driverNameDiv_"+array[x]).length>0){
            	  driName=$.trim($("#drivenInfoDriverName_"+array[x]).val());
			  }
			  var driIdType=""
			  if($("#driverIdentityTypeDiv_"+array[x]).length>0){
				  driIdType=$.trim($("#drivenInfoIDType_"+array[x]).val());
			  }
			  var driId="";
			  if($("#driverIdentityNumberDiv_"+array[x]).length>0){
				   driId=$.trim($("#drivenInfoIDNo_"+array[x]).val());
							  
		      }
			  var driver_gender="";
			  if($("#driverSexDiv_"+array[x]).length>0){
				  var gender="gender_"+array[x];
			      var driuredInfoGenderMale=$("input[name="+gender+"]");
			  	
				  if($(driuredInfoGenderMale[0]).attr("class")=="checked")
			      {
					  driver_gender="1"
			      }
			      else
			      {
			    	  driver_gender="2"
			      }
				  
			  }
			  var driLicense=""
			  if($("#driverLicenseNoDiv_"+array[x]).length>0){
				   driLicense=$.trim($("#drivenInfoDrivenLicenseNo_"+array[x]).val());
				  
			  }
              if($("#driverIdentityNumberDivqd_"+array[x]).length>0){
            	  driId=$.trim($("#drivenInfoIDNo_"+array[x]).val());
			  }
              var drivenInfoDriverAge="";
			  if($("#driverAgeDiv_"+array[x]).length>0){
				  drivenInfoDriverAge=$.trim($("#drivenInfoDriverAge_"+array[x]).val());
			  }
			  var dri_birthday=""
              if($("#driverLicenseDateDiv_"+array[x]).length>0){
            	  dri_birthday=$.trim($("#drivenInfoLicensingDate_"+array[x]).val());
			  }
		      
		      if(dri_birthday!="")
		      {
		    	  dri_birthday= replace(dri_birthday,"-","/"); 		
		      }
//		      针对上海和宁波地区
		      if($("#proSelected").val()=="31000000"||$("#proSelected").val()=="33020000"){
		    	  driLicense=driId;
		 	 }
		   	  driverInfoList= driverInfoList+"{\"carDriverName\":\""+driName+"\"";
			  driverInfoList= driverInfoList+", \"carDriverDrivingtype\":\""+driIdType+"\"";
			  driverInfoList= driverInfoList+", \"carDriverIdentityNumber\":\""+driId+"\"";
			  driverInfoList= driverInfoList+", \"carDriverSex\":\""+driver_gender+"\"";
			  driverInfoList= driverInfoList+", \"carDriverLicenseNo\":\""+driLicense+"\"";
			  driverInfoList= driverInfoList+", \"carDriverAcceptLicenseDate\":\""+dri_birthday+"\"";
			  driverInfoList= driverInfoList+", \"carDriverAge\":\""+drivenInfoDriverAge+"\"";
	   	      driverInfoList=driverInfoList+"},"
		  }
	  }

	  driverInfoList= driverInfoList+"{\"carDriverName\":\""+driName2+"\"";
	  driverInfoList= driverInfoList+", \"carDriverDrivingtype\":\""+driIdType2+"\"";
	  driverInfoList= driverInfoList+", \"carDriverIdentityNumber\":\""+driId2+"\"";
	  driverInfoList= driverInfoList+", \"carDriverSex\":\""+insured_gender2+"\"";
	  driverInfoList= driverInfoList+", \"carDriverLicenseNo\":\""+idLicen+"\"";
	  driverInfoList= driverInfoList+", \"carDriverAcceptLicenseDate\":\""+drivenInfoLicensingDate+"\"";
	  driverInfoList= driverInfoList+", \"carDriverAge\":\""+drivenInfoDriverAge2+"\"";
	  driverInfoList=driverInfoList+"}"
     driverInfoList=driverInfoList+"]";
     
     $("input[name='carInfo.assignDriverJson']").val(driverInfoList);	


}
function checkLastDriver()
{
	
	if($("#driverNameDiv").length>0)
	{
		if(!returnChkCarDriverName('drivenInfoDriverName')){
			$("#drivenInfoDriverName").focus();
			return false;
		}
	}
	if($("#driverIdentityNumberDiv").length>0)
	{
		if(!checkIdentifyNumber('drivenInfoIDNo')){
			$("#drivenInfoIDNo").focus();
			return false;
		}
	}
	if($("#driverIdentityNumberDivqd").length>0)
	{
		if(!returnChkCarDriverIdenNum('drivenInfoIDNo')){
			$("#drivenInfoIDNo").focus();
			return false;
		}
	}
	if($("#driverLicenseNoDiv").length>0)
	{
		if(!returnCarDrivingLicense('drivenInfoDrivenLicenseNo')){
			$("#drivenInfoDrivenLicenseNo").focus();
			return false;
		}
	}
	if($("#driverAgeDiv").length>0&& $("#driverAgeDiv").is(":visible"))
	{
		if(!returnChkCarDriverAge('drivenInfoDriverAge')){
			$("#drivenInfoDriverAge").focus();
			return false;
		}
	}
	
	if($("#driverLicenseDateDiv").length>0)
	{
		
		if(!returnCarDriverAcceptLicenseDate('drivenInfoLicensingDate')){
			$("#drivenInfoLicensingDate").focus();
			return false;
		}
	}
	
	return true;

}

function checkData(i)
{
	if($("#driverNameDiv_"+i).length>0)
	{
		if(!returnChkCarDriverName('drivenInfoDriverName_'+i)){
			$("#drivenInfoDriverName_"+i).focus();
			return false;
		}
	}
	if($("#driverIdentityNumberDiv_"+i).length>0)
	{
		if(!checkIdentifyNumber('drivenInfoIDNo_'+i)){
			$("#drivenInfoIDNo_"+i).focus();
			return false;
		}
	}
	if($("#driverIdentityNumberDivqd_"+i).length>0)
	{
		if(!returnChkCarDriverIdenNum('drivenInfoIDNo_'+i)){
			$("#drivenInfoIDNo_"+i).focus();
			return false;
		}
	}
	if($("#driverLicenseNoDiv_"+i).length>0)
	{
		if(!returnCarDrivingLicense('drivenInfoDrivenLicenseNo_'+i)){
			$("#drivenInfoDrivenLicenseNo_"+i).focus();
			return false;
		}
	}
	if($("#driverAgeDiv_"+i).length>0&&$("#driverAgeDiv_"+i).is(":visible"))
	{
		if(!returnChkCarDriverAge('drivenInfoDriverAge_'+i)){
			$("#drivenInfoDriverAge_"+i).focus();
			return false;
		}
	}
	if($("#driverLicenseDateDiv_"+i).length>0)
	{
		if(!returnCarDriverAcceptLicenseDate('drivenInfoLicensingDate_'+i)){
			$("#drivenInfoLicensingDate_"+i).focus();
			return false;
		}
	}
	
	return true;

}

//易保平台 车辆查询
function carQuery(){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/carSelect/carQuery",
		  type:"post",
		  data: {
				  proSelected:$("input[name='carInfo.proSelected']").val(),
				  citySelected:$("input[name='carInfo.citySelected']").val(),
				  carOwner:$("input[name='carInfo.carOwner']").val(),
				  licenseNo:$("input[name='carInfo.licenseNo']").val(),
				  queryCode:$("#vehicle_modelsh").val(),
				  engineNo:$("#EngineNo").val(),
				  enrollDate:replace($("#EnrollDate").val(),"-","/"),
				  frameNo:$("#FrameNo").val(),
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
			  $("#gif").hide();		//隐藏加载gif
	 		  if(common.resultCode!=1||data.queryVehicle=="[]"){
	 			 $("#vehicleList").html("");
    			  $("#showVehicle").hide();
    			  if($("#queryCarModel_confirm").length>0){
    				 $("#carModelChecked").slideUp();
    				  $("#vehicleListPT").html("");
    				  $("#showVehiclePT").hide();
    			  }
	 			 showInvalidTips($("#carModelChecked"), "对不起,您输入的车辆信息在当地保险公共平台无匹配记录，请核对后重新输入！", true);
	 			 return false;
	 		  }
	 		  var queryVehicle = eval("("+data.queryVehicle+")");
	 		 var vehicle = "";
	 		 var vehicleFgwCode = ""
	 		  for(var i=0; i<queryVehicle.length; i++)
	 		  {
	 			 vehicleFgwCode = replace(queryVehicle[i].vehicleFgwCode," ","&nbsp;")
	 			var s= "<dl onclick=ybCarSelect(\""+queryVehicle[i].parentId+"\",\""+vehicleFgwCode+"\",\""+queryVehicle[i].familyName+"\",\""+queryVehicle[i].seat+"\",\""+queryVehicle[i].countryNature+"\",\""+queryVehicle[i].modelCode+"\")><dt>"+queryVehicle[i].familyName+queryVehicle[i].vehicleFgwCode+"，"+queryVehicle[i].parentVehName +queryVehicle[i].seat+"座</dt><dd>市场新车参考价"+queryVehicle[i].price+"</dd></dl>"
	 			vehicle = vehicle + s; 
	 		  }
	 			$("#vehicleListPT").html(vehicle);
	 			if($("#proSelected").val()=="31000000"&&$("input[name='carInfo.isNewCar']").val()==1){
	 				$("#FrameNo").val(data.frameNo);
	 				if(data.enrollDate!=""){
	 					$("#EnrollDate").val(replace(data.enrollDate,"/","-"));
	 				}
		 			$("#EngineNo").val(data.engineNo);
	 			}
	 		  
			  },
				error:function(){
					window.location.href="/wap/views/carProposal/errorPage.jsp";
				}
	});
}
//易保平台 车辆选择
function ybCarSelect(parentId,familyName,queryCode,seatCount,countryNature,modelCode){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/carSelect/carChecked",
		  type:"post",
		  data: {
				   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   parentId:parentId,
				   sessionId:$("#sessionId").val(),
				   modelCode:modelCode,
				   countryNature:countryNature,
				   seatCount:seatCount
		         },
		  dataType:"json",
 	  success: function(data)
		  {
 		 $("input[name='carInfo.seatCount']").val(seatCount);
		  $("#vehicleList").html("");
		  $("#showVehicle").hide();
		  if($("#queryCarModel_confirm").length>0){
			  $("#carModelChecked").slideUp();
			  $("#vehicleListPT").html("");
			  $("#showVehiclePT").hide();
		  }
		  $("input[name='carInfo.parentId']").val(parentId);
		  $("#vehicle_modelsh").val(familyName+queryCode);
		  
		  $("#isNeedQueryCarModel").val(1);
	  //车型别名显示
		  if ($("#aliasName").length>0) {
			  if(data.aliasNameViewFlag=="1"){
				  $("#aliasNmaeInputDiv").show();
				  $("#aliasNameForIn").val(data.aliasNameViewFlag);
				  $("#aliasName").val(data.aliasName);
			  }else{
				  $("#aliasNmaeInputDiv").hide();
				  $("#aliasNameForIn").val("");
				  $("#aliasName").val("");
			  }
		  }
		  //核定载客量显示     外地车
		  if(data.seatFlag=="1"){
			  $("input[name='carInfo.seatFlag']").val(1);
			  $("#seatCountDiv").show();
			  $("#SeatCount").val(seatCount);
		  }else{
			  $("#seatCountDiv").hide();
			  $("input[name='carInfo.seatFlag']").val(0);
		  }
		  }
 });
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
			licenseno:$("input[name='carInfo.licenseNo']").val(),  
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
            insuredMobile:$("input[name='carInfo.insuredMobile']").val(),
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
            itemKindFlag:'2',
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

//北京地区车辆选择
function carChecked(){
	var ctx = $("#ctx").val();
	var modelCode = $("#beijingSelect").find("option:selected").attr("data-modelCode");
	$("#vehicle_modelsh").val($("#beijingSelect").find("option:selected").attr("data-vehicleFgwCode"))
	var seatCount;
	if($("input[name='carInfo.isRenewal']").val()==1){
		seatCount = $("input[name='carInfo.seatCount']").val();
	}else{
		seatCount = $("#beijingSelect").find("option:selected").attr("data-seat");
	}
	
	$.ajax({
		  url:ctx+"/carProposal/carSelect/carChecked",
		  type:"post",
		  data: {
				   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   parentId:$("#beijingSelect").val(),
				   sessionId:$("#sessionId").val(),
				   modelCode:modelCode,
				   countryNature:"",
				   seatCount:seatCount
		         },
		  dataType:"json",
 	  success: function(data)
		  {
 		  	//给座位数赋值
	 		  if($("input[name='carInfo.isRenewal']").val()!=1){
	 			 $("input[name='carInfo.seatCount']").val($("#beijingSelect").find("option:selected").attr("data-seat"));  
	 		  }
		  }
 });
}
//获取性别的值
function getMaleVal(sex){
	var num = sex.substring(21);
	$("input[name='carInfo.carDriver["+num+"].carDriverSex']").val('0');
}
function getFemaleVal(sex){
	var num = sex.substring(23);
	$("input[name='carInfo.carDriver["+num+"].carDriverSex']").val('1');
}
function hideVehicle(){
//	$("#queryCarModel_confirm").hide();
//	$("#queryCarModel_cancel").hide();
//	$("#carModelChecked").hide();
	$("#carModelChecked").slideUp();
	
}
//车型查询
function vehicleFind(){
	var FrameNo = $("#FrameNo");//车架号
	var EngineNo = $("#EngineNo");//发动机号
	var VINNo = $("#VINNo");//VIN码
	if($("#queryCarModel_confirm").length==0){
		
	//验证 车辆识别码/车架号
	if (FrameNo.is(":visible")) {
		if (checkFrameNo()) {
			removeInvalidTips(FrameNo.parents(".field_wrap"));
		} else {
			FrameNo.focus();
			return false;
		}
	}

	//验证 VIN 码
	if (VINNo.is(":visible")) {
		if (checkVIN(VINNo)) {
			removeInvalidTips(VINNo.parents(".field_wrap"));
		} else {
			VINNo.focus();
			return false;
		}
	}

	//验证 发动机号
	if (EngineNo.is(":visible")) {
		if (checkEngineNo(EngineNo)) {
			removeInvalidTips(EngineNo.parents(".field_wrap"));
		} else {
			EngineNo.focus();
			return false;
		}
	}
	
	var VEHICLE_MODELSH = $("#vehicle_modelsh");//品牌型号
	var ctx = $("#ctx").val();
	
    if((VEHICLE_MODELSH.val()).length>3){
		$("#showVehicle").show();
		
		$.ajax({
			  url:ctx+"/carProposal/carSelect/vehicleFind",
			  type:"post",
			  data: {
		    	   channelNo:$("input[name='head.channelNo']").val(),
				   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   queryCode:$("#vehicle_modelsh").val(),
				   licenseNo:$("input[name='carInfo.licenseNo']").val(),
				   frameNo:$("#FrameNo").val(),
				   engineNo:$("#EngineNo").val(),
				   enrollDate:$("#EnrollDate").val(),
				   vinNo:$("input[name='carInfo.vinNo']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseFlag:$("input[name='carInfo.isNewCar']").val(),
				   sessionId:$("#sessionId").val()
					   
			         },
			  dataType:"json",
	 	  success: function(data)
			  {
	 		  	 $("#gif").hide();//隐藏加载gif
	 		  	 $("#showVehicle").show();
		 		 var json = eval(data);
		 		 var vehicle = "";
		 		 var familyName = "";
		 		 var vehicleFgwCode = "";
		 		  for(var i=0; i<json.length; i++)
		 		  {
		 			 vehicleFgwCode = replace(json[i].vehicleFgwCode," ","&nbsp;");
		 			 familyName = replace(json[i].familyName," ","&nbsp;");
		 			 var s= "<dl onclick=vehicleChecked('"+json[i].parentId+"','"+vehicleFgwCode+"','"+familyName+"','"+json[i].seat+"','03');$('#price').val("+json[i].price+")><dt>"+json[i].familyName+json[i].vehicleFgwCode+"，"+json[i].parentVehName +json[i].seat+"座</dt><dd>市场新车参考价"+json[i].price+"</dd></dl>"
		 			 vehicle = vehicle + s; 
		 		  }
		 		 $("#vehicleList").html(vehicle);
		 		  
			  }
	 });
	}
    }
}
//jsflag 点击确定执行江苏验证码
function vehicleHandle(jsflag){
	var FrameNo = $("#FrameNo");//车架号
	var EngineNo = $("#EngineNo");//发动机号
	var EnrollDate = $("#EnrollDate");//初登日期
	var VEHICLE_MODELSH = $("#vehicle_modelsh");//品牌型号
	var ctx = $("#ctx").val();
	if($("#queryCarModel_confirm").is(":visible")){
		//判断车架号等信息是否填写完整
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
		if (checkEnrollDate(EnrollDate)) {
			removeInvalidTips(EnrollDate.parents(".picker_wrap"));
		} else {
			EnrollDate.focus();
			return false;
		}
		if ($.trim(VEHICLE_MODELSH.val()) == "") {
			VEHICLE_MODELSH.focus();
			return false;
		} else {
		}
		if( "32000000" == $("#proSelected").val() && $("input[name='carInfo.licenseNo']").val().indexOf("苏")>=0 ){
			if("1" != $('#form #jsJGFlag').val() || true == jsflag){
				jsObtainVerificationCode();
			}
			if("1" == $("input[name='carInfo.isRenewal']").val() || "1" == $("input[name='carInfo.carDataReuse']").val()){
				return false;
			}
			if(true == jsflag){//江苏转保第一次按键不走
				return false;
			}
		}
		$("#showVehiclePT").show();
		$("#gif").show();	//显示加载gif
		if($("#proSelected").val()=='31000000'){
			carQuery();
			return false;
		}
		$.ajax({			
			  url:ctx+"/carProposal/carSelect/vehicleFind",
			  type:"post",
			  data: {
		    	   channelNo:$("input[name='head.channelNo']").val(),
				   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   queryCode:$("#vehicle_modelsh").val(),
				   licenseNo:$("input[name='carInfo.licenseNo']").val(),
				   frameNo:$("#FrameNo").val(),
				   engineNo:$("#EngineNo").val(),
				   enrollDate:$("#EnrollDate").val(),
				   vinNo:$("input[name='carInfo.vinNo']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseFlag:$("input[name='carInfo.isNewCar']").val(),
				   sessionId:$("#sessionId").val()
					   
			         },
			  dataType:"json",
	 	  success: function(data)
			  {
	 		  	 $("#gif").hide();		//隐藏加载gif
		 		 var json = eval(data);
		 		 var vehicle = "";
		 		 var vehicleFgwCode = ""
		 		 var familyName = ""
		 		  for(var i=0; i<json.length; i++)
		 		  {
		 			vehicleFgwCode = replace(json[i].vehicleFgwCode," ","&nbsp;");
		 			familyName = replace(json[i].familyName," ","&nbsp;");
		 			var s= "<dl onclick=vehicleChecked(\""+json[i].parentId+"\",\""+vehicleFgwCode+"\",\""+familyName+"\",\""+json[i].seat+"\",\"03\",\""+json[i].countryNature+"\",\""+json[i].modelCode+"\");$('#price').val("+json[i].price+")><dt>"+json[i].familyName+json[i].vehicleFgwCode+"，"+json[i].parentVehName +json[i].seat+"座</dt><dd>市场新车参考价"+json[i].price+"</dd></dl>"
		 			vehicle = vehicle + s; 
		 		  }
		 			$("#vehicleListPT").html(vehicle);
		 			if($("#vehicleListPT").html()==""){
		      			$("#vehicleList").html("");
		     			  $("#showVehicle").hide();
		     			  if($("#queryCarModel_confirm").length>0){
		     				 $("#carModelChecked").slideUp();
		     				  $("#vehicleListPT").html("");
		     				  $("#showVehiclePT").hide();
		     			  }
		     			 showInvalidTips($("#carModelChecked"), "对不起,您输入的车辆信息在当地保险公共平台无匹配记录，请核对后重新输入！", true);
		      		}
		 		 
			  },
			         error: function(){
			        	//如果返回错误或没有信息  ，隐藏下拉列表，提示
			     		if($("#vehicleListPT").html()==""){
			      			$("#vehicleList").html("");
			     			  $("#showVehicle").hide();
			     			  if($("#queryCarModel_confirm").length>0){
			     				 $("#carModelChecked").slideUp();
			     				  $("#vehicleListPT").html("");
			     				  $("#showVehiclePT").hide();
			     			  }
			     			 showInvalidTips($("#carModelChecked"), "对不起,您输入的车辆信息在当地保险公共平台无匹配记录，请核对后重新输入！", true);
			      		}
			 		}
	 });
		
		
	}
}
//车型选择
function vehicleChecked(parentId,queryCode,familyName,seat,carRequestType,countryNature,modelCode){
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/carSelect/vehicleChecked",
		  type:"post",
		  data: {
	    		channelNo:$("input[name='head.channelNo']").val(),
			  	proSelected:$("#proSelected").val(),
			    citySelected:$("#citySelected").val(),
			    parentId:parentId,
			    queryCode:queryCode,
			    seatCount:seat,
			    carRequestType:carRequestType,
			    licenseFlag:$("input[name='carInfo.isNewCar']").val(),
			    carModel:$("#vehicle_modelsh").val(),
			    sessionId:$("#sessionId").val(),
			    modelCode:modelCode,
			    countryNature:countryNature,
			    enrollDate:$("input[name='carInfo.enrollDate']").val(),		//初登日期
				frameNo:$("#FrameNo").val(),
				engineNo:$("#EngineNo").val(),
				vinNo:$("input[name='carInfo.vinNo']").val()
		         },
		  dataType:"json",
	  success: function(data)
		  {
		  	  if(carRequestType == "04"){
		  		  seat = data.seat;
		  		  $("#price").val(data.price);
		  		  $("#vehicle_modelsh").val(data.standardName);
		  	  }else{
		  		  $("#vehicle_modelsh").val(familyName+queryCode);
		  	  }
		  	  $("input[name='carInfo.seatCount']").val(seat);
			  $("#vehicleList").html("");
			  $("#showVehicle").hide();
			  if($("#queryCarModel_confirm").length>=0){
				  $("#carModelChecked").slideUp();
				  $("#vehicleListPT").html("");
				  $("#showVehiclePT").hide();
			  }
			  $("input[name='carInfo.parentId']").val(parentId);
			  $("input[name='carInfo.familyName']").val(familyName);
			  $("#isNeedQueryCarModel").val(1);
			  
			  var common = JSON.parse(data.common);
			  var resultCode = common.resultCode;
			  var resultMsg=common.resultMsg;
			  $("#resultCode").val(resultCode);
			  if(resultCode=="4"){
				  //山东地区商业车险车辆数据精准服务校验提示(选车型)
				  cueAlert(resultMsg,{"name":"确定","fun":"cleanFocus"});
				  return false;
			  }
			  if(resultCode == "1"){
				  //异地车标志
				  $("input[name='carInfo.nonlocalflag']").val(data.countryNature)
			      //车型别名显示
				  if ($("#aliasName").length>0) {
					  if(data.aliasNameViewFlag=="1"){
						  $("#aliasNmaeInputDiv").show();
						  $("#aliasNameForIn").val(data.aliasNameViewFlag);
						  $("#aliasName").val(data.aliasName);
					  }else{
						  $("#aliasNmaeInputDiv").hide();
						  $("#aliasNameForIn").val("");
						  $("#aliasName").val("");
					  }
				  }
				  //核定载客量显示     外地车
				  if(data.seatFlag=="1"){
					  $("input[name='carInfo.seatFlag']").val(1);
					  $("#seatCountDiv").show();
					  $("#SeatCount").val(seat);
				  }else{
					  $("#seatCountDiv").hide();
					  $("input[name='carInfo.seatFlag']").val(0);
				  }
				  if(data.assignDriverFlag=="1"){
			  		 $("#carDriverDiv").show();
			  		 $("input[name='carInfo.assignDriverFlag']").val("1");
			  	  }else if(data.assignDriverFlag=="0"){
			  		 $("#carDriverDiv").hide();
			  		 $("input[name='carInfo.assignDriverFlag']").val("0");
			  	  }
			  	  if(data.runAreaCodeFlag=="1"){
			  		 $("#drivAreaDiv").show();
			  		 $("input[name='carInfo.runAreaCodeFlag']").val("1");
			  	  }else if(data.runAreaCodeFlag=="0"){
			  		 $("#drivAreaDiv").hide();
			  		 $("input[name='carInfo.runAreaCodeFlag']").val("0");
			  	  }
			  }
		  },
		  error: function(){
			  window.location.href="/wap/views/carProposal/errorPage.jsp";
		  }
	});
}
function fastPriceShow(){
	
	if($("input[name='carInfo.engineNo']").val()!=null){
		$("input[name='carInfoPrice.engineno']").attr("value",$("input[name='carInfo.engineNo']").val());
	}
	if($("input[name='carInfo.frameNo']").val()!=null){
		$("input[name='carInfoPrice.frameno']").attr("value",$("input[name='carInfo.frameNo']").val());
	}
	$("#formPrice").submit();
}
function twoBackOne(){
	$("#isNeedQueryCarModel").val(0);
	var ctx = $("#ctx").val();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carBackInput1");
	$("input[name='carCodex']").val('');	//置空 通过过滤
	
	if ($(".driver_info").is(":visible")) {
//	封装驾驶员信息
	     packageDriverInfo();
	
	}
	form.submit();
}
function packageDriverInfo()
{
		var x=$("#carDriverNumberConf").val();
		x=parseInt(x);
		var array=new Array();
		for(var i=1;i<x;i++)
		{
//			判断是否存在该Id
			var data=$("#drivenInfoDriverName_"+i).length;
			
			if(data>0)
			{
				array[i-1]=i;
			}
		}
		setDriverInfoList(array);

}
//新车车牌号取值
function newCarLicenseNo(){
	var frameNo = $("#FrameNo").val();
	var EngineNo = $("#EngineNo").val();//发动机号
	//如果新车未上牌    取车架号的后六位
    if($("input[name='carInfo.isNewCar']").val()=="0"){
    	$("input[name='carInfo.licenseNo']").val(frameNo.substring(frameNo.length-6,frameNo.length))
    	$("input[name='carInfoPrice.licenseNo']").val(frameNo.substring(frameNo.length-6,frameNo.length))
    	//重庆地区取发动机号后六位
    	if($("#proSelected").val()=="50000000"){
    		$("input[name='carInfo.licenseNo']").val("暂"+EngineNo.substring(EngineNo.length-6,EngineNo.length))
    		$("input[name='carInfoPrice.licenseNo']").val("暂"+EngineNo.substring(EngineNo.length-6,EngineNo.length))  
    	}
    	if($("#proSelected").val()=="63000000"||$("#proSelected").val()=="13000000"||$("#proSelected").val()=="37020000"
    		||$("#proSelected").val()=="54000000"||$("#proSelected").val()=="45000000"||$("#proSelected").val()=="44000000"){//20140321 新增广东地区
    		if($("#citySelected").val()!="44010000"){	//20140321 新增广东地区 广州除外
				$("input[name='carInfo.licenseNo']").val(EngineNo.substring(EngineNo.length-6,EngineNo.length))
				$("input[name='carInfoPrice.licenseNo']").val(EngineNo.substring(EngineNo.length-6,EngineNo.length))
    		}
    	}
    	if($("#citySelected").val()=="13110000"||$("#proSelected").val()=="15000000"){
    		$("input[name='carInfo.licenseNo']").val("暂未上牌")
    		$("input[name='carInfoPrice.licenseNo']").val("暂未上牌")
    	}
    	if($("#citySelected").val()=="44030000"||$("#citySelected").val()=="35080000"){
    		$("input[name='carInfo.licenseNo']").val("新车暂未上牌")
    		$("input[name='carInfoPrice.licenseNo']").val("新车暂未上牌")
    	}
    	if($("#proSelected").val()=="37000000"){
    		$("input[name='carInfo.licenseNo']").val("新车");
    		$("input[name='carInfoPrice.licenseNo']").val("新车");
    	}
    	if($("#proSelected").val()=="31000000"){
    		$("input[name='carInfo.licenseNo']").val("");
    		$("input[name='carInfoPrice.licenseNo']").val("");
    	}
	}
}
function getBlackList(){
	var ctx = $("#ctx").val();
	var flag=false;
	$.ajax({
		
		  url:ctx+"/carProposal/underWrite/blackList",
		  type:"post",
		  async:false,
		  data: {
			  channelNo:$("input[name='head.channelNo']").val(),
			  proSelected:$("#proSelected").val(),
			  citySelected:$("#citySelected").val(),
			  licenseno:$("input[name='carInfo.licenseNo']").val(),  
              engineno:$("input[name='carInfo.engineNo']").val(),
              frameno:$("input[name='carInfo.frameNo']").val(),
              vinNo:$("input[name='carInfo.vinNo']").val(),
			  sessionId:$("#sessionId").val()
		   },
	         dataType:"json",
 	      success: function(data)
 		  {
 	    	  var resultCode = data.resultCode;
			  if(resultCode=='4'){
				  flag=true;
				  window.location.href="/wap/views/carProposal/errorReject.jsp";  
			  }
//				  else if(resultCode=='3' && $("#citySelected").val()!="50000000" && $("#proSelected").val()!="32000000" && $("#citySelected").val()!="44010000"){//杭州地区黑名单返回提示
//				  $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
//			  	  $("#alertMsg").html(data.resultMsg+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
//				  flag = true;
//			  }
			  
		  },
		  error: function(){
			  window.location.href="/wap/views/carProposal/errorReject.jsp";
		  }
	})
	return flag;
}
function getCalculation(){
	newCarLicenseNo()
	//核定载客量赋值
	if($("#SeatCount").is(":visible")){
		$("input[name='carInfo.seatCount']").val($("#SeatCount").val());
	}
	//如果时间是可选的，则要校验时间  比当前时间大
//	if($("#syType").val()=="select"){
//		var d = new Date()
//		var nowHour = d.getHours();
//		var nowM = d.getMinutes(); 
//		var StartHourSY = $("#StartHourSY").val()
//		var startDateWrap = $("#StartDateSY").parents(".block_w_100pc");
//		if(replace($("#StartDateSY").val(),"-","/")==replace($("#now").val(),"-","/")){
//			if(nowHour>=StartHourSY-2){
//				if($("#proSelected").val()=="37020000"||$("#proSelected").val()=="32000000"||$("#proSelected").val()=="33000000"||$("#proSelected").val()=="35020000"||$("#proSelected").val()=="23000000"){
//				showInvalidTips(startDateWrap, "温馨提示：起保时间至少为当前时间2小时后。", true);
//				return false;
//				}
//			}
//			if(nowHour>=StartHourSY-1){
//				showInvalidTips(startDateWrap, "温馨提示：起保时间至少为当前时间1小时后。", true);
//				return false;
//			}
//		}
//		
//	}
	var ctx = $("#ctx").val();
	//北京新车未上牌  座位数小于5的时候要再次 选择车型
	if($("#proSelected").val()=="11000000" && $("input[name='carInfo.isNewCar']").val()==0 && $("input[name='carInfo.seatCount']").val()!=5){
		$.ajax({
			  url:ctx+"/carProposal/carSelect/vehicleChecked",
			  type:"post",
			  async:false,
			  data: {
		    		channelNo:$("input[name='head.channelNo']").val(),
				  	proSelected:$("#proSelected").val(),
				    citySelected:$("#citySelected").val(),
				    parentId:$("input[name='carInfo.parentId']").val(),
				    queryCode:$("input[name='carInfo.familyName']").val(),
				    seatCount:$("input[name='carInfo.seatCount']").val(),
				    carRequestType:"06",
				    licenseFlag:$("input[name='carInfo.isNewCar']").val(),
				    carModel:$("#vehicle_modelsh").val(),
				    sessionId:$("#sessionId").val(),
					frameNo:$("#FrameNo").val(),
					engineNo:$("#EngineNo").val(),
					vinNo:$("input[name='carInfo.vinNo']").val(),
				    enrollDate:$("input[name='carInfo.enrollDate']").val()
			         },
			  dataType:"json",
		  success: function(data)
			  {},
			  error: function(){
				  window.location.href="/wap/views/carProposal/errorPage.jsp";
			  }
		});
	}
	//为了查看保单生效日期的范围 ，只能在这调用拒保接口了。车险没这个的返回结果，如果是保单生效日期超出范围拒保会提示
	var guohuflag = $("#guohuflag").val();
	if(guohuflag==""){
		guohuflag="0";
	}else{
		guohuflag = $("#guohuflag").val();
	}
	$.ajax({
		
		  url:ctx+"/carProposal/underWrite/underwriteCheckProfitAjax",
		  type:"post",
		  async:false,
		  data: {
			    lastcarownername:$("#lastcarownername").val(),
	    		channelNo:$("input[name='head.channelNo']").val(),
	    		areaCodeLast:$("#areaCodeLast").val(),
	    		cityCodeLast:$("#cityCodeLast").val(),
			  	proSelected:$("#proSelected").val(),
			    citySelected:$("#citySelected").val(),
			    startdate:$("input[name='carInfo.startDateSY']").val(),
			    starthour:$("#StartHourSY").val(),
                enddate:$("input[name='carInfo.endDateSY']").val(),
                endhour:$("input[name='carInfo.endHourSY']").val(),
                licenseno:$("input[name='carInfo.licenseNo']").val(),  
                engineno:$("input[name='carInfo.engineNo']").val(),
                vinno:$("input[name='carInfo.vinNo']").val(),
                frameno:$("input[name='carInfo.frameNo']").val(),
                seatcount:$("input[name='carInfo.seatCount']").val(),
                carOwner:$("input[name='carInfo.carOwner']").val(),
                isRenewal:$("input[name='carInfo.isRenewal']").val(),
                enrolldate:$("input[name='carInfo.enrollDate']").val(),
                guohuselect:$("input[name='carInfo.guohuselect']").val(),			//过户车
                licenseflag :$("input[name='carInfo.isNewCar']").val(),
                isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
                lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
                lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
                lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
                seatflag :$("input[name='carInfo.seatFlag']").val(),
                transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
			    sessionId:$("#sessionId").val(),
			    ccaID:$("input[name='carInfo.ccaId']").val(),
			    ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
			    ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
			    lastdamagedbi :$("input[name='carInfo.lastdamageBI']").val(),
			    guohuflag:guohuflag,		//过户日期标志位
			    runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
			    LoanName:$("#loanName").val(),											//贷款机构名称
			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
			    carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
			    oldPolicyNo:$("input[name='carInfo.beforeProposalNo']").val(),  //上年保单号       
			    interimNo:$("input[name='carInfo.interimNo']").val(),  //暂存单号      
                certificatedateSH :replace($("#certificatedateSH").val(),"-","/"),//上海购车发票日期
			    travelMilesvalue:$("#milesvalue").val(),			//平均行驶里程
			    insuredIdentifyNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
		    	appliIdentifyNumber:$("input[name='carInfo.appliIdentifyNumber']").val(),
	    		carIdentifyNumber:$("input[name='carInfo.carIdentifyNumber']").val()	
		   },
	         dataType:"html",
   	  success: function(data)
   		  {
	   		  var s = eval("("+data+")");//转换为json对象
	   		  $("input[name='carInfo.bzEnable']").val(s.bzEnable);//是否显示交强险标志
	   		  $("input[name='carInfo.bzrealtime']").val(s.bzrealtime);//交强险及时起保标志  知道河北有
	   		  $("input[name='carInfo.buyCarDate_flag']").val(s.buyCarDate_flag);//交强险上海 购车发票日期显示否 1显示0不
	   		  $("input[name='carInfo.tAX_FLAG_SH_flag']").val(s.taX_FLAG_SH_flag);//交强险车船税标志显示否
	   		  $("input[name='carInfo.carIdentifyAddressSXId_flag']").val(s.carIdentifyAddressSXId_flag);
	   		  $("input[name='carInfo.carKindSXId_flag']").val(s.carKindSXId_flag);
	   		  $("input[name='carInfo.carNameSXId_flag']").val(s.carNameSXId_flag);
	   		  var isOff = s.isOff;//判断是否脱保的标志
	   		  var retMsg = s.retMsg;//脱保回呼提示
	   		  s = JSON.parse(s.common);
	   		 var x= eval("("+data+")");//转换为json对象
	   		  var carModelAndName=x.carModelAndName;
	   		  if(carModelAndName!=undefined){
	   			 if(carModelAndName.indexOf("请查看日志信息")>-1){
		   			 //山东地区商业车险车辆数据精准服务校验提示(查车)
		   			cueAlert("连接平台网络异常，请您稍后再试，或拨打客服电话4001234567-2继续投保。",{"name":"知道了","fun":"cleanFocus"});
		   			return false;
		   		  }else if((carModelAndName.indexOf("请申请特批处理")>-1)||(carModelAndName.indexOf("未配置车辆数据精准服务")>-1)||(carModelAndName.indexOf("公司未配置")>-1)||(carModelAndName.indexOf("不在投保查询返回范围内")>-1)){
		   			cueAlert("您的车架号信息存在异常，请核实后重新输入。如有疑问请拨打客服电话4001234567-2。",{"name":"知道了","fun":"cleanFocus"});
		   			return false;
		   		  }
	   		  }
		  if(s.resultCode=="1"){
			  if(!$("#SeatCount").is(":visible")){
				  var seatCount = eval("("+data+")").seatCount;	
				  $("input[name='carInfo.seatCount']").val(seatCount);
			  }
			  
			  var form = $("#form");
			  $("input[name='carCodex']").val('');	//置空 通过过滤
			  zanCun();
			  if("1"==isOff){
				  cueConfirm(retMsg,{"name":"继续投保","fun":"continueCue"},{"name":"返回修改","fun":"closeCue"});
				  return false;
			  }
			  form.submit(); 
		  }else if(s.resultCode=="5"||s.resultCode=="4"||s.resultCode=='6'){
				if ($("#guohuDiv").is(":visible")) {
					if($("#guohuselectSpan").hasClass('checked')){
						//河北比较过户车辆和起保日期大于15个月
						var hebiCityCode = $("input[name='carInfoPrice.proSelected']").val();
						if(hebiCityCode=="13000000"){
							var tishi = "过户车过户日期应在起保日期前15个月之内!";
							
								$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
						  		$("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
						  		$("#guohuflag").val("1");
						  		return false;
						}
						if (checkGuoHu()) {
							removeInvalidTips($("#carLicenseDateId").parents(".picker_wrap"));
						} else {
							$("#carLicenseDateId").focus();
							return false;
						}
					}
				}
				$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		  		$("#alertMsg").html(s.resultMsg+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
		  		$("#guohuflag").val("1"); //提示一次之后
		  		
		  		return false;
		  }else if(s.resultCode=="3" && (s.resultMsg).indexOf("不一致")>-1){//车辆信息不一致
			  	var d=eval("("+data+")");
		 		 var json = d.carInfos;
		 		 if(""!=json|| json!=undefined){
		 			 $("#carSelections").val(JSON.stringify(json));
		 		 }
		 		$("#carModelAndName").val(d.carModelAndName);
		 		$("#carModel").val(d.carModel);
		 		if(""==JSON.stringify(json)){//代表返回单挑车型数据
		 			cueAlert("您的爱车品牌型号与车管所预留信息不符，系统已自动调整，请核实！如车型信息有误，请重新输入。",{"name":"确认","fun":"carSelection"});
		 		}else{//代表返回多条车型数据
		 			cueAlert("您的爱车品牌型号与车管所预留信息不符，请在列表中选择您的车辆",{"name":"确认","fun":"carSelection"});
		 		}
		 		
		 		
		  }else{
			  var startDateWrap = $("#StartDateSY").parents(".block_w_100pc");
			  if((s.resultMsg).indexOf("起保日期必须在当前日期的规定时间范围内")>-1){
					showInvalidTips(startDateWrap, "保单生效日期必须在规定日期范围内，请重新选择！", true);
			  }else if((s.resultMsg).indexOf("车型查询错误")>-1){
				  $("#vehicle_modelsh").focus()
				  showInvalidTips($("#carModelChecked"), "请再次确认车型品牌！", true);
			  }else if((s.resultMsg).indexOf("该车辆存在完整年度保单")>-1){
				  var msg = (s.resultMsg).substring((s.resultMsg).indexOf("：")+1,(s.resultMsg).indexOf(")"))
				  showInvalidTips($("#FrameNo").parents(".field_wrap"), msg, true);
			  }else if((s.resultMsg).indexOf("：")>-1){
				  var msg = (s.resultMsg).substring((s.resultMsg).indexOf("：")+1,(s.resultMsg).indexOf(")"))
				  showInvalidTips($("#QuotedPrice"), msg, true);
//				  showInvalidTips(startDateWrap, msg, true);
			  }else if((s.resultMsg).indexOf("不一致")>-1){
				  $("#vehicle_modelsh").focus()
			  }
			  else{
				  window.location.href="/wap/views/carProposal/errorReject.jsp";
			  }
			  return false; 
		  }
		  },
		  error: function(){
			  window.location.href="/wap/views/carProposal/errorReject.jsp";
		  }
	})
	
}
function carDatabase(){
	var ctx = $("#ctx").val();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carDatabase");
	$("input[name='carCodex']").val('');	//置空 通过过滤
	form.submit();
}
/*
 * Description: 车辆识别码/车架号 输入域
 * Parameter: field 车架号节点 $("#FrameNo")
 * Author: 
 */
function checkFrameNo() {
	
	var ctx = $("#ctx").val();
	var FrameNoWrap = $("#FrameNo").parents(".field_wrap");
	var flag = false;
	$.ajax({
		  url:ctx+"/carProposal/car/randFrameNo",
		  type:"post",
		  async:false,
		  data: {
			  channelNo:$("input[name='head.channelNo']").val(),
			  proSelected:$("input[name='carInfo.proSelected']").val(),
			  citySelected:$("input[name='carInfo.citySelected']").val(),
			  FrameNo:$("#FrameNo").val(),
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
 * Description: VIN码 输入域
 * Parameter: field VIN号节点 $("#VINNo")
 * Author: 
 */
function checkVIN(field) {
	var msg = "";
	var vinNo = field.val();
	var citySelected = $("#citySelected").val();
	var vinWrap = field.parents(".field_wrap");
	var ctx = $("#ctx").val();
	
//	$.ajax({
//		url: ctx+"/carProposal/Verify/verifyVinNo",
//		type:"post",
//		async: false,
//		data: {
//			vinNo:vinNo,
//			citySelected:citySelected,
//			proSelected:$("#proSelected").val(),
//			enrollDate:replace($("#EnrollDate").val(),"-","/"),
//			sessionId:$("#sessionId").val()
//		},
//		dataType:"json",
//		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
//		success:function(data){
////			alert(JSON.stringify(data))
//			msg = data.resultMsg;
//		}
//	});
	if (trim(vinNo) == "") {
		if("35000000"==$("#proSelected").val()&&compareDate()){
		}else{
			msg = "请输入VIN码！";
			showInvalidTips(vinWrap, msg, true);
			return false;
		}
	}
	var pattern = /^[0-9A-Za-z\/]+$/;
	var flag = pattern.test(vinNo);
	if (!flag) {
		msg = "只能输入数字和字母！";
		showInvalidTips(vinWrap, msg, true);
		return false;
	}
	
////福建地区vin码管控
	if (citySelected == '44050000' || citySelected == '44150000'||("35000000"==$("#proSelected").val()&&compareDate())) {

	} else {
		if (vinNo.length != 0 && vinNo.length != 17) {
			msg = "车辆的VIN码应该为17位！";
			showInvalidTips(vinWrap, msg, true);
			return false;
		}
	}
	//校验成功后 失去焦点   给隐藏域赋值  vinno
	$("input[name='carInfo.vinNo']").val(vinNo);
	removeInvalidTips(vinWrap);
	return true;
}
//福建vin码判断日期是否在2004年以前
function compareDate(){
	var EnrollDate = $("#EnrollDate").val();
	var areaCode = $("#proSelected").val();
	var datearr = new Array();
	if("35000000"==areaCode){
		datearr = EnrollDate.split("/");
		if(parseInt(datearr[0])<2004){
			return true;
		}else{
			return false;
		}
	}
	
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
	var areaCode = $("#proSelected").val();
	var engineNoWrap = field.parents(".field_wrap");
//	if (trim(EngineNo) == "") {
//		msg = "请输入发动机号！";
//		showInvalidTips(engineNoWrap, msg, true);
//		return false;
//	}

	EngineNo = trim(EngineNo);
	var length_2 = EngineNo.length;
	if (length_1 > length_2) {
		msg = "请输入正确的发动机号！";
		showInvalidTips(engineNoWrap, msg, true);
		return false;
	}

	//var pattern=/^[0-9A-Za-z*/-]+$/; 
	//var pattern=/^[0-9A-Za-z*/-/\s]+$/;
	var pattern=/^[.*0-9A-Za-z\s/-]+$/;
    var flag=pattern.test(EngineNo); 
    
    if(!flag){
      	msg="请输入正确的发动机号！";
      	showInvalidTips(engineNoWrap, msg, true);
      	return false;
	}
//  else if(EngineNo.length<6 && areaCode != "31000000"){
//		msg="请输入正确的发动机号！";
//		showInvalidTips(engineNoWrap, msg, true);
//	    return false;
//	}else if(EngineNo.length<5 && areaCode == "31000000"){
//		msg="请输入正确的发动机号！";
//		showInvalidTips(engineNoWrap, msg, true);
//	    return false;
//	}
    
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
/*
 * Description: 校验贷款机构
 * Parameter:
 * Author: 
 */
function checkLoanName(){
	var obj = $("#loanName");
	var loanNameWrap = obj.parents(".field_wrap");
	var loanName = obj.val();
	var msg = ""
	if(trim(loanName) == ""){
		msg = "请输入贷款机构！";
		showInvalidTips(loanNameWrap, msg, true);
		return false;
	}else if(trim(loanName.replace(/[^\x00-\xff]/g, '**')).length>60){
		msg = "请输入正确的格式！";
		showInvalidTips(loanNameWrap, msg, true);
		return false;
	}else{
		removeInvalidTips(loanNameWrap);
		return true;
	}
}

//修改上海购车发票日期
function changeCertificatedateSH(){
	$("#certificatedateSH").val(replace($("#certificatedateSH_p").val(),"-","/"));
}

//初登日期 验证
function changeEnrollDate(){
    var EnrollDate=$("#EnrollDate");
	checkEnrollDate(EnrollDate);
//	if($("#carModelChecked").length>0){//需要重新确认车型	  北京地区
		$("#isNeedQueryCarModel").val(0);	
//	}
}
/*
 * Description: 初登日期校验
 * Parameter: 
 * Author: 
 */
function checkEnrollDate(obj) {
	var enrollDate = obj.val();
	var EnrollDateWrap = obj.parents(".picker_wrap");
	if(!/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(enrollDate)){
		msg = "初登日期错误，请重新选择！";
		obj.val($("#now").val())
		showInvalidTips(EnrollDateWrap, msg, true);
		return false;
	}
	if (trim(enrollDate) == "") {
		msg = "请选择初登日期 ！";
		obj.val($("#now").val());
		showInvalidTips(EnrollDateWrap, msg, true);
		return false;
	}
	if($("input[name='carInfo.isRenewal']").val()!="1"){
		if(compareFullDate(replace(enrollDate,"-","/"),$("#enrollMax").val())=="1"){
			msg = "初登日期错误，请重新选择！";
			showInvalidTips(EnrollDateWrap, msg, true);
			return false;
		}
		if($("input[name='carInfo.isNewCar']").val()=='0'){
			if(compareFullDate(replace(enrollDate,"-","/"),$("#enrollMin").val())=="-1"){
				msg = "初登日期错误，请重新选择！";
				showInvalidTips(EnrollDateWrap, msg, true);
				return false;
			}	
		}
	}else{
		//用户修改后的初登日期
		var arrNow = enrollDate.split("-");	
	    var nowTime = new Date(arrNow[0], arrNow[1], arrNow[2]);

	    //政策下 初登日期可修改的最大值
	    var max = replace($("#enrollMax").val(), "/", "-");
	    var arrMax = max.split("-");
	    var maxTime = new Date(arrMax[0], arrMax[1], arrMax[2]);
	    
	    //政策下 初登日期可修改的最小值
	    var min = replace($("#enrollMin").val(),"/", "-");
	    var arrMin = min.split("-");
	    var minTime = new Date(arrMin[0], arrMin[1], arrMin[2]);
	    
	    if (nowTime > maxTime || nowTime < minTime) {	//限定在Min Max之间
	    	msg = "初登日期选择错误，请重新确认！";
			showInvalidTips(EnrollDateWrap, msg, true);
			return false;
	    }
	}
		checkPolicytDate()
		removeInvalidTips(EnrollDateWrap);
		return true;
}
/*
 * Description: 保单生效日期校验
 * Parameter: 
 * Author: 
 */
function checkStartDate() {
	var startDate = $("#StartDateSY").val();
	var startDateWrap = $("#StartDateSY").parents(".block_w_100pc");
	if(!/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(startDate)){
		msg = "保单生效日期错误，请重新选择！";
		$("#StartDateSY").val(replace($("#syValue").val(),"/","-"))
		changeStartDateSY()
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if (trim(startDate) == "") {
		msg = "请选择保单生效日期 ！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if(compareFullDate(replace(startDate,"-","/"),$("#syMin").val())=="-1"){
		if($("input[name='carInfoPrice.proSelected']").val()!="35000000"){//非福建地区
			msg = "保单生效日期错误，请重新选择！";
			showInvalidTips(startDateWrap, msg, true);
			return false;
		}
	}
	checkPolicytDate()
	removeInvalidTips(startDateWrap);
	return true;
}
/*
 * Description: 过户车校验
 * Parameter: 
 * Author:
 */
function checkGuoHu() {
	var carLicenseDate = $("#carLicenseDateId").val();
	
	var EnrollDateWrap = $("#carLicenseDateId").parents(".picker_wrap");
	if (trim(carLicenseDate) == "") {
		msg = "请选择过户日期！";
		removeInvalidTips($("#carLicenseDateId").parents(".picker_wrap"));
		showInvalidTips($("#carLicenseDateId").parents(".picker_wrap"), msg, true);
		return false;
	}
	if(compareFullDate(replace(carLicenseDate,"-","/"),$("#ghMax").val())=="1"){
		msg = "过户日期错误，请重新选择！";
		showInvalidTips(EnrollDateWrap, msg, true);
		return false;
	}
	if(compareFullDate(replace(carLicenseDate,"-","/"),$("#ghMin").val())=="-1"){
		msg = "过户日期错误，请重新选择！";
		showInvalidTips(EnrollDateWrap, msg, true);
		return false;
	}if(compareFullDate(replace(carLicenseDate,"-","/"),replace($("#EnrollDate").val(),"-","/"))=="-1"){
		 msg = "过户日期应晚于车辆登记日期，请重新选择！";
		showInvalidTips($("#carLicenseDateId").parents(".picker_wrap"), msg, true);
		return false;
	} 
	else {
		removeInvalidTips($("#carLicenseDateId").parents(".picker_wrap"));
		return true;
	}
}
function syDateFlag(){
	$("#jqDataFlag").val(0)
}
//起保日期和小时数的方法！！
function changeStartDateSY(){
	removeInvalidTips($("#StartDateSY").parents(".block_w_100pc"));
	removeInvalidTips($("#mobemailDiv"));
	var startDateSY = $("#StartDateSY").val();
	var startHourSY = $("#StartHourSY").val();
	if($("#citySelected").val()=="44010000"){
		var datenow = getNextDayFullDate($("#now").val(),1);
		 if(datenow==$("#StartDateSY").val()){
			 var startDateWrap = $("#mobemailDiv");
			 showInvalidTips(startDateWrap, "您选择了"+datenow+"日零时起保，请在"+$("#now").val()+"日17点之前完成保费支付。支付成功之后请提供您（被保险人）的身份证、行驶证复印件（电子版）等资料给工作人员留存备案。", true);
		  }
		 
	  }
	if($("#citySelected").val()=="41010000"){
		var startDateWrap = $("#mobemailDiv");
		showInvalidTips(startDateWrap, "请在起保日期前进行付费，否则投保单将失效。", true); 
	}
	if(startHourSY == "0"){
		var s = getNextDateFullDate(getNextYearFullDate(startDateSY,1),-1);
		$("#EndDateSY").val(replace(s,"/","-"));
		$("#EndHourSY").val("24");
	}else{
		$("#EndDateSY").val(replace(getNextYearFullDate(startDateSY,1),"/","-"));
		$("#EndHourSY").val(startHourSY);
	}
	if($("#insuredBirthday").val() != null && $("#insuredBirthday").val() != ""){//出生日期不为空则为费改地区(费改地区终保小时统一写成24时)
		$("#EndHourSY").val("24");
	}
	$("#enddateSY_DS").html($("#EndDateSY").val()+"&nbsp;&nbsp;"+$("#EndHourSY").val());
}

//日期转换用
Date.prototype.pattern=function(fmt) {          
    var o = {          
    "M+" : this.getMonth(), //月份          
    "d+" : this.getDate(), //日          
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时          
    "H+" : this.getHours(), //小时          
    "m+" : this.getMinutes(), //分          
    "s+" : this.getSeconds(), //秒          
    "q+" : Math.floor((this.getMonth()+3)/3), //季度          
    "S" : this.getMilliseconds() //毫秒          
    };          
    var week = {          
    "0" : "\u65e5",          
    "1" : "\u4e00",          
    "2" : "\u4e8c",          
    "3" : "\u4e09",          
    "4" : "\u56db",          
    "5" : "\u4e94",          
    "6" : "\u516d"         
    };          
    if(/(y+)/.test(fmt)){          
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));          
    }          
    if(/(E+)/.test(fmt)){          
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);          
    }          
    for(var k in o){          
        if(new RegExp("("+ k +")").test(fmt)){          
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));          
        }          
    }          
    return fmt;          
}    

//走初登日期接口 获得初登日期可选择范围
function getEnrollDateScope(){
	var ctx = $("#ctx").val();
	var enrollDate = $("input[name='carInfo.enrollDate']").val()
	enrollDate = replace(enrollDate,"-","/");
	var StartDateSY = replace($("#StartDateSY").val(),"-","/");
	if(StartDateSY==""){
		StartDateSY = replace($("#now").val(),"-","/");
	}

	$.ajax({
		  url:ctx+"/carProposal/renewal/getEnrollDateScope",
		  type:"post",
		  async:false,
		  data: {
			  	channelNo:$("input[name='head.channelNo']").val(),
			    proSelected:$("#proSelected").val(),	//省代码
			    citySelected:$("#citySelected").val(),	//市代码	
			    licenseflag :$("input[name='carInfo.isNewCar']").val(),	//是否上牌   1：未上牌  不是未上牌传空
			    licenseNo:$("input[name='carInfoPrice.licenseNo']").val(),	//车牌号		
			    quotepriceFlag:0,		//快速报价标志  1：试算来源 0：非试算
			    enrollDate:enrollDate,	//初登日期
                isRenewal:$("input[name='carInfo.isRenewal']").val(),		//1续保，0：转保，2：新车
                startdate:StartDateSY,
                ccaFlag:$("input[name='carInfo.ccaFlag']").val(), 
			    sessionId:$("#sessionId").val()
		       },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
			  {
			    data = eval("("+data.message+")");//转换为json对象
			  	$("#enrollMax").val(data.enrollDate_MAX);
			  	$("#enrollMin").val(data.enrollDate_MIN);
			  	if($("#EnrollDate").val()!=""){
					complerEntrollDate()
				}
			  }
	});
}
//核定载客量调用接口
function seatCountScope(){
	if(!/^[0-9]*$/.test($("#SeatCount").val())){
		showInvalidTips($("#SeatCount").parents(".field_wrap"), "请输入正确的核定载客量！", true);
		return false;
	}
	var ctx = $("#ctx").val();
	var flag = "";
	$.ajax({
		  url:ctx+"/carProposal/seatCount/seatCount",
		  type:"post",
		  async:false,
		  data: {
			  proSelected:$("#proSelected").val(),	//省代码
			  citySelected:$("#citySelected").val(),	//市代码	
			  seatCount :$("#SeatCount").val(),	
			    sessionId:$("#sessionId").val()
		       },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
			  {
			  
			    if(data.resultCode=="0"){
			    	flag = false;
			    	showInvalidTips($("#SeatCount").parents(".field_wrap"), data.resultMsg+"！", true);
			    	
			    }else{
			    	flag = true;
			    	removeInvalidTips($("#SeatCount").parents(".field_wrap"));
			    	
			    }
			  }
	});
	return flag;
}
//保单生效日期接口调用，这个要在初始化、修改保单生效日期、修改初登日期的时候都要调用
function checkPolicytDate(){
	var ctx = $("#ctx").val();
	var licenseNo = $("input[name='carInfo.licenseNo']").val();
	if(licenseNo==""){
		licenseNo="*";
	}
	var StartDateSY = replace($("#StartDateSY").val(),"-","/");
	if(StartDateSY==""){
		StartDateSY = replace($("#now").val(),"-","/");
	}
	$.ajax({
		  url:ctx+"/carProposal/checkStartDate/checkStartDate",
		  type:"post",
		  async:false,
		  data: {
    		  channelNo:$("input[name='head.channelNo']").val(),
			  proSelected:$("#proSelected").val(),	//省代码
			  citySelected:$("#citySelected").val(),	//市代码	
			  ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
			  licenseNo:licenseNo,
			  enrollDate:replace($("#EnrollDate").val(),"-","/"),
			  startdate:StartDateSY,
			  isRenewal:$("input[name='carInfo.isRenewal']").val(),
			  licenseFlag:$("input[name='carInfo.isNewCar']").val(),
			  lastDamagedBI:$("input[name='carInfo.lastdamageBI']").val(),
			  sessionId:$("#sessionId").val()
		       },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
			  {
			  	if(data.illegal=="1"){
			  		$("#weifaDiv").show()
			  	}else{
			  		$("#weifaDiv").hide()
			  	}
			  	if(data.weifaTipFlag==1){
			  		$("#WeiFaTips").html(data.weifaTipMsg);
			  		if ($("#isWeifaSpan").hasClass('checked')) {
			  			$("#WeiFaTips").hide();
			  		}else{
			  			$("#WeiFaTips").show();
			  		}
			  	}
			  	if(data.loanFlag=="1"){
			  		$("#daikuanDiv").show()
			  	}else if(data.loanFlag=="0"){
			  		$("#daikuanDiv").hide()
			  	}
			  	if(data.assignDriverFlag=="1"){
			  		$("#carDriverDiv").show();
			  		$("input[name='carInfo.assignDriverFlag']").val("1");
			  	}else if(data.assignDriverFlag=="0"){
			  		$("#carDriverDiv").hide();
			  		$("input[name='carInfo.assignDriverFlag']").val("0");
			  	}
			  	if(data.runAreaCodeFlag=="1"){
			  		$("#drivAreaDiv").show();
			  		$("input[name='carInfo.runAreaCodeFlag']").val("1");
			  	}else if(data.runAreaCodeFlag=="0"){
			  		$("#drivAreaDiv").hide();
			  		$("input[name='carInfo.runAreaCodeFlag']").val(0);
			  	}
			  	if($("#StartDateSY").val()==""){
			  		var defaultdays = data.defaultdays;
			  		var StartDateSY = getNextDayFullDate(replace($("#now").val(),"-","/"),defaultdays)
					$("#StartDateSY").val(StartDateSY)
				}
			  	var startDateFlag = data.startDateFlag;
			  	if(startDateFlag == 0){
			  		if($("#syType").val()!="select"){
			  			$("#strHour_s").hide();
			  			$("#stHour_l").show();
			  		}else{
			  			$("#strHour_s").show();
			  			$("#stHour_l").hide();
			  		}
			  	}else{
			  		$("#strHour_s").hide();
					$("#stHour_l").show();
			  	}
			  	
			  	
			  }
	});
}
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
//处理日期初始化的时候 最小日期比对
function complerEntrollDate(){
	if(compareFullDate(replace($("#EnrollDate").val(),"-","/"),$("#enrollMin").val())=="-1"){
		$("#EnrollDate").val($("#now").val()); 
	}
}

/**
 * 显示浮层页
 */
function showOverPage(page){
	$("#showVehiclePT").hide();
	var iframe;
	if(document.getElementById('overPageIframe')){
		iframe=document.getElementById('overPageIframe');
		iframe.style.cssText = "top:0px;position:absolute;z-index:9999;border:none;display:none;";
	}else{
		iframe = document.createElement('iframe');
		iframe.id='overPageIframe';
		iframe.style.cssText = "top:0px;position:absolute;z-index:9999;border:none;display:none;";
	}
	iframe.src=page
	iframe.width=document.body.scrollWidth;
	iframe.height=document.body.scrollHeight;
	document.body.insertBefore(iframe,document.body.childNodes[0]);
	iframe.onload = function(){
		iframe.style.cssText = "top:0px;position:absolute;z-index:9999;border:none;display:block;";
	}
}

/**
 * 隐藏浮层页
 */
function hideOverPage(){
	if(document.getElementById('overPageIframe')){
		document.getElementById('overPageIframe').style.cssText = "top:0px;position:absolute;z-index:9999;border:none;display:none;";
	}
}

/**
 * 江苏交管系统生成验证码
 */
function jsObtainVerificationCode(){
	$.ajax({
		url:$("#ctx").val()+"/carProposal/JSArea/obtainVerificationCode",
		type:"post",
		async:false,
		data: {
			licenseNo:$("input[name='carInfo.licenseNo']").val(),	//车牌号
			frameNo:$("input[name='carInfo.frameNo']").val(),	//车架号	
			channelNo :$("#channelNo").val(),	
			sessionId:$("#sessionId").val()
		},
		dataType:"json",
		success: function(data){
			  try{
				  $("#verificationCode_p").val(eval('(' + data.message + ')').check_code);
				  showOverPage("/wap/views/carProposal/jiangsu/verificationCodeAlert.html");
			  }catch(e){
			  }
		}
	});
}
	
/**
 * 江苏交管系统查车
 */
function jsObtainVerifQueryCar(icationCode){
	$.ajax({
		url:$("#ctx").val()+"/carProposal/JSArea/obtainVerifQueryCar",
		type:"post",
		async:false,
		data: {
			icationCode:icationCode,	//验证码
			channelNo :$("#channelNo").val(),	
			sessionId:$("#sessionId").val()
		},
		dataType:"json",
		success: function(data){
			var json = eval('(' + data.message + ')');
			var trafficControlDockingQueryCarResBodyCar = json.body.trafficControlDockingQueryCarResBodyCar;
			if(0 == trafficControlDockingQueryCarResBodyCar.length){
				$("#overPageIframe").contents().find(".error_mess").html(json.head.errorMsg);
				$("#overPageIframe").contents().find(".error_mess").show();
			}else if(1 == trafficControlDockingQueryCarResBodyCar.length){
				$('#form #jsJGFlag').val("1");
				$("#vehicle_modelsh").val(trafficControlDockingQueryCarResBodyCar[0].vehicle_model);
				$("#EnrollDate").val(trafficControlDockingQueryCarResBodyCar[0].vehicle_register_date.substr(0,10));
				if("1" == $("input[name='carInfo.isRenewal']").val() || "1" == $("input[name='carInfo.carDataReuse']").val()){//续保车不再显示查车
					$("#carModelChecked").hide();
				}
				$('#isNeedQueryCarModel').val("1");
				vehicleHandle();
				getEnrollDateScope();//交管重新获得初登日期后调用接口校验
				hideOverPage();
			}else{
				$("#carQuery_p").val(JSON.stringify(trafficControlDockingQueryCarResBodyCar));
				showOverPage("/wap/views/carProposal/jiangsu/carQueryAlert.html");
			}
		},
		error: function(data){
			$("#overPageIframe").contents().find(".error_mess").html("录入的校验码有误");
			$("#overPageIframe").contents().find(".error_mess").show();
		}
	});
}
	
/**
 * 江苏交管系统车辆确认
 */
function jsObtainVerifSaveCar(serino,vehicle_model,vehicle_register_date){
	$.ajax({
		url:$("#ctx").val()+"/carProposal/JSArea/obtainVerifSaveCar",
		type:"post",
		async:false,
		data: {
			serino:serino,	//车辆信息序列号
			channelNo :$("#channelNo").val(),	
			sessionId:$("#sessionId").val()
		},
		dataType:"json",
		success: function(data){
			if("true" == eval('(' + data.message + ')').flag){
				$('#form #jsJGFlag').val("1");
				$("#vehicle_modelsh").val(vehicle_model);
				$("#EnrollDate").val(vehicle_register_date.substr(0,10));
				$("#carModelChecked").hide();
				$('#isNeedQueryCarModel').val("1");
				vehicleHandle();
				hideOverPage();
			}
		}
	});
}
/**
 * 脱保回呼 用户选择继续投保
 */
function continueCue(){
	$(function (){
		 var form = $("#form");
		 form.submit();
	});
	return true;
}
function setMinDate(ele,date){
	$(ele).attr("min",date);
}

function carSelection(){
	$(function (){
		//去掉弹层
		$(".reminder-dialog").remove();
		$(".reminder-mask").remove();
		//处理数据
		var json=$("#carSelections").val();
		var vehicle = "";
		var vehicleFgwCode = "";
		var familyName = "";
		var carModelAndName=$("#carModelAndName").val();
		if(""==json){
			var carModel=carModelAndName.substring("carModel".length,carModelAndName.indexOf("CarName"));
			var carName=carModelAndName.substring(carModelAndName.indexOf("CarName")+"CarName".length);
			$("#vehicle_modelsh").val(carName+'');
			$("#vehicle_modelsh").text(carName+'');
			vehicleChecked(carModel,carModel,carName,"","04","",$("#carModel").val());
			$('#form #jsJGFlag').val('');
		}else{
			//展示车型
			$("#showVehiclePT").show();
			var data=JSON.parse(json);
			if(data.length>0){
				if(data.length==1){
					var carModel=carModelAndName.substring("carModel".length,carModelAndName.indexOf("CarName"));
					var carName=carModelAndName.substring(carModelAndName.indexOf("CarName")+"CarName".length);
				}
				for(var i=0; i<data.length; i++)
				{	
					vehicleFgwCode = replace(data[i].searchCode," ","&nbsp;");
					familyName = replace(data[i].familyName," ","&nbsp;");
					var s= "<dl onclick=vehicleChecked(\"\",\""+data[i].searchCode+"\",\""+data[i].vehicleName+"\",\""+data[i].vehicleSeat+"\",\"03\",\""+data[i].countryNature+"\",\""+data[i].vehicleId+"\")><dt>"+data[i].vehicleName+"，"+data[i].familyName +data[i].vehicleSeat+"座</dt><dd>市场新车参考价"+data[i].priceP+"</dd></dl>";
					vehicle = vehicle + s; 
				}
				$("#vehicleListPT").html(vehicle);
				if($("#vehicleListPT").html()==""){
					$("#vehicleList").html("");
					$("#showVehicle").hide();
					if($("#queryCarModel_confirm").length>0){
						$("#carModelChecked").slideUp();
						$("#vehicleListPT").html("");
						$("#showVehiclePT").hide();
					}
					showInvalidTips($("#carModelChecked"), "对不起,您输入的车辆信息在当地保险公共平台无匹配记录，请核对后重新输入！", true);
				}
			}
		}
	});
	return true;
}
//弹框确定返回主页面
function  rollBack(){
	 window.location.href="/wap";
}
//弹框确定按钮清空车型录入域并清空vin吗录入域并将光标光标定位在vin码录入域
function cleanFocus(){
	//$("#vehicle_modelsh").val("");
	$("#FrameNo").focus();//.val("");
	closeCue();
}
