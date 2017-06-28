/**
 * User: Phoenix
 * Date: 13-5-7
 * Time: 上午10:56
 * Quoted form.
 */
var jqflag = 0;
var trNo = 0;//table下tr个数
$(function() {
	var mssFlag = $("input[name='carInfo.mssFlag']").val();
	if(mssFlag != "mss"){
		$("#saveInfo").hide();
		//流程步骤
		if($("input[name='carInfo.progressBar']").val() == 1){
			$("input[name='carInfo.progressBar']").val(2);
		}
		if($("input[name='carInfo.progressBar']").val()>2){
			$("#step_3").attr("data-status","finished");
			if($("input[name='carInfo.progressBar']").val()>3){
				$("#step_4").attr("data-status","finished");
				if($("input[name='carInfo.progressBar']").val()>4){
					$("#step_5").attr("data-status","finished");
				}
			}
		}
	}else{
		$("#stepDiv").hide();
	}
	
	$(".jsClose ").click(function(){
		$(this).parent().hide();
		$(this).parent().text("");
	});
	
	$(".home").click(function(){
		var ctx = $("#ctx").val();
		var form = $("#form");
		var mssFlag = $("input[name='carInfo.mssFlag']").val();
		if(mssFlag == 'mss'){
			form.attr("action",ctx+"/carProposal/car/carBack");
		}else{
			form.attr("action",ctx);
		}
		$("input[name='carCodex']").val('');	//置空 通过过滤
		form.submit();
	});
		
    //控制税额明细
	$("#quotedTaxDetail").click(function() {
        $("#dialogTaxDetail").addClass("show");
        $("body").css({ 'overflow': "hidden"});
        return false;
    });
	
//	var divTOP=$(".price_total").offset().top;   
//	 $(window).scroll(function(){
//	    var offsetop=divTOP+$(window).scrollTop()+"px";
//	    $(".price_total").animate({top:offsetop},{duration:200,queue:false})       
//	 })  
	//头部滚动事件 
	  $(window).scroll(function(){
          var vtop=ScollPostion().top;
          if(vtop>170&&trNo>13){
//        	  var offsetop=$(window).scrollTop()+"px";
//      	      $(".price_total").css('top',offsetop)
//      	      $(".head_bar").css('top',offsetop) 
        	  $(".price_total").css({'position':"fixed",'top':"40px"})
        	  $(".head_bar").css({'position':"fixed",'z-index':200})
          }
          else{
        	  $(".price_total").css({'position':"relative",'top':"0px"})
        	  $(".head_bar").css({'position':"relative",'top':"0px"})
          }
	  });
	  var vtop=ScollPostion().top;
      if(vtop>10){
    	  $(".price_total").css('position',"fixed")
    	  $(".price_total").css('top',"40px")
    	  $(".head_bar").css({'position':"fixed",'z-index':200})
      }
      else{
    	  $(".price_total").css('position',"relative") 
    	  $(".price_total").css('top',"0px")
    	  $(".head_bar").css('position',"relative") 
      }
	 $("#renewalTotal").click(function() {
	        var trigger = this;
	        $(this).next("div").slideToggle(function() {
	            if(!$(this).is(":visible")) {
	                $(trigger).removeClass("open").addClass("close");
	            } else
	                $(trigger).removeClass("close").addClass("open");
	        });
	    });
	//判断交强险是否显示
	 if($("input[name='carInfo.bzEnable']").val()=="0"){
		 $("#jqShowDiv").hide()
	 }
    //交强险起保日期 如果为空赋值为商业险起保日期
    if($("input[name='carInfo.startDateCI']").val()!=$("input[name='carInfo.startDateSY']").val()){
    	$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val())
    }
    if($("input[name='carInfo.endDateCI']").val()!=$("input[name='carInfo.endDateSY']").val()){
    	$("input[name='carInfo.endDateCI']").val($("input[name='carInfo.endDateSY']").val())
    }
    if($("input[name='carInfo.starthourCI']").val()!=$("input[name='carInfo.startHourSY']").val()){
    	$("input[name='carInfo.starthourCI']").val($("input[name='carInfo.startHourSY']").val())
    }
    if($("input[name='carInfo.endhourCI']").val()!=$("input[name='carInfo.endHourSY']").val()){
    	$("input[name='carInfo.endhourCI']").val($("input[name='carInfo.endHourSY']").val())
    }
    //如果可以显示交强险起保日期处理
    centerSelect('startDate');
    $("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateCI']").val())
    
     $("#CarOwerIdentifyType").change(function(){//证件号验证
	    	checkInsuredIdentifyNumber($("#CarOwerIdentifyNo"),$("#CarOwerIdentifyType"),1);
	    });
    $("#CarOwerIdentifyNo").blur(function(){//证件号验证
     	checkInsuredIdentifyNumber($("#CarOwerIdentifyNo"),$("#CarOwerIdentifyType"));
     });
  //动态添加起保小时数
	for(i=0; i<24; i++){
		$("<option value='"+i+"'>"+i+"时</option>").appendTo("#startDate");
	}
	$("#startDate").val($("input[name='carInfo.starthourCI']").val())
	if($("input[name='carInfo.bzrealtime']").val()=="1"){
		$("#jqType").val("select");
	}
	if($("#jqType").val()!="select"){
		$("#startDate").html("<option value='0'>0时</option>")
	}
	
	//乘客座位数
	var seat = parseInt($("input[name='carInfo.seatCount']").val())-1;
	$("#seatC").html("车上人员责任险(乘客)("+seat+"座)")
	//当从车辆信息页面过来时要初始化保费页面信息
	//当从车辆信息页面过来时要初始化保费页面信息
	if($("input[name='carInfo.flagForFeeAjax']").val()==1){
		$("#feeFlag").val(0);
		$(".btn_gradient_red").attr("disabled","disabled");
		$(".btn_gradient_gray").attr("disabled","disabled");
	var ctx = $("#ctx").val();
	if($("input[name='carInfo.retrieveFlag']").val() == 1){		
		$(".calculating").fadeIn();
		$.ajax({
			  url:ctx+"/carProposal/calculateFee/retrieve",
			  type:"post",
			  async:false,
			  data: {proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
//				   actualValue:$("input[name='carInfo.actualValue']").val(),
//				   purchaseValue:$("input[name='carInfo.purchaseValue']").val(),
				   //费改增加字段end
				   startdate:$("input[name='carInfo.startDateSY']").val(),
				   starthour:$("input[name='carInfo.startHourSY']").val(),
				   enddate:$("input[name='carInfo.endDateSY']").val(),
				   endhour:$("input[name='carInfo.endHourSY']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseno:$("input[name='carInfo.licenseNo']").val(),
				   nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
				   licenseflag:$("input[name='carInfo.isNewCar']").val(),
				   engineno:$("input[name='carInfo.engineNo']").val(),
				   vinno:$("input[name='carInfo.vinNo']").val(),
				   frameno:$("input[name='carInfo.frameNo']").val(),
				   newcarflag:"0",
				   isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
	               lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
	               lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
	               lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
	               lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
				   enrolldate:$("input[name='carInfo.enrollDate']").val(),
				   transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),
				   insuredname:$("input[name='carInfo.carOwner']").val(),
				   fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
				   seatCount:$("input[name='carInfo.seatCount']").val(),
				   sessionId:$("#sessionId").val(),
				   seatflag :$("input[name='carInfo.seatFlag']").val(),
				   transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
				   guohuselect:$("input[name='carInfo.guohuselect']").val(),			//过户车  
	               runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
	  			   assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
	  			   haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
	  			   LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
	  			   weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
	  			   carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
	  			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
	  			   ccaID:$("input[name='carInfo.ccaId']").val(),
	  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
	  			   travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val()			//平均行驶里程
					   
			       },
			  dataType:"json",
		      success: function(data)
			  {
			  	 initAjaxFee(data);
			  	 if($("#hasBz").val()==1){
			  		if($("#citySelected").val()=="12000000"){
			  			tjCarSure();
			  		}else{
			  			buyJQ();			  			
			  		}
			     }
			  },
		      error:function(){
		    	 document.location = "/wap/timeOut"
		      }
		});
	}else if($("input[name='carInfo.isRenewal']").val() == 1) {		//当isRenewal 为1时 走续保报价接口
		$(".calculating").fadeIn();
		$.ajax({
			  url:ctx+"/carProposal/calculateFee/renewalfee",
			  type:"post",
			  data: {
				  proSelected:$("#proSelected").val(),    
                  citySelected:$("#citySelected").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
				   //费改增加字段end
                  beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),   //上一年的保单号
                  startdate:$("input[name='carInfo.startDateSY']").val(),
                  starthour:$("input[name='carInfo.startHourSY']").val(),
                  enddate:$("input[name='carInfo.endDateSY']").val(),
                  endhour:$("input[name='carInfo.endHourSY']").val(),
                  licenseno:$("input[name='carInfo.licenseNo']").val(),  
                  nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
                  licenseflag:$("input[name='carInfo.isNewCar']").val(),
//                  licenseflag:$("input[name='carInfo.licenseflag']").val(),        //上牌标志
                  engineno:$("input[name='carInfo.engineNo']").val(),
                  vinno:$("input[name='carInfo.vinNo']").val(),
                  frameno:$("input[name='carInfo.frameNo']").val(),
//                       newcarflag:"0",
                  enrolldate:$("input[name='carInfo.enrollDate']").val(),
                  transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),        //是否过户车
                  insuredname:$("input[name='carInfo.carOwner']").val(),            //被保险人：车主
                  fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
                  startDateCI:replace($("input[name='carInfo.startDateCI']").val(),"-","/"),
                  starthourCI:$("input[name='carInfo.starthourCI']").val(),
                  endDateCI:replace($("input[name='carInfo.endDateCI']").val(),"-","/"),
                  endhourCI:$("input[name='carInfo.endhourCI']").val(),
                  sessionId:$("#sessionId").val(),
                  seatflag :$("input[name='carInfo.seatFlag']").val(),
                  isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
                  lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
                  lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
                  lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
                  lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
                  transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
                  guohuselect:$("input[name='carInfo.guohuselect']").val(),			//过户车  
                  runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
  			      assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
  			      haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
  			      LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
  			      weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
  			      seatCount:$("input[name='carInfo.seatCount']").val(),					
  			      carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
  			      travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
  			      lastdamageBI:$("input[name='carInfo.lastdamageBI']").val(),		//上年出险次数
	  			  ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
	  			  ccaID:$("input[name='carInfo.ccaId']").val(),
	  			  ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
  			      noDamyearsBI:$("input[name='carInfo.noDamyearsBI']").val()		//未出险年数
			   },
			  dataType:"json",
		  success: function(data)
			  {
			  	if(data == 0){
				  	showInvalidTips($("#showSY").parents(".commercial_combo"), "商业险连接平台失败：签单日期应该不晚于起保日期！", true);
					return false;
				}else{
					initAjaxFee(data);
					if($("#select_050600").val()<1000000&&$("#citySelected").val()=="44030000"){//深圳政策REM-5634 update 2014-7-31 zpy
							$("#shenzhenTip").html("尊敬的用户，深圳地区交通事故赔偿标准已经超过100万了，建议您提升第三者责任险保障，以补充超出交强险赔偿损失的额度。")
						}
					}
			  },
		     error:function(){
		    	 document.location = "/wap/timeOut"
		     }
		});
	}else {
		$(".calculating").fadeIn();
		$.ajax({
			  url:ctx+"/carProposal/calculateFee/fee",
			  type:"post",
			  data: {
				   channelNo:$("input[name='head.channelNo']").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
				   //费改增加字段end
				   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   startdate:$("input[name='carInfo.startDateSY']").val(),
				   starthour:$("input[name='carInfo.startHourSY']").val(),
				   enddate:$("input[name='carInfo.endDateSY']").val(),
				   endhour:$("input[name='carInfo.endHourSY']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseno:$("input[name='carInfo.licenseNo']").val(),
				   nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
				   licenseflag:$("input[name='carInfo.isNewCar']").val(),
				   engineno:$("input[name='carInfo.engineNo']").val(),
				   vinno:$("input[name='carInfo.vinNo']").val(),
				   frameno:$("input[name='carInfo.frameNo']").val(),
				   newcarflag:"0",
				   isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
	               lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
	               lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
	               lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
	               lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
				   enrolldate:$("input[name='carInfo.enrollDate']").val(),
				   transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),
				   insuredname:$("input[name='carInfo.carOwner']").val(),
				   fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
				   seatCount:$("input[name='carInfo.seatCount']").val(),
				   transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
				   sessionId:$("#sessionId").val(),
				   seatflag :$("input[name='carInfo.seatFlag']").val(),
				   guohuselect:$("input[name='carInfo.guohuselect']").val(),			//过户车  
	               runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
	  			   assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
	  			   haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
	  			   LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
	  			   weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
	  			   carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
	  			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
	  			   ccaID:$("input[name='carInfo.ccaId']").val(),
	  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
	  			   travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val()			//平均行驶里程
		},
			  dataType:"json",
		  success: function(data)
			  {
			  	initAjaxFee(data);
			  },
			     error:function(){
			    	 document.location = "/wap/timeOut"
			     }
		});
	}
		 
	}else{
		if($("#hasBz").val()==2){
			$("#jqFee").val("0.00");
	 		$("#shipFee").val("0.00");
		}
		
		//如果是从上一步返回的    不调用接口   直接用隐藏域里的值赋值
		forSelectRule();
		forInit();
		
	}
	
	var taxPayerName = $("#TaxPayerName");//纳税人姓名
    var taxPayerIdentNo = $("#TaxPayerIdentNo"); //纳税人身份证号码
    var trafficInsureAddress = $("#trafficInsureAddress"); //车主身份证地址
    var trafficInsureBrand = $("#trafficInsureBrand"); //车辆名称/品牌
    var trafficInsureCarType = $("#trafficInsureCarType"); //车辆种类
    
    trafficInsureBrand.blur(function(){
    	checktrafficInsureBrand(trafficInsureBrand);
    });
    trafficInsureCarType.blur(function(){
    	checktrafficInsureCarType(trafficInsureCarType);
    });
    taxPayerName.blur(function(){
		checkTaxPayerName_new(taxPayerName);
	});
    trafficInsureAddress.blur(function(){
    	checkCarOwnerAdd(trafficInsureAddress);
    });
    $("#TaxPayerIdentType").change(function(){//证件号验证
     	checkTaxerAndCarOwnerIdentifyNumber(taxPayerIdentNo);
	});
    taxPayerIdentNo.blur(function(){//证件号验证
    	checkTaxerAndCarOwnerIdentifyNumber(taxPayerIdentNo);
    }).keyup(function() {
		$(this).val($(this).val().toUpperCase());
	}).change(function() {
		$(this).val($(this).val().toUpperCase());
    });
    if(taxPayerName.val()==""){
    	taxPayerName.val($("input[name='carInfo.carOwner']").val());
    }
    //初始化的时候给证件类型赋值
    if($("#identifyTypeValue").length>0){
    	var identifyTypeValue = ($("#identifyTypeValue").val()).split("|");
    	var idVal = "";
    	for(var i=0; i<identifyTypeValue.length; i++){
    		var identAll = (identifyTypeValue[i]).split(",");
    		idVal = idVal + "<option value="+identAll[0]+">"+identAll[1]+"</option>"
		}
    	$("#TaxPayerIdentType").html(idVal)
    }
    $("#TaxPayerIdentType").val($("#taxIdentType").val())
    //附加险车身划痕险改变时 ，不计免赔额的也要变吧  
    $("#select_050210").change(function() {
    	if($("#select_050210").val()=='0'){
    		$("#select_050922").val('0');
    	}else{
    		$("#select_050922").val('1');
    	}
    });
    
    //天津地区购买交强险 页面处理
    if($("#carKindCIVal").length>0){
    	var carKindCIVal = ($("#carKindCIVal").val()).split("|");
    	var trafficInsureCarModel = "";
    	for(var i=0; i<carKindCIVal.length; i++){
    		var carKindCIAll = (carKindCIVal[i]).split(",");
    		trafficInsureCarModel = trafficInsureCarModel + "<option value="+carKindCIAll[0]+">"+carKindCIAll[1]+"</option>"
		}
    	$("#trafficInsureCarModel").html(trafficInsureCarModel);
    	$("#trafficInsureCarModel").val($("#carKind").val());
    	
    	var traveltaxAddressVal = ($("#traveltaxAddressVal").val()).split("|");
    	var trafficInsureLicenseAddress = "";
    	for(var i=0; i<traveltaxAddressVal.length; i++){
    		var traveltaxAddressAll = (traveltaxAddressVal[i]).split(",");
    		trafficInsureLicenseAddress = trafficInsureLicenseAddress + "<option value="+traveltaxAddressAll[0]+">"+traveltaxAddressAll[1]+"</option>"
		}
    	$("#trafficInsureLicenseAddress").html(trafficInsureLicenseAddress);
    	$("#trafficInsureLicenseAddress").val($("#taxAddress").val());
    }
    $("#TAX_FLAG_SH").change(function(){
     	$("#tax_flag_sh").val($("#TAX_FLAG_SH").val());
		$(".btn_gradient_gray").attr("disabled",false);
	});
    //是否购买交强险
    if($("#hasBz").val()==""){
    	$("#hasBz").val(2);
    }
    var purchaseSwitch = $("#trafficInsureHeader").find("input[type=radio]");
    
    if($("#hasBz").val()==1){
    	$("#buy").addClass('radioed');	//单选 选中 购买
    	$("#noBuy").removeClass('radioed'); //不选中不购买
    	
    	$("#beian").hide()
    	
    	$("#trafficInsureBody").show();
    	$("#quotedTaxDetail").show();
    	if($("#trafficInsurePolicyDate").length>0){  //交强险起保日期可见时
			changeStartDateSY();
		}
    	centerSelect('TaxPayerIdentType');
    	if($("#proSelected").val()=="12000000"&&$("#tjCarSureFlag").val()=="1"){
    		centerSelect('trafficInsureCarModel');
		  	centerSelect('trafficInsureLicenseAddress');
    		$("#carKindCIDiv").hide();
    		$("#traveltaxAddressDiv").hide();
			$("#tjMsg").show();
			$("#carKindCIShow").html($("#trafficInsureCarModel").find("option:selected").text());
			$("#traveltaxAddressShow").html($("#trafficInsureLicenseAddress").find("option:selected").text());
		}
    	if($("input[name='carInfo.buyCarDate_flag']").val()=='1'){
    		$("#shMsg").show();
    		$("#certificatedateShow").html($("input[name='carInfo.certificatedate']").val());
    	}
    	if($("input[name='carInfo.tAX_FLAG_SH_flag']").val()=='1'){
    		$("#TAX_FLAG_SHDiv").show();
    		$("#TAX_FLAG_SH").val($("#tax_flag_sh").val());
    	}
    	
    
    	//给税额明细需要的东西赋值
			$("#thisPayTax").html(fmoney($("input[name='carInfo.thisPayTax']").val()))
			$("#prePayTax").html(fmoney($("input[name='carInfo.prepaytax']").val()))
			$("#delayPayTax").html(fmoney($("input[name='carInfo.delayPayTax']").val()))
			$("#PayShipDate").html($("input[name='carInfo.payStartDate']").val() + "&nbsp;至&nbsp;" + $("input[name='carInfo.payEndDate']").val())
			var allTax = parseFloat($("input[name='carInfo.thisPayTax']").val()) + parseFloat($("input[name='carInfo.prepaytax']").val()) + parseFloat($("input[name='carInfo.delayPayTax']").val())
			$("#allTax").html(fmoney(allTax));
			
		//昆明地区是否购买车船税
		if($("#citySelected").val()=="53010000"){
			if($("input[name='carInfo.iscarship']").val()==1){
				$("#iscarship").attr("checked",true);
				$("#kunmingTips").hide();
			}else{
				$("#iscarship").attr("checked",false);
				$("#kunmingTips").show();
			}
		}
    }else{
    	$("#quotedTaxDetail").hide()
//    	$("#trafficInsureNegative").attr("checked","checked");
    	$("#noBuy").addClass('radioed');	//单选 选中不购买
    	$("#buy").removeClass('radioed'); //不选中
    	
    	$("#trafficInsureBody").hide();
    }
   
    if(!$("#buy").hasClass('radioed')) {
    	switchTrafficInsure($("#trafficInsureBody"), false);
    } else {
        $("#trafficInsureBody").show();
    }
    $(".popup_dialog").on('click', ".closer", function() {
        $(this).parents(".overlay").fadeOut();
        return false;
    });
    $(".popup_dialog").on('click', ".closerButton", function() {
    	$(this).parents(".overlay").fadeOut();
    	return false;
    });
    
    //点击购买
    $("#trafficInsurePurchase").click(function(){
    	buyJQ();
    	//红包算费
  	  if($("#entryBonus").length>0){
  		  isBonus();
  	  }
    });
    
    //点击不购买
    $("#trafficInsureNegative").click(function(){
    	removeInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"));
    	$(".btn_gradient_red").show();
    	$(".btn_gradient_gray").attr("disabled",false);
    	if($("#noBuy").hasClass('disabled')){	//如果不可用
    		return false;
    	}
    	$("#noBuy").addClass('radioed');
	    $("#buy").removeClass('radioed');
	    $("input[name='carInfo.certificatedate']").val("");
    	$("#quotedTaxDetail").hide();
    	$("#jqFeeShow").html("0.00");
		$("#shipFeeShow").html("0.00");
		$("#jqFee").val("0.00");
		$("#shipFee").val("0.00");
		$("#allFeeShow").html($("#forAllFee").val());
		$("#allFee").val($("#forAllFee").val());
			
        $("#trafficInsureBody").slideUp(function() {
            switchTrafficInsure(this, false);
            $(".btn_gradient_red").attr("disabled",false);
            $("#hasBz").val(2);
            $("#needRevokeHBCount").val("1");
//            if($("#proSelected").val()=="14000000"){
// 				syCalculateFee();
// 			}
            if($("#calcBIFlag").val()=="1"){//购买交强险更优惠则重新算费
            	syCalculateFee();
            }
	          //红包算费
	      	  if($("#entryBonus").length>0){
	      		  isBonus();
	      	  }
        });
    });
    
    
    
    //页面的一些规则
  //车损险浮动情况   选择投保不投保情况
    $("#selectFix_050200").change(function(){
    	var userAgent = window.navigator.userAgent;
    	var selectFix = $("#selectFix_050200").val();
    	if(selectFix==-1){
    		if(userAgent.indexOf("iPhone")>-1){
    			$("#actualPriceShow").val("");
    		}else{
    			$("#actualPriceShow").val("不投保");
    		}
    		$("#actualPriceShow").attr("disabled","disabled");
    		$("#actualPrice").val("-1");
    	}
    	if(selectFix==1){
    		$("#actualPriceShow").attr("disabled",false);
    		$("#actualPriceShow").val($("#actualPriceConfirm").val())
    		$("#actualPrice").val($("#actualPriceConfirm").val());
    	}
    })
    //盗抢险浮动情况   选择投保不投保情况
    $("#selectFix_050500").change(function(){
    	var userAgent = window.navigator.userAgent;
    	var selectFix = $("#selectFix_050500").val();
    	if(selectFix==-1){
    		if(userAgent.indexOf("iPhone")>-1){
    			$("#theftProtActual").val("");
    		}else{
    			$("#theftProtActual").val("不投保");
    		}
    		$("#theftProtActual").attr("disabled","disabled");
    	}
    	if(selectFix==1){
    		$("#theftProtActual").attr("disabled",false);
    		$("#theftProtActual").val($("#confirmAmount_050500").val())
    	}
    })
    //车损险改变触发事件
    $("#select_050200,#selectFix_050200").change(function(){
    	change_050200();
    })
    //第三者责任点击
     $("#select_050600").change(function(){
    	 change_050600();
     })
     
     //盗抢险几点
     $("#select_050500,#selectFix_050500").change(function(){
    	 change_050500();
     })
     //车上人员  司机点击
     $("#select_050701").change(function(){
    	 change_050701();
     })
     //车上人员 乘客点击
     $("#select_050702").change(function(){
    	change_050702();
     })
     //车身划痕险 点击
     $("#select_050210").change(function(){
    	 change_050210();
     })
     //发动机 点击
     $("#select_050291").change(function(){
    	 change_050291();
     })
     //精神损害抚慰金责任险 点击
     $("#select_050641").change(function(){
    	 change_050641();
     })
     //精神损害抚慰金责任险 点击
     $("#select_050642").change(function(){
    	 change_050642();
     })
     //精神损害抚慰金责任险 二合一 点击
     $("#select_050643").change(function(){
    	 change_050643();
     })
     //为所有select加改变事件
     $(".commercial_combo").find("select").change(function(){
    	 $("#selectChange").val(1);
    	 //showInvalidTips($("#showSY").parents(".commercial_combo"), "请重新计算商业险保费！", true);
    	 syCalculateFee();
    	 $("#feeNext").attr("disabled",true);
     })
     $("#actualPriceShow").change(function(){
    	 $("#actualPrice").val($("#actualPriceShow").val())
    	 if($("#proSelected").val()=="33000000"){
    		 var tishi ="保险车辆为不足额投保，出险后按保险金额与新车购置价的比例进行赔付。";
    		 $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
    		 $("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
    		 syCalculateFee();
    	 }else if($("#citySelected").val()=="35020000"){
    		 var tishi ="您修改的价格可能与厦门保险行业平台价格不一致，请您登录http://hx.acgw.com.cn/hyxh/查询，或详询4001234567转2";
    		 $("#insurerDesc").css({'height': $(document).height()}).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
    		 $("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
    		 syCalculateFee();
    	 }else{
			 $("#selectChange").val(1);
			 //showInvalidTips($("#showSY").parents(".commercial_combo"), "请重新计算商业险保费！", true);
			 syCalculateFee();
			 $("#feeNext").attr("disabled",true);
    	 }
     }).focus(function(){
    	 $("#beforeModify_050200").val($(this).val());
     }).blur(function(){
    	 if($("#actualPriceShow").val()==""){
    		 $("#actualPriceShow").val($("#actualPriceConfirm").val())
    	 }
    	 if($(this).val()!=$("#beforeModify_050200").val()){
    		 $("#actualPrice").val($("#actualPriceShow").val())
    		 $("#selectChange").val(1)
    	 }
     })
     //盗抢险的浮动区间  修改
     $("#theftProtActual").change(function(){
    	 $("#selectChange").val(1);
     }).focus(function(){
    	 $("#beforeModify_050200").val($(this).val());
     }).blur(function(){
    	 if($("#theftProtActual").val()==""){
    		 $("#theftProtActual").val($("#confirmAmount_050500").val())
    	 }
    	 if($(this).val()!=$("#beforeModify_050200").val()){
    		 $("#selectChange").val(1);
    		 //showInvalidTips($("#showSY").parents(".commercial_combo"), "请重新计算商业险保费！", true);
    		 syCalculateFee();
    		 $("#feeNext").attr("disabled",true);
    	 }
     })
     if($("#shipFee").val()!='0'){
//		$("#quotedTaxDetail").show();
		}else{
		$("#shipFeeShow").hide();
  		$("#carFeeShow").hide();
  		$("#quotedTaxDetail").css('display','none');
		}
    
    if($("#noticeTip1").val()!=""){
    	 $("#carControlMsg").html($("#noticeTip1").val());
    }
    if($("#noticeTip2").val()!=""){
    	$("#carControlMsg").html($("#noticeTip1").val()+ "<br>"+$("#noticeTip2").val());
    }
    if($("#noticeTip3").val()!=""){
    	$("#changchunTip").html($("#noticeTip3").val());
    }
	if($("#noticeTip4").val()!="" && $("#citySelected").val()=="44120000"){
		  $("#shenzhenTip").html("建议提高三者险责任限额");
		  $("#noticeTip4").val(data.noticeTip4);
	}else{
		  $("#shenzhenTip").html("");
	}
	//昆明地区是否购买车船税处理
	$("#iscarship").click(function(){
		isBuyTax();
	})
	//<!-- 北京分公司亿玛DSP检测代码部署 代码加载完成时，执行检测代码客户选择地区是北京
	var dspParam=($("#cmpid").val()==undefined || $("#cmpid").val()==null || $("#cmpid").val()=="")?"":$("#cmpid").val();
	if($("#proSelected").val()=="11000000" && dspParam.indexOf("8di")>=0){
		_adwq.push(['_trackPageview']); 
	}
});
//处理初始化商业险算费的公共方法  data
function initAjaxFee(data){

	  if(data=='444'){
			 window.location.href="/wap/views/carProposal/errorReject.jsp";
	  }
	  if(data==2){
		  window.scrollTo(0,document.body.scrollHeight)
		  showInvalidTips($("#showSY").parents(".commercial_combo"), "连接平台超时，请稍后重试！", true);
		  return false;
	  }
	  if(data.trafficViolation && ""!=data.trafficViolation){
		  $("#trafficViolationId").html(data.trafficViolation);
		  $("#trafficViolationTwoId").html(data.trafficViolationTwo);
		  $("#trafficViolationDiv").show();
	  }
	  //总保费  没有交强险时   及显示商业险保费
	  $("#forAllFee").val(data.basicPackage[0].premium);
	  $("#allFee").val(data.basicPackage[0].premium);
	  $(".calculating").fadeOut();
	  var controlMsg = "";
	  
	  if(data.noticeTip1!=""){
		  controlMsg = data.noticeTip1 + "<br>";
		  $("#noticeTip1").val(data.noticeTip1);
	  }
	  if(data.noticeTip2!=""){
		  controlMsg = controlMsg + data.noticeTip2;
		  $("#noticeTip2").val(data.noticeTip2);
	  }
	  if(data.noticeTip3!=""){
		  $("#changchunTip").html(data.noticeTip3);
		  $("#noticeTip3").val(data.noticeTip3);
	  }
	  if(data.noticeTip4!="" && $("#citySelected").val()=="44120000"){
		  $("#shenzhenTip").html("建议提高三者险责任限额");
		  $("#noticeTip4").val(data.noticeTip4);
	  }else{
		  $("#shenzhenTip").html("");
		  $("#noticeTip4").val(data.noticeTip4);
	  }
	  if(data.calcBIFlag=="1"&&$("#insuredIdentifSex").val()!=""){//费改增加提示语
		  $("#bugCiCanSaveMoney").show();
	  }else{
		  $("#bugCiCanSaveMoney").hide();
	  }
	  $("#calcBIFlag").val(data.calcBIFlag);	//记录购买交强险是否需要重新计算商业险保费
	  $("#carControlMsg").html(controlMsg);
	  //主险机动车辆险 页面初始化
	  //给算费隐藏域赋值
	  forHiddenFee(data)
	  //刚进来交强和车船是 保费是0  调完交强报价接口才有
	  $("#jqFee").val("0.00");
	  $("#shipFee").val("0.00");
	  //车损险浮动情况
	  $("#userPriceConf").val(data.priceConfig.userPriceConf)
	  if(data.priceConfig.userPriceConf==1){
		  var amount= $("#amountList_050200").val();
		  var num =amount.indexOf("|");
		  var amountList = amount.substring(num+1);
		  $("#actualPriceConfirm").val(amountList);
		  $("#actualPrice").val($("#amount_050200").val());		//0902 改成车损险保额
		  $("#initamount_050200").val($("#amount_050200").val());		//初始化保额 以后都不会变化
		  $("#purchasePriceMin").val(data.priceConfig.purchasePriceMin);	//格式化 63600.000
		  var purchasePriceMin = $("#purchasePriceMin").val();
		  if(purchasePriceMin.indexOf(".00")>=0 || purchasePriceMin.indexOf(".000")>=0){
			  purchasePriceMin = parseInt(purchasePriceMin);
		  }	
		  $("#purchasePriceMax").val(data.priceConfig.purchasePriceMax)
		  var purchasePriceMax = $("#purchasePriceMax").val();
		  if(purchasePriceMax.indexOf(".00")>=0 || purchasePriceMax.indexOf(".000")>=0){
			  purchasePriceMax = parseInt(purchasePriceMax);
		  }	
		  $("#purchasePriceMin").val(purchasePriceMin);
		  $("#purchasePriceMax").val(purchasePriceMax);
	  }
	  //盗抢险浮动情况
	  $("#bmflag").val(data.priceConfig.bmflag);
	  if($("#bmflag").val()=='1'){
		  var amount= $("#amountList_050500").val();
		  var num =amount.indexOf("|");
		  var amountList = amount.substring(num+1);
		  $("#amount_050500").val(amountList);
		  $("#confirmAmount_050500").val($("#amount_050500").val());
		  $("#theftProtMin").val(data.theftProtMin);
		  var theftProtMin = $("#theftProtMin").val();
		  if(theftProtMin.indexOf(".00") || theftProtMin.indexOf(".000")){
			  theftProtMin = parseInt(theftProtMin);
		  }		  
		  $("#theftProtMax").val(data.theftProtMax);
		  var theftProtMax = $("#theftProtMax").val();
		  if(theftProtMax.indexOf(".00") || theftProtMax.indexOf(".000")){
			  theftProtMax = parseInt(theftProtMax);
		  }		  
		  
		  $("#theftProtMin").val(theftProtMin);
		  $("#theftProtMax").val(theftProtMax);
	  }	  
	  forSelectRule()
	  //保险条款初始化
	  forInit();
	  $(".btn_gradient_red").attr("disabled",false);
	  $(".btn_gradient_gray").attr("disabled",false);
	  //交强险点击时要用到
	  $("#feeFlag").val(1);
	  if($("#hasBz").val()==1){
		  buyJQ();
	  }
	  //红包算费
	  if($("#entryBonus").length>0){
		  $("input[name='carInfo.hasSy']").val(1);
		  isBonus();
	  }
}
function forHiddenFee(data){
	$.each(data.commonPackage.items, function(i,n){
		  if(n.kindCode=="050200"){
			 $("#amountList_050200").val(n.amountList);
			 $("#amount_050200").val(n.amount);
			 $("#isModify_050200").val(n.isModify);
			 $("#premium_050200").val(n.premium);
		  }
		  if(n.kindCode=="050600"){
			  $("#amountList_050600").val(n.amountList);
			  $("#amount_050600").val(parseInt(n.amount));
			  $("#premium_050600").val(n.premium);
		  }
		  if(n.kindCode=="050500"){
			  $("#amountList_050500").val(n.amountList);
			  $("#amount_050500").val(n.amount);
			  $("#premium_050500").val(n.premium);
		  }
		  if(n.kindCode=="050701"){
			  $("#amountList_050701").val(n.amountList);
			  $("#amount_050701").val(parseInt(n.amount));
			  $("#premium_050701").val(n.premium);
		  }
		  if(n.kindCode=="050702"){
			  $("#amountList_050702").val(n.amountList);
			  $("#amount_050702").val(parseInt(n.amount));
			  $("#premium_050702").val(n.premium);
		  }
		  if(n.kindCode=="050310"){
			  $("#amountList_050310").val(n.amountList);
			  $("#amount_050310").val(n.amount);
			  $("#premium_050310").val(n.premium);
		  }
		  if(n.kindCode=="050231"){
			  $("#amountList_050231").val(n.amountList);
			  $("#amount_050231").val(n.amount);
			  $("#premium_050231").val(n.premium);
		  }
		  if(n.kindCode=="050641"){
			  $("#amountList_050641").val(n.amountList);
			  $("#amount_050641").val(parseInt(n.amount));
			  $("#premium_050641").val(n.premium);
		  }
		  if(n.kindCode=="050642"){
			  $("#amountList_050642").val(n.amountList);
			  $("#amount_050642").val(parseInt(n.amount));
			  $("#premium_050642").val(n.premium);
		  }
		  if(n.kindCode=="050643"){
			  $("#amountList_050643").val(n.amountList);
			  $("#amount_050643").val(parseInt(n.amount));
			  $("#premium_050643").val(n.premium);
		  }
		  if(n.kindCode=="050451"){
			  $("#amountList_050451").val(n.amountList);
			  $("#amount_050451").val(parseInt(n.amount));
			  $("#premium_050451").val(n.premium);
		  }
		  if(n.kindCode=="050919"){
			  $("#amountList_050919").val(n.amountList);
			  $("#amount_050919").val(parseInt(n.amount));
			  $("#premium_050919").val(n.premium);
		  }
		  if(n.kindCode=="050918"){
			  $("#amountList_050918").val(n.amountList);
			  $("#amount_050918").val(parseInt(n.amount));
			  $("#premium_050918").val(n.premium);
		  }
		  if(n.kindCode=="050917"){
			  $("#amountList_050917").val(n.amountList);
			  $("#amount_050917").val(parseInt(n.amount));
			  $("#premium_050917").val(n.premium);
		  }
		  if(n.kindCode=="050270"){
			  $("#amountList_050270").val(n.amountList);
			  $("#amount_050270").val(n.amount);
			  $("#premium_050270").val(n.premium);
		  }
		  if(n.kindCode=="050210"){
			  $("#amountList_050210").val(n.amountList);
			  $("#amount_050210").val(parseInt(n.amount));
			  $("#premium_050210").val(n.premium);
		  }
		  if(n.kindCode=="050252"){
			  $("#amountList_050252").val(n.amountList);
			  $("#amount_050252").val(parseInt(n.amount));
			  $("#premium_050252").val(n.premium);
			  $("input[name='carInfo.kindName_050252']").val(n.kindName);
		  }
		  if(n.kindCode=="050291"){
			  $("#amountList_050291").val(n.amountList);
			  $("#amount_050291").val(n.amount);
			  $("#premium_050291").val(n.premium);
			  $("input[name='carInfo.kindName_050291']").val(n.kindName);
		  }
		  if(n.kindCode=="050911"){
			  $("#amountList_050911").val(n.amountList);
			  $("#amount_050911").val(n.amount);
			  $("#premium_050911").val(n.premium);
		  }
		  if(n.kindCode=="050912"){
			  $("#amountList_050912").val(n.amountList);
			  $("#amount_050912").val(n.amount);
			  $("#premium_050912").val(n.premium);
		  }
		  if(n.kindCode=="050921"){
			  $("#amountList_050921").val(n.amountList);
			  $("#amount_050921").val(n.amount);
			  $("#premium_050921").val(n.premium);
		  }
		  if(n.kindCode=="050922"){
			  $("#amountList_050922").val(n.amountList);
			  $("#amount_050922").val(n.amount);
			  $("#premium_050922").val(n.premium);
		  }
		  if(n.kindCode=="050924"){
			  $("#amountList_050924").val(n.amountList);
			  $("#amount_050924").val(n.amount);
			  $("#premium_050924").val(n.premium);
			  $("input[name='carInfo.kindName_050924']").val(n.kindName);
		  }
		  if(n.kindCode=="050928"){
			  $("#amountList_050928").val(n.amountList);
			  $("#amount_050928").val(n.amount);
			  $("#premium_050928").val(n.premium);
		  }
		  if(n.kindCode=="050929"){
			  $("#amountList_050929").val(n.amountList);
			  $("#amount_050929").val(n.amount);
			  $("#premium_050929").val(n.premium);
		  }
		  if(n.kindCode=="050330"){
			  $("#amountList_050330").val(n.amountList);
			  $("#amount_050330").val(n.amount);
		  }
		  if(n.kindCode=="050935"){
			  $("#amountList_050935").val(n.amountList);
			  $("#amount_050935").val(n.amount);
			  $("#premium_050935").val(n.premium);
		  }
	  })
}
function forSelectRule(){
	change_050200();
	
	change_050600();
    
	change_050500();
   
	change_050701();
    
	change_050702();
    
	change_050291();
	
	change_050210();
	
	change_050641();
	
	change_050642();
	
	change_050643();
	
}
function change_050200(){
	var flag = 0;
	if($("#select_050200").is(":visible")&&$("#select_050200").val()=="0"){
		flag = 1;
	}
	if($("#selectFix_050200").is(":visible")&&$("#selectFix_050200").val()=="-1"){
		flag = 1;
	}
	if(flag == 1){
		$("#select_050310").val("0")
		$("#select_050231").val("0")
		$("#select_050270").val("0")
		$("#select_050210").val("0")
		$("#select_050252").val("0")
		$("#select_050291").val("0")
		$("#select_050911").val("0")
		$("#select_050922").val("0")
		$("#select_050924").val("0")
		$("#select_050451").val("0")
		
		$("#select_050310").html("<option value='0'>不投保</option>");
		$("#select_050231").html("<option value='0'>不投保</option>");
		$("#select_050270").html("<option value='0'>不投保</option>");
		$("#select_050210").html("<option value='0'>不投保</option>");
		$("#select_050252").html("<option value='0'>不投保</option>");
		$("#select_050291").html("<option value='0'>不投保</option>");
		$("#select_050911").html("<option value='0'>不投保</option>");
		$("#select_050922").html("<option value='0'>不投保</option>");
		$("#select_050924").html("<option value='0'>不投保</option>");
		$("#select_050451").html("<option value='0'>不投保</option>");
		
	}else{
		var amountList_050310 = $("#amountList_050310").val();//自然损失险
		if(amountList_050310 != "" && amountList_050310 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050310.indexOf("|")!=-1){
				attr = amountList_050310.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attrs!="不投保")
						optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
						else
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
				}
				$("#select_050310").html(selectString);
				$("#select_050310").val(attr[1]);
				
			}
		}else{
			$("#tr_050310").hide()
		}
		var amountList_050231 = $("#amountList_050231").val();//玻璃单独破碎险
		if(amountList_050231 != "" && amountList_050231 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050231.indexOf("|")!=-1){
				attr = amountList_050231.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs='';
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==10){
						attrs="国产玻璃"
					}
					if(attr[i]==20){
						attrs="进口玻璃"
					}
					if(attr[i]==21){
						attrs="进口玻璃(特殊材质)"
					}
					if(attrs!="国产玻璃"&&attrs!="进口玻璃"&&attrs!="不投保"&&attrs!="进口玻璃(特殊材质)")
						optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
						else
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050231").html(selectString);
				$("#select_050231").val(attr[1]);
				
			}
		}else{
			$("#tr_050231").hide()
		}
		var amountList_050270 = $("#amountList_050270").val();//机动车停驶损失险
		if(amountList_050270 != "" && amountList_050270 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050270.indexOf("|")!=-1){
				attr = amountList_050270.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050270").html(selectString);
				$("#select_050270").val(attr[1]);
			}
		}else{
			$("#tr_050270").hide()
		}
		var amountList_050210 = $("#amountList_050210").val();//车身划痕损失险
		if(amountList_050210 != "" && amountList_050210 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050210.indexOf("|")!=-1){
				attr = amountList_050210.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attrs!="不投保")
						optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
						else
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050210").html(selectString);
				$("#select_050210").val(attr[1]);
			}
		}else{
			$("#tr_050210").hide()
		}
		var amountList_050252 = $("#amountList_050252").val();//指定修理厂特约条款
		if(amountList_050252 != "" && amountList_050252 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050252.indexOf("|")!=-1){
				attr = amountList_050252.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050252").html(selectString);
				$("#select_050252").val(1);
//				if($("#premium_050252").val()==0 || $("#premium_050252").val()==""){
//					$("#premium_050252").val("0.00")
//				}
//				if($("#premium_050252").val()!="0.00"){
//					$("#select_050252").val("1");
//				}
//				$("#fee_050252").html(fmoney($("#premium_050252").val()));
			}
		}else{
			$("#tr_050252").hide()
		}
		var amountList_050291 = $("#amountList_050291").val();//发动机
		if(amountList_050291 != "" && amountList_050291 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050291.indexOf("|")!=-1){
				attr = amountList_050291.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050291").html(selectString);
				$("#select_050291").val(1);
//				if($("#premium_050291").val()==0 || $("#premium_050291").val()==""){
//					$("#premium_050291").val("0.00")
//				}
//				if($("#premium_050291").val()!="0.00"){
//					$("#select_050291").val("1");
//				}
//				$("#fee_050291").html(fmoney($("#premium_050291").val()));
			}
		}else{
			$("#tr_050291").hide()
		}
		if(amountList_050310 == ""
			&&amountList_050231 == ""
			&&amountList_050270 == ""
			&&amountList_050210 == ""
			&&amountList_050252 == ""
			&&amountList_050291 == ""
		){
			$("#tr_fujia").hide()
		}
		var amountList_050911 = $("#amountList_050911").val();//附加险不计免赔额--机动车辆损失险
		if(amountList_050911 != "" && amountList_050911 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050911.indexOf("|")!=-1){
				attr = amountList_050911.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050911").html(selectString);
				$("#select_050911").val(1);
			}
		}else{
			$("#tr_050911").hide()
		}
		var amountList_050922 = $("#amountList_050922").val();//附加险不计免赔额--车身划痕损失险
		if(amountList_050922 != "" && amountList_050922 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050922.indexOf("|")!=-1){
				attr = amountList_050922.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050922").html(selectString);
				$("#select_050922").val(1);
			}
		}else{
			$("#tr_050922").hide()
		}
		var amountList_050924 = $("#amountList_050924").val();//附加险不计免赔额--机动车辆损失险
		if(amountList_050924 != "" && amountList_050924 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050924.indexOf("|")!=-1){
				attr = amountList_050924.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
				}
				$("#select_050924").html(selectString);
				$("#select_050924").val(1);
			}
		}else{
			$("#tr_050924").hide()
		}
		var amountList_050451 = $("#amountList_050451").val();//附加险--机动车损失保险无法找到第三方特约险
		if(amountList_050451 != "" && amountList_050451 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050451.indexOf("|")!=-1){
				attr = amountList_050451.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
				}
				$("#select_050451").html(selectString);
				$("#select_050451").val(1);
			}
		}else{
			$("#tr_050451").hide()
		}
		initInsurance("050935");//附加险不计免赔额--自燃损失险
	}

}
function change_050600(){
	if($("#select_050600").val()=="0"){
  		$("#select_050912").val("0")
  		$("#select_050641").val("0")
  		$("#select_050919").val("0")
  		
  		$("#select_050912").html("<option value='0'>不投保</option>");
  		$("#select_050641").html("<option value='0'>不投保</option>");
  		$("#select_050919").html("<option value='0'>不投保</option>");
  	}else{
  		var amountList_050912 = $("#amountList_050912").val();//附加险不计免赔额--第三者责任保险
  		if(amountList_050912 != "" && amountList_050912 != null){
  			var selectString = "";
  			var optionString = "";
  			if(amountList_050912.indexOf("|")!=-1){
  				attr = amountList_050912.split("|");
  				for(var i=0;i<attr.length;i++){
  					var attrs = attr[i];
  					if(attr[i]==0){
  						attrs="不投保"
  					}
  					if(attr[i]==1){
  						attrs="投保"
  					}
  					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
  					selectString = selectString + optionString
  					
  				}
  				$("#select_050912").html(selectString);
  				$("#select_050912").val($("#amount_050912").val());
  				if($("#premium_050912").val()==0 || $("#premium_050912").val()==""){
  					$("#premium_050912").val("0.00")
  				}
  				$("#fee_050912").html(fmoney($("#premium_050912").val()));
  			}
  		}else{
  			$("#tr_050912").hide()
  		}
  		var amountList_050641 = $("#amountList_050641").val();//附加险不计免赔额--精神损害抚慰金责任险（三者险）
  		if(amountList_050641 != "" && amountList_050641 != null){
  			var selectString = "";
  			var optionString = "";
  			if(amountList_050641.indexOf("|")!=-1){
  				attr = amountList_050641.split("|");
  				for(var i=0;i<attr.length;i++){
  					var attrs = attr[i];
  					if(attr[i]==0){
  						attrs="不投保"
  					}
  					if(attr[i]==1){
  						attrs="投保"
  					}
  					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
  					selectString = selectString + optionString
  					
  				}
  				$("#select_050641").html(selectString);
  				$("#select_050641").val($("#amount_050641").val());
  				if($("#premium_050641").val()==0 || $("#premium_050641").val()==""){
  					$("#premium_050641").val("0.00")
  				}
  				$("#fee_050641").html(fmoney($("#premium_050641").val()));
  			}
  		}else{
  			$("#tr_050641").hide()
  		}
  	}
}
function change_050500(){
	if($("#select_050500").val()=="0"||($("#selectFix_050500").val()=='-1'&&$("#selectFix_050500").is(":visible"))){
		 $("#select_050921").val("0")
		 $("#select_050921").html("<option value='0'>不投保</option>");
//		 $("#select_050921").attr("disabled",true)
	 }else{
		 var amountList_050921 = $("#amountList_050921").val();//附加险不计免赔额--盗抢险
			if(amountList_050921 != "" && amountList_050921 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050921.indexOf("|")!=-1){
					attr = amountList_050921.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0||attr[i]==""){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
						
					}
					$("#select_050921").html(selectString);
					if($("#amount_050921").val()==""){
						$("#amount_050921").val(0)
					}
					$("#select_050921").val($("#amount_050921").val());
					if($("#premium_050921").val()==0 || $("#premium_050921").val()==""){
						$("#premium_050921").val("0.00")
					}
					$("#fee_050921").html($("#premium_050921").val());
				}
			}else{
				$("#tr_050921").hide();		//隐藏这行 
			}
	 }
}
function change_050701(){
	 if($("#select_050701").val()=="0"){
		 $("#select_050928").val("0")
		 $("#select_050928").html("<option value='0'>不投保</option>");
		 if($("#select_050702").val()=="0"){
			 $("#select_050642").val("0")
			 $("#select_050918").val("0")
			 $("#select_050642").html("<option value='0'>不投保</option>");
			 $("#select_050918").html("<option value='0'>不投保</option>");
		 }
//		 $("#select_050928").attr("disabled",true)
	 }else{
		 var amountList_050928 = $("#amountList_050928").val();//附加险不计免赔额--车上人员责任险司机
			if(amountList_050928 != "" && amountList_050928 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050928.indexOf("|")!=-1){
					attr = amountList_050928.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
						
					}
					$("#select_050928").html(selectString);
					$("#select_050928").val($("#amount_050928").val());
					if($("#premium_050928").val()==0 || $("#premium_050928").val()==""){
						$("#premium_050928").val("0.00")
					}
					$("#fee_050928").html(fmoney($("#premium_050928").val()));
				}
			}else{
				$("#tr_050928").hide()
			}
			if($("#select_050702").val()=="0"){
				var amountList_050642 = $("#amountList_050642").val();//精神损害抚慰金责任险（车上人员）
				if(amountList_050642 != "" && amountList_050642 != null){
					var selectString = "";
					var optionString = "";
					if(amountList_050642.indexOf("|")!=-1){
						attr = amountList_050642.split("|");
						for(var i=0;i<attr.length;i++){
							var attrs = attr[i];
							if(attr[i]==0){
								attrs="不投保"
							}
							if(attrs!="不投保")
								optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
								else
								optionString = "<option value="+attr[i]+">"+attrs+"</option>";
							selectString = selectString + optionString
							
						}
						$("#select_050642").html(selectString);
						$("#select_050642").val($("#amount_050642").val());
						if($("#premium_050642").val()==0 || $("#premium_050642").val()==""){
							$("#premium_050642").val("0.00")
						}
						$("#fee_050642").html(fmoney($("#premium_050642").val()));
					}
				}else{
					$("#tr_050642").hide()
				}
			}
	 }
}
function change_050702(){
	if($("#select_050702").val()=="0"){
		 $("#select_050929").val("0")
		 $("#select_050929").html("<option value='0'>不投保</option>");
		 if($("#select_050701").val()=="0"){
			 $("#select_050642").val("0")
			 $("#select_050918").val("0")
			 $("#select_050642").html("<option value='0'>不投保</option>");
			 $("#select_050918").html("<option value='0'>不投保</option>");
		 }
	 }else{
		 var amountList_050929 = $("#amountList_050929").val();//附加险不计免赔额--车上人员责任险乘客
			if(amountList_050929 != "" && amountList_050929 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050929.indexOf("|")!=-1){
					attr = amountList_050929.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
					}
					$("#select_050929").html(selectString);
					$("#select_050929").val($("#amount_050929").val());
					if($("#premium_050929").val()==0 || $("#premium_050929").val()==""){
						$("#premium_050929").val("0.00")
					}
					$("#fee_050929").html(fmoney($("#premium_050929").val()));
				}
			}else{
				$("#tr_050929").hide()
			}
			if($("#select_050701").val()=="0"){
				var amountList_050642 = $("#amountList_050642").val();//精神损害抚慰金责任险（车上人员）
				if(amountList_050642 != "" && amountList_050642 != null){
					var selectString = "";
					var optionString = "";
					if(amountList_050642.indexOf("|")!=-1){
						attr = amountList_050642.split("|");
						for(var i=0;i<attr.length;i++){
							var attrs = attr[i];
							if(attr[i]==0){
								attrs="不投保"
							}
							if(attrs!="不投保")
								optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
								else
								optionString = "<option value="+attr[i]+">"+attrs+"</option>";
							selectString = selectString + optionString
							
						}
						$("#select_050642").html(selectString);
						$("#select_050642").val($("#amount_050642").val());
						if($("#premium_050642").val()==0 || $("#premium_050642").val()==""){
							$("#premium_050642").val("0.00")
						}
						$("#fee_050642").html(fmoney($("#premium_050642").val()));
					}
				}else{
					$("#tr_050642").hide()
				}
			}
	 }
}
function change_050291(){
	if($("#select_050291").val()=="0"){
		 $("#select_050924").val("0")
		 $("#select_050924").html("<option value='0'>不投保</option>");
//		 $("#select_050924").attr("disabled",true)
	 }else{
		 var amountList_050924 = $("#amountList_050924").val();//附加险不计免赔额--机动车辆损失险
			if(amountList_050924 != "" && amountList_050924 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050924.indexOf("|")!=-1){
					attr = amountList_050924.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
					}
					$("#select_050924").html(selectString);
					$("#select_050924").val($("#amount_050924").val());
					if($("#premium_050924").val()==0 || $("#premium_050924").val()==""){
						$("#premium_050924").val("0.00")
					}
					$("#fee_050924").html(fmoney($("#premium_050924").val()));
				}
			}else{
				$("#tr_050924").hide()
			}
			if($("#select_050702").val()=="0"){
				
			}
	 }
}
function change_050210(){
	 if($("#select_050210").val()=="0"){
		 $("#select_050922").val("0")
		 $("#select_050922").html("<option value='0'>不投保</option>");
//		 $("#select_050922").attr("disabled",true)
	 }else{
		 var amountList_050922 = $("#amountList_050922").val();//附加险不计免赔额--车身划痕损失险
			if(amountList_050922 != "" && amountList_050922 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050922.indexOf("|")!=-1){
					attr = amountList_050922.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
						
					}
					$("#select_050922").html(selectString);
					$("#select_050922").val($("#amount_050922").val());
					if($("#premium_050922").val()==0 || $("#premium_050922").val()==""){
						$("#premium_050922").val("0.00")
					}
					$("#fee_050922").html(fmoney($("#premium_050922").val()));
				}
			}else{
				$("#tr_050922").hide()
			}
	 }
}
function change_050641(){
	
	if($("#select_050641").val()=="0"){
		 $("#select_050919").val("0")
		 $("#select_050919").html("<option value='0'>不投保</option>");
	 }else{
		 var amountList_050919 = $("#amountList_050919").val();//附加险不计免赔额--
			if(amountList_050919 != "" && amountList_050919 != null){
				var selectString = "";
				var optionString = "";
				if(amountList_050919.indexOf("|")!=-1){
					attr = amountList_050919.split("|");
					for(var i=0;i<attr.length;i++){
						var attrs = attr[i];
						if(attr[i]==0){
							attrs="不投保"
						}
						if(attr[i]==1){
							attrs="投保"
						}
						optionString = "<option value="+attr[i]+">"+attrs+"</option>";
						selectString = selectString + optionString
						
					}
					$("#select_050919").html(selectString);
					$("#select_050919").val($("#amount_050919").val());
					if($("#premium_050919").val()==0 || $("#premium_050919").val()==""){
						$("#premium_050919").val("0.00")
					}
					$("#fee_050919").html(fmoney($("#premium_050919").val()));
				}
			}else{
				$("#tr_050919").hide()
			}
	 }
}
function change_050642(){
	
	if($("#select_050642").val()=="0"){
		$("#select_050918").val("0")
		$("#select_050918").html("<option value='0'>不投保</option>");
	}else{
		var amountList_050918 = $("#amountList_050918").val();//附加险不计免赔额--
		if(amountList_050918 != "" && amountList_050918 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050918.indexOf("|")!=-1){
				attr = amountList_050918.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050918").html(selectString);
				$("#select_050918").val($("#amount_050918").val());
				if($("#premium_050918").val()==0 || $("#premium_050918").val()==""){
					$("#premium_050918").val("0.00")
				}
				$("#fee_050918").html(fmoney($("#premium_050918").val()));
			}
		}else{
			$("#tr_050918").hide()
		}
	}
}
function forInit(){
	//保费赋值
	 $("#allFeeShow").html(fmoney($("#allFee").val(),2));
	 $("#BasicPackage").html(fmoney($("#forAllFee").val(),2));
	 $("#showSY").html(fmoney($("#forAllFee").val(),2));
	 $("#jqFeeShow").html(fmoney($("#jqFee").val(),2));
	 $("#shipFeeShow").html(fmoney($("#shipFee").val(),2));
	 //险种名称复制
	 $("#kindName_050924_td").html($("input[name='carInfo.kindName_050924']").val())
	 $("#kindName_050291_td").html($("input[name='carInfo.kindName_050291']").val())
	 $("#kindName_050252_td").html($("input[name='carInfo.kindName_050252']").val())
	
	var attr = "";
	var amountList_050200 = $("#amountList_050200").val();//机动车辆损失险
	if($("#isModify_050200").val()==false){
		$("#noModify_050200").show();
		$("#Modify_050200").hide();
	}else if($("#isModify_050200").val()==true){
		$("#noModify_050200").hide();
		$("#Modify_050200").show();
	}
	if($("#proSelected").val() == "36000000"){
		$("#td_050252").html("指定专修厂特约条款");
	}
	if(amountList_050200 != "" && amountList_050200 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050200.indexOf("|")!=-1){
			attr = amountList_050200.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
				optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
				else
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050200").html(selectString);
			$("#select_050200").val($("#amount_050200").val());
			if($("#premium_050200").val()==0 || $("#premium_050200").val()==""){
				$("#premium_050200").val("0.00")
			}
			$("#fee_050200").html(fmoney($("#premium_050200").val(),2));
			
		}
		
		//车损险浮动情况
		  if( $("#userPriceConf").val()==1){
			  $("#noModify_050200").hide();
			  $("#Modify_050200").show();
			  $("#actualPriceShow").val($("#actualPrice").val())
			  $("#selectFix_050200").val(1)
//			  $("#selectFix_050200").html("<option value='-1'>不投保</option>")
			  $("#actualPriceShow").attr("disabled",false);
			  if($("#actualPrice").val()==-1||$("#premium_050200").val()=="0.00"||$("#premium_050200").val()==""){
				  var userAgent = window.navigator.userAgent;
	    		if(userAgent.indexOf("iPhone")>-1){
	    			$("#actualPriceShow").val("");
	    		}else{
	    			$("#actualPriceShow").val("不投保");
	    		}
				  $("#actualPriceShow").attr("disabled","disabled");
				  $("#selectFix_050200").val(-1)
				  $("#actualPrice").val("-1")
//				  $("#selectFix_050200").html("<option value='1'>投保</option>")
			  }
			  $("#purchasePrice").html("金额范围"+ $("#purchasePriceMin").val() + "-" + $("#purchasePriceMax").val())
		  }
		}else{
			$("#tr_050200").hide()
		}
	
	var amountList_050600 = $("#amountList_050600").val();//第三者责任险
	if(amountList_050600 != "" && amountList_050600 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050600.indexOf("|")!=-1){
			attr = amountList_050600.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
				optionString = "<option value="+attr[i]+">"+moneyW(attrs)+"</option>";
				else
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050600").html(selectString);
			$("#select_050600").val($("#amount_050600").val());
			if($("#premium_050600").val()==0 || $("#premium_050600").val()==""){
				$("#premium_050600").val("0.00")
			}
			$("#fee_050600").html(fmoney($("#premium_050600").val()));
		}
	}else{
		$("#tr_050600").hide()
	}
	var amountList_050500 = $("#amountList_050500").val();//盗抢险
	if(amountList_050500 != "" && amountList_050500 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050500.indexOf("|")!=-1){
			attr = amountList_050500.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050500").html(selectString);
			$("#select_050500").val($("#amount_050500").val());
			if($("#premium_050500").val()==0 || $("#premium_050500").val()==""){
				$("#premium_050500").val("0.00")
			}
			$("#fee_050500").html(fmoney($("#premium_050500").val()));
			
		}
		//盗抢险险浮动情况
		  if( $("#bmflag").val()==1){
			  $("#noModify_050500").hide();
			  $("#Modify_050500").show();
			  $("#theftProtActual").val($("#amount_050500").val())
			  $("#selectFix_050500").val(1)
			  $("#theftProtActual").attr("disabled",false);
			  if($("#premium_050500").val()=="0.00"||$("#premium_050500").val()==""||$("#amount_050500").val()=='-1'){
				  var userAgent = window.navigator.userAgent;
	    		if(userAgent.indexOf("iPhone")>-1){
	    			$("#theftProtActual").val("");
	    		}else{
	    			$("#theftProtActual").val("不投保");
	    		}
				  $("#theftProtActual").attr("disabled","disabled");
				  $("#selectFix_050500").val(-1)
			  }
			  $("#theftProt").html("金额范围"+ $("#theftProtMin").val() + "-" + $("#theftProtMax").val())
		  }
	}else{
		$("#tr_050500").hide();		//隐藏这行
	}
	
	var amountList_050701 = $("#amountList_050701").val();//车上人员责任司机
	if(amountList_050701 != "" && amountList_050701 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050701.indexOf("|")!=-1){
			attr = amountList_050701.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+moneyW(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050701").html(selectString);
			$("#select_050701").val($("#amount_050701").val());
			if($("#premium_050701").val()==0 || $("#premium_050701").val()==""){
				$("#premium_050701").val("0.00")
			}
			$("#fee_050701").html(fmoney($("#premium_050701").val()));
		}
	}else{
		$("#tr_050701").hide()
	}
	var amountList_050702 = $("#amountList_050702").val();//车上人员责任险乘客
	if(amountList_050702 != "" && amountList_050702 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050702.indexOf("|")!=-1){
			attr = amountList_050702.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+moneyW(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050702").html(selectString);
			var seat = parseInt($("input[name='carInfo.seatCount']").val())-1;
			$("#select_050702").val(parseInt($("#amount_050702").val())/seat);
			if($("#premium_050702").val()==0 || $("#premium_050702").val()==""){
				$("#premium_050702").val("0.00")
			}
			$("#fee_050702").html(fmoney($("#premium_050702").val()));
		}
	}else{
		$("#tr_050702").hide()
	}
	var amountList_050310 = $("#amountList_050310").val();//自然损失险
	if(amountList_050310 != "" && amountList_050310 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050310.indexOf("|")!=-1){
			attr = amountList_050310.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050310").html(selectString);
			$("#select_050310").val($("#amount_050310").val());
			if($("#premium_050310").val()==0 || $("#premium_050310").val()==""){
				$("#premium_050310").val("0.00")
			}
			$("#fee_050310").html(fmoney($("#premium_050310").val()));
		}
	}else{
		$("#tr_050310").hide()
	}
	var amountList_050231 = $("#amountList_050231").val();//玻璃单独破碎险
	if(amountList_050231 != "" && amountList_050231 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050231.indexOf("|")!=-1){
			attr = amountList_050231.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs='';
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==10){
					attrs="国产玻璃"
				}
				if(attr[i]==20){
					attrs="进口玻璃"
				}
				if(attr[i]==21){
					attrs="进口玻璃(特殊材质)"
				}
				if(attrs!="国产玻璃"&&attrs!="进口玻璃"&&attrs!="不投保"&&attrs!="进口玻璃(特殊材质)")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050231").html(selectString);
			$("#select_050231").val($("#amount_050231").val());
			if($("#premium_050231").val()==0 || $("#premium_050231").val()==""){
				$("#premium_050231").val("0.00")
			}
			$("#fee_050231").html(fmoney($("#premium_050231").val()));
		}
	}else{
		$("#tr_050231").hide()
	}
	var amountList_050641 = $("#amountList_050641").val();//精神损害抚慰金责任险（三者险）
	if(amountList_050641 != "" && amountList_050641 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050641.indexOf("|")!=-1){
			attr = amountList_050641.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050641").html(selectString);
			$("#select_050641").val($("#amount_050641").val());
			if($("#premium_050641").val()==0 || $("#premium_050641").val()==""){
				$("#premium_050641").val("0.00")
			}
			$("#fee_050641").html(fmoney($("#premium_050641").val()));
		}
	}else{
		$("#tr_050641").hide()
	}
	var amountList_050642 = $("#amountList_050642").val();//精神损害抚慰金责任险（车上人员）
	if(amountList_050642 != "" && amountList_050642 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050642.indexOf("|")!=-1){
			attr = amountList_050642.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050642").html(selectString);
			$("#select_050642").val($("#amount_050642").val());
			if($("#premium_050642").val()==0 || $("#premium_050642").val()==""){
				$("#premium_050642").val("0.00")
			}
			$("#fee_050642").html(fmoney($("#premium_050642").val()));
		}
	}else{
		$("#tr_050642").hide()
	}
	var amountList_050643 = $("#amountList_050643").val();//精神损害抚慰金责任险 二合一
	if(amountList_050643 != "" && amountList_050643 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050643.indexOf("|")!=-1){
			attr = amountList_050643.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050643").html(selectString);
			$("#select_050643").val($("#amount_050643").val());
			if($("#premium_050643").val()==0 || $("#premium_050643").val()==""){
				$("#premium_050643").val("0.00")
			}
			$("#fee_050643").html(fmoney($("#premium_050643").val()));
		}
	}else{
		$("#tr_050643").hide()
	}
	var amountList_050451 = $("#amountList_050451").val();//机动车损失保险无法找到第三方特约险
	if(amountList_050451 != "" && amountList_050451 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050451.indexOf("|")!=-1){
			attr = amountList_050451.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050451").html(selectString);
			$("#select_050451").val($("#amount_050451").val());
			if($("#premium_050451").val()==0 || $("#premium_050451").val()==""){
				$("#premium_050451").val("0.00")
			}
			if($("#premium_050451").val()!="0.00"){
				$("#select_050451").val("1");
			}
			$("#fee_050451").html(fmoney($("#premium_050451").val()));
		}
	}else{
		$("#tr_050451").hide()
	}
	var amountList_050270 = $("#amountList_050270").val();//机动车停驶损失险
	if(amountList_050270 != "" && amountList_050270 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050270.indexOf("|")!=-1){
			attr = amountList_050270.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050270").html(selectString);
			$("#select_050270").val($("#amount_050270").val());
			if($("#premium_050270").val()==0 || $("#premium_050270").val()==""){
				$("#premium_050270").val("0.00")
			}
			$("#fee_050270").html(fmoney($("#premium_050270").val()));
		}
	}else{
		$("#tr_050270").hide()
	}
	var amountList_050210 = $("#amountList_050210").val();//车身划痕损失险
	if(amountList_050210 != "" && amountList_050210 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050210.indexOf("|")!=-1){
			attr = amountList_050210.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attrs!="不投保")
					optionString = "<option value="+attr[i]+">"+fmoney(attrs)+"</option>";
					else
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050210").html(selectString);
			$("#select_050210").val($("#amount_050210").val());
			if($("#premium_050210").val()==0 || $("#premium_050210").val()==""){
				$("#premium_050210").val("0.00")
			}
			$("#fee_050210").html(fmoney($("#premium_050210").val()));
		}
	}else{
		$("#tr_050210").hide()
	}
	var amountList_050252 = $("#amountList_050252").val();//指定修理厂特约条款
	if(amountList_050252 != "" && amountList_050252 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050252.indexOf("|")!=-1){
			attr = amountList_050252.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050252").html(selectString);
			$("#select_050252").val($("#amount_050252").val());
			if($("#premium_050252").val()==0 || $("#premium_050252").val()==""){
				$("#premium_050252").val("0.00")
			}
			if($("#premium_050252").val()!="0.00"){
				$("#select_050252").val("1");
			}
			$("#fee_050252").html(fmoney($("#premium_050252").val()));
			
			$("#tr_050252").show();
		}
	}else{
		$("#tr_050252").hide()
	}
	var amountList_050291 = $("#amountList_050291").val();//发动机
	if(amountList_050291 != "" && amountList_050291 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050291.indexOf("|")!=-1){
			attr = amountList_050291.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050291").html(selectString);
			$("#select_050291").val($("#amount_050291").val());
			if($("#premium_050291").val()==0 || $("#premium_050291").val()==""){
				$("#premium_050291").val("0.00")
			}
			if($("#premium_050291").val()!="0.00"){
				$("#select_050291").val("1");
			}
			$("#fee_050291").html(fmoney($("#premium_050291").val()));
		}
	}else{
		$("#tr_050291").hide()
	}
	if(amountList_050310 == ""
		&&amountList_050231 == ""
		&&amountList_050270 == ""
		&&amountList_050210 == ""
		&&amountList_050252 == ""
		&&amountList_050291 == ""){
		$("#tr_fujia").hide()
	}
	var amountList_050911 = $("#amountList_050911").val();//附加险不计免赔额--机动车辆损失险
	if(amountList_050911 != "" && amountList_050911 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050911.indexOf("|")!=-1){
			attr = amountList_050911.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050911").html(selectString);
			$("#select_050911").val($("#amount_050911").val());
			if($("#premium_050911").val()==0 || $("#premium_050911").val()==""){
				$("#premium_050911").val("0.00")
			}
			$("#fee_050911").html(fmoney($("#premium_050911").val()));
		}
	}else{
		$("#tr_050911").hide()
	}
	var amountList_050912 = $("#amountList_050912").val();//附加险不计免赔额--第三者责任保险
	if(amountList_050912 != "" && amountList_050912 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050912.indexOf("|")!=-1){
			attr = amountList_050912.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050912").html(selectString);
			$("#select_050912").val($("#amount_050912").val());
			if($("#premium_050912").val()==0 || $("#premium_050912").val()==""){
				$("#premium_050912").val("0.00")
			}
			$("#fee_050912").html(fmoney($("#premium_050912").val()));
		}
	}else{
		$("#tr_050912").hide()
	}
	var amountList_050921 = $("#amountList_050921").val();//附加险不计免赔额--盗抢险
	if(amountList_050921 != "" && amountList_050921 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050921.indexOf("|")!=-1){
			attr = amountList_050921.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0||attr[i]==""){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050921").html(selectString);
			if($("#amount_050921").val()==""){
				$("#amount_050921").val(0)
			}
			$("#select_050921").val($("#amount_050921").val());
			if($("#premium_050921").val()==0 || $("#premium_050921").val()==""){
				$("#premium_050921").val("0.00")
			}
			$("#fee_050921").html($("#premium_050921").val());
		}
	}else{
		$("#tr_050921").hide();		//隐藏这行 
	}
	
	var amountList_050919 = $("#amountList_050919").val();//附加险不计免赔额--精神损害抚慰金责任险（三者险）
	if(amountList_050919 != "" && amountList_050919 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050919.indexOf("|")!=-1){
			attr = amountList_050919.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050919").html(selectString);
			$("#select_050919").val($("#amount_050919").val());
			if($("#premium_050919").val()==0 || $("#premium_050919").val()==""){
				$("#premium_050919").val("0.00")
			}
			$("#fee_050919").html(fmoney($("#premium_050919").val()));
		}
	}else{
		$("#tr_050919").hide()
	}
	
	var amountList_050918 = $("#amountList_050918").val();//附加险不计免赔额--精神损害抚慰金责任险（车上人员）
	if(amountList_050918 != "" && amountList_050918 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050918.indexOf("|")!=-1){
			attr = amountList_050918.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050918").html(selectString);
			$("#select_050918").val($("#amount_050918").val());
			if($("#premium_050918").val()==0 || $("#premium_050918").val()==""){
				$("#premium_050918").val("0.00")
			}
			$("#fee_050918").html(fmoney($("#premium_050918").val()));
		}
	}else{
		$("#tr_050918").hide()
	}
	var amountList_050917 = $("#amountList_050917").val();//附加险不计免赔额--精神损害抚慰金责任险（二合一）
	if(amountList_050917 != "" && amountList_050917 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050917.indexOf("|")!=-1){
			attr = amountList_050917.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050917").html(selectString);
			$("#select_050917").val($("#amount_050917").val());
			if($("#premium_050917").val()==0 || $("#premium_050917").val()==""){
				$("#premium_050917").val("0.00")
			}
			$("#fee_050917").html(fmoney($("#premium_050917").val()));
		}
	}else{
		$("#tr_050917").hide()
	}
	
	var amountList_050922 = $("#amountList_050922").val();//附加险不计免赔额--车身划痕损失险
	if(amountList_050922 != "" && amountList_050922 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050922.indexOf("|")!=-1){
			attr = amountList_050922.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050922").html(selectString);
			$("#select_050922").val($("#amount_050922").val());
			if($("#premium_050922").val()==0 || $("#premium_050922").val()==""){
				$("#premium_050922").val("0.00")
			}
			$("#fee_050922").html(fmoney($("#premium_050922").val()));
		}
	}else{
		$("#tr_050922").hide()
	}
	var amountList_050924 = $("#amountList_050924").val();//附加险不计免赔额--机动车辆损失险
	if(amountList_050924 != "" && amountList_050924 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050924.indexOf("|")!=-1){
			attr = amountList_050924.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050924").html(selectString);
			$("#select_050924").val($("#amount_050924").val());
			if($("#premium_050924").val()==0 || $("#premium_050924").val()==""){
				$("#premium_050924").val("0.00")
			}
			$("#fee_050924").html(fmoney($("#premium_050924").val()));
		}
	}else{
		$("#tr_050924").hide()
	}
	var amountList_050928 = $("#amountList_050928").val();//附加险不计免赔额--车上人员责任险司机
	if(amountList_050928 != "" && amountList_050928 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050928.indexOf("|")!=-1){
			attr = amountList_050928.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
				
			}
			$("#select_050928").html(selectString);
			$("#select_050928").val($("#amount_050928").val());
			if($("#premium_050928").val()==0 || $("#premium_050928").val()==""){
				$("#premium_050928").val("0.00")
			}
			$("#fee_050928").html(fmoney($("#premium_050928").val()));
		}
	}else{
		$("#tr_050928").hide()
	}
	var amountList_050929 = $("#amountList_050929").val();//附加险不计免赔额--车上人员责任险乘客
	if(amountList_050929 != "" && amountList_050929 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050929.indexOf("|")!=-1){
			attr = amountList_050929.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050929").html(selectString);
			$("#select_050929").val($("#amount_050929").val());
			if($("#premium_050929").val()==0 || $("#premium_050929").val()==""){
				$("#premium_050929").val("0.00")
			}
			$("#fee_050929").html(fmoney($("#premium_050929").val()));
		}
	}else{
		$("#tr_050929").hide()
	}
	var amountList_050330 = $("#amountList_050330").val();//车损险可选免赔额特约条款
	if(amountList_050330 != "" && amountList_050330 != null){
		var selectString = "";
		var optionString = "";
		if(amountList_050330.indexOf("|")!=-1){
			attr = amountList_050330.split("|");
			for(var i=0;i<attr.length;i++){
				var attrs = attr[i];
				if(attr[i]==0){
					attrs="不投保"
				}
				if(attr[i]==1){
					attrs="投保"
				}
				optionString = "<option value="+attr[i]+">"+attrs+"</option>";
				selectString = selectString + optionString
			}
			$("#select_050330").html(selectString);
			$("#select_050330").val(parseInt($("#amount_050330").val()));
		}
	}else{
		$("#tr_050330").hide()
	}
	initInsurance("050935");//附加险不计免赔额--自燃损失险
	if(amountList_050911 == "" &&amountList_050912 == ""&&amountList_050921 == ""&&amountList_050922 == ""&&amountList_050924 == ""&&amountList_050928 == ""&&amountList_050929 == ""&&amountList_050330 == ""){
		$("#tr_mianpei").hide()
	}
	$("table").find("tr").each(function(){
		if($(this).is(":visible")){
			trNo = trNo + 1;
		}
	});
	$(".calculating").hide();
}
//返回第二步操作
function backToTwo(){
	var ctx = $("#ctx").val();
	var form = $("#form");
	form.attr("action",ctx+"/carProposal/car/carBackInput2");
	$("input[name='carCodex']").val('');	//置空 通过过滤
	form.submit();
}
//跳转到信息填写页面
var shanxiHighPriRem = 0;
function goInput(){
	//河北过户车提示
	var hebiCityCode = $("#proSelected").val();
	var guohu = $("input[name='carInfo.guohuselect']").val();
	var tx = $("#tishi").val();
	if(hebiCityCode=="13000000" && tx=="0" && $("#userPriceConf").val()==0 && $("#premium_050200").val()!=0){
		var carLicenseDate = $("input[name='carInfo.transferdate']").val(); 
		var startDateSY = $("input[name='carInfo.startDateSY']").val(); 
		var startDateJQ = $("input[name='carInfo.startDateCI']").val(); 
		if(startDateSY != null){ 
		startDateSY = new Date(replace(startDateSY,"-","/")); 
		} 
		if(startDateJQ != null){ 
		startDateJQ = new Date(replace(startDateJQ,"-","/")); 
		} 
		if(carLicenseDate != null){ 
		carLicenseDate = new Date(replace(carLicenseDate,"-","/")); 
		} 
		var guohuUserMonths = 0; 
		if(!isNaN(startDateSY) && !isNaN(carLicenseDate)){ 
		guohuUserMonths = (startDateSY.getFullYear() - carLicenseDate.getFullYear()) * 12 + 
		(startDateSY.getMonth() - carLicenseDate.getMonth()); 

		if(startDateSY.getDate()-carLicenseDate.getDate()>0){ 
		guohuUserMonths++; 
		} 
		}else if(!isNaN(startDateJQ) && !isNaN(carLicenseDate)){ 
		guohuUserMonths = (startDateJQ.getFullYear() - carLicenseDate.getFullYear()) * 12 + 
		(startDateJQ.getMonth() - carLicenseDate.getMonth()); 
		if(startDateJQ.getDate()-carLicenseDate.getDate()>0){ 
		guohuUserMonths++; 
		} 
		} 
		var tishi = "";
		if(guohuUserMonths<=15  && guohu=="1"){
			tishi = "温馨提示：车损险不足额投保，出险时按保险金额与新车购置价之比例赔付。";
		}else{
			tishi = "温馨提示：您的车辆车龄较长，车损险不足额投保，出险时按保险金额与新车购置价之比例赔付。";
		}
		$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
  		$("#alertMsg").html(tishi+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
  		$("#tishi").val("1");
  		return false;
	}
	
	//页面元素校验
	var taxPayerName = $("#TaxPayerName");//纳税人姓名
    var taxPayerIdentNo = $("#TaxPayerIdentNo"); //纳税人身份证号码
    if(taxPayerName.is(":visible")){
	    if(!checkTaxPayerName_new(taxPayerName)){
	    	return false;
	    }
    }
    if(taxPayerIdentNo.is(":visible")){
	    if(!checkTaxerAndCarOwnerIdentifyNumber(taxPayerIdentNo)){
	    	return false;
	    }
    }
    //如果没有纳税人起保日期证件号码等信息处理
    if($("#trafficInsureBody").is(":visible")){
    	if($("#trafficInsurePolicyDate").length<=0){
    		$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val());
    		$("input[name='carInfo.starthourCI']").val($("input[name='carInfo.startHourSY']").val());
    		$("input[name='carInfo.endDateCI']").val($("input[name='carInfo.endDateSY']").val());
    		$("input[name='carInfo.endhourCI']").val($("input[name='carInfo.endHourSY']").val());
    	}
    	
    	if($("#TaxPayerIdentType").length==0){
    		$("input[name='carInfo.taxpayertype']").val("01");
    	}else{
    		$("input[name='carInfo.taxpayertype']").val($("#TaxPayerIdentType").val());
    	}
    	
    }
    //修改商业险保费后   没点重新计算
    if($("#selectChange").val()=="1"){
    	showInvalidTips($("#showSY").parents(".commercial_combo"), "请重新计算商业险保费！", true);
    	return false;
    }
    if($("#startDate").is(":visible") && !selectHourCI()){
	   return false;
	}
	if($("#allFeeShow").text()=="0.00"||$("#allFeeShow").text()=="0"){
		cueAlert("您还没有选择险种。",{"name":"我知道了","fun":"closeCue"})
		return false;
	}

    //是否投保商业险
    if($("#showSY").html()=="0.00"||$("#feeFlag").val()==0){
    	$("input[name='carInfo.hasSy']").val(0)
    }else{
    	$("input[name='carInfo.hasSy']").val(1)
    }
    //调用核保接口，
    var ctx = $("#ctx").val();
    var licenseno = $("input[name='carInfo.licenseNo']").val();
    if(licenseno==""&&$("input[name='carInfo.isNewCar']").val()=="0"){
    	licenseno = "沪*";
    }
    var changchunTip = 0;
    if($("input[name='carInfo.carNameSXId']").val()==1){//这隐藏域除了用于山西，还用于长春提示
    	changchunTip = 1;
    }
    $.ajax({
		
		  url:ctx+"/carProposal/underWrite/underWrite",
		  type:"post",
		  data: {
			  channelNo:$("input[name='head.channelNo']").val(),
			  proSelected:$("#proSelected").val(),
			  citySelected:$("#citySelected").val(),
			  startdate:$("input[name='carInfo.startDateSY']").val(),
			  starthour:$("input[name='carInfo.startHourSY']").val(),
              enddate:$("input[name='carInfo.endDateSY']").val(),
              endhour:$("input[name='carInfo.endHourSY']").val(),
              startDateCI:$("input[name='carInfo.startDateCI']").val(),
              startHourCI:$("input[name='carInfo.starthourCI']").val(),
              endDateCI:$("input[name='carInfo.endDateCI']").val(),
              endHourCI:$("input[name='carInfo.endhourCI']").val(),
              licenseno:licenseno,  
              engineno:$("input[name='carInfo.engineNo']").val(),
              vinno:$("input[name='carInfo.vinNo']").val(),
              frameno:$("input[name='carInfo.frameNo']").val(),
              seatcount:$("input[name='carInfo.seatCount']").val(),
              carOwner:$("input[name='carInfo.carOwner']").val(),
              isRenewal:$("input[name='carInfo.isRenewal']").val(),
              enrolldate:$("input[name='carInfo.enrollDate']").val(),
              guohuselect:$("input[name='carInfo.guohuselect']").val(),
              nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
              licenseflag:$("input[name='carInfo.isNewCar']").val(),//$("input[name='carInfo.licenseFlag']").val(),
              newcarflag:$("input[name='carInfo.isNewCar']").val(),
              transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
              oldPolicyNo:$("input[name='carInfo.beforeProposalNo']").val(),
              isBZ:$("#hasBz").val(),
              hasSy:$("input[name='carInfo.hasSy']").val(),
			  sessionId:$("#sessionId").val(),
			  seatflag :$("input[name='carInfo.seatFlag']").val(),
			  isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
              lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
              lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
              lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
              runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
			    LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
			  carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
			  travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
 			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
  			   ccaID:$("input[name='carInfo.ccaId']").val(),
  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
			  shanxiHighPriRem:shanxiHighPriRem,
			  changChunTip:changchunTip,   //长春一次性提示wap-4313  需要找一个个性地区没用的隐藏域记忆
			  insuredname:$("input[name='carInfo.insuredName']").val(),
			  identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
			  identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
			  revokeFlag:$("#revokeFlag").val(),
			  revokeCount:$("#revokeCount").val()
		  },
		  dataType:"json",
	  success: function(data){
		  var s = eval("("+data.common+")");//转换为json对象
		  if(s.resultCode=="8"){
			  $("input[name='carInfo.startDateSY']").val(replace(data.startDateSY,"/","-"));
		  	  $("input[name='carInfo.startHourSY']").val(parseInt(data.startHourSY));
		  	  changeStartDateSYForEnd();
			  //$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
//			  if($("#proSelected").val()=='33000000'){//要求点击确定重新计算保费
		  	  var startDate = data.startDateSY.replace("/","年").replace("/","月")+"日"+parseInt(data.startHourSY)+"时";
			  var msg = "亲，您选择的商业险保险期间与上张保单有重复，系统已自动调整为"+startDate;
			  $("#cueMsg").text(msg);
			  $("#cueMsg").parent().show();
			  //$("#alertMsg").html(s.resultMsg+'<br><input type="button" onclick="underwriteCheckProfitAjax()"class="closerButton" value="确 &nbsp;&nbsp; 定" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
//			  }else{
//				  $("#alertMsg").html(s.resultMsg+'<br><input type="button"class="closerButton" value="确 &nbsp;&nbsp; 定" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
//			  }
			  underwriteCheckProfitAjax();
	    	  return false;
		  }
		  else if(s.resultCode=="11"){
			  $("input[name='carInfo.carNameSXId']").val(1);//这隐藏域除了用于山西，还用于长春提示
			  $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		  	  $("#alertMsg").html(s.resultMsg+'<br><input type="button"class="closerButton" value="确 &nbsp;&nbsp; 定" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
	    	  return false
		  }
		  else if(s.resultCode=="1"){
			  	//如果显示交强险保单生效日期，则在下一步的时候提示 交强险日期和保单生效日期
			    if($("#jqDataFlag").val()==0&&$("#trafficInsurePolicyDate").is(":visible")){
			    	if($("#forAllFee").val()!="0"){
			    		$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
			    		var tempDate = new Date(farmatDate4IOS($("#trafficInsurePolicyDate").val()));
			    		var jqDate =  tempDate.getFullYear() + "年" + (tempDate.getMonth()+1) + "月" + tempDate.getDate()+"日"+$("#startDate").val();
			    		var sytemp = new Date(farmatDate4IOS($("input[name='carInfo.startDateSY']").val()));
			    		var syDate = sytemp.getFullYear() + "年" + (sytemp.getMonth()+1) + "月" + sytemp.getDate()+"日"+$("input[name='carInfo.startHourSY']").val();
			    		var msg = "尊敬的用户，您好！<br>您的商业险起保日期为："+syDate+"时。<br>交强险起保日期为："+jqDate+"时。<br>请您再次确认。"
			    		$("#alertMsg").html(msg+'<br><input type="button" value="关 &nbsp;&nbsp; 闭" class="closerButton"style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
			    		$("#alertMsg").css({'width':'90%',"margin-left":'-20px'});
			    		$("#jqDataFlag").val(1)
			    		return false;
			    	}
			    	
			    }
			    //是否需要验车
			    $("#isCheckCar").val(data.isCheckCar);
			  	//是否显示车主秘书   0否1是
			  	$("input[name='carInfo.carOwner_remindFlag']").val(data.carOwner_remindFlag);
				//是否显示i保养   0否1是
			  	$("input[name='carInfo.ibaoyangFlag']").val(data.ibaoyangFlag);
				//是否显示"惠"加油   0否1是
			  	$("input[name='carInfo.refuel']").val(data.refuel);
			    //是否显示“投保油礼”  0否1是
			  	$("input[name='carInfo.oilgift']").val(data.oilgift);
			  //是否显示“i洗车”  0否1是
			  	$("input[name='carInfo.iwashCar']").val(data.iwashCar);
			  //是否显示“i无忧”  0否1是
			  	$("input[name='carInfo.inoWorry']").val(data.inoWorry);
			  	//发票显示类型
			  	$("#isInvoice").val(data.isInvoice);
			    //下一步时赋值为2   返回来的时候不调用报价接口  通过记忆显示报价页面
//			    $("input[name='carInfo.flagForFeeAjax']").val(2);//由于费改在初始化算费信息中带出状态故每次进入算费页面都重新初始化算费
//			  	$("#hasBz").val(2);
			    //将所有保障项目的默认保额记忆
			    $("#amount_050200").val($("#select_050200").val());
			    //车损险浮动情况
				 if($("#userPriceConf").val()==1){
					 $("#amount_050200").val($("#actualPrice").val())
				 }
			    $("#amount_050600").val($("#select_050600").val());
			    $("#amount_050500").val($("#select_050500").val());
			    //盗抢险浮动
			    if($("#bmflag").val()=='1'){
			    	if($("#selectFix_050500").val()=='-1'){
			    		$("#amount_050500").val('-1')
			    	}else{
			    		$("#amount_050500").val($("#theftProtActual").val())
			    	}
			    }
			    $("#amount_050701").val($("#select_050701").val());
			    
			    var seat = parseInt($("input[name='carInfo.seatCount']").val())-1;
			    $("#amount_050702").val(parseInt($("#select_050702").val())*seat);
			    $("#amount_050310").val($("#select_050310").val());
			    $("#amount_050231").val($("#select_050231").val());
			    $("#amount_050270").val($("#select_050270").val());
			    $("#amount_050210").val($("#select_050210").val());
			    $("#amount_050252").val($("#select_050252").val());
			    $("#amount_050291").val($("#select_050291").val());
			    $("#amount_050911").val($("#select_050911").val());
			    $("#amount_050912").val($("#select_050912").val());
			    $("#amount_050921").val($("#select_050921").val());
			    $("#amount_050922").val($("#select_050922").val());
			    $("#amount_050924").val($("#select_050924").val());
			    $("#amount_050928").val($("#select_050928").val());
			    $("#amount_050929").val($("#select_050929").val());
			    $("#amount_050330").val($("#select_050330").val());
			    $("#amount_050935").val($("#select_050935").val());
			    $("#amount_050641").val($("#select_050641").val());
			    $("#amount_050642").val($("#select_050642").val());
			    $("#amount_050451").val($("#select_050451").val());
			    $("#amount_050918").val($("#select_050918").val());
			    $("#amount_050919").val($("#select_050919").val());
			    
			    //交强险起保时间赋值   如果有的话
			    if($("#trafficInsurePolicyDate").length>0){
			    	$("input[name='carInfo.startDateCI']").val($("#trafficInsurePolicyDate").val())
			    }
			    $("#tjCarSureFlag").val("1");
				var form = $("#form");
				$("input[name='carCodex']").val('');	//置空 通过过滤
				zanCun();
				
				var isOff = data.isOff;//判断是否脱保的标志
		   		var retMsg = data.retMsg;//脱保回呼提示
		   		
				//跳转之前将车险返回提示信息弹窗
				if('1' == data.isVehicle || '1' == data.ifPayFlag || '1' == data.isCheckCar){
					//取消之前的提示框
		    		/*$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		    		var msg= s.resultMsg; 
		    	    var start =msg.indexOf('非常抱歉'); 
		    	    if(start> -1){  
		    	    	var end  = msg.lastIndexOf("。");  
		    	    	var Msg = msg.substring(start,end+1); 
		    	    	msg = Msg.replace(/；非常/, '<br/>非常');  
		    	    }
		    		$("#alertMsg").html(msg + '<br>');
		    	 	if("1"==isOff){
						 var input = "<input type='button' onClick=\"cueConfirm('"+retMsg+"',{'name':'继续投保','fun':'continueCue'},{'name':'返回修改','fun':'closeCue'})\" value='确 &nbsp;&nbsp; 定' class='closerButton' style='margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));'>";
					}else{
						var input = '<input type="button" onClick="$(\'#form\').submit()" value="确 &nbsp;&nbsp; 定" class="closerButton"style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">';
					}
		    		
		    		$("#alertMsg").html(msg + '<br>' + input);    */
					$('#form').submit();
		    		return false;
				}
				
			   	if("1"==isOff){
					 cueConfirm(retMsg,{"name":"继续投保","fun":"continueCue"},{"name":"返回修改","fun":"closeCue"});
					 return false;
				}
				form.submit();
			  } else if(s.resultCode=="4"){
				  if(s.resultMsg.indexOf("请您修改今年保单的生效日期")>-1){
					  var msg = "<p style='margin-bottom:2rem;'>"+s.resultMsg+"</p>";
					  var btn = {"name":"我知道了","fun":"closeCue"};
					  cueAlert(msg,btn);
					  return false;
				  }
				  if("re"==s.resultMsg.toLowerCase()){
					  var msg = "<p style='margin-bottom:2rem;'>对不起，您的车辆未到续保日期。</p>";
					  var btn = {"name":"我知道了","fun":"closeCue"};
					  cueAlert(msg,btn);
					  return false;
				  }
				  
				  $("#needRevokeHBCount").val($("#needRevokeHBCount").val()-1);
				  if($("#ro_cityCode").val().substring(0,2)=="11"){//撤单流程区分北京
					  if(s.resultMsg.substring(0,2)=="KK" || s.resultMsg.substring(0,2)=="KL"){
						  orgnizeRevokeInfo(s.resultMsg,false);
						  $("#revokeFlag").val("1");
					  }else if(s.resultMsg.substring(0,2) == "LK"){
						  orgnizeRevokeInfo(s.resultMsg,true);
						  return false;
					  }else if(s.resultMsg.substring(0,2) == "LL"){
						  $(".shadow").show();
						  $("#revokeManager").show();
						  return false;
					  }
				  }else{
					  if(s.resultMsg.substring(0,2)=="KK" || s.resultMsg.substring(0,2) == "LK"){
						  orgnizeRevokeInfo(s.resultMsg,true);
						  return false;
					  }else if(s.resultMsg.substring(0,2) == "KL"){
						  orgnizeRevokeInfo(s.resultMsg,false);
						  $("#revokeFlag").val("1");
					  }else if(s.resultMsg.substring(0,2)=="LL"){
						  $(".shadow").show();
						  $("#revokeManager").show();
						  return false;
					  }
				  }
				  var form = $("#form");
				  $("input[name='carCodex']").val('');	//置空 通过过滤
				  $("input[name='feeData']").val('');	//置空 通过过滤
				  zanCun();
				  $('#form').submit();
			  }else if(s.resultCode=="0"){//投保方案问题
				  //s.resultMsg = "根据您的车辆信息，请按以下方案进行投保：<br/><fontstyle=’color:#ff6666;font-size:14px;’>您的爱车投保了车损险，必须投保三者险;</font><br/><fontstyle=’color:#ff6666;font-size:14px;’>您的爱车投保了车损险，必须投保三者险;</font><br/>如有问题请电话咨询4001234567-2.<br/>";
				  s.resultMsg = s.resultMsg.replace(/fontstyle/g, "font style");
				  s.resultMsg = "<div>"+s.resultMsg.replace(/’/g, "'")+"</div>";
				  var $mgs = $(s.resultMsg);
				  var msgList = $($mgs).find("font");
				  //alert(msgList.size());
				  var index = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩"];
				  $.each(msgList,function(e){
					  $(this).text(index[e]+$(this).text()).css({"color":"#666","font-size":"1.2rem"});
				  })
				  var msg = "<p style='margin-bottom:2rem;'>"+$($mgs).html()+"</p>"
				  var btn = {"name":"我知道了","fun":"closeCue"};
				  cueAlert(msg,btn);
				  return false;
			  }else{
				  var msg = "<p style='margin-bottom:2rem;'>"+s.resultMsg+"</p>";
				  var btn = {"name":"我知道了","fun":"closeCue"};
				  cueAlert(msg,btn);
				  shanxiHighPriRem = 1;
				  return false;
				  /*
				  removeInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"));
				  showInvalidTips($("#showSY").parents(".commercial_combo"), s.resultMsg, true);
				   */
			  }
		  }
	})

}


/**
 * 重复投保时获取原保单数据，以便撤单及支付原保单使用
 * oldPropInfo ： 核保返回原保单数据
 * isNeedCheck ： 判断是否需要短信验证
 */
function orgnizeRevokeInfo(oldPropInfo,isNeedCheck){
	if($("#revokeCount").val()=="0"){
		$("#ro_phone1").val(oldPropInfo.substring(2,13));
		$("#ro_proNo1").val(oldPropInfo.substring(13));
	}else{
		$("#ro_phone2").val(oldPropInfo.substring(2,13));
		$("#ro_proNo2").val(oldPropInfo.substring(13).replace("existSame",""));
		if($("#ro_phone1").val()==$("#ro_phone2").val()){
			$("#revokeCount").val($("#revokeCount").val()+"0");//商业交强手机号一致，跳过交强险校验
			goInput();
			return false;
		}
	}
	if(isNeedCheck){
		$(".shadow").show();
		$("#revoke_this").show();
	}
	return true;
	/*
	$.ajax({
		url:"/wap/carProposal/revoke/getOldOrderInfo",
		type:"post",
		async:false,
		data:{
			licenseno:$("#licenseNo").val()
		},
		dataType:"json",
		success:function(data){
			if(data.status=='exception'){
				var btn = {"name":"确认","fun":"closeCue"};
				cueAlert(data.msg,btn);
			}else if(data.length==0){
				var btn = {"name":"确认","fun":"closeCue"};
				cueAlert("未查到原保单数据，请稍候重试。",btn);
			}else{
				$("#revokeFlag").val("1");
				$("#ro_orderId").val(data[0].orderId);
				$("#ro_cityCode").val(data[0].citycode);
				$("#ro_premium").val(data[0].sumpremium);
				$("#ro_proNo1").val(data[0].proposalnobi);
				$("#ro_proNo2").val(data[0].proposalnoci);
				for(var i=0;i<data.length;i++){
					$("#ro_phone"+(i+1)).val(data[i].insuredmobile);
				}
				if(!data[1] || data[0].insuredmobile==data[1].insuredmobile){//判断需要发送几次短信验证码
					$("#sendMsgCount").val("1");
				}else{
					$("#sendMsgCount").val("2");
				}
			}
		},
		error:function(){
			alert("获取原保单数据失败！");
		}
		
	});*/
}

//商业险保费计算方法  重新计算
function syCalculateFee(){
	//交强险点击时要用到
	$("#feeFlag").val(0);
	//校验车损险浮动范围
	if($("#selectFix_050200").is(":visible")&&$("#selectFix_050200").val()==1){
		if(!/^\d+\.{0,1}\d*$/.test($("#actualPriceShow").val())){
			showInvalidTips($("#showSY").parents(".commercial_combo"), "请输入正确的车损险保额！", true);
			return false;
		}
		if(parseInt($("#actualPriceShow").val())<parseInt($("#purchasePriceMin").val())||parseInt($("#actualPriceShow").val())>parseInt($("#purchasePriceMax").val())){
			var msg = "车损保额只能在"+parseInt($("#purchasePriceMin").val())+"-"+parseInt($("#purchasePriceMax").val())+"元之间浮动，请输入正确的保额！"
			showInvalidTips($("#showSY").parents(".commercial_combo"), msg, true);
			return false;
		}
		
	}
	if($("#selectFix_050500").is(":visible")&&$("#selectFix_050500").val()==1){
		if(!/^\d+\.{0,1}\d*$/.test($("#theftProtActual").val())){
			showInvalidTips($("#showSY").parents(".commercial_combo"), "请输入正确的盗抢险保额！", true);
			return false;
		}
		if(parseInt($("#theftProtActual").val())<parseInt($("#theftProtMin").val())||parseInt($("#theftProtActual").val())>parseInt($("#theftProtMax").val())){
			var msg = "盗抢险保额只能在"+parseInt($("#theftProtMin").val())+"-"+parseInt($("#theftProtMax").val())+"元之间浮动，请输入正确的保额！"
			showInvalidTips($("#showSY").parents(".commercial_combo"), msg, true);
			return false;
		}
		
	}
    $(".calculating").fadeIn();
    
    removeInvalidTips($("#showSY").parents(".commercial_combo"));
	var select_050200 = $("#select_050200").val();
	if(select_050200 == '0'){
		select_050200 = -1;
	}
	//车损险浮动情况
	 if( $("#userPriceConf").val()==1){
		 select_050200 = $("#actualPrice").val();
	 }
	 
	var select_050600 = $("#select_050600").val();
	if(select_050600 == '0'){
		select_050600 = -1;
	}
	var select_050500 = $("#select_050500").val();
	//车损险浮动情况
//	 if( $("#userPriceConf").val()==1 && select_050500 != 0){
//		 if($("#actualPrice").val()!=-1)
//			 select_050500 = $("#actualPrice").val();
//		 if($("#actualPrice").val()==-1&&select_050500!=-1&&$("#select_050500").is(":visible"))
//			 select_050500 = $("#purchasePriceMin").val();
//	 }
	if(select_050500 == '0'){
		select_050500 = -1;
	}
	//盗抢险浮动情况
	if($("#bmflag").val()=='1'){
		if($("#selectFix_050500").val()=='-1'){
			select_050500 = -1;
		}else{
			select_050500 = $("#theftProtActual").val();
		}
	}
	
	var select_050701 = $("#select_050701").val();
	if(select_050701 == '0'){
		select_050701 = -1;
	}
	var select_050702 = $("#select_050702").val();
	if(select_050702 == '0'){
		select_050702 = -1;
	}
	var select_050310 = $("#select_050310").val();
	if(select_050310 == '0'){
		select_050310 = -1;
	}
	var select_050231 = $("#select_050231").val();
	if(select_050231 == '0'){
		select_050231 = -1;
	}
	var select_050270 = $("#select_050270").val();
	if(select_050270 == '0'){
		select_050270 = -1;
	}
	var select_050210 = $("#select_050210").val();
	if(select_050210 == '0'){
		select_050210 = -1;
	}
	var select_050252 = $("#select_050252").val();
	if(select_050252 == '0'){
		select_050252 = -1;
	}
	var select_050291 = $("#select_050291").val();
	if(select_050291 == '0'){
		select_050291 = -1;
	}
	var select_050911 = $("#select_050911").val();
	if(select_050911 == '0'){
		select_050911 = -1;
	}
	var select_050912 = $("#select_050912").val();
	if(select_050912 == '0'){
		select_050912 = -1;
	}
	var select_050921 = $("#select_050921").val();
	if(select_050921 == '0'){
		select_050921 = -1;
	}
	var select_050922 = $("#select_050922").val();
	if(select_050922 == '0'){
		select_050922 = -1;
	}
	var select_050924 = $("#select_050924").val();
	if(select_050924 == '0'){
		select_050924 = -1;
	}
	var select_050928 = $("#select_050928").val();
	if(select_050928 == '0'){
		select_050928 = -1;
	}
	var select_050929 = $("#select_050929").val();
	if(select_050929 == '0'){
		select_050929 = -1;
	}
	var select_050330 = $("#select_050330").val();
	if(select_050330 == '0'){
		select_050330 = -1;
	}
	var select_050935 = $("#select_050935").val();
	if(select_050935 == '0'){
		select_050935 = -1;
	}
//	以下新添加费改地区附加险和对应不计免赔
	var select_050918 = $("#select_050918").val();
	if(select_050918 == '0'){
		select_050918 = -1;
	}
	var select_050919 = $("#select_050919").val();
	if(select_050919 == '0'){
		select_050919 = -1;
	}
	var select_050917 = $("#select_050917").val();
	if(select_050917 == '0'){
		select_050917 = -1;
	}
	var select_050451 = $("#select_050451").val();
	if(select_050451 == '0'){
		select_050451 = -1;
	}
	var select_050642 = $("#select_050642").val();
	if(select_050642 == '0'){
		select_050642 = -1;
	}
	var select_050641 = $("#select_050641").val();
	if(select_050641 == '0'){
		select_050641 = -1;
	}
	var select_050643 = $("#select_050643").val();
	if(select_050643 == '0'){
		select_050643 = -1;
	}
	var amountList_050252 = $("#amountList_050252").val();//指定修理厂特约条款   wap-3430
	if(amountList_050252 != "" && amountList_050252 != null){
		$("#amountList_050252").val("");
	}
	
	$(".btn_gradient_red").attr("disabled","disabled");
	$(".btn_gradient_gray").attr("disabled","disabled");
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/calculateFee/sy",
		  type:"post",
		  data: {
	    		   channelNo:$("input[name='head.channelNo']").val(),
			  	   sessionId:$("#sessionId").val(),
			  	   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
				   //费改增加字段end
				   startdate:$("input[name='carInfo.startDateSY']").val(),
				   starthour:$("input[name='carInfo.startHourSY']").val(),
				   enddate:$("input[name='carInfo.endDateSY']").val(),
				   endhour:$("input[name='carInfo.endHourSY']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseno:$("input[name='carInfo.licenseNo']").val(),
				   nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
				   licenseflag:$("input[name='carInfo.isNewCar']").val(),
				   engineno:$("input[name='carInfo.engineNo']").val(),
				   vinno:$("input[name='carInfo.vinNo']").val(),
				   frameno:$("input[name='carInfo.frameNo']").val(),
				   newcarflag:"0",
				   isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
	                lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
	                lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
	                lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
	                lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
				   seatCount:$("input[name='carInfo.seatCount']").val(),
				   seatflag :$("input[name='carInfo.seatFlag']").val(),
				   beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),
				   enrolldate:$("input[name='carInfo.enrollDate']").val(),
				   transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),
				   insuredname:$("input[name='carInfo.carOwner']").val(),
				   fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
				   guohuselect:$("input[name='carInfo.guohuselect']").val(),			//过户车  
	                runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
	  			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
	  			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
	  			    LoanName:$("input[name='carInfo.loanName']").val(),						//贷款机构名称
	  			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
	  			  carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
	  			  transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
	  			travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
	  			lastdamageBI:$("input[name='carInfo.lastdamageBI']").val(),		//上年出险次数
  			    noDamyearsBI:$("input[name='carInfo.noDamyearsBI']").val(),		//未出险年数
	  			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
	  			   ccaID:$("input[name='carInfo.ccaId']").val(),
	  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
  			    BZ_selected:$("#hasBz").val(),
				   select_050200:select_050200,
				   select_050600:select_050600,
				   select_050500:select_050500,
				   select_050701:select_050701,
				   select_050702:select_050702,
				   select_050310:select_050310,
				   select_050231:select_050231,
				   select_050270:select_050270,
				   select_050210:select_050210,
				   select_050252:select_050252,
				   select_050291:select_050291,
				   select_050911:select_050911,
				   select_050912:select_050912,
				   select_050921:select_050921,
				   select_050922:select_050922,
				   select_050924:select_050924,
				   select_050928:select_050928,
				   select_050330:select_050330,
				   select_050935:select_050935,
				   select_050918:select_050918,
				   select_050919:select_050919,
				   select_050917:select_050917,
				   select_050451:select_050451,
				   select_050642:select_050642,
				   select_050641:select_050641,
				   select_050643:select_050643,
				   select_050929:select_050929
				   
		         },
		  dataType:"json",
 	  success: function(data)
		  {
 		  var common = eval("("+data.common+")");
 		  if(common.resultCode=='444'){
	 			 window.location.href="/wap/views/carProposal/errorReject.jsp";
	 	  }
 		  if(common.resultCode!=1){
 			  if(common.resultMsg.indexof("exception")>-1){
 				  window.location.href="/wap/views/carProposal/errPage/interErr.html"
 			  }else{
 				 showInvalidTips($("#showSY").parents(".commercial_combo"), common.resultMsg, true);
 	 			 return false;
 			  }
 		  }
 			$("#forAllFee").val(data.basicPackage[0].premium);
 			var allFee = parseFloat($("#forAllFee").val()) + parseFloat($("#jqFee").val()) + parseFloat($("#shipFee").val())
 			$("#allFee").val(allFee);
 			 var controlMsg = "";
			  
			  if(data.noticeTip1!=""){
				  controlMsg = data.noticeTip1 + "<br>";
				  $("#noticeTip1").val(data.noticeTip1);
			  }
			  if(data.noticeTip2!=""){
				  controlMsg = controlMsg + data.noticeTip2;
				  $("#noticeTip2").val(data.noticeTip2);
			  }
			  if(data.noticeTip3!=""){
				  $("#changchunTip").html(data.noticeTip3);
				  $("#noticeTip3").val(data.noticeTip3);
			  }
			  if(data.noticeTip4!="" && $("#citySelected").val()=="44120000"){
				  $("#shenzhenTip").html("建议提高三者险责任限额");
				  $("#noticeTip4").val(data.noticeTip4);
			  }else{
				  $("#shenzhenTip").html("");
				  $("#noticeTip4").val(data.noticeTip4);
			  }
			  $("#carControlMsg").html(controlMsg);
			  //重新计算后给隐藏域赋值
			  forHiddenFee(data)
			  //车损险浮动情况
		  $("#userPriceConf").val(data.priceConfig.userPriceConf)
		  if(data.priceConfig.userPriceConf==1){
			  var amount= $("#amountList_050200").val();
			  var num =amount.indexOf("|");
			  var amountList = amount.substring(num+1);
			  $("#actualPriceConfirm").val(amountList);
			  $("#actualPrice").val($("#amount_050200").val());		//0902 改成车损险保额
			  $("#purchasePriceMin").val(data.priceConfig.purchasePriceMin)
			  $("#purchasePriceMax").val(data.priceConfig.purchasePriceMax)
		  }
 		  //盗抢险浮动
		  $("#bmflag").val(data.priceConfig.bmflag);
		  if($("#bmflag").val()=='1'){
			  var amount= $("#amountList_050500").val();
			  var num =amount.indexOf("|");
			  var amountList = amount.substring(num+1);
			  $("#amount_050500").val(amountList);
			  $("#confirmAmount_050500").val($("#amount_050500").val());
			  $("#theftProtMin").val(data.theftProtMin);
			  $("#theftProtMax").val(data.theftProtMax);
 		  }
		  //重新计算后 标志  归0
		  	$("#selectChange").val(0);
 			forSelectRule();
 			forInit();
 			$(".calculating").fadeOut();
 			$(".btn_gradient_red").attr("disabled",false);
 			$(".btn_gradient_gray").attr("disabled",false);
 			//交强险点击时要用到
			$("#feeFlag").val(1);
			if($("#showSY").html()=="0.00"||$("#feeFlag").val()==0){
		    	$("input[name='carInfo.hasSy']").val(0)
		    }else{
		    	$("input[name='carInfo.hasSy']").val(1)
		    }
			
			//红包算费
		  	  if($("#entryBonus").length>0){
		  		  isBonus();
		  	  }
		  },
		     error:function(){
		    	 document.location = "/wap/timeOut"
		     }
 });
	$("#feeNext").attr("disabled",false);
}
/*
* Description: 校验纳税人姓名
* Parameter: 
* Author:
*/
function checkTaxPayerName_new(obj){
	var msg="";
	var taxPayerName = obj.val();
	var TaxPayerNameWrap = obj.parents(".field_wrap");
	if(trim(taxPayerName) == ""){
		msg = "请输入纳税人姓名！";
		showInvalidTips(TaxPayerNameWrap, msg, true);
		return false;
	}
	if(taxPayerName.indexOf("'")>=0||taxPayerName.indexOf("‘")>=0||taxPayerName.indexOf("’")>=0||taxPayerName.indexOf("-")>=0){
		msg="请输入正确的纳税人姓名！";
		showInvalidTips(TaxPayerNameWrap, msg, true);
		return false;
	}
	 removeInvalidTips(TaxPayerNameWrap);
	return true;
}
/*
 * Description: 校验车主身份证地址
 * Parameter: 
 * Author:
 */
