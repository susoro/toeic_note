"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";

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
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <Image
                  src="/icons/icon 1.png"
                  alt="folder icon"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              {/* 메뉴 버튼 제거됨 */}
              
              {/* 컨텍스트 메뉴 */}
              <AnimatePresence>
                {menuOpen === folder.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ 
                      position: 'absolute',
                      top: '24px',
                      right: '0',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 20,
                      padding: '8px',
                      minWidth: '100px'
                    }}
                  >
                    <button 
                      onClick={() => { setIsEditing(folder.id); setMenuOpen(null); }}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px',
                        border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', textAlign: 'left'
                      }}
                    >
                      <Edit2 size={14} /> 이름 수정
                    </button>
                    <button 
                      onClick={() => deleteFolder(folder.id)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px',
                        border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', textAlign: 'left',
                        color: '#C05A3E'
                      }}
                    >
                      <Trash2 size={14} /> 삭제
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

