// ===================================================================
// SOUL FLOWER — Dữ liệu sản phẩm mặc định
// Đây là danh mục khởi tạo (seed data). Trang admin (admin.html) đọc
// và ghi đè dữ liệu này vào localStorage để demo việc thêm/sửa/xoá.
// Ảnh dùng nguồn Unsplash (miễn phí, được phép dùng thương mại).
// ===================================================================

const SOULFLOWER_DEFAULT_PRODUCTS = [
  {
    id: "ca-phe-arabica",
    name: "Cà phê Arabica Cầu Đất",
    category: "Cà phê",
    origin: "Cầu Đất, Lâm Đồng",
    price: "185.000đ / 250g",
    status: "active",
    image: "https://images.unsplash.com/photo-1672851612794-6687bf0bf1a3?q=80&w=900&auto=format&fit=crop",
    description: "Cà phê Arabica trồng dưới tán rừng ở độ cao hơn 1.500m, hái chọn quả chín, phơi tự nhiên trên giàn."
  },
  {
    id: "ca-phe-robusta",
    name: "Cà phê Robusta hữu cơ",
    category: "Cà phê",
    origin: "Cư M'gar, Đắk Lắk",
    price: "150.000đ / 250g",
    status: "active",
    image: "https://images.unsplash.com/photo-1515694590185-73647ba02c10?q=80&w=900&auto=format&fit=crop",
    description: "Robusta vị đậm, trồng theo hướng hữu cơ trên đất đỏ bazan, không dùng thuốc trừ sâu."
  },
  {
    id: "bo-booth",
    name: "Bơ Booth hữu cơ",
    category: "Trái cây",
    origin: "Đắk Mil, Đắk Nông",
    price: "65.000đ / kg",
    status: "active",
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=900&auto=format&fit=crop",
    description: "Bơ Booth dẻo, béo, chín tự nhiên trên cây, thu hoạch theo đúng mùa (tháng 8 - 11)."
  },
  {
    id: "sau-rieng",
    name: "Sầu riêng hữu cơ",
    category: "Trái cây",
    origin: "Đắk Mil, Đắk Nông",
    price: "95.000đ / kg",
    status: "seasonal",
    image: "https://images.unsplash.com/photo-1671624749229-7d37826013b5?q=80&w=900&auto=format&fit=crop",
    description: "Sầu riêng chín cây, không nhúng thuốc, không ép chín — chỉ có theo mùa mỗi năm."
  },
  {
    id: "rau-cai-thao",
    name: "Rau cải thìa hữu cơ",
    category: "Rau củ",
    origin: "Đơn Dương, Lâm Đồng",
    price: "28.000đ / bó",
    status: "active",
    image: "https://images.unsplash.com/photo-1562437243-4117943e59b8?q=80&w=900&auto=format&fit=crop",
    description: "Trồng trên đất được luân canh, không thuốc trừ sâu, thu hoạch trong ngày giao tới khách."
  },
  {
    id: "ca-rot-xa-lach",
    name: "Cà rốt & xà lách theo mùa",
    category: "Rau củ",
    origin: "Đơn Dương, Lâm Đồng",
    price: "32.000đ / túi",
    status: "active",
    image: "https://images.unsplash.com/photo-1679116936383-266087d179ef?q=80&w=900&auto=format&fit=crop",
    description: "Cà rốt và xà lách trồng xen canh, thu hoạch theo lứa, độ ngọt tự nhiên không cần ướp đá."
  },
  {
    id: "mat-ong-rung",
    name: "Mật ong rừng Tây Nguyên",
    category: "Mật ong",
    origin: "Vườn quốc gia Yok Đôn, Đắk Lắk",
    price: "220.000đ / 500ml",
    status: "active",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=900&auto=format&fit=crop",
    description: "Mật ong khai thác từ rừng tự nhiên, không pha trộn, lọc thô để giữ nguyên enzyme và phấn hoa."
  },
  {
    id: "mat-ong-ca-phe",
    name: "Mật ong hoa cà phê",
    category: "Mật ong",
    origin: "Cư M'gar, Đắk Lắk",
    price: "180.000đ / 500ml",
    status: "active",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=900&auto=format&fit=crop",
    description: "Mật ong thu vào đúng mùa hoa cà phê nở, hương thơm đặc trưng, vị ngọt thanh nhẹ."
  },
  {
    id: "ho-tieu-den",
    name: "Hồ tiêu đen hữu cơ",
    category: "Gia vị",
    origin: "Chư Sê, Gia Lai",
    price: "95.000đ / 250g",
    status: "active",
    image: "https://images.unsplash.com/photo-1649952052743-5e8f37c348c5?q=80&w=900&auto=format&fit=crop",
    description: "Tiêu đen hái chọn quả chín, phơi nắng tự nhiên, không xử lý hóa chất bảo quản."
  },
  {
    id: "macca",
    name: "Hạt mắc-ca rang nguyên vỏ",
    category: "Hạt khô",
    origin: "Tuy Đức, Đắk Nông",
    price: "210.000đ / 500g",
    status: "active",
    image: "https://images.unsplash.com/photo-1612506266679-606568a33215?q=80&w=900&auto=format&fit=crop",
    description: "Mắc-ca trồng xen trong vườn cà phê, rang bằng nhiệt thấp để giữ vị béo tự nhiên."
  },
  {
    id: "chanh-day",
    name: "Chanh dây hữu cơ",
    category: "Trái cây",
    origin: "Mang Yang, Gia Lai",
    price: "38.000đ / kg",
    status: "out",
    image: "https://images.unsplash.com/photo-1594921194380-d4d03d481e83?q=80&w=900&auto=format&fit=crop",
    description: "Chanh dây vị chua thanh, trồng theo hướng hữu cơ, hiện đang hết hàng chờ vụ mới."
  },
  {
    id: "khoai-lang-mat",
    name: "Khoai lang mật hữu cơ",
    category: "Rau củ",
    origin: "Đắk Song, Đắk Nông",
    price: "30.000đ / kg",
    status: "new",
    image: "https://images.unsplash.com/photo-1722810767142-6052d3c10d8e?q=80&w=900&auto=format&fit=crop",
    description: "Sản phẩm mới của vụ này — khoai lang mật trồng trên đất đỏ, độ ngọt tự nhiên cao."
  }
];

const SOULFLOWER_STATUS_LABELS = {
  active: { label: "Đang bán", className: "admin-badge--active" },
  out: { label: "Hết hàng", className: "admin-badge--out" },
  seasonal: { label: "Theo mùa", className: "admin-badge--active" },
  new: { label: "Mới", className: "admin-badge--new" }
};

// Trả về danh sách sản phẩm hiện tại: ưu tiên dữ liệu trong localStorage
// (do admin đã chỉnh sửa), nếu chưa có thì dùng danh sách mặc định.
function soulflowerGetProducts() {
  try {
    const raw = localStorage.getItem("soulflower_products");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Không đọc được dữ liệu sản phẩm đã lưu, dùng dữ liệu mặc định.", e);
  }
  // Trả về bản sao (deep copy) để tránh việc chỉnh sửa danh sách trả về
  // làm thay đổi luôn SOULFLOWER_DEFAULT_PRODUCTS gốc trong bộ nhớ.
  return JSON.parse(JSON.stringify(SOULFLOWER_DEFAULT_PRODUCTS));
}

function soulflowerSaveProducts(products) {
  localStorage.setItem("soulflower_products", JSON.stringify(products));
}
