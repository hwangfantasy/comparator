var map = new Map(); // 指定驾驶员全局变量. 
for(i=1;i<=5;i++)
{
	map.put(i, "f");
}

$(function(){
	/* 选择指定驾驶员，显示驾驶员信息表单 */
    $("#drivenInfoSpecifiedDriver").bind("click", function() {
    	removeInvalidTips($("#showDriverMsg"));
    	
    	if ($("#driver").hasClass('checked')) { 
    		removeInvalidTips($("#showDriverMsg"));
    		$("#driver").removeClass("checked");
    		$("input[name='carInfo.assignDriver']").val(2); 
    		if($("input[name='carInfo.isQuickRenewal']").val()==1){//当为一键续保时
    			syCalculateFee();
    		}
    		$(".driver_info").fadeOut();
//			当复选框取消选中时，隐藏提示信息
			$(".driver_info").next(".validate_tip").fadeOut();
		} else { 
			$("#selectChange").val("2");		//只要点击都要重新计算保费
			$("#driver").addClass("checked"); 
			$("input[name='carInfo.assignDriver']").val(1); 
			
			$(".driver_info").fadeIn();
//    		显示提示信息
    		$(".driver_info").next(".validate_tip").fadeIn();
		}
    });
    
    if($("#drivenInfoLicensingDate").val()=="")
    {
    	$("#drivenInfoLicensingDate").val(getNowTime())
    	
    }
    
//	第一步到第二步时，第三步到第二步时初始化驾驶员信息
    if($("input[name='carInfo.assignDriver']").val()=="1")
    {
    	$("#driver").addClass("checked");
    	$("#selectChange").val(2);
    	
    	
    	if($("input[name='carInfo.assignDriverJson']").val()!="")
    	{
    		var driverInfoJson=$("input[name='carInfo.assignDriverJson']").val();
    		driverInfoJson=eval(driverInfoJson);

    		if(driverInfoJson.length>1)
    		{
//    			为第一个到倒数第二个驾驶员赋值
    			for(var i=0;i<driverInfoJson.length-1;i++)
        		{
    	    		var driInfo=$(".field_append")
    	    		var driverInfo = $(driInfo).parents(".driver_info"), appendWrap = $(driInfo).parents(".form_set_box_appender");
    	    		$(driverInfo).find("#carDriverTable").addClass("field_remove")
    	    		var newDriInfo = $(driverInfo).clone().fadeOut();
    	    		$(newDriInfo).insertBefore(driverInfo);
    	    		$(newDriInfo).find(".form_set_box_appender").remove();
    	    		$(newDriInfo).slideDown(function() {
    	    		   $(".driver_info").find(".field_remove").fadeIn();
    	    		 });
    	    		$(newDriInfo).find("#remove").addClass("field_remove");
    	    		 
    	    		 var key=getKey();
    	    		 $(newDriInfo).find("#drivenInfoGenderMal").attr({"for":"drivenInfoGenderMale_"+key});
    	    		 $(newDriInfo).find("#drivenInfoGenderFem").attr({"for":"drivenInfoGenderFemale_"+key});
    	    		 $(newDriInfo).find("#drivenInfoGenderMa").attr({"for":"drivenInfoGenderMale_"+key});
    	    		 $(newDriInfo).find("#drivenInfoGenderFemal").attr({"for":"drivenInfoGenderFemale_"+key});
    	    		 $(newDriInfo).find("#drivenInfoGenderMale").attr({"name":"gender_"+key});
    	    		 $(newDriInfo).find("#drivenInfoGenderFemale").attr({"name":"gender_"+key});
    	    		
    	    		$($(newDriInfo).find(".input_part")).find("*[id]").each(function() {
    	    		    //新增form元素id属性值加form表单长度：如：id="driverName_1"
    	    		    $(this).attr({ 'id': this.id + "_" + key });
    	    		});
    	    		
    	    		//为驾驶员生日期控件
    	    		var userAgent = window.navigator.userAgent;
    	    	    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){proDriverCal(key);}
    	    	    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){proDriverCal(key);}
    	    	    else if(userAgent.indexOf("UC")>-1){}
    	    	    else if(userAgent.indexOf("Opera")>-1){}
    	    	    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){proDriverCal(key);}
    	    	    else if(userAgent.indexOf("iPhone")>-1){}
    	    	    else {proDriverCal(key);}
    	    	    
    	    	    if($("#driverNameDiv_"+key).length>0){
    	    	    	$("#drivenInfoDriverName_"+key).val(driverInfoJson[i].carDriverName);
    	    	    }
    	    	    if($("#driverIdentityTypeDiv_"+key).length>0){
    	    	    	$("#drivenInfoIDType_"+key).val(driverInfoJson[i].carDriverDrivingtype);
    	    	    }
    	    	    if($("#driverIdentityNumberDiv_"+key).length>0){
    	    	    	$("#drivenInfoIDNo_"+key).val(driverInfoJson[i].carDriverLicenseNo);
    	    	    }
    	    	    if($("#driverSexDiv_"+key).length>0){
    	    	    	var sex=driverInfoJson[i].carDriverSex;
        	    	    
        	    	    var gender="gender_"+key;
        	        	var driuredInfoGenderMale=$("input[name="+gender+"]");
        	    	    
        	    	    if(sex=="1")
        	    	    {
        	    	    	$(driuredInfoGenderMale[0]).attr("class","checked");
        	    	    	$(driuredInfoGenderMale[1]).removeAttr("class");
        	    	    	$("#drivenInfoGenderM_"+key).addClass("radioed")
        	    	    	$("#drivenInfoGenderF_"+key).removeClass("radioed")
        	    	    }
        	    	    else if(sex=="2")
        	    	    {
        	    	    	$(driuredInfoGenderMale[1]).attr("class","checked");
        	    	    	$(driuredInfoGenderMale[0]).removeAttr("class");
        	    	    	$("#drivenInfoGenderM_"+key).removeClass("radioed")
        	    	    	$("#drivenInfoGenderF_"+key).addClass("radioed")
        	    	    }
        	    	    if($("#driverAgeDiv_"+key).length>0){
        	    	    	$("#drivenInfoDriverAge_"+key).val(driverInfoJson[i].carDriverAge)
        	    	    }
        	    	    var areaCode = $("#proSelected").val();
        	    		if(areaCode=="33020000"||areaCode=="31000000"){
        	    			if(driverInfoJson[i].carDriverDrivingtype=="01"||driverInfoJson[i].identifytype=="01")
        	    			{
//            	    			性别单独一行显示
            	    			$("#driverSexDiv_"+key).attr("class","column_right w_100");
            	    			$("#driverAgeDiv_"+key).fadeOut();
            	    			$("#drivenInfoDriverAge_"+key).val("")
        	    			}
        	    			else if(driverInfoJson[i].carDriverDrivingtype==""||driverInfoJson[i].identifytype=="")
        	    	    	{
//        	    				性别单独一行显示
            	    			$("#driverSexDiv_"+key).attr("class","column_right w_100");
            	    			$("#driverAgeDiv_"+key).fadeOut();
            	    			$("#drivenInfoDriverAge_"+key).val("")
        	    	            	
        	    	    	}
        	    			else
        	    			{
        	    				$("#driverSexDiv_"+key).attr("class","column_left");
        	    				$("#driverAgeDiv_"+key).fadeIn();
        	    			}

        	    		}
        	    		else
        	    		{
        	    			$("#driverSexDiv_"+key).attr("class","column_left");
        	    		}
    	    	    }
    	    	    if($("#driverLicenseNoDiv_"+key).length>0){
    	    	    	$("#drivenInfoDrivenLicenseNo_"+key).val(driverInfoJson[i].carDriverLicenseNo);
    	    	    }
    	    	    if($("#driverIdentityNumberDivqd_"+key).length>0){
    	    	    	$("#drivenInfoIDNo_"+key).val(driverInfoJson[i].carDriverIdentityNumber);
    	    	    }
    	    	    if($("#driverLicenseDateDiv_"+key).length>0){
	    	    	    var dri_birthday=driverInfoJson[i].carDriverAcceptLicenseDate
		    	        if(dri_birthday!="")
		  		        {
		    	        	dri_birthday= replace(dri_birthday,"/","-"); 		
		  		        }
    	    	    	$("#drivenInfoLicensingDate_"+key).val(dri_birthday)
    	    	    }
        		}
    		}
    		
//    		为最后一个驾驶员赋值
    		var len=driverInfoJson.length;
    		if($("#driverNameDiv").length>0){
    			$("#drivenInfoDriverName").val(driverInfoJson[len-1].carDriverName)
    		}
    		if($("#driverIdentityTypeDiv").length>0)
    		{
    			$("#drivenInfoIDType").val(driverInfoJson[len-1].carDriverDrivingtype);
    			if(driverInfoJson[len-1].carDriverDrivingtype!="01")
    	    	{
    	    		$("#driverAgeDiv").fadeIn();
    	    	}
    			else
    			{
    				$("#driverAgeDiv").fadeOut();
    			}
    		}
    		if($("#driverIdentityNumberDiv").length>0)
    		{
    			$("#drivenInfoIDNo").val(driverInfoJson[len-1].carDriverLicenseNo);
    		}
    		 if($("#driverIdentityNumberDivqd").length>0){
	    	    	$("#drivenInfoIDNo").val(driverInfoJson[len-1].carDriverIdentityNumber);
	    	    }
    		if($("#driverSexDiv").length>0)
    		{
    			 var sex2=driverInfoJson[len-1].carDriverSex;
    				var driuredInfoGenderMale=$("input[name='gender']");
    	    	    if(sex2=="1")
    	    	    {
    	    	    	$(driuredInfoGenderMale[0]).attr("class","checked");
    	    	    	$(driuredInfoGenderMale[1]).removeAttr("class");
    	    	    	$("#drivenInfoGenderM").addClass("radioed")
    	    	    	$("#drivenInfoGenderF").removeClass("radioed")
    	    	    }
    	    	    else if(sex2=="2")
    	    	    {
    	    	    	$(driuredInfoGenderMale[1]).attr("class","checked");
    	    	    	$(driuredInfoGenderMale[0]).removeAttr("class");
    	    	    	$("#drivenInfoGenderM").removeClass("radioed")
    	    	    	$("#drivenInfoGenderF").addClass("radioed")
    	    	    }
    	    	    if($("#driverAgeDiv").length>0)
    	    		{
    	    			$("#drivenInfoDriverAge").val(driverInfoJson[len-1].carDriverAge)
    	    		}
    	    	    var areaCode = $("#proSelected").val();
    	    		if(areaCode=="33020000"||areaCode=="31000000"){
    	    			if(driverInfoJson[len-1].carDriverDrivingtype=="01"||driverInfoJson[len-1].identifytype=="01")
    	    			{
//        	    			性别单独一行显示
        	    			$("#driverSexDiv").attr("class","column_right w_100");
        	    			$("#driverAgeDiv").fadeOut();
        	    			$("#drivenInfoDriverAge").val("")
    	    			}
    	    			else if(driverInfoJson[len-1].carDriverDrivingtype==""||driverInfoJson[len-1].identifytype=="")
    	    	    	{
    	    				$("#driverSexDiv").attr("class","column_right w_100");
        	    			$("#driverAgeDiv").fadeOut();
        	    			$("#drivenInfoDriverAge").val("")
    	    	            	
    	    	    	}
    	    			else
    	    			{
    	    				$("#driverSexDiv").attr("class","column_left");
    	    				$("#driverAgeDiv").fadeIn();
    	    			}
    	    		}
    	    		else
    	    		{
    	    			$("#driverSexDiv").attr("class","column_left");
    	    		}
    		}
    		if($("#driverLicenseNoDiv").length>0)
    		{
    			$("#drivenInfoDrivenLicenseNo").val(driverInfoJson[len-1].carDriverLicenseNo)
    		}
    		if($("#driverLicenseDateDiv").length>0)
    		{
    			  var drivenInfoLicensingDate= driverInfoJson[len-1].carDriverAcceptLicenseDate
	    	    if(drivenInfoLicensingDate!="")
	            {
			       drivenInfoLicensingDate= replace(drivenInfoLicensingDate,"/","-"); 		
	            }
    			  $("#drivenInfoLicensingDate").val(drivenInfoLicensingDate)
    		}
//    		如果超过该地区指定驾驶员人数，添加按钮就会消失
    		var len=$("#carDriverNumberConf").val();
    		len=parseInt(len)
    		if(driverInfoJson.length>=len)
    		{
    			$(".form_set_box_appender").fadeOut();
    		}
    	}
    	
