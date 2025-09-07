import React from 'react';
import { ICONS } from '../constants';
import { Page } from '../types';

interface OurStoryPageProps {
  onNavigate: (page: Page) => void;
}

const TimelineItem = ({ icon, image, title, children, isLast = false }: { icon: React.ReactNode, image: string, title: string, children: React.ReactNode, isLast?: boolean }) => {
    return (
        <div className="flex items-start">
            <div className="flex flex-col items-center mr-6">
                <div className="bg-[#F5EBE0] text-[#A67B68] rounded-full p-3 border-2 border-white shadow-md">
                    {icon}
                </div>
                {!isLast && <div className="w-px h-full bg-gray-200 mt-2"></div>}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex-1 flex-shrink-0 fade-in">
                <div className="flex items-start gap-4">
                    <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                        <h4 className="font-bold text-xl mb-2 sowina-font-serif">{title}</h4>
                        <p className="text-gray-600">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="fade-in">
      <section 
        className="relative bg-cover bg-center text-white text-center py-32 px-6" 
        style={{backgroundImage: "url('https://picsum.photos/seed/story-hero/1600/500')"}}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl sowina-font-serif mb-4">เรื่องราวที่ร้อยเรียงจากกลีบดอกไม้</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto sowina-font-sans">SOWINA ไม่ได้เริ่มต้นจากการเป็นธุรกิจ แต่เริ่มต้นจากความเชื่อที่ว่า...พลังจากธรรมชาติสามารถเป็นเครื่องนำทางและมอบกำลังใจให้เราได้ในทุกวัน</p>
        </div>
      </section>

      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                      <h2 className="text-3xl font-bold sowina-font-serif mb-4 text-[#A67B68]">จากใจผู้ก่อตั้ง</h2>
                      <p className="text-gray-600 mb-4 sowina-font-sans">
                          "สวัสดีค่ะ... SOWINA เกิดจากความรักในธรรมชาติ และความปรารถนาส่วนตัวที่อยากจะมีเครื่องรางนำโชคที่ไม่ได้ดูขลังจนเกินไป แต่สามารถเป็นเครื่องประดับสวยๆ ที่เข้ากับการแต่งตัวในชีวิตประจำวันได้ค่ะ จากจุดนั้นเอง แรงบันดาลใจในการนำความงามของดอกไม้จริงมาผนวกเข้ากับความเชื่อ จึงได้ถือกำเนิดขึ้นมาเป็น SOWINA เราหวังว่าเครื่องประดับทุกชิ้นจากเราจะเป็นเหมือนเพื่อนสนิทที่คอยมอบพลังบวกและเตือนให้คุณเห็นความงดงามในตัวเองเสมอ"
                      </p>
                      <p className="text-gray-600 sowina-font-sans">
                          "เราเชื่อว่าทุกคนมีความสวยงามในแบบของตัวเอง และเครื่องประดับของเราเป็นเพียงส่วนเล็กๆ ที่จะช่วยสะท้อนความงามนั้นออกมา ขอบคุณที่ให้ SOWINA เป็นส่วนหนึ่งในการเดินทางของคุณนะคะ"
                      </p>
                  </div>
                  <div className="order-1 md:order-2">
                      <img src="https://picsum.photos/seed/founder/600/700" alt="Founder of SOWINA" className="rounded-lg shadow-xl" />
                  </div>
              </div>
          </div>
      </section>

      <section className="py-20 bg-[#FEFBFB]">
          <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="text-3xl font-bold text-center mb-12 sowina-font-serif">การเดินทางของ SOWINA</h2>
              <div>
                  <TimelineItem icon={ICONS.seed} image="https://picsum.photos/seed/sketch/200/200" title="จุดเริ่มต้น">
                    จากความหลงใหลใน 'ภาษาดอกไม้' และการมองหาเครื่องประดับที่ 'มีความหมาย' มากกว่าความสวยงาม
                  </TimelineItem>
                  <TimelineItem icon={ICONS.hand} image="https://picsum.photos/seed/crafting/200/200" title="การรังสรรค์">
                    สู่การค้นคว้าและทดลองนับครั้งไม่ถ้วน เพื่อให้ได้เทคนิคการเคลือบเรซิ่นที่คงความงามของดอกไม้จริงไว้ได้ดีที่สุด
                  </TimelineItem>
                  <TimelineItem icon={ICONS.star} image="https://picsum.photos/seed/flatlay/200/200" title="กำเนิดความหมาย">
                    และแล้ว SOWINA ก็ถือกำเนิดขึ้น พร้อมแก่นความเชื่อ 5 ประการ ที่จะเป็นพลังนำทางให้ผู้สวมใส่
                  </TimelineItem>
                   <TimelineItem icon={ICONS.heart} image="https://picsum.photos/seed/community/200/200" title="สู่ครอบครัวของเรา" isLast={true}>
                    วันนี้...เรื่องราวของเราคือเรื่องราวของคุณ ขอบคุณที่ร่วมเป็นส่วนหนึ่งของครอบครัว SOWINA
                  </TimelineItem>
              </div>
          </div>
      </section>

      <section className="py-20 bg-white text-center" style={{backgroundImage: "url('https://picsum.photos/seed/flower-blur/1600/400')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto px-6 bg-white/70 backdrop-blur-sm py-10 rounded-xl">
              <h2 className="text-3xl font-bold sowina-font-serif mb-4">ทุกชิ้นงานคือหนึ่งในเรื่องราวของเรา...</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">ให้ SOWINA ร่วมเป็นส่วนหนึ่งในเรื่องราวของคุณ</p>
              <button 
                onClick={() => onNavigate('Shop')}
                className="bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold"
              >
                เลือกซื้อสินค้าของเรา
              </button>
          </div>
      </section>
    </div>
  );
};

export default OurStoryPage;