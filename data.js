// =========================================================
// EduAdapt ĐGNL — Kho dữ liệu Ôn luyện ĐGNL ĐHQG-HCM
// Tổng hợp từ các nguồn uy tín đã qua kiểm duyệt
// =========================================================

const VERIFIED_SOURCES = {
  cet: {
    id: "cet",
    name: "Trung tâm Khảo thí & ĐGCL Đào tạo — ĐHQG-HCM (CET)",
    category: "Cấu trúc đề thi & Đề minh họa chính thức",
    url: "https://thinangluc.vnuhcm.edu.vn/",
    verifiedDate: "Kiểm duyệt: 11/2026",
    trustLevel: "Nguồn chính thức ĐHQG-HCM",
    description: "Đơn vị tổ chức kỳ thi Đánh giá Năng lực ĐHQG-HCM, ban hành cấu trúc đề thi 120 câu (150 phút) và đề thi mẫu chuẩn."
  },
  moet: {
    id: "moet",
    name: "Bộ GD&ĐT — Chương trình GDPT 2018 (SGK Chuẩn)",
    category: "Toán, Văn, Lý, Hóa, Sinh, Sử, Địa",
    url: "https://moet.gov.vn/",
    verifiedDate: "Kiểm duyệt: 10/2026",
    trustLevel: "Chuẩn Quốc gia",
    description: "Hệ thống kiến thức nền tảng từ các bộ sách giáo khoa Kết nối tri thức, Chân trời sáng tạo và Cánh diều."
  },
  linguistics: {
    id: "linguistics",
    name: "Viện Ngôn ngữ học & Từ điển Tiếng Việt (Hoàng Phê)",
    category: "Tiếng Việt — Chính tả, Ngữ pháp, Tu từ",
    url: "https://vienngonnguhoc.gov.vn/",
    verifiedDate: "Kiểm duyệt: 09/2026",
    trustLevel: "Học thuật Quốc gia",
    description: "Chuẩn mực về ngữ nghĩa, chính tả, cấu trúc câu và phong cách ngôn ngữ Tiếng Việt dùng trong đề thi ĐGNL."
  },
  cambridge: {
    id: "cambridge",
    name: "Cambridge English & British Council",
    category: "Tiếng Anh học thuật (B1–C1)",
    url: "https://learnenglish.britishcouncil.org/",
    verifiedDate: "Kiểm duyệt: 10/2026",
    trustLevel: "Chuẩn Quốc tế",
    description: "Tài liệu ngữ pháp chuẩn, cấu trúc viết lại câu, nhận diện lỗi sai và kỹ năng đọc hiểu học thuật."
  },
  khan: {
    id: "khan",
    name: "Khan Academy — Mathematics & Statistics",
    category: "Toán học, Xác suất & Phân tích số liệu",
    url: "https://www.khanacademy.org/math",
    verifiedDate: "Kiểm duyệt: 11/2026",
    trustLevel: "Giáo dục Quốc tế",
    description: "Hệ thống bài giảng trực quan từng bước về xác suất, thống kê, hàm số và đọc biểu đồ số liệu."
  },
  mit: {
    id: "mit",
    name: "MIT OpenCourseWare — Logic & Scientific Reasoning",
    category: "Tư duy Logic & Suy luận Khoa học",
    url: "https://ocw.mit.edu/",
    verifiedDate: "Kiểm duyệt: 10/2026",
    trustLevel: "Đại học Hàng đầu",
    description: "Phương pháp suy luận logic mệnh đề, phân tích dữ liệu thực nghiệm và tư duy phản biện khoa học."
  }
};

const LEVEL_META = {
  beginner: {
    label: "Cơ bản (600–750đ)",
    short: "Cơ bản",
    badgeClass: "level-beginner"
  },
  intermediate: {
    label: "Trung cấp (750–900đ)",
    short: "Trung cấp",
    badgeClass: "level-intermediate"
  },
  advanced: {
    label: "Nâng cao (900–1100+đ)",
    short: "Nâng cao",
    badgeClass: "level-advanced"
  }
};

const GOAL_META = {
  concept: "Nắm vững lý thuyết",
  practice: "Luyện giải chi tiết",
  exam: "Chiến thuật phòng thi"
};

const DIAGNOSTIC_SECTIONS = [
  {
    id: "vi",
    title: "Phần 1: Tiếng Việt (5 câu)",
    questions: [
      {
        id: "vi1",
        q: "Câu nào sau đây mắc lỗi THIẾU CHỦ NGỮ?",
        options: [
          "Mùa thu về, lá vàng rơi đầy sân trường.",
          "Qua tác phẩm Truyện Kiều đã phản ánh sâu sắc xã hội phong kiến.",
          "Sinh viên ĐHQG-HCM tích cực tham gia nghiên cứu khoa học.",
          "Trên bầu trời, từng đàn chim én đang chao lượn."
        ],
        answer: 1,
        explanation: "Cụm 'Qua tác phẩm Truyện Kiều' là trạng ngữ, phần sau 'đã phản ánh...' là vị ngữ → thiếu chủ ngữ."
      },
      {
        id: "vi2",
        q: "Từ nào sau đây viết ĐÚNG chính tả Tiếng Việt?",
        options: ["Sáng lạng", "Xán lạn", "Chỉn tru", "Bàng quang (thờ ơ)"],
        answer: 1,
        explanation: "'Xán lạn' là từ Hán Việt đúng chính tả (rực rỡ, tươi sáng)."
      },
      {
        id: "vi3",
        q: "Trong câu thơ 'Áo chàm đưa buổi phân ly', hình ảnh 'Áo chàm' sử dụng biện pháp tu từ nào?",
        options: ["So sánh", "Ẩn dụ", "Hoán dụ", "Nhân hóa"],
        answer: 2,
        explanation: "Lấy trang phục đặc trưng (áo chàm) để chỉ người dân Việt Bắc → Hoán dụ."
      },
      {
        id: "vi4",
        q: "Câu nào sau đây mắc lỗi SAI LOGIC về quan hệ từ?",
        options: [
          "Vì trời mưa to nên đường bị ngập.",
          "Tuy được đầu tư hiện đại nhưng chất lượng đào tạo ngày càng nâng cao.",
          "Mặc dù gặp nhiều khó khăn, nhóm nghiên cứu vẫn hoàn thành đúng hạn.",
          "Không những học giỏi Toán, Lan còn rất xuất sắc ở môn Tiếng Anh."
        ],
        answer: 1,
        explanation: "Hai vế có quan hệ nguyên nhân – kết quả nhưng lại dùng cặp quan hệ từ tương phản 'Tuy... nhưng...'."
      },
      {
        id: "vi5",
        q: "Cụm từ nào sau đây KHÔNG mắc lỗi lặp nghĩa (thừa từ)?",
        options: ["Tối ưu nhất", "Tái diễn lại", "Hợp tác cùng nhau", "Độc nhất vô nhị"],
        answer: 3,
        explanation: "'Độc nhất vô nhị' là thành ngữ chuẩn; các cụm còn lại đều bị lặp nghĩa."
      }
    ]
  },
  {
    id: "en",
    title: "Phần 2: Tiếng Anh (5 câu)",
    questions: [
      {
        id: "en1",
        q: "The number of students applying for VNU-HCM ______ significantly this year.",
        options: ["have increased", "has increased", "are increasing", "were increasing"],
        answer: 1,
        explanation: "'The number of + N(số nhiều)' luôn đi với động từ số ít → 'has increased'."
      },
      {
        id: "en2",
        q: "If I ______ enough time right now, I would join the robotics club.",
        options: ["have", "had", "will have", "would have"],
        answer: 1,
        explanation: "Câu điều kiện loại 2 (trái với hiện tại): If + S + V2/ed, S + would + V."
      },
      {
        id: "en3",
        q: "The research paper ______ by the university team won the first prize.",
        options: ["publishing", "published", "was published", "which published"],
        answer: 1,
        explanation: "Rút gọn mệnh đề quan hệ bị động dùng V3/ed → 'published'."
      },
      {
        id: "en4",
        q: "Choose the closest meaning: 'Although it rained heavily, they continued the experiment.'",
        options: [
          "Because of the heavy rain, they continued the experiment.",
          "Despite the heavy rain, they continued the experiment.",
          "In spite of it rained heavily, they continued the experiment.",
          "Despite the heavy rain, they stopped the experiment."
        ],
        answer: 1,
        explanation: "'Although + S + V' tương đương với 'Despite + cụm danh từ'."
      },
      {
        id: "en5",
        q: "Not only ______ the data accurately, but she also proposed an effective solution.",
        options: ["she analyzed", "did she analyze", "she did analyze", "analyzed she"],
        answer: 1,
        explanation: "'Not only' đứng đầu câu phải dùng đảo ngữ: Not only + did + S + V(nguyên mẫu)."
      }
    ]
  },
  {
    id: "math",
    title: "Phần 3: Toán học (5 câu)",
    questions: [
      {
        id: "m1",
        q: "Gieo một con xúc xắc cân đối đồng chất 1 lần. Xác suất xuất hiện mặt có số chấm chia hết cho 3 là:",
        options: ["1/6", "1/3", "1/2", "2/3"],
        answer: 1,
        explanation: "Các mặt chia hết cho 3 là {3, 6} (2 mặt) trên tổng 6 mặt → P = 2/6 = 1/3."
      },
      {
        id: "m2",
        q: "Một sản phẩm giảm giá 20%, sau đó tiếp tục giảm thêm 10% trên giá đã giảm. Tổng cộng sản phẩm đã giảm bao nhiêu phần trăm so với giá gốc?",
        options: ["30%", "28%", "25%", "32%"],
        answer: 1,
        explanation: "Giá còn lại = 0,8 × 0,9 = 0,72 (72%) → Tổng giảm = 100% - 72% = 28%."
      },
      {
        id: "m3",
        q: "Hàm số y = x³ - 3x + 2 đạt cực tiểu tại điểm nào?",
        options: ["x = -1", "x = 0", "x = 1", "x = 2"],
        answer: 2,
        explanation: "y' = 3x² - 3 = 0 ⇔ x = ±1; y'' = 6x → y''(1) = 6 > 0 nên đạt cực tiểu tại x = 1."
      },
      {
        id: "m4",
        q: "Gửi 100 triệu đồng lãi kép 10%/năm (kỳ hạn 1 năm). Sau 2 năm tổng số tiền nhận được là:",
        options: ["120 triệu", "121 triệu", "110 triệu", "122 triệu"],
        answer: 1,
        explanation: "T = 100 × (1 + 0,1)² = 100 × 1,21 = 121 triệu đồng."
      },
      {
        id: "m5",
        q: "Trong không gian Oxyz, khoảng cách từ điểm M(1; 2; -1) đến mặt phẳng (P): 2x - y + 2z + 5 = 0 bằng:",
        options: ["1", "4/3", "2", "5/3"],
        answer: 0,
        explanation: "d = |2(1) - 2 + 2(-1) + 5| / √(4 + 1 + 4) = 3 / 3 = 1."
      }
    ]
  },
  {
    id: "logic",
    title: "Phần 4: Tư duy Logic & Phân tích số liệu (5 câu)",
    questions: [
      {
        id: "l1",
        q: "Nếu mệnh đề 'Nếu trời mưa thì đường trơn' là ĐÚNG, mệnh đề nào chắc chắn ĐÚNG?",
        options: [
          "Nếu đường trơn thì trời mưa",
          "Nếu trời không mưa thì đường không trơn",
          "Nếu đường không trơn thì trời không mưa",
          "Trời mưa và đường không trơn"
        ],
        answer: 2,
        explanation: "Theo quy tắc mệnh đề phản đảo: (P → Q) ⇔ (¬Q → ¬P)."
      },
      {
        id: "l2",
        q: "Sản lượng tăng từ 400 tấn (năm 2024) lên 500 tấn (năm 2025). Năm 2025 tăng bao nhiêu % so với năm 2024?",
        options: ["20%", "25%", "80%", "125%"],
        answer: 1,
        explanation: "Tỷ lệ tăng = (500 - 400) / 400 × 100% = 25%."
      },
      {
        id: "l3",
        q: "Xếp 4 bạn An, Bình, Chi, Dũng vào hàng ngang (vị trí 1–4). Biết: An đứng ngay trái Bình; Dũng ở vị trí 4; Chi không ở vị trí 1. An đứng ở vị trí nào?",
        options: ["Vị trí 1", "Vị trí 2", "Vị trí 3", "Không xác định"],
        answer: 0,
        explanation: "Dũng (4), Chi ≠ 1 nên An–Bình buộc ở (1–2) và Chi (3) → An ở vị trí 1."
      },
      {
        id: "l4",
        q: "Năm 2024 tổng chi 500 triệu (Marketing 20%). Năm 2025 tổng chi 800 triệu (Marketing 15%). Chi cho Marketing năm 2025 so với 2024:",
        options: ["Giảm 5 triệu", "Tăng 20 triệu", "Giảm 20 triệu", "Không đổi"],
        answer: 1,
        explanation: "2024: 500×20% = 100 triệu; 2025: 800×15% = 120 triệu → Tăng 20 triệu."
      },
      {
        id: "l5",
        q: "Có 3 người A, B, C (chỉ 1 người làm vỡ bình và chỉ 1 người nói thật). A: 'B làm'. B: 'Tôi không làm'. C: 'Tôi không làm'. Ai làm vỡ bình?",
        options: ["A", "B", "C", "Không xác định"],
        answer: 2,
        explanation: "A và B mâu thuẫn trực tiếp → 1 trong 2 nói thật → C chắc chắn nói dối → C làm vỡ bình."
      }
    ]
  }
];

