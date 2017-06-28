/**
 * User: Phoenix
 * Date: 13-5-13
 * Time: 下午2:05
 * Car's flow confirm
 */
//var map = new Map(); // 指定驾驶员全局变量. 
//for(i=1;i<=5;i++)
//{
//	map.put(i, "f");
//}
var p = 1;
var eadPageFee;
$(function() {
    var proS = $('#proSelected').val();
	//默认勾选i洗车i保养
	if(document.getElementById("iwashCar_box")){
		$("#iwashCarIsCheck").val('0');
	}
	if(document.getElementById("inoWorry_box")){
		$("#inoWorryIsCheck").val('0');
	}	
	$('.buyInsur').click(function() {
		$('.buyInsurTip').show();
		$('.nobuyInsurTip').hide();
	})
	$('.nobuyInsur').click(function() {
		$('.nobuyInsurTip').show();
		$('.buyInsurTip').hide();
	})
	$(".to_buy .buy").click(function() {//绿变灰
		$(this).hide();
		$(this).siblings().show();
		$(".new_module .add").css("color", "#999");
		$(".new_module .add span").css({
			"color" : "#999",
			"border" : "1px solid #999"
		});
		$('#showDiv').attr('disabled',"true");
		delEAD();
	})
	$(".to_buy .no_buy").click(function() {//灰变绿
		if($("#insuredAccidentFlag").val()!='1'){
			var lBtn = {"name":"购买","fun":"buyEADComfirm"},
				rBtn = {"name":"暂不购买","fun":"closeCue"},
				msg = "购买车上人员补充意外险，需先购买车上人员责任险。是否购买？";
			
			cueConfirm(msg,lBtn,rBtn);
		}else{
			$(".to_buy .no_buy").hide();
			$(".to_buy .buy").show();
			
			$(".new_module .add").css("color", "#52a5cc");
			$(".new_module .add span").css({
				"color" : "#52a5cc",
				"border" : "1px solid #52a5cc"
			});
			$('#showDiv').removeAttr('disabled');
			var flag=findEADRuleConfigure();
			var birthday = $.trim($('#insuredBirthday').val());//默认被保险人就是车辆被保险人
			if (birthday != "" && flag){
				buyOneEAD();
			}
		}
	})
	if($("#insuredAccidentFlag").val()=="1"){
		$("#eadDiv").show();
		var EADJson = $("#EADJson").val();
		var EADJson1 = eval("("+EADJson+")");
		$("#eadFee").text($("#eadsumPremium").val());
		$("#pno").text($("#jigeInsured").val());
		$("#fenshu").text($("#jifen").val());
		
		var insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
		if(insuredIdType=="01"){
			r="身份证";
		}else if(insuredIdType=="02"){
			r="户口薄";
		}else if(insuredIdType=="03"){
			r="护照";
		}else if(insuredIdType=="04"){
			r="军官证";
		}else if(insuredIdType=="05"){
			r="驾驶执照";
		}else if(insuredIdType=="06"){
			r="返乡证";
		}else if(insuredIdType=="07"){
			r="港澳身份证";
		}else if(insuredIdType=="99"){
			r="其他";
		}else if(insuredIdType="31"){
			r="组织机构代码证";
		}
		var eadInsuredBirthday = EADJson1[0].eadInsuredBirthday;
		var eadInsuredBirthday2 = replace(eadInsuredBirthday,"/",'-');
		$('<dl id="delete1"><dt class="black">车险被保险人：</dt><dd>'+ $("input[name='carInfo.insuredName']").val() +'（'+ eadInsuredBirthday2 +'）</dd></dl><dl id="delete2"><dt>证件号码：</dt>'
			+'<dd>'+ $("input[name='carInfo.insuredIdentifyNumber']").val() +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
		for(var i = 1; i < EADJson1.length; i++) {
			var insuredIdType1 = EADJson1[i].insuredIdType;
			var eadInsuredBirthday = EADJson1[i].eadInsuredBirthday;
			var eadInsuredBirthday1 = replace(eadInsuredBirthday,"/",'-');
			var j = i+1;
			if(insuredIdType1=="01"){
				r="身份证";
			}else if(insuredIdType1=="02"){
				r="户口薄";
			}else if(insuredIdType1=="03"){
				r="护照";
			}else if(insuredIdType1=="04"){
				r="军官证";
			}else if(insuredIdType1=="05"){
				r="驾驶执照";
			}else if(insuredIdType1=="06"){
				r="返乡证";
			}else if(insuredIdType1=="07"){
				r="港澳身份证";
			}else if(insuredIdType1=="99"){
				r="其他";
			}else if(insuredIdType="31"){
				r="组织机构代码证";
			}
			$('<dl id="delete3'+ j +'"><dt class="black">被保险人'+ j +'：</dt><dd>'+EADJson1[i].insuredName+'（'+ eadInsuredBirthday1 +'）</dd></dl>'
					+'<dl id="delete4'+ j +'"><dt>证件号码：</dt><dd>'+ EADJson1[i].insuredIdNumber +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
		}
//		var allFee = $("input[name='carInfo.allFee']").val();
//		var allFee1 = $("#eadsumPremium").val();
//		allFee = parseFloat(allFee)+parseFloat(allFee1);
//		$("#allFee").text(allFee);
//		$("input[name='carInfo.allFee']").val(allFee);
		var quota = $("#jifen").val();
		var quota1 = quota.substring(0,quota.length-1);
		var ctx = $("#ctx").val();
		$.ajax({
			type:"post",
			url:ctx+"/carProposal/car/buyEAD",
			data:{
	    		channelNo:$("input[name='head.channelNo']").val(),
				sessionId:$("#sessionId").val(),
				proSelected:$("#proSelected").val(),
				citySelected:$("#citySelected").val(),
				insuredAccidentFlag:"1",
				isRenewal:$("input[name='carInfo.isRenewal']").val(),
				insuredCount:quota1,
				eadInsuredInfos:EADJson
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function(data){
				$("#allFee").text(data.sumPremium);
				$("input[name='carInfo.allFee']").val(data.sumPremium);
			}
		});
	}
	var isQuickRenewal = $("input[name='carInfo.isQuickRenewal']").val();	//一键续保标识
	if(isQuickRenewal == 1){
		$("#step5").hide();
		$("#step3").show();
	}
	if(isQuickRenewal == '1') {
        var electronicPolicyBi = $('#electronicPolicyBi').val();
        var electronicPolicyCi = $('#electronicPolicyCi').val();
        var hasSy = $('input[name="carInfo.hasSy"]').val();
        var hasBz = $('input[name="carInfo.hasBz"]').val();
        if (hasSy === '1' && electronicPolicyBi) {
            if (electronicPolicyBi === '1') {
                $('#policy_e').removeClass('active').removeAttr('checked');
                $('#policy_p').addClass('active').attr('checked', 'checked');
                $('#isEpolicy').val('N');
            } else {
                $('#isEpolicy').val('Y');
            }
            $("#policyEmail").val($("input[name='carInfo.appliEmail']").val());
        }
        if (hasBz === '1' && electronicPolicyCi) {
            if (electronicPolicyCi === '1') {
                $('#policy_jq_e').removeClass('active').removeAttr('checked');
                $('#policy_jq_p').addClass('active').attr('checked', 'checked');
                $('#isEJQpolicy').val('N');
            } else {
                $('#isEJQpolicy').val('Y');
            }
            $("#policyEmail").val($("input[name='carInfo.appliEmail']").val());
        }
        // }
        $("#policy_e").click(function () {
            if ($("#policy_e").is(":checked")) {
                $("#isEpolicy").val('Y');
            }
        });
        $("#policy_p").click(function () {
            if ($("#policy_p").is(":checked")) {
                $("#isEpolicy").val('N');
            }
        });
        $("#policy_jq_e").click(function () {
            if ($("#policy_jq_e").is(":checked")) {
                $("#isEJQpolicy").val('Y');
            }
        });
        $("#policy_jq_p").click(function () {
            if ($("#policy_jq_p").is(":checked")) {
                $("#isEJQpolicy").val('N');
            }
        });
        $('.wenhao').click(function () {
            var content = $(this).data('content');
            if(content){
                $('.dialog-cont').find('p').html('<i></i>'+content);
                $('.mask').show();
                $('.dialog').show();
            }
        });
        $('.dialog-close').click(function () {
            $('.mask').hide();
            $('.dialog').hide();
        });
    }
	if($("input[name='carInfo.isRenewal']").val()==1){
		//手机号码隐藏
		var apphoneNo = $("input[name='carInfo.appliPhoneNumber']").val();
		var insuredMobile = $("input[name='carInfo.insuredMobile']").val();
		var appliMobile = $("input[name='carInfo.appliMobile']").val();
		
		if($("#isModify_s").val()!=1){
			apphoneNo=apphoneNo.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
		}
		
		if($("#isModify_b").val()!=1){
			insuredMobile=insuredMobile.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
		}
		
		if($("#isModify_t").val()!=1){
			appliMobile=appliMobile.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
		}

		document.getElementById("AppliPhoneNumber").innerText = apphoneNo;		//保单寄送人
		document.getElementById("insuredMobile").innerText = insuredMobile;		//被保险人
		document.getElementById("appliMobile").innerText = appliMobile;			//投保人
	}
	//北京地区 要隐藏车架号 和发动机号   update 2014-07-29 zpyWAP-4758
	if($("#proSelected").val()=="11000000"){
		var engineNo = $("input[name='carInfo.engineNo']").val()
		var frameNo = $("input[name='carInfo.frameNo']").val()
		engineNo = engineNo.substring(0,1)+"****"+engineNo.substring(5);
		frameNo = frameNo.substring(0,6) +"*******"+ frameNo.substring(13);
		$("#frameNo").html(frameNo)
		$("#engineNo").html(engineNo)
		
		//北京电子保单 ====update 2014-12-22 zhoapengyu
		if($("#isEpolicy").val()=='Y'){
			$("#confirmInfoEpolicy").attr("checked",true);
		}else{
			$("#confirmInfoEpolicy").attr("checked",false);
			$("#emailDiv").hide();
		}
		if($("input[name='carInfo.isQuickRenewal']").val()==1){
			if($("#isEpolicy").val()==""){
				$("#policyEmail").val($("input[name='carInfo.appliEmail']").val())
				$("#confirmInfoEpolicy").attr("checked",true);
				$("#isEpolicy").val('Y');
				$(".mail").html($("input[name='carInfo.appliEmail']").val());
				$("#emailDiv").show();
			}
		}
	}
	$("#confirmInfoEpolicy").click(function(){
		if($("#confirmInfoEpolicy").is(":checked")){
			$("#isEpolicy").val('Y');
			$("#emailDiv").fadeIn();
		}else{
			$("#isEpolicy").val('N');
			$("#emailDiv").fadeOut();
		}
	})
	$("#iFlag").click(function(){//选择i保养
		if($("#iFlag").is(":checked")){
			$("#xuanzeiflag").val('1');
			$("#discountGas").attr("checked",false);
			$("#discountGas").attr("disabled",true);
			$("#discountGas").next().css("background","#A0A0A0");
			$("#oilgift_box").attr("checked",false);
			$("#oilgift_box").attr("disabled",true);
			$("#oilgift_box").next().css("background","#A0A0A0");
			$("#discountGas_Flag").val('0');
			$("#discountPolicy_Flag").val("0");
			//i洗车
			if($("#syFee1").html()<="6000"){
				$("#iwashCar_box").attr("checked",false);
				$("#iwashCar_box").attr("disabled",true);
				$("#iwashCar_box").next().css("background","#A0A0A0");
				$("#iwashCarIsCheck").val('0');
			}
			
			//i无忧
//			$("#inoWorry_box").attr("checked",false);
//			$("#inoWorry_box").attr("disabled",true);
//			$("#inoWorry_box").next().css("background","#A0A0A0");
//			$("#inoWorryIsCheck").val('0');
		}else{
			$("#xuanzeiflag").val('0');
			$("#discountGas").attr("disabled",false);
			$("#discountGas").next().css("background","#e5e2df");
			$("#oilgift_box").attr("disabled",false);
			$("#oilgift_box").next().css("background","#e5e2df");
			//i洗车
			$("#iwashCar_box").attr("disabled",false);
			$("#iwashCar_box").next().css("background","#e5e2df");
			//i无忧
//			$("#inoWorry_box").attr("disabled",false);
//			$("#inoWorry_box").next().css("background","#e5e2df");
		}
	})
	$("#discountGas").click(function(){//选择惠加油
		if($("#discountGas").is(":checked")){
			$("#discountGas_Flag").val('1');
			$("#iFlag").attr("checked",false);
			$("#iFlag").attr("disabled",true);
			$("#iFlag").next().css("background","#A0A0A0");
			$("#oilgift_box").attr("checked",false);
			$("#oilgift_box").attr("disabled",true);
			$("#oilgift_box").next().css("background","#A0A0A0");
			$("#xuanzeiflag").val('0');
			$("#discountPolicy_Flag").val("0");
			//i洗车
			$("#iwashCar_box").attr("checked",false);
			$("#iwashCar_box").attr("disabled",true);
			$("#iwashCar_box").next().css("background","#A0A0A0");
			$("#iwashCarIsCheck").val('0');
			//i无忧
			$("#inoWorry_box").attr("checked",false);
			$("#inoWorry_box").attr("disabled",true);
			$("#inoWorry_box").next().css("background","#A0A0A0");
			$("#inoWorryIsCheck").val('0');
		}else{
			$("#discountGas_Flag").val('0');
			$("#iFlag").attr("disabled",false);
			$("#iFlag").next().css("background","#e5e2df");
			$("#oilgift_box").attr("disabled",false);
			$("#oilgift_box").next().css("background","#e5e2df");
			//i洗车
			$("#iwashCar_box").attr("disabled",false);
			$("#iwashCar_box").next().css("background","#e5e2df");
			//i无忧
			$("#inoWorry_box").attr("disabled",false);
			$("#inoWorry_box").next().css("background","#e5e2df");
		}
	})
	//流程步骤
	if($("input[name='carInfo.progressBar']").val() <4){
		$("input[name='carInfo.progressBar']").val(4);
	}
	if($("input[name='carInfo.progressBar']").val()>4){
		$("#step_5").attr("data-status","finished");
	}
	
	//是否显示订阅车主秘书
	if($("#carOwner_remindFlag").val()==1){
		$("#secretarySpan").show();
		$("#secretary").addClass('checked');	//默认选中
		$("input[name='carInfo.carOwner_remind']").val("1");
	}else if($("#carOwner_remindFlag").val()==0){
		$("#secretarySpan").hide();
	}
	if(document.getElementById("feigaiSex")){//用是否有性别标示费改
		$("#forFeiGaiQueRen").html("保险人已明确说明条款内容、免除保险人责任条款的含义及其法律后果");
		//费改性别
		if($("#insuredIdentifSex").val()==1){
			$("#feigaiSex").html("性别：男")
		}else{
			$("#feigaiSex").html("性别：女")
		}
		//费改增加一个确认框点击事件
		$("#ISayThisTrue").click(function(){
			var isTrue= $("#ISayThisTrueChoose");
			if(isTrue.hasClass("checked")){
				isTrue.removeClass("checked");
			}else{
				isTrue.addClass("checked");
				removeInvalidTips($("#ISayThisTrue"));
			}
		});
	}
	//如果邮箱为空，显示默认问字
	if($("input[name='carInfo.insuredEmail']").val()==''){
		$("#insuredFont").show();
	}else{
		$("#insuredFont").hide();
	}
	if($("input[name='carInfo.appliEmail']").val()==''){
		$("#appliFont").show();
	}else{
		$("#appliFont").hide();
	}
    /* Accordion control */
    $(".accordion .accordion_title").click(function() {
        var title = this, list = $(this).next("div");

        $(list).slideToggle(function() {
            if($(list).css("display") == "block") {
                $(title).addClass("open").removeClass("close");
            } else
                $(title).addClass("close").removeClass("open");
        });
    });

    $(".accordion.short .accordion_title").click(function() {
    	
        var title = this, list = $(this).attr("data-related");
        $(".detail_popup:visible").slideUp(function() { $($(this).attr("data-related")).removeClass("open").addClass("close"); });
        if(!$(list).is(":visible")) {
        $(list).slideDown(function() {
            if($(list).is(":visible")) {
                $(title).addClass("open").removeClass("close");
            } else
                $(title).addClass("close").removeClass("open");
        });
        }
    });
    $("#insurerDec,#clauseDec,#specialDec,#specialer,#specialDecs,#carInsurLoseInfo").click(function() {
    	var proSelected = $("#proSelected").val();
    	var userAgent = window.navigator.userAgent;
    	if(userAgent.indexOf("Mozilla/5.0 (iPod; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3")>-1){
    		$(".dec_content").css("height","63%")
    	}
        var declaration = "#" + $(this).attr("href").split("#")[1];
        $(declaration).css({ 'height': $(document).height() }).removeClass("close").addClass("open").find("a:first-child").bind('click', function() { $(this).parents(".declaration").removeClass("open").addClass("close"); return false; });
        
        //特别声明   20140219 cy
//        if(proSelected == "21000000" || $("#citySelected").val()=="32060000"){//辽宁地区  特别声明cy 0917
//        	$("#liaoningstr").show();
//        	$("#chongqingstr").hide();
//        }
        return false;
    });
    //返回上一步事件绑定
    $("#backprev").click(function(){
    	var ctx = $("#ctx").val();
    	$("input[name='carCodex']").val('');	//置空 通过过滤
    	var form = $("#form");
    	form.attr("action",ctx+"/carProposal/car/backInput");
    	form.submit();
    });
    
    //勾选阅读并确认
//    $("#confirmInfoSpecifiedDriver").click(function(){
//    	if($("#confirmInfoSpecifiedDriver").is(":checked")){	//被选中时
//    		if($("input[name='carInfo.ccaId']").val()!= '' && $("input[name='isValid']").val()!= 1){		//团购id有值时
//    			var ctx = $("#ctx").val();
//    			$("#form").attr("action", ctx + "/carProposal/carGroupBuy/toValidateCodePage");		//转到短信验证页面
//    			$("input[name='carCodex']").val('');
//    			$("#form").submit();
//    		}
//    	}
//    });
    
    //点击确认事件绑定
    $("#quotedPrice").click(function(){
		//Gridsum Web Dissector量化代码部署方案
    	if(window.GridsumWebDissector){
    		var _gsTracker =GridsumWebDissector.getTracker('GWD-002236');
    		_gsTracker.track('/targetpage/chexian/order_success.html');
    	}
		
		//bug1719 cy 0916
		if($("#insuredEmail").html().indexOf("@")<=0 || $("#appliEmail").html().indexOf("@")<=0 || $("input[name='carInfo.deliverInfoAddress']").val()==""){
			showInvalidTips($("#secretarySpan"), "请完善您的被保险人、投保人及保单配送信息！", true, $("#confirmInfoSpecifiedDriver"));
			return false;
		}
		if($("input[name='carInfo.deliverInfoDistrict']").val()==""){
//			if($("input[name='carInfo.deliverInfoPro']").val()==""){	//指定省
			if($("#proSelected").val().indexOf("460000") >= 0 || $("#citySelected").val()=="15060000" || $("#citySelected").val()=="45240000" 
				|| $("#citySelected").val()=="33980000"|| $("#citySelected").val()=="44710000"|| $("#citySelected").val()=="33120000"
				|| $("#citySelected").val()=="62020000"|| $("#citySelected").val()=="65400000"
					|| $("#citySelected").val()=="62520000"){//|| $("#citySelected").val()=="63270000"|| $("#citySelected").val()=="63260000"|| $("#citySelected").val()=="71010000"|| $("#citySelected").val()=="81010000"|| $("#citySelected").val()=="82010000"
				//wap-2015、4270	//无区县：海南  满洲里 广西贺州  杭州萧山  广东顺德  浙江义乌  嘉峪关 奎屯 20170327add兰州新区62520000(玉树藏族自治州  果洛藏族自治州  台湾 香港  澳门  暂时没加)
			}else{
				showInvalidTips($("#secretarySpan"), "请完善您的被保险人、投保人及保单配送信息！", true, $("#confirmInfoSpecifiedDriver"));
				return false;
			}
//			}else{	//全国范围
//				if($("input[name='carInfo.deliverInfoPro']").val().indexOf("460000") < 0 && $("#citySelected").val() != "44710000"){	//bug2027 cy 非海南提示
//					showInvalidTips($("#secretarySpan"), "请完善您的被保险人、投保人及保单配送信息！", true, $("#confirmInfoSpecifiedDriver"));
//					return false;
//				}
//			}
		}
		
    	if(!$("#agree").hasClass('checked')){
    		showInvalidTips($("#secretarySpan"), "请认真阅读投保声明并确认！", true, $("#confirmInfoSpecifiedDriver"));
    		return false;
    	}else{
    		removeInvalidTips($("#secretarySpan"));
    	}
    	//费改新增确认信息属实框
    	if(document.getElementById("feigaiSex")){//用是否有性别标示费改
	    	if(!$("#ISayThisTrueChoose").hasClass('checked')){
	    		showInvalidTips($("#ISayThisTrue"), "请认真确认所填投保单信息真实、完整、准确、属实!", true);
	    		return false;
	    	}else{
	    		removeInvalidTips($("#ISayThisTrue"));
	    	}
    	}
    	//国籍默认赋值
    	if($("input[name='carInfo.appliIdentifyType']").val()=="01"||$("input[name='carInfo.appliIdentifyType']").val()=="02"||$("input[name='carInfo.appliIdentifyType']").val()=="04"){
    		$("input[name='carInfo.countryCode']").val("CHN");
			$("input[name='carInfo.appliIsResident']").val("A");
    	}
    	
    	$("input[name='carCodex']").val('');	//置空 通过过滤
    	
    	//北京地区要求弹出提示   如果选择电子保单要提示是否
    	if($("#proSelected").val()=="11000000" && $("#confirmInfoEpolicy").is(":checked")){
    		$("#popupBJ").fadeIn();
    		return false;
    	}
    	
    	$("#quotedPrice").attr("disabled",true);
    	//证件号如是'组织机构代码',判断未修改车主信息不得进入下一步
    	if($("#carIdentify").html()==""){
    		  return false;
    	}
        // $.post('/wap/carProposal/car/hasT',{sessionId:$('#sessionId').val()});
    	var form = $("#form");
    	form.submit();
    });
    function textingValidate(){
    	var ctx = $("#ctx").val();
        $.ajax({ 
        	type:"post", 
        	data:{
        		channelNo:$("input[name='head.channelNo']").val(),
        		sessionId:$("#sessionId").val(),
        		citySelected:$("#citySelected").val(),
        		ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
        		ccaId:$("input[name='carInfo.ccaId']").val(),
        		ccaEntryId:$("input[name='carInfo.ccaEntryId']").val()	//团购号
        	},
        	url:ctx+"/carProposal/car/textingValidate", 
        	dataType:"json", 
        	success:function (data) {
        		var state = data.message;
        		if(state==1){
        			$("#form").attr("action", ctx + "/carProposal/carGroupBuy/toValidateCodePage");
        			$("input[name='carCodex']").val('');
        			$("#form").submit();
        		}
        	}
        }); 
    }
    
    $("#confirmInfoSpecifiedDriver").click(function(){
    	if($("#agree").hasClass('checked')){
    		$("#agree").removeClass('checked');
//    		$(".show_img").hide();
//    		$(".new_module").hide();
    	}else{
    		$("#agree").addClass('checked');
    		removeInvalidTips($("#secretarySpan"));
    		//判断是否推送EAD
    		if($("#insuredAccidentFlag").val()!='1'){ //是否已购买
    			if(checkEAD() && $("#agree").hasClass("checked")){
//    				$(".show_img").show();
    				$(".new_module").show();
    			}
    		}
    		//北京地区是否显示验证码弹出层
    		if($("#citySelected").val()=="11000000"){
    			var personType = ["appli","insured"];//appli投保人(优先使用),insured被保险人
    			for ( var i = 0 ; i < personType.length ; i++ ){
    				if($("input[name='carInfo."+personType[i]+"IdentifyType']").val()=="01"){
            			showYZ("first",$("input[name='carInfo."+personType[i]+"Mobile']").val());
            			break;
    				}
    			}
    		}else{
            	//是否短信验证
            	textingValidate();
    		}
    	}
    });
    
    $("#carOwnerSecretary").click(function(){	//订阅车主秘书
    	if($("#secretary").hasClass('checked')){
    		$("#secretary").removeClass('checked');
    		$("input[name='carInfo.carOwner_remind']").val("0");
    	}else{
    		$("#secretary").addClass('checked');
    		$("input[name='carInfo.carOwner_remind']").val("1");
    	}
    });
    //生效日期
    $("#dateConfirm").html($("input[name='carInfo.startDateSY']").val() +"&nbsp;"+ $("input[name='carInfo.startHourSY']").val() + "时起&nbsp; 至" + $("input[name='carInfo.endDateSY']").val() +"&nbsp;"+ $("input[name='carInfo.endHourSY']").val() + "时止")
    $("#jqStartDate").html($("input[name='carInfo.startDateCI']").val()+"&nbsp;"+ $("input[name='carInfo.starthourCI']").val() + "时起&nbsp; 至" + $("input[name='carInfo.endDateCI']").val() +"&nbsp;"+ $("input[name='carInfo.endhourCI']").val() + "时止")
//    //初登日期格式转换
//    var enroll=$("input[name='carInfo.enrollDate']").val();
//    $("#enrollDate").html(replace(enroll,'-','/'));
//    $("#jqDate").html(replace(enroll,'-','/'));
    //是否显示交强险信息
    if($("#hasBz").val()==2){
    	$("#JQFeeDiv").hide();
    }else if($("#hasBz").val()==1){
    	$("#JQFeeDiv").show();
    }
    //交强险种保费
    var totalJQ = parseFloat($("input[name='carInfo.jqFee']").val()) + parseFloat($("input[name='carInfo.shipFee']").val())
    $("#jqFee1").html(fmoney(totalJQ))
    $("#jqFee3").html(fmoney($("input[name='carInfo.jqFee']").val())+"元")
    $("#shipFee").html(fmoney($("input[name='carInfo.shipFee']").val())+"元")
    $("#jqFee2").html("交强险合计："+fmoney(totalJQ)+"元")
    
    //所有价格格式转换
    $("#carCount").html("车上人员责任险（乘客）");
    $("#allFee").html(fmoney($("input[name='carInfo.allFee']").val()));
    $("#syFee1").html(fmoney($("input[name='carInfo.syFee']").val()));
    if($("#syFee1").html()=="0.00"){
    	$("#syDiv").hide();
    }
    $("#syFee2").html(fmoney($("input[name='carInfo.syFee']").val()));
    $("#amount_050200").html(fmoney($("input[name='carInfo.amount_050200']").val()));
    $("#premium_050200").html(fmoney($("input[name='carInfo.premium_050200']").val()));
    $("#amount_050600").html(fmoney($("input[name='carInfo.amount_050600']").val()));
    $("#premium_050600").html(fmoney($("input[name='carInfo.premium_050600']").val()));
    $("#amount_050500").html(fmoney($("input[name='carInfo.amount_050500']").val()));
    $("#premium_050500").html(fmoney($("input[name='carInfo.premium_050500']").val()));
    $("#amount_050701").html(fmoney($("input[name='carInfo.amount_050701']").val()));
    $("#premium_050701").html(fmoney($("input[name='carInfo.premium_050701']").val()));
//    var seat = parseInt($("input[name='carInfo.seatCount']").val())-1;
    $("#amount_050702").html(fmoney(parseInt($("input[name='carInfo.amount_050702']").val())));
    $("#premium_050702").html(fmoney($("input[name='carInfo.premium_050702']").val()));
    $("#amount_050210").html(fmoney($("input[name='carInfo.amount_050210']").val()));
    $("#premium_050210").html(fmoney($("input[name='carInfo.premium_050210']").val()));
    $("#amount_050310").html(fmoney($("input[name='carInfo.amount_050310']").val()));
    $("#premium_050310").html(fmoney($("input[name='carInfo.premium_050310']").val()));
    $("#premium_050231").html(fmoney($("input[name='carInfo.premium_050231']").val()));
    $("#premium_050270").html(fmoney($("input[name='carInfo.premium_050270']").val()));
    $("#premium_050252").html(fmoney($("input[name='carInfo.premium_050252']").val()));
    $("#premium_050291").html(fmoney($("input[name='carInfo.premium_050291']").val()));
    $("#premium_050912").html(fmoney($("input[name='carInfo.premium_050912']").val()));
    $("#premium_050921").html(fmoney($("input[name='carInfo.premium_050921']").val()));
    $("#premium_050922").html(fmoney($("input[name='carInfo.premium_050922']").val()));
    $("#premium_050924").html(fmoney($("input[name='carInfo.premium_050924']").val()));
    $("#premium_050928").html(fmoney($("input[name='carInfo.premium_050928']").val()));
    $("#premium_050929").html(fmoney($("input[name='carInfo.premium_050929']").val()));
    $("#premium_050935").html(fmoney($("input[name='carInfo.premium_050935']").val()));
    
    if($("input[name='carInfo.carIdentifyType']").val()==""||$("input[name='carInfo.carIdentifyNumber']").val()==""){
    	$("input[name='carInfo.carIdentifyType']").val($("input[name='carInfo.insuredIdentifyType']").val());
    	$("input[name='carInfo.carIdentifyNumber']").val($("input[name='carInfo.insuredIdentifyNumber']").val());
    }
    if($("input[name='carInfo.appliIdentifyType']").val()==""||$("input[name='carInfo.appliIdentifyNumber']").val()==""){
    	$("input[name='carInfo.appliIdentifyType']").val($("input[name='carInfo.insuredIdentifyType']").val());
    	$("input[name='carInfo.appliIdentifyNumber']").val($("input[name='carInfo.insuredIdentifyNumber']").val());
    }
  //国籍居民处理
	if($("input[name='carInfo.appliIdentifyType']").val()=="01"||$("input[name='carInfo.appliIdentifyType']").val()=="02"||$("input[name='carInfo.appliIdentifyType']").val()=="04"){
		$("#countryLi").hide();
		$("input[name='carInfo.appliIsResident']").val("");
		$("input[name='carInfo.countryCode']").val("");
		$("input[name='carInfo.countryName']").val("");
	}else{
		if($("input[name='carInfo.countryCode']").val()==""){
			$("input[name='carInfo.countryCode']").val("CHN");
			$("input[name='carInfo.countryName']").val("中国");
			$("input[name='carInfo.appliIsResident']").val("A");
		}else{
			var appliIsResident ="非居民";
			if($("input[name='carInfo.appliIsResident']").val()=="A"){
				appliIsResident = '居民';
			}
			$("#countryLi").html($("input[name='carInfo.countryName']").val() + appliIsResident);
		}
	}
  //证件初始化
    var carIdentifyType = getindentifyType($("input[name='carInfo.carIdentifyType']").val());
    var carIdentifyNumber = $("input[name='carInfo.carIdentifyNumber']").val();
    if(($("input[name='carInfo.carIdentifyType']").val()=="31")&&($("#isEdit").val()!="1")){
    	 $("input[name='carInfo.carIdentifyNumber']").val("");
    	$("input[name='carInfo.carIdentifyType']").val("");
    	 $("#insurerInfoIDNo").val("");
    	 $("#icon").show();
    }else{
    	$("#carIdentify").html(carIdentifyType + carIdentifyNumber);
    }
    var insuredIdentifyType = getindentifyType($("input[name='carInfo.insuredIdentifyType']").val());
    var insuredIdentifyNumber = $("input[name='carInfo.insuredIdentifyNumber']").val()
    $("#insuredIdentify").html(insuredIdentifyType);
    var appliIdentifyType = getindentifyType($("input[name='carInfo.appliIdentifyType']").val());
    var appliIdentifyNumber = $("input[name='carInfo.appliIdentifyNumber']").val()
    $("#appliIdentify").html(appliIdentifyType);
    
    //#icon显隐判断 
    if($("#carIdentify").html()!=""){
     $("#icon").hide();
    }
    //
    if(trim($("#fjDiv2").html())==""){
    	$("#fjDiv1").hide()
    }
    if(trim($("#jbDiv2").html())==""){
    	$("#jbDiv1").hide()
    }
    if(trim($("#tkDiv2").html())==""){
    	$("#tkDiv1").hide()
    }
    
    var proselect = $("#proSelected").val();
    if(proselect == '21020000'){
    	var insuredAndOwnerrelate = $("input[name='carInfo.insuredAndOwnerrelate']").val();
    	if(insuredAndOwnerrelate == "01"){
    		insuredAndOwnerrelate = "本人";
    	}
    	if(insuredAndOwnerrelate == "02"){
    		insuredAndOwnerrelate = "配偶";
    	}
    	if(insuredAndOwnerrelate == "03"){
    		insuredAndOwnerrelate = "子女";
    	}
    	if(insuredAndOwnerrelate == "04"){
    		insuredAndOwnerrelate = "其他";
    	}
    	$("#dlRelateMsg").html(insuredAndOwnerrelate)
    	$("#dlRelate").show()
    }
    
    if(proselect=="21000000"||proselect=="34000000"){
    	$("input[name='carInfo.invoiceTitle']").val($("input[name='carInfo.insuredName']").val());
    }
    
  //新疆、江西、河北特别声明隐藏
    var citySelected = $("#citySelected").val();
//    if(proselect=="36000000"||proselect=="13000000"||proselect=="62000000"||proselect=="34000000"){
// 	   $("#specialDec").hide();
//    }
    if(proselect=="37020000"||proselect=="32000000"||proselect=="51000000"||proselect=="65000000"||proselect=="33000000"
    	||proselect=="33020000"||proselect=="62000000"||proselect=="15000000"||proselect=="52000000"||proselect=="11000000"){
//    	$("#specialDec").hide();
    	$("#insurerDec").html("投保人声明");
    }
    if(citySelected=="33010000"||citySelected=="33980000"||citySelected=="32060000"){
//    	$("#specialDec").show();
    	$("#insurerDec").html("投保人声明");
    }
    if(proselect=="35020000"||proselect=="23000000"||proselect=="31000000"||proselect=="53000000"||proselect=="14000000"
    	||proselect=="12000000"||citySelected=="33010000"||proselect=="45000000"||proselect == "63000000" ||proselect == "54000000"
    	||proselect == "44000000"||proselect == "44030000"||proselect == "50000000"||proselect == "21000000"||proselect == "21020000"
    	||proselect == "61000000"||proselect == "41000000" || proselect == "46000000" || proselect == "22000000" || proselect == "36000000"
    	|| proselect == "13000000"){
    	$("#insurerDec").html("投保人声明");
    }
    if(proselect=="46000000" || proselect == "22000000" || proselect == "36000000"){	//海南 吉林 投保声明
    	$("#toubaoStr").html("<h2>投保声明</h2><p>保险人已在投保网页提供投保险种所适用的条款，本人已仔细阅读并知晓条款内容，尤其是对其中免除保险人责任人的条款（保险合同责任免除条款包括除外责任条款、免赔额、免赔率、比例赔付、解除或中止合同等部分或全部免除或限缩保险人责任的条款），以及本保险合同中付费约定和特别约定的内容向本人作了明确说明，本人已充分理解并接受上述内容，同意以此作为订立保险合同的依据。</p>");
    }
    var notify = "";
    if($("#isCheckCar").val()=="1"){
    	notify='<p style="font-size: 1.5rem;font-weight: 600;margin-top: 3rem;"><img width="20px" height="15px" src="/wap/views/carProposal/errPage/images/cue2.png">您的车辆需要验车！</p>';
    }
    //特别声明 20140219 cy
    if(citySelected=="42100000" || proselect == "22000000"){  //荆州 吉林
    	$("#chongqingstr").html("<h2>特别声明</h2>"+notify+"<br/>我公司在配送保险单时需要验车、验证。如车辆未按要求年检、实际车型与承保车型不一致、车辆有未修复的损失等情形，我公司有权解除保险合同，由此造成的损失由投保人承担。");
    }else{	//其他全国
    	$("#chongqingstr").html("<h2>特别声明</h2>"+notify+"<br/>如您的车辆需要验车，验车事宜当地公司会与您联系，请您配合。<br>请在办理前准备好身份证、行驶证及驾驶证复印件。");
    }
//    if(proselect=="50000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>验车声明内容：投保盗抢险、车身划痕险、玻璃单独破碎险、自燃险的车辆需验车，请选择上门收费或柜台支付，验车事宜当地公司会与您联系，请您配合。");
//    }
//    if( proselect == "35000000" || proselect == "46000000"|| proselect == "35020000"|| proselect == "22000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>您的车辆需验车，验车事宜当地公司会与您联系，请您配合。");
//    }
//    if(proselect == "61000000"||proselect == "53000000"||proselect == "12000000"||proselect == "54000000"||proselect == "63000000" ||proselect=="45000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>如您的车辆需验车，验车事宜当地公司会与您联系，请您配合。");
//    }
//    if(proselect == "23000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>如您的车辆需验车，验车事宜当地公司会与您联系，请您配合。 " +
//    			"验车范围：符合以下条件的车辆可以免验:</br> " +
//    			"（1）仅投保交强险的车辆；</br>" +
//    			"（2）购置时间7天以内的新车投保(依据购车发票日期）；</br>" +
//    			"（3）按期续保且续保时未加保车辆损失保险、盗抢险及其附加险的车辆；</br> " +
//    			"（4）新保商业第三者责任保险及其附加险的车辆；");
//    }
//    if(proselect=="37000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>如果不验车或者验车不合格，保险公司有权利退保，所产生的费用由客户自己承担。");
//    }
//    if(citySelected=="33010000"||citySelected=="33980000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>投保盗抢险的车辆需验车，验车事宜当地公司会与您联系，请您配合。");
//    }
//    if(proselect=="44000000"||proselect=="44030000"||proselect=="21020000"||proselect=="31000000"||citySelected=="42100000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>我公司在配送保险单时需要验车、验证。如车辆未按要求年检、实际车型与承保车型不一致、车辆有未修复的损失等情形，我公司有权解除保险合同，由此造成的损失由投保人承担。");
//    }
//    if(proselect=="41000000"){   
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>网销车险业务特别声明：我公司在配送保险单时需要验车、验证。如车辆未按要求年检、实际车型与承保车型不一致、车辆有未修复的损失等情形，我公司有权解除保险合同，由此造成的损失由投保人承担。");
//    }
//    if(citySelected=="32060000"){	//江苏南通
//    	$("#liaoningstr").html("<h2>特别声明</h2><br/>我公司在配送保险单时需要验车、验证。投保时请注意行驶里程按仪表数值正确选择，如情况不符，我公司有权解除保险合同，由此造成的损失由投保人承担。");
//    }
//    if(proselect=="14000000"){
//    	$("#chongqingstr").html("<h2>特别声明</h2><br/>如您的车辆需验车，验车事宜当地公司会与您联系，请您配合。有下列情形之一的车辆需验车承保：</br>" +
//    			"（1）第一次投保车辆损失险及其附加险的车辆；</br>" +
//    			"（2）未按期续保，脱保超过1天（含1天）的车辆；</br>" +
//    			"（3）首次在我公司承保的车辆（三者险除外）；</br> " +
//    			"（4）保险期限内中途申请增加保险金额的车辆；</br>" +
//    			"（5）中途申请加保险种（商业三者险除外）的车辆；</br> " +
//    			"（6）中途加保盗抢险的车辆；");
//    }
    
    var validate = $("#validate").val();
	if(validate=="success"){
		$("#agree").addClass('checked');
		if(checkEAD()){
			$(".show_img").show();
		}
	}
	
   var taxPayerIdentNo = $("input[name='carInfo.taxPayerIdentNo']").val();
   $("#taxpayident").text(getindentifyType($("input[name='carInfo.taxpayertype']").val())+taxPayerIdentNo);
   
   $("#showDiv").click(function(){
   	if(typeof($("#showDiv").attr('disabled'))=="undefined"){
   		reSetEADDiv();
	   /*var _this=$(this);
		_this.parents('.page_content').nextAll('.mask').show().animate({top:'0'}).next('.push1').show().animate({top:'12%'});
		$("body").css("overflow","hidden");
		var insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
		if(insuredIdType=="01"){
			var insuredIdentifyNumber = $("input[name='carInfo.insuredIdentifyNumber']").val();
			var insuredIdentifyNumber1 = insuredIdentifyNumber.substring(6,10);
			var insuredIdentifyNumber2 = insuredIdentifyNumber.substring(10,12);
			var insuredIdentifyNumber3 = insuredIdentifyNumber.substring(12,14);
			var insuredIdentifyNumber4 = insuredIdentifyNumber1+'-'+insuredIdentifyNumber2+'-'+insuredIdentifyNumber3;
			$('#birthDayEAD').val(insuredIdentifyNumber4);
			$('#birthDayEAD').attr("disabled", "disabled");
		}else{
	    	var currentTime = ""; 
	    	var myDate = new Date(); 
	    	var year = myDate.getFullYear(); 
	    	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
	    	if (month < 10) { 
	    	month = "0" + month.toString(); 
	    	} 
	    	var date = myDate.getDate(); 
	    	if (date < 10) { 
	    	date = "0" + date.toString(); 
	    	} 
	    	currentTime = year.toString() + "-" + month.toString() + "-" + date.toString(); //以时间格式返回 
	    	$('#birthDayEAD').val(currentTime);
		}*/
	}else{
		event.preventDefault();
	}
   });
   $('.destTitle .a_black').click(function(){
		var insuredCount=$("#insuredCount").val();
		for ( var i = 1; i <= insuredCount; i++) {
			if (!checkData(i)) {
				return false;
			}
		}
	   	deletePreDetails();
		var _this=$(this);
		_this.parents('.destination').animate({top:'100%'},function(){$('.destination').hide()});
		$('.coverMask').animate({top:'100%'},function(){$('.coverMask').hide()});
		$("body").css("overflow","auto");
	
		var insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
		if(insuredIdType=="01"){
			r="身份证";
		}else if(insuredIdType=="02"){
			r="户口薄";
		}else if(insuredIdType=="03"){
			r="护照";
		}else if(insuredIdType=="04"){
			r="军官证";
		}else if(insuredIdType=="05"){
			r="驾驶执照";
		}else if(insuredIdType=="06"){
			r="返乡证";
		}else if(insuredIdType=="07"){
			r="港澳身份证";
		}else if(insuredIdType=="99"){
			r="其他";
		}
		$('<dl id="delete1"><dt class="black">车险被保险人：</dt><dd>'+ $("input[name='carInfo.insuredName']").val() +'（'+ $("#birthDayEAD").val() +'）</dd></dl><dl id="delete2"><dt>证件号码：</dt>'
			+'<dd>'+ $("input[name='carInfo.insuredIdentifyNumber']").val() +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
		for(var i = 1; i < p; i++) {
			var insuredIdType1 = $("#idType_"+i).val();
			var j = i+1;
			if(insuredIdType1=="01"){
				r="身份证";
			}else if(insuredIdType1=="02"){
				r="户口薄";
			}else if(insuredIdType1=="03"){
				r="护照";
			}else if(insuredIdType1=="04"){
				r="军官证";
			}else if(insuredIdType1=="05"){
				r="驾驶执照";
			}else if(insuredIdType1=="06"){
				r="返乡证";
			}else if(insuredIdType1=="07"){
				r="港澳身份证";
			}else if(insuredIdType1=="99"){
				r="其他";
			}else if(insuredIdType="31"){
				r="组织机构代码证";
			}
			$('<dl id="delete3'+ j +'"><dt class="black">被保险人'+ j +'：</dt><dd>'+$("#insuredName_"+i).val()+'（'+ $("#birthDay_"+i).val() +'）</dd></dl>'
					+'<dl id="delete4'+ j +'"><dt>证件号码：</dt><dd>'+ $("#idNo_"+i).val() +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
		}
		$("#showDiv").parents('.page_content').attr("style","");
   });
   $('.push1 .addRen').click(function(){
    	var currentTime = ""; 
    	var myDate = new Date(); 
    	var year = myDate.getFullYear(); 
    	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
    	if (month < 10) { 
    	month = "0" + month.toString(); 
    	} 
    	var date = myDate.getDate(); 
    	if (date < 10) { 
    	date = "0" + date.toString(); 
    	} 
    	currentTime = year.toString() + "-" + month.toString() + "-" + date.toString(); //以时间格式返回 
        if($("input[name='carInfo.interimNo']").val()!="" && $("#count1").val()=="1" && $("#count").val()!=""){
        	p =parseInt($("#count").val());
        	$("#count1").val('0');
	    }
        if($("#p").val()!=""){
        	p =parseInt($("#p").val());
        }
    	if(p==1){
    		$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
    				+ '<li><label>姓名</label><input type="text" value="" onblur="checkInsuredName(id)" id="insuredName_'+ p +'"/></li>'
    				+ '<li class="right_arrow"><label>证件类型</label><select id="idType_'+ p +'" onchange="setData(id)"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
                    + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
    				+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)" onkeyup="this.value=this.value.toUpperCase()" id="idNo_'+ p +'" value="" maxlength="18"/></li>'
    				+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onblur="checkInsuredBirthdayOnblur(id)"   class="beforetime" value="'+currentTime+'" /></li>').insertAfter($('.right_arrow'));
    		  if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
    			  $("#isDisk").hide();
    		  }
    	}else{
    		if(p<9){
    			var q = p-1;
    			$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
    					+ '<li><label>姓名</label><input type="text" onblur="checkInsuredName(id)" id="insuredName_'+ p +'" value=""/></li>'
    					+ '<li class="right_arrow"><label>证件类型</label><select id="idType_'+ p +'" onchange="setData(id)"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
                        + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
    					+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)" onkeyup="this.value=this.value.toUpperCase()" id="idNo_'+ p +'" value="" maxlength="18"/></li>'
    					+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onbeforeunload="proCalendar(p)" class="beforetime" value="'+currentTime+'" /></li>').insertAfter($('.li_'+ q));
    			if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
      			  $("#isDisk").hide();
      		  }
    		}else{
    			return;
    		}
    	}
    	var userAgent = window.navigator.userAgent;
	    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){proBirthDay(p);}
	    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){proBirthDay(p);}
	    else if(userAgent.indexOf("UC")>-1){}
	    else if(userAgent.indexOf("Opera")>-1){}
	    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){proBirthDay(p);}
	    else if(userAgent.indexOf("iPhone")>-1){}
	    else {proBirthDay(p);}
	    
    	$("#insuredCount").val(p);
    	p = p+1;
        if($("#p").val()!=""){
        	$("#p").val(p);
        }
    	var quota = $("#quota").text();
    	quota = Number(quota.substring(0, quota.length-1));
    	$("#eadFee2").text(quota*eadPageFee*p+'.00');
    	$("#saveId").text(quota*p*15);		//节省
	});
    
	$('.push2 .setA').click(function(){
		$(this).parents('.destination').hide();
		$('.coverMask').hide();
	});
	//tip_icon			
    $(".explain").click(function(){
		$('body').css('overflow','hidden');
		$(".termsPeople").show().removeClass("close").addClass("open").find("a.closer").bind('click', function(){
			$(this).parents(".terms").removeClass("open").addClass("close");
			setTimeout(function(){$('body').css('overflow','');},500)					
			return false;
		});
		return false;
     });
   
   
   $('.a_supplement').click(function(){
	  $('body').css('overflow','hidden');
		$(".supplement").show().removeClass("close").addClass("open").find("a.closer").bind('click', function(){
			$(this).parents(".terms").removeClass("open").addClass("close");
			setTimeout(function(){$('body').css('overflow','');},500)					
			return false;
		});
		return false; 
	});
   
   $("#insurerDec, #clauseDec").click(function() {
       var declaration = "#" + $(this).attr("href").split("#")[1];
       $(window).scrollTop(0);
       $(declaration).css({ 'height': $(document).height() }).removeClass("close").addClass("open").find("a:first-child").bind('click', function() { $(this).parents(".declaration").addClass("close"); return false; });
       return false;
   });
   
   $("#add").click(function(){
	   var quota = $("#quota").text();
	   quota = Number(quota.substring(0, quota.length-1));
	   //记忆信息存在重新设置p
       if($("#p").val()!=""){
       	p =parseInt($("#p").val());
       }
	   if(quota>1){
		   quota -= 1;
		   $("#eadFee2").text(quota*eadPageFee*p+'.00');
		   $("#saveId").text(quota*15*p);
		   $("#quota").text(quota+"份");
	   }
   });
   $("#cut").click(function(){
	   var quota = $("#quota").text();
	   quota = Number(quota.substring(0, quota.length-1));
	   //记忆信息存在重新设置p
       if($("#p").val()!=""){
       	p =parseInt($("#p").val());
       }
	   if(quota<30){
		   quota += 1;
		   $("#eadFee2").text(quota*eadPageFee*p+'.00');
		   $("#saveId").text(quota*15*p);
		   $("#quota").text(quota+"份");
	   }
   });
   
   //投保油礼
   $("#oilgift_box").click(function(){
	   $("#discountPolicy_Flag").val($(this).prop("checked")?"1":"0");
	   $("#iFlag").attr("disabled",$(this).prop("checked"));
	   $("#discountGas").attr("disabled",$(this).prop("checked"));
	   $("#iwashCar_box").attr("disabled",$(this).prop("checked"));
	   $("#inoWorry_box").attr("disabled",$(this).prop("checked"));
	   if($(this).prop("checked")){
		   $("#discountGas_Flag").val("0");
		   $("#iFlag").next().css("background","#A0A0A0");
		   $("#xuanzeiflag").val("0");
		   $("#discountGas").next().css("background","#A0A0A0");
		   //i洗车
			$("#iwashCar_box").next().css("background","#A0A0A0");
			$("#iwashCarIsCheck").val('0');
			//i无忧
			$("#inoWorry_box").next().css("background","#A0A0A0");
			$("#inoWorryIsCheck").val('0');
	   }else{
		   $("#iFlag").next().css("background","#e5e2df");
		   $("#discountGas").next().css("background","#e5e2df");
		   //i洗车
			$("#iwashCar_box").next().css("background","#e5e2df");
			//i无忧
			$("#inoWorry_box").next().css("background","#e5e2df");
	   }
   }); 
   //i洗车
   $("#iwashCar_box").click(function(){
	   $("#iwashCarIsCheck").val($(this).prop("checked")?"1":"0");
//	   $("#iFlag").attr("disabled",$(this).prop("checked"));
	   $("#discountGas").attr("disabled",$(this).prop("checked"));
//	   $("#inoWorry_box").attr("disabled",$(this).prop("checked"));
	   if($(this).prop("checked")){
		   $("#discountGas_Flag").val("0");
		   if($("#syFee1").html()<="6000"){
			   $("#iFlag").attr("checked",false);
			   $("#iFlag").attr("disabled",true);
			   $("#iFlag").next().css("background","#A0A0A0");
			   $("#xuanzeiflag").val("0");
		   }
//		   $("#iFlag").next().css("background","#A0A0A0");
//		   $("#xuanzeiflag").val("0");
		   $("#discountGas").next().css("background","#A0A0A0");
		   $("#discountPolicy_Flag").val("0");//投保油礼
		   $("#oilgift_box").next().css("background","#A0A0A0");
		   //i洗车
			//i无忧
//			$("#inoWorry_box").next().css("background","#A0A0A0");
//			$("#inoWorryIsCheck").val('0');
	   }else{
		   $("#iFlag").next().css("background","#e5e2df");
		   $("#iFlag").attr("disabled",false);
		   $("#discountGas").next().css("background","#e5e2df");
		   $("#oilgift_box").next().css("background","#e5e2df");
		   //i洗车
			$("#iwashCar_box").attr("disabled",false);
			$("#iwashCar_box").next().css("background","#e5e2df");
			//i无忧
//			$("#inoWorry_box").attr("disabled",false);
//			$("#inoWorry_box").next().css("background","#e5e2df");
	   }
   });
   //i无忧
   $("#inoWorry_box").click(function(){
	   $("#inoWorryIsCheck").val($(this).prop("checked")?"1":"0");
//	   $("#iFlag").attr("disabled",$(this).prop("checked"));
	   $("#discountGas").attr("disabled",$(this).prop("checked"));
	   if($(this).prop("checked")){
		   $("#discountGas_Flag").val("0");
//		   $("#iFlag").next().css("background","#A0A0A0");
//		   $("#xuanzeiflag").val("0");
		   $("#discountGas").next().css("background","#A0A0A0");
		   $("#discountPolicy_Flag").val("0");//投保油礼
		   $("#oilgift_box").next().css("background","#A0A0A0");
		   //i洗车
//			$("#iwashCar_box").attr("checked",false);
//			$("#iwashCar_box").attr("disabled",true);
//			$("#iwashCar_box").next().css("background","#A0A0A0");
//			$("#iwashCarIsCheck").val('0');
			//i无忧
//			$("#inoWorry_box").attr("checked",false);
//			$("#inoWorry_box").attr("disabled",true);
//			$("#inoWorry_box").next().css("background","#A0A0A0");
	   }else{
//		   $("#iFlag").next().css("background","#e5e2df");
		   $("#discountGas").next().css("background","#e5e2df");
		   $("#discountPolicy_Flag").val("0");//投保油礼
		   $("#oilgift_box").next().css("background","#e5e2df");
		   //i洗车
//			$("#iwashCar_box").attr("disabled",false);
//			$("#iwashCar_box").next().css("background","#e5e2df");
			//i无忧
			$("#inoWorry_box").attr("disabled",false);
			$("#inoWorry_box").next().css("background","#e5e2df");
	   }
   });
   // if($("input[name='carInfo.interimNo']").val()!=""){
	  //  if(checkEAD()){
		 //   cacheEAD();
	  //  }
   // }

	    if ($("input[name='carInfo.interimNo']").val() != "") {// 如果有暂存单
	    //如果团购帐号不为空，从数据库里查业务类型，放进隐藏域，
	    if($("input[name='carInfo.yewuType']").val()!=""){
	    	getYeWuType();
	    }
		var isBuyEnable = findEADRuleConfigure();
		if (checkEAD()) {// 检查EAD，生成EAD信息
			cacheEAD();// 生成EAD暂存信息
			if (isBuyEnable) {// 可以购买
				if ($("#insuredAccidentFlag").val() != "1") {// 如果是第一次购买 为空 // ，取消购买 为0// ，已购买为1
					firstBuyEAD();// 第一次加载时购买
				}
			} else {
				changeToUnbuy();
			}
		} else {// 生成EAD错误，
			//$(".new_module").hide();
		}
   }else{// 没有暂存单
   		//$(".new_module").hide();
   }
   function firstBuyEAD(){//第一次购买
   		var birthday = $.trim($('#insuredBirthday').val());//默认被保险人就是车辆被保险人
		if(!b(birthday)){
			 changeToUnbuy();
			return false;
		}else{//条件都符合
			buyOneEAD();//购买EAD
			return true;
		}
   }
   /* 绑定删除被保险人信息按钮 */
   $("body").on('click', ".min_panel", function() {
	var array = $(this).parent(".gradient_background").next("li").eq(0).find("input");
   	var id=array[0].id;
   	var key=id.substring(id.length-1,id.length);
   	$("#insurerDel").fadeIn();
     	  
    var dialog =$('#insurerDel');
    var	_domW =dialog.width()/2;
    var	_domH =dialog.height()/2;			
    $(dialog).css({'margin-left':-_domW,'margin-top':-_domH}).fadeIn();			
    $(window).resize(function(){				
    	var	_domW =dialog.width()/2;
    	var	_domH =dialog.height()/2;
    	$(dialog).css({'margin-left':-_domW,'margin-top':-_domH});
    });	
   	$('.popup a.close,.popup .inp_close').click(function(){
   		$("#insurerDel").fadeOut();
   		return false;
   	});
   	met="del("+key+")";
   	$("#ok").attr({"onclick":met});
   		
       return false;
   });
   
});