//    	显示驾驶员列表
    	$(".driver_info").fadeIn();
    }
    var runAreaCodeName = $("input[name='carInfo.runAreaCodeName']").val();
    if(runAreaCodeName.trim()=="03"){
    	$("#areaName").addClass("checked"); 
    }
})

function checkIdentifyNumber(id) {
	
	var reg6="^[_A-Za-z0-9\u4e00-\u9fa5]+$";
	
	var r = getIdIndex(id);
	var obj = $("#"+id);
	
	var data = $("#" + id).val();
	$("#" + id).val(data);
	if ($.trim($("#" + id).val()) == "") {
		showInvalidTips(obj.parents(".driver_info"), "请输入证件号码！", true, obj);
		return false;
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showInvalidTips(obj.parents(".driver_info"), "证件号过长！", true, obj);
		return false;
	}
	removeInvalidTips((obj.parents(".driver_info")));
	// 如果r是数字，说明不是最后一个驾驶员
	if (r) {
		
		if($("#drivenInfoIDType_" + r).val() != "01")
		{
			if (!($("#" + id).val()).match(reg6)) {
				showInvalidTips(obj.parents(".driver_info"), "请输入正确的证件号！",
						true, $("#" + id));
				return false;
			}
		}
		if ($("#drivenInfoIDType_" + r).val() == "01"
				&& $('#drivenInfoIDNo_' + r).val() != "") {
			if(!returnChkCarDriverIdenNum('drivenInfoIDNo_' + r))
			{
				return false;
			}
		}
		removeInvalidTips((obj.parents(".driver_info")));
	} else {
		if($("#drivenInfoIDType").val() != "01")
		{
			if (!($("#" + id).val()).match(reg6)){
				showInvalidTips(obj.parents(".driver_info"), "请输入正确的证件号！",
						true, $("#" + id));
				return false;
			}
		}
		if ($("#drivenInfoIDType").val() == "01"
				&& $('#drivenInfoIDNo').val() != "") {
			if(!returnChkCarDriverIdenNum('drivenInfoIDNo'))
			{
				return false;
			}
		}
		removeInvalidTips((obj.parents(".driver_info")));

	}

	return true;
}
//验证驾驶员姓名
function returnChkCarDriverName(id) {
	var obj = $("#"+id);
	var msg = checkCarDriverName(obj);
	if(trim(msg) == "true"){
		removeInvalidTips(obj.parents(".driver_info"));
		return true;
	}else{
		showInvalidTips(obj.parents(".driver_info"), msg, true, obj);
    	return false;
	}
}
//验证驾驶员姓名
function checkCarDriverName(field) {
	var carDriverName = field.val();
	var sample = "'";
	var msg="";
	if ($.trim(carDriverName) == "") {
		return "请输入驾驶员姓名！";
	} else {
			return "true";
	}
}

