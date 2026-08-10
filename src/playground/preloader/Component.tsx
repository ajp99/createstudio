'use client';

import React from 'react';

interface PreloaderProps {
  size?: number;
  color?: string;
  speed?: number;
}

// Base preloader wrapper
const PreloaderWrapper: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[140px] hover:border-blue-600 transition-colors">
    <div className="flex items-center justify-center w-full min-h-[80px] mb-2">{children}</div>
    <span className="text-xs font-light letter-spacing tracking-wider text-slate-500 bg-black bg-opacity-30 px-2 py-1 rounded-full border border-white border-opacity-5">
      {label}
    </span>
  </div>
);

// 1-10: Simple spinners
const P1: React.FC<PreloaderProps> = ({ size = 40, color = '#6db3f2', speed = 0.7 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p1-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid #2a3a4f;
        border-top-color: ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p1-spinner" />
  </>
);

const P2: React.FC<PreloaderProps> = ({ size = 40, color = '#f7b731', speed = 1 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p2-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid ${color};
        border-bottom: 4px solid ${color};
        animation: spin ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="p2-spinner" />
  </>
);

const P3: React.FC<PreloaderProps> = ({ size = 40, color = '#5f9ea0', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p3-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 5px dotted ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p3-spinner" />
  </>
);

const P4: React.FC<PreloaderProps> = ({ size = 40, color = '#ffb347', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p4-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid #3b4e6b;
        border-left-color: ${color};
        animation: spin ${speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
    `}</style>
    <div className="p4-spinner" />
  </>
);

const P5: React.FC<PreloaderProps> = ({ size = 40, color = '#c084fc', speed = 1 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p5-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 6px double ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p5-spinner" />
  </>
);

const P6: React.FC<PreloaderProps> = ({ size = 40, color = '#f472b6', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p6-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, ${color}, #8b5cf6, ${color});
        animation: spin ${speed}s linear infinite;
        mask: radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 6px));
        -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 6px));
      }
    `}</style>
    <div className="p6-spinner" />
  </>
);

const P7: React.FC<PreloaderProps> = ({ size = 40, color = '#48bb78', speed = 0.9 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p7-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid #2d3748;
        border-right-color: ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p7-spinner" />
  </>
);

const P8: React.FC<PreloaderProps> = ({ size = 40, color = '#ed64a6', speed = 0.6 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p8-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid #4a5568;
        border-top: 4px solid ${color};
        border-bottom: 4px solid ${color};
        animation: spin ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="p8-spinner" />
  </>
);

const P9: React.FC<PreloaderProps> = ({ size = 40, color = '#63b3ed', speed = 1.5 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p9-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px dashed ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p9-spinner" />
  </>
);

const P10: React.FC<PreloaderProps> = ({ size = 40, color = '#dd6b20', speed = 1 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p10-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #f6ad55, ${color});
        animation: spin ${speed}s linear infinite;
        box-shadow: 0 0 12px ${color}66;
      }
    `}</style>
    <div className="p10-spinner" />
  </>
);

// 11-20: Dots & Bars
const P11: React.FC<PreloaderProps> = ({ size = 12, color = '#81e6d9', speed = 0.9 }) => (
  <>
    <style>{`
      @keyframes bounce {
        0% { transform: translateY(0); }
        100% { transform: translateY(-15px); }
      }
      .p11-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: bounce ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-1.5">
      <div className="p11-dot" />
      <div className="p11-dot" style={{ animationDelay: '0.15s' }} />
      <div className="p11-dot" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P12: React.FC<PreloaderProps> = ({ size = 10, color = '#fbbf24', speed = 1 }) => (
  <>
    <style>{`
      @keyframes pulse-dot {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      .p12-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: pulse-dot ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p12-dot" />
      <div className="p12-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p12-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P13: React.FC<PreloaderProps> = ({ size = 14, color = '#a78bfa', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes scale-dot {
        0% { transform: scale(0.5); }
        100% { transform: scale(1.3); }
      }
      .p13-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: scale-dot ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-1.25">
      <div className="p13-dot" />
      <div className="p13-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p13-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P14: React.FC<PreloaderProps> = ({ size = 8, color = '#f472b6', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes bar-wave {
        0% { height: 10px; }
        100% { height: 30px; }
      }
      .p14-bar {
        width: ${size}px;
        background: ${color};
        border-radius: 20px;
        animation: bar-wave ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-1 items-end h-10">
      <div className="p14-bar" />
      <div className="p14-bar" style={{ animationDelay: '0.15s' }} />
      <div className="p14-bar" style={{ animationDelay: '0.3s' }} />
      <div className="p14-bar" style={{ animationDelay: '0.45s' }} />
      <div className="p14-bar" style={{ animationDelay: '0.6s' }} />
    </div>
  </>
);

const P15: React.FC<PreloaderProps> = ({ size = 12, color = '#fc8181', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes spin-dot {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .p15-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: spin-dot ${speed}s linear infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p15-dot" />
      <div className="p15-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p15-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P16: React.FC<PreloaderProps> = ({ size = 12, color = '#68d391', speed = 0.7 }) => (
  <>
    <style>{`
      @keyframes jump {
        0% { transform: translateY(0); }
        100% { transform: translateY(-20px); }
      }
      .p16-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: jump ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-1.5">
      <div className="p16-dot" />
      <div className="p16-dot" style={{ animationDelay: '0.1s' }} />
      <div className="p16-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p16-dot" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P17: React.FC<PreloaderProps> = ({ size = 10, color = '#b794f4', speed = 0.9 }) => (
  <>
    <style>{`
      @keyframes wave {
        0% { transform: translateY(0); }
        100% { transform: translateY(-15px); }
      }
      .p17-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: wave ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p17-dot" />
      <div className="p17-dot" style={{ animationDelay: '0.15s' }} />
      <div className="p17-dot" style={{ animationDelay: '0.3s' }} />
      <div className="p17-dot" style={{ animationDelay: '0.45s' }} />
      <div className="p17-dot" style={{ animationDelay: '0.6s' }} />
    </div>
  </>
);

const P18: React.FC<PreloaderProps> = ({ size = 12, color = '#f6ad55', speed = 1 }) => (
  <>
    <style>{`
      @keyframes pulse-scale {
        0%, 100% { transform: scale(0.9); opacity: 0.6; }
        50% { transform: scale(1.3); opacity: 1; }
      }
      .p18-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: pulse-scale ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-2.5">
      <div className="p18-dot" />
      <div className="p18-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p18-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P19: React.FC<PreloaderProps> = ({ size = 6, color = '#63b3ed', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes bar-height {
        0% { height: 8px; }
        100% { height: 28px; }
      }
      .p19-bar {
        width: ${size}px;
        background: ${color};
        border-radius: 10px;
        animation: bar-height ${speed}s ease-in-out infinite alternate;
      }
    `}</style>
    <div className="flex gap-1 items-end h-10">
      <div className="p19-bar" />
      <div className="p19-bar" style={{ animationDelay: '0.1s' }} />
      <div className="p19-bar" style={{ animationDelay: '0.2s' }} />
      <div className="p19-bar" style={{ animationDelay: '0.3s' }} />
      <div className="p19-bar" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P20: React.FC<PreloaderProps> = ({ size = 16, color = '#f687b3', speed = 1 }) => (
  <>
    <style>{`
      @keyframes rotate-scale {
        0% { transform: rotate(0deg) scale(0.8); }
        100% { transform: rotate(360deg) scale(1.2); }
      }
      .p20-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: rotate-scale ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p20-dot" />
      <div className="p20-dot" style={{ animationDelay: '0.15s' }} />
      <div className="p20-dot" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

// 21-30: Advanced spinners & loaders
const P21: React.FC<PreloaderProps> = ({ size = 40, color = '#06b6d4', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes spin-reverse { to { transform: rotate(-360deg); } }
      .p21-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-right: 4px solid ${color};
        border-top: 4px solid ${color};
        animation: spin-reverse ${speed}s linear infinite;
      }
    `}</style>
    <div className="p21-spinner" />
  </>
);

const P22: React.FC<PreloaderProps> = ({ size = 40, color = '#10b981', speed = 0.9 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p22-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid #1f2937;
        border-top: 2px solid ${color};
        border-right: 2px solid ${color};
        animation: spin ${speed}s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }
    `}</style>
    <div className="p22-spinner" />
  </>
);

const P23: React.FC<PreloaderProps> = ({ size = 40, color = '#f59e0b', speed = 1.3 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p23-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: linear-gradient(45deg, ${color}, transparent);
        animation: spin ${speed}s linear infinite;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
      }
    `}</style>
    <div className="p23-spinner" />
  </>
);

const P24: React.FC<PreloaderProps> = ({ size = 40, color = '#8b5cf6', speed = 1.1 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p24-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid #2d3748;
        border-bottom: 3px solid ${color};
        border-right: 3px solid ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p24-spinner" />
  </>
);

const P25: React.FC<PreloaderProps> = ({ size = 40, color = '#ec4899', speed = 1 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p25-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: conic-gradient(${color}, #1f2937, ${color});
        mask: radial-gradient(farthest-side, transparent 50%, #000 65%);
        -webkit-mask: radial-gradient(farthest-side, transparent 50%, #000 65%);
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p25-spinner" />
  </>
);

const P26: React.FC<PreloaderProps> = ({ size = 40, color = '#14b8a6', speed = 1.4 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p26-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-left: 4px solid ${color};
        border-bottom: 4px solid ${color};
        animation: spin ${speed}s ease-in infinite;
      }
    `}</style>
    <div className="p26-spinner" />
  </>
);

const P27: React.FC<PreloaderProps> = ({ size = 40, color = '#f97316', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p27-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 5px dotted transparent;
        border-top-color: ${color};
        border-right-color: ${color};
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p27-spinner" />
  </>
);

const P28: React.FC<PreloaderProps> = ({ size = 40, color = '#06b6d4', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p28-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: linear-gradient(90deg, ${color}, transparent);
        animation: spin ${speed}s linear infinite;
      }
    `}</style>
    <div className="p28-spinner" />
  </>
);

const P29: React.FC<PreloaderProps> = ({ size = 40, color = '#d946ef', speed = 0.95 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p29-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid #374151;
        border-top: 3px solid ${color};
        border-left: 3px solid ${color};
        animation: spin ${speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
    `}</style>
    <div className="p29-spinner" />
  </>
);

const P30: React.FC<PreloaderProps> = ({ size = 40, color = '#84cc16', speed = 1.15 }) => (
  <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      .p30-spinner {
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: conic-gradient(from 45deg, ${color} 0deg, transparent 90deg, ${color} 360deg);
        animation: spin ${speed}s linear infinite;
        box-shadow: 0 0 15px ${color}88;
      }
    `}</style>
    <div className="p30-spinner" />
  </>
);

// 31-40: Complex animations
const P31: React.FC<PreloaderProps> = ({ size = 10, color = '#3b82f6', speed = 0.8 }) => (
  <>
    <style>{`
      @keyframes flip {
        0% { transform: rotateX(0deg); }
        100% { transform: rotateX(360deg); }
      }
      .p31-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: flip ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p31-dot" />
      <div className="p31-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p31-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P32: React.FC<PreloaderProps> = ({ size = 12, color = '#ef4444', speed = 1 }) => (
  <>
    <style>{`
      @keyframes slide-in {
        0% { transform: translateX(-20px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      .p32-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: slide-in ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-1">
      <div className="p32-dot" />
      <div className="p32-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p32-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P33: React.FC<PreloaderProps> = ({ size = 14, color = '#8b5cf6', speed = 1.2 }) => (
  <>
    <style>{`
      @keyframes expand {
        0% { transform: scale(0.2); }
        100% { transform: scale(1); }
      }
      .p33-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: expand ${speed}s ease-out infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p33-dot" />
      <div className="p33-dot" style={{ animationDelay: '0.15s' }} />
      <div className="p33-dot" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P34: React.FC<PreloaderProps> = ({ size = 8, color = '#ec4899', speed = 0.6 }) => (
  <>
    <style>{`
      @keyframes compress {
        0% { transform: scaleY(1); }
        50% { transform: scaleY(0.3); }
        100% { transform: scaleY(1); }
      }
      .p34-bar {
        width: ${size}px;
        height: 20px;
        background: ${color};
        border-radius: 4px;
        animation: compress ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-1 items-center h-12">
      <div className="p34-bar" />
      <div className="p34-bar" style={{ animationDelay: '0.1s' }} />
      <div className="p34-bar" style={{ animationDelay: '0.2s' }} />
      <div className="p34-bar" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P35: React.FC<PreloaderProps> = ({ size = 12, color = '#06b6d4', speed = 1.1 }) => (
  <>
    <style>{`
      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
      }
      .p35-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        position: absolute;
      }
      .p35-container {
        position: relative;
        width: 50px;
        height: 50px;
      }
    `}</style>
    <div className="p35-container">
      <div className="p35-dot" style={{ animation: `orbit ${speed}s linear infinite` }} />
    </div>
  </>
);

const P36: React.FC<PreloaderProps> = ({ size = 10, color = '#10b981', speed = 0.9 }) => (
  <>
    <style>{`
      @keyframes wiggle {
        0%, 100% { transform: rotateZ(-5deg); }
        50% { transform: rotateZ(5deg); }
      }
      .p36-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: wiggle ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-1.5">
      <div className="p36-dot" />
      <div className="p36-dot" style={{ animationDelay: '0.1s' }} />
      <div className="p36-dot" style={{ animationDelay: '0.2s' }} />
    </div>
  </>
);

const P37: React.FC<PreloaderProps> = ({ size = 8, color = '#f59e0b', speed = 1 }) => (
  <>
    <style>{`
      @keyframes swirl {
        0% { transform: rotate(0deg) scaleX(1); }
        50% { transform: rotate(180deg) scaleX(0.7); }
        100% { transform: rotate(360deg) scaleX(1); }
      }
      .p37-bar {
        width: ${size}px;
        height: 24px;
        background: ${color};
        border-radius: 20px;
        animation: swirl ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-1 items-center">
      <div className="p37-bar" />
      <div className="p37-bar" style={{ animationDelay: '0.15s' }} />
      <div className="p37-bar" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P38: React.FC<PreloaderProps> = ({ size = 14, color = '#d946ef', speed = 1.3 }) => (
  <>
    <style>{`
      @keyframes bounce-rotate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.3) rotate(180deg); }
      }
      .p38-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: bounce-rotate ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-3">
      <div className="p38-dot" />
      <div className="p38-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p38-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

const P39: React.FC<PreloaderProps> = ({ size = 6, color = '#14b8a6', speed = 0.7 }) => (
  <>
    <style>{`
      @keyframes ladder {
        0% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0); }
      }
      .p39-bar {
        width: ${size}px;
        height: 16px;
        background: ${color};
        border-radius: 3px;
        animation: ladder ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-1 items-end">
      <div className="p39-bar" style={{ animationDelay: '0s' }} />
      <div className="p39-bar" style={{ animationDelay: '0.1s' }} />
      <div className="p39-bar" style={{ animationDelay: '0.2s' }} />
      <div className="p39-bar" style={{ animationDelay: '0.3s' }} />
    </div>
  </>
);

const P40: React.FC<PreloaderProps> = ({ size = 12, color = '#84cc16', speed = 1.1 }) => (
  <>
    <style>{`
      @keyframes morph {
        0%, 100% { border-radius: 50%; transform: scale(1); }
        50% { border-radius: 20%; transform: scale(0.8); }
      }
      .p40-dot {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation: morph ${speed}s ease-in-out infinite;
      }
    `}</style>
    <div className="flex gap-2">
      <div className="p40-dot" />
      <div className="p40-dot" style={{ animationDelay: '0.2s' }} />
      <div className="p40-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </>
);

// Export all preloaders as array for easy mapping
const allPreloaders = [
  { Component: P1, label: 'Spinner 1' },
  { Component: P2, label: 'Spinner 2' },
  { Component: P3, label: 'Spinner 3' },
  { Component: P4, label: 'Spinner 4' },
  { Component: P5, label: 'Spinner 5' },
  { Component: P6, label: 'Spinner 6' },
  { Component: P7, label: 'Spinner 7' },
  { Component: P8, label: 'Spinner 8' },
  { Component: P9, label: 'Spinner 9' },
  { Component: P10, label: 'Spinner 10' },
  { Component: P11, label: 'Dots 1' },
  { Component: P12, label: 'Dots 2' },
  { Component: P13, label: 'Dots 3' },
  { Component: P14, label: 'Bars 1' },
  { Component: P15, label: 'Dots 4' },
  { Component: P16, label: 'Dots 5' },
  { Component: P17, label: 'Dots 6' },
  { Component: P18, label: 'Dots 7' },
  { Component: P19, label: 'Bars 2' },
  { Component: P20, label: 'Dots 8' },
  { Component: P21, label: 'Spinner 11' },
  { Component: P22, label: 'Spinner 12' },
  { Component: P23, label: 'Spinner 13' },
  { Component: P24, label: 'Spinner 14' },
  { Component: P25, label: 'Spinner 15' },
  { Component: P26, label: 'Spinner 16' },
  { Component: P27, label: 'Spinner 17' },
  { Component: P28, label: 'Spinner 18' },
  { Component: P29, label: 'Spinner 19' },
  { Component: P30, label: 'Spinner 20' },
  { Component: P31, label: 'Flip Dots' },
  { Component: P32, label: 'Slide Dots' },
  { Component: P33, label: 'Expand Dots' },
  { Component: P34, label: 'Compress Bars' },
  { Component: P35, label: 'Orbit Dot' },
  { Component: P36, label: 'Wiggle Dots' },
  { Component: P37, label: 'Swirl Bars' },
  { Component: P38, label: 'Bounce Dots' },
  { Component: P39, label: 'Ladder Bars' },
  { Component: P40, label: 'Morph Dots' },
];

export default function PreloaderComponent() {
  return (
    <div className="w-full bg-slate-950 text-slate-100 p-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-blue-400 mb-2 text-center tracking-wider">
          Preloader Collection
        </h2>
        <p className="text-center text-slate-400 text-sm">
          40 reusable preloader variants with customizable size, color, and speed
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {allPreloaders.map(({ Component, label }, idx) => (
          <PreloaderWrapper key={idx} label={label}>
            <Component />
          </PreloaderWrapper>
        ))}
      </div>

      <div className="mt-12 bg-slate-900 rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">Usage</h3>
        <pre className="bg-black p-4 rounded overflow-x-auto text-xs text-slate-300">
          {`// Import any preloader
import { P1, P14 } from '@/playground/preloader/Component'

// Use with props
<P1 size={50} color="#ff6b6b" speed={0.8} />
<P14 size={10} color="#fbbf24" speed={0.7} />

// Default props work too
<P1 />`}
        </pre>
      </div>
    </div>
  );
}

export { P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37, P38, P39, P40 };
