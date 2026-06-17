# Soul Flower — Landing site (4 trang, demo public-ready)

Bộ landing page hoàn chỉnh cho thương hiệu "Soul Flower – Thực phẩm hữu cơ từ thiên nhiên", xây
theo wireframe và nguyên tắc thiết kế trong `Guide.docx`: cảm giác "chậm", cuộn dọc, mỗi section
một thông điệp, ít chữ, ảnh lớn (ở đây là minh hoạ đường nét tối giản), CTA mềm — không bán hàng thô.

## Cấu trúc dự án

```
.
├── index.html      # Trang chủ — 7 section theo wireframe (Hero, Triết lý, Giá trị,
│                   #   Sản phẩm nổi bật, Câu chuyện nông trại, Kênh bán hàng, Liên hệ)
├── about.html      # Về chúng tôi — Hero, Câu chuyện, Triết lý canh tác, Con người
├── products.html   # Sản phẩm — Hero nhỏ, Intro, Danh mục 6 sản phẩm, CTA liên hệ mua
├── product.html    # Chi tiết 1 sản phẩm — Ảnh lớn + mô tả, Nguồn gốc/Cách trồng/Mùa vụ, CTA Zalo/TikTok
├── style.css       # Toàn bộ hệ thống thiết kế dùng chung (màu, font, layout, component)
├── script.js       # Hành vi dùng chung: header scroll, menu mobile, reveal khi cuộn, demo form
└── README.md
```

4 trang HTML dùng chung `style.css` và `script.js` — sửa một nơi, áp dụng toàn site.

## Hệ thống thiết kế đã chọn

- **Màu**: nền giấy kem `#F7F2E9`, chữ/điểm nhấn chính màu xanh lá trầm `#3A4A33` (gợi đất, lá —
  thay cho cam/vàng sôi động ở các bản trước, vì guide yêu cầu tinh thần "chậm, tin tưởng" hơn là
  bán hàng). Đỏ đất `#C2455B` và vàng đất `#C99A3C` chỉ dùng làm điểm nhấn rất tiết chế (icon).
- **Typography**: tiêu đề dùng **Fraunces** (serif, weight nhẹ 300, có chiều sâu); phần thân dùng
  **Inter**. Cỡ chữ tiêu đề rất lớn nhưng mảnh, đúng ghi chú "font mảnh" trong guide.
- **Hình ảnh**: toàn bộ là minh hoạ SVG đường nét đơn sắc (line-art) — cánh hoa, nhánh lá, rau củ,
  người làm vườn — không dùng ảnh chụp, giữ cảm giác tối giản và nhất quán.
- **Tín hiệu riêng (signature)**: motif "cụm hoa — nhánh lá" vẽ một nét, dùng làm watermark mờ ở
  hero và họa tiết trang trí xuyên suốt các trang.

## Cách chạy thử ở máy

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

Hoặc mở trực tiếp `index.html` bằng trình duyệt (vẫn chạy được vì không phụ thuộc backend).

## Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub, ví dụ `soul-flower-site`.
2. Đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "Soul Flower landing site"
   git branch -M main
   git remote add origin https://github.com/<ten-tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
3. Vào **Settings → Pages**, chọn **Branch: main**, folder **/ (root)**, bấm **Save**.
4. Sau ít phút, trang chạy ở `https://<ten-tai-khoan>.github.io/<ten-repo>/`.

## Những nội dung cần thay khi dùng thật

- **Liên kết kênh bán hàng**: nút Zalo / TikTok Shop / Shopee ở `index.html` (section "Bạn có thể
  tìm Soul Flower tại") và `product.html` đang trỏ tới `#` — đổi sang link thật.
- **Form liên hệ** ở `index.html#contact`: hiện chỉ là demo phía client (không gửi email thật).
  Để dùng thật, nối với dịch vụ form (Formspree, Getform...) hoặc backend riêng — xem ghi chú
  trong `script.js`, phần `contactForm`.
- **Danh mục sản phẩm** trong `products.html`: 6 mục đang là nội dung mẫu (rau xanh, trái cây,
  chế biến nhẹ, thảo mộc, rau củ, hạt) — chỉnh tên/mô tả theo sản phẩm thật, và đổi `href` của
  từng thẻ sang trang chi tiết tương ứng (hiện tất cả đều trỏ `product.html`).
- **Trang `product.html`**: là 1 trang mẫu (Rau xanh hữu cơ) — nhân bản file này cho mỗi sản phẩm
  thật (đổi tên file, nội dung, để `products.html` trỏ đúng từng file).
- **Thông tin liên hệ** trong Footer hiện chưa có số điện thoại/email cụ thể — guide không yêu cầu
  hiển thị, nhưng có thể bổ sung nếu cần.

## Tuỳ biến

Mọi biến màu, font, kích thước container đều khai báo trong `:root { ... }` ở đầu `style.css` —
chỉ cần đổi giá trị ở đây để đổi tông màu/cỡ chữ toàn site. Các minh hoạ SVG nằm trong khối
`<symbol>` đầu mỗi trang HTML (ví dụ `#sf-logo`, `#sf-botanical-large`, `#sf-produce-greens`...),
dùng `currentColor` nên đổi màu được qua thuộc tính CSS `color` của thẻ bọc ngoài.