//为驾驶员生日期控件
function proBirthDay(key){
	 var birthDay="#birthDay_"+key;
 	 if($(birthDay).length>0){
	    	var enroll = $(birthDay).val();
	    	$(birthDay).attr("readonly","readonly")
	    	enroll = enroll.split("-");
	    	var defaultYear = enroll[0];
	    	var defaultMonth = enroll[1];
	    	var defaultDay = enroll[2];
	    	var date=new Date();
	    	year=date.getFullYear();
	    	
	    	$(birthDay).UICalPicker({ 'type': "date",'showMonth': true,'showDay': true,'defaultYear': defaultYear,'defaultMonth': defaultMonth,'defaultDay': defaultDay,'dateSep': "-","minYear":"1900","maxYear":year});
	  }
}
	
function checkEAD(){
	var ctx = $("#ctx").val();
	var flag = false;
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/checkEAD",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			renewalPolicyNo:$("input[name='carInfo.beforeProposalNo']").val(),
			insureName:$("input[name='carInfo.insuredName']").val(),
			insuredIdNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
			insuredIdType:$("input[name='carInfo.insuredIdentifyType']").val(),
			interimNo:$("input[name='carInfo.interimNo']").val()
		},
		dataType:"json",
		async:false,
		success:function(data){
			if(data.isInsuredAccident == 1){
				eadPageFee = data.accidentPremium;
				if(90 == eadPageFee){//EAD保费变动之后
					$("#eadPageFee").text(eadPageFee);
					$("#eadBlackFee").text(eadPageFee);
					$("#eadFee1").text(eadPageFee+"元");
					$("#eadFee2").text(eadPageFee+".00");
					$("#eadAmount").text(data.accidentAmount/10000+"万");
					$("#eadPageAmount").text(data.accidentAmount/10000);
					$("#eadBlackAmount").text(data.accidentAmount/10000);
					$("#oldEADList").hide();
					$("#newEADList").show();
					$("#EADproductTips").html("产品贴士：<br>- 车上人员责任险的有力补充，不分国内<br>国外，车上车下，只要发生意外事故，<br> 均属保险责任；提供24小时全球保障；<br>- 对于同一车辆可投保多个被保险人，须<br>  实名投保；<br>- 每个被保险人可投保多份（最多投保30<br>  份）；同一车辆每人投保份数须相同。");
					if(66000 == data.accidentAmount){
						$("#newEADAmount1").html("6万元");
						$("#newEADAmount2").html("0.6万元");
					}
					$(".new_module").show();
				}
				if(data.eadInsuredBirthday!=""){
					$("#birthDay").val(replace(data.eadInsuredBirthday, "/", "-"));
				}
				flag = true;
			}else{
				var data1=eval('('+data.common+')');
				showInvalidTips($("#secretarySpan"),data1.resultMsg, true, $("#confirmInfoSpecifiedDriver"));
				flag = false;
			}
		}
	});
	
	return flag;
}

