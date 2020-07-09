var music = new Audio("media/alarm.mp3");
var update_Timer_Clock = 0;
var remain_time, state="active";

function updateValue(node) {
  if(node.value==""){
    node.value="";
  } else {
    node.value = Number(node.value);
  }
  if (node.id == "timer-min") {
    if (node.value > 240) {
      node.value = 240;
    }
  } else if (node.id == "timer-sec") {
    if (node.value > 59) {
      node.value = 59;
    }
  }
}

function updateTimerClock() {
  remainHour = Math.floor(remain_time / 3600);
  remainMin = Math.floor((remain_time % 3600) / 60);
  remainSec = (remain_time % 3600) % 60;
  if (remainHour < 10) {
    remainHour = "0" + remainHour;
  }
  if (remainMin < 10) {
    remainMin = "0" + remainMin;
  }
  if (remainSec < 10) {
    remainSec = "0" + remainSec;
  }
  remainMin = String(remainMin);
  remainHour = String(remainHour);
  remainSec = String(remainSec);
  $("#timer-clock-hour").html(remainHour);
  $("#timer-clock-min").html(remainMin);
  $("#timer-clock-sec").html(remainSec);
}

function getRemainingTime(){
  if ( state == "active"){
    remain_time = Number($("#timer-min").val()) * 60 + Number($("#timer-sec").val());
  }
}

function setTimer(){
  if ($("#timer-min").val() == "" || $("#timer-sec").val() == "") {
    alert("Input some Values please");
    return;
  }
  $("#setTimer").attr("disabled", "disabled");
  $("#resetTimer").removeAttr("disabled");
  $("#pauseTimer").removeAttr("disabled");
  $("#timer-settings").css("display", "none");
  $("#timer-clock").css("display", "block");
  getRemainingTime();
  updateTimerClock();
  update_Timer_Clock = setInterval(function () {
    remain_time = remain_time - 1;
    updateTimerClock();
    if (remain_time == 0) {
      music.play();
      clearInterval(update_Timer_Clock);
    }
  }, 1000);
}


function pauseTimer () {
  state = "paused";
  $("#setTimer").removeAttr("disabled", "disabled");
  $("#pauseTimer").attr("disabled", "disabled");
  clearInterval(update_Timer_Clock);
}

function clearTimer() {
  state = "active";
  $("#timer-min").val("");
  $("#timer-sec").val("");
  $("#setTimer").removeAttr("disabled");
  $("#pauseTimer").attr("disabled", "disabled");
  $("#resetTimer").attr("disabled", "disabled");
  $("#timer-settings").css("display", "block");
  $("#timer-clock").css("display", "none");
  clearInterval(update_Timer_Clock);
  remain_time = 0;
  updateTimerClock();
  music.pause();
  music.currentTime=0;
}
