using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "ApiContact",
                url: "api/contact",
                defaults: new { controller = "Api", action = "Contact" }
            );

            routes.MapRoute(
                name: "ApiInquiry",
                url: "api/inquiry",
                defaults: new { controller = "Api", action = "Inquiry" }
            );

            routes.MapRoute(
                name: "ApiSubscribe",
                url: "api/subscribe",
                defaults: new { controller = "Api", action = "Subscribe" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{*url}",
                defaults: new { controller = "Main", action = "Index" }
            );

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}