function cacheEAD(){
	var ctx = $("#ctx").val();
	var flag = false;
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/cacheEAD",
		data:{
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			insureName:$("input[name='carInfo.insuredName']").val(),
			insuredIdNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
			insuredIdType:$("input[name='carInfo.insuredIdentifyType']").val(),
			interimNo:$("input[name='carInfo.interimNo']").val()
		},
		dataType:"json",
		async:false,
		success:function(data){
			var common = data.common;
			var common1 = eval("("+common+")");
			if(common1.resultCode=="1"){
				$('.form_set_box').parents('.page_content').nextAll('.mask').show().animate({top:'0'}).next('.push1').show().animate({top:'12%'});
				var eadInsuredInfos = data.eadInsuredInfos; 
				var insured = eval("("+eadInsuredInfos+")");
				var rq = insured[0].eadInsuredBirthday;
				$("#birthDayEAD").val(replace(rq,"/","-"));
				var count = data.insuredCount;
				$("#count").val(count);
				for(var p=1;p<count;p++){
					if(p==1){
			    		$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
			    				+ '<li><label>姓名</label><input type="text" value="'+insured[p].insuredName+'" onblur="checkInsuredName(id)" id="insuredName_'+ p +'"/></li>'
			    				+ '<li class="right_arrow"><label>证件类型</label><select onchange="setData(id)" id="idType_'+ p +'"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
			                    + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
			    				+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)" onkeyup="this.value=this.value.toUpperCase()"  id="idNo_'+ p +'" value="'+insured[p].insuredIdNumber+'" maxlength="18"/></li>'
			    				+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onblur="checkInsuredBirthdayOnblur(id)"  class="beforetime"/></li>').insertAfter($('.right_arrow'));
			    		if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
			    			  $("#isDisk").hide();
			    		  }
			    	}else{
			    		if(p<9){
			    			var q = p-1;
			    			$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
			    					+ '<li><label>姓名</label><input type="text" onblur="checkInsuredName(id)" id="insuredName_'+ p +'" value="'+insured[p].insuredName+'"/></li>'
			    					+ '<li class="right_arrow"><label>证件类型</label><select onchange="setData(id)" id="idType_'+ p +'"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
			                        + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
			    					+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)"onkeyup="this.value=this.value.toUpperCase()"  id="idNo_'+ p +'" value="'+insured[p].insuredIdNumber+'" maxlength="18"/></li>'
			    					+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onbeforeunload="proCalendar(p)" class="beforetime"/></li>').insertAfter($('.li_'+ q));
			    			if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
			      			  $("#isDisk").hide();
			      		  }
			    		}else{
			    			return;
			    		}
			    	}
			    	var userAgent = window.navigator.userAgent;
				    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){proBirthDay(p);}
				    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){proBirthDay(p);}
				    else if(userAgent.indexOf("UC")>-1){}
				    else if(userAgent.indexOf("Opera")>-1){}
				    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){proBirthDay(p);}
				    else if(userAgent.indexOf("iPhone")>-1){}
				    else {proBirthDay(p);}
				    $("#insuredCount").val(p);
				}
				for(var i = 1; i < count; i++) {
					$("#idType_"+i).val(insured[i].insuredIdType);
					var riqi = insured[i].eadInsuredBirthday;
					var riqi1 = replace(riqi,"/","-");
					$("#birthDay_"+i).val(riqi1);
				}
				var count = data.eachQuantity;
				$("#quota").text(count+"份");
				var quota = $("#quota").text();
				quota = Number(quota.substring(0, quota.length-1));
				$("#eadFee2").text(quota*eadPageFee*count+'.00');
				$("#saveId").text(quota*count*15);//节省
			}
		}
	});
}

