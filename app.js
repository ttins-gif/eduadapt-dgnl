// =========================================================
// TTEdu — Core Application Logic (Sidebar + 20-Q Test + Google OAuth)
// =========================================================

(function () {
  const STORAGE_KEY = "eduadapt_dgnl_state_v2";
  const USERS_KEY = "eduadapt_dgnl_users_v1";
  const SESSION_KEY = "eduadapt_dgnl_session_v1";
  const OWNER_EMAIL = "doletrungtin2110@gmail.com";
  const ADMINS_KEY = "eduadapt_dgnl_admins_v1";
  const CUSTOM_CONTENT_KEY = "eduadapt_dgnl_custom_content_v1";

  let currentUser = null;

  const state = {
    subjectId: CURRICULUM[0].id,
    level: "beginner",
    goal: "concept",
    theme: "light",
    fontScale: 1,
    wideSpacing: false,
    isSpeaking: false,
    quizSubmitted: false
  };

  // Auth DOM
  const a11yBar = document.getElementById("a11y-bar");
  const authGate = document.getElementById("auth-gate");
  const appShell = document.getElementById("app-shell");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authError = document.getElementById("auth-error");
  const btnGoogleOpen = document.getElementById("btn-google-open");
  const btnLogout = document.getElementById("btn-logout");
  const userAvatar = document.getElementById("user-avatar");
  const userDisplayName = document.getElementById("user-display-name");
  const userDisplayEmail = document.getElementById("user-display-email");

  // DOM Elements
  const htmlEl = document.documentElement;
  const a11yLive = document.getElementById("a11y-live");
  const headerLevelBadge = document.getElementById("header-level-badge");

  // Sidebar & Mobile Menu
  const sidebar = document.getElementById("sidebar");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const sidebarButtons = document.querySelectorAll(".sidebar-btn");
  const btnSidebarChangeLevel = document.getElementById("btn-sidebar-change-level");

  const views = {
    generator: document.getElementById("view-generator"),
    practice: document.getElementById("view-practice"),
    mock: document.getElementById("view-mock"),
    diagnostic: document.getElementById("view-diagnostic"),
    sources: document.getElementById("view-sources"),
    profile: document.getElementById("view-profile"),
    admin: document.getElementById("view-admin")
  };

  // Mock Exam DOM
  const btnStartMock = document.getElementById("btn-start-mock");
  const mockStickyBar = document.getElementById("mock-sticky-bar");
  const mockTimerEl = document.getElementById("mock-timer");
  const mockAnsweredCount = document.getElementById("mock-answered-count");
  const btnSubmitMock = document.getElementById("btn-submit-mock");
  const btnRestartMock = document.getElementById("btn-restart-mock");
  const mockResultBox = document.getElementById("mock-result-box");
  const mockExamBody = document.getElementById("mock-exam-body");

  // Admin DOM
  const navAdminBtn = document.getElementById("nav-admin-btn");
  const adminAddRoleForm = document.getElementById("admin-add-role-form");
  const adminNewEmail = document.getElementById("admin-new-email");
  const adminRoleList = document.getElementById("admin-role-list");
  const adminEditSubject = document.getElementById("admin-edit-subject");
  const adminEditLevel = document.getElementById("admin-edit-level");
  const adminEditLessonForm = document.getElementById("admin-edit-lesson-form");
  const adminLessonTitle = document.getElementById("admin-lesson-title");
  const adminLessonSummary = document.getElementById("admin-lesson-summary");
  const adminLessonExample = document.getElementById("admin-lesson-example");
  const adminLessonTakeaway = document.getElementById("admin-lesson-takeaway");
  const btnAdminResetLesson = document.getElementById("btn-admin-reset-lesson");
  const adminAddQuizForm = document.getElementById("admin-add-quiz-form");

  // Onboarding DOM
  const onboardingModal = document.getElementById("onboarding-modal");
  const onbStepAsk = document.getElementById("onb-step-ask");
  const onbStepGuide = document.getElementById("onb-step-guide");
  const btnOnbKnow = document.getElementById("btn-onb-know");
  const btnOnbNew = document.getElementById("btn-onb-new");
  const btnOnbGoDiag = document.getElementById("btn-onb-go-diag");
  const btnOnbStart = document.getElementById("btn-onb-start");

  // Profile DOM
  const sidebarUserBox = document.getElementById("sidebar-user-box");
  const fbUserMenu = document.getElementById("fb-user-menu");
  const fbAvatarTrigger = document.getElementById("fb-avatar-trigger");
  const fbDropdown = document.getElementById("fb-dropdown");
  const fbDropAvatar = document.getElementById("fb-drop-avatar");
  const btnDropOpenProfile = document.getElementById("btn-drop-open-profile");
  const btnDropLevel = document.getElementById("btn-drop-level");
  const btnDropTheme = document.getElementById("btn-drop-theme");
  const btnDropSources = document.getElementById("btn-drop-sources");
  const btnMarkStudied = document.getElementById("btn-mark-studied");
  const profileAvatarLg = document.getElementById("profile-avatar-lg");
  const avatarFileInput = document.getElementById("avatar-file-input");
  const profileHeading = document.getElementById("profile-heading");
  const profileProviderBadge = document.getElementById("profile-provider-badge");
  const profileEmailText = document.getElementById("profile-email-text");
  const profileLevelBadge = document.getElementById("profile-level-badge");
  const profileTargetBadge = document.getElementById("profile-target-badge");
  const profileEditName = document.getElementById("profile-edit-name");
  const profileEditTarget = document.getElementById("profile-edit-target");
  const btnSaveProfile = document.getElementById("btn-save-profile");
  const statLessonsCount = document.getElementById("stat-lessons-count");
  const statQuizzesCount = document.getElementById("stat-quizzes-count");
  const statAvgScore = document.getElementById("stat-avg-score");
  const statDiagScore = document.getElementById("stat-diag-score");
  const profileSubjectProgress = document.getElementById("profile-subject-progress");
  const profileStudiedList = document.getElementById("profile-studied-list");
  const profileQuizHistory = document.getElementById("profile-quiz-history");

  // Generator DOM
  const subjectSelect = document.getElementById("subject-select");
  const levelSelect = document.getElementById("level-select");
  const goalSelect = document.getElementById("goal-select");
  const generatorForm = document.getElementById("generator-form");
  const btnOpenDiag = document.getElementById("btn-open-diagnostic");
  const btnGoPractice = document.getElementById("btn-go-practice");

  // Lecture DOM
  const lectureSubjectTag = document.getElementById("lecture-subject-tag");
  const lectureLevelTag = document.getElementById("lecture-level-tag");
  const lectureGoalTag = document.getElementById("lecture-goal-tag");
  const lectureReadTime = document.getElementById("lecture-read-time");
  const lectureTitle = document.getElementById("lecture-title");
  const lectureSummary = document.getElementById("lecture-summary");
  const lectureObjectives = document.getElementById("lecture-objectives");
  const lectureBody = document.getElementById("lecture-body");
  const lectureExample = document.getElementById("lecture-example");
  const lectureTakeaway = document.getElementById("lecture-takeaway");
  const lectureSourcesList = document.getElementById("lecture-sources-list");

  // Practice DOM
  const practiceSubjectSelect = document.getElementById("practice-subject-select");
  const practiceLevelSelect = document.getElementById("practice-level-select");
  const quizContainer = document.getElementById("quiz-container");
  const quizProgress = document.getElementById("quiz-progress");
  const btnSubmitQuiz = document.getElementById("btn-submit-quiz");
  const btnRetryQuiz = document.getElementById("btn-retry-quiz");
  const adaptiveFeedback = document.getElementById("adaptive-feedback");

  // Diagnostic 2-Mode DOM
  const modeBtnSelf = document.getElementById("mode-btn-self");
  const modeBtnTest = document.getElementById("mode-btn-test");
  const panelSelfSelect = document.getElementById("panel-self-select");
  const panelGuidedTest = document.getElementById("panel-guided-test");
  const levelCards = document.querySelectorAll("[data-level-card]");
  const selfSelectedLabel = document.getElementById("self-selected-label");
  const btnSelfGoStudy = document.getElementById("btn-self-go-study");

  const diagnosticForm = document.getElementById("diagnostic-form");
  const diagProgress = document.getElementById("diag-progress");
  const btnSubmitDiag = document.getElementById("btn-submit-diag");
  const btnRetryDiag = document.getElementById("btn-retry-diag");
  const diagResult = document.getElementById("diag-result");

  // Sources Directory DOM
  const allSourcesGrid = document.getElementById("all-sources-grid");

  // Accessibility DOM
  const btnFontDec = document.getElementById("font-dec");
  const btnFontReset = document.getElementById("font-reset");
  const btnFontInc = document.getElementById("font-inc");
  const themeButtons = document.querySelectorAll("[data-theme-btn]");
  const btnToggleSpacing = document.getElementById("toggle-spacing");
  const btnTts = document.getElementById("tts-btn");

  // ---------------------------------------------------------
  // Storage & Helpers
  // ---------------------------------------------------------
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        Object.assign(state, saved, { isSpeaking: false, quizSubmitted: false });
      }
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          subjectId: state.subjectId,
          level: state.level,
          goal: state.goal,
          theme: state.theme,
          fontScale: state.fontScale,
          wideSpacing: state.wideSpacing
        })
      );
    } catch (_) {}
  }

  function announce(msg) {
    a11yLive.textContent = msg;
    setTimeout(() => {
      if (a11yLive.textContent === msg) a11yLive.textContent = "";
    }, 3500);
  }

  // ---------------------------------------------------------
  // Accessibility Controls
  // ---------------------------------------------------------
  function applyA11y() {
    htmlEl.setAttribute("data-theme", state.theme);
    htmlEl.style.setProperty("--font-scale", state.fontScale);
    htmlEl.setAttribute("data-spacing", state.wideSpacing ? "wide" : "normal");
    btnFontReset.textContent = `${Math.round(state.fontScale * 100)}%`;

    themeButtons.forEach((btn) => {
      const active = btn.dataset.themeBtn === state.theme;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    btnToggleSpacing.classList.toggle("active", state.wideSpacing);
    btnToggleSpacing.setAttribute("aria-pressed", String(state.wideSpacing));
  }

  btnFontDec.addEventListener("click", () => {
    state.fontScale = Math.max(0.8, +(state.fontScale - 0.1).toFixed(2));
    applyA11y();
    saveState();
    announce(`Cỡ chữ: ${Math.round(state.fontScale * 100)}%`);
  });

  btnFontReset.addEventListener("click", () => {
    state.fontScale = 1;
    applyA11y();
    saveState();
    announce("Đã đặt lại cỡ chữ mặc định (100%)");
  });

  btnFontInc.addEventListener("click", () => {
    state.fontScale = Math.min(1.4, +(state.fontScale + 0.1).toFixed(2));
    applyA11y();
    saveState();
    announce(`Cỡ chữ: ${Math.round(state.fontScale * 100)}%`);
  });

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.theme = btn.dataset.themeBtn;
      applyA11y();
      saveState();
      announce(`Đã chuyển giao diện: ${btn.textContent.trim()}`);
    });
  });

  btnToggleSpacing.addEventListener("click", () => {
    state.wideSpacing = !state.wideSpacing;
    applyA11y();
    saveState();
    announce(state.wideSpacing ? "Đã bật chế độ giãn dòng dễ đọc" : "Đã tắt chế độ giãn dòng");
  });

  // Text-to-Speech
  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    state.isSpeaking = false;
    if (btnTts) {
      btnTts.classList.remove("active");
      btnTts.setAttribute("aria-pressed", "false");
      btnTts.textContent = "Đọc bài";
    }
  }

  if (btnTts) btnTts.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      announce("Trình duyệt không hỗ trợ đọc thành tiếng.");
      return;
    }
    if (state.isSpeaking) {
      stopSpeech();
      announce("Đã dừng đọc bài giảng.");
      return;
    }
    const textToRead = [
      lectureTitle.textContent,
      lectureSummary.textContent,
      lectureBody.textContent,
      "Ví dụ minh họa: " + lectureExample.textContent,
      "Tóm tắt cốt lõi: " + lectureTakeaway.textContent
    ].join(". ");

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "vi-VN";
    utterance.rate = 0.98;
    utterance.onend = () => stopSpeech();
    utterance.onerror = () => stopSpeech();

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    state.isSpeaking = true;
    btnTts.classList.add("active");
    btnTts.setAttribute("aria-pressed", "true");
    btnTts.textContent = "Dừng đọc";
    announce("Đang đọc bài giảng...");
  });

  // ---------------------------------------------------------
  // Left Sidebar Navigation
  // ---------------------------------------------------------
  function closeMobileSidebar() {
    sidebar.classList.remove("open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  function switchView(viewName) {
    if (viewName === "admin" && !isCurrentUserAdmin()) {
      announce("Bạn không có quyền truy cập trang Quản trị.");
      return;
    }
    stopSpeech();
    closeMobileSidebar();
    Object.entries(views).forEach(([key, el]) => {
      el.classList.toggle("hidden", key !== viewName);
      el.classList.toggle("active", key === viewName);
    });
    sidebarButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });
    if (viewName === "admin") renderAdminPanel();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.view === "profile") renderProfile();
      switchView(btn.dataset.view);
    });
  });

  function closeUserDropdown() {
    if (!fbDropdown) return;
    fbDropdown.classList.add("hidden");
    fbAvatarTrigger.setAttribute("aria-expanded", "false");
  }

  fbAvatarTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = fbDropdown.classList.toggle("hidden");
    fbAvatarTrigger.setAttribute("aria-expanded", String(!isHidden));
  });

  document.addEventListener("click", (e) => {
    if (fbUserMenu && !fbUserMenu.contains(e.target)) {
      closeUserDropdown();
    }
  });

  sidebarUserBox.addEventListener("click", () => {
    closeUserDropdown();
    renderProfile();
    switchView("profile");
  });

  btnDropOpenProfile.addEventListener("click", () => {
    closeUserDropdown();
    renderProfile();
    switchView("profile");
  });

  if (btnDropLevel) {
    btnDropLevel.addEventListener("click", () => {
      closeUserDropdown();
      switchView("diagnostic");
    });
  }

  if (btnDropTheme) {
    btnDropTheme.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyA11y();
      saveState();
      announce(`Đã chuyển sang chế độ ${state.theme === "dark" ? "Tối" : "Sáng"}`);
    });
  }

  if (btnDropSources) {
    btnDropSources.addEventListener("click", () => {
      closeUserDropdown();
      switchView("sources");
    });
  }

  btnSidebarChangeLevel.addEventListener("click", () => switchView("diagnostic"));
  btnOpenDiag.addEventListener("click", () => switchView("diagnostic"));
  btnGoPractice.addEventListener("click", () => switchView("practice"));

  // ---------------------------------------------------------
  // Sync Selects & Level UI
  // ---------------------------------------------------------
  function populateSubjects() {
    const optionsHtml = CURRICULUM.map(
      (subj) => `<option value="${subj.id}">${subj.name}</option>`
    ).join("");
    subjectSelect.innerHTML = optionsHtml;
    practiceSubjectSelect.innerHTML = optionsHtml;
    if (adminEditSubject) adminEditSubject.innerHTML = optionsHtml;
  }

  const theoryTabs = document.querySelectorAll("[data-theory-subj]");

  function syncLevelUI() {
    const meta = LEVEL_META[state.level];
    headerLevelBadge.textContent = meta.label;
    headerLevelBadge.className = `level-badge ${meta.badgeClass}`;
    if (selfSelectedLabel) selfSelectedLabel.textContent = meta.label;

    levelSelect.value = state.level;
    practiceLevelSelect.value = state.level;
    subjectSelect.value = state.subjectId;
    practiceSubjectSelect.value = state.subjectId;
    goalSelect.value = state.goal;

    theoryTabs.forEach((tab) => {
      const isActive = tab.dataset.theorySubj === state.subjectId;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    levelCards.forEach((card) => {
      const isSelected = card.dataset.levelCard === state.level;
      card.classList.toggle("active", isSelected);
      card.setAttribute("aria-checked", String(isSelected));
    });
  }

  theoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.subjectId = tab.dataset.theorySubj;
      saveState();
      renderLesson();
      announce(`Đã chuyển sang lý thuyết: ${tab.textContent.trim()}`);
    });
  });

  // ---------------------------------------------------------
  // Comprehensive V-ACT Theory Modules (4 Parts)
  // ---------------------------------------------------------
  const DETAILED_THEORY_MODULES = {
    "lang-vi": `
      <div class="theory-chapter">
        <h4>Chương 1: Ngữ âm, Chính tả, Từ loại và Nghĩa của từ</h4>
        <ul>
          <li><strong>Chính tả &amp; Chuẩn từ:</strong> Phân biệt phụ âm đầu dễ lẫn (s/x, tr/ch, r/d/gi, l/n), vần (iêu/yêu, ươu/ưu, an/ang, at/ac) và dấu hỏi/ngã (quy tắc láy âm: huyền–ngã–nặng đi với nhau; ngang–hỏi–sắc đi với nhau, ví dụ: <em>mỡ màng, vội vã, lạnh lẽo</em> vs <em>ngớ ngẩn, mảnh mai, trắng trẻo</em>).</li>
          <li><strong>Từ loại:</strong> Thực từ (Danh từ, Động từ, Tính từ, Số từ, Đại từ) và Hư từ (Phó từ, Quan hệ từ, Trợ từ, Tình thái từ, Thán từ). Nắm vững từ ghép đẳng lập (<em>quần áo, vui buồn</em>), từ ghép chính phụ (<em>xe đạp, xanh ngắt</em>) và từ láy (toàn bộ, bộ phận).</li>
          <li><strong>Nghĩa của từ &amp; Từ Hán Việt:</strong> Phân biệt từ đồng âm (<em>đường đi / đường ăn</em>), từ đa nghĩa (nghĩa gốc và nghĩa chuyển theo ẩn dụ/hoán dụ), từ đồng nghĩa hoàn toàn/không hoàn toàn và lỗi dùng từ Hán Việt sai nghĩa (ví dụ: <em>yếu điểm</em> là điểm quan trọng, không phải điểm yếu; <em>cứu cánh</em> là mục đích cuối cùng, không phải cứu giúp; <em>tri thức</em> là kiến thức, <em>trí thức</em> là tầng lớp lao động trí óc).</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 2: Ngữ pháp câu, Lỗi câu và Liên kết văn bản</h4>
        <ul>
          <li><strong>Thành phần câu:</strong> Thành phần chính (Chủ ngữ, Vị ngữ) và thành phần phụ (Trạng ngữ, Khởi ngữ, Thành phần biệt lập: tình thái, cảm thán, gọi-đáp, phụ chú).</li>
          <li><strong>Các lỗi câu thường gặp trong ĐGNL:</strong> Thiếu chủ ngữ (do biến chủ ngữ thành trạng ngữ: <em>"Qua tác phẩm đã cho thấy..."</em>), thiếu vị ngữ, sai logic (<em>"Anh ấy là một trong những nhà thơ viết nhiều nhất, nhưng chỉ có một bài"</em>), dùng sai quan hệ từ (<em>"Tuy... nhưng..."</em> phải đi cặp, tránh <em>"Vì... nên..."</em> thiếu vế), câu mơ hồ do cấu trúc.</li>
          <li><strong>Phép liên kết đoạn văn:</strong> Phép lặp, phép thế (đại từ, từ đồng nghĩa), phép nối (quan hệ từ, từ ngữ chuyển tiếp), phép liên tưởng và phép nghịch đối.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 3: Phong cách ngôn ngữ, Phương thức biểu đạt và Biện pháp tu từ</h4>
        <ul>
          <li><strong>6 Phương thức biểu đạt:</strong> Tự sự (kể chuyện, có cốt truyện/nhân vật), Miêu tả (tái hiện đặc điểm), Biểu cảm (bộc lộ cảm xúc), Thuyết minh (cung cấp tri thức khách quan), Nghị luận (trình bày quan điểm, lập luận), Hành chính – công vụ.</li>
          <li><strong>6 Phong cách ngôn ngữ:</strong> Sinh hoạt, Nghệ thuật, Báo chí, Chính luận, Khoa học, Hành chính.</li>
          <li><strong>Biện pháp tu từ trọng tâm:</strong> So sánh, Ẩn dụ (dựa trên nét tương đồng), Hoán dụ (dựa trên quan hệ gần gũi: bộ phận–toàn thể, vật chứa–vật bị chứa), Nhân hóa, Điệp ngữ, Liệt kê, Nói quá (thậm xưng), Nói giảm nói tránh, Tương phản/Đối lập, Chơi chữ, Câu hỏi tu từ.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 4: Văn học Việt Nam và Kỹ năng Đọc hiểu V-ACT</h4>
        <ul>
          <li><strong>Thể thơ &amp; Luật thơ:</strong> Lục bát (vần chữ 6 câu lục với chữ 6 câu bát), Song thất lục bát, Thơ Đường luật thất ngôn bát cú (niêm, luật bằng trắc, vần chân ở câu 1-2-4-6-8, đối ở câu 3-4 và 5-6), Thơ tự do.</li>
          <li><strong>Tiến trình văn học:</strong> Văn học dân gian (thần thoại, sử thi, truyền thuyết, cổ tích, ca dao, tục ngữ) &rarr; Văn học trung đại (thế kỷ X–XIX: cảm hứng yêu nước, nhân đạo, thiên nhiên) &rarr; Văn học hiện đại (Thơ mới 1932–1945, văn học hiện thực phê phán, văn học kháng chiến 1945–1975, văn học sau 1975).</li>
          <li><strong>Chiến thuật đọc hiểu ngữ liệu dài:</strong> Đọc câu hỏi trước để khoanh vùng từ khóa, xác định câu chủ đề (thường ở đầu hoặc cuối đoạn), phân biệt thông tin <em>nêu trực tiếp</em> và <em>suy luận hợp lý</em>, tuyệt đối không suy diễn vượt ngoài ngữ liệu.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 5: Lộ trình Chuyên đề trọng tâm Tiếng Việt mở rộng &amp; Sân khấu dân gian</h4>
        <ul>
          <li><strong>Chuyên đề Từ &amp; Câu mở rộng:</strong> Nhận diện lỗi dùng từ sai phong cách, lặp từ, thừa từ, sai trật tự thành phần câu và lỗi quy chiếu đại từ trong đoạn văn dài.</li>
          <li><strong>Văn học dân gian &amp; Sân khấu dân gian:</strong> Phân biệt đặc trưng nghệ thuật của Chèo (tính ước lệ, hài hước, nhân vật hề chèo), Tuồng (tính bi tráng, cách điệu hóa mặt nạ) và Cải lương (kết hợp đờn ca tài tử Nam Bộ).</li>
          <li><strong>Văn học trung đại Việt Nam:</strong> Nắm vững tác giả – tác phẩm tiêu biểu từ thế kỷ X–XIX (Nguyễn Trãi, Nguyễn Du, Hồ Xuân Hương, Nguyễn Khuyến, Nguyễn Đình Chiểu) cùng đặc trưng thi pháp ước lệ, tượng trưng.</li>
        </ul>
      </div>
    `,
    "lang-en": `
      <div class="theory-chapter">
        <h4>Chương 1: Hệ thống Thì (Tenses), Sự hòa hợp Chủ-Vị và Câu bị động</h4>
        <ul>
          <li><strong>12 Thì cốt lõi &amp; Dấu hiệu:</strong> Hiện tại đơn (thói quen, chân lý), Hiện tại hoàn thành (<em>since, for, already, yet, so far, recently</em>), Quá khứ đơn (mốc thời gian xác định: <em>ago, yesterday, in 2020</em>), Quá khứ hoàn thành (hành động xảy ra trước một hành động khác trong quá khứ: <em>By the time + S + V2, S + had + V3</em>), Tương lai hoàn thành (<em>By + mốc tương lai, S + will have + V3</em>).</li>
          <li><strong>Sự hòa hợp Chủ-Vị (Subject–Verb Agreement):</strong> <em>The number of + N(s) + V(ít)</em> nhưng <em>A number of + N(s) + V(nhiều)</em>; <em>Neither A nor B / Either A or B / Not only A but also B</em> chia theo chủ ngữ B; <em>A along with / as well as / together with B</em> chia theo chủ ngữ A; Đại từ bất định (<em>everyone, each, neither</em>) luôn đi với V số ít.</li>
          <li><strong>Câu bị động đặc biệt:</strong> Bị động khách quan (<em>It is said that... / S is said to V / to have V3</em>), bị động nhờ vả (<em>have sth done / get sth done</em>).</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 2: Mệnh đề quan hệ, Câu điều kiện, Đảo ngữ và Câu gián tiếp</h4>
        <ul>
          <li><strong>Mệnh đề quan hệ:</strong> <em>who, whom, which, whose, where, when, why</em>; không dùng <em>that</em> sau dấu phẩy hoặc sau giới từ. Rút gọn mệnh đề quan hệ: chủ động dùng <code>V-ing</code>, bị động dùng <code>V3/ed</code>, sau số thứ tự/so sánh nhất dùng <code>to V</code>.</li>
          <li><strong>Câu điều kiện &amp; Đảo ngữ điều kiện:</strong> Loại 1 (<code>Should + S + V</code>), Loại 2 (<code>Were + S + (to V)</code>), Loại 3 (<code>Had + S + V3</code>), Điều kiện hỗn hợp (Loại 3 + Loại 2: quá khứ ảnh hưởng hiện tại).</li>
          <li><strong>Đảo ngữ phủ định thường ra thi:</strong> <em>Not only + aux + S + V, but...; Never / Seldom / Rarely / Little + aux + S + V; No sooner + had + S + V3 + than...; Hardly / Scarcely + had + S + V3 + when...; Only after / Only when / Only by + ... + aux + S + V</em>.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 3: Câu phức, Liên từ, So sánh và Viết lại câu (Sentence Transformation)</h4>
        <ul>
          <li><strong>Liên từ &amp; Giới từ chỉ nguyên nhân/nhượng bộ:</strong> <em>Because / Although / Even though + S + V</em> khác với <em>Because of / Despite / In spite of + N/V-ing</em>.</li>
          <li><strong>So sánh kép:</strong> <code>The + so sánh hơn + S1 + V1, the + so sánh hơn + S2 + V2</code> (càng... càng...).</li>
          <li><strong>Cấu trúc viết lại câu ăn điểm:</strong> <em>It is time + S + V2/ed</em>; <em>would rather + S + V2/ed</em>; <em>suggest + V-ing / that S + (should) + V0</em>; <em>too... to</em> &harr; <em>so... that</em> &harr; <em>such... that</em>.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 4: Chiến thuật Sửa lỗi sai, Điền từ (Cloze Test) và Đọc hiểu (Reading)</h4>
        <ul>
          <li><strong>Sửa lỗi sai (5 câu):</strong> Kiểm tra theo thứ tự ưu tiên: (1) Hòa hợp chủ-vị &amp; thì, (2) Cấu trúc song song (<em>and, or, both...and</em>), (3) Từ loại (Adj vs Adv, N vs V), (4) Đại từ quy chiếu, (5) Từ dễ nhầm lẫn (<em>economic/economical, considerable/considerate, historic/historical</em>).</li>
          <li><strong>Đọc hiểu 2 bài (10 câu):</strong> Với câu <em>Main idea</em>: đọc câu đầu/cuối mỗi đoạn, loại đáp án quá hẹp hoặc quá rộng. Với câu <em>Reference (it, they, which)</em>: đọc ngay câu liền trước. Với câu <em>NOT TRUE / EXCEPT</em>: dò từng phương án đối chiếu từ khóa trong bài.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 5: Chuyên đề Ăn điểm (Từ chỉ lượng, Mạo từ, Cụm động từ &amp; Modal Verbs)</h4>
        <ul>
          <li><strong>Từ chỉ lượng (Quantifiers):</strong> Phân biệt danh từ đếm được (<em>many, few, a few, several</em>) và không đếm được (<em>much, little, a little, a great deal of</em>); <em>a few / a little</em> (một ít, đủ dùng) khác <em>few / little</em> (rất ít, gần như không).</li>
          <li><strong>Mạo từ (Articles):</strong> Dùng <em>the</em> với danh từ xác định, so sánh nhất, số thứ tự, nhạc cụ, địa danh có <em>of</em>; không dùng mạo từ trước danh từ số nhiều/không đếm được nói chung, bữa ăn, môn học, môn thể thao.</li>
          <li><strong>Modal Verbs phỏng đoán quá khứ:</strong> <code>must have + V3</code> (chắc hẳn đã), <code>can't/couldn't have + V3</code> (chắc chắn đã không), <code>might/may/could have + V3</code> (có lẽ đã), <code>should have + V3</code> (lẽ ra nên làm nhưng đã không làm).</li>
          <li><strong>Cụm động từ (Phrasal Verbs) &amp; Trật tự tính từ (OSASCOMP):</strong> Nắm các cụm hay thi (<em>carry out, come up with, put off, turn down, account for, look into, make up for</em>) và thứ tự tính từ <em>Opinion – Size – Age – Shape – Color – Origin – Material – Purpose</em>.</li>
        </ul>
      </div>
    `,
    "math": `
      <div class="theory-chapter">
        <h4>Chương 1: Hàm số, Đạo hàm, Mũ – Logarit và Tích phân</h4>
        <ul>
          <li><strong>Khảo sát hàm số:</strong> Đơn điệu (<code>y' &ge; 0</code> đồng biến, <code>y' &le; 0</code> nghịch biến); Cực trị (<code>y'</code> đổi dấu qua <code>x_0</code>); Tiệm cận đứng (<code>lim f(x) = &plusmn;&infin;</code>), Tiệm cận ngang (<code>lim_{x&rarr;&plusmn;&infin;} f(x) = y_0</code>); GTLN–GTNN trên đoạn <code>[a; b]</code>.</li>
          <li><strong>Mũ &amp; Logarit:</strong> Với <code>a &gt; 0, a &ne; 1, x, y &gt; 0</code>: <code>log_a(xy) = log_a x + log_a y</code>; <code>log_a(x/y) = log_a x - log_a y</code>; <code>log_{a^k}(x^m) = (m/k) log_a x</code>; đổi cơ số <code>log_a b = log_c b / log_c a</code>. Bài toán lãi kép: <code>A = P(1 + r)^n</code>.</li>
          <li><strong>Nguyên hàm &amp; Tích phân:</strong> Diện tích hình phẳng <code>S = &int;_a^b |f(x) - g(x)| dx</code>; Thể tích khối tròn xoay quanh Ox: <code>V = &pi; &int;_a^b [f(x)]^2 dx</code>; Ứng dụng quãng đường <code>S = &int; v(t) dt</code>.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 2: Tổ hợp – Xác suất, Thống kê và Quy hoạch tuyến tính</h4>
        <ul>
          <li><strong>Đếm &amp; Tổ hợp:</strong> Hoán vị <code>P_n = n!</code>; Chỉnh hợp <code>A_n^k = n!/(n-k)!</code> (có thứ tự); Tổ hợp <code>C_n^k = n!/[k!(n-k)!]</code> (không thứ tự).</li>
          <li><strong>Xác suất &amp; Xác suất có điều kiện:</strong> <code>P(A &cup; B) = P(A) + P(B) - P(A &cap; B)</code>; Xác suất có điều kiện <code>P(A|B) = P(A &cap; B) / P(B)</code>; Công thức xác suất toàn phần và định lý Bayes (rất hay gặp trong V-ACT mới).</li>
          <li><strong>Thống kê mẫu số liệu ghép nhóm:</strong> Số trung bình, Trung vị (<code>Q_2</code>), Tứ phân vị (<code>Q_1, Q_3</code>), Khoảng tứ phân vị <code>&Delta;_Q = Q_3 - Q_1</code>, Phương sai <code>s^2</code> và Độ lệch chuẩn <code>s = &radic;(s^2)</code>.</li>
          <li><strong>Hệ bất phương trình bậc nhất 2 ẩn:</strong> Miền nghiệm là miền đa giác lồi; hàm mục tiêu <code>F(x; y) = ax + by</code> đạt GTLN/GTNN tại các đỉnh của miền đa giác.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 3: Dãy số, Cấp số, Lượng giác và Hình học không gian – Oxyz</h4>
        <ul>
          <li><strong>Cấp số cộng &amp; Cấp số nhân:</strong> CSC: <code>u_n = u_1 + (n-1)d</code>, <code>S_n = n(u_1 + u_n)/2</code>. CSN: <code>u_n = u_1 &middot; q^{n-1}</code>, <code>S_n = u_1(1 - q^n)/(1 - q)</code> (với <code>q &ne; 1</code>).</li>
          <li><strong>Hình học không gian cổ điển:</strong> Thể tích khối chóp <code>V = (1/3)Bh</code>; Khối lăng trụ <code>V = Bh</code>; Khối nón <code>V = (1/3)&pi;R^2 h</code>; Khối trụ <code>V = &pi;R^2 h</code>; Khối cầu <code>V = (4/3)&pi;R^3</code>, diện tích mặt cầu <code>S = 4&pi;R^2</code>.</li>
          <li><strong>Tọa độ Oxyz:</strong> Tích vô hướng <code>u &middot; v = x_1x_2 + y_1y_2 + z_1z_2</code>; Phương trình mặt phẳng <code>A(x-x_0)+B(y-y_0)+C(z-z_0)=0</code>; Khoảng cách từ điểm đến mặt phẳng <code>d(M,(P)) = |Ax_0+By_0+Cz_0+D| / &radic;(A^2+B^2+C^2)</code>; Phương trình mặt cầu tâm <code>I(a,b,c)</code> bán kính <code>R</code>.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 4: Kỹ thuật giải Phương trình, Bất phương trình &amp; Hệ bậc nhất nhiều ẩn</h4>
        <ul>
          <li><strong>Hằng đẳng thức &amp; Tam thức bậc 2:</strong> Nắm chắc 7 hằng đẳng thức cơ bản và mở rộng; xét dấu tam thức <code>f(x) = ax^2 + bx + c</code> (trong trái – ngoài cùng khi <code>&Delta; &gt; 0</code>; luôn cùng dấu <code>a</code> khi <code>&Delta; &lt; 0</code>).</li>
          <li><strong>Kết luận nghiệm nhanh hệ bậc nhất 2 ẩn:</strong> Với hệ <code>a_1x + b_1y = c_1</code> và <code>a_2x + b_2y = c_2</code>:
            <code>a_1/a_2 &ne; b_1/b_2</code> &rArr; có nghiệm duy nhất;
            <code>a_1/a_2 = b_1/b_2 &ne; c_1/c_2</code> &rArr; vô nghiệm;
            <code>a_1/a_2 = b_1/b_2 = c_1/c_2</code> &rArr; vô số nghiệm.</li>
          <li><strong>Bài toán thực tế &amp; Hệ phương trình nhiều ẩn:</strong> Đặt ẩn trực tiếp theo đại lượng cần tìm, tận dụng máy tính cầm tay giải nhanh hệ 3–4 ẩn (phương trình đường tròn, parabol, bài toán trộn dung dịch, năng suất, hình học tọa độ Oxy).</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 5: 18 Chủ đề Trọng tâm Hàm số nâng cao &amp; Kỹ thuật CASIO</h4>
        <ul>
          <li><strong>Tham số m &amp; Hàm ẩn:</strong> Điều kiện hàm bậc 3 đơn điệu trên <code>&Ropf;</code> (<code>&Delta;_{y'} &le; 0</code>); cực trị hàm bậc 2 trên bậc 1; kỹ thuật ghép trục / đạo hàm hàm hợp <code>[f(u(x))]' = u'(x) &middot; f'(u(x))</code> để tìm cực trị và đơn điệu hàm ẩn.</li>
          <li><strong>Tiếp tuyến &amp; Tương giao đồ thị:</strong> Phương trình tiếp tuyến tại <code>M(x_0; y_0)</code>: <code>y = f'(x_0)(x - x_0) + y_0</code>; biện luận số nghiệm phương trình bằng số giao điểm đồ thị.</li>
          <li><strong>Kỹ thuật CASIO giải nhanh ĐGNL:</strong> Tính giới hạn dãy số/hàm số bằng phím <code>CALC</code> (nhập <code>10^6</code> hoặc <code>x_0 &plusmn; 10^{-6}</code>), kiểm tra tính liên tục, đạo hàm tại điểm (<code>d/dx</code>), tích phân xác định và xử lý nhanh bài toán truy hồi.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 6: Ma trận Toán V-ACT 2025–2026 &amp; Tổng hợp Công thức Lượng giác</h4>
        <ul>
          <li><strong>Ma trận độ khó chuẩn V-ACT:</strong> Mức 1 (Nhận biết) chiếm <strong>30%</strong>, Mức 2 (Thông hiểu) chiếm <strong>40%</strong>, Mức 3 (Vận dụng) chiếm <strong>30%</strong>. Phạm vi trọng tâm gồm: phương trình – bất phương trình – hệ đại số, dãy số – CSC – CSN, giới hạn – liên tục – đạo hàm – tiệm cận – khảo sát hàm số, tổ hợp – xác suất, hình học phẳng, hình học không gian và Oxyz.</li>
          <li><strong>Hệ thức lượng giác cơ bản &amp; mở rộng:</strong> <code>sin&sup2;a + cos&sup2;a = 1</code>; <code>1 + tan&sup2;a = 1/cos&sup2;a</code>; <code>sin&sup4;a + cos&sup4;a = 1 - 2sin&sup2;a cos&sup2;a</code>; <code>sin&sup6;a + cos&sup6;a = 1 - 3sin&sup2;a cos&sup2;a</code>; <code>sin a &plusmn; cos a = &radic;2 sin(a &plusmn; &pi;/4)</code>.</li>
          <li><strong>Công thức cộng, nhân đôi, hạ bậc &amp; biến đổi:</strong> <code>sin(a &plusmn; b) = sin a cos b &plusmn; cos a sin b</code>; <code>cos(a &plusmn; b) = cos a cos b &#8723; sin a sin b</code>; <code>sin 2a = 2 sin a cos a</code>; <code>cos 2a = cos&sup2;a - sin&sup2;a = 2cos&sup2;a - 1 = 1 - 2sin&sup2;a</code>; <code>cos&sup2;a = (1 + cos 2a)/2</code>; <code>sin&sup2;a = (1 - cos 2a)/2</code>. Biểu diễn theo <code>t = tan(a/2)</code>: <code>sin a = 2t/(1+t&sup2;)</code>, <code>cos a = (1-t&sup2;)/(1+t&sup2;)</code>.</li>
        </ul>
      </div>
    `,
    "science": `
      <div class="theory-chapter">
        <h4>Chương 1: Logic học và Suy luận mệnh đề (3 câu)</h4>
        <ul>
          <li><strong>Mệnh đề kéo theo &amp; Tương đương:</strong> <code>P &rArr; Q</code> tương đương với phản đảo <code>&not;Q &rArr; &not;P</code> (chú ý: KHÔNG tương đương với <code>Q &rArr; P</code> hay <code>&not;P &rArr; &not;Q</code>). Phủ định của <code>P &rArr; Q</code> là <code>P &and; &not;Q</code>.</li>
          <li><strong>Định luật De Morgan:</strong> <code>&not;(P &and; Q) &equiv; &not;P &or; &not;Q</code> và <code>&not;(P &or; Q) &equiv; &not;P &and; &not;Q</code>. Phủ định của "Mọi X đều là Y" là "Tồn tại ít nhất một X không là Y".</li>
          <li><strong>Bài toán sắp xếp thứ tự / phân nhóm:</strong> Lập bảng vị trí (1, 2, 3, 4, 5...), vẽ khối liên kết (ví dụ: A luôn cạnh B), điền điều kiện cố định trước, loại trừ dần phương án sai.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 2: Phân tích số liệu &amp; Biểu đồ (9 câu)</h4>
        <ul>
          <li><strong>Công thức tính nhanh:</strong> Tỉ trọng <code>= (Thành phần / Tổng) &times; 100%</code>; Tốc độ tăng trưởng <code>= ((Giá trị sau - Giá trị trước) / Giá trị trước) &times; 100%</code>; Chênh lệch điểm phần trăm (khác với % tăng trưởng).</li>
          <li><strong>Đọc 4 loại biểu đồ chuẩn V-ACT:</strong> Biểu đồ cột (so sánh giá trị tuyệt đối), Biểu đồ đường (xu hướng theo thời gian), Biểu đồ tròn (cơ cấu tỉ trọng), Biểu đồ kết hợp cột–đường (2 trục tung khác đơn vị — luôn kiểm tra đơn vị từng trục trước khi tính).</li>
          <li><strong>Kỹ thuật ước lượng:</strong> Làm tròn đến 2 chữ số có nghĩa để loại nhanh 2–3 đáp án nhiễu, chỉ tính chính xác khi 2 đáp án chênh nhau dưới 3%.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 3: Khoa học Tự nhiên (Vật lí – Hóa học – Sinh học)</h4>
        <ul>
          <li><strong>Vật lí:</strong> Dao động điều hòa (<code>T = 2&pi;&radic;(m/k)</code>, <code>v_{max} = &omega;A</code>, <code>a_{max} = &omega;^2 A</code>), Sóng cơ (<code>&lambda; = v/f</code>), Điện xoay chiều &amp; Định luật Ôm (<code>I = U/R</code>, <code>P = UI = I^2 R</code>), Vật lí nhiệt (<code>Q = mc&Delta;t</code>, định luật khí lí tưởng <code>pV/T = const</code>), Phóng xạ (<code>N = N_0 &middot; 2^{-t/T}</code>).</li>
          <li><strong>Hóa học:</strong> Bảo toàn khối lượng, bảo toàn electron (<code>&Sigma;n_{e nhường} = &Sigma;n_{e nhận}</code>), cân bằng hóa học (nguyên lí Le Chatelier), pH dung dịch (<code>pH = -log[H^+]</code>), Hóa hữu cơ (este, lipit, cacbohidrat, amin, amino axit, polime) và pin điện hóa (<code>E^0_{pin} = E^0_{catot} - E^0_{anot}</code>).</li>
          <li><strong>Sinh học:</strong> Nhân đôi ADN, phiên mã, dịch mã (<code>N = 2A + 2G</code>, chiều dài <code>L = (N/2) &times; 3,4 &Aring;</code>), Quy luật di truyền Mendel, hoán vị gen, di truyền quần thể (Hardy–Weinberg: <code>p^2 + 2pq + q^2 = 1</code>), Tiến hóa và Sinh thái học (lưới thức ăn, hiệu suất sinh thái).</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 4: Khoa học Xã hội (Lịch sử – Địa lí – Kinh tế &amp; Pháp luật)</h4>
        <ul>
          <li><strong>Lịch sử:</strong> Kháng chiến chống Pháp (1945–1954: Việt Bắc 1947, Biên giới 1950, Điện Biên Phủ 1954), Kháng chiến chống Mỹ (1954–1975: Đồng Khởi 1960, Mậu Thân 1968, Hiệp định Paris 1973, Chiến dịch Hồ Chí Minh 1975), Công cuộc Đổi mới 1986 và quan hệ quốc tế (ASEAN, Liên Hợp Quốc).</li>
          <li><strong>Địa lí:</strong> Đặc điểm tự nhiên Việt Nam (nhiệt đới ẩm gió mùa, phân hóa Bắc–Nam, Đông–Tây, theo độ cao), chuyển dịch cơ cấu kinh tế, 7 vùng kinh tế trọng điểm và đọc số liệu xuất nhập khẩu / dân số.</li>
          <li><strong>Giáo dục Kinh tế &amp; Pháp luật:</strong> Quy luật cung – cầu, lạm phát, thất nghiệp, ngân sách nhà nước, thuế; quyền và nghĩa vụ cơ bản của công dân theo Hiến pháp 2013, pháp luật dân sự – lao động – kinh doanh.</li>
        </ul>
      </div>
      <div class="theory-chapter">
        <h4>Chương 5: Chiến thuật Logic nâng cao (Ordering – Grouping – Mixed) &amp; Đọc Bảng số liệu</h4>
        <ul>
          <li><strong>3 Dạng bài Logic cốt lõi:</strong> (1) <em>Ordering (Sắp xếp thứ tự)</em>: kẻ khung vị trí 1..n, cố định mốc trước; (2) <em>Grouping (Phân nhóm)</em>: kiểm soát sĩ số từng nhóm và cặp đối tượng bắt buộc đi cùng / không đi cùng; (3) <em>Mixed Logic</em>: lập bảng 2 chiều (hàng là đối tượng, cột là thuộc tính) đánh dấu <code>&check; / &times;</code>.</li>
          <li><strong>Phân tích Bảng số liệu &amp; Biểu đồ đường:</strong> Luôn kiểm tra đơn vị tính (nghìn, triệu, tỉ, %) ở tiêu đề bảng; với câu hỏi "tăng nhanh nhất", tính tỉ lệ <code>(sau - trước) / trước</code> thay vì chỉ nhìn hiệu số tuyệt đối.</li>
        </ul>
      </div>
    `
  };

  // ---------------------------------------------------------
  // Render Lecture & Practice
  // ---------------------------------------------------------
  function getCurrentLesson() {
    const subj = CURRICULUM.find((s) => s.id === state.subjectId) || CURRICULUM[0];
    return { subject: subj, lesson: subj.levels[state.level] };
  }

  function renderSolutionHtml(quiz, statusClass = "") {
    const letter = ["A", "B", "C", "D"][quiz.answer];
    const src = VERIFIED_SOURCES[quiz.sourceId];
    return `
      <div class="solution-box ${statusClass}">
        <h4>✅ Đáp án đúng: ${letter}. ${quiz.options[quiz.answer]}</h4>
        <ol class="solution-steps">
          ${quiz.steps.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        <div class="solution-tip">💡 <strong>Mẹo ĐGNL:</strong> ${quiz.tip}</div>
        ${src ? `<div class="solution-source">🛡️ Nguồn kiểm duyệt: <strong>${src.name}</strong></div>` : ""}
      </div>
    `;
  }

  function renderLesson() {
    stopSpeech();
    state.quizSubmitted = false;
    syncLevelUI();

    const { subject, lesson } = getCurrentLesson();
    const levelMeta = LEVEL_META[state.level];

    lectureSubjectTag.textContent = subject.name;
    lectureLevelTag.textContent = levelMeta.label;
    lectureLevelTag.className = `level-badge ${levelMeta.badgeClass}`;
    lectureGoalTag.textContent = GOAL_META[state.goal];
    lectureReadTime.textContent = lesson.readTime;

    lectureTitle.textContent = lesson.title;
    lectureSummary.textContent = lesson.summary;
    lectureObjectives.innerHTML = lesson.objectives.map((o) => `<li>${o}</li>`).join("");
    const depthGuide = getLevelDepthHtml(subject.id, state.level);
    const fullTheoryHtml = DETAILED_THEORY_MODULES[subject.id] || "";
    lectureBody.innerHTML =
      lesson.sections.map((sec) => `<h3>${sec.heading}</h3><p>${sec.text}</p>`).join("") +
      fullTheoryHtml +
      depthGuide;
    lectureExample.textContent = lesson.example;
    lectureTakeaway.textContent = lesson.takeaway;

    lectureSourcesList.innerHTML = lesson.sources
      .map((id) => {
        const s = VERIFIED_SOURCES[id];
        if (!s) return "";
        return `
          <div class="source-chip">
            <div>
              <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a>
              <div class="muted small">${s.category}</div>
            </div>
            <span class="verified-badge">✔ ${s.trustLevel}</span>
          </div>
        `;
      })
      .join("");

    // Render Practice Quizzes (5 câu từ dễ đến khó, căn cứ trình độ, không trùng câu trước)
    currentPracticeQuizzes = buildPracticeQuizSet(subject.id, state.level);
    quizProgress.textContent = `0 / ${currentPracticeQuizzes.length} câu`;
    adaptiveFeedback.classList.add("hidden");
    adaptiveFeedback.innerHTML = "";
    btnSubmitQuiz.classList.remove("hidden");
    btnRetryQuiz.classList.add("hidden");
    btnRetryQuiz.textContent = "Làm lại (5 câu mới)";

    quizContainer.innerHTML = currentPracticeQuizzes
      .map((item, idx) => {
        const letters = ["A", "B", "C", "D"];
        return `
          <div class="quiz-item" data-quiz-idx="${idx}">
            ${item.passage ? `<div class="mock-passage">${item.passage}</div>` : ""}
            <p class="quiz-question">
              <span class="meta-pill" style="margin-right:8px; font-size:0.78rem;">Mức ${idx + 1}/5: ${item.diffLabel}</span>
              Câu ${idx + 1}: ${item.q}
            </p>
            <div class="quiz-options">
              ${item.options
                .map(
                  (opt, optIdx) => `
                <label class="quiz-option">
                  <input type="radio" name="q_${idx}" value="${optIdx}" />
                  <span><strong>${letters[optIdx]}.</strong> ${opt}</span>
                </label>
              `
                )
                .join("")}
            </div>
            <div class="solution-toggle-wrap hidden">
              <button type="button" class="btn btn-secondary btn-sm btn-toggle-sol" data-idx="${idx}" aria-expanded="false">
                Xem lời giải
              </button>
            </div>
            <div class="solution-slot hidden" id="sol-slot-${idx}">
              ${renderSolutionHtml(item)}
            </div>
          </div>
        `;
      })
      .join("");

    quizContainer.querySelectorAll(".btn-toggle-sol").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.idx;
        const slot = document.getElementById(`sol-slot-${idx}`);
        const isHidden = slot.classList.toggle("hidden");
        btn.setAttribute("aria-expanded", String(!isHidden));
        btn.textContent = isHidden ? "Xem lời giải" : "Ẩn lời giải";
      });
    });

    quizContainer.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        const answered = currentPracticeQuizzes.filter((_, i) =>
          quizContainer.querySelector(`input[name="q_${i}"]:checked`)
        ).length;
        quizProgress.textContent = `${answered} / ${currentPracticeQuizzes.length} câu`;
      });
    });
  }

  generatorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.subjectId = subjectSelect.value;
    state.level = levelSelect.value;
    state.goal = goalSelect.value;
    saveState();
    renderLesson();
    announce("Đã tạo bài giảng ĐGNL mới phù hợp với trình độ của bạn.");
  });

  practiceSubjectSelect.addEventListener("change", () => {
    state.subjectId = practiceSubjectSelect.value;
    saveState();
    renderLesson();
  });

  practiceLevelSelect.addEventListener("change", () => {
    state.level = practiceLevelSelect.value;
    saveState();
    renderLesson();
  });

  // ---------------------------------------------------------
  // Adaptive 5-Question Practice Generator (Dễ -> Khó, Không trùng lặp)
  // ---------------------------------------------------------
  const PRACTICE_SEEN_KEY = "ttedu_practice_seen_v1";
  let currentPracticeQuizzes = [];

  function loadPracticeSeen() {
    try {
      return JSON.parse(localStorage.getItem(PRACTICE_SEEN_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function savePracticeSeen(map) {
    try {
      localStorage.setItem(PRACTICE_SEEN_KEY, JSON.stringify(map));
    } catch {}
  }

  function buildPracticeQuizSet(subjectId, level) {
    const secMap = { "lang-vi": "tv", "lang-en": "en", math: "math", science: "sci" };
    const levelTierMap = { beginner: 1, intermediate: 2, advanced: 3 };
    const diffLabelsByLevel = {
      beginner: ["Nhận biết", "Nhận biết", "Thông hiểu", "Thông hiểu", "Vận dụng"],
      intermediate: ["Nhận biết", "Thông hiểu", "Thông hiểu", "Vận dụng", "Vận dụng cao"],
      advanced: ["Thông hiểu", "Vận dụng", "Vận dụng", "Vận dụng cao", "Vận dụng cao"]
    };
    const targetTiersByLevel = {
      beginner: [1, 1, 2, 2, 3],
      intermediate: [1, 2, 2, 3, 3],
      advanced: [2, 2, 3, 3, 3]
    };

    const pool = [];
    const subjObj = CURRICULUM.find((s) => s.id === subjectId);
    if (subjObj) {
      ["beginner", "intermediate", "advanced"].forEach((lv) => {
        const list = (subjObj.levels[lv] && subjObj.levels[lv].quizzes) || [];
        list.forEach((q) => {
          pool.push({
            q: q.q,
            options: q.options,
            answer: q.answer,
            steps: q.steps || ["Xem đáp án đúng phía trên."],
            tip: q.tip || "Đọc kỹ yêu cầu câu hỏi và loại trừ phương án nhiễu.",
            sourceId: q.sourceId || "cet",
            diffTier: levelTierMap[lv]
          });
        });
      });
    }

    const mockSecId = secMap[subjectId];
    if (typeof MOCK_EXAM_2026 !== "undefined" && mockSecId) {
      const sec = MOCK_EXAM_2026.sections.find((s) => s.id === mockSecId);
      if (sec) {
        const len = sec.questions.length;
        let activePassage = "";
        let passageRemaining = 0;
        sec.questions.forEach((q, idx) => {
          if (q.passage) {
            activePassage = q.passage;
            const rangeMatch = q.passage.match(/(\d+)\s*[–-]\s*(\d+)/);
            passageRemaining = rangeMatch ? Math.max(1, Number(rangeMatch[2]) - Number(rangeMatch[1]) + 1) : 1;
          }
          const attachedPassage = passageRemaining > 0 ? activePassage : "";
          if (passageRemaining > 0) passageRemaining--;

          const tier = idx < len / 3 ? 1 : idx < (2 * len) / 3 ? 2 : 3;
          pool.push({
            q: q.q,
            passage: attachedPassage,
            options: q.options,
            answer: q.answer,
            steps: [q.solution || "Xem đáp án đúng."],
            tip: "Áp dụng kiến thức chuẩn đề ĐGNL ĐHQG-HCM để giải nhanh.",
            sourceId: "cet",
            diffTier: tier
          });
        });
      }
    }

    if (typeof MOCK_EXTRA_POOL !== "undefined" && mockSecId && MOCK_EXTRA_POOL[mockSecId]) {
      MOCK_EXTRA_POOL[mockSecId].forEach((q, idx) => {
        pool.push({
          q: q.q,
          options: q.options,
          answer: q.answer,
          steps: [q.solution || "Xem đáp án đúng."],
          tip: "Kiểm tra lại điều kiện và quy tắc cốt lõi trước khi chọn đáp án.",
          sourceId: "cet",
          diffTier: idx % 3 === 0 ? 1 : idx % 3 === 1 ? 2 : 3
        });
      });
    }

    // Loại bỏ câu trùng nội dung trong pool
    const uniquePool = [];
    const seenInPool = new Set();
    pool.forEach((item) => {
      const key = item.q.trim();
      if (!seenInPool.has(key)) {
        seenInPool.add(key);
        uniquePool.push(item);
      }
    });

    const storeKey = `${subjectId}_${level}`;
    const seenMap = loadPracticeSeen();
    let seenList = Array.isArray(seenMap[storeKey]) ? seenMap[storeKey] : [];
    const prevBatch = Array.isArray(seenMap[`${storeKey}_last`]) ? seenMap[`${storeKey}_last`] : [];

    let unseen = uniquePool.filter((item) => !seenList.includes(item.q.trim()));
    if (unseen.length < 5) {
      // Hết kho câu chưa làm -> reset vòng mới nhưng vẫn loại trừ 5 câu vừa làm ở lượt ngay trước
      seenList = [];
      unseen = uniquePool.filter((item) => !prevBatch.includes(item.q.trim()));
      if (unseen.length < 5) unseen = uniquePool.slice();
    }

    const desiredTiers = targetTiersByLevel[level] || [1, 2, 2, 3, 3];
    const diffLabels = diffLabelsByLevel[level] || ["Nhận biết", "Thông hiểu", "Thông hiểu", "Vận dụng", "Vận dụng cao"];

    const remaining = shuffleArray(unseen);
    const chosen = [];

    desiredTiers.forEach((tier) => {
      let pickIdx = remaining.findIndex((item) => item.diffTier === tier);
      if (pickIdx === -1) {
        pickIdx = remaining.findIndex((item) => Math.abs(item.diffTier - tier) === 1);
      }
      if (pickIdx === -1) pickIdx = 0;
      if (remaining.length > 0) {
        chosen.push(remaining.splice(pickIdx, 1)[0]);
      }
    });

    // Sắp xếp nghiêm ngặt từ dễ đến khó
    chosen.sort((a, b) => a.diffTier - b.diffTier);

    const finalSet = chosen.slice(0, 5).map((item, idx) => ({
      ...shuffleQuestionOptions(item),
      diffLabel: diffLabels[idx] || "Vận dụng"
    }));

    const batchKeys = finalSet.map((i) => i.q.trim());
    seenMap[storeKey] = [...seenList, ...batchKeys];
    seenMap[`${storeKey}_last`] = batchKeys;
    savePracticeSeen(seenMap);

    return finalSet;
  }

  // ---------------------------------------------------------
  // Grade Practice Quiz
  // ---------------------------------------------------------
  btnSubmitQuiz.addEventListener("click", () => {
    const quizzes = currentPracticeQuizzes;
    let score = 0;

    quizzes.forEach((item, idx) => {
      const checked = quizContainer.querySelector(`input[name="q_${idx}"]:checked`);
      const slot = document.getElementById(`sol-slot-${idx}`);
      const toggleBtn = quizContainer.querySelector(`.btn-toggle-sol[data-idx="${idx}"]`);

      const isCorrect = checked && Number(checked.value) === item.answer;
      if (isCorrect) score++;

      slot.innerHTML = renderSolutionHtml(item, isCorrect ? "correct" : "incorrect");
      slot.classList.remove("hidden");
      if (toggleBtn) {
        if (toggleBtn.parentElement) toggleBtn.parentElement.classList.remove("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.textContent = "Ẩn lời giải";
      }
    });

    state.quizSubmitted = true;
    const total = quizzes.length;
    const percent = Math.round((score / total) * 100);
    quizProgress.textContent = `Điểm: ${score} / ${total} (${percent}%)`;

    const { subject } = getCurrentLesson();
    recordQuizResult(subject.id, subject.name, state.level, score, total, percent);

    btnSubmitQuiz.classList.add("hidden");
    btnRetryQuiz.classList.remove("hidden");

    let heading = "";
    let message = "";
    let actionBtnHtml = "";

    if (percent >= 85) {
      heading = `🎉 Xuất sắc! Bạn đạt ${score}/${total} (${percent}%)`;
      if (state.level === "beginner") {
        message = "Bạn đã nắm vững nền tảng. Hệ thống đề xuất nâng lên trình độ Trung cấp (750–900đ).";
        actionBtnHtml = `<button type="button" class="btn btn-primary" data-jump-level="intermediate">⬆️ Nâng lên trình độ Trung cấp</button>`;
      } else if (state.level === "intermediate") {
        message = "Phong độ rất tốt! Bạn đã sẵn sàng thử sức với mức Nâng cao (900–1100+đ).";
        actionBtnHtml = `<button type="button" class="btn btn-primary" data-jump-level="advanced">🚀 Nâng lên trình độ Nâng cao</button>`;
      } else {
        message = "Tuyệt vời! Bạn đã làm chủ mức Nâng cao của phân môn này.";
      }
    } else if (percent >= 50) {
      heading = `👍 Khá tốt! Bạn đạt ${score}/${total} (${percent}%)`;
      message = "Bạn đang ở đúng trình độ phù hợp. Hãy đọc kỹ lời giải từng bước ở các câu sai để củng cố.";
    } else {
      heading = `💡 Cần củng cố thêm! Bạn đạt ${score}/${total} (${percent}%)`;
      if (state.level === "advanced") {
        message = "Mức Nâng cao đang hơi quá sức. Hệ thống gợi ý ôn lại mức Trung cấp trước.";
        actionBtnHtml = `<button type="button" class="btn btn-secondary" data-jump-level="intermediate">⬇️ Chuyển về trình độ Trung cấp</button>`;
      } else if (state.level === "intermediate") {
        message = "Hãy quay lại mức Cơ bản để nắm chắc quy tắc gốc.";
        actionBtnHtml = `<button type="button" class="btn btn-secondary" data-jump-level="beginner">⬇️ Chuyển về trình độ Cơ bản</button>`;
      } else {
        message = "Hãy đọc kỹ Lời giải chi tiết từng bước phía trên và làm lại bài tập nhé.";
      }
    }

    adaptiveFeedback.innerHTML = `<h3>${heading}</h3><p>${message}</p>${actionBtnHtml}`;
    adaptiveFeedback.classList.remove("hidden");

    const jumpBtn = adaptiveFeedback.querySelector("[data-jump-level]");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => {
        state.level = jumpBtn.dataset.jumpLevel;
        saveState();
        renderLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });

  btnRetryQuiz.addEventListener("click", () => {
    renderLesson();
    announce("Đã làm mới bài tập.");
  });

  // ---------------------------------------------------------
  // Diagnostic 2-Mode Switcher (Tự chọn vs Giúp đánh giá 20 câu)
  // ---------------------------------------------------------
  function setDiagnosticMode(mode) {
    const isSelf = mode === "self";
    modeBtnSelf.classList.toggle("active", isSelf);
    modeBtnSelf.setAttribute("aria-selected", String(isSelf));
    modeBtnTest.classList.toggle("active", !isSelf);
    modeBtnTest.setAttribute("aria-selected", String(!isSelf));

    panelSelfSelect.classList.toggle("hidden", !isSelf);
    panelGuidedTest.classList.toggle("hidden", isSelf);
  }

  modeBtnSelf.addEventListener("click", () => setDiagnosticMode("self"));
  modeBtnTest.addEventListener("click", () => setDiagnosticMode("test"));

  levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      const chosen = card.dataset.levelCard;
      if (!chosen) return;
      state.level = chosen;
      saveState();
      renderLesson();
      announce(`Đã chọn trình độ: ${LEVEL_META[chosen].label}`);
    });
  });

  btnSelfGoStudy.addEventListener("click", () => switchView("generator"));

  // ---------------------------------------------------------
  // 20-Question Diagnostic Test (4 Sections x 5 Questions)
  // ---------------------------------------------------------
  function renderDiagnosticTest() {
    let qNumber = 0;
    const letters = ["A", "B", "C", "D"];

    diagnosticForm.innerHTML = DIAGNOSTIC_SECTIONS.map((sec) => {
      const qHtml = sec.questions
        .map((item) => {
          qNumber++;
          return `
            <div class="quiz-item" data-diag-id="${item.id}">
              <p class="quiz-question">Câu ${qNumber}: ${item.q}</p>
              <div class="quiz-options">
                ${item.options
                  .map(
                    (opt, optIdx) => `
                  <label class="quiz-option">
                    <input type="radio" name="diag_${item.id}" value="${optIdx}" />
                    <span><strong>${letters[optIdx]}.</strong> ${opt}</span>
                  </label>
                `
                  )
                  .join("")}
              </div>
              <div class="diag-exp hidden" id="diag-exp-${item.id}"></div>
            </div>
          `;
        })
        .join("");

      return `
        <div class="diag-section-block">
          <h4 class="diag-section-title">${sec.title}</h4>
          <div class="diag-section-questions">${qHtml}</div>
        </div>
      `;
    }).join("");

    diagProgress.textContent = "Đã làm: 0 / 20 câu";
    diagResult.classList.add("hidden");
    diagResult.innerHTML = "";
    btnSubmitDiag.classList.remove("hidden");
    btnRetryDiag.classList.add("hidden");

    diagnosticForm.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        let answered = 0;
        DIAGNOSTIC_SECTIONS.forEach((sec) => {
          sec.questions.forEach((q) => {
            if (diagnosticForm.querySelector(`input[name="diag_${q.id}"]:checked`)) {
              answered++;
            }
          });
        });
        diagProgress.textContent = `Đã làm: ${answered} / 20 câu`;
      });
    });
  }

  btnSubmitDiag.addEventListener("click", () => {
    let totalCorrect = 0;
    const letters = ["A", "B", "C", "D"];
    const breakdown = [];

    DIAGNOSTIC_SECTIONS.forEach((sec) => {
      let secCorrect = 0;
      sec.questions.forEach((q) => {
        const checked = diagnosticForm.querySelector(`input[name="diag_${q.id}"]:checked`);
        const isCorrect = checked && Number(checked.value) === q.answer;
        if (isCorrect) {
          secCorrect++;
          totalCorrect++;
        }
        const expEl = document.getElementById(`diag-exp-${q.id}`);
        expEl.className = `diag-exp ${isCorrect ? "correct" : "incorrect"}`;
        expEl.innerHTML = `${isCorrect ? "✅ Chính xác!" : `❌ Chưa đúng (Đáp án: ${letters[q.answer]}).`} ${q.explanation}`;
        expEl.classList.remove("hidden");
      });
      breakdown.push({ title: sec.title.replace(" (5 câu)", ""), score: secCorrect, total: sec.questions.length });
    });

    // Determine assessed level from 20-question score
    let assessedLevel = "beginner";
    let comment = "Bạn nên bắt đầu từ mức Cơ bản để xây chắc kiến thức nền và quy tắc giải từng bước.";
    if (totalCorrect >= 16) {
      assessedLevel = "advanced";
      comment = "Nền tảng của bạn rất vững! Bạn phù hợp với lộ trình Nâng cao (900–1100+đ) để tối ưu tốc độ và xử lý câu phân loại.";
    } else if (totalCorrect >= 10) {
      assessedLevel = "intermediate";
      comment = "Bạn đã có nền tảng khá tốt! Lộ trình Trung cấp (750–900đ) sẽ giúp bạn làm chủ chuẩn cấu trúc đề ĐHQG-HCM.";
    }

    state.level = assessedLevel;
    saveState();
    recordDiagResult(totalCorrect, 20, assessedLevel);
    renderLesson();

    const meta = LEVEL_META[assessedLevel];
    diagProgress.textContent = `Kết quả: ${totalCorrect} / 20 câu`;

    diagResult.innerHTML = `
      <div class="result-hero-top">
        <div>
          <span class="muted small">KẾT QUẢ ĐÁNH GIÁ TRÌNH ĐỘ CỦA BẠN</span>
          <div class="result-level-big">Trình độ: <span class="level-badge ${meta.badgeClass}" style="font-size:1rem; padding:5px 14px;">${meta.label}</span></div>
        </div>
        <div class="score-pill" style="font-size:1rem; padding:8px 14px;">Tổng điểm: ${totalCorrect} / 20 (${Math.round((totalCorrect / 20) * 100)}%)</div>
      </div>
      <p style="margin:0 0 12px 0;">${comment}</p>
      <div class="breakdown-grid">
        ${breakdown
          .map(
            (b) => `
          <div class="breakdown-item">
            <span>${b.title}</span>
            <strong>${b.score} / ${b.total} câu đúng</strong>
          </div>
        `
          )
          .join("")}
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:10px;">
        <button type="button" class="btn btn-primary" id="btn-result-go-lecture">✨ Vào xem Bài giảng phù hợp →</button>
        <button type="button" class="btn btn-secondary" id="btn-result-go-practice">📝 Vào Luyện tập ngay</button>
      </div>
    `;
    diagResult.classList.remove("hidden");
    btnSubmitDiag.classList.add("hidden");
    btnRetryDiag.classList.remove("hidden");

    document.getElementById("btn-result-go-lecture").addEventListener("click", () => switchView("generator"));
    document.getElementById("btn-result-go-practice").addEventListener("click", () => switchView("practice"));

    diagResult.scrollIntoView({ behavior: "smooth", block: "start" });
    announce(`Kết quả kiểm tra: ${totalCorrect}/20 câu. Trình độ của bạn là ${meta.label}.`);
  });

  btnRetryDiag.addEventListener("click", () => {
    renderDiagnosticTest();
    announce("Đã làm mới bài kiểm tra 20 câu.");
  });

  // ---------------------------------------------------------
  // Verified Sources Directory
  // ---------------------------------------------------------
  function renderAllSources() {
    allSourcesGrid.innerHTML = Object.values(VERIFIED_SOURCES)
      .map(
        (s) => `
      <div class="source-card">
        <div>
          <span class="verified-badge">✔ ${s.trustLevel}</span>
          <h3 style="margin-top:8px;">${s.name}</h3>
          <p class="small" style="font-weight:600; margin-bottom:6px;">${s.category}</p>
          <p>${s.description}</p>
        </div>
        <div class="source-card-footer">
          <span class="muted">${s.verifiedDate}</span>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer">Truy cập nguồn ↗</a>
        </div>
      </div>
    `
      )
      .join("");
  }

  // ---------------------------------------------------------
  // Authentication (Tự tạo acc & Gmail)
  // ---------------------------------------------------------
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (_) {}
  }

  function showAuthError(msg) {
    authError.textContent = msg;
    authError.classList.remove("hidden");
  }

  function clearAuthError() {
    authError.textContent = "";
    authError.classList.add("hidden");
  }

  function setAuthTab(tab) {
    clearAuthError();
    const isLogin = tab === "login";
    tabLogin.classList.toggle("active", isLogin);
    tabLogin.setAttribute("aria-selected", String(isLogin));
    tabRegister.classList.toggle("active", !isLogin);
    tabRegister.setAttribute("aria-selected", String(!isLogin));
    loginForm.classList.toggle("hidden", !isLogin);
    registerForm.classList.toggle("hidden", isLogin);
  }

  tabLogin.addEventListener("click", () => setAuthTab("login"));
  tabRegister.addEventListener("click", () => setAuthTab("register"));

  const GOOGLE_CLIENT_ID = "991004765221-t5n34ms4qa04mj43o2hobf5adp01o6r1.apps.googleusercontent.com";
  let googleTokenClient = null;

  btnGoogleOpen.addEventListener("click", () => {
    clearAuthError();
    if (window.location.hostname.endsWith("netlify.app")) {
      window.location.href = "/.netlify/identity/authorize?provider=google";
      return;
    }
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      if (!googleTokenClient) {
        googleTokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "openid email profile",
          callback: async (tokenResponse) => {
            if (!tokenResponse || !tokenResponse.access_token) {
              showAuthError("Đăng nhập Google bị hủy hoặc không thành công.");
              return;
            }
            try {
              const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              const info = await res.json();
              if (!info || !info.email) {
                showAuthError("Không lấy được thông tin tài khoản Google.");
                return;
              }
              const cleanEmail = info.email.toLowerCase();
              const users = getUsers();
              let user = users.find((u) => u.email === cleanEmail);
              if (!user) {
                user = {
                  name: info.name || cleanEmail.split("@")[0],
                  email: cleanEmail,
                  avatarUrl: info.picture || "",
                  provider: "google",
                  level: state.level
                };
                users.push(user);
                saveUsers(users);
              } else if (info.picture && !user.avatarUrl) {
                user.avatarUrl = info.picture;
                saveUsers(users);
              }
              signInUser(user);
            } catch (_) {
              showAuthError("Lỗi kết nối khi lấy thông tin tài khoản Google.");
            }
          }
        });
      }
      googleTokenClient.requestAccessToken({ prompt: "select_account" });
      return;
    }
    showAuthError("Đang tải dịch vụ Google, vui lòng thử lại sau 2 giây.");
  });

  function signInUser(user) {
    currentUser = user;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (_) {}

    if (user.level) state.level = user.level;
    userDisplayName.textContent = user.name;
    userDisplayEmail.textContent = user.email;
    renderAvatarInto(userAvatar, user);

    authGate.classList.add("hidden");
    a11yBar.classList.remove("hidden");
    appShell.classList.remove("hidden");
    updateAdminVisibility();
    renderLesson();
    renderProfile();
    maybeShowOnboarding();
    announce(`Xin chào ${user.name}! Bạn đã đăng nhập thành công.`);
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAuthError();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;

    if (!name) {
      showAuthError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!email || !email.includes("@")) {
      showAuthError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (password.length < 6) {
      showAuthError("Mật khẩu cần có ít nhất 6 ký tự.");
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      showAuthError("Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.");
      return;
    }

    const newUser = { name, email, password, provider: "local", level: state.level };
    users.push(newUser);
    saveUsers(users);
    signInUser(newUser);
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAuthError();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      showAuthError("Không tìm thấy tài khoản này. Bạn hãy chọn 'Tạo tài khoản mới' hoặc đăng nhập bằng Gmail.");
      return;
    }
    if (user.provider === "gmail") {
      showAuthError("Tài khoản này được tạo bằng Gmail. Vui lòng bấm nút 'Tiếp tục / Tạo tài khoản bằng Gmail' phía trên.");
      return;
    }
    if (user.password !== password) {
      showAuthError("Mật khẩu chưa chính xác. Vui lòng thử lại.");
      return;
    }
    signInUser(user);
  });

  btnLogout.addEventListener("click", async () => {
    stopSpeech();
    currentUser = null;
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (_) {}
    appShell.classList.add("hidden");
    a11yBar.classList.add("hidden");
    authGate.classList.remove("hidden");
    loginForm.reset();
    registerForm.reset();
    clearAuthError();
    announce("Bạn đã đăng xuất.");
  });

  async function checkSession() {
    // 1. Xử lý callback sau khi đăng nhập Google OAuth (Netlify Identity)
    try {
      const hash = window.location.hash || "";
      if (hash.includes("access_token=")) {
        const params = new URLSearchParams(hash.replace(/^#/, ""));
        const accessToken = params.get("access_token");
        if (accessToken) {
          const res = await fetch("/.netlify/identity/user", {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (res.ok) {
            const idUser = await res.json();
            const displayName =
              (idUser.user_metadata && idUser.user_metadata.full_name) ||
              (idUser.email ? idUser.email.split("@")[0] : "Người học Google");
            history.replaceState(null, "", window.location.pathname + window.location.search);
            signInUser({
              name: displayName,
              email: idUser.email || "google-user@gmail.com",
              provider: "google",
              level: state.level
            });
            return;
          }
        }
      }
    } catch (_) {}

    // 2. Kiểm tra phiên đăng nhập tài khoản tự tạo cục bộ
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (saved && saved.email) {
        signInUser(saved);
        return;
      }
    } catch (_) {}

    authGate.classList.remove("hidden");
    a11yBar.classList.add("hidden");
    appShell.classList.add("hidden");
  }

  // ---------------------------------------------------------
  // User Profile & Learning Progress Tracking
  // ---------------------------------------------------------
  function getProgressKey() {
    const email = (currentUser && currentUser.email) || "guest";
    return `eduadapt_dgnl_progress_${email}`;
  }

  function loadProgress() {
    try {
      const raw = JSON.parse(localStorage.getItem(getProgressKey()));
      if (raw) return raw;
    } catch (_) {}
    return {
      targetScore: "950",
      avatarDataUrl: "",
      studiedLessons: [],
      quizHistory: [],
      lastDiag: null
    };
  }

  function saveProgress(prog) {
    try {
      localStorage.setItem(getProgressKey(), JSON.stringify(prog));
    } catch (_) {}
  }

  function formatNow() {
    return new Date().toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit"
    });
  }

  function renderAvatarInto(el, user) {
    const prog = loadProgress();
    const imgSrc = prog.avatarDataUrl || (user && user.avatarUrl);
    if (imgSrc) {
      el.innerHTML = `<img src="${imgSrc}" alt="Avatar" />`;
    } else {
      el.textContent = ((user && (user.name || user.email)) || "U").trim().charAt(0).toUpperCase();
    }
  }

  function recordStudiedLesson() {
    if (!currentUser) return;
    const { subject, lesson } = getCurrentLesson();
    const prog = loadProgress();
    const key = `${subject.id}_${state.level}`;
    const existingIdx = prog.studiedLessons.findIndex((item) => item.key === key);
    const entry = {
      key,
      subjectId: subject.id,
      subjectName: subject.name,
      level: state.level,
      title: lesson.title,
      date: formatNow()
    };
    if (existingIdx >= 0) {
      prog.studiedLessons.splice(existingIdx, 1);
    }
    prog.studiedLessons.unshift(entry);
    saveProgress(prog);
    renderProfile();
    announce(`Đã lưu "${lesson.title}" vào danh sách nội dung đã học!`);
  }

  function recordQuizResult(subjectId, subjectName, level, score, total, percent) {
    if (!currentUser) return;
    const prog = loadProgress();
    prog.quizHistory.unshift({
      subjectId,
      subjectName,
      level,
      score,
      total,
      percent,
      date: formatNow()
    });
    if (prog.quizHistory.length > 20) prog.quizHistory.pop();
    saveProgress(prog);
    renderProfile();
  }

  function recordDiagResult(score, total, level) {
    if (!currentUser) return;
    const prog = loadProgress();
    prog.lastDiag = { score, total, level, date: formatNow() };
    saveProgress(prog);
    renderProfile();
  }

  btnMarkStudied.addEventListener("click", () => {
    recordStudiedLesson();
    btnMarkStudied.textContent = "✔ Đã lưu vào nội dung đã học";
    setTimeout(() => {
      btnMarkStudied.textContent = "✅ Đánh dấu đã học xong bài này";
    }, 2500);
  });

  avatarFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const prog = loadProgress();
      prog.avatarDataUrl = reader.result;
      saveProgress(prog);
      renderAvatarInto(userAvatar, currentUser);
      renderAvatarInto(fbDropAvatar, currentUser);
      renderAvatarInto(profileAvatarLg, currentUser);
      announce("Đã cập nhật ảnh đại diện mới!");
    };
    reader.readAsDataURL(file);
  });

  btnSaveProfile.addEventListener("click", () => {
    if (!currentUser) return;
    const newName = profileEditName.value.trim();
    if (newName) {
      currentUser.name = newName;
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      } catch (_) {}
      userDisplayName.textContent = newName;
    }
    const prog = loadProgress();
    prog.targetScore = profileEditTarget.value;
    saveProgress(prog);
    renderProfile();
    announce("Đã lưu thông tin hồ sơ của bạn!");
  });

  function renderProfile() {
    if (!currentUser) return;
    const prog = loadProgress();
    const meta = LEVEL_META[state.level];

    renderAvatarInto(profileAvatarLg, currentUser);
    renderAvatarInto(userAvatar, currentUser);
    renderAvatarInto(fbDropAvatar, currentUser);
    profileHeading.textContent = currentUser.name;
    profileEmailText.textContent = currentUser.email;
    profileProviderBadge.textContent = isCurrentUserOwner()
      ? "👑 Owner (Chủ sở hữu)"
      : isCurrentUserAdmin()
      ? "⚙️ Quản trị viên (Admin)"
      : currentUser.provider === "google"
      ? "🎓 Người học (Google)"
      : "🎓 Người học";

    profileLevelBadge.textContent = meta.label;
    profileLevelBadge.className = `level-badge ${meta.badgeClass}`;
    profileTargetBadge.textContent = `🎯 Mục tiêu: ${prog.targetScore}+ điểm`;

    profileEditName.value = currentUser.name;
    profileEditTarget.value = prog.targetScore || "950";

    // Stats
    statLessonsCount.textContent = String(prog.studiedLessons.length);
    statQuizzesCount.textContent = String(prog.quizHistory.length);
    if (prog.quizHistory.length > 0) {
      const avg = Math.round(
        prog.quizHistory.reduce((sum, q) => sum + q.percent, 0) / prog.quizHistory.length
      );
      statAvgScore.textContent = `${avg}%`;
    } else {
      statAvgScore.textContent = "--%";
    }
    statDiagScore.textContent = prog.lastDiag
      ? `${prog.lastDiag.score}/${prog.lastDiag.total} câu`
      : "Chưa làm";

    // Subject progress bars (3 levels per subject)
    profileSubjectProgress.innerHTML = CURRICULUM.map((subj) => {
      const doneCount = prog.studiedLessons.filter((l) => l.subjectId === subj.id).length;
      const pct = Math.min(100, Math.round((doneCount / 3) * 100));
      return `
        <div class="subj-prog-row">
          <div class="subj-prog-top">
            <span>${subj.name}</span>
            <span>${doneCount}/3 mức độ (${pct}%)</span>
          </div>
          <div class="prog-track">
            <div class="prog-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join("");

    // Studied lessons list
    if (prog.studiedLessons.length === 0) {
      profileStudiedList.innerHTML = `<div class="empty-state">Bạn chưa đánh dấu bài giảng nào. Hãy vào mục <strong>Tạo Bài giảng</strong> và bấm "Đánh dấu đã học xong bài này" để lưu lại nhé!</div>`;
    } else {
      profileStudiedList.innerHTML = prog.studiedLessons
        .map(
          (item) => `
        <div class="history-item">
          <div>
            <strong>${item.title}</strong>
            <span class="muted small">${item.subjectName} • ${LEVEL_META[item.level].short} • ${item.date}</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm btn-reopen-lesson" data-subj="${item.subjectId}" data-lvl="${item.level}">
            Mở lại →
          </button>
        </div>
      `
        )
        .join("");

      profileStudiedList.querySelectorAll(".btn-reopen-lesson").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.subjectId = btn.dataset.subj;
          state.level = btn.dataset.lvl;
          saveState();
          renderLesson();
          switchView("generator");
        });
      });
    }

    // Quiz history list
    if (prog.quizHistory.length === 0) {
      profileQuizHistory.innerHTML = `<div class="empty-state">Chưa có lịch sử luyện tập. Hãy vào mục <strong>Luyện tập &amp; Lời giải</strong> để làm bài nhé!</div>`;
    } else {
      profileQuizHistory.innerHTML = prog.quizHistory
        .slice(0, 8)
        .map(
          (q) => `
        <div class="history-item">
          <div>
            <strong>${q.subjectName} (${LEVEL_META[q.level].short})</strong>
            <span class="muted small">${q.date}</span>
          </div>
          <span class="score-pill">${q.score}/${q.total} (${q.percent}%)</span>
        </div>
      `
        )
        .join("");
    }
  }

  // ---------------------------------------------------------
  // RBAC (Admin vs User) & Admin Content Management
  // ---------------------------------------------------------
  function getAdminEmails() {
    try {
      const list = JSON.parse(localStorage.getItem(ADMINS_KEY)) || [];
      if (!list.includes(OWNER_EMAIL)) list.unshift(OWNER_EMAIL);
      return list;
    } catch (_) {
      return [OWNER_EMAIL];
    }
  }

  function saveAdminEmails(list) {
    try {
      localStorage.setItem(ADMINS_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  function isCurrentUserOwner() {
    return Boolean(currentUser && currentUser.email && currentUser.email.toLowerCase() === OWNER_EMAIL);
  }

  function isCurrentUserAdmin() {
    if (!currentUser || !currentUser.email) return false;
    const email = currentUser.email.toLowerCase();
    return email === OWNER_EMAIL || getAdminEmails().includes(email);
  }

  function updateAdminVisibility() {
    const isAdmin = isCurrentUserAdmin();
    if (navAdminBtn) navAdminBtn.classList.toggle("hidden", !isAdmin);
  }

  function loadCustomContent() {
    try {
      return JSON.parse(localStorage.getItem(CUSTOM_CONTENT_KEY)) || { lessons: {}, extraQuizzes: {} };
    } catch (_) {
      return { lessons: {}, extraQuizzes: {} };
    }
  }

  function saveCustomContent(data) {
    try {
      localStorage.setItem(CUSTOM_CONTENT_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function applyCustomContentToCurriculum() {
    const custom = loadCustomContent();
    CURRICULUM.forEach((subj) => {
      ["beginner", "intermediate", "advanced"].forEach((lvl) => {
        const key = `${subj.id}_${lvl}`;
        const lesson = subj.levels[lvl];
        if (!lesson._orig) {
          lesson._orig = {
            title: lesson.title,
            summary: lesson.summary,
            example: lesson.example,
            takeaway: lesson.takeaway,
            baseQuizLen: lesson.quizzes.length
          };
        }
        const override = custom.lessons[key];
        lesson.title = (override && override.title) || lesson._orig.title;
        lesson.summary = (override && override.summary) || lesson._orig.summary;
        lesson.example = (override && override.example) || lesson._orig.example;
        lesson.takeaway = (override && override.takeaway) || lesson._orig.takeaway;

        const extras = custom.extraQuizzes[key] || [];
        lesson.quizzes = lesson.quizzes.slice(0, lesson._orig.baseQuizLen).concat(extras);
      });
    });
  }

  function loadAdminLessonFields() {
    if (!adminEditSubject) return;
    const subj = CURRICULUM.find((s) => s.id === adminEditSubject.value) || CURRICULUM[0];
    const lesson = subj.levels[adminEditLevel.value];
    adminLessonTitle.value = lesson.title;
    adminLessonSummary.value = lesson.summary;
    adminLessonExample.value = lesson.example;
    adminLessonTakeaway.value = lesson.takeaway;
  }

  function renderAdminPanel() {
    if (!isCurrentUserAdmin()) return;
    const admins = getAdminEmails();
    adminRoleList.innerHTML = admins
      .map((email) => {
        const isOwner = email === OWNER_EMAIL;
        return `
          <div class="history-item">
            <div>
              <strong>${email}</strong>
              <span class="muted small">${isOwner ? "👑 Admin gốc (Chủ sở hữu)" : "⚙️ Quản trị viên (Cộng tác viên)"}</span>
            </div>
            ${
              isOwner
                ? `<span class="verified-badge">🔒 Owner (Được bảo vệ)</span>`
                : `<button type="button" class="btn btn-secondary btn-sm btn-remove-admin" data-email="${email}">Gỡ quyền</button>`
            }
          </div>
        `;
      })
      .join("");

    adminRoleList.querySelectorAll(".btn-remove-admin").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = (btn.dataset.email || "").toLowerCase();
        if (target === OWNER_EMAIL) {
          announce("Không thể gỡ quyền của Owner (Chủ sở hữu Server).");
          return;
        }
        const updated = getAdminEmails().filter((e) => e !== target);
        saveAdminEmails(updated);
        renderAdminPanel();
        announce(`Đã gỡ quyền Admin của ${target}.`);
      });
    });

    loadAdminLessonFields();
  }

  if (adminAddRoleForm) {
    adminAddRoleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = adminNewEmail.value.trim().toLowerCase();
      if (!email || !email.includes("@")) return;
      const admins = getAdminEmails();
      if (!admins.includes(email)) {
        admins.push(email);
        saveAdminEmails(admins);
      }
      adminNewEmail.value = "";
      renderAdminPanel();
      announce(`Đã cấp quyền Admin cho ${email}!`);
    });
  }

  if (adminEditSubject) {
    adminEditSubject.addEventListener("change", loadAdminLessonFields);
    adminEditLevel.addEventListener("change", loadAdminLessonFields);
  }

  if (adminEditLessonForm) {
    adminEditLessonForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const key = `${adminEditSubject.value}_${adminEditLevel.value}`;
      const custom = loadCustomContent();
      custom.lessons[key] = {
        title: adminLessonTitle.value.trim(),
        summary: adminLessonSummary.value.trim(),
        example: adminLessonExample.value.trim(),
        takeaway: adminLessonTakeaway.value.trim()
      };
      saveCustomContent(custom);
      applyCustomContentToCurriculum();
      renderLesson();
      announce("Đã lưu thay đổi nội dung bài giảng!");
    });
  }

  if (btnAdminResetLesson) {
    btnAdminResetLesson.addEventListener("click", () => {
      const key = `${adminEditSubject.value}_${adminEditLevel.value}`;
      const custom = loadCustomContent();
      delete custom.lessons[key];
      saveCustomContent(custom);
      applyCustomContentToCurriculum();
      loadAdminLessonFields();
      renderLesson();
      announce("Đã khôi phục bài giảng về nội dung mặc định.");
    });
  }

  if (adminAddQuizForm) {
    adminAddQuizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const key = `${adminEditSubject.value}_${adminEditLevel.value}`;
      const steps = document
        .getElementById("admin-q-steps")
        .value.split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const newQuiz = {
        q: document.getElementById("admin-q-text").value.trim(),
        options: [
          document.getElementById("admin-q-opt0").value.trim(),
          document.getElementById("admin-q-opt1").value.trim(),
          document.getElementById("admin-q-opt2").value.trim(),
          document.getElementById("admin-q-opt3").value.trim()
        ],
        answer: Number(document.getElementById("admin-q-answer").value),
        steps: steps.length ? steps : ["Xem đáp án đúng phía trên."],
        tip: document.getElementById("admin-q-tip").value.trim(),
        sourceId: "cet"
      };
      const custom = loadCustomContent();
      if (!custom.extraQuizzes[key]) custom.extraQuizzes[key] = [];
      custom.extraQuizzes[key].push(newQuiz);
      saveCustomContent(custom);
      applyCustomContentToCurriculum();
      renderLesson();
      adminAddQuizForm.reset();
      announce("Đã thêm câu hỏi mới vào kho đề luyện tập!");
    });
  }

  // ---------------------------------------------------------
  // Onboarding for New Users (Đã biết / Chưa biết ĐGNL)
  // ---------------------------------------------------------
  function maybeShowOnboarding() {
    if (!currentUser || !onboardingModal) return;
    const prog = loadProgress();
    if (!prog.onboardingDone) {
      onbStepAsk.classList.remove("hidden");
      onbStepGuide.classList.add("hidden");
      onboardingModal.classList.remove("hidden");
    }
  }

  function finishOnboarding() {
    const prog = loadProgress();
    prog.onboardingDone = true;
    saveProgress(prog);
    if (onboardingModal) onboardingModal.classList.add("hidden");
  }

  if (btnOnbKnow) {
    btnOnbKnow.addEventListener("click", () => {
      finishOnboarding();
      announce("Chào mừng bạn bắt đầu ôn luyện!");
    });
  }

  if (btnOnbNew) {
    btnOnbNew.addEventListener("click", () => {
      onbStepAsk.classList.add("hidden");
      onbStepGuide.classList.remove("hidden");
    });
  }

  if (btnOnbStart) {
    btnOnbStart.addEventListener("click", () => {
      finishOnboarding();
      switchView("generator");
    });
  }

  if (btnOnbGoDiag) {
    btnOnbGoDiag.addEventListener("click", () => {
      finishOnboarding();
      switchView("diagnostic");
      setDiagnosticMode("test");
    });
  }

  // ---------------------------------------------------------
  // In-Depth Level-Tailored Lecture Modules (Bám sát đề 2026)
  // ---------------------------------------------------------
  function getLevelDepthHtml(subjectId, level) {
    const guides = {
      beginner: {
        heading: "3. Lộ trình tiếp cận & Checklist tránh mất điểm (Mức Cơ bản 600–750đ)",
        points: [
          "Đọc chậm, gạch chân đúng từ khóa trọng tâm trong câu hỏi (ví dụ: KHÔNG đúng, SAI, ít nhất, tối đa).",
          "Áp dụng đúng 1 công thức hoặc quy tắc chuẩn cho từng dạng bài, không đoán mò khi chưa kiểm tra điều kiện cơ bản.",
          "Dành tối đa 1 phút 15 giây cho mỗi câu nền tảng; nếu gặp câu tính toán dài hãy đánh dấu để quay lại sau."
        ],
        examNote: "Trong đề ĐGNL ĐHQG-HCM 2026, nhóm câu mức Cơ bản chiếm khoảng 40–45% tổng số câu. Nắm chắc nhóm này giúp bạn đạt vững mốc 650–750 điểm."
      },
      intermediate: {
        heading: "3. Kỹ thuật xử lý nhanh & Nhận diện dạng đề 2026 (Mức Trung cấp 750–900đ)",
        points: [
          "Kết hợp loại trừ 2 phương án nhiễu rõ ràng trước khi tính toán chi tiết hoặc đối chiếu lại ngữ liệu.",
          "Với nhóm câu đọc hiểu/số liệu liên hoàn (3–5 câu chung 1 dữ kiện), đọc lướt câu hỏi trước để khoanh vùng đúng đoạn văn hoặc hàng/cột cần tính.",
          "Ghi nhớ các bẫy kinh điển của đề 2026: nhầm tỷ trọng (%) với giá trị tuyệt đối, nhầm nghĩa Hán Việt gần âm, nhầm điều kiện biến cố đối."
        ],
        examNote: "Để vượt mốc 850–900 điểm, bạn cần hoàn thành nhóm câu Trung cấp với độ chính xác trên 85% và giữ nhịp độ đều 1,2 phút/câu."
      },
      advanced: {
        heading: "3. Tư duy phân loại 900–1100+đ & Chiến thuật chống bẫy đề 2026",
        points: [
          "Nhận diện ngay câu hỏi mang trọng số IRT cao (câu suy luận sâu, bài toán tối ưu quy hoạch tuyến tính, xác suất toàn phần/Bayes, logic nhiều ràng buộc).",
          "Kiểm chứng ngược đáp án bằng cách thử trường hợp biên hoặc đối chiếu với toàn bộ ràng buộc logic để tránh bẫy 'đúng một phần'.",
          "Tối ưu thời gian: dùng công thức rút gọn (đỉnh parabol, mệnh đề phản đảo, tỷ lệ tương đối) để tiết kiệm 30–40 giây mỗi câu vận dụng cao."
        ],
        examNote: "Theo thang điểm IRT của ĐHQG-HCM, trả lời đúng các câu phân loại ở mức Nâng cao giúp điểm số tăng vượt trội so với câu dễ."
      }
    };
    const g = guides[level] || guides.beginner;
    const subjectFocus = {
      "lang-vi": "Trọng tâm đề 2026 (Tiếng Việt): Chính tả Hán Việt (sỗ sàng, súc tích, giành/dành), lỗi thiếu chủ/vị ngữ, phong cách ngôn ngữ, thi pháp thơ Đường luật và đọc hiểu văn bản thông tin/nghị luận.",
      "lang-en": "Trọng tâm đề 2026 (Tiếng Anh): Phrasal verbs, sự hòa hợp chủ–vị, mệnh đề quan hệ rút gọn, Paraphrase (viết lại câu tương đương) và 2 bài đọc hiểu học thuật (từ quy chiếu, suy luận, ý chính).",
      math: "Trọng tâm đề 2026 (Toán học): Hàm số & tiệm cận, giới hạn/cấp số nhân lùi vô hạn, xác suất biến cố đối & xác suất toàn phần, quy hoạch tuyến tính tối ưu doanh thu và hình học tọa độ Oxyz/Oxy.",
      science: "Trọng tâm đề 2026 (Tư duy Khoa học): Bài toán Logic sắp xếp/phân nhóm (3 câu/chùm), phân tích biểu đồ cơ cấu & bảng lợi nhuận, cùng các cụm Suy luận Khoa học (áp suất hơi bão hòa, truyền tải điện, sinh thái, lịch sử)."
    };

    return `
      <div class="lecture-depth-box">
        <h3>${g.heading}</h3>
        <ul>
          ${g.points.map((p) => `<li>${p}</li>`).join("")}
        </ul>
        <p style="margin:10px 0 6px 0; font-size:0.9rem;"><strong>Bám sát đề thi 2026:</strong> ${subjectFocus[subjectId] || ""}</p>
        <p class="muted small" style="margin:0;">${g.examNote}</p>
      </div>
    `;
  }

  // ---------------------------------------------------------
  // Mock Exam 2026 (40 câu / 50 phút / Chấm thang 1.200 điểm)
  // ---------------------------------------------------------
  let mockTimerInterval = null;
  let mockSecondsLeft = 50 * 60;
  let mockSubmitted = false;

  function formatTimer(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function stopMockTimer() {
    if (mockTimerInterval) {
      clearInterval(mockTimerInterval);
      mockTimerInterval = null;
    }
  }

  const LAST_MOCK_IDX_KEY = "ttedu_last_mock_idx_v1";
  let currentMockExam = null;

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function shuffleQuestionOptions(q) {
    const indexed = q.options.map((text, idx) => ({ text, isAns: idx === q.answer }));
    const shuffled = shuffleArray(indexed);
    return {
      ...q,
      options: shuffled.map((o) => o.text),
      answer: shuffled.findIndex((o) => o.isAns)
    };
  }

  function buildNextMockExam() {
    if (typeof MOCK_EXAM_2026 === "undefined") return null;
    const templates =
      typeof MOCK_EXAM_TEMPLATES !== "undefined" && MOCK_EXAM_TEMPLATES.length
        ? MOCK_EXAM_TEMPLATES
        : [{ code: "VACT-01", label: "Đề số 01 — ĐGNL ĐHQG-HCM" }];

    const lastIdx = Number(localStorage.getItem(LAST_MOCK_IDX_KEY) ?? -1);
    const candidates = templates.map((_, i) => i).filter((i) => i !== lastIdx);
    const chosenIdx = candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : 0;
    localStorage.setItem(LAST_MOCK_IDX_KEY, String(chosenIdx));
    const tpl = templates[chosenIdx];
    const variantSeed = Math.floor(100 + Math.random() * 900);

    const sections = MOCK_EXAM_2026.sections.map((sec) => {
      const extra = (typeof MOCK_EXTRA_POOL !== "undefined" && MOCK_EXTRA_POOL[sec.id]) || [];
      const standalone = [];
      const passageItems = [];
      let passageRemaining = 0;

      sec.questions.forEach((q) => {
        if (q.passage) {
          const rangeMatch = q.passage.match(/(\d+)\s*[–-]\s*(\d+)/);
          passageRemaining = rangeMatch ? Math.max(1, Number(rangeMatch[2]) - Number(rangeMatch[1]) + 1) : 1;
        }
        if (passageRemaining > 0) {
          passageItems.push(q);
          passageRemaining--;
        } else {
          standalone.push(q);
        }
      });

      const targetCount = sec.questions.length; // 30 câu/phần
      const needStandalone = Math.max(0, targetCount - passageItems.length);
      const mixedStandalone = shuffleArray([...standalone, ...extra]).slice(0, needStandalone);
      const combined = [...mixedStandalone, ...passageItems].map((q, idx) => ({
        ...shuffleQuestionOptions(q),
        id: `${sec.id}_${variantSeed}_${idx + 1}`
      }));

      return {
        id: sec.id,
        name: sec.name,
        questions: combined
      };
    });

    return {
      id: `${tpl.code}-${variantSeed}`,
      code: `${tpl.code}-${variantSeed}`,
      title: `${tpl.label} (Mã đề ${tpl.code}-${variantSeed})`,
      durationMinutes: MOCK_EXAM_2026.durationMinutes,
      totalQuestions: sections.reduce((sum, s) => sum + s.questions.length, 0),
      sections
    };
  }

  let mockCurrentPage = 0;

  function showMockPage(pageIdx) {
    if (!currentMockExam || !mockExamBody) return;
    const totalPages = currentMockExam.sections.length;
    mockCurrentPage = Math.max(0, Math.min(pageIdx, totalPages - 1));

    mockExamBody.querySelectorAll(".mock-section-page").forEach((el, idx) => {
      el.classList.toggle("hidden", idx !== mockCurrentPage);
    });

    mockExamBody.querySelectorAll(".mock-page-tab").forEach((btn, idx) => {
      const isActive = idx === mockCurrentPage;
      btn.classList.toggle("btn-primary", isActive);
      btn.classList.toggle("btn-secondary", !isActive);
      btn.setAttribute("aria-current", isActive ? "page" : "false");
    });

    const prevBtn = document.getElementById("btn-mock-prev-page");
    const nextBtn = document.getElementById("btn-mock-next-page");
    const indicator = document.getElementById("mock-page-indicator");
    if (prevBtn) prevBtn.disabled = mockCurrentPage === 0;
    if (nextBtn) nextBtn.disabled = mockCurrentPage === totalPages - 1;
    if (indicator) {
      const secName = currentMockExam.sections[mockCurrentPage].name;
      indicator.textContent = `Trang ${mockCurrentPage + 1} / ${totalPages}: ${secName}`;
    }

    if (mockStickyBar) {
      mockStickyBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderMockExam() {
    if (!currentMockExam || !mockExamBody) return;
    mockCurrentPage = 0;
    let qNum = 0;
    const letters = ["A", "B", "C", "D"];
    const totalPages = currentMockExam.sections.length;

    const tabsHtml = currentMockExam.sections
      .map(
        (sec, idx) => `
          <button type="button" class="btn btn-sm mock-page-tab ${idx === 0 ? "btn-primary" : "btn-secondary"}" data-mock-page="${idx}">
            Trang ${idx + 1}: ${sec.name.replace(/\s*\(\d+\s*câu\)/, "")}
          </button>
        `
      )
      .join("");

    mockExamBody.innerHTML =
      `<div class="card" style="padding:12px 16px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <strong>${currentMockExam.title}</strong>
        <span class="muted small">Đề được sinh ngẫu nhiên khác đề trước • ${currentMockExam.totalQuestions} câu / ${currentMockExam.durationMinutes} phút</span>
      </div>
      <div class="card" style="padding:12px 16px; margin-bottom:14px; display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between;">
        <div style="display:flex; flex-wrap:wrap; gap:8px;">${tabsHtml}</div>
        <span class="muted small" id="mock-page-indicator">Trang 1 / ${totalPages}: ${currentMockExam.sections[0].name}</span>
      </div>` +
      currentMockExam.sections
        .map((sec, secIdx) => {
          const itemsHtml = sec.questions
            .map((item) => {
              qNum++;
              return `
                <div class="quiz-item" data-mock-id="${item.id}">
                  ${item.passage ? `<div class="mock-passage">${item.passage}</div>` : ""}
                  <p class="quiz-question">Câu ${qNum}: ${item.q}</p>
                  <div class="quiz-options">
                    ${item.options
                      .map(
                        (opt, idx) => `
                      <label class="quiz-option">
                        <input type="radio" name="mock_${item.id}" value="${idx}" />
                        <span><strong>${letters[idx]}.</strong> ${opt}</span>
                      </label>
                    `
                      )
                      .join("")}
                  </div>
                  <div class="diag-exp hidden" id="mock-exp-${item.id}"></div>
                </div>
              `;
            })
            .join("");

          return `
            <div class="diag-section-block mock-section-page ${secIdx === 0 ? "" : "hidden"}" data-section-idx="${secIdx}">
              <h4 class="diag-section-title">${sec.name}</h4>
              <div class="diag-section-questions">${itemsHtml}</div>
            </div>
          `;
        })
        .join("") +
      `<div class="card" style="padding:14px 16px; margin-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <button type="button" class="btn btn-secondary" id="btn-mock-prev-page" disabled>&larr; Quay lại trang trước</button>
        <button type="button" class="btn btn-primary" id="btn-mock-next-page">Qua trang kế tiếp &rarr;</button>
      </div>`;

    mockExamBody.querySelectorAll(".mock-page-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        showMockPage(Number(btn.dataset.mockPage));
      });
    });

    const prevBtn = document.getElementById("btn-mock-prev-page");
    const nextBtn = document.getElementById("btn-mock-next-page");
    if (prevBtn) prevBtn.addEventListener("click", () => showMockPage(mockCurrentPage - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showMockPage(mockCurrentPage + 1));

    mockExamBody.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        let answered = 0;
        currentMockExam.sections.forEach((sec) => {
          sec.questions.forEach((q) => {
            if (mockExamBody.querySelector(`input[name="mock_${q.id}"]:checked`)) answered++;
          });
        });
        mockAnsweredCount.textContent = `Đã làm: ${answered} / ${currentMockExam.totalQuestions}`;
      });
    });
  }

  function startMockExam() {
    currentMockExam = buildNextMockExam();
    if (!currentMockExam) return;
    stopMockTimer();
    mockSubmitted = false;
    mockSecondsLeft = currentMockExam.durationMinutes * 60;
    mockTimerEl.textContent = formatTimer(mockSecondsLeft);
    mockAnsweredCount.textContent = `Đã làm: 0 / ${currentMockExam.totalQuestions}`;
    mockResultBox.classList.add("hidden");
    mockResultBox.innerHTML = "";
    btnSubmitMock.classList.remove("hidden");
    btnRestartMock.classList.add("hidden");
    btnRestartMock.textContent = "Thi đề mới khác";
    mockStickyBar.classList.remove("hidden");
    mockExamBody.classList.remove("hidden");

    renderMockExam();

    mockTimerInterval = setInterval(() => {
      mockSecondsLeft--;
      mockTimerEl.textContent = formatTimer(Math.max(0, mockSecondsLeft));
      if (mockSecondsLeft <= 0) {
        gradeMockExam(true);
      }
    }, 1000);
    announce(`Đã bắt đầu ${currentMockExam.title}.`);
  }

  function gradeMockExam(autoSubmitted = false) {
    if (mockSubmitted || !currentMockExam) return;
    mockSubmitted = true;
    stopMockTimer();

    const letters = ["A", "B", "C", "D"];
    let totalCorrect = 0;
    const breakdown = [];

    currentMockExam.sections.forEach((sec) => {
      let secCorrect = 0;
      sec.questions.forEach((q) => {
        const checked = mockExamBody.querySelector(`input[name="mock_${q.id}"]:checked`);
        const isCorrect = checked && Number(checked.value) === q.answer;
        if (isCorrect) {
          secCorrect++;
          totalCorrect++;
        }
        const expEl = document.getElementById(`mock-exp-${q.id}`);
        if (expEl) {
          expEl.className = `diag-exp ${isCorrect ? "correct" : "incorrect"}`;
          expEl.innerHTML = `<strong>${isCorrect ? "Chính xác!" : `Chưa đúng (Đáp án: ${letters[q.answer]}).`}</strong> ${q.solution}`;
          expEl.classList.remove("hidden");
        }
      });
      breakdown.push({
        title: sec.name.replace(/\s*\(\d+\s*câu\)/, ""),
        score: secCorrect,
        total: sec.questions.length
      });
    });

    const total = currentMockExam.totalQuestions;
    const estScore1200 = Math.round((totalCorrect / total) * 1200);
    const percent = Math.round((totalCorrect / total) * 100);

    recordQuizResult("mock-vact", `Thi thử ĐGNL (${currentMockExam.code})`, state.level, totalCorrect, total, percent);

    mockResultBox.innerHTML = `
      <div class="result-hero-top">
        <div>
          <span class="muted small">${autoSubmitted ? "HẾT GIỜ — TỰ ĐỘNG NỘP BÀI" : `KẾT QUẢ ${currentMockExam.title.toUpperCase()}`}</span>
          <div class="result-level-big">Điểm quy đổi ước lượng: <span class="level-badge level-intermediate" style="font-size:1.1rem; padding:6px 14px;">${estScore1200} / 1.200 điểm</span></div>
        </div>
        <div class="score-pill" style="font-size:1rem; padding:8px 14px;">Đúng: ${totalCorrect} / ${total} câu (${percent}%)</div>
      </div>
      <div class="breakdown-grid">
        ${breakdown
          .map(
            (b) => `
          <div class="breakdown-item">
            <span>${b.title}</span>
            <strong>${b.score} / ${b.total} câu đúng</strong>
          </div>
        `
          )
          .join("")}
      </div>
      <p class="muted small" style="margin:0;">Kéo xuống dưới để xem đáp án đúng và lời giải chi tiết cho toàn bộ ${total} câu. Nhấn "Thi đề mới khác" để làm mã đề mới không trùng lặp.</p>
    `;
    mockResultBox.classList.remove("hidden");
    btnSubmitMock.classList.add("hidden");
    btnRestartMock.classList.remove("hidden");
    mockResultBox.scrollIntoView({ behavior: "smooth", block: "start" });
    announce(`Hoàn thành ${currentMockExam.title}: ${totalCorrect}/${total} câu (ước lượng ${estScore1200}/1200 điểm).`);
  }

  if (btnStartMock) btnStartMock.addEventListener("click", startMockExam);
  if (btnSubmitMock) btnSubmitMock.addEventListener("click", () => gradeMockExam(false));
  if (btnRestartMock) btnRestartMock.addEventListener("click", startMockExam);

  // ---------------------------------------------------------
  // Bootstrap
  // ---------------------------------------------------------
  loadState();
  applyCustomContentToCurriculum();
  applyA11y();
  populateSubjects();
  renderDiagnosticTest();
  renderAllSources();
  renderLesson();
  checkSession();
})();
