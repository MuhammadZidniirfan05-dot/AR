const params = new URLSearchParams(location.search);
const organId = params.get("id");
const organ = ORGANS.find(item => item.id === organId);

if (!organ) {
  location.replace("404.html");
} else {
  const mv = document.getElementById("mv");
  const viewerStage = document.getElementById("viewer-stage");
  const progressBar = mv.querySelector(".progress");
  const progressFill = mv.querySelector(".progress-fill");

  mv.setAttribute("src", organ.model);
  mv.setAttribute("poster", organ.poster);
  if (organ.modelIos) {
    mv.setAttribute("ios-src", organ.modelIos);
  }

  mv.addEventListener("progress", event => {
    const percent = Math.round(event.detail.totalProgress * 100);
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }
    if (progressBar && event.detail.totalProgress >= 1) {
      progressBar.classList.add("hide");
    }
  });

  document.getElementById("link-kuis").href = `quiz.html?organ=${organ.id}`;
  const linkCompare = document.getElementById("link-compare");
  if (linkCompare) {
    linkCompare.href = `compare.html?a=${organ.id}`;
  }

  const fungsiList = document.getElementById("fungsi");
  const penyakitList = document.getElementById("penyakit");
  const tipsList = document.getElementById("tips-sehat");
  const kreditSection = document.getElementById("kredit");
  const infoPanel = document.getElementById("info");
  const infoTitle = document.getElementById("info-title");
  const infoText = document.getElementById("info-text");
  const infoClose = document.getElementById("info-close");
  const hotspotChips = document.getElementById("hotspot-chips");
  const chipsBlock = document.getElementById("chips-block");
  const chipsHeading = document.getElementById("chips-heading");

  const btnRotate = document.getElementById("btn-rotate");
  const btnResetCam = document.getElementById("btn-reset-cam");
  const btnFullscreen = document.getElementById("btn-fullscreen");
  const btnScreenshot = document.getElementById("btn-screenshot");
  const btnHuntToggle = document.getElementById("btn-hunt-toggle");

  const huntPanel = document.getElementById("hunt-panel");
  const huntProgress = document.getElementById("hunt-progress");
  const huntScoreBadge = document.getElementById("hunt-score-badge");
  const huntExit = document.getElementById("hunt-exit");
  const huntPlayArea = document.getElementById("hunt-play-area");
  const huntPrompt = document.getElementById("hunt-prompt");
  const huntHintBtn = document.getElementById("hunt-hint");
  const huntNextBtn = document.getElementById("hunt-next");
  const huntHintText = document.getElementById("hunt-hint-text");
  const huntFeedback = document.getElementById("hunt-feedback");
  const huntResult = document.getElementById("hunt-result");
  const huntResultTitle = document.getElementById("hunt-result-title");
  const huntResultScore = document.getElementById("hunt-result-score");
  const huntResultBest = document.getElementById("hunt-result-best");
  const huntRetry = document.getElementById("hunt-retry");
  const huntDone = document.getElementById("hunt-done");

  let activeButton = null;
  let activeChip = null;
  let activeHotspotId = null;
  let isAutoRotating = true;
  let huntActive = false;
  let huntTargets = [];
  let huntIndex = 0;
  let huntScore = 0;
  let huntBestScore = 0;
  let huntWrongThisRound = false;
  let huntRoundSolved = false;
  let huntHintVisible = false;
  let huntFeedbackState = null;
  let huntAudioCtx = null;

  const chipMap = {};
  const hotspotBtnMap = {};

  function shuffleHotspots(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function focusCameraOnHotspot(hotspot) {
    if (!hotspot || !hotspot.position) {
      return;
    }
    mv.cameraTarget = hotspot.position;
    if (hotspot.normal) {
      const parts = hotspot.normal.trim().split(/\s+/).map(Number);
      if (parts.length === 3 && parts.every(n => !Number.isNaN(n))) {
        const nx = parts[0];
        const ny = parts[1];
        const nz = parts[2];
        const len = Math.hypot(nx, ny, nz) || 1;
        const thetaRad = Math.atan2(nx, nz);
        const thetaDeg = (thetaRad * 180) / Math.PI;
        const clampedY = Math.max(-1, Math.min(1, ny / len));
        const phiRad = Math.acos(clampedY);
        const rawPhiDeg = (phiRad * 180) / Math.PI;
        const phiDeg = Math.max(25, Math.min(155, rawPhiDeg));
        mv.cameraOrbit = `${thetaDeg.toFixed(1)}deg ${phiDeg.toFixed(1)}deg auto`;
      }
    }
  }

  function resetCamera() {
    mv.cameraTarget = "auto auto auto";
    mv.cameraOrbit = "auto auto auto";
    mv.fieldOfView = "auto";
  }

  function hideInfo() {
    infoPanel.hidden = true;
    activeHotspotId = null;
    if (activeButton) {
      activeButton.classList.remove("active");
      activeButton = null;
    }
    if (activeChip) {
      activeChip.classList.remove("is-active");
      activeChip = null;
    }
  }

  function showInfoById(hotspotId, button) {
    if (huntActive) {
      return;
    }
    const organText = getOrganText(organ);
    const hotspot = organText.hotspots.find(item => item.id === hotspotId);
    if (!hotspot) {
      return;
    }
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    if (activeChip) {
      activeChip.classList.remove("is-active");
    }
    activeHotspotId = hotspotId;
    activeButton = button;
    if (activeButton) {
      activeButton.classList.add("active");
    }
    if (chipMap[hotspotId]) {
      activeChip = chipMap[hotspotId];
      activeChip.classList.add("is-active");
    }
    infoTitle.textContent = hotspot.label;
    infoText.textContent = hotspot.info;
    infoPanel.hidden = false;
    focusCameraOnHotspot(hotspot);
  }

  infoClose.addEventListener("click", () => {
    const lastButton = activeButton;
    hideInfo();
    if (lastButton) {
      lastButton.focus();
    }
  });

  function playHuntTone(isCorrect) {
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) {
        return;
      }
      if (!huntAudioCtx) {
        huntAudioCtx = new AudioCtor();
      }
      if (huntAudioCtx.state === "suspended") {
        huntAudioCtx.resume().catch(() => {});
      }
      const now = huntAudioCtx.currentTime;
      const osc = huntAudioCtx.createOscillator();
      const gain = huntAudioCtx.createGain();

      if (isCorrect) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.09);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.connect(gain);
        gain.connect(huntAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.16);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(huntAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
      }
    } catch (err) {
      // Abaikan jika Web Audio API dibatasi
    }
  }

  const huntStorageKey = `ar-organ-hunt-best-${organ.id}`;

  function getHuntBestScore() {
    try {
      const saved = localStorage.getItem(huntStorageKey);
      return saved ? Number(saved) || 0 : 0;
    } catch (err) {
      return 0;
    }
  }

  function saveHuntBestScore(newScore) {
    try {
      const currentBest = getHuntBestScore();
      if (newScore > currentBest) {
        localStorage.setItem(huntStorageKey, String(newScore));
        return newScore;
      }
      return currentBest;
    } catch (err) {
      return Math.max(huntBestScore, newScore);
    }
  }

  function clearHotspotHuntClasses() {
    Object.keys(hotspotBtnMap).forEach(id => {
      const btn = hotspotBtnMap[id].button;
      btn.classList.remove("hunt-correct", "hunt-wrong", "hunt-solved");
    });
  }

  function syncHotspotAriaForMode() {
    const organText = getOrganText(organ);
    organText.hotspots.forEach((h, idx) => {
      const entry = hotspotBtnMap[h.id];
      if (!entry) {
        return;
      }
      const isRevealed =
        !huntActive ||
        entry.button.classList.contains("hunt-correct") ||
        entry.button.classList.contains("hunt-solved");
      entry.button.setAttribute(
        "aria-label",
        isRevealed ? h.label : `${t("huntSpotAria")} ${idx + 1}`
      );
      entry.labelEl.textContent = h.label;
    });
  }

  function setChipsLocked(locked) {
    if (chipsBlock) {
      chipsBlock.classList.toggle("is-locked", locked);
    }
    if (chipsHeading) {
      chipsHeading.setAttribute(
        "data-i18n",
        locked ? "chipsLockedHeading" : "chipsHeading"
      );
      chipsHeading.textContent = locked
        ? t("chipsLockedHeading")
        : t("chipsHeading");
    }
    Object.keys(chipMap).forEach(id => {
      chipMap[id].disabled = locked;
    });
  }

  function refreshHuntTexts() {
    if (!huntActive || !huntPanel) {
      return;
    }
    const organText = getOrganText(organ);
    const total = huntTargets.length;
    huntScoreBadge.textContent = t("huntScoreBadge", {
      score: huntScore,
      total: total
    });

    if (!huntResult.hidden) {
      huntProgress.textContent = t("huntProgress", {
        current: total,
        total: total
      });
      huntResultTitle.textContent = t("huntResultTitle");
      huntResultScore.textContent = t("huntResultScore", {
        score: huntScore,
        total: total
      });
      huntResultBest.textContent = t("huntResultBest", {
        best: huntBestScore,
        total: total
      });
      return;
    }

    const targetId = huntTargets[huntIndex];
    const targetHotspot = organText.hotspots.find(item => item.id === targetId);
    if (!targetHotspot) {
      return;
    }

    huntProgress.textContent = t("huntProgress", {
      current: huntIndex + 1,
      total: total
    });
    huntPrompt.textContent = t("huntPrompt", { target: targetHotspot.label });
    huntNextBtn.textContent =
      huntIndex === total - 1 ? t("huntSeeResult") : t("huntNext");

    if (huntHintVisible) {
      huntHintText.textContent = t("huntHintPrefix", {
        info: targetHotspot.info
      });
      huntHintText.hidden = false;
    } else {
      huntHintText.hidden = true;
    }

    if (huntFeedbackState) {
      huntFeedback.hidden = false;
      if (huntFeedbackState.type === "correct") {
        huntFeedback.className = "hunt-feedback is-correct";
        huntFeedback.textContent = t("huntFeedbackCorrect", {
          name: targetHotspot.label,
          info: targetHotspot.info
        });
      } else if (huntFeedbackState.type === "wrong") {
        const clickedHotspot = organText.hotspots.find(
          item => item.id === huntFeedbackState.clickedId
        );
        huntFeedback.className = "hunt-feedback is-wrong";
        huntFeedback.textContent = t("huntFeedbackWrong", {
          clicked: clickedHotspot ? clickedHotspot.label : "",
          target: targetHotspot.label
        });
      }
    } else {
      huntFeedback.hidden = true;
    }
  }

  function setupHuntRound() {
    huntWrongThisRound = false;
    huntRoundSolved = false;
    huntHintVisible = false;
    huntFeedbackState = null;
    huntHintBtn.disabled = false;
    huntNextBtn.hidden = true;
    huntHintText.hidden = true;
    huntFeedback.hidden = true;

    Object.keys(hotspotBtnMap).forEach(id => {
      const btn = hotspotBtnMap[id].button;
      if (btn.classList.contains("hunt-correct")) {
        btn.classList.remove("hunt-correct");
        btn.classList.add("hunt-solved");
      }
      btn.classList.remove("hunt-wrong");
    });

    syncHotspotAriaForMode();
    refreshHuntTexts();
  }

  function handleHuntHotspotClick(clickedId, button) {
    if (!huntActive || !huntResult.hidden || huntRoundSolved) {
      return;
    }
    const targetId = huntTargets[huntIndex];
    const organText = getOrganText(organ);
    const targetHotspot = organText.hotspots.find(item => item.id === targetId);
    if (!targetHotspot) {
      return;
    }

    if (clickedId === targetId) {
      huntRoundSolved = true;
      if (!huntWrongThisRound) {
        huntScore += 1;
      }
      button.classList.remove("hunt-wrong");
      button.classList.add("hunt-correct");
      huntFeedbackState = { type: "correct", clickedId: clickedId };
      huntHintBtn.disabled = true;
      huntNextBtn.hidden = false;
      playHuntTone(true);
      focusCameraOnHotspot(targetHotspot);
      syncHotspotAriaForMode();
      refreshHuntTexts();
    } else {
      huntWrongThisRound = true;
      button.classList.remove("hunt-wrong");
      void button.offsetWidth;
      button.classList.add("hunt-wrong");
      huntFeedbackState = { type: "wrong", clickedId: clickedId };
      playHuntTone(false);
      refreshHuntTexts();
    }
  }

  function showHuntFinalResult() {
    huntPlayArea.hidden = true;
    huntResult.hidden = false;
    huntBestScore = saveHuntBestScore(huntScore);
    refreshHuntTexts();
  }

  function startHuntGame() {
    hideInfo();
    huntActive = true;
    mv.classList.add("is-hunt-mode");
    setChipsLocked(true);
    clearHotspotHuntClasses();
    resetCamera();

    huntTargets = shuffleHotspots(organ.hotspots.map(h => h.id));
    huntIndex = 0;
    huntScore = 0;
    huntBestScore = getHuntBestScore();

    huntPanel.hidden = false;
    huntPlayArea.hidden = false;
    huntResult.hidden = true;

    updateStudioToolbarLabels();
    setupHuntRound();
  }

  function stopHuntGame() {
    if (!huntActive) {
      return;
    }
    huntActive = false;
    mv.classList.remove("is-hunt-mode");
    setChipsLocked(false);
    clearHotspotHuntClasses();
    if (huntPanel) {
      huntPanel.hidden = true;
    }
    syncHotspotAriaForMode();
    updateStudioToolbarLabels();
  }

  organ.hotspots.forEach(h => {
    const b = document.createElement("button");
    b.type = "button";
    b.slot = `hotspot-${h.id}`;
    b.className = "hotspot";
    b.dataset.position = h.position;
    b.dataset.normal = h.normal;
    b.setAttribute("aria-label", h.label);

    const label = document.createElement("span");
    label.className = "hotspot-label";
    label.textContent = h.label;
    b.appendChild(label);

    b.addEventListener("click", () => {
      if (huntActive) {
        handleHuntHotspotClick(h.id, b);
      } else {
        showInfoById(h.id, b);
      }
    });
    mv.appendChild(b);
    hotspotBtnMap[h.id] = { button: b, labelEl: label };

    if (hotspotChips) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "hotspot-chip";
      chip.textContent = h.label;
      chip.addEventListener("click", () => showInfoById(h.id, b));
      hotspotChips.appendChild(chip);
      chipMap[h.id] = chip;
    }
  });

  function updateStudioToolbarLabels() {
    if (btnRotate) {
      btnRotate.textContent = isAutoRotating
        ? t("studioRotatePause")
        : t("studioRotatePlay");
      btnRotate.setAttribute("aria-pressed", String(isAutoRotating));
      btnRotate.classList.toggle("is-active", isAutoRotating);
    }
    if (btnResetCam) {
      btnResetCam.textContent = t("studioResetCam");
    }
    if (btnFullscreen) {
      const isFs = Boolean(document.fullscreenElement);
      btnFullscreen.textContent = isFs
        ? t("studioFullscreenExit")
        : t("studioFullscreenEnter");
      btnFullscreen.setAttribute("aria-pressed", String(isFs));
      btnFullscreen.classList.toggle("is-active", isFs);
    }
    if (btnScreenshot) {
      btnScreenshot.textContent = t("studioScreenshot");
    }
    if (btnHuntToggle) {
      btnHuntToggle.textContent = huntActive
        ? t("studioHuntActive")
        : t("studioHuntStart");
      btnHuntToggle.setAttribute("aria-pressed", String(huntActive));
      btnHuntToggle.classList.toggle("is-active", huntActive);
    }
  }

  if (btnRotate) {
    btnRotate.addEventListener("click", () => {
      isAutoRotating = !isAutoRotating;
      if (isAutoRotating) {
        mv.setAttribute("auto-rotate", "");
      } else {
        mv.removeAttribute("auto-rotate");
      }
      updateStudioToolbarLabels();
    });
  }

  if (btnResetCam) {
    btnResetCam.addEventListener("click", () => {
      resetCamera();
    });
  }

  if (btnFullscreen && viewerStage) {
    const canFullscreen =
      Boolean(document.fullscreenEnabled) &&
      typeof viewerStage.requestFullscreen === "function";
    if (!canFullscreen) {
      btnFullscreen.hidden = true;
    } else {
      btnFullscreen.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          viewerStage.requestFullscreen().catch(() => {});
        } else if (typeof document.exitFullscreen === "function") {
          document.exitFullscreen().catch(() => {});
        }
      });
      document.addEventListener("fullscreenchange", updateStudioToolbarLabels);
    }
  }

  if (btnScreenshot) {
    btnScreenshot.addEventListener("click", () => {
      try {
        if (typeof mv.toDataURL !== "function") {
          return;
        }
        const dataUrl = mv.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `ar-organ-${organ.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        // Abaikan jika tangkapan layar WebGL tidak didukung
      }
    });
  }

  if (btnHuntToggle) {
    btnHuntToggle.addEventListener("click", () => {
      if (huntActive) {
        stopHuntGame();
      } else {
        startHuntGame();
      }
    });
  }

  if (huntHintBtn) {
    huntHintBtn.addEventListener("click", () => {
      huntHintVisible = !huntHintVisible;
      refreshHuntTexts();
    });
  }

  if (huntNextBtn) {
    huntNextBtn.addEventListener("click", () => {
      if (huntIndex < huntTargets.length - 1) {
        huntIndex += 1;
        setupHuntRound();
      } else {
        showHuntFinalResult();
      }
    });
  }

  if (huntExit) {
    huntExit.addEventListener("click", stopHuntGame);
  }
  if (huntDone) {
    huntDone.addEventListener("click", stopHuntGame);
  }
  if (huntRetry) {
    huntRetry.addEventListener("click", startHuntGame);
  }

  function renderOrganContent() {
    const organText = getOrganText(organ);
    document.title = `${organText.nama} | ${t("brandName")}`;
    mv.setAttribute("alt", `${t("modelAltPrefix")} ${organText.nama}`);
    document.getElementById("nama").textContent = organText.nama;
    document.getElementById("deskripsi").textContent = organText.deskripsi;
    document.getElementById("fakta").textContent = organText.fakta;

    fungsiList.innerHTML = "";
    organText.fungsi.forEach((teks, index) => {
      const li = document.createElement("li");
      const num = document.createElement("span");
      num.className = "step-num";
      num.textContent = String(index + 1).padStart(2, "0");
      const spanText = document.createElement("span");
      spanText.className = "step-text";
      spanText.textContent = teks;
      li.appendChild(num);
      li.appendChild(spanText);
      fungsiList.appendChild(li);
    });

    if (penyakitList) {
      penyakitList.innerHTML = "";
      organText.penyakit.forEach(item => {
        const card = document.createElement("div");
        card.className = "disease-item";
        const title = document.createElement("strong");
        title.textContent = item.nama;
        const desc = document.createElement("p");
        desc.textContent = item.info;
        card.appendChild(title);
        card.appendChild(desc);
        penyakitList.appendChild(card);
      });
    }

    if (tipsList) {
      tipsList.innerHTML = "";
      organText.tipsSehat.forEach(teks => {
        const li = document.createElement("li");
        const icon = document.createElement("span");
        icon.className = "check-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "\u2713";
        const spanText = document.createElement("span");
        spanText.className = "check-text";
        spanText.textContent = teks;
        li.appendChild(icon);
        li.appendChild(spanText);
        tipsList.appendChild(li);
      });
    }

    kreditSection.innerHTML = `
      <h2>${t("creditHeading")}</h2>
      <p><strong>${t("creditTitle")}</strong> ${organ.kredit.judul}</p>
      <p><strong>${t("creditAuthor")}</strong> ${organ.kredit.pembuat}</p>
      <p><strong>${t("creditLicense")}</strong> ${organ.kredit.lisensi}</p>
      <p><strong>${t("creditSource")}</strong> <a href="${organ.kredit.sumber}" target="_blank" rel="noopener noreferrer">${organ.kredit.sumber}</a></p>
    `;

    organText.hotspots.forEach(h => {
      if (chipMap[h.id]) {
        chipMap[h.id].textContent = h.label;
      }
    });
    syncHotspotAriaForMode();

    if (activeHotspotId && !infoPanel.hidden) {
      const currentHotspot = organText.hotspots.find(item => item.id === activeHotspotId);
      if (currentHotspot) {
        infoTitle.textContent = currentHotspot.label;
        infoText.textContent = currentHotspot.info;
      }
    }
  }

  renderOrganContent();
  updateStudioToolbarLabels();

  const tabButtons = Array.from(document.querySelectorAll(".study-tab"));
  if (tabButtons.length > 0) {
    function activateTab(selectedBtn) {
      tabButtons.forEach(btn => {
        const isCurrent = btn === selectedBtn;
        btn.classList.toggle("is-active", isCurrent);
        btn.setAttribute("aria-selected", String(isCurrent));
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          panel.hidden = !isCurrent;
        }
      });
    }

    tabButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => activateTab(btn));
      btn.addEventListener("keydown", e => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const dir = e.key === "ArrowRight" ? 1 : -1;
          const nextIdx = (idx + dir + tabButtons.length) % tabButtons.length;
          tabButtons[nextIdx].focus();
          activateTab(tabButtons[nextIdx]);
        }
      });
    });
  }

  const detailArticle = document.getElementById("detail-article");
  const btnFontSize = document.getElementById("btn-font-size");
  let updateFontSizeLabel = null;
  if (detailArticle && btnFontSize) {
    let isLargeText = false;
    try {
      isLargeText = localStorage.getItem("ar-organ-fontsize") === "large";
    } catch (err) {
      isLargeText = false;
    }

    function applyFontSize(large) {
      detailArticle.classList.toggle("is-large-text", large);
      btnFontSize.textContent = large ? t("fontLarge") : t("fontNormal");
      btnFontSize.setAttribute("aria-pressed", String(large));
      btnFontSize.classList.toggle("is-active", large);
    }

    updateFontSizeLabel = () => applyFontSize(isLargeText);
    applyFontSize(isLargeText);

    btnFontSize.addEventListener("click", () => {
      isLargeText = !isLargeText;
      applyFontSize(isLargeText);
      try {
        localStorage.setItem("ar-organ-fontsize", isLargeText ? "large" : "normal");
      } catch (err) {
        // Abaikan jika localStorage tidak tersedia
      }
    });
  }

  const btnTts = document.getElementById("btn-tts");
  let handleTtsLangChange = null;
  if (btnTts) {
    if (!("speechSynthesis" in window)) {
      btnTts.hidden = true;
    } else {
      function buildNarrationText() {
        const organText = getOrganText(organ);
        const penyakitNarration = Array.isArray(organText.penyakit)
          ? organText.penyakit.map(p => `${p.nama}: ${p.info}`).join(" ")
          : "";
        const tipsNarration = Array.isArray(organText.tipsSehat)
          ? organText.tipsSehat.join(". ")
          : "";
        return `${organText.nama}. ${organText.deskripsi} ${t("ttsFuncPrefix")} ${organText.fungsi.join(". ")}. ${t("ttsFactPrefix")} ${organText.fakta} ${t("ttsDiseasePrefix")} ${penyakitNarration} ${t("ttsTipsPrefix")} ${tipsNarration}`;
      }

      function resetTtsButton() {
        btnTts.textContent = t("ttsRead");
        btnTts.classList.remove("speaking");
        btnTts.setAttribute("aria-pressed", "false");
        btnTts.setAttribute("aria-label", t("ttsReadAria"));
      }

      resetTtsButton();

      btnTts.addEventListener("click", () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          resetTtsButton();
          return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(buildNarrationText());
        utterance.lang = getCurrentLang() === "en" ? "en-US" : "id-ID";
        utterance.onend = resetTtsButton;
        utterance.onerror = resetTtsButton;

        btnTts.textContent = t("ttsStop");
        btnTts.classList.add("speaking");
        btnTts.setAttribute("aria-pressed", "true");
        btnTts.setAttribute("aria-label", t("ttsStopAria"));
        window.speechSynthesis.speak(utterance);
      });

      const stopSpeech = () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };

      handleTtsLangChange = () => {
        stopSpeech();
        resetTtsButton();
      };

      window.addEventListener("pagehide", stopSpeech);
      window.addEventListener("beforeunload", stopSpeech);
    }
  }

  const simPanel = document.getElementById("sim-panel");
  let refreshSimTranslation = null;
  if (simPanel && (organ.id === "jantung" || organ.id === "paru-paru")) {
    const simTitle = document.getElementById("sim-title");
    const simRate = document.getElementById("sim-rate");
    const simDot = document.getElementById("sim-dot");
    const simToggle = document.getElementById("sim-toggle");
    const simModeRest = document.getElementById("sim-mode-rest");
    const simModeActive = document.getElementById("sim-mode-active");
    const simSound = document.getElementById("sim-sound");
    const simVibrate = document.getElementById("sim-vibrate");
    const simStatus = document.getElementById("sim-status");

    const isHeart = organ.id === "jantung";
    const simConfig = isHeart
      ? {
          unit: "BPM",
          restRate: 72,
          activeRate: 130
        }
      : {
          unit: "RPM",
          restRate: 15,
          activeRate: 30
        };

    let simRunning = false;
    let simMode = "rest";
    let simPhaseState = "idle";
    let soundEnabled = true;
    let vibrateEnabled = true;
    let audioCtx = null;
    let masterCompressor = null;
    let simTimerId = null;
    let pulseTimerId = null;
    let breathFrameId = null;

    function getIdleText() {
      return isHeart ? t("simHeartIdle") : t("simLungIdle");
    }

    function updateStatusFromPhase() {
      if (!simRunning || simPhaseState === "idle") {
        simStatus.textContent = getIdleText();
        return;
      }
      if (isHeart) {
        if (simPhaseState === "systole") {
          simStatus.textContent =
            simMode === "active"
              ? t("simHeartSystoleActive")
              : t("simHeartSystoleRest");
        } else {
          simStatus.textContent = t("simHeartDiastole");
        }
      } else {
        simStatus.textContent =
          simPhaseState === "inhale" ? t("simLungInhale") : t("simLungExhale");
      }
    }

    function applySimControlLabels() {
      simTitle.textContent = isHeart ? t("simHeartTitle") : t("simLungTitle");
      simModeRest.textContent = isHeart ? t("simHeartRest") : t("simLungRest");
      simModeActive.textContent = isHeart ? t("simHeartActive") : t("simLungActive");
      simToggle.textContent = simRunning ? t("simStop") : t("simStart");
      simSound.textContent = soundEnabled ? t("simSoundOn") : t("simSoundOff");
      if (simVibrate) {
        simVibrate.textContent = vibrateEnabled ? t("simVibrateOn") : t("simVibrateOff");
      }
      updateStatusFromPhase();
    }

    simPanel.hidden = false;
    refreshSimTranslation = applySimControlLabels;

    function triggerVibrate(pattern) {
      if (!vibrateEnabled) {
        return;
      }
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(pattern);
      }
    }

    function stopVibration() {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(0);
      }
    }

    function getCurrentRate() {
      return simMode === "active" ? simConfig.activeRate : simConfig.restRate;
    }

    function updateRateBadge() {
      simRate.textContent = `${getCurrentRate()} ${simConfig.unit}`;
    }

    function ensureAudioContext() {
      if (!soundEnabled) {
        return null;
      }
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) {
        return null;
      }
      if (!audioCtx) {
        audioCtx = new AudioCtor();
        masterCompressor = audioCtx.createDynamicsCompressor();
        masterCompressor.threshold.setValueAtTime(-16, audioCtx.currentTime);
        masterCompressor.knee.setValueAtTime(18, audioCtx.currentTime);
        masterCompressor.ratio.setValueAtTime(6, audioCtx.currentTime);
        masterCompressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
        masterCompressor.release.setValueAtTime(0.15, audioCtx.currentTime);
        masterCompressor.connect(audioCtx.destination);
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }

    function playThump(ctx, startTime, triStart, triEnd, bassStart, bassEnd, duration, volume) {
      const outputNode = masterCompressor || ctx.destination;

      const oscTri = ctx.createOscillator();
      const gainTri = ctx.createGain();
      oscTri.type = "triangle";
      oscTri.frequency.setValueAtTime(triStart, startTime);
      oscTri.frequency.exponentialRampToValueAtTime(triEnd, startTime + duration);

      gainTri.gain.setValueAtTime(0.001, startTime);
      gainTri.gain.exponentialRampToValueAtTime(volume * 0.75, startTime + 0.015);
      gainTri.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscTri.connect(gainTri);
      gainTri.connect(outputNode);
      oscTri.start(startTime);
      oscTri.stop(startTime + duration + 0.02);

      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = "sine";
      oscBass.frequency.setValueAtTime(bassStart, startTime);
      oscBass.frequency.exponentialRampToValueAtTime(bassEnd, startTime + duration);

      gainBass.gain.setValueAtTime(0.001, startTime);
      gainBass.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
      gainBass.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscBass.connect(gainBass);
      gainBass.connect(outputNode);
      oscBass.start(startTime);
      oscBass.stop(startTime + duration + 0.02);
    }

    function playHeartbeatSound() {
      const ctx = ensureAudioContext();
      if (!ctx) {
        return;
      }
      const now = ctx.currentTime;
      playThump(ctx, now, 130, 52, 85, 42, 0.16, 1.4);
      playThump(ctx, now + 0.18, 110, 46, 72, 36, 0.14, 1.1);
    }

    function playBreathSound(isInhale, durationSec) {
      const ctx = ensureAudioContext();
      if (!ctx) {
        return;
      }
      const outputNode = masterCompressor || ctx.destination;
      const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
      const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < sampleCount; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = isInhale ? 560 : 400;
      filter.Q.value = 1.1;

      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const peak = isInhale ? 0.42 : 0.32;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peak, now + durationSec * 0.35);
      gain.gain.linearRampToValueAtTime(0.001, now + durationSec);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(outputNode);
      source.start(now);
      source.stop(now + durationSec + 0.02);
    }

    function runHeartBeat() {
      if (!simRunning) {
        return;
      }
      const rate = getCurrentRate();
      const beatMs = Math.round(60000 / rate);

      mv.style.transform = "scale(1.06)";
      simDot.classList.add("is-pulsing");
      simPhaseState = "systole";
      updateStatusFromPhase();
      playHeartbeatSound();
      triggerVibrate([75, 105, 55]);

      pulseTimerId = window.setTimeout(() => {
        if (!simRunning) {
          return;
        }
        mv.style.transform = "scale(1.02)";
        window.setTimeout(() => {
          if (!simRunning) {
            return;
          }
          mv.style.transform = "scale(1)";
          simDot.classList.remove("is-pulsing");
          simPhaseState = "diastole";
          updateStatusFromPhase();
        }, 140);
      }, 160);

      simTimerId = window.setTimeout(runHeartBeat, beatMs);
    }

    function runBreathCycle() {
      if (!simRunning) {
        return;
      }
      const rate = getCurrentRate();
      const cycleMs = 60000 / rate;
      const halfMs = cycleMs / 2;
      const startTime = performance.now();
      let lastPhase = "";

      function step(now) {
        if (!simRunning) {
          return;
        }
        const elapsed = (now - startTime) % cycleMs;
        const isInhale = elapsed < halfMs;
        const phase = isInhale ? "inhale" : "exhale";

        if (phase !== lastPhase) {
          lastPhase = phase;
          simPhaseState = phase;
          if (isInhale) {
            simDot.classList.add("is-pulsing");
            updateStatusFromPhase();
            playBreathSound(true, Math.min(halfMs / 1000, 2.2));
            triggerVibrate(45);
          } else {
            simDot.classList.remove("is-pulsing");
            updateStatusFromPhase();
            playBreathSound(false, Math.min(halfMs / 1000, 2.2));
          }
        }

        const progress = isInhale
          ? elapsed / halfMs
          : 1 - (elapsed - halfMs) / halfMs;
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress);
        const scale = 0.98 + eased * 0.09;
        mv.style.transform = `scale(${scale.toFixed(4)})`;

        breathFrameId = window.requestAnimationFrame(step);
      }

      breathFrameId = window.requestAnimationFrame(step);
    }

    function stopSimulation() {
      simRunning = false;
      simPhaseState = "idle";
      if (simTimerId) {
        window.clearTimeout(simTimerId);
        simTimerId = null;
      }
      if (pulseTimerId) {
        window.clearTimeout(pulseTimerId);
        pulseTimerId = null;
      }
      if (breathFrameId) {
        window.cancelAnimationFrame(breathFrameId);
        breathFrameId = null;
      }
      mv.style.transform = "";
      simDot.classList.remove("is-pulsing");
      stopVibration();
      simToggle.textContent = t("simStart");
      simToggle.classList.remove("is-running");
      updateStatusFromPhase();
    }

    function startSimulation() {
      stopSimulation();
      simRunning = true;
      simToggle.textContent = t("simStop");
      simToggle.classList.add("is-running");
      ensureAudioContext();
      if (isHeart) {
        runHeartBeat();
      } else {
        runBreathCycle();
      }
    }

    function setSimMode(nextMode) {
      simMode = nextMode;
      simModeRest.classList.toggle("is-active", simMode === "rest");
      simModeActive.classList.toggle("is-active", simMode === "active");
      updateRateBadge();
      if (simRunning) {
        startSimulation();
      }
    }

    updateRateBadge();
    applySimControlLabels();

    simToggle.addEventListener("click", () => {
      if (simRunning) {
        stopSimulation();
      } else {
        startSimulation();
      }
    });

    simModeRest.addEventListener("click", () => setSimMode("rest"));
    simModeActive.addEventListener("click", () => setSimMode("active"));

    simSound.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      simSound.textContent = soundEnabled ? t("simSoundOn") : t("simSoundOff");
      simSound.setAttribute("aria-pressed", String(soundEnabled));
    });

    if (simVibrate) {
      simVibrate.addEventListener("click", () => {
        vibrateEnabled = !vibrateEnabled;
        simVibrate.textContent = vibrateEnabled ? t("simVibrateOn") : t("simVibrateOff");
        simVibrate.setAttribute("aria-pressed", String(vibrateEnabled));
        if (!vibrateEnabled) {
          stopVibration();
        }
      });
    }

    const cleanupSim = () => {
      stopSimulation();
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {});
      }
    };
    window.addEventListener("pagehide", cleanupSim);
    window.addEventListener("beforeunload", cleanupSim);
  }

  const cleanupHuntAudio = () => {
    if (huntAudioCtx && huntAudioCtx.state !== "closed") {
      huntAudioCtx.close().catch(() => {});
    }
  };
  window.addEventListener("pagehide", cleanupHuntAudio);
  window.addEventListener("beforeunload", cleanupHuntAudio);

  document.addEventListener("ar-lang-change", () => {
    renderOrganContent();
    updateStudioToolbarLabels();
    refreshHuntTexts();
    if (updateFontSizeLabel) {
      updateFontSizeLabel();
    }
    if (handleTtsLangChange) {
      handleTtsLangChange();
    }
    if (refreshSimTranslation) {
      refreshSimTranslation();
    }
  });
}