function delEAD(){
	$('body').css('overflow','auto');
	$("#eadDiv").hide();
	var ctx = $("#ctx").val();
//	var insuredCount=$("#insuredCount").val();
//	for ( var i = 1; i <= insuredCount; i++) {
//		if (!checkData(i)) {
//			return false;
//		}
//	}
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/delEAD",
		data:{
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val()
		},
		dataType:"json",
		async:false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success:function(data){
			if(data.resultCode=="1"){
				$(".a_black").parents('.destination').animate({top:'100%'},function(){$('.destination').hide()});
				$('.coverMask').animate({top:'100%'},function(){$('.coverMask').hide()});
				$("#showDiv").parents('.page_content').attr("style","");
				if($("#insuredAccidentFlag").val()=='1'){  //点击过确定
					var allFee = $("input[name='carInfo.allFee']").val();
//					var eadFee = $("#eadFee2").text();
					var eadFee = $("#eadsumPremium").val();
					allFee = allFee-eadFee;
					$("#allFee").text(allFee.toFixed(2));
					$("input[name='carInfo.allFee']").val(allFee);
				}
				$("#insuredAccidentFlag").val('0');
				deletePreDetails();
				delAllEADInsured();
				$("#EADJson").val("");
			}
		}
	});
}

//将EAD被保险人信息转换为json串
function setEADInsuredInfosJson(){
	var eadInsuredInfos=new Array();
	var str = "";
	
	var eadInsuredInfo = new Object;
	//$("#insuredAccidentFlag").val()=='1'  点击过确定?点击后的EAD出生日期：流程中的出生日期
	var birthDay=$("#insuredAccidentFlag").val()=='1'?replace($("#birthDayEAD").val(), "-", "/"):$("#insuredBirthday").val();
	eadInsuredInfo.eadInsuredBirthday=birthDay;
	// eadInsuredInfo.eadInsuredBirthday = replace($("#birthDayEAD").val(), "-", "/");  //源代码
	eadInsuredInfo.index = "1";
	eadInsuredInfo.insuredIdNumber = $("input[name='carInfo.insuredIdentifyNumber']").val();
	eadInsuredInfo.insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
	eadInsuredInfo.insuredName = $("input[name='carInfo.insuredName']").val();
	
	var insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
	if(insuredIdType=="01"){
		r="身份证";
	}else if(insuredIdType=="02"){
		r="户口薄";
	}else if(insuredIdType=="03"){
		r="护照";
	}else if(insuredIdType=="04"){
		r="军官证";
	}else if(insuredIdType=="05"){
		r="驾驶执照";
	}else if(insuredIdType=="06"){
		r="返乡证";
	}else if(insuredIdType=="07"){
		r="港澳身份证";
	}else if(insuredIdType=="99"){
		r="其他";
	}else if(insuredIdType="31"){
		r="组织机构代码证";
	}
	eadInsuredInfos.push(eadInsuredInfo);
	$('<dl id="delete1"><dt class="black">车险被保险人：</dt><dd>'+ $("input[name='carInfo.insuredName']").val() +'（'+ birthDay +'）</dd></dl><dl id="delete2"><dt>证件号码：</dt>'
		+'<dd>'+ $("input[name='carInfo.insuredIdentifyNumber']").val() +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
    if($("input[name='carInfo.interimNo']").val()!="" && $("#count1").val()=="1" && $("#count").val()!=""){
    	p =parseInt($("#count").val());
    }
	for(var i = 1; i < p; i++) {
		var eadInsuredInfoNew = new Object;
		var j = i+1;
		eadInsuredInfoNew.eadInsuredBirthday = replace($("#birthDay_"+i).val(), "-", "/");
		eadInsuredInfoNew.index = j +'';
		eadInsuredInfoNew.insuredIdNumber = $("#idNo_"+i).val();
		eadInsuredInfoNew.insuredIdType = $("#idType_"+i).val();
		eadInsuredInfoNew.insuredName = $("#insuredName_"+i).val();
		var insuredIdType1 = $("#idType_"+i).val();
		if(insuredIdType1=="01"){
			r="身份证";
		}else if(insuredIdType1=="02"){
			r="户口薄";
		}else if(insuredIdType1=="03"){
			r="护照";
		}else if(insuredIdType1=="04"){
			r="军官证";
		}else if(insuredIdType1=="05"){
			r="驾驶执照";
		}else if(insuredIdType1=="06"){
			r="返乡证";
		}else if(insuredIdType1=="07"){
			r="港澳身份证";
		}else if(insuredIdType1=="99"){
			r="其他";
		}else if(insuredIdType="31"){
			r="组织机构代码证";
		}
		$('<dl id="delete3'+ j +'"><dt class="black">被保险人'+ j +'：</dt><dd>'+$("#insuredName_"+i).val()+'（'+ $("#birthDay_"+i).val() +'）</dd></dl>'
				+'<dl id="delete4'+ j +'"><dt>证件号码：</dt><dd>'+ $("#idNo_"+i).val() +'  ('+r+')</dd></dl>').appendTo("#eadDetail");
		eadInsuredInfos.push(eadInsuredInfoNew);
	}
	
	var eadInsuredInfosJson=JSON.stringify(eadInsuredInfos);
	return eadInsuredInfosJson;
}
function showTipMsg(wrap, msg, redBorder){
	  if($(wrap).next(".error_tip").length > 0)
	        $(wrap).next(".error_tip").css({"height":"3.5rem","line-height":"3.5rem"}).addClass(!redBorder ? "center" : "").html(msg);
	    else
	        $(wrap).after($('<li></li>').css({"height":"3.5rem","line-height":"3.5rem"}).addClass("error_tip").addClass(!redBorder ? "center" : "").html(msg));
	
}
function removeTipMsg(wrap){
    $(wrap).next(".error_tip").remove();
}
var reg4 = "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'\"。，、？——《》+\\\\]";
var reg6="^[-_·A-Za-z0-9\u4e00-\u9fa5]+$";
var reg66="^[-_A-Za-z0-9\u4e00-\u9fa5]+$";
var reg7="^[-_（）()A-Za-z0-9\u4e00-\u9fa5]+$";
//效验被保险人姓名
function checkInsuredName(id) {
	var s=$("#" + id).val();
	var nameWrap=$("#"+id).parent("li");
	if ($.trim($("#" + id).val()) == "") {
		showTipMsg($(nameWrap), "请输入被保险人姓名！", true);
		return false;
	}
	if (pcbytes($("#" + id).val()) > 50) {
		showTipMsg($(nameWrap), "被保险人姓名过长！", true);
		return false;
	}
	if ($("#" + id).val().length > 50) {
		showTipMsg($(nameWrap), "被保险人姓名过长！", true);
		return false;
	}
	if (!($("#" + id).val()).match(reg6)) {
		showTipMsg($(nameWrap), "被保险人姓名包含特殊字符，请重新输入！", true);
		return false;
	}
	removeTipMsg($(nameWrap));
	return true;
}
function pcbytes(str){
	if(typeof(str)!='string'){
		str = str.value;
	}
	var len = 0;
	for(var i = 0; i < str.length; i++){
		if(str.charCodeAt(i) > 127){
			len++;
		}
		len++;
	}
	return len;
}
function getIdIndex(id) {
	var reg = /^\d+$/;
	var index = id.indexOf("_");
	index2 = id.substring(index + 1, id.length);
	var r = index2.match(reg);

	return r;
}
//被保险人身份证号码效验
function checkIdentifyNumber(id) {
	var r = getIdIndex(id);
	
	// 去掉身份证中的空格，并赋值
	var data = $.trim($("#" + id).val());
	$("#" + id).val(data);
	var identiyNumWrap=$("#"+id).parent("li");
	if ($("#" + id).val() == "") {
		showTipMsg($(identiyNumWrap), "请输入证件号！", true);
		return false;
	}
	
	if($("#idType_" + r).val() == "31"
		&& $('#idNo_' + r).val() != ""){
			var identiyId = $("#idNo_" + r).val();
			if(identiyId.match(/^[a-zA-Z0-9]{8}[0-9|X]$/)!= null){
				removeTipMsg($(identiyNumWrap));
				return true;
			}else{
				showTipMsg($(identiyNumWrap), "组织机构代码证不正确,请重新输入！", true);
				return false;
			}
		}
	
	if (($("#idType_" + r).val() == "01" || $("#idType_" + r).val() == "02")
			&& $('#idNo_' + r).val() != "") {
		var showMsg = $("#idType_" + r).val() == "02" ?  "请输入正确的证件号码！" : "请输入正确的身份证号码！"  ;
		var identiyId = $("#idNo_" + r).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
		} else {
			showTipMsg($(identiyNumWrap), showMsg, true);
			return false;
		}
	}
	removeTipMsg($(identiyNumWrap));
	return true;
}
//检验被保人列表
function checkData(i) {

	if (!checkInsuredName('insuredName_' + i)) {// 被保险人姓名
		$("#insuredName_" + i).focus();
		return false;
	}
	if (!checkIdentifyNumber('idNo_' + i)) {// 被保险人证件号
		$("#idNo_" + i).focus();
		return false;
	}
	if (!checkInsuredBirthdayOnblur('birthDay_' + i)) {// 被保险人出生日期
		$("#birthDay_" + i).focus();
		return false;
	}
	return true;
}
function b(birthday){
	var currentTime = ""; 
	var myDate = new Date(); 
	var year = myDate.getFullYear(); 
	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
	if (month < 10) { 
	month = "0" + month.toString(); 
	} 
	var date = myDate.getDate(); 
	if (date < 10) { 
	date = "0" + date.toString(); 
	} 
	month = month-6;
	if(month==0){
		year = parseInt(year)-1;
		month = 12;
	}else if(month=='-1'){
		year = parseInt(year)-1;
		month = 11;
	}else if(month=='-2'){
		year = parseInt(year)-1;
		month = 10;
	}else if(month=='-3'){
		year = parseInt(year)-1;
		month = 09;
	}else if(month=='-4'){
		year = parseInt(year)-1;
		month = 08;
	}else if(month=='-5'){
		year = parseInt(year)-1;
		month = 07;
	}else if(month=='1'){
		 month = '01';
	}else if(month=='2'){
		month = '02';
	}else if(month=='3'){
		month = '03';
	}else if(month=='4'){
		month = '04';
	}else if(month=='5'){
		month = '05';
	}else if(month=='6'){
		month = '06';
	}
	currentTime = year.toString() + "/" + month.toString() + "/" + date.toString(); //以时间格式返回 
	birthday = replace(birthday,"-","/");
	if(birthday>currentTime){
		var birthWrap=$('#birthDayEAD').parent("li");
		$("#birthDayEAD").focus();
		showTipMsg($(birthWrap), "被保险人年龄需在6个月至65周岁之间！", true);
		return false;
	}
	removeTipMsg($(birthWrap));
	return true;
}
function validateEADriqi(){
	var currentTime = ""; 
	var myDate = new Date(); 
	var year = myDate.getFullYear(); 
	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
	if (month < 10) { 
	month = "0" + month.toString(); 
	} 
	var date = myDate.getDate(); 
	if (date < 10) { 
	date = "0" + date.toString(); 
	} 
	currentTime = year.toString() + "-" + month.toString() + "-" + date.toString(); //以时间格式返回 
	var startdate = currentTime;
	var birthday = $.trim($('#birthDayEAD').val());
	var birthWrap=$('#birthDayEAD').parent("li");
	if(!b(birthday)){
		return false;
	}
	
	if (!chkBirthday(65, 0, startdate, birthday)) {
			showTipMsg($(birthWrap), "被保险人年龄需在6个月至65周岁之间！", true);
			return false;
	}
	removeTipMsg($(birthWrap));
	return true;
}
function buyEAD(){
	$("#showDiv").parents('.page_content').attr("style","");
	$("#delete1").remove();
	$("#delete2").remove();
	var deleteCount = $("#insuredCount").val();
	for(var i = 1; i <=deleteCount ; i++) {
		var j = i+1;
		$("#delete3"+j).remove();
		$("#delete4"+j).remove();
	}
	if(!validateEADriqi()){
		return false;
	}
	var insuredCount=$("#insuredCount").val();
	for ( var i = 1; i <= insuredCount; i++) {
		if (!checkData(i)) {
			return false;
		}
	}
	//显示滚动条
	$("body").css("overflow","auto");
	var ctx = $("#ctx").val();
	$("#insuredAccidentFlag").val('1');
	var eadInsuredInfos = setEADInsuredInfosJson();
	//隐藏域存数据
	$("#EADJson").val(eadInsuredInfos);
	//几个被保险人
	$("#jigeInsured").val(p);
	//投了几份
	$("#jifen").val($("#quota").text());
	//EAD保费
	$("#eadsumPremium").val($("#eadFee2").text());
	
	var eadFee = $("#eadFee2").text();
	$("#eadFee").text(eadFee);
	$("#pno").text(p);
	$("#fenshu").text($("#quota").text());
	
	var quota = $("#quota").text();
	var quota1 = quota.substring(0,quota.length-1);
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/buyEAD",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			insuredAccidentFlag:"1",
			isRenewal:$("input[name='carInfo.isRenewal']").val(),
			insuredCount:quota1,
			eadInsuredInfos:eadInsuredInfos
		},
		dataType:"json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success:function(data){
			$(".show_img").hide();		//隐藏购买入口
			$("#agree").removeClass('checked');   //默认不勾选
			$("#allFee").text(data.sumPremium);
			$("input[name='carInfo.allFee']").val(data.sumPremium);
			$("#insuredAccidentFlag").val('1');
			$("#eadDiv").show();
			if(90 == eadPageFee){
				$('#newEADClause').show();	
			}
		}
	});
	$('.destination').animate({top:'100%'},function(){$('.destination').hide()});
	$('.coverMask').animate({top:'100%'},function(){$('.coverMask').hide()});
}


