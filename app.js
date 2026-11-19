// =========================================================
// EduAdapt ĐGNL — Core Application Logic (Sidebar + 20-Q Test + Google OAuth)
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
    diagnostic: document.getElementById("view-diagnostic"),
    sources: document.getElementById("view-sources"),
    profile: document.getElementById("view-profile"),
    admin: document.getElementById("view-admin")
  };

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

    levelCards.forEach((card) => {
      const isSelected = card.dataset.levelCard === state.level;
      card.classList.toggle("active", isSelected);
      card.setAttribute("aria-checked", String(isSelected));
    });
  }

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
    lectureBody.innerHTML = lesson.sections
      .map((sec) => `<h3>${sec.heading}</h3><p>${sec.text}</p>`)
      .join("");
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

    // Render Practice Quizzes
    quizProgress.textContent = `0 / ${lesson.quizzes.length} câu`;
    adaptiveFeedback.classList.add("hidden");
    adaptiveFeedback.innerHTML = "";
    btnSubmitQuiz.classList.remove("hidden");
    btnRetryQuiz.classList.add("hidden");

    quizContainer.innerHTML = lesson.quizzes
      .map((item, idx) => {
        const letters = ["A", "B", "C", "D"];
        return `
          <div class="quiz-item" data-quiz-idx="${idx}">
            <p class="quiz-question">Câu ${idx + 1}: ${item.q}</p>
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
            <div class="solution-toggle-wrap">
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
        const answered = lesson.quizzes.filter((_, i) =>
          quizContainer.querySelector(`input[name="q_${i}"]:checked`)
        ).length;
        quizProgress.textContent = `${answered} / ${lesson.quizzes.length} câu`;
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
  // Grade Practice Quiz
  // ---------------------------------------------------------
  btnSubmitQuiz.addEventListener("click", () => {
    const { lesson } = getCurrentLesson();
    let score = 0;

    lesson.quizzes.forEach((item, idx) => {
      const checked = quizContainer.querySelector(`input[name="q_${idx}"]:checked`);
      const slot = document.getElementById(`sol-slot-${idx}`);
      const toggleBtn = quizContainer.querySelector(`.btn-toggle-sol[data-idx="${idx}"]`);

      const isCorrect = checked && Number(checked.value) === item.answer;
      if (isCorrect) score++;

      slot.innerHTML = renderSolutionHtml(item, isCorrect ? "correct" : "incorrect");
      slot.classList.remove("hidden");
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.textContent = "Ẩn lời giải";
      }
    });

    state.quizSubmitted = true;
    const total = lesson.quizzes.length;
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
