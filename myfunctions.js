/****  Home page *****/

// Get the modal
var modal = document.getElementById("notes_modal");

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function show_modal() {
	//var btn = document.getElementById("show_notes");
	modal.style.display = "block";
}

function close_modal() {
	//	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "none";
}

/* end Home */

/**** request loan ****/
function Captcha() {
	var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	var i;
	for (i = 0; i < 6; i++) {
		var a = alpha[Math.floor(Math.random() * alpha.length)];
		var b = alpha[Math.floor(Math.random() * alpha.length)];
		var c = alpha[Math.floor(Math.random() * alpha.length)];
		var d = alpha[Math.floor(Math.random() * alpha.length)];
		var e = alpha[Math.floor(Math.random() * alpha.length)];
		var f = alpha[Math.floor(Math.random() * alpha.length)];
		var g = alpha[Math.floor(Math.random() * alpha.length)];
	}
	var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
	document.getElementById("mainCaptcha").value = code
}

function ValidCaptcha() {
	var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
	var string2 = removeSpaces(document.getElementById('captcha').value);
	if (string1 == string2) {
		return true;
	} else {
		return false;
	}
}

function removeSpaces(string) {
	return string.split(' ').join('');
}

function submit_form() {

	if (ValidCaptcha()) {
		return validate_inputs();
	} else {
		alert("يرجى التأكد من مطابقة رمز التحقق");
		return false;
	}
}

function validate_inputs() {

	var name = document.forms["loan_form"]["name"];
	if (!name.value.match(/^[A-Za-z]+$/)) {
		alert('الرجاء التحقق من الاسم المدخل، ملاحظة: يجب أن يحتوى الاسم على حروف هجائية فقط');
		name.focus();
		name.select();
		return false;
	}

	var serial_number = document.forms["loan_form"]["serial_number"];
	if ((!serial_number.value.match(/^\d{11}$/)) ||
		(!serial_number.value.match(/^(0[1-9]{1})|(1[0-4]{1})[0-9]{9}$/))
	) {
		alert('الرقم الوطني غير صحيح، ملاحظة: يجب أن يكون الرقم الوطني مؤلف من 11 خانة');
		serial_number.focus();
		serial_number.select();
		return false;
	}

	var phone = document.forms["loan_form"]["phone_number"];
	if (!phone.value.match(/^09\d{8}$/)) {
		alert("رقم الهاتف غير صحيح، ملاحظة:يجب أن يكون الرقم مؤلف من 10 خانات ويبدأ ب 09");
		phone.focus();
		phone.select();
		return false;
	}

	var email = document.forms["loan_form"]["email"];
	if (!email.value.match(/^\S+@\S+\.\S+$/)) {
		alert('عنوان البريد الالكتروني غير صالح');
		alert('example@example.example يرجى ادخال بريد من الشكل');
		email.focus();
		email.select();
		return false;
	}

	var birthdate = document.forms["loan_form"]["birth_date"];
	if (!birthdate.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
		alert("التاريخ غير صالح");
		birthdate.focus();
		birthdate.select();
		return false;
	}

	var loan_value = document.forms["loan_form"]["value"];
	if (!phone.loan_value.match(/^\d+$/) || loan_value.value < 1000000 || loan_value.value > 10000000 ) {
		alert("القيمة غير صالحة، ملاحظة: قيمة القرض عدد صحيح يبدأ من مليون 1 وحتى 10 مليون");
		loan_value.focus();
		loan_value.select();
		return false;
	}

	var payment = document.forms["loan_form"]["payment"];
	const payments = ["شهرية", "ربعية", "سنوية"];
	if (!payments.includes(payment)) {
		alert("طريقة تسديد الدفعات المدخلة غير متاحة");
		years.focus();
		years.select();
		return false;
	}

	var years = document.forms["loan_form"]["loan_period"];
	const available_years = [3, 5, 10, 15, 20];
	if (!available_years.includes(years)) {
		alert("عدد السنوات المدخل غير متاح");
		years.focus();
		years.select();
		return false;
	}

	return true;
}

function data() {

	var url_string = window.location;
	var url = new URL(url_string);
	var name = url.searchParams.get("name");
	var serial_number = url.searchParams.get("serial_number");
	var birthdate = url.searchParams.get("birth_date");
	var email = url.searchParams.get("email");
	var phone = url.searchParams.get("phone_number");
	var loan_value = url.searchParams.get("value");
	var payment = url.searchParams.get("payment");
	var years = url.searchParams.get("loan_period");
	var type = url.searchParams.get("loan_type");
	var address = url.searchParams.get("address");

	document.getElementById("name").innerHTML = name;
	document.getElementById("serial_number").innerHTML = serial_number;
	document.getElementById("birthdate").innerHTML = birthdate;
	document.getElementById("phone_number").innerHTML = phone;
	document.getElementById("email").innerHTML = email;
	document.getElementById("address").innerHTML = address;

	document.getElementById("loan_value").innerHTML = loan_value;
	document.getElementById("payment").innerHTML = payment;
	document.getElementById("years").innerHTML = years;
	if (products[type]) {
		document.getElementById("type").innerHTML = products[type][0];
		document.getElementById("rate").innerHTML = products[type][1] + '%';
		document.getElementById("value").innerHTML = (loan_value * products[type][1]) / 100;
	}

}
/**** end loan ****/

/* products */
var products = {
	"saving": ['حساب التوفير', '5', 'من خلال هذا الحساب يمكنك الحصول على أرباح بنسب مشاركة تنافسية'],
	"current": ['الحساب الجاري', '10', 'الخيار الأفضل للعملاء للتعامل المصرفي لأنه يمكنهم من إدارة المصروفات ولالتزامات المالية'],
	"learning": ['القرض التعليمي', '10', 'تمويل جميع المراحل الدراسية والجامعية والدرجات العلمية والبرامج التدريبية المتخصصة'],
	"home": ['القرض السكني', '11', 'القرض السكني سيساعدك على امتلاك منزل أحلامك'],
	"agricultural": ['القرض الزراعي', '14', ' يهدف الى احياء الاراضي الزراعيه واصلاحها أوشرائها'],
	"commercial": ['القرض التجاري', '18', 'يغطي الاحتياجات التمويلية لسلسلة التوريد ابتداءً من وقت شراء البضائع حتى بيعها'],
	"transport": ['قرض النقل', '12', 'يتيح هذا المنتج الاستفادة من تمويل ميسر لممارسة الأعمال الحرة الشخصية'],
	"workshops": ['قرض الورشات', '14', 'قروض ميسرة لفتح ورشات صناعية وتزويدها بكافة المستلزمات'],
};

function product(type) {
	if (products[type]) {
		document.getElementById('notes_title').innerHTML = products[type][0];
		document.getElementById('loan_details').innerHTML = products[type][2];
	}
	show_modal();
}

/**** end products ****/