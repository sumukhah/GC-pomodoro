const secondDisplay = document.querySelector("#seconds");
const minuteDisplay = document.querySelector("#minutes");
const resetStateButton = document.querySelector("#reset-state");

resetStateButton.addEventListener("click", () => {
  chrome.windows.getCurrent(({ id }) => {
    chrome.storage.local.clear();
    chrome.windows.remove(id);
  });
});

const timer = ({ timer }) => {
  startTick(timer);
};

const startTick = (minutes = 25, seconds = 0) => {
  const tick = setInterval(() => {
    if (seconds === 0 && minutes > 0) {
      minutes = minutes - 1;
      chrome.browserAction.setBadgeText({ text: `${minutes}` });
      seconds = 60;
    } else if (minutes !== 0 || seconds !== 0) {
      // clearInterval(tick);
      // return;
      seconds--;
      displayTime(minutes, seconds);
    } else {
      clearInterval(tick);
      return;
    }
  }, 1000);
  // clearInterval(tick);
};

const formatToTime = (minutes, seconds) => {
  let strMin = minutes.toString();
  let strSec = seconds.toString();
  if (strMin.length < 2) strMin = "0" + strMin;
  if (strSec.length < 2) strSec = "0" + strSec;
  return [strMin, strSec];
};

const displayTime = (minutes, seconds) => {
  const [formattedMinutes, formattedSeconds] = formatToTime(minutes, seconds);
  secondDisplay.textContent = formattedSeconds;
  minuteDisplay.textContent = formattedMinutes;
};

chrome.storage.local.get(null, timer);