function checkCarOwnerAdd(obj){
	var msg="";
	var CarOwnerAdd = obj.val();
	var CarOwnerAddWrap = obj.parents(".field_wrap");
	if(trim(CarOwnerAdd) == ""){
		msg = "请输入车主身份证地址！";
		showInvalidTips(CarOwnerAddWrap, msg, true);
		return false;
	}
	if(CarOwnerAdd.indexOf("'")>=0||CarOwnerAdd.indexOf("‘")>=0||CarOwnerAdd.indexOf("’")>=0||CarOwnerAdd.indexOf("-")>=0){
		msg="请输入正确的车主身份证地址！";
		showInvalidTips(CarOwnerAddWrap, msg, true);
		return false;
	}
	removeInvalidTips(CarOwnerAddWrap);
	return true;
}
/*
 * Description: 校验车辆名称/品牌
 * Parameter: 
 * Author:
 */
function checktrafficInsureBrand(obj){
	var msg="";
	var trafficInsureBrand = obj.val();
	var trafficInsureBrandWrap = obj.parents(".field_wrap");
	if(trim(trafficInsureBrand) == ""){
		msg = "请输入车辆名称/品牌！";
		showInvalidTips(trafficInsureBrandWrap, msg, true);
		return false;
	}
	if(trafficInsureBrand.indexOf("'")>=0||trafficInsureBrand.indexOf("‘")>=0||trafficInsureBrand.indexOf("’")>=0||trafficInsureBrand.indexOf("-")>=0){
		msg="请输入正确的车辆名称/品牌！";
		showInvalidTips(trafficInsureBrandWrap, msg, true);
		return false;
	}
	removeInvalidTips(trafficInsureBrandWrap);
	return true;
}
/*
 * Description: 校验车辆种类
 * Parameter: 
 * Author:
 */
