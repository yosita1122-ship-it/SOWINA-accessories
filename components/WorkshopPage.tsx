import React, { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-center py-4 focus:outline-none"
            >
                <span className="font-semibold text-lg">{question}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="pb-4 text-gray-600">{answer}</div>}
        </div>
    );
};


const WorkshopPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const availableSlots = [5, 6, 12, 13, 19, 20, 26, 27];

  return (
    <div className="fade-in">
      <section 
        className="relative bg-cover bg-center text-white text-center py-32 px-6" 
        style={{backgroundImage: "url('https://picsum.photos/seed/workshop-hero/1600/500')"}}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl sowina-font-serif mb-4">SOWINA Workshop</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto sowina-font-sans">สร้างสรรค์เครื่องประดับดอกไม้ชิ้นเดียวในโลก...ด้วยมือของคุณ</p>
        </div>
      </section>

      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl font-bold sowina-font-serif mb-4 text-[#A67B68]">สิ่งที่คุณจะได้รับจากเวิร์คช็อป</h2>
                      <p className="text-gray-600 mb-6 sowina-font-sans">
                         เข้าร่วมประสบการณ์สุดพิเศษที่คุณจะได้เรียนรู้เทคนิคการเก็บรักษาดอกไม้ด้วยเรซิ่น ตั้งแต่การเลือกดอกไม้, การผสมเรซิ่น, ไปจนถึงการประกอบเป็นเครื่องประดับที่สวยงาม ไม่จำเป็นต้องมีพื้นฐานมาก่อน เราเตรียมอุปกรณ์ทุกอย่างไว้ให้คุณแล้ว!
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>อุปกรณ์และดอกไม้คุณภาพพรีเมียม</li>
                          <li>เรียนรู้เทคนิคจากช่างฝีมือผู้เชี่ยวชาญ</li>
                          <li>สร้างสรรค์เครื่องประดับ (เช่น สร้อยคอหรือแหวน) 1 ชิ้นกลับบ้าน</li>
                          <li>รับการ์ดความหมายของดอกไม้ที่คุณเลือก</li>
                          <li>เครื่องดื่มและของว่างแสนอร่อย</li>
                      </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <img src="https://picsum.photos/seed/ws-gallery1/400/500" alt="Workshop atmosphere" className="rounded-lg shadow-lg" />
                      <img src="https://picsum.photos/seed/ws-gallery2/400/500" alt="Crafting jewelry" className="rounded-lg shadow-lg mt-8" />
                  </div>
              </div>
          </div>
      </section>
      
      <section className="py-20 bg-[#FEFBFB]">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center sowina-font-serif mb-12">จองที่นั่งของคุณ</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Calendar */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <button>&lt;</button>
                        <h3 className="font-bold text-xl">{today.toLocaleString('th-TH', { month: 'long', year: 'numeric' })}</h3>
                        <button>&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => <div key={day} className="font-semibold text-sm text-gray-500">{day}</div>)}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {Array.from({ length: daysInMonth }).map((_, day) => {
                            const date = day + 1;
                            const isAvailable = availableSlots.includes(date);
                            const isSelected = selectedDate === date;
                            return (
                                <button
                                    key={date}
                                    onClick={() => isAvailable && setSelectedDate(date)}
                                    disabled={!isAvailable}
                                    className={`w-10 h-10 rounded-full transition-colors ${
                                        isSelected ? 'bg-[#A67B68] text-white' : 
                                        isAvailable ? 'bg-[#F5EBE0] text-[#A67B68] hover:bg-[#EADFD5]' : 'text-gray-300'
                                    }`}
                                >
                                    {date}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* Booking Info */}
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold sowina-font-serif mb-4">รายละเอียดการจอง</h3>
                    <p className="text-xl text-gray-800 mb-4">ราคา: <span className="font-bold text-[#A67B68]">1,190 บาท</span> / ท่าน</p>
                    {selectedDate ? (
                        <div className="bg-green-100 p-4 rounded-lg">
                            <p className="font-semibold">คุณเลือกวันที่: {selectedDate} {today.toLocaleString('th-TH', { month: 'long', year: 'numeric' })}</p>
                            <p>รอบเวลา: 13:00 - 16:00 น.</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">กรุณาเลือกวันที่ว่าง (สีเบจ) จากปฏิทิน</p>
                    )}
                    <button 
                        disabled={!selectedDate}
                        onClick={() => alert(`คุณได้ทำการจองเวิร์คช็อปวันที่ ${selectedDate} เรียบร้อยแล้ว!`)}
                        className="bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold mt-6 disabled:bg-gray-300"
                    >
                        ยืนยันการจอง
                    </button>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="text-3xl font-bold text-center sowina-font-serif mb-12">คำถามที่พบบ่อย</h2>
              <FAQItem
                  question="ต้องเตรียมอะไรมาบ้าง?"
                  answer="ไม่ต้องเตรียมอะไรมาเลยค่ะ! SOWINA ได้เตรียมอุปกรณ์ทุกอย่างไว้ให้คุณแล้ว ทั้งดอกไม้ เรซิ่น แม่พิมพ์ และอุปกรณ์ตกแต่งอื่นๆ แค่เตรียมหัวใจที่พร้อมจะสร้างสรรค์ผลงานมาก็พอค่ะ"
              />
              <FAQItem
                  question="เวิร์คช็อปใช้เวลานานเท่าไหร่?"
                  answer="เวิร์คช็อปของเราใช้เวลาประมาณ 2.5 - 3 ชั่วโมงค่ะ ซึ่งรวมเวลาในการแนะนำ, เลือกดอกไม้, ลงมือทำ, และรอให้เรซิ่นเซ็ตตัวเบื้องต้น"
              />
              <FAQItem
                  question="สามารถพาเพื่อนมาด้วยได้ไหม?"
                  answer="ได้แน่นอนค่ะ! เราสนับสนุนให้คุณชวนเพื่อน, คนรัก, หรือคนในครอบครัวมาใช้เวลาสร้างสรรค์ร่วมกัน สามารถจองหลายที่นั่งพร้อมกันได้เลยค่ะ"
              />
          </div>
      </section>
    </div>
  );
};

export default WorkshopPage;