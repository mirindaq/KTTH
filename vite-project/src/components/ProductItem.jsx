import React from "react";

const ProductItem = ({ product, handleDelete }) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td className="border px-4 py-2">{product.name}</td>
      <td className="border px-4 py-2">{product.price.toLocaleString()} đ</td>
      <td className="border px-4 py-2">{product.category}</td>
      <td className="border px-4 py-2">
        {product.stock > 0 ? (
          <span className="text-green-600 font-semibold">{product.stock}</span>
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
  );
};

export default ProductItem;
