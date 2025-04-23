import React, { useState, useEffect } from "react";

const ProductTable = ({ products, setProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm theo tên
  const [categoryFilter, setCategoryFilter] = useState(""); // Lọc theo danh mục
  const [filteredProducts, setFilteredProducts] = useState(products); // Sản phẩm đã lọc

  // Hàm thay đổi khi người dùng nhập vào ô tìm kiếm tên
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm theo tên
  };

  // Hàm thay đổi khi người dùng chọn danh mục
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value); // Cập nhật danh mục đã chọn
  };

  // Hàm để lọc sản phẩm theo tên và danh mục
  const filterProducts = () => {
    let filtered = products;

    // Lọc theo tên (không phân biệt hoa thường)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (categoryFilter) {
      filtered = filtered.filter((product) =>
        product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
  };

  // Sử dụng useEffect để tự động gọi filter mỗi khi thay đổi tìm kiếm hoặc danh mục
  useEffect(() => {
    filterProducts(); // Mỗi khi `searchTerm` hoặc `categoryFilter` thay đổi, gọi lại hàm lọc
  }, [searchTerm, categoryFilter, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.stock ||
      !formData.image
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.image,
    };

    setProducts((prev) => [...prev, newProduct]);

    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?"
    );
    if (confirmDelete) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Tìm kiếm theo tên */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm sản phẩm theo tên"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>

      {/* Lọc theo danh mục */}
      <div className="mb-6">
        <label htmlFor="categoryFilter" className="block mb-2 font-medium">
          Lọc theo danh mục
        </label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded-md w-full"
        >
          <option value="">Tất cả</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Gia dụng">Gia dụng</option>
          {/* Thêm các danh mục khác nếu cần */}
        </select>
      </div>

      {/* Form thêm sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          value={formData.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="number"
          name="stock"
          placeholder="Tồn kho"
          value={formData.stock}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="image"
          placeholder="Link hình"
          value={formData.image}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <button
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-6 transition"
      >
        Thêm sản phẩm
      </button>

      {/* Bảng sản phẩm */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Ảnh</th>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Giá</th>
            <th className="border px-4 py-2">Danh mục</th>
            <th className="border px-4 py-2">Tồn kho</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  {product.price.toLocaleString()} đ
                </td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">
                      {product.stock}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Hết hàng</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">
                Không tìm thấy sản phẩm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
