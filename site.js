"use strict";
// Builds the page from content.js using textContent only (no innerHTML), so content can't inject code.
const $ = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; };
const link = (label, url) => { const a = $("a", "", label); a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; return a; };
const S = SITE, nav = document.getElementById("nav"), main = document.getElementById("main");
const sections = [];

function section(id, title, build) {
  const s = $("section"); s.id = id; s.appendChild($("h2", "", title)); build(s); main.appendChild(s);
  const a = $("a", "", title); a.href = "#" + id; nav.appendChild(a);
}
const list = (s, items, fn) => { const ul = $("ul"); items.forEach(i => { const li = $("li"); fn(li, i); ul.appendChild(li); }); s.appendChild(ul); };

// Home
const home = $("section", "hero"); home.id = "home";
const pic = S.photo ? Object.assign($("img", "photo"), { src: S.photo, alt: S.name }) : $("div", "photo initials", S.name.split(" ").map(w => w[0]).slice(0, 1).concat(S.name.split(" ").slice(-1)[0][0]).join(""));
const info = $("div"); info.append($("h1", "", S.name), $("p", "role", S.title), $("p", "", S.affiliation), $("p", "", S.location));
const mail = $("a", "", S.emailUser + " [at] " + S.emailDomain); mail.href = "#contact"; info.appendChild(mail);
home.append(pic, info); main.appendChild(home);
const h = $("a", "", "Home"); h.href = "#home"; nav.appendChild(h);

section("about", "About", s => { S.about.forEach(p => s.appendChild($("p", "", p))); if (S.metrics) s.appendChild($("p", "note", S.metrics)); });
if (S.research.length) section("research", "Research", s => list(s, S.research, (li, r) => { li.append($("strong", "", r.head + ". "), document.createTextNode(r.text)); }));
if (S.publications.length) section("publications", "Publications", s => list(s, S.publications, (li, p) => { li.appendChild(document.createTextNode(p.cite + " ")); if (p.url) li.appendChild(link("[link]", p.url)); }));
if (S.presentations.length) section("presentations", "Presentations", s => list(s, S.presentations, (li, t) => li.textContent = t));
if (S.teaching.length) section("teaching", "Teaching", s => list(s, S.teaching, (li, t) => li.textContent = t));
if (S.service.length) section("service", "Service & Training", s => list(s, S.service, (li, t) => li.textContent = t));
section("contact", "Contact", s => {
  const p = $("p"); p.append("Email: ");
  const a = $("a", "", "Send an email"); a.href = "#contact"; a.addEventListener("click", e => { e.preventDefault(); location.href = "mailto:" + S.emailUser + "@" + S.emailDomain; });
  p.appendChild(a); s.appendChild(p);
  const row = $("p"); S.links.forEach((l, i) => { if (i) row.append(" · "); row.appendChild(link(l.label, l.url)); }); s.appendChild(row);
});
document.getElementById("footer").textContent = "© " + new Date().getFullYear() + " " + S.name + ". " + S.affiliation + ".";
document.title = S.name;
