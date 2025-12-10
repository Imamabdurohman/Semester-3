import React, { useState } from "react";

// MagangApp_UI_Prototype.jsx
// Single-file React component prototype for the mind-map provided.
// Uses TailwindCSS utility classes for styling. Default export is the App component.

export default function App() {
    const [route, setRoute] = useState("beranda");
    const [selectedJob, setSelectedJob] = useState(null);

    return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto p-6">
        <Header onNavigate={setRoute} />
        <div className="mt-6 grid grid-cols-12 gap-6">
            <aside className="col-span-3">
            <Sidebar route={route} onNavigate={setRoute} />
            </aside>

            <main className="col-span-9">
            <div className="bg-white rounded-2xl shadow p-6">
                {route === "beranda" && (
                <Beranda onOpenJob={(job) => { setSelectedJob(job); setRoute('detail'); }} />
                )}

                {route === "detail" && (
                <DetailPage job={selectedJob} onBack={() => setRoute('beranda')} />
                )}

                {route === "lamaran" && <LamaranSaya />}
                {route === "cari" && <CariLowongan onOpenJob={(job)=>{ setSelectedJob(job); setRoute('detail'); }} />}
                {route === "akun" && <AkunPengaturan />}
                {route === "pendaftaran" && <PendaftaranProfil />}
            </div>
            </main>
        </div>
        </div>
    </div>
    );
}

function Header({ onNavigate }) {
    return (
    <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <div className="text-indigo-600 font-bold text-xl">MagangApps</div>
        <nav className="hidden md:flex gap-3 text-sm">
            <button onClick={() => onNavigate('beranda')} className="px-3 py-1 rounded hover:bg-gray-100">Beranda</button>
            <button onClick={() => onNavigate('cari')} className="px-3 py-1 rounded hover:bg-gray-100">Cari Lowongan</button>
            <button onClick={() => onNavigate('lamaran')} className="px-3 py-1 rounded hover:bg-gray-100">Lamaran Saya</button>
            </nav>
        </div>

      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate('pendaftaran')} className="text-sm px-3 py-2 bg-indigo-600 text-white rounded">Daftar / Profil</button>
        <button onClick={() => onNavigate('akun')} className="text-sm px-3 py-2 border rounded">Akun</button>
      </div>
    </header>
  );
}

function Sidebar({ route, onNavigate }) {
  const items = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'cari', label: 'Cari Lowongan' },
    { id: 'lamaran', label: 'Lamaran Saya' },
    { id: 'detail', label: 'Halaman Detail' },
    { id: 'akun', label: 'Akun & Pengaturan' },
    { id: 'pendaftaran', label: 'Pendaftaran & Profil' },
  ];

  return (
    <div className="space-y-4 sticky top-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h4 className="font-semibold">Navigasi</h4>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map(i => (
            <li key={i.id}>
              <button
                onClick={() => onNavigate(i.id)}
                className={`w-full text-left px-3 py-2 rounded ${route === i.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'}`}>
                {i.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h4 className="font-semibold">Ringkasan</h4>
        <p className="text-xs mt-2 text-gray-600">Aplikasi Magang - ringkasan cepat dari fitur menurut mind map.</p>
      </div>
    </div>
  );
}