//验证身份证号
function returnChkCarDriverIdenNum(pos) {
    //只有青岛指定驾驶员时录入身份证号信息
		var obj = $("#"+pos);
		var indentifyNum = obj.val();
		var msg = "";
		msg = trim(isCardID_new(obj.val()));
		if(trim(indentifyNum) == ""){
			showInvalidTips(obj.parents(".driver_info"), "请输入身份证号码！", true, obj);
			return false;
		}else{
			if(msg == "true"){
//				var age = calculateAge($("#drivenInfoIDNo_"+pos));
//				if(age != 0){
//					$("#drivenInfoDriverAge_"+pos).val(age);
//				}
//				checkDuplicateIdentifyNo();
				removeInvalidTips(obj.parents(".driver_info"));
				return true;
			}else{
				showInvalidTips(obj.parents(".driver_info"), msg, true, obj);
		    	return false;
			}
		}
		removeInvalidTips(obj.parents(".driver_info"));
		
}

///证件号码 select
function returnCarDriverSelect(pos){
	
	var r=getIdIndex(pos);
	
	var obj = $("#"+pos);
	var areaCode = $("#proSelected").val();
	
	if(areaCode=="33020000"||areaCode=="31000000"){
		if(r)
		{
			if(obj.val() == "01"){
				$("#drivenInfoDriverAge_"+r).val("");
				$("#driverAgeDiv_"+r).fadeOut();
//				  性别单独一行显示
				 $("#driverSexDiv_"+r).attr("class","column_right w_100");
			}else{
				$("#driverSexDiv_"+r).attr("class","column_left");
				$("#driverAgeDiv_"+r).fadeIn();
//				  性别和年龄一行显示
				
			}
			if($("#drivenInfoIDNo_"+r).val()!="")
			{
				checkIdentifyNumber("drivenInfoIDNo_"+r);
			}
			$("#drivenInfoIDNo_"+r).focus();
		}
		else
		{
			if(obj.val() == "01"){
				$("#drivenInfoDriverAge").val("");
				$("#driverAgeDiv").fadeOut();
				$("#driverSexDiv").attr("class","column_right w_100");
			}else{
				 $("#driverSexDiv").attr("class","column_left");
				 $("#driverAgeDiv").fadeIn();
				
			}
			if($("#drivenInfoIDNo").val()!="")
			{
				checkIdentifyNumber("drivenInfoIDNo");
			}
			
			$("#drivenInfoIDNo").focus();
		}
		
	}
}

