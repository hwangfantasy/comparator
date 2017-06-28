
$(function() {	   
	 
	 	   /**
	 	    * 初始化页面，如果已经登录的直接展示可抵用的保费
	 	    */
	        //普通流程支付页面初始化必须将勾选状态清零
	 		if($("#integrationChannel").val()=="4"||$("#scoreBtn").val()=="0"){
	 			checkIntegral();
	 			$("#scoreBtn").val("0");
	 		};
	 	 
	 		isPayWayForJFHBF();//判斷綫上綫下·
	 		
	 		//订单支付也判断使用积分与否，更新中间表
	 		 $(".step_t_btn").click(function(){
	 			 var index=$(this).parent().parent().attr("id").replace("orderForm","");
	 			 if( ($("#orderForm"+index).find("#dingdanOld").val())== ($("#orderForm"+index).find("#dingdanChange").val())){
	 				checkIntegral(index);
	 			 }
	 		 });
	 		
	       $(".using-integral-img").click(function(){
	    	  var index = $(this).attr("id").replace("btn","");
	    	   //未登录情况弹出登录弹出
	    	   //判断流程
	    	  if($("#payOld").length>0){
	    		  $(window.top.document).find("#scoreBtn").val("1");
	    	  }else{
	    		  $("#orderForm"+index).find("#scoreBtn").val("1");
	    	  }
	    	  
	           if($("#entryId").val()==""||$("#entryId").val()==null){
	 				if($("#userRank").val()!="1"){
	 					logTwo();
	 				 }
	 			}else{//
	 				if(!$(this).hasClass("using-integral-img-checked")){
	 					//判断，如果已经登录的用户不是高级会员则让他升级高级会员
	 					if( $("#userRank").val()==""||$("#userRank").val()=="0"){
       					  $(".orduser").show();
       					  return false;
       				  	}else{
       				  		IdentityComparisonAndPush(undefined,index);//如果已经是高级会员，则判断会员用户是否与投保人一致
// 					checkIntegral(1)
       				  	}
	 					
	 				}else{
	 					$(this).removeClass("using-integral-img-checked");
	 					checkIntegral(index)
	 				}
	 			}
	       });
	        
	      /* $("#btn").click(function(){
	        	   //未登录情况弹出登录弹出
	    	   //判断流程
	    	   $(window.top.document).find("#scoreBtn").val("1");
	           if($("#entryId").val()==""||$("#entryId").val()==null){
	 				if($("#userRank").val()!="1"){
	 					logTwo();
	 				 }
	 			}else{//
	 				if(!$("#btn").hasClass("using-integral-img-checked")){
	 					//判断，如果已经登录的用户不是高级会员则让他升级高级会员
	 					if( $("#userRank").val()==""||$("#userRank").val()=="0"){
       					  $(".orduser").show();
       					  return false;
       				  	}else{
       				  	IdentityComparisonAndPush();//如果已经是高级会员，则判断会员用户是否与投保人一致
//	 					checkIntegral(1)
       				  	}
	 					
	 				}else{
	 					$(".using-integral-img").removeClass("using-integral-img-checked");
	 					checkIntegral(0)
	 				}
	 			}
	 		});*/
	       /**
	        * 出现情况：用户登录账号与投保人不符
	        * 用户选择重新登陆并成为高级会员
	        */
			
	       $("#notSameAndRegiste").click(function(){
        	   //退出当前登录状态
	    	   $.ajax({ 
					type:"post", 
					url:"/wap/personelCenter/customer/loginOutForJFHBF", 
					async:false,    
					data:{
						entryId:$("#entryId").val()
					},
					dataType:"json", 
					success:function (data) { 
						if(data.message == "退出登录成功"){
							//关闭弹层
							$(".defferent").hide();
							//重新登陆
					    	 logTwo();
						}else{
							alert("请求失败，请稍后重试！")
						}
					}
				});
	    	   
          
	       });
	   	//支付方式切换
			$('#tab_nav>li').click(function(){
				var ind = $(this).index(); 
				if($("#activityFlag").val()=="1"){//表明积分换保费有活动
					if("bankTitle" == $(this).attr("id") || "alipayTitle" == $(this).attr("id")){//是线上支付
						var payChange = $("#payChange").val();
						if($("#integrationChannel").val()=="4"){//表示普通投保流程
							$(".showprice").parent().css('display','block'); 
							//将积分抵扣显示框显示
							if($(".using-integral-img-checked").length>0){
							$("#sumPremium2").css("color","black").css("text-decoration","line-through");
							$("#sumPremium9").html(payChange+"元");
							$('#showPre').css('display','block');
							}
						}else{//订单支付的页面来的
							//将保费进行更换
							$("#sumPremium3").html(payChange+"元");
							$("#sumPremium2").html(payChange+"元");
							//订单支付页过来的订单信息商业险的展示
							$("#syAmount").html($("#sySumpreChange").val());
							
						}
					}else{//非线上支付
						var payChange = $("#sumPremium").val();
						if($("#integrationChannel").val()=="4"){//表示普通投保流程
							$(".showprice").parent().css('display','none'); 
							//将积分抵扣显示框隐藏
						   $('#showPre').css('display','none');
						   $("#sumPremium2").css("color","red").css("text-decoration","none");
						}else{//订单支付的页面来的
							//将保费进行更换
							$("#sumPremium3").html(payChange+"元");
							$("#sumPremium2").html(payChange+"元");
							//订单信息页的商业险保费要更换回来
							$("#syAmount").html($("#sySumpre").val());//需要将元来的商业险保费拿到
						}
						
					}
				}
				
			});
		});
		//登录后只判断勾选情况 及更新表
		function checkIntegral(index){
			var proposalnobi;
			if($("#dingdanOld").length>0){
				proposalnobi= $("#orderForm"+index).find("#proposalnobi").val();
			}
			if($("#payOld").length>0){
				proposalnobi=$("#proposalnobi").val();
			}
			$.ajax({ 
				type:"post", 
				url:"/wap/payOnLine/ecar/integrationinfo/updateIntegration", 
				async:false,    
				data:{
					flag:"0",
					proposalNo:proposalnobi,
					   entryId:$("#entryId").val()
				},
				dataType:"json", 
				success:function (data) { 
				   if($("#dingdanOld").length>0){
					   //将标志位至空
					   $("#orderForm"+index).find("#dingdanChange").val($("#orderForm"+index).find("#sumPremium").val());
                       $("#orderForm"+index).find(".showprice").html("使用积分兑换保费，仅限高级会员！");
                       //判断流程
                       $("#orderForm"+index).find("#scoreBtn").val("0");
                       $("#orderForm"+index).find(".payButton").html("支付");
				   }else if($("#payOld").length>0){
					   $(".showprice").html("使用积分兑换保费，仅限高级会员！");
					  //将标志位至空
					   $("#payChange").val($("#payOld").val()); 
						   $("#sumPremium2").html($("#payOld").val()+"元");
						   $("input[name='tradeAmount']").val($("#payOld").val());
						   //判断流程
						   $(window.top.document).find("#scoreBtn").val("0");
						   //将积分抵扣显示框隐藏
						   $('#showPre').css('display','none');
						   $("#sumPremium2").css("color","red").css("text-decoration","none");
				   }
				}
			});	        
		}
		