function Beranda({ onOpenJob }) {
  const recommended = [
    { id: 1, title: 'Frontend Intern', company: 'PT. Kreatif', location: 'Jakarta', snippet: 'Membantu tim UI/UX dan implementasi React.' },
    { id: 2, title: 'Data Analyst Intern', company: 'DataWorks', location: 'Bandung', snippet: 'Analisis dataset & dashboard.' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Beranda</h2>
      <p className="text-sm text-gray-600 mt-1">Rekomendasi magang & lowongan populer.</p>

      <section className="mt-6 grid md:grid-cols-2 gap-4">
        {recommended.map(job => (
          <div key={job.id} className="border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <div className="text-xs text-gray-500">{job.company} • {job.location}</div>
                <p className="text-sm mt-2">{job.snippet}</p>
              </div>
              <div className="space-y-2">
                <button onClick={() => onOpenJob(job)} className="text-sm px-3 py-1 border rounded">Lihat</button>
                <button className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Lamar</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function DetailPage({ job, onBack }) {
  const defaultJob = { title: 'Frontend Intern', company: 'PT. Kreatif', location: 'Jakarta', description: 'Deskripsi pekerjaan: Membantu pengembangan UI, menulis komponen React, testing.', qualifications: ['Mahasiswa S1', 'Menguasai HTML/CSS/JS', 'Familiar React'] };
  const j = job || defaultJob;

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{j.title}</h2>
          <div className="text-sm text-gray-600">{j.company} • {j.location}</div>
        </div>
        <div className="space-x-2">
          <button onClick={onBack} className="px-3 py-1 border rounded">Kembali</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded">Lamar Sekarang</button>
        </div>
      </div>

      <section className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card title="Deskripsi Pekerjaan">
            <p className="text-sm text-gray-700">{j.description}</p>
          </Card>

          <Card title="Kualifikasi" className="mt-4">
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {j.qualifications.map((q, idx) => <li key={idx}>{q}</li>)}
            </ul>
          </Card>
        </div>

        <div>
          <Card title="Profil Perusahaan">
            <p className="text-sm text-gray-700">PT. Kreatif bergerak di bidang teknologi edukasi. 50+ karyawan.</p>
            <div className="mt-3">
              <button className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 rounded">Kunjungi Profil</button>
            </div>
          </Card>

          <Card title="Tombol Lamar" className="mt-4">
            <p className="text-sm text-gray-600">Lengkapi dokumen dan kirim lamaran.</p>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Kirim Lamaran</button>
              <button className="px-3 py-1 border rounded">Simpan</button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function LamaranSaya() {
  const status = [
    { id: 'terkirim', label: 'Terkirim', count: 3 },
    { id: 'dilihat', label: 'Dilihat', count: 1 },
    { id: 'diproses', label: 'Diproses', count: 2 },
    { id: 'hasil', label: 'Hasil', count: 0 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Lamaran Saya</h2>
      <p className="text-sm text-gray-600">Lihat status lamaranmu.</p>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {status.map(s => (
          <div key={s.id} className="bg-white rounded-xl p-3 text-center shadow">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-xl font-semibold">{s.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Card title="Riwayat Lamaran">
          <p className="text-sm text-gray-700">Daftar lamaran + detail singkat (tanggal, perusahaan, status).</p>
        </Card>
      </div>
    </div>
  );
}

function CariLowongan({ onOpenJob }) {
  const jobs = [
    { id: 10, title: 'UI/UX Intern', company: 'DesignCo', location: 'Surabaya' },
    { id: 11, title: 'Backend Intern', company: 'API Labs', location: 'Jakarta' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Cari Lowongan</h2>
      <div className="mt-3 flex gap-3">
        <input className="flex-1 border rounded px-3 py-2" placeholder="Kolom pencarian" />
        <select className="border rounded px-3 py-2">
          <option>Filter: Semua Industri</option>
          <option>Teknologi</option>
          <option>Design</option>
        </select>
      </div>

      <div className="mt-6 grid gap-3">
        {jobs.map(j => (
          <div key={j.id} className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-xs text-gray-500">{j.company} • {j.location}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onOpenJob(j)} className="px-3 py-1 border rounded">Lihat</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Lamar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AkunPengaturan() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Akun & Pengaturan</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card title="Edit Profil">
          <div className="space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Nama" />
            <input className="w-full border rounded px-3 py-2" placeholder="Email" />
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Simpan</button>
              <button className="px-3 py-1 border rounded">Batal</button>
            </div>
          </div>
        </Card>

        <Card title="Kelola Dokumen">
          <p className="text-sm text-gray-600">CV, Portofolio, Surat Lamaran — unggah atau hapus file.</p>
          <div className="mt-3">
            <button className="px-3 py-1 border rounded">Unggah Dokumen</button>
          </div>
        </Card>

        <Card title="Pengaturan Notifikasi" className="col-span-2">
          <p className="text-sm text-gray-600">Atur notifikasi email / aplikasi.</p>
        </Card>
      </div>
    </div>
  );
}

function PendaftaranProfil() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Pendaftaran & Profil</h2>
      <p className="text-sm text-gray-600">Form login / daftar dan proses pengisian profil.</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card title="Login / Daftar">
          <div className="space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Email" />
            <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" />
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Login</button>
              <button className="px-3 py-1 border rounded">Daftar</button>
            </div>
          </div>
        </Card>

        <Card title="Proses Pengisian Profil">
          <div className="text-sm text-gray-700">
            <p>Data pribadi, pendidikan, unggah dokumen (CV, portofolio).</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow ${className}`}>
      {title && <div className="font-semibold mb-3">{title}</div>}
      <div>{children}</div>
    </div>
  );
}
