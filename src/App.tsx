/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Shared primitives ───────────────────────────────────────────────────────

const Label = ({ children, color = 'text-blue-500' }: { children: React.ReactNode; color?: string }) => (
  <p className={`text-[11px] font-black uppercase tracking-[0.15em] mb-3 ${color}`}>{children}</p>
);

const NavButtons = ({
  onPrev, onNext, prevLabel = '← Kembali', nextLabel = 'Lanjut →', hidePrev = false,
}: { onPrev?: () => void; onNext?: () => void; prevLabel?: string; nextLabel?: string; hidePrev?: boolean }) => (
  <div className="flex gap-3 mt-10 pt-6 border-t border-gray-100">
    {!hidePrev && onPrev && (
      <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all">
        {prevLabel}
      </button>
    )}
    {onNext && (
      <button onClick={onNext} className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-all ml-auto">
        {nextLabel}
      </button>
    )}
  </div>
);

const RevealBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="w-full mt-5 py-3.5 px-6 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-semibold text-gray-400 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all"
  >
    {label}
  </motion.button>
);

// ─── Gene Track (GULO) ───────────────────────────────────────────────────────

const GeneTrack = ({ label, broken, show, delay = 0, highlight = false }: {
  label: string; broken: boolean; show: boolean; delay?: number; highlight?: boolean;
}) => (
  <div className={`flex items-center gap-3 mb-3 p-2 rounded-xl transition-all ${highlight ? 'bg-red-50' : ''}`}>
    <span className="text-[13px] font-bold text-gray-600 w-24 shrink-0 text-right">{label}</span>
    <div className="flex-1 h-9 rounded-xl overflow-hidden flex bg-gray-100 shadow-inner">
      {broken ? (
        <>
          <motion.div className="h-full bg-indigo-400 shrink-0" initial={{ width: 0 }} animate={{ width: show ? '37%' : 0 }} transition={{ delay, duration: 0.5, ease: 'easeOut' }} />
          <motion.div
            className="h-full bg-red-500 shrink-0 flex items-center justify-center"
            initial={{ width: 0 }} animate={{ width: show ? '15%' : 0 }}
            transition={{ delay: delay + 0.45, duration: 0.3 }}
          >
            {show && <span className="text-white font-black text-base leading-none">✕</span>}
          </motion.div>
          <motion.div className="h-full bg-indigo-400 shrink-0" initial={{ width: 0 }} animate={{ width: show ? '48%' : 0 }} transition={{ delay: delay + 0.75, duration: 0.5, ease: 'easeOut' }} />
        </>
      ) : (
        <motion.div className="h-full bg-emerald-400 shrink-0 flex items-center justify-end pr-3" initial={{ width: 0 }} animate={{ width: show ? '100%' : 0 }} transition={{ delay, duration: 0.9, ease: 'easeOut' }}>
          {show && <span className="text-white font-bold text-xs">AKTIF ✓</span>}
        </motion.div>
      )}
    </div>
    <span className={`text-sm font-black w-6 shrink-0 ${broken ? 'text-red-500' : 'text-emerald-500'}`}>
      {broken ? '✗' : '✓'}
    </span>
  </div>
);

// ─── Chromosome SVG ──────────────────────────────────────────────────────────

const ChromosomeSVG = ({
  h, centromere, color = '#818cf8', showInternalTelomere = false, internalPos,
}: { h: number; centromere: number; color?: string; showInternalTelomere?: boolean; internalPos?: number }) => (
  <svg width="36" height={h} viewBox={`0 0 36 ${h}`}>
    <defs>
      <clipPath id={`clip-${h}-${centromere}`}>
        <rect x="4" y="0" width="28" height={h} rx="14" />
      </clipPath>
    </defs>
    {/* Body */}
    <rect x="4" y="0" width="28" height={h} rx="14" fill={color} />
    {/* Telomere caps */}
    <rect x="4" y="0" width="28" height="14" rx="12" fill="#fbbf24" clipPath={`url(#clip-${h}-${centromere})`} />
    <rect x="4" y={h - 14} width="28" height="14" fill="#fbbf24" clipPath={`url(#clip-${h}-${centromere})`} />
    {/* Centromere */}
    <rect x="0" y={centromere} width="36" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
    {/* Internal telomere */}
    {showInternalTelomere && internalPos !== undefined && (
      <motion.rect
        x="4" y={internalPos} width="28" height="12"
        fill="#f59e0b"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        style={{ originX: '50%' }}
        transition={{ duration: 0.6 }}
      />
    )}
  </svg>
);

