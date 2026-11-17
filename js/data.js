const ORGANS = [
  {
    id: "jantung",
    nama: "Jantung",
    ringkas: "Memompa darah ke seluruh tubuh.",
    deskripsi: "Jantung adalah organ otot berongga yang terletak di rongga dada sebelah kiri. Jantung bekerja terus-menerus memompa darah yang membawa oksigen dan nutrisi ke seluruh sel tubuh.",
    fungsi: [
      "Memompa darah kaya oksigen ke seluruh tubuh",
      "Mengalirkan darah miskin oksigen ke paru-paru untuk dibersihkan",
      "Menjaga tekanan dan sirkulasi darah tetap stabil"
    ],
    fakta: "Jantung manusia berdetak sekitar 100.000 kali setiap hari dan memompa lebih dari 7.000 liter darah.",
    model: "models/jantung.glb",
    modelIos: null,
    poster: "img/jantung.webp",
    hotspots: [
      {
        id: "aorta",
        label: "Aorta",
        info: "Pembuluh arteri terbesar yang mengalirkan darah kaya oksigen keluar dari jantung ke seluruh tubuh.",
        position: "-0.0796 0.5133 0.2720",
        normal: "0.1333 0.5494 0.8249"
      },
      {
        id: "atrium-kanan",
        label: "Atrium Kanan",
        info: "Serambi kanan menerima darah miskin oksigen yang kembali dari seluruh tubuh.",
        position: "-0.4230 0.3216 0.1700",
        normal: "-0.6730 0.5494 0.4952"
      },
      {
        id: "ventrikel-kanan",
        label: "Ventrikel Kanan",
        info: "Bilik kanan memompa darah miskin oksigen menuju paru-paru untuk mengambil oksigen.",
        position: "-0.1860 -0.0438 0.4580",
        normal: "-0.2598 0.0971 0.9608"
      },
      {
        id: "ventrikel-kiri",
        label: "Ventrikel Kiri",
        info: "Bilik kiri memiliki otot paling tebal untuk memompa darah kaya oksigen ke seluruh tubuh melalui aorta.",
        position: "0.1089 -0.4550 0.3641",
        normal: "0.3287 -0.3274 0.8859"
      }
    ],
    kredit: {
      judul: "Realistic Human Heart",
      pembuat: "neshallads",
      sumber: "https://skfb.ly/oyBCT",
      lisensi: "CC-BY 4.0"
    }
  },
  {
    id: "paru-paru",
    nama: "Paru-paru",
    ringkas: "Tempat pertukaran oksigen dan karbon dioksida.",
    deskripsi: "Paru-paru adalah sepasang organ pernapasan yang berada di dalam rongga dada dan dilindungi oleh tulang rusuk. Organ ini bertugas mengambil oksigen dari udara dan membuang karbon dioksida.",
    fungsi: [
      "Menyerap oksigen dari udara yang dihirup ke dalam darah",
      "Mengeluarkan karbon dioksida sebagai sisa metabolisme tubuh",
      "Membantu menjaga keseimbangan pH darah"
    ],
    fakta: "Paru-paru kanan sedikit lebih besar daripada paru-paru kiri karena paru-paru kiri berbagi ruang dengan jantung.",
    model: "models/paru-paru.glb",
    modelIos: null,
    poster: "img/paru-paru.webp",
    hotspots: [
      {
        id: "trakea",
        label: "Trakea",
        info: "Saluran udara utama (batang tenggorokan) yang menghubungkan tenggorokan dengan bronkus.",
        position: "-0.0003 0.1932 -0.0514",
        normal: "-0.2494 0.1742 -0.9526"
      },
      {
        id: "bronkus",
        label: "Bronkus",
        info: "Dua cabang saluran napas dari trakea yang mengarahkan udara masuk ke paru-paru kanan dan kiri.",
        position: "0.0030 0.1328 -0.0553",
        normal: "0.1406 0.0369 -0.9894"
      },
      {
        id: "paru-kanan",
        label: "Paru-paru Kanan",
        info: "Terdiri dari tiga lobus dan ukurannya sedikit lebih besar daripada paru-paru kiri.",
        position: "-0.0673 0.0308 -0.1232",
        normal: "-0.1316 -0.0477 -0.9902"
      },
      {
        id: "paru-kiri",
        label: "Paru-paru Kiri",
        info: "Terdiri dari dua lobus dan memiliki lekukan untuk memberi ruang bagi posisi jantung.",
        position: "0.0619 0.0808 -0.1223",
        normal: "-0.2332 0.0096 -0.9724"
      }
    ],
    kredit: {
      judul: "Realistic Human Lungs",
      pembuat: "neshallads",
      sumber: "https://skfb.ly/oBDWI",
      lisensi: "CC-BY 4.0"
    }
  },
  {
    id: "otak",
    nama: "Otak",
    ringkas: "Pusat kendali sistem saraf dan pikiran.",
    deskripsi: "Otak adalah organ paling kompleks yang berada di dalam tulang tengkorak. Otak mengatur seluruh aktivitas tubuh, mulai dari berpikir, mengingat, merasakan emosi, hingga menggerakkan otot.",
    fungsi: [
      "Mengolah informasi dari panca indra",
      "Mengendalikan gerakan sadar maupun tidak sadar",
      "Menyimpan ingatan, belajar, dan mengatur emosi"
    ],
    fakta: "Meski beratnya hanya sekitar 2% dari berat badan, otak menggunakan sekitar 20% dari total energi tubuh.",
    model: "models/otak.glb",
    modelIos: null,
    poster: "img/otak.webp",
    hotspots: [
      {
        id: "otak-besar",
        label: "Otak Besar (Serebrum)",
        info: "Bagian terbesar otak yang mengatur kemampuan berpikir, berbicara, ingatan, dan kesadaran.",
        position: "1.5150 1.7972 0.4534",
        normal: "0.6930 0.6968 0.1850"
      },
      {
        id: "lobus-frontal",
        label: "Lobus Frontal",
        info: "Bagian depan otak besar yang berperan dalam mengambil keputusan, perencanaan, dan pengendalian emosi.",
        position: "0.7204 0.7860 1.4316",
        normal: "0.5420 -0.0566 0.8385"
      },
      {
        id: "otak-kecil",
        label: "Otak Kecil (Serebelum)",
        info: "Terletak di bagian belakang bawah otak, berfungsi menjaga keseimbangan dan koordinasi gerakan tubuh.",
        position: "1.0559 -0.8483 -0.9766",
        normal: "0.6313 -0.7132 -0.3047"
      },
      {
        id: "batang-otak",
        label: "Batang Otak",
        info: "Menghubungkan otak dengan sumsum tulang belakang serta mengatur fungsi otomatis seperti bernapas dan detak jantung.",
        position: "0.0681 -1.1646 -0.4910",
        normal: "0.1650 -0.7831 -0.5996"
      }
    ],
    kredit: {
      judul: "Human Brain",
      pembuat: "AH",
      sumber: "https://skfb.ly/oqZPW",
      lisensi: "CC-BY 4.0"
    }
  },
  {
    id: "lambung",
    nama: "Lambung",
    ringkas: "Mencerna makanan secara mekanik dan kimiawi.",
    deskripsi: "Lambung adalah organ pencernaan berbentuk seperti kantong otot yang terletak di perut bagian atas. Lambung mencampur makanan dengan asam lambung dan enzim agar mudah diserap tubuh.",
    fungsi: [
      "Menyimpan makanan sementara sebelum masuk ke usus halus",
      "Menghancurkan makanan menggunakan asam lambung dan enzim pepsin",
      "Membunuh kuman atau bakteri yang terbawa bersama makanan"
    ],
    fakta: "Dinding lambung dilapisi lendir khusus agar tidak ikut tercerna oleh asam lambung yang sangat kuat.",
    model: "models/lambung.glb",
    modelIos: null,
    poster: "img/lambung.webp",
    hotspots: [
      {
        id: "esofagus",
        label: "Esofagus (Kerongkongan)",
        info: "Saluran berotot yang mendorong makanan dari tenggorokan turun masuk ke dalam lambung.",
        position: "-0.0169 0.5707 0.0414",
        normal: "0.1039 0.0878 0.9907"
      },
      {
        id: "fundus",
        label: "Fundus",
        info: "Bagian kubah paling atas lambung yang menampung makanan dan gas sementara setelah masuk.",
        position: "-0.5262 0.2209 0.2980",
        normal: "-0.1571 0.4156 0.8959"
      },
      {
        id: "badan-lambung",
        label: "Badan Lambung",
        info: "Bagian utama terbesar tempat makanan diaduk dan dicerna secara kimiawi oleh asam lambung dan enzim.",
        position: "-0.7605 -0.2454 0.1702",
        normal: "-0.6917 0.0329 0.7214"
      },
      {
        id: "duodenum",
        label: "Duodenum (Usus 12 Jari)",
        info: "Bagian awal usus halus yang menerima makanan yang sudah dihaluskan dari lambung.",
        position: "0.6325 -0.8666 0.3835",
        normal: "0.2131 0.2724 0.9383"
      }
    ],
    kredit: {
      judul: "Stomach - Organ",
      pembuat: "Trident.AI",
      sumber: "https://sketchfab.com/3d-models/stomach-organ-56ffcd2330ae4b7ea6c7b8a08c82b4b7",
      lisensi: "Sketchfab Free Standard"
    }
  },
  {
    id: "ginjal",
    nama: "Ginjal",
    ringkas: "Menyaring darah dan membuang zat sisa.",
    deskripsi: "Ginjal adalah sepasang organ berbentuk seperti kacang merah yang terletak di bagian belakang rongga perut. Ginjal menyaring kotoran dari darah dan mengeluarkannya dalam bentuk urine.",
    fungsi: [
      "Menyaring zat sisa metabolisme dan racun dari darah",
      "Mengatur keseimbangan air dan garam mineral dalam tubuh",
      "Membantu mengendalikan tekanan darah"
    ],
    fakta: "Setiap hari, kedua ginjal menyaring sekitar 180 liter cairan dari darah untuk menghasilkan sekitar 1,5 liter urine.",
    model: "models/ginjal.glb",
    modelIos: null,
    poster: "img/ginjal.webp",
    hotspots: [
      {
        id: "korteks-ginjal",
        label: "Korteks Ginjal",
        info: "Lapisan bagian luar ginjal tempat jutaan nefron mulai menyaring darah.",
        position: "-1.2039 8.8372 -1.2596",
        normal: "-0.0904 0.9266 -0.3651"
      },
      {
        id: "hilum",
        label: "Hilum",
        info: "Bagian lekukan cekung di sisi dalam ginjal yang menjadi pintu keluar-masuk pembuluh darah dan ureter.",
        position: "-0.1136 4.3211 -1.3267",
        normal: "0.5535 -0.6555 -0.5138"
      },
      {
        id: "pembuluh-darah-ginjal",
        label: "Pembuluh Darah Ginjal",
        info: "Terdiri dari arteri renalis yang membawa darah kotor ke ginjal dan vena renalis yang membawa darah bersih kembali.",
        position: "1.9112 3.5064 -0.2339",
        normal: "-0.2612 -0.3971 -0.8798"
      },
      {
        id: "ureter",
        label: "Ureter",
        info: "Saluran berotot yang mengalirkan urine hasil saringan dari ginjal menuju kandung kemih.",
        position: "0.2995 0.0978 -0.2137",
        normal: "0.4389 -0.0380 -0.8977"
      }
    ],
    kredit: {
      judul: "Kidney",
      pembuat: "cgmac",
      sumber: "https://skfb.ly/6QUPW",
      lisensi: "CC-BY 4.0"
    }
  },
  {
    id: "hati",
    nama: "Hati",
    ringkas: "Menetralkan racun dan menghasilkan empedu.",
    deskripsi: "Hati adalah organ dalam terbesar di tubuh manusia yang berada di perut bagian kanan atas. Hati berperan penting dalam metabolisme, penyimpanan energi, serta menyaring racun.",
    fungsi: [
      "Menetralkan racun dan obat-obatan yang masuk ke tubuh",
      "Menghasilkan cairan empedu untuk membantu mencerna lemak",
      "Menyimpan cadangan energi dalam bentuk glikogen"
    ],
    fakta: "Hati adalah satu-satunya organ dalam manusia yang mampu meregenerasi atau menumbuhkan kembali jaringannya yang rusak.",
    model: "models/hati.glb",
    modelIos: null,
    poster: "img/hati.webp",
    hotspots: [
      {
        id: "lobus-kanan",
        label: "Lobus Kanan",
        info: "Bagian terbesar hati yang menjalankan sebagian besar proses penyaringan racun dan metabolisme.",
        position: "0.0733 0.0270 0.0314",
        normal: "0.9376 0.3421 0.0618"
      },
      {
        id: "lobus-kiri",
        label: "Lobus Kiri",
        info: "Bagian hati yang lebih kecil dan meruncing ke arah kiri tubuh, membantu metabolisme nutrisi.",
        position: "0.0326 0.0439 -0.1020",
        normal: "0.8056 -0.1048 -0.5831"
      },
      {
        id: "kantung-empedu",
        label: "Kantung Empedu",
        info: "Kantong kecil di bawah hati yang menyimpan dan memekatkan cairan empedu sebelum disalurkan ke usus.",
        position: "0.0006 -0.0607 0.0252",
        normal: "-0.6584 -0.7512 0.0479"
      },
      {
        id: "pembuluh-hati",
        label: "Vena / Pembuluh Hati",
        info: "Pembuluh darah utama yang menyalurkan darah kaya nutrisi dari pencernaan dan mengalirkan darah keluar dari hati.",
        position: "-0.0407 0.0931 0.0092",
        normal: "0.6977 0.0715 0.7128"
      }
    ],
    kredit: {
      judul: "Human liver and gallbladder",
      pembuat: "ElliotSS",
      sumber: "https://skfb.ly/6SD8p",
      lisensi: "CC-BY 4.0"
    }
  }
];

