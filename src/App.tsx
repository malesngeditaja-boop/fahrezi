/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Types ──────────────────────────────────────────────────────────────────
type Section = 0 | 1 | 2 | 3 | 4 | 5;

// ─── Shared primitives ───────────────────────────────────────────────────────

const Label = ({ children, color = 'text-blue-600' }: { children: React.ReactNode; color?: string }) => (
  <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${color}`}>{children}</p>
);

const StrengthBar = ({ pct, color }: { pct: number; color: 'green' | 'red' | 'yellow' }) => {
  const fill = { green: 'bg-green-500', red: 'bg-red-400', yellow: 'bg-yellow-400' }[color];
  return (
    <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${fill}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
};

const RevealBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="w-full mt-4 py-3 px-6 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
  >
    {label}
  </button>
);

const NavButtons = ({
  onPrev,
  onNext,
  prevLabel = '← Kembali',
  nextLabel = 'Lanjut →',
  hidePrev = false,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  hidePrev?: boolean;
}) => (
  <div className="flex gap-3 mt-10 pt-6 border-t border-gray-100">
    {!hidePrev && onPrev && (
      <button
        onClick={onPrev}
        className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
      >
        {prevLabel}
      </button>
    )}
    {onNext && (
      <button
        onClick={onNext}
        className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all ml-auto"
      >
        {nextLabel}
      </button>
    )}
  </div>
);

const HypothesisCard = ({
  title,
  color,
  body,
  note,
  pct,
  barColor,
  strength,
  strengthColor,
}: {
  title: string;
  color: string;
  body: string;
  note: string;
  pct: number;
  barColor: 'green' | 'red' | 'yellow';
  strength: string;
  strengthColor: string;
}) => (
  <div className={`bg-white border border-gray-100 rounded-2xl p-6 border-t-4 ${color}`}>
    <Label color={color.replace('border-', 'text-')}>{title}</Label>
    <p className="text-sm text-gray-600 leading-relaxed mb-3">{body}</p>
    <p className="text-sm text-gray-500 leading-relaxed">
      <span className="font-semibold text-gray-700">Pertanyaan:</span> {note}
    </p>
    <StrengthBar pct={pct} color={barColor} />
    <p className={`text-xs font-bold mt-2 ${strengthColor}`}>{strength}</p>
  </div>
);

const InsightBox = ({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'amber' | 'red' | 'green' | 'dark' }) => {
  const styles = {
    blue: 'bg-blue-50 border-blue-100 text-blue-900',
    amber: 'bg-amber-50 border-amber-100 text-amber-900',
    red: 'bg-red-50 border-red-100 text-red-900',
    green: 'bg-green-50 border-green-100 text-green-900',
    dark: 'bg-gray-900 border-gray-900 text-white',
  }[color];
  return (
    <div className={`border rounded-2xl p-5 mt-5 ${styles}`}>
      {children}
    </div>
  );
};

// ─── Section 0: Intro ────────────────────────────────────────────────────────
const SectionIntro = ({ onNext }: { onNext: () => void }) => (
  <div>
    <Label>Demo Interaktif · Fahrezi Institute</Label>
    <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-5">
      DNA Mirip Karena Nenek Moyang yang Sama, atau Karena "Sistem yang Sama"?
    </h1>
    <p className="text-lg text-gray-600 leading-relaxed mb-4">
      Seseorang mengklaim bahwa kemiripan DNA antar spesies itu bukan karena evolusi, melainkan karena sang pencipta memberikan <strong>"sistem yang sama"</strong> kepada semua makhluk.
    </p>
    <p className="text-base text-gray-500 leading-relaxed mb-8">
      Apakah klaim ini kuat? Di sini kita akan menguji dua hipotesis tersebut menggunakan data genomik — bukan dengan narasi, tapi dengan bukti.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 border-l-4 border-l-purple-500">
        <Label color="text-purple-600">Hipotesis 1</Label>
        <h3 className="font-bold text-gray-900 mb-2">Sistem yang Sama</h3>
        <p className="text-sm text-gray-500">Kemiripan DNA terjadi karena pencipta menggunakan rancangan yang sama untuk semua makhluk.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 border-l-4 border-l-blue-600">
        <Label color="text-blue-600">Hipotesis 2</Label>
        <h3 className="font-bold text-gray-900 mb-2">Common Ancestry</h3>
        <p className="text-sm text-gray-500">Kemiripan DNA terjadi karena spesies-spesies tersebut berasal dari nenek moyang bersama.</p>
      </div>
    </div>

    <InsightBox color="blue">
      <p className="text-sm font-semibold leading-relaxed">
        Yang akan kita lihat bukan mana yang "lebih mungkin" — tapi mana yang{' '}
        <em>paling kuat menanggung seluruh data</em> yang ada.
      </p>
    </InsightBox>

    <div className="mt-8">
      <Label color="text-gray-400">Yang akan kita bahas</Label>
      <div className="flex flex-col gap-3">
        {[
          { icon: '📝', title: 'Analogi Ujian', sub: 'Kapan kemiripan mulai bermakna?' },
          { icon: '🧬', title: 'Pseudogen GULO', sub: 'Gen yang rusak, di tempat yang sama' },
          { icon: '🦠', title: 'Endogenous Retrovirus (ERV)', sub: 'Bekas virus lama yang nyangkut di lokasi identik' },
          { icon: '🔬', title: 'Kromosom 2 Manusia', sub: 'Bekas penyatuan dua kromosom' },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span className="text-gray-400 text-sm ml-2">— {item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <NavButtons hidePrev onNext={onNext} nextLabel="Mulai Demo →" />
  </div>
);

// ─── Section 1: Analogi Ujian ────────────────────────────────────────────────
const SectionAnalogi = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);

  const probData = [
    { label: 'Jawaban benar mirip', sumber: 72, nenek: 28 },
    { label: '+ Kesalahan yang sama', sumber: 45, nenek: 55 },
    { label: '+ Kalimat janggal yang sama', sumber: 22, nenek: 78 },
    { label: '+ Poin dilewati & pengganti sama', sumber: 8, nenek: 92 },
  ];

  return (
    <div>
      <Label>Bagian 1 dari 5</Label>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Analogi Ujian: Kapan Kemiripan Mulai Bermakna?</h2>

      <p className="text-gray-600 leading-relaxed mb-5">
        Guru memeriksa jawaban dua siswa, A dan B. Mari kita ikuti apa yang ia temukan — langkah demi langkah.
      </p>

      {/* Step 1: Jawaban mirip */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Temuan pertama — Jawaban benar mirip</p>
          <div className="grid grid-cols-2 gap-3">
            {['A', 'B'].map((s) => (
              <div key={s} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Siswa {s}</p>
                {[
                  'MBG = program makan bergizi gratis untuk anak sekolah',
                  'Tujuan: membantu pemenuhan gizi, meningkatkan kesehatan',
                  'Manfaat: mendukung konsentrasi belajar',
                ].map((t, i) => (
                  <div key={i} className="text-xs text-gray-600 bg-white rounded-lg p-2.5 mb-2 last:mb-0 border border-gray-100">
                    {t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <InsightBox color="amber">
            <p className="text-sm">
              <strong>Guru belum curiga.</strong> Mereka belajar dari kisi-kisi yang sama — jawaban mirip itu wajar. Kemiripan ini masih bisa dijelaskan oleh <em>"sistem belajar yang sama."</em>
            </p>
          </InsightBox>
        </div>
      </div>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🔍 Periksa lebih teliti..." />}

      {/* Step 2: Kesalahan yang sama */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
            <div className="px-5 pt-5 pb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Temuan selanjutnya — Kesalahan yang sama</p>
              <div className="grid grid-cols-2 gap-3">
                {['A', 'B'].map((s) => (
                  <div key={s} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Siswa {s}</p>
                    <div className="text-xs text-gray-600 bg-white rounded-lg p-2.5 mb-2 border border-gray-100">MBG = program makan bergizi gratis ✓</div>
                    <div className="text-xs text-red-700 bg-red-50 rounded-lg p-2.5 mb-2 border border-red-100">
                      ❌ "...tujuan utama MBG adalah meningkatkan <u>ekspor pangan nasional</u>..."
                    </div>
                    <div className="text-xs text-orange-700 bg-orange-50 rounded-lg p-2.5 mb-2 border border-orange-100">
                      ❓ "MBG membuat siswa <u>memproduksi makanan sendiri</u> di sekolah."
                    </div>
                    <div className="text-xs text-red-700 bg-red-50 rounded-lg p-2.5 border border-red-100">
                      ❌ "Sasaran utama: <u>semua pelaku usaha makanan</u> di Indonesia"
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 pb-5">
              <InsightBox color="red">
                <p className="text-sm">
                  <strong>Ini bukan lagi soal kemiripan yang benar.</strong> Kesalahan sama, di bagian sama, kalimat janggal sama. Kisi-kisi yang sama tidak menghasilkan kesalahan yang identik.
                </p>
              </InsightBox>
              {step === 1 && <RevealBtn onClick={() => setStep(2)} label="📊 Lihat bagaimana bobot hipotesis berubah" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Probability shift */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Setiap bukti baru menggeser bobot penjelasan</p>
            <div className="flex flex-col gap-5">
              {probData.map((d, i) => (
                <motion.div key={d.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
                  <p className="text-xs font-semibold text-gray-600 mb-2">{d.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-500 font-bold w-20 shrink-0">Sist. Sama</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-400 rounded-full flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.sumber}%` }}
                        transition={{ duration: 0.7, delay: i * 0.15 }}
                      >
                        <span className="text-white text-[10px] font-bold">{d.sumber}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-blue-600 font-bold w-20 shrink-0">Com. Anc.</span>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.nenek}%` }}
                        transition={{ duration: 0.7, delay: i * 0.15 }}
                      >
                        <span className="text-white text-[10px] font-bold">{d.nenek}%</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <InsightBox color="blue">
              <p className="text-sm font-semibold">
                Semua kemungkinan masih <em>mungkin</em> — tapi tidak semua sama kuatnya. Semakin banyak rincian spesifik (terutama yang rusak atau janggal), semakin jauh satu hipotesis meninggalkan yang lain.
              </p>
            </InsightBox>
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

  const species = [
    { name: 'Tikus', functional: true, color: 'bg-green-500' },
    { name: 'Manusia', functional: false, color: 'bg-red-400' },
    { name: 'Simpanse', functional: false, color: 'bg-red-400' },
    { name: 'Gorilla', functional: false, color: 'bg-red-400' },
    { name: 'Orang Utan', functional: false, color: 'bg-red-400' },
  ];

  return (
    <div>
      <Label>Bagian 2 dari 5 · Bukti 1</Label>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Pseudogen GULO: Gen yang Rusak di Tempat yang Sama</h2>

      <p className="text-gray-600 leading-relaxed mb-5">
        Hampir semua mamalia bisa membuat <strong>vitamin C sendiri</strong> di dalam tubuh menggunakan enzim dari gen <strong>GULO</strong>. Tapi tidak semua makhluk punya gen GULO yang berfungsi.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 border-t-4 border-t-green-500">
          <Label color="text-green-700">Gen GULO Fungsional</Label>
          <p className="text-sm text-gray-600 mb-3">Tikus, anjing, kucing, sapi — semuanya punya GULO yang bekerja. Mereka bisa mensintesis vitamin C sendiri.</p>
          <div className="bg-green-50 text-green-700 text-xs font-bold rounded-lg px-3 py-2">✓ Dapat membuat vitamin C</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 border-t-4 border-t-red-400">
          <Label color="text-red-600">Gen GULO Rusak (Pseudogen)</Label>
          <p className="text-sm text-gray-600 mb-3">Manusia, simpanse, gorilla, orang utan — semuanya punya gen GULO yang <strong>tidak berfungsi</strong>. Makanya kita butuh vitamin C dari makanan.</p>
          <div className="bg-red-50 text-red-600 text-xs font-bold rounded-lg px-3 py-2">✗ Tidak dapat membuat vitamin C</div>
        </div>
      </div>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🧬 Lihat di mana gen GULO-nya rusak" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Peta gen GULO di berbagai spesies</p>

            <div className="flex flex-col gap-4">
              {species.map((sp) => (
                <div key={sp.name}>
                  <p className="text-sm font-semibold text-gray-700 mb-1.5">{sp.name}</p>
                  {sp.functional ? (
                    <div className="h-9 bg-green-500 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                      GEN GULO LENGKAP — AKTIF ✓
                    </div>
                  ) : (
                    <div className="flex h-9 rounded-xl overflow-hidden">
                      <div className="flex-1 bg-gray-300 flex items-center justify-center text-gray-600 text-[10px] font-semibold">sebagian ada</div>
                      <div className="w-[18%] bg-red-400 flex items-center justify-center text-white text-[10px] font-bold">RUSAK</div>
                      <div className="flex-1 bg-gray-300 flex items-center justify-center text-gray-600 text-[10px] font-semibold">sebagian ada</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-center text-sm font-bold text-red-600">
              ↑ Kerusakan terjadi di lokasi yang SAMA pada semua primata
            </div>

            {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya ini untuk dua hipotesis kita?" />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <HypothesisCard
                title="Hipotesis: Sistem yang Sama"
                color="border-t-purple-500"
                body="Pencipta merancang gen GULO yang rusak pada semua primata secara sengaja, di lokasi yang sama."
                note="Mengapa pencipta yang sempurna merancang 'gen rusak' yang identik pada semua primata? Apa fungsi kerusakannya?"
                pct={20}
                barColor="red"
                strength="Daya jelas: Lemah"
                strengthColor="text-red-500"
              />
              <HypothesisCard
                title="Hipotesis: Common Ancestry"
                color="border-t-blue-600"
                body="Gen GULO rusak sekali pada nenek moyang bersama primata. Kerusakan itu diwariskan ke semua keturunannya — manusia, simpanse, gorilla."
                note="Seperti analogi: kesalahan yang sama di tempat yang sama = sumber yang sama."
                pct={90}
                barColor="green"
                strength="Daya jelas: Kuat"
                strengthColor="text-green-600"
              />
            </div>
            <InsightBox color="blue">
              <p className="text-sm font-semibold">
                Gen yang rusak tidak punya manfaat fungsional. Tidak ada alasan desain untuk meletakkan "kerusakan" di tempat yang sama persis. Tapi kalau kerusakannya diwariskan dari nenek moyang bersama — <strong>itu sangat masuk akal.</strong>
              </p>
            </InsightBox>
          </motion.div>
        )}
      </AnimatePresence>

      <NavButtons onPrev={onPrev} onNext={onNext} prevLabel="← Analogi" nextLabel="Bukti 2: ERV →" />
    </div>
  );
};

// ─── Section 3: ERV ──────────────────────────────────────────────────────────
const SectionERV = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [markersShown, setMarkersShown] = useState(false);

  const ervPositions = [13, 27, 44, 61, 79]; // % positions on the chromosome bar
  const species = ['Manusia', 'Simpanse', 'Gorilla'];

  return (
    <div>
      <Label>Bagian 3 dari 5 · Bukti 2</Label>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Endogenous Retrovirus (ERV): Bekas Infeksi di Tempat yang Sama</h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Virus bisa menginfeksi sel dan menyisipkan DNA-nya ke dalam genom inang. Kalau infeksi terjadi pada{' '}
        <strong>sel reproduksi</strong>, sisipan itu akan diwariskan ke generasi berikutnya.
      </p>

      <InsightBox color="amber">
        <p className="text-sm">
          Sisipan virus yang diwariskan ini disebut <strong>Endogenous Retrovirus (ERV)</strong>. Sekali masuk ke DNA garis keturunan, ia akan terus ada di semua keturunannya.
        </p>
      </InsightBox>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🦠 Lihat ERV di berbagai spesies" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-5 mt-4 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Peta kromosom — titik merah = lokasi ERV</p>

            <div className="flex flex-col gap-5">
              {species.map((sp, idx) => (
                <div key={sp}>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{sp}</p>
                  <div className="relative h-7 bg-indigo-400 rounded-full overflow-visible">
                    {markersShown &&
                      ervPositions.map((pos, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                          style={{ left: `${pos}%` }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * (ervPositions.length * 0.1) + i * 0.1 }}
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-md" />
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {!markersShown ? (
              <button
                onClick={() => setMarkersShown(true)}
                className="w-full mt-5 py-3 px-6 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                📍 Tampilkan lokasi ERV
              </button>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm font-bold text-red-600 text-center">
                  ERV yang sama ditemukan di lokasi yang IDENTIK pada ketiga spesies
                </div>
                {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya untuk dua hipotesis kita?" />}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <HypothesisCard
                title="Hipotesis: Sistem yang Sama"
                color="border-t-purple-500"
                body="Pencipta menyisipkan bekas DNA virus yang tidak berfungsi di lokasi yang sama pada manusia, simpanse, dan gorilla — tanpa alasan fungsi yang jelas."
                note="ERV adalah bekas infeksi — bukan bagian dari 'desain.' Mengapa desainer memasukkan bekas virus di lokasi yang identik?"
                pct={10}
                barColor="red"
                strength="Daya jelas: Sangat lemah"
                strengthColor="text-red-500"
              />
              <HypothesisCard
                title="Hipotesis: Common Ancestry"
                color="border-t-blue-600"
                body="Virus menginfeksi sel reproduksi nenek moyang bersama primata sekali. Sisipan diwariskan ke semua keturunannya — di lokasi yang sama karena memang dari sumber yang sama."
                note="Probabilitas ERV yang sama nyangkut di lokasi identik secara kebetulan: astronomis kecil."
                pct={95}
                barColor="green"
                strength="Daya jelas: Sangat kuat"
                strengthColor="text-green-600"
              />
            </div>
            <InsightBox color="blue">
              <p className="text-sm font-semibold">
                ERV bukan sekadar kemiripan — ini <em>bekas infeksi</em>. Tidak ada alasan fungsional untuk meletakkannya di lokasi yang sama. Satu-satunya penjelasan alami adalah warisan dari nenek moyang bersama.
              </p>
            </InsightBox>
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Kromosom 2 Manusia: Bekas Penyatuan Dua Kromosom</h2>

      <p className="text-gray-600 leading-relaxed mb-5">Ini salah satu bukti paling langsung yang ada di genomik.</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
          <div className="text-5xl font-black text-blue-600 mb-1">46</div>
          <div className="font-bold text-gray-800">Kromosom Manusia</div>
          <div className="text-xs text-gray-400 mt-1">23 pasang</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
          <div className="text-5xl font-black text-indigo-500 mb-1">48</div>
          <div className="font-bold text-gray-800">Kromosom Simpanse</div>
          <div className="text-xs text-gray-400 mt-1">24 pasang</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        Manusia punya 2 kromosom lebih sedikit dari simpanse, gorilla, dan orang utan. <strong>Ke mana 2 kromosom yang "hilang"?</strong>
      </p>

      {step === 0 && <RevealBtn onClick={() => setStep(1)} label="🔬 Lihat apa yang ditemukan ilmuwan" />}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Visualisasi Fusi Kromosom</p>

            <div className="flex items-start justify-center gap-6 sm:gap-10 flex-wrap">
              {/* Chimp chromosomes */}
              <div className="text-center">
                <p className="text-sm font-bold text-indigo-500 mb-3">Simpanse</p>
                <div className="flex gap-4 justify-center">
                  {[
                    { h: 100, centromere: 60 },
                    { h: 100, centromere: 35 },
                  ].map((chr, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="w-10 rounded-3xl bg-indigo-400 relative"
                        style={{ height: chr.h }}
                      >
                        <div
                          className="absolute left-0 right-0 h-1 bg-white/50"
                          style={{ top: chr.centromere }}
                        />
                        {/* telomere at bottom */}
                        <div className="absolute bottom-0 left-1 right-1 h-3 bg-yellow-400 rounded-b-3xl" />
                        {i === 1 && <div className="absolute top-0 left-1 right-1 h-3 bg-yellow-400 rounded-t-3xl" />}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Chr {i === 0 ? '2a' : '2b'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center pt-12 text-3xl text-gray-300">→</div>

              {/* Human chromosome */}
              <div className="text-center">
                <p className="text-sm font-bold text-blue-600 mb-3">Manusia</p>
                <div className="flex flex-col items-center">
                  <div className="w-10 rounded-3xl bg-blue-500 relative" style={{ height: 180 }}>
                    {/* centromere 1 */}
                    <div className="absolute left-0 right-0 h-1 bg-white/50" style={{ top: 65 }} />
                    {/* centromere 2 (vestigial) */}
                    <div className="absolute left-0 right-0 h-1 bg-white/30" style={{ top: 120 }} />
                    {/* internal telomere */}
                    <AnimatePresence>
                      {showTelomere && (
                        <motion.div
                          className="absolute left-1 right-1 bg-yellow-400"
                          style={{ top: 83, height: 14 }}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Kromosom 2</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-5 justify-center text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-yellow-400" />
                <span>Telomere</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-1 bg-white/50 bg-gray-400 rounded" />
                <span>Sentromer</span>
              </div>
            </div>

            {!showTelomere ? (
              <button
                onClick={() => setShowTelomere(true)}
                className="w-full mt-5 py-3 px-6 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 transition-all"
              >
                💡 Tampilkan bekas telomere di tengah kromosom 2 manusia
              </button>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 text-sm text-yellow-800">
                  <strong>Kotak kuning di tengah = bekas telomere.</strong> Telomere normalnya hanya ada di ujung kromosom. Tapi di kromosom 2 manusia, ada urutan telomere di <em>tengah</em> — sisa dari ketika dua kromosom bergabung: ujung satu bertemu ujung lain.
                </div>
                {step === 1 && <RevealBtn onClick={() => setStep(2)} label="🤔 Apa artinya untuk dua hipotesis kita?" />}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <HypothesisCard
                title="Hipotesis: Sistem yang Sama"
                color="border-t-purple-500"
                body="Pencipta merancang kromosom 2 manusia dengan menyertakan urutan telomere di tengah — yang secara struktural terlihat persis seperti bekas penyatuan."
                note="Untuk apa mendesain kromosom dengan 'bekas penyatuan' yang tidak berfungsi dan tidak ada di spesies lain?"
                pct={8}
                barColor="red"
                strength="Daya jelas: Sangat lemah"
                strengthColor="text-red-500"
              />
              <HypothesisCard
                title="Hipotesis: Common Ancestry"
                color="border-t-blue-600"
                body="Pada nenek moyang manusia, dua kromosom bergabung. Hasilnya manusia punya 46 kromosom. Bekas telomere di tengah adalah bukti fisik dari peristiwa fusi itu."
                note="Dua sentromer, telomere di tengah, urutan yang cocok dengan dua kromosom simpanse."
                pct={95}
                barColor="green"
                strength="Daya jelas: Sangat kuat"
                strengthColor="text-green-600"
              />
            </div>
            <InsightBox color="blue">
              <p className="text-sm font-semibold">
                Kromosom 2 manusia membawa "sidik jari" dari peristiwa penyatuan. Ini bukan kemiripan abstrak — ini jejak fisik yang tertulis di DNA.
              </p>
            </InsightBox>
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
    {
      bukti: 'GULO Pseudogen',
      sub: 'Gen rusak di lokasi sama',
      slemah: 'Tidak ada alasan desain untuk kerusakan identik',
      skuat: 'Diwariskan sekali dari nenek moyang bersama',
      pctWeak: 20,
      pctStrong: 90,
    },
    {
      bukti: 'ERV',
      sub: 'Bekas virus di lokasi sama',
      slemah: 'Mengapa mendesain bekas infeksi virus?',
      skuat: 'Infeksi sekali pada nenek moyang → diwariskan',
      pctWeak: 10,
      pctStrong: 95,
    },
    {
      bukti: 'Kromosom 2',
      sub: 'Telomere di tengah kromosom',
      slemah: 'Mengapa mendesain bekas penyatuan yang fiktif?',
      skuat: 'Jejak fisik peristiwa fusi kromosom',
      pctWeak: 8,
      pctStrong: 95,
    },
  ];

  return (
    <div>
      <Label>Bagian 5 dari 5 · Ringkasan</Label>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Hipotesis Mana yang Paling Kuat?</h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        Tiga jenis bukti berbeda, datang dari arah yang berbeda. Sekarang kita timbang keduanya secara jujur.
      </p>

      {/* Comparison table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-5">
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-gray-50 border-b border-gray-100">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Bukti</div>
          <div className="px-4 py-3 text-xs font-bold text-purple-500 uppercase tracking-wider border-l border-gray-100">Sistem yang Sama</div>
          <div className="px-4 py-3 text-xs font-bold text-blue-600 uppercase tracking-wider border-l border-gray-100">Common Ancestry</div>
        </div>
        {rows.map((row, i) => (
          <div key={row.bukti} className={`grid grid-cols-[1fr_1fr_1fr] ${i < rows.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <div className="px-4 py-4">
              <p className="text-sm font-bold text-gray-800">{row.bukti}</p>
              <p className="text-xs text-gray-400 mt-0.5">{row.sub}</p>
            </div>
            <div className="px-4 py-4 border-l border-gray-50">
              <span className="inline-block text-xs font-bold bg-red-50 text-red-500 rounded-full px-2.5 py-0.5 mb-1">Lemah</span>
              <StrengthBar pct={row.pctWeak} color="red" />
              <p className="text-xs text-gray-400 mt-2">{row.slemah}</p>
            </div>
            <div className="px-4 py-4 border-l border-gray-50">
              <span className="inline-block text-xs font-bold bg-green-50 text-green-600 rounded-full px-2.5 py-0.5 mb-1">Kuat</span>
              <StrengthBar pct={row.pctStrong} color="green" />
              <p className="text-xs text-gray-400 mt-2">{row.skuat}</p>
            </div>
          </div>
        ))}
      </div>

      <InsightBox color="dark">
        <p className="text-sm text-gray-200 mb-3">
          Hipotesis "sistem yang sama" bisa menjelaskan kemiripan pada bagian yang <em>fungsional</em>. Tapi ia kesulitan menjelaskan:
        </p>
        <ul className="text-sm text-gray-200 list-disc pl-5 space-y-1 mb-3">
          <li>Gen yang <strong className="text-white">rusak</strong> di tempat yang sama</li>
          <li>Bekas <strong className="text-white">infeksi virus</strong> di lokasi identik</li>
          <li>Struktur kromosom dengan <strong className="text-white">tanda penyatuan</strong> yang khas</li>
        </ul>
        <p className="text-sm text-blue-300 font-semibold">
          Common ancestry tidak perlu membuat alasan baru untuk setiap bukti. Satu penjelasan menanggung semuanya.
        </p>
      </InsightBox>

      <InsightBox color="blue">
        <p className="text-sm font-semibold leading-relaxed">
          <strong>Ingat analogi ujian:</strong> Kemiripan jawaban yang benar bisa terjadi karena belajar dari sumber yang sama. Tapi kesalahan yang sama, di tempat yang sama — itu butuh penjelasan yang lebih spesifik.
          <br /><br />
          Dalam DNA: gen rusak, bekas virus, dan bekas penyatuan kromosom adalah "kesalahan" tersebut.
        </p>
      </InsightBox>

      {/* Final verdict */}
      <div className="mt-5 bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kesimpulan</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>Yang terpenting bukan sekadar "apakah ada penjelasan alternatif."</strong> Hampir selalu ada. Yang terpenting adalah: <em>penjelasan mana yang paling kuat menanggung seluruh rincian data?</em>
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-3">
          Kalau satu penjelasan bisa menampung banyak jejak sekaligus — kemiripan umum, perbedaan bertingkat, gen rusak, ERV, kromosom 2 — sementara penjelasan lain harus terus mencari alasan baru setiap kali ada contoh baru, kita sudah tahu mana yang lebih kuat.
        </p>
      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lanjut membaca</p>
        <p className="text-sm text-gray-600">
          Demo ini bagian dari artikel <strong>"DNA Mirip Karena Nenek Moyang yang Sama, atau Karena Sistem yang Sama?"</strong> di Fahrezi Institute. Artikel lengkapnya membahas lebih jauh — termasuk bagaimana matematika bisa menutup perdebatan ini secara definitif.
        </p>
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
        >
          ← Kromosom 2
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all ml-auto"
        >
          ↺ Mulai Ulang
        </button>
      </div>
    </div>
  );
};

// ─── Nav Dots ────────────────────────────────────────────────────────────────
const sectionMeta = [
  { label: 'Intro' },
  { label: 'Analogi' },
  { label: 'GULO' },
  { label: 'ERV' },
  { label: 'Kromosom 2' },
  { label: 'Ringkasan' },
];

const TopNav = ({ current, total, onGoto }: { current: number; total: number; onGoto: (i: number) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:block">
      Fahrezi Institute · Demo Artikel
    </span>
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider sm:hidden">FI Demo</span>

    <div className="flex items-center gap-2">
      {sectionMeta.map((s, i) => (
        <button
          key={s.label}
          onClick={() => onGoto(i)}
          title={s.label}
          className={`transition-all rounded-full ${
            i === current
              ? 'w-6 h-2 bg-blue-600'
              : i < current
              ? 'w-2 h-2 bg-gray-300'
              : 'w-2 h-2 bg-gray-200'
          }`}
        />
      ))}
    </div>

    <span className="text-xs font-semibold text-gray-400">
      {current + 1} / {total}
    </span>
  </nav>
);

// ─── Main App ────────────────────────────────────────────────────────────────
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
      <TopNav current={section} total={sectionMeta.length} onGoto={goTo} />

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {sections[section]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
