import React, { useState } from 'react';
import { 
  ChefHat, 
  Bed, 
  Bath, 
  Tv, 
  DoorOpen, 
  Plus, 
  Heart, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type RoomType = 'kitchen' | 'bedroom' | 'bathroom' | 'livingroom' | 'entrance' | null;

interface Tip {
  id: number;
  category: RoomType;
  title: string;
  content: string;
  author: string;
  likes: number;
}

const INITIAL_TIPS: Tip[] = [
  { id: 1, category: 'kitchen', title: '냉장고 냄새 제거', content: '소주를 뚜껑 열어 넣어두거나 커피 찌꺼기를 활용해 보세요.', author: '자취고수', likes: 24 },
  { id: 2, category: 'bathroom', title: '배수구 머리카락 청소', content: '빨대를 V자로 잘라서 넣었다 빼면 머리카락이 잘 걸려 나옵니다.', author: '깔끔이', likes: 15 },
  { id: 3, category: 'bedroom', title: '좁은 방 공간 활용', content: '침대 밑 수납함을 활용하면 계절 옷 정리가 쉬워요.', author: '공간술사', likes: 32 },
  { id: 4, category: 'livingroom', title: '먼지 정전기 방지', content: '가구 닦을 때 린스를 소량 섞은 물로 닦으면 정전기가 방지됩니다.', author: '먼지싫어', likes: 18 },
  { id: 5, category: 'entrance', title: '신발장 습기 제거', content: '신문지를 말아 신발 안에 넣어두면 습기와 냄새를 동시에 잡아요.', author: '상쾌남', likes: 12 },
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
      <header className="border-b border-slate-100 py-6 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveRoom(null)}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-black">B</div>
          <h1 className="text-xl font-bold tracking-tight text-primary">BOODOG</h1>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          팁 공유
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        
        <div className="mb-12">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">공간 선택</h2>
          <div className="room-grid">
            <div 
              onClick={() => setActiveRoom('bedroom')}
              className={cn("room col-span-5 row-span-7", activeRoom === 'bedroom' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Bed size={24} className={cn("room-icon", activeRoom === 'bedroom' ? "text-white" : "text-slate-200")} />
              </div>
              <span className="room-label">Bedroom</span>
            </div>

            <div 
              onClick={() => setActiveRoom('bathroom')}
              className={cn("room col-span-3 row-span-4", activeRoom === 'bathroom' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Bath size={20} className={cn("room-icon", activeRoom === 'bathroom' ? "text-white" : "text-slate-200")} />
              </div>
              <span className="room-label">Bath</span>
            </div>

            <div 
              onClick={() => setActiveRoom('kitchen')}
              className={cn("room col-span-4 row-span-8", activeRoom === 'kitchen' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ChefHat size={24} className={cn("room-icon", activeRoom === 'kitchen' ? "text-white" : "text-slate-200")} />
              </div>
              <span className="room-label">Kitchen</span>
            </div>

            <div 
              onClick={() => setActiveRoom('livingroom')}
              className={cn("room col-span-8 row-span-4", activeRoom === 'livingroom' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Tv size={24} className={cn("room-icon", activeRoom === 'livingroom' ? "text-white" : "text-slate-200")} />
              </div>
              <span className="room-label">Living</span>
            </div>

            <div 
              onClick={() => setActiveRoom('entrance')}
              className={cn("room col-span-4 row-span-4", activeRoom === 'entrance' && "active")}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <DoorOpen size={24} className={cn("room-icon", activeRoom === 'entrance' ? "text-white" : "text-slate-200")} />
              </div>
              <span className="room-label">Entrance</span>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold">
              {activeRoom ? (
                <span className="text-primary capitalize">{activeRoom} 팁</span>
              ) : '전체 팁'}
            </h2>
            <span className="text-xs text-slate-400 font-medium">{filteredTips.length}개의 팁</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode='popLayout'>
              {filteredTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 border border-slate-100 rounded-lg hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary text-secondary-foreground rounded uppercase">
                      {tip.category}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto">{tip.author}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{tip.content}</p>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                      <Heart size={14} />
                      <span className="text-xs font-medium">{tip.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Simplified Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-lg p-6 shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">새 팁 작성</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTip} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">공간</label>
                  <select 
                    value={newTip.category}
                    onChange={(e) => setNewTip({ ...newTip, category: e.target.value as RoomType })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="kitchen">Kitchen</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="bathroom">Bath</option>
                    <option value="livingroom">Living</option>
                    <option value="entrance">Entrance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">제목</label>
                  <input 
                    type="text" 
                    value={newTip.title}
                    onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-primary"
                    placeholder="팁 제목"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">내용</label>
                  <textarea 
                    rows={3}
                    value={newTip.content}
                    onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                    placeholder="팁 상세 내용"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                  등록하기
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
