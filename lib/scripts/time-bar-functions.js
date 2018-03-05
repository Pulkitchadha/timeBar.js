// function deleteCuepoint(id) {
// 	for (var i = 0; i < cuePoints.length; i++) {
// 		if (cuePoints[i] == id) {
// 			cuePoints.splice(i, 1);
// 		}
// 	}
// }

// function addCuepoint(cuepoint) {
// 	$.fn.timebar.defaults.cuepoints.push(cuepoint)
// }

// $(document).on('click', '#addCuePoint', function () {
// 	var cuePoint = data.response.cuePoint
// 	var eff = ((cuePoint.startTime / 1000) * 100) / duration;
// 	var animateLeft = (barLength * eff) / 100;
// 	var divId = cuePoint.startTime;
// 	$(".timeline-bar").append('<div class="pointer" _id="' + cuePoint._id + '" videoId= "' + cuePoint.videoId + '" media-id="' + cuePoint.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
// 	cuePoints.push(cuePoint);
// 	// clearBox();
// 	// $("#startAt").val("");
// });

// $(document).on('click', '#UpdateCuePoint', function () {
// 	// var sourceContainer = $("#video-dropdown").val();
// 	// var removeId = $(".pointerSelected").attr("_id");
// 	var eff = ((temp.startTime / 1000) * 100) / duration;
// 	var animateLeft = (barLength * eff) / 100;
// 	// $("#startAt").val(toDuration(temp.startTime / 1000));
// 	var divId = temp.startTime;
// 	$(".timeline-bar").append('<div class="pointer" _id="' + temp.cuePointId + '" videoId= "' + temp.videoId + '" media-id="' + temp.mediaEntryId + '"  style="left:' + (animateLeft) + 'px" id="' + divId + '"></div>');
// 	$(".pointerSelected").hide();
// 	$("#UpdateCuePoint").hide();
// 	$("#addCuePoint").show();
// 	// removeFromList(temp.cuePointId);
// 	// cuePoints.push(temp);
// });

// $(document).on('click', '#deleteCuePoint', function () {
// 	// var removeId = $(".pointerSelected").attr("_id");
// 	// var removeMediaId = $(".pointerSelected").attr("media-id");
// 	$(".pointerSelected").hide();
// 	// $("#startAt:text").val();
// 	// removeFromList(removeId);
// 	// clearBox();
// });