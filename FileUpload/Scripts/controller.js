(function ()
{
  "use strict";

  var module = angular.module("test", ["file-upload"]);

  module.controller(
    'UploaderController', 
    [
      '$scope', 
      function($scope) 
      {
        var controller = this;

        controller.fileID = null;

        controller.uploadSucceed = function(data, fileName)
        {
          if (data && (data[0] == '"'))
          {
            var len = data.length;

            if (data[len - 1] == '"')
            {
              data = data.substr(1, len - 2);
            }
          }

          alert("File: \"" + fileName + "\" is uploaded successfully: " + data);

          controller.fileID = data;
        };

        controller.uploadFailed = function (e)
        {
          alert("Error: " + e && e.toString ? e.toString() : "unknown");
        };
      }
    ]);
})();