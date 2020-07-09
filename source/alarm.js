var music = new Audio("media/alarm.mp3");
var today = new Date();
var alarmTime=0, currentTime=0, update_Alarm_Clock=0;
var localStorage;

function updateAlarmValue(node) {
  if (node.value == "") {
    node.value = "";
  } else {
    node.value = Number(node.value);
  }
  if (node.id == "alarm-hour") {
    if (node.value > 12) {
      node.value = 12;
    }
  } else if (node.id == "alarm-min") {
    if (node.value > 59) {
      node.value = 59;
    }
  }
}

function updateAlarmClock(remainTime){
  remainHour = Math.floor(remainTime / 3600);
  remainMin = Math.floor((remainTime%3600)/60);
  remainSec = (remainTime%3600)%60;
  if(remainHour < 10){
    remainHour = "0"+remainHour;
  } 
  if(remainMin < 10){
    remainMin = "0"+remainMin;
  }
  if (remainSec < 10) {
    remainSec= "0" + remainSec;
  }
  remainMin = String(remainMin);
  remainHour = String(remainHour);
  remainSec = String(remainSec);
  $("#alarm-clock-hour").html(remainHour);
  $("#alarm-clock-min").html(remainMin);
  $("#alarm-clock-sec").html(remainSec);
}

function setAlarm(){
  if($("#alarm-hour").val() == "" || $("#alarm-min").val() == ""){
    alert("Input some Values please");
    return;
  }
  $("#setalarm").attr("disabled", "disabled");
  $("#unsetAlarm").removeAttr("disabled");
  $("#alarm-settings").css("display","none");
  $("#alarm-clock").css("display","block");
  currentTime = today.getHours()*3600+today.getMinutes()*60+today.getSeconds();
  if($("#alarm-time").val() == "am"){
    alarmTime = Number($("#alarm-hour").val())*60+Number($("#alarm-min").val());
  } else {
    alarmTime = (12+Number($("#alarm-hour").val()))*60+Number($("#alarm-min").val());
  }
  alarmTime = alarmTime*60;
  if(currentTime > alarmTime){
    remainTime = 24*3600 + alarmTime - currentTime;
  } else {
    remainTime = alarmTime - currentTime;
  }
  updateAlarmClock(remainTime);
  update_Alarm_Clock=setInterval(function(){ 
    remainTime = remainTime-1;
    updateAlarmClock(remainTime); 
    if (remainTime == 0) {
      music.play();
      clearInterval(update_Alarm_Clock);
    } 
  }, 1000);
}

function unsetAlarm(){
  $("#setalarm").removeAttr("disabled");
  $("#unsetAlarm").attr("disabled","disabled");
  $("#alarm-hour").val("");
  $("#alarm-min").val("");
  $("#alarm-time").val("am");
  $("#alarm-clock-hour").html("00");
  $("#alarm-clock-min").html("00");
  $("#alarm-clock-sec").html("00");
  $("#alarm-settings").css("display","block");
  $("#alarm-clock").css("display","none");
  music.pause();
  music.currentTime = 0;
  remainTime="";
  alarmTime="";
  clearInterval(update_Alarm_Clock);
}