//确认页面跳转到报价页面
function backToFee(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/backCalculateFee");
	form.submit()
}
//跳转到车辆信息页面
function toCarInput(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carBackInput2");
	form.submit();
}
//跳转到车主信息页面
function toCarOwer(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carBackInput1");
	form.submit();
}
//跳转到保单寄送地址修改页面
function alertOwer(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/alertOwer");
	form.submit();
}
//跳转到保单寄送地址修改页面
function alertAdderss(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/alertAddress");
	form.submit();
}
//跳转到投保人修改页面
function alertApply(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/alertApply");
	form.submit();
}
//跳转到被保险人修改页面
function alertInsured(){
	//费改增加逻辑如果想修改被保险人性别或出生日期字段则影响算费因子，修改页面跳回基本信息填写页面
	if(document.getElementById("feigaiSex")){
		toCarOwer();
		return false;
	}
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/alertInsured");
	form.submit();
}
//跳转到保单生效日期修改页面
function alertStartDate(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	delEAD();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/alertStartDate");
	form.submit();
}
//数字转换为  多少多少万
function moneyW(num){
	if(num<10000){
		index = num;
	}else{
		var index = num.substring(0,num.length-4) + "万";
	}
	return index;
}
function reSetEADDiv(){
	$("#delete1").remove();
	$("#delete2").remove();
	var deleteCount = $("#insuredCount").val();
	for(var i = 1; i <=deleteCount ; i++) {
		var j = i+1;
		$("#delete3"+j).remove();
		$("#delete4"+j).remove();
	}
	var EADJson = $("#EADJson").val();
	if(EADJson!=""){
		var EADJson1 = eval("("+EADJson+")");
		var birthDayEAD = EADJson1[0].eadInsuredBirthday;
		var birthDayEAD1 = replace(birthDayEAD,"/","-");
		$("#birthDayEAD").val(birthDayEAD1);
		if(typeof($("#insuredName_1").val())=="undefined"){
		for(var p=1;p<EADJson1.length;p++){
			if(p==1){
	    		$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
	    				+ '<li><label>姓名</label><input type="text" value="'+EADJson1[p].insuredName+'" onblur="checkInsuredName(id)" id="insuredName_'+ p +'"/></li>'
	    				+ '<li class="right_arrow"><label>证件类型</label><select onchange="setData(id)" id="idType_'+ p +'"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
	                    + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
	    				+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)" onkeyup="this.value=this.value.toUpperCase()" id="idNo_'+ p +'" value="'+EADJson1[p].insuredIdNumber+'" maxlength="18"/></li>'
	    				+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onblur="checkInsuredBirthdayOnblur(id)"  class="beforetime"/></li>').insertAfter($('.right_arrow'));
	    		if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
	    			  $("#isDisk").hide();
	    		  }
	    	}else{
	    		if(p<9){
	    			var q = p-1;
	    			$('<li class="gradient_background"><h4 id="count_'+ p +'">被保险人'+ (p+1) +'</h4><input type="button" class="min_panel"/>'
	    					+ '<li><label>姓名</label><input type="text" onblur="checkInsuredName(id)" id="insuredName_'+ p +'" value="'+EADJson1[p].insuredName+'"/></li>'
	    					+ '<li class="right_arrow"><label>证件类型</label><select onchange="setData(id)" id="idType_'+ p +'"><option value="01" selected>身份证</option><option value="02">户口薄</option><option value="03">护照</option><option value="04">军官证</option><option value="05">驾驶执照</option>'
	                        + '<option value="06">返乡证</option><option value="07">港澳身份证</option><option value="31" id="isDisk">组织机构代码证</option><option value="99">其他</option>></select></li>'
	    					+ '<li><label>证件号码</label><input type="text" onblur="setIdentifySexandBirthday(id)" onkeyup="this.value=this.value.toUpperCase()" id="idNo_'+ p +'" value="'+EADJson1[p].insuredIdNumber+'" maxlength="18"/></li>'
	    					+ '<li class="right_arrow li_'+ p +'"><label>出生日期</label><input id="birthDay_'+ p +'" type="date" onbeforeunload="proCalendar(p)" class="beforetime"/></li>').insertAfter($('.li_'+ q));
	    			if(($("#proSelected").val()=="14000000")|| ($("#proSelected").val()=="13000000")||($("#switchOn_Off").val()=="0")){
	      			  $("#isDisk").hide();
	      		  }
	    		}else{
	    			return;
	    		}
	    	}
	    	var userAgent = window.navigator.userAgent;
		    if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("HTC Desire S Build/GRI40")>-1){proBirthDay(p);}
		    else if(userAgent.indexOf("UC")>-1 && userAgent.indexOf("MI 2 Build/JRO03L")>-1){proBirthDay(p);}
		    else if(userAgent.indexOf("UC")>-1){}
		    else if(userAgent.indexOf("Opera")>-1){}
		    else if(userAgent.indexOf("QQ")>-1&&userAgent.indexOf('iPhone')==-1){proBirthDay(p);}
		    else if(userAgent.indexOf("iPhone")>-1){}
		    else {proBirthDay(p);}
		    $("#insuredCount").val($('#jigeInsured').val()-1);
		}
		$("#p").val($('#jigeInsured').val());
		for(var i = 1; i < EADJson1.length; i++) {
			$("#idType_"+i).val(EADJson1[i].insuredIdType);
			var riqi = EADJson1[i].eadInsuredBirthday;
			var riqi1 = replace(riqi,"/","-");
			$("#birthDay_"+i).val(riqi1);
		}
		$("#eadFee2").text($("#eadsumPremium").val());
		var quota = $("#jifen").val();
		$("#quota").text(quota);
		quota = Number(quota.substring(0, quota.length-1));
		$("#saveId").text(quota*p*15);	
		}	
	}else{
		var _this=$(this);
		_this.parents('.page_content').nextAll('.mask').show().animate({top:'0'}).next('.push1').show().animate({top:'12%'});
		$("body").css("overflow","hidden");
		var insuredIdType = $("input[name='carInfo.insuredIdentifyType']").val();
		if(insuredIdType=="01"){
			var insuredIdentifyNumber = $("input[name='carInfo.insuredIdentifyNumber']").val();
			var insuredIdentifyNumber1 = insuredIdentifyNumber.substring(6,10);
			var insuredIdentifyNumber2 = insuredIdentifyNumber.substring(10,12);
			var insuredIdentifyNumber3 = insuredIdentifyNumber.substring(12,14);
			var insuredIdentifyNumber4 = insuredIdentifyNumber1+'-'+insuredIdentifyNumber2+'-'+insuredIdentifyNumber3;
			$('#birthDayEAD').val(insuredIdentifyNumber4);
			$('#birthDayEAD').attr("disabled", "disabled");
		}else{
	    	var currentTime = ""; 
	    	var myDate = new Date(); 
	    	var year = myDate.getFullYear(); 
	    	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
	    	if (month < 10) { 
	    	month = "0" + month.toString(); 
	    	} 
	    	var date = myDate.getDate(); 
	    	if (date < 10) { 
	    	date = "0" + date.toString(); 
	    	} 
	    	currentTime = year.toString() + "-" + month.toString() + "-" + date.toString(); //以时间格式返回 
	    	$('#birthDayEAD').val(currentTime);
		}
	}
	$("#showDiv").parents('.page_content').attr("style","position:fixed");
	$("#showDiv").parents('.page_content').nextAll('.coverMask').show().animate({top:'0'}).next('.push1').show().animate({top:'12%'});
}
function del(index) {
	var l=$(".gradient_background").length;
	$("#count_" + index).parent("li").remove();
	$(".error_tip").remove();
	$("#insuredName_" + index).parent("li").remove();
	$("#idType_" + index).parent("li").remove();
	$("#idNo_" + index).parent("li").remove();
	$("#birthDay_" + index).parent("li").remove();
	//记忆信息存在重新设置p
   	var EADJson = $("#p").val();
	if(EADJson!=""){
		var EADJson1 = $('#p').val();
		p = parseInt(EADJson1);
	}
	p = p-1;
	$("#insuredCount").val(l-1);
	$('#p').val(p);
	//更新人数保费
	for(var i=1;i<=l;i++){
		if(i<=index){
			continue;
		}
		var insuredInfo=$("#count_"+i).parent(".gradient_background");
		key=i-1;
//     修改添加模板的id
       	  $(insuredInfo).find("h4").attr({"id":"count_"+key});
       	  $(insuredInfo).find("h4").html("被保险人"+i)
       	  $(insuredInfo).next().find("input").attr({"id":"insuredName_"+key});
       	  $(insuredInfo).next().next().find("select").attr({"id":"idType_"+key});
       	  $(insuredInfo).next().next().next().find("input").attr({"id":"idNo_"+key});
       	  $(insuredInfo).next().next().next().next().find("input").attr({"id":"birthDay_"+key});
       	  $(insuredInfo).next().next().next().next().attr({"class":"right_arrow li_"+key});
	}
	var quota = $("#quota").text();
	quota = Number(quota.substring(0, quota.length-1));
	$("#eadFee2").text(quota*eadPageFee*p+'.00');
	$("#saveId").text(quota*p*15);		//节省
	$("#insurerDel").fadeOut();
}
//身份证校验
function isCardID(idcard){
	var Errors=new Array(
	"true",
	"请输入正确的身份证号",
	"请输入正确的身份证号",
	"请输入正确的身份证号",
	"请输入正确的身份证号"
	);
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var retflag=false;
	var idcard,Y,JYM;
	var S,M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	//地区检验
	if(area[parseInt(idcard.substr(0,2))]==null) return false;
	//身份号码位数及格式检验
	switch(idcard.length){
	case 15:
	if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 
	100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
	} else {
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
	}
	if(ereg.test(idcard)) 
	return Errors[0];
	else 
	{
	 //return Errors[2];
	 return false;
	}
	break;
	case 18:
	//18位身份号码检测
	//出生日期的合法性检查 
	//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
	//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
	if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && 
	parseInt(idcard.substr(6,4))%4 == 0 )){
	ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
	//闰年出生日期的合法性正则表达式
	} else {
	ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
	//平年出生日期的合法性正则表达式
	}
	if(ereg.test(idcard)){//测试出生日期的合法性
	//计算校验位
	S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
	+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
	+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
	+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
	+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
	+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
	+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
	+ parseInt(idcard_array[7]) * 1 
	+ parseInt(idcard_array[8]) * 6
	+ parseInt(idcard_array[9]) * 3 ;
	Y = S % 11;
	M = "F";
	JYM = "10X98765432";
	M = JYM.substr(Y,1);//判断校验位
	if(M == idcard_array[17]) return Errors[0]; //检测ID的校验位
	else return false;
	}
	else return false;
	break;
	default:
	return false;
	break;
	}
}
//将出生日期设为不可改
function setDisabled(r) {
	if (r != null) {
		$('#birthDay_' + r).attr("disabled", false);
	} else {
	}

}
//当输入正确的身份证号码时自动给出生日期和性别赋值
function setIdentifySexandBirthday(id) {
	
	

	var r = getIdIndex(id);

	if (!checkIdentifyNumber("idNo_" + r)) {
		return false;
	}
	if ($('#idType_' + r).val() == "01"
			&& $('#idNo_' + r).val() != "") {
		var identiyId = $("#idNo_" + r).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = $('#idNo_' + r).val();
			var sBirthday;
			if (sId.length == 15) {
				sBirthday = "19" + sId.substr(6, 2) + "-" + sId.substr(8, 2)
						+ "-" + sId.substr(10, 2);
			} else {
				sBirthday = sId.substr(6, 4) + "-" + sId.substr(10, 2) + "-"
						+ sId.substr(12, 2);
			}

			$('#birthDay_' + r).val(sBirthday);
			$('#birthDay_' + r).attr("disabled", "disabled");

			var wrap = $('#birthDay_' + r).parent("li");
			removeTipMsg($(wrap));
		}
	}
}
//当触发出生日期onblur时效验，此时不对日期为空加校验
function checkInsuredBirthdayOnblur(id) {
	var r = getIdIndex(id);
	if ($.trim($('#' + id).val()) == '') {
	}
	var currentTime = ""; 
	var myDate = new Date(); 
	var year = myDate.getFullYear(); 
	var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1 
	if (month < 10) { 
	month = "0" + month.toString(); 
	} 
	var date = myDate.getDate(); 
	if (date < 10) { 
	date = "0" + date.toString(); 
	} 
	currentTime = year.toString() + "-" + month.toString() + "-" + date.toString(); //以时间格式返回 
	var startdate = currentTime;
	var birthday = $.trim($('#' + id).val());
	var birthWrap=$("#"+id).parent("li");
	
	// 判断输入的出生日期是否与身份证一致
	if ($('#idType_' + r).val() == "01"
		&& $('#idNo_' + r).val() != "") {
		var identiyId = $("#idNo_" + r).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
		} else {
			setDisabled(r);
			return false;
		}
		var sId = $('#idNo_' + r).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "-" + sId.substr(8, 2) + "-"
					+ sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "-" + sId.substr(10, 2) + "-"
					+ sId.substr(12, 2);
		}
		var birthday = $('#' + id).val();
		if (sBirthday != birthday) {
			$('#' + id).val(sBirthday);
			showTipMsg($(birthWrap), "请确认出生日期与身份证一致！", true);
			return false;
		}
	}
	month = month-6;
	if(month==0){
		year = parseInt(year)-1;
		month = 12;
	}else if(month=='-1'){
		year = parseInt(year)-1;
		month = 11;
	}else if(month=='-2'){
		year = parseInt(year)-1;
		month = 10;
	}else if(month=='-3'){
		year = parseInt(year)-1;
		month = 9;
	}else if(month=='-4'){
		year = parseInt(year)-1;
		month = 8;
	}else if(month=='-5'){
		year = parseInt(year)-1;
		month = 7;
	}else if(month=='1'){
		 month = '01';
	}else if(month=='2'){
		month = '02';
	}else if(month=='3'){
		month = '03';
	}else if(month=='4'){
		month = '04';
	}else if(month=='5'){
		month = '05';
	}else if(month=='6'){
		month = '06';
	}
	currentTime = year.toString() + "/" + month.toString() + "/" + date.toString(); //以时间格式返回 
	birthday = replace(birthday,"-","/");
	if(birthday>currentTime){
		showTipMsg($(birthWrap), "被保险人年龄需在6个月至65周岁之间！", true);
		return false;
	}
	if (!chkBirthday(65, 0, startdate, birthday)) {
			showTipMsg($(birthWrap), "被保险人年龄需在6个月至65周岁之间！", true);
			return false;
	}
	removeTipMsg($(birthWrap));
	return true;
}
//限定年龄
function chkBirthday(topDate, bottomDate, startdate, birthday) {
	var _birthDate = birthday;
	if (isNaN(_birthDate)) {
		if (birthday.indexOf("-") > 0) {
			var aDate = birthday.split("-");
			birthday = aDate[1] + '/' + aDate[2] + '/' + aDate[0]
		}// 去除ios6以下版本兼容问题
		_birthDate = new Date(birthday);
	}
	if (startdate.indexOf("-") > 0) {
		var aDate = startdate.split("-");
		startdate = aDate[1] + '/' + aDate[2] + '/' + aDate[0]
	}// 去除ios6以下版本兼容问题
	var _currentDate = startdate;

	// 允许最大年
	var tmpTopDate = new Date(getNextYearFullDate(_currentDate, -topDate));
	// 允许最小年
	var tmpBottomDate = new Date(getNextYearFullDate(_currentDate, -bottomDate));

	birthMonth = _birthDate.getMonth() + 1;
	birthMonth = birthMonth > 9 ? birthMonth : ("0" + birthMonth);
	birDay = _birthDate.getDate();
	birDay = birDay > 9 ? birDay : ("0" + birDay);
	var birthDay = new Date(_birthDate.getFullYear() + "/" + birthMonth + "/"
			+ birDay);

	topMonth = tmpTopDate.getMonth() + 1;
	topMonth = topMonth > 9 ? topMonth : "0" + topMonth;
	topDay = tmpTopDate.getDate();
	topDay = topDay > 9 ? topDay : "0" + topDay;
	var tmpTopDate2 = new Date(tmpTopDate.getFullYear() + "/" + topMonth + "/"
			+ topDay);

	bottMoth = tmpBottomDate.getMonth() + 1;
	bottMoth = bottMoth > 9 ? bottMoth : "0" + bottMoth;
	bottDay = tmpBottomDate.getDate();
	bottDay = bottDay > 9 ? bottDay : "0" + bottDay;
	var tmpBottomDate2 = new Date(tmpBottomDate.getFullYear() + "/" + bottMoth
			+ "/" + bottDay);

	if (birthDay < tmpTopDate2 || birthDay > tmpBottomDate2) {
		return false;
	}
	return true;
}
//关闭对话框
function DialogClose(dom){
	$(dom).fadeOut();
	$(window).unbind('resize');	
	setTimeout(function(){},500)		
	return false;
}

