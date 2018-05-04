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
    public class ClothesController : Controller
    {
        private Donation db = new Donation();

        // GET: Clothes
        public ActionResult List(string searchString, string currentFilter,int page =1 )
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

            var clothes = from c in db.Clothes
                           select c;


           
            //var commands = searchString.Split(' ', 2);
            //var command = commands[0];  // !say
            //var text = commands[1];
            if (!string.IsNullOrEmpty(searchString))
            {
                if (searchString.Contains(" "))
                {
                    var indexOfFirstSpace = searchString.IndexOf(" ");
                    var first = searchString.Substring(0, indexOfFirstSpace);
                    var second = searchString.Substring(indexOfFirstSpace + 1);
                    clothes = db.Clothes.Where(c => c.Postcode.ToString().Contains(searchString) 
                    || c.Suburb.ToString().Contains(searchString) 
                    || c.Address.ToString().Contains(searchString) 
                    || c.Address.ToString().Contains(searchString) 
                    || c.Suburb.ToString().Contains(first) && c.Address.ToString().Contains(second)
                    || c.Postcode.ToString().Contains(first)&& c.Suburb.ToString().Contains(second));
                }
                else
                {
                    clothes = db.Clothes.Where(c => c.Postcode.ToString().Contains(searchString) || c.Suburb.ToString().Contains(searchString) || c.Address.ToString().Contains(searchString) || c.Address.ToString().Contains(searchString));
                }

            }
            int pageSize = 5;

            return View(clothes.ToList().ToPagedList(page, pageSize));

            // if (option == "postcode")
            // {
            //     if (!string.IsNullOrEmpty(searchString))
            //     {

            //         clothes = db.Clothes.Where(c => c.Postcode.ToString().Contains(searchString));

            //     }
            //     int pageSize = 5;

            //     return View(clothes.ToList().ToPagedList(page, pageSize));
            // }
            //else if (option == "address")
            // {
            //     if (!string.IsNullOrEmpty(searchString))
            //     {

            //         clothes = db.Clothes.Where(c => c.Address.ToString().Contains(searchString));

            //     }
            //     int pageSize = 5;

            //     return View(clothes.ToList().ToPagedList(page, pageSize));
            // }
            // else
            // {
            //     if (!string.IsNullOrEmpty(searchString))
            //     {

            //         clothes = db.Clothes.Where(c => c.Suburb.ToString().Contains(searchString));

            //     }
            //     int pageSize = 5;

            //     return View(clothes.ToList().ToPagedList(page, pageSize));

            // }

        }
        public ActionResult Clothm()
        {
            return View();
        }

        // GET: Clothes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cloth cloth = db.Clothes.Find(id);
            if (cloth == null)
            {
                return HttpNotFound();
            }
            return View(cloth);
        }

        public ActionResult Cafepos(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cloth cloth = db.Clothes.Find(id);
            if (cloth == null)
            {
                return HttpNotFound();
            }
            return View(cloth);
        }

        // GET: Clothes/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: Clothes/Create
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,Name,Service,Description,Materials,OpenTime,CloseTime,State,Suburb,Address,Postcode,Phone,Email,Findme")] Cloth cloth)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Clothes.Add(cloth);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(cloth);
        //}

        //// GET: Clothes/Edit/5
        //public ActionResult Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Cloth cloth = db.Clothes.Find(id);
        //    if (cloth == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(cloth);
        //}

        //// POST: Clothes/Edit/5
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "Id,Name,Service,Description,Materials,OpenTime,CloseTime,State,Suburb,Address,Postcode,Phone,Email,Findme")] Cloth cloth)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(cloth).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(cloth);
        //}

        //// GET: Clothes/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Cloth cloth = db.Clothes.Find(id);
        //    if (cloth == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(cloth);
        //}

        //// POST: Clothes/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public ActionResult DeleteConfirmed(int id)
        //{
        //    Cloth cloth = db.Clothes.Find(id);
        //    db.Clothes.Remove(cloth);
        //    db.SaveChanges();
        //    return RedirectToAction("Index");
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
    }
}
