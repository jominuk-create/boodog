import { useState, useMemo } from 'react';
import { 
  ChefHat, 
  Bed, 
  Bath, 
  Tv, 
  DoorOpen, 
  X,
  Wind,
  Package,
  Layers,
  Sparkles,
  Search,
  UtensilsCrossed,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Home
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
import Community from './components/Community';

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomType>(null);
  const [tips] = useState<Tip[]>(INITIAL_TIPS);
  const [showCommunity, setShowCommunity] = useState(false);
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  // Refrigerator Recipe State
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);

  const resetNavigation = () => {
    setActiveRoom(null);
    setShowRecipes(false);
    setShowCommunity(false);
    setSelectedTip(null);
  };

  const filteredTips = activeRoom 
    ? tips.filter(tip => tip.category === activeRoom)
    : tips;

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
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-primary">
      {/* Premium Header */}
      <header className="border-b border-slate-100 py-5 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-40">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={resetNavigation}>
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_10px_20px_-5px_rgba(29,78,216,0.4)] group-hover:scale-110 transition-transform duration-500">
            B
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none flex items-center gap-1">
              BBODOG
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Life Hack Plaza</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { resetNavigation(); setShowRecipes(true); }}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 active:scale-95",
              showRecipes 
                ? "bg-slate-900 text-white shadow-xl" 
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            <UtensilsCrossed size={18} />
            냉장고 파먹기
          </button>
          <button 
            onClick={() => { resetNavigation(); setShowCommunity(true); }}
            className="bg-primary text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-[0_10px_25px_-5px_rgba(29,78,216,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(29,78,216,0.4)] active:scale-95 flex items-center gap-2"
          >
            <MessageCircle size={18} />
            커뮤니티 입장
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {showRecipes ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 text-white shadow-[0_30px_60px_-12px_rgba(29,78,216,0.3)] overflow-hidden relative">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  <Sparkles size={14} className="text-blue-200" />
                  Recipe Finder
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">
                  냉장고에 있는 재료를<br />모두 적어보세요!
                </h2>
                <p className="text-blue-100 font-bold mb-10 text-lg opacity-80">최고의 레시피를 인공지능이 추천해 드립니다.</p>
                
                <div className="relative max-w-2xl group">
                  <input 
                    type="text"
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    placeholder="예: 계란, 토마토, 파, 김치..."
                    className="w-full bg-white/10 border-2 border-white/20 rounded-[2rem] px-8 py-5 outline-none focus:bg-white focus:text-slate-900 focus:border-white transition-all font-bold placeholder:text-blue-200 text-xl shadow-inner backdrop-blur-md"
                  />
                  <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-white group-focus-within:text-primary transition-colors" size={24} />
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute right-20 top-10 opacity-10 rotate-12">
                <UtensilsCrossed size={200} />
              </div>
            </div>

            {ingredientsInput.trim() && (
              <div className="mt-20">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-primary/30" />
                    Recommended Recipes ({recommendedRecipes.length})
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendedRecipes.length > 0 ? (
                    recommendedRecipes.map(recipe => (
                      <motion.div 
                        key={recipe.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:border-primary/30 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:-translate-y-2"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <h4 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{recipe.name}</h4>
                          <span className={cn(
                            "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm",
                            recipe.difficulty === '쉬움' ? "bg-green-50 text-green-600" : 
                            recipe.difficulty === '보통' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                          )}>
                            {recipe.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {recipe.ingredients.map(ing => (
                            <span key={ing} className={cn(
                              "text-xs font-bold px-4 py-2 rounded-full transition-all",
                              ingredientsInput.includes(ing) 
                                ? "bg-primary text-white shadow-lg shadow-blue-100 scale-105" 
                                : "bg-slate-50 text-slate-400"
                            )}>
                              {ing}
                            </span>
                          ))}
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                          <p className="text-slate-600 leading-relaxed font-bold">
                            {recipe.instructions}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                      <p className="text-slate-400 font-black text-xl">매칭되는 레시피를 찾지 못했어요.<br /><span className="text-sm opacity-60">다른 재료를 입력해 보세요!</span></p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {/* Super Simple Floor Plan Section */}
            <div className="mb-24">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Home size={16} />
                  Home Architecture
                </h2>
                {activeRoom && (
                  <button 
                    onClick={() => setActiveRoom(null)}
                    className="text-xs font-black text-primary hover:text-blue-700 flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full transition-all active:scale-95"
                  >
                    <X size={14} /> Clear Filter
                  </button>
                )}
              </div>
              
              <div className="house-map">
                {/* Row 1 */}
                <div className="map-row">
                  <div 
                    onClick={() => setActiveRoom('kitchen')}
                    className={cn("map-cell", activeRoom === 'kitchen' && "active")}
                  >
                    <ChefHat className="cell-icon" size={32} />
                    <span className="cell-label">Kitchen</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('bathroom')}
                    className={cn("map-cell", activeRoom === 'bathroom' && "active")}
                  >
                    <Bath className="cell-icon" size={32} />
                    <span className="cell-label">Bath</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('utility')}
                    className={cn("map-cell", activeRoom === 'utility' && "active")}
                  >
                    <Package className="cell-icon" size={32} />
                    <span className="cell-label">Utility</span>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="map-row h-48">
                  <div 
                    onClick={() => setActiveRoom('bedroom')}
                    className={cn("map-cell flex-[2]", activeRoom === 'bedroom' && "active")}
                  >
                    <Bed className="cell-icon" size={40} />
                    <span className="cell-label text-sm">Bedroom</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('livingroom')}
                    className={cn("map-cell flex-[2]", activeRoom === 'livingroom' && "active")}
                  >
                    <Tv className="cell-icon" size={40} />
                    <span className="cell-label text-sm">Living Area</span>
                  </div>
                </div>
                {/* Row 3 */}
                <div className="map-row">
                  <div 
                    onClick={() => setActiveRoom('balcony')}
                    className={cn("map-cell flex-[3]", activeRoom === 'balcony' && "active")}
                  >
                    <Wind className="cell-icon" size={28} />
                    <span className="cell-label">Balcony & Laundry</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('entrance')}
                    className={cn("map-cell", activeRoom === 'entrance' && "active")}
                  >
                    <DoorOpen className="cell-icon" size={28} />
                    <span className="cell-label">Entry</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Feed Section */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {activeRoom ? (
                      <span className="capitalize">{activeRoom} 노하우</span>
                    ) : '전체 생활 꿀팁'}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase bg-slate-100 px-4 py-2 rounded-full tracking-widest">
                    {filteredTips.length} Hacks Available
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='popLayout'>
                  {filteredTips.sort((a, b) => b.id - a.id).map((tip) => (
                    <motion.div
                      key={tip.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setSelectedTip(tip)}
                      className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group relative flex flex-col cursor-pointer hover:border-primary/20 hover:-translate-y-2"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black px-3 py-1 bg-primary/5 text-primary rounded-lg uppercase tracking-[0.1em]">
                          {tip.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">{tip.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow font-bold opacity-80 line-clamp-3">
                        {tip.content}
                      </p>
                      <div className="flex items-center justify-end pt-6 border-t border-slate-50 mt-auto">
                        <span className="text-[11px] font-black text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          자세히 보기 <ArrowRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Premium Tip Detail Modal */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTip(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full mb-1 inline-block">{selectedTip.category}</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{selectedTip.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all hover:rotate-90 active:scale-90 shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="mb-12">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-primary/30" />
                    상세 설명
                  </h3>
                  <p className="text-xl text-slate-700 leading-relaxed font-bold bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                    {selectedTip.details || selectedTip.content}
                  </p>
                </div>

                {selectedTip.steps && (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                      <div className="w-6 h-[2px] bg-primary/30" />
                      실행 단계
                    </h3>
                    <div className="space-y-5">
                      {selectedTip.steps.map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-6 p-6 rounded-[1.5rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg hover:shadow-blue-50 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shrink-0 shadow-[0_5px_15px_-3px_rgba(29,78,216,0.4)] group-hover:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          <p className="text-slate-800 font-bold leading-relaxed pt-1.5 text-lg">
                            {step}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-10 border-t border-slate-50 bg-slate-50/50 flex justify-center">
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-95 flex items-center gap-2 group"
                >
                  이해했습니다
                  <CheckCircle2 size={20} className="text-blue-400 group-hover:scale-125 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Community Overlay */}
      <AnimatePresence>
        {showCommunity && (
          <Community onClose={() => setShowCommunity(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