//证件类型不是身份证的时候日期不disabled-
function setData(id) {
	var index = id.indexOf("_");
	index2 = id.substring(index + 1, id.length);
	if ($('#' + id).val() != "01") {
			$('#birthDay_' + index2).attr("disabled", false);
	}
	if($("#"+id+" option:selected").val()=="31" ){
		$("#idNo_"+index2+"").attr("maxlength","9");
		
	}else{
		$("#idNo_"+index2+"").attr("maxlength","18");
	}
	setIdentifySexandBirthday(id);
}
 
 //查找购买EAD配置规则
function findEADRuleConfigure(){
	var flag;
	var salesAreas=$("#citySelected").val();
	//ccaFlag 非团购，ccaID团购链接id  转成1  非团购 ，2 团购，3企业推广
	var ccaFlag=$("input[name='carInfo.ccaFlag']").val();//非团购
	var ccaId=$("input[name='carInfo.ccaId']").val();//团购链接id
	var businessType;
	if(typeof(ccaId)=='undefined' || ccaId==""){//非团购
		businessType="1";
	}else{//团购，如果有业务类型，就选择业务类型
		if ($("#ccaType").val() != "")
			businessType = $("#ccaType").val();
		else
			businessType = "2";
	}
	//承保流程 1 续保，2其它 isRenewal的值      转成   新保-1,续保-2
	var acceptProcess=$("input[name='carInfo.isRenewal']").val()=="1"?"2":"1";
	var ctx=$("#ctx").val();
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/findEadRuleService",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			salesAreas:salesAreas,
			businessType:businessType,
			acceptProcess:acceptProcess,
		},
		dataType:"json",
		async:false,
		success:function(data){
			var obj = eval('(' + data.message + ')');
			var purchase=obj.purchase;
			if(purchase=="true"){
				flag=true;
			}else if(purchase=="false"){
				flag=false;
			}
		}
	});
	return flag;
}