///证件号码 input
function returnCarDrivingLicense(id){
//	id是否存在
	if($("#"+id).length<0)
	{
		return false;
	}
	
	var reg = /^\d+$/;
	var index = id.indexOf("_");
	index2 = id.substring(index + 1, id.length);
	var r = index2.match(reg);
	
	var data = $("#" + id).val();
	$("#" + id).val(data);
	if ($.trim($("#" + id).val()) == "") {
		showInvalidTips($("#" + id).parents(".driver_info"), "请输入驾驶证号！", true,
				$("#" + id));
		return false;
	}
	if (pcbytes($("#" + id).val()) > 36) {
		showInvalidTips($("#" + id).parents(".driver_info"), "证件号过长！",
				true, $("#" + id));
		return false;
	}
	removeInvalidTips($("#" + id).parents(".driver_info"));
	// 如果r是数字，说明不是最后一个驾驶员
	if (r) {
			var identiyId = $("#drivenInfoDrivenLicenseNo_" + index2).val();
			var msg = isCardID(identiyId);
			if (msg == "true") {
			} else {
				showInvalidTips($("#" + id).parents(".driver_info"), "请输入正确的驾驶证号！",
						true, $("#" + id));
				return false;
			}
		removeInvalidTips($("#" + id).parents(".driver_info"));
	} else {
//			校验证件号码
			var identiyId = $("#drivenInfoDrivenLicenseNo").val();
			var msg = isCardID(identiyId);
			if (msg == "true") {
			} else {
				showInvalidTips($("#" + id).parents(".driver_info"), "请输入正确的驾驶证号！",
						true, $("#" + id));
				return false;
			}
		}
	   removeInvalidTips($(".driver_info"));
		
		return true;

}
	

