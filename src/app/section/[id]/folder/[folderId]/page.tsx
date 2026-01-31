"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface WordItem {
  id: string;
  word: string;
  meaning: string;
}

export default function FolderPage() {
  const params = useParams();
  const router = useRouter();
  const { id, folderId } = params;

  const [words, setWords] = useState<WordItem[]>([]);
  const [folderName, setFolderName] = useState("");
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedFolders = localStorage.getItem(`folders_${id}`);
    if (savedFolders) {
      const folders = JSON.parse(savedFolders);
      const currentFolder = folders.find((f: any) => f.id === folderId);
      if (currentFolder) setFolderName(currentFolder.name);
    }

    const savedWords = localStorage.getItem(`words_${folderId}`);
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    } else {
      // 첫 화면에는 아무것도 안 적힌 상태로 1개만 생성
      const initialWords = [{
        id: "1",
        word: "",
        meaning: ""
      }];
      setWords(initialWords);
    }
  }, [id, folderId]);

  // 단어 수정 시 즉시 로컬 스토리지에 저장 (항상 save 상태 유지)
  const updateWord = (index: number, field: keyof WordItem, value: string) => {
    const newWords = [...words];
    newWords[index] = { ...newWords[index]!, [field]: value };
    setWords(newWords);
    localStorage.setItem(`words_${folderId}`, JSON.stringify(newWords));
  };

  const handleSaveWord = () => {
    localStorage.setItem(`words_${folderId}`, JSON.stringify(words));
    alert("저장되었습니다!");
  };

  // 체크박스 선택/해제
  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // 전체 선택/해제
  const toggleSelectAll = () => {
    if (selectedIds.size === words.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(words.map(w => w.id)));
    }
  };

  // 선택된 단어 삭제
  const deleteSelected = () => {
    if (confirm("선택한 단어를 삭제하시겠습니까?")) {
      const newWords = words.filter(w => !selectedIds.has(w.id));
      setWords(newWords.length > 0 ? newWords : [{ id: Date.now().toString(), word: "", meaning: "" }]);
      localStorage.setItem(`words_${folderId}`, JSON.stringify(newWords));
      setSelectedIds(new Set());
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#EFEEEC', 
      minHeight: '100vh', 
      width: '100%',
      padding: '40px 60px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'SUIT', sans-serif" // 기본 폰트 설정
    }}>
      {/* 타이틀 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: '#1D1D1D',
          fontFamily: "'SangBleu Empire Trial', serif",
          margin: 0
        }}>
          {folderName || "Hackers Toeic RC"}
        </h1>

        {/* 전체 선택 및 삭제 버튼 */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#1D1D1D' }}>
            <input 
              type="checkbox" 
              checked={selectedIds.size === words.length && words.length > 0}
              onChange={toggleSelectAll}
              style={{ width: '18px', height: '18px', accentColor: '#7D8471' }}
            />
            전체 선택
          </label>
          {selectedIds.size > 0 && (
            <button 
              onClick={deleteSelected}
              style={{ 
                backgroundColor: '#C05A3E', color: 'white', padding: '8px 20px', borderRadius: '8px', 
                border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
              }}
            >
              선택 삭제 ({selectedIds.size})
            </button>
          )}
        </div>
      </div>

      {/* 상단 입력 바 (전체 저장용으로 활용 가능하도록 유지) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        marginBottom: '60px',
        fontSize: '20px',
        color: '#1D1D1D'
      }}>
        <span style={{ fontFamily: "'SangBleu Empire Trial', serif" }}>words</span>
        <div style={{ width: '200px', height: '40px', backgroundColor: 'white', borderRadius: '20px' }}></div>
        <span style={{ fontFamily: "'SangBleu Empire Trial', serif" }}>meanings</span>
        <div style={{ width: '200px', height: '40px', backgroundColor: 'white', borderRadius: '20px' }}></div>
        <button 
          onClick={handleSaveWord}
          style={{ 
            backgroundColor: '#7D8471', color: 'white', padding: '10px 30px', borderRadius: '8px', 
            border: 'none', cursor: 'pointer', fontSize: '18px', fontFamily: "'SUIT', sans-serif"
          }}
        >
          Save
        </button>
      </div>

      {/* 단어 리스트 그리드 (적을 수 있게 input 태그로 변경) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '15px 30px',
        marginBottom: '60px'
      }}>
        {words.map((item, index) => (
          <div key={item.id || index} style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
            <div 
              onClick={() => toggleSelect(item.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '0 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <input 
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
                style={{ width: '18px', height: '18px', accentColor: '#7D8471', cursor: 'pointer' }}
              />
            </div>
            <input 
              value={item.word}
              onChange={(e) => updateWord(index, 'word', e.target.value)}
              placeholder="applicant"
              style={{ 
                flex: 1, backgroundColor: 'white', padding: '10px', borderRadius: '8px', 
                textAlign: 'center', fontSize: '14px', border: 'none', fontFamily: "'SUIT', sans-serif"
              }} 
            />
            <input 
              value={item.meaning}
              onChange={(e) => updateWord(index, 'meaning', e.target.value)}
              placeholder="지원자"
              style={{ 
                flex: 1, backgroundColor: 'white', padding: '10px', borderRadius: '8px', 
                textAlign: 'center', fontSize: '14px', border: 'none', fontFamily: "'SUIT', sans-serif"
              }} 
            />
            <button 
              onClick={() => handleSaveWord()}
              style={{ 
                backgroundColor: selectedIds.has(item.id) ? '#C05A3E' : '#B0B5A5', 
                color: 'white', padding: '10px 20px', borderRadius: '8px', 
                border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: "'SUIT', sans-serif",
                minWidth: '70px',
                transition: 'background-color 0.2s'
              }}
            >
              {selectedIds.has(item.id) ? 'Delete' : 'Edit'}
            </button>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 'auto' }}>
        <button 
          onClick={() => router.back()}
          style={{ 
            backgroundColor: '#8E8E8E', color: 'white', padding: '10px 40px', borderRadius: '8px', 
            border: 'none', cursor: 'pointer', fontSize: '18px' 
          }}
        >
          Back
        </button>
        <button 
          onClick={() => router.push(`/section/${id}/folder/${folderId}/test`)}
          style={{ 
            backgroundColor: '#2C3E50', color: 'white', padding: '10px 40px', borderRadius: '8px', 
            border: 'none', cursor: 'pointer', fontSize: '18px' 
          }}
        >
          Test
        </button>
      </div>
    </div>
  );
}
