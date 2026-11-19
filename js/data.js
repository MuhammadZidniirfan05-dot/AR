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
        normal: "0.1333 0.5494 0.8249",
        en: {
          label: "Aorta",
          info: "The largest artery that carries oxygen-rich blood out from the heart to the rest of the body."
        }
      },
      {
        id: "atrium-kanan",
        label: "Atrium Kanan",
        info: "Serambi kanan menerima darah miskin oksigen yang kembali dari seluruh tubuh.",
        position: "-0.4230 0.3216 0.1700",
        normal: "-0.6730 0.5494 0.4952",
        en: {
          label: "Right Atrium",
          info: "The upper right chamber that receives oxygen-poor blood returning from the body."
        }
      },
      {
        id: "ventrikel-kanan",
        label: "Ventrikel Kanan",
        info: "Bilik kanan memompa darah miskin oksigen menuju paru-paru untuk mengambil oksigen.",
        position: "-0.1860 -0.0438 0.4580",
        normal: "-0.2598 0.0971 0.9608",
        en: {
          label: "Right Ventricle",
          info: "The lower right chamber that pumps oxygen-poor blood to the lungs to pick up oxygen."
        }
      },
      {
        id: "ventrikel-kiri",
        label: "Ventrikel Kiri",
        info: "Bilik kiri memiliki otot paling tebal untuk memompa darah kaya oksigen ke seluruh tubuh melalui aorta.",
        position: "0.1089 -0.4550 0.3641",
        normal: "0.3287 -0.3274 0.8859",
        en: {
          label: "Left Ventricle",
          info: "The lower left chamber with the thickest muscle wall to pump oxygen-rich blood to the body through the aorta."
        }
      }
    ],
    kredit: {
      judul: "Realistic Human Heart",
      pembuat: "neshallads",
      sumber: "https://skfb.ly/oyBCT",
      lisensi: "CC-BY 4.0"
    },
    penyakit: [
      {
        nama: "Penyakit Jantung Koroner",
        info: "Penyempitan pembuluh darah arteri koroner akibat penumpukan lemak dan kolesterol sehingga aliran darah ke otot jantung terhambat.",
        en: {
          nama: "Coronary Heart Disease",
          info: "Narrowing of the coronary arteries due to plaque and cholesterol buildup, restricting blood flow to the heart muscle."
        }
      },
      {
        nama: "Aritmia",
        info: "Gangguan irama detak jantung yang menjadi terlalu cepat, terlalu lambat, atau tidak teratur.",
        en: {
          nama: "Arrhythmia",
          info: "An irregular heartbeat condition where the heart beats too fast, too slow, or unevenly."
        }
      }
    ],
    tipsSehat: [
      "Rutin berolahraga minimal 30 menit setiap hari",
      "Kurangi makanan tinggi lemak jenuh, gula, dan garam berlebih",
      "Hindari rokok dan kelola stres dengan istirahat yang cukup"
    ],
    en: {
      nama: "Heart",
      ringkas: "Pumps blood throughout the entire body.",
      deskripsi: "The heart is a hollow muscular organ located in the left side of the chest cavity. It works continuously to pump blood carrying oxygen and nutrients to every cell in the body.",
      fungsi: [
        "Pumps oxygen-rich blood throughout the entire body",
        "Sends oxygen-poor blood to the lungs to be oxygenated",
        "Maintains stable blood pressure and circulation"
      ],
      fakta: "The human heart beats about 100,000 times every day and pumps more than 7,000 liters of blood.",
      penyakit: [
        {
          nama: "Coronary Heart Disease",
          info: "Narrowing of the coronary arteries due to plaque and cholesterol buildup, restricting blood flow to the heart muscle."
        },
        {
          nama: "Arrhythmia",
          info: "An irregular heartbeat condition where the heart beats too fast, too slow, or unevenly."
        }
      ],
      tipsSehat: [
        "Exercise regularly for at least 30 minutes every day",
        "Limit foods high in saturated fat, added sugar, and excess salt",
        "Avoid smoking and manage stress with adequate rest"
      ]
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
        normal: "-0.2494 0.1742 -0.9526",
        en: {
          label: "Trachea (Windpipe)",
          info: "The main airway connecting the throat to the bronchi."
        }
      },
      {
        id: "bronkus",
        label: "Bronkus",
        info: "Dua cabang saluran napas dari trakea yang mengarahkan udara masuk ke paru-paru kanan dan kiri.",
        position: "0.0030 0.1328 -0.0553",
        normal: "0.1406 0.0369 -0.9894",
        en: {
          label: "Bronchi",
          info: "Two main airway branches from the trachea that direct air into the right and left lungs."
        }
      },
      {
        id: "paru-kanan",
        label: "Paru-paru Kanan",
        info: "Terdiri dari tiga lobus dan ukurannya sedikit lebih besar daripada paru-paru kiri.",
        position: "-0.0673 0.0308 -0.1232",
        normal: "-0.1316 -0.0477 -0.9902",
        en: {
          label: "Right Lung",
          info: "Consists of three lobes and is slightly larger than the left lung."
        }
      },
      {
        id: "paru-kiri",
        label: "Paru-paru Kiri",
        info: "Terdiri dari dua lobus dan memiliki lekukan untuk memberi ruang bagi posisi jantung.",
        position: "0.0619 0.0808 -0.1223",
        normal: "-0.2332 0.0096 -0.9724",
        en: {
          label: "Left Lung",
          info: "Consists of two lobes and has an indentation (cardiac notch) to make room for the heart."
        }
      }
    ],
    kredit: {
      judul: "Realistic Human Lungs",
      pembuat: "neshallads",
      sumber: "https://skfb.ly/oBDWI",
      lisensi: "CC-BY 4.0"
    },
    penyakit: [
      {
        nama: "Asma",
        info: "Peradangan dan penyempitan saluran napas yang menyebabkan sesak, mengi, dan batuk saat terpapar debu atau udara dingin.",
        en: {
          nama: "Asthma",
          info: "Inflammation and narrowing of the airways causing shortness of breath, wheezing, and coughing when exposed to dust or cold air."
        }
      },
      {
        nama: "Pneumonia",
        info: "Infeksi pada kantung udara (alveolus) di paru-paru akibat bakteri atau virus sehingga terisi cairan.",
        en: {
          nama: "Pneumonia",
          info: "An infection of the air sacs (alveoli) in the lungs caused by bacteria or viruses, causing them to fill with fluid."
        }
      }
    ],
    tipsSehat: [
      "Hindari asap rokok dan polusi udara dengan memakai masker saat diperlukan",
      "Rutin berolahraga seperti jalan kaki atau berenang untuk melatih kapasitas paru-paru",
      "Jaga kebersihan ruangan agar bebas dari debu dan jamur"
    ],
    en: {
      nama: "Lungs",
      ringkas: "Exchanges oxygen and carbon dioxide.",
      deskripsi: "The lungs are a pair of respiratory organs located inside the chest cavity and protected by the rib cage. They take in oxygen from inhaled air and release carbon dioxide.",
      fungsi: [
        "Absorbs oxygen from inhaled air into the bloodstream",
        "Expels carbon dioxide as a metabolic waste product",
        "Helps maintain the acid-base (pH) balance of the blood"
      ],
      fakta: "The right lung is slightly larger than the left lung because the left lung shares space in the chest with the heart.",
      penyakit: [
        {
          nama: "Asthma",
          info: "Inflammation and narrowing of the airways causing shortness of breath, wheezing, and coughing when exposed to dust or cold air."
        },
        {
          nama: "Pneumonia",
          info: "An infection of the air sacs (alveoli) in the lungs caused by bacteria or viruses, causing them to fill with fluid."
        }
      ],
      tipsSehat: [
        "Avoid cigarette smoke and air pollution by wearing a mask when needed",
        "Do aerobic exercise such as walking or swimming to train lung capacity",
        "Keep indoor spaces clean, well-ventilated, and free of dust and mold"
      ]
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
        normal: "0.6930 0.6968 0.1850",
        en: {
          label: "Cerebrum",
          info: "The largest part of the brain that controls thinking, speech, memory, and consciousness."
        }
      },
      {
        id: "lobus-frontal",
        label: "Lobus Frontal",
        info: "Bagian depan otak besar yang berperan dalam mengambil keputusan, perencanaan, dan pengendalian emosi.",
        position: "0.7204 0.7860 1.4316",
        normal: "0.5420 -0.0566 0.8385",
        en: {
          label: "Frontal Lobe",
          info: "The front part of the cerebrum responsible for decision-making, planning, and emotional control."
        }
      },
      {
        id: "otak-kecil",
        label: "Otak Kecil (Serebelum)",
        info: "Terletak di bagian belakang bawah otak, berfungsi menjaga keseimbangan dan koordinasi gerakan tubuh.",
        position: "1.0559 -0.8483 -0.9766",
        normal: "0.6313 -0.7132 -0.3047",
        en: {
          label: "Cerebellum",
          info: "Located at the lower back of the brain, responsible for balance and coordination of body movements."
        }
      },
      {
        id: "batang-otak",
        label: "Batang Otak",
        info: "Menghubungkan otak dengan sumsum tulang belakang serta mengatur fungsi otomatis seperti bernapas dan detak jantung.",
        position: "0.0681 -1.1646 -0.4910",
        normal: "0.1650 -0.7831 -0.5996",
        en: {
          label: "Brainstem",
          info: "Connects the brain to the spinal cord and controls automatic functions such as breathing and heart rate."
        }
      }
    ],
    kredit: {
      judul: "Human Brain",
      pembuat: "AH",
      sumber: "https://skfb.ly/oqZPW",
      lisensi: "CC-BY 4.0"
    },
    penyakit: [
      {
        nama: "Stroke",
        info: "Terhentinya suplai darah ke bagian otak akibat penyumbatan atau pecahnya pembuluh darah otak.",
        en: {
          nama: "Stroke",
          info: "Interruption of blood supply to part of the brain caused by a blocked or ruptured blood vessel."
        }
      },
      {
        nama: "Migrain",
        info: "Sakit kepala berdenyut hebat di satu sisi kepala yang sering disertai sensitivitas terhadap cahaya atau suara.",
        en: {
          nama: "Migraine",
          info: "A severe throbbing headache, usually on one side of the head, often accompanied by sensitivity to light or sound."
        }
      }
    ],
    tipsSehat: [
      "Tidur cukup 7–9 jam setiap malam agar sel saraf otak dapat pulih optimal",
      "Latih otak dengan membaca, belajar hal baru, atau bermain teka-teki",
      "Konsumsi makanan kaya omega-3 seperti ikan, kacang-kacangan, dan sayuran hijau"
    ],
    en: {
      nama: "Brain",
      ringkas: "Control center of the nervous system and thought.",
      deskripsi: "The brain is the most complex organ inside the skull. It regulates all body activities, from thinking, remembering, and feeling emotions to controlling muscle movements.",
      fungsi: [
        "Processes sensory information from the five senses",
        "Controls both voluntary and involuntary movements",
        "Stores memories, enables learning, and regulates emotions"
      ],
      fakta: "Although it makes up only about 2% of total body weight, the brain uses around 20% of the body's energy.",
      penyakit: [
        {
          nama: "Stroke",
          info: "Interruption of blood supply to part of the brain caused by a blocked or ruptured blood vessel."
        },
        {
          nama: "Migraine",
          info: "A severe throbbing headache, usually on one side of the head, often accompanied by sensitivity to light or sound."
        }
      ],
      tipsSehat: [
        "Get 7–9 hours of quality sleep every night so brain cells can recover",
        "Keep your brain active by reading, learning new skills, or solving puzzles",
        "Eat omega-3-rich foods such as fish, nuts, and leafy green vegetables"
      ]
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
        normal: "0.1039 0.0878 0.9907",
        en: {
          label: "Esophagus",
          info: "A muscular tube that pushes food from the throat down into the stomach."
        }
      },
      {
        id: "fundus",
        label: "Fundus",
        info: "Bagian kubah paling atas lambung yang menampung makanan dan gas sementara setelah masuk.",
        position: "-0.5262 0.2209 0.2980",
        normal: "-0.1571 0.4156 0.8959",
        en: {
          label: "Fundus",
          info: "The upper dome-shaped section of the stomach that temporarily holds food and swallowed air."
        }
      },
      {
        id: "badan-lambung",
        label: "Badan Lambung",
        info: "Bagian utama terbesar tempat makanan diaduk dan dicerna secara kimiawi oleh asam lambung dan enzim.",
        position: "-0.7605 -0.2454 0.1702",
        normal: "-0.6917 0.0329 0.7214",
        en: {
          label: "Stomach Body (Corpus)",
          info: "The largest central region where food is churned and chemically broken down by stomach acid and enzymes."
        }
      },
      {
        id: "duodenum",
        label: "Duodenum (Usus 12 Jari)",
        info: "Bagian awal usus halus yang menerima makanan yang sudah dihaluskan dari lambung.",
        position: "0.6325 -0.8666 0.3835",
        normal: "0.2131 0.2724 0.9383",
        en: {
          label: "Duodenum",
          info: "The first section of the small intestine that receives partially digested food from the stomach."
        }
      }
    ],
    kredit: {
      judul: "Stomach - Organ",
      pembuat: "Trident.AI",
      sumber: "https://sketchfab.com/3d-models/stomach-organ-56ffcd2330ae4b7ea6c7b8a08c82b4b7",
      lisensi: "Sketchfab Free Standard"
    },
    penyakit: [
      {
        nama: "Gastritis (Maag)",
        info: "Peradangan pada dinding lambung yang menimbulkan nyeri ulu hati, mual, dan perut kembung.",
        en: {
          nama: "Gastritis",
          info: "Inflammation of the stomach lining that causes upper abdominal pain, nausea, and bloating."
        }
      },
      {
        nama: "GERD (Asam Lambung Naik)",
        info: "Naiknya asam lambung ke kerongkongan sehingga menimbulkan rasa perih atau panas di dada.",
        en: {
          nama: "GERD (Acid Reflux)",
          info: "A condition where stomach acid flows back into the esophagus, causing heartburn or chest discomfort."
        }
      }
    ],
    tipsSehat: [
      "Makan secara teratur dengan porsi secukupnya dan kunyah makanan hingga halus",
      "Kurangi makanan terlalu pedas, asam, serta minuman berkafein atau bersoda",
      "Jangan langsung berbaring minimal 2 jam setelah selesai makan"
    ],
    en: {
      nama: "Stomach",
      ringkas: "Digests food mechanically and chemically.",
      deskripsi: "The stomach is a J-shaped muscular digestive sac located in the upper abdomen. It churns food and mixes it with gastric acid and digestive enzymes so nutrients can be absorbed.",
      fungsi: [
        "Temporarily stores food before passing it to the small intestine",
        "Breaks down food using gastric acid and the enzyme pepsin",
        "Kills harmful germs and bacteria swallowed with food"
      ],
      fakta: "The stomach wall is coated with a protective mucus layer so it is not digested by its own strong acid.",
      penyakit: [
        {
          nama: "Gastritis",
          info: "Inflammation of the stomach lining that causes upper abdominal pain, nausea, and bloating."
        },
        {
          nama: "GERD (Acid Reflux)",
          info: "A condition where stomach acid flows back into the esophagus, causing heartburn or chest discomfort."
        }
      ],
      tipsSehat: [
        "Eat regular meals in moderate portions and chew your food thoroughly",
        "Limit overly spicy or acidic foods, as well as caffeinated or carbonated drinks",
        "Avoid lying down for at least 2 hours after eating"
      ]
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
        normal: "-0.0904 0.9266 -0.3651",
        en: {
          label: "Renal Cortex",
          info: "The outer layer of the kidney where millions of nephrons begin filtering blood."
        }
      },
      {
        id: "hilum",
        label: "Hilum",
        info: "Bagian lekukan cekung di sisi dalam ginjal yang menjadi pintu keluar-masuk pembuluh darah dan ureter.",
        position: "-0.1136 4.3211 -1.3267",
        normal: "0.5535 -0.6555 -0.5138",
        en: {
          label: "Renal Hilum",
          info: "The concave inner notch of the kidney where blood vessels and the ureter enter and exit."
        }
      },
      {
        id: "pembuluh-darah-ginjal",
        label: "Pembuluh Darah Ginjal",
        info: "Terdiri dari arteri renalis yang membawa darah kotor ke ginjal dan vena renalis yang membawa darah bersih kembali.",
        position: "1.9112 3.5064 -0.2339",
        normal: "-0.2612 -0.3971 -0.8798",
        en: {
          label: "Renal Blood Vessels",
          info: "Includes the renal artery bringing unfiltered blood into the kidney and the renal vein returning filtered blood."
        }
      },
      {
        id: "ureter",
        label: "Ureter",
        info: "Saluran berotot yang mengalirkan urine hasil saringan dari ginjal menuju kandung kemih.",
        position: "0.2995 0.0978 -0.2137",
        normal: "0.4389 -0.0380 -0.8977",
        en: {
          label: "Ureter",
          info: "A muscular tube that carries urine from the kidney down to the urinary bladder."
        }
      }
    ],
    kredit: {
      judul: "Kidney",
      pembuat: "cgmac",
      sumber: "https://skfb.ly/6QUPW",
      lisensi: "CC-BY 4.0"
    },
    penyakit: [
      {
        nama: "Batu Ginjal",
        info: "Endapan mineral dan garam yang mengeras di dalam ginjal sehingga dapat menyumbat saluran urine.",
        en: {
          nama: "Kidney Stones",
          info: "Hardened mineral and salt deposits inside the kidneys that can block the urinary tract."
        }
      },
      {
        nama: "Gagal Ginjal",
        info: "Menurunnya kemampuan ginjal dalam menyaring limbah dan cairan berlebih dari dalam darah.",
        en: {
          nama: "Kidney Failure",
          info: "A condition in which the kidneys lose their ability to effectively filter waste and excess fluid from the blood."
        }
      }
    ],
    tipsSehat: [
      "Minum air putih yang cukup (sekitar 8 gelas per hari) agar ginjal mudah menyaring kotoran",
      "Batasi konsumsi minuman manis, makanan tinggi garam, dan tidak menahan buang air kecil",
      "Hindari penggunaan obat pereda nyeri sembarangan tanpa anjuran dokter"
    ],
    en: {
      nama: "Kidneys",
      ringkas: "Filters blood and removes waste products.",
      deskripsi: "The kidneys are a pair of bean-shaped organs located at the back of the abdominal cavity. They filter waste products and excess water from the blood to produce urine.",
      fungsi: [
        "Filters metabolic waste products and toxins from the blood",
        "Regulates the balance of water and mineral salts in the body",
        "Helps control blood pressure through hormone regulation"
      ],
      fakta: "Every day, your two kidneys filter about 180 liters of fluid from the blood to produce around 1.5 liters of urine.",
      penyakit: [
        {
          nama: "Kidney Stones",
          info: "Hardened mineral and salt deposits inside the kidneys that can block the urinary tract."
        },
        {
          nama: "Kidney Failure",
          info: "A condition in which the kidneys lose their ability to effectively filter waste and excess fluid from the blood."
        }
      ],
      tipsSehat: [
        "Drink plenty of water (around 8 glasses a day) to help the kidneys flush out waste",
        "Limit sugary drinks and high-salt foods, and avoid holding in urine",
        "Avoid overusing painkiller medications without medical advice"
      ]
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
        normal: "0.9376 0.3421 0.0618",
        en: {
          label: "Right Lobe",
          info: "The largest section of the liver that performs most detoxification and metabolic processes."
        }
      },
      {
        id: "lobus-kiri",
        label: "Lobus Kiri",
        info: "Bagian hati yang lebih kecil dan meruncing ke arah kiri tubuh, membantu metabolisme nutrisi.",
        position: "0.0326 0.0439 -0.1020",
        normal: "0.8056 -0.1048 -0.5831",
        en: {
          label: "Left Lobe",
          info: "The smaller, tapered section extending toward the left side of the abdomen that aids nutrient metabolism."
        }
      },
      {
        id: "kantung-empedu",
        label: "Kantung Empedu",
        info: "Kantong kecil di bawah hati yang menyimpan dan memekatkan cairan empedu sebelum disalurkan ke usus.",
        position: "0.0006 -0.0607 0.0252",
        normal: "-0.6584 -0.7512 0.0479",
        en: {
          label: "Gallbladder",
          info: "A small pear-shaped sac under the liver that stores and concentrates bile before releasing it into the intestine."
        }
      },
      {
        id: "pembuluh-hati",
        label: "Vena / Pembuluh Hati",
        info: "Pembuluh darah utama yang menyalurkan darah kaya nutrisi dari pencernaan dan mengalirkan darah keluar dari hati.",
        position: "-0.0407 0.0931 0.0092",
        normal: "0.6977 0.0715 0.7128",
        en: {
          label: "Hepatic Vessels",
          info: "Major blood vessels that deliver nutrient-rich blood from the digestive tract and carry filtered blood out of the liver."
        }
      }
    ],
    kredit: {
      judul: "Human liver and gallbladder",
      pembuat: "ElliotSS",
      sumber: "https://skfb.ly/6SD8p",
      lisensi: "CC-BY 4.0"
    },
    penyakit: [
      {
        nama: "Hepatitis",
        info: "Peradangan pada jaringan hati yang paling sering disebabkan oleh infeksi virus hepatitis A, B, atau C.",
        en: {
          nama: "Hepatitis",
          info: "Inflammation of liver tissue most commonly caused by hepatitis A, B, or C viral infections."
        }
      },
      {
        nama: "Perlemakan Hati (Fatty Liver)",
        info: "Penumpukan lemak berlebih di sel-sel hati yang dapat mengganggu fungsi metabolisme tubuh.",
        en: {
          nama: "Fatty Liver Disease",
          info: "Excessive fat buildup inside liver cells that can impair normal liver and metabolic function."
        }
      }
    ],
    tipsSehat: [
      "Konsumsi makanan bergizi seimbang serta batasi makanan tinggi gula dan lemak jenuh",
      "Jaga kebersihan makanan dan lakukan vaksinasi hepatitis sesuai anjuran kesehatan",
      "Hindari konsumsi alkohol dan jaga berat badan tetap ideal"
    ],
    en: {
      nama: "Liver",
      ringkas: "Detoxifies harmful substances and produces bile.",
      deskripsi: "The liver is the largest internal organ in the human body, located in the upper right abdomen. It plays a vital role in metabolism, energy storage, and filtering toxins.",
      fungsi: [
        "Neutralizes toxins and processes medications in the blood",
        "Produces bile to help break down and digest fats",
        "Stores reserve energy in the form of glycogen"
      ],
      fakta: "The liver is the only human internal organ capable of regenerating and regrowing damaged tissue.",
      penyakit: [
        {
          nama: "Hepatitis",
          info: "Inflammation of liver tissue most commonly caused by hepatitis A, B, or C viral infections."
        },
        {
          nama: "Fatty Liver Disease",
          info: "Excessive fat buildup inside liver cells that can impair normal liver and metabolic function."
        }
      ],
      tipsSehat: [
        "Eat a balanced diet and limit foods high in sugar and saturated fat",
        "Practice good food hygiene and get vaccinated against hepatitis as recommended",
        "Avoid alcohol consumption and maintain a healthy body weight"
      ]
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
    penjelasan: "Jantung berfungsi memompa darah kaya oksigen ke seluruh tubuh dan mengalirkan darah miskin oksigen ke paru-paru.",
    en: {
      pertanyaan: "What is the main function of the heart in the circulatory system?",
      pilihan: [
        "Pumping blood throughout the body",
        "Filtering toxins from the blood",
        "Absorbing oxygen from the air",
        "Digesting food"
      ],
      penjelasan: "The heart pumps oxygen-rich blood throughout the body and sends oxygen-poor blood to the lungs."
    }
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
    penjelasan: "Jantung manusia rata-rata berdetak sekitar 100.000 kali setiap hari.",
    en: {
      pertanyaan: "Approximately how many times does the human heart beat in a single day?",
      pilihan: [
        "1,000 times",
        "10,000 times",
        "100,000 times",
        "1,000,000 times"
      ],
      penjelasan: "On average, the human heart beats about 100,000 times every day."
    }
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
    penjelasan: "Paru-paru menyerap oksigen dari udara yang kita hirup dan membuang karbon dioksida.",
    en: {
      pertanyaan: "Which gas is absorbed by the lungs to be distributed throughout the body?",
      pilihan: [
        "Carbon dioxide",
        "Oxygen",
        "Nitrogen",
        "Hydrogen"
      ],
      penjelasan: "The lungs absorb oxygen from the air we breathe in and expel carbon dioxide."
    }
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
    penjelasan: "Paru-paru kiri berukuran sedikit lebih kecil agar memberi ruang bagi posisi jantung di dada sebelah kiri.",
    en: {
      pertanyaan: "Why is the left lung slightly smaller than the right lung?",
      pilihan: [
        "Because more air enters the right side",
        "Because it shares space with the heart",
        "Because it is protected by the liver",
        "Because it does not have a bronchus"
      ],
      penjelasan: "The left lung is slightly smaller to leave room for the heart on the left side of the chest."
    }
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
    penjelasan: "Otak kecil (serebelum) bertugas menjaga keseimbangan dan koordinasi gerakan otot.",
    en: {
      pertanyaan: "Which part of the brain is primarily responsible for balance and movement coordination?",
      pilihan: [
        "Cerebellum",
        "Spinal cord",
        "Cornea",
        "Trachea"
      ],
      penjelasan: "The cerebellum maintains posture, balance, and smooth coordination of muscle movements."
    }
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
    penjelasan: "Meski beratnya hanya sekitar 2% dari berat badan, otak mengonsumsi sekitar 20% total energi tubuh.",
    en: {
      pertanyaan: "Approximately what percentage of the body's total energy is used by the brain?",
      pilihan: [
        "2%",
        "5%",
        "20%",
        "50%"
      ],
      penjelasan: "Although it weighs only about 2% of total body weight, the brain consumes about 20% of the body's energy."
    }
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
    penjelasan: "Dinding lambung menghasilkan lapisan lendir (mukus) yang melindunginya dari keasaman asam lambung.",
    en: {
      pertanyaan: "Why isn't the stomach wall damaged by its own strong gastric acid?",
      pilihan: [
        "Because it is lined with cartilage",
        "Because it is coated with a protective mucus layer",
        "Because the stomach temperature is very cold",
        "Because food absorbs all of the acid"
      ],
      penjelasan: "The stomach lining secretes a thick layer of mucus that protects it from strong stomach acid."
    }
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
    penjelasan: "Asam lambung membantu membunuh bakteri atau kuman yang masuk bersama makanan.",
    en: {
      pertanyaan: "Besides digesting food, what is another key function of stomach acid?",
      pilihan: [
        "Pumping blood to the intestines",
        "Killing germs carried in food",
        "Filtering urine",
        "Producing red blood cells"
      ],
      penjelasan: "Gastric acid helps kill harmful bacteria and pathogens that enter the body with food."
    }
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
    penjelasan: "Ginjal menyaring kotoran dan kelebihan air dari darah untuk dibuang sebagai urine.",
    en: {
      pertanyaan: "What form does the waste removed by the kidneys after filtering blood take?",
      pilihan: [
        "Bile",
        "Urine",
        "Gastric acid",
        "Carbon dioxide"
      ],
      penjelasan: "The kidneys filter waste and excess water from the blood to be excreted as urine."
    }
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
    penjelasan: "Ureter adalah saluran yang mengalirkan urine dari masing-masing ginjal menuju kandung kemih.",
    en: {
      pertanyaan: "What is the name of the tube that connects each kidney to the urinary bladder?",
      pilihan: [
        "Trachea",
        "Ureter",
        "Aorta",
        "Esophagus"
      ],
      penjelasan: "The ureters are muscular tubes that carry urine from each kidney to the bladder."
    }
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
    penjelasan: "Hati memproduksi cairan empedu yang disimpan di kantung empedu untuk mengemulsi lemak di usus halus.",
    en: {
      pertanyaan: "Which fluid is produced by the liver to help digest fats?",
      pilihan: [
        "Bile",
        "Insulin",
        "Pepsin",
        "Urine"
      ],
      penjelasan: "The liver produces bile, which is stored in the gallbladder to emulsify fats in the small intestine."
    }
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
    penjelasan: "Hati merupakan satu-satunya organ dalam manusia yang dapat menumbuhkan kembali jaringannya yang rusak.",
    en: {
      pertanyaan: "What unique ability does the liver have compared to other internal organs?",
      pilihan: [
        "It beats 100,000 times a day",
        "It can regenerate its own damaged tissue",
        "It is located inside the skull",
        "It comes in two pairs"
      ],
      penjelasan: "The liver is the only human internal organ that can regenerate and regrow damaged tissue."
    }
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

function getThemeButtonLabels(isDark) {
  let isEn = document.documentElement.lang === "en";
  try {
    const savedLang = localStorage.getItem("ar-organ-lang");
    if (savedLang === "en" || savedLang === "id") {
      isEn = savedLang === "en";
    }
  } catch (err) {
    // Abaikan jika localStorage tidak tersedia
  }
  if (isEn) {
    return {
      text: isDark ? "Light" : "Dark",
      aria: isDark ? "Switch to light mode" : "Switch to dark mode"
    };
  }
  return {
    text: isDark ? "Terang" : "Gelap",
    aria: isDark ? "Ubah ke mode terang" : "Ubah ke mode gelap"
  };
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    const isDark = theme === "dark";
    const labels = getThemeButtonLabels(isDark);
    toggleBtn.textContent = labels.text;
    toggleBtn.setAttribute("aria-label", labels.aria);
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
