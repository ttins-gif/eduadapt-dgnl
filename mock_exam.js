// =========================================================
// EduAdapt ĐGNL — Đề Thi Thử Chuẩn Cấu Trúc ĐHQG-HCM 2026
// Tổng hợp & biên soạn theo cấu trúc Đề mẫu + Đợt 1 & Đợt 2 (2026)
// =========================================================

const MOCK_EXAM_2026 = {
  id: "vact-2026-mock-1",
  title: "Đề Thi Thử ĐGNL ĐHQG-HCM 2026 (Chuẩn cấu trúc 4 phần)",
  durationMinutes: 50,
  totalQuestions: 40,
  sections: [
    // =====================================================
    // PHẦN 1.1: TIẾNG VIỆT (10 CÂU)
    // =====================================================
    {
      id: "tv",
      name: "Phần 1.1: Tiếng Việt (10 câu)",
      questions: [
        {
          id: "tv1",
          q: "Trong các trường hợp sau, trường hợp nào viết ĐÚNG chính tả Tiếng Việt?",
          options: [
            "Sỗ sàng, súc tích, trau chuốt.",
            "Sỗ sàng, xúc tích, trau chuốt.",
            "Sỗ sàng, súc tích, trao chuốt.",
            "Sổ sàng, súc tích, trau chuốt."
          ],
          answer: 0,
          solution: "Đáp án A đúng chuẩn Từ điển Tiếng Việt: 'sỗ sàng' (dấu ngã), 'súc tích' (chữ s — ngắn gọn, cô đọng), 'trau chuốt' (vần au — gọt giũa cẩn thận)."
        },
        {
          id: "tv2",
          q: "Câu nào sau đây có từ KHÔNG đúng chính tả?",
          options: [
            "Các chương trình hỗ trợ tài chính giúp sinh viên giảm bớt áp lực học phí.",
            "Bạn tôi đã dành giải quán quân châu Á cuộc thi Nhịp cầu Hán ngữ.",
            "Một số nơi xem xét siết việc sử dụng điện thoại di động trong trường học.",
            "Nhiều bạn thích ngành Điều khiển tàu biển vì có nhiều cơ hội trải nghiệm."
          ],
          answer: 1,
          solution: "Đáp án B sai chính tả ở từ 'dành'. 'Dành' nghĩa là cất giữ, để riêng; còn nỗ lực đạt được giải thưởng phải viết là 'giành' (giành giải quán quân)."
        },
        {
          id: "tv3",
          q: "Trong câu: 'Anh ấy không nói gì, vô hình trung, tôi bị những người đứng quanh đó hiểu lầm.' Cụm từ 'vô hình trung' có nghĩa là gì?",
          options: [
            "Vô tình, không ý thức được cảm xúc của người khác.",
            "Có chủ ý mang đến kết quả từ hành động của chủ thể.",
            "Tuy không có chủ định, không cố tình nhưng lại thành ra như vậy.",
            "Vì thiếu suy nghĩ nên đôi khi tạo ra ảnh hưởng tiêu cực."
          ],
          answer: 2,
          solution: "Theo Từ điển Tiếng Việt, 'vô hình trung' nghĩa là tuy không có chủ định, không cố ý nhưng tự nhiên lại thành ra như vậy."
        },
        {
          id: "tv4",
          q: "Câu: 'Tại Việt Nam, các mối đe dọa an ninh mạng phổ biến như tấn công dò mật khẩu; đăng nhập thử vào hàng loạt hệ thống; tạo ra sản phẩm mạo danh và đầu độc dữ liệu.' mắc lỗi gì?",
          options: [
            "Sai ngữ pháp (thiếu vị ngữ).",
            "Sai phong cách ngôn ngữ.",
            "Sai logic.",
            "Câu mơ hồ."
          ],
          answer: 0,
          solution: "Từ 'như' biến toàn bộ phần liệt kê phía sau thành thành phần phụ giải thích cho chủ ngữ 'các mối đe dọa an ninh mạng phổ biến', làm câu bị khuyết Vị ngữ. Sửa đúng: thay 'như' bằng 'bao gồm' hoặc 'là'."
        },
        {
          id: "tv5",
          q: "Câu: 'Trong quá trình thực hiện, nếu có vướng mắc hoặc cần điều chỉnh Quy định, các đơn vị làm tờ trình gửi Phòng Tổ chức - Nhân sự.' mắc lỗi dùng từ gì?",
          options: [
            "Không đúng nghĩa.",
            "Không phù hợp với phong cách ngôn ngữ của văn bản.",
            "Không đúng chính tả.",
            "Không phù hợp với khả năng kết hợp từ."
          ],
          answer: 1,
          solution: "Đây là văn bản hành chính – công vụ. Từ 'làm' (trong 'làm tờ trình') mang sắc thái khẩu ngữ, không phù hợp phong cách trang trọng; cần dùng 'lập tờ trình' hoặc 'soạn tờ trình'."
        },
        {
          id: "tv6",
          q: "Trong bài thơ thất ngôn bát cú (8 câu) theo thi pháp Đường luật, những cặp câu nào bắt buộc phải ĐỐI nhau?",
          options: [
            "Câu (3)-(4) và câu (5)-(6).",
            "Câu (1)-(2) và câu (7)-(8).",
            "Câu (1)-(2) và câu (3)-(4).",
            "Câu (5)-(6) và câu (7)-(8)."
          ],
          answer: 0,
          solution: "Thơ thất ngôn bát cú Đường luật chia 4 phần: Đề (1-2), Thực (3-4), Luận (5-6), Kết (7-8). Nghệ thuật đối bắt buộc áp dụng ở hai câu Thực (3-4) và hai câu Luận (5-6)."
        },
        {
          id: "tv7",
          q: "Từ 'lục' trong câu nào sau đây KHÔNG cùng nghĩa với 'lục' trong các câu còn lại?",
          options: [
            "Lục quân hai nước đã phối hợp chặt chẽ, thực hiện huấn luyện đúng kế hoạch.",
            "Diệp lục là hợp chất tự nhiên làm cho lá cây có màu xanh.",
            "U23 Việt Nam đang tạo nên cơn địa chấn tại đấu trường châu lục.",
            "Khi phần lớn các khối đất liền hợp thành một cấu trúc, siêu lục địa sẽ hình thành."
          ],
          answer: 1,
          solution: "Trong A, C, D: 'lục' (陆) có nghĩa là đất liền (lục quân, châu lục, lục địa). Trong B: 'diệp lục' (绿) có nghĩa là màu xanh lục."
        },
        {
          id: "tv8",
          q: "Thành ngữ 'lấy thúng úp voi' có hàm ý gì?",
          options: [
            "Phơi bày bí mật riêng tư trong gia đình cho người khác xem.",
            "Dùng quyền lực để áp bức, chèn ép người khác trắng trợn.",
            "Cố tình che đậy, bưng bít một cách vô ích sự việc đã quá lộ liễu.",
            "Vu oan cho người khác việc họ không làm."
          ],
          answer: 2,
          solution: "'Lấy thúng úp voi' (giống 'lấy vải thưa che mắt thánh') mang nghĩa bóng: cố che giấu một sự thật quá lớn lao, lộ liễu nên trở nên vụng về, vô ích."
        },
        {
          id: "tv9",
          passage: "Đọc đoạn trích sau để trả lời câu 9–10: 'Đình Vĩnh Tế là công trình kiến trúc cổ nằm trong cụm di tích danh thắng Núi Sam, phường Núi Sam, TP. Châu Đốc, An Giang. Đình thờ danh tướng Thoại Ngọc Hầu, được xây dựng từ nửa đầu thế kỷ XIX. Về sau, đình được dời cách vị trí cũ 50m và trùng tu toàn diện trên diện tích gần 2.000 m². Bờ nóc gắn lưỡng long tranh châu, các đầu kìm góc mái gắn ngư hóa long...'",
          q: "Văn bản trên mang đặc điểm của thể loại nào?",
          options: [
            "Văn bản nhật dụng.",
            "Văn bản văn học.",
            "Văn bản thông tin.",
            "Văn bản nghị luận."
          ],
          answer: 2,
          solution: "Văn bản cung cấp các dữ kiện, vị trí địa lý, mốc lịch sử và số liệu khách quan (50m, 2.000 m²) về đình Vĩnh Tế → đây là Văn bản thông tin."
        },
        {
          id: "tv10",
          q: "Cụm từ 'lưỡng long tranh châu' và 'ngư hóa long' trong đoạn trích trên miêu tả hình ảnh nào?",
          options: [
            "Ngư dân vươn mình hóa rồng và con rồng lực lưỡng.",
            "Con rồng lực lưỡng tranh ngọc châu với con cá hóa rồng.",
            "Hai con rồng tranh ngọc châu và ngư dân hóa rồng.",
            "Hai con rồng tranh nhau viên ngọc châu và con cá hóa rồng."
          ],
          answer: 3,
          solution: "'Lưỡng' = hai, 'long' = rồng, 'tranh châu' = tranh ngọc châu; 'Ngư' = cá, 'hóa long' = hóa rồng (điển cố cá chép vượt vũ môn)."
        }
      ]
    },

    // =====================================================
    // PHẦN 1.2: TIẾNG ANH (10 CÂU)
    // =====================================================
    {
      id: "en",
      name: "Phần 1.2: Tiếng Anh (10 câu)",
      questions: [
        {
          id: "en1",
          q: "Jane was careful. She didn't start the test until she _____ all the instructions.",
          options: ["read", "reads", "had read", "had been reading"],
          answer: 2,
          solution: "Hành động đọc hướng dẫn xảy ra và hoàn tất TRƯỚC hành động bắt đầu làm bài ('didn't start' — quá khứ đơn) → dùng Quá khứ hoàn thành 'had read'."
        },
        {
          id: "en2",
          q: "The organizers had to call _____ the concert because of insufficient attendance.",
          options: ["on", "off", "out", "in"],
          answer: 1,
          solution: "Phrasal verb: 'call off' = hủy bỏ (cancel). Buổi hòa nhạc bị hủy do không đủ khán giả."
        },
        {
          id: "en3",
          q: "The exhibition received a lot of praise for its _____ use of light and color.",
          options: ["creativity", "creative", "creation", "creatively"],
          answer: 1,
          solution: "Giữa tính từ sở hữu 'its' và danh từ 'use' cần một tính từ → 'creative' (sáng tạo)."
        },
        {
          id: "en4",
          q: "The Wi-Fi in all the classrooms _____ highly unstable, but it is good now.",
          options: ["used to be", "would be", "is", "will be"],
          answer: 0,
          solution: "Vế sau 'but it is good now' diễn tả trạng thái từng tồn tại trong quá khứ nay không còn nữa → dùng 'used to + V' → 'used to be'."
        },
        {
          id: "en5",
          q: "Find the error: Johnny saves (A) all of his data in an (B) office computer who (C) is shared (D) by many users.",
          options: ["A (saves)", "B (an)", "C (who)", "D (is shared)"],
          answer: 2,
          solution: "'an office computer' là danh từ chỉ VẬT, nên không thể dùng đại từ quan hệ 'who' (chỉ người). Sửa: who → which/that."
        },
        {
          id: "en6",
          q: "Find the error: The data from users show (A) that small changes (B) in temperature has (C) a big impact on battery performance (D).",
          options: ["A (show)", "B (changes)", "C (has)", "D (performance)"],
          answer: 2,
          solution: "Chủ ngữ của mệnh đề 'that...' là 'small changes' (số nhiều) → động từ phải chia số nhiều là 'have', không phải 'has'."
        },
        {
          id: "en7",
          q: "Choose the closest meaning: 'If people don't stop body shaming, it will have serious impacts on victims.'",
          options: [
            "If people had stopped body shaming, it would not have impacted others seriously.",
            "Body shaming will have serious impacts on victims unless it is stopped.",
            "People would be seriously impacted by body shaming if it were not stopped.",
            "Unless people stop body shaming, it would have serious impacts on victims."
          ],
          answer: 1,
          solution: "Câu gốc là điều kiện loại 1. 'If ... don't' = 'unless' (trừ khi). Chuyển sang bị động 'unless it is stopped' vẫn giữ nguyên điều kiện loại 1 và nghĩa gốc."
        },
        {
          id: "en8",
          q: "Choose the closest meaning: 'Jane said to her husband, \"Don't forget to lock the door before you go to bed.\"'",
          options: [
            "Jane's husband asked her not to forget to lock the door before going to bed.",
            "Jane reminded her husband to lock the door before he went to bed.",
            "Jane said to her husband that he must lock the door before going to bed.",
            "Jane told her husband not to leave the door locked before he went to bed."
          ],
          answer: 1,
          solution: "'Don't forget to V' (đừng quên làm gì) được tường thuật chuẩn bằng cấu trúc 'remind sb to V' (nhắc nhở ai làm gì) và lùi thì 'go → went'."
        },
        {
          id: "en9",
          passage: "Read the passage (Q9–Q10): 'Blinkist is an app designed to help people learn quickly by offering 15-minute summaries of nonfiction books. It provides insights from over 5,700 books. Blinkist's summaries are created using science-based methods to ensure the information is easy to understand and remember. The app also allows users to \"try before they buy\", helping readers decide whether a book is worth purchasing and reading in full.'",
          q: "What does the word 'It' in the passage refer to?",
          options: ["knowledge", "Blinkist", "choice", "nonfiction"],
          answer: 1,
          solution: "Câu trước giới thiệu 'Blinkist is an app...', câu sau nói 'It provides insights from over 5,700 books' → 'It' thay thế cho 'Blinkist'."
        },
        {
          id: "en10",
          q: "It can be inferred from the passage that _____.",
          options: [
            "Blinkist's summaries are mostly inaccurate.",
            "Many Blinkist users do not finish full books.",
            "Blinkist requires a subscription to use.",
            "Blinkist users can preview books before buying them."
          ],
          answer: 3,
          solution: "Cụm 'try before they buy' và 'decide whether a book is worth purchasing and reading in full' suy ra người dùng có thể xem trước nội dung sách qua tóm tắt trước khi quyết định mua."
        }
      ]
    },

    // =====================================================
    // PHẦN 2: TOÁN HỌC (10 CÂU)
    // =====================================================
    {
      id: "math",
      name: "Phần 2: Toán học (10 câu)",
      questions: [
        {
          id: "m1",
          q: "Cho phương trình x² + 5x + m - m² = 0. Các giá trị của m để phương trình có 2 nghiệm trái dấu là:",
          options: ["m > 1/4", "m < 29/12", "m ∈ ∅", "m < 0 hoặc m > 1"],
          answer: 3,
          solution: "Phương trình bậc 2 có 2 nghiệm trái dấu ⇔ a·c < 0 ⇔ 1·(m - m²) < 0 ⇔ m(1 - m) < 0 ⇔ m < 0 hoặc m > 1."
        },
        {
          id: "m2",
          q: "Trong một lớp mới có 20 học sinh. Nếu mỗi cặp học sinh kết bạn với nhau được tính là 1 kết nối thì số kết nối tối đa trong lớp là:",
          options: ["200", "180", "190", "170"],
          answer: 2,
          solution: "Số kết nối tối đa là số tổ hợp chập 2 của 20 học sinh: C(20, 2) = (20 × 19) / 2 = 190."
        },
        {
          id: "m3",
          q: "Tính giới hạn lim(x → -2) của (x³ + 2x² - 1) / (5 - 3x):",
          options: ["1/2", "-3/5", "0", "-1/11"],
          answer: 3,
          solution: "Thay trực tiếp x = -2: Tử số = (-2)³ + 2(-2)² - 1 = -8 + 8 - 1 = -1; Mẫu số = 5 - 3(-2) = 11 → Kết quả = -1/11."
        },
        {
          id: "m4",
          q: "Đồ thị hàm số y = (2x² - x + 1) / (x² - 1) có bao nhiêu đường tiệm cận?",
          options: ["1", "4", "2", "3"],
          answer: 3,
          solution: "Tiệm cận ngang: lim(x → ±∞) y = 2 → có 1 TCN (y = 2). Mẫu số x² - 1 = 0 ⇔ x = ±1, cả hai đều không làm tử số bằng 0 → có 2 TCĐ (x = 1, x = -1). Tổng cộng: 1 + 2 = 3 đường tiệm cận."
        },
        {
          id: "m5",
          q: "Cho cấp số nhân (uₙ) có u₁ = 2026 và uₙ₊₁ = (1/2)uₙ. Tổng cấp số nhân lùi vô hạn S = u₁ + u₂ + u₃ + ... bằng:",
          options: ["3039", "4052", "2026", "1013"],
          answer: 1,
          solution: "Công bội q = 1/2 (|q| < 1). Tổng cấp số nhân lùi vô hạn S = u₁ / (1 - q) = 2026 / (1 - 1/2) = 2026 × 2 = 4052."
        },
        {
          id: "m6",
          q: "Cho hàm số f(x) = x³ - 3x² - 9x + 6. Hàm số nghịch biến trên khoảng nào dưới đây?",
          options: ["(-3; 1)", "(0; 3)", "(1; 4)", "(-2; 2)"],
          answer: 1,
          solution: "f'(x) = 3x² - 6x - 9 < 0 ⇔ x² - 2x - 3 < 0 ⇔ -1 < x < 3. Trong các đáp án, khoảng (0; 3) là tập con của (-1; 3) → chọn B."
        },
        {
          id: "m7",
          passage: "Thông tin cho câu 7–8: Có 3 hộp đựng thẻ. Hộp 1 có 1 thẻ xanh, 1 thẻ đỏ, 1 thẻ vàng. Hộp 2 có 1 thẻ xanh, 1 thẻ đỏ. Hộp 3 có 1 thẻ vàng, 1 thẻ đỏ. Lấy ngẫu nhiên từ mỗi hộp 1 thẻ.",
          q: "Số phần tử của không gian mẫu n(Ω) là:",
          options: ["12", "7", "16", "8"],
          answer: 0,
          solution: "Áp dụng quy tắc nhân: n(Ω) = 3 × 2 × 2 = 12."
        },
        {
          id: "m8",
          q: "Xác suất để lấy được ÍT NHẤT 1 thẻ đỏ là:",
          options: ["3/4", "2/3", "5/7", "5/6"],
          answer: 3,
          solution: "Biến cố đối 'không có thẻ đỏ nào': Hộp 1 chọn xanh/vàng (2 cách), Hộp 2 chọn xanh (1 cách), Hộp 3 chọn vàng (1 cách) → 2×1×1 = 2 cách. P(đối) = 2/12 = 1/6 ⇒ P(ít nhất 1 đỏ) = 1 - 1/6 = 5/6."
        },
        {
          id: "m9",
          q: "Một chai tương ớt (1 kg/chai) loại cao cấp chứa 40% ớt tươi (giá 50 nghìn), loại tiêu chuẩn chứa 25% ớt tươi (giá 30 nghìn), phần còn lại là cà chua. Nếu sản xuất x chai cao cấp và y chai tiêu chuẩn thì khối lượng cà chua (kg) sử dụng là:",
          options: ["0,4x + 0,1y", "0,4x + 0,25y", "1,5x + 3y", "0,6x + 0,75y"],
          answer: 3,
          solution: "Loại cao cấp có 100% - 40% = 60% cà chua (0,6 kg/chai). Loại tiêu chuẩn có 100% - 25% = 75% cà chua (0,75 kg/chai). Tổng lượng cà chua = 0,6x + 0,75y."
        },
        {
          id: "m10",
          q: "Trong không gian Oxyz, cho điểm A(2; 2; -3) và mặt phẳng (P): 2x + y - 2z = 0. Khoảng cách từ điểm A đến mặt phẳng (P) bằng:",
          options: ["3", "4", "2", "6"],
          answer: 1,
          solution: "d(A, (P)) = |2(2) + 1(2) - 2(-3)| / √(2² + 1² + (-2)²) = |4 + 2 + 6| / √9 = 12 / 3 = 4."
        }
      ]
    },

    // =====================================================
    // PHẦN 3: TƯ DUY KHOA HỌC (10 CÂU)
    // =====================================================
    {
      id: "sci",
      name: "Phần 3: Tư duy Khoa học — Logic, Số liệu & Khoa học (10 câu)",
      questions: [
        {
          id: "s1",
          passage: "Thông tin cho câu 1–2 (Logic): Có 6 tình nguyện viên G, H, K, L, M, N chia làm 3 đội, mỗi đội 2 người (1 đội trưởng, 1 thành viên). Biết: (1) K ở cùng đội với G hoặc N; (2) H là đội trưởng; (3) G hoặc L (không phải cả 2) không là đội trưởng.",
          q: "Nếu H cùng đội với L thì điều nào sau đây CHẮC CHẮN đúng?",
          options: [
            "G là đội trưởng.",
            "M cùng đội với N.",
            "K không là đội trưởng.",
            "N không là đội trưởng."
          ],
          answer: 0,
          solution: "H luôn là đội trưởng. L cùng đội với H nên L không là đội trưởng. Theo (3), trong (G, L) chỉ có 1 người không là đội trưởng → G bắt buộc là đội trưởng."
        },
        {
          id: "s2",
          q: "Nếu M là đội trưởng thì hai người nào sau đây cùng 1 đội?",
          options: ["G, M", "L, N", "H, N", "K, N"],
          answer: 2,
          solution: "M là đội trưởng, H là đội trưởng, và 1 người trong (G, L) là đội trưởng → K và N đều KHÔNG là đội trưởng nên không thể cùng đội. Theo (1), K phải cùng đội với G (và G là đội trưởng). Vậy 3 đội trưởng là H, M, G; 3 thành viên là K, N, L. Trong 4 phương án chỉ có (H, N) gồm 1 đội trưởng + 1 thành viên."
        },
        {
          id: "s3",
          passage: "Thông tin cho câu 3–5 (Phân tích số liệu): Biểu đồ cơ cấu lao động một khu vực gồm 4 nhóm ngành: Chế biến chế tạo (30%), Khai khoáng (25%), Cấp nước & xử lý rác thải (20%), Nhóm ngành khác (25%).",
          q: "Số lượng lao động ngành Chế biến chế tạo chiếm nhiều hơn bao nhiêu % so với ngành Khai khoáng?",
          options: ["15%", "10%", "5%", "20%"],
          answer: 3,
          solution: "Chênh lệch tương đối so với Khai khoáng = (30% - 25%) / 25% × 100% = 5% / 25% × 100% = 20%."
        },
        {
          id: "s4",
          q: "Trong Nhóm ngành khác (25%), ngành Sản xuất & phân phối điện chiếm 20%. Tỷ lệ lao động ngành Điện so với ngành Chế biến chế tạo là:",
          options: ["1 : 3", "1 : 6", "1 : 5", "1 : 2"],
          answer: 1,
          solution: "Tỷ trọng ngành Điện toàn hệ thống = 20% × 25% = 5%. Tỷ lệ so với Chế biến chế tạo (30%) = 5% / 30% = 1/6 (tức 1 : 6)."
        },
        {
          id: "s5",
          q: "Do lao động ngành Khai khoáng chuyển sang nên số lao động Chế biến chế tạo tăng 10%. Hỏi số lao động ngành Khai khoáng giảm bao nhiêu %?",
          options: ["6%", "3%", "9%", "12%"],
          answer: 3,
          solution: "Lao động Chế biến chế tạo tăng thêm 10% × 30% = 3% tổng lao động. Lượng này chuyển từ Khai khoáng (25%) sang → Khai khoáng giảm 3% / 25% = 12%."
        },
        {
          id: "s6",
          passage: "Thông tin cho câu 6–7 (Hóa học): Liên hệ áp suất hơi bão hòa dung dịch P = P₀ · n_A / (n_A + n_B), với n_A là số mol dung môi (nước, M=18) và n_B là số mol chất tan không bay hơi. Hòa tan 24g urea (M=60) vào 200g nước được dung dịch X (P₀ nước ở 25°C là 23,8 mmHg).",
          q: "Nhận xét nào sau đây SAI?",
          options: [
            "Áp suất hơi bão hòa của dung dịch X thấp hơn 23,8 mmHg.",
            "Khi nhiệt độ tăng, áp suất hơi bão hòa của dung dịch X tăng.",
            "Khi tăng nồng độ urea thì áp suất hơi bão hòa của dung dịch tăng.",
            "Áp suất hơi bão hòa của nước nguyên chất lớn hơn của dung dịch X."
          ],
          answer: 2,
          solution: "Từ công thức P = P₀ · n_A / (n_A + n_B), khi tăng nồng độ chất tan (tăng n_B) thì mẫu số tăng → áp suất hơi bão hòa P GIẢM, không phải tăng. Vậy C sai."
        },
        {
          id: "s7",
          q: "Cần hòa tan bao nhiêu gam glucose (M = 180 g/mol) vào 200g nước để thu được dung dịch có áp suất hơi bão hòa bằng dung dịch X?",
          options: ["8 gam", "24 gam", "36 gam", "72 gam"],
          answer: 3,
          solution: "Để P bằng nhau (cùng 200g nước), số mol chất tan phải bằng nhau: n(glucose) = n(urea) = 24 / 60 = 0,4 mol ⇒ m(glucose) = 0,4 × 180 = 72 gam."
        },
        {
          id: "s8",
          passage: "Thông tin cho câu 8–9 (Vật lý): Một máy biến áp lý tưởng dùng để tăng áp truyền tải điện năng có cuộn sơ cấp N₁ = 10.000 vòng và cuộn thứ cấp N₂ = 50.000 vòng. Biết U₂/U₁ = N₂/N₁ và khi điện áp tăng n lần thì công suất hao phí giảm n² lần.",
          q: "Nếu điện áp đặt vào cuộn sơ cấp là U₁ = 1.500V thì điện áp thu được ở cuộn thứ cấp U₂ bằng:",
          options: ["7.500V", "5.000V", "750V", "300V"],
          answer: 0,
          solution: "U₂ = U₁ × (N₂ / N₁) = 1.500 × (50.000 / 10.000) = 1.500 × 5 = 7.500V."
        },
        {
          id: "s9",
          q: "Nếu hiệu suất truyền tải ban đầu (khi chưa tăng áp) đạt 80%, thì sau khi tăng áp bằng máy biến áp trên, hiệu suất truyền tải mới đạt:",
          options: ["96,0%", "99,2%", "92,0%", "99,6%"],
          answer: 1,
          solution: "Ban đầu hiệu suất 80% → hao phí là 20%. Điện áp tăng n = 5 lần ⇒ hao phí giảm n² = 25 lần, còn 20% / 25 = 0,8%. Hiệu suất mới = 100% - 0,8% = 99,2%."
        },
        {
          id: "s10",
          q: "(Lịch sử — Đề Đợt 1/2026) Bộ luật nổi tiếng được soạn thảo và ban hành dưới thời trị vì của vua Lê Thánh Tông (1460–1497) là:",
          options: ["Bộ luật Hình Luật", "Bộ luật Hình thư", "Bộ luật Gia Long", "Bộ luật Hồng Đức"],
          answer: 3,
          solution: "Dưới triều vua Lê Thánh Tông (thời Lê sơ), triều đình ban hành Quốc triều hình luật, thường gọi là Bộ luật Hồng Đức — bộ luật tiến bộ và đậm đà bản sắc dân tộc."
        }
      ]
    }
  ]
};
