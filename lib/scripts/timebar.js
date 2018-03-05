/**
 * Author: Pulkit Chadha
 * Plugin Name: Time Bar 
 * 
*/
(function ($) {
	$.fn.timebar = function (options = {}) {
		const self = this;
		options = Object.assign($.fn.timebar.defaults, options);

		$.fn.timebar.defaults.element = self;

		// methods
		this.getSelectedTime = getSelectedTime;
		this.setSelectedTime = setSelectedTime;
		this.getTotalTime = getTotalTime;
		this.setTotalTime = setTotalTime;

		// events
		$(this).on('myCustomEvent.myNS',);

		return self.each(function () {
			init();
		});
	};

	$.fn.timebar.defaults = {
		element: null,
		totalTime: 0,
		cuePoints: [],
		width: 0,
		globalPageX: 0,
		selectedTime: 0,
	};

	function init() {

		const options = $.fn.timebar.defaults;

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

		$(options.element).append(data);

		$.fn.timebar.defaults.width = $(".timeline-bar").width();

		const Interval_1 = toDuration(Math.round(options.totalTime / 5));
		const Interval_2 = toDuration(Math.round((options.totalTime / 5) * 2));
		const Interval_3 = toDuration(Math.round((options.totalTime / 5) * 3));
		const Interval_4 = toDuration(Math.round((options.totalTime / 5) * 4));
		const Interval_5 = toDuration(Math.round((options.totalTime / 5) * 5));

		for (let i = 1; i <= 50; i++) {
			$(".steps-bar").append('<div class="step"><span class="step-border"></span></div>');
		}

		$(".step:nth-child(1)").append('<span class="time-instant">00:00</span>');
		$(".step:nth-child(10)").append('<span class="time-instant">' + Interval_1 + '</span>');
		$(".step:nth-child(20)").append('<span class="time-instant">' + Interval_2 + '</span>');
		$(".step:nth-child(30)").append('<span class="time-instant">' + Interval_3 + '</span>');
		$(".step:nth-child(40)").append('<span class="time-instant">' + Interval_4 + '</span>');
		$(".step:nth-child(50)").append('<span class="time-instant">' + Interval_5 + '</span>');

		if (options.cuePoints.length) {
			markCuePoints();
		}
	};

	$(document).on('click', '.steps-bar', function (e) {
		const options = $.fn.timebar.defaults;

		let offset = $(this).offset();
		let offsetLeft = (e.pageX - offset.left);
		$('.pointer').removeClass("pointerSelected");
		$("#draggable").css({
			left: offsetLeft
		});
		let leftPos = offsetLeft;
		let leftPosCal = +(((leftPos * 100) / options.width + 2).toFixed(0));

		options.selectedTime = (options.totalTime * leftPosCal) / 100;

		// console.log(selectedTime);
		// $("#duration").text((options.selectedTime).toFixed(2) + ' Sec');
		// $("#startAt:text").val(toDuration(Math.round(selectedTime)));
	});

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

	$(document).on('click', '#addCuePoint', function () {
		var cuePoint = data.response.cuePoint
		var eff = ((cuePoint.startTime / 1000) * 100) / duration;
		var animateLeft = (barLength * eff) / 100;
		var divId = cuePoint.startTime;
		$(".timeline-bar").append('<div class="pointer" _id="' + cuePoint._id + '" videoId= "' + cuePoint.videoId + '" media-id="' + cuePoint.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
		cuePoints.push(cuePoint);
		// clearBox();
		// $("#startAt").val("");
	});

	$(document).on('click', '#UpdateCuePoint', function () {
		// var sourceContainer = $("#video-dropdown").val();
		// var removeId = $(".pointerSelected").attr("_id");
		var eff = ((temp.startTime / 1000) * 100) / duration;
		var animateLeft = (barLength * eff) / 100;
		// $("#startAt").val(toDuration(temp.startTime / 1000));
		var divId = temp.startTime;
		$(".timeline-bar").append('<div class="pointer" _id="' + temp.cuePointId + '" videoId= "' + temp.videoId + '" media-id="' + temp.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
		$(".pointerSelected").hide();
		$("#UpdateCuePoint").hide();
		$("#addCuePoint").show();
		// removeFromList(temp.cuePointId);
		// cuePoints.push(temp);
	});

	$(document).on('click', '#deleteCuePoint', function () {
		// var removeId = $(".pointerSelected").attr("_id");
		// var removeMediaId = $(".pointerSelected").attr("media-id");
		$(".pointerSelected").hide();
		// $("#startAt:text").val();
		// removeFromList(removeId);
		// clearBox();
	});

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

	function markCuePoints() {
		const options = $.fn.timebar.defaults;

		$.each(options.cuePoints, function (i, cuePoint) {
			let eff = (cuePoint * 100) / options.totalTime;
			let animateLeft = (options.width * eff) / 100;
			let divId = cuePoint;
			$(".timeline-bar").append('<div class="pointer" style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
		});
	}

	function deleteCuepoint(id) {
		for (var i = 0; i < cuePoints.length; i++) {
			if (cuePoints[i] == id) {
				cuePoints.splice(i, 1);
			}
		}
	}

	function addCuepoint(cuepoint) {
		$.fn.timebar.defaults.cuepoints.push(cuepoint)
	}

	function setSelectedTime(time) {
		$.fn.timebar.defaults.selectedTime = time;
	}

	function getSelectedTime() {
		return $.fn.timebar.defaults.selectedTime;
	}

	function setTotalTime(time) {
		$.fn.timebar.defaults.totalTime = time;
	}

	function getTotalTime() {
		return $.fn.timebar.defaults.totalTime;
	}

})(jQuery);