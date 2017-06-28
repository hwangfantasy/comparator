/**
 * User: Phoenix
 * Date: 13-5-10
 * Time: 下午5:00
 * Car flow insurer & insured info
 */
$(function() {
    if ($("input[name='carInfo.appliPhoneNumber']").val() == "") {
        $("input[name='carInfo.appliPhoneNumber']").val($("input[name='carInfo.appliMobile']").val());
        $("#AppliPhoneNumber").val($("input[name='carInfo.appliMobile']").val());
    }

    if ($("input[name='carInfo.isRenewal']").val() == 1) {
        //手机号码隐藏
        var apphoneNo = $("input[name='carInfo.appliPhoneNumber']").val();
//		$("#jsPhone").val(apphoneNo);
        if ($("#isModify_s").val() != 1) {		//AppliPhoneNumber 2
            apphoneNo = apphoneNo.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
        }
        $("#AppliPhoneNumber").val(apphoneNo);
    }

    var mssFlag = $("input[name='carInfo.mssFlag']").val();
    if (mssFlag == "mss") {
        $("#nextStepDiv").hide();
        $("#stepDiv").hide();
    } else {
        $("#saveInfo").hide();
        //流程步骤
        if ($("input[name='carInfo.progressBar']").val() < 3) {
            $("input[name='carInfo.progressBar']").val(3);
        }
        if ($("input[name='carInfo.progressBar']").val() > 3) {
            $("#step_4").attr("data-status", "finished");
            if ($("input[name='carInfo.progressBar']").val() > 4) {
                $("#step_5").attr("data-status", "finished");
            }
        }
    }
    if ("" == $("input[name='carInfo.deliverInfoPro']").val()) {
        $("input[name='carInfo.deliverInfoPro']").val($("#proSelected").val());
    }
    if ("" == $("input[name='carInfo.deliverInfoCity']").val()) {
        $("input[name='carInfo.deliverInfoCity']").val($("#citySelected").val());
    }
    $(".home").click(function () {
        var ctx = $("#ctx").val();
        var form = $("#form");
        var mssFlag = $("input[name='carInfo.mssFlag']").val();
        if (mssFlag == 'mss') {
            form.attr("action", ctx + "/carProposal/car/carBack");
        } else {
            form.attr("action", ctx);
        }
        $("input[name='carCodex']").val('');	//置空 通过过滤
        form.submit();
    });

    var proS = $("#proSelected").val();
    //	是否需要电子保单控制
    // if(proS=="11000000"){
    // var state = $('#state').val();
    // if(state){
    //    var $isEpolicy = $('#isEpolicy');
    //    var $isEJQpolicy = $('#isEJQpolicy');
    //    var $policyE = $('#policy_e');
    //    var $policyP = $('#policy_p');
    //    var $policyJQE = $('#policy_jq_e');
    //    var $policyJQP = $('#policy_jq_p');
    //    var $policyEmail = $('#policyEmail');
    //
    //    if(!$policyEmail.val()){
    //        $policyEmail.val($("input[name='carInfo.appliEmail']").val());
    //    }
    //    if(state == '2' || state=='10' || state=='11' || state=='12' || state=='1' ||  state=='7' || state=='8' ||  state=='9' ){
    //        $isEpolicy.val('Y');
    //        if($policyE.length>0){
    //            $policyE.attr("checked",true);
    //        }
    //    }else if(state == '3' || state=='13' || state=='14' || state=='15'){
    //        $isEpolicy.val('N');
    //        if($policyE.length>0){
    //            $policyE.attr("checked",false);
    //        }
    //    }else if($policyE.length>0){
    //        $policyE.attr("checked",true);
    //    }
    //    if(state == '5' || state=='8' || state=='11' || state=='14' || state=='4' || state=='7' || state=='10' || state=='13'){
    //        $isEJQpolicy.val('Y');
    //        if($policyJQE.length>0){
    //            $policyJQE.attr("checked",true);
    //        }
    //    }else if(state == '6' || state=='9' || state=='12' || state=='15'){
    //        $isEJQpolicy.val('N');
    //        if($policyJQE.length>0){
    //            $policyJQE.attr("checked",false);
    //        }
    //    }else if($policyE.length>0){
    //        $policyJQE.attr("checked",true);
    //    }


    // if($isEpolicy.val()){
    //     if($isEpolicy.val() == 'Y'){
    //         $("#policy_e").attr("checked",true);
    //         if($("#policyEmail").val()==""){
    //             $("#policyEmail").val($("input[name='carInfo.appliEmail']").val());
    //         }
    //     }else{
    //         $("#policy_e").attr("checked",false);
    //     }
    // }else{
    //     $isEpolicy.val('Y');
    // }
    // if($("#policy_e").length>0 && $("#policy_p").length>0){
    //     if($("#isEpolicy").val()=="" || $("#isEpolicy").val()==null){
    //         $("#isEpolicy").val('Y');
    //     }
    //     if($("#isEpolicy").val()=='Y'){
    //         $("#policy_e").attr("checked",true);
    //         if($("#policyEmail").val()==""){
    //             $("#policyEmail").val($("input[name='carInfo.appliEmail']").val());
    //         }
    //     }else{
    //         $("#policy_e").attr("checked",false);
    //     }
    // }else{
    //
    // }
    // if($("#policy_jq_e").length>0 && $("#policy_jq_p").length>0){
    //     if($("#isEJQpolicy").val()==""||$("#isEJQpolicy").val()==null){
    //         $("#isEJQpolicy").val('Y');
    //     }
    //     if($("#isEJQpolicy").val()=='Y'){
    //         $("#policy_jq_e").attr("checked",true);
    //         if($("#policyEmail").val()==""){
    //             $("#policyEmail").val($("input[name='carInfo.appliEmail']").val())
    //         }
    //     }else{
    //         $("#policy_jq_e").attr("checked",false);
    //     }
    // }
    // }
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
        if (content) {
            $('.dialog-cont').find('p').html('<i></i>' + content);
            $('.mask').show();
            $('.dialog').show();
        }
    });
    $('.dialog-close').click(function () {
        $('.mask').hide();
        $('.dialog').hide();
    });
	//邮箱检验
	$("#policyEmail").blur(function(){
		checkCarItemEmail($("#policyEmail"));
	});
	//保单寄送地址
	var ctx = $("#ctx").val();
	var flagAdd = "";//全国送单的一个标志
	if(proS=="44030000"){
		proS = "44000000"
	}
	if(proS=="37020000"){
		proS = "37000000"
	}
	if(proS=="21020000"){
		proS = "21000000"
	}
	$.ajax({
		    url:ctx+"/carProposal/address/getPro",
		    data:{
	    		channelNo:$("input[name='head.channelNo']").val(),
		    	proSelected:proS,
		    	citySelected:$("#citySelected").val(),
		    	isRenewal:$("input[name='carInfo.isRenewal']").val(),
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
				if((json.body.areaList).length>1){
					$("#proAddrAll").show();
					$("#proAddr").hide();
					var proAddrAll = "<option value='0'>请选择</option>";
					
						for(var i=0; i<(json.body.areaList).length; i++){
							proAddrAll = proAddrAll + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
						}
					$("#proAddrAll").html(proAddrAll)
					var deliverInfoPro = $("input[name='carInfo.deliverInfoPro']").val();
					$("#proAddrAll").val(deliverInfoPro)
					flagAdd = 1;
					
				}else{
					$("#proAddr").html(json.body.areaList[0].value)
					if($("#proSelected").val()=="11000000"||$("#proSelected").val()=="12000000"||$("#proSelected").val()=="50000000"||$("#proSelected").val()=="31000000"){
			        	   $("input[name='carInfo.queryCityCode']").val(json.body.areaList[0].code+"00");
			           }
				}
	           
	        }
	    });
		var pro = $("#proSelected").val();
		if(flagAdd == 1){
			 pro = $("#proAddrAll").val()+"00";
		}
		
		if(pro!="11000000"&&pro!="12000000"&&pro!="50000000"&&pro!="31000000"){
			$.ajax({
				url:ctx+"/carProposal/address/getCity",
				data:{
					proSelected:$("#proSelected").val(),
					citySelected:$("#citySelected").val(),
					isRenewal:$("input[name='carInfo.isRenewal']").val(),
					ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
					xubaocomcode:$("input[name='carInfo.xubaocomcode']").val(),
					enrolldate:$("input[name='carInfo.enrollDate']").val(),
					startdate:$("input[name='carInfo.startDateSY']").val(),
					targetProvince:pro,
					sessionId:$("#sessionId").val()
					},
				type:'post',
				async:false,
				dataType:'json',
				success: function(data) {
					var json = data.message;
					json = eval("("+json+")");
					if(flagAdd == 1){
						$("#cityAddrAll").show();
						$("#cityAddr").hide();
						var cityAddrAll = "<option value='0'>请选择</option>";
						if($("input[name='carInfo.deliverInfoPro']").val()!=""&&json.body.areaList){
							for(var i=0; i<(json.body.areaList).length; i++){
								cityAddrAll = cityAddrAll + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
							}
						}
						$("#cityAddrAll").html(cityAddrAll)
						$("#cityAddrAll").val($("input[name='carInfo.deliverInfoCity']").val())
						
					}else{
						$("#cityAddr").html(json.body.areaList[0].value);
						$("input[name='carInfo.queryCityCode']").val(json.body.areaList[0].code+"00");
					}
						
					if(pro=="46000000"){
						$("#ifcountyNo").remove()
					}
				}
			});
		}else{
			$("#ifCityNo").remove();
		}
		var city = $("input[name='carInfo.queryCityCode']").val()
		if(flagAdd == 1){
			 city = $("#cityAddrAll").val()+"00";
			if($("#cityAddrAll").length==0){
				city = $("#proAddrAll").val()+"00";
			}
		}
		if(pro!="46000000"){
			
		$.ajax({
			url:ctx+"/carProposal/address/getCountry",
			data:{
				channelNo:$("input[name='head.channelNo']").val(),
				proSelected:$("#proSelected").val(),
				citySelected:$("#citySelected").val(),
				isRenewal:$("input[name='carInfo.isRenewal']").val(),
				ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
				xubaocomcode:$("input[name='carInfo.xubaocomcode']").val(),
				enrolldate:$("input[name='carInfo.enrollDate']").val(),
				startdate:$("input[name='carInfo.startDateSY']").val(),
				targetCity:city,
				sessionId:$("#sessionId").val()
			},
			type:'post',
			async:false,
			dataType:'json',
			success: function(data) {
				var json = data.message;
				json = eval("("+json+")");
				var country = "<option value='0'>请选择</option>";
				if($("#cityAddrAll").find("option:selected").text() == "请选择"||$("#proAddrAll").find("option:selected").text() == "请选择"){
					$("#deliverInfoDistrict").html(country);
					return false;
				}
				if((json.body.areaList).length=="0"){
					$("#ifcountyNo").remove()
				}
				for(var i=0; i<(json.body.areaList).length; i++){
					country = country + "<option value="+json.body.areaList[i].code+" msg="+json.body.areaList[i].message+">"+json.body.areaList[i].value+"</option>"
					if($("input[name='carInfo.deliverInfoDistrict']").val()==json.body.areaList[i].code){
						$(".input_tips").html(json.body.areaList[i].message)
					}
				}
				$("#deliverInfoDistrict").html(country)
				$("#deliverInfoDistrict").val($("input[name='carInfo.deliverInfoDistrict']").val());
			}
		});
		}
	var userAgent = window.navigator.userAgent; 
	if(userAgent.indexOf("UC")>-1){ 
	$("#proAddr").addClass("ellipsis") 
	$("#cityAddr").addClass("ellipsis") 
	} 
	else 
	{ 
	$("#proAddr").addClass("scrolling") 
	$("#cityAddr").addClass("scrolling") 
	}
	
	//费改地区性别和出生日期处理
	$("#InsuredIdentifSexOnePage label span").click(function() {//费改性别选择
		if($(this).attr("class").indexOf("radioed") <= 0){
			$("#man").removeClass("radioed");
			$("#woman").removeClass("radioed");
			$(this).addClass("radioed");
			$("#insuredIdentifSex").val($(this).attr("value"));
			removeInvalidTips($("#InsuredIdentifSexOnePage"));
		}
	});
	
	if($("#InsuredIdentifSexOnePage").length>0){
		if($("#insuredIdentifSex").val()=="1"){
			$("#man").click();
		}
		if($("#insuredIdentifSex").val()=="2"){
			$("#woman").click();
		}
		$("#birthDayCar").val(replace($("#insuredBirthday").val(),"/","-"))
		if($("#IdentifyType").val()=="01"){
	    	$("#birthDayCar").attr("disabled","disabled");
	    	$("#over_InsuredIdentifSexOnePage").show();
	    }
	}
	
	
	//被保险人证件类型处理
    if($("#IdentifyType").val()==""||$("#IdentifyType").val()==null){
    	$("#IdentifyType").val($("input[name='carInfo.taxpayertype']").val())
    	$("#InsuredIdentifyType").val($("input[name='carInfo.taxpayertype']").val())
    }else{
    	$("#InsuredIdentifyType").val($("#IdentifyType").val());
    }
	//如果初来时   纳税人有证件号则带出
	if($("#InsuredIdentifyNumber").val()==""){
		if($("input[name='carInfo.taxPayerIdentNo']").val()!=""){
			$("#InsuredIdentifyNumber").val($("input[name='carInfo.taxPayerIdentNo']").val())
		}
	}
    $("select").bind('change', function() {
        $($(this).attr("data-related")).focus();
    });
    //返回上一步事件绑定
    $("#confirmInfoPrevStep").bind('click',function(){
    	//寄送地址拼接
    	var address = $("#proAddr").text()+$("#cityAddr").html()+$("#deliverInfoDistrict").find("option:selected").text()+$("#deliverInfoAddress").val();
    	if($("#proAddrAll").is(":visible")){
    		address = $("#proAddrAll").find("option:selected").text()+$("#cityAddrAll").find("option:selected").text()+$("#deliverInfoDistrict").find("option:selected").text()+$("#deliverInfoAddress").val();
    	}
    	$("input[name='carInfo.appliAddress']").val(address)
    	var ctx = $("#ctx").val();
    	var form = $("#form");
    	$("input[name='carCodex']").val('');
    	form.attr("action",ctx+"/carProposal/car/backCalculateFee");
    	form.submit();
    });
    //姓名为空时用车主姓名
    if($("#InsuredName").val()==''){
    	$("#InsuredName").val($("input[name='carInfo.carOwner']").val());
    }
    if($("#AppliAddName").val()==''){
    	$("#AppliAddName").val($("input[name='carInfo.carOwner']").val());
    }
    
    //保单寄送地址县区处理
    $("#deliverInfoDistrict").bind('change',function(){
    	$("input[name='carInfo.deliverInfoDistrict']").val($("#deliverInfoDistrict").val());
    });
    if($("input[name='carInfo.deliverInfoDistrict']").val()==""||$("input[name='carInfo.deliverInfoDistrict']").val()==null){
    	
    }else{
    	$("#deliverInfoDistrict").val($("input[name='carInfo.deliverInfoDistrict']").val());
    }
    //被保险人证件地址处理
    $("#InsuredIdentifyAddr").bind('blur',function(){
    	$("input[name='carInfo.insuredIdentifyAddr']").val($("#InsuredIdentifyAddr").val());
    })
    if($("input[name='carInfo.insuredIdentifyAddr']").val()!=""||$("input[name='carInfo.insuredIdentifyAddr']").val()!=null){
    	$("#InsuredIdentifyAddr").val($("input[name='carInfo.insuredIdentifyAddr']").val());
    }
    //街道地址处理
    $("#deliverInfoAddress").bind('blur',function(){
    	if(mssFlag != "mss"){	//非远销
	    	var appliAddress = $("#deliverInfoAddress").val();
	        if(trim(appliAddress) == ""){
	        	showInvalidTips($("#deliverInfoAddress").parents(".form_set_box"), "请输入详细配送地址！", true, $("#deliverInfoAddress"));
	        }else{
	        	removeInvalidTips($("#deliverInfoAddress").parents(".form_set_box"));
	        }
    	}
    	$("input[name='carInfo.deliverInfoAddress']").val($("#deliverInfoAddress").val());
    })
    if($("input[name='carInfo.insuredIdentifyAddr']").val()!=""||$("input[name='carInfo.deliverInfoAddress']").val()!=null){
    	$("#deliverInfoAddress").val($("input[name='carInfo.deliverInfoAddress']").val());
    }
    //与投保人关系处理
    $("#insuredAndOwnerrelate").bind('change',function(){
    	$("input[name='carInfo.insuredAndOwnerrelate']").val($("#insuredAndOwnerrelate").val());
    })
    centerSelect('insuredAndOwnerrelate')
    if($("input[name='carInfo.insuredAndOwnerrelate']").val()!=""||$("input[name='carInfo.insuredAndOwnerrelate']").val()!=null){
    	$("#insuredAndOwnerrelate").val($("input[name='carInfo.insuredAndOwnerrelate']").val());
    }