// ─── Nav Dots ────────────────────────────────────────────────────────────────

const sectionMeta = ['Intro', 'Analogi', 'GULO', 'ERV', 'Kromosom 2', 'Ringkasan'];

const TopNav = ({ current, onGoto }: { current: number; onGoto: (i: number) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 flex items-center justify-between">
    <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">
      Fahrezi Institute
    </span>
    <div className="flex items-center gap-2">
      {sectionMeta.map((s, i) => (
        <button key={s} onClick={() => onGoto(i)} title={s}
          className={`transition-all rounded-full ${i === current ? 'w-6 h-2 bg-gray-900' : i < current ? 'w-2 h-2 bg-gray-300' : 'w-2 h-2 bg-gray-200'}`}
        />
      ))}
    </div>
    <span className="text-[11px] font-bold text-gray-300">{current + 1}/{sectionMeta.length}</span>
  </nav>
);

// ─── Section 0: Intro ────────────────────────────────────────────────────────

const SectionIntro = ({ onNext }: { onNext: () => void }) => (
  <div>
    <Label color="text-blue-500">Demo Interaktif · Fahrezi Institute</Label>
    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-5">
      DNA Mirip Karena Nenek Moyang yang Sama,<br className="hidden sm:block" /> atau "Sistem yang Sama"?
    </h1>
    <p className="text-base text-gray-500 leading-relaxed mb-8">
      Ada yang mengklaim kemiripan DNA antar spesies bukan karena evolusi, tapi karena pencipta memakai <strong className="text-gray-800">"sistem yang sama"</strong>. Kita uji dua hipotesis ini dengan data genomik — bukan narasi, tapi bukti.
    </p>

    {/* Hypothesis cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-black text-sm">A</div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-500">Hipotesis 1</span>
        </div>
        <h3 className="font-black text-gray-800 mb-1">Sistem yang Sama</h3>
        <p className="text-sm text-gray-500">Pencipta merancang "sistem" yang sama untuk semua makhluk, makanya DNA-nya mirip.</p>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-black text-sm">B</div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-500">Hipotesis 2</span>
        </div>
        <h3 className="font-black text-gray-800 mb-1">Common Ancestry</h3>
        <p className="text-sm text-gray-500">DNA mirip karena spesies-spesies itu berasal dari nenek moyang bersama dan mewarisi DNA yang sama.</p>
      </div>
    </div>

    {/* Key question */}
    <div className="bg-gray-900 rounded-2xl p-5 mb-6">
      <p className="text-white text-base font-semibold leading-relaxed">
        Pertanyaannya bukan <em>"mana yang mungkin?"</em><br />
        tapi <strong className="text-blue-300">"mana yang paling kuat menanggung seluruh data?"</strong>
      </p>
    </div>

    {/* Road map */}
    <div className="flex flex-col gap-2">
      {[
        { n: '01', icon: '📝', title: 'Analogi Ujian', sub: 'Kapan kemiripan mulai bermakna?' },
        { n: '02', icon: '🧬', title: 'Pseudogen GULO', sub: 'Gen yang rusak di tempat yang sama' },
        { n: '03', icon: '🦠', title: 'Endogenous Retrovirus', sub: 'Bekas virus di lokasi identik' },
        { n: '04', icon: '🔬', title: 'Kromosom 2', sub: 'Jejak fisik penyatuan dua kromosom' },
      ].map((item) => (
        <div key={item.n} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl">
          <span className="text-xs font-black text-gray-200 w-6">{item.n}</span>
          <span className="text-xl">{item.icon}</span>
          <div>
            <span className="text-sm font-bold text-gray-800">{item.title}</span>
            <span className="text-xs text-gray-400 ml-2">— {item.sub}</span>
          </div>
        </div>
      ))}
    </div>

    <NavButtons hidePrev onNext={onNext} nextLabel="Mulai →" />
  </div>
);

// ─── Section 1: Analogi ──────────────────────────────────────────────────────

const SectionAnalogi = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);

  const probSteps = [
    { label: 'Jawaban benar mirip saja', syst: 72, anc: 28 },
    { label: '+ Kesalahan yang sama', syst: 45, anc: 55 },
    { label: '+ Kalimat janggal yang sama', syst: 22, anc: 78 },
    { label: '+ Poin dilewati & pengganti sama', syst: 6, anc: 94 },
  ];

  const errors = [
    { label: 'Soal 2', text: 'Tujuan: "meningkatkan ekspor pangan nasional"', type: 'wrong' },
    { label: 'Soal 3', text: '"MBG membuat siswa memproduksi makanan sendiri di sekolah."', type: 'weird' },
    { label: 'Soal 4', text: 'Sasaran: "semua pelaku usaha makanan di Indonesia"', type: 'wrong' },
  ];

  return (
    <div>
      <Label>Bagian 1 dari 5</Label>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Analogi Ujian</h2>
      <p className="text-gray-500 mb-6">Kapan dua jawaban yang mirip mulai mencurigakan?</p>

      {/* Step 0: Normal similarity */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-4">
        <Label color="text-gray-400">Temuan awal guru — kemiripan biasa</Label>
        <div className="grid grid-cols-2 gap-3">
          {['A', 'B'].map((s) => (
            <div key={s} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">
                Lembar Jawaban {s}
              </div>
              <div className="space-y-2">
                {['MBG = program makan bergizi gratis untuk anak sekolah', 'Tujuan: membantu pemenuhan gizi', 'Manfaat: mendukung konsentrasi belajar'].map((t, i) => (
                  <div key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2 leading-relaxed">{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-800">
            <strong>Guru belum curiga.</strong> Belajar dari kisi-kisi yang sama → wajar kalau jawaban mirip. Ini masih bisa dijelaskan oleh "sistem belajar yang sama."
          </p>
        </div>
      </div>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🔍 Guru memeriksa lebih teliti..." />}

      {/* Step 1: Errors appear */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-50 rounded-2xl p-5 mb-4">
              <Label color="text-red-500">Temuan selanjutnya — kesalahan yang identik</Label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['A', 'B'].map((s) => (
                  <div key={s} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">
                      Lembar Jawaban {s}
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2">MBG = program makan bergizi gratis ✓</div>
                      {errors.map((e, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className={`text-xs rounded-lg p-2 leading-relaxed border ${
                            e.type === 'wrong'
                              ? 'bg-red-50 border-red-100 text-red-700'
                              : 'bg-orange-50 border-orange-100 text-orange-700'
                          }`}
                        >
                          <span className="font-black mr-1">{e.type === 'wrong' ? '❌' : '❓'}</span>
                          {e.text}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">🚨</span>
                <p className="text-sm text-red-800">
                  <strong>Bukan lagi soal jawaban yang benar yang mirip.</strong> Kesalahan sama, di bagian yang sama, dengan kata yang sama. Kisi-kisi yang sama tidak bisa menghasilkan ini.
                </p>
              </div>
            </div>
            {step === 1 && <RevealBtn onClick={() => setStep(2)} label="📊 Lihat bagaimana bobot hipotesis berubah" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Probability shift */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-900 rounded-2xl p-5 mb-4">
              <Label color="text-gray-400">Bobot hipotesis berubah seiring bertambahnya bukti</Label>
              <div className="flex flex-col gap-5">
                {probSteps.map((d, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                    <p className="text-xs text-gray-400 mb-2 font-semibold">{d.label}</p>
                    <div className="flex h-8 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500 flex items-center justify-center shrink-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.syst}%` }}
                        transition={{ duration: 0.8, delay: i * 0.12 }}
                      >
                        {d.syst > 12 && <span className="text-white text-xs font-black">{d.syst}%</span>}
                      </motion.div>
                      <motion.div
                        className="h-full bg-blue-400 flex items-center justify-center shrink-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.anc}%` }}
                        transition={{ duration: 0.8, delay: i * 0.12 }}
                      >
                        {d.anc > 12 && <span className="text-white text-xs font-black">{d.anc}%</span>}
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-purple-400 font-bold">Sistem yang sama</span>
                      <span className="text-[10px] text-blue-400 font-bold">Common Ancestry</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="text-sm font-bold text-blue-900 leading-relaxed">
                Semua hipotesis masih <em>mungkin</em> — tapi tidak semua sama kuatnya. Semakin banyak kesamaan spesifik (terutama yang <em>rusak atau janggal</em>), semakin jauh satu penjelasan meninggalkan yang lain.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onPrev={onPrev} onNext={onNext} prevLabel="← Intro" nextLabel="Bukti 1: GULO →" />
    </div>
  );
};

// ─── Section 2: GULO ─────────────────────────────────────────────────────────

const SectionGULO = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [showTracks, setShowTracks] = useState(false);

  const species = [
    { name: 'Tikus', broken: false, delay: 0 },
    { name: 'Manusia', broken: true, delay: 0.2 },
    { name: 'Simpanse', broken: true, delay: 0.5 },
    { name: 'Gorilla', broken: true, delay: 0.8 },
    { name: 'Orang Utan', broken: true, delay: 1.1 },
  ];

  return (
    <div>
      <Label>Bagian 2 dari 5 · Bukti 1</Label>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Pseudogen GULO</h2>
      <p className="text-gray-500 mb-6">Gen yang rusak — di tempat yang persis sama.</p>

      {/* Setup cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-2xl">🐀</div>
            <div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-wider">GULO Fungsional</div>
              <div className="text-sm font-bold text-gray-800">Tikus, Kucing, Sapi...</div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Punya GULO yang berfungsi → bisa bikin vitamin C sendiri tanpa makan buah.</p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
            ✓ Dapat membuat vitamin C
          </div>
        </div>
        <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-2xl">🧑‍🦲</div>
            <div>
              <div className="text-xs font-black text-red-500 uppercase tracking-wider">GULO Rusak (Pseudogen)</div>
              <div className="text-sm font-bold text-gray-800">Manusia, Simpanse, Gorilla...</div>
            </div>
          </div>
          <p className="text-sm text-gray-600">GULO <strong>tidak berfungsi</strong> — makanya kita harus makan buah untuk dapat vitamin C.</p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">
            ✗ Tidak dapat membuat vitamin C
          </div>
        </div>
      </div>

      {step === 0 && <RevealBtn onClick={() => { setStep(1); setTimeout(() => setShowTracks(true), 100); }} label="🧬 Lihat peta gen GULO di berbagai spesies" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-900 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <Label color="text-gray-400">Peta Gen GULO — Genome Browser View</Label>
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-400 inline-block" />Aktif</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />Rusak</span>
                  <span className="flex items-center gap-1.5 text-gray-400">LEGEND</span>
                </div>
              </div>

              {species.map((sp) => (
                <GeneTrack
                  key={sp.name}
                  label={sp.name}
                  broken={sp.broken}
                  show={showTracks}
                  delay={sp.delay}
                  highlight={false}
                />
              ))}

              {/* Break zone callout */}
              <AnimatePresence>
                {showTracks && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-3 h-3 rounded-full bg-red-500 shrink-0"
                    />
                    <p className="text-sm font-bold text-red-300">
                      Zona kerusakan berada di <strong className="text-red-100">lokasi yang sama persis</strong> pada semua primata
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya untuk dua hipotesis kita?" />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-2xl border-2 border-purple-100 bg-purple-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-purple-500">Sistem yang Sama</Label>
                  <span className="text-xs font-black text-red-400 bg-red-50 px-2 py-0.5 rounded-full">LEMAH</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pencipta merancang gen rusak yang identik pada semua primata — di lokasi yang sama — tanpa alasan fungsional yang jelas.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-red-400 rounded-full" initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-red-400 font-bold mt-1.5 block">Daya jelas: 20%</span>
              </div>
              <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-blue-500">Common Ancestry</Label>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">KUAT</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">GULO rusak sekali pada nenek moyang primata — kerusakan itu diwariskan ke semua keturunannya, di lokasi yang sama.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-emerald-600 font-bold mt-1.5 block">Daya jelas: 90%</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-gray-200 text-sm leading-relaxed">
                <span className="text-blue-300 font-black">Kunci:</span> Gen rusak tidak ada manfaat fungsional. Tidak ada alasan desain untuk meletakkan "kerusakan" di tempat yang sama persis pada semua primata. Tapi kalau diwariskan dari nenek moyang bersama — itu sangat masuk akal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onPrev={onPrev} onNext={onNext} prevLabel="← Analogi" nextLabel="Bukti 2: ERV →" />
    </div>
  );
};

// ─── Section 3: ERV ──────────────────────────────────────────────────────────

const ERVChromosome = ({ species, positions, show, delayBase }: {
  species: string; positions: number[]; show: boolean; delayBase: number;
}) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs font-bold text-gray-500">{species}</span>
    <div className="relative" style={{ width: 36, height: 160 }}>
      <ChromosomeSVG h={160} centromere={70} color="#818cf8" />
      {show && positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ top: pos }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delayBase + i * 0.15, type: 'spring', stiffness: 300 }}
        >
          <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md shadow-red-300 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">V</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SectionERV = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [showMarkers, setShowMarkers] = useState(false);

  const ervPositions = [22, 48, 75, 102, 125];
  const species = [
    { name: 'Manusia', delay: 0 },
    { name: 'Simpanse', delay: 0.8 },
    { name: 'Gorilla', delay: 1.6 },
  ];

  return (
    <div>
      <Label>Bagian 3 dari 5 · Bukti 2</Label>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Endogenous Retrovirus (ERV)</h2>
      <p className="text-gray-500 mb-6">Bekas infeksi virus — tersisip di lokasi yang identik.</p>

      {/* What is ERV */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl shrink-0">🦠</div>
          <div>
            <h3 className="font-black text-gray-800 mb-1">Apa itu ERV?</h3>
            <p className="text-sm text-gray-600">
              Virus retroaktif bisa menyisipkan DNA-nya ke dalam sel inang. Kalau infeksi terjadi di <strong>sel reproduksi</strong>, sisipan itu akan <strong>diwariskan ke generasi berikutnya</strong> selamanya.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <span className="text-lg">⚠️</span>
          <p className="text-xs text-amber-700 font-semibold">Dari <strong>ribuan</strong> kemungkinan lokasi di sepanjang kromosom, ERV yang sama ditemukan di lokasi yang <strong>identik</strong> pada banyak spesies.</p>
        </div>
      </div>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🦠 Lihat ERV di berbagai spesies" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-900 rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-5">
                <Label color="text-gray-400">Kromosom — marker ERV (titik merah = sisipan virus)</Label>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400">
                  <div className="w-3 h-3 rounded-full bg-red-500" /> ERV
                </div>
              </div>

              <div className="flex justify-around items-start py-2">
                {species.map((sp) => (
                  <ERVChromosome
                    key={sp.name}
                    species={sp.name}
                    positions={ervPositions}
                    show={showMarkers}
                    delayBase={sp.delay}
                  />
                ))}
              </div>

              {!showMarkers ? (
                <button
                  onClick={() => setShowMarkers(true)}
                  className="w-full mt-5 py-3 border-2 border-dashed border-gray-600 rounded-xl text-sm font-bold text-gray-400 hover:border-red-400 hover:text-red-400 transition-all"
                >
                  📍 Tampilkan lokasi ERV
                </button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                  <div className="mt-5 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-center">
                    <p className="text-sm font-black text-red-300">
                      5 lokasi ERV yang sama — pada 3 spesies berbeda
                    </p>
                    <p className="text-xs text-red-400/70 mt-1">Probabilitas terjadi secara kebetulan: astronomis kecil</p>
                  </div>
                  {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya untuk dua hipotesis kita?" />}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-2xl border-2 border-purple-100 bg-purple-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-purple-500">Sistem yang Sama</Label>
                  <span className="text-xs font-black text-red-400 bg-red-50 px-2 py-0.5 rounded-full">SANGAT LEMAH</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pencipta menyisipkan <em>bekas DNA virus</em> di lokasi identik pada banyak spesies — tanpa fungsi yang jelas.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-red-400 rounded-full" initial={{ width: 0 }} animate={{ width: '8%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-red-400 font-bold mt-1.5 block">Daya jelas: 8%</span>
              </div>
              <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-blue-500">Common Ancestry</Label>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">SANGAT KUAT</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Virus menginfeksi sel reproduksi nenek moyang primata sekali → diwariskan ke semua keturunannya di lokasi yang sama.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-emerald-600 font-bold mt-1.5 block">Daya jelas: 95%</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-gray-200 text-sm leading-relaxed">
                <span className="text-blue-300 font-black">Kunci:</span> ERV adalah <em>bekas infeksi</em> — bukan bagian dari desain fungsional. Tidak ada alasan untuk menaruhnya di lokasi yang sama pada banyak spesies — kecuali semuanya mewarisinya dari sumber yang sama.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onPrev={onPrev} onNext={onNext} prevLabel="← GULO" nextLabel="Bukti 3: Kromosom 2 →" />
    </div>
  );
};

// ─── Section 4: Kromosom 2 ───────────────────────────────────────────────────

const SectionKromosom = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [showTelomere, setShowTelomere] = useState(false);

  return (
    <div>
      <Label>Bagian 4 dari 5 · Bukti 3</Label>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Kromosom 2 Manusia</h2>
      <p className="text-gray-500 mb-6">Sidik jari fisik dari peristiwa penyatuan kromosom.</p>

      {/* Number cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
          <div className="text-5xl font-black text-blue-600 mb-1 leading-none">46</div>
          <div className="text-sm font-bold text-gray-700">Kromosom Manusia</div>
          <div className="text-xs text-gray-400 mt-1">23 pasang</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center">
          <div className="text-5xl font-black text-indigo-500 mb-1 leading-none">48</div>
          <div className="text-sm font-bold text-gray-700">Kromosom Primata</div>
          <div className="text-xs text-gray-400 mt-1">Simpanse, Gorilla, Orang Utan</div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5 flex items-center gap-3">
        <span className="text-xl shrink-0">🤔</span>
        <p className="text-sm text-amber-800 font-semibold">Manusia punya 2 kromosom lebih sedikit. <strong>Ke mana mereka?</strong></p>
      </div>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🔬 Lihat apa yang ditemukan ilmuwan" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-900 rounded-2xl p-6 mb-4">
              <Label color="text-gray-400">Visualisasi Fusi Kromosom</Label>

              <div className="flex items-center justify-center gap-4 sm:gap-8 py-4">
                {/* Chimp */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-indigo-300">Simpanse</span>
                  <div className="flex gap-3">
                    {[{ h: 100, c: 58 }, { h: 108, c: 40 }].map((chr, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <ChromosomeSVG h={chr.h} centromere={chr.c} color="#818cf8" />
                        <span className="text-[10px] text-gray-500">Chr 2{i === 0 ? 'a' : 'b'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-2xl text-gray-500">→</span>
                  <span className="text-[9px] text-gray-600 font-bold text-center">FUSI<br/>KROMOSOM</span>
                </motion.div>

                {/* Human chr 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-bold text-blue-300">Manusia</span>
                  <div className="flex flex-col items-center gap-1">
                    <ChromosomeSVG
                      h={180}
                      centromere={68}
                      color="#60a5fa"
                      showInternalTelomere={showTelomere}
                      internalPos={86}
                    />
                    <span className="text-[10px] text-gray-500">Chr 2</span>
                  </div>
                </motion.div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-5 mt-2 mb-4">
                <div className="flex items-center gap-1.5 text-[10px] text-yellow-300 font-bold">
                  <div className="w-3 h-3 rounded-sm bg-yellow-400" /> Telomere
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                  <div className="w-6 h-1.5 rounded-full bg-white/30" /> Sentromer
                </div>
              </div>

              {!showTelomere ? (
                <button
                  onClick={() => setShowTelomere(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-600 rounded-xl text-sm font-bold text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-all"
                >
                  💡 Tampilkan bekas telomere di tengah kromosom 2 manusia
                </button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4">
                    <p className="text-sm font-bold text-yellow-300 text-center mb-1">
                      Telomere ditemukan di <em>tengah</em> kromosom 2 manusia!
                    </p>
                    <p className="text-xs text-yellow-400/70 text-center">
                      Normalnya telomere hanya ada di ujung kromosom. Keberadaannya di tengah = sisa dari dua kromosom yang pernah bergabung.
                    </p>
                  </div>
                  {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya untuk dua hipotesis kita?" />}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-2xl border-2 border-purple-100 bg-purple-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-purple-500">Sistem yang Sama</Label>
                  <span className="text-xs font-black text-red-400 bg-red-50 px-2 py-0.5 rounded-full">SANGAT LEMAH</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pencipta merancang kromosom 2 manusia dengan menyertakan telomere di tengah — yang strukturnya persis seperti bekas penyatuan dua kromosom.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-red-400 rounded-full" initial={{ width: 0 }} animate={{ width: '6%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-red-400 font-bold mt-1.5 block">Daya jelas: 6%</span>
              </div>
              <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Label color="text-blue-500">Common Ancestry</Label>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">SANGAT KUAT</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Dua kromosom bergabung pada nenek moyang manusia. Bekas telomere di tengah, dua sentromer — semua cocok sempurna.</p>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ duration: 0.8 }} />
                </div>
                <span className="text-xs text-emerald-600 font-bold mt-1.5 block">Daya jelas: 96%</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-5">
              <p className="text-gray-200 text-sm leading-relaxed">
                <span className="text-blue-300 font-black">Kunci:</span> Ini bukan kemiripan abstrak — ini <strong className="text-white">jejak fisik</strong> yang tertulis di DNA. Telomere di tengah kromosom bukan sesuatu yang bisa "dirancang secara kebetulan" untuk terlihat seperti bekas penyatuan.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onPrev={onPrev} onNext={onNext} prevLabel="← ERV" nextLabel="Ringkasan →" />
    </div>
  );
};

// ─── Section 5: Ringkasan ────────────────────────────────────────────────────

const SectionRingkasan = ({ onPrev, onRestart }: { onPrev: () => void; onRestart: () => void }) => {
  const rows = [
    { icon: '🧬', bukti: 'GULO Pseudogen', sub: 'Gen rusak di lokasi sama', wSyst: 20, wAnc: 90 },
    { icon: '🦠', bukti: 'ERV', sub: 'Bekas virus di lokasi identik', wSyst: 8, wAnc: 95 },
    { icon: '🔬', bukti: 'Kromosom 2', sub: 'Telomere di tengah kromosom', wSyst: 6, wAnc: 96 },
  ];

  return (
    <div>
      <Label>Bagian 5 dari 5</Label>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Hipotesis Mana yang Paling Kuat?</h2>
      <p className="text-gray-500 mb-6">Tiga bukti dari tiga arah berbeda. Sekarang kita timbang secara jujur.</p>

      {/* Scorecard */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden mb-5">
        <div className="grid grid-cols-[auto_1fr_1fr] border-b border-gray-700">
          <div className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Bukti</div>
          <div className="px-4 py-3 text-[10px] font-black text-purple-400 uppercase tracking-wider border-l border-gray-700">Sistem yang Sama</div>
          <div className="px-4 py-3 text-[10px] font-black text-blue-400 uppercase tracking-wider border-l border-gray-700">Common Ancestry</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.bukti}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`grid grid-cols-[auto_1fr_1fr] ${i < rows.length - 1 ? 'border-b border-gray-800' : ''}`}
          >
            <div className="px-4 py-4">
              <div className="text-xl mb-1">{row.icon}</div>
              <p className="text-xs font-bold text-gray-300">{row.bukti}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{row.sub}</p>
            </div>
            <div className="px-4 py-4 border-l border-gray-800">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-[10px] font-black">✗</span>
                </div>
                <span className="text-[10px] font-black text-red-400">LEMAH</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div className="h-full bg-red-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${row.wSyst}%` }} transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }} />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">{row.wSyst}%</span>
            </div>
            <div className="px-4 py-4 border-l border-gray-800">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-[10px] font-black">✓</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400">KUAT</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${row.wAnc}%` }} transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }} />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">{row.wAnc}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why */}
      <div className="bg-gray-900 rounded-2xl p-5 mb-4">
        <Label color="text-gray-400">Kenapa ini penting?</Label>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Hipotesis "sistem yang sama" bisa menjelaskan kemiripan di bagian yang <em>fungsional</em>. Tapi ia tidak bisa menjelaskan dengan baik:
        </p>
        <div className="flex flex-col gap-2">
          {[
            { icon: '🧬', text: 'Gen yang rusak di tempat yang sama' },
            { icon: '🦠', text: 'Bekas infeksi virus di lokasi identik' },
            { icon: '🔬', text: 'Struktur kromosom dengan tanda penyatuan yang khas' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3">
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="text-sm text-gray-300 font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-blue-300 text-sm font-bold">
            Common ancestry tidak perlu alasan baru untuk setiap bukti. Satu penjelasan menanggung semuanya — dan itu bukan kebetulan kecil.
          </p>
        </div>
      </div>

      {/* Analogy callback */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-4">
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Ingat analogi ujian:</strong> Kemiripan jawaban yang benar bisa terjadi karena belajar dari sumber yang sama. Tapi kesalahan yang sama, di tempat yang sama — butuh penjelasan yang lebih spesifik.
          <br /><br />
          Dalam DNA: gen rusak, bekas virus, dan bekas penyatuan kromosom adalah "kesalahan" tersebut.
        </p>
      </div>

      {/* Final quote */}
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-gray-200 text-base font-bold leading-relaxed mb-2">
          "Yang terpenting bukan sekadar apakah ada penjelasan alternatif."
        </p>
        <p className="text-blue-300 text-sm">
          Tapi <strong>penjelasan mana yang paling kuat menanggung seluruh rincian data.</strong>
        </p>
      </div>

      <div className="flex gap-3 mt-10 pt-6 border-t border-gray-100">
        <button onClick={onPrev} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all">
          ← Kromosom 2
        </button>
        <button onClick={onRestart} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all ml-auto">
          ↺ Mulai Ulang
        </button>
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────

type Section = 0 | 1 | 2 | 3 | 4 | 5;

export default function App() {
  const [section, setSection] = useState<Section>(0);

  const goTo = (n: number) => {
    setSection(n as Section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections: Record<Section, React.ReactNode> = {
    0: <SectionIntro onNext={() => goTo(1)} />,
    1: <SectionAnalogi onPrev={() => goTo(0)} onNext={() => goTo(2)} />,
    2: <SectionGULO onPrev={() => goTo(1)} onNext={() => goTo(3)} />,
    3: <SectionERV onPrev={() => goTo(2)} onNext={() => goTo(4)} />,
    4: <SectionKromosom onPrev={() => goTo(3)} onNext={() => goTo(5)} />,
    5: <SectionRingkasan onPrev={() => goTo(4)} onRestart={() => goTo(0)} />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav current={section} onGoto={goTo} />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {sections[section]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