function buyOneEAD(){
	var insuredCount=$("#insuredCount").val();
	//显示滚动条
	$("body").css("overflow","auto");
	var ctx = $("#ctx").val();
	var eadInsuredInfos = setEADInsuredInfosJson();
	//隐藏域存数据
	$("#EADJson").val(eadInsuredInfos);
	//几个被保险人
	$("#jigeInsured").val(p);
	//投了几份
	$("#jifen").val($("#quota").text());
	//EAD保费
	$("#eadsumPremium").val($("#eadFee2").text());
	
	var eadFee = $("#eadFee2").text();
	$("#eadFee").text(eadFee);
	$("#pno").text(p);
	$("#fenshu").text($("#quota").text());
	
	var quota = $("#quota").text();
	var quota1 = quota.substring(0,quota.length-1);
	$.ajax({
		type:"post",
		url:ctx+"/carProposal/car/buyEAD",
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			sessionId:$("#sessionId").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			insuredAccidentFlag:"1",
			isRenewal:$("input[name='carInfo.isRenewal']").val(),
			insuredCount:quota1,
			eadInsuredInfos:eadInsuredInfos
		},
		dataType:"json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success:function(data){
			var common=data.common;
			var common1=eval('(' + common + ')');
			if(common1.resultCode==1){
				$(".new_module").show();
				$("#agree").removeClass('checked');   //默认不勾选
				$("#allFee").text(data.sumPremium);
				$("input[name='carInfo.allFee']").val(data.sumPremium);
				$("#insuredAccidentFlag").val('1');
				$("#eadDiv").show();
				if(90 == eadPageFee){
					$('#newEADClause').show();	
				}
				removeTipMsg($("#secretarySpan"));
			}else{//购买EAD失败
				changeToUnbuy();
			}
		}
	});
	$('.destination').animate({top:'100%'},function(){$('.destination').hide()});
	$('.coverMask').animate({top:'100%'},function(){$('.coverMask').hide()});
}

 function changeToUnbuy(){
 		$(".buy").attr("style","display: none;");
 		$(".no_buy").attr("style","display: black;");
   		$(this).hide();
		$(this).siblings().show();
		$(".new_module .add").css("color", "#999");
		$(".new_module .add span").css({
			"color" : "#999",
			"border" : "1px solid #999"
		});
		$('#showDiv').attr('disabled',"true");
		delEAD();
   }
 function changeToBuy(){
	 $(this).hide();
		$(this).siblings().show();
		$(".new_module .add").css("color", "#52a5cc");
		$(".new_module .add span").css({
			"color" : "#52a5cc",
			"border" : "1px solid #52a5cc"
		});
		$('#showDiv').removeAttr('disabled');
		delEAD();
}
   //2016-1-22 调用购买之前把旧数据删除、重新添加
