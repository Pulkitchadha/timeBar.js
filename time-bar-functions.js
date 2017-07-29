function setSelectedTime(time) {
	selectedTime = time;
}

function getSelectedTime() {
	return selectedTime.toFixed(2);
}

function setTotalTime(time) {
	totalTime = time;
}

function getTotalTime() {
	return totalTime;
}

function deleteCuepoint(id) {
	for (var i = 0; i < cuePoints.length; i++) {
		if (cuePoints[i] == id) {
			cuePoints.splice(i, 1);
		}
	}
}

function addCuepoint(cuepoint) {
	cuepoints.push(cuepoint)
}

//
//$('#addCuePoint').on("click", function () {
//	$('.spinner').css('display', 'none');
//	var cuePoint = data.response.cuePoint
//	var eff = ((cuePoint.startTime / 1000) * 100) / duration;
//	var animateLeft = (barLength * eff) / 100;
//	var divId = cuePoint.startTime;
//	$(".timeline-bar").append('<div class="pointer" _id="' + cuePoint._id + '" videoId= "' + cuePoint.videoId + '" media-id="' + cuePoint.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
//	cuePoints.push(cuePoint);
//	clearBox();
//	$("#startAt").val("");
//});
//
//$('#UpdateCuePoint').on("click", function () {
//	$('.spinner').css('display', 'block');
//	var sourceContainer = $("#video-dropdown").val();
//	var removeId = $(".pointerSelected").attr("_id");
//	var eff = ((temp.startTime / 1000) * 100) / duration;
//	var animateLeft = (barLength * eff) / 100;
//	$("#startAt").val(toDuration(temp.startTime / 1000));
//	var divId = temp.startTime;
//	$(".timeline-bar").append('<div class="pointer" _id="' + temp.cuePointId + '" videoId= "' + temp.videoId + '" media-id="' + temp.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
//	$("#messageAfterUpdate").text("Cue-Point updated Successfully");
//	$("#messageAfterUpdate").css("color", "green");
//	$(".pointerSelected").hide();
//	$("#UpdateCuePoint").hide();
//	$("#addCuePoint").show();
//	$(".cuepoint-link").css("background-color", cuePoint.linkBackgroundColor);
//	$(".cuepoint-link").css("color", cuePoint.linkFontColor);
//	removeFromList(temp.cuePointId);
//	cuePoints.push(temp);
//	clearBox();
//});
//
//
//
//$("#deleteCuePoint").click(function () {
//	$('.spinner').css('display', 'block');
//	var removeId = $(".pointerSelected").attr("_id");
//	var removeMediaId = $(".pointerSelected").attr("media-id");
//	$(".pointerSelected").hide();
//	$("#startAt:text").val();
//	$("#ltext").val();
//	$("#video-dropdown").val();
//	$('.spinner').css('display', 'none');
//	console.log(data)
//	removeFromList(removeId);
//	clearBox();
//
//});