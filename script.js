document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("siteHeader");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const themeToggle = document.getElementById("themeToggle");
  const chatToggle = document.getElementById("chatToggle");
  const chatPanel = document.getElementById("chatPanel");
  const chatClose = document.getElementById("chatClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const scrollTop = document.getElementById("scrollTop");
  const scrollProgress = document.getElementById("scrollProgress");
  const mouseGlow = document.getElementById("mouseGlow");
  const typedRole = document.getElementById("typedRole");
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  const submitButtonText = document.getElementById("submitButtonText");
  const themeClass = document.documentElement;
  const typedWords = [
    "Software Developer",
    "AI/ML Enthusiast",
    "Full Stack Developer",
    "Data Analytics Enthusiast",
    "Problem Solver",
  ];

  function setTheme(theme) {
    if (theme === "light") {
      themeClass.classList.add("theme-light");
      themeClass.classList.remove("theme-dark");
      localStorage.setItem("siteTheme", "light");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      themeClass.classList.add("theme-dark");
      themeClass.classList.remove("theme-light");
      localStorage.setItem("siteTheme", "dark");
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  const savedTheme = localStorage.getItem("siteTheme");
  setTheme(savedTheme === "light" ? "light" : "dark");

  mobileMenuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  themeToggle.addEventListener("click", function () {
    const isLight = themeClass.classList.contains("theme-light");
    setTheme(isLight ? "dark" : "light");
  });

  const typed = {
    index: 0,
    charIndex: 0,
    deleting: false,
  };

  function updateTyped() {
    const word = typedWords[typed.index];
    if (!typed.deleting) {
      typed.charIndex += 1;
      typedRole.textContent = word.slice(0, typed.charIndex);
      if (typed.charIndex === word.length) {
        typed.deleting = true;
        setTimeout(updateTyped, 1600);
        return;
      }
    } else {
      typed.charIndex -= 1;
      typedRole.textContent = word.slice(0, typed.charIndex);
      if (typed.charIndex === 0) {
        typed.deleting = false;
        typed.index = (typed.index + 1) % typedWords.length;
      }
    }
    setTimeout(updateTyped, typed.deleting ? 35 : 75);
  }
  updateTyped();

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY > 20;
    if (scrolled) siteHeader.classList.add("scrolled"); else siteHeader.classList.remove("scrolled");
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollProgress.style.width = progress + "%";
    if (window.scrollY > 500) {
      scrollTop.classList.add("visible");
    } else {
      scrollTop.classList.remove("visible");
    }
  });

  scrollTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("mousemove", function (event) {
    if (!mouseGlow) return;
    mouseGlow.style.transform = `translate(${event.clientX - 300}px, ${event.clientY - 300}px)`;
  });

  function addChatMessage(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  const defaultBotMessage = "Hi! I'm Gopesh's AI assistant. Ask me about his skills, projects, or how to get in touch.";
  addChatMessage("bot", defaultBotMessage);

  function botReply(input) {
    const question = input.toLowerCase();
    const responses = [
      { keys: ["about", "who", "you"], a: "I'm Gopesh S — a B.Tech IT student passionate about software development, AI/ML, and building modern web experiences." },
      { keys: ["skill", "tech", "stack"], a: "My core stack: Java, Python, JavaScript/TypeScript, React, Node.js, MySQL, plus ML with Scikit-learn, LLMs, and data analytics." },
      { keys: ["project", "work", "portfolio"], a: "Highlights: Car Service Management (full-stack), Fraud Detection (ML), Crime Hotspot Detection, and Smart Food Spoilage Detection. Scroll to Projects to explore." },
      { keys: ["resume", "cv"], a: "You can grab my resume here: https://drive.google.com/file/d/1E2XGuMTp9lB9H7PHC3Ff9ToCYDSibJSf/view" },
      { keys: ["intern", "experience"], a: "I've interned at CYFOTOK INFOSEC (Web Dev, June 2025) and EROSPARK (UI/UX, Dec 2025)." },
      { keys: ["education", "study", "college"], a: "B.Tech IT at Nandha Engineering College (2024–2027, CGPA 7.5). Diploma in CS (82%) and SSLC before that." },
      { keys: ["contact", "email", "reach", "hire"], a: "Reach me at gopeshmuhil@gmail.com or +91 99767 68999. Or scroll to the Contact section." },
      { keys: ["objective", "goal", "career"], a: "To build meaningful, intelligent products by pairing strong engineering fundamentals with AI/ML — ideally on teams that value craft." },
    ];
    for (const item of responses) {
      if (item.keys.some((key) => question.includes(key))) return item.a;
    }
    return "I can chat about my skills, projects, resume, internships, education, or how to contact me. What would you like to know?";
  }

  chatToggle.addEventListener("click", function () {
    chatPanel.classList.toggle("hidden");
  });
  chatClose.addEventListener("click", function () {
    chatPanel.classList.add("hidden");
  });

  Array.from(document.querySelectorAll(".chat-suggestions button")).forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.textContent || "";
      chatInput.value = value;
      sendChatMessage();
    });
  });

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addChatMessage("user", text);
    chatInput.value = "";
    setTimeout(function () {
      addChatMessage("bot", botReply(text));
    }, 500);
  }

  chatSend.addEventListener("click", sendChatMessage);
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { event.preventDefault(); sendChatMessage(); }
  });

  function showOnScroll() {
    document.querySelectorAll(".animate-on-scroll").forEach(function (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        element.classList.add("visible");
      }
    });
  }

  showOnScroll();
  window.addEventListener("scroll", showOnScroll);

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitButtonText.textContent = "Sending…";
    contactStatus.textContent = "";
    setTimeout(function () {
      contactStatus.textContent = "Thanks! I'll get back to you shortly.";
      contactStatus.style.color = "#34d399";
      submitButtonText.textContent = "Message sent";
      contactForm.reset();
    }, 700);
  });
});
