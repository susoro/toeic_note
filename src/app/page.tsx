"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const SECTIONS = [
  { id: 1, title: "Hackers Toeic RC", image: "/images/2.png" },
  { id: 2, title: "Hackers Toeic LC", image: "/images/3.png" },
  { id: 3, title: "Hackers Yellow", image: "/images/4.png" },
  { id: 4, title: "Hackers Green", image: "/images/5.png" },
  { id: 5, title: "Hackers Toeic 900", image: "/images/6.png" },
  { id: 6, title: "토익 단기공략 7", image: "/images/7.png" },
  { id: 7, title: "학원 단어 / 숙어", image: "/images/8.png" },
  { id: 8, title: "모의고사", image: "/images/9.png" },
  { id: 9, title: "최종 정리본", image: "/images/10.png" },
];

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#EFEEEC', 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: '#1D1D1D',
          fontFamily: "'SangBleu Empire Trial', serif",
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          The things we learned
        </h1>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px', 
        width: '100%', 
        maxWidth: '500px' 
      }}>
        {SECTIONS.map((section) => (
          <Link key={section.id} href={`/section/${section.id}`}>
            <motion.div
              style={{ 
                position: 'relative', 
                aspectRatio: '1 / 1', 
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="160px"
                priority={section.id <= 6}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
