/**
 * 初始化调用方法规则，
 * $('#invoice_p').ready(function () {
 *	if($('#invoice_p').length > 0){
 *	}
 * });
 * 其他函数为工具函数或多页面公用功能函数
 */

/**
 * 纸质保单控件载入（根据情况判断电子等保单显隐）
 */
$('#invoice_p').ready(function () {
	if($("#invoice_p").hasClass('active') || $("#invoice_e").hasClass('active')) {
		$('#field_title_div').show();
	}else{
		$('#field_title_div').hide();
	}
	
	if($('.custom_radio').length > 0){
		//保单发票
		$(".custom_radio").click(function(){
			$(this).parent().siblings('.radio_wrap').find('input').removeClass('active');
			if($(this).siblings().hasClass('active')){
				if($(this).hasClass('invoice')){
					$(this).siblings().removeClass('active'); 
					$(this).siblings().removeAttr('checked');
				}
			}else{
				$(this).siblings().addClass('active'); 
				$(this).siblings().prop("checked",function(){return true;});
			}
			var val1 = $('#policy_e').hasClass('active');
			var val2 = $('#policy_p').hasClass('active');
			var val3 = $('#invoice_e').hasClass('active');
			var val4 = $('#invoice_p').hasClass('active');
			if(val1 == true || val3 == true){//含有电子选项
				$('.deliver_info .column_email').show();
			}else{
				$('.deliver_info .column_email').hide();
			}
			if(val3 == true || val4 == true){//使用发票
				$('#field_title_div').show();
			}else{
				$('#field_title_div').hide();
			}
		});
	}
});

/**
 * 公共初始化险种（整合多页面）
 * insurance_code 险别代码
 */
function initInsurance( insurance_code){
	var amountList = $("#amountList_"+insurance_code).val();
	if(amountList != "" && amountList != null){
		var selectString = "";
		var optionString = "";
		if(amountList.indexOf("|")!=-1){
			attr = amountList.split("|");
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
			$("#select_"+insurance_code).html(selectString);
			$("#select_"+insurance_code).val($("#amount_"+insurance_code).val());
			if($("#premium_"+insurance_code).val()==0 || $("#premium_"+insurance_code).val()==""){
				$("#premium_"+insurance_code).val("0.00")
			}
			$("#fee_"+insurance_code).html(fmoney($("#premium_"+insurance_code).val()));
		}
	}else{
		$("#tr_"+insurance_code).hide()
	}
}

/**
 * 车险用于将input域中的值转成json的方法
 * @returns	当前页面input域中所有的值组成的ajax中调用的data
 */
function inputToJSON(){
	var jsondata = "{\"a\":\"1\"";				//为了让json更好拼将第一个“,”前的值设置一个不用的参数a:1
	$("input").each(function(i){
		if($(this).attr("name")!="carCodex"
			&&$(this).attr("name")!="carInfo.EADJson"//name=carInfo.EADJson的值是个json串会影响json生成，需要过滤掉
			&&$(this).attr("name")!=undefined){	//name=carCodex的值是个json串会影响json生成，需要过滤掉 
			jsondata = jsondata + ",\""+$(this).attr("name")+"\":\""+$(this).val()+"\"";
		}
	});
	jsondata = jsondata + "}";
	jsondata = jsondata.replace(/\s/g,"");
	return $.parseJSON(jsondata);
}

/**
 * 交强险及时起保配置
 * data 交强险投保返回信息
 * data.startDateJqFlag 0为及时起保，1为不可以及时起保
 */
function configJQ(data){
	if("1" == data.startDateJqFlag){
		$("#jqType").parent().hide();
		$("#jqTimeLable").show();
	}else if("0" == data.startDateJqFlag){
		$("#jqType").parent().show();
		$("#jqTimeLable").hide();
	}
}
