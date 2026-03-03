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
  CheckCircle2
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={resetNavigation}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">B</div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-primary leading-none">BOODOG</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Life Hack Share</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { resetNavigation(); setShowRecipes(true); }}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-black transition-all flex items-center gap-2",
              showRecipes ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-primary hover:bg-blue-100"
            )}
          >
            <UtensilsCrossed size={18} />
            냉장고 파먹기
          </button>
          <button 
            onClick={() => { resetNavigation(); setShowCommunity(true); }}
            className={cn(
                "px-5 py-2.5 rounded-full text-sm font-black transition-all flex items-center gap-2",
                "bg-primary text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95"
            )}
          >
            <MessageCircle size={18} />
            커뮤니티 입장
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
            {/* Super Simple Floor Plan Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Layers size={14} />
                  Home Architecture
                </h2>
                {activeRoom && (
                  <button 
                    onClick={() => setActiveRoom(null)}
                    className="text-xs font-black text-primary hover:underline flex items-center gap-1"
                  >
                    <X size={12} /> Clear Filter
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
                    <ChefHat className="cell-icon" size={28} />
                    <span className="cell-label">Kitchen</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('bathroom')}
                    className={cn("map-cell", activeRoom === 'bathroom' && "active")}
                  >
                    <Bath className="cell-icon" size={28} />
                    <span className="cell-label">Bath</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('utility')}
                    className={cn("map-cell", activeRoom === 'utility' && "active")}
                  >
                    <Package className="cell-icon" size={28} />
                    <span className="cell-label">Utility</span>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="map-row h-40">
                  <div 
                    onClick={() => setActiveRoom('bedroom')}
                    className={cn("map-cell flex-[2]", activeRoom === 'bedroom' && "active")}
                  >
                    <Bed className="cell-icon" size={32} />
                    <span className="cell-label text-sm">Bedroom (Master)</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('livingroom')}
                    className={cn("map-cell flex-[2]", activeRoom === 'livingroom' && "active")}
                  >
                    <Tv className="cell-icon" size={32} />
                    <span className="cell-label text-sm">Living Area</span>
                  </div>
                </div>
                {/* Row 3 */}
                <div className="map-row">
                  <div 
                    onClick={() => setActiveRoom('balcony')}
                    className={cn("map-cell flex-[3]", activeRoom === 'balcony' && "active")}
                  >
                    <Wind className="cell-icon" size={24} />
                    <span className="cell-label">Balcony & Laundry</span>
                  </div>
                  <div 
                    onClick={() => setActiveRoom('entrance')}
                    className={cn("map-cell", activeRoom === 'entrance' && "active")}
                  >
                    <DoorOpen className="cell-icon" size={24} />
                    <span className="cell-label">Entry</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Feed Section */}
            <section>
              <div className="flex items-center justify-between mb-8 border-b-2 border-primary/10 pb-4">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  {activeRoom ? (
                    <span className="capitalize">{activeRoom} Tips</span>
                  ) : 'All Life Hacks'}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">
                    Life Hacks ({filteredTips.length})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                  {filteredTips.sort((a, b) => b.id - a.id).map((tip) => (
                    <motion.div
                      key={tip.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedTip(tip)}
                      className="bg-white border-2 border-slate-50 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group relative flex flex-col cursor-pointer hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black px-2 py-1 bg-primary/5 text-primary rounded-md uppercase tracking-wider">
                          {tip.category}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">{tip.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow border-l-4 border-slate-100 pl-4">
                        {tip.content}
                      </p>
                      <div className="flex items-center justify-end pt-4 border-t border-slate-50 mt-auto">
                        <button className="text-[10px] font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          자세히 보기 <ArrowRight size={12} />
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

      {/* Tip Detail Modal */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTip(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">{selectedTip.category}</span>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{selectedTip.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="mb-10">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={16} className="text-primary" />
                    상세 설명
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    {selectedTip.details || selectedTip.content}
                  </p>
                </div>

                {selectedTip.steps && (
                  <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary" />
                      실행 단계
                    </h3>
                    <div className="space-y-4">
                      {selectedTip.steps.map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-4 p-5 rounded-2xl bg-white border-2 border-slate-50 hover:border-blue-100 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            {index + 1}
                          </div>
                          <p className="text-slate-700 font-bold leading-relaxed pt-1">
                            {step}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex justify-center">
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                >
                  확인했습니다!
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
