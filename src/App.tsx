import React, { useState, useMemo } from 'react';
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
  Sparkles,
  Search,
  UtensilsCrossed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { RoomType, Tip } from './types';
import { INITIAL_TIPS } from './data/tips';
import { INITIAL_RECIPES } from './data/recipes';

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomType>(null);
  const [tips, setTips] = useState<Tip[]>(INITIAL_TIPS);
  const [showForm, setShowForm] = useState(false);
  const [newTip, setNewTip] = useState({ title: '', content: '', category: 'kitchen' as RoomType });
  
  // Refrigerator Recipe State
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);

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

  // Recipe Recommendation Logic
  const recommendedRecipes = useMemo(() => {
    if (!ingredientsInput.trim()) return [];
    
    const inputTerms = ingredientsInput.split(/[,\s]+/).filter(t => t.length > 0);
    
    return INITIAL_RECIPES.map(recipe => {
      const matchCount = recipe.ingredients.filter(ing => 
        inputTerms.some(term => ing.includes(term) || term.includes(ing))
      ).length;
      return { ...recipe, matchCount };
    })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
  }, [ingredientsInput]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveRoom(null); setShowRecipes(false); }}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">B</div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-primary leading-none">BOODOG</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Life Hack Share</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setShowRecipes(!showRecipes); setActiveRoom(null); }}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-black transition-all flex items-center gap-2",
              showRecipes ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-primary hover:bg-blue-100"
            )}
          >
            <UtensilsCrossed size={18} />
            냉장고 파먹기
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-black hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center gap-2"
          >
            <Plus size={18} />
            새 팁 공유
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {showRecipes ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="bg-blue-600 rounded-3xl p-10 text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                  <UtensilsCrossed size={32} />
                  냉장고 파먹기 레시피
                </h2>
                <p className="text-blue-100 font-bold mb-8">냉장고에 있는 재료를 적어보세요. 요리를 추천해 드릴게요!</p>
                
                <div className="relative max-w-2xl">
                  <input 
                    type="text"
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    placeholder="예: 계란, 토마토, 파, 김치..."
                    className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:text-slate-900 focus:border-white transition-all font-bold placeholder:text-blue-200 text-lg shadow-inner"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50" />
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </div>

            {ingredientsInput.trim() && (
              <div className="mt-12">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  Recommended Recipes ({recommendedRecipes.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedRecipes.length > 0 ? (
                    recommendedRecipes.map(recipe => (
                      <motion.div 
                        key={recipe.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-primary transition-all group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{recipe.name}</h4>
                          <span className={cn(
                            "text-[10px] font-black px-2 py-1 rounded-md uppercase",
                            recipe.difficulty === '쉬움' ? "bg-green-50 text-green-600" : 
                            recipe.difficulty === '보통' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                          )}>
                            {recipe.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {recipe.ingredients.map(ing => (
                            <span key={ing} className={cn(
                              "text-xs font-bold px-3 py-1 rounded-full",
                              ingredientsInput.includes(ing) ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                            )}>
                              {ing}
                            </span>
                          ))}
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {recipe.instructions}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-slate-400 font-bold">매칭되는 레시피를 찾지 못했어요. 다른 재료를 입력해 보세요!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <>
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
          </>
        )}
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
