// ============================================================
// 个人主页数据文件 —— 所有页面（首页 / 简历 / 论文 / 课题组）的内容都来自这里。
// 手动更新此文件后保存、刷新页面即可，无需改动 HTML / CSS / JS。
//
// 字段说明：
//   name / nameEn        姓名（中 / 英）
//   role                 头衔，用 " / " 分隔
//   affiliation(En)      单位（中 / 英）
//   tagline              首屏一句话研究定位
//   core                 首屏重点方向（人工智能与城乡规划）
//   stats                首屏下方的数字条（value 为数字，会做 count-up）
//   bioShort             首页精简简介（150–250 字）
//   bioFull              简历页完整简介（数组，每项一段）
//   teaching             承担课程
//   focus                研究方向卡片（featured: true 的卡片视觉权重更高）
//   ai                   "AI × Planning" 模块
//   papers               论文（selected: true 在首页展示；tags 为方向标签；doi 没有就留空，不要编造）
//   projects             科研项目（featured: true 为首页重点卡片；fund 只在简历页显示）
//   projectsNote         项目补充说明
//   policy               政策咨询与社会服务
//   honors               指导学生获奖 / 荣誉
//   service              学术兼职：roles 为职务，journals 为审稿期刊
//   recruiting           加入课题组
//   contact / links      联系方式与外部链接（没有真实链接的账号不要填）
//   counter              页脚访客统计（第三方服务「不蒜子」，enabled: false 可完全关闭）
// ============================================================

