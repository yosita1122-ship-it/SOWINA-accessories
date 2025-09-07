import React from 'react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavClick = (page: Page) => (e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate(page);
    };

  return (
    <footer className="bg-white border-t sowina-font-sans text-gray-700">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold sowina-font-serif text-[#A67B68] mb-4">SOWINA</h3>
            <p className="max-w-md">เครื่องประดับที่เก็บรักษาความหมายจากธรรมชาติ ทุกชิ้นงานรังสรรค์ด้วยมือและหัวใจ เพื่อเป็นพลังบวกเคียงข้างคุณ</p>
             <div className="mt-6">
                <h4 className="font-semibold mb-2">สมัครรับข่าวสารเพื่อรับส่วนลด 10%</h4>
                <div className="flex">
                    <input type="email" placeholder="อีเมลของคุณ" className="w-full md:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#BF927F]" />
                    <button className="bg-[#A67B68] text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition">สมัคร</button>
                </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">เมนู</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={handleNavClick('Home')} className="hover:text-[#BF927F] transition">หน้าแรก</a></li>
              <li><a href="#" onClick={handleNavClick('Shop')} className="hover:text-[#BF927F] transition">สินค้า</a></li>
              <li><a href="#" onClick={handleNavClick('Workshop')} className="hover:text-[#BF927F] transition">เวิร์คช็อป</a></li>
              <li><a href="#" onClick={handleNavClick('Our Story')} className="hover:text-[#BF927F] transition">เรื่องราวของเรา</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ติดตามเรา</h4>
            <div className="flex space-x-4">
                {/* Social Media Icons */}
            </div>
             <ul className="space-y-2 mt-4">
              <li><a href="#" className="hover:text-[#BF927F] transition">ติดต่อเรา</a></li>
              <li><a href="#" className="hover:text-[#BF927F] transition">คำถามที่พบบ่อย</a></li>
              <li><a href="#" className="hover:text-[#BF927F] transition">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

        </div>
        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SOWINA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
