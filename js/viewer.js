const params = new URLSearchParams(location.search);
const organId = params.get("id");
const organ = ORGANS.find(item => item.id === organId);

if (!organ) {
  location.replace("404.html");
} else {
  const mv = document.getElementById("mv");
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

  let activeButton = null;
  let activeChip = null;
  let activeHotspotId = null;
  const chipMap = {};
  const hotspotBtnMap = {};

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
  }

  infoClose.addEventListener("click", () => {
    const lastButton = activeButton;
    hideInfo();
    if (lastButton) {
      lastButton.focus();
    }
  });

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

    b.addEventListener("click", () => showInfoById(h.id, b));
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
      const btnEntry = hotspotBtnMap[h.id];
      if (btnEntry) {
        btnEntry.button.setAttribute("aria-label", h.label);
        btnEntry.labelEl.textContent = h.label;
      }
      if (chipMap[h.id]) {
        chipMap[h.id].textContent = h.label;
      }
    });

    if (activeHotspotId && !infoPanel.hidden) {
      const currentHotspot = organText.hotspots.find(item => item.id === activeHotspotId);
      if (currentHotspot) {
        infoTitle.textContent = currentHotspot.label;
        infoText.textContent = currentHotspot.info;
      }
    }
  }

  renderOrganContent();

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

  document.addEventListener("ar-lang-change", () => {
    renderOrganContent();
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
