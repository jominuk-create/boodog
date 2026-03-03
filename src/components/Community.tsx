import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  MessageSquare, 
  Heart, 
  Clock, 
  User, 
  PenLine, 
  ChevronLeft, 
  Send, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  increment
} from 'firebase/firestore';
import { db } from '../firebase';
import type { CommunityPost, PostComment } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CommunityProps {
  onClose: () => void;
}

export default function Community({ onClose }: CommunityProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts in real-time
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityPost[];
      setPosts(postsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch comments when a post is selected
  useEffect(() => {
    if (!selectedPostId) {
      setComments([]);
      return;
    }

    const q = query(
      collection(db, 'posts', selectedPostId, 'comments'), 
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PostComment[];
      setComments(commentsData);
    });
    return unsubscribe;
  }, [selectedPostId]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        title: newPost.title,
        content: newPost.content,
        author: '익명',
        createdAt: serverTimestamp(),
        likes: 0,
        commentCount: 0
      });
      setNewPost({ title: '', content: '' });
      setIsWriting(false);
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("글 작성에 실패했습니다. Firebase 설정을 확인해주세요.");
    }
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId || !newComment.trim()) return;

    try {
      // Add comment to subcollection
      await addDoc(collection(db, 'posts', selectedPostId, 'comments'), {
        author: '익명',
        content: newComment,
        createdAt: serverTimestamp()
      });

      // Update comment count on post
      const postRef = doc(db, 'posts', selectedPostId);
      await updateDoc(postRef, {
        commentCount: increment(1)
      });

      setNewComment('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      {/* Community Header */}
      <header className="border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">뽀독 커뮤니티</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Share & Connect</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isWriting && !selectedPostId && (
            <button 
              onClick={() => setIsWriting(true)}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              <PenLine size={18} />
              이야기 나누기
            </button>
          )}
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto bg-slate-50/50 custom-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
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
                    {selectedPost.createdAt?.toDate().toLocaleDateString() || '방금 전'}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedPost.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed text-lg whitespace-pre-wrap">{selectedPost.content}</p>
                
                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-4">
                  <button 
                    onClick={(e) => handleLike(e, selectedPost.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-black hover:bg-red-100 transition-colors"
                  >
                    <Heart size={20} className={cn(selectedPost.likes > 0 && "fill-red-500")} />
                    {selectedPost.likes}
                  </button>
                  <span className="flex items-center gap-2 text-slate-400 font-bold">
                    <MessageSquare size={20} />
                    {selectedPost.commentCount} 개의 댓글
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
                  onSubmit={handleAddComment}
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
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-black text-slate-700 flex items-center gap-2">
                            <User size={14} className="text-slate-400" />
                            {comment.author}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {comment.createdAt?.toDate().toLocaleDateString() || '방금 전'}
                          </span>
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
          ) : isWriting ? (
            <motion.div 
              key="write"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-10 border-2 border-primary/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <PenLine className="text-primary" size={28} />
                    새로운 이야기 작성
                  </h3>
                  <p className="text-sm text-slate-400 font-bold mt-1">자취생들과 유용한 정보를 나누어보세요.</p>
                </div>
                <button onClick={() => setIsWriting(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddPost} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">제목</label>
                  <input 
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="제목을 입력하세요"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">상세 내용</label>
                  <textarea 
                    rows={8}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="어떤 이야기를 나누고 싶으신가요?"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all font-medium resize-none text-lg"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98]"
                  >
                    게시하기
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="space-y-10">
              <div className="p-10 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-3 flex items-center gap-3">
                    <Sparkles size={32} />
                    자취생 광장
                  </h3>
                  <p className="text-blue-100 text-lg font-bold opacity-90 max-w-lg leading-relaxed">
                    혼자 살면서 궁금했던 점, 나만 아는 꿀팁, 소소한 일상을 공유하는 공간입니다.
                  </p>
                </div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 opacity-20">
                  <MessageCircle size={120} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  <div className="py-20 text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-bold">이야기를 불러오는 중입니다...</p>
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <motion.div 
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedPostId(post.id)}
                      className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 hover:border-primary transition-all group cursor-pointer shadow-sm hover:shadow-xl active:scale-[0.99]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{post.title}</h4>
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-full">
                          <Clock size={14} />
                          {post.createdAt?.toDate().toLocaleDateString() || '방금 전'}
                        </span>
                      </div>
                      <p className="text-slate-500 line-clamp-2 mb-8 font-medium text-lg leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={(e) => handleLike(e, post.id)}
                            className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-black"
                          >
                            <Heart size={20} className={cn(post.likes > 0 && "fill-red-500 text-red-500")} />
                            {post.likes}
                          </button>
                          <div className="flex items-center gap-2 text-slate-400 font-black">
                            <MessageSquare size={20} />
                            {post.commentCount}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-black text-sm group-hover:translate-x-1 transition-transform">
                          자세히 보기
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg font-bold">아직 게시글이 없습니다. 첫 번째 이야기를 들려주세요!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
