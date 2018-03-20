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
			return $.fn.timebar.defaults.cuepoints;
		}
		this.addCuepoints = function (cuepoint) {
			cuepoint = parseInt(cuepoint);

			if (!$.fn.timebar.defaults.cuepoints.includes(cuepoint)) {
				$.fn.timebar.defaults.cuepoints.push(cuepoint);
				markCuepoints(cuepoint);
			} else {
				throw new Error('Cuepoint already exists');
			}

			return this;
		}
		this.deleteSelectedCuepoints = function () {
			const cuepoints = $.fn.timebar.defaults.cuepoints;
			const selectedCuepoints = [];

			$(".pointerSelected").each(function () {
				const id = $(this).attr("id");
				selectedCuepoints.push(parseInt(id));
			});

			$.fn.timebar.defaults.cuepoints = cuepoints.filter((val) => !selectedCuepoints.includes(val));

			$(".pointerSelected").hide();
			return this;
		}
		this.updateSelectedCuepoint = function (cuepoint) {
			this.deleteSelectedCuepoints();

			this.addCuepoints(cuepoint);

			return this;
		}
		this.showCuepoints = function () {
			$(".pointer").show();
			return this;
		}
		this.hideCuepoints = function () {
			$(".pointer").hide();
			return this;
		}

		// events

		return self.each(function () {
			init(self);

			// When user clicks on timebar
			$(this).on('click', '.steps-bar', function (event) {
				const time = barClicked(this, event, self);

				self.setSelectedTime(time);

				if (typeof options.barClicked === 'function') {
					options.barClicked.call(this, self.getSelectedTime());
				}
			});

			// when user clicks on cuepoints
			$(this).on("click", '.pointer', function () {
				const options = $.fn.timebar.defaults;

				$(this).hasClass("pointerSelected") ? $(this).removeClass("pointerSelected") : $(this).addClass("pointerSelected");
				
				self.setSelectedTime($(this).attr("id"));

				if (typeof options.pointerClicked === 'function') {
					options.pointerClicked.call(this, self.getSelectedTime());
				}
			});

			// when user double click on cuepoints
			$(this).on("dblclick", '.pointer', function () {});

			//when user clicks on add button
			$(this).on('click', '#addCuePoint', function () {});

			//when user clicks on delete button
			$(this).on('click', '#deleteCuePoint', function () {});

			//when user clicks on update button
			$(this).on('click', '#UpdateCuePoint', function () {});
		});
	};

	$.fn.timebar.defaults = {
		//properties
		element: null,
		totalTimeInSecond: 0,
		cuepoints: [],
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
					<button class='btn btn-primary' id='addCuePoint' style="display:none">Add</button>
					<button class='btn btn-primary' id='UpdateCuePoint' style="display:none">Update</button>
					<button class='btn btn-danger btn-sm' id='deleteCuePoint' style="display:none">Remove</button>
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

		markCuepoints(options.cuepoints);
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

	function markCuepoints(cuepoints = []) {
		const options = $.fn.timebar.defaults;
		let cuepointArr = Array.isArray(cuepoints) ? cuepoints : [cuepoints];

		$.each(cuepointArr, function (i, time) {
			const eff = (time * 100) / options.totalTimeInSecond;
			const animateLeft = eff; //((ele.getActualWidth() * eff) / 100).toFixed(2);
			$(".timeline-bar").append(`<div class="pointer" style="left:${animateLeft}%" id="${time}"></div>`);
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

	// function pointerClicked(element, options) {
	// 	if ($(element).hasClass("pointerSelected")) {
	// 		$(element).removeClass("pointerSelected");
	// 	} else {
	// 		$(element).addClass("pointerSelected");
	// 	}
	// 	const selectedTime = $(element).attr("id");
	// 	return selectedTime;
	// };

})(jQuery);