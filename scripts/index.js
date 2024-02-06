document.addEventListener("DOMContentLoaded", function () {
    function createLog(txt, clr) {
        var newLog = document.createElement("h6");
        newLog.innerHTML = txt;
        newLog.style.color = clr
        document.body.appendChild(newLog)
    };
    createLog('Startup Initized', 'white');
    //check url protocol (for those dumbasses who run from html or dev)
    var runSW = "true";
    if (!location.href.includes("https://")) {
      createLog("Services Workers can't be registered with this protocol", 'red');
      runSW = "false";
    }

    var SW_Status
    // check for register sw
    if (runSW !== "false") {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(function(registration) {
          if (registration) {
            createLog("SW found. Running...")
            SW_Status = "on"
          } else {
            createLog("no SW found. loading with built-in")
            SW_Status = "non"
          }
        }).catch(function(error) {
          createLog("no SW found. loading with built-in", 'yellow')
          SW_Status = "non"
        });
      } else {
        alert('Service workers are not supported in this browser.');
        return
      }
    }
    sessionStorage.setItem("swRun", runSW)
    // start page
    setTimeout(() => {
      location.href = "./home.html"
    }, 1000);

});
