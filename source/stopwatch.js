var time = 0;
var update_watch_clock;

function startwatch() {
  $("#startwatch").attr("disabled", "disabled");
  $("#pausewatch").removeAttr("disabled");
  $("#resetwatch").removeAttr("disabled");
  updateWatchClock();
  update_watch_clock = setInterval(function () {
    time = time + 10;
    updateWatchClock();
  }, 10);
}

function updateWatchClock() {
  watchHour = Math.floor(time / 3600000);
  watchMin = Math.floor((time % 3600000) / 60000);
  watchSec = Math.floor(((time % 3600000) % 60000) / 1000);
  watchMs = Math.floor((((time % 3600000) % 60000) % 1000) / 10);
  if (watchHour < 10) {
    watchHour = "0" + watchHour;
  }
  if (watchMin < 10) {
    watchMin = "0" + watchMin;
  }
  if (watchSec < 10) {
    watchSec = "0" + watchSec;
  }
  if (watchMs < 10) {
    watchMs = "0" + watchMs;
  }
  watchMin = String(watchMin);
  watchHour = String(watchHour);
  watchSec = String(watchSec);
  watchMs = String(watchMs);
  $("#stop-watch-clock-hour").html(watchHour);
  $("#stop-watch-clock-min").html(watchMin);
  $("#stop-watch-clock-sec").html(watchSec);
  $("#stop-watch-clock-millisec").html(watchMs);
}

function pausewatch() {
  $("#startwatch").removeAttr("disabled", "disabled");
  $("#pausewatch").attr("disabled", "disabled");
  clearInterval(update_watch_clock);
}

function clearwatch() {
  $("#startwatch").removeAttr("disabled");
  $("#pausewatch").attr("disabled", "disabled");
  $("#resetwatch").attr("disabled", "disabled");
  clearInterval(update_watch_clock);
  time = 0;
  updateWatchClock();
}
