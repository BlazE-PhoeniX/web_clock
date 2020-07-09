var localStorage;


function storeData(){
  localStorage.setItem("alarm_hour", $("#alarm-hour").val());
  localStorage.setItem("alarm_min", $("#alarm-min").val());
  localStorage.setItem("alarm_time",$("#alarm-time").val());
}

function retrieveData(){
  if(localStorage){
    console.log(localStorage.getItem("alarm_hour")+":"+localStorage.getItem("alarm_min"));
    if(localStorage.getItem("alarm_hour") != "" && localStorage.getItem("alarm_min") != ""){
      $("#alarm-hour").val(localStorage.getItem("alarm_hour"));
      $("#alarm-min").val(localStorage.getItem("alarm_min"));
      $("#alarm-time").val(localStorage.getItem("alarm_time"));
      setAlarm();
    }
  }
}