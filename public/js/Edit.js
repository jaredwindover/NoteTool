
//Scroll div to bottom on update
function ScrollDown(){
  console.log("Attempting to scroll")
  var mydiva = $('#Preview');
  mydiva.scrollTop(mydiva.prop('scrollHeight'));
  var mydivb = $('#Buffer');
  mydivb.scrollTop(mydivb.prop('scrollHeight'));
};

var Preview = {
  delay: 150,        // delay after keystroke before updating

  preview: null,     // filled in by Init below
  buffer: null,      // filled in by Init below

  timeout: null,     // store setTimout id
  mjRunning: false,  // true when MathJax is processing
  oldText: null,     // used to check if an update is needed
  recheck: false,    // flag that text has changed while typesetting

  //
  //  Get the preview and buffer DIV's
  //
  Init: function () {
    console.log("Initing");
    this.preview = document.getElementById("Preview");
    this.buffer = document.getElementById("Buffer");
  },

  //
  //  Switch the buffer and preview, and display the right one.
  //  (We use visibility:hidden rather than display:none since
  //  the results of running MathJax are more accurate that way.)
  //
  SwapBuffers: function () {
    console.log("Swapping");
    var buffer = this.preview,
    preview = this.buffer;
    this.buffer = buffer; this.preview = preview;
    buffer.style.visibility = "hidden";
    buffer.style.position = "absolute";
    buffer.style.top = preview.style.top;
    preview.style.visibility = "";
    preview.style.position = "";
    //var tmpStyle = this.buffer.style;
    //this.buffer.style = this.preview.style;
    //this.preview.style = tmpStyle;
  },

  //
  //  This gets called when a key is pressed in the textarea.
  //  We check if there is already a pending update and clear it if so.
  //  Then set up an update to occur after a small delay (so if more keys
  //    are pressed, the update won't occur until after there has been 
  //    a pause in the typing).
  //  The callback function is set up below, after the Preview object is set up.
  //
  Update: function () {
    console.log("Updating");
    if (this.timeout) {clearTimeout(this.timeout)}
    this.timeout = setTimeout(this.callback,this.delay);
  },

  //
  //  Creates the preview and runs MathJax on it.
  //  If MathJax is already trying to render the code, return
  //  If the text hasn't changed, return
  //  Otherwise, indicate that MathJax is running, and start the
  //    typesetting.  After it is done, call PreviewDone.
  //  
  CreatePreview: function () {
    console.log("Creating Preview");
    Preview.timeout = null;
    if (this.mjRunning) {
      this.recheck = true;
      return;
    }
    var text = '<h1>'+$("#title").val()+'</h1>'
	  +$("#content").val();
    if (text === this.oldtext) return;
    this.buffer.innerHTML = this.oldtext = text;
    this.mjRunning = true;
    this.recheck = false;
    MathJax.Hub.Queue(
      ["Typeset",MathJax.Hub,this.buffer],
      ["ReCheck",this],
      ["PreviewDone",this]
    );
  },

  //
  //  Indicate that MathJax is no longer running,
  //  and swap the buffers to show the results.
  //
  PreviewDone: function () {
    console.log("PreviewDone");
    this.mjRunning = false;
    this.SwapBuffers();
    ScrollDown();
  },

  //
  //  Re-CreatePreview if Necessary
  //
  ReCheck: function () {
    console.log("Rechecking");
    if (this.recheck) {
      MathJax.Hub.Queue(
	["CreatePreview",this]
      );
    }
  }

};

//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(["CreatePreview",Preview]);
Preview.callback.autoReset = true;  // make sure it can run more than once

$(document).ready(function() {
  //Override submit action to redirect after
  $("#form1").submit(function() {
    var title = $("#title").val();
    var content = $("#content").val();
    // Use form's action as url
    $.post($(this).attr("action"),
	   {
	     title:title,
	     content:content
	   },
	   function(){
	     window.location.href='/Notes/'+title.replace(/ /g,'');
	   });
    return false;
  });
  
  //On content change, update mathjax
  $("#content")
      .bind('input propertychange',Preview.Update.bind(Preview));

  //On title change, update mathjax
  $("#title")
      .bind('input propertychange',Preview.Update.bind(Preview));

  //Set up Preview
  Preview.Init();
  Preview.Update();
  
});
