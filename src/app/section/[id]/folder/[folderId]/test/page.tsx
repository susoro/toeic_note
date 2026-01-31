"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface WordItem {
  word: string;
  meaning: string;
}

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const { folderId } = params;

  const [words, setWords] = useState<WordItem[]>([]);

  useEffect(() => {
    const savedWords = localStorage.getItem(`words_${folderId}`);
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    } else {
      const initialWords = Array(39).fill({ word: "", meaning: "" });
      setWords(initialWords);
    }
  }, [folderId]);

  const updateWord = (index: number, field: keyof WordItem, value: string) => {
    const newWords = [...words];
    newWords[index] = { ...newWords[index]!, [field]: value };
    setWords(newWords);
  };

  return (
    <div style={{ 
      backgroundColor: '#EFEEEC', 
      minHeight: '100vh', 
      width: '100%',
      padding: '40px 60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '40px' }}>
        <button onClick={() => router.back()} style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={32} color="#1D1D1D" />
        </button>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: '#1D1D1D', fontFamily: "'SangBleu Empire Trial', serif" }}>
          Test Mode
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', width: '100%', maxWidth: '1200px', marginBottom: '40px' }}>
        {words.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px' }}>
            <input
              value={item.word}
              onChange={(e) => updateWord(index, 'word', e.target.value)}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'none', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
            <input
              value={item.meaning}
              onChange={(e) => updateWord(index, 'meaning', e.target.value)}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: 'none', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => alert("제출되었습니다!")}
        style={{ backgroundColor: '#C05A3E', color: 'white', padding: '12px 80px', borderRadius: '8px', border: 'none', fontSize: '18px', cursor: 'pointer' }}
      >
        submit
      </button>
    </div>
  );
}


