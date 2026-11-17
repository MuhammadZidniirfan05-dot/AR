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
        id: "atrium-kanan",
        label: "Atrium Kanan",
        info: "Serambi kanan menerima darah miskin oksigen dari seluruh tubuh.",
        position: "0.05 0.1 0.05",
        normal: "0 1 0"
      },
      {
        id: "ventrikel-kiri",
        label: "Ventrikel Kiri",
        info: "Bilik kiri memompa darah kaya oksigen ke seluruh tubuh melalui aorta.",
        position: "-0.05 -0.1 0.05",
        normal: "0 1 0"
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
        info: "Saluran udara utama yang menghubungkan tenggorokan dengan bronkus.",
        position: "0 0.2 0",
        normal: "0 1 0"
      },
      {
        id: "paru-kanan",
        label: "Paru-paru Kanan",
        info: "Terdiri dari tiga lobus yang menampung udara saat bernapas.",
        position: "-0.1 0 0.05",
        normal: "0 1 0"
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
        info: "Mengatur kemampuan berpikir, berbicara, dan ingatan.",
        position: "0 0.12 0",
        normal: "0 1 0"
      },
      {
        id: "otak-kecil",
        label: "Otak Kecil (Serebelum)",
        info: "Mengatur keseimbangan dan koordinasi gerakan tubuh.",
        position: "0 -0.05 -0.1",
        normal: "0 0 -1"
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
        id: "fundus",
        label: "Fundus",
        info: "Bagian atas lambung yang menampung gas dan makanan yang baru masuk.",
        position: "0.05 0.1 0",
        normal: "0 1 0"
      },
      {
        id: "pilorus",
        label: "Pilorus",
        info: "Bagian bawah lambung yang mengatur keluarnya makanan menuju usus halus.",
        position: "-0.05 -0.1 0",
        normal: "0 -1 0"
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
        info: "Lapisan luar ginjal tempat nefron mulai menyaring darah.",
        position: "0.08 0.05 0",
        normal: "1 0 0"
      },
      {
        id: "ureter",
        label: "Ureter",
        info: "Saluran yang mengalirkan urine dari ginjal menuju kandung kemih.",
        position: "0 -0.1 0",
        normal: "0 -1 0"
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
    ringkas: "Menawarkan racun dan menghasilkan empedu.",
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
        info: "Bagian terbesar hati yang menjalankan sebagian besar fungsi metabolisme.",
        position: "-0.08 0.02 0.05",
        normal: "0 1 0"
      },
      {
        id: "kantung-empedu",
        label: "Kantung Empedu",
        info: "Menyimpan cairan empedu sebelum dialirkan ke usus halus.",
        position: "0 -0.06 0.05",
        normal: "0 -1 0"
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
