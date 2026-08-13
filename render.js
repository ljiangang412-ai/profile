// ============================================================
// 渲染逻辑 —— 一般无需修改；内容更新请在 data.js 中进行
// ============================================================

(function () {
  const D = PROFILE_DATA;

  document.title = D.name + " - 个人主页";
  document.getElementById("navBrand").textContent = D.name;
  document.getElementById("heroTitle").textContent = D.heroTitle;
  document.getElementById("heroRole").textContent = D.role;
  document.getElementById("heroIntro").textContent = D.heroIntro;

  // 头像
  if (D.avatar) {
    document.getElementById("avatarImg").src = D.avatar;
    document.getElementById("avatarImg").hidden = false;
    document.getElementById("avatarText").hidden = true;
  } else {
    document.getElementById("avatarText").textContent = D.name.charAt(0);
  }

  // 导航链接
  const sections = [
    ["profile", "个人简介"],
    ["projects", "科研项目"],
    ["positions", "科研兼职"],
    ["papers", "代表性论文"],
    ["honors", "荣誉奖项"],
    ["contact", "联系方式"],
    ["recruiting", "加入我们"]
  ];
  const navLinks = document.getElementById("navLinks");
  sections.forEach(function (s) {
    const a = document.createElement("a");
    a.href = "#" + s[0];
    a.textContent = s[1];
    navLinks.appendChild(a);
  });

  // 个人简介（按 \n 分段）
  const profileText = document.getElementById("profileText");
  D.profile.split("\n").forEach(function (p) {
    if (!p.trim()) return;
    const el = document.createElement("p");
    el.textContent = p;
    profileText.appendChild(el);
  });

  // 科研兼职
  const posGrid = document.getElementById("positionGrid");
  if (D.positions && D.positions.length) {
    D.positions.forEach(function (pos) {
      const el = document.createElement("div");
      el.className = "position-item reveal";
      el.textContent = pos;
      posGrid.appendChild(el);
    });
  } else {
    document.getElementById("positions").style.display = "none";
  }

  // 荣誉
  const honorGrid = document.getElementById("honorGrid");
  D.honors.forEach(function (h) {
    const el = document.createElement("div");
    el.className = "honor-item reveal";
    el.textContent = h;
    honorGrid.appendChild(el);
  });

  // 联系方式
  const contactCard = document.getElementById("contactCard");
  const emails = D.contact.email.map(function (e) {
    return '<a href="mailto:' + e + '">' + e + "</a>";
  }).join("　");
  contactCard.innerHTML =
    '<div class="contact-row"><span class="contact-label">邮箱</span>' +
    '<span class="contact-value">' + emails + "</span></div>" +
    '<div class="contact-row"><span class="contact-label">办公地址</span>' +
    '<span class="contact-value">' + D.contact.office + "</span></div>";

  // 论文
  const paperList = document.getElementById("paperList");
  D.papers.forEach(function (p) {
    const el = document.createElement("div");
    el.className = "paper reveal" + (p.highlight ? " paper-highlight" : "");
    el.innerHTML =
      '<div class="paper-authors">' + p.authors + "</div>" +
      '<div class="paper-title">' + p.title + "</div>" +
      '<div class="paper-meta">' +
      '<span class="paper-journal">' + p.journal + "</span>" +
      '<span class="paper-year">' + p.year + "</span>" +
      (p.detail ? '<span class="paper-year">' + p.detail + "</span>" : "") +
      "</div>" +
      (p.note ? '<div class="paper-note">' + p.note + "</div>" : "");
    paperList.appendChild(el);
  });

  // 项目
  const projectList = document.getElementById("projectList");
  D.projects.forEach(function (pr) {
    const el = document.createElement("div");
    el.className = "project reveal";
    let tags = "";
    if (pr.number) tags += '<span class="project-tag">' + pr.number + "</span>";
    if (pr.fund) tags += '<span class="project-tag">' + pr.fund + "</span>";
    if (pr.time) tags += '<span class="project-tag">' + pr.time + "</span>";
    if (pr.status) tags += '<span class="project-tag status">' + pr.status + "</span>";
    el.innerHTML =
      '<div class="project-name">' + pr.name + "</div>" +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + tags + "</div>";
    projectList.appendChild(el);
  });

  // 加入我们
  const R = D.recruiting;
  if (R) {
    document.getElementById("recruitingTitle").textContent = R.title;
    document.getElementById("recruitSubtitle").textContent = R.subtitle;
    document.getElementById("recruitIntro").textContent = R.intro;
    const items = document.getElementById("recruitItems");
    R.items.forEach(function (it) {
      const el = document.createElement("div");
      el.className = "recruit-item";
      el.innerHTML = '<span class="recruit-check">✓</span><span>' + it + "</span>";
      items.appendChild(el);
    });
    document.getElementById("recruitClosing").textContent = R.closing;
  } else {
    document.getElementById("recruiting").style.display = "none";
  }

  // 页脚
  document.getElementById("footerText").textContent =
    D.name + " · 个人主页 · " + new Date().getFullYear();

  // 滚动显现动画
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // 导航栏背景加深（滚动后）
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    nav.style.background = window.scrollY > 40
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(0, 0, 0, 0.55)";
  }, { passive: true });
})();