//根据身份证号码计算年龄
function calculateAge(obj){
	var localDate = new Date();
	var identifyNum = obj.val();
	var currentYear = localDate.getFullYear();
	var currentMonth = localDate.getMonth() + 1;
	var inputMonth;
	var inputYear;
	var age = 0;
	if(identifyNum.length == 15){
		inputYear = "19" + identifyNum.substring(6,8);
		inputMonth = identifyNum.substring(8,10);
		age = currentYear - inputYear;
		if(currentMonth < inputMonth){
			age -=1;
		}
		return age;
	}
	if(identifyNum.length == 18){
		inputYear = identifyNum.substring(6,10);
		inputMonth = identifyNum.substring(10,12);
		age = currentYear - inputYear;
		if(currentMonth < inputMonth){
			age -=1;
		}
		return age;
	}
	return age;
}
//初次领证日期
function returnCarDriverAcceptLicenseDate(pos){
	var obj = $("#"+pos);
	msg = trim(checkLicenseYear(obj));
	if(msg == "true"){
		removeInvalidTips(obj.parents(".driver_info"));
		return true;
	}else{
		showInvalidTips(obj.parents(".driver_info"), msg, true, obj);
		return false;
	}
}
//初次领证日期
function checkLicenseYear(obj) {
	
	var nowTime=new Date();
	var nowYear=nowTime.getFullYear();
	var nowMonth=nowTime.getMonth()+1;
	var nowDay=nowTime.getDate();
	nowMonth = (nowMonth<10)?"0"+nowMonth:nowMonth;
	nowDay = (nowDay<10)?"0"+nowDay:nowDay;
	var now = nowYear+"-"+nowMonth+"-"+nowDay;
	
	var isDate='\d{4}-\d{2}-\d{2}';
	var licenseYear = obj.val();
	if(trim(licenseYear) == ""){
		return "请选择首次领证日期！";
	}
	if(licenseYear.match(isDate))
	{
		return "日期格式错误，请重新确认！";
	}
	if (licenseYear > now) {
		return "请选择正确的日期！";

	}
	
	return "true";
}

//验证驾驶员年龄
function returnChkCarDriverAge(pos){
	var obj = $("#"+pos);
	var msg = trim(checkCarDriverAge(obj));
	if(msg == "true"){
		removeInvalidTips(obj.parents(".driver_info"));
		return true;
	}else{
		showInvalidTips(obj.parents(".driver_info"), msg, true, obj);
		return false;
	}
	
}
//验证年龄
function checkCarDriverAge(obj) {
	var carDriverAge = obj.val();
	if(carDriverAge == "" || carDriverAge == null){
		return "请输入驾驶员年龄！";
	}else{
		for(var i = 0; i < carDriverAge.length; i++) {
			if(parseInt(carDriverAge.charAt(i)) >= 0 && parseInt(carDriverAge.charAt(i)) <= 9) {
			}else{
				return "驾驶员年龄只能为数字！";
			}
		}
	}
	return true;
}



function checkDuplicateIdentifyNo(){

}
  /**
   *计算驾龄
   */
function changeLicenseYear(pos)
{
  var LicenseDate=$("#CarDriverAcceptLicenseDate"+pos).val();
  var inputDate = new Date($("#StartDateSY").val());
  var LicenseYear;  //驾龄
  var dateLicenseDate;
  dateLicenseDate = new Date(replace(LicenseDate,"-","/"));
  LicenseYear =((inputDate.getFullYear() - dateLicenseDate.getFullYear()) * 12 +
                                              (inputDate.getMonth() - dateLicenseDate.getMonth())) /12;
 
  $("#DrivingYears"+pos).val(Math.floor(LicenseYear));
}

