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
  mv.setAttribute("alt", `Model 3D ${organ.nama}`);
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

  document.title = `${organ.nama} | AR Organ Tubuh`;
  document.getElementById("nama").textContent = organ.nama;
  document.getElementById("deskripsi").textContent = organ.deskripsi;
  document.getElementById("fakta").textContent = organ.fakta;
  document.getElementById("link-kuis").href = `quiz.html?organ=${organ.id}`;

  const fungsiList = document.getElementById("fungsi");
  organ.fungsi.forEach(teks => {
    const li = document.createElement("li");
    li.textContent = teks;
    fungsiList.appendChild(li);
  });

  const penyakitList = document.getElementById("penyakit");
  if (penyakitList && Array.isArray(organ.penyakit)) {
    organ.penyakit.forEach(item => {
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

  const tipsList = document.getElementById("tips-sehat");
  if (tipsList && Array.isArray(organ.tipsSehat)) {
    organ.tipsSehat.forEach(teks => {
      const li = document.createElement("li");
      li.textContent = teks;
      tipsList.appendChild(li);
    });
  }

  const kreditSection = document.getElementById("kredit");
  kreditSection.innerHTML = `
    <h2>Kredit Model 3D</h2>
    <p><strong>Judul:</strong> ${organ.kredit.judul}</p>
    <p><strong>Pembuat:</strong> ${organ.kredit.pembuat}</p>
    <p><strong>Lisensi:</strong> ${organ.kredit.lisensi}</p>
    <p><strong>Sumber:</strong> <a href="${organ.kredit.sumber}" target="_blank" rel="noopener noreferrer">${organ.kredit.sumber}</a></p>
  `;

  const infoPanel = document.getElementById("info");
  const infoTitle = document.getElementById("info-title");
  const infoText = document.getElementById("info-text");
  const infoClose = document.getElementById("info-close");
  let activeButton = null;

  function hideInfo() {
    infoPanel.hidden = true;
    if (activeButton) {
      activeButton.classList.remove("active");
      activeButton = null;
    }
  }

  function showInfo(hotspot, button) {
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    activeButton = button;
    activeButton.classList.add("active");
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

    b.addEventListener("click", () => showInfo(h, b));
    mv.appendChild(b);
  });

  const btnTts = document.getElementById("btn-tts");
  if (btnTts) {
    if (!("speechSynthesis" in window)) {
      btnTts.hidden = true;
    } else {
      const penyakitNarration = Array.isArray(organ.penyakit)
        ? organ.penyakit.map(p => `${p.nama}: ${p.info}`).join(" ")
        : "";
      const tipsNarration = Array.isArray(organ.tipsSehat)
        ? organ.tipsSehat.join(". ")
        : "";
      const narrationText = `${organ.nama}. ${organ.deskripsi} Fungsi utama: ${organ.fungsi.join(". ")}. Fakta menarik: ${organ.fakta} Gangguan dan penyakit umum: ${penyakitNarration} Cara menjaga kesehatan: ${tipsNarration}`;

      function resetTtsButton() {
        btnTts.textContent = "Bacakan";
        btnTts.classList.remove("speaking");
        btnTts.setAttribute("aria-pressed", "false");
        btnTts.setAttribute("aria-label", "Bacakan informasi organ");
      }

      btnTts.addEventListener("click", () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          resetTtsButton();
          return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(narrationText);
        utterance.lang = "id-ID";
        utterance.onend = resetTtsButton;
        utterance.onerror = resetTtsButton;

        btnTts.textContent = "Berhenti";
        btnTts.classList.add("speaking");
        btnTts.setAttribute("aria-pressed", "true");
        btnTts.setAttribute("aria-label", "Hentikan pembacaan informasi organ");
        window.speechSynthesis.speak(utterance);
      });

      const stopSpeech = () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
      window.addEventListener("pagehide", stopSpeech);
      window.addEventListener("beforeunload", stopSpeech);
    }
  }

  const simPanel = document.getElementById("sim-panel");
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
          title: "Simulasi Detak Jantung",
          unit: "BPM",
          restRate: 72,
          activeRate: 130,
          restLabel: "Istirahat (72 BPM)",
          activeLabel: "Olahraga (130 BPM)",
          idleText: "Tekan Mulai Simulasi untuk melihat denyut jantung dan mendengar bunyi Lub-Dub."
        }
      : {
          title: "Simulasi Pernapasan",
          unit: "RPM",
          restRate: 15,
          activeRate: 30,
          restLabel: "Normal (15x/mnt)",
          activeLabel: "Olahraga (30x/mnt)",
          idleText: "Tekan Mulai Simulasi untuk melihat paru-paru mengembang dan mengempis."
        };

    simPanel.hidden = false;
    simTitle.textContent = simConfig.title;
    simModeRest.textContent = simConfig.restLabel;
    simModeActive.textContent = simConfig.activeLabel;
    simStatus.textContent = simConfig.idleText;

    let simRunning = false;
    let simMode = "rest";
    let soundEnabled = true;
    let vibrateEnabled = true;
    let audioCtx = null;
    let masterCompressor = null;
    let simTimerId = null;
    let pulseTimerId = null;
    let breathFrameId = null;

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
      simStatus.textContent =
        simMode === "active"
          ? "Sistol (Olahraga): Jantung memompa lebih cepat untuk memenuhi kebutuhan oksigen otot."
          : "Sistol (Istirahat): Jantung memompa darah secara stabil ke seluruh tubuh.";
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
          simStatus.textContent = "Diastol: Bilik jantung berelaksasi dan terisi darah kembali.";
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
          if (isInhale) {
            simDot.classList.add("is-pulsing");
            simStatus.textContent =
              "Inspirasi: Paru-paru mengembang menyerap oksigen (O₂).";
            playBreathSound(true, Math.min(halfMs / 1000, 2.2));
            triggerVibrate(45);
          } else {
            simDot.classList.remove("is-pulsing");
            simStatus.textContent =
              "Ekspirasi: Paru-paru mengempis mengembuskan karbon dioksida (CO₂).";
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
      simToggle.textContent = "Mulai Simulasi";
      simToggle.classList.remove("is-running");
      simStatus.textContent = simConfig.idleText;
    }

    function startSimulation() {
      stopSimulation();
      simRunning = true;
      simToggle.textContent = "Hentikan";
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
      simSound.textContent = soundEnabled ? "Suara: Aktif" : "Suara: Bisu";
      simSound.setAttribute("aria-pressed", String(soundEnabled));
    });

    if (simVibrate) {
      simVibrate.addEventListener("click", () => {
        vibrateEnabled = !vibrateEnabled;
        simVibrate.textContent = vibrateEnabled ? "Getar: Aktif" : "Getar: Mati";
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
}