const PROFILE_DATA = {
  name: "李建刚",
  nameEn: "Li Jiangang",
  role: "博士 / 博士后 / 讲师 / 硕士研究生导师",
  affiliation: "河南财经政法大学",
  affiliationEn: "Henan University of Economics and Law",
  tagline: ["城镇化", "国土空间", "城市生态", "AI / Spatial Intelligence"],
  avatar: "",

  core: {
    label: "核心方向 · Core Direction",
    title: "人工智能与城乡规划",
    sub: "AI Planning · AI Ecosystem · AI City",
    desc: "研究生成式人工智能、大语言模型（LLM）、AI Agent、机器学习与 GIS 等技术在城乡规划、国土空间规划、生态空间优化和城市空间治理中的应用。"
  },

  stats: [
    { value: 5, suffix: "", label: "主持科研项目", en: "Projects as PI" },
    { value: 11, suffix: "", label: "发表学术论文", en: "Publications" },
    { value: 6, suffix: "+", label: "SSCI / SCI 审稿期刊", en: "Journals Reviewed" },
    { value: 1, suffix: "", label: "国办信息刊物采纳建议", en: "Policy Adoption · 2026" }
  ],

  bioShort:
    "李建刚，博士、博士后，讲师，硕士研究生导师。主要从事城镇化与生态环境、国土空间规划、城市更新、生态福祉以及人工智能与城乡规划等方向研究。" +
    "主持国家自然科学基金青年科学基金项目（C类）、河南省博士后科研资助项目、河南省科技攻关项目等。" +
    "担任国家自然科学基金委通讯评审专家，并受邀担任多个 SSCI/SCI 期刊审稿人。" +
    "近年来关注人工智能、大语言模型、AI Agent 与 GIS 空间分析在城乡规划和城市空间研究中的交叉应用。",

  bioFull: [
    "李建刚，博士，博士后，讲师，硕士研究生导师。主要从事城镇化与生态环境、国土空间规划与开发保护、城市更新与住房、生态福祉以及人工智能与城乡规划等方向的研究。近年来关注生成式人工智能、大语言模型（LLM）、AI Agent、机器学习与 GIS 空间分析在城乡规划、国土空间规划、生态空间优化和城市空间治理中的交叉应用。",
    "主持国家自然科学基金青年科学基金项目（C类）、河南省博士后科研资助项目、河南省科技攻关项目、教学改革项目和国家级科研项目培育项目，参与国家自然科学基金面上项目、中国科学院 A 类先导专项以及泌阳县、石龙区等地方政府委托的“十五五”规划等各级各类项目。在国内外学术期刊发表论文 11 篇，参编《中国城市群地图集》学术著作一部。",
    "担任国家自然科学基金委通讯评审专家、河南省城乡空间数据挖掘院士工作站研究人员、河南省土地学会第二届科普与教育工作委员会委员、中国地理学会会员，并受邀担任《Humanities & Social Sciences Communications》《Scientific Reports》《Environment, Development and Sustainability》《Discover Sustainability》《Networks and Spatial Economics》《Environmental Monitoring and Assessment》等 SSCI、SCI 期刊审稿人。"
  ],

  teaching: ["城乡生态与环境规划", "城市绿地系统规划", "自然地理学", "学年论文"],

  focus: [
    {
      num: "01",
      title: "城镇化与生态环境",
      en: "Urbanization & Eco-environment",
      desc: "研究城镇化过程、空间格局及其生态环境效应。"
    },
    {
      num: "02",
      title: "国土空间规划与开发保护",
      en: "Territorial Spatial Planning",
      desc: "关注国土空间开发、保护与空间优化。"
    },
    {
      num: "03",
      title: "城市更新与住房",
      en: "Urban Renewal & Housing",
      desc: "研究城市更新、住房空间及城市发展问题。"
    },
    {
      num: "04",
      title: "生态福祉",
      en: "Ecological Well-being",
      desc: "关注生态环境、空间公平与居民福祉。"
    },
    {
      num: "05",
      title: "人工智能与城乡规划",
      en: "AI for Urban & Rural Planning",
      desc: "研究生成式 AI、LLM、AI Agent、机器学习和 GIS 在城乡规划、空间分析、生态优化和城市治理中的应用。",
      featured: true,
      tags: ["Generative AI", "LLM", "AI Agent", "Machine Learning", "GIS"]
    }
  ],

  ai: {
    title: "AI × Planning",
    sub: "Artificial Intelligence for Urban & Rural Planning",
    statement: "不仅研究人工智能技术本身，更研究如何把人工智能应用于城乡规划与空间科学。",
    flow: [
      { en: "AI", zh: "人工智能" },
      { en: "Data", zh: "数据" },
      { en: "GIS", zh: "地理信息系统" },
      { en: "Planning", zh: "规划" },
      { en: "City", zh: "城市" }
    ],
    directions: [
      {
        title: "AI Planning",
        desc: "生成式 AI、LLM、AI Agent 与规划分析、规划决策、空间方案生成。"
      },
      {
        title: "AI Ecosystem",
        desc: "AI、人、数据、空间与生态系统之间的协同关系。"
      },
      {
        title: "AI City",
        desc: "AI 驱动的城市空间分析、城市治理和城市智能。"
      }
    ]
  },

  papers: [
    {
      authors: "Li Jiangang, Lei Jun*, Li Songhong, et al.",
      title: "Spatiotemporal analysis of the relationship between urbanization and the eco-environment in the Kashgar Metropolitan Area, China",
      journal: "Ecological Indicators",
      year: 2022,
      detail: "135: 108524",
      doi: "10.1016/j.ecolind.2021.108524",
      note: "SCI 收录，IF=7.0，JCR 一区，中科院二区",
      tags: ["Urbanization", "Ecology"],
      lang: "en",
      selected: true,
      highlight: true
    },
    {
      authors: "Li Jiangang, Li Songhong, Lei Jun*, et al.",
      title: "Analysis of spatial structure in the Kashgar Metropolitan Area, China",
      journal: "Land",
      year: 2022,
      detail: "11(6): 823",
      doi: "10.3390/land11060823",
      note: "SSCI 收录，IF=3.4，JCR 二区，中科院三区",
      tags: ["Spatial Structure", "Spatial Analysis"],
      lang: "en",
      selected: true,
      highlight: true
    },
    {
      authors: "李建刚, 雷军*, 段祖亮, 等",
      title: "新疆县域城镇化时空格局演变特征及影响因素",
      journal: "中国科学院大学学报",
      year: 2019,
      detail: "36(06): 774-783",
      doi: "",
      note: "CSCD，北大核心",
      tags: ["Urbanization", "Spatial Analysis"],
      lang: "zh",
      selected: true,
      highlight: true
    },
    {
      authors: "Li Songhong, Li Jiangang, Wang Hongwei, et al.",
      title: "Impact of transport superiority on ecosystem health in arid regions: A case study of southern Xinjiang, China",
      journal: "Ecological Indicators",
      year: 2024,
      detail: "162: 112054",
      doi: "10.1016/j.ecolind.2024.112054",
      note: "SCI 收录，IF=7.0，JCR 一区，中科院二区",
      tags: ["Ecosystem Health", "Transport"],
      lang: "en",
      selected: true
    },
    {
      authors: "雷军, 李建刚, 段祖亮, 杨振",
      title: "喀什城市圈城镇化与生态环境交互胁迫效应研究综述",
      journal: "干旱区地理",
      year: 2018,
      detail: "41(06): 1358-1366",
      doi: "",
      note: "CSCD，北大核心",
      tags: ["Urbanization", "Ecology", "Review"],
      lang: "zh",
      selected: true
    },
    {
      authors: "Zhen Yang, Lei Jun*, Li Jiangang*",
      title: "Identifying the Determinants of Urbanization in Prefecture-Level Cities in China: A Quantitative Analysis Based on Spatial Production Theory",
      journal: "Sustainability",
      year: 2019,
      detail: "11(4): 1204",
      doi: "10.3390/su11041204",
      note: "SSCI & SCI 收录，IF=3.889，JCR 二区，中科院三区",
      tags: ["Urbanization", "Spatial Production"],
      lang: "en",
      highlight: true
    },
    {
      authors: "孙继明, 李建刚, 雷军*, 杨振, 段祖亮",
      title: "新疆县域人力资源时空差异及影响因素分析",
      journal: "干旱区地理",
      year: 2022,
      detail: "45(02): 660-669",
      doi: "",
      note: "CSCD，北大核心",
      tags: ["Human Resources", "Spatial Analysis"],
      lang: "zh"
    },
    {
      authors: "杨振, 张小雷, 李建刚, 雷军*, 段祖亮",
      title: "中国地级单元城镇化与经济发展关系的时空格局——基于2000年和2010年人口普查数据的探析",
      journal: "地理研究",
      year: 2020,
      detail: "39(01): 25-40",
      doi: "",
      note: "CSSCI，CSCD，北大核心",
      tags: ["Urbanization", "Regional Economy"],
      lang: "zh"
    }
  ],

  projects: [
    {
      name: "国家自然科学基金青年科学基金项目（C类）",
      category: "国家自然科学基金 · NSFC",
      number: "42401242",
      fund: "30 万元",
      time: "2025.01 – 2027.12",
      role: "主持",
      status: "",
      featured: true
    },
    {
      name: "河南省博士后科研资助项目",
      category: "省级 · 博士后资助",
      number: "HN2024149",
      fund: "10 万元",
      time: "2025.01 – 2026.12",
      role: "主持",
      status: ""
    },
    {
      name: "河南省科技攻关项目",
      category: "省级 · 科技攻关",
      number: "242102320231",
      fund: "",
      time: "2024.01 – 2025.12",
      role: "主持",
      status: ""
    },
    {
      name: "教学改革项目",
      category: "教学研究",
      number: "PX-27241012",
      fund: "",
      time: "2024.03 – 2026.02",
      role: "主持",
      status: ""
    },
    {
      name: "国家级科研项目培育项目",
      category: "培育项目",
      number: "22HNCDXJ23",
      fund: "3 万元",
      time: "2023.06 – 2024.12",
      role: "主持",
      status: "已结项"
    },
    {
      // 来自旧版主页；如不再需要，删除本条即可（仅在简历页显示）
      name: "博士科研启动资助项目",
      category: "科研启动",
      number: "800895",
      fund: "10 万元",
      time: "2024.01 – 2026.12",
      role: "主持",
      status: "",
      homepage: false
    }
  ],

  projectsNote:
    "同时参与国家自然科学基金面上项目、中国科学院 A 类先导专项，以及泌阳县、石龙区等地方政府委托的“十五五”规划等各级各类项目。",

  policy: {
    eyebrow: "Policy Adoption · 2026",
    title: "关于在高质量发展背景下深化失业保险扩面的建议",
    fullTitle: "《破除制度壁垒，织密兜底防线——关于在高质量发展背景下深化失业保险扩面的建议》",
    summary:
      "经河南省人民政府办公厅信息调研室整理，以《河南省：关于扩大失业保险覆盖面的建议》上报国办；2026 年 1 月被国办信息刊物《每日信息摘报》采纳，并获领导人批示。",
    steps: [
      { label: "撰写建议", desc: "《破除制度壁垒，织密兜底防线——关于在高质量发展背景下深化失业保险扩面的建议》" },
      { label: "省级整理", desc: "河南省人民政府办公厅信息调研室整理" },
      { label: "上报国办", desc: "以《河南省：关于扩大失业保险覆盖面的建议》上报国务院办公厅" },
      { label: "采纳与批示", desc: "2026 年 1 月被国办信息刊物《每日信息摘报》采纳，并获领导人批示" }
    ]
  },

  honors: [
    { text: "指导学生参加第十七届“挑战杯”河南省大学生课外学术科技作品竞赛，获得二等奖", level: "二等奖" },
    { text: "指导学生参加“新蚁族杯”第七届中国高校地理科学展示大赛，获得三等奖", level: "三等奖" },
    { text: "指导学生参加河南省第四届大学生土地国情调查大赛，获得特等奖、一等奖和二等奖各 1 次，同时荣获优秀指导教师 2 次", level: "特等奖 · 一等奖 · 二等奖" },
    { text: "指导学生参加 2023“印记中原”河南省大学生乡村设计大赛，获得三等奖", level: "三等奖" },
    { text: "2024 年河南省土地学会学术年会报告，荣获一等奖", level: "一等奖" }
  ],

  service: {
    roles: [
      "国家自然科学基金委通讯评审专家",
      "河南省城乡空间数据挖掘院士工作站研究人员",
      "河南省土地学会第二届科普与教育工作委员会委员",
      "中国地理学会会员",
      "SSCI / SCI 期刊审稿人"
    ],
    journals: [
      "Humanities & Social Sciences Communications",
      "Scientific Reports",
      "Environment, Development and Sustainability",
      "Discover Sustainability",
      "Networks and Spatial Economics",
      "Environmental Monitoring and Assessment"
    ]
  },

  recruiting: {
    title: "加入课题组",
    en: "Join the Research Group",
    subtitle: "在真实科研问题中学习空间分析、科研方法与人工智能工具。",
    focus: ["城镇化生态环境效应", "国土空间开发与保护", "城市更新", "生态福祉", "城市住房", "人工智能与城乡规划"],
    items: [
      { num: "01", title: "算力支持", en: "Computing", desc: "配备高性能科研工作站，为空间计算、AI 模型与科研实验提供算力支持。" },
      { num: "02", title: "科研导向", en: "Research-first", desc: "尽可能减少与科研无关的事务，让学生把主要精力投入科研训练。" },
      { num: "03", title: "全过程培养", en: "Full-cycle Training", desc: "从科研问题发现、数据处理、模型构建到论文写作，系统训练研究能力。" },
      { num: "04", title: "成果激励", en: "Incentives", desc: "根据科研工作量给予相应补助，并支持参加学术会议与学科竞赛。" }
    ],
    closing: "欢迎对科研怀抱热忱的本科生和研究生加入课题组",
    howTo: "有意者请通过邮件联系，简要介绍个人情况与研究兴趣。"
  },

  contact: {
    email: ["lijiangang16@mails.ucas.ac.cn", "lijiangang2022@huel.edu.cn"],
    office: ["河南财经政法大学（郑东校区）", "图书馆 1262 办公室"]
  },

  // 只保留有真实链接的账号；Google Scholar / ORCID / ResearchGate 等有链接后再补充
  links: [
    { label: "GitHub", url: "https://github.com/ljiangang412-ai" }
  ],

  // 访客统计（第三方服务「不蒜子」，GitHub Pages 是纯静态的，自身无法计数）
  //   enabled  : false 即完全关闭，连脚本都不会加载
  //   provider : "ibruce"（原版 busuanzi.ibruce.info）或 "busuanzi.cc"（CoolCat 的另一套实现）
  //              两家是各自独立的服务，数据不互通，换一家等于从 0 重新计数
  //   数字加载失败时页脚这一行会自动隐藏，不会显示 0 或空白
  counter: {
    enabled: true,
    provider: "ibruce",
    showUv: true,
    showPv: true,
    labelUv: "访客",
    labelPv: "访问"
  },

  footer: {
    line1: "李建刚 · Academic Homepage",
    line2: "Henan University of Economics and Law",
    line3: "AI × Planning × Spatial Intelligence"
  }
};
