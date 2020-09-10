var timeTable = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
];

for (var i = 0; i < timeTable.length; i++) {
  var timeScheduleRow = $(`<div class="row">
<div class="hour col-sm-2">${timeTable[i]}</div>
<div class="event col-sm-8"><textarea class="description"></textarea></div>
<div class="saveBtn col-sm-2">SAVE</div>
</div>`);
  $(".container").append(timeScheduleRow);
}

$(".saveBtn").on("click", function (e) {
  var row = $(e.target).parent();
  var rowText = row.find("textarea").val();
  var rowTime = row.find(".hour").text();
  var getSavedItem = localStorage.getItem("schedule");

  if (getSavedItem === null) {
    getSavedItem = "";
  }

  localStorage.setItem(
    "schedule",
    getSavedItem + ";" + rowTime + ":" + rowText
  );
});

var momentDate = moment();

init();

function init() {
  // var currentHour = momentDate.format("hhA");
  var getSavedItem = localStorage.getItem("schedule");
  var items = getSavedItem.split(";");

  if (items) {
    var hourList = $(".hour");
    for (var hour of hourList) {
      var row = $(hour).parent();
      var end = moment($(hour).text(), "hhA");

      if (momentDate.isBefore(end)) {
        row.find(".event").addClass("future");
      } else if (momentDate.isAfter(end)) {
        row.find(".event").addClass("past");
      } else {
        row.find(".event").addClass("present");
      }
    }

    for (var item of items) {
      for (var hour of hourList) {
        if ($(hour).text() === item.split(":")[0]) {
          var row = $(hour).parent();
          row.find("textarea").val(item.split(":")[1]);
        }
      }
    }
  }
}
