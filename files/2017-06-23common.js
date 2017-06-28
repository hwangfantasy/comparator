/**
 * User: Phoenix
 * Date: 13-4-28
 * Time: 上午1:44
 * Common functions
 */
var DATE_DELIMITER="/";       //日期分隔符
function showInvalidTips(wrap, msg, redBorder, targetObj) {
    $(wrap).addClass(redBorder ? "validate_failed" : "").find($.isEmptyObject(targetObj) ? "input" : targetObj);
    if($(wrap).next(".validate_tip").length > 0)
        $(wrap).next(".validate_tip").addClass(!redBorder ? "center" : "").html(msg);
    else
        $(wrap).after($('<div></div>').addClass("validate_tip").addClass(!redBorder ? "center" : "").html(msg));
}

function showInvalidTips2(wrap, msg, redBorder,targetObj) {
    $(wrap).addClass(redBorder ? "validate_failed" : "").find($.isEmptyObject(targetObj) ? "input" : targetObj);
    if($(wrap).next(".validate_tip2").length > 0)
        $(wrap).next(".validate_tip2").html(msg);
    else
        $(wrap).after($('<div></div>').addClass("validate_tip2").html(msg));
}

function removeInvalidTips(wrap) {
    $(wrap).removeClass("validate_failed");
    $(wrap).next(".validate_tip").remove()
}
function removeInvalidTips2(wrap) {
    $(wrap).removeClass("validate_failed");
    $(wrap).next(".validate_tip2").remove()
}
//为被保人产生日期控件
function proCalendar2(key)
{
	 var insuredInfoBirthday="#insuredInfoBirthday_"+key;
	 	if($(insuredInfoBirthday).length>0){
		    	var enroll = $(insuredInfoBirthday).val();
		    	$(insuredInfoBirthday).attr("readonly","readonly")
		    	enroll = enroll.split("-");
		    	var defaultYear = enroll[0];
		    	var defaultMonth = enroll[1];
		    	var defaultDay = enroll[2];
		    	var date=new Date();
		    	if($("#riskCode").val()=="EAJ"||$("#riskCode").val()=="JBS"){
		       		minYear=date.getFullYear()-80;
		       	   	maxYear=date.getFullYear();
		       	}else if($("#riskCode").val()=="EJQ_Z"||$("#riskCode").val()=="EJQ_H"){
		       		minYear=date.getFullYear()-75;
		       	   	maxYear=date.getFullYear()
		       	}else if($("#riskCode").val()=="EAK_U"||$("#riskCode").val()=="EAK_X"){
		       		minYear=date.getFullYear()-80;
		       	   	maxYear=date.getFullYear()-1;
		       	}else{
		       		minYear=date.getFullYear()-75;
		       	   	maxYear=date.getFullYear()-45;
		       	}
		    	
		    	$(insuredInfoBirthday).UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":minYear,"maxYear":maxYear});
		    	
		    }
 }
//处理苹果单选框和复选框问题
function checkAppleSex(id)
{
	var reg = /^\d+$/;
	var index = id.indexOf("_");
	index2 = id.substring(index + 1, id.length);
	var r = index2.match(reg);
	
	if(r)
	{
		var gender="gender_"+r;
    	var sex=$("input[name="+gender+"]");
		
		if("drivenInfoGenderMal_"+r==id)
		{
			$("#drivenInfoGenderM_"+r).addClass("radioed")
			$("#drivenInfoGenderF_"+r).removeClass("radioed")
			$(sex[0]).attr("class","checked0");
			$(sex[1]).removeAttr("class");
			
		}
		else if(("drivenInfoGenderFem_"+r==id))
		{
			$("#drivenInfoGenderF_"+r).addClass("radioed")
			$("#drivenInfoGenderM_"+r).removeClass("radioed")
			$(sex[1]).attr("class","checked0");
			$(sex[0]).removeAttr("class");
			
		}
	}
	else
	{
		var sex=$("input[name='gender']");
		
		if("drivenInfoGenderMal"==id)
		{
			$("#drivenInfoGenderM").addClass("radioed")
			$("#drivenInfoGenderF").removeClass("radioed")
			$(sex[0]).attr("class","checked0");
			$(sex[1]).removeAttr("class");
		}
		else if(("drivenInfoGenderFem"==id))
		{
			$("#drivenInfoGenderF").addClass("radioed")
			$("#drivenInfoGenderM").removeClass("radioed")
			$(sex[1]).attr("class","checked0");
			$(sex[0]).removeAttr("class");
			
		}
	}
}

