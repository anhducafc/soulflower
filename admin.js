// ===================================================================
// SOUL FLOWER — Logic trang quản trị (admin.html)
// Toàn bộ dữ liệu lưu trong localStorage của trình duyệt — đây là
// bản demo giao diện quản trị, KHÔNG có backend/database thật.
// ===================================================================
(function () {
  "use strict";

  var state = {
    products: soulflowerGetProducts(),
    messages: [],
    editingId: null,
    search: ""
  };

  function loadMessages() {
    try {
      var raw = localStorage.getItem("soulflower_messages");
      state.messages = raw ? JSON.parse(raw) : [];
    } catch (e) {
      state.messages = [];
    }
  }

  function persistProducts() {
    soulflowerSaveProducts(state.products);
  }

  function formatDate(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return iso;
    }
  }

  // ============ Điều hướng giữa các tab ============
  function setupNav() {
    var navButtons = document.querySelectorAll(".admin-nav button");
    var views = document.querySelectorAll(".admin-view");
    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-view");
        navButtons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        views.forEach(function (v) { v.classList.toggle("is-active", v.id === target); });
      });
    });
  }

  // ============ Tổng quan ============
  function renderOverview() {
    document.getElementById("statTotalProducts").textContent = state.products.length;
    document.getElementById("statActiveProducts").textContent = state.products.filter(function (p) { return p.status === "active" || p.status === "new"; }).length;
    document.getElementById("statMessages").textContent = state.messages.length;
  }

  // ============ Bảng sản phẩm ============
  function renderProductTable() {
    var tbody = document.getElementById("productTableBody");
    var filtered = state.products.filter(function (p) {
      return p.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
             p.category.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      document.getElementById("productEmptyState").style.display = "block";
      return;
    }
    document.getElementById("productEmptyState").style.display = "none";

    tbody.innerHTML = filtered.map(function (p) {
      var statusInfo = SOULFLOWER_STATUS_LABELS[p.status] || { label: p.status, className: "admin-badge--active" };
      return (
        '<tr>' +
          '<td><img src="' + p.image + '" alt="' + p.name + '"></td>' +
          '<td><div class="admin-table__name">' + p.name + '</div><div class="admin-table__meta">' + p.origin + '</div></td>' +
          '<td>' + p.category + '</td>' +
          '<td>' + p.price + '</td>' +
          '<td><span class="admin-badge ' + statusInfo.className + '">' + statusInfo.label + '</span></td>' +
          '<td>' +
            '<div class="admin-row-actions">' +
              '<button class="admin-icon-btn" data-action="edit" data-id="' + p.id + '" aria-label="Sửa sản phẩm">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/></svg>' +
              '</button>' +
              '<button class="admin-icon-btn admin-icon-btn--danger" data-action="delete" data-id="' + p.id + '" aria-label="Xoá sản phẩm">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-7 0 1 13h6l1-13"/></svg>' +
              '</button>' +
            '</div>' +
          '</td>' +
        '</tr>'
      );
    }).join("");

    tbody.querySelectorAll('[data-action="edit"]').forEach(function (btn) {
      btn.addEventListener("click", function () { openProductModal(btn.getAttribute("data-id")); });
    });
    tbody.querySelectorAll('[data-action="delete"]').forEach(function (btn) {
      btn.addEventListener("click", function () { handleDeleteProduct(btn.getAttribute("data-id")); });
    });
  }

  function handleDeleteProduct(id) {
    var product = state.products.find(function (p) { return p.id === id; });
    if (!product) return;
    var confirmed = window.confirm('Xoá sản phẩm "' + product.name + '"? Hành động này không thể hoàn tác.');
    if (!confirmed) return;
    state.products = state.products.filter(function (p) { return p.id !== id; });
    persistProducts();
    renderProductTable();
    renderOverview();
  }

  // ============ Modal thêm / sửa sản phẩm ============
  var modalBackdrop = document.getElementById("productModalBackdrop");
  var modalForm = document.getElementById("productForm");

  function openProductModal(id) {
    state.editingId = id || null;
    var isEdit = !!id;
    document.getElementById("productModalTitle").textContent = isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới";

    var product = isEdit ? state.products.find(function (p) { return p.id === id; }) : null;
    modalForm.elements.name.value = product ? product.name : "";
    modalForm.elements.category.value = product ? product.category : "";
    modalForm.elements.origin.value = product ? product.origin : "";
    modalForm.elements.price.value = product ? product.price : "";
    modalForm.elements.status.value = product ? product.status : "active";
    modalForm.elements.image.value = product ? product.image : "";
    modalForm.elements.description.value = product ? product.description : "";

    modalBackdrop.classList.add("is-open");
  }

  function closeProductModal() {
    modalBackdrop.classList.remove("is-open");
    state.editingId = null;
    modalForm.reset();
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || ("sp-" + Date.now());
  }

  function handleProductFormSubmit(e) {
    e.preventDefault();
    var formData = new FormData(modalForm);
    var name = formData.get("name").trim();
    var data = {
      name: name,
      category: formData.get("category").trim(),
      origin: formData.get("origin").trim(),
      price: formData.get("price").trim(),
      status: formData.get("status"),
      image: formData.get("image").trim() || "https://images.unsplash.com/photo-1562437243-4117943e59b8?q=80&w=900&auto=format&fit=crop",
      description: formData.get("description").trim()
    };

    if (state.editingId) {
      state.products = state.products.map(function (p) {
        return p.id === state.editingId ? Object.assign({}, p, data) : p;
      });
    } else {
      data.id = slugify(name);
      // Đảm bảo id không trùng
      var suffix = 1;
      var baseId = data.id;
      while (state.products.some(function (p) { return p.id === data.id; })) {
        data.id = baseId + "-" + suffix;
        suffix++;
      }
      state.products.push(data);
    }

    persistProducts();
    closeProductModal();
    renderProductTable();
    renderOverview();
  }

  // ============ Lời nhắn liên hệ ============
  function renderMessages() {
    var wrap = document.getElementById("messagesList");
    if (state.messages.length === 0) {
      wrap.innerHTML = '<div class="admin-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16v12H4V6Zm0 0 8 7 8-7"/></svg><p>Chưa có lời nhắn nào. Khi khách điền form ở trang chủ, lời nhắn sẽ hiện ở đây.</p></div>';
      return;
    }
    wrap.innerHTML = state.messages.map(function (m) {
      return (
        '<div class="admin-message-card">' +
          '<div class="admin-message-card__head">' +
            '<span class="admin-message-card__name">' + m.name + '</span>' +
            '<span class="admin-message-card__date">' + formatDate(m.date) + '</span>' +
          '</div>' +
          '<div class="admin-message-card__contact">' + m.contact + '</div>' +
          '<div class="admin-message-card__body">' + m.message + '</div>' +
        '</div>'
      );
    }).join("");
  }

  // ============ Khởi tạo ============
  function init() {
    loadMessages();
    setupNav();
    renderOverview();
    renderProductTable();
    renderMessages();

    document.getElementById("addProductBtn").addEventListener("click", function () { openProductModal(null); });
    document.getElementById("closeModalBtn").addEventListener("click", closeProductModal);
    document.getElementById("cancelModalBtn").addEventListener("click", closeProductModal);
    modalBackdrop.addEventListener("click", function (e) {
      if (e.target === modalBackdrop) closeProductModal();
    });
    modalForm.addEventListener("submit", handleProductFormSubmit);

    document.getElementById("productSearch").addEventListener("input", function (e) {
      state.search = e.target.value;
      renderProductTable();
    });

    document.getElementById("resetDataBtn").addEventListener("click", function () {
      var confirmed = window.confirm("Khôi phục danh mục sản phẩm về mặc định? Mọi thay đổi bạn đã lưu sẽ mất.");
      if (!confirmed) return;
      localStorage.removeItem("soulflower_products");
      state.products = soulflowerGetProducts();
      renderProductTable();
      renderOverview();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
