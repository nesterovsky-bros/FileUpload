/** 
   @copyright 2016 Nesterovsky bros (mailto:contact@nesterovsky-bros.com). 
   @module file-upload
    
   @description This module simplifies client-side file upload. 
  
   Module defines a file-upload directive. 
 */

(function()
{
  "use strict";

  var module = angular.module('file-upload', []);

  module.directive(
    "fileUpload",
    [
      "$timeout", "$parse",
      function ($timeout, $parse)
      {
        var directive =
        {
          restrict: "AE",
          scope:
          {
            id: "@",
            serverUrl: "@",
            accept: "@?",
            onSuccess: "&",
            onError: "&?",
          },
          link: function (scope, element, attrs, controller)
          {
            var id = scope.id || ("fileUpload" + scope.$id);

            var template = "<iframe name='%id%$iframe' id='%id%$iframe' style='display: none;'></iframe><form name='%id%$form' enctype='multipart/form-data' method='post' action='%action%' target='%id%$iframe'><span style='position:relative;display:inline-block;overflow:hidden;padding:0;'>%html%<input type='file' name='%id%$file' id='%id%$file' style='position:absolute;height:100%;width:100%;left:-1px;top:-1px;z-index:100;font-size:50px;opacity:0;filter:alpha(opacity=0);'/></span></form>".
              replace("%action%", scope.serverUrl).
                replace("%html%", element.html()).
                  replace(/%id%/g, id);

            element.replaceWith(template);

            var iframe = angular.element(document.getElementById(id + "$iframe"));
            var inputFile = angular.element(document.getElementById(id + "$file"));
            var span = inputFile.parent();
            var form = span.parent();

            if (attrs['class'])
            {
              span.attr("class", attrs['class']);
            }

            inputFile.on(
              "change",
              function ()
              {
                if (scope.onSuccess)
                {
                  iframe.one(
                    "load",
                    function (e)
                    {
                      var response =
                        angular.element(this.contentWindow.document.documentElement).
                          text();

                      scope.onSuccess(
                        {
                          data: response,
                          fileName: inputFile.val()
                        });
                    });
                }

                if (scope.onError)
                {
                  iframe.one(
                    "error",
                    function (e)
                    {
                      scope.onError({ e: e });
                    });
                }

                if (inputFile.val())
                {
                  form[0].submit();
    
                  inputFile.val(null);
                }
              });
          }
        }

        return directive;
      }]);
})();