//为驾驶员生日期控件
function proDriverCal(key)
{
	
	 var drivenInfoLicensingDate="#drivenInfoLicensingDate_"+key;
	 	if($(drivenInfoLicensingDate).length>0){
		    	var enroll = $(drivenInfoLicensingDate).val();
		    	$(drivenInfoLicensingDate).attr("readonly","readonly")
		    	enroll = enroll.split("-");
		    	var defaultYear = enroll[0];
		    	var defaultMonth = enroll[1];
		    	var defaultDay = enroll[2];
		    	var date=new Date();
		    	year=date.getFullYear();
		    	
		    	$(drivenInfoLicensingDate).UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year});
		    	
		    }
 }
//自助自驾返回上一步时，设置被保人列表
function proCalendar()
{
	var date=new Date();
	minYear=date.getFullYear()-80;
	maxYear=date.getFullYear()-1;
	
	for(var i=1;i<=5;i++)
	{ 
		var insuredInfoBirthday="#insuredInfoBirthday_"+i;
		if($(insuredInfoBirthday).length>0){
	    	var enroll = $(insuredInfoBirthday).val();
	    	$(insuredInfoBirthday).attr("readonly","readonly")
	    	enroll = enroll.split("-");
	    	var defaultYear = enroll[0];
	    	var defaultMonth = enroll[1];
	    	var defaultDay = enroll[2];
	    	
	    	$(insuredInfoBirthday).UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":minYear,"maxYear":maxYear });
	    }
	}
}
//出生日期效验
function checkInsuredBirthday2(id) {
//	var reg = /^\d+$/;
//	var index = id.indexOf("_");
//	index2 = id.substring(index + 1, id.length);
//	var r = index2.match(reg);
	if ($.trim($('#' + id).val()) == '') {
		
		showInvalidTips($("#" + id).parents(".form_set_box"), "请选择出生日期！",
				true, $("#" + id));
		return false;
	}
	var startdate = $('#inputStartDate').val();
	var birthday = $.trim($('#' + id).val());
	var riskCode = $("#riskCode").val();
	if (riskCode == "EAK_U" || riskCode == "EAK_X") {
		if (!chkBirthday(70, 1, startdate, birthday)) {
			showInvalidTips($("#" + id).parents(".form_set_box"),
					"被保险人年龄要求1-70周岁！", true, $("#" + id));
			return false;
		}
	}

	removeInvalidTips($("#" + id).parents(".form_set_box"));
	return true;
}
$(function() {
	//htc海豚浏览器tel类型处理
	var userAgent = window.navigator.userAgent;
    if(userAgent.indexOf("Mozilla/5.0 (Linux; U; Android 2.3.3; zh-cn; HTC Desire S Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1")>-1){
    	$("input[type='tel']").each(function(){
    	    $(this).attr("type","text");
    	});
    }
	
	window.onload=function(){
		if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) { 
		bodyTag = document.getElementsByTagName('body')[0]; 
		bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px'; 
		} 
		setTimeout(function() { 
		window.scrollTo(0, 1) 
		}, 0); 
		};
	
	
		$.fn.extend({
	        'popup': function(options, value) {

	            var defaultOptions = $.extend({
	                'id': "popup" + $( ".overlay" ).length,
	                'confirm': false,
	                'msg': "",
	                'delay': 3000,
	                'callback': null
	            }, options);

	            if(typeof options == 'string') defaultOptions[options] = value;

	            var closer = $('<a href="#"></a>').addClass("close")
//	                .bind('click', defaultOptions.callback)
	                .bind('click', function() {
	                    $(popup).fadeOut(function() {
	                        if(!defaultOptions.confirm)
	                            eval(defaultOptions.callback);
	                        $(this).remove();
	                    });
	                    return false;
	                });
	            var confirmBtns = $('<div></div>').addClass("confirm_btns")
	                .append($("<input type='button' />").val("取   消").bind('click', function() { $(closer).trigger('click'); } ))
	                .append($("<input type='button' />").val("确   定").bind('click', defaultOptions.callback).bind('click', function() { $(closer).trigger('click'); }));
	            var popup = $('<div></div>').addClass("overlay").attr({ 'id': defaultOptions.id }).css({ 'height': $(document).height() })
	                .append($('<div></div>').addClass("popup float_center").css({ 'marginTop': $(window).height() / 2 + $(window).scrollTop() - 50})
	                    .append($('<div></div>').addClass("tip").addClass(defaultOptions.confirm ? "confirm" : "")
	                        .append(closer)
	                        .append($('<div></div>').addClass("msg").addClass(defaultOptions.confirm ? "confirm" : "").html(defaultOptions.msg)).append(defaultOptions.confirm ? confirmBtns : null))).prependTo($("body")).fadeIn();

	            if(!defaultOptions.confirm)
	                setTimeout(function() {
	                    $(closer).trigger('click');
	                }, defaultOptions.delay);
	        },
	        'processing':function(options, value) {

	            var defaultOptions = $.extend({
	                'id': "processing" + $( ".overlay" ).length,
	                'msg': "",
	                'done': false,
	                'callback': null
	            }, options);

	            if(typeof options == 'string') defaultOptions[options] = value;

	            var popup = $('<div></div>').addClass("overlay").attr({ 'id': defaultOptions.id }).css({ 'height': $(document).height() })
	                .append($('<div></div>').addClass("processing center_wrap")
	                    .append($('<div></div>').addClass("loading"))
	                    .append($('<div></div>').addClass("msg").html(defaultOptions.msg))).prependTo($("body")).fadeIn();
	            return this;
	        }
	    });

		$(".overlay").on('click', ".dialog_closer", function() {
	        var overlay = $(this).parents(".overlay");
	        $(overlay).addClass("hide");
	        setTimeout(function() {
	            $(overlay).removeClass("show hide");
	            $("body").css({ 'overflow': "visible"});
	        }, 1000);
	        return false;
	    });

	    if($.ui) {
	        $.ui.autocomplete.prototype._renderMenu = function(ul, items) {
	            var self = this;
	            var scroll = false;
	            if (items.length * 20 > 200) {
	                ul.css({ height: 200, overflowY: "scroll" });
	                scroll = true;
	            } else {
	                ul.css({ width: 260, height: "auto", overflowY: "visible" });
	            }
	            $(items).each(function() {
	                $(this).css({ width: "100%" });
	                if (scroll) $(this).find('a').css({ width: "90%" });
	                self._renderItem(ul, this);
	            });
	        };


        /**
         * reset region picker popup style
         * @param ul    picker popup ul
         * @param item  picker popup list data
         */
        $.ui.autocomplete.prototype._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item)
                .append("<a class='region_picker_items'><span>" + item.value
                    + "</span><span>" + item.code + "</span></a>")
                .appendTo(ul);

        };
    }
	    
	  //为所有的输入框绑定一个全角转半角的事件  是否要都绑定呢？
	    $(".textfield").bind("blur",function(){
	    	$(this).val(fullChar2halfChar($(this).val()));
	    });
});

