import React, { useState } from 'react';
import { CUSTOM_DESIGN_FLOWERS, JEWELRY_TYPES, METAL_COLORS } from '../constants';

const CustomDesignPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        type: null as typeof JEWELRY_TYPES[0] | null,
        flower: null as typeof CUSTOM_DESIGN_FLOWERS[0] | null,
        metal: null as typeof METAL_COLORS[0] | null,
    });

    const handleSelect = (category: 'type' | 'flower' | 'metal', value: any) => {
        setSelections(prev => ({ ...prev, [category]: value }));
        if (step < 3) {
            setTimeout(() => setStep(s => s + 1), 300);
        }
    };

  return (
    <div className="fade-in">
        <section 
            className="relative bg-cover bg-center text-white text-center py-32 px-6" 
            style={{backgroundImage: "url('https://picsum.photos/seed/custom-hero/1600/500')"}}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl sowina-font-serif mb-4">SOWINA Design Studio</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto sowina-font-sans">รังสรรค์เครื่องประดับในฝัน...ให้เป็นจริง</p>
            </div>
        </section>

        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Designer Steps */}
                    <div className="sowina-font-sans">
                        {/* Step 1 */}
                        <div className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                            <h2 className="text-2xl sowina-font-serif mb-4 text-[#A67B68]">ขั้นตอนที่ 1: เลือกรูปแบบเครื่องประดับ</h2>
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                {JEWELRY_TYPES.map(type => (
                                    <div key={type.name} onClick={() => handleSelect('type', type)} className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${selections.type?.name === type.name ? 'border-[#A67B68] ring-2 ring-[#A67B68]' : 'border-gray-200'}`}>
                                        <img src={type.image} alt={type.name} className="w-full h-32 object-cover rounded-md mb-2"/>
                                        <h3 className="font-semibold text-center">{type.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className={`mt-8 transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                             <h2 className="text-2xl sowina-font-serif mb-4 text-[#A67B68]">ขั้นตอนที่ 2: เลือกดอกไม้และความหมาย</h2>
                             <div className="grid grid-cols-3 gap-4">
                                {CUSTOM_DESIGN_FLOWERS.map(flower => (
                                    <div key={flower.name} onClick={() => step >= 2 && handleSelect('flower', flower)} className={`border-2 p-2 rounded-lg transition-all ${step < 2 ? 'cursor-not-allowed' : 'cursor-pointer'} ${selections.flower?.name === flower.name ? 'border-[#A67B68] ring-2 ring-[#A67B68]' : 'border-gray-200'}`}>
                                        <img src={flower.image} alt={flower.name} className="w-full h-24 object-cover rounded-md mb-2"/>
                                        <h3 className="font-semibold text-sm text-center">{flower.name}</h3>
                                        <p className="text-xs text-gray-500 text-center">({flower.belief})</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className={`mt-8 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                             <h2 className="text-2xl sowina-font-serif mb-4 text-[#A67B68]">ขั้นตอนที่ 3: เลือกสีโลหะ</h2>
                             <div className="flex space-x-4">
                                {METAL_COLORS.map(metal => (
                                    <div key={metal.name} onClick={() => step >= 3 && handleSelect('metal', metal)} className={`flex-1 p-4 rounded-lg transition-all text-center ${step < 3 ? 'cursor-not-allowed' : 'cursor-pointer'} ${selections.metal?.name === metal.name ? 'ring-2 ring-offset-2 ring-[#A67B68]' : ''}`} style={{backgroundColor: metal.color}}>
                                        <span className="font-semibold mix-blend-difference text-white">{metal.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="sticky top-24 h-fit bg-[#FEFBFB] p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl sowina-font-serif mb-6">ภาพผลงานของคุณ</h2>
                        <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {selections.type && <img src={selections.type.image} alt="Jewelry type" className="absolute inset-0 w-full h-full object-cover z-0"/>}
                            {selections.flower && <img src={selections.flower.image} alt="Flower" className="w-1/2 h-1/2 object-contain z-10 transition-transform duration-300 transform scale-100"/>}
                             {selections.metal && <div className="absolute inset-0 z-20 mix-blend-hue" style={{ backgroundColor: selections.metal.color, opacity: 0.5 }}></div>}
                             {!selections.type && <p className="text-gray-500 z-30">เริ่มต้นออกแบบได้เลย!</p>}
                        </div>
                        <div className="mt-6 text-left">
                            <h3 className="font-semibold text-lg mb-2">สรุปการออกแบบ:</h3>
                            <p><strong>รูปแบบ:</strong> {selections.type?.name || 'ยังไม่ได้เลือก'}</p>
                            <p><strong>ดอกไม้:</strong> {selections.flower?.name || 'ยังไม่ได้เลือก'}</p>
                            <p><strong>สีโลหะ:</strong> {selections.metal?.name || 'ยังไม่ได้เลือก'}</p>
                        </div>
                         <button 
                            disabled={!selections.type || !selections.flower || !selections.metal}
                            onClick={() => alert('ขอบคุณค่ะ! ทีมงานจะติดต่อกลับเพื่อประเมินราคาและการผลิตโดยเร็วที่สุด')}
                            className="bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold mt-8 w-full disabled:bg-gray-300"
                        >
                           ส่งแบบประเมินราคา
                        </button>
                        <p className="text-xs text-gray-500 mt-2">ราคาเริ่มต้น 590 บาท</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default CustomDesignPage;