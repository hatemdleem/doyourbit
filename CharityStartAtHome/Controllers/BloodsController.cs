using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PagedList;
using CharityStartAtHome.Models;

namespace CharityStartAtHome.Controllers
{
    [HandleError]
    public class BloodsController : Controller
    {
        private Donation db = new Donation();

        // GET: Bloods
        public ActionResult List(string searchString, string currentFilter, int page = 1)
        {

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewBag.CurrentFilter = searchString;

            var bloods = from b in db.Bloods
                          select b;
           
                if (!string.IsNullOrEmpty(searchString))
                {

                    bloods = db.Bloods.Where(b => b.Address.ToString().Contains(searchString));

                }
                int pageSize = 5;

                return View(bloods.ToList().ToPagedList(page, pageSize));
            
        

        }
        public ActionResult Bloodm()
        {
              return View();
        }
        // GET: Bloods/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Blood blood = db.Bloods.Find(id);
            if (blood == null)
            {
                return HttpNotFound();
            }
            return View(blood);
        }

       
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