//替换字符串函数
function replace(strExpression,strFind,strReplaceWith)
{
  var strReturn;
  var re = new RegExp(strFind,"g");
  if(strExpression==null)
    return null;

  strReturn = strExpression.replace(re,strReplaceWith);
  return strReturn;
}
//比较两个日期字符串
//date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1
function compareFullDate(date1,date2)
{
	var strValue1=date1.split(DATE_DELIMITER);
	var date1Temp=new Date(strValue1[0],parseInt(strValue1[1],10)-1,parseInt(strValue1[2],10));
	
	var strValue2=date2.split(DATE_DELIMITER);
	var date2Temp=new Date(strValue2[0],parseInt(strValue2[1],10)-1,parseInt(strValue2[2],10));
	
	if(date1Temp.getTime()==date2Temp.getTime())
	 return 0;
	else if(date1Temp.getTime()>date2Temp.getTime())
	 return 1;
	else
	 return -1;
}


//比较两个日期（包括小时和分钟）字符串
//date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1
function compareFullTime(date1,date2)
{
	date1=replace(date1," ","-");
	date1=replace(date1,":","-");
	date2=replace(date2," ","-");
	date2=replace(date2,":","-");
	
	var strValue1=date1.split("-");
	var date1Temp=new Date(strValue1[0],parseInt(strValue1[1],10)-1,parseInt(strValue1[2],10),parseInt(strValue1[3],10),parseInt(strValue1[4],10));
	
	var strValue2=date2.split("-");
	var date2Temp=new Date(strValue2[0],parseInt(strValue2[1],10)-1,parseInt(strValue2[2],10),parseInt(strValue2[3],10),parseInt(strValue2[4],10));
	
	if(date1Temp.getTime()==date2Temp.getTime())
	 return 0;
	else if(date1Temp.getTime()>date2Temp.getTime())
	 return 1;
	else
	 return -1;
}
/**
 * 日期处理函数
 */
