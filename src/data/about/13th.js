import logo from "@/assets/images/13th/logo.jpg";
import logoText from "@/assets/images/13th/logo_text.png";
import logo2 from "@/assets/images/logo2.png";
import president from "@/assets/images/13th/UTSA_President.jpg";
import publicRelations from "@/assets/images/13th/UTSA_PublicRelations.jpg";
import generalAffairs from "@/assets/images/13th/UTSA_GeneralAffairs.jpg";
import studentRights from "@/assets/images/13th/UTSA_StudentRights.jpg";
import information from "@/assets/images/13th/UTSA_Information.png";

export default {
  studentAssociation: {
    leaders: [
      { image: president, title: "會長", name: "王詩涵" },
      { image: logo, title: "博愛校區副會長", name: "宋名軒" },
      { image: logo, title: "天母校區副會長", name: "唐郁淋" },
    ],
    departments: [
      {
        image: logo,
        name: "秘書部長：陳佳君",
        description:
          "秘書部負責文書、檔案、通知、紀錄等，例如法規修訂、會議記錄等等都由秘書部負責。如果你擅長統整資料，那秘書部會是一個非常適合你發揮的地方。",
      },
      {
        image: generalAffairs,
        name: "總務部長：王子群",
        description:
          "總務部負責會費出納、會計、預算書與決算書編制、庶務、場地與器材管理。適合對數字敏感、擅長使用Excel，做事細心又謹慎的同學。",
        reverse: true,
      },
      {
        image: publicRelations,
        name: "公關部長：程姿瑜",
        description:
          "公關部負責學生會校內外聯絡、協調、宣傳等。也負責經營社群、撰寫文案與設計圖像。如果你文筆流暢，又樂於表達自己的想法，或對美感有一定敏銳度，想要看到自己的設計變成真正的實體周邊或海報。那公關部會非常適合你！",
      },
      {
        image: logo,
        name: "文化部長：林學寬",
        description:
          "文化部負責全校系活動籌畫，此部門的同學通常都很活潑，也很有創意和執行力。如果你想和他們一起舉辦能讓大家留下美好回憶的活動，文化部等你來加入！",
        reverse: true,
      },
      {
        image: studentRights,
        name: "學權部長：翁詩涵",
        description:
          "學權部負責處理學生權益與義務事宜，他們關注社會議題，重視學生基本權益。適合有主見，願意分析議題進行論述，並為大眾站出來的同學加入。",
      },
      {
        image: information,
        name: "資訊部長：張育綸",
        description:
          "資訊部負責個資控管、檔案管理以及網站與系統的開發維護。適合有基礎電腦使用能力，願意邊學邊做，且對資訊科技有熱忱的同學。",
        reverse: true,
      },
    ],
  },
  studentCouncil: {
    leaders: [
      { image: logo2, title: "議長", name: "簡廷宇" },
      { image: logo2, title: "副議長", name: "呂芷婕" },
    ],
    departments: [
      {
        image: logo2,
        name: "大會",
        description: "議會最高決策會議，由全體議員組成，處理重大決策與表決。",
      },
      {
        image: logo2,
        name: "委員會",
        description: "依議題設置專責委員會，深入審查與研究各類提案。",
        reverse: true,
      },
      {
        image: logo2,
        name: "秘書處",
        description:
          "學生議會的行政核心，負責議事支援、文書處理與人事培訓，確保議會運作順暢。<br>設有文書組、議事組、公關組與人事組。",
      },
    ],
  },
  resources: [
    { image: logoText, title: "學生會 LOGO" },
    { image: logo2, title: "學生議會 LOGO" },
  ],
};
