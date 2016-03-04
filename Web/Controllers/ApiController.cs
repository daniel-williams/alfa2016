using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class ApiController : Controller
    {
        const string SUBMISSION_IDENTITY = "Anna Lancaster Fine Art Website";

        [HttpPost]
        public ActionResult Contact(ContactBM bm)
        {
            string subject = SUBMISSION_IDENTITY + ": Contact Form Submission";

            StringBuilder body = new StringBuilder();
            body.Append(GetFormHeader());
            body.Append(GetNameValueRow("Email", bm.email));
            body.Append(GetNameValueRow("Name", bm.name));
            body.Append(GetNameValueRow("Phone", bm.phone));
            body.Append(GetNameValueRow("Message", bm.message));
            body.Append(GetFormFooter());

            try
            {
                sendEmail(bm.email, subject, body.ToString());
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Inquiry(InquiryBM bm)
        {
            string subject = SUBMISSION_IDENTITY + ": Art Inquiry Submission";

            StringBuilder body = new StringBuilder();
            body.Append(GetFormHeader());
            body.Append(GetNameValueRow("Email", bm.email));
            body.Append(GetNameValueRow("Name", bm.name));
            body.Append(GetNameValueRow("Phone", bm.phone));
            body.Append(GetNameValueRow("Message", bm.message));
            body.Append(GetNameValueRow("Art", bm.art));
            body.Append(GetFormFooter());

            try
            {
                sendEmail(bm.email, subject, body.ToString());
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Subscribe(SubscribeBM bm)
        {
            string subject = SUBMISSION_IDENTITY + ": Subscribe to Newsletter";

            StringBuilder body = new StringBuilder();
            body.Append(GetFormHeader());
            body.Append(GetNameValueRow("Email", bm.email));
            body.Append(GetFormFooter());

            try
            {
                sendEmail(bm.email, subject, body.ToString());
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch(Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        private string GetFormHeader()
        {
            return "<table cellpadding='3' border='0'>";
        }
        private string GetNameValueRow(string name, string val)
        {
            return string.Format("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", name, val);
        }
        private string GetFormFooter()
        {
            StringBuilder footer = new StringBuilder();

            footer.Append(GetNameValueRow("Users IP", GetUserIP()));
            footer.Append(GetNameValueRow("Timestamp", DateTime.UtcNow.ToString("MM/dd/yyyy @ h:mm tt") + " GMT"));
            footer.Append("</table>");

            return footer.ToString();
        }
        
        
        private void sendEmail(string from, string subject, string body)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress(from);
            message.To.Add(new MailAddress(WebConfigurationManager.AppSettings["SUBMISSIONS_EMAIL"]));
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body.ToString();
            message.BodyEncoding = Encoding.UTF8;
            message.SubjectEncoding = Encoding.UTF8;


            SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
            SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
            //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

            // TODO djw: remove this prior to go-live
            message.Bcc.Add(WebConfigurationManager.AppSettings["DEBUG_EMAIL"]);

            try
            {
#if DEBUG
                string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                if (!string.IsNullOrEmpty(debugAddress))
                {
                    message.To.Clear();
                    message.CC.Clear();
                    message.Bcc.Clear();
                    message.To.Add(debugAddress);
                }
#endif
                SMTPServer.Send(message);
            }
            catch (Exception ex)
            {
#if DEBUG
                System.Diagnostics.Debug.WriteLine("Exception: " + ex.Message);
#endif
            }
        }




        public static string GetUserIP()
        {
            HttpContext context = System.Web.HttpContext.Current;
            string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }
            return context.Request.ServerVariables["REMOTE_ADDR"];
        }

    }


    public class ContactBM
    {
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string message { get; set; }
    }

    public class InquiryBM : ContactBM
    {
        public string art { get; set; }
    }

    public class SubscribeBM
    {
        public string email { get; set; }
    }
}