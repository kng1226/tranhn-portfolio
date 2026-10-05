/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ArtworkRendererProps {
  id: string;
  className?: string;
  isThumbnail?: boolean;
}

export const ArtworkRenderer: React.FC<ArtworkRendererProps> = ({
  id,
  className = '',
  isThumbnail = false,
}) => {
  const normId = id.toLowerCase().replace(/[\s_.-]+/g, '-');

  // =========================================================================
  // 1. GRESSET (Mobile Eco Thrifting & Recycling App)
  // =========================================================================
  if (normId.includes('gresset')) {
    return (
      <div className={`relative w-full h-full bg-[#F4F6F4] text-[#1E3B2B] rounded-2xl overflow-hidden flex flex-col justify-between font-sans ${className}`}>
        {/* Top Header */}
        <div className="p-3 sm:p-4 bg-white/90 border-b border-[#E0E7E2]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#43B02A] text-white flex items-center justify-center text-[10px] font-bold">G</span>
              <span className="font-bold text-[12px] sm:text-[14px] text-[#2C5234]">Gresset🌱</span>
            </div>
            <div className="flex-1 max-w-[140px] px-2 py-1 rounded-full bg-[#EBF1ED] text-[9px] text-gray-500 flex items-center justify-between">
              <span>Tìm kiếm</span>
              <span>🔍</span>
            </div>
            <span className="text-[12px]">🛒</span>
          </div>
        </div>

        {/* Banner */}
        <div className="px-3 pt-2">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#D7EBDD] to-[#BEE0C8] border border-[#A8D3B4] flex items-center justify-between">
            <div className="max-w-[65%]">
              <span className="font-bold text-[11px] text-[#1E3B2B] block">Gresset🍃</span>
              <p className="text-[8px] text-[#2C5234] leading-tight mt-0.5">
                “Quần áo bạn không dùng, chúng tôi sẽ xử lý nhanh và tiện lợi nhất”
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#3B8A50] text-white flex items-center justify-center text-[14px] shadow-sm">
              📢
            </div>
          </div>
        </div>

        {/* Thrifting / Tái chế Action Cards */}
        <div className="px-3 py-2 grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white border border-[#D5E2D8] flex flex-col items-center text-center shadow-xs">
            <span className="text-[16px] mb-1">📦</span>
            <span className="font-bold text-[9px] text-[#1E3B2B]">Thrifting</span>
            <span className="text-[7px] text-gray-500">Ký gửi quần áo</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#D5E2D8] flex flex-col items-center text-center shadow-xs">
            <span className="text-[16px] mb-1">♻️</span>
            <span className="font-bold text-[9px] text-[#1E3B2B]">Tái chế</span>
            <span className="text-[7px] text-gray-500">Vòng lặp xanh</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-3 pb-1 flex justify-between text-center text-[8px]">
          <div><div className="w-7 h-7 mx-auto rounded-full bg-[#DCEEE0] flex items-center justify-center">👕</div><span className="mt-0.5 block">Áo</span></div>
          <div><div className="w-7 h-7 mx-auto rounded-full bg-[#DCEEE0] flex items-center justify-center">👖</div><span className="mt-0.5 block">Quần</span></div>
          <div><div className="w-7 h-7 mx-auto rounded-full bg-[#DCEEE0] flex items-center justify-center">👗</div><span className="mt-0.5 block">Váy</span></div>
          <div><div className="w-7 h-7 mx-auto rounded-full bg-[#DCEEE0] flex items-center justify-center">🩳</div><span className="mt-0.5 block">Chân váy</span></div>
        </div>

        {/* Bottom Nav */}
        <div className="p-2 bg-white border-t border-[#E0E7E2] flex justify-around text-[12px] text-gray-400">
          <span className="text-[#3B8A50]">🏠</span>
          <span>🛍️</span>
          <span>💚</span>
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. INTELLILEX (Tablet Dyslexia Learning Companion)
  // =========================================================================
  if (normId.includes('intellilex')) {
    return (
      <div className={`relative w-full h-full bg-[#EFF5FC] text-[#0F2942] rounded-2xl overflow-hidden flex font-sans ${className}`}>
        {/* Left Vertical App Sidebar */}
        <div className="w-12 sm:w-14 bg-white border-r border-[#D8E6F5] flex flex-col items-center py-4 justify-between shrink-0">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#005BAA] text-white flex items-center justify-center text-[12px] font-bold">
              🧠
            </div>
            <span className="text-[12px] text-gray-400 hover:text-[#005BAA]">🏠</span>
            <span className="text-[12px] text-gray-400 hover:text-[#005BAA]">📖</span>
            <span className="text-[12px] text-gray-400 hover:text-[#005BAA]">👤</span>
            <span className="text-[12px] text-gray-400 hover:text-[#005BAA]">📷</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[12px] text-gray-400">♿</span>
            <span className="text-[12px] text-gray-400">⚙️</span>
          </div>
        </div>

        {/* Center Reading Passage & Practice */}
        <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] text-[#005BAA]">←</span>
              <span className="font-bold text-[11px] sm:text-[13px] text-[#005BAA]">Water Cycle & Atmosphere</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#D5E4F3] shadow-xs">
              <p className="text-[9px] sm:text-[10px] leading-relaxed text-[#2C4156]">
                The water cycle shows the continuous movement of water within the Earth and <span className="font-bold bg-[#D4E8FC] px-1 rounded text-[#005BAA]">atmosphere</span>. Liquid water evaporates into water vapor, condenses to form clouds, and precipitates back to earth.
              </p>
            </div>
          </div>

          {/* Practice Cards */}
          <div className="grid grid-cols-3 gap-2 my-2">
            <div className="p-2 rounded-lg bg-white border border-[#D8E6F5] text-center">
              <span className="text-[7px] uppercase font-bold text-gray-500 block">Atmosphere</span>
              <span className="text-[14px]">🌍</span>
              <span className="text-[6.5px] text-[#005BAA] block mt-0.5">+ Add to word bank</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#D8E6F5] text-center">
              <span className="text-[7px] uppercase font-bold text-gray-500 block">Pronunciation</span>
              <span className="text-[14px]">🔊</span>
              <span className="text-[6.5px] text-gray-400 block mt-0.5">Click speaker</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#D8E6F5] text-center">
              <span className="text-[7px] uppercase font-bold text-gray-500 block">Speaking</span>
              <span className="text-[14px]">🎙️</span>
              <span className="text-[6.5px] text-gray-400 block mt-0.5">Click mic</span>
            </div>
          </div>

          {/* Feedback Parrot Mascot */}
          <div className="p-2.5 rounded-xl bg-[#E2F0FE] border border-[#BEDDFB] flex items-center justify-between">
            <div className="max-w-[70%]">
              <span className="font-bold text-[8.5px] text-[#005BAA] block">Feedback</span>
              <p className="text-[7.5px] text-[#2C4A6B]">
                Your pronunciation needs some improvement. Remember to stress on the first syllable!
              </p>
            </div>
            <span className="text-[22px]">🦜</span>
          </div>
        </div>

        {/* Right Activities Panel */}
        <div className="w-24 sm:w-28 bg-white border-l border-[#D8E6F5] p-2.5 flex flex-col justify-between shrink-0">
          <span className="font-bold text-[9px] text-[#0F2942] block mb-1">Activities</span>
          <div className="space-y-1.5 text-center">
            <div className="p-1.5 rounded-lg bg-[#FFE7E7] border border-[#FFD0D0]">
              <span className="text-[12px]">🧩</span>
              <span className="text-[7px] font-bold text-[#A83232] block">Puzzle</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#FFF2DE] border border-[#FFE1B5]">
              <span className="text-[12px]">✏️</span>
              <span className="text-[7px] font-bold text-[#A86F1A] block">Plan</span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#E6F3FF] border border-[#C5E2FF]">
              <span className="text-[12px]">🔤</span>
              <span className="text-[7px] font-bold text-[#1F6CB5] block">Spelling</span>
            </div>
          </div>
          <div className="text-center pt-2">
            <span className="text-[8px] font-bold text-[#005BAA]">IntelliLex AI</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. MAIN (Emotion Tracking Dashboard)
  // =========================================================================
  if (normId === 'main') {
    return (
      <div className={`relative w-full h-full bg-[#F3F7FA] text-[#173A46] rounded-2xl overflow-hidden flex flex-col justify-between font-sans ${className}`}>
        {/* Header Greeting */}
        <div className="p-3 sm:p-4 bg-gradient-to-b from-[#2E68F8] to-[#4378F9] text-white">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <div className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] flex items-center gap-1">
              <span>🔍</span>
              <span>Tìm kiếm</span>
            </div>
            <span>🔔</span>
          </div>
          <span className="text-[9px] opacity-80 block">Xin chào Trâm Anh,</span>
          <h4 className="font-bold text-[12px] sm:text-[14px]">Hôm nay bạn muốn làm gì?</h4>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white text-[#2E68F8] font-bold text-[8.5px]">
            Bắt đầu ngay →
          </div>
        </div>

        {/* Emotion Chart Card */}
        <div className="px-3 py-2 flex-1 flex flex-col justify-around">
          <div className="p-2.5 rounded-xl bg-white border border-[#DEE7EE] shadow-xs">
            <div className="flex items-center justify-between text-[9px] mb-1">
              <span className="font-bold text-[#173A46]">Đo lường cảm xúc</span>
              <span className="text-[8px] text-gray-400">Tuần này</span>
            </div>
            {/* Wave curve */}
            <svg viewBox="0 0 200 40" className="w-full h-8">
              <path d="M 0 30 Q 30 5, 70 20 T 140 10 T 200 25" fill="none" stroke="#2E68F8" strokeWidth="2.5" />
            </svg>
            <div className="mt-1 flex items-center justify-between text-[7.5px] text-gray-500">
              <span>🔴 Mục tiêu 90</span>
              <span>🔵 Hiện tại 80</span>
            </div>
            <div className="mt-1.5 p-1 rounded bg-[#EBF3FF] text-[7.5px] text-[#2E68F8] font-medium text-center">
              😊 Bạn đang làm tốt! Bạn sắp đạt được mục tiêu rồi!
            </div>
          </div>

          {/* Daily Schedule Preview */}
          <div className="p-2 rounded-xl bg-white border border-[#DEE7EE] space-y-1">
            <span className="font-bold text-[8px] text-[#173A46] block">Lịch trình hôm nay</span>
            <div className="flex items-center justify-between text-[7.5px] text-gray-600 bg-[#FFF5EC] p-1 rounded">
              <span>🍜 Ăn sáng</span>
              <span>06:30 - 07:00</span>
            </div>
            <div className="flex items-center justify-between text-[7.5px] text-gray-600 bg-[#FEF9E7] p-1 rounded">
              <span>💊 Uống thuốc</span>
              <span>07:00 - 07:10</span>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="p-2 bg-white border-t border-[#DEE7EE] flex justify-around text-[12px] text-gray-400">
          <span className="text-[#2E68F8]">🏠</span>
          <span>📅</span>
          <span className="w-7 h-7 -mt-3 rounded-full bg-[#2E68F8] text-white flex items-center justify-center text-[10px] shadow-md">✈️</span>
          <span>📋</span>
          <span>👤</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. MAIN1 (Calendar & Medication Daily Timeline)
  // =========================================================================
  if (normId === 'main1') {
    return (
      <div className={`relative w-full h-full bg-[#FFFFFF] text-[#173A46] rounded-2xl overflow-hidden flex flex-col justify-between font-sans ${className}`}>
        {/* Month Header */}
        <div className="p-3 sm:p-4 bg-white border-b border-[#EDF2F6]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-[14px] text-[#173A46]">Tháng Hai</h3>
            <div className="flex gap-2 text-[12px] text-gray-400">
              <span>🔍</span>
              <span className="font-bold text-[#2E68F8]">26</span>
            </div>
          </div>

          {/* Date Picker Row */}
          <div className="flex justify-between text-center text-[8px]">
            <div><span className="text-gray-400 block">M</span><span>23</span></div>
            <div><span className="text-gray-400 block">T</span><span>24</span></div>
            <div><span className="text-gray-400 block">W</span><span>25</span></div>
            <div className="px-1.5 py-0.5 rounded-full bg-[#2E68F8] text-white font-bold"><span className="opacity-70 block">T</span><span>26</span></div>
            <div><span className="text-gray-400 block">F</span><span>27</span></div>
            <div><span className="text-gray-400 block">S</span><span>28</span></div>
            <div><span className="text-gray-400 block">S</span><span>1</span></div>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="px-3 py-2 flex-1 space-y-1.5 overflow-hidden">
          <div className="p-2 rounded-xl bg-[#F6EEFF] border border-[#E9D8FD] flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5">
              <span>⏰</span>
              <span className="font-bold text-[#5B21B6]">Thức dậy</span>
            </div>
            <span className="text-gray-500">06:10 - 06:10</span>
          </div>

          <div className="p-2 rounded-xl bg-[#FFF1EB] border border-[#FED7C7] flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5">
              <span>🍜</span>
              <span className="font-bold text-[#C2410C]">Ăn sáng</span>
            </div>
            <span className="text-gray-500">06:30 - 07:00</span>
          </div>

          <div className="p-2 rounded-xl bg-[#FEF9E7] border border-[#FDE68A] flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5">
              <span>💊</span>
              <span className="font-bold text-[#B45309]">Uống thuốc</span>
            </div>
            <span className="text-gray-500">07:00 - 07:10</span>
          </div>

          <div className="p-2 rounded-xl bg-[#FFF1EB] border border-[#FED7C7] flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5">
              <span>🍲</span>
              <span className="font-bold text-[#C2410C]">Ăn trưa</span>
            </div>
            <span className="text-gray-500">11:00 - 11:30</span>
          </div>

          <div className="p-2 rounded-xl bg-[#FEF9E7] border border-[#FDE68A] flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-1.5">
              <span>💊</span>
              <span className="font-bold text-[#B45309]">Uống thuốc</span>
            </div>
            <span className="text-gray-500">11:30 - 11:40</span>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="p-2 bg-white border-t border-[#EDF2F6] flex justify-around text-[12px] text-gray-400">
          <span>🏠</span>
          <span className="text-[#2E68F8]">📅</span>
          <span className="w-7 h-7 -mt-3 rounded-full bg-[#2E68F8] text-white flex items-center justify-center text-[10px] shadow-md">✈️</span>
          <span>📋</span>
          <span>👤</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. ONBOARDING (VN Drops Welcome with 3D Heart & Cross)
  // =========================================================================
  if (normId.includes('onboarding')) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-[#FCEBEB] via-white to-white text-[#8B1A1A] rounded-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 text-center font-sans ${className}`}>
        {/* Top Spacer */}
        <div className="h-4" />

        {/* 3D Heart with Medical Cross */}
        <div className="my-auto flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E62828] to-[#A31212] shadow-[0_15px_30px_rgba(230,40,40,0.35)] flex items-center justify-center">
            {/* White cross */}
            <div className="w-6 h-12 bg-white rounded-md absolute shadow-sm" />
            <div className="w-12 h-6 bg-white rounded-md absolute shadow-sm" />
          </div>

          <span className="mt-4 text-[10px] sm:text-[11px] text-[#A33535] font-medium block">
            Chào mừng bạn đến với
          </span>

          <h3 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#C81E1E] tracking-tight">
            VN DROPS
          </h3>

          <p className="mt-2 text-[8.5px] sm:text-[9.5px] text-[#6E3C3C] max-w-[220px] leading-relaxed">
            Chúng tôi sẽ đồng hành cùng bạn để tìm hiểu và đăng ký hiến máu sẽ dễ dàng hơn bao giờ hết!
          </p>

          {/* Dots Indicator */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C81E1E]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Button */}
        <div className="w-full">
          <div className="w-full py-2.5 rounded-full bg-[#C81E1E] text-white font-bold text-[10px] tracking-wide shadow-md">
            Tiếp theo
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. VNDROPS (Emergency Blood Donation SOS Interface)
  // =========================================================================
  if (normId.includes('vndrops')) {
    return (
      <div className={`relative w-full h-full bg-[#FAFAFA] text-[#222222] rounded-2xl overflow-hidden flex flex-col justify-between font-sans ${className}`}>
        {/* Header Red Gradient */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white text-center">
          <h3 className="font-bold text-[14px] tracking-tight">VN DROPS</h3>
          <span className="text-[7.5px] uppercase tracking-wider opacity-90 block">GIỌT MÁU CHO SỰ SỐNG!</span>
        </div>

        {/* Urgent Alert Card */}
        <div className="px-3 pt-2">
          <div className="p-2.5 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-[7.5px] text-[#9F1239] leading-tight">
            <span className="font-bold block mb-0.5">⚠️ THÔNG TIN QUAN TRỌNG</span>
            Có người đang cần gấp <span className="font-bold text-[#E11D48]">500ml máu nhóm O</span> để thực hiện phẫu thuật. Vào <span className="font-bold underline">“HIẾN MÁU KHẨN CẤP”</span> để giúp họ ngay!
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="px-3 py-2 space-y-1.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white text-[#DC2626] flex items-center justify-center text-[10px] font-bold">SOS</span>
              <span className="font-bold text-[9px] uppercase tracking-wider">HIẾN MÁU KHẨN CẤP</span>
            </div>
            <span className="text-[10px]">🚨</span>
          </div>

          <div className="p-2 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between text-[#1E293B] shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-[12px]">📅</span>
              <span className="font-bold text-[8.5px]">ĐĂNG KÍ HIẾN MÁU</span>
            </div>
            <span className="text-[10px] text-gray-400">→</span>
          </div>

          <div className="p-2 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between text-[#1E293B] shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-[12px]">📰</span>
              <span className="font-bold text-[8.5px]">HOẠT ĐỘNG HIẾN MÁU</span>
            </div>
            <span className="text-[10px] text-gray-400">→</span>
          </div>
        </div>

        {/* News Feed */}
        <div className="px-3 pb-2">
          <span className="font-bold text-[8px] text-[#DC2626] border-l-2 border-[#DC2626] pl-1.5 block mb-1">
            Tin tức
          </span>
          <div className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[7.5px] text-gray-600 flex items-center justify-between">
            <span className="truncate max-w-[140px]">Lưu ý trước và sau khi hiến máu</span>
            <span className="text-gray-400">›</span>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="p-2 bg-white border-t border-[#E2E8F0] flex justify-around text-[12px] text-gray-400">
          <span className="text-[#DC2626]">🏠</span>
          <span>📋</span>
          <span>🎧</span>
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. AVA (Grand Finale 3D Pink Celestial Compass)
  // =========================================================================
  if (normId === 'ava') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-tr from-[#32172C] via-[#6B345E] to-[#B378A5] text-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 text-center font-sans ${className}`}>
        {/* Soft nebula dust */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,245,0.45)_0%,transparent_70%)] pointer-events-none" />

        {/* 3D Celestial Metallic Glass Compass */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/50 flex items-center justify-center shadow-[0_20px_60px_rgba(255,180,220,0.5)]">
          <div className="w-24 h-24 sm:w-30 sm:h-30 rounded-full border-2 border-white/40 border-dashed animate-[spin_30s_linear_infinite]" />
          {/* Compass Star Rose */}
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-white via-[#FFD7F0] to-[#FFB7E3] rotate-45 rounded-sm shadow-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#5D2250] border-2 border-white" />
          </div>
          {/* Diagonal Arrow pointer */}
          <div className="absolute w-44 sm:w-52 h-1 bg-white/80 rotate-[-45deg]" />
        </div>

        {/* Badge & Typography */}
        <div className="relative z-10 mt-3">
          <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[8px] uppercase tracking-[0.2em] font-semibold border border-white/30">
            GRAND FINALE
          </span>
          <h3 className="font-serif text-[20px] sm:text-[24px] font-bold text-white tracking-wide mt-1 drop-shadow-md">
            XPLORATORS 2026
          </h3>
          <span className="font-sans text-[7.5px] uppercase tracking-[0.18em] text-white/70">
            3D CELESTIAL COMPASS KEY VISUAL
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 8. ARTBOARD 1 ("a little bites" Paper-Cut Otter Illustration)
  // =========================================================================
  if (normId === 'artboard-1') {
    return (
      <div className={`relative w-full h-full bg-[#C7E3F8] text-[#345975] rounded-2xl overflow-hidden flex flex-col items-center justify-between p-4 text-center font-sans ${className}`}>
        {/* Striped Wallpaper */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.4)_20px,rgba(255,255,255,0.4)_40px)] pointer-events-none" />

        {/* Top Badge */}
        <div className="relative z-10 h-2" />

        {/* Cute Paper-cut Otter */}
        <div className="relative z-10 my-auto flex flex-col items-center">
          <div className="relative w-28 h-36 rounded-full bg-[#C9A47B] border-2 border-white/60 shadow-lg flex flex-col items-center justify-center overflow-hidden">
            {/* Chef Hat */}
            <div className="w-8 h-6 bg-[#684729] rounded-t-xl -mt-8" />
            {/* Otter Face */}
            <div className="w-20 h-16 bg-[#FCECD8] rounded-full mt-1 flex items-center justify-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-2 h-1.5 rounded-full bg-[#684729]" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            {/* Pastry in paws */}
            <div className="w-10 h-7 rounded-full bg-[#D4863A] border border-white mt-1 shadow-sm flex items-center justify-center text-[10px]">
              🥐
            </div>
          </div>
          {/* Water ripples */}
          <div className="w-36 h-3 rounded-full bg-white/60 blur-xs -mt-2" />
        </div>

        {/* Typography: "a little bites" */}
        <div className="relative z-10 pb-1">
          <span className="font-serif italic text-[24px] sm:text-[28px] text-[#2F587A] font-bold tracking-tight drop-shadow-sm">
            a little bites
          </span>
          <span className="font-sans text-[7.5px] uppercase tracking-[0.2em] text-[#3B668C] block">
            PAPER-CUT VECTOR ART
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 9. ARTBOARD 2 ("Thông báo ĐIỀU CHỈNH LỊCH GIAO HÀNG")
  // =========================================================================
  if (normId === 'artboard-2') {
    return (
      <div className={`relative w-full h-full bg-[#DEECF8] text-[#1E3E5B] rounded-2xl overflow-hidden flex flex-col items-center justify-between p-4 text-center font-sans ${className}`}>
        {/* Gingham Checker Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,#1E3E5B_0,#1E3E5B_10px,transparent_10px,transparent_20px),repeating-linear-gradient(90deg,#1E3E5B_0,#1E3E5B_10px,transparent_10px,transparent_20px)] pointer-events-none" />

        {/* Cloud Bubble: "Thông báo" */}
        <div className="relative z-10 px-4 py-1.5 rounded-full bg-white border border-[#B8D7F0] shadow-sm mt-1">
          <span className="font-serif italic text-[16px] sm:text-[18px] text-[#2B5D88] font-bold">
            Thông báo
          </span>
        </div>

        {/* Envelope & Delivery Letter */}
        <div className="relative z-10 my-auto w-36 h-28 bg-[#8CBBE0] rounded-xl shadow-md flex items-center justify-center p-2">
          {/* Letter inside */}
          <div className="w-32 h-22 bg-white rounded-lg p-2 text-center shadow-sm flex flex-col justify-center">
            <span className="font-bold text-[9px] text-[#2B5D88] uppercase leading-tight">
              ĐIỀU CHỈNH LỊCH GIAO HÀNG
            </span>
            <div className="w-12 h-1 bg-[#2B5D88]/30 mx-auto mt-1 rounded-full" />
          </div>
        </div>

        <span className="relative z-10 text-[8px] uppercase tracking-[0.16em] text-[#2B5D88] font-medium">
          SERVICE NOTICE POSTER
        </span>
      </div>
    );
  }

  // =========================================================================
  // 10. COVER ("MEET THE BITES")
  // =========================================================================
  if (normId === 'cover') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-[#2B1B15] 40% to-[#F5ECE1] text-[#2B1B15] rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Top Header */}
        <div className="text-white">
          <h3 className="font-serif text-[18px] sm:text-[22px] tracking-wide uppercase font-bold text-[#EEDBC9]">
            MEET THE BITES
          </h3>
          <span className="font-serif italic text-[12px] sm:text-[14px] text-white/90">
            Bạn thuộc team nào?
          </span>
        </div>

        {/* Dessert Showcase Tagged Items */}
        <div className="grid grid-cols-2 gap-2 my-auto">
          <div className="p-1.5 rounded-lg bg-white/90 shadow-xs flex items-center gap-1">
            <span className="text-[12px]">🥐</span>
            <div><span className="font-bold text-[7.5px] block">Su giòn</span><span className="text-[6.5px] text-gray-500">55k/5c</span></div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/90 shadow-xs flex items-center gap-1">
            <span className="text-[12px]">🍪</span>
            <div><span className="font-bold text-[7.5px] block">Choco crinkles</span><span className="text-[6.5px] text-gray-500">30k/5c</span></div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/90 shadow-xs flex items-center gap-1">
            <span className="text-[12px]">🍰</span>
            <div><span className="font-bold text-[7.5px] block">Tiramisu</span><span className="text-[6.5px] text-gray-500">49k</span></div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/90 shadow-xs flex items-center gap-1">
            <span className="text-[12px]">🧁</span>
            <div><span className="font-bold text-[7.5px] block">Red velvet</span><span className="text-[6.5px] text-gray-500">49k</span></div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#2B1B15] font-bold">
            BAKERY MENU KEY VISUAL
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11. FINAL COUNTDOWN WS ("WORKSHOP FINANCE ON THE CHAIN 24 HOURS LEFT")
  // =========================================================================
  if (normId.includes('final-countdown-ws')) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-[#140602] via-[#2A0D05] to-[#451307] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 text-center font-sans ${className}`}>
        {/* Volcanic Lava Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,80,0,0.45)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF6A00] text-black font-bold text-[7.5px] uppercase tracking-wider">
            WORKSHOP
          </span>
          <h4 className="font-sans font-extrabold text-[12px] sm:text-[14px] uppercase tracking-wider text-[#FFD8B3] mt-1">
            FINANCE ON THE CHAIN
          </h4>
        </div>

        {/* Giant Glowing 24 Hours Left */}
        <div className="relative z-10 my-auto">
          <span className="font-sans font-black text-[56px] sm:text-[68px] leading-none text-white drop-shadow-[0_0_25px_rgba(255,120,40,0.9)] block">
            24
          </span>
          <span className="font-sans font-black text-[14px] sm:text-[16px] uppercase tracking-[0.2em] text-[#FFA86B] block">
            HOURS LEFT
          </span>
        </div>

        {/* Details Footer */}
        <div className="relative z-10 text-[8px] text-[#FFCDB0] space-y-0.5">
          <span>18h30 | 05/05/2025</span>
          <span className="block opacity-80">D201, Trường Đại học Ngoại thương</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 12. FINAL COUNTDOWN ("WORKSHOP CATALYZE THE AI HORIZON 06 HOURS LEFT")
  // =========================================================================
  if (normId === 'final-countdown') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-[#0A0704] via-[#1F1710] to-[#3B2C1B] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 text-center font-sans ${className}`}>
        {/* Desert Dunes Ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(230,170,100,0.35)_0%,transparent_65%)] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10">
          <span className="font-serif italic text-[11px] text-[#D8B486] tracking-widest uppercase block">
            WORKSHOP
          </span>
          <h4 className="font-sans font-extrabold text-[12px] sm:text-[14px] uppercase tracking-wider text-[#FCEBD2] mt-0.5">
            CATALYZE THE AI HORIZON
          </h4>
        </div>

        {/* Giant Glowing 06 Hours Left */}
        <div className="relative z-10 my-auto">
          <span className="font-serif font-bold text-[54px] sm:text-[64px] leading-none text-[#FDEBD0] drop-shadow-[0_0_20px_rgba(216,180,134,0.8)] block">
            06
          </span>
          <span className="font-sans font-extrabold text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-[#D4AF7A] block">
            HOURS LEFT
          </span>
        </div>

        {/* Details Footer */}
        <div className="relative z-10 text-[8px] text-[#E5D0B5] space-y-0.5">
          <span>18h00 | 07/04/2026</span>
          <span className="block opacity-80">Hội trường D201, Trường Đại học Ngoại thương</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 13. FINAL 10 ("WEBINAR Unraveling the Cosmos of Blockchain")
  // =========================================================================
  if (normId === 'final-10') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-[#120D2B] via-[#2A184D] to-[#452075] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Cosmic Nebula Swirls */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(170,110,255,0.4)_0%,transparent_60%)] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#D8B4FE]">
            MỞ ĐƠN ĐĂNG KÝ
          </span>
          <h3 className="font-sans font-black text-[18px] sm:text-[22px] tracking-tight uppercase mt-0.5">
            WEBINAR
          </h3>
          <p className="font-serif italic text-[11px] sm:text-[13px] text-[#E9D5FF]">
            Unraveling the Cosmos of Blockchain
          </p>
        </div>

        {/* 3D Floating Modular Blockchain Cube */}
        <div className="relative z-10 my-auto flex justify-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-[#9333EA] via-[#C084FC] to-[#38BDF8] p-2 shadow-[0_15px_40px_rgba(168,85,247,0.5)] flex items-center justify-center">
            {/* Grid modules */}
            <div className="grid grid-cols-2 gap-1.5 w-full h-full">
              <div className="rounded-lg bg-white/30 backdrop-blur-sm border border-white/40" />
              <div className="rounded-lg bg-white/20 backdrop-blur-sm border border-white/40" />
              <div className="rounded-lg bg-white/25 backdrop-blur-sm border border-white/40" />
              <div className="rounded-lg bg-white/40 backdrop-blur-sm border border-white/40" />
            </div>
          </div>
        </div>

        {/* Date & Location */}
        <div className="relative z-10 text-[8px] text-[#D8B4FE] flex justify-between items-baseline border-t border-white/10 pt-1.5">
          <span>🕒 19h30 | 23/03/2025</span>
          <span>Fanpage TEC Go</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 14. FINAL FINAL MỞ ĐƠN 2 ("CHAINX BYBIT TEC Go")
  // =========================================================================
  if (normId.includes('mo-don') || normId.includes('chainx')) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-r from-[#030914] via-[#08152B] to-[#0A2244] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Night City Skyline on Water */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,180,255,0.25)_0%,transparent_60%)] pointer-events-none" />

        {/* Header Sponsors */}
        <div className="relative z-10 flex items-center justify-between text-[8px] text-[#7DD3FC]">
          <div className="flex gap-2"><span>TEC</span><span>TEC Go</span></div>
          <span className="font-bold text-[#F59E0B]">BYBIT</span>
        </div>

        {/* 3D Greeble Cyberpunk Cube & Text */}
        <div className="relative z-10 my-auto flex items-center justify-between gap-4">
          {/* Cyberpunk Sci-Fi Cube */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-[#E2E8F0] via-[#94A3B8] to-[#475569] shadow-[0_10px_30px_rgba(56,189,248,0.4)] border border-white/60 p-1 flex items-center justify-center">
            <div className="w-full h-full border border-white/40 border-dashed rounded-lg flex items-center justify-center">
              <span className="font-mono text-[10px] text-black font-bold">CHAINX</span>
            </div>
          </div>

          <div className="flex-1 text-right">
            <h2 className="font-sans font-black text-[28px] sm:text-[34px] tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              CHAINX
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/30 text-[8px] uppercase tracking-wider text-[#BAE6FD]">
              HẠN ĐĂNG KÝ: 25.06.2026
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[7px] text-[#7DD3FC]/70 uppercase tracking-widest">
          COMPETITION LAUNCH PANORAMA BANNER
        </div>
      </div>
    );
  }

  // =========================================================================
  // 15. FINAL FINAL ("XPLORATORS 2026 GRAND FINALE")
  // =========================================================================
  if (normId === 'final-final') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-r from-[#32132C] via-[#662858] to-[#A3528A] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Panoramic Cosmic Rose Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,200,240,0.4)_0%,transparent_60%)] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex justify-between text-[8px] text-[#FBCFE8]">
          <span>GRAND FINALE</span>
          <span>CUNG THANH NIÊN HÀ NỘI</span>
        </div>

        {/* Center Compass & Title */}
        <div className="relative z-10 my-auto flex items-center justify-between gap-4">
          <div>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#FCE7F3] block">
              16h30 | 27.06.2026
            </span>
            <h3 className="font-serif font-black text-[22px] sm:text-[28px] tracking-wide text-white drop-shadow-md">
              XPLORATORS 2026
            </h3>
            <span className="text-[7.5px] text-[#FBCFE8]/80 block">37 Trần Bình Trọng, Hai Bà Trưng, Hà Nội</span>
          </div>

          {/* 3D Compass */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/60 flex items-center justify-center shadow-lg">
            <span className="text-[18px]">🧭</span>
          </div>
        </div>

        {/* Sponsor Strip */}
        <div className="relative z-10 border-t border-white/20 pt-1.5 flex justify-between text-[7px] text-[#FBCFE8]/70">
          <span>DIAMOND: BYBIT</span>
          <span>GOLD: MANTLE</span>
          <span>SILVER: NOBLE</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 16. QUÁN QUÂN ("Quán quân Xplorators 2025 SILENT LOOP")
  // =========================================================================
  if (normId.includes('quan-quan') && !normId.includes('video')) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-tr from-[#170E08] via-[#331C0E] to-[#543017] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Stage Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,100,0.35)_0%,transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center">
          <span className="font-serif italic text-[14px] sm:text-[16px] text-[#FFD9A0] block">
            Quán quân Xplorators 2025
          </span>
          <h2 className="font-serif font-black text-[26px] sm:text-[32px] tracking-wider text-[#FFECC7] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            SILENT LOOP
          </h2>
        </div>

        {/* Winner Celebration Stage Illustration */}
        <div className="relative z-10 my-auto p-3 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-center">
          <span className="text-[20px] mb-1 block">🏆</span>
          <span className="font-sans font-bold text-[12px] sm:text-[14px] text-[#FFD700] block">
            92.447.300 VND
          </span>
          <span className="text-[7.5px] uppercase tracking-[0.16em] text-white/70 block mt-0.5">
            GRAND PRIZE WINNER CEREMONY
          </span>
        </div>

        <div className="relative z-10 text-center text-[7.5px] uppercase tracking-[0.2em] text-[#FFD9A0]/70">
          TEC · TEC GO · FOREIGN TRADE UNIVERSITY
        </div>
      </div>
    );
  }

  // =========================================================================
  // 17. TEST 2 ("BLOCKCHAIN & AI Làn sóng trăm tỷ...")
  // =========================================================================
  if (normId === 'test-2') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-[#081226] to-[#122B5E] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A8A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A_1px,transparent_1px)] bg-[size:16px_16px] opacity-25 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <h3 className="font-sans font-black text-[18px] sm:text-[22px] tracking-wide text-white">
            BLOCKCHAIN & AI
          </h3>
          <p className="text-[8.5px] sm:text-[9.5px] text-[#93C5FD] mt-0.5">
            Làn sóng “trăm tỷ” đang tái định hình kỷ nguyên số
          </p>
        </div>

        {/* 3D Isometric Surging Arrow */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Rainbow trail */}
            <div className="absolute -bottom-2 -left-2 w-20 h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 blur-xs rotate-[-35deg]" />
            {/* 3D Arrow */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
              <path d="M 20 80 L 50 60 L 70 70 L 90 20 L 40 40 L 50 55 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-[7.5px] text-[#93C5FD]/60 uppercase tracking-widest">
          TECH ARTICLE INFOGRAPHIC POSTER
        </div>
      </div>
    );
  }

  // =========================================================================
  // 18. BÀI 4 ("XPLORATORS 2025 Film Strip Collage")
  // =========================================================================
  if (normId === 'bai-4') {
    return (
      <div className={`relative w-full h-full bg-[#111920] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 font-sans ${className}`}>
        {/* Film Negative Border Top */}
        <div className="flex justify-between border-b border-white/20 pb-1 text-[7px] font-mono text-white/50">
          <span>FILM 35MM</span>
          <span>TEC GO MEDIA</span>
          <span>2025</span>
        </div>

        {/* Collage of Stage Frames */}
        <div className="my-auto space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-14 rounded bg-[#1E2E3D] border border-white/20 flex flex-col items-center justify-center text-[10px]">
              🎤 <span className="text-[6px] text-white/60">Stage MC</span>
            </div>
            <div className="h-14 rounded bg-[#1E2E3D] border border-white/20 flex flex-col items-center justify-center text-[10px]">
              👥 <span className="text-[6px] text-white/60">Pitching</span>
            </div>
            <div className="h-14 rounded bg-[#1E2E3D] border border-white/20 flex flex-col items-center justify-center text-[10px]">
              👏 <span className="text-[6px] text-white/60">Audience</span>
            </div>
          </div>

          <div className="p-2 rounded bg-gradient-to-r from-[#203649] to-[#34536D] border border-white/30 text-center">
            <h4 className="font-serif text-[13px] sm:text-[15px] font-bold text-[#D0E6FC]">
              XPLORATORS 2025
            </h4>
            <span className="font-serif italic text-[8.5px] text-white/80">
              Into the Fintech Realms
            </span>
          </div>
        </div>

        {/* Film Negative Border Bottom */}
        <div className="flex justify-between border-t border-white/20 pt-1 text-[7px] font-mono text-white/50">
          <span>ISO 800</span>
          <span>EDITORIAL FILM STRIP</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 19. DRAFT 5 ("COMING SOON Glowing Letter in Black Envelope")
  // =========================================================================
  if (normId === 'draft-5') {
    return (
      <div className={`relative w-full h-full bg-gradient-to-b from-[#051821] to-[#0A2633] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 text-center font-sans ${className}`}>
        {/* Ambient Teal Backlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.3)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Logos */}
        <div className="relative z-10 text-[8px] text-[#38BDF8]">
          <span>FTU · TEC · TEC GO</span>
        </div>

        {/* Black Envelope with Glowing Neon Card */}
        <div className="relative z-10 my-auto w-36 h-28 mx-auto bg-[#070D12] rounded-xl border border-white/20 p-2 shadow-2xl flex flex-col items-center justify-center">
          {/* Glowing Cyan Card */}
          <div className="w-32 h-18 rounded-lg bg-gradient-to-t from-[#0284C7] to-[#38BDF8] p-2 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.8)]">
            <span className="font-black text-[12px] text-white tracking-widest drop-shadow-md">
              COMING SOON
            </span>
            <span className="text-[7px] text-white/80 opacity-70">COMING SOON</span>
          </div>
        </div>

        <span className="relative z-10 text-[8px] uppercase tracking-[0.16em] text-[#38BDF8]/70">
          TEASER ENVELOPE DESIGN
        </span>
      </div>
    );
  }

  // Fallback generic design card
  return (
    <div className={`w-full h-full bg-white text-[#173A46] rounded-2xl p-4 flex flex-col justify-between ${className}`}>
      <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{id}</span>
      <div className="my-auto text-center font-serif text-[18px]">{id}</div>
      <span className="text-[8px] text-gray-400">DESIGN SPECIMEN</span>
    </div>
  );
};
