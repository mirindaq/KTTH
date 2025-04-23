import React from "react";

const ProductTable = ({ products,setProducts }) => {

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (confirmDelete) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };


  return (
    <table className="min-w-full table-auto border-collapse rounded-md shadow-sm overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          <th className="px-4 py-3 border">STT</th>
          <th className="px-4 py-3 border">Hình ảnh</th>
          <th className="px-4 py-3 border">Tên sản phẩm</th>
          <th className="px-4 py-3 border">Giá</th>
          <th className="px-4 py-3 border">Danh mục</th>
          <th className="px-4 py-3 border">Tồn kho</th>
          <th className="px-4 py-3 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 border">{index + 1}</td>
            <td className="px-4 py-3 border">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
            </td>
            <td className="px-4 py-3 border">{product.name}</td>
            <td className="px-4 py-3 border text-green-600 font-semibold">
              {product.price.toLocaleString("vi-VN")} đ
            </td>
            <td className="px-4 py-3 border">{product.category}</td>
            <td
              className={`px-4 py-3 border font-medium ${
                product.stock === 0 ? "text-red-500" : ""
              }`}
            >
              {product.stock === 0 ? "Hết hàng" : product.stock}
            </td>
            <td className="px-4 py-3 border">
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition duration-150"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
