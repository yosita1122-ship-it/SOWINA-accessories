import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { ICONS, PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface AIStyleAdvisorModalProps {
  onClose: () => void;
  products: Product[];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Recommendation {
  productId: number;
  reasoning: string;
}

const AIStyleAdvisorModal: React.FC<AIStyleAdvisorModalProps> = ({ onClose, products }) => {
  const [status, setStatus] = useState<Status>('idle');
  const [occasion, setOccasion] = useState('');
  const [image, setImage] = useState<{ file: File | null; base64: string | null }>({ file: null, base64: null });
  const [recommendations, setRecommendations] = useState<{product: Product, reasoning: string}[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, base64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetState = useCallback(() => {
    setStatus('idle');
    setOccasion('');
    setImage({ file: null, base64: null });
    setRecommendations([]);
    setErrorMessage('');
  }, []);

  const getRecommendations = async () => {
    if (!image.base64 || !occasion) {
      setErrorMessage('กรุณาอัปโหลดรูปภาพและระบุโอกาส');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const imagePart = {
        inlineData: {
          mimeType: image.file!.type,
          data: image.base64.split(',')[1], // Remove the "data:image/...;base64," part
        },
      };

      const productList = JSON.stringify(products.map(p => ({ id: p.id, name: p.name, description: p.description, category: p.category })));

      const textPart = {
        text: `จากภาพเครื่องแต่งกายที่แนบมาและโอกาสคือ "${occasion}" โปรดแนะนำเครื่องประดับ 3 ชิ้นจากรายการต่อไปนี้ และให้เหตุผลเป็นภาษาไทย

        รายการสินค้า:
        ${productList}
        `,
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: { type: Type.INTEGER, description: "ID ของสินค้าที่แนะนำ" },
                    reasoning: { type: Type.STRING, description: "เหตุผลสั้นๆ ที่น่าสนใจเป็นภาษาไทยว่าทำไมสินค้านี้ถึงเข้ากับเครื่องแต่งกายและโอกาส" }
                  },
                  // FIX: Removed 'required' property as it is not supported by the Gemini API's responseSchema.
                }
              }
            }
          }
        }
      });
      
      const resultJson = JSON.parse(response.text);
      const recommendedItems: Recommendation[] = resultJson.recommendations;

      const foundProducts = recommendedItems.map(rec => {
        const product = products.find(p => p.id === rec.productId);
        return product ? { product, reasoning: rec.reasoning } : null;
      }).filter((item): item is { product: Product; reasoning: string } => item !== null);

      if (foundProducts.length === 0) {
        setErrorMessage("ขออภัยค่ะ ไม่พบสินค้าที่เข้ากัน ลองเปลี่ยนลุคของคุณดูนะคะ!");
        setStatus('error');
      } else {
        setRecommendations(foundProducts);
        setStatus('success');
      }

    } catch (err) {
      console.error(err);
      setErrorMessage('เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง');
      setStatus('error');
    }
  };


  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A67B68] mx-auto"></div>
            <h3 className="text-xl font-semibold mt-6">AI กำลังเลือกสไตล์ให้คุณ...</h3>
            <p className="text-gray-500 mt-2">ผู้เชี่ยวชาญ AI ของเรากำลังวิเคราะห์ลุคของคุณเพื่อค้นหาชิ้นที่ใช่ที่สุด</p>
          </div>
        );
      case 'success':
        return (
          <div>
            <h2 className="text-2xl font-bold text-center sowina-font-serif">AI เลือกชิ้นนี้ให้คุณ!</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(({ product, reasoning }) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                  <p className="text-sm text-gray-600 mt-2 p-2 bg-stone-100 rounded-md">
                    <span className="font-semibold text-[#A67B68]">สไตลิสต์โน้ต:</span> {reasoning}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={resetState}
                    className="bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-semibold"
                >
                    ลองชุดอื่น
                </button>
            </div>
          </div>
        );
      case 'error':
         return (
          <div className="text-center p-10">
             <h3 className="text-xl font-semibold text-red-500">อุ๊ปส์!</h3>
             <p className="text-gray-600 mt-2">{errorMessage}</p>
             <button onClick={resetState} className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-full">
               ลองอีกครั้ง
             </button>
           </div>
         );
      case 'idle':
      default:
        return (
          <>
            <h2 className="text-2xl font-bold text-center sowina-font-serif">ที่ปรึกษาสไตล์ AI</h2>
            <p className="text-center text-gray-500 mt-2">อัปโหลดรูปภาพชุดของคุณ เพื่อรับคำแนะนำเครื่องประดับที่เหมาะกับคุณ</p>
            
            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">1. อัปโหลดลุคของคุณ</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {image.base64 ? (
                       <img src={image.base64} alt="ตัวอย่างชุด" className="mx-auto h-24 w-24 object-cover rounded-md" />
                    ) : (
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#A67B68] hover:text-[#BF927F] focus-within:outline-none">
                        <span>{image.file ? 'เปลี่ยนรูปภาพ' : 'อัปโหลดไฟล์'}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">{image.file ? image.file.name : 'หรือลากและวาง'}</p>
                    </div>
                     <p className="text-xs text-gray-500">PNG, JPG, GIF ขนาดไม่เกิน 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">2. สำหรับโอกาสอะไร?</label>
                <textarea
                  id="occasion"
                  rows={2}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BF927F] focus:ring focus:ring-[#EADFD5] focus:ring-opacity-50 p-2"
                  placeholder="เช่น ไปคาเฟ่, งานแต่งเพื่อน, ปาร์ตี้บริษัท..."
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={getRecommendations}
                disabled={!image.file || !occasion}
                className="w-full bg-[#A67B68] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-semibold"
              >
                รับคำแนะนำ
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 sowina-font-sans" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close">
          {ICONS.close}
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default AIStyleAdvisorModal;