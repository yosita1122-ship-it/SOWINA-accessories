import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <h3 className="mt-4 font-semibold text-md text-gray-800 truncate">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.price} บาท</p>
    </div>
  );
};

export default ProductCard;