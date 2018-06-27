<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
	<meta name="description" content="" />
	<title>Time Bar</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link href="./src/css/timebar.min.css" rel="stylesheet" />
	<body>
		<h1>Time Bar</h3>
			<div id='timelineId'></div>
			<br>
			<br>
			<div>
				<input id="add-input" class="pull-left" type='text' placeholder="Enter time in seconds" />
				<input id="add-btn" class='btn btn-primary btn-sm' type='button' value="Add" />
				<input id="update-btn" class='btn btn-success btn-sm' type='button' value="Update" />
				<input id="rm-btn" class='btn btn-danger btn-sm' type='button' value="Delete" />
				<br>
				<br> Show
				<input class="radio-btn" type='radio' name="radio-btn" value="true" checked/> Hide
				<input class="radio-btn" type='radio' name="radio-btn" value="false" />
				<br>
				<br>
				<!-- <input id="reset-btn" class='btn btn-warning btn-sm' type='button' value="Reset" /> -->
				<input class='btn btn-info btn-sm' type='button' value='Refresh' onclick='window.location.reload();' />
				<br>
				<br> Duration:
				<label id='duration'>0 Sec</label>
			</div>

	</body>
	<style>
		body {
			text-align: center;
		}

		#timelineId {
			margin-left: 10%;
			margin-top: 4%;
		}
	</style>
	<script src="./src/js/timebar.min.js"></script>
	<script>
		$(document).ready(function () {

			const timebar = $("#timelineId").timebar({
				totalTimeInSecond: 550,
				cuepoints: [0, 110, 220, 330, 440, 550],
				width: '1000px',
				multiSelect: true,
				barClicked(time) {
					const selectedTime = timebar.formatTime(time);
					$("#duration").text(selectedTime);
				},
				pointerClicked(time) {
					const selectedTime = timebar.formatTime(time);
					$("#duration").text(selectedTime);
					$('#add-input').val(time);
				}
			});

			$(document).on('click', '#add-btn', function () {
				const time = $('#add-input').val();
				timebar.addCuepoints(time);
			});

			$(document).on('click', '#update-btn', function () {
				const time = $('#add-input').val();
				timebar.updateSelectedCuepoint(time);
			});

			$(document).on('click', '#rm-btn', function () {
				timebar.deleteSelectedCuepoints();
			});

			$(document).on('click', '#reset-btn', function () {
				$('#add-input').val('');
			});

			$(document).on('change', '.radio-btn', function () {
				const val = $('input[name=radio-btn]:checked').val();
				timebar.showHideCuepoints(val);
			});
		});
	</script>
</head>

</html>