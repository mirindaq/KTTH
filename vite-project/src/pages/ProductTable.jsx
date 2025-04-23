import React, { useState } from "react";

const ProductTable = ({ products, setProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho ô tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(products); // State chứa sản phẩm đã lọc

  // Hàm thay đổi input khi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Lưu từ khóa tìm kiếm
  };

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

  // Hàm tìm kiếm khi nhấn nút "Tìm kiếm"
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(
      (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Ô tìm kiếm */}
      <form onSubmit={handleSearch}>
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tìm sản phẩm theo tên"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded-md w-4/5"
          />
          <button
            onClick={handleSearch} // Gọi hàm tìm kiếm khi nhấn nút
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Tìm kiếm
          </button>
        </div>
      </form>

      {/* Form */}
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
          placeholder="Link hinh"
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
