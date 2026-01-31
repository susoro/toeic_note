"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";

import Link from "next/link";

interface Folder {
  id: string;
  name: string;
}

const SECTIONS_DATA: Record<string, string> = {
  "1": "Hackers Toeic RC",
  "2": "Hackers Toeic LC",
  "3": "Hackers Yellow",
  "4": "Hackers Green",
  "5": "Hackers Toeic 900",
  "6": "토익 단기공략 7",
  "7": "학원 단어 / 숙어",
  "8": "모의고사",
  "9": "최종 정리본",
};

export default function SectionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const sectionTitle = SECTIONS_DATA[id] || "Section";

  const [folders, setFolders] = useState<Folder[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  // 로컬 스토리지에서 폴더 데이터 불러오기
  useEffect(() => {
    const savedFolders = localStorage.getItem(`folders_${id}`);
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      // 초기 데이터
      const initialFolders = [
        { id: "1", name: "주어,동사" },
        { id: "2", name: "주어,동사" },
        { id: "3", name: "주어,동사" },
        { id: "4", name: "주어,동사" },
        { id: "5", name: "주어,동사" },
        { id: "6", name: "주어,동사" },
        { id: "7", name: "주어,동사" },
        { id: "8", name: "주어,동사" },
      ];
      setFolders(initialFolders);
      localStorage.setItem(`folders_${id}`, JSON.stringify(initialFolders));
    }
  }, [id]);

  // 폴더 데이터 저장
  const saveFolders = (newFolders: Folder[]) => {
    setFolders(newFolders);
    localStorage.setItem(`folders_${id}`, JSON.stringify(newFolders));
  };

  const addFolder = () => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name: "새 폴더",
    };
    saveFolders([...folders, newFolder]);
  };

  const deleteFolder = (folderId: string) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      if (confirm("다시 한번 생각해 보세요")) {
        saveFolders(folders.filter((f) => f.id !== folderId));
      }
    }
    setMenuOpen(null);
  };

  const renameFolder = (folderId: string, newName: string) => {
    saveFolders(
      folders.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
    setIsEditing(null);
  };

  return (
    <div style={{ 
      backgroundColor: '#EFEEEC', 
      minHeight: '100vh', 
      width: '100%',
      padding: '40px 60px'
    }}>
      {/* 헤더 */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        marginBottom: '60px'
      }}>
        <button 
          onClick={() => router.push("/")}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={32} color="#1D1D1D" />
        </button>
        <h1 style={{ 
          fontSize: '40px', 
          fontWeight: 'bold', 
          color: '#1D1D1D',
          fontFamily: "'SangBleu Empire Trial', serif",
          margin: 0
        }}>
          {sectionTitle}
        </h1>
      </header>

      {/* 폴더 그리드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {folders.map((folder) => (
          <div key={folder.id} style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* 폴더 아이콘 (이미지 파일 사용) */}
              <div 
                onClick={() => router.push(`/section/${id}/folder/${folder.id}`)}
                style={{ position: 'relative', width: '80px', height: '80px', cursor: 'pointer' }}
              >
                <Image
                  src="/icons/icon 1.png"
                  alt="folder icon"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              {/* 메뉴 버튼 (우클릭 대신 작은 버튼 제공) */}
              <button 
                onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === folder.id ? null : folder.id); }}
                style={{ 
                  position: 'absolute', 
                  top: '-5px', 
                  right: '-5px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <MoreVertical size={14} color="#1D1D1D" />
              </button>
              
              {/* 컨텍스트 메뉴 */}
              <AnimatePresence>
                {menuOpen === folder.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    style={{ 
                      position: 'absolute',
                      top: '25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      zIndex: 100,
                      padding: '8px',
                      minWidth: '140px',
                      border: '1px solid #E0E0E0'
                    }}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsEditing(folder.id); setMenuOpen(null); }}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px',
                        border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', textAlign: 'left',
                        borderRadius: '8px', transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Edit2 size={16} color="#1D1D1D" />
                      <span style={{ color: '#1D1D1D', fontWeight: '500' }}>이름 수정</span>
                    </button>
                    <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }} />
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px',
                        border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', textAlign: 'left',
                        borderRadius: '8px', transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF5F5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={16} color="#C05A3E" />
                      <span style={{ color: '#C05A3E', fontWeight: '500' }}>삭제</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 폴더 이름 */}
            <div style={{ marginTop: '8px' }}>
              {isEditing === folder.id ? (
                <input 
                  autoFocus
                  defaultValue={folder.name}
                  onBlur={(e) => renameFolder(folder.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && renameFolder(folder.id, e.currentTarget.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    width: '100px', textAlign: 'center', border: '1px solid #7D8471', 
                    borderRadius: '4px', padding: '2px', fontSize: '12px' 
                  }}
                />
              ) : (
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#1D1D1D' }}>
                  {folder.name}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* 추가 버튼 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button 
            onClick={addFolder}
            style={{ 
              width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#7D8471',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Plus size={24} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
}