function checktrafficInsureCarType(obj){
	var msg="";
	var trafficInsureCarType = obj.val();
	var trafficInsureCarTypeWrap = obj.parents(".field_wrap");
	if(trim(trafficInsureCarType) == ""){
		msg = "请输入车辆种类！";
		showInvalidTips(trafficInsureCarTypeWrap, msg, true);
		return false;
	}
	if(trafficInsureCarType.indexOf("'")>=0||trafficInsureCarType.indexOf("‘")>=0||trafficInsureCarType.indexOf("’")>=0||trafficInsureCarType.indexOf("-")>=0){
		msg="请输入正确的车辆种类！";
		showInvalidTips(trafficInsureCarTypeWrap, msg, true);
		return false;
	}
	removeInvalidTips(trafficInsureCarTypeWrap);
	return true;
}
/*
* Description: 校验被保险人证件号码
* Parameter: 	
* Author:
*/
function checkTaxerAndCarOwnerIdentifyNumber(obj){
	var pro = $("#proSelected").val();
	var msg = ""
	var IdentifyType = '01';
	if($("#TaxPayerIdentType").length>0){
		IdentifyType = $("#TaxPayerIdentType").val()
	}
	msg = trim(checkIdentifyNum(obj,IdentifyType));
	if(msg == "true"){
		removeInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"));
		if(pro=="43000000"){
			return true;
		}
	}else{
		if(msg=="请输入证件号码！"){
			msg='请输入纳税人证件号码！'
		}
		showInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"), msg, true);
		return false;
	}
	var flag = true;
	if($("#citySelected").val()!="33020000"){	//身份证黑名单校验
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
	                insuredflag:"0000100",
	                hasSy:$("input[name='carInfo.hasSy']").val(),
				    sessionId:$("#sessionId").val()
			       },
			  dataType:"json",
			  async:false,
			  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			  success: function(data)
				  {
				  	if(data.body.common.resultCode=='6'){
				  		window.location.href="/wap/views/carProposal/errorReject.jsp";
				  	}
				  	if(data.body.common.resultCode!=1){
				  		showInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"), data.resultMsg, true);
				  		flag = false;
				  	}
				  },
			     error:function(){
//			    	 showInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"), "请稍候重试", true);
//			    	 return false;
			     } 
		});
	}
	return flag;
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

