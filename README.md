# Soul Flower — Landing site + Trang quản trị (Cập nhật v2)

Bản cập nhật của bộ landing page Soul Flower, theo 3 thay đổi chính:

1. **Dùng ảnh chụp thật** (nguồn Unsplash, miễn phí, được phép dùng thương mại, không cần ghi
   công) thay cho minh hoạ SVG ở các bản trước — cho hero, triết lý, câu chuyện nông trại và toàn
   bộ ảnh sản phẩm.
2. **Mở rộng danh mục sản phẩm** lên 12 mặt hàng organic, khai thác từ các nông trại vùng Tây
   Nguyên (Lâm Đồng, Đắk Lắk, Đắk Nông, Gia Lai): cà phê, trái cây, rau củ, mật ong, gia vị, hạt khô.
3. **Thêm trang quản trị** (`admin.html`) để quản lý sản phẩm (thêm/sửa/xoá) và xem lời nhắn liên
   hệ khách gửi từ trang chủ — dữ liệu lưu trong `localStorage` của trình duyệt (bản demo, **chưa
   có backend/database thật**).

## Cấu trúc dự án

```
.
├── index.html         # Trang chủ — hero ảnh thật, sản phẩm nổi bật load động (3 sản phẩm đầu)
├── about.html          # Về chúng tôi — ảnh thật cho hero và các section
├── products.html       # Danh mục đầy đủ 12 sản phẩm, có bộ lọc theo loại
├── product.html        # Trang chi tiết — đọc ?id=... trên URL để hiển thị đúng sản phẩm
├── admin.html           # Trang quản trị: Tổng quan / Sản phẩm (CRUD) / Lời nhắn liên hệ
├── products-data.js    # Dữ liệu 12 sản phẩm mặc định + hàm đọc/ghi localStorage (dùng chung)
├── admin.js            # Toàn bộ logic của trang quản trị
├── script.js           # Hành vi chung: header scroll, menu mobile, reveal, lưu form liên hệ
├── style.css            # Hệ thống thiết kế dùng chung (đã thêm style cho ảnh thật + trang admin)
└── README.md
```

## Cách chạy thử ở máy

Vì trang giờ dùng `fetch`/script động để đọc dữ liệu sản phẩm, nên **cần chạy qua một server tĩnh**
(mở trực tiếp bằng `file://` có thể bị một số trình duyệt chặn script):

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## Trang quản trị hoạt động ra sao

Mở `admin.html` (hoặc bấm "Quản trị" ở footer mọi trang). Có 3 mục:

- **Tổng quan**: số liệu nhanh (tổng sản phẩm, đang bán/mới, số lời nhắn).
- **Sản phẩm**: bảng danh sách, có thể Thêm / Sửa / Xoá từng sản phẩm qua modal, tìm theo tên hoặc
  loại, và nút "Khôi phục danh mục mặc định" để xoá hết thay đổi và quay về 12 sản phẩm gốc.
- **Lời nhắn liên hệ**: hiển thị các lời nhắn khách đã gửi qua form ở trang chủ (mục "Kết nối").

**Quan trọng — đây là demo phía trình duyệt, không có backend thật:**
- Mọi thay đổi (thêm/sửa/xoá sản phẩm, lời nhắn liên hệ) chỉ lưu trong `localStorage` của trình
  duyệt đang dùng. Mở bằng trình duyệt khác, máy khác, hoặc xoá dữ liệu trình duyệt sẽ mất hết.
- Trang quản trị **không có đăng nhập/bảo mật** — bất kỳ ai biết URL `/admin.html` đều vào được.
  Nếu triển khai thật, cần thêm xác thực (đăng nhập) và một backend/database thật để lưu dữ liệu
  an toàn, dùng chung được giữa nhiều người và nhiều thiết bị.
- Trang chủ và trang sản phẩm đọc dữ liệu từ cùng `localStorage` này — nên nếu bạn thêm sản phẩm
  mới trong admin, nó sẽ xuất hiện ngay ở `products.html` (cùng trình duyệt, cùng máy).

## Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub (ví dụ `soul-flower-site`).
2. Đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "Soul Flower landing site + admin (v2: anh thuc, danh muc Tay Nguyen)"
   git branch -M main
   git remote add origin https://github.com/<ten-tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
3. Vào **Settings → Pages**, chọn **Branch: main**, folder **/ (root)**, bấm **Save**.
4. Sau ít phút, trang chạy ở `https://<ten-tai-khoan>.github.io/<ten-repo>/`.

   Lưu ý: GitHub Pages cũng là static hosting (không có backend), nên trang quản trị vẫn chỉ lưu
   dữ liệu cục bộ trong trình duyệt người xem — phù hợp để demo giao diện, chưa phù hợp để vận
   hành thật nhiều người dùng chung.

## Những nội dung cần thay khi dùng thật

- **Ảnh sản phẩm và hero**: hiện dùng ảnh stock Unsplash mang tính minh hoạ — khi có ảnh chụp thật
  từ nông trại của bạn, thay trực tiếp URL trong `products-data.js` (trường `image`) hoặc qua
  form trong trang quản trị.
- **Liên kết kênh bán hàng**: Zalo / TikTok Shop / Shopee ở `index.html` và `product.html` đang
  trỏ `#` — đổi sang link thật.
- **Form liên hệ**: hiện chỉ lưu vào `localStorage`, không gửi email thật. Cần nối với dịch vụ
  form (Formspree, Getform...) hoặc backend riêng khi triển khai chính thức.
- **Bảo mật trang quản trị**: thêm cơ chế đăng nhập (hoặc đặt sau một backend có xác thực) trước
  khi public — hiện tại không có bất kỳ rào chắn nào.
- **Giá và thông tin sản phẩm**: 12 sản phẩm trong `products-data.js` là dữ liệu mẫu (giá, vùng
  trồng, mô tả) — cập nhật theo thực tế nông trại của bạn.

## Hệ thống thiết kế (không đổi so với bản trước)

Màu, font và biến CSS vẫn khai báo trong `:root { ... }` ở đầu `style.css`. Tông màu chính: nền
giấy kem (`--paper`), chữ/điểm nhấn xanh lá trầm (`--moss`), điểm nhấn phụ đỏ đất (`--clay`) và
vàng đất (`--gold`). Phần mới thêm cho trang quản trị nằm ở cuối file `style.css`, dưới khối
comment `admin.html — trang quản trị`.
