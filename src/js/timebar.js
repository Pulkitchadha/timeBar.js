/**
 * Author: Pulkit Chadha
 * Plugin Name: Time Bar 
 * 
 */
(function ($) {
	$.fn.timebar = function (options = {}) {
		const self = this;

		options = $.extend($.fn.timebar.defaults, options);

		$.fn.timebar.defaults.element = self;

		// methods
		this.getSelectedTime = function () {
			return $.fn.timebar.defaults.selectedTime;
		};
		this.setSelectedTime = function (time) {
			$.fn.timebar.defaults.selectedTime = parseInt(time);
			return this;
		};
		this.getTotalTime = function () {
			return $.fn.timebar.defaults.totalTimeInSecond;
		};
		this.setTotalTime = function (time) {
			$.fn.timebar.defaults.totalTimeInSecond = parseInt(time);
			return this;
		};
		this.getWidth = function () {
			return $.fn.timebar.defaults.width;
		};
		this.setWidth = function (width) {
			$.fn.timebar.defaults.width = width;
			width = this.getActualWidth() + 57;
			$(".timeline-cover").css('width', width + 'px');
			return this;
		};
		this.getActualWidth = function () {
			let width = $.fn.timebar.defaults.width;
			width = parseInt(width.replace(/px|%/g, ''));
			return width;
		}
		this.getCuepoints = function () {
			return $.fn.timebar.defaults.cuePoints;
		}
		this.addCuepoints = function (cuepoint) {
			$.fn.timebar.defaults.cuepoints.push(cuepoint);
			return this;
		}
		this.deleteCuepoints = function (id) {
			const cuepoints = $.fn.timebar.defaults.cuepoints;
			for (let i = 0; i < cuePoints.length; i++) {
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

		return self.each(function () {
			init(self);

			$(this).on('click', '.steps-bar', function (event) {
				const time = barClicked(this, event, self);

				self.setSelectedTime(time);

				if (typeof options.barClicked === 'function') {
					options.barClicked.call(this, self.getSelectedTime());
				}
			});

			$(this).on("click", '.pointer', function () {
				const options = $.fn.timebar.defaults;

				const time = pointerClicked(this, options);

				self.setSelectedTime(time);

				if (typeof options.pointerClicked === 'function') {
					options.pointerClicked.call(this, self.getSelectedTime());
				}
			});

			// $(this).on("dblclick", '.pointer', function () {
			// 	const options = $.fn.timebar.defaults;

			// 	$(this).removeClass("pointerSelected");

			// 	// if (typeof options.pointerClicked === 'function') {
			// 	// 	options.pointerClicked.call(this, self.getSelectedTime());
			// 	// }
			// });

			$(this).on('click', '#deleteCuePoint', function () {
				removeCuepoint();
			});

			$(this).on('click', '#addCuePoint', function () {
				addCuePoint();
			});

			$(this).on('click', '#UpdateCuePoint', function () {
				updateCuePoint();
			});
		});
	};

	$.fn.timebar.defaults = {
		//properties
		element: null,
		totalTimeInSecond: 0,
		cuePoints: [],
		width: 0,
		globalPageX: 0,
		selectedTime: 0,
		multiSelect: false,
		// events
		barClicked: null,
		pointerClicked: null
	};

	function init(ele) {

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
		data += `<div class="cuepoint-btn">
					<button class='btn btn-primary' id='addCuePoint'>Add</button>
					<button class='btn btn-primary' id='UpdateCuePoint'>Update</button>
					<button class='btn btn-danger' id='deleteCuePoint'>Remove</button>
				</div>`;

		$(options.element).append(data);

		const barWidth = $.fn.timebar.defaults.width;

		ele.setWidth(barWidth);

		const intervals = [{
			position: 1,
			time: '00:00'
		}, {
			position: 10,
			time: toDuration(Math.round(options.totalTimeInSecond / 5))
		}, {
			position: 20,
			time: toDuration(Math.round((options.totalTimeInSecond / 5) * 2))
		}, {
			position: 30,
			time: toDuration(Math.round((options.totalTimeInSecond / 5) * 3))
		}, {
			position: 40,
			time: toDuration(Math.round((options.totalTimeInSecond / 5) * 4))
		}, {
			position: 50,
			time: toDuration(Math.round((options.totalTimeInSecond / 5) * 5))
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
			markCuePoints(ele);
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
		const time = (hours == 00) ? minutes + ':' + seconds : hours + ':' + minutes + ':' + seconds;
		return time;
	}

	function markCuePoints(ele) {
		const options = $.fn.timebar.defaults;

		$.each(options.cuePoints, function (i, cuePoint) {
			const eff = (cuePoint * 100) / options.totalTimeInSecond;
			const animateLeft = ((ele.getActualWidth() * eff) / 100).toFixed(2);
			const divId = cuePoint;
			$(".timeline-bar").append(`<div class="pointer" style="left:${animateLeft}px" id="${divId}"></div>`);
		});
	}

	function barClicked(element, event, self) {
		const options = $.fn.timebar.defaults;

		const offset = $(element).offset();
		const offsetLeft = (event.pageX - offset.left);

		const leftPos = offsetLeft;
		const leftPosCal = (((leftPos * 100) / self.getActualWidth()).toFixed(0));

		const selectedTime = (options.totalTimeInSecond * leftPosCal) / 100;

		$('.pointer').removeClass("pointerSelected");

		$("#draggable").css({
			left: offsetLeft
		});

		return selectedTime;
	};

	function pointerClicked(element, options) {
		if ($(element).hasClass("pointerSelected")) {
			$(element).removeClass("pointerSelected");
		} else {
			$(element).addClass("pointerSelected");
		}
		const selectedTime = $(element).attr("id");
		return selectedTime;
	};

	function addCuePoint(time) {
		var cuePoint = data.response.cuePoint
		var eff = ((cuePoint.startTime / 1000) * 100) / duration;
		var animateLeft = (barLength * eff) / 100;
		var divId = cuePoint.startTime;
		$(".timeline-bar").append('<div class="pointer" _id="' + cuePoint._id + '" videoId= "' + cuePoint.videoId + '" media-id="' + cuePoint.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
		cuePoints.push(cuePoint);
	};

	function updateCuepoint() {
		// var sourceContainer = $("#video-dropdown").val();
		// var removeId = $(".pointerSelected").attr("_id");
		const eff = ((temp.startTime / 1000) * 100) / duration;
		const animateLeft = ($.fn.timebar.getActualWidth() * eff) / 100;
		const divId = temp.startTime;
		$(".timeline-bar").append('<div class="pointer" _id="' + temp.cuePointId + '" videoId= "' + temp.videoId + '" media-id="' + temp.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
		$(".pointerSelected").hide();
		$("#UpdateCuePoint").hide();
		$("#addCuePoint").show();
		// removeFromList(temp.cuePointId);
		// cuePoints.push(temp);
	};

	function removeCuepoint() {
		// var removeId = $(".pointerSelected").attr("_id");
		// var removeMediaId = $(".pointerSelected").attr("media-id");
		$(".pointerSelected").hide();
		// removeFromList(removeId);
	};

})(jQuery);