//起保日期和小时数的方法！！
function changeStartDateSYForEnd(){
	var startDateSY = $("input[name='carInfo.startDateSY']").val();
	var startHourSY = $("input[name='carInfo.startHourSY']").val();
	if(startHourSY == "0"){
		var s = getNextDateFullDate(getNextYearFullDate(startDateSY,1),-1);
		$("input[name='carInfo.endDateSY']").val(replace(s,"/","-"));
		$("input[name='carInfo.endHourSY']").val("24");
	}else{
		$("input[name='carInfo.endDateSY']").val(replace(getNextYearFullDate(startDateSY,1),"/","-"));
		$("input[name='carInfo.endHourSY']").val(startHourSY);
	}
}
//起保日期和小时数的方法！！
function changeStartDateSY(){
	var startDateCI = $("#trafficInsurePolicyDate").val();
	var startHourCI = $("#startDate").val();
	if(startHourCI == "0"){
		var s = getNextDateFullDate(getNextYearFullDate(startDateCI,1),-1);
		$("input[name='carInfo.endDateCI']").val(replace(s,"/","-"));
		$("input[name='carInfo.endhourCI']").val(24);
	}else{
		$("input[name='carInfo.endDateCI']").val(replace(getNextYearFullDate(startDateCI,1),"/","-"));
		$("input[name='carInfo.endhourCI']").val(startHourCI);
	}
	
	//$("#enddateSY_DS").html($("#StartDateSY").val()+"&nbsp;&nbsp;"+$("#StartHourSY").val()+"时 至"+$("#EndDateSY").val()+"&nbsp;&nbsp;"+$("#EndHourSY").val()+"时止");
	$("#enddateCI_DS").html($("input[name='carInfo.endDateCI']").val()+"&nbsp;&nbsp;"+$("input[name='carInfo.endhourCI']").val());	
	$("input[name='carInfo.startDateCI']").val(startDateCI)
	selectHourCI()
}
//交强险时间  change事件
function selectHourCI(){
	if($("#startDate").is(":visible")){
		$("input[name='carInfo.starthourCI']").val($("#startDate").val())
	}
	var StartHourSY = $("#startDate").val()
	var startDateWrap = $("#startDate").parents(".block_w_100pc");
	//如果时间是可选的，则要校验时间  比当前时间大(现靠接口返回控制)
//	if($("#jqType").val()=="select"){
//		var d = new Date()
//		var nowHour = d.getHours();
//		var nowM = d.getMinutes(); 
//		
//		if(replace($("#trafficInsurePolicyDate").val(),"-","/")==replace($("#now").val(),"-","/")){
//			if(nowHour>=StartHourSY-2){//20151015新增湖北
//				if($("#proSelected").val()=="42000000"||$("#proSelected").val()=="37020000"||$("#proSelected").val()=="32000000"||$("#proSelected").val()=="33000000"||$("#proSelected").val()=="35020000"){
//				showInvalidTips(startDateWrap, "温馨提示：起保时间至少为当前时间2小时后。", true);
//				return false;
//				}
//			}
//			if(nowHour>=StartHourSY-1){
//				showInvalidTips(startDateWrap, "温馨提示：起保时间至少为当前时间1小时后。", true);
//				return false;
//			}
//		}
//	}
	
	removeInvalidTips(startDateWrap)
	return true;
}
/*
 * Description: 交强险保单生效日期校验
 * Parameter: 
 * Author: 
 */