function Map() {
 var struct = function(key, value) {
  this.key = key;
  this.value = value;
 }
 
 var put = function(key, value){
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
    this.arr[i].value = value;
    return;
   }
  }
   this.arr[this.arr.length] = new struct(key, value);
 }
 
 var get = function(key) {
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
     return this.arr[i].value;
   }
  }
  return null;
 }
 
 var remove = function(key) {
  var v;
  for (var i = 0; i < this.arr.length; i++) {
   v = this.arr.pop();
   if ( v.key === key ) {
    continue;
   }
   this.arr.unshift(v);
  }
 }
 
 var size = function() {
  return this.arr.length;
 }
 
 var isEmpty = function() {
  return this.arr.length <= 0;
 }
 this.arr = new Array();
 this.get = get;
 this.put = put;
 this.remove = remove;
 this.size = size;
 this.isEmpty = isEmpty;
}
function  checkDriverInfo()
{ 
	if($("#drivenInfoDriverName").length>0)
	{
		if(!returnChkCarDriverName("drivenInfoDriverName"))
    	{
    		return false;
    	}
	}
	if($("#drivenInfoIDNo").length>0)
	{
		if(!checkIdentifyNumber("drivenInfoIDNo"))
    	{
			return false;
    	}
	}
	if($("#drivenInfoDrivenLicenseNo").length>0)
	{
		if(!returnCarDrivingLicense("drivenInfoDrivenLicenseNo"))
    	{
			return false;
    	}
	}
	 
	if($("#drivenInfoDriverAge").length>0)
	{
		if(!returnChkCarDriverAge("drivenInfoDriverAge"))
    	{
			return false;
    	}
	}
	
	if($("#drivenInfoLicensingDate").length>0)
	{
		if(!returnCarDriverAcceptLicenseDate("drivenInfoLicensingDate"))
    	{
			return false;
    	}
	}
	
	
}

