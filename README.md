# FileUpload for IE8+
<p>File select and upload AngularJS directive that will work for IE8+.</p>
<p>file-upload.js defines <b>file-upload</b> AngularJS module.
The module defines <b>file-upload</b> directive that simplify file uploading tasks and suits to the all browsers (including old browsers like IE8). It converts any element to an uploading control that opens select file dialog and performs multipart-data uploading to the specified location.</p>

<h2>Compatibility.</h2>
All browsers where AngularJS will work.

<h2>Requirements</h2>
AngularJS. The directive was tested with version 1.2.16, and probably will work with earlier versions too.

<h2>Usage</h2>
In order to start using <b>file-upload</b> directive you have to include file-upload.js script.
For example:

<pre>
 &lt;script src="Scripts/angular.min.js"&gt;&lt;/script&gt;
 &lt;script src="Scripts/file-upload.js"&gt;&lt;/script&gt;
</pre>

Then you may define a link that will open select file dialog and will upload the selected file to the server:

<pre>
      &lt;a id="test1" file-upload=""
         class="btn btn-primary"
         accept=".*"
         server-url="api/upload"
         on-success="controller.uploadSucceed(data, fileName)"
         on-error="controller.uploadFailed(e)"&gt;Click here to upload file&lt;/a&gt;
</pre>