function checkStartDate() {
	var startDate = $("#trafficInsurePolicyDate").val();
	var startDateWrap = $("#trafficInsurePolicyDate").parents(".block_w_100pc");
	var now = new Date($("#now").val());
	var defaultDate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
	if(!/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(startDate)){
		msg = "交强险保单生效日期错误，请重新选择！";
		$("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateSY']").val());
		changeStartDateSY();
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if (trim(startDate) == "") {
		msg = "请选择保单生效日期 ！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if(compareFullDate(replace(startDate,"-","/"),defaultDate)=="-1"){
		msg = "交强险保单生效日期错误，请重新选择！";
//		$("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateSY']").val());
		changeStartDateSY();
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if($("#jqType").val()!="select" && compareFullDate(replace(startDate,"-","/"),defaultDate)=="0"){ //小时不能选择时起保日期不能为当日
		msg = "交强险保单生效日期错误，请重新选择！";
//		$("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateSY']").val());
		changeStartDateSY();
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	$("#jqDataFlag").val(0)
	jqCalculateFee()
	removeInvalidTips(startDateWrap);
	return true;
}
/*
 * Description: 交强险购车发票日期校验
 * Parameter: 
 * Author: 
 */
function checkcertificatedate() {
	var startDate = $("#certificatedate").val();
	var startDateWrap = $("#certificatedateDiv");
	var now = new Date($("#now").val());
	var defaultDate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
	if(!/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(startDate)){
		msg = "购车发票日期错误，请重新选择！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if (trim(startDate) == "") {
		msg = "请选择购车发票日期 ！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if(compareFullDate(defaultDate,replace(startDate,"-","/"))=="-1"){
		msg = "购车发票日期错误，请重新选择！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	$("input[name='carInfo.certificatedate']").val(startDate);
	removeInvalidTips(startDateWrap);
	return true;
}
function InsureRegisterDate() {
	removeInvalidTips($("#beian"))
	var startDate = $("#trafficInsureRegisterDate").val();
	var startDateWrap = $("#trafficInsureRegisterDate").parents(".picker_wrap");
	var nowStr = $("#now").val();
	
	if(nowStr.indexOf("-") > 0){
		var  aDate = nowStr.split("-");
		nowStr = aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]
	}//去除ios6以下版本兼容问题
	
	var now = new Date(nowStr);
	var defaultDate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
	
	if(!/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(startDate)){
		msg = "日期错误，请重新选择！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if (trim(startDate) == "") {
		msg = "请选择日期 ！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	if(compareFullDate(defaultDate,replace(startDate,"-","/"))=="-1"){
		msg = "日期错误，请重新选择！";
		showInvalidTips(startDateWrap, msg, true);
		return false;
	}
	removeInvalidTips(startDateWrap);
	return true;
}
/*
* Description: 校验证件号码
* Parameter: 
* Author: zpy 
*/
function checkInsuredIdentifyNumber(name,obj,flag){
	var msg = ""
	var IdentifyType = obj.val();
	msg = trim(checkIdentifyNum(name,IdentifyType));
	if(msg == "true"){
		removeInvalidTips(name.parents(".field_wrap"));
	}else{
		if(flag==1&&msg=="请输入证件号码！"){
			return true;
		}
		showInvalidTips(name.parents(".field_wrap"), msg, true);
		return false;
	}
	var flag = true;
	if($("#citySelected").val()!="33020000"){	//身份证黑名单校验
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
	                identify:name.val(),		//纳税人身份证号
	                licenseflag:$("input[name='carInfo.isNewCar']").val(),
	                identifytype:IdentifyType,
	                isBZ:$("#hasBz").val(),
	                insuredflag:"0000100",
	                hasSy:$("input[name='carInfo.hasSy']").val(),
				    sessionId:$("#sessionId").val()
			       },
			  dataType:"json",
			  async:false,
			  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			  success: function(data)
				  {
				  	if(data.body.common.resultCode=='6'){
				  		window.location.href="/wap/views/carProposal/errorReject.jsp";
				  	}
				  	if(data.body.common.resultCode!=1){
				  		showInvalidTips(name.parents(".field_wrap"), data.resultMsg, true);
				  		flag = false;
				  	}
				  },
			     error:function(){
//			    	 showInvalidTips($("#TaxPayerIdentNo").parents(".field_wrap"), "请稍候重试", true);
//			    	 return false;
			     } 
		});
	}
	return flag;
}