/* 新增驾驶员信息 */
function insertDriInfo() {
//if(!insertDriverInfo())
//{
//	return false;
//}
	 var key=getKey();
	 $("#drivenInfoLicensingDate").attr("type","text");
	
	$("#selectChange").val(2);
    var driInfo=$(".field_append")
	var driverInfo = $(driInfo).parents(".driver_info"), appendWrap = $(driInfo).parents(".form_set_box_appender");
	$(driverInfo).find("#carDriverTable").addClass("field_remove")
	var newDriInfo = $(driverInfo).clone().fadeOut();
	$(newDriInfo).insertBefore(driverInfo);
	$(newDriInfo).find(".form_set_box_appender").remove();
	$(newDriInfo).slideDown(function() {
	   $(".driver_info").find(".field_remove").fadeIn();
	 });
	$(newDriInfo).find("#remove").addClass("field_remove");
	 
	
	 $(newDriInfo).find("#drivenInfoGenderMal").attr({"for":"drivenInfoGenderMale_"+key});
	 $(newDriInfo).find("#drivenInfoGenderFem").attr({"for":"drivenInfoGenderFemale_"+key});
	 $(newDriInfo).find("#drivenInfoGenderMa").attr({"for":"drivenInfoGenderMale_"+key});
	 $(newDriInfo).find("#drivenInfoGenderFemal").attr({"for":"drivenInfoGenderFemale_"+key});
	 $(newDriInfo).find("#drivenInfoGenderMale").attr({"name":"gender_"+key});
	 $(newDriInfo).find("#drivenInfoGenderFemale").attr({"name":"gender_"+key});
	
	 
	$($(newDriInfo).find(".input_part")).find("*[id]").each(function() {
	    //新增form元素id属性值加form表单长度：如：id="driverName_1"
	    $(this).attr({ 'id': this.id + "_" + key });
//	    $(this).attr({ 'name': this.name + "_" + key });
	});
	
	
//    $($(newDriInfo).find(".input_part")).find("#driverSexDiv").find("input").attr("name");
	
	//改变日期输入框类型
	$("#drivenInfoLicensingDate").attr("type","date");
	  $("#drivenInfoLicensingDate_"+key).attr("type","date");
	
	var userAgent = window.navigator.userAgent;
    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){proDriverCal(key);}
    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){proDriverCal(key);}
    else if(userAgent.indexOf("UC")>-1){}
    else if(userAgent.indexOf("Opera")>-1){}
    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){proDriverCal(key);}
    else if(userAgent.indexOf("iPhone")>-1){}
    else {proDriverCal(key);}
	

	//默认选择证件类型
	$("#drivenInfoIDType_"+key).val($("#drivenInfoIDType").val());
	$("#drivenInfoDriverName").val("");
	$("#drivenInfoIDType").val("01");
	$("#drivenInfoIDNo").val("");
	$("#driverAgeDiv").hide();
	$("#drivenInfoDriverAge").val("");
	var gender="gender";
  	var driuredInfoGenderMale=$("input[name="+gender+"]");
	    
	$(driuredInfoGenderMale[0]).attr("class","checked");
	$(driuredInfoGenderMale[1]).removeAttr("class");
	$("#drivenInfoGenderM").addClass("radioed")
	$("#drivenInfoGenderF").removeClass("radioed")
	
	var areaCode = $("#proSelected").val();
	if(areaCode=="33020000"||areaCode=="31000000"){
//		性别单独一行显示
		$("#driverSexDiv").attr("class","column_right w_100");
	}
	else
	{
		$("#driverSexDiv").attr("class","column_left");
	}
	$("#drivenInfoDrivenLicenseNo").val("");
	$("#drivenInfoLicensingDate").val(getNowTime());
	
	var driverIndex=$("#carDriverNumberConf").val();
	driverIndex=parseInt(driverIndex);
	
	if($(".driver_info").length==driverIndex)
	{
		$(".form_set_box_appender").fadeOut();
	}
	
	removeInvalidTips($(".driver_info"));

	
	 return false;

}
/* 绑定删除驾驶员信息按钮 */
function removeDriInfo(ids) {
	
	var rmv=$("#"+ids);
	
	 var s=$(rmv).parents(".driver_info").find("#drivenInfoDriverName").val()
	  var array= $(rmv).parents(".driver_info").find("input");
	  var id=array[0].id;
	  var key=id.substring(id.length-1,id.length);
//	  删除弹出层随着被保人的位置改变而改变
	  var w = $(rmv).offset();
	  $("#delete").fadeIn().css('top',w.top);
	  $("#insurerDel").css({ 'height': $(document).height() }).fadeIn();
	  var name;
	  
	  var reg = /^\d+$/;
		var r = key.match(reg);
	  if(r)
	  {
		  name=$("#drivenInfoDriverName_"+key).val();
	  }
	  else
	  {
		  name=$("#drivenInfoDriverName").val();
	  }
	  
	  $('.popup').fadeIn();
	
		$(".order_list").find("a.trash").click(function(){
			$('.popup').fadeIn();
			return false;
		});
		$('.popup a.close,.popup .inp_close').click(function(){
			$('.popup').fadeOut();
			$("#insurerDel").fadeOut();
			return false;
		});
		if(name.length>4)
		{
			if(name.length>13)
			{
				$('.popup .msg').html("<p style=\' margin-top: -10px;\' " +">确定要把驾驶员</p>" +
						"<p text-align:center;  style=\' margin-top: -10px;\'>\""+name.substring(0,14)+"</p>" +
						"<p style=\' margin-top: -10px;\'>"+name.substring(14,name.length+1)+"\"</p>"+
						"<p  style=\' margin-top: -10px;margin-bottom:-8px\'>删除吗？</p>");
			}
			else
			{
				$('.popup .msg').html("<p style=\' margin-top: -10px;\' >确定要把驾驶员</p><p text-align:center;  style=\' margin-top: -10px;\'>\""+name+"\"</p><p  style=\' margin-top: -10px;margin-bottom:-8px\'>删除吗？</p>");
			}
			
		}
		else
		{
			$('.popup .msg').html("<p>确定要把驾驶员\'"+name+"\'删除吗？</p>");
		}
		
		if(r)
		{
			met="ok("+key+")";
			$("#ok").attr({"onclick":met});
		}
		else
		{
			met="ok2()";
			$("#ok").attr({"onclick":met});
		}
		
}
function ok2()
{
	removeInvalidTips($(".driver_info"));
	var listInf=$("#drivenInfoDriverName").parents(".driver_info");
    $(listInf).slideUp(function() {
	  var appender = null;
      if($(listInf).find(".form_set_box_appender").length > 0) {
          appender = $(listInf).prev(".driver_info").append($(listInf).find(".form_set_box_appender"));
         var preList= $(listInf).prev(".driver_info")
         
         var a=$(preList).find("a").eq(0);
         ids2=a.attr("id");
         index=ids2.substring(ids2.length-1,ids2.length);
         index=parseInt(index);
         
        setKey(index);
         
         
         $($(preList).find(".input_part")).find("*[id]").each(function() {
     	    //新增form元素id属性值加form表单长度：如：id="driverName_1"
        	
        	 var ids=this.id;
        	 
    		 ids=ids.substring(0,ids.length-2);
        	 $(this).attr({ 'id': ids });
        	
     	});
         
         $(preList).find("#drivenInfoGenderMal").attr({"for":"drivenInfoGenderMale"});
	     $(preList).find("#drivenInfoGenderFem").attr({"for":"drivenInfoGenderFemale"});
	     $(preList).find("#drivenInfoGenderMa").attr({"for":"drivenInfoGenderMale"});
	     $(preList).find("#drivenInfoGenderFemal").attr({"for":"drivenInfoGenderFemale"});
         
         $($(preList).find(".input_part")).find("#driverSexDiv").find("input").attr({"name":"gender"});
          
      }
      $(listInf).remove();
      var driverIndex=$("#carDriverNumberConf").val();
  	  driverIndex=parseInt(driverIndex);
  	
		if($(".driver_info").length<driverIndex)
		{
			
			$(".form_set_box_appender").fadeIn();
		}
      if($(".driver_info").length <= 1) $(".field_remove").fadeOut();
  });
	$('.popup').fadeOut();
	$("#insurerDel").fadeOut();
	
	
}
function ok(key)
{    
//	删除驾驶证号重复提示
	removeInvalidTips($(".driver_info"));
	var listInf=$("#drivenInfoDriverName_"+key).parents(".driver_info");
    $(listInf).slideUp(function() {
//	  回收key
	  setKey(key)
	  var appender = null;
      if($(listInf).find(".form_set_box_appender").length > 0) {
          appender = $(listInf).prev(".driver_info").append($(listInf).find(".form_set_box_appender"));
      }
      $(listInf).remove();
      var driverIndex=$("#carDriverNumberConf").val();
  	  driverIndex=parseInt(driverIndex);
  	
  	if($(".driver_info").length<driverIndex)
  	{
  		
  		$(".form_set_box_appender").fadeIn();
  	}

      if($(".driver_info").length <= 1) $(".field_remove").fadeOut();
  });
	$('.popup').fadeOut();
	$("#insurerDel").fadeOut();
}
function setKey(key)
{
	  map.put(parseInt(key), "f");
}
function getKey()
{
	  for(i=1;i<=5;i++)
		 {
			 if(map.get(i)=="f")
			 {
				 this.map.put(i, "t");
				 return i;
				
			 }
		 }
}

