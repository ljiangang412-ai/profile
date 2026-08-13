// ============================================================
// 个人主页数据文件 —— 手动更新此文件即可，保存后刷新页面
// 格式说明：
//   name      : 姓名
//   role      : 职称/头衔，用 · 分隔
//   heroTitle : 首页大标题（一般为姓名）
//   heroIntro : 首页副标题（一句话介绍）
//   avatar    : 头像图片文件名（放在本文件夹，如 photo.jpg）；没有照片填 "" 会显示姓名首字
//   profile   : 个人简介（可多行，用 \n 分段）
//   contact   : 联系方式
//   papers    : 代表性论文（note 为收录情况；highlight: true 表示加亮显示，一般是第一作者/通讯）
//   projects  : 科研项目（status 可写 主持/已结项 等）
//   honors    : 荣誉与指导学生获奖
// ============================================================

const PROFILE_DATA = {
  name: "李建刚",
  role: "博士 · 博士后 · 讲师 · 硕士研究生导师",
  heroTitle: "李建刚",
  heroIntro: "研究城镇化生态环境效应 · 国土空间开发与保护 · 城市更新",
  avatar: "",

  profile:
    "李建刚，博士，博士后，讲师，硕士研究生导师。\n" +
    "承担《城乡生态与环境规划》《城市绿地系统规划》《自然地理学》《学年论文》等本科生课程教学工作。在国内外学术期刊上已发表论文 11 篇，参编《中国城市群地图集》学术著作一部。\n" ,

  positions: [
    "国家自然科学基金委通讯评审专家",
    "河南省城乡空间数据挖掘院士工作站研究人员",
    "中国地理学会会员",
    "《Humanities & Social Sciences Communications》《Scientific Reports》《Environment, Development and Sustainability》《Discover Sustainability》《Networks and Spatial Economics》《Environmental Monitoring and Assessment》等 SSCI、SCI 期刊审稿人"
  ],

  contact: {
    email: ["lijiangang16@mails.ucas.ac.cn", "lijiangang2022@huel.edu.cn"],
    office: "河南财经政法大学（郑东校区）图书馆 1262 办公室"
  },

  papers: [
    {
      authors: "Li Jiangang, Lei Jun*, Li Songhong, et al.",
      title: "Spatiotemporal analysis of the relationship between urbanization and the eco-environment in the Kashgar Metropolitan Area, China",
      journal: "Ecological Indicators",
      year: 2022,
      detail: "2022, 135: 108524",
      note: "SCI 收录，IF=7.0，JCR 一区，中科院二区",
      highlight: true
    },
    {
      authors: "Li Jiangang, Li Songhong, Lei Jun*, et al.",
      title: "Analysis of spatial structure in the Kashgar Metropolitan Area, China",
      journal: "Land",
      year: 2022,
      detail: "2022, 11(6): 823",
      note: "SSCI 收录，IF=3.4，JCR 二区，中科院三区",
      highlight: true
    },
    {
      authors: "李建刚, 雷军*, 段祖亮, 等",
      title: "新疆县域城镇化时空格局演变特征及影响因素",
      journal: "中国科学院大学学报",
      year: 2019,
      detail: "2019, 36(06): 774-783",
      note: "CSCD，北大核心",
      highlight: true
    },
    {
      authors: "Li Songhong, Li Jiangang, Wang Hongwei, et al.",
      title: "Impact of transport superiority on ecosystem health in arid regions: A case study of southern Xinjiang, China",
      journal: "Ecological Indicators",
      year: 2024,
      detail: "2024, 162: 112054",
      note: "SCI 收录，IF=7.0，JCR 一区，中科院二区"
    },
    {
      authors: "Zhen Yang, Lei Jun*, Li Jiangang*",
      title: "Identifying the Determinants of Urbanization in Prefecture-Level Cities in China: A Quantitative Analysis Based on Spatial Production Theory",
      journal: "Sustainability",
      year: 2019,
      detail: "2019, 11(4): 1204",
      note: "SSCI & SCI 收录，IF=3.889，JCR 二区，中科院三区",
      highlight: true
    },
    {
      authors: "雷军, 李建刚, 段祖亮, 杨振",
      title: "喀什城市圈城镇化与生态环境交互胁迫效应研究综述",
      journal: "干旱区地理",
      year: 2018,
      detail: "2018, 41(06): 1358-1366",
      note: "CSCD，北大核心"
    },
    {
      authors: "孙继明, 李建刚, 雷军*, 杨振, 段祖亮",
      title: "新疆县域人力资源时空差异及影响因素分析",
      journal: "干旱区地理",
      year: 2022,
      detail: "2022, 45(02): 660-669",
      note: "CSCD，北大核心"
    },
    {
      authors: "杨振, 张小雷, 李建刚, 雷军*, 段祖亮",
      title: "中国地级单元城镇化与经济发展关系的时空格局——基于2000年和2010年人口普查数据的探析",
      journal: "地理研究",
      year: 2020,
      detail: "2020, 39(01): 25-40",
      note: "CSSCI，CSCD，北大核心"
    }
  ],

  projects: [
    {
      name: "国家自然科学基金青年科学基金项目（C类）",
      number: "42401242",
      fund: "30 万元",
      time: "2025.01 - 2027.12",
      status: "主持"
    },
    {
      name: "河南省博士后科研资助项目",
      number: "HN2024149",
      fund: "10 万元",
      time: "2025.01 - 2026.12",
      status: "主持"
    },
    {
      name: "博士科研启动资助项目",
      number: "800895",
      fund: "10 万元",
      time: "2024.01 - 2026.12",
      status: "主持"
    },
    {
      name: "国家级科研项目培育项目",
      number: "22HNCDXJ23",
      fund: "3 万元",
      time: "2023.06 - 2024.12",
      status: "主持，已结项"
    }
  ],

  honors: [
    "指导学生参加第十七届 “挑战杯”河南省大学生课外学术科技作品竞赛，获得二等奖",
    "指导学生参加“新蚁族杯”第七届中国高校地理科学展示大赛，获三等奖",
    "指导学生参加河南省第四届大学生土地国情调查大赛，获特等奖、一等奖、二等奖各 1 次，获优秀指导教师 2 次",
    "指导学生参加 2023“印记中原”河南省大学生乡村设计大赛，获三等奖",
    "2024 年河南省土地学会学术年会报告，荣获一等奖"
  ],

  recruiting: {
    title: "加入我们",
    subtitle: "欢迎对科研怀抱热忱的本科生和研究生加入课题组",
    intro:
      "课题组聚焦城镇化生态环境效应、国土空间开发与保护等方向的研究，" +
      "现面向校内外招募对科研感兴趣、有热情、有毅力的本科生和研究生。",
    items: [
      "团队配备高性能科研工作站，提供充足的算力支持",
      "专注科研本身，无行政杂务，心无旁骛做研究",
      "按工作量发放科研补助，多劳多得",
      "提供论文写作、学术会议、学科竞赛等成长平台"
    ],
    closing: "期待热爱科研的你加入，共同探索城乡空间的科学问题，有意者请邮件联系。"
  }
};
