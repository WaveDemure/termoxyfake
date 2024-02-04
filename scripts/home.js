document.getElementById("exec").onclick = async (event) => {
    if (sessionStorage.getItem('swRun') === "true") {
        event.preventDefault();

        try {
          await registerSW();
        } catch (err) {
          alert("Failed to register service worker.")
          alert(err.toString())
          throw err;
        }
        const url = search(address.value, searchEngine.value); 
        var editorContent = document.getElementById("editor").value;
        var newEditorContent = `try {${editorContent}} catch (error) {alert(error)}`
        console.log(newEditorContent)
        var blob = new Blob([newEditorContent], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        console.log(link.href);
        sessionStorage.setItem("lllk", link.href)
        document.body.removeChild(link);
        var ifm = document.createElement('iframe')
        ifm.src = __uv$config.prefix + __uv$config.encodeUrl(url)
        ifm.id = "iframe";ifm.classList.add('iframe');ifm.onload = function () {var script=document.createElement("script");script.src="./scripts/injector.js";document.body.appendChild(script);}
        document.body.appendChild(ifm);
    }
}

/* 

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    alert("Failed to register service worker.")
    alert(err.toString())
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  document.querySelector("span").innerHTML = __uv$config.prefix + __uv$config.encodeUrl(url)
});



*/