function getNowTime()
{
	var nowTime=new Date();
	var nowYear=nowTime.getFullYear();
	var nowMonth=nowTime.getMonth()+1;
	var nowDay=nowTime.getDate();
	nowMonth = (nowMonth<10)?"0"+nowMonth:nowMonth;
	nowDay = (nowDay<10)?"0"+nowDay:nowDay;
	var nowTime = nowYear+"-"+nowMonth+"-"+nowDay;
	
	return nowTime;
}

function toDate(str){
	str = str + " "; //字符串后加一个空格
	var date = "";
	var month = new Array();  //月
	month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4;
    month["May"] = 5; month["Jan"] = 6; month["Jul"] = 7; month["Aug"] = 8;
    month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
    var week = new Array();  //周
    week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四";
    week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
    newStr = str.split(" ");//根据空格组成数组
    date = newStr[5] + "-";
    date = date + month[newStr[1]] + "-" + newStr[2];
    alert(date)
//    return date;
}

function getIdIndex(id)
{
	var reg = /^\d+$/;
	var index = id.indexOf("_");
	index2 = id.substring(index + 1, id.length);
	var r = index2.match(reg);
	
	return r;
}
function pcbytes(str) {
	if (typeof (str) != 'string') {
		str = str.value;
	}
	var len = 0;
	for ( var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127) {
			len++;
		}
		len++;
	}
	return len;
}

//身份证校验
function isCardID(idcard) {
	var Errors = new Array("true", "请输入正确的身份证号！", "请输入正确的身份证号！", "请输入正确的身份证号！",
			"请输入正确的身份证号！");

	var area = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	}
	var retflag = false;
	var idcard, Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null)
		return Errors[4];
	// 身份号码位数及格式检验
	switch (idcard.length) {
	case 15:
		if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0
				|| ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard
						.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
		} else {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
		}
		if (ereg.test(idcard))
			return Errors[0];
		else {
			//15位做校验
			//return Errors[2];
			//15位不做校验
			return Errors[0];
		}
		break;
	case 18:
		// 18位身份号码检测
		// 出生日期的合法性检查
		// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		if (parseInt(idcard.substr(6, 4)) % 400 == 0
				|| (parseInt(idcard.substr(6, 4)) % 100 != 0 && parseInt(idcard
						.substr(6, 4)) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
			// 闰年出生日期的合法性正则表达式
		} else {
			ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
			// 平年出生日期的合法性正则表达式
		}
		if (ereg.test(idcard)) {// 测试出生日期的合法性
			// 计算校验位
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
					+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
					* 9
					+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
					* 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
					* 5
					+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
					* 8
					+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
					* 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
					* 2 + parseInt(idcard_array[7]) * 1
					+ parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
					* 3;
			Y = S % 11;
			M = "F";
			JYM = "10X98765432";
			M = JYM.substr(Y, 1);// 判断校验位
			if (M == idcard_array[17])
				return Errors[0]; // 检测ID的校验位
			else
				return Errors[3];
		} else
			return Errors[2];
		break;
	default:
		return Errors[1];
		break;
	}
}