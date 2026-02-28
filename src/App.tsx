import React, { useState } from 'react';
import { 
  ChefHat, 
  Bed, 
  Bath, 
  Tv, 
  DoorOpen, 
  Plus, 
  Heart, 
  X,
  Wind,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type RoomType = 'kitchen' | 'bedroom' | 'bathroom' | 'livingroom' | 'entrance' | 'balcony' | 'utility' | null;

interface Tip {
  id: number;
  category: RoomType;
  title: string;
  content: string;
  author: string;
  likes: number;
}

const INITIAL_TIPS: Tip[] = [
  { id: 1, category: 'kitchen', title: '냉장고 냄새 제거', content: '먹다 남은 소주를 뚜껑 열어 넣어두거나 커피 찌꺼기를 말려 활용해 보세요.', author: '자취고수', likes: 42 },
  { id: 2, category: 'bathroom', title: '배수구 머리카락 청소', content: '빨대를 V자로 잘라서 넣었다 빼면 머리카락이 잘 걸려 나옵니다.', author: '깔끔이', likes: 25 },
  { id: 3, category: 'bedroom', title: '좁은 방 공간 활용', content: '침대 밑 수납함을 활용하면 계절 옷 정리가 쉬워요. 압축팩도 추천합니다.', author: '공간술사', likes: 38 },
  { id: 4, category: 'livingroom', title: '먼지 정전기 방지', content: '가구 닦을 때 린스를 소량 섞은 물로 닦으면 정전기가 방지되어 먼지가 덜 쌓입니다.', author: '먼지싫어', likes: 29 },
  { id: 5, category: 'entrance', title: '신발장 습기 제거', content: '신문지를 말아 신발 안에 넣어두면 습기와 냄새를 동시에 잡아요.', author: '상쾌남', likes: 18 },
  { id: 6, category: 'kitchen', title: '초파리 트랩 만들기', content: '설탕, 식초, 주방세제를 1:1:1로 섞어두면 초파리가 싹 사라집니다.', author: '요리왕', likes: 56 },
  { id: 7, category: 'bathroom', title: '거울 김서림 방지', content: '린스나 비누를 거울에 얇게 바른 뒤 마른 수건으로 닦아주세요.', author: '샤워매니아', likes: 31 },
  { id: 8, category: 'balcony', title: '창틀 먼지 청소', content: '굵은 소금을 창틀에 뿌리고 신문지로 문지르면 먼지가 잘 흡수됩니다.', author: '청소장인', likes: 22 },
  { id: 9, category: 'utility', title: '세탁기 냄새 관리', content: '세탁 후에는 항상 세탁기 문을 열어두어 내부를 건조시켜야 곰팡이를 예방합니다.', author: '살림꾼', likes: 45 },
  { id: 10, category: 'bedroom', title: '숙면을 위한 조명', content: '자기 30분 전에는 주황색 계열의 간접 조명을 사용해 멜라토닌 분비를 도와주세요.', author: '잠만보', likes: 15 },
  { id: 11, category: 'livingroom', title: '멀티탭 선 정리', content: '휴지심을 활용해 전선을 각각 넣어 보관하면 엉키지 않고 깔끔합니다.', author: '정리왕', likes: 27 },
  { id: 12, category: 'entrance', title: '택배 운송장 제거', content: '운송장에 물파스를 바르거나 아세톤을 묻히면 개인정보가 싹 지워집니다.', author: '쇼핑몰', likes: 63 },
  { id: 13, category: 'kitchen', title: '남은 배달 피자 데우기', content: '물 한 컵과 함께 전자레인지에 돌리면 빵 끝까지 촉촉하게 데워집니다.', author: '피자러버', likes: 34 },
  { id: 14, category: 'bathroom', title: '수건 냄새 제거', content: '빨래할 때 식초 한 스푼을 넣으면 꿉꿉한 냄새가 사라집니다.', author: '향기맨', likes: 51 },
];

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomType>(null);
  const [tips, setTips] = useState<Tip[]>(INITIAL_TIPS);
  const [showForm, setShowForm] = useState(false);
  const [newTip, setNewTip] = useState({ title: '', content: '', category: 'kitchen' as RoomType });

  const filteredTips = activeRoom 
    ? tips.filter(tip => tip.category === activeRoom)
    : tips;

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTip.title || !newTip.content) return;
    
    const tip: Tip = {
      id: Date.now(),
      category: newTip.category,
      title: newTip.title,
      content: newTip.content,
      author: '익명',
      likes: 0
    };
    
    setTips([tip, ...tips]);
    setNewTip({ title: '', content: '', category: 'kitchen' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveRoom(null)}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">B</div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-primary leading-none">BOODOG</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Life Hack Share</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-black hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} />
          새 팁 공유
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Detailed Floor Plan Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Layers size={14} />
              Floor Plan
            </h2>
            {activeRoom && (
              <button 
                onClick={() => setActiveRoom(null)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Reset View
              </button>
            )}
          </div>
          
          <div className="room-grid bg-slate-100 rounded-xl overflow-hidden shadow-sm border-2 border-slate-200">
            {/* Balcony Left */}
            <div 
              onClick={() => setActiveRoom('balcony')}
              className={cn("room col-span-1 row-span-7 border-r border-slate-200 bg-slate-50", activeRoom === 'balcony' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center rotate-90">
                <Wind size={16} className={cn("room-icon", activeRoom === 'balcony' ? "text-white" : "text-slate-300")} />
              </div>
              <span className="room-label !bottom-auto !top-2 !right-2 rotate-90">Balcony</span>
            </div>

            {/* Bedroom */}
            <div 
              onClick={() => setActiveRoom('bedroom')}
              className={cn("room col-span-5 row-span-7 border-r border-slate-200", activeRoom === 'bedroom' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Bed size={32} className={cn("room-icon", activeRoom === 'bedroom' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeRoom === 'bedroom' ? "text-white/80" : "text-slate-400")}>Sleep</span>
              </div>
              <span className="room-label">Bedroom</span>
            </div>

            {/* Bathroom */}
            <div 
              onClick={() => setActiveRoom('bathroom')}
              className={cn("room col-span-3 row-span-4 border-b border-slate-200", activeRoom === 'bathroom' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <Bath size={24} className={cn("room-icon", activeRoom === 'bathroom' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[8px] font-bold uppercase", activeRoom === 'bathroom' ? "text-white/80" : "text-slate-400")}>Bath</span>
              </div>
              <span className="room-label">Bathroom</span>
            </div>

            {/* Kitchen */}
            <div 
              onClick={() => setActiveRoom('kitchen')}
              className={cn("room col-span-3 row-span-8", activeRoom === 'kitchen' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <ChefHat size={32} className={cn("room-icon", activeRoom === 'kitchen' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeRoom === 'kitchen' ? "text-white/80" : "text-slate-400")}>Kitchen</span>
              </div>
              <span className="room-label">Kitchen</span>
            </div>

            {/* Utility Room */}
            <div 
              onClick={() => setActiveRoom('utility')}
              className={cn("room col-span-3 row-span-4 border-l border-slate-200", activeRoom === 'utility' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <Package size={20} className={cn("room-icon", activeRoom === 'utility' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[8px] font-bold uppercase", activeRoom === 'utility' ? "text-white/80" : "text-slate-400")}>Utility</span>
              </div>
              <span className="room-label">Utility</span>
            </div>

            {/* Living Room */}
            <div 
              onClick={() => setActiveRoom('livingroom')}
              className={cn("room col-span-9 row-span-5 border-t border-slate-200", activeRoom === 'livingroom' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Tv size={36} className={cn("room-icon", activeRoom === 'livingroom' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[12px] font-black uppercase tracking-[0.3em]", activeRoom === 'livingroom' ? "text-white/80" : "text-slate-400")}>Living Area</span>
              </div>
              <span className="room-label">Living Room</span>
            </div>

            {/* Entrance */}
            <div 
              onClick={() => setActiveRoom('entrance')}
              className={cn("room col-span-3 row-span-4 border-t border-l border-slate-200", activeRoom === 'entrance' && "active")}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <DoorOpen size={28} className={cn("room-icon", activeRoom === 'entrance' ? "text-white" : "text-slate-200")} />
                <span className={cn("text-[10px] font-bold uppercase", activeRoom === 'entrance' ? "text-white/80" : "text-slate-400")}>Entry</span>
              </div>
              <span className="room-label">Entrance</span>
            </div>
          </div>
        </div>

        {/* Tips Feed Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b-2 border-primary/10 pb-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles size={20} className="text-primary" />
              {activeRoom ? (
                <span className="capitalize">{activeRoom} Insights</span>
              ) : 'Community Insights'}
            </h3>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">
                Sorted by Likes
              </span>
              <span className="text-sm font-black text-primary">{filteredTips.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredTips.sort((a, b) => b.likes - a.likes).map((tip) => (
                <motion.div
                  key={tip.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group relative flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-black px-2 py-1 bg-primary/5 text-primary rounded-md uppercase tracking-wider">
                      {tip.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 italic">@{tip.author}</span>
                  </div>
                  <h4 className="font-black text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">{tip.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                    {tip.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-all group/like">
                      <Heart size={16} className={cn("transition-transform group-active/like:scale-125", tip.likes > 40 && "fill-red-500 text-red-500")} />
                      <span className="text-xs font-black">{tip.likes}</span>
                    </button>
                    <button className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Sharing Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">새로운 팁 공유</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">Share your knowledge</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTip} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">카테고리 선택</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['kitchen', 'bedroom', 'bathroom', 'livingroom', 'entrance', 'balcony', 'utility'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewTip({ ...newTip, category: cat as RoomType })}
                        className={cn(
                          "py-2 px-1 rounded-lg text-[10px] font-black transition-all border-2 uppercase",
                          newTip.category === cat 
                            ? "bg-primary border-primary text-white shadow-md shadow-blue-200" 
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">제목</label>
                  <input 
                    type="text" 
                    value={newTip.title}
                    onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                    className="w-full border-2 border-slate-50 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition-all font-bold placeholder:text-slate-300"
                    placeholder="핵심 요약 (예: 창틀 청소법)"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">상세 내용</label>
                  <textarea 
                    rows={4}
                    value={newTip.content}
                    onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                    className="w-full border-2 border-slate-50 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition-all font-medium placeholder:text-slate-300 resize-none"
                    placeholder="자세한 노하우를 공유해 주세요."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 hover:shadow-blue-200 active:scale-95 mt-2"
                >
                  공유하기
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