function deletePreDetails(){
	$("#delete1").remove();
	$("#delete2").remove();
	var deleteCount = $("#insuredCount").val();
	for(var i = 1; i <=deleteCount ; i++) {
		var j = i+1;
		$("#delete3"+j).remove();
		$("#delete4"+j).remove();
	}
}

function delAllEADInsured() {
	for(var index=1;index<p;index++){
		var l=$(".gradient_background").length;
		$("#count_" + index).parent("li").remove();
		$(".error_tip").remove();
		$("#insuredName_" + index).parent("li").remove();
		$("#idType_" + index).parent("li").remove();
		$("#idNo_" + index).parent("li").remove();
		$("#birthDay_" + index).parent("li").remove();
		//记忆信息存在重新设置p
	   	var EADJson = $("#p").val();
		if(EADJson!=""){
			var EADJson1 = $('#p').val();
			p = parseInt(EADJson1);
		}
		p = p-1;
		$("#insuredCount").val(l-1);
		$('#p').val(p);
		//更新人数保费
		for(var i=1;i<=l;i++){
			if(i<=index){
				continue;
			}
			var insuredInfo=$("#count_"+i).parent(".gradient_background");
			key=i-1;
	//     修改添加模板的id
	       	  $(insuredInfo).find("h4").attr({"id":"count_"+key});
	       	  $(insuredInfo).find("h4").html("被保险人"+i)
	       	  $(insuredInfo).next().find("input").attr({"id":"insuredName_"+key});
	       	  $(insuredInfo).next().next().find("select").attr({"id":"idType_"+key});
	       	  $(insuredInfo).next().next().next().find("input").attr({"id":"idNo_"+key});
	       	  $(insuredInfo).next().next().next().next().find("input").attr({"id":"birthDay_"+key});
	       	  $(insuredInfo).next().next().next().next().attr({"class":"right_arrow li_"+key});
		}
		var quota = $("#quota").text();
		quota = Number(quota.substring(0, quota.length-1));
		$("#eadFee2").text(quota*eadPageFee*p+'.00');
		$("#saveId").text(quota*p*15);		//节省
		$("#insurerDel").fadeOut();
	}
}
//从数据库里查业务类型，放进隐藏域，
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
			console.log(data.message);
			$("#ccaType").val(data.message);
		}
	});
}
//点击确认购买eda按钮
function buyEADComfirm(){
	closeCue();
	$(".to_buy .no_buy").hide();
	$(".to_buy .buy").show();
	
	$(".new_module .add").css("color", "#52a5cc");
	$(".new_module .add span").css({
		"color" : "#52a5cc",
		"border" : "1px solid #52a5cc"
	});
	$('#showDiv').removeAttr('disabled');
	var flag=findEADRuleConfigure();
	var birthday = $.trim($('#insuredBirthday').val());//默认被保险人就是车辆被保险人
	if (birthday != "" && flag){
		buyOneEAD();
	}
}