/**
* Description: 北京验证车主姓名
* Parameter: 
* Author: 
*/
function checkBJCarOwner(){
	var carOwnerWrap = $("#bjCarOwer").parents(".field_wrap");
	var msg = "";
	$.ajax({
		url:$("#ctx").val()+"/carProposal/fastPrice/carOwner",
		type:"post",
		async:false,
		data: {
		    channelNo:$("input[name='head.channelNo']").val(),
			carOwner:$("#bjCarOwer").val(),
			isRenewal:$("input[name='carInfo.isRenewal']").val(),
			proSelected:$("input[name='carInfo.proSelected']").val()
		},
		dataType:"json",
		success: function(data){
			if(data.resultCode!='1'){
				msg = (msg=='请输入《机动车行驶证》上登记的<br>\\“所有人\\”姓名'?"请输入车主姓名！":data.resultMsg);
			}else{
				msg="true";  
			}
		},
		error: function(data){
			msg = "请输入正却的车主姓名！";
		}
	});
	if(msg == "true"){
		removeInvalidTips(carOwnerWrap);
	}else{
  		showInvalidTips(carOwnerWrap, msg, true);
		return false;
	}
}

//提交备案信息
function subitmBeian(){
	removeInvalidTips($("#beian"))
	if(!checkInsuredIdentifyNumber($("#CarOwerIdentifyNo"),$("#CarOwerIdentifyType"))){
		return false;
	}
	//请把信息填写完整
	if($("#trafficInsureFuelType").val()==""||$("#trafficInsureOrigin").val()==""||$("#trafficInsureOriginID").val()==""){
		showInvalidTips($("#beian"), "请把信息填写完整！", true);
		return false;
	}
	if(!InsureRegisterDate()){
		return false;
	}
	var ctx = $("#ctx").val();
	var certificate_date = replace($("#trafficInsureRegisterDate").val(),"-","/")
	$.ajax({
		  url:ctx+"/carProposal/bjFuel/newCarRecord",
		  type:"post",
		  data: {
	    		channelNo:$("input[name='head.channelNo']").val(),
			    proSelected:$("#proSelected").val(),	//省代码
			    citySelected:$("#citySelected").val(),	//市代码	
			    vinNo:$("input[name='carInfo.vinNo']").val(),		
			    engineNo:$("input[name='carInfo.engineNo']").val(),			
			    frameNo:$("input[name='carInfo.frameNo']").val(),			
			    owner:$("#bjCarOwer").val(),
			    certi_type:$("#CarOwerIdentifyType").val(),	
			    carOwnerIdentifyNumber:$("#CarOwerIdentifyNo").val(),
			    bjfuel_type:$("#trafficInsureFuelType").val(),
			    certificate_type:$("#trafficInsureOrigin").val(),
			    certificate_no:$("#trafficInsureOriginID").val(),
			    certificate_date:certificate_date,
			    certi_typeName:$("#CarOwerIdentifyType").find("option:selected").text(),
			    bjfuel_typeName:$("#trafficInsureFuelType").find("option:selected").text(),
			    certificate_typeName:$("#trafficInsureOrigin").find("option:selected").text(),
			    sessionId:$("#sessionId").val()
		       },
		  dataType:"json",
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  success: function(data)
			  {
			  	if(data.message!=1){
			  		showInvalidTips($("#beian"), "请稍后重试！", true);
			  		return false;
			  	}
			  	$("input[name='carInfo.carOwner']").val($("#bjCarOwer").val());
			  	$("#trafficInsureBody").slideDown(function() {
			  		$("#beian").hide()
     				centerSelect('startDate');
     				$("#startCIDiv").show();
  		  			$("#taxPayerDiv").show();
  		  			$("#taxIdentDiv").show();
  		  			$("#taxPayerIdentTypeDiv").show();
  		  		
  		  		$("#cueMsg").text("新车备案成功！").parent().show();
			  	});
			  	
		  		
			    jqCalculateFee();
			  	
			  },
			     error:function(){
			    	 showInvalidTips($("#beian"), "请稍后重试！", true);
			     } 
	});
}
function jqCalculateFee(){
		removeInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"));
		
		$(".btn_gradient_red").attr("disabled",true);
		$(".btn_gradient_gray").attr("disabled",true);
        $(".calculating").fadeIn();
        if($("input[name='carInfo.isRenewal']").val()==1){	//一般续保时
            if($("#trafficInsurePolicyDate").length<=0){ //不能分期投保时
            	$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val());
        		$("input[name='carInfo.starthourCI']").val($("input[name='carInfo.startHourSY']").val());
        		$("input[name='carInfo.endDateCI']").val($("input[name='carInfo.endDateSY']").val());
        		$("input[name='carInfo.endhourCI']").val($("input[name='carInfo.endHourSY']").val());
         	}
        }
        var startDateCI;
		if(jqflag==0){
			startDateCI = $("input[name='carInfo.startDateCI']").val();
		}else{
			startDateCI = $("#startDateCI").val();
			jqflag = 0;
		}
    	var ctx = $("#ctx").val();
    	$.ajax({
    		  url:ctx+"/carProposal/calculateFee/jq",
    		  type:"post",
    		  async:false,
    		  data: {
    	    	   channelNo:$("input[name='head.channelNo']").val(),
    			   sessionId:$("#sessionId").val(),
   			  	   proSelected:$("#proSelected").val(),
   				   citySelected:$("#citySelected").val(),
   				   //需要传车主证件号和号码的bug
   				   carOwnerIdentifytype:$("#bjIdentifyType").val(),
   				   carOwnerIdentifynumber:$("input[name='carInfo.carOwerIdentifyNo']").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
				   //费改增加字段end
   				   startdate:$("input[name='carInfo.startDateSY']").val(),
   				   starthour:$("input[name='carInfo.startHourSY']").val(),
   				   enddate:$("input[name='carInfo.endDateSY']").val(),
   				   endhour:$("input[name='carInfo.endHourSY']").val(),
   				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
   				   licenseno:$("input[name='carInfo.licenseNo']").val(),
   				   nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
   				   licenseflag:$("input[name='carInfo.isNewCar']").val(),
   				   engineno:$("input[name='carInfo.engineNo']").val(),
   				   vinno:$("input[name='carInfo.vinNo']").val(),
   				   frameno:$("input[name='carInfo.frameNo']").val(),
   				   newcarflag:"0",
	   				isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
	                lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
	                lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
	                lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
	                lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
   				   enrolldate:$("input[name='carInfo.enrollDate']").val(),
   				   transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),
   				   insuredname:$("input[name='carInfo.carOwner']").val(),
   				   fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
   				   beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),
//   				   startDateCI:$("input[name='carInfo.startDateCI']").val(),
   				   startDateCI:startDateCI,
                   starthourCI:$("input[name='carInfo.starthourCI']").val(),
                   endDateCI:$("input[name='carInfo.endDateCI']").val(),
                   endhourCI:$("input[name='carInfo.endhourCI']").val(),
                   taxpayeridentno:$("input[name='carInfo.taxPayerIdentNo']").val(),
                   taxpayername:$("input[name='carInfo.taxPayerName']").val(),
                   taxtype:$("#tax_flag_sh").val(),
                   certificatedate:replace($("input[name='carInfo.certificatedate']").val(),"-","/"),
                   transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
                   runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
     			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
     			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
     			    LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
     			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
     			  seatCount:$("input[name='carInfo.seatCount']").val(),	
     			 seatflag :$("input[name='carInfo.seatFlag']").val(),
     			  carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
	  			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
	  			   ccaID:$("input[name='carInfo.ccaId']").val(),
	  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
     			  travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
     			  isbuytax:$("input[name='carInfo.iscarship']").val()
    		    },
    	  dataType:"json",
     	  success: function(data)
    		  {
     		  	changeStartDateSY();
     		  	//判断交强险保单生效日期是否是明年
     		  	var noticerepetition = data.noticerepetition;
     		  	if(noticerepetition != "" && noticerepetition != null){
     		  			var msg = noticerepetition;
     		  			showInvalidTips($("#TaxPayerIdentNo").parents(".traffic_insure"), msg, true);
     		  	}
//     		 	var data = JSON.stringify(data); 
  		  		var dataMsg = data.message;
  		  		var resultCode;
  		  		if(dataMsg=="beian"){
	  		  		$("#buy").addClass('radioed');
	 		    	$("#noBuy").removeClass('radioed');
			    	
		  			$("#beian").show();
		  			$("#beianButton").show();
		  			$("#startCIDiv").hide();
		  			$("#taxPayerDiv").hide();
		  			$("#taxIdentDiv").hide();
		  			$("#taxPayerIdentTypeDiv").hide();
		  			$(".calculating").fadeOut();
		  			//下拉框赋值 如果记忆了的话
		  			if($("#bjIdentifyType").val()!=""){
		  				$("#CarOwerIdentifyType").val($("#bjIdentifyType").val())
		  			}
		  			if($("#bjfuel_type").val()!=""){
		  				$("#trafficInsureFuelType").val($("#bjfuel_type").val())
		  			}
		  			if($("#certificate_type").val()!=""){
		  				$("#trafficInsureOrigin").val($("#certificate_type").val())
		  			}
			  			
	     			$(".btn_gradient_gray").attr("disabled",false);
	     			$("#trafficInsureBody").slideDown(function(){
	                    switchTrafficInsure(this, true);
	                    $("#hasBz").val(1);
	                  //车辆来历凭证所载日期 初始化当天
	                    if($("#trafficInsureRegisterDate").val()==""){
	                    	$("#trafficInsureRegisterDate").val($("#now").val())
	                    }
	                    centerSelect('trafficInsureFuelType');
	      		  		centerSelect('trafficInsureOrigin');
	      		  		centerSelect('CarOwerIdentifyType');
	                });
			  		return false;
		  		}
  		  		if(dataMsg!=null){
  		  			resultCode = dataMsg.substring(0,1);
  		  		}
  		  		$("#beian").hide();
  		  		$("#beianButton").hide();
  		  		if( $("#citySelected").val() == "31000000"){	//上海地区时 
		    		$("#startCIDiv").show();
		    		if($("input[name='carInfo.buyCarDate_flag']").val()=="1"){
		    			$("#shMsg").show();
		    		}
		    		
		    	}
  		  		if(resultCode==5||resultCode==4){
	  		  		$("#buy").addClass('radioed');
	 		    	$("#noBuy").removeClass('radioed');
	 		    	//$("#buy").addClass('disabled');		//不可用状态
	  		  		var msg = dataMsg.substring(1, dataMsg.length);
	  		  		if(resultCode==4){
	  		  			showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), msg, true);
	  		  		}else{
	  		  			showInvalidTips($("#trafficInsurePolicyDate").parents(".block_w_100pc"), msg, true);
	  		  		}
	  		  		$(".btn_gradient_red").attr("disabled",true);
	  		  		$(".calculating").fadeOut();
	  		  		return false;
  		  		}
	  		  	if(resultCode==6){
		  		    
		  			var msg = dataMsg.substring(1, dataMsg.indexOf("。")+1);
		  			var newDate = dataMsg.substring(dataMsg.indexOf("。")+1, dataMsg.length);
		  			$("#startDateCI").attr("value", newDate);
			  		
		  			var startDateCI = $("#startDateCI").val();
		  		  	var startHourCI = $("#startDate").val();
		  		  	if(startHourCI == "0"){
		  		  		var s = getNextDateFullDate(getNextYearFullDate(startDateCI,1),-1);
		  		  		$("input[name='carInfo.endDateCI']").val(replace(s,"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(24);
		  		  	}else{
		  		  		$("input[name='carInfo.endDateCI']").val(replace(getNextYearFullDate(startDateCI,1),"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(startHourCI);
		  		  	}
	  		  		removeInvalidTips($("#showSY").parents(".commercial_combo"));
	 		    	showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), msg, true);
	 		    	
	 		    	$("#buy").addClass('radioed');
	 		    	$("#noBuy").removeClass('radioed');
	 		    	
	 	 			$(".calculating").fadeOut();
	     			$(".btn_gradient_gray").attr("disabled",false);
	     			$(".btn_gradient_red").attr("disabled",true);
	     			jqflag=1;
	     			
	 	 			return false;
		  		}
     		    if(resultCode==2||resultCode==0||resultCode==8){
     		    	var msg = dataMsg.substring(1, dataMsg.length);
     		    	
     		    	if(msg.indexOf("您的车辆已经在本公司投保了同类型的险种") > -1){
     		    		$(".calculating").fadeOut();
     		    		$("#buy").addClass('radioed');
         		    	$("#noBuy").removeClass('radioed');
         		    	
         		    	$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val())
     		           
//     		    		$("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateSY']").val());
//     		    		changeStartDateSY();
	                    switchTrafficInsure(this, true);
	                    centerSelect('startDate');
	                    $("#hasBz").val(1);
	                    $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
	    		  		$("#alertMsg").html(msg +'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
	    		  		
	    		  		$(".btn_gradient_gray").attr("disabled",false);
	    		  		
    					return false;
     		    	}
     		    	
     		    	removeInvalidTips($("#showSY").parents(".commercial_combo"));
     		    	showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), msg, true);
     	 			
     		    	$("#noBuy").addClass('radioed');
     		    	$("#buy").removeClass('radioed');
     		    	$("#buy").addClass('disabled');		//不可用状态
     		    	
     		    	$(".calculating").fadeOut();
     	 			$(".btn_gradient_red").attr("disabled",false);
         			$(".btn_gradient_gray").attr("disabled",false);
     	 			return false;
     		    }else{
     		    	if( $("#citySelected").val() == "12000000"){	//天津地区时 
     		    		$("#startCIDiv").show();
     		    		$("#taxPayerDiv").show();
     		    		$("#taxIdentDiv").show();
     		    		$("#taxPayerIdentTypeDiv").show();
     		    		$("#tjMsg").show();
     		    	}
     		    	$("#buy").addClass('radioed');
     		    	$("#noBuy").removeClass('radioed');
     		    	
         			$("#jqFeeShow").html(fmoney(data.premiumBZ));
         			var thisPayTax = parseFloat(data.thisPayTax) + parseFloat(data.prePayTax) + parseFloat(data.delayPayTax)
         			$("#shipFeeShow").html(fmoney(thisPayTax));
         			$("#jqFee").val(data.premiumBZ);
         			$("#shipFee").val(thisPayTax);
         			var allFee = parseFloat($("#forAllFee").val()) + parseFloat(data.premiumBZ) + parseFloat($("#shipFee").val())
         			$("#allFee").val(allFee);
         			$("#allFeeShow").html(fmoney(allFee));
         			//给税额明细需要的东西赋值
         			if($("#shipFee").val()!='0'){
         				$("#quotedTaxDetail").show();
         				$("#shipFeeShow").show();
         	    		$("#carFeeShow").show();
         			}else{
         				$("#shipFeeShow").hide();
         	    		$("#carFeeShow").hide();
         	    		$("#quotedTaxDetail").css('display','none');
         			}
         			$("#thisPayTax").html(fmoney(data.thisPayTax))
         			$("#prePayTax").html(fmoney(data.prePayTax))
         			$("#delayPayTax").html(fmoney(data.delayPayTax))
         			$("#PayShipDate").html(data.payStartDate + "&nbsp;至&nbsp;" + data.payEndDate)
         			var allTax = parseFloat(data.thisPayTax) + parseFloat(data.prePayTax) + parseFloat(data.delayPayTax)
         			$("#allTax").html(fmoney(allTax));
         			
         			$(".calculating").fadeOut();
         			centerSelect('TaxPayerIdentType');
         			$("#hasBz").val(1);
         			//如果有交强险生效日期，添加一个标志位，用来点击下一步的时候提示
//         			if($("#trafficInsurePolicyDate").is(":visible")){
//         				$("#jqDataFlag").val(0)
//         			}
         			$("input[name='carInfo.thisPayTax']").val(data.thisPayTax);
         			$("input[name='carInfo.prepaytax']").val(data.prePayTax);
         			$("input[name='carInfo.delayPayTax']").val(data.delayPayTax);
         			$("input[name='carInfo.payStartDate']").val(data.payStartDate);
         			$("input[name='carInfo.payEndDate']").val(data.payEndDate);
         			
         			var now = new Date($("#now").val());
         			var defaultDate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
         			if(compareFullDate("2015/01/01",defaultDate)=="1"){
         				if($("#proSelected").val()=="14000000" || $("#proSelected").val()=="42000000"){
         					showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), "请您核实是否已缴纳2014年度车船税，避免重复缴税，并于明年年底前提前续保交强险并缴纳2015年度车船税，防止产生滞纳金", true);
         				}
         			}
