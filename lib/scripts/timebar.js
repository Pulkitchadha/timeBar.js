var totalTime = 550;
var cuePoints = [60, 120, 180, 240, 300, 360];
var barLength = 0;
var globalPageX = 0;
var selectedTime = 0;

$("#duration").text(0);

function timebar() {
	console.log('this', this);
}

$(document).ready(function () {
	$.fn.timebar = function () {
		init(this);
	}
});

function init(ele) {

	let data = '';

	//time bar
	data += `<div class='timeline-cover'>
				<div id='draggable'></div>
				<div class='timeline-bar'>
					<div class='steps-bar clearfix'></div>
				</div>
			</div>`;

	// buttons
	data += `<div>
				<button class='btn btn-primary' id='addCuePoint'>Add</button>
				<button class='btn btn-primary' id='UpdateCuePoint'>Update</button>
				<button class='btn btn-danger' id='deleteCuePoint'>Remove</button>
			</div>`;

	$(ele).append(data);

	barLength = $(".timeline-bar").width();

	var Interval_1 = toDuration(Math.round(totalTime / 5));
	var Interval_2 = toDuration(Math.round((totalTime / 5) * 2));
	var Interval_3 = toDuration(Math.round((totalTime / 5) * 3));
	var Interval_4 = toDuration(Math.round((totalTime / 5) * 4));
	var Interval_5 = toDuration(Math.round((totalTime / 5) * 5));

	for (var i = 1; i <= 50; i++) {
		$(".steps-bar").append('<div class="step"><span class="step-border"></span></div>');
	}

	$(".step:nth-child(1)").append('<span class="time-instant">00:00</span>');
	$(".step:nth-child(10)").append('<span class="time-instant">' + Interval_1 + '</span>');
	$(".step:nth-child(20)").append('<span class="time-instant">' + Interval_2 + '</span>');
	$(".step:nth-child(30)").append('<span class="time-instant">' + Interval_3 + '</span>');
	$(".step:nth-child(40)").append('<span class="time-instant">' + Interval_4 + '</span>');
	$(".step:nth-child(50)").append('<span class="time-instant">' + Interval_5 + '</span>');

	if (cuePoints.length) {
		markCuePoints();
	}
};

function toDuration(sec_num) {
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	if (hours < 10) {
		hours = "0" + Math.round(hours);
	}
	if (minutes < 10) {
		minutes = "0" + Math.round(minutes);
	}
	if (seconds < 10) {
		seconds = "0" + Math.round(seconds);
	}
	var time = (hours == 00) ? minutes + ':' + seconds : hours + ':' + minutes + ':' + seconds;
	return time;
}

$(document).on('click', '.steps-bar', function (e) {
	console.log('inside step bar');
	var offset = $(this).offset();
	var offsetLeft = (e.pageX - offset.left);
	$('.pointer').removeClass("pointerSelected");
	$("#draggable").css({
		left: offsetLeft
	});
	var leftPos = offsetLeft;
	var leftPosCal = +(((leftPos * 100) / barLength + 2).toFixed(0));
	selectedTime = (totalTime * leftPosCal) / 100;
	console.log(selectedTime);
	$("#duration").text((selectedTime).toFixed(2) + ' Sec');
	// $("#duration").text(toDuration(selectedTime));
	$("#startAt:text").val(toDuration(Math.round(selectedTime)));
});

var markCuePoints = function () {
	barLength = $(".timeline-bar").width();
	$.each(cuePoints, function (i, cuePoint) {
		var eff = (cuePoint * 100) / totalTime;
		var animateLeft = (barLength * eff) / 100;
		var divId = cuePoint;
		$(".timeline-bar").append('<div class="pointer" style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
	});
}

$(document).on("click", '.pointer', function () {
	if ($(this).hasClass("pointerSelected")) {
		$('.pointer').removeClass("pointerSelected");
	} else {
		$('.pointer').removeClass("pointerSelected");
		$(this).addClass("pointerSelected");
		var time = $(this).attr("id");
		$("#startAt:text").val(time);
	}
});