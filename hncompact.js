javascript: (function(){
  if (document.getElementById("hnc"))
    return;
  let s = document.createElement("style");
  s.id = "hnc";
  s.appendChild(document.createTextNode("body{font-family:Verdana,Geneva,sans-serif;font-size:10pt;color:#828282}td{font-family:Verdana,Geneva,sans-serif;font-size:10pt;color:#828282}.admin td{font-family:Verdana,Geneva,sans-serif;font-size:8.5pt;color:#000}.subtext td{font-family:Verdana,Geneva,sans-serif;font-size:7pt;color:#828282}input{font-family:monospace;font-size:10pt}input[type=submit]{font-family:Verdana,Geneva,sans-serif}textarea{font-family:monospace;font-size:10pt}a:link{color:#000;text-decoration:none}a:visited{color:#828282;text-decoration:none}.default{font-family:Verdana,Geneva,sans-serif;font-size:10pt;color:#828282}.admin{font-family:Verdana,Geneva,sans-serif;font-size:8.5pt;color:#000}.title{font-family:Verdana,Geneva,sans-serif;font-size:10pt;color:#828282}.subtext{font-family:Verdana,Geneva,sans-serif;font-size:7pt;color:#828282}.yclinks{font-family:Verdana,Geneva,sans-serif;font-size:8pt;color:#828282}.pagetop{font-family:Verdana,Geneva,sans-serif;font-size:10pt;color:#222}.comhead{font-family:Verdana,Geneva,sans-serif;font-size:8pt;color:#828282}.comment{font-family:Verdana,Geneva,sans-serif;font-size:9pt}.hnname{margin-right:5px}.comment a:link,.comment a:visited{text-decoration:underline}.noshow{display:none}.nosee{visibility:hidden;pointer-events:none;cursor:default}.c00,.c00 a:link{color:#000}.c5a,.c5a a:link,.c5a a:visited{color:#5a5a5a}.c73,.c73 a:link,.c73 a:visited{color:#737373}.c82,.c82 a:link,.c82 a:visited{color:#828282}.c88,.c88 a:link,.c88 a:visited{color:#888}.c9c,.c9c a:link,.c9c a:visited{color:#9c9c9c}.cae,.cae a:link,.cae a:visited{color:#aeaeae}.cbe,.cbe a:link,.cbe a:visited{color:#bebebe}.cce,.cce a:link,.cce a:visited{color:#cecece}.cdd,.cdd a:link,.cdd a:visited{color:#ddd}.pagetop a:visited{color:#000}.topsel a:link,.topsel a:visited{color:#fff}.subtext a:link,.subtext a:visited{color:#828282}.subtext a:hover{text-decoration:underline}.comhead a:link,.subtext a:visited{color:#828282}.comhead a:hover{text-decoration:underline}.hnmore a:link,a:visited{color:#828282}.hnmore{text-decoration:underline}.default p{margin-top:8px;margin-bottom:0}.pagebreak{page-break-before:always}pre{overflow:auto;padding:2px;white-space:pre-wrap;word-wrap:break-word}pre:hover{overflow:auto}.comment{max-width:1215px;overflow:hidden}     body{background:#F6F6F0} p {margin:8px 0;} pre {overflow: auto; } a{word-wrap:break-word;max-width:unset; white-space:unset; text-overflow:unset;} .reply { display:none; } .noshow { display:unset; } .commleft {margin-left: 5px; margin-top: 5px; margin-bottom: 5px; padding-left: 20px; position: relative; min-height: 40px; } .commleft.collapse {font-style: italic; animation: pulse 0.3s ease;} @keyframes pulse {0% {background-color:#ccc;} 100%{background-color:transparent;}} .commleft.collapse > .comment, .commleft.collapse > .commleft {display: none; } .col {font-size: 8pt;cursor: pointer; position: absolute; top: 0; bottom: 0; left: 0; width: 15px; background: #dcdcdc; transition: 0.15s background; } .col:hover {transition: 0.15s background; background: #FF6602; }")); document.body.appendChild(s);

  document.body.removeChild(document.body.getElementsByTagName("script")[0]);
  let c = document.getElementsByClassName("fatitem")[0];
  if (c.firstElementChild.childElementCount > 2)
    c.firstElementChild.removeChild(c.firstElementChild.lastElementChild);  /* comment box */

  let newcom = document.createElement("div");
  var lastComm = newcom;
  var lastdepth = 0;
  let fixedwidth = 40;

  let commcontainer = document.createElement("div");
  commcontainer.appendChild(c);  /* title header */
  commcontainer.appendChild(newcom); /* comment threads */

  let colclick = function(evt) {
    let e = evt.srcElement;
    let h = e.closest(".commleft");
    h.classList.toggle("collapse");
    if (h.classList.contains("collapse"))
      e.scrollIntoView({behavior:"instant", block:"nearest"});
  };

  let oldbody = document.body.getElementsByTagName("center")[0];
  for(var t of oldbody.getElementsByClassName("athing comtr")) {
    let thiscom = document.createElement("div");
    thiscom.className = "commleft";
    let collapse = document.createElement("a");
    collapse.setAttribute('class', "col");
    collapse.onclick = colclick;
    thiscom.appendChild(collapse);

    for (let c of t.getElementsByClassName("default")[0].children) {
      c.style="";
      thiscom.appendChild(c);
      if (c.classList.contains("noshow"))
        thiscom.classList.add("collapse")
    }
    let e = thiscom.getElementsByClassName("togg")[0];
    collapse.innerText = e.getAttribute("n");
    e.parentElement.removeChild(e);

    let currdepth = Number(t.getElementsByTagName("img")[0].getAttribute("width"));
    if (lastdepth < currdepth) {
      lastComm.appendChild(thiscom);
    } else {
      /*console.log(lastComm, lastdepth, currdepth, lastdepth/fixedwidth, currdepth/fixedwidth, (lastdepth/fixedwidth)-(currdepth/fixedwidth));*/
      for (var i = 0; i < (lastdepth/fixedwidth)-(currdepth/fixedwidth); i++) {
        lastComm = lastComm.parentNode;
        /*console.log("up", lastComm);*/
      }
      lastComm.parentNode.appendChild(thiscom);

    }
    lastdepth = currdepth;
    lastComm = thiscom;
  }

  let more = document.getElementsByClassName("morelink")[0];
  if (more)
    commcontainer.appendChild(more);

  for (let d of commcontainer.getElementsByClassName("comment"))
    for (let a of d.getElementsByTagName("a"))
      a.innerText = a.href; /*full text*/

  oldbody.remove();
  document.body.appendChild(commcontainer);
})();void(0);