//         			if($("#proSelected").val()=="14000000"){
//	     				syCalculateFee();
//	     			}
         			configJQ(data);//交强险及时起保配置
     		    }
     		    $(".btn_gradient_red").attr("disabled",false);
     			$(".btn_gradient_gray").attr("disabled",false);
                if($("#calcBIFlag").val()=="1"){//购买交强险更优惠则重新算费
                	syCalculateFee();
                }
    		  },
 		     error:function(){
		    	 document.location = "/wap/timeOut"
		     }
    		
     });
}
function tjCarSure(){
	if($("#citySelected").val()=="12000000"){
		$("#carKindCIShow").html($("#trafficInsureCarModel").find("option:selected").text());
		$("#traveltaxAddressShow").html($("#trafficInsureLicenseAddress").find("option:selected").text());
		$("#carKindCIDiv").hide();
		$("#traveltaxAddressDiv").hide();
		$("#tianjinButton").hide();
	}
	if($("#citySelected").val()=="31000000"){
		if($("input[name='carInfo.buyCarDate_flag']").val()=="1"){
			$("#certificatedateShow").html($("#certificatedate").val());
			$("#certificatedateDiv").hide();
			$("#tianjinButton").hide();
		}
		if($("input[name='carInfo.isNewCar']").val()=="1"){
			
		}
	}
	
	jqCalculateFee()
}
function fixtjCar(){
	$(".btn_gradient_red").attr("disabled","disabled");
	$("#beian").hide();
	$("#startCIDiv").hide();
	$("#taxPayerDiv").hide();
	$("#taxIdentDiv").hide();
	$("#taxPayerIdentTypeDiv").hide();
	$("#tjMsg").hide();
	$("#tianjinButton").show();
	$("#carKindCIDiv").show();
	$("#traveltaxAddressDiv").show();
}
function fixcertificatedate(){
	$(".btn_gradient_red").attr("disabled","disabled");
	$("#beian").hide();
	$("#startCIDiv").hide();
	$("#shMsg").hide();
	$("#tianjinButton").show();
	$("#certificatedateDiv").show();
}
function farmatDate4IOS(dateStr){
	if(dateStr.indexOf("-") > 0){
		var  aDate = dateStr.split("-");
		dateStr = aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]
	}//去除ios6以下版本兼容问题
	return dateStr;
}

function buyJQ(){
	if($("#buy").hasClass('disabled')){	//如果不可用
		return false;
	}
	removeInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"));
	if($("#proSelected").val()!="11000000"){
    	if($("#feeFlag").val()==0){
    		showInvalidTips($("#showSY").parents(".commercial_combo"), "网上投保交强险时，须同时投保商业险！", true);
    		return false;
    	}
    	if($("#showSY").html()=="0.00"){
    		if($("#buy").hasClass('radioed')){
	        	showInvalidTips($("#showSY").parents(".commercial_combo"), "网上投保交强险时，须同时投保商业险！", true);
	        	return false;
        	}
        }
	}
	if($("input[name='carInfo.carIdentifyAddressSXId_flag']").val()=='1'){
		$("#carIdentifyAddressSXId_flag").show();
	}
	if($("input[name='carInfo.carNameSXId_flag']").val()=='1'){
		$("#carNameSXId_flag").show();
	}
	if($("input[name='carInfo.carKindSXId_flag']").val()=='1'){
		$("#carKindSXId_flag").show();
	}
    if($("input[name='carInfo.isRenewal']").val()==1){	//一般续保时
        if($("#trafficInsurePolicyDate").length<=0){ //不能分期投保时
        	$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val());
    		$("input[name='carInfo.starthourCI']").val($("input[name='carInfo.startHourSY']").val());
    		$("input[name='carInfo.endDateCI']").val($("input[name='carInfo.endDateSY']").val());
    		$("input[name='carInfo.endhourCI']").val($("input[name='carInfo.endHourSY']").val());
     	}
    }
    
	//交强险保费计算
