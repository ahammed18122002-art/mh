/* =====================================================================
   এই ফাইলটাই আপনার পোর্টফোলিওর "কন্টেন্ট বক্স"।
   নতুন কিছু যোগ করতে চাইলে লিস্টের একটা { ... } ব্লক কপি করে বসান।
   HTML বা CSS ছুঁতে হবে না।

   ছবি যোগ করার নিয়ম (কোনো ফোল্ডার নেই, সব ফাইল একই জায়গায়):
   1. নতুন ছবি index.html এর পাশেই রাখুন, নাম দিন পরের নম্বর: 5.jpg, 6.jpg ...
   2. এখানে image: "5.jpg" লিখুন
   ছবি না পেলে আপনা আপনি একটা প্লেসহোল্ডার দেখাবে।
   বর্তমান ছবি: 1.jpg = প্রোফাইল, 2.jpg = Arena, 3.jpg = Hackers Meet, 4.jpg = Net-X
   ===================================================================== */
window.SITE = {

  /* ---------- প্রোফাইল ---------- */
  profile: {
    name: "MD. Ahammed",
    tagline: "Multidisciplinary Cyber & Tech Professional",
    photo: "1.jpg",
    status: "Open for research and security audits",
    roles: [
      { icon: "fa-solid fa-shield-halved", label: "Cybersecurity Researcher" },
      { icon: "fa-solid fa-bug", label: "Web Pentester" },
      { icon: "fa-solid fa-fingerprint", label: "OSINT Specialist" },
      { icon: "fa-solid fa-pen-nib", label: "Senior Graphic & Web Designer" }
    ],
    lede: "I came across your project description and noticed you are looking for an expert in Web Security, OSINT, and Design. With my combination of skills as a Cybersecurity Researcher, OSINT Specialist and Web Pentester alongside my background as a Senior Graphic and Web Designer, I can deliver an end-to-end solution that makes your project both visually stunning and highly secure.",
    hireUrl: "https://wa.me/8801622003683"
  },

  /* ---------- সোশ্যাল লিংক (শুধু https:// বা mailto: চলবে) ---------- */
  socials: [
    { icon: "fa-brands fa-github", label: "GitHub", url: "https://github.com/ahammed18122002-art" },
    { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", url: "https://linkedin.com" },   // TODO: নিজের প্রোফাইল লিংক দিন
    { icon: "fa-brands fa-whatsapp", label: "WhatsApp", url: "https://wa.me/8801622003683" }
  ],

  /* ---------- হিরো সেকশনের সংখ্যা ---------- */
  stats: [
    { n: 3, suffix: "+", label: "Years in security" },
    { n: 2, suffix: "+", label: "Years in web design" },
    { n: 3, suffix: "+", label: "Years in graphic design" },
    { n: 4, suffix: "+", label: "Years as assistant admin" },
    { n: 1, suffix: "+", label: "Year in research" },
    { n: 716, suffix: "+", label: "Orders, projects and audits" }
  ],

  /* ---------- Trust সেকশন ---------- */
  trust: [
    { n: 375, suffix: "+", label: "Projects completed" },
    { n: 375, suffix: "+", label: "Happy clients" },
    { n: 100, suffix: "%", label: "Clean security guarantee" },
    { n: 90, suffix: "%", label: "Repeat client rate" }
  ],
  trustNote: "Video call consultations and full audit reports with every project.",

  /* ---------- রিসার্চ পেপার (নতুন পেপার যোগ করতে ব্লক কপি করুন) ---------- */
  papers: [
    {
      tag: "IEEE / Conference",
      year: "2026",
      title: "About RAT (Remote Access Trojan)",
      authors: "MD. Ahammed, Collaborator Name",   // TODO: সহলেখকের আসল নাম দিন
      desc: "A Remote Access Trojan is essentially the ultimate invisible backdoor. Unlike malware that disrupts your machine immediately, a RAT operates in complete silence. It slips past defenses disguised as standard software, establishes an encrypted link back to an attacker's C2 server, and hands over complete control: live screen capture, credential harvesting, and remote command execution without raising alarms.",
      paperUrl: "https://drive.google.com/file/d/1JygdNfbKx59ii01BxaDUEa1RJ446ZEGw/view?usp=sharing",
      codeUrl: "https://ahammed18122002-art.github.io/deficit-page/",
      image: ""   // চাইলে: "9.jpg"
    }
  ],

  /* ---------- প্রজেক্ট / টুলস ---------- */
  projects: [
    { icon: "fa-solid fa-shield-virus", title: "PHP Backdoor Scanner", desc: "A fast CLI tool that scans PHP codebases for eval, unvalidated base64 decoders, and anomalous web shell payloads.", url: "https://github.com/ahammed18122002-art" },
    { icon: "fa-solid fa-magnifying-glass", title: "OSINT Threat Extractor", desc: "Python script that harvests and cross-references breached credentials, exposed server metadata, and digital attack surfaces.", url: "https://github.com/ahammed18122002-art" },
    { icon: "fa-solid fa-lock", title: "WP-Hardening Automator", desc: "A Bash utility that hardens production WordPress directory permissions, sets secure headers, and blocks common attack URIs.", url: "https://github.com/ahammed18122002-art" }
  ],

  /* ---------- About ---------- */
  about: {
    heading: "Where creative design meets offensive defense",
    paras: [
      "Hello, I'm MD. Ahammed. I bridge the gap between creative visual architecture and offensive cyber defense. As a Cybersecurity Researcher and Web Pentester, I dissect modern web infrastructures, identify critical vulnerabilities, and secure dynamic code execution pathways before threat actors can exploit them.",
      "Beyond core offensive security, I work as an OSINT Specialist, uncovering hidden threat vectors and actionable intelligence across open data surfaces. As a Senior Graphic and Web Designer I also understand a system's design, user flow, and frontend logic from the ground up. Whether I am engineering clean digital experiences or stress-testing applications against complex exploits, I build with purpose and defend with precision."
    ],
    credentials: [
      "Certified Ethical Hacker & Freelancing (CEHF)",
      "Web Application Penetration Tester",
      "Independent Security Researcher",
      "Senior graphic designer",
      "Administrative assistant"
    ],
    education: [
      "BBA in Management (running)",
      "Certified Ethical Hacker & Freelancing (CEHF) in AWS (running)",
      "Cybersecurity Attack and Defense Fundamentals, EC-Council (Coursera)",
      "Microsoft IT Support Specialist, Microsoft (Coursera)",
      "Microsoft Business Analyst, Microsoft (Coursera)",
      "Google IT Automation with Python, Google (Coursera)",
      "Google Data Analytics, Google (Coursera)",
      "Getting started with Google Workspace, Google (Coursera)"
    ]
  },

  /* ---------- স্কিল ---------- */
  skills: [
    { icon: "fa-solid fa-shield-halved", title: "Vulnerability Research", tags: ["Static Analysis (SAST)", "Dynamic Analysis (DAST)", "OWASP Top 10", "SQLi & XSS", "AST Parsing"] },
    { icon: "fa-solid fa-terminal", title: "Tools & Testing", tags: ["Burp Suite Pro", "Nmap", "Wireshark", "Metasploit", "Linux / Bash"] },
    { icon: "fa-solid fa-code", title: "Programming & Scripting", tags: ["Python", "JavaScript / Node", "HTML"] },
    { icon: "fa-solid fa-user-secret", title: "Threat Intelligence & OSINT", tags: ["Digital Forensics", "Recon-ng", "Maltego", "Exposure Verification"] }
  ],

  /* ---------- Success Stories / Achievements (এখানে আরও যোগ করুন) ---------- */
  stories: [
    { badge: "Cyber Leader", title: "Arena Web Security", image: "2.jpg",
      desc: "A premier cybersecurity firm and training institute headquartered in Dhaka, Bangladesh. They serve government ministries, military branches, banks, educational institutions, and private companies, offering consultancy, penetration testing, VAPT, firewall configuration, and digital forensics." },
    { badge: "AWS Members", title: "Hackers Meet", image: "5.jpg",
      desc: "A community meet-up serving government, military, banks, educational institutions, and private companies, focused on securing digital platforms and building global-standard cybersecurity skills." },
    { badge: "Cyber Community", title: "Founder of Net-X", image: "4.jpg",
      desc: "As the Founder of Net-X Cyber Community, I lead an active network of ethical hackers, security researchers, and cyber defenders closing the gap between theory and real-world offensive defense, with hands-on work in Web Penetration Testing, Threat Intelligence, and OSINT." }
  ],

  /* ---------- ক্লায়েন্ট রিভিউয়ের স্ক্রিনশট ---------- */
  reviews: [
    // রিভিউয়ের স্ক্রিনশট পেলে 5.jpg এভাবে রেখে নিচের লাইনের // তুলে দিন।
    // যতক্ষণ লিস্ট খালি, ততক্ষণ রিভিউ সেকশনটা সাইটে দেখাবে না।
    // { image: "5.jpg", alt: "Client review 1" },
  ],


  /* ---------- এক্সপেরিয়েন্স ---------- */
  experience: [
    { date: "2023 to present", role: "Senior Graphic & Web Designer", org: "Freelance / Local IT Firm", desc: "Transforming complex ideas into intuitive, high-converting digital products and compelling visual identities. Specializing in responsive web architecture, user-centric UI/UX design, and full-scale brand ecosystems." },
    { date: "2025 to present", role: "Web Security Analyst", org: "Freelance / Local IT Firm", desc: "Audited web applications, performed root-cause analysis for hacked sites, and authored technical incident reports for clients." },
    { date: "2022 to present", role: "Administrative Assistant", org: "Local IT Firm", desc: "Calendar management, client correspondence, and workflow organization. Proficient in Google Workspace, Microsoft Office, and modern project management platforms." },
    { date: "2021 to present", role: "High-performance Digital Marketing", org: "IT Firm", desc: "Scaling brands through technical SEO, targeted social media campaigns, high-authority content, and retention-driven email marketing." }
  ],

  /* ---------- গ্যালারি / ইভেন্ট ---------- */
  gallery: [
    { image: "2.jpg", caption: "AWS cyber leadership" },
    { image: "3.jpg", caption: "Cyber leadership summit" },
    { image: "4.jpg", caption: "Net-X cyber community" }
    // নতুন ছবি: 5.jpg রেখে এখানে একটা লাইন যোগ করুন
  ],


  /* ---------- টার্মিনালের কুইজ ---------- */
  quiz: [
    { q: "Which HTTP status code means 'Forbidden'?", a: "403" },
    { q: "Default port for HTTPS?", a: "443" },
    { q: "Which attack injects malicious SQL queries? (sqli / xss / csrf)", a: "sqli" },
    { q: "Which tool is the 'Swiss Army Knife' of web pentesting? (burp / wireshark)", a: "burp" }
  ]
};
