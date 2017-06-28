/**
 * Created with IntelliJ IDEA.
 * User: Phoenix
 * Date: 13-6-27
 * Time: 下午5:32
 * Calendar UI
 */

$(function() {

    $.fn.extend({
        'version': 1,
        'UICalPicker': function(options, value) {

            var self = this;
            var date=new Date();
            var maxYear=date.getFullYear()+2;
            var defaultOptions = $.extend({
                'type': "date",
                //'timeMode': 12,
                'minYear': 1900,
                'maxYear': maxYear,
                'minMonth': 1,
                'maxMonth': 12,
                'showMonth': false,
                'showDay': false,
                'dateSep': "-",
                'showMinute': false,
                'timeSep': ":",
                'defaultYear': null,
                'defaultMonth': null,
                'defaultDay': null,
                'defaultHour': null,
                'defaultMinute': null,
                'showPicker': false,
                'callback': null
            }, options);


            if(typeof options == 'string') defaultOptions[options] = value;
            var dateType = $.inArray(defaultOptions.type, ["date", "time"]);
            //var timeMode = $.inArray(defaultOptions.timeMode, [24, 12]);
            if(dateType < 0 /*|| timeMode < 0*/) return false;
           
            var ui = $('<div></div>').addClass("ui-cal-overlay").css({ 'height': $(document).height() }).appendTo($('body'));
            var header = $('<div></div>').addClass("ui-cal-header");
            var columns = $('<div></div>').addClass("ui-cal-columns");
            var panel = $('<div></div>').addClass("ui-cal-panel")
                .append(header)
                .append($('<div></div>').addClass("float_center ui-cal-columns-width").append(columns))
                .append($('<div></div>').addClass("ui-buttons")
                    .append($('<a href="#"></a>').html("确定")
                        .bind('click', function() {
                            $(self).val(pickedUp(dateType == 0 ? defaultOptions.dateSep : defaultOptions.timeSep));
                            ui.fadeOut(function() {
                            	//交强险
                                if($("#trafficInsurePolicyDate").is(":visible")){
                                	changeStartDateSY()
                                	checkStartDate()
                                }
                                if($("#carLicenseDateId").is(":visible")){
                                	checkGuoHu()
                                }
                                if($("#certificatedate").is(":visible")){
                                	checkcertificatedate()
                                }
                                if($("#carLicenseDateIdQ").is(":visible")){//一键续保 过户日期
                                	$("#selectChange").val(3);
                                	checkGuoHu();
//                                	if(checkGuoHu()){
//                                		syCalculateFee();
//                                	}
                                }
                            });
                            
                            //保单生效日期    终保日期计算
                            if($("#StartDateSY").length>0){
                            	changeStartDateSY()
                            	checkStartDate()
                            	syDateFlag()
                            }
                            
                            //交强险 一键续保
                            if($("#StartDateCI").is(":visible")){
	                            changeStartDateCI();
	                            checkStartDate();
//	                            jqCalculateFee();
                            }
                            
                            if($("#trafficInsureRegisterDate").length>0){
                            	InsureRegisterDate()
                            }
//                            if($("#EnrollDate").length>0){
//                            	changeEnrollDate();
//                            }
                          //费改出生日期失去焦点重新赋值
                        	if($("#birthDayCar").length>0){
                        		$("#insuredBirthday").val(replace($("#birthDayCar").val(),"-","/"));
                        	}
                            if($("#certificatedateSH_p").length>0){
                            	$("#certificatedateSH").val(replace($("#certificatedateSH_p").val(),"-","/"));
                            }
                        if(self.attr("id")=="birthDayEAD"){
                        	validateEADriqi();
                        }
                        if(self.attr("id")=="birthDay_1"){
                        	checkInsuredBirthdayOnblur("birthDay_1");
                        }
                        if(self.attr("id")=="birthDay_2"){
                        	checkInsuredBirthdayOnblur("birthDay_2");
                        }
                        if(self.attr("id")=="birthDay_3"){
                        	checkInsuredBirthdayOnblur("birthDay_3");
                        }
                        if(self.attr("id")=="birthDay_4"){
                        	checkInsuredBirthdayOnblur("birthDay_4");
                        }
                        if(self.attr("id")=="birthDay_5"){
                        	checkInsuredBirthdayOnblur("birthDay_5");
                        }
                        if(self.attr("id")=="birthDay_6"){
                        	checkInsuredBirthdayOnblur("birthDay_6");
                        }
                        if(self.attr("id")=="birthDay_7"){
                        	checkInsuredBirthdayOnblur("birthDay_7");
                        }
                        if(self.attr("id")=="birthDay_8"){
                        	checkInsuredBirthdayOnblur("birthDay_8");
                        }
                          var oldStartDate=$('#inputStartDate2').val();
                          //自驾自助起保日期校验
                            if(self.attr("id")=="inputStartDate"){
                            	setEndDate();checkStartDate();
                            	if($("#riskCode").val()=="EAK_U"||$("#riskCode").val()=="EAK_X")
                            	{
                            		
//                            		var x=$("#personnes").html();
////                            		var rationType=$("#isueCode").val();
//                            		x=parseInt(x);
//                            		var minorNo=$("#minorNo").html()
//                            		if(x>=1)
//                            		{
////                            			当修改起保日期时，校验出生日期，更新未成年人数
//                            			for(var i=1;i<=5;i++)
//                            			{
//                            				if($("#insuredInfoBirthday_"+i).length>0)
//                            				{
//                            					checkInsuredBirthday2("insuredInfoBirthday_"+i);
//                            					if($("#riskCode").val()=="EAK_U")
//                            					{
//                            						setMinorNo3("insuredInfoBirthday_"+i,oldStartDate);
//                            					}
//                            					
//                            				}
//                            			}
//                            			
////                            			当修改起保日期时，校验最后一个人出生日期，更新未成年人数
//                            			if($("#riskCode").val()=="EAK_U")
//                            			{
//                            				if(checkAndIncrease2())
//                            				{
//                            					setMinorNo3("insuredInfoBirthday",oldStartDate);
//                            				}
//                            			}
//                            		}
                            		
                            		checkUKBrithday();
                            		calculationFee();
                            		
                            	}
//                            	$('#inputStartDate2').val($('#inputStartDate').val());
                            }
                            //自驾自助终保日期校验
                            if(self.attr("id")=="inputEndDate"){
                            	checkStartDate();checkDayBetween();
                            	if($("#riskCode").val()=="EAK_U"||$("#riskCode").val()=="EAK_X")
                            	{
//                            		var x=$("#personnes").html();
////                            		var rationType=$("#isueCode").val();
//                            		x=parseInt(x);
//                            		
//                            		var minorNo=$("#minorNo").html()
//                            		if(x>=1)
//                            		{
////                            			当修改起保日期时，校验出生日期，更新未成年人数
//                            			for(var i=1;i<=5;i++)
//                            			{
//                            				if($("#insuredInfoBirthday_"+i).length>0)
//                            				{
//                            					checkInsuredBirthday2("insuredInfoBirthday_"+i);
//                            					if($("#riskCode").val()=="EAK_U")
//                            					{
//                            						setMinorNo3("insuredInfoBirthday_"+i,oldStartDate);
//                            					}
//                            					
//                            				}
//                            			}
//                            			
////                            			当修改起保日期时，校验最后一个人出生日期，更新未成年人数
//                            			if($("#riskCode").val()=="EAK_U")
//                            			{
//                            				if(checkAndIncrease2())
//                            				{
//                            					setMinorNo3("insuredInfoBirthday",oldStartDate);
//                            				}
//                            			}
//                            		}
                            		checkUKBrithday2();
                            		calculationFee();
                            	}
                            }
//                           自驾自助 被保险人模版校验
                            if(self.attr("id")=="insuredInfoBirthday"){
                            	
                            	checkInsuredBirthdayOnblur("insuredInfoBirthday");
//                            	判断是否为成年人
                            	if($("#riskCode").val()=="EAK_U")
                            	{
                            		setMinorNo(self.attr("id"))
                            	}
                            	checkAndIncrease("insuredInfoBirthday");
                            }
//                            被保险人列表校验
                        	 if(self.attr("id")=="insuredInfoBirthday_1"){
                             	checkInsuredBirthday(self.attr("id"));
                             	if($("#riskCode").val()=="EAK_U")
                            	{  
                            		setMinorNo(self.attr("id"))
                            	}
                             }
//                               被保险人列表校验
                        	 if(self.attr("id")=="insuredInfoBirthday_2"){
                             	checkInsuredBirthday(self.attr("id"));
                             	if($("#riskCode").val()=="EAK_U")
                            	{
                            		setMinorNo(self.attr("id"))
                            	}
                             	
                             }
//                               被保险人列表校验
                        	 if(self.attr("id")=="insuredInfoBirthday_3"){
                             	checkInsuredBirthday(self.attr("id"));
                             	if($("#riskCode").val()=="EAK_U")
                            	{
                            		setMinorNo(self.attr("id"))
                            	}
                             }
//                               被保险人列表校验
                        	 if(self.attr("id")=="insuredInfoBirthday_4"){
                             	checkInsuredBirthday(self.attr("id"));
                             	if($("#riskCode").val()=="EAK_U")
                            	{
                            		setMinorNo(self.attr("id"))
                            	}
                             }
//                               被保险人列表校验
                        	 if(self.attr("id")=="insuredInfoBirthday_5"){
                             	checkInsuredBirthday(self.attr("id"));
                             	if($("#riskCode").val()=="EAK_U")
                            	{
                            		setMinorNo(self.attr("id"))
                            	}
                             }
                        	 
//                        	 if(self.attr("id")=="insuredInfoBirthday"){
//                              	checkInsuredBirthday(self.attr("id"));
//                              	if($("#riskCode").val()=="EAK_U")
//                             	{
//                             		setMinorNo4(self.attr("id"))
//                             	}
//                              }
                        	 
                        	 
                        	 if(self.attr("id")=="drivenInfoLicensingDate_1"){
                        		 returnCarDriverAcceptLicenseDate(self.attr("id"));
                             }
                        	 if(self.attr("id")=="drivenInfoLicensingDate_2"){
                        		 returnCarDriverAcceptLicenseDate(self.attr("id"));
                             }
                        	 if(self.attr("id")=="drivenInfoLicensingDate"){
                        		 returnCarDriverAcceptLicenseDate(self.attr("id"));
                             }
                        	 if(self.attr("id")=="applyInfoBirthday"&&$("#riskCode").val()=="JCO"){
                        		 checkApplyBirthdayOnblur();
                              }
                            return false;
                        }) .bind('click', defaultOptions.callback))
                    .append($('<a href="#"></a>').html("取消")
                        .bind('click', function() {
                            ui.fadeOut(/*function() {$('body').css({ 'overflow': "auto" });}*/);
                            return false;
                        }))).appendTo($('<div></div>').addClass("float_center ui-cal-panel-width").appendTo(ui));

            var curDate = new Date();
            if(dateType == 0) {
                if(defaultOptions.showDay && defaultOptions.showMonth) {
                    var day = defaultOptions.defaultDay != null ? defaultOptions.defaultDay : curDate.getDate(), uiDay = $('<select></select>').bind('change', { 'sep': defaultOptions.dateSep },pick);
                    for(var dayIndex = 1; dayIndex <= 31; dayIndex++) {
                        uiDay.append($('<option></option>').attr({ 'selected': dayIndex == day }).val((dayIndex < 10 ? "0" : "") + dayIndex).html((dayIndex < 10 ? "0" : "") + dayIndex));
                    }
                    $('<div></div>').addClass("ui-cal-date-column day").append($('<label></label>').append(uiDay.trigger('change'))).appendTo(columns);
                } else {
                    $(columns).addClass("year_month");
                }
                if(defaultOptions.showMonth) {
                    var month = defaultOptions.defaultMonth != null ? defaultOptions.defaultMonth : curDate.getMonth() + 1, uiMonth = $('<select></select>').bind('change',defaultOptions.showDay ? resetDay : null).bind('change', { 'sep': defaultOptions.dateSep },pick);
                    for(var monthIndex = defaultOptions.minMonth; monthIndex <=defaultOptions.maxMonth; monthIndex++) {
                        uiMonth.append($('<option></option>').attr({ 'selected': monthIndex == month }).val((monthIndex < 10 ? "0" : "") + monthIndex).html((monthIndex < 10 ? "0" : "") + monthIndex));
                    }
                    columns.append($('<div></div>').addClass("ui-cal-date-column month").append($('<label></label>').append(uiMonth)));
                    uiMonth.trigger('change');
                    function resetDay() {
                        var d30 = ['04', '06', '09', '11'];
                        var uiDay = $(this).parents(".ui-cal-date-column").prev(".day").find("select");
                        var uiYear = $(this).parents(".ui-cal-date-column").next(".year").find("select");
//                        console.log(uiDay.length);
                        if($.inArray($(uiMonth).val(), d30) >= 0) {
                            $(uiDay.find("option")[30]).remove();
                        } else if(uiMonth.val() == 2) {
                            var leap = false;
                            if(uiYear.val() % 4 == 0) {
                                if(uiYear.val() % 100 != 0) {
                                    leap = true;
                                } else {
                                    leap = (uiYear.val() % 400 == 0)
                                }
                            } else {
                                leap = false;
                            }
                            $(uiDay.find("option")[30]).remove();
                            $(uiDay.find("option")[29]).remove();
                            console.log(uiYear.val() + ", " + leap);
                            if(!leap)
                                $(uiDay.find("option")[28]).remove();
                            else{
//                                $(uiDay).append($('<option></option>').val(29).html(29));
                            	for(var i = uiDay.find("option").length+1; i <= 29; i++) {
                                    uiDay.append($('<option></option>').val(i).html(i));
                                }
//                                alert($(uiDay).html())
                            }
                        } else {
                            for(var i = uiDay.find("option").length+1; i <= 31; i++) {
                                uiDay.append($('<option></option>').val(i).html(i));
                            }
                        }
                    }
                } else {
                    $(header).addClass("year_only");
                    $(columns).removeClass("year_month").addClass("year_only");
                }

                var year = defaultOptions.defaultYear != null ? defaultOptions.defaultYear : curDate.getFullYear(), uiYear = $('<select></select>').bind('change', changeYear).bind('change', { 'sep': defaultOptions.dateSep },pick);
                for(var yearIndex = defaultOptions.minYear; yearIndex <= defaultOptions.maxYear; yearIndex++) {
                    uiYear.append($('<option></option>').attr({ 'selected' : yearIndex == year }).val(yearIndex).html(yearIndex));
                }
                $('<div></div>').addClass("ui-cal-date-column year").append($('<label></label>').append(uiYear.trigger('change'))).appendTo(columns);
                function changeYear() {
                    $(this).parents(".ui-cal-date-column").prev(".month").find("select").trigger("change");
                }

                $(header).html(pickedUp(defaultOptions.dateSep));
            } else {
                if(defaultOptions.showMinute) {
                    var minute = defaultOptions.defaultMinute != null ? defaultOptions.defaultMinute : curDate.getMinutes(), uiMinute = $('<select></select>').bind('change', { 'sep': defaultOptions.timeSep },pick);
                    for(var minuteIndex = 0; minuteIndex <= 59; minuteIndex++) {
                        uiMinute.append($('<option></option>').attr({ 'selected': minuteIndex == minute }).val((minuteIndex < 10 ? "0" : "") + minuteIndex).html((minuteIndex < 10 ? "0" : "") + minuteIndex));
                    }
                    $('<div></div>').addClass("ui-cal-date-column minute").append($('<label></label>').append(uiMinute.trigger('change'))).appendTo(columns);
                } else {
                    $(header).addClass("hour_only");
                    $(columns).addClass("year_only");
                }

                var hour = defaultOptions.defaultHour != null ? defaultOptions.defaultHour : curDate.getHours(), uiHour = $('<select></select>').bind('change', { 'sep': defaultOptions.timeSep },pick);
                for(var hourIndex = 0; hourIndex <= 23 /*defaultOptions.timeMode*/; hourIndex++) {
                    uiHour.append($('<option></option>').attr({ 'selected': hourIndex == hour }).val((hourIndex < 10 ? "0" : "") + hourIndex).html((hourIndex < 10 ? "0" : "") + hourIndex));
                }
                $('<div></div>').addClass("ui-cal-date-column hour").append($('<label></label>').append(uiHour.trigger('change'))).appendTo(columns);

                $(header).html(pickedUp(defaultOptions.timeSep));
            }

            if(defaultOptions.showPicker) {
                $(".ui-cal-columns").addClass("show_picker");
                $(".ui-cal-date-column").append($('<a href="#"></a>').bind('click', { 'direction': 1 }, picker)).prepend($('<a href="#"></a>').bind('click', { 'direction': 0 }, picker))
                    .find("label").before($('<span></span>')).after($('<span></span>'));
                $(".ui-cal-date-column a").css({ 'margin': "0 " + (($(".ui-cal-date-column").width() - 16) / 2) + "px" });
                $(".ui-cal-date-column label").each(function(index) {
                    $(this).addClass("show_picker");
                    if($($(this).find("select")).prop("selectedIndex") > 0)
                        $(this).prev("span").html($($(this).find("select option:selected")).prev("option").val());
                    $(this).next("span").html($(this).find("select option:selected").next("option").val());
                });
                function picker(event) {
                    var select = $(this).parents(".ui-cal-date-column").find("select"),
                        index = $(select).prop("selectedIndex"),
                        currentOption = $(select).find("option:selected")/*.removeAttr("selected")*/;

                    if(event.data.direction == 0) {
                        $(select).find("options").eq(--index).attr({ 'selected': 'selected' });
                        console.log(index + ", " + $($(select).find("option")[index]).val());
                    } else {
                        $($(select).find("option")[++index]).attr({ 'selected': true })
                    }
                    /*switch(event.data.direction) {
                        case 0:
                            $(this).parents(".ui-cal-date-column").find("select option:selected").removeAttr("selected").prev("option").attr({ 'selected': true });
                            return;
                        case 1:
                            $(this).parents(".ui-cal-date-column").find("select option:selected").removeAttr("selected").next("option").attr({ 'selected': true });
                            return;
                    }*/
                    return false;
                }
            }

            function pickedUp(separator){
                var dateStr = "";
                $(columns).find("select").each(function(index) {
                    dateStr = (index < $(columns).find("select").length - 1 ? separator : "") + $(this).val() + dateStr;
                });
                return dateStr;
            }
            function pick(event) { header.html(pickedUp(event.data.sep)); }
            self.bind('focus', function() {
        		$(".ui-cal-overlay").css({"height":$(document).height()+30});
//                $('body').css({ 'overflow': "hidden" });
            	var dateVal = self.val();
//            	为标题日期赋值
            	$(ui).find(".ui-cal-header").html(dateVal)
            	dateVal = dateVal.split("-")
            	$(ui).find(".year").find("select").val(dateVal[0])
            	$(ui).find(".month").find("select").val(dateVal[1])
            	$(ui).find(".day").find("select").val(dateVal[2])
//            	alert($(ui).find(".month").find("select").val())
            	//点击时初始化日期day'
            	var d30 = ['04', '06', '09', '11'];
			    var uiDay = $(ui).find(".day").find("select");
			    var uiYear = $(ui).find(".year").find("select");
//			    console.log(uiDay.length);
			    if($.inArray($(ui).find(".month").find("select").val(), d30) >= 0) {
			        $(uiDay.find("option")[30]).remove();
			    } else if($(ui).find(".month").find("select").val() == 2) {
			        var leap = false;
			        if(uiYear.val() % 4 == 0) {
			            if(uiYear.val() % 100 != 0) {
			                leap = true;
			            } else {
			                leap = (uiYear.val() % 400 == 0)
			            }
			        } else {
			            leap = false;
			        }
			        $(uiDay.find("option")[30]).remove();
			        $(uiDay.find("option")[29]).remove();
			        console.log(uiYear.val() + ", " + leap);
			        if(!leap)
			            $(uiDay.find("option")[28]).remove();
			        else{
			        	for(var i = uiDay.find("option").length+1; i <= 29; i++) {
                            uiDay.append($('<option></option>').val(i).html(i));
                        }
//			        	$(uiDay).append($('<option></option>').val(29).html(29));
			        }
			            
			
			    } else {
			        for(var i = uiDay.find("option").length+1; i <= 31; i++) {
			            uiDay.append($('<option></option>').val(i).html(i));
			        }
			    }
            	
                $(ui).fadeIn();
            	self.blur()
                $(panel).css({ 'marginTop': $(window).height() / 2 - $(panel).height() / 2 + $(window).scrollTop() })
            });
        }
    });
   
    var userAgent = window.navigator.userAgent;
    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){dateCalendar()}
    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){dateCalendar()}
    else if(userAgent.indexOf("UC")>-1){}
    else if(userAgent.indexOf("Opera")>-1){}
    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){dateCalendar()}
    else if(userAgent.indexOf("iPhone; U; CPU iPhone OS 4_3_1")>-1){}
    else if(userAgent.indexOf("iPhone")>-1){}
    else {dateCalendar()}
    
    
	    
    
});
function dateCalendar(){
	 //车险信息填写页面日期控件    初登日期
    if($("#EnrollDate").length>0){
    	var enroll = $("#EnrollDate").val();
    	$("#EnrollDate").attr("readonly","readonly")
    	enroll = enroll.split("-")
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	if($("input[name='carInfo.isRenewal']").val()==1){
    		if(defaultMonth.substring(0,1)==0){
    			defaultMonth = defaultMonth.substring(1,2)
    		}
//20131016cy注  	$("#EnrollDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'minYear':defaultYear,'maxYear':defaultYear,'minMonth':defaultMonth,'maxMonth':defaultMonth,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    		$("#EnrollDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" ,'callback':changeEnrollDate});
    	}else
    	$("#EnrollDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" ,'callback':changeEnrollDate});
    }
    //车险信息填写页面控件     保单生效日期
    if($("#StartDateSY").length>0){
    	var enroll = $("#StartDateSY").val();
    	$("#StartDateSY").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	$("#StartDateSY").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    }
    //交强险     保单生效日期
    if($("#trafficInsurePolicyDate").length>0){
    	var enroll = $("#trafficInsurePolicyDate").val();
    	$("#trafficInsurePolicyDate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	$("#trafficInsurePolicyDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    }
    
    //交强险     保单生效日期  一键续保
    if($("#StartDateCI").length>0){
    	var enroll = $("#StartDateCI").val();
    	$("#StartDateCI").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	$("#StartDateCI").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    }
    
    //驾驶员   首次领证日期  
    if($("#drivenInfoLicensingDate_0").length>0){
    	var enroll = $("#drivenInfoLicensingDate_0").val();
    	$("#drivenInfoLicensingDate_0").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	$("#drivenInfoLicensingDate_0").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    }
    
    if($("#trafficInsureRegisterDate").length>0){
    	var enroll = $("#trafficInsureRegisterDate").val();
    	$("#trafficInsureRegisterDate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear();
    	$("#trafficInsureRegisterDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-"});
    }
    if($("#inputStartDate").length>0){
    	var enroll = $("#inputStartDate").val();
    	$("#inputStartDate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear();
    	$("#inputStartDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":minYear,"maxYear":minYear+1 });
    }
    //过户日期
    if($("#carLicenseDateId").length>0){
    	var enroll = $("#carLicenseDateId").val();
    	$("#carLicenseDateId").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear();
    	$("#carLicenseDateId").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","maxYear":minYear+1 });
    }
    //一键续保 过户日期
    if($("#carLicenseDateIdQ").length>0){
    	var enroll = $("#carLicenseDateIdQ").val();
    	$("#carLicenseDateIdQ").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear();
    	$("#carLicenseDateIdQ").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","maxYear":minYear+1 });
    }
    if($("#certificatedate").length>0){
    	var enroll = $("#certificatedate").val();
    	$("#certificatedate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear();
    	$("#certificatedate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","maxYear":minYear+1 });
    }
    
    if($("#inputEndDate").length>0){
    	var enroll = $("#inputEndDate").val();
    	$("#inputEndDate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	 var date=new Date();
 	    minYear=date.getFullYear();
    	$("#inputEndDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":minYear,"maxYear":minYear+2 });
    }
    
//    自驾自助被保人人模版
    if($("#insuredInfoBirthday").length>0){
    	var enroll = $("#insuredInfoBirthday").val();
    	$("#insuredInfoBirthday").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var date=new Date();
    	minYear=date.getFullYear()-80;
    	maxYear=date.getFullYear()-1;
    	$("#insuredInfoBirthday").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":minYear,"maxYear":maxYear});
    }
    if($("#profileInfoBirthday").length>0){
    	var enroll = $("#profileInfoBirthday").val();
    	$("#profileInfoBirthday").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	$("#profileInfoBirthday").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-" });
    }
    
    if($("#drivenInfoLicensingDate").length>0){
    	var enroll = $("#drivenInfoLicensingDate").val();
    	$("#drivenInfoLicensingDate").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var d=new Date();
    	var year=d.getFullYear();
    	$("#drivenInfoLicensingDate").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year });
    }
    
    if($("#birthDay").length>0){
    	var enroll = $("#birthDay").val();
    	$("#birthDay").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var d=new Date();
    	var year=d.getFullYear();
    	$("#birthDay").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year });
    }
    if($("#birthDayCar").length>0){
    	var enroll = $("#birthDayCar").val();
    	$("#birthDayCar").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var d=new Date();
    	var year=d.getFullYear();
    	$("#birthDayCar").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year });
    }
    if($("#certificatedateSH_p").length>0){//上海新增购车发票日期
    	var enroll = $("#certificatedateSH_p").val();
    	$("#certificatedateSH_p").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var d=new Date();
    	var year=d.getFullYear();
    	$("#certificatedateSH_p").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year });
    }
    if($("#birthDayEAD").length>0){
    	var enroll = $("#birthDayEAD").val();
    	$("#birthDayEAD").attr("readonly","readonly")
    	enroll = enroll.split("-");
    	var defaultYear = enroll[0];
    	var defaultMonth = enroll[1];
    	var defaultDay = enroll[2];
    	var d=new Date();
    	var year=d.getFullYear();
    	$("#birthDayEAD").UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year });
    }
}
/**
 * 给日期控件设置能选择的最小值
 * @param minDate
 */