function getNextDateFullDate(strDate,intCount)
{
	if(strDate.indexOf("-") > 0){
		var  aDate = strDate.split("-");
		strDate = aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]
//		alert
	}
	
  var tempDate = new Date(strDate);
  if(intCount == null)
  {
    intCount =1;
  }

  var nextDateInMS = tempDate.getTime() + (intCount * 24 * 60 * 60 * 1000 );
//  var strReturn = convertFullDateToString(new Date(nextDateInMS));
  var strReturn = convertFullDateToStringNew(new Date(nextDateInMS));   //cy 0912 bug-1801
  return strReturn;
}


//得到下n个天
function getNextDayFullDate(strDate,intCount)
{
	if(strDate.indexOf("-") > 0){
		var  aDate = strDate.split("-");
		strDate = aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]
//		alert
	}
	var tempDate = new Date(strDate);
	if(intCount == null)
	{
		intCount =1;
	}
	tempDate.setDate(parseInt(tempDate.getDate()) + parseInt(intCount));
	var strReturn = convertFullDateForPeriod(tempDate);
	return strReturn;
}
//得到下n个月
function getNextMonthFullDate(strDate,intCount)
{
  var tempDate = new Date(strDate);
  if(intCount == null)
  {
    intCount =1;
  }

  tempDate.setMonth(tempDate.getMonth() + intCount );
  var strReturn = convertFullDateToString(tempDate);
  return strReturn;
}


//得到下n个年
function getNextYearFullDate(strDate,intCount)
{	
	if(strDate.indexOf("-") > 0){
		var  aDate = strDate.split("-");
		strDate = aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]
	}//去除ios6以下版本兼容问题
  var tempDate = new Date(strDate);
  if(intCount == null)
  {
    intCount =1;
  }

  tempDate.setFullYear(tempDate.getFullYear() + intCount );
  var strReturn = convertFullDateToString(tempDate);
  return strReturn;
}
//得到2个日期相差天数
//计算天数差的函数，通用
//王飞于2012年9月21日修改
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2默认是****/**/**格式
	var  oDate1,  oDate2,  iDays ;
	//将日期统一转化为****/**/**的形式，如果传进来是"-"
	if(sDate1.indexOf("-") > 0){
		sDate1 = sDate1.replaceAll("-","/");	
	}
	
	if(sDate2.indexOf("-") > 0){
		sDate2 = sDate2.replaceAll("-","/");	
	}
	
  oDate1 = new Date(sDate1).getTime()
  oDate2 = new Date(sDate2).getTime()
  iDays = parseInt(Math.abs(oDate1  -  oDate2) /  1000  /  60  /  60  /24 ) //把相差的毫秒数转换为天数  
  return iDays
	
//  var  aDate,  oDate1,  oDate2,  iDays  
//  aDate  =  sDate1.split("/")  
//  oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式  
//  aDate  =  sDate2.split("/")  
//  oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
//  iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
//  return  iDays  
}  
//转换日期格式  如2013/06/07
function getDateFull(date){
	var dateAttr = date.split("-")
	var month = dateAttr[1];
	if (month <= 9) {
		month = "0" + month;
	}
	var day = dateAttr[2];
		if(day<=9){
		day = "0"+day;
		}
	var reDate = dateAttr[0]+"-"+month+"-"+day
	return reDate
}
//得到日期的字符串表达形式，传入参数为Date类型
//如果不传，则默认为当天
function convertFullDateToString(date)
{
  if(date==null)
  {
    date = new Date();
  }

  var strDate = "";
  strDate = date.getFullYear() + DATE_DELIMITER +
            (date.getMonth() + 1) + DATE_DELIMITER +
            date.getDate();
  return strDate;
}

