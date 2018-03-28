/**
 * Author: Pulkit Chadha
 * Plugin Name: Time Bar 
 * LICENSE : MIT
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
			if (!time && time !== 0) throw new Error('please pass the valid time');

			$.fn.timebar.defaults.selectedTime = parseInt(time);
			return this;
		};
		this.getTotalTime = function () {
			return $.fn.timebar.defaults.totalTimeInSecond;
		};
		this.setTotalTime = function (time) {
			if (!time) throw new Error('please pass the valid time');

			$.fn.timebar.defaults.totalTimeInSecond = parseInt(time);
			return this;
		};
		this.getWidth = function () {
			return $.fn.timebar.defaults.width;
		};
		this.setWidth = function (width) {
			if (!width) throw new Error('please pass the valid width');

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
		this.formatTime = function (sec_num) {
			return toDuration(sec_num);
		}
		this.addCuepoints = function (cuepoint) {
			if (!cuepoint) throw new Error('please pass the valid time');

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

			if (selectedCuepoints.length) {
				$.fn.timebar.defaults.cuepoints = cuepoints.filter((val) => !selectedCuepoints.includes(val));
				$(".pointerSelected").remove();
			} else {
				throw new Error('No Cuepoint is selected');
			}

			return this;
		}
		this.updateSelectedCuepoint = function (cuepoint) {
			const selectedCuepoints = [];

			$(".pointerSelected").each(function () {
				const id = $(this).attr("id");
				selectedCuepoints.push(parseInt(id));
			});

			if (selectedCuepoints.length > 1) throw new Error('Please select only one cuepoint to update');

			this.deleteSelectedCuepoints();

			this.addCuepoints(cuepoint);

			return this;
		}
		this.showHideCuepoints = function (show) {
			if (!show) throw new Error('please pass a valid value');

			parseBoolean(show) ? $(".pointer").show() : $(".pointer").hide();

			return this;
		}

		// events

		return self.each(function () {
			init(self);

			// When user clicks on timebar
			$(this).on('click', '.step', function (event) {
				self.setSelectedTime($(this).data("time"));

				if (typeof options.barClicked === 'function') {
					options.barClicked.call(this, self.getSelectedTime());
				}
			});

			// Move the step to the clicked positon
			$(this).on('click', '.steps-bar', function (event) {
				barClicked(this, event, self);
			});

			// when user clicks on cuepoints
			$(this).on("click", '.pointer', function () {
				const options = $.fn.timebar.defaults;

				$(this).hasClass("pointerSelected") ? $(this).removeClass("pointerSelected") : $(this).addClass("pointerSelected");

				self.setSelectedTime($(this).data("time"));

				if (typeof options.pointerClicked === 'function') {
					options.pointerClicked.call(this, self.getSelectedTime());
				}
			});
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
		showCuepoints: true,
		stepBars: 100,
		timeIntervals: 10,
		// events
		barClicked: null,
		pointerClicked: null,

		//Currently, Not supported

		// life cycle methods
		beforeCreate: null,
		created: null,
		beforeMount: null,
		mounted: null,
		beforeUpdate: null,
		updated: null,
		// hooks
		beforeAddCuepoint: null,
		afterAddCuepoint: null,
		beforeUpdateCuepoint: null,
		afterUpdateCuepoint: null,
		beforeDeleteCuepoint: null,
		afterDeleteCuepoint: null,
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

		$(options.element).append(data);

		ele.setWidth(options.width);

		let timeDivison = options.totalTimeInSecond / options.stepBars;
		let time = 0;

		// mark bars
		for (let i = 0; i <= options.stepBars; i++) {
			$(".steps-bar").append(`<div class="step" data-time=${time}><span class="step-border"></span></div>`);
			time = time + timeDivison;
		}

		let markTimeDivison = options.totalTimeInSecond / options.timeIntervals;

		// mark time intervals
		for (let i = 0; i <= options.timeIntervals; i++) {
			const time = toDuration(Math.round(markTimeDivison * i));
			const pos = i * 10 + 1;
			$(`.step:nth-child(${pos})`).append(`<span class="time-instant">${time}</span>`);
		}

		markCuepoints(options.cuepoints);

		if (!options.showCuepoints) {
			$(".pointer").hide();
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

	function markCuepoints(cuepoints = []) {
		const options = $.fn.timebar.defaults;
		const cuepointArr = Array.isArray(cuepoints) ? cuepoints : [cuepoints];

		$.each(cuepointArr, function (i, time) {
			const animateLeft = (time * 100) / options.totalTimeInSecond;
			$(".timeline-bar").append(`<div class="pointer" style="left:${animateLeft}%" data-time="${time}"></div>`);
		});
	}

	function barClicked(element, event, self) {

		const offset = $(element).offset();
		const offsetLeft = (event.pageX - offset.left);

		$('.pointer').removeClass("pointerSelected");

		$("#draggable").css({
			left: `${offsetLeft}px`
		});
	};

	function parseBoolean(val) {
		return (val.toLowerCase() === 'true');
	}

})(jQuery);