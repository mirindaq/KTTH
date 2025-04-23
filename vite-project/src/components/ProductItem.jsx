// ProductItem.jsx
import React from "react";

const ProductItem = ({ product, handleDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      <td className="px-4 py-4 font-semibold">{product.name}</td>
      <td className="px-4 py-4">{product.price.toLocaleString()} đ</td>
      <td className="px-4 py-4">{product.category}</td>
      <td className="px-4 py-4">
        {product.stock > 0 ? (
          <span className="text-green-600 font-semibold">{product.stock}</span>
        ) : (
          <span className="text-red-500 font-semibold">Hết hàng</span>
        )}
      </td>
      <td className="px-4 py-4">
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