//    $(".btn_gradient_red").attr("disabled","disabled");
//	$(".btn_gradient_gray").attr("disabled","disabled");
	
	if($("#proSelected").val()=="12000000"){
		$("#beian").hide()
    	$("#startCIDiv").hide();
			$("#taxPayerDiv").hide();
			$("#taxIdentDiv").hide();
			$("#taxPayerIdentTypeDiv").hide();
			$("#tjMsg").hide();
			$("#tianjinButton").show();
			$("#carKindCIDiv").show();
			$("#traveltaxAddressDiv").show();
			$("#buy").addClass('radioed');
	    $("#noBuy").removeClass('radioed');
			$("#trafficInsureBody").slideDown(function(){
            switchTrafficInsure(this, true);
            if($("#carKind").val()==""){
		  			$("#trafficInsureCarModel").val("k33")
		  		}
            centerSelect('trafficInsureCarModel');
		  		centerSelect('trafficInsureLicenseAddress');
		  		
        });
			return false;
    }
	if($("#proSelected").val()=="31000000"){
		if($("input[name='carInfo.buyCarDate_flag']").val()=="1"){
			$("#certificatedateDiv").show();
			$("#shMsg").hide();
		}
		if($("input[name='carInfo.tAX_FLAG_SH_flag']").val()=='1'){
    		$("#TAX_FLAG_SHDiv").show();
    		if($("#tax_flag_sh").val()==""){
    			$("#tax_flag_sh").val($("#TAX_FLAG_SH").val())
    		}else{
    			$("#TAX_FLAG_SH").val($("#tax_flag_sh").val());
    		}
    		
    	}
		$("#beian").hide()
		$("#startCIDiv").hide();
		$("#tianjinButton").show();
		$("#buy").addClass('radioed');
		$("#noBuy").removeClass('radioed');
		$("#trafficInsureBody").slideDown(function(){
			switchTrafficInsure(this, true);
			if($("#certificatedate").val()==""&&$("input[name='carInfo.buyCarDate_flag']").val()=="1"){
				$("#certificatedate").val($("#now").val());
				$("input[name='carInfo.certificatedate']").val($("#now").val());
			}
			centerSelect('TaxPayerIdentType');
			centerSelect('TAX_FLAG_SH');
		});
		return false;
	}
	
	var startDateCI;
	if(jqflag==0){
		startDateCI = $("input[name='carInfo.startDateCI']").val();
	}else{
		startDateCI = $("#startDateCI").val();
		jqflag = 0;
	}
	$(".calculating").fadeIn();
	var ctx = $("#ctx").val();
	$.ajax({
		  url:ctx+"/carProposal/calculateFee/jq",
		  type:"post",
		  async:false,
		  data: {
	    		   channelNo:$("input[name='head.channelNo']").val(),
			  	   sessionId:$("#sessionId").val(),
			  	   proSelected:$("#proSelected").val(),
				   citySelected:$("#citySelected").val(),
   				   //需要传车主证件号和号码的bug
   				   carOwnerIdentifytype:$("#bjIdentifyType").val(),
   				   carOwnerIdentifynumber:$("input[name='carInfo.carOwerIdentifyNo']").val(),
				   //费改增加字段start
				   areaCodeLast:$("#areaCodeLast").val(),
				   cityCodeLast:$("#cityCodeLast").val(),
				   mobile:$("input[name='carInfo.insuredMobile']").val(),
				   email:$("input[name='carInfo.insuredEmail']").val(),
				   identifytype:$("input[name='carInfo.insuredIdentifyType']").val(),
				   identifynumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
				   birthday:$("input[name='carInfo.insuredBirthday']").val(),
				   sex:$("input[name='carInfo.insuredIdentifSex']").val(),
				   //费改增加字段end
				   startdate:$("input[name='carInfo.startDateSY']").val(),
				   starthour:$("input[name='carInfo.startHourSY']").val(),
				   enddate:$("input[name='carInfo.endDateSY']").val(),
				   endhour:$("input[name='carInfo.endHourSY']").val(),
				   isRenewal:$("input[name='carInfo.isRenewal']").val(),
				   licenseno:$("input[name='carInfo.licenseNo']").val(),
				   nonlocalflag:$("input[name='carInfo.nonlocalflag']").val(),
				   licenseflag:$("input[name='carInfo.isNewCar']").val(),
				   engineno:$("input[name='carInfo.engineNo']").val(),
				   vinno:$("input[name='carInfo.vinNo']").val(),
				   frameno:$("input[name='carInfo.frameNo']").val(),
				   newcarflag:"0",
   				isOutRenewal :$("input[name='carInfo.isOutRenewal']").val(),
                lastHas050200 :$("input[name='carInfo.lastHas050200']").val(),
                lastHas050210 :$("input[name='carInfo.lastHas050210']").val(),
                lastHas050500 :$("input[name='carInfo.lastHas050500']").val(),
                lastHas050291 :$("input[name='carInfo.lastHas050291']").val(),
				   enrolldate:$("input[name='carInfo.enrollDate']").val(),
				   transfervehicleflag:$("input[name='carInfo.guohuselect']").val(),
				   insuredname:$("input[name='carInfo.carOwner']").val(),
				   fullAmountName:$("input[name='carInfo.fullAmountName']").val(),
				   beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),
				   startDateCI:startDateCI,
               starthourCI:$("input[name='carInfo.starthourCI']").val(),
               endDateCI:$("input[name='carInfo.endDateCI']").val(),
               endhourCI:$("input[name='carInfo.endhourCI']").val(),
               taxpayeridentno:$("input[name='carInfo.taxPayerIdentNo']").val(),
               taxpayername:$("input[name='carInfo.taxPayerName']").val(),
               taxtype:$("#tax_flag_sh").val(),
               certificatedate:replace($("input[name='carInfo.certificatedate']").val(),"-","/"),
               transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),
               runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
 			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
 			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
 			    LoanName:$("input[name='carInfo.loanName']").val(),											//贷款机构名称
 			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
 			  seatCount:$("input[name='carInfo.seatCount']").val(),	
 			 seatflag :$("input[name='carInfo.seatFlag']").val(),
 			  carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
 			   ccaFlag:$("input[name='carInfo.ccaFlag']").val(),
  			   ccaID:$("input[name='carInfo.ccaId']").val(),
  			   ccaEntryId:$("input[name='carInfo.ccaEntryId']").val(),
 			  travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
 			 isbuytax:$("input[name='carInfo.iscarship']").val()
		    },
	  dataType:"json",
 	  success: function(data)
		  {
// 		 	var data = JSON.stringify(data); 
		  		var dataMsg = data.message;
		  		var resultCode;
		  		//车险借口特殊问题 暂时拦住
		  		if(dataMsg=="interWrong"){
		  			$("#noBuy").click();
		  			cueAlert("您好，网络异常，请重新点击购买按钮，如不能正常购买请拨打 400-1234567进行投保。",{"name":"取消","fun":"closeCue"});
					return false;
		  		}
		  		//备案
		  		if(dataMsg=="beian"){
  		  		$("#buy").addClass('radioed');
 		    	$("#noBuy").removeClass('radioed');
		    	
		  			$("#beian").show();
		  			$("#beianButton").show();
		  			$("#startCIDiv").hide();
		  			$("#taxPayerDiv").hide();
		  			$("#taxIdentDiv").hide();
		  			$("#taxPayerIdentTypeDiv").hide();
		  			$(".calculating").fadeOut();
		  			//下拉框赋值 如果记忆了的话
		  			if($("#bjIdentifyType").val()!=""){
		  				$("#CarOwerIdentifyType").val($("#bjIdentifyType").val())
		  			}
		  			if($("#bjfuel_type").val()!=""){
		  				$("#trafficInsureFuelType").val($("#bjfuel_type").val())
		  			}
		  			if($("#certificate_type").val()!=""){
		  				$("#trafficInsureOrigin").val($("#certificate_type").val())
		  			}
		  			
	     			$(".btn_gradient_gray").attr("disabled",false);
	     			$("#trafficInsureBody").slideDown(function(){
	                    switchTrafficInsure(this, true);
	                    $("#hasBz").val(1);
	                  //车辆来历凭证所载日期 初始化当天
	                    if($("#trafficInsureRegisterDate").val()==""){
	                    	$("#trafficInsureRegisterDate").val($("#now").val())
	                    }
	                    centerSelect('trafficInsureFuelType');
	      		  		centerSelect('trafficInsureOrigin');
	      		  		centerSelect('CarOwerIdentifyType');
	                });
		  			return false;
		  		}
		  		var resultCode10 = "";
		  		if(dataMsg!=null){
		  			resultCode = dataMsg.substring(0,1);
		  			resultCode10 = dataMsg.substring(0,2);
		  		}
		  		$("#beian").hide()
		  		if(dataMsg=="4平台地址错误或平台升级"){
	  		  		$(".btn_gradient_red").attr("disabled",false);
	     			$(".btn_gradient_gray").attr("disabled",false);
	     			
			  		$(".calculating").fadeOut();
	  		  		$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
			  		$("#alertMsg").html(dataMsg.substring(1, dataMsg.length) +'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
			  		return false;
		  		}
		  		//这种情况得单独处理啊 （北京的情况）
		  		if(resultCode=="4" ){
			  		$("#noBuy").addClass('radioed');
			    	$("#buy").removeClass('radioed');
	  		  		$(".btn_gradient_gray").attr("disabled",false);
	  		  		$(".calculating").fadeOut();
	  		  		$("#beian").hide();
	  		  		if($("#citySelected").val()=="33010000" || $("#citySelected").val()=="36010000"){//杭州 wap-2322 南昌2342
	  		  			cueAlert(dataMsg.substring(1, dataMsg.length),{"name":"我知道了","fun":"closeCue"});
	  		  		}else{
		      		  	$("#trafficInsureBody").slideDown(function() {
		                    switchTrafficInsure(this, true);
		                    centerSelect('startDate');
		                    if(data.status=="success" || data.status == ""){
					  			cueAlert("连接交强险平台失败，请稍候重试。",{"name":"我知道了","fun":"closeCue"});
					  			 return false;
					  		}
	                    	cueAlert(dataMsg.substring(1, dataMsg.length),{"name":"我知道了","fun":"closeCue"});
		                    /*$("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		    		  		$("#alertMsg").html(dataMsg.substring(1, dataMsg.length)+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');*/
		                });
		  			}
	  		  		return false;
		  		}
		  	    if(resultCode10==10){
	  		  	    $("#buy").addClass('radioed');
	 		    	$("#noBuy").removeClass('radioed');
			  	    	$(".calculating").fadeOut();
	  		  	    $("#trafficInsureBody").slideDown(function() {
	                    switchTrafficInsure(this, true);
	                    centerSelect('startDate');
	                    $("#hasBz").val(1);
	                    $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
	    		  		$("#alertMsg").html(dataMsg.substring(1, dataMsg.length)+'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
	    		  		$(".btn_gradient_red").hide();
	    		  		changeStartDateSY();
	  		  	    });
	  		  	    
	  		  	    return false;
		  	    }
		  		if(resultCode==6){
		  		    jqflag=1;
		  			var msg = dataMsg.substring(1, dataMsg.indexOf("。")+1);
		  			var newDate = dataMsg.substring(dataMsg.indexOf("。")+1, dataMsg.length);
		  			$("#startDateCI").attr("value", newDate);
		  			
	  		  		var startDateCI = $("#startDateCI").val();
		  		  	var startHourCI = $("#startDate").val();
		  		  	if(startHourCI == "0"){
		  		  		var s = getNextDateFullDate(getNextYearFullDate(startDateCI,1),-1);
		  		  		$("input[name='carInfo.endDateCI']").val(replace(s,"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(24);
		  		  	}else{
		  		  		$("input[name='carInfo.endDateCI']").val(replace(getNextYearFullDate(startDateCI,1),"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(startHourCI);
		  		  	}
	  		  		removeInvalidTips($("#showSY").parents(".commercial_combo"));
	 		    	showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), msg, true);
	 		    	
	 		    	$("#noBuy").addClass('radioed');
	 		    	$("#buy").removeClass('radioed');
	 		    	
	 	 			$(".calculating").fadeOut();
	 	 			$(".btn_gradient_red").attr("disabled",false);
	     			$(".btn_gradient_gray").attr("disabled",false);
	 	 			return false;
		  		}
		  		if(resultCode==8){
		  			if(dataMsg.indexOf("您来早了现在还不能投保交强险")>-1){
		  				removeInvalidTips($("#showSY").parents(".commercial_combo"));
		  				var msg = dataMsg.substring(1);
		 		    	cueAlert(msg,{"name":"我知道了","fun":"closeCue"})
		 		    	$("#noBuy").addClass('radioed');
		 		    	$("#buy").removeClass('radioed');
		 		    	$("#buy").addClass('disabled');		//不可用状态
		 		    	
		 	 			$(".calculating").fadeOut();
		 	 			$(".btn_gradient_red").attr("disabled",false);
		     			$(".btn_gradient_gray").attr("disabled",false);
		 	 			return false;
		  			}
		  			jqflag=1;
 		    		var newJQStartDate = dataMsg.substring(1).replace(/\//g,"-");
 		    		$("#trafficInsurePolicyDate").val(newJQStartDate);
 		    		$("#startDateCI").attr("value", newJQStartDate);
	  		  		var startDateCI = $("#startDateCI").val();
		  		  	var startHourCI = $("#startDate").val();
		  		  	if(startHourCI == "0"){
		  		  		var s = getNextDateFullDate(getNextYearFullDate(startDateCI,1),-1);
		  		  		$("input[name='carInfo.endDateCI']").val(replace(s,"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(24);
		  		  	}else{
		  		  		$("input[name='carInfo.endDateCI']").val(replace(getNextYearFullDate(startDateCI,1),"/","-"));
		  		  		$("input[name='carInfo.endhourCI']").val(startHourCI);
		  		  	}
		  		  var startCIShow = newJQStartDate.replace("-","年").replace("-","月")+"日"+startHourCI+"时"
		  		  cueAlert("亲，您的交强险保险期间与上张保单有重复，系统已自动调整为<span style='color:red'>"+startCIShow+"</span>",{"name":"我知道了","fun":"closeCue"})
		  		  buyJQ();
		  		  return false;
 		    	}
		  		
	 		    if(resultCode==2||resultCode==0||resultCode==5){
	 		    	var msg = dataMsg.substring(1, dataMsg.length);
	 		    	if(msg.indexOf("您的车辆已经在本公司投保了同类型的险种") > -1){
	 		    		$(".calculating").fadeOut();
	 		    		$("#buy").addClass('radioed');
	     		    	$("#noBuy").removeClass('radioed');
	     		    	
	     		    	$("input[name='carInfo.startDateCI']").val($("input[name='carInfo.startDateSY']").val())
	 		           
	     		    	if($("#trafficInsurePolicyDate").length>0){
	     		    		$("#trafficInsurePolicyDate").val($("input[name='carInfo.startDateSY']").val());
	     					changeStartDateSY();
	     				}
	 		    		$("#trafficInsureBody").slideDown(function() {
		                    switchTrafficInsure(this, true);
		                    centerSelect('startDate');
		                    $("#hasBz").val(1);
		                    $("#insurerDesc").css({ 'height': $(document).height() }).fadeIn().find(".popup_dialog").css({'top':'50%','margin-top':-(($('.popup_dialog ol').height()+30)/2)});
		    		  		$("#alertMsg").html(msg +'<br><input type="button"class="closerButton" value="关 &nbsp;&nbsp; 闭" style="margin-left: 31%;margin-top: 10px;width: 75px;height: 28px;border: 0;border-radius: 3px;box-shadow: 2px 2px 2px rgba(116, 116, 116, .4)inset;  font-size: 10px;color: #161616;background: -webkit-gradient(linear,0% 0%,0% 100%,from(white),to(#F0F0F0),color-stop(.5,#D6D6D6));">');
	 		    		});
	 		    		
	 		    		$(".btn_gradient_gray").attr("disabled",false);
						return false;
	 		    	}
	 		    	
	 		    	removeInvalidTips($("#showSY").parents(".commercial_combo"));
	 		    	showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), msg, true);
	 		    	
	 		    	$("#noBuy").addClass('radioed');
	 		    	$("#buy").removeClass('radioed');
	 		    	$("#buy").addClass('disabled');		//不可用状态
	 		    	
	 	 			$(".calculating").fadeOut();
	 	 			$(".btn_gradient_red").attr("disabled",false);
	     			$(".btn_gradient_gray").attr("disabled",false);
	 	 			return false;
	 		    }else{
	 		    	$("#hasBz").val(1); //1代表购买
	 		    	$("#needRevokeHBCount").val("2");
	 		    	$("#buy").addClass('radioed');
	 		    	$("#noBuy").removeClass('radioed');
	 		    	
	     			$("#jqFeeShow").html(fmoney(data.premiumBZ));
	     			var thisPayTax = parseFloat(data.thisPayTax) + parseFloat(data.prePayTax) + parseFloat(data.delayPayTax)
	     			$("#shipFeeShow").html(fmoney(thisPayTax));
	     			$("#jqFee").val(data.premiumBZ);
	     			$("#shipFee").val(thisPayTax);
	     			var allFee = parseFloat($("#forAllFee").val()) + parseFloat(data.premiumBZ) + parseFloat($("#shipFee").val())
	     			$("#allFee").val(allFee);
	     			$("#allFeeShow").html(fmoney(allFee));
	     			//给税额明细需要的东西赋值
	     			if($("#shipFee").val()!='0'){
	     				$("#quotedTaxDetail").show();
	     				$("#shipFeeShow").show();
	     	    		$("#carFeeShow").show();
	     			}else{
	     				$("#shipFeeShow").hide();
	     	    		$("#carFeeShow").hide();
	     	    		$("#quotedTaxDetail").css('display','none');
	     			}
	     			$("#thisPayTax").html(fmoney(data.thisPayTax))
	     			$("#prePayTax").html(fmoney(data.prePayTax))
	     			$("#delayPayTax").html(fmoney(data.delayPayTax))
	     			$("#PayShipDate").html(data.payStartDate + "&nbsp;至&nbsp;" + data.payEndDate)
	     			var allTax = parseFloat(data.thisPayTax) + parseFloat(data.prePayTax) + parseFloat(data.delayPayTax)
	     			$("#allTax").html(fmoney(allTax));
	     			
	     			$(".calculating").fadeOut();
	     			
	     			$("#trafficInsureBody").slideDown(function() {
	     				if($("#trafficInsurePolicyDate").length>0){	//交强险起保日期可见的
	     					if($("#startDateCI").val() != ""){//第二次点击购买
	     						$("#trafficInsurePolicyDate").val(replace($("#startDateCI").val(), "/", "-"));
	     					}
	     					changeStartDateSY();
	     				}
	                    switchTrafficInsure(this, true);
	                    centerSelect('startDate');
	                    centerSelect('TaxPayerIdentType');
	                    $("#hasBz").val(1);
//		     			if($("#proSelected").val()=="14000000"){
//		     				syCalculateFee();
//		     			}
	                    if($("#calcBIFlag").val()=="1"&&$("input[name='carInfo.retrieveFlag']").val() != 1){//购买交强险更优惠则重新算费
	                    	syCalculateFee();
	                    }
		     			var now = new Date($("#now").val());
	         			var defaultDate = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDate();
	         			if(compareFullDate("2015/01/01",defaultDate)=="1"){
	         				if($("#proSelected").val()=="14000000" || $("#proSelected").val()=="42000000"){
	         					showInvalidTips($("#trafficInsureHeader").parents(".traffic_insure"), "请您核实是否已缴纳2014年度车船税，避免重复缴税，并于明年年底前提前续保交强险并缴纳2015年度车船税，防止产生滞纳金", true);
	         				}
	         			}
	                });
	     			//如果有交强险生效日期，添加一个标志位，用来点击下一步的时候提示
	//     			if($("#trafficInsurePolicyDate").is(":visible")){
	//     				$("#jqDataFlag").val(0)
	//     			}
	     			
	     			$("input[name='carInfo.thisPayTax']").val(data.thisPayTax);
	     			$("input[name='carInfo.prepaytax']").val(data.prePayTax);
	     			$("input[name='carInfo.delayPayTax']").val(data.delayPayTax);
	     			$("input[name='carInfo.payStartDate']").val(data.payStartDate);
	     			$("input[name='carInfo.payEndDate']").val(data.payEndDate);
         			configJQ(data);//交强险及时起保配置
	 		    }
	 		   $(".btn_gradient_red").attr("disabled",false);
	 			$(".btn_gradient_gray").attr("disabled",false);
	 			$("#buy").removeClass('disabled');		//不可用状态
	 			$("#noBuy").removeClass('disabled');		//不可用状态
			  },
		     error:function(){
	    	 document.location = "/wap/timeOut"
	     }
 });
}
//暂存
function zanCun(){
	//修改商业险保费后   没点重新计算
    if($("#selectChange").val()=="1"){
    	showInvalidTips($("#showSY").parents(".commercial_combo"), "请重新计算商业险保费！", true);
    	window.scrollTo(0,501);
    	return false;
    }
    
	//是否投保商业险
    if($("#showSY").html()=="0.00"||$("#feeFlag").val()==0){
    	$("input[name='carInfo.hasSy']").val(0)
    }else{
    	$("input[name='carInfo.hasSy']").val(1)
    }

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
            transferdate :replace($("input[name='carInfo.transferdate']").val(),"-","/"),		//过户日期
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
            insuredIdentifyType:$("input[name='carInfo.insuredIdentifyType']").val(),
            insuredIdentifyNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
            insuredMobile:$("input[name='carInfo.insuredMobile']").val(),
            insuredName:$("input[name='carInfo.insuredName']").val(),
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
            itemKindFlag:'3',
			travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),			//平均行驶里程
            licenseflag:$("input[name='carInfo.isNewCar']").val(),//$("input[name='carInfo.licenseFlag']").val(),
            certificatedate:replace($("input[name='carInfo.certificatedate']").val(),"-","/"),
            monopolyname:$("input[name='carInfo.majorFactoryName']").val(),		//专修厂名称
            weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
            isRenewal:$("input[name='carInfo.isRenewal']").val(),
            interimNo:$("input[name='carInfo.interimNo']").val(),
            beforeProposalNo:$("input[name='carInfo.beforeProposalNo']").val(),   
            taxPayerIdentType:$("#TaxPayerIdentType").val(),
            carKindCI:$("#trafficInsureCarModel").val(),
            bjfuel_type:$("#trafficInsureFuelType").val(),
        	certificate_type:$("#trafficInsureOrigin").val(),
    		certificate_no:$("#trafficInsureOriginID").val(),
			certificate_date:replace($("#trafficInsureRegisterDate").val(),"-","/"),
			carIdentifyAddressSX:$("#trafficInsureAddress").val(),		//（山西）车主身份证地址
			carNameSX:$("#trafficInsureBrand").val(),				//（山西）车辆名称、品牌
			carKindSX:$("#trafficInsureCarType").val(),				//（山西）车辆种类
			ccaId:$("input[name='carInfo.ccaId']").val(),
            cmpid:$('input[name="carInfo.cmpid"]').val(),
            comname:$('input[name="carInfo.comName"]').val()
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
function underwriteCheckProfitAjax(){
	closeCue();
	var ctx = $("#ctx").val();
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
			  starthour:$("input[name='carInfo.startHourSY']").val(),
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
			    guohuflag:$("input[name='carInfo.guohuflag']").val(),		//过户日期标志位
			    runAreaCodeName:$("input[name='carInfo.runAreaCodeName']").val(),		//指定行驶区域
			    assignDriver:$("input[name='carInfo.assignDriver']").val(),				//是否指定驾驶员  1指定 2不指定
			    haveLoan:$("input[name='carInfo.haveLoan']").val(),						//是否贷款车
			    LoanName:$("input[name='carInfo.loanName']").val(),		  			//贷款机构名称
			    weiFaName:$("input[name='carInfo.weiFaName']").val(),					//是否违法车          6 非  8是
			    carDrivers:$("input[name='carInfo.assignDriverJson']").val(),			//驾驶员信息
			    oldPolicyNo:$("input[name='carInfo.beforeProposalNo']").val(),  //上年保单号
			    interimNo:$("input[name='carInfo.interimNo']").val(),  //暂存单号      
			    travelMilesvalue:$("input[name='carInfo.travelMilesvalue']").val(),
			    insuredIdentifyNumber:$("input[name='carInfo.insuredIdentifyNumber']").val(),
		    	appliIdentifyNumber:$("input[name='carInfo.appliIdentifyNumber']").val(),
	    		carIdentifyNumber:$("input[name='carInfo.carIdentifyNumber']").val()	//平均行驶里程
		   },
	         dataType:"html",
 	  success: function(data)
 		  {
	   		  var s = eval("("+data+")");//转换为json对象
	   		  s = JSON.parse(s.common);
			  if(s.resultCode=="1"){
				  syCalculateFee();
			  }else{
				  window.location.href="/wap/views/carProposal/errorReject.jsp";
				  return false; 
			  }
		  },
		  error: function(){
			  window.location.href="/wap/views/carProposal/errorReject.jsp";
		  }
	})
}
function switchTrafficInsure(panel, purchase) {
	removeInvalidTips($("#showSY").parents(".commercial_combo"));
    var elements = $(panel).find("input, select");
    if(!purchase) {
    	
    } else {
        $(elements).removeAttr("disabled");
    }
}
function isBuyTax(){
	if($("#iscarship").is(":checked")){
		$("input[name='carInfo.iscarship']").val('1');
		$("#kunmingTips").hide();
	}else{
		$("input[name='carInfo.iscarship']").val('0');
		$("#kunmingTips").show();
	}
	buyJQ();
}
function change_050643(){
	
	if($("#select_050643").val()=="0"){
		$("#select_050917").val("0")
		$("#select_050917").html("<option value='0'>不投保</option>");
	}else{
		var amountList_050917 = $("#amountList_050917").val();//附加险二合一
		if(amountList_050917 != "" && amountList_050917 != null){
			var selectString = "";
			var optionString = "";
			if(amountList_050917.indexOf("|")!=-1){
				attr = amountList_050917.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050917").html(selectString);
				$("#select_050917").val($("#amount_050917").val());
				if($("#premium_050917").val()==0 || $("#premium_050917").val()==""){
					$("#premium_050917").val("0.00")
				}
				$("#fee_050917").html(fmoney($("#premium_050917").val()));
			}
		}else{
			$("#tr_050917").hide()
		}
	}
}
function bothToUnchange(){
	var select_050600=$("#select_050600").val();//三者险
	var select_050701=$("#select_050701").val();//车上人员司机
	var select_050702=$("#select_050702").val();// 车上人员乘客
	var amountList_050643=$("#amountList_050643").val();//二合一的值 
	if(amountList_050917 != null && amountList_050643!="" && select_050600!="0" && select_050701!="0" && select_050702!="0"){
			var selectString = "";
			var optionString = "";
			if(amountList_050917.indexOf("|")!=-1){
				attr = amountList_050917.split("|");
				for(var i=0;i<attr.length;i++){
					var attrs = attr[i];
					if(attr[i]==0){
						attrs="不投保"
					}
					if(attr[i]==1){
						attrs="投保"
					}
					optionString = "<option value="+attr[i]+">"+attrs+"</option>";
					selectString = selectString + optionString
					
				}
				$("#select_050917").html(selectString);
				$("#select_050917").val($("#amount_050917").val());
				if($("#premium_050917").val()==0 || $("#premium_050917").val()==""){
					$("#premium_050917").val("0.00")
				}
				$("#fee_050917").html(fmoney($("#premium_050917").val()));
			}
	}else{
		$("#tr_050917").hide();	
	}
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return ""; //返回参数值
}

//悠易DSP跟踪代码
function YoTrack(url){
	var d = new Image(1, 1);
	d.src = url+"&r="+Math.random();
	d.onload = function() {d.onload = null;}
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
//弹框确定返回主页面
function  rollBack(){
	 window.location.href="/wap";
}

function formSubmit(){
	$('#form').submit();
}
