

$(document).ready(function () {

	$.ajax({
		url: "https://neidenmark-nodered.herokuapp.com/api/VolvoTruck/restArea/Search",
		cache: false,
		success: function(result){

			let str = '';

			$.each(result, function(i,data){

				console.log(data);

				str = str+	`<div class="slds-size_1-of-3" >
				<div class="slds-box slds-box_x-small slds-text-align_center slds-m-around_x-small" style="    height: 180px;padding-top: 40px;background-color:white;color:black;">
				<div style="font-size:14px;">${data.Name}</div>
				<div  style="font-size:10px;">Kilometers: 7km</div>
				<div  style="font-size:10px;">Time:4min</div>
				<div style="height:50px;background-color:#899964;margin-top:30px;text-align:center;">
					<img src="/assets/images/fuel.svg" style="height: 20px;filter:invert();width: 20px;margin-left:2px;margin-top:5px;" />
					<img src="/assets/images/toilet.svg" style="height: 20px;filter:invert();width: 20px;margin-left:8px;margin-top:5px;" />
					
				</div>
				</div>
			</div>`;

			})
			
		 
$("#stations").append(str);

			
		}
	});


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
	
 $('#seconds').html( pad(totalSeconds % 60));
 $('#minutes').html( pad(parseInt(totalSeconds / 60)));
	}

	else{
		$("#drivercoach").css("display","none");
		$("#drivercoach_toggle").css("display","block");
	}
}



setInterval(setTime, 1000);

});