const CURRICULUM = [
  // =========================================================
  // 1. TIẾNG VIỆT (PHẦN 1A)
  // =========================================================
  {
    id: "lang-vi",
    name: "Phần 1A: Sử dụng Ngôn ngữ — Tiếng Việt",
    levels: {
      beginner: {
        title: "Nhận diện lỗi ngữ pháp & Biện pháp tu từ cơ bản",
        readTime: "5 phút đọc",
        summary: "Nắm vững 3 lỗi ngữ pháp xuất hiện nhiều nhất trong đề ĐGNL ĐHQG-HCM (thiếu chủ ngữ, thiếu vị ngữ, dùng sai từ) và các biện pháp tu từ quen thuộc.",
        objectives: [
          "Phân biệt nhanh thành phần Chủ ngữ (CN) và Vị ngữ (VN) trong câu.",
          "Phát hiện ngay lỗi thiếu chủ ngữ khi câu mở đầu bằng giới từ (Qua, Bằng, Với, Từ...).",
          "Nhận diện đúng So sánh, Ẩn dụ, Hoán dụ và Nhân hóa."
        ],
        sections: [
          {
            heading: "1. Quy tắc kiểm tra Chủ ngữ – Vị ngữ",
            text: "Trong đề ĐGNL ĐHQG-HCM, dạng câu hỏi 'Câu nào sau đây mắc lỗi ngữ pháp?' chiếm tỷ trọng rất cao. Khi gặp câu mở đầu bằng 'Qua...', 'Bằng...', 'Với...', 'Trong...' mà theo sau là dấu phẩy hoặc động từ trực tiếp, hãy kiểm tra xem phía sau đã có Chủ ngữ riêng chưa. Nếu chưa, toàn bộ cụm đầu chỉ là Trạng ngữ → câu bị thiếu Chủ ngữ."
          },
          {
            heading: "2. Phân biệt nhanh Ẩn dụ và Hoán dụ",
            text: "Ẩn dụ dựa trên nét TƯƠNG ĐỒNG (giống nhau về đặc điểm, ví dụ: 'Người cha mái tóc bạc' chỉ Bác Hồ). Hoán dụ dựa trên nét GẦN GŨI / ĐI LIỀN NHAU (bộ phận chỉ toàn thể, vật chứa chỉ vật bị chứa, ví dụ: 'Áo chàm đưa buổi phân ly' chỉ người dân Việt Bắc)."
          }
        ],
        example: "Câu sai: 'Với tinh thần ham học hỏi đã giúp Minh đạt 950 điểm ĐGNL.' → 'Với tinh thần ham học hỏi' là Trạng ngữ, nên câu thiếu Chủ ngữ. Sửa đúng: Bỏ từ 'Với' → 'Tinh thần ham học hỏi đã giúp Minh đạt 950 điểm ĐGNL.'",
        takeaway: "Luôn gạch chân Trạng ngữ đầu câu để kiểm tra xem phần còn lại có đủ Chủ ngữ + Vị ngữ hay không.",
        sources: ["cet", "linguistics", "moet"],
        quizzes: [
          {
            q: "Câu nào sau đây mắc lỗi THIẾU CHỦ NGỮ?",
            options: [
              "Mùa xuân đến, cây cối đâm chồi nảy lộc.",
              "Bằng sự nỗ lực không ngừng đã giúp cô ấy giành học bổng.",
              "Nam là sinh viên năm nhất Đại học Bách khoa TP.HCM.",
              "Trên bầu trời, những cánh chim đang bay về phương Nam."
            ],
            answer: 1,
            steps: [
              "Bước 1: Xác định thành phần câu ở đáp án B. Cụm 'Bằng sự nỗ lực không ngừng' bắt đầu bằng giới từ 'Bằng' nên là Trạng ngữ chỉ phương tiện.",
              "Bước 2: Phần còn lại 'đã giúp cô ấy giành học bổng' bắt đầu bằng động từ 'đã giúp' → đây là Vị ngữ.",
              "Bước 3: Câu có Trạng ngữ + Vị ngữ nhưng không có Chủ ngữ. Các đáp án A, C, D đều đủ CN – VN."
            ],
            tip: "Mẹo ĐGNL: Gặp câu mở đầu bằng 'Qua / Bằng / Với / Từ / Trong', hãy thử che cụm đó đi; nếu phần còn lại bắt đầu bằng 'đã / đang / sẽ / là / khiến / giúp...' thì 99% là lỗi thiếu chủ ngữ.",
            sourceId: "linguistics"
          },
          {
            q: "Trong câu thơ 'Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm' (Hoàng Trung Thông), cụm từ 'Bàn tay' sử dụng biện pháp tu từ nào?",
            options: ["So sánh", "Hoán dụ", "Nói giảm nói tránh", "Điệp ngữ"],
            answer: 1,
            steps: [
              "Bước 1: Xét nghĩa của từ 'Bàn tay' trong ngữ cảnh: không chỉ riêng bộ phận cơ thể mà chỉ 'con người lao động'.",
              "Bước 2: Mối quan hệ giữa 'bàn tay' và 'con người' là quan hệ BỘ PHẬN – TOÀN THỂ (gần gũi thực tế, không phải giống nhau).",
              "Bước 3: Lấy bộ phận để gọi toàn thể chính là biện pháp Hoán dụ."
            ],
            tip: "Nhớ nhanh: Giống nhau → Ẩn dụ; Đi liền / Bộ phận – Toàn thể → Hoán dụ.",
            sourceId: "moet"
          },
          {
            q: "Từ nào sau đây viết ĐÚNG chính tả Tiếng Việt?",
            options: ["Sáng lạng", "Xán lạn", "Sáng lạn", "Xán lạng"],
            answer: 1,
            steps: [
              "Bước 1: 'Xán lạn' là từ Hán Việt (xán = rực rỡ, lạn = sáng chói), có nghĩa là tươi sáng, rực rỡ (ví dụ: tương lai xán lạn).",
              "Bước 2: Nhiều người nhầm sang 'sáng lạn' do liên tưởng từ thuần Việt 'sáng'."
            ],
            tip: "Đề ĐGNL ĐHQG-HCM thường hỏi các cặp từ Hán Việt dễ nhầm: xán lạn, bàng quan (thờ ơ), bàng quang (cơ quan), chỉn chu, tựu trung.",
            sourceId: "linguistics"
          }
        ]
      },
      intermediate: {
        title: "Phân tích lỗi logic câu, từ Hán Việt & Đọc hiểu văn bản",
        readTime: "7 phút đọc",
        summary: "Nâng cao kỹ năng phát hiện lỗi sai logic ngữ nghĩa, phân biệt từ Hán Việt dễ nhầm và xác định phương thức biểu đạt trong đoạn đọc hiểu.",
        objectives: [
          "Nhận diện lỗi sai logic (mâu thuẫn giữa các vế câu, dùng sai quan hệ từ).",
          "Phân biệt chính xác sắc thái nghĩa của các từ Hán Việt gần âm.",
          "Xác định đúng phương thức biểu đạt chính và phong cách ngôn ngữ."
        ],
        sections: [
          {
            heading: "1. Lỗi sai logic & dùng sai cặp quan hệ từ",
            text: "Các cặp quan hệ từ phải tương thích về logic: 'Tuy... nhưng...' (tương phản), 'Vì... nên...' (nguyên nhân – kết quả), 'Không những... mà còn...' (tăng tiến). Nếu đặt hai vế cùng chiều vào cặp 'Tuy... nhưng...' sẽ gây lỗi logic nghiêm trọng."
          },
          {
            heading: "2. Phân biệt 6 phong cách ngôn ngữ",
            text: "Trong đề ĐGNL, đoạn trích đọc hiểu thường rơi vào: Chính luận (bàn luận quan điểm, lập luận chặt chẽ), Báo chí (thông tin thời sự, số liệu, tính thời gian), Khoa học (thuật ngữ chuyên ngành, khách quan), Nghệ thuật (giàu hình ảnh, cảm xúc)."
          }
        ],
        example: "Câu sai logic: 'Tuy trời mưa rất to nhưng đường phố vẫn ngập nặng.' → Trời mưa to dẫn đến ngập là quan hệ Nguyên nhân – Kết quả, không phải tương phản. Phải sửa thành 'Vì... nên...'.",
        takeaway: "Đọc kỹ mối quan hệ ý nghĩa giữa 2 vế câu trước khi chốt đáp án ở nhóm câu tìm lỗi sai.",
        sources: ["cet", "linguistics", "moet"],
        quizzes: [
          {
            q: "Câu nào sau đây mắc lỗi SAI LOGIC?",
            options: [
              "Mặc dù thời tiết rất lạnh, các vận động viên vẫn hoàn thành chặng đua.",
              "Vì học hành chăm chỉ nên Lan đã đỗ vào ngôi trường mơ ước.",
              "Tuy được đầu tư cơ sở vật chất hiện đại nhưng chất lượng đào tạo của trường ngày càng nâng cao.",
              "Không những học giỏi Toán, Minh còn rất xuất sắc ở môn Tiếng Anh."
            ],
            answer: 2,
            steps: [
              "Bước 1: Xét câu C: Vế 1 là 'được đầu tư cơ sở vật chất hiện đại' (tích cực), Vế 2 là 'chất lượng đào tạo ngày càng nâng cao' (tích cực, kết quả tất yếu của vế 1).",
              "Bước 2: Hai vế có quan hệ Nguyên nhân – Kết quả, nhưng tác giả lại dùng cặp quan hệ từ tương phản 'Tuy... nhưng...'.",
              "Bước 3: Do đó câu C mắc lỗi sai logic."
            ],
            tip: "Kiểm tra dấu (+)/(–) của hai vế: 'Tuy... nhưng...' phải trái dấu (+ / –), còn 'Vì... nên...' phải cùng chiều nhân quả.",
            sourceId: "linguistics"
          },
          {
            q: "Từ 'bàng quan' trong câu 'Chúng ta không thể đứng bàng quan trước vấn nạn ô nhiễm môi trường' có nghĩa là gì?",
            options: [
              "Nhìn ngắm một cách thích thú",
              "Đứng ngoài cuộc, thờ ơ, coi như không liên quan đến mình",
              "Hoang mang, lo lắng tột độ",
              "Quan sát kỹ lưỡng để tìm giải pháp"
            ],
            answer: 1,
            steps: [
              "Bước 1: Chiết tự Hán Việt: 'bàng' = bên cạnh, đứng ngoài; 'quan' = xem, nhìn.",
              "Bước 2: 'Bàng quan' nghĩa là đứng bên ngoài mà nhìn, thái độ thờ ơ, lãnh đạm trước sự việc."
            ],
            tip: "Đừng nhầm 'bàng quan' (thái độ thờ ơ) với 'bàng quang' (bộ phận cơ thể) hay 'bàng hoàng' (sững sờ).",
            sourceId: "linguistics"
          },
          {
            q: "Đoạn văn nêu số liệu thống kê về tốc độ đô thị hóa tại TP.HCM năm 2025 kèm ngày tháng và nguồn tin thuộc phong cách ngôn ngữ nào?",
            options: ["Nghệ thuật", "Sinh hoạt", "Báo chí", "Hành chính"],
            answer: 2,
            steps: [
              "Bước 1: Nhận diện đặc trưng: có thông tin thời sự, số liệu cụ thể, mốc thời gian rõ ràng, tính ngắn gọn và cập nhật.",
              "Bước 2: Đây là những dấu hiệu điển hình của phong cách ngôn ngữ Báo chí."
            ],
            tip: "Báo chí = tính thời sự + số liệu + nguồn tin; Chính luận = lập luận thuyết phục quan điểm.",
            sourceId: "moet"
          }
        ]
      },
      advanced: {
        title: "Đọc hiểu suy luận sâu & Câu mơ hồ ngữ nghĩa (Chống bẫy 900+)",
        readTime: "8 phút đọc",
        summary: "Xử lý các câu hỏi phân loại cao trong Phần Tiếng Việt: câu mơ hồ cấu trúc, lập luận ẩn ý trong văn bản nghị luận và phân biệt tinh tế các biện pháp tu từ.",
        objectives: [
          "Phát hiện câu mắc lỗi mơ hồ ngữ nghĩa (hiểu theo 2 cách khác nhau).",
          "Suy luận chính xác ý định tác giả trong đoạn trích đọc hiểu dài.",
          "Loại trừ các phương án nhiễu 'đúng thực tế nhưng không có trong văn bản'."
        ],
        sections: [
          {
            heading: "1. Câu mơ hồ cấu trúc (Ambiguity)",
            text: "Là câu đúng ngữ pháp bề mặt nhưng có thể tách cụm từ theo 2 cách khác nhau, dẫn đến 2 nghĩa hoàn toàn khác biệt. Ví dụ: 'Tôi gặp người bạn của anh ấy đang đứng ở cổng' (không rõ 'người bạn' hay 'anh ấy' đang đứng ở cổng)."
          },
          {
            heading: "2. Nguyên tắc vàng cho Đọc hiểu ĐGNL mức 900+",
            text: "Tuyệt đối chỉ dựa vào dữ kiện TRONG VĂN BẢN. Các đáp án nhiễu mức vận dụng cao thường: (1) Suy diễn quá đà (dùng từ tuyệt đối như 'luôn luôn', 'duy nhất', 'tất cả'), hoặc (2) Đúng với kiến thức ngoài đời nhưng tác giả không hề đề cập."
          }
        ],
        example: "Câu mơ hồ: 'Hôm qua, tôi thấy cô giáo cũ của Nam đi chợ.' → Có thể hiểu 'cô giáo cũ' (từng dạy Nam) hoặc 'cô giáo' có tuổi tác cũ/lớn tuổi. Trong đề ĐGNL, cần chọn câu có cấu trúc phân định rõ ràng nhất.",
        takeaway: "Với câu hỏi 'Ý nào KHÔNG được suy ra từ đoạn trích?', hãy đối chiếu từng từ khóa tuyệt đối (chỉ, mọi, hoàn toàn) để phát hiện đáp án nhiễu.",
        sources: ["cet", "linguistics"],
        quizzes: [
          {
            q: "Câu nào sau đây mắc lỗi MƠ HỒ về nghĩa?",
            options: [
              "Chiếc xe màu đỏ đang đỗ trước cổng trường.",
              "Đây là bức ảnh chụp mẹ của Hoa hồi còn trẻ.",
              "Sinh viên cần nộp bài tiểu luận trước 17 giờ thứ Sáu.",
              "Mưa lớn kéo dài khiến nhiều tuyến đường bị ngập cục bộ."
            ],
            answer: 1,
            steps: [
              "Bước 1: Đọc kỹ đáp án B: 'bức ảnh chụp mẹ của Hoa hồi còn trẻ'.",
              "Bước 2: Cụm 'hồi còn trẻ' có thể bổ nghĩa cho 'mẹ' (mẹ lúc còn trẻ) hoặc có thể gây hiểu nhầm về thời điểm chụp ảnh khi Hoa còn trẻ.",
              "Bước 3: Các câu A, C, D đều chỉ có duy nhất 1 cách hiểu rõ ràng."
            ],
            tip: "Khi tìm câu mơ hồ, hãy chú ý các cụm bổ ngữ đặt ở cuối câu (như 'hồi còn trẻ', 'ở trong phòng', 'của anh ấy') xem nó có thể gắn vào 2 danh từ khác nhau không.",
            sourceId: "linguistics"
          },
          {
            q: "Trong một bài nghị luận, tác giả viết: 'Công nghệ AI không thay thế con người, mà thay thế những người không biết sử dụng AI.' Thao tác lập luận nổi bật nhất ở câu này là gì?",
            options: ["Bác bỏ kết hợp Bình luận", "Chỉ có Chứng minh", "Phân tích số liệu", "Kể chuyện"],
            answer: 0,
            steps: [
              "Bước 1: Vế đầu 'Công nghệ AI không thay thế con người' phủ định một quan điểm phổ biến → thao tác Bác bỏ.",
              "Bước 2: Vế sau 'mà thay thế những người không biết sử dụng AI' đưa ra nhận định, đánh giá sâu sắc của tác giả → thao tác Bình luận."
            ],
            tip: "Cấu trúc 'Không phải A, mà là B' luôn mang dấu hiệu của thao tác Bác bỏ kết hợp Bình luận/Giải thích.",
            sourceId: "cet"
          },
          {
            q: "Cụm từ nào sau đây dùng từ ĐÚNG chuẩn mực (không bị thừa từ/lặp nghĩa)?",
            options: [
              "Hợp tác cùng nhau",
              "Độc nhất vô nhị",
              "Tối ưu nhất",
              "Tái diễn lại"
            ],
            answer: 1,
            steps: [
              "Bước 1: Xét A: 'Hợp tác' đã có nghĩa là làm cùng nhau → thừa 'cùng nhau'.",
              "Bước 2: Xét C: 'Tối ưu' đã là tốt nhất → thừa 'nhất'. Xét D: 'Tái diễn' đã là diễn ra lại → thừa 'lại'.",
              "Bước 3: 'Độc nhất vô nhị' là thành ngữ Hán Việt chuẩn mực (chỉ có một, không có hai)."
            ],
            tip: "Cẩn thận các từ Hán Việt đã mang sẵn nghĩa lặp: tái diễn (lại), tối ưu (nhất), tiên phong (đi đầu), gia tăng (thêm).",
            sourceId: "linguistics"
          }
        ]
      }
    }
  },

  // =========================================================
  // 2. TIẾNG ANH (PHẦN 1B)
  // =========================================================
  {
    id: "lang-en",
    name: "Phần 1B: Sử dụng Ngôn ngữ — Tiếng Anh",
    levels: {
      beginner: {
        title: "Ngữ pháp cốt lõi: Thì động từ, Sự hòa hợp CN–ĐT & Câu điều kiện",
        readTime: "5 phút đọc",
        summary: "Nắm chắc các chủ điểm ngữ pháp chiếm trên 60% số câu hỏi ngắn trong phần Tiếng Anh ĐGNL ĐHQG-HCM.",
        objectives: [
          "Chia đúng các thì cơ bản (Hiện tại hoàn thành, Quá khứ đơn, Quá khứ tiếp diễn).",
          "Xác định đúng sự hòa hợp giữa Chủ ngữ và Động từ.",
          "Áp dụng chính xác công thức Câu điều kiện loại 1 và loại 2."
        ],
        sections: [
          {
            heading: "1. Sự hòa hợp Chủ ngữ – Động từ (Subject-Verb Agreement)",
            text: "Khi thấy 'The number of + N(số nhiều)', động từ luôn chia SỐ ÍT (vì chủ ngữ là 'The number'). Ngược lại, 'A number of + N(số nhiều)' có nghĩa là 'nhiều...', nên động từ chia SỐ NHIỀU."
          },
          {
            heading: "2. Dấu hiệu nhận biết Thì nhanh",
            text: "'Since + mốc thời gian' hoặc 'For + khoảng thời gian' → Hiện tại hoàn thành (have/has + V3/ed). 'When + QKĐ, QKTD' diễn tả hành động đang xảy ra thì hành động khác xen vào."
          }
        ],
        example: "The number of students applying for VNU-HCM HAS increased this year. (Chủ ngữ chính là 'The number' → dùng 'has').",
        takeaway: "Trong câu tìm lỗi sai Tiếng Anh, 50% đáp án nằm ở: chia sai thì, sai hòa hợp số ít/số nhiều, hoặc sai loại từ (danh/động/tính/trạng).",
        sources: ["cet", "cambridge"],
        quizzes: [
          {
            q: "Choose the correct answer: The number of applicants for the scholarship ______ significantly over the past three years.",
            options: ["have risen", "has risen", "are rising", "were rising"],
            answer: 1,
            steps: [
              "Bước 1: Xác định dấu hiệu thì: 'over the past three years' → dùng thì Hiện tại hoàn thành (have/has + V3).",
              "Bước 2: Xác định chủ ngữ: 'The number of + danh từ số nhiều' luôn đi với động từ SỐ ÍT.",
              "Bước 3: Kết hợp 2 yếu tố → chọn 'has risen'."
            ],
            tip: "Ghi nhớ: THE number of → số ÍT (has/is); A number of → số NHIỀU (have/are).",
            sourceId: "cambridge"
          },
          {
            q: "If I ______ enough money right now, I would buy a new laptop for my studies.",
            options: ["have", "had", "will have", "would have"],
            answer: 1,
            steps: [
              "Bước 1: Quan sát mệnh đề chính có 'would buy' (would + V nguyên mẫu) và trạng từ 'right now' (trái với hiện tại).",
              "Bước 2: Đây là Câu điều kiện loại 2: If + S + V2/ed, S + would + V.",
              "Bước 3: Động từ quá khứ của 'have' là 'had' → chọn B."
            ],
            tip: "Nhìn vế đã cho trước: thấy 'would + V' → chọn V2/ed; thấy 'will + V' → chọn Hiện tại đơn.",
            sourceId: "cambridge"
          },
          {
            q: "Identify the error: Neither the teacher nor the students (A) WAS (B) aware of (C) the schedule change (D).",
            options: ["A (nor)", "B (was)", "C (aware of)", "D (the schedule change)"],
            answer: 1,
            steps: [
              "Bước 1: Áp dụng quy tắc 'Neither S1 nor S2 + V': động từ chia theo chủ ngữ gần nó nhất là S2.",
              "Bước 2: Ở đây S2 là 'the students' (số nhiều), nên động từ phải là 'were', không phải 'was'.",
              "Bước 3: Vậy lỗi sai nằm ở B."
            ],
            tip: "Cả 3 cấu trúc Neither...nor, Either...or, Not only...but also đều chia động từ theo chủ ngữ đứng GẦN động từ nhất.",
            sourceId: "cet"
          }
        ]
      },
      intermediate: {
        title: "Viết lại câu (Sentence Transformation) & Mệnh đề quan hệ",
        readTime: "7 phút đọc",
        summary: "Luyện dạng bài 'Chọn câu có nghĩa gần nhất' (Sentence Transformation) và rút gọn mệnh đề quan hệ thường gặp ở mức 750–900 điểm.",
        objectives: [
          "Chuyển đổi thành thạo giữa Câu trực tiếp – Gián tiếp và Câu bị động.",
          "Dùng đúng cấu trúc So sánh kép, So...that / Such...that.",
          "Rút gọn mệnh đề quan hệ chủ động (V-ing) và bị động (V3/ed)."
        ],
        sections: [
          {
            heading: "1. Rút gọn Mệnh đề quan hệ",
            text: "Nếu mệnh đề quan hệ mang nghĩa CHỦ ĐỘNG, bỏ đại từ quan hệ và đưa động từ về V-ing. Nếu mang nghĩa BỊ ĐỘNG, đưa về V3/ed. Nếu trước danh từ có 'the first / the only / so sánh nhất', dùng 'to V'."
          },
          {
            heading: "2. Chiến thuật làm bài Sentence Transformation",
            text: "Đọc kỹ câu gốc để chốt 3 yếu tố: (1) Thì của động từ, (2) Nghĩa khẳng định/phủ định, (3) Quan hệ nhân quả/tương phản. Loại ngay các đáp án làm đổi nghĩa gốc."
          }
        ],
        example: "The book which was written by Prof. Minh is very useful. → Rút gọn bị động: The book WRITTEN by Prof. Minh is very useful.",
        takeaway: "Trong dạng viết lại câu, hãy so sánh sự khác biệt giữa 4 đáp án thay vì đọc dịch cả 4 câu từ đầu.",
        sources: ["cet", "cambridge"],
        quizzes: [
          {
            q: "Choose the closest meaning: 'She started learning French five years ago.'",
            options: [
              "She has learned French for five years.",
              "She learned French for five years and stopped.",
              "She hasn't learned French for five years.",
              "She was learning French five years ago."
            ],
            answer: 0,
            steps: [
              "Bước 1: Câu gốc 'started + V-ing + ... ago' diễn tả hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.",
              "Bước 2: Cấu trúc tương đương chuẩn là: S + have/has + V3/ed + for + khoảng thời gian.",
              "Bước 3: Đáp án A ('has learned ... for five years') khớp hoàn toàn về thì và nghĩa."
            ],
            tip: "Công thức vàng: S + started/began + V-ing + time + ago ⇔ S + have/has + V3 + for + time.",
            sourceId: "cambridge"
          },
          {
            q: "The research paper ______ by the university team won the national award.",
            options: ["publishing", "published", "was published", "which published"],
            answer: 1,
            steps: [
              "Bước 1: Câu đã có động từ chính là 'won', nên chỗ trống phải là mệnh đề quan hệ (hoặc rút gọn mệnh đề quan hệ) → loại C ('was published').",
              "Bước 2: 'The research paper' (bài nghiên cứu) được xuất bản → mang nghĩa BỊ ĐỘNG → loại A ('publishing') và D (thiếu 'was').",
              "Bước 3: Rút gọn mệnh đề quan hệ bị động dùng V3/ed → chọn B ('published')."
            ],
            tip: "Kiểm tra xem câu đã có động từ chính chưa: nếu đã có rồi thì không bao giờ chọn động từ chia thì (was/is/are) không có liên từ.",
            sourceId: "cambridge"
          },
          {
            q: "Choose the closest meaning: 'Although it rained heavily, they continued the outdoor experiment.'",
            options: [
              "Because of the heavy rain, they continued the outdoor experiment.",
              "Despite the heavy rain, they continued the outdoor experiment.",
              "In spite of it rained heavily, they continued the outdoor experiment.",
              "Despite raining heavily, they stopped the outdoor experiment."
            ],
            answer: 1,
            steps: [
              "Bước 1: 'Although + S + V' (mặc dù) tương đương với 'Despite / In spite of + Cụm danh từ / V-ing'.",
              "Bước 2: Loại A (sai nghĩa 'Because of'), loại C (sai ngữ pháp vì sau 'In spite of' không dùng mệnh đề S+V), loại D (sai nghĩa 'stopped').",
              "Bước 3: Chọn B ('Despite the heavy rain')."
            ],
            tip: "Although + S + V ⇔ Despite / In spite of + Noun Phrase.",
            sourceId: "cet"
          }
        ]
      },
      advanced: {
        title: "Đảo ngữ (Inversion), Đọc hiểu suy luận & Từ vựng học thuật C1",
        readTime: "8 phút đọc",
        summary: "Chinh phục các câu hỏi phân loại cao: cấu trúc đảo ngữ, giả định (Subjunctive) và suy luận nghĩa từ trong ngữ cảnh học thuật.",
        objectives: [
          "Nhận diện và áp dụng Đảo ngữ với Not only, Hardly/No sooner, Rarely, Only after.",
          "Nắm vững thức giả định (It is essential that S + V nguyên mẫu).",
          "Xác định đúng sắc thái/giọng điệu (tone) và hàm ý (inference) trong bài đọc."
        ],
        sections: [
          {
            heading: "1. Cấu trúc Đảo ngữ (Inversion)",
            text: "Khi trạng từ phủ định hoặc giới hạn đứng đầu câu (Never, Rarely, Seldom, Not only, Little, No sooner... than, Hardly... when), ta phải đảo trợ động từ lên trước chủ ngữ: Trạng từ + Trợ ĐT + S + V."
          },
          {
            heading: "2. Thức giả định (Subjunctive Mood)",
            text: "Sau các động từ/tính từ mang tính đề nghị, bắt buộc (suggest, recommend, insist, essential, vital, imperative) + that + S + (should) + V(nguyên mẫu không chia, kể cả ngôi thứ 3 số ít)."
          }
        ],
        example: "Not only DID she pass the exam, but she also achieved the highest score in the city. (Đảo 'did' lên trước 'she').",
        takeaway: "Thấy trạng từ phủ định đầu câu → kiểm tra ngay đảo ngữ (Trợ ĐT + S + V) ở vế đứng ngay sau nó.",
        sources: ["cet", "cambridge"],
        quizzes: [
          {
            q: "Not only ______ the data accurately, but he also presented clear conclusions.",
            options: [
              "he analyzed",
              "did he analyze",
              "he did analyze",
              "analyzed he"
            ],
            answer: 1,
            steps: [
              "Bước 1: 'Not only' đứng đầu câu → bắt buộc dùng cấu trúc Đảo ngữ ở mệnh đề thứ nhất.",
              "Bước 2: Mệnh đề thứ hai chia quá khứ đơn ('presented'), nên vế 1 đảo trợ động từ 'did' lên trước chủ ngữ 'he', động từ chính đưa về nguyên mẫu 'analyze'.",
              "Bước 3: Chọn B ('did he analyze')."
            ],
            tip: "Công thức: Not only + Trợ ĐT + S + V, but + S + also + V.",
            sourceId: "cambridge"
          },
          {
            q: "It is imperative that every candidate ______ their identification card before entering the exam hall.",
            options: ["brings", "bring", "brought", "is bringing"],
            answer: 1,
            steps: [
              "Bước 1: Nhận diện cấu trúc thức giả định: 'It is imperative that + S + (should) + V(nguyên mẫu)'.",
              "Bước 2: Dù chủ ngữ là 'every candidate' (số ít), động từ vẫn giữ nguyên mẫu không thêm 's'.",
              "Bước 3: Chọn B ('bring')."
            ],
            tip: "Các từ khóa kích hoạt Subjunctive: imperative, essential, vital, crucial, suggest, recommend, insist, demand.",
            sourceId: "cambridge"
          },
          {
            q: "No sooner ______ the lecture hall than the presentation began.",
            options: [
              "had we entered",
              "we had entered",
              "did we enter",
              "have we entered"
            ],
            answer: 0,
            steps: [
              "Bước 1: Cấu trúc chuẩn: 'No sooner + had + S + V3/ed + than + S + V2/ed' (Vừa mới... thì...).",
              "Bước 2: Vế sau là 'than the presentation began' (quá khứ đơn) → vế trước dùng đảo ngữ Quá khứ hoàn thành 'had we entered'.",
              "Bước 3: Chọn A."
            ],
            tip: "Nhớ cặp đôi: No sooner... THAN; Hardly / Scarcely... WHEN (cả hai đều đi với had + S + V3).",
            sourceId: "cet"
          }
        ]
      }
    }
  },

  // =========================================================
  // 3. TOÁN HỌC (PHẦN 2)
  // =========================================================
  {
    id: "math",
    name: "Phần 2: Toán học (Xác suất, Giải tích & Thực tế)",
    levels: {
      beginner: {
        title: "Xác suất cổ điển, Đạo hàm cơ bản & Bài toán phần trăm thực tế",
        readTime: "6 phút đọc",
        summary: "Xây dựng nền tảng vững chắc cho phần Toán ĐGNL: tính xác suất cơ bản, tìm cực trị hàm số đơn giản và giải nhanh bài toán lãi suất/giảm giá.",
        objectives: [
          "Tính đúng không gian mẫu n(Ω) và xác suất P(A) = n(A)/n(Ω).",
          "Tìm điểm cực trị và khoảng đồng biến/nghịch biến của hàm đa thức.",
          "Giải chính xác bài toán tăng/giảm phần trăm liên tiếp."
        ],
        sections: [
          {
            heading: "1. Công thức Xác suất cổ điển",
            text: "Xác suất của biến cố A là P(A) = n(A) / n(Ω), trong đó n(Ω) là tổng số kết quả có thể xảy ra, n(A) là số kết quả thuận lợi cho A. Luôn nhớ 0 ≤ P(A) ≤ 1."
          },
          {
            heading: "2. Bẫy phần trăm liên tiếp",
            text: "Một món hàng giảm 10% rồi lại giảm tiếp 10% KHÔNG PHẢI là giảm 20%. Giá mới bằng: Giá gốc × (1 - 0,1) × (1 - 0,1) = Giá gốc × 0,81 (tức là giảm 19%)."
          }
        ],
        example: "Một hộp có 4 bi đỏ và 6 bi xanh. Lấy ngẫu nhiên 1 bi. Xác suất lấy được bi đỏ là P = 4 / (4 + 6) = 4/10 = 0,4.",
        takeaway: "Với bài toán phần trăm, luôn nhân hệ số (1 + r) khi tăng và (1 - r) khi giảm để tránh sai sót.",
        sources: ["cet", "moet", "khan"],
        quizzes: [
          {
            q: "Một cửa hàng giảm giá một chiếc áo 20%, sau đó tiếp tục giảm thêm 10% trên giá đã giảm. Tổng cộng chiếc áo đã được giảm bao nhiêu phần trăm so với giá ban đầu?",
            options: ["30%", "28%", "25%", "32%"],
            answer: 1,
            steps: [
              "Bước 1: Giả sử giá ban đầu là 100% (hay 1).",
              "Bước 2: Sau lần giảm 20%, giá còn: 1 × (1 - 0,20) = 0,80.",
              "Bước 3: Sau lần giảm tiếp 10% trên giá mới, giá còn: 0,80 × (1 - 0,10) = 0,80 × 0,90 = 0,72 (tức 72%).",
              "Bước 4: Tổng phần trăm đã giảm là: 100% - 72% = 28%."
            ],
            tip: "Công thức nhanh khi giảm a% rồi giảm b%: Tổng giảm = a + b - (a×b)/100 = 20 + 10 - 2 = 28%.",
            sourceId: "khan"
          },
          {
            q: "Một hộp đựng 5 viên bi trắng và 3 viên bi đen. Lấy ngẫu nhiên đồng thời 2 viên bi. Xác suất để lấy được 2 viên bi cùng màu trắng là bao nhiêu?",
            options: ["5/14", "5/28", "10/28", "15/28"],
            answer: 0,
            steps: [
              "Bước 1: Tổng số bi là 5 + 3 = 8 viên. Số cách lấy ngẫu nhiên 2 viên từ 8 viên là: n(Ω) = C(8,2) = (8 × 7) / 2 = 28.",
              "Bước 2: Số cách lấy 2 viên đều màu trắng từ 5 viên trắng là: n(A) = C(5,2) = (5 × 4) / 2 = 10.",
              "Bước 3: Xác suất P(A) = 10 / 28 = 5 / 14."
            ],
            tip: "Nhớ rút gọn phân số tối giản trước khi đối chiếu đáp án (10/28 = 5/14).",
            sourceId: "moet"
          },
          {
            q: "Cho hàm số y = x³ - 3x + 2. Hàm số đạt cực tiểu tại điểm nào sau đây?",
            options: ["x = -1", "x = 0", "x = 1", "x = 2"],
            answer: 2,
            steps: [
              "Bước 1: Tính đạo hàm y' = 3x² - 3.",
              "Bước 2: Giải y' = 0 ⇔ 3x² - 3 = 0 ⇔ x = 1 hoặc x = -1.",
              "Bước 3: Tính đạo hàm cấp hai y'' = 6x. Tại x = 1, y''(1) = 6 > 0 → hàm số đạt cực tiểu tại x = 1."
            ],
            tip: "Dùng y'' rất nhanh cho hàm đa thức: y'' > 0 là Cực Tiểu, y'' < 0 là Cực Đại.",
            sourceId: "moet"
          }
        ]
      },
      intermediate: {
        title: "Tổ hợp – Xác suất có điều kiện & Bài toán Lãi kép / Tối ưu",
        readTime: "7 phút đọc",
        summary: "Giải quyết các bài toán thực tế đặc trưng của ĐGNL ĐHQG-HCM: lãi kép ngân hàng, xác suất biến cố đối và bài toán tìm giá trị lớn nhất/nhỏ nhất.",
        objectives: [
          "Áp dụng công thức biến cố đối P(A) = 1 - P(Ā) để giải nhanh bài toán 'ít nhất một'.",
          "Sử dụng chính xác công thức lãi kép T = A(1 + r)ⁿ.",
          "Thiết lập hàm số để tìm cực trị trong bài toán thực tế."
        ],
        sections: [
          {
            heading: "1. Kỹ thuật Biến cố đối cho từ khóa 'ít nhất 1'",
            text: "Khi đề bài hỏi xác suất để có 'ít nhất 1 sản phẩm tốt' hoặc 'ít nhất 1 bạn nữ', thay vì chia nhiều trường hợp (1, 2, 3...), hãy tính xác suất của biến cố đối (KHÔNG có cái nào) rồi lấy 1 trừ đi."
          },
          {
            heading: "2. Công thức Lãi kép chuẩn",
            text: "Gửi số tiền gốc A với lãi suất r mỗi kỳ hạn trong n kỳ hạn (không rút lãi): Tổng số tiền nhận được là T = A × (1 + r)ⁿ."
          }
        ],
        example: "Gửi 100 triệu đồng, lãi suất 6%/năm (ghép lãi hàng năm) trong 2 năm → T = 100 × (1 + 0,06)² = 112,36 triệu đồng.",
        takeaway: "Gặp từ khóa 'ít nhất một' → nghĩ ngay tới Biến cố đối: 1 - P(không có cái nào).",
        sources: ["cet", "moet", "khan"],
        quizzes: [
          {
            q: "Một xạ thủ bắn 3 phát đạn độc lập vào bia, xác suất trúng đích mỗi phát đều là 0,7. Xác suất để xạ thủ bắn trúng bia ÍT NHẤT 1 phát là bao nhiêu?",
            options: ["0,973", "0,343", "0,027", "0,700"],
            answer: 0,
            steps: [
              "Bước 1: Gọi A là biến cố 'bắn trúng ít nhất 1 phát'. Biến cố đối Ā là 'cả 3 phát đều trượt'.",
              "Bước 2: Xác suất bắn trượt mỗi phát là: 1 - 0,7 = 0,3.",
              "Bước 3: Vì 3 phát độc lập nên P(Ā) = 0,3 × 0,3 × 0,3 = 0,027.",
              "Bước 4: Vậy P(A) = 1 - P(Ā) = 1 - 0,027 = 0,973."
            ],
            tip: "Cẩn thận đáp án nhiễu 0,027 (chính là P(Ā) nếu quên lấy 1 trừ đi).",
            sourceId: "khan"
          },
          {
            q: "Anh Minh gửi tiết kiệm 50 triệu đồng với lãi suất 8%/năm theo hình thức lãi kép (kỳ hạn 1 năm). Sau 2 năm, tổng số tiền cả gốc lẫn lãi anh Minh nhận được là bao nhiêu?",
            options: ["58,00 triệu", "58,32 triệu", "54,00 triệu", "59,20 triệu"],
            answer: 1,
            steps: [
              "Bước 1: Áp dụng công thức lãi kép T = A × (1 + r)ⁿ với A = 50, r = 0,08, n = 2.",
              "Bước 2: Tính (1 + 0,08)² = 1,08² = 1,1664.",
              "Bước 3: T = 50 × 1,1664 = 58,32 (triệu đồng)."
            ],
            tip: "Lãi đơn sau 2 năm là 58 triệu, lãi kép phải lớn hơn lãi đơn một chút (thêm lãi của tiền lãi năm 1: 4 × 8% = 0,32 triệu).",
            sourceId: "moet"
          },
          {
            q: "Tìm giá trị lớn nhất của tích hai số thực không âm x, y biết x + y = 12.",
            options: ["24", "32", "36", "48"],
            answer: 2,
            steps: [
              "Bước 1: Áp dụng bất đẳng thức Cô-si (AM-GM) cho hai số không âm x, y: (x + y)/2 ≥ √(xy).",
              "Bước 2: Thay x + y = 12 ta được: 6 ≥ √(xy) ⇒ xy ≤ 36.",
              "Bước 3: Dấu bằng xảy ra khi x = y = 6. Vậy giá trị lớn nhất là 36."
            ],
            tip: "Hai số có tổng không đổi thì tích lớn nhất khi hai số BẰNG NHAU.",
            sourceId: "khan"
          }
        ]
      },
      advanced: {
        title: "Xác suất có điều kiện (Bayes), Tích phân ứng dụng & Tối ưu hóa",
        readTime: "8 phút đọc",
        summary: "Chinh phục nhóm câu Toán phân loại cao 900+: công thức xác suất toàn phần, bài toán tối ưu chi phí/lợi nhuận bằng đạo hàm và hình học không gian tọa độ.",
        objectives: [
          "Vận dụng công thức xác suất toàn phần và công thức Bayes.",
          "Lập hàm lợi nhuận/chi phí và dùng đạo hàm tìm điểm tối ưu.",
          "Giải nhanh bài toán khoảng cách và góc trong không gian Oxyz."
        ],
        sections: [
          {
            heading: "1. Công thức Xác suất toàn phần",
            text: "Nếu chia không gian mẫu thành các trường hợp xung khắc H₁, H₂ thì: P(A) = P(H₁)·P(A|H₁) + P(H₂)·P(A|H₂). Đây là dạng bài rất hay xuất hiện trong CT GDPT 2018 và đề ĐGNL mới."
          },
          {
            heading: "2. Mô hình hóa bài toán Tối ưu",
            text: "Bước 1: Đặt ẩn x (thường là số lần tăng/giảm giá hoặc kích thước). Bước 2: Viết hàm mục tiêu f(x) (Doanh thu = Giá × Sản lượng). Bước 3: Tìm f'(x) = 0 để xác định giá trị tối ưu."
          }
        ],
        example: "Một rạp phim bán vé 100k thì có 200 khách. Cứ giảm 10k thì thêm 40 khách. Doanh thu R(x) = (100 - 10x)(200 + 40x) = -400x² + 2000x + 20000. Đỉnh parabol tại x = -b/(2a) = 2,5 → giá vé tối ưu là 75k.",
        takeaway: "Với hàm bậc hai f(x) = ax² + bx + c (a < 0), giá trị lớn nhất luôn đạt tại đỉnh x = -b/(2a) — cực nhanh trong phòng thi!",
        sources: ["cet", "moet", "mit"],
        quizzes: [
          {
            q: "Một nhà máy có 2 phân xưởng. Phân xưởng I sản xuất 60% sản phẩm với tỷ lệ phế phẩm 2%. Phân xưởng II sản xuất 40% sản phẩm với tỷ lệ phế phẩm 3%. Chọn ngẫu nhiên 1 sản phẩm của nhà máy, xác suất để đó là phế phẩm là bao nhiêu?",
            options: ["2,4%", "2,5%", "5,0%", "2,2%"],
            answer: 0,
            steps: [
              "Bước 1: Áp dụng công thức xác suất toàn phần: P(Phế phẩm) = P(I)·P(PP|I) + P(II)·P(PP|II).",
              "Bước 2: Thay số: P = 0,6 × 0,02 + 0,4 × 0,03 = 0,012 + 0,012 = 0,024.",
              "Bước 3: Đổi sang phần trăm: 0,024 = 2,4%."
            ],
            tip: "Cẩn thận bẫy trung bình cộng (2% + 3%)/2 = 2,5% — chỉ đúng khi hai phân xưởng sản xuất 50%-50%.",
            sourceId: "mit"
          },
          {
            q: "Một cửa hàng bán trà sữa với giá 40.000đ/ly thì bán được 100 ly/ngày. Nếu giảm giá mỗi lần 2.000đ thì số ly bán được tăng thêm 10 ly. Hỏi nên bán với giá bao nhiêu để doanh thu cao nhất?",
            options: ["30.000đ", "32.000đ", "28.000đ", "35.000đ"],
            answer: 0,
            steps: [
              "Bước 1: Gọi x là số lần giảm 2.000đ. Giá mới: (40 - 2x) nghìn đồng; Sản lượng mới: (100 + 10x) ly.",
              "Bước 2: Hàm doanh thu R(x) = (40 - 2x)(100 + 10x) = -20x² + 200x + 4000.",
              "Bước 3: Parabol có a = -20 < 0, đạt cực đại tại x = -b/(2a) = -200 / (2 × -20) = 5.",
              "Bước 4: Giá bán tối ưu là: 40 - 2×5 = 30 (nghìn đồng)."
            ],
            tip: "Kiểm tra nhanh: tại 30k bán được 150 ly → doanh thu 4,5 triệu; tại 32k bán 140 ly → 4,48 triệu (nhỏ hơn).",
            sourceId: "cet"
          },
          {
            q: "Trong không gian Oxyz, khoảng cách từ điểm M(1; 2; -1) đến mặt phẳng (P): 2x - y + 2z + 5 = 0 bằng bao nhiêu?",
            options: ["1", "4/3", "2", "5/3"],
            answer: 0,
            steps: [
              "Bước 1: Áp dụng công thức d(M, (P)) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²).",
              "Bước 2: Tử số = |2(1) - 1(2) + 2(-1) + 5| = |2 - 2 - 2 + 5| = 3.",
              "Bước 3: Mẫu số = √(2² + (-1)² + 2²) = √(4 + 1 + 4) = √9 = 3.",
              "Bước 4: Khoảng cách d = 3 / 3 = 1."
            ],
            tip: "Bộ số Pytago không gian hay gặp trong đề ĐGNL: (1,2,2) → căn bằng 3; (2,3,6) → căn bằng 7.",
            sourceId: "moet"
          }
        ]
      }
    }
  },

  // =========================================================
  // 4. TƯ DUY KHOA HỌC (PHẦN 3)
  // =========================================================
  {
    id: "science",
    name: "Phần 3: Tư duy Khoa học (Logic & Phân tích số liệu)",
    levels: {
      beginner: {
        title: "Logic mệnh đề cơ bản & Đọc hiểu bảng biểu số liệu",
        readTime: "5 phút đọc",
        summary: "Làm quen với phần thi đặc sản của ĐGNL ĐHQG-HCM: suy luận mệnh đề Kéo theo (Nếu... thì...) và tính toán tỷ lệ phần trăm từ bảng số liệu.",
        objectives: [
          "Hiểu quy tắc tương đương của mệnh đề phản đảo: (P → Q) ⇔ (¬Q → ¬P).",
          "Đọc đúng đơn vị đo và mốc thời gian trên bảng/biểu đồ.",
          "Tính nhanh tốc độ tăng trưởng phần trăm giữa hai mốc thời gian."
        ],
        sections: [
          {
            heading: "1. Quy tắc Mệnh đề Phản đảo",
            text: "Cho mệnh đề đúng 'Nếu P thì Q' (P → Q). Ta LUÔN suy ra được mệnh đề tương đương: 'Nếu KHÔNG Q thì KHÔNG P' (¬Q → ¬P). Tuyệt đối KHÔNG được suy ra 'Nếu Q thì P' hay 'Nếu không P thì không Q'."
          },
          {
            heading: "2. Công thức Tính phần trăm tăng/giảm số liệu",
            text: "Phần trăm tăng từ năm A sang năm B = [(Giá trị năm B - Giá trị năm A) / Giá trị năm A] × 100%. Luôn chia cho GIÁ TRỊ BAN ĐẦU (năm A)."
          }
        ],
        example: "Doanh thu năm 2024 là 200 tỷ, năm 2025 là 250 tỷ. Tốc độ tăng trưởng = (250 - 200) / 200 × 100% = 25%.",
        takeaway: "Trong phân tích số liệu, sai lầm phổ biến nhất là chia nhầm cho giá trị năm sau thay vì năm gốc.",
        sources: ["cet", "mit", "khan"],
        quizzes: [
          {
            q: "Biết rằng câu 'Nếu bạn đạt trên 900 điểm ĐGNL thì bạn được thưởng học bổng' là ĐÚNG. Kết luận nào sau đây CHẮC CHẮN ĐÚNG?",
            options: [
              "Nếu bạn được thưởng học bổng thì bạn đạt trên 900 điểm.",
              "Nếu bạn không đạt trên 900 điểm thì bạn không được thưởng học bổng.",
              "Nếu bạn không được thưởng học bổng thì bạn không đạt trên 900 điểm.",
              "Bạn đạt 950 điểm nhưng không được thưởng học bổng."
            ],
            answer: 2,
            steps: [
              "Bước 1: Ký hiệu P = 'đạt trên 900 điểm', Q = 'được thưởng học bổng'. Đề cho P → Q đúng.",
              "Bước 2: Theo quy tắc mệnh đề phản đảo, (P → Q) ⇔ (¬Q → ¬P).",
              "Bước 3: ¬Q → ¬P dịch ra là: 'Nếu không được thưởng học bổng thì không đạt trên 900 điểm' → chọn C."
            ],
            tip: "Nhớ mẹo: Đảo ngược 2 vế và thêm 'KHÔNG' vào cả 2 vế là ra mệnh đề tương đương.",
            sourceId: "mit"
          },
          {
            q: "Sản lượng xuất khẩu gạo của một doanh nghiệp tăng từ 400 tấn (năm 2024) lên 500 tấn (năm 2025). Hỏi năm 2025 sản lượng tăng bao nhiêu phần trăm so với năm 2024?",
            options: ["20%", "25%", "80%", "125%"],
            answer: 1,
            steps: [
              "Bước 1: Tính lượng tăng tuyệt đối: 500 - 400 = 100 (tấn).",
              "Bước 2: Chia cho giá trị gốc (năm 2024 = 400 tấn): 100 / 400 = 0,25.",
              "Bước 3: Đổi sang phần trăm: 0,25 × 100% = 25%."
            ],
            tip: "Đáp án nhiễu 20% xuất hiện nếu bạn chia nhầm 100 / 500. Luôn đọc kỹ 'so với năm nào' để đặt làm mẫu số.",
            sourceId: "khan"
          },
          {
            q: "Trong một thí nghiệm Vật lý, khi giữ nguyên nhiệt độ của một khối khí lý tưởng và tăng áp suất lên 2 lần thì thể tích của khối khí sẽ thay đổi thế nào?",
            options: [
              "Tăng lên 2 lần",
              "Giảm đi 2 lần",
              "Không thay đổi",
              "Giảm đi 4 lần"
            ],
            answer: 1,
            steps: [
              "Bước 1: Áp dụng định luật Boyle (quá trình đẳng nhiệt): p₁V₁ = p₂V₂ (áp suất tỉ lệ nghịch với thể tích).",
              "Bước 2: Khi áp suất p tăng 2 lần (p₂ = 2p₁) thì V₂ = V₁ / 2 (thể tích giảm 2 lần)."
            ],
            tip: "Đẳng nhiệt: p và V tỉ lệ NGHỊCH (p·V = hằng số).",
            sourceId: "moet"
          }
        ]
      },
      intermediate: {
        title: "Bài toán Logic sắp xếp chỗ ngồi & Phân tích biểu đồ tròn/cột",
        readTime: "7 phút đọc",
        summary: "Thành thạo kỹ thuật vẽ sơ đồ vị trí cho nhóm câu Logic 4–5 ý liên tiếp và xử lý nhanh câu hỏi so sánh tỷ trọng trên biểu đồ.",
        objectives: [
          "Lập sơ đồ/bảng loại trừ nhanh cho bài toán sắp xếp thứ tự.",
          "Chuyển đổi chính xác giữa tỷ trọng (%) và giá trị tuyệt đối trên biểu đồ.",
          "Suy luận nguyên nhân – kết quả từ dữ kiện thực nghiệm khoa học."
        ],
        sections: [
          {
            heading: "1. Kỹ thuật giải bài toán Logic sắp xếp",
            text: "Luôn bắt đầu từ điều kiện CỐ ĐỊNH NHẤT (ví dụ: 'A ngồi ở ghế số 1', hoặc 'B và C luôn ngồi cạnh nhau'). Vẽ nhanh các ô trống 1 – 2 – 3 – 4 – 5 ra nháp để loại trừ trực quan, không nhẩm trong đầu."
          },
          {
            heading: "2. Chú ý 'Tỷ trọng' vs 'Giá trị tuyệt đối'",
            text: "Trên biểu đồ tròn của 2 năm khác nhau, nếu tổng quy mô năm 2025 lớn hơn năm 2024, một ngành có thể GIẢM tỷ trọng (%) nhưng vẫn TĂNG về giá trị tuyệt đối!"
          }
        ],
        example: "Năm 2024 tổng doanh thu 100 tỷ, ngành A chiếm 30% (= 30 tỷ). Năm 2025 tổng doanh thu 200 tỷ, ngành A chiếm 20% (= 40 tỷ). Vậy tỷ trọng giảm nhưng giá trị tuyệt đối lại tăng!",
        takeaway: "Trong bài toán Logic nhóm, hãy viết tắt tên nhân vật bằng 1 chữ cái và ký hiệu ràng buộc (A-B cạnh nhau, C ≠ 1) để tiết kiệm thời gian.",
        sources: ["cet", "mit", "khan"],
        quizzes: [
          {
            q: "Có 4 bạn An, Bình, Chi, Dũng xếp thành một hàng ngang từ trái sang phải (vị trí 1 đến 4). Biết: (1) An đứng ngay bên trái Bình; (2) Dũng đứng ở vị trí số 4; (3) Chi không đứng ở vị trí số 1. Hỏi An đứng ở vị trí số mấy?",
            options: ["Vị trí 1", "Vị trí 2", "Vị trí 3", "Không đủ dữ kiện"],
            answer: 0,
            steps: [
              "Bước 1: Từ (2), cố định Dũng ở vị trí 4: [ _ , _ , _ , Dũng ].",
              "Bước 2: Từ (1), An và Bình đứng liền nhau theo thứ tự (An - Bình), nên chỉ có 2 khả năng: vị trí (1-2) hoặc (2-3).",
              "Bước 3: Nếu (An - Bình) ở (2-3) thì Chi buộc phải ở vị trí 1, mâu thuẫn với (3) 'Chi không đứng ở vị trí 1'.",
              "Bước 4: Vậy (An - Bình) phải ở (1-2) và Chi ở vị trí 3 → An đứng ở vị trí 1."
            ],
            tip: "Thứ tự hoàn chỉnh là: An (1) – Bình (2) – Chi (3) – Dũng (4). Vẽ 4 ô ra nháp sẽ giải trong 15 giây!",
            sourceId: "cet"
          },
          {
            q: "Năm 2024, tổng chi tiêu của một công ty là 500 triệu đồng, trong đó Marketing chiếm 20%. Năm 2025, tổng chi tiêu tăng lên 800 triệu đồng, Marketing chiếm 15%. Chi tiêu cho Marketing năm 2025 thay đổi thế nào so với năm 2024?",
            options: [
              "Giảm 5 triệu đồng",
              "Tăng 20 triệu đồng",
              "Giảm 20 triệu đồng",
              "Không thay đổi"
            ],
            answer: 1,
            steps: [
              "Bước 1: Chi tiêu Marketing năm 2024 = 500 × 20% = 100 (triệu đồng).",
              "Bước 2: Chi tiêu Marketing năm 2025 = 800 × 15% = 120 (triệu đồng).",
              "Bước 3: So sánh: 120 - 100 = +20 (triệu đồng) → Tăng 20 triệu đồng."
            ],
            tip: "Đừng bị đánh lừa bởi tỷ trọng giảm từ 20% xuống 15%; phải nhân với tổng của từng năm!",
            sourceId: "khan"
          },
          {
            q: "Trong phản ứng hóa học thuận nghịch ở trạng thái cân bằng: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH < 0). Khi TĂNG áp suất của hệ (giữ nguyên nhiệt độ), cân bằng sẽ chuyển dịch theo chiều nào?",
            options: [
              "Chiều thuận (tạo thêm NH₃)",
              "Chiều nghịch (phân hủy NH₃)",
              "Không chuyển dịch",
              "Dừng hẳn phản ứng"
            ],
            answer: 0,
            steps: [
              "Bước 1: Đếm tổng số mol khí hai vế: Vế trái = 1 + 3 = 4 mol khí; Vế phải = 2 mol khí.",
              "Bước 2: Theo nguyên lý Le Chatelier, khi TĂNG áp suất, cân bằng chuyển dịch theo chiều LÀM GIẢM số mol khí.",
              "Bước 3: Từ 4 mol sang 2 mol là chiều thuận → chọn A."
            ],
            tip: "Tăng áp suất → chuyển về phía ÍT mol khí hơn; Giảm áp suất → về phía NHIỀU mol khí hơn.",
            sourceId: "moet"
          }
        ]
      },
      advanced: {
        title: "Suy luận Logic phức hợp & Đánh giá bằng chứng khoa học (900+)",
        readTime: "8 phút đọc",
        summary: "Xử lý các câu hỏi Tư duy Khoa học khó nhất: bài toán nói thật – nói dối, phân tích sai số/biến kiểm soát trong thí nghiệm và tính tỷ lệ kép.",
        objectives: [
          "Giải bài toán Logic 'người nói thật / người nói dối' bằng phương pháp giả sử phản chứng.",
          "Phân biệt biến độc lập, biến phụ thuộc và biến kiểm soát trong thiết kế thí nghiệm.",
          "Tránh bẫy 'Tương quan không đồng nghĩa với Nhân quả' (Correlation ≠ Causation)."
        ],
        sections: [
          {
            heading: "1. Phương pháp Phản chứng cho bài toán Nói thật – Nói dối",
            text: "Tìm hai phát biểu MÂU THUẪN TRỰC TIẾP với nhau (ví dụ: A nói 'B làm', B nói 'Tôi không làm'). Trong 2 người này, chắc chắn có đúng 1 người nói thật và 1 người nói dối. Từ đó suy ra trạng thái của những người còn lại."
          },
          {
            heading: "2. Thiết kế thí nghiệm khoa học chuẩn",
            text: "Để kết luận yếu tố X gây ra kết quả Y, thí nghiệm bắt buộc phải có nhóm đối chứng (control group) và giữ CỐ ĐỊNH tất cả các yếu tố khác (biến kiểm soát)."
          }
        ],
        example: "Một nghiên cứu thấy lượng kem bán ra tăng cùng lúc với số vụ đuối nước. Không thể kết luận ăn kem gây đuối nước — cả hai đều tăng do một biến thứ ba là 'nhiệt độ mùa hè tăng cao'.",
        takeaway: "Trong câu hỏi khoa học thực nghiệm, đáp án đúng luôn đảm bảo chỉ thay đổi DUY NHẤT 1 biến độc lập tại một thời điểm.",
        sources: ["cet", "mit", "moet"],
        quizzes: [
          {
            q: "Có 3 người A, B, C trong đó có đúng 1 người làm vỡ bình hoa và chỉ có ĐÚNG 1 NGƯỜI NÓI THẬT. A nói: 'B làm vỡ'. B nói: 'Tôi không làm vỡ'. C nói: 'Tôi không làm vỡ'. Ai là người làm vỡ bình hoa?",
            options: ["A", "B", "C", "Không xác định được"],
            answer: 2,
            steps: [
              "Bước 1: Xét lời của A ('B làm vỡ') và B ('Tôi không làm vỡ'). Đây là 2 mệnh đề mâu thuẫn trực tiếp → chắc chắn có ĐÚNG 1 người nói thật trong cặp (A, B).",
              "Bước 2: Vì cả 3 người chỉ có duy nhất 1 người nói thật, nên C chắc chắn NÓI DỐI.",
              "Bước 3: C nói 'Tôi không làm vỡ' là dối ⇒ C chính là người làm vỡ bình hoa."
            ],
            tip: "Kiểm tra lại: Nếu C làm vỡ → A nói dối, B nói thật, C nói dối (thỏa mãn đúng 1 người nói thật!).",
            sourceId: "mit"
          },
          {
            q: "Một nhà sinh học muốn kiểm tra xem loại phân bón mới X có giúp cây cà chua ra quả nhiều hơn hay không. Thiết kế thí nghiệm nào sau đây là KHOA HỌC nhất?",
            options: [
              "Bón phân X cho 20 cây cà chua ngoài trời và đếm số quả sau 2 tháng.",
              "Bón phân X cho 10 cây cà chua ở nơi nhiều nắng và không bón cho 10 cây ở nơi bóng râm.",
              "Chia 20 cây cà chua cùng giống thành 2 nhóm có cùng ánh sáng, nước, đất; chỉ bón phân X cho nhóm 1, không bón cho nhóm 2.",
              "Bón phân X cho 10 cây cà chua và bón phân Y cho 10 cây ớt."
            ],
            answer: 2,
            steps: [
              "Bước 1: Để đánh giá tác động riêng của phân X (biến độc lập), cần có nhóm đối chứng (không bón X) → loại A.",
              "Bước 2: Mọi yếu tố khác (giống cây, ánh sáng, nước, đất) phải được giữ giống hệt nhau (biến kiểm soát) → loại B (khác ánh sáng) và D (khác giống cây).",
              "Bước 3: Chỉ có đáp án C đảm bảo chuẩn thí nghiệm có đối chứng."
            ],
            tip: "Nguyên tắc thí nghiệm: Chỉ thay đổi 1 yếu tố cần kiểm tra, giữ nguyên tất cả yếu tố còn lại.",
            sourceId: "mit"
          },
          {
            q: "Một dung dịch ban đầu có 200g nước muối nồng độ 10%. Cần làm bay hơi bao nhiêu gam nước để thu được dung dịch có nồng độ 20%?",
            options: ["50g", "100g", "120g", "80g"],
            answer: 1,
            steps: [
              "Bước 1: Tính khối lượng muối nguyên chất (không đổi khi bay hơi nước): m(muối) = 200 × 10% = 20g.",
              "Bước 2: Để 20g muối chiếm 20% khối lượng dung dịch mới thì khối lượng dung dịch mới là: m(dd mới) = 20 / 20% = 100g.",
              "Bước 3: Lượng nước cần bay hơi = 200g - 100g = 100g."
            ],
            tip: "Mẹo nhanh: Muốn nồng độ tăng gấp ĐÔI (10% → 20%) bằng cách bay hơi nước thì khối lượng dung dịch phải giảm đi một NỬA (200g → 100g).",
            sourceId: "moet"
          }
        ]
      }
    }
  }
];
