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
		this.getSelectedTime = function () {
			return $.fn.timebar.defaults.selectedTime;
		};
		this.setSelectedTime = function (time) {
			$.fn.timebar.defaults.selectedTime = time;
		};
		this.getTotalTime = function () {
			return $.fn.timebar.defaults.totalTime;
		};
		this.setTotalTime = function (time) {
			$.fn.timebar.defaults.totalTime = time;
		};
		this.getWidth = function () {
			return $.fn.timebar.defaults.width;
		};
		this.setWith = function (width) {
			$.fn.timebar.defaults.width = width;
		};
		this.getCuepoints = function () {
			return $.fn.timebar.defaults.cuePoints;
		}
		this.addCuepoints = function (cuepoint) {
			$.fn.timebar.defaults.cuepoints.push(cuepoint)
		}
		this.deleteCuepoints = function (id) {
			const cuepoints = $.fn.timebar.defaults.cuepoints;
			for (var i = 0; i < cuePoints.length; i++) {
				if (cuePoints[i] == id) {
					cuePoints.splice(i, 1);
				}
			}
		}
		this.showCuepoints = function () {
			$(".pointer").show();
		}
		this.hideCuepoints = function () {
			$(".pointer").hide();
		}

		// events
		// $(this).on('myCustomEvent.myNS', );

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

		const intervals = [{
			position: 1,
			time: '00:00'
		}, {
			position: 10,
			time: toDuration(Math.round(options.totalTime / 5))
		}, {
			position: 20,
			time: toDuration(Math.round((options.totalTime / 5) * 2))
		}, {
			position: 30,
			time: toDuration(Math.round((options.totalTime / 5) * 3))
		}, {
			position: 40,
			time: toDuration(Math.round((options.totalTime / 5) * 4))
		}, {
			position: 50,
			time: toDuration(Math.round((options.totalTime / 5) * 5))
		}];

		// mark bars
		for (let i = 1; i <= 50; i++) {
			$(".steps-bar").append('<div class="step"><span class="step-border"></span></div>');
		}

		// mark time intervals
		intervals.forEach((interval) => {
			$(`.step:nth-child(${interval.position})`).append(`<span class="time-instant">${interval.time}</span>`);
		});

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

		$("#duration").text((options.selectedTime).toFixed(2) + ' Sec');
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

})(jQuery);