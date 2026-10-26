import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets,
  Lightbulb,
  Sparkles,
  Check,
  RotateCcw,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { ROOM_SIMULATOR_JOBS } from '../../data/siteContent';
import { useCart } from '../../context/CartContext';
import { INITIAL_SERVICES } from '../../lib/mockData';
import toast from 'react-hot-toast';

export function RoomSimulator() {
  const navigate = useNavigate();
  const { addMultipleToCart } = useCart();

  const [activeStep, setActiveStep] = useState(0);
  const [fixedStates, setFixedStates] = useState(() => {
    try {
      const saved = localStorage.getItem('serveease_simulator_fixed');
      return saved ? JSON.parse(saved) : { tap: false, ceiling: false, wall: false };
    } catch {
      return { tap: false, ceiling: false, wall: false };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('serveease_simulator_fixed', JSON.stringify(fixedStates));
    } catch {
      // storage unavailable
    }
  }, [fixedStates]);

  const toggleFix = (e, jobId) => {
    e?.preventDefault();
    e?.stopPropagation();
    setFixedStates((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const handleCompleteAll = (e) => {
    e?.preventDefault();
    setFixedStates({
      tap: true,
      ceiling: true,
      wall: true,
    });
  };

  const handleReset = (e) => {
    e?.preventDefault();
    setFixedStates({
      tap: false,
      ceiling: false,
      wall: false,
    });
    setActiveStep(0);
  };

  const handleAddAllToCart = (e) => {
    e?.preventDefault();
    // Real catalogue service IDs: 3 (Plumbing Repair), 10 (Electrician), 16 (Painting Touch-ups)
    const s1 = INITIAL_SERVICES.find((s) => s.id === 3);
    const s2 = INITIAL_SERVICES.find((s) => s.id === 10);
    const s3 = INITIAL_SERVICES.find((s) => s.id === 16);
    const itemsToAdd = [
      { service: s1 },
      { service: s2 },
      { service: s3 },
    ].filter((item) => Boolean(item.service));

    addMultipleToCart(itemsToAdd);
    toast.success('Added all 3 services to your cart!');
    navigate('/cart');
  };

  const allCompleted = fixedStates.tap && fixedStates.ceiling && fixedStates.wall;
  const currentJob = ROOM_SIMULATOR_JOBS[activeStep];

  return (
    <section
      id="room-simulator"
      className="container-custom scroll-mt-24"
      aria-labelledby="simulator-heading"
    >
      <div className="bg-white rounded-[28px] border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDE3DA]/60">
          <div>
            <span className="text-[11px] font-bold tracking-[0.14em] text-[#173D32] uppercase block mb-1">
              Interactive Room Simulator
            </span>
            <h2
              id="simulator-heading"
              className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight"
            >
              {allCompleted ? 'All 3 Issues Successfully Resolved' : currentJob.title}
            </h2>
          </div>

          {/* Navigation step pills + Complete All button */}
          <div className="flex flex-wrap items-center gap-2">
            {ROOM_SIMULATOR_JOBS.map((job, index) => {
              const isFixed = fixedStates[job.id];
              const isActive = activeStep === index;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : isFixed
                      ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                      : 'bg-[#F7F7F2] text-neutral-700 hover:bg-[#E8EBE2]'
                  }`}
                >
                  {isFixed && <Check className="w-3.5 h-3.5 text-[#173D32]" />}
                  <span>{job.tabLabel}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={allCompleted ? handleReset : handleCompleteAll}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#DDE3DA] hover:border-[#173D32]/40 bg-white text-neutral-800 hover:bg-[#F7F7F2] transition-all cursor-pointer flex items-center gap-1.5 ml-1"
            >
              {allCompleted ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Reset Demo</span>
                </>
              ) : (
                <span>Complete All</span>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Interactive Simulator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left Column: Job Cards */}
          <div className="lg:col-span-5 space-y-4">
            {ROOM_SIMULATOR_JOBS.map((job, idx) => {
              const isSelected = activeStep === idx;
              const isFixed = fixedStates[job.id];
              const Icon = idx === 0 ? Droplets : idx === 1 ? Lightbulb : Sparkles;

              return (
                <div
                  key={job.id}
                  onClick={() => setActiveStep(idx)}
                  className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer border relative ${
                    isSelected
                      ? 'border-[#173D32] bg-[#E8EBE2]/30 ring-1 ring-[#173D32]/20 shadow-xs'
                      : 'border-[#DDE3DA] bg-white hover:border-[#173D32]/40 hover:bg-[#F7F7F2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isFixed
                            ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                            : isSelected
                            ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                            : 'bg-[#F7F7F2] text-[#66716A]'
                        }`}
                      >
                        {isFixed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xs font-bold tracking-wider uppercase ${
                              isSelected ? 'text-[#173D32]' : 'text-neutral-800'
                            }`}
                          >
                            {job.code}
                          </h3>
                        </div>

                        <p className="text-xs text-[#66716A] mt-1 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Status Label and Toggle Action */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={(e) => toggleFix(e, job.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                              isFixed
                                ? 'bg-[#E8EBE2] text-[#173D32] hover:bg-[#DDE3DA] border border-[#DDE3DA]'
                                : 'bg-[#173D32] text-white hover:bg-[#245544]'
                            }`}
                          >
                            {isFixed ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Fixed</span>
                              </>
                            ) : (
                              <span>Fix This Issue</span>
                            )}
                          </button>

                          <span className="text-[11px] text-[#66716A]">
                            {isFixed ? job.fixedTag : job.issueTag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage (Clean Vector Room Illustration) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-4/3 max-h-[460px] bg-[#FAF9F5] rounded-[24px] border border-neutral-200/90 overflow-hidden shadow-inner flex items-center justify-center p-4 sm:p-6 select-none">
              {/* Ceiling Lamp Glow Beam (Visible when fixed) */}
              <div
                className={`absolute top-0 left-[62%] -translate-x-1/2 w-64 h-80 bg-gradient-to-b from-amber-200/50 via-amber-100/20 to-transparent pointer-events-none transition-opacity duration-500 rounded-b-full blur-xs ${
                  fixedStates.ceiling ? 'opacity-100' : 'opacity-15 animate-pulse'
                }`}
              />

              {/* Vector SVG Scene */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full object-contain"
                aria-label="Room illustration demonstrating kitchen tap, pendant light, and wall maintenance fixes"
              >
                {/* Floor Line */}
                <line x1="0" y1="460" x2="800" y2="460" stroke="#E6E4DE" strokeWidth="2" />
                <line x1="450" y1="460" x2="560" y2="600" stroke="#EDEBE5" strokeWidth="2" />
                <line x1="200" y1="460" x2="260" y2="600" stroke="#EDEBE5" strokeWidth="2" />

                {/* 1. KITCHEN COUNTER & TAP (LEFT) */}
                <g className="cursor-pointer" onClick={(e) => toggleFix(e, 'tap')}>
                  {/* Counter Base */}
                  <rect x="60" y="340" width="360" height="120" rx="4" fill="#E4E1D8" stroke="#D3CFCB" strokeWidth="1.5" />
                  {/* Counter Slab */}
                  <rect x="50" y="330" width="380" height="15" rx="3" fill="#FFFFFF" stroke="#D3CFCB" strokeWidth="1" />
                  {/* Drawer Line */}
                  <line x1="60" y1="385" x2="420" y2="385" stroke="#D3CFCB" strokeWidth="1.5" />
                  <circle cx="150" cy="358" r="3" fill="#8E8B85" />
                  <circle cx="330" cy="358" r="3" fill="#8E8B85" />

                  {/* Sink Basin */}
                  <rect x="140" y="333" width="180" height="10" rx="4" fill="#CAC6BD" />

                  {/* Swan Neck Faucet */}
                  <path
                    d="M 230 332 L 230 260 C 230 240, 200 240, 200 258"
                    fill="none"
                    stroke="#5A5854"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Tap Aerator Collar */}
                  <rect x="195" y="258" width="10" height="6" rx="1" fill="#0f766e" />

                  {/* Drip Animation / Check Status */}
                  {!fixedStates.tap ? (
                    <g>
                      <circle cx="200" cy="285" r="4.5" fill="#0f766e">
                        <animate
                          attributeName="cy"
                          values="270;325;325"
                          keyTimes="0;0.7;1"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="1;0.8;0"
                          keyTimes="0;0.7;1"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="200" cy="326" r="8" fill="none" stroke="#0f766e" strokeWidth="1.5">
                        <animate
                          attributeName="r"
                          values="2;12"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="1;0"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  ) : (
                    <g transform="translate(182, 280)">
                      <circle cx="18" cy="18" r="14" fill="#0f766e" />
                      <path d="M 12 18 L 16 22 L 24 14" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  )}
                </g>

                {/* 2. CEILING LAMP (CENTER-RIGHT) */}
                <g className="cursor-pointer" onClick={(e) => toggleFix(e, 'ceiling')}>
                  <line x1="510" y1="0" x2="510" y2="170" stroke="#1A1A1A" strokeWidth="3" />
                  <polygon points="480,215 540,215 520,170 500,170" fill="#26282E" />
                  <circle
                    cx="510"
                    cy="222"
                    r="10"
                    fill={fixedStates.ceiling ? '#FDE68A' : '#D1D5DB'}
                  />
                  {fixedStates.ceiling && (
                    <circle cx="510" cy="222" r="16" fill="#FDE68A" opacity="0.4" />
                  )}
                </g>

                {/* 3. WALL FRAME & DAMPNESS STAIN (FAR RIGHT) */}
                <g className="cursor-pointer" onClick={(e) => toggleFix(e, 'wall')}>
                  <rect x="590" y="220" width="160" height="240" rx="16" fill="#EAE7DF" stroke="#DCD8CE" strokeWidth="1.5" />
                  <rect x="620" y="250" width="100" height="65" rx="4" fill="#FFFFFF" stroke="#D3CFCB" strokeWidth="1" />
                  <circle cx="670" cy="282" r="14" fill="#EAE7DF" />

                  {!fixedStates.wall ? (
                    <path
                      d="M 610 370 C 600 350, 650 330, 690 340 C 730 350, 750 380, 740 410 C 730 435, 680 445, 640 435 C 610 425, 615 390, 610 370 Z"
                      fill="#C5BEB1"
                      opacity="0.85"
                    />
                  ) : (
                    <g>
                      <path
                        d="M 610 370 C 600 350, 650 330, 690 340 C 730 350, 750 380, 740 410 C 730 435, 680 445, 640 435 C 610 425, 615 390, 610 370 Z"
                        fill="#EAE7DF"
                        opacity="1"
                      />
                      <rect x="620" y="360" width="100" height="50" rx="8" fill="#FFFFFF" opacity="0.8" />
                      <text x="670" y="390" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f766e">
                        ✓ Sealed & Coated
                      </text>
                    </g>
                  )}
                </g>
              </svg>

              {/* Hotspot 1: Tap Drip */}
              <button
                type="button"
                onClick={(e) => toggleFix(e, 'tap')}
                className={`absolute top-[28%] left-[24%] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5 ${
                  fixedStates.tap
                    ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                    : 'bg-white text-rose-600 border border-rose-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${fixedStates.tap ? 'bg-[#173D32]' : 'bg-rose-500'}`} />
                <span>{fixedStates.tap ? '✓ Tap Sealed' : '• Continuous Drip'}</span>
              </button>

              {/* Hotspot 2: Ceiling Light */}
              <button
                type="button"
                onClick={(e) => toggleFix(e, 'ceiling')}
                className={`absolute top-[32%] left-[64%] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5 ${
                  fixedStates.ceiling
                    ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                    : 'bg-white text-amber-600 border border-amber-200'
                }`}
              >
                <span>{fixedStates.ceiling ? '✓ Rewired & Stable' : '⚠️ Wiring Flicker'}</span>
              </button>

              {/* Hotspot 3: Wall Dampness */}
              <button
                type="button"
                onClick={(e) => toggleFix(e, 'wall')}
                className={`absolute bottom-[16%] right-[8%] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs cursor-pointer transition-transform hover:scale-105 flex items-center gap-1.5 ${
                  fixedStates.wall
                    ? 'bg-[#E8EBE2] text-[#173D32] border border-[#DDE3DA]'
                    : 'bg-white text-rose-600 border border-rose-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${fixedStates.wall ? 'bg-[#173D32]' : 'bg-rose-500'}`} />
                <span>{fixedStates.wall ? '✓ Sealant Applied' : '• Wall Dampness Stain'}</span>
              </button>

              {/* Completion Overlay Banner when all 3 jobs are fixed */}
              {allCompleted && (
                <div className="absolute inset-x-4 sm:inset-x-8 bottom-4 sm:bottom-6 bg-neutral-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-700 shadow-xl animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#173D32] text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        3 jobs. 1 afternoon. One app.
                      </h4>
                      <p className="text-[11px] text-neutral-300">
                        Plumbing Repair, Electrician, and Painting Touch-ups bundled together.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddAllToCart}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add all 3 to cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
