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
      let inFrame

      try {
        inFrame = window !== top
      } catch (e) {
        inFrame = true
      }

      if (!inFrame && !navigator.userAgent.includes('Firefox')) {
        const popup = open('about:blank', '_blank')
        if (!popup || popup.closed) createLog('Please allow popups and redirects. reload after allowing', 'red')
        else {
          const doc = popup.document
          const iframe = doc.createElement('iframe')
          const style = iframe.style
          const link = doc.createElement('link')

          const name = localStorage.getItem('name') || 'My Drive - Google Drive'
          const icon = localStorage.getItem('icon') || 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png'

          doc.title = name
          link.rel = 'icon'
          link.href = icon

          iframe.src = 'home.html'
          style.position = 'fixed'
          style.top = style.bottom = style.left = style.right = 0
          style.border = style.outline = 'none'
          style.width = style.height = '100%'

          doc.head.appendChild(link)
          doc.body.appendChild(iframe)
          location.replace(localStorage.getItem('panicLink') || 'https://www.nasa.gov/')
        }
      }
    }, 1000);
      
});
