// ============================================================
// 渲染逻辑 —— 一般无需修改；内容更新请在 data.js 中进行
// 通过 <body data-page="home|profile|publications|join"> 判断页面
// ============================================================

(function () {
  "use strict";
  var D = (typeof PROFILE_DATA !== "undefined") ? PROFILE_DATA : window.PROFILE_DATA;
  if (!D) { console.error("PROFILE_DATA 未加载：请检查 data.js 是否存在且语法正确。"); return; }

  var page = document.body.getAttribute("data-page") || "home";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var setText = function (id, text) { var el = $(id); if (el) el.textContent = text; };
  var setHtml = function (id, html) { var el = $(id); if (el) el.innerHTML = html; };
  var pad = function (n) { return String(n).padStart(2, "0"); };

  // 作者中高亮本人
  var ME = ["Li Jiangang", "Jiangang Li", "Jian-Gang Li", "李建刚"];
  function markMe(authors) {
    var out = esc(authors);
    ME.forEach(function (n) {
      out = out.split(n).join('<span class="me">' + n + "</span>");
    });
    return out;
  }

  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="pub-tags">' + tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>";
  }

  function pubHtml(p, opts) {
    opts = opts || {};
    var doi = p.doi
      ? '<a class="pub-doi mono" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">DOI: ' + esc(p.doi) + "</a>"
      : "";
    var title = p.doi
      ? '<a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    var side = opts.showYear === false
      ? '<div class="pub-side">' + (opts.index ? '<span class="idx mono">' + opts.index + "</span>" : "") + tagsHtml(p.tags) + "</div>"
      : '<div class="pub-side"><span class="pub-year mono">' + esc(p.year) + "</span>" + tagsHtml(p.tags) + "</div>";
    return (
      '<li class="pub reveal" data-lang="' + esc(p.lang || "") + '">' + side +
      '<div class="pub-main">' +
        '<h3 class="pub-title">' + title + "</h3>" +
        '<p class="pub-authors">' + markMe(p.authors) + "</p>" +
        '<p class="pub-meta"><span>' + (p.lang === "zh" ? '<span class="journal">' + esc(p.journal) + "</span>" : "<em>" + esc(p.journal) + "</em>") + ", " + esc(p.year) + (p.detail ? ", " + esc(p.detail) : "") + "</span>" + doi + "</p>" +
        (opts.showNote && p.note ? '<p class="pub-note">' + esc(p.note) + "</p>" : "") +
      "</div></li>"
    );
  }

  function projCardHtml(pr) {
    var role = pr.status
      ? '<span class="proj-role done">' + esc(pr.role) + " · " + esc(pr.status) + "</span>"
      : '<span class="proj-role">' + esc(pr.role) + "</span>";
    return (
      '<article class="card proj reveal">' +
        '<span class="proj-cat mono">' + esc(pr.category) + "</span>" +
        '<h3 class="proj-name">' + esc(pr.name) + "</h3>" +
        '<div class="proj-row">' +
          (pr.number ? '<span class="num">No. ' + esc(pr.number) + "</span>" : "") +
          (pr.time ? '<span class="num">' + esc(pr.time) + "</span>" : "") +
          role +
        "</div>" +
      "</article>"
    );
  }

  // ---------- 导航 ----------
  var NAV = [
    ["index.html#top", "首页"],
    ["index.html#focus", "研究方向"],
    ["index.html#research", "科研成果"],
    ["index.html#projects", "科研项目"],
    ["index.html#service", "学术服务"],
    ["index.html#join", "加入课题组"],
    ["profile.html", "个人简历"]
  ];
  var navLinks = $("navLinks");
  if (navLinks) {
    NAV.forEach(function (item) {
      var a = document.createElement("a");
      var href = item[0];
      if (page === "home" && href.indexOf("index.html#") === 0) href = href.replace("index.html", "");
      a.href = href;
      a.textContent = item[1];
      var target = href.split("#")[1];
      if (target) a.setAttribute("data-target", target);
      if (page === "profile" && href === "profile.html") a.classList.add("active");
      navLinks.appendChild(a);
    });
  }
  setText("navName", D.name);
  setText("navEn", D.nameEn);

  var nav = $("nav");
  var toggle = $("navToggle");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- 页脚 ----------
  var F = D.footer || {};
  setText("footerL1", F.line1 || D.name + " · Academic Homepage");
  setText("footerL2", F.line2 || D.affiliationEn || "");
  setText("footerL3", F.line3 || "");
  setText("footerCopy", "© " + new Date().getFullYear() + " " + (D.nameEn || D.name));

  // ---------- 访客统计 ----------
  // GitHub Pages 是纯静态托管，自身无法计数，这里接入第三方服务「不蒜子」。
  // 两家实现的元素 ID 规则不同，下面各写一套；在 data.js 的 counter.provider 中切换。
  var COUNTERS = {
    // 原版（Bruce / ibruce.info），需要 container + value 两层结构
    "ibruce": {
      src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
      valueId: function (k) { return "busuanzi_value_site_" + k; },
      item: function (k, label) {
        return '<span class="fc-item" id="busuanzi_container_site_' + k + '">' +
               '<span class="fc-label">' + esc(label) + "</span>" +
               '<span class="fc-num" id="busuanzi_value_site_' + k + '">–</span></span>';
      }
    },
    // CoolCat 的另一套实现（busuanzi.cc），单层结构
    "busuanzi.cc": {
      src: "//cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js",
      valueId: function (k) { return "busuanzi_site_" + k; },
      item: function (k, label) {
        return '<span class="fc-item">' +
               '<span class="fc-label">' + esc(label) + "</span>" +
               '<span class="fc-num" id="busuanzi_site_' + k + '">–</span></span>';
      }
    }
  };

  function renderCounter() {
    var box = $("footerCount");
    var C = D.counter;
    if (!box || !C || !C.enabled) return;
    var P = COUNTERS[C.provider] || COUNTERS.ibruce;

    var parts = [], watch = [];
    if (C.showUv !== false) { parts.push(P.item("uv", C.labelUv || "访客")); watch.push(P.valueId("uv")); }
    if (C.showPv !== false) { parts.push(P.item("pv", C.labelPv || "访问")); watch.push(P.valueId("pv")); }
    if (!parts.length) return;

    box.innerHTML = parts.join('<span class="fc-sep" aria-hidden="true">·</span>');
    box.setAttribute("title", "由第三方服务「不蒜子」统计，自本站启用该功能之日起累计");

    var src = P.src;
    if (location.protocol === "file:") src = "https:" + src;   // 本地双击打开时补上协议
    var sc = document.createElement("script");
    sc.async = true;
    sc.src = src;
    document.body.appendChild(sc);

    // 只有真的取到数字才显示这一行；服务不可用时整行保持隐藏，不会露出 0 或空白
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var ready = watch.length > 0 && watch.every(function (id) {
        var el = document.getElementById(id);
        return el && /\d/.test(el.textContent);
      });
      if (ready) {
        clearInterval(timer);
        watch.forEach(function (id) {
          var el = document.getElementById(id);
          var n = parseInt(String(el.textContent).replace(/[^\d]/g, ""), 10);
          if (!isNaN(n)) el.textContent = n.toLocaleString("en-US");
        });
        box.hidden = false;
      } else if (tries > 50) {
        clearInterval(timer);   // 约 10 秒仍无数据，放弃
      }
    }, 200);
  }
  renderCounter();

  // ---------- 首页 ----------
  if (page === "home") {
    document.title = D.name + " · Academic Homepage｜" + D.core.title + " · " + D.focus[0].title;
    setText("heroAffil", D.affiliationEn);
    setText("heroName", D.name);
    setText("heroNameEn", D.nameEn);
    setText("heroRole", D.role);
    setHtml("heroTagline", D.tagline.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join('<span class="x" aria-hidden="true">×</span>'));
    setText("coreLabel", D.core.label);
    setText("coreTitle", D.core.title);
    setText("coreSub", D.core.sub);
    setText("coreDesc", D.core.desc);

    // 数字条
    setHtml("heroStats", (D.stats || []).map(function (s) {
      return (
        '<div class="stat">' +
          '<div class="stat-value mono"><span class="count" data-value="' + esc(s.value) + '">' + esc(s.value) + "</span>" + (s.suffix ? "<sup>" + esc(s.suffix) + "</sup>" : "") + "</div>" +
          '<div class="stat-label">' + esc(s.label) + "</div>" +
          '<div class="stat-en mono">' + esc(s.en || "") + "</div>" +
        "</div>"
      );
    }).join(""));

    // 研究方向
    setHtml("focusGrid", D.focus.map(function (f) {
      var cls = "card focus-card reveal" + (f.featured ? " featured" : "");
      return (
        '<article class="' + cls + '">' +
          '<span class="focus-num mono">' + esc(f.num) + "</span>" +
          (f.featured ? '<span class="focus-kicker">Core Direction · 核心方向</span>' : "") +
          '<h3 class="focus-title">' + esc(f.title) + "</h3>" +
          '<p class="focus-en mono">' + esc(f.en) + "</p>" +
          '<p class="focus-desc">' + esc(f.desc) + "</p>" +
          (f.tags ? '<div class="focus-tags">' + f.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
        "</article>"
      );
    }).join(""));

    // AI × Planning
    setText("aiSub", D.ai.sub);
    setText("aiStatement", D.ai.statement);
    setHtml("aiFlow", D.ai.flow.map(function (n) {
      return '<li class="flow-node"><span class="flow-en">' + esc(n.en) + '</span><span class="flow-zh">' + esc(n.zh) + "</span></li>";
    }).join(""));
    setHtml("aiDirections", D.ai.directions.map(function (d, i) {
      return (
        '<article class="ai-card">' +
          '<span class="ai-card-num mono">' + pad(i + 1) + "</span>" +
          '<h3 class="ai-card-title">' + esc(d.title) + "</h3>" +
          '<p class="ai-card-desc">' + esc(d.desc) + "</p>" +
        "</article>"
      );
    }).join(""));

    // 代表性研究
    var selected = D.papers.filter(function (p) { return p.selected; });
    setHtml("pubList", selected.map(function (p) { return pubHtml(p); }).join(""));

    // 科研项目
    var homeProjects = D.projects.filter(function (p) { return p.homepage !== false; });
    var featured = homeProjects.filter(function (p) { return p.featured; })[0];
    var rest = homeProjects.filter(function (p) { return p !== featured; });
    if (featured) {
      setHtml("projFeatured",
        "<div>" +
          '<span class="proj-cat mono">' + esc(featured.category) + "</span>" +
          '<h3 class="proj-name">' + esc(featured.name) + "</h3>" +
        "</div>" +
        '<dl class="proj-meta">' +
          "<div><dt>项目批准号</dt><dd>" + esc(featured.number) + "</dd></div>" +
          "<div><dt>执行期</dt><dd>" + esc(featured.time) + "</dd></div>" +
          '<div><dt>角色</dt><dd class="role">' + esc(featured.role) + (featured.status ? " · " + esc(featured.status) : "") + "</dd></div>" +
        "</dl>"
      );
    } else {
      var pf = $("projFeatured"); if (pf) pf.style.display = "none";
    }
    setHtml("projGrid", rest.map(projCardHtml).join(""));
    setText("projNote", D.projectsNote || "");

    // 政策咨询
    var P = D.policy;
    setHtml("policyCard",
      '<div class="policy-top">' +
        '<span class="policy-eyebrow mono">' + esc(P.eyebrow) + "</span>" +
        '<span class="policy-badge mono">国办信息刊物《每日信息摘报》采纳 · 获领导人批示</span>' +
      "</div>" +
      '<h3 class="policy-title">《' + esc(P.title) + "》</h3>" +
      '<p class="policy-full">全文题目：' + esc(P.fullTitle) + "</p>" +
      '<p class="policy-summary">' + esc(P.summary) + "</p>" +
      '<ol class="policy-steps">' +
        P.steps.map(function (s, i) {
          return (
            '<li class="policy-step">' +
              '<span class="policy-step-num mono">' + pad(i + 1) + "</span>" +
              '<p class="policy-step-label">' + esc(s.label) + "</p>" +
              '<p class="policy-step-desc">' + esc(s.desc) + "</p>" +
            "</li>"
          );
        }).join("") +
      "</ol>"
    );

    // 简介
    setText("bioShort", D.bioShort);
    setHtml("aboutAside",
      '<div class="kv"><dt>Position</dt><dd>' + esc(D.role) + "</dd></div>" +
      '<div class="kv"><dt>Affiliation</dt><dd>' + esc(D.affiliation) + "<br>" + esc(D.affiliationEn) + "</dd></div>" +
      '<div class="kv"><dt>Teaching</dt><dd>' + D.teaching.map(function (t) { return "《" + esc(t) + "》"; }).join("") + "</dd></div>"
    );

    // 学术兼职
    setHtml("serviceList", D.service.roles.map(function (r, i) {
      return '<li class="service-item"><span class="n">' + pad(i + 1) + "</span><span>" + esc(r) + "</span></li>";
    }).join(""));
    setHtml("journalList", D.service.journals.map(function (j) { return "<li>" + esc(j) + "</li>"; }).join(""));

    // 加入课题组
    var R = D.recruiting;
    setText("joinSubtitle", R.subtitle);
    setHtml("joinItems", R.items.map(function (it) {
      return (
        '<article class="card join-card reveal">' +
          '<span class="join-num mono">' + esc(it.num) + "</span>" +
          '<h3 class="join-title">' + esc(it.title) + "</h3>" +
          '<p class="join-en mono">' + esc(it.en) + "</p>" +
          '<p class="join-desc">' + esc(it.desc) + "</p>" +
        "</article>"
      );
    }).join(""));
    setHtml("joinFocus", '<span class="lbl mono">Focus</span>' + R.focus.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join(""));
    setText("joinClosing", R.closing);

    // 联系方式
    renderContact();
  }

  // ---------- 简历页 ----------
  if (page === "profile") {
    document.title = D.name + " · 个人学术简历 | Curriculum Vitae";
    setText("pName", D.name);
    setText("pNameEn", D.nameEn);
    setText("pRole", D.role);
    setText("pAffil", D.affiliation + " · " + D.affiliationEn);

    setHtml("bioFull", D.bioFull.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""));

    setHtml("cvFocus", D.focus.map(function (f) {
      return (
        '<div class="cv-row"><span class="k">' + esc(f.num) + " · " + esc(f.en) + '</span>' +
        '<div class="v"><span class="t">' + esc(f.title) + "</span>" + esc(f.desc) + "</div></div>"
      );
    }).join(""));

    setHtml("cvProjects", D.projects.map(function (pr, i) {
      var meta = [];
      if (pr.number) meta.push('<span class="mono">批准号 ' + esc(pr.number) + "</span>");
      if (pr.fund) meta.push("<span>经费 " + esc(pr.fund) + "</span>");
      if (pr.time) meta.push('<span class="mono">' + esc(pr.time) + "</span>");
      meta.push("<span>" + esc(pr.role) + (pr.status ? " · " + esc(pr.status) : "") + "</span>");
      return (
        '<div class="cv-row"><span class="k">' + pad(i + 1) + " · " + esc(pr.category) + '</span>' +
        '<div class="v"><span class="t">' + esc(pr.name) + '</span><div class="m">' + meta.join("") + "</div></div></div>"
      );
    }).join("") + '<div class="cv-row"><span class="k">参与</span><div class="v">' + esc(D.projectsNote) + "</div></div>");

    var sel = D.papers.filter(function (p) { return p.selected; });
    setHtml("cvPapers", sel.map(function (p, i) { return pubHtml(p, { showYear: false, index: pad(i + 1), showNote: true }); }).join(""));

    var P2 = D.policy;
    setHtml("cvPolicy",
      '<div class="cv-row"><span class="k">' + esc(P2.eyebrow) + '</span><div class="v"><span class="t">' + esc(P2.fullTitle) + "</span>" + esc(P2.summary) + "</div></div>"
    );

    setHtml("cvHonors", D.honors.map(function (h, i) {
      return '<div class="cv-row"><span class="k">' + pad(i + 1) + '</span><div class="v">' + esc(h.text) + "</div></div>";
    }).join(""));

    setHtml("cvService", D.service.roles.map(function (r, i) {
      return '<div class="cv-row"><span class="k">' + pad(i + 1) + '</span><div class="v">' + esc(r) + "</div></div>";
    }).join("") + '<div class="cv-row"><span class="k">审稿期刊</span><div class="v">' +
      D.service.journals.map(function (j) { return "<em>" + esc(j) + "</em>"; }).join("、") + " 等 SSCI / SCI 期刊</div></div>");

    setHtml("cvTeaching", '<div class="cv-row"><span class="k">本科生课程</span><div class="v">' +
      D.teaching.map(function (t) { return "《" + esc(t) + "》"; }).join("") + "</div></div>");

    renderContact();
  }

  // ---------- 论文页 ----------
  if (page === "publications") {
    document.title = D.name + " · Publications | 学术论文";
    var list = $("allPubs");
    var papers = D.papers.slice().sort(function (a, b) { return b.year - a.year; });

    function renderPubs(filter) {
      var shown = papers.filter(function (p) {
        if (filter === "all") return true;
        if (filter === "en" || filter === "zh") return p.lang === filter;
        return (p.tags || []).indexOf(filter) !== -1;
      });
      var years = [];
      shown.forEach(function (p) { if (years.indexOf(p.year) === -1) years.push(p.year); });
      list.innerHTML = years.map(function (y) {
        var group = shown.filter(function (p) { return p.year === y; });
        return (
          '<div class="year-group"><p class="year-label mono">' + y + "</p><ol class=\"pubs\">" +
          group.map(function (p) { return pubHtml(p, { showYear: false, showNote: true }); }).join("") +
          "</ol></div>"
        );
      }).join("");
      setText("pubCount", shown.length + " / " + papers.length);
      observeReveal();
    }

    var filters = $("pubFilters");
    var tagCount = {};
    papers.forEach(function (p) { (p.tags || []).forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; }); });
    var tagSet = Object.keys(tagCount).filter(function (t) { return tagCount[t] >= 2; }).sort(function (a, b) { return tagCount[b] - tagCount[a]; });
    var filterDefs = [["all", "All"], ["en", "English"], ["zh", "中文"]].concat(tagSet.map(function (t) { return [t, t]; }));
    filters.innerHTML = filterDefs.map(function (f, i) {
      return '<button type="button" class="filter' + (i === 0 ? " active" : "") + '" data-filter="' + esc(f[0]) + '">' + esc(f[1]) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      filters.querySelectorAll(".filter").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      renderPubs(b.getAttribute("data-filter"));
    });
    renderPubs("all");
    renderContact();
  }

  // ---------- 课题组页 ----------
  if (page === "join") {
    var R2 = D.recruiting;
    document.title = D.name + " · " + R2.title + " | " + R2.en;
    setText("joinSubtitle", R2.subtitle);
    setHtml("joinFocusList", R2.focus.map(function (f, i) {
      return '<li class="service-item"><span class="n">' + pad(i + 1) + "</span><span>" + esc(f) + "</span></li>";
    }).join(""));
    setHtml("joinItems", R2.items.map(function (it) {
      return (
        '<article class="card join-card reveal">' +
          '<span class="join-num mono">' + esc(it.num) + "</span>" +
          '<h3 class="join-title">' + esc(it.title) + "</h3>" +
          '<p class="join-en mono">' + esc(it.en) + "</p>" +
          '<p class="join-desc">' + esc(it.desc) + "</p>" +
        "</article>"
      );
    }).join(""));
    var studentHonors = D.honors.filter(function (h) { return h.text.indexOf("指导学生") === 0; });
    setHtml("joinHonors", studentHonors.map(function (h, i) {
      return '<div class="cv-row"><span class="k">' + pad(i + 1) + " · " + esc(h.level) + '</span><div class="v">' + esc(h.text) + "</div></div>";
    }).join(""));
    setText("joinClosing", R2.closing);
    setText("joinHowTo", R2.howTo);
    setHtml("joinEmails", D.contact.email.map(function (e) {
      return '<li><a href="mailto:' + esc(e) + '">' + esc(e) + "</a></li>";
    }).join(""));
    renderContact();
  }

  // ---------- 联系方式（多页共用） ----------
  function renderContact() {
    var C = D.contact;
    setHtml("contactEmails", C.email.map(function (e) {
      return '<li><a href="mailto:' + esc(e) + '">' + esc(e) + "</a></li>";
    }).join(""));
    var office = Array.isArray(C.office) ? C.office : [C.office];
    setHtml("contactOffice", office.map(function (o) { return "<span>" + esc(o) + "</span>"; }).join(""));
    var links = (D.links || []).filter(function (l) { return l && l.url; });
    if ($("contactLinks")) {
      setHtml("contactLinks", links.map(function (l) {
        return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' <span class="ext">↗</span></a></li>';
      }).join(""));
    }
  }

  // ---------- 滚动显现 ----------
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.classList.contains("hero-stats")) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }) : null;

  function observeReveal() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("in");
    });
  }
  observeReveal();
  // 兜底：若 1.2s 后仍有元素未显现（例如浏览器不支持），直接显示
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("in");
    });
  }, 1200);

  // ---------- 数字 count-up ----------
  function countUp(root) {
    root.querySelectorAll(".count").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-value")) || 0;
      if (reduceMotion || el.getAttribute("data-done")) { el.textContent = target; return; }
      el.setAttribute("data-done", "1");
      el.textContent = "0";
      var start = null, dur = 900;
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ---------- 导航高亮当前章节（首页） ----------
  if (page === "home" && "IntersectionObserver" in window) {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-target]"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("data-target")] = a; });
    // 章节到导航项的映射：未在导航中的章节归属到相邻导航项
    var alias = { top: "top", focus: "focus", ai: "focus", research: "research", projects: "projects", policy: "projects", about: "service", service: "service", join: "join", contact: "join" };
    var secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = alias[e.target.id];
        links.forEach(function (a) { a.classList.remove("active"); });
        if (key && map[key]) map[key].classList.add("active");
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    Object.keys(alias).forEach(function (id) { var s = $(id); if (s) secObserver.observe(s); });
  }
})();
