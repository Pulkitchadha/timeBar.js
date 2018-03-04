
$.fn.timebar = function (options = {}) {

	options = Object.assign($.fn.timebar.defaults, options);

	return this.each(function () {
		init(this);
	});
};

$.fn.timebar.defaults = {
	totalTime: 550,
	cuePoints: [60, 120, 180, 240, 300, 360],
	barLength: 0,
	globalPageX: 0,
	selectedTime: 0
};

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
				<button class='btn btn-danger' id='duleteCuePoint'>Remove</button>
			</div>`;

	$(ele).append(data);

	barLength = $(".timeline-bar").width();

	const Interval_1 = toDuration(Math.round($.fn.timebar.defaults.totalTime / 5));
	const Interval_2 = toDuration(Math.round(($.fn.timebar.defaults.totalTime / 5) * 2));
	const Interval_3 = toDuration(Math.round(($.fn.timebar.defaults.totalTime / 5) * 3));
	const Interval_4 = toDuration(Math.round(($.fn.timebar.defaults.totalTime / 5) * 4));
	const Interval_5 = toDuration(Math.round(($.fn.timebar.defaults.totalTime / 5) * 5));

	for (let i = 1; i <= 50; i++) {
		$(".steps-bar").append('<div class="step"><span class="step-border"></span></div>');
	}

	$(".step:nth-child(1)").append('<span class="time-instant">00:00</span>');
	$(".step:nth-child(10)").append('<span class="time-instant">' + Interval_1 + '</span>');
	$(".step:nth-child(20)").append('<span class="time-instant">' + Interval_2 + '</span>');
	$(".step:nth-child(30)").append('<span class="time-instant">' + Interval_3 + '</span>');
	$(".step:nth-child(40)").append('<span class="time-instant">' + Interval_4 + '</span>');
	$(".step:nth-child(50)").append('<span class="time-instant">' + Interval_5 + '</span>');

	if ($.fn.timebar.defaults.cuePoints.length) {
		markCuePoints();
	}
};

function toDuration(sec_num) {
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	let seconds = sec_num - (hours * 3600) - (minutes * 60);
	if (hours < 10) {
		hours = "0" + Math.round(hours);
	}
	if (minutes < 10) {
		minutes = "0" + Math.round(minutes);
	}
	if (seconds < 10) {
		seconds = "0" + Math.round(seconds);
	}
	let time = (hours == 00) ? minutes + ':' + seconds : hours + ':' + minutes + ':' + seconds;
	return time;
}

$(document).on('click', '.steps-bar', function (e) {
	const defaults = $.fn.timebar.defaults;

	let offset = $(this).offset();
	let offsetLeft = (e.pageX - offset.left);
	$('.pointer').removeClass("pointerSelected");
	$("#draggable").css({
		left: offsetLeft
	});
	let leftPos = offsetLeft;
	let leftPosCal = +(((leftPos * 100) / barLength + 2).toFixed(0));
	selectedTime = (defaults.totalTime * leftPosCal) / 100;
	console.log(selectedTime);
	$("#duration").text((selectedTime).toFixed(2) + ' Sec');
	// $("#duration").text(toDuration(selectedTime));
	$("#startAt:text").val(toDuration(Math.round(selectedTime)));
});

function markCuePoints() {
	const defaults = $.fn.timebar.defaults;

	barLength = $(".timeline-bar").width();
	$.each(defaults.cuePoints, function (i, cuePoint) {
		let eff = (cuePoint * 100) / defaults.totalTime;
		let animateLeft = (barLength * eff) / 100;
		let divId = cuePoint;
		$(".timeline-bar").append('<div class="pointer" style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
	});
}

$(document).on("click", '.pointer', function () {
	if ($(this).hasClass("pointerSelected")) {
		$('.pointer').removeClass("pointerSelected");
	} else {
		$('.pointer').removeClass("pointerSelected");
		$(this).addClass("pointerSelected");
		let time = $(this).attr("id");
		$("#startAt:text").val(time);
	}
});

