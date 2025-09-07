import React, { useState, useEffect } from 'react';
import { Product, Page } from '../types';
import ProductCard from './ProductCard';
import { beliefThaiMap } from '../constants';

interface ShopPageProps {
  products: Product[];
  initialFilter: string | null;
  onNavigate: (page: Page) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, initialFilter, onNavigate }) => {
  const [filter, setFilter] = useState<string | null>(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);
  
  const filteredProducts = filter ? products.filter(p => beliefThaiMap[filter] === p.belief) : products;

  const clearFilter = () => {
    setFilter(null);
    // Optionally, you can call onNavigate to reset the URL state if you were using query params
  };

  return (
    <div className="container mx-auto px-6 py-12 fade-in">
      <h1 className="text-4xl font-bold text-center sowina-font-serif mb-2">สินค้าของเรา</h1>
      <p className="text-center text-gray-500 mb-10">ค้นหาเครื่องประดับที่ใช่สำหรับคุณ</p>

      {filter && (
        <div className="text-center mb-8 bg-[#F5EBE0] p-4 rounded-lg">
          <p className="text-gray-800">
            กำลังแสดงสินค้าสำหรับ: <span className="font-semibold text-[#A67B68]">{beliefThaiMap[filter]}</span>
          </p>
          <button 
            onClick={clearFilter} 
            className="mt-2 text-sm text-gray-500 hover:text-gray-800"
          >
            (ดูสินค้าทั้งหมด)
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => console.log(`View product ${product.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;