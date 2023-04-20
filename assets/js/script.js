var displayCurrentDay = document.querySelector("#currentDay");
var today = dayjs();
displayCurrentDay.textContent = today.format("dddd, MMMM D, YYYY");

// Creating time blocks by combininig existing classes together
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// takes the current hour and returns it as a string
var currentHour = parseInt(moment().format("H"));

// function that sets scheduled events into local storage so they persist even after the page is reloaded 
var scheduleEvents = function (availableTImes) {
  availableTImes.forEach((element) => {
    console.log(element);
    let text = localStorage.getItem(parseInt(element.time));
    console.log(text);
    if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var temp = [];
  // array iterator method that sets text content to corresponding time slots
  $("textarea").each(function (index, elem) {
    temp.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  scheduleEvents(temp);
};

// logic that dynamically changes the class of time blocks depending on the current time
$("textarea").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < currentHour) {
    $(this).addClass("past");
  }
  if (id > currentHour) {
    $(this).addClass("future");
  }
  if (id === currentHour) {
    $(this).addClass("present");
  }
});

// once the save button is clicked the current value inside is assgined to events
$("button.saveBtn").click(function (event, scheduleEvents) {
  event.preventDefault();
  var $element = $(this).siblings("textarea");

  // gets the current time through its id
  var time = $element.attr("id");
  console.log(time);
  var text = $element.val().trim();
  console.log(text);

  // saves events to local storage
  if (time && text !== "") {
    console.log(time, text);
    localStorage.setItem(time, text);
  }
});
// adds the the saveBtn:hover class to the saveBtn class
$(".saveBtn").hover(function () {
  $(this).addClass("saveBtn:hover");
});

fetchEvents();