//注册账号弹层登陆
function logTwo() {
			if((parent).$("#flowAccountTwo").attr("class")==undefined){//兼容两种登录
				$("#flowAccount blockquote").hide();
			    $(window).scrollTop(0);
			    $("#flowAccount").css({ 'height': $(document).height() }).removeClass("close").addClass("open").find("a.closer, a.collapse").bind('click', function() { $(this).parents(".declaration").removeClass("open").addClass("close"); return false; });
			    $("#flowSignOn").fadeIn();
			    return false;
			}
			 $("#flowAccountTwo").removeClass("close").addClass("open").find("a.closer, a.collapse").bind('click',function() {
						$(this).parents(".declaration").removeClass("open").addClass("close");
						return false;
					});
			$("#insurerDec3").find("a.closer, a.collapse").bind(
					'click',
			function() {
				$(this).parents(".declaration").removeClass("open").addClass("close");
				return false;
			});
			var height = document.body.scrollHeight;
		  $("#flowAccountTwo").css("height", height);
		   return false;
		}  

/**
 * 判断是否是积分换保费的流程
 * 进一步判断是否是高级会员
 */
function isIntegralExchangePremium(index){
		  if($("#scoreBtn").val()=="1"){//表示存在积分换保费活动
//			  $("#userRank").val(userRank);
			  if( $("#userRank").val()==""||$("#userRank").val()=="0"){//不是高级会员
				  $(".orduser").show();
			  }else{//是高级会员
				  IdentityComparisonAndPush(undefined,index);
			  }
		  }
		  return false;
}
/**
 * 积分换保费功能
 * 确定登陆人为高级会员后
 * 比较登陆人与投保人是否是同一个人
 * 并在确定是同一个人后进行俱乐部推送锁定
 */