//    $("input[name='carInfo.insuredAndOwnerrelate']").val($("#insuredAndOwnerrelate").val());
    //争议解决方式处理
    $("#argueSolution").bind('change',function(){
    	if($("#argueSolution").val()=="1"){
    		$("#arbitBoardNameDiv").slideUp();
    	}else{
    		if($("#citySelected").val() != "44030000"){ //wap-3403
    			$("#arbitBoardNameDiv").show();
    			centerSelect('arbitBoardName');
    		}
    	}
    	$("input[name='carInfo.argueSolution']").val($("#argueSolution").val());
    	if($("#argueSolution").val()!='1'){
    		$("input[name='carInfo.arbitboardname']").val($("#arbitBoardName").val());
    	}
    })
    if($("#argueSolution").length>0){
    	var argueOptions = ($("#getArgueSolution").val()).split("|");
    	var option = "";
    	var argueOption = "";
    	for(var i=0;i<argueOptions.length;i++){
			argueOption = argueOptions[i].split(",");
			option+="<option value="+argueOption[0]+">"+argueOption[1]+"</option>";
    	}
    	$("#argueSolution").html(option);
    	var optionStr = "<option value="+$("#getArbitBoardName").val()+">"+$("#getArbitBoardName").val()+"</option>";
    	$("#arbitBoardName").html(optionStr);
    	
    	if($("input[name='carInfo.argueSolution']").val()!=""&&$("input[name='carInfo.argueSolution']").val()!=null){
        	$("#argueSolution").val($("input[name='carInfo.argueSolution']").val());
        }else{
        	$("input[name='carInfo.argueSolution']").val($("#argueSolution").val());
        }
        if($("#argueSolution").val()=="1"){
    		$("#arbitBoardNameDiv").hide();
    	}else{
    		if($("#citySelected").val() != "44030000"){ //wap-3403
    			$("#arbitBoardNameDiv").show();
    			centerSelect('arbitBoardName');
    		}
    	}
        centerSelect('argueSolution');
    }
    
    
    $("#InsuredName").blur(function(){//被保险人名字验证
    	 if(mssFlag != "mss"){
    		 checkInsuredName_input($("#InsuredName"));
    	 }
    	 //第一次修改给收件人赋值
    	 $("#AppliAddName").val($("#InsuredName").val())
    	 var appliName = $("input[name='carInfo.appliName']").val();
    	 var InsuredName = $("#InsuredName").val();
    	 if( InsuredName == appliName){
        	 $("#InvoiceTitle").val(appliName);
        	 $("#InvoiceTitle").show();
        	 $("#InvoiceTitle_select").hide();
    	 }else{
    		 $("#insNameTitle").html(InsuredName);
 			 $("#insNameTitle").attr("value",InsuredName);
        	 $("#InvoiceTitle").hide();
        	 $("#InvoiceTitle_select").show();
    	 }
    });
    $("#InsuredIdentifyType").change(function(){//证件号验证
    	var IdentifyNo = trim($("#InsuredIdentifyType").val());
    	//河南地区政策，异地车承保必须使用当地车主身份证
    	if("41".indexOf($("input[name='carInfo.citySelected']").val().substring(0, 2)) > -1 && $("input[name='carInfo.isNewCar']").val()==1 && $("input[name='carInfo.licenseNo']").val().indexOf("豫")==-1 && $("#InsuredIdentifyType").val()!= "01"){
    		showInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"), "请使用身份证进行投保！", true, $("#InsuredIdentifyType"));
    		return false;
    	}
    	var msg = "";
    	if($("#InsuredIdentifyType").val() == "01"){
    		msg = isCardID_new(IdentifyNo);
    		if(trim(msg) == "true"){
    			removeInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"));
    			return "true";			
    		}else{
    			showInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"), msg, true, $("#InsuredIdentifyType"));
    			return false;
    		}
    	}
    	removeInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"));
    });
    $("#InsuredIdentifyNumber").blur(function(){//证件号验证
    	if(mssFlag != "mss"){	//非远销
    		checkInsuredIdentifyNumber($("#InsuredIdentifyNumber"));
    	}
     });
    $("#AppliAddName").blur(function(){
    	if(mssFlag != "mss"){
		 	var appliAddName = $("#AppliAddName").val();
	        if(trim(appliAddName) == ""){
	        	showInvalidTips($("#AppliAddName").parents(".form_set_box"), "请输入收件人姓名！", true, $("#AppliAddName"));
	        }else{
	        	removeInvalidTips($("#AppliAddName").parents(".form_set_box"));
	        }
    	}
     });
    $("#AppliPhoneNumber").blur(function(){
    	if(mssFlag != "mss"){
    		checkCarItemMobile($("#AppliPhoneNumber"));
    	}
	}).change(function(){	//onchange 方法，还缺几个
		 $("#isModify_s").val(1);
	});
    
    //发票抬头事件绑定
    $("#InvoiceTitle").focus(function(){
	 }).blur(function(){
		if(mssFlag != "mss"){
		 	var invoiceTitle = $("#InvoiceTitle").val();
	        if(trim(invoiceTitle) == ""){
	        	showInvalidTips($("#InvoiceTitle").parents(".field_wrap"), "请输入发票抬头！", true);
	        }else{
	        	removeInvalidTips($("#InvoiceTitle").parents(".field_wrap"));
	        }
		}
     });
  //下一步的绑定
    $("#insurerInfoNextStep").click(function(){
		
		if(!checkWxInsuredInputNextStep()){//进行校验
			return false;
		}
		//如果投保人姓名为空，赋值为车主姓名
	    if($("input[name='carInfo.appliName']").val()==""){
	    	$("input[name='carInfo.appliName']").val($("#InsuredName").val());
	    }
	    if($("input[name='carInfo.insuredMobile']").val()==""){
	    	$("input[name='carInfo.insuredMobile']").val($("input[name='carInfo.appliMobile']").val());
	    }
	    if($("input[name='carInfo.insuredEmail']").val()==""){
	    	$("input[name='carInfo.insuredEmail']").val($("input[name='carInfo.appliEmail']").val());
	    }
	    if($("input[name='carInfo.appliIdentifyType']").val()==""){
	    	$("input[name='carInfo.appliIdentifyType']").val($("input[name='carInfo.insuredIdentifyType']").val());
	    }
	    if($("input[name='carInfo.appliIdentifyNumber']").val()==""){
	    	$("input[name='carInfo.appliIdentifyNumber']").val($("input[name='carInfo.insuredIdentifyNumber']").val());
	    }
	    
	    if($("#isModify_s").val()==1){ //当有修改时
	    	$("input[name='carInfo.appliPhoneNumber']").val($("#AppliPhoneNumber").val());
	    }else{
	    	if($("input[name='carInfo.isRenewal']").val()!=1){	//当非续保时
		    	$("input[name='carInfo.appliPhoneNumber']").val($("#AppliPhoneNumber").val());
		    }
	    }
	    
		//寄送地址拼接
    	var address = $("#proAddr").html()+$("#cityAddr").text()+$("#deliverInfoDistrict").find("option:selected").text()+$("#deliverInfoAddress").val();
    	if($("#proAddrAll").is(":visible")){
    		address = $("#proAddrAll").find("option:selected").text()+$("#cityAddrAll").find("option:selected").text()+$("#deliverInfoDistrict").find("option:selected").text()+$("#deliverInfoAddress").val();
    	}
    	$("input[name='carInfo.appliAddress']").val(address);
    	if($("#invoice_e,invoice_p").length > 0){//判断是否存在发票选项
    		if($('#invoice_e').hasClass('active')){
    			$("#invoiceflag").val("E");
    		}else if($('#invoice_p').hasClass('active')){
        		$("#invoiceflag").val("P");
    		}else{
        		$("#invoiceflag").val("N");
    		}
    	}else{//没有默认纸质发票
    		$("#invoiceflag").val("P");
    	}
    	var form = $("#form");
    	var ctx = $("#ctx").val();
    	var mobileWrap = $("#AppliMobile").parents(".field_wrap");
    	var mobile;
    	if($("input[name='carInfo.isRenewal']").val()==1){	//续保时
    		if($("#isModify_s").val()==1){		//被修改时
    			mobile = $("#AppliPhoneNumber").val();
    		}else{
    			mobile = $("input[name='carInfo.appliMobile']").val();
    		}
    	}else{
    		mobile = $("#AppliPhoneNumber").val();
    	}
    	if(!$("#arbitBoardName").is(":visible")){
    		$("input[name='carInfo.arbitboardname']").val("");
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
    			  		showInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"), "请输入其他的手机号!", true, $("#AppliPhoneNumber"));
    			  	}
    			  	else{
    			  		removeInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"));
    			  		$("input[name='carCodex']").val('');
    			  		zanCun();
    			    	form.submit();
    			  	}
    			  }
    	});
    	
	});
