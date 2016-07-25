/**
 * 检验姓名是否为汉字
 * @return {boolean} 输入是否合法
 */
var _verifyName = function() {
	var _chineseReg = /^[\u4e00-\u9fa5]+$/;
	if (_chineseReg.test($("#name").val())) {
		return true;
	} else {
		return false;
	}
};

/**
 * 检验手机号码是否为11位数字
 * @return {boolean} 输入是否合法
 */
var _verifyTel = function() {
	var _chineseReg = /^[0-9]{11}$/;
	if (_chineseReg.test($("#telephone").val())) {
		return true;
	} else {
		return false;
	}
};

/**
 * 检验验证码是否为4位数字
 * @return {boolean} 输入是否合法
 */
var _verifyCode = function() {
	var _chineseReg = /^[0-9]{4}$/;
	if (_chineseReg.test($("#code").val())) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * 切换checkbox选中状态
 */
var _checkedToggle = function () {
	if ($(".form-check").toggleClass("form-checked"));
	_verifyAll();
}

/**
 * 检验是否勾选已阅读并同意
 * @return {boolean} 输入是否合法
 */
var _verifyAgree = function() {
	// if ($("#agree").is(":checked") == true){
	// 	return true;
	// }
	// else {
	// 	return false;
	// }
	if ($(".form-check").hasClass("form-checked")){
		return true;
	}
	else {
		return false;
	}
}

/**
 * 显示警告信息
 * @param {String} _warnningMsg 待显示的警告信息
 */
var _showWarnning = function(_warnningMsg){
	$("warnning").html(_warnningMsg);
	$("warnning").fadeIn();
	setTimeout(function(){$("warnning").fadeOut()}, 3000);
}

/**
 * 检验姓名、手机号码是否合法，若合法获取验证码
 */
var _preVerify = function() {
	if ($(".code").hasClass("engage")) {
		return;
	}
	if (!_verifyName()) {
		_showWarnning ("请输入中文姓名！");
	}
	else if (!_verifyTel()){
		_showWarnning ("请输入正确的手机号码！");
	}
	else {
		$(".code").addClass("engage");
		var _count = 60;
		var _doCount = function(){
			_count--;
			if (_count > 0) {
				$(".code").html(_count);
				setTimeout(function(){
					_doCount();
				}, 1000);
			}
			else {
				$(".code").html("获取验证码");
				$(".code").removeClass("engage");
			}
		};
		_doCount();
	}	
};

/**
 * 检验姓名、手机号码、验证码、已阅同意是否合法，若合法，点亮“立即下单”按钮
 */
var _verifyAll = function() {
	if (_verifyName() && _verifyTel() && _verifyCode() && _verifyAgree()) {
		$(".form-btn").removeClass("form-btn-disabled");
	}
	else{
		if (!$(".form-btn").hasClass("form-btn-disabled")) {
			$(".form-btn").addClass("form-btn-disabled");
		}
	}
}

/**
 * 检验姓名、手机号码、验证码、已阅同意是否合法，若合法，点亮“立即下单”按钮
 */
var _doPost = function() {
	if ($(".form-btn").hasClass("form-btn-disabled")) {
		return false;
	}
	var _orderInfo = {};
	_orderInfo.name = $("#name").val();
	_orderInfo.tel = $("#telephone").val();
	_orderInfo.code = $("#code").val();
	console.log (_orderInfo);		
}

/**
 * 获取验证码按钮、输入框、checkbox、立即下单按钮事件绑定
 */
$(".code").on ("click", _preVerify);
$("input").on ("input", _verifyAll);
$(".form-check").on ("click", _checkedToggle);
$(".form-btn").on ("click", _doPost);