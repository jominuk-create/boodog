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
  UtensilsCrossed,
  MessageCircle,
  MessageSquare,
  Clock,
  User,
  PenLine,
  ChevronLeft,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { RoomType, Tip, CommunityPost, PostComment } from './types';
import { INITIAL_TIPS } from './data/tips';
import { INITIAL_RECIPES } from './data/recipes';
import DisqusComments from './components/DisqusComments';

const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 1,
    title: "자취생들 여기 보세요! 다이소 꿀템 추천",
    content: "오늘 다이소에서 신박한 자취템을 발견했어요. 실리콘 뚜껑인데 생각보다 밀폐력이 엄청나네요! 끓는 냄비에 덮어도 안전하고 세척도 쉬워요.",
    author: "다이소왕",
    createdAt: "2026-03-02",
    likes: 12,
    comments: [
      { id: 101, author: "프로자취러", content: "오 저도 그거 쓰는데 진짜 좋아요!", createdAt: "2026-03-02" },
      { id: 102, author: "미니멀리스트", content: "사이즈 여러 개 있나요?", createdAt: "2026-03-02" }
    ]
  },
  {
    id: 2,
    title: "집주인과 계약 연장할 때 팁 있을까요?",
    content: "계약 만료가 다가오는데 보증금 인상 얘기에 걱정이네요. 이럴 때 현명하게 대처하는 법 아시는 분 계신가요? 2년 더 살고 싶은데...",
    author: "이사고민러",
    createdAt: "2026-03-01",
    likes: 8,
    comments: [
      { id: 201, author: "법학도", content: "임대차 3법 중 계약갱신요구권 행사하시면 됩니다!", createdAt: "2026-03-01" }
    ]
  },
  {
    id: 3,
    title: "오늘의 자취 저녁 메뉴 추천!",
    content: "간단하게 김치볶음밥 해먹으려는데 특별한 비법 재료 하나만 알려주세요. 매번 같은 맛이라 지겨워요.",
    author: "요리초보",
    createdAt: "2026-03-01",
    likes: 5,
    comments: []
  }
];

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomType>(null);
  const [tips, setTips] = useState<Tip[]>(INITIAL_TIPS);
  const [showForm, setShowForm] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [newTip, setNewTip] = useState({ title: '', content: '', category: 'kitchen' as RoomType });
  
  // Community Board State
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [isWritingPost, setIsWritingPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');

  // Refrigerator Recipe State
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);

  const resetNavigation = () => {
    setActiveRoom(null);
    setShowRecipes(false);
    setShowCommunity(false);
    setShowForm(false);
    setSelectedPostId(null);
    setIsWritingPost(false);
  };

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

  const handleAddCommunityPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const post: CommunityPost = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: '익명',
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: []
    };

    setCommunityPosts([post, ...communityPosts]);
    setNewPost({ title: '', content: '' });
    setIsWritingPost(false);
  };

  const handleAddComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: PostComment = {
      id: Date.now(),
      author: '익명',
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCommunityPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
    setNewComment('');
  };

  const handleLikePost = (postId: number) => {
    setCommunityPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Safe selected post selection
  const selectedPost = useMemo(() => 
    communityPosts.find(p => p.id === selectedPostId) || null,
    [communityPosts, selectedPostId]
  );

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
                showCommunity ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-primary hover:bg-blue-100"
            )}
          >
            <MessageCircle size={18} />
            커뮤니티
          </button>
          <button 
            onClick={() => { resetNavigation(); setShowForm(true); }}
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
                  {filteredTips.sort((a, b) => b.likes - a.likes).map((tip) => (
                    <motion.div
                      key={tip.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border-2 border-slate-50 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group relative flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black px-2 py-1 bg-primary/5 text-primary rounded-md uppercase tracking-wider">
                          {tip.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 italic">@{tip.author}</span>
                      </div>
                      <h4 className="font-black text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">{tip.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow border-l-4 border-slate-100 pl-4">
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
              onClick={resetNavigation}
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
                <button onClick={resetNavigation} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTip} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">카테고리 선택</label>
                  <div className="grid grid-cols-4 gap-2">
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

      {/* Community Modal */}
      <AnimatePresence>
        {showCommunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetNavigation}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-50 bg-white sticky top-0 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-primary">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">뽀독 자유 게시판</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase mt-0.5 tracking-wider">Bbodog Community Discussion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    {!isWritingPost && !selectedPostId && (
                        <button 
                            onClick={() => setIsWritingPost(true)}
                            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
                        >
                            <PenLine size={16} />
                            글쓰기
                        </button>
                    )}
                    <button onClick={resetNavigation} className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all hover:rotate-90">
                        <X size={24} />
                    </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-8 pt-4 custom-scrollbar bg-slate-50/30">
                
                {selectedPostId && selectedPost ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <button 
                            onClick={() => setSelectedPostId(null)}
                            className="flex items-center gap-2 text-sm font-black text-primary hover:gap-3 transition-all"
                        >
                            <ChevronLeft size={18} />
                            목록으로 돌아가기
                        </button>

                        <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center gap-1.5 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-black">
                                    <User size={14} />
                                    {selectedPost.author}
                                </span>
                                <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                                    <Clock size={14} />
                                    {selectedPost.createdAt}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedPost.title}</h3>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg whitespace-pre-wrap">{selectedPost.content}</p>
                            
                            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-4">
                                <button 
                                    onClick={() => handleLikePost(selectedPost.id)}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-black hover:bg-red-100 transition-colors"
                                >
                                    <Heart size={20} className={cn(selectedPost.likes > 0 && "fill-red-500")} />
                                    {selectedPost.likes}
                                </button>
                                <span className="flex items-center gap-2 text-slate-400 font-bold">
                                    <MessageSquare size={20} />
                                    {selectedPost.comments.length} 개의 댓글
                                </span>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className="space-y-6 pb-12">
                            <h4 className="text-lg font-black text-slate-800 px-4 flex items-center gap-2">
                                <MessageSquare className="text-primary" size={20} />
                                댓글
                            </h4>
                            
                            <form 
                                onSubmit={(e) => handleAddComment(e, selectedPost.id)}
                                className="relative group"
                            >
                                <input 
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="따뜻한 댓글 한마디를 남겨주세요."
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 pr-16 outline-none focus:border-primary transition-all font-medium shadow-sm"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    <Send size={18} />
                                </button>
                            </form>

                            <div className="space-y-4">
                                {selectedPost.comments.length > 0 ? (
                                    selectedPost.comments.map(comment => (
                                        <div key={comment.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-black text-slate-700 flex items-center gap-2">
                                                    <User size={14} className="text-slate-400" />
                                                    {comment.author}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.createdAt}</span>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{comment.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : isWritingPost ? (
                    <motion.div 
                        key="write"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 bg-white rounded-[2rem] p-8 border-2 border-primary/10 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <PenLine className="text-primary" size={20} />
                                새로운 이야기 작성
                            </h3>
                            <button onClick={() => setIsWritingPost(false)} className="text-sm font-bold text-slate-400 hover:text-slate-600">취소</button>
                        </div>
                        <form onSubmit={handleAddCommunityPost} className="space-y-4">
                            <input 
                                type="text"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                placeholder="제목을 입력하세요"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all font-bold"
                            />
                            <textarea 
                                rows={6}
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                placeholder="어떤 이야기를 나누고 싶으신가요?"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all font-medium resize-none"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98]"
                            >
                                게시하기
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-1 flex items-center gap-2">
                                    <Sparkles size={20} />
                                    함께 나누는 자취 노하우
                                </h3>
                                <p className="text-blue-100 text-sm font-bold opacity-90">
                                    궁금한 점이나 일상의 이야기를 자유롭게 들려주세요!
                                </p>
                            </div>
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 mb-12">
                            {communityPosts.map((post) => (
                                <div 
                                    key={post.id}
                                    onClick={() => setSelectedPostId(post.id)}
                                    className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 hover:border-primary/20 transition-all group cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99]"
                                >
                                    <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors mb-2">{post.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">{post.content}</p>
                                    
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full text-slate-500">
                                                <User size={12} className="text-slate-300" />
                                                {post.author}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={12} />
                                                {post.createdAt}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Heart size={14} />
                                                {post.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare size={14} />
                                                {post.comments.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-200">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MessageSquare size={16} className="text-primary" />
                                실시간 한줄 대화방
                            </h3>
                            <div className="bg-white rounded-[2rem] p-6 min-h-[500px] border-2 border-slate-100 shadow-inner">
                                <DisqusComments 
                                    url={window.location.origin + '/community'} 
                                    identifier="bbodog-community-v3" 
                                    title="Bbodog Free Community"
                                />
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoomCard({ id, icon, label, active, onClick }: { id: RoomType, icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "map-cell",
        active && "active"
      )}
    >
      <div className="cell-icon">
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <span className="cell-label">{label}</span>
    </div>
  );
}
