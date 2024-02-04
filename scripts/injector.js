var doc = document.getElementById("iframe").contentWindow; 
  
var script=doc.document.createElement("script");
script.src=sessionStorage.getItem('lllk')
doc.document.body.appendChild(script);