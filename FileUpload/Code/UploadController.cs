namespace Test.Code
{
  using System.Web.Http;
  using System.Net;
  using System.Net.Http;
  using System.Web;
  using System;
  using System.Net.Http.Headers;

  /// <summary>
  /// Defines an example of upload controller.
  /// </summary>
  public class UploadController : ApiController
  {
    /// <summary>
    /// Accepts an uploaded image file.
    /// File is passed as mime/multipart.
    /// </summary>
    /// <returns>
    /// an unique id of the uploaded file for further reference.
    /// </returns>
    [HttpPost]
    [Route("upload")]
    public HttpResponseMessage Upload()
    {
      var httpRequest = HttpContext.Current.Request;

      if (httpRequest.Files.Count == 0)
      {
        return Request.CreateResponse(HttpStatusCode.BadRequest);
      }

      try
      {
        var id = Guid.NewGuid().ToString();

        foreach (string file in httpRequest.Files)
        {
          var attachment = httpRequest.Files[file];
          var name = attachment.FileName;

          using (var stream = attachment.InputStream)
          {
            // TODO: handle the stream. At this point you have:
            //       unique id, file name and input stream with 
            //       the file content.
          }
        }

        var response =
          Request.CreateResponse<string>(HttpStatusCode.OK, id);

        response.Content.Headers.ContentType =
          new MediaTypeHeaderValue("text/html");

        return response;
      }
      catch (Exception e)
      {
        return Request.CreateErrorResponse(
          HttpStatusCode.InternalServerError, e);
      }
    }
  }
}