function setDateScope(minDate,maxDate){
	if(minDate != 0 && maxDate == 0){
		minDate = minDate.replace(/\//g,"-");
		var dateArr = minDate.split("-");
		var year = dateArr[0];
		var month = dateArr[1];
		var day = dateArr[2];
		var yearIndex = $(".ui-cal-overlay:visible .year option[value='"+year+"']").index();
	
	    //$(".ui-cal-overlay:visible day option[value='2014']").attr("disabled",true);
		$(".ui-cal-overlay:visible .year option:lt("+yearIndex+")").prop("disabled",true).hide();
		$(".ui-cal-overlay:visible .year select").unbind();
		$(".ui-cal-overlay:visible .year select").bind("change",function(){
			resetDay(this);
			var selectYear = $(this).val();
			if(selectYear == year){
				if($(".ui-cal-overlay:visible .month select").val() < month){
					$(".ui-cal-overlay:visible .month select option[value='"+month+"']").prop("selected",true);
					if($(".ui-cal-overlay:visible .day select").val() < day){
						$(".ui-cal-overlay:visible .day select option[value='"+day+"']").prop("selected",true);
					}
				}
				var monthIndex = $(".ui-cal-overlay:visible .month option[value='"+month+"']").index();
				$(".ui-cal-overlay:visible .month option:lt("+monthIndex+")").prop("disabled",true).hide();
			}else{
				$(".ui-cal-overlay:visible .month option").prop("disabled",false).show();
			}
		});
		$(".ui-cal-overlay:visible .month select").unbind();
		$(".ui-cal-overlay:visible .month select").bind({
			"change":function(){
				var selectMonth = $(this).val();
				var selectYear = $(".ui-cal-overlay:visible .year select").val();
				if(selectMonth == month && selectYear == year){
					if($(".ui-cal-overlay:visible .day select").val() < day){
						$(".ui-cal-overlay:visible .day select option[value='"+day+"']").prop("selected",true);
					}
					var dayIndex = $(".ui-cal-overlay:visible .day option[value='"+day+"']").index();
					$(".ui-cal-overlay:visible .day option:lt("+dayIndex+")").prop("disabled",true).hide();
				}else{
					$(".ui-cal-overlay:visible .day option").prop("disabled",false).show();;
				}
			},
			"focus":function(){
				$(".ui-cal-overlay:visible .year select").change();
			}
		});
		$(".ui-cal-overlay:visible .day select").unbind();
		$(".ui-cal-overlay:visible .day select").bind("focus",function(){
			$(".ui-cal-overlay:visible .year select").change();
			$(".ui-cal-overlay:visible .month select").change();
		})
	}else if(minDate == 0 && maxDate != 0){
		maxDate = maxDate.replace(/\//g,"-");
		var dateArr = maxDate.split("-");
		var year = dateArr[0];
		var month = dateArr[1];
		var day = dateArr[2];
		var yearIndex = $(".ui-cal-overlay:visible .year option[value='"+year+"']").index();

	    //$(".ui-cal-overlay:visible day option[value='2014']").attr("disabled",true);
		$(".ui-cal-overlay:visible .year option:gt("+yearIndex+")").prop("disabled",true).hide();
		$(".ui-cal-overlay:visible .year select").unbind();
		$(".ui-cal-overlay:visible .year select").bind("change",function(){
			var selectYear = $(this).val();
			if(selectYear == year){
				if($(".ui-cal-overlay:visible .month select").val() > month){
					$(".ui-cal-overlay:visible .month select option[value='"+month+"']").prop("selected",true);
					if($(".ui-cal-overlay:visible .day select").val() > day){
						$(".ui-cal-overlay:visible .day select option[value='"+day+"']").prop("selected",true);
					}
				}
				var monthIndex = $(".ui-cal-overlay:visible .month option[value='"+month+"']").index();
				$(".ui-cal-overlay:visible .month option:gt("+monthIndex+")").prop("disabled",true).hide();
			}else{
				$(".ui-cal-overlay:visible .month option").prop("disabled",false).show();
			}
		});
		$(".ui-cal-overlay:visible .month select").unbind();
		$(".ui-cal-overlay:visible .month select").bind({
			"change":function(){
				resetDay(this);
				var selectMonth = $(this).val();
				var selectYear = $(".ui-cal-overlay:visible .year select").val();
				if(selectMonth == month && selectYear == year){
					if($(".ui-cal-overlay:visible .day select").val() > day){
						$(".ui-cal-overlay:visible .day select option[value='"+day+"']").prop("selected",true);
					}
					var dayIndex = $(".ui-cal-overlay:visible .day option[value='"+day+"']").index();
					$(".ui-cal-overlay:visible .day option:gt("+dayIndex+")").prop("disabled",true).hide();
				}else{
					$(".ui-cal-overlay:visible .day option").prop("disabled",false).show();
				}
			},
			"focus":function(){
				$(".ui-cal-overlay:visible .year select").change();
			}
		});
		$(".ui-cal-overlay:visible .day select").unbind();
		$(".ui-cal-overlay:visible .day select").bind("focus",function(){
			$(".ui-cal-overlay:visible .year select").change();
			$(".ui-cal-overlay:visible .month select").change();
		})
	}else if(minDate != 0 && maxDate != 0){
		maxDate = maxDate.replace(/\//g,"-");
		var maxDateArr = maxDate.split("-");
		var maxYear = maxDateArr[0];
		var maxMonth = maxDateArr[1];
		var maxDay = maxDateArr[2];
		var maxYearIndex = $(".ui-cal-overlay:visible .year option[value='"+maxYear+"']").index();

		minDate = minDate.replace(/\//g,"-");
		var minDateArr = minDate.split("-");
		var minYear = minDateArr[0];
		var minMonth = minDateArr[1];
		var minDay = minDateArr[2];
		var minYearIndex = $(".ui-cal-overlay:visible .year option[value='"+minYear+"']").index();
		
	    //$(".ui-cal-overlay:visible day option[value='2014']").attr("disabled",true);
		$(".ui-cal-overlay:visible .year option:gt("+maxYearIndex+")").prop("disabled",true).hide();
		$(".ui-cal-overlay:visible .year option:lt("+minYearIndex+")").prop("disabled",true).hide();
		$(".ui-cal-overlay:visible .year select").unbind();
		$(".ui-cal-overlay:visible .year select").bind("change",function(){
			$(".ui-cal-overlay:visible .month option").prop("disabled",false).show();
			var selectYear = $(this).val();
			if(selectYear == maxYear || selectYear == minYear){
				if(selectYear == maxYear){
					if($(".ui-cal-overlay:visible .month select").val() > maxMonth){
						$(".ui-cal-overlay:visible .month select option[value='"+maxMonth+"']").prop("selected",true);
						if($(".ui-cal-overlay:visible .day select").val() > maxDay){
							$(".ui-cal-overlay:visible .day select option[value='"+maxDay+"']").prop("selected",true);
						}
					}
					var monthIndex = $(".ui-cal-overlay:visible .month option[value='"+maxMonth+"']").index();
					$(".ui-cal-overlay:visible .month option:gt("+monthIndex+")").prop("disabled",true).hide();
				}
				if(selectYear == minYear){
					if($(".ui-cal-overlay:visible .month select").val() < minMonth){
						$(".ui-cal-overlay:visible .month select option[value='"+minMonth+"']").prop("selected",true);
						if($(".ui-cal-overlay:visible .day select").val() < minDay){
							$(".ui-cal-overlay:visible .day select option[value='"+minDay+"']").prop("selected",true);
						}
					}
					var monthIndex = $(".ui-cal-overlay:visible .month option[value='"+minMonth+"']").index();
					$(".ui-cal-overlay:visible .month option:lt("+monthIndex+")").prop("disabled",true).hide();
				}
			}
		});
		$(".ui-cal-overlay:visible .month select").unbind();
		$(".ui-cal-overlay:visible .month select").bind({
			"change":function(){
				resetDay(this);
				$(".ui-cal-overlay:visible .day option").prop("disabled",false).show();
				var selectMonth = $(this).val();
				var selectYear = $(".ui-cal-overlay:visible .year select").val();
				if((selectMonth == maxMonth && selectYear == maxYear) || (selectMonth == minMonth && selectYear == minYear)){
					if(selectMonth == maxMonth && selectYear == maxYear){
						if($(".ui-cal-overlay:visible .day select").val() > maxDay){
							$(".ui-cal-overlay:visible .day select option[value='"+maxDay+"']").prop("selected",true);
						}
						var dayIndex = $(".ui-cal-overlay:visible .day option[value='"+maxDay+"']").index();
						$(".ui-cal-overlay:visible .day option:gt("+dayIndex+")").prop("disabled",true).hide();
					}
					if(selectMonth == minMonth && selectYear == minYear){
						if($(".ui-cal-overlay:visible .day select").val() < minDay){
							$(".ui-cal-overlay:visible .day select option[value='"+minDay+"']").prop("selected",true);
						}
						var dayIndex = $(".ui-cal-overlay:visible .day option[value='"+minDay+"']").index();
						$(".ui-cal-overlay:visible .day option:lt("+dayIndex+")").prop("disabled",true).hide();
					}
				}
			},
			"focus":function(){
				$(".ui-cal-overlay:visible .year select").change();
			}
		});
		$(".ui-cal-overlay:visible .day select").unbind();
		$(".ui-cal-overlay:visible .day select").bind("focus",function(){
			$(".ui-cal-overlay:visible .year select").change();
			$(".ui-cal-overlay:visible .month select").change();
		})
	}
};
/**
 * 日期控件选择月份时重新绑定  日
 * */
function resetDay(eleMonth) {
    var d30 = ['04', '06', '09', '11'];
    var uiDay = $(eleMonth).parents(".ui-cal-date-column").prev(".day").find("select");
    var uiYear = $(eleMonth).parents(".ui-cal-date-column").next(".year").find("select");
//    console.log(uiDay.length);
    if($.inArray($(eleMonth).val(), d30) >= 0) {
        $(uiDay.find("option")[30]).remove();
    } else if($(eleMonth).val() == 2) {
        var leap = false;
        if(uiYear.val() % 4 == 0) {
            if(uiYear.val() % 100 != 0) {
                leap = true;
            } else {
                leap = (uiYear.val() % 400 == 0)
            }
        } else {
            leap = false;
        }
        $(uiDay.find("option")[30]).remove();
        $(uiDay.find("option")[29]).remove();
        console.log(uiYear.val() + ", " + leap);
        if(!leap)
            $(uiDay.find("option")[28]).remove();
        else{
//            $(uiDay).append($('<option></option>').val(29).html(29));
        	for(var i = uiDay.find("option").length+1; i <= 29; i++) {
                uiDay.append($('<option></option>').val(i).html(i));
            }
//            alert($(uiDay).html())
        }
    } else {
        for(var i = uiDay.find("option").length+1; i <= 31; i++) {
            uiDay.append($('<option></option>').val(i).html(i));
        }
    }
}