//cy 0912 
function convertFullDateToStringNew(date)
{
  if(date==null)
  {
    date = new Date();
  }
  var month = date.getMonth() + 1;
  if (month <= 9) {
	 month = "0" + month;
  }
  var day = date.getDate();
  if(day<=9){
	 day = "0"+day;
  }
  var strDate = "";
  strDate = date.getFullYear() + DATE_DELIMITER +
  			month + DATE_DELIMITER + day;
  return strDate;
}

function convertFullDateForPeriod(date)
{
if(date==null)
{
  date = new Date();
}
var strDate = "";
var month =date.getMonth() + 1;
if (month <= 9) {
	month = "0" + month;
}
var day = date.getDate();
	if(day<=9){
	day = "0"+day;
	}
strDate = date.getFullYear() + "-" +
		  month + "-" +
          day;
return strDate;
}
//去掉字符串头空格
function leftTrim(strValue)
{
  var re =/^\s*/;
  if(strValue==null)
    return null;

 strValue= "" + strValue;
  var strReturn = strValue.replace(re,"");

  return strReturn;
}

//去掉字符串尾空格
function rightTrim(strValue)
{
  var re =/\s*$/;
  if(strValue==null)
    return null;

  var strReturn = strValue.replace(re,"");

  return strReturn;
}
//去掉字符串头尾空格
function trim(s)
{
  var strReturn;
  strReturn = leftTrim(s);
  strReturn = rightTrim(strReturn);

  return strReturn;
}
function trimAll(s){
    var sReturn = s.replace(/[ ]/g,""); 
    return sReturn;
}
function enterToTab(){
	  if(event.keyCode==13)
	    event.keyCode=9;
}
/*
* Description: 汉字两个字符 子母一个字符计算
* Parameter: 
* Author: 
*/
function getLength(str){
	var len =str.length;
	for ( var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
			len++;
		}
	}
	return len;
}
/*
* Description: 校验手机号码
* Parameter: mobile 传入手机号码
* Author: 
*/
function checkMobilePhoneNum(dom){
	var mobile = dom.val();
	var reg =/^0{0,1}(13[0-9]|17[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
	var reghave = /(\d)\1{7,}/;
	var reg2_fix=/^0{0,1}(13[0-9]|17[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{9}$/;
	var array = new Array("12345678","87654321","23456789","98765432");
   	var msg="";
   	if(trim(mobile)==""){
       	msg="请输入手机号！";
	    return msg;
    }
	   	if($("#ccaFlag").val()=="0"){ //0 团购
	 		for(var i=0;i<array.length;i++){
	   		  	if(mobile.indexOf(array[i])>-1){
	   			  	msg="请输入正确的手机号！";
	   	      	  	return msg;  
	   		  	}
	         }
	         if (reg.test(mobile) == false ){
	         	msg="请输入正确的手机号！";
	           	return msg;
	         }else{
	   		  	if(reghave.test(mobile) == false ){
	   	    		return "true";	 
	   	    	}else{
	   	    		msg="请输入正确的手机号！";
	   		        return msg; 
	   	    	}
	       	 } 
		}else{
			if(reg.test(mobile) == false){
	           	msg="请输入正确的手机号！";
	           	return msg;
	     	}  
	     	return "true";
	    }
}
/*
* Description: 校验电子邮箱
* Parameter: 
* Author: 
*/
function checkEmail(obj){
	var msg="";
	var email = obj.val();
	if(trim(email)==""){
		msg="请输入电子邮箱！";
		return msg;
	}
	if(email != ""){
		var reg=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
		if(reg.test(email)==false){
			msg="请输入正确的电子邮箱！";
			return msg;
		}else{
			return "true";
		}
	}	
}
/*
* Description: 校验 证件号码 (一些功能可能需要改造)
* Parameter: 
* Author: 
*/
function checkIdentifyNum(obj,IdentifyType){
	//判断是否选择了身份证
	var IdentifyNo = trim(obj.val());
	var msg = "";
	if(IdentifyType == "01"||IdentifyType == "02"){
		if(IdentifyNo == ""){
			var msg="请输入证件号码！";
			return msg;
		}
		msg = isCardID_new(IdentifyNo,IdentifyType);
		if(trim(msg) == "true"){
			return "true";			
		}else{
			return msg;
		}
	}else if(IdentifyType == "31"){//判断组织机构代码，并校验
		//开始修改
		IdentifyNo=IdentifyNo.toUpperCase();//转大写
		obj.val(IdentifyNo);//放在页面上
		//IdentifyNo = IdentifyNo.replace(/[&\|\\\*^%$#@\-]/g,"");
    	if(IdentifyNo.match(/^[a-zA-Z0-9]{8}[0-9|X]$/) == null){
    		var msg= "组织机构代码证不正确，请重新输入";
    		return msg;
    	}else{
    		return true;
    	}
//		try{
//			IdentifyNo = IdentifyNo.replace(eval("/-/gi"),"");//将所有的‘-’替换成‘’
//		}catch(exception){
//			console.log(exception);
//		}
		/*var length = IdentifyNo.length;
		if (length>9) {
			var msg="组织机构代码不能超过9位！"; 
			return msg;
		}else{
			return "true";
		}*/
	}else{
		if(IdentifyNo == ""){
			var msg="请输入证件号码！";
			return msg;
		}else{
			return "true";
		}
	}
}

/*
* Description: 校验 身份证号码
* Parameter: 
* Author:  
*/
function isCardID_new(sId,sType){
//	var areaCode = $("#proSelect").val();
	var sMsg = sType == "02" ? "证件号码":"身份证号";
	var areaCode = $("input[name='carInfo.proSelected']").val();// 2170 cy 20131018
	if(areaCode=="45000000"){
		if(sId.length==17){
			for(var i =0;i<17;i++){
				if(parseInt(sId.charAt(i))>=0 && parseInt(sId.charAt(i))<=9){
				}else{
					return "请输入正确的"+sMsg+"！";
				}
			}
		}
		if(sId.length==15){
			return "请输入正确的"+sMsg+"！";
		}
	}else{
		if(sId.length==15){
			for(var i =0;i<15;i++){
				if(parseInt(sId.charAt(i))>=0 && parseInt(sId.charAt(i))<=9){
					
				}else{
					return "请输入正确的"+sMsg+"！";
					//return "15位身份证号应</br>全部为数字";
				}
			}
			return "true";
		}
	}
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var iSum=0 ;
	var info="" ;
	if(!/^\d{17}(\d|x)$/i.test(sId)){
		return "请输入正确的"+sMsg+"！";
		//return "身份证长度或格</br>式错误";
	}
	sId=sId.replace(/x$/i,"a");
	if(aCity[parseInt(sId.substr(0,2))]==null){
		return "请输入正确的"+sMsg+"！";
		//return "身份证地区非法";
	}
	var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
		return "请输入正确的"+sMsg+"！";
		//return "身份证上的出生</br>日期非法";
	}
	for(var i = 17;i>=0;i --){
		iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11);
	}
	if(iSum%11!=1){
		return "请输入正确的"+sMsg+"！";
		//return "身份证号非法";
	}
	return "true";
}
//tools通过与被保险人关系的代码获得得名称
function getindentifyType(Str){
	var identityName = "其他";
		if("09"==Str){
			identityName = "赴台通行证";
		}else if("10"==Str){
			identityName = "港澳通行证";
		}else if("01"==Str){
			identityName = "身份证";
		}else if("02"==Str){
			identityName = "户口薄";
		}else if("03"==Str){
			identityName = "护照";
		}else if("04"==Str){
			identityName = "军官证";
		}else if("05"==Str){
			identityName = "驾驶执照";
		}else if("06"==Str){
			identityName = "返乡证";
		}else if("07"==Str){
			identityName = "港澳身份证";
		}else if("31"==Str){
			identityName = "组织机构代码证";
		}else if("99"==Str){
			
			identityName = "其他";
		}
		return identityName;
}
//下拉框文字显示居中处理
function centerSelect(id){
	//获取select的宽度
	var width = $("#"+id).width();
	var widthWrod = (($("#"+id).find("option:selected").text()).length)*14;
	var spaceLength = (width-widthWrod)/2;
	$("#"+id).css("text-indent",spaceLength)
}


//下拉框文字显示居中处理，日期的
function centerSelectNum(id){
	//获取select的宽度
	var width = $("#"+id).width();
	var widthWrod = (($("#"+id).find("option:selected").text()).length)*7;
	var spaceLength = (width-widthWrod)/2;
	$("#"+id).css("text-indent",spaceLength)
}
//下拉框文字显示右对齐处理，日期的
function centerSelectNumRight(id){
	//获取select的宽度
	var width = $("#"+id).width();
	var widthWrod = ($("#"+id).find("option:selected").text()).length;
	if(widthWrod <= 4){
		widthWrod = widthWrod * 15;
	}else{
		widthWrod = widthWrod * 15;
	}
	var spaceLength = width-widthWrod;
	if(id=='select'){

		$("select").css("text-indent",spaceLength)
	}else{

		$("#"+id).css("text-indent",!spaceLength)
	}
	
}
//下拉框数字显示右对齐处理
function centerSelectNumRightShuzi(id){
	//获取select的宽度
	var width = $("#"+id).width();
	var widthWrod = ($("#"+id).find("option:selected").text()).length;
	if(widthWrod <= 4){
		widthWrod = widthWrod * 9.3;
	}else{
		widthWrod = widthWrod * 9.3;
	}
	var spaceLength = width-widthWrod;
		
	$("#"+id).css("text-indent",spaceLength)
	
}
//组合输入框超出范围处理
function textLength(id){ 
	var width = ($('body').width())/3;
	if(width < 194&&width>=180){ 
	$('#' + id).css({'width':width*0.8,'min-width':'auto'}); 
	}
	if(width < 180&&width>=145){ 
		$('#' + id).css({'width':width*0.7,'min-width':'auto'}); 
	}
	if(width < 145&&width>=122){ 
		$('#' + id).css({'width':width*0.6,'min-width':'auto'}); 
	}
	if(width < 122&&width>=104){ 
		$('#' + id).css({'width':width*0.5,'min-width':'auto'}); 
	}
	if(width < 104&&width>=94){ 
		$('#' + id).css({'width':width*0.4,'min-width':'auto'}); 
	}
	if(width < 94){ 
		$('#' + id).css({'width':width*0.3,'min-width':'auto'}); 
	}
}
//数字格式化，如12345.67格式化为 12,345.67
function fmoney(s, n)   
{   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 
function  ScollPostion() {//滚动条位置
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
}
$(document).ready(function(){ 

	var selectval = $("#travelType").val();
	$("#selectval").val(selectval);
	$("#travelType").bind("change",function(){
		var selectval = $("#travelType").val();
		$("#selectval").val(selectval);
	});


$("#getprice").bind("click",function(){
	var travelType = $("#travelType").val();
	if(travelType==""){
		showInvalidTips($("#travelType").parents(".picker_wrap"), "请选择旅行方式! ", true, $("#travelType"));
		$gosubmit=false;
	}else{
		$gosubmit=true;
	}
	$("#formid").attr("action","nocarindex");
	if($gosubmit==true){
	$("#formid").submit();
	}
});
$("#travelType").bind("blur",function(){
	removeInvalidTips($("#travelType").parents(".picker_wrap"));

});

//select框初始化的时候文本居中

var width = $("#travelType").width();
var widthWrod = (($("#travelType").find("option:selected").text()).length)*14;
var spaceLength = (width-widthWrod)/2;
$("#travelType").css("text-indent",spaceLength);

});
//全角转半角
function fullChar2halfChar(str){
	var result = '';
	for (i=0 ; i<str.length; i++)
	{
	code = str.charCodeAt(i);      //获取当前字符的unicode编码
	if (code >= 65281 && code <= 65373)   //unicode编码范围是所有的英文字母以及各种字符
	{
	result += String.fromCharCode(str.charCodeAt(i) - 65248);    //把全角字符的unicode编码转换为对应半角字符的unicode码
	}
	else if (code == 12288)     //空格
	{
	result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);//半角空格
	}else
	{
	result += str.charAt(i);      //原字符返回
	}
	}
	 return result;
}
function checkUndefined(str){
	if(str == undefined){
		return "";
	}else{
		return str;
	}
}


/*
 * 微推广类型隐藏机构地址
 * */
function hideWTGAddr(curId, topWrap, otherEle){
	var netAddrId = $("#netAddress").val() || $("#netAddresstg").val();
	if ("" == netAddrId || undefined == netAddrId) {
		return;
	}
	if(topWrap == ""){
		$("#" + curId).hide();
	} else {
		$("#" + curId).parents(topWrap).hide();
	}

	if (otherEle != "" || otherEle != undefined) {
		var otherIds = otherEle.split(","),
			tmpId = "";
		for (var i = otherIds.length - 1; i >= 0; i--) {
			tmpId = otherIds[i];
			$("#" + tmpId).hide();
		}
	}
}