const QUIZ = [
  {
    organId: "jantung",
    pertanyaan: "Apa fungsi utama jantung dalam sistem peredaran darah?",
    pilihan: [
      "Memompa darah ke seluruh tubuh",
      "Menyaring racun dari darah",
      "Menyerap oksigen dari udara",
      "Mencerna makanan"
    ],
    jawaban: 0,
    penjelasan: "Jantung berfungsi memompa darah kaya oksigen ke seluruh tubuh dan mengalirkan darah miskin oksigen ke paru-paru."
  },
  {
    organId: "jantung",
    pertanyaan: "Kira-kira berapa kali jantung manusia berdetak dalam satu hari?",
    pilihan: [
      "1.000 kali",
      "10.000 kali",
      "100.000 kali",
      "1.000.000 kali"
    ],
    jawaban: 2,
    penjelasan: "Jantung manusia rata-rata berdetak sekitar 100.000 kali setiap hari."
  },
  {
    organId: "paru-paru",
    pertanyaan: "Gas apa yang diserap oleh paru-paru untuk diedarkan ke seluruh tubuh?",
    pilihan: [
      "Karbon dioksida",
      "Oksigen",
      "Nitrogen",
      "Hidrogen"
    ],
    jawaban: 1,
    penjelasan: "Paru-paru menyerap oksigen dari udara yang kita hirup dan membuang karbon dioksida."
  },
  {
    organId: "paru-paru",
    pertanyaan: "Mengapa ukuran paru-paru kiri sedikit lebih kecil daripada paru-paru kanan?",
    pilihan: [
      "Karena udara masuk lebih banyak ke kanan",
      "Karena berbagi ruang dengan jantung",
      "Karena dilindungi oleh hati",
      "Karena tidak memiliki bronkus"
    ],
    jawaban: 1,
    penjelasan: "Paru-paru kiri berukuran sedikit lebih kecil agar memberi ruang bagi posisi jantung di dada sebelah kiri."
  },
  {
    organId: "otak",
    pertanyaan: "Bagian otak yang berperan utama mengatur keseimbangan dan koordinasi gerakan adalah...",
    pilihan: [
      "Otak kecil (Serebelum)",
      "Sumsum tulang belakang",
      "Kornea",
      "Trakea"
    ],
    jawaban: 0,
    penjelasan: "Otak kecil (serebelum) bertugas menjaga keseimbangan dan koordinasi gerakan otot."
  },
  {
    organId: "otak",
    pertanyaan: "Sekitar berapa persen energi tubuh yang digunakan oleh otak?",
    pilihan: [
      "2%",
      "5%",
      "20%",
      "50%"
    ],
    jawaban: 2,
    penjelasan: "Meski beratnya hanya sekitar 2% dari berat badan, otak mengonsumsi sekitar 20% total energi tubuh."
  },
  {
    organId: "lambung",
    pertanyaan: "Mengapa dinding lambung tidak ikut hancur oleh asam lambung yang kuat?",
    pilihan: [
      "Karena dilapisi tulang rawan",
      "Karena dilapisi lendir pelindung khusus",
      "Karena suhu lambung sangat dingin",
      "Karena makanan menyerap semua asam"
    ],
    jawaban: 1,
    penjelasan: "Dinding lambung menghasilkan lapisan lendir (mukus) yang melindunginya dari keasaman asam lambung."
  },
  {
    organId: "lambung",
    pertanyaan: "Selain mencerna makanan, apa fungsi asam lambung di dalam lambung?",
    pilihan: [
      "Memompa darah ke usus",
      "Membunuh kuman yang terbawa makanan",
      "Menyaring urine",
      "Menghasilkan sel darah merah"
    ],
    jawaban: 1,
    penjelasan: "Asam lambung membantu membunuh bakteri atau kuman yang masuk bersama makanan."
  },
  {
    organId: "ginjal",
    pertanyaan: "Zat sisa yang dikeluarkan oleh ginjal setelah menyaring darah berbentuk...",
    pilihan: [
      "Empedu",
      "Urine",
      "Asam lambung",
      "Karbon dioksida"
    ],
    jawaban: 1,
    penjelasan: "Ginjal menyaring kotoran dan kelebihan air dari darah untuk dibuang sebagai urine."
  },
  {
    organId: "ginjal",
    pertanyaan: "Saluran yang menghubungkan ginjal ke kandung kemih disebut...",
    pilihan: [
      "Trakea",
      "Ureter",
      "Aorta",
      "Kerongkongan"
    ],
    jawaban: 1,
    penjelasan: "Ureter adalah saluran yang mengalirkan urine dari masing-masing ginjal menuju kandung kemih."
  },
  {
    organId: "hati",
    pertanyaan: "Cairan yang dihasilkan hati untuk membantu mencerna lemak adalah...",
    pilihan: [
      "Empedu",
      "Insulin",
      "Pepsin",
      "Urine"
    ],
    jawaban: 0,
    penjelasan: "Hati memproduksi cairan empedu yang disimpan di kantung empedu untuk mengemulsi lemak di usus halus."
  },
  {
    organId: "hati",
    pertanyaan: "Keistimewaan organ hati dibandingkan organ dalam lainnya adalah...",
    pilihan: [
      "Berdetak 100.000 kali sehari",
      "Mampu meregenerasi jaringannya yang rusak",
      "Terletak di dalam tengkorak",
      "Berjumlah dua pasang"
    ],
    jawaban: 1,
    penjelasan: "Hati merupakan satu-satunya organ dalam manusia yang dapat menumbuhkan kembali jaringannya yang rusak."
  }
];

function getPreferredTheme() {
  try {
    const saved = localStorage.getItem("ar-organ-theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch (err) {
    // Abaikan jika localStorage tidak tersedia
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    const isDark = theme === "dark";
    toggleBtn.textContent = isDark ? "Terang" : "Gelap";
    toggleBtn.setAttribute(
      "aria-label",
      isDark ? "Ubah ke mode terang" : "Ubah ke mode gelap"
    );
  }
}

function initTheme() {
  applyTheme(getPreferredTheme());
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) {
    return;
  }
  toggleBtn.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("ar-organ-theme", nextTheme);
    } catch (err) {
      // Abaikan jika localStorage tidak tersedia
    }
  });
}

if (typeof document !== "undefined") {
  initTheme();
}
