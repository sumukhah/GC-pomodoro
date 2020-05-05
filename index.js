//selectors
const timerInput = document.querySelector("#timer-input");
const goalInput = document.querySelector("#goal-input");
const submitButton = document.querySelector("#submit-button");

const storeInChrome = (key, value) => {
  chrome.storage.local.set({
    [key]: value,
  });
};

const onSubmitHandler = () => {
  _addEventListener();
  chrome.windows.create({
    type: "popup",
    width: 500,
    height: 180,
    focused: true,
    url: "timer.html",
  });
};

const _addEventListeners = () => {
  timerInput.addEventListener("change", (e) => {
    storeInChrome("timer", e.target.value);
  });
  goalInput.addEventListener("change", (e) =>
    storeInChrome("goal", e.target.value)
  );
  submitButton.addEventListener("click", onSubmitHandler);
};
_addEventListeners();

const _addEventListener = () => {
  timerInput.removeEventListener("change", (e) => {
    storeInChrome("timer", e.target.value);
  });
  goalInput.removeEventListener("change", (e) =>
    storeInChrome("goal", e.target.value)
  );
  submitButton.removeEventListener("click", onSubmitHandler);
};

const stopWatch = () => {
  setInterval(() => {}, 1000);
};
chrome.browserAction.setBadgeText({ text: "25" });