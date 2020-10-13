

$(document).ready(function () {

	function startTime() {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		m = checkTime(m);
		s = checkTime(s);
		$('#time').html('').append(	h + ":" + m + ":" + s) ;
		var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	startTime();



var totalSeconds =1140;

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
function setTime() {
	++totalSeconds;

	if(totalSeconds <= 1200)
	{
	console.log(totalSeconds);
 $('#seconds').html( pad(totalSeconds % 60));
 $('#minutes').html( pad(parseInt(totalSeconds / 60)));
	}
}



setInterval(setTime, 1000);

});


