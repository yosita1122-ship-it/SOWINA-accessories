import React, { useState } from 'react';
import { Page, Product } from '../types';
import { BELIEF_CATEGORIES, ICONS, PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import AIStyleAdvisorModal from './AIStyleAdvisorModal';

interface HomePageProps {
  onNavigate: (page: Page, filter?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div className="fade-in">
        {isAiModalOpen && <AIStyleAdvisorModal onClose={() => setIsAiModalOpen(false)} products={PRODUCTS} />}

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center text-center"
        style={{backgroundImage: "url('https://picsum.photos/seed/sowina-hero/1600/900')"}}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl sowina-font-serif mb-4">เครื่องประดับที่เก็บรักษา...<br/>ความหมายจากธรรมชาติ</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto sowina-font-sans mb-8">SOWINA | ทุกชิ้นงานรังสรรค์ด้วยมือและหัวใจ เพื่อเป็นพลังบวกเคียงข้างคุณ</p>
          <button 
            onClick={() => onNavigate('Shop')}
            className="bg-white text-[#A67B68] px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold sowina-font-sans transform hover:scale-105"
          >
            ค้นหาชิ้นที่ใช่สำหรับคุณ
          </button>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sowina-font-serif mb-2">ไม่ใช่แค่เครื่องประดับ</h2>
            <p className="text-gray-600 mb-12">แต่คือสัญลักษณ์แทนตัวตน</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="bg-[#F5EBE0] text-[#A67B68] rounded-full p-4 mb-4">{ICONS.seed}</div>
                    <h3 className="font-semibold text-xl mb-2">จากดอกไม้จริง 100%</h3>
                    <p className="text-gray-500">เราคัดสรรดอกไม้และใบไม้ที่สวยงามและเปี่ยมด้วยความหมาย</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#F5EBE0] text-[#A67B68] rounded-full p-4 mb-4">{ICONS.hand}</div>
                    <h3 className="font-semibold text-xl mb-2">งานฝีมือสุดประณีต</h3>
                    <p className="text-gray-500">ทุกชิ้นงานถูกรังสรรค์ขึ้นอย่างใส่ใจในทุกรายละเอียด</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#F5EBE0] text-[#A67B68] rounded-full p-4 mb-4">{ICONS.star}</div>
                    <h3 className="font-semibold text-xl mb-2">เปี่ยมด้วยความหมายมงคล</h3>
                    <p className="text-gray-500">เป็นเครื่องรางที่งดงามและมอบพลังบวกให้คุณในทุกวัน</p>
                </div>
            </div>
        </div>
      </section>

      {/* Interactive Belief Pillars Section */}
      <section className="py-16 bg-[#FEFBFB]">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sowina-font-serif mb-12">เลือกพลังบวกที่คุณมองหา</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {BELIEF_CATEGORIES.map(belief => (
                    <div 
                        key={belief.key}
                        onClick={() => onNavigate('Shop', belief.key)}
                        className={`p-6 rounded-lg text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 ${belief.color} ${belief.hoverColor}`}
                    >
                        <div className="flex justify-center text-[#A67B68] mb-3">{belief.icon}</div>
                        <h3 className="font-semibold sowina-font-sans text-gray-800">{belief.name}</h3>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
        {/* AI Style Advisor Section */}
        <section 
            className="py-20 bg-cover bg-center text-center"
            style={{backgroundImage: "url('https://picsum.photos/seed/ai-bg/1600/600')"}}
        >
             <div className="container mx-auto px-6 bg-white/80 backdrop-blur-sm py-12 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold sowina-font-serif mb-4 text-[#A67B68]">ค้นหาชิ้นที่ใช่...ด้วย AI</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">ไม่แน่ใจว่าจะเลือกชิ้นไหนดี? ให้ AI Style Advisor ของเราช่วยแนะนำเครื่องประดับที่เหมาะกับสไตล์และโอกาสของคุณที่สุด เพียงอัปโหลดรูปภาพชุดของคุณ!</p>
              <button 
                onClick={() => setIsAiModalOpen(true)}
                className="bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold transform hover:scale-105"
              >
                ลองใช้ AI Style Advisor
              </button>
          </div>
        </section>


      {/* Bestsellers Section */}
      <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sowina-font-serif text-center mb-12">ชิ้นโปรดของชาว SOWINA</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {bestSellers.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onNavigate('Shop')} />
                ))}
            </div>
          </div>
      </section>
      
      {/* Workshop & Custom Order Banner */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
                className="rounded-lg p-12 text-white flex flex-col items-center justify-center text-center bg-cover bg-center"
                style={{backgroundImage: "url('https://picsum.photos/seed/workshop-banner/800/500')"}}
            >
                <div className="bg-black/40 p-8 rounded-lg">
                    <h3 className="text-2xl sowina-font-serif mb-4">สร้างสรรค์เรื่องราวของคุณเอง</h3>
                    <p className="mb-6">มาสร้างเครื่องประดับชิ้นเดียวในโลก ที่มีความหมายพิเศษสำหรับคุณ</p>
                    <button onClick={() => onNavigate('Workshop')} className="bg-white text-[#A67B68] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition">ดูรายละเอียดเวิร์คช็อป</button>
                </div>
            </div>
             <div 
                className="rounded-lg p-12 text-white flex flex-col items-center justify-center text-center bg-cover bg-center"
                style={{backgroundImage: "url('https://picsum.photos/seed/custom-banner/800/500')"}}
            >
                 <div className="bg-black/40 p-8 rounded-lg">
                    <h3 className="text-2xl sowina-font-serif mb-4">ออกแบบความหมาย...ในแบบฉบับของคุณ</h3>
                    <p className="mb-6">มีดอกไม้ในใจ? ให้เราช่วยรังสรรค์ภาพฝันของคุณให้เป็นจริง</p>
                    <button onClick={() => onNavigate('Custom Design')} className="bg-white text-[#A67B68] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition">ปรึกษาเรา</button>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;