//    textLength("AppliAddName")
//	//续保时
//	if($("input[name='carInfo.isRenewal']").val()==1){
//		mobile = $("#AppliPhoneNumber").val();
//		var mobile1 = mobile.substr(0,3)+"****"+mobile.substr(7);
//		$("#AppliPhoneNumber").val(mobile1);
//	}
	var repairLoc=$("#repair").val();
	var optionStr="";
	repairLoc=eval('('+repairLoc+')');
	if(repairLoc.majorCityFlag==1){//核保接口返回的majorCityFlag  如果为1 ，指定专修厂不显示地区
		var majorName = (repairLoc.majorName).split("|");
		$("#repairLocDiv").show();
		$("#specMaintenance").hide();
		$("#repairNameCss").css("width","96%")
		var option = "";
		option = "<option value=' '>未选择</option>";
		 for(var i=0;i<majorName.length;i++){
			 var name = majorName[i];
				option+="<option>"+name+"</option>";
		  }
		$("#repairName").html(option);
		$("input[name='carInfo.majorFactoryName']").val($("#repairName").find("option:selected").text());
	}else{
		if(repairLoc.has050252=="has050252==1"){
			optionStr="<option value='0'>请选择</option>";
			$("#repairName").html("<option value='0'>请选择</option>");
			$("#repairLocDiv").show();
			var arr = new Array();
			arr=repairLoc.majorCity.split("|");
			for(var i=0;i<arr.length;i++){
			var num = arr[i].indexOf(",");
				var repairVal=arr[i].substring(0,num);
				var repairName=arr[i].substr(num+1);
				optionStr+="<option value="+repairVal+">"+repairName+"</option>"
			}
			$("#repairLoc").html(optionStr);
			$("#repairLoc").val($("input[name='carInfo.majorFactoryAddress']").val());
			if($("input[name='carInfo.majorFactoryName']").val()!=""){
				$("#repairName").find("option").text($("input[name='carInfo.majorFactoryName']").val());
			}
		}
	}
	$("#repairName").bind("change",function(){
		var num = $("#repairName").find("option:selected").text();
		$("input[name='carInfo.majorFactoryName']").val(num);
	})
	$("#repairLoc").bind("change",function(){
		if($("#repairLoc").val()=="0"){
			removeInvalidTips($("#repairLoc").parents(".spec_maintenance"));
			 $("#repairName").html("<option value='0'>请选择</option>");
			}else{
		removeInvalidTips($("#repairLoc").parents(".spec_maintenance"));
		var repairLoc=$("#repairLoc").val()+"00";
		$.ajax({
			  url:ctx+"/carProposal/underWrite/repairName",
			  type:"post",
			  data: {
				  repairLoc:repairLoc,
				  sessionId: $("#sessionId").val()
			         },
			  dataType:"json",
		  success: function(data)
			 {
			  var array = new Array();
			  var option ="";
			  if(data.resultCode=='1'){
				  array = data.resultMsg.split("|");
				  for(var i=0;i<array.length;i++){
						var name=array[i];
						option+="<option>"+name+"</option>";
				  }
				  $("#repairName").html(option);
				  $("input[name='carInfo.majorFactoryName']").val($("#repairName").find("option:selected").text());
				  $("#repairName").bind("change",function(){
					  $("input[name='carInfo.majorFactoryName']").val($("#repairName").find("option:selected").text());
				  })
			  }else{
				  $("#repairName").html("");
				  $("input[name='carInfo.majorFactoryName']").val("");
				  showInvalidTips($("#repairLoc").parents(".spec_maintenance"), "您选择的地区无指定专修厂！", true, $("#repairLoc"));
			  }
			  }
	});
			}
		if($("#repairLoc").val()!='0'){
			$("input[name='carInfo.majorFactoryAddress']").val($("#repairLoc").val());
		}
		
	})
	

	//营改增发票抬头初始化规则
	{
		$("#InvoiceTitle_select").bind("change",function(){
			if("appNameTitle" == $("#InvoiceTitle_select option:selected").attr("id")){
				$("#invoiceHeadFlag").val("0");
			}else if("insNameTitle" == $("#InvoiceTitle_select option:selected").attr("id")){
				$("#invoiceHeadFlag").val("1");
			}
		});
		
		var proSelected = $("#proSelected").val();
		var citySelected = $("#citySelected").val();
		if(proSelected=="44000000" && citySelected!="44010000"){
			if($("input[name='carInfo.appliName']").val()!=""){
				$("#InvoiceTitle").val($("input[name='carInfo.appliName']").val());
			}
		}
		if(proSelected=="44030000"){
			if($("input[name='carInfo.appliName']").val()!=""){
				$("#InvoiceTitle").val($("input[name='carInfo.appliName']").val());
			}
		}
		if(proSelected=="21000000"||proSelected=="34000000"){
			$("#InvoiceTitle").val($("#InsuredName").val());
		}
		if(document.getElementById("InsuredIdentifSexOnePage")){//如果含有性别字段则判定为费改地区，信息不可修改
			$("#InsuredName").attr("readonly",true);
			$("#InsuredIdentifyNumber").attr("readonly",true);
			$("#overInsuredIdentify").show();
		}
		if("" == $("input[name='carInfo.appliName']").val()){
			$("input[name='carInfo.appliName']").val($("input[name='carInfo.carOwner']").val());
			$("#appNameTitle").attr("value",$("input[name='carInfo.appliName']").val());
			$("#appNameTitle").html($("input[name='carInfo.appliName']").val());
		}
		var appliName = $("input[name='carInfo.appliName']").val();
		var InsuredName = $("#InsuredName").val();
		if( appliName == InsuredName ){
			$("#InvoiceTitle").val(InsuredName);
		}else{
			$("#InvoiceTitle").hide();
			$("#InvoiceTitle_select").show();
		}
	}
	//点击发票问号  弹层
	$("#wenhao").click(function(){
		$("#EfapiaoDialog").removeClass("hidden");
	});
	$("#EfapiaoDialogClose").click(function(){
		$("#EfapiaoDialog").addClass("hidden");
	})
	
});
//郊远区县显示提示语问题
function showMsg(){
	var obj=document.getElementById("deliverInfoDistrict");    
    var index=obj.selectedIndex;   
    var msg=obj.options[index].getAttribute("msg");    
    //上面过程就是把select >> option >> path 值 取出来,是自定义的path  
    $(".input_tips").html(msg);
    if($("input[name='carInfo.isRenewal']").val()=="1"){
    	$("input[name='carInfo.postCode']").val('');
    }
}
/*
* Description: 校验被保险人
* Parameter: 
* Author:zpy
*/
function checkInsuredName_input(obj){
	var msg = ""
	msg = trim(checkInsuredName(obj));
//	if(msg == "true"){
	if(msg == "成功"){
		removeInvalidTips($("#InsuredName").parents(".form_set_box"));
		return true;
	}else{
		showInvalidTips($("#InsuredName").parents(".form_set_box"), msg, true, $("#InsuredName"));
		return false;
	}
}
/*
* Description: 被保险人姓名
* Parameter: 
* Author:zpy
*/
function checkInsuredName(obj){
	var insuredName = obj.val();
	var msg="";
	var ctx = $("#ctx").val();
	$.ajax({
		url:ctx+"/carProposal/Verify/insuredName",
		type:"post",
		async:false,
		data:{
    		channelNo:$("input[name='head.channelNo']").val(),
			proSelected:$("#proSelected").val(),
			citySelected:$("#citySelected").val(),
			insuredName:insuredName,
			isRenewal:$("#isRenewal").val(),
			sessionId:$("#sessionId").val()
		},
		dataType:"json",
		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		success:function(data){
//			alert(JSON.stringify(data))
			msg = data.resultMsg;
		}
	});
//	if(trim(insuredName)==""){
//		msg = "请输入被保险人姓名！";
//		return msg;
//	}
//	if(insuredName.indexOf("'")>-1 ){
//		msg = "请输入正确的被保险人姓名！";
//		return msg;
//	}
//	var pro = $("#proSelected").val();
//	if (pro == "62000000") {// 甘肃
//		var len=getLength(insuredName);
//		if (len > 10) {
//			msg = "被保险人必须为自然人。";
//			return msg;
//		}
//	}
//	if(insuredName.indexOf("'")>-1 ){
//		msg = "请输入正确的被保险人姓名！";
//		return msg;
//	}
	
//	return "true";
	return msg;
}
/*
* Description: 校验被保险人证件号码
* Parameter: 
* Author: zpy 
*/
function checkInsuredIdentifyNumber(obj){
	var msg = ""
	var IdentifyType = $("#InsuredIdentifyType").val();
	msg = trim(checkIdentifyNum(obj,IdentifyType));
	if(msg == "true"){
		removeInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"));
	}else{
		if(msg=="请输入证件号码！"){
			msg = "请输入被保险人证件号码！";
		}
		showInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"), msg, true, $("#InsuredIdentifyType"));
		return false;
	}
	var flag = true;
//	if(IdentifyType == "01"){	//身份证黑名单校验
		var ctx = $("#ctx").val();
		$.ajax({
			  url:ctx+"/carProposal/underWrite/identifyBlackList",
			  type:"post",
			  data: {
		    		channelNo:$("input[name='head.channelNo']").val(),
				    proSelected:$("#proSelected").val(),	//省代码
				    citySelected:$("#citySelected").val(),	//市代码	
				    licenseno:$("input[name='carInfo.licenseNo']").val(),  
	                engineno:$("input[name='carInfo.engineNo']").val(),
	                frameno:$("input[name='carInfo.frameNo']").val(),
	                identify:obj.val(),		//纳税人身份证号
	                licenseflag:$("input[name='carInfo.isNewCar']").val(),
	                identifytype:IdentifyType,
	                isBZ:$("#hasBz").val(),
	                insuredflag:"0100000",
	                insuredName:$("#InsuredName").val(),
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
				  		showInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"), data.resultMsg, true);
				  		flag = false;
				  	}else{
				  		if(IdentifyType == "01"){
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
				  	
				  },
			     error:function(){
//			    	 showInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"), "请稍候重试", true);
//			    	 return false;
			     } 
		});
//	}
	return flag;
}
/*
 * Description: 验证手机号码 Parameter: Author: zhaopengyu
 */
function checkCarItemMobile(obj) {
	var msg = ""
	if($("#isModify_s").val()==1){	//寄
		msg = trim(checkMobilePhoneNum(obj));
	}else{
		msg = trim(checkMobilePhone(obj));
	}
	
	if (msg == "true") {
		removeInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"));
		return true;
	} else {
		showInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"), msg, true, $("#AppliPhoneNumber"));
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
	var emailWrap = obj.parents(".form_set_box");
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
function checkWxInsuredInputNextStep(){//个人页面下一步检查
	var majorcity = $("#majorcity");   //添加指定专修厂非空校验
	var AppliAddress = $("#deliverInfoAddress");
	var AppliAddName = $("#AppliAddName");
	var InsuredName = $("#InsuredName");
	var InsuredIdentifyAddr = $("#InsuredIdentifyAddr");
	var InsuredIdentifyNumber = $("#InsuredIdentifyNumber");
	var AppliPhoneNumber=$("#AppliPhoneNumber");
	var county = $("#county");
	var proSelected = $("input[name='carInfo.proSelected']").val();
	var carOwner = $("input[name='carInfo.carOwner']").val();
	var msg="";
	if(checkInsuredName_input(InsuredName)){
		//被保险人与车主姓名不一致
		if(InsuredName.val() != carOwner){  
			//河北、山西地区新车未上牌
			if($("input[name='carInfo.isNewCar']").val()=="0" && (proSelected =="13000000" || proSelected =="14000000")){ 
				msg = "未上牌的新车，车主必须和被保险人一致！";
				showInvalidTips(InsuredName.parents(".form_set_box"), msg, true, InsuredName);
				return false;
			}
			//浙江 、安徽地区政策 江西
			if(proSelected =="34000000" || proSelected =="33000000"|| proSelected =="64000000" || proSelected =="36000000"){ 
				msg = "被保险人需与车主一致！";
				showInvalidTips(InsuredName.parents(".form_set_box"), msg, true, InsuredName);
				return false;
			}
		}
	}else{
		InsuredName.focus();
		return false;
	}
	if(InsuredIdentifyNumber.is(":visible")){
		if(checkInsuredIdentifyNumber(InsuredIdentifyNumber)){
			
		}else{
			InsuredIdentifyNumber.focus();
			return false;
		}
	}
	//河南地区政策，异地车承保必须使用当地车主身份证
	if("41".indexOf($("input[name='carInfo.citySelected']").val().substring(0, 2)) > -1 && $("input[name='carInfo.isNewCar']").val()==1 && $("input[name='carInfo.licenseNo']").val().indexOf("豫")==-1 && $("#InsuredIdentifyType").val()!= "01"){
		showInvalidTips($("#InsuredIdentifyType").parents(".form_set_box"), "请使用身份证进行投保！", true, $("#InsuredIdentifyType"));
		return false;
	}
	if(trim(InsuredIdentifyAddr.val())=="" && InsuredIdentifyAddr.is(":visible")){
		InsuredIdentifyAddr.focus();
		msg = "请输入被保险人证件地址！";
    	showInvalidTips(InsuredIdentifyAddr.parents(".form_set_box"), msg, true, InsuredIdentifyAddr);
		return false;
	}else{
		removeInvalidTips(InsuredIdentifyAddr.parents(".form_set_box"));
	}
	if($("#repairNameCss").is(":visible")){
		if(trim($("input[name='carInfo.majorFactoryName']").val())==""&&$("#specMaintenance").is(":visible")||$("#repairLoc").val()=="0"){
			showInvalidTips($("#repairLoc").parents(".spec_maintenance"), "您选择的地区无指定专修厂！", true, $("#repairLoc"));
			return false;
		}else{
			removeInvalidTips($("#repairLoc").parents(".spec_maintenance"));
		}
	}
	
	if(trim(AppliAddName.val())==""){
		$("#AppliAddName").focus();
		showInvalidTips($("#AppliAddName").parents(".form_set_box"), "请输入收件人姓名！", true, $("#AppliAddName"));
    	AppliAddName.focus();
		return false;
	}else{
		removeInvalidTips($("#AppliAddName").parents(".form_set_box"));
	}

	if(!checkCarItemMobile(AppliPhoneNumber)){
	    $("#AppliPhoneNumber").focus();
		return false;
	}else{
		removeInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"));
	}
	if($("#policyEmail").is(":visible")){
		if(!checkCarItemEmail($("#policyEmail"))){
			$("#policyEmail").focus();
			return false;
		}else{
			//北京保单地址同投保人一致
			$("input[name='carInfo.appliEmail']").val($("#policyEmail").val());
			removeInvalidTips($("#policyEmail").parents(".form_set_box"));
		}
	}
	if($("#deliverInfoDistrict").find("option:selected").text() == "请选择"){
		showInvalidTips($("#AppliAddName").parents(".form_set_box"), "请选择您所在的区（县）！ ", true, $("#AppliAddName"));
		return false;
	}else{
		removeInvalidTips($("#AppliAddName").parents(".form_set_box"));
	}
	if(trim(AppliAddress.val())==""){
		AppliAddress.focus();
		msg = "请输入详细配送地址！";
		showInvalidTips(AppliAddress.parents(".form_set_box"), msg, true, AppliAddress);
    	AppliAddress.focus();
		return false;
	}else{
		removeInvalidTips(AppliAddress.parents(".form_set_box"));
 	}
    
	if(trim(majorcity.val())=="请选择" && majorcity.is(":visible")){
		msg = "请输入专修厂地址！";
    	majorcity.focus();
		return false; 
	}
	
	//发票
	if($("#InvoiceTitle").is(":visible")){
		var invoiceTitle = $("#InvoiceTitle").val();
	    if(trim(invoiceTitle) == ""){
	    	showInvalidTips($("#InvoiceTitle").parents(".field_wrap"), "请输入发票抬头！", true);
	    	return false;
	    }else{
	    	removeInvalidTips($("#InvoiceTitle").parents(".field_wrap"));
	    }
	}
	if($("#InvoiceTitle_select").is(":hidden")){
		$("#InvoiceTitle_select").remove();
	}
	if($("#InvoiceTitle").is(":hidden")&&$("#InvoiceTitle_select").is(":visible")){
	    $("#InvoiceTitle").remove();
	}
	return true;
}



function jsBlanclist(){
	var ctx = $("#ctx").val();
	if(checkCarItemMobile($("#AppliPhoneNumber"))==true){
		var mobileWrap = $("#AppliPhoneNumber").parents(".field_wrap");
		$.ajax({
			  url:ctx+"/carProposal/fastPrice/ajaxBlacklist",
			  type:"post",
			  data: {
				    channelNo:$("input[name='head.channelNo']").val(),
				  	areaCode:$("input[name='carInfo.proSelected']").val(),
					cityCode:$("input[name='carInfo.citySelected']").val(),
					ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
					mobile: $("input[name='carInfo.appliPhoneNumber']").val()
			         },
			  dataType:"json",
		  success: function(data)
			 {
			  	var flag = data.message;
			  	if("1"!=flag){
			  		showInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"), "请输入其他的手机号！", true, $("#AppliPhoneNumber"));
			  	}
			  	else{
			  		removeInvalidTips($("#AppliPhoneNumber").parents(".form_set_box"));
			  	}
			  }
	});
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
            itemKindFlag:'4',
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

//跳转到车主信息页面
function toCarOwer(){
	var ctx = $("#ctx").val();
	$("input[name='carCodex']").val('');	//置空 通过过滤
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carBackInput1");
	form.submit();
}