function IdentityComparisonAndPush(data,index){
	if(data!= undefined && data.message=="成功"){
		$("#userRank").val("1");
		window.top.hideOverPage();//跳出高级会员注册弹层
		$(window.top.document).find(".orduser").hide();//关闭去注册高级会员弹层
		//拿到登陆人账号去查信息
	}
	$.ajax({
			url:"/wap/personelCenter/customer/initModifyPersonalMSG",
			data:{
				entryId:$("#entryId").val()
				},
			dataType:'json',
			method:'post',
			success:function(data){
				//得到姓名和身份证号
				var entryName = data.customerCName;
    			var entryIdentifyType = data.identifyType;
    			var entryIdentifyNumber = data.identifyNumber;
    			//获得投保人姓名和证件号
    			var insureName = $("input[name='Prptintegrationinfo.insuranceName']").val();
    			var insureIdentryNumber = $("input[name='Prptintegrationinfo.identifyNumber']").val().replace(/\s/g,"");
    			var identifyType=$("input[name='Prptintegrationinfo.identifyType']").val().replace(/\s/g,"");
    			/**
    			 * 与投保人信息做比较
    			 */
    			if(entryName == insureName && entryIdentifyNumber == insureIdentryNumber && entryIdentifyType==identifyType){//信息一致
    				//如果信息一致则像俱乐部推送信息并且进行锁定表，返回结果 返回  0  1  2  3  4 
    				integration_push(index);
    				if(index==undefined){
    					$(".zhezhao").hide();
    				}
    				return true;
    			}else{//信息不一致
				   //integration_push(index);
    				$(window.top.document).find(".defferent").show();
    				return false;
    			}
    			
    		}
    			
	});
}
	//积分推送调用方法
	function integration_push(index){
		   if(window.top.document.getElementById("integrationActivity")){
			   var proposalnobi;
				if($("#dingdanOld").length>0){
					proposalnobi= $("#orderForm"+index).find("#proposalnobi").val();
				}
				if($("#payOld").length>0){
					proposalnobi=$("#proposalnobi").val();
				}
		     
		    	top.$(".orduser").hide();
		    	$(".zhezhao").show();
		    	//已向俱乐部推送高级会员信息
			    	$.ajax({
						url:"/wap/carProposal/getPaymentInfo/checkStatus",
						data:{
							proposalNo:proposalnobi
							},
						dataType:'json',
						method:'post',
						success:function(data){
							//0积分推送或锁定失败    1成功推送    2积分推送或锁定失败  返回Desc  3 积分已经失效    4 保费金额不一致，需要重新推送     
							var resultCode=data.resultCode;
							if(data.resultCode=="0"){
								if($("#dingdanOld").length>0){
									$(".zhezhao").hide();
									$("#orderForm"+index).find(".showprice").html("<span>系统查询失败！</span>");
									 //$("#btn"+index).addClass("using-integral-img-checked");
								}else if($("#payOld").length>0){
									$(".zhezhao").hide();
									$(".showprice").html("<span>系统查询失败！</span>");
									//$("#btn").addClass("using-integral-img-checked");
								}
							}else if(data.resultCode=="2" && ((data.resultDesc).indexOf("不是注册用户")>0)){
								if($("#dingdanOld").length>0){
									$(".zhezhao").hide();
									$("#orderForm"+index).find(".showprice").html("<span>您的会员信息错误</span>");
									 //$("#btn"+index).addClass("using-integral-img-checked");
								}else if($("#payOld").length>0){
									$(".zhezhao").hide();
									$(".showprice").html("<span>您的会员信息错误</span>");
									//$("#btn").addClass("using-integral-img-checked");
								}
							}else if(data.resultCode=="2" && ((data.resultDesc).indexOf("活动未配置")>0)){
								if($("#dingdanOld").length>0){
									$(".zhezhao").hide();
									$("#orderForm"+index).find(".showprice").html("<span>活动已过期，您可以重新投保并享受最新活动</span>");
									 //$("#btn"+index).addClass("using-integral-img-checked");
								}else if($("#payOld").length>0){
									$(".zhezhao").hide();
									$(".showprice").html("<span>活动已过期，您可以重新投保并享受最新活动 </span>");
									//$("#btn").addClass("using-integral-img-checked");
								}
								
							}else if(data.resultCode=="3"){
								if($("#dingdanOld").length>0){
									$(".zhezhao").hide();
									$("#orderForm"+index).find(".showprice").html("<span>您的积分已过有效期</span>");
									$("#btn"+index).addClass("using-integral-img-checked");
								}else if($("#payOld").length>0){
									$(".zhezhao").hide();
									$(".showprice").html("<span>您的积分已过有效期</span>");
									//$("#btn").addClass("using-integral-img-checked");
								}
								}else if(data.resultCode=="4"){
								if($("#dingdanOld").length>0){
									integration_push(index);
								}else if($("#payOld").length>0){
									integration_push();
								}
							}else if(data.resultCode=="1"){
								//积分抵扣查询成功
							     //判断是否是电销刘程
								if($("#dingdanOld").length>0){
									var sumPremium = $("#orderForm"+index).find("#sumPremium").val();
									sumPremium = (sumPremium - data.deductible).toFixed(2);
									var buttonValue = "支付&nbsp;&nbsp;&nbsp;&nbsp;" + sumPremium+"元";
									$("#orderForm"+index).find(".payButton").html(buttonValue);
									//将积分抵扣后的钱放入标志位
									$("#orderForm"+index).find("#dingdanChange").val(sumPremium);
									//提示语
									$(".zhezhao").hide();
									$("#orderForm"+index).find(".showprice").html("可使用<span style='color:#ff1600'>"+data.score+"</span>积分"+"抵扣<span style='color:#ff1600'>"+data.deductible+"</span>元！");
									$("#btn"+index).addClass("using-integral-img-checked");
									//判断是否是车险流程
								}else if($("#payOld").length>0){
									 $("#sumPremium2").css("color","black").css("text-decoration","line-through");
									var sumPremium = $("#sumPremium").val();
//										$("input[name='tradeAmount']").val((sumPremium- data.deductible).toFixed(2));
									    sumPremium = (sumPremium- data.deductible).toFixed(2)+"元";
									    $("#sumPremium9").html(sumPremium);
									    $('#showPre').css('display','block');
									    //将积分抵扣后的钱放入标志位
									    $("#payChange").val(($("#sumPremium").val()- data.deductible).toFixed(2));
									    $(".zhezhao").hide();
									    $(".showprice").html("可使用<span style='color:#ff1600'>"+data.score+"</span>积分"+"抵扣<span style='color:#ff1600'>"+data.deductible+"</span>元！");
										$("#btn").addClass("using-integral-img-checked");
								}
							
							}
					//$(".using-integral-star",window.parent.document).hide();
					},
					err:function(){}
				});
		    	window.top.hideOverPage();//跳出弹层
   			  return true;
		  }
}
/**
 * 初始化通过支付方式判断是否展示文字
 */
function isPayWayForJFHBF(){
	if($("#gtzf").attr("class")=="active_tab" || $("#ddfk").attr("class")=="active_tab"){//初始化默认支付是线下支付
		var payChange = $("#sumPremium").val();
		if($("#integrationChannel").val()=="4"){//表示普通投保流程
			$(".showprice").parent().css('display','none'); 
			//将积分抵扣显示框隐藏
			$('#showPre').css('display','none');
			$("#sumPremium2").css("color","red").css("text-decoration","none");
		}else{//订单支付的页面来的
			//将保费进行更换
			$("#sumPremium3").html(payChange);
			$("#sumPremium2").html(payChange+"元");
		}
		
		}else{
			//订单支付页面有活动弹层提示 电销和 待支付订单流程
	 		if($("#dingdanOld").length>0 && $("input[name='Prptintegrationinfo.activityFlag']").val()=="1"){
	 			$("#layer").show();
	 		}
	 		//支付页面有活动弹层提示   普通移动网销流程  个人中心
	 		if($("#activityFlag").val()=="1" && $("#integrationChannel").val()=="4"){
	 			$("#layer").show();
	 		}
		}
		
		
}
