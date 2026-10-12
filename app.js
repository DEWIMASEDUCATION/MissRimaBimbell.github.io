/* Nomor WhatsApp bimbel (format 62xxxxxxxxxx). Ganti di sini jika nomor berubah. */
const WA_NUMBER='6287858772122';
const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const waLink=t=>`https://wa.me/${WA_NUMBER.replace(/\D/g,'')}?text=${encodeURIComponent(t)}`;

const BIMBEL={
 tagline:'Belajar Lebih Mudah, Tumbuh Lebih Percaya Diri, Raih Prestasi.',
 foto:'assets/foto.webp',            /* isi dengan path/URL foto kegiatan, mis. 'img/kelas.jpg' (disarankan WebP < 200 KB) */
 fotoAlt:'Kegiatan belajar siswa SD/MI di Miss Rima Bimbel',
 fotoPendiri:'assets/foto.webp',     /* isi dengan path/URL foto resmi Rima, mis. 'img/rima.webp' (rasio 4:5). Kosong = tampil monogram "DM". */
 fotoPendiriAlt:'Foto Rima, pendiri dan pemilik Miss Rima Bimbel',
 telp:'087858772122',email:'',alamat:'Jl Raya Codo-Wajak, 19/06, Utara, Codo, Kec. Wajak, Malang, Jawa Timur 65173',jam:'',
 mapsQuery:'Jl Raya Codo-Wajak, Codo, Kec. Wajak, Malang, Jawa Timur 65173',       /* mis. alamat lengkap; jika kosong, peta tidak ditampilkan */
 sosmed:{Instagram:'',Facebook:'',TikTok:'',YouTube:''}   /* isi URL lengkap (https://...) */
};
const JADWAL=['Sore hari','Malam hari','Akhir pekan (Sabtu/Minggu)','Fleksibel – dibicarakan dengan guru'];  /* preferensi orang tua; jadwal final dikonfirmasi bimbel */
/* Jenjang yang diterima: SD dan MI, masing-masing kelas 1–6. */
const KELAS={SD:[1,2,3,4,5,6],MI:[1,2,3,4,5,6]};
const PROGRAMS=[
 {id:'baca',nama:'Les Baca',jenjang:'Program utama · SD/MI kelas 1–6',deskripsi:'Pendampingan membaca yang bertahap dan menyenangkan, untuk anak yang baru belajar membaca maupun siswa yang perlu meningkatkan kelancaran membaca.',
  poin:['Pengenalan huruf vokal dan konsonan','Pengenalan bunyi huruf dan penggabungan suku kata','Latihan membaca kata dan kalimat sederhana','Latihan kelancaran membaca secara bertahap','Peningkatan pemahaman isi bacaan','Pendampingan individual sesuai kemampuan awal siswa'],
  catatan:'Setiap anak berkembang dengan kecepatan berbeda. Perkembangan belajar mengikuti kemampuan awal dan konsistensi latihan anak.',kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''},
 {id:'mat',nama:'Bimbingan Matematika SD/MI',jenjang:'SD/MI kelas 1–6',deskripsi:'Penguatan kemampuan berhitung dan pemahaman konsep dasar agar siswa lebih percaya diri.',
  poin:['Penguatan kemampuan berhitung','Pemahaman konsep matematika dasar','Latihan soal sesuai kelas dan materi sekolah','Pendampingan sesuai tingkat pemahaman siswa'],kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''},
 {id:'ind',nama:'Bahasa Indonesia SD/MI',jenjang:'SD/MI kelas 1–6',deskripsi:'Penguatan pemahaman bacaan, kosakata, dan kemampuan menulis sesuai materi sekolah.',
  poin:['Pemahaman bacaan','Pengembangan kosakata','Latihan menulis dan menyusun kalimat','Pemahaman materi Bahasa Indonesia di sekolah'],kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''},
 {id:'ing',nama:'Bahasa Inggris Dasar SD/MI',jenjang:'SD/MI kelas 1–6',deskripsi:'Pengenalan Bahasa Inggris dasar dengan cara yang sederhana dan sesuai kemampuan siswa.',
  poin:['Pengenalan kosakata sehari-hari','Pemahaman ungkapan sederhana','Latihan membaca dan percakapan dasar','Pembelajaran sesuai kemampuan siswa'],kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''},
 {id:'ped',nama:'Pendampingan PR dan Pelajaran Sekolah',jenjang:'SD/MI kelas 1–6',deskripsi:'Pendampingan mengerjakan tugas dan mengulang materi sekolah agar anak belajar lebih mandiri.',
  poin:['Membantu siswa memahami tugas sekolah','Mengulang materi yang belum dipahami','Mendampingi proses belajar sesuai kebutuhan','Mendorong siswa menjadi lebih mandiri'],kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''},
 {id:'uji',nama:'Persiapan Ujian Sekolah SD/MI',jenjang:'SD/MI · fokus kelas 6',deskripsi:'Pengulangan materi dan latihan soal untuk menghadapi evaluasi dan ujian sekolah.',
  poin:['Pengulangan materi sesuai kelas','Latihan soal','Pembahasan materi yang belum dikuasai','Persiapan evaluasi dan ujian sekolah, khususnya kelas 6'],kegiatan:'Belajar tatap muka bersama pengajar.',jadwal:''}
];
/* HARGA: isi angka asli, mis. 'Rp 150.000'. Kosong = tampil "Hubungi WhatsApp untuk informasi biaya." */
const BIAYA={daftar:'',bulanan:''};
/* program: id program yang otomatis terpilih saat tombol "Daftar" paket diklik (kosong = pengunjung memilih sendiri) */
const PAKET=[
 {nama:'Paket Bimbingan Belajar SD/MI',untuk:'SD/MI kelas 1–6',harga:'',program:'',fasilitas:['Belajar tatap muka','Matematika, Bahasa Indonesia, dan Bahasa Inggris dasar','Latihan soal sesuai kelas dan materi sekolah','Kabar perkembangan belajar untuk orang tua']},
 {nama:'Paket Les Baca',untuk:'SD/MI kelas 1–6',harga:'',program:'baca',fasilitas:['Belajar tatap muka','Dari pengenalan huruf dan suku kata hingga membaca kalimat','Latihan kelancaran dan pemahaman isi bacaan','Pendampingan individual sesuai kemampuan awal']},
 {nama:'Paket Pendampingan PR dan Pelajaran Sekolah',untuk:'SD/MI kelas 1–6',harga:'',program:'ped',fasilitas:['Belajar tatap muka','Membantu memahami tugas sekolah','Mengulang materi yang belum dipahami','Mendorong siswa belajar lebih mandiri']}
];
const METODE=[];      /* mis. ['Tunai di bimbel','Transfer bank (isi nomor rekening)'] */
const KETENTUAN=[];   /* mis. ['Pembayaran dilakukan setiap awal bulan'] */
/* ===== Profil pendiri ===== */
const PROFIL={
 nama:'Rima',
 jabatan:'Pendiri dan Pemilik Miss Rima Bimbel',
 tagline:'Membangun Generasi Cerdas, Percaya Diri, dan Berprestasi.',
 paragraf:[
  'Rima merupakan pendiri dan pemilik Miss Rima Bimbel, lembaga bimbingan belajar yang berkomitmen membantu siswa Sekolah Dasar (SD/MI) mengembangkan potensi akademik, meningkatkan pemahaman materi pelajaran, serta membangun kepercayaan diri dalam belajar.',
  'Melalui pendekatan pembelajaran offline yang terarah, interaktif, dan berpusat pada kebutuhan siswa, Miss Rima Bimbel menghadirkan suasana belajar yang nyaman, efektif, dan mendukung perkembangan setiap peserta didik.',
  'Bagi Rima, pendidikan bukan sekadar tentang memperoleh nilai tinggi, melainkan juga tentang membangun karakter, menumbuhkan rasa ingin tahu, serta membentuk kebiasaan belajar yang positif sejak dini.',
  'Dengan semangat untuk memberikan pendidikan yang berkualitas, Miss Rima Bimbel hadir sebagai mitra belajar bagi siswa dan orang tua dalam mempersiapkan masa depan yang lebih baik.'],
 visi:'Menjadi lembaga bimbingan belajar yang terpercaya dalam mendukung perkembangan akademik, karakter, dan potensi setiap siswa.',
 misi:['Memberikan pembelajaran yang terarah, efektif, dan mudah dipahami.','Membantu siswa meningkatkan prestasi akademik sesuai kemampuan masing-masing.','Menciptakan lingkungan belajar yang nyaman, positif, dan menyenangkan.','Menumbuhkan kemandirian, kedisiplinan, dan kepercayaan diri siswa.','Mendukung orang tua dalam mendampingi proses belajar anak.'],
 komitmen:'Setiap anak memiliki potensi untuk berkembang. Kami percaya bahwa dengan pendampingan yang tepat, metode belajar yang sesuai, dan semangat yang konsisten, setiap siswa dapat melangkah lebih dekat menuju prestasi terbaiknya.',
 penutup:'Miss Rima Bimbel — Teman Belajar, Langkah Menuju Prestasi.'
};
/* ===== SEO: judul/deskripsi per halaman + FAQ (ubah di sini) ===== */
const PAGE={
 '/':['Miss Rima Bimbel | Bimbel SD/MI dan Les Baca','Miss Rima Bimbel menyediakan bimbingan belajar offline untuk siswa SD/MI kelas 1–6, meliputi Matematika, Bahasa Indonesia, Bahasa Inggris dasar, pendampingan PR, dan les baca.'],
 '/program':['Program Bimbel SD/MI dan Les Baca | Miss Rima Bimbel','Program bimbingan belajar tatap muka untuk SD/MI kelas 1–6: Matematika, Bahasa Indonesia, Bahasa Inggris dasar, pendampingan PR, les baca, dan persiapan ujian sekolah.'],
 '/profil':['Profil Rima, Pendiri Miss Rima Bimbel','Kenali Rima, pendiri dan pemilik Miss Rima Bimbel, beserta visi, misi, dan komitmen bimbingan belajar offline untuk siswa SD/MI kelas 1–6.'],
 '/biaya':['Biaya Bimbel SD/MI dan Les Baca | Miss Rima Bimbel','Informasi paket bimbingan belajar SD/MI, paket les baca, dan pendampingan PR di Miss Rima Bimbel. Hubungi WhatsApp untuk informasi biaya.'],
 '/daftar':['Pendaftaran Bimbel SD/MI dan Les Baca | Miss Rima Bimbel','Daftarkan anak SD/MI kelas 1–6 ke Miss Rima Bimbel lewat formulir online, lalu kirim data melalui WhatsApp untuk konfirmasi.'],
 '/kontak':['Kontak Miss Rima Bimbel | Bimbel SD/MI','Hubungi Miss Rima Bimbel lewat WhatsApp untuk bertanya tentang program, jadwal, les baca, dan pendaftaran bimbel SD/MI kelas 1–6.'],
 '/privasi':['Kebijakan Privasi | Miss Rima Bimbel','Kebijakan privasi formulir pendaftaran Miss Rima Bimbel.']
};
const FAQ=[
 ['Apa itu Miss Rima Bimbel?','Miss Rima Bimbel adalah lembaga bimbingan belajar tatap muka khusus siswa SD/MI kelas 1–6 yang didirikan dan dimiliki oleh Rima.'],
 ['Untuk kelas berapa saja bimbel ini?','Kelas 1 sampai kelas 6 jenjang SD/MI.'],
 ['Apakah Miss Rima Bimbel menerima siswa dari jenjang di atas SD/MI?','Tidak. Miss Rima Bimbel secara khusus melayani siswa SD/MI kelas 1–6.'],
 ['Apakah pembelajaran dilakukan secara online?','Tidak. Pembelajaran dilakukan secara offline atau tatap muka bersama pengajar.'],
 ['Program apa saja yang tersedia?','Bimbingan Matematika, Bahasa Indonesia, Bahasa Inggris dasar, pendampingan PR dan pelajaran sekolah, les baca, serta persiapan ujian sekolah SD/MI.'],
 ['Apakah tersedia program les baca?','Ya. Tersedia program les baca dengan pendampingan bertahap sesuai kemampuan awal anak.'],
 ['Apakah siswa yang belum lancar membaca dapat mendaftar?','Ya. Program les baca dapat disesuaikan dengan kemampuan awal dan kebutuhan belajar siswa.'],
 ['Bagaimana cara mendaftar?','Orang tua dapat mengisi formulir pendaftaran di website, kemudian mengirimkan data melalui WhatsApp untuk konfirmasi lebih lanjut.'],
 ['Bagaimana jadwal belajarnya?','Saat mendaftar, Anda memilih preferensi jadwal. Jadwal final dikonfirmasi oleh pihak bimbel.'],
 ['Apakah orang tua bisa memantau perkembangan anak?','Ya. Orang tua mendapat kabar perkembangan belajar anak.'],
 ['Berapa biaya bimbingan belajar?','Silakan menghubungi WhatsApp Miss Rima Bimbel untuk mendapatkan informasi biaya terbaru.']
];
function seo(p){const m=PAGE[p]||PAGE['/'],set=(q,v)=>{const e=document.querySelector(q);e&&e.setAttribute('content',v)};
 document.title=m[0];set('meta[name=description]',m[1]);set('meta[property="og:title"]',m[0]);set('meta[property="og:description"]',m[1]);
 const B=BIMBEL,org={'@type':'EducationalOrganization','name':'Miss Rima Bimbel','description':PAGE['/'][1],'founder':{'@type':'Person','name':'Rima'},
  'contactPoint':{'@type':'ContactPoint','telephone':'+'+WA_NUMBER,'contactType':'customer service','availableLanguage':'id'}};
 if(B.alamat)org.address={'@type':'PostalAddress','streetAddress':B.alamat};if(B.email)org.email=B.email;if(B.jam)org.openingHours=B.jam;
 const so=Object.values(B.sosmed).filter(u=>/^https?:\/\//.test(u));if(so.length)org.sameAs=so;
 const g=[org];if(p==='/')g.push({'@type':'FAQPage','mainEntity':FAQ.map(f=>({'@type':'Question','name':f[0],'acceptedAnswer':{'@type':'Answer','text':f[1]}}))});
 $('#ld').textContent=JSON.stringify({'@context':'https://schema.org','@graph':g})}
const rp=v=>v?esc(v):'<span class="ph">Hubungi WhatsApp untuk informasi biaya.</span>';
const progOpt=()=>PROGRAMS.map(p=>`<option value="${p.id}">${esc(p.nama)}</option>`).join('');
const R={'/':home,'/program':program,'/profil':profil,'/daftar':daftar,'/biaya':biaya,'/kontak':kontak,'/privasi':privasi};
function route(){const[p,qs]=(location.hash.slice(1)||'/').split('?');(R[p]||home)(Object.fromEntries(new URLSearchParams(qs||'')));
 seo(p);document.querySelectorAll('#nv a:not(.btn)').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+p));$('#nv').classList.remove('open');$('#mt').setAttribute('aria-expanded','false');scrollTo(0,0);animate()}
addEventListener('hashchange',route);
$('#mt').onclick=()=>{const o=$('#nv').classList.toggle('open');$('#mt').setAttribute('aria-expanded',o)};

function profilSec(top){const P=PROFIL,tg=top?'h1 class="h"':'h2',te=top?'h1':'h2';
return `<section class="sec" id="profil"><div class="wrap"><${tg}>Profil ${esc(P.nama)}</${te}>
<div class="pf"><div class="pf-ph"><span class="glass">${esc(P.nama)} · Pendiri</span>${BIMBEL.fotoPendiri?`<img src="${esc(BIMBEL.fotoPendiri)}" alt="${esc(BIMBEL.fotoPendiriAlt)}" width="640" height="800" loading="lazy" decoding="async">`:`<svg viewBox="0 0 400 500" role="img" aria-label="${esc(BIMBEL.fotoPendiriAlt)}"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#832044"/><stop offset="1" stop-color="#290814"/></linearGradient></defs><rect width="400" height="500" fill="url(#pg)"/><circle cx="200" cy="210" r="112" fill="none" stroke="#d7876f" stroke-width="3"/><circle cx="200" cy="210" r="100" fill="#d7876f" fill-opacity=".12"/><text x="200" y="240" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-size="84" font-weight="700" fill="#d7876f">RM</text><path d="M130 345h140" stroke="#d7876f" stroke-opacity=".6"/><text x="200" y="385" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-size="24" fill="#f2d1c6">${esc(P.nama)}</text></svg>`}</div>
<div class="pf-tx"><p class="pf-role">${esc(P.jabatan)}</p><h3 class="tagl">${esc(P.tagline)}</h3>${P.paragraf.map(t=>`<p>${esc(t)}</p>`).join('')}</div></div>
<div class="grid pf-vm"><div class="card i-eye"><h3>Visi</h3><p>${esc(P.visi)}</p></div><div class="card i-flag"><h3>Misi</h3><ul class="ul">${P.misi.map(m=>`<li>${esc(m)}</li>`).join('')}</ul></div></div>
<div class="kom"><h3>Komitmen Miss Rima Bimbel</h3><p>${esc(P.komitmen)}</p><p class="pen">${esc(P.penutup)}</p></div></div></section>`}
function profil(){$('#app').innerHTML=profilSec(true)+`<section class="sec"><div class="wrap"><div class="cta"><h2>Mari Dampingi Belajar Anak Anda</h2><p>Konsultasikan kebutuhan belajar anak SD/MI Anda, atau langsung daftar lewat formulir online.</p><div class="acts" style="justify-content:center"><a class="btn" href="#/daftar">Daftar Sekarang</a><a class="btn ghost" style="color:#fff" href="#/program">Lihat Program Belajar</a></div></div></div></section>`}

function home(){const lb=PROGRAMS.find(p=>p.id==='baca');$('#app').innerHTML=`
<section class="hero"><div class="wrap"><div><div class="eyebrow">Miss Rima Bimbel · Bimbel SD/MI</div><h1>${esc(BIMBEL.tagline).replace(/^(.*?,)\s*(.+)$/,'$1<br><em>$2</em>')}</h1>
<p>Lembaga bimbingan belajar tatap muka khusus siswa SD/MI kelas 1–6. Kami membantu anak memahami pelajaran sekolah, mengembangkan kemampuan membaca, dan membangun kebiasaan belajar yang positif melalui pendampingan yang terarah dan menyenangkan.</p>
<div class="rot" aria-live="off">Program: <b id="rot"></b></div>
<div class="acts"><a class="btn" href="#/daftar">Daftar Sekarang</a><a class="btn ghost" style="color:#fff" href="${waLink('Halo Miss Rima Bimbel, saya ingin konsultasi tentang bimbingan belajar untuk siswa SD/MI.')}" target="_blank" rel="noopener">Konsultasi via WhatsApp</a><a class="btn ghost" style="color:#fff" href="#/program">Lihat Program Belajar</a></div><div class="chips"><span>Khusus SD/MI Kelas 1–6</span><span>Pembelajaran Tatap Muka</span><span>Program Les Baca</span><span>Pendampingan Belajar</span><span>Perkembangan Belajar Terpantau</span></div></div>
<div class="photo"><span class="glass">Tatap muka · SD/MI kelas 1–6</span>${BIMBEL.foto?`<img src="${esc(BIMBEL.foto)}" alt="${esc(BIMBEL.fotoAlt)}" width="640" height="640" loading="eager" decoding="async">`:`<svg viewBox="0 0 400 300" role="img" aria-label="Ilustrasi buku terbuka sebagai simbol belajar membaca di Miss Rima Bimbel"><rect width="400" height="300" fill="#721a3a"/><circle cx="320" cy="70" r="40" fill="#d7876f" opacity=".35"/><rect x="40" y="200" width="320" height="16" rx="8" fill="#d7876f"/><path d="M200 90c-30-20-70-24-110-16v110c40-8 80-4 110 16 30-20 70-24 110-16V74c-40-8-80-4-110 16z" fill="#fff"/><path d="M200 90v110" stroke="#461024" stroke-width="4"/><path d="M120 110h56M120 130h56M120 150h48M224 110h56M224 130h56M224 150h48" stroke="#d7a4b7" stroke-width="5" stroke-linecap="round"/></svg>`}</div></div></section>
<div class="strip" aria-hidden="true"><div>${'<span>Belajar tatap muka</span><span>Khusus SD/MI kelas 1–6</span><span>Program Les Baca</span><span>Pendampingan belajar</span><span>Perkembangan terpantau orang tua</span><span>Daftar online</span>'.repeat(4)}</div></div>
<section class="sec" id="program"><div class="wrap"><h2>Program Bimbel SD/MI untuk Setiap Kebutuhan Anak</h2><p style="max-width:62ch">Pilih program yang paling dibutuhkan anak Anda, mulai dari les baca, Matematika, dan bahasa hingga pendampingan PR dan persiapan ujian sekolah.</p><div class="grid" style="margin-top:22px">
${PROGRAMS.map(p=>`<div class="card i-${p.id}"><span class="tag">${esc(p.jenjang)}</span><h3>${esc(p.nama)}</h3><p>${esc(p.deskripsi)}</p></div>`).join('')}</div>
<div class="acts"><a class="btn navy" href="#/program">Lihat Semua Program Belajar</a><a class="btn" href="#/daftar">Daftar Sekarang</a></div></div></section>
<section class="sec alt" id="les-baca"><div class="wrap"><h2>Les Baca untuk Anak SD/MI</h2><p style="max-width:66ch">Program khusus bagi anak yang baru belajar membaca maupun siswa yang membutuhkan peningkatan kelancaran membaca. Pendekatannya bertahap dan menyenangkan, mengikuti kemampuan awal setiap anak.</p>
<ol class="steps" style="margin-top:22px">${lb.poin.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
<p style="max-width:66ch;margin-top:22px">${esc(lb.catatan)}</p>
<div class="acts"><a class="btn" href="#/daftar?program=baca">Daftar Les Baca</a><a class="btn ghost" href="${waLink('Halo Miss Rima Bimbel, saya ingin bertanya tentang program Les Baca untuk siswa SD/MI.')}" target="_blank" rel="noopener">Tanya Les Baca via WhatsApp</a></div></div></section>
<section class="sec"><div class="wrap"><h2>Mengapa Belajar di Miss Rima Bimbel?</h2><div class="grid">
<div class="card i-user"><h3>Tatap muka</h3><p>Belajar langsung bersama pengajar di ruang belajar, sehingga anak bisa bertanya dan dibimbing secara langsung.</p></div>
<div class="card i-chart"><h3>Perkembangan terpantau</h3><p>Orang tua mendapat kabar perkembangan belajar anak, jadi Anda tahu kemajuan dan kebutuhannya.</p></div>
<div class="card i-cap"><h3>Khusus SD/MI kelas 1–6</h3><p>Seluruh program dirancang untuk siswa SD/MI, dari belajar membaca hingga persiapan ujian sekolah.</p></div>
<div class="card i-form"><h3>Daftar mudah</h3><p>Isi formulir online, PDF pendaftaran dibuat otomatis, lalu kirim lewat WhatsApp.</p></div></div></div></section>
${profilSec(false)}
<section class="sec alt"><div class="wrap"><h2>Cara Daftar Bimbel: 4 Langkah Mudah</h2><ol class="steps"><li>Isi formulir pendaftaran</li><li>Formulir PDF dibuat otomatis</li><li>Kirim ke WhatsApp bimbel</li><li>Kami hubungi orang tua dan atur jadwal</li></ol></div></section>
<section class="sec"><div class="wrap" style="max-width:760px"><h2>Pertanyaan Umum seputar Bimbel SD/MI dan Les Baca</h2>
${FAQ.map(f=>`<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}
<p style="text-align:center;margin-top:18px">Lihat juga <a href="#/program" style="text-decoration:underline">program bimbel</a>, <a href="#/biaya" style="text-decoration:underline">informasi biaya</a>, atau <a href="#/kontak" style="text-decoration:underline">hubungi kami</a>.</p></div></section>
<section class="sec"><div class="wrap"><div class="cta"><h2>Daftarkan Anak Anda Sekarang</h2><p>Isi formulir online, lalu kami hubungi orang tua untuk mengatur jadwal belajar.</p><div class="acts" style="justify-content:center"><a class="btn" href="#/daftar">Daftar Sekarang</a><a class="btn ghost" style="color:#fff" href="#/kontak">Hubungi kami</a></div></div></div></section>`}

function daftar(q={}){$('#app').innerHTML=`<section class="sec"><div class="wrap" style="max-width:680px"><h1 class="h">Pendaftaran Bimbel SD/MI</h1><p>Pendaftaran khusus siswa SD/MI kelas 1–6. Daftarkan anak Anda dalam beberapa menit. Isi data di bawah. Setelah Anda menekan tombol kirim, formulir PDF dibuat otomatis dan WhatsApp terbuka dengan pesan yang sudah terisi.</p>
<form id="f" novalidate><div id="m" role="alert"></div>
<fieldset><legend>Data siswa</legend>
<div class="f"><label for="n">Nama lengkap siswa *</label><input id="n" autocomplete="off"></div>
<div class="row"><div class="f"><label for="l">Jenjang pendidikan *</label><select id="l"><option value="SD">SD (Sekolah Dasar)</option><option value="MI">MI (Madrasah Ibtidaiyah)</option></select></div><div class="f"><label for="g">Kelas *</label><select id="g"></select></div></div><div class="hint">Pendaftaran khusus untuk siswa SD/MI kelas 1–6.</div></fieldset>
<fieldset><legend>Orang tua / wali</legend>
<div class="f"><label for="p">Nama lengkap orang tua/wali *</label><input id="p" autocomplete="off"></div>
<div class="f"><label for="t">Nomor WhatsApp aktif *</label><input id="t" type="tel" inputmode="tel" placeholder="08xxxxxxxxxx"></div></fieldset>
<fieldset><legend>Program & jadwal</legend>
<div class="f"><label for="pr">Program bimbingan belajar *</label><select id="pr"><option value="">— Pilih program —</option>${progOpt()}</select></div>
<div class="f"><label for="jd">Preferensi jadwal belajar *</label><select id="jd"><option value="">— Pilih jadwal —</option>${JADWAL.map(j=>`<option>${esc(j)}</option>`).join('')}</select><div class="hint">Jadwal final dikonfirmasi oleh pihak bimbel.</div></div>
<div class="f"><label for="ct">Catatan tambahan (opsional)</label><textarea id="ct" rows="3" maxlength="300" placeholder="Mis. kemampuan membaca saat ini, kesulitan belajar, permintaan khusus"></textarea></div></fieldset>
<button class="btn navy" id="sb" style="width:100%">Kirim Pendaftaran</button></form><div id="out"></div></div></section>`;
 const fillG=()=>{const c=$('#g').value,ks=KELAS[$('#l').value]||[];$('#g').innerHTML=ks.map(k=>`<option>${k}</option>`).join('');if(ks.map(String).includes(c))$('#g').value=c};fillG();$('#l').onchange=fillG;if(PROGRAMS.some(p=>p.id===q.program))$('#pr').value=q.program;
 $('#f').onsubmit=e=>{e.preventDefault();const v=k=>$('#'+k).value.replace(/\s+/g,' ').trim(),er=[];
  const nm=/^[A-Za-zÀ-ÿ.'’\- ]{3,60}$/;
  if(!nm.test(v('n')))er.push(['n','Nama siswa minimal 3 huruf (huruf, spasi, titik, atau tanda hubung).']);
  if(!nm.test(v('p')))er.push(['p','Nama orang tua/wali minimal 3 huruf.']);
  let w=v('t').replace(/[^\d+]/g,'');w=w.startsWith('+')?w.slice(1):w.startsWith('0')?'62'+w.slice(1):w;
  if(!/^628\d{8,11}$/.test(w))er.push(['t','Nomor WhatsApp tidak valid. Contoh: 081234567890.']);
  if(!(KELAS[$('#l').value]||[]).includes(+$('#g').value))er.push(['g','Pilih jenjang SD atau MI dan kelas 1 sampai 6.']);
  if(!v('pr'))er.push(['pr','Pilih program bimbingan belajar.']);
  if(!v('jd'))er.push(['jd','Pilih preferensi jadwal belajar.']);
  ['n','p','t','g','pr','jd'].forEach(k=>$('#'+k).removeAttribute('aria-invalid'));
  if(er.length){er.forEach(x=>$('#'+x[0]).setAttribute('aria-invalid','true'));$('#m').innerHTML=`<div class="msg err">${er.map(x=>esc(x[1])).join('<br>')}</div>`;$('#'+er[0][0]).focus();return}
  $('#m').innerHTML='';
  hasil({nama:v('n'),jenjang:$('#l').value,kelas:$('#g').value,ortu:v('p'),wa:v('t'),waNorm:w,program:PROGRAMS.find(x=>x.id===v('pr')).nama,jadwal:v('jd'),catatan:v('ct')||'-',tgl:tglNow(),reg:regNo()})}}

const tglNow=()=>new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
const regNo=()=>{const n=new Date(),p=x=>String(x).padStart(2,'0'),r=Array.from(crypto.getRandomValues(new Uint8Array(3)),b=>b.toString(36).padStart(2,'0')).join('').slice(0,4).toUpperCase();return`DWM-${n.getFullYear()}${p(n.getMonth()+1)}${p(n.getDate())}-${r}`};
const MIME={pdf:'application/pdf'};
const fname=(d,e)=>`Pendaftaran_${(d.nama.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,30))||'Siswa'}_${d.reg}.${e}`;
const secs=d=>[
 {t:'A. DATA SISWA',r:[['Nama lengkap siswa',d.nama],['Jenjang pendidikan',d.jenjang],['Kelas',d.kelas]]},
 {t:'B. DATA ORANG TUA/WALI',r:[['Nama lengkap orang tua/wali',d.ortu],['Nomor WhatsApp aktif',d.wa]]},
 {t:'C. PROGRAM & JADWAL',r:[['Program bimbingan belajar',d.program],['Preferensi jadwal',d.jadwal],['Catatan tambahan',d.catatan]]},
 {t:'D. INFORMASI PENDAFTARAN',r:[['Tanggal pendaftaran',d.tgl],['Nomor registrasi',d.reg],['Status pendaftaran','Menunggu konfirmasi']]},
 {t:'E. CATATAN GURU BIMBEL',r:[['Koreksi nama siswa','',1],['Koreksi jenjang dan kelas','',1],['Koreksi data orang tua/wali','',1],['Catatan tambahan','',2],['Status verifikasi','[   ] Terverifikasi        [   ] Perlu perbaikan']]}];

function makePDF(d){const p=new window.jspdf.jsPDF({unit:'mm',format:'a4'}),L=15,W=180,LW=62,cl=s=>String(s).replace(/[\u2013\u2014]/g,'-').replace(/[^\x20-\xFF]/g,'?');
 p.setFillColor(70,16,36);p.rect(0,0,210,30,'F');p.setTextColor(215,135,111);p.setFont('helvetica','bold');p.setFontSize(20);p.text('Miss Rima Bimbel',105,13,{align:'center'});
 p.setTextColor(255,255,255);p.setFontSize(10.5);p.text('FORMULIR PENDAFTARAN SISWA BIMBEL SD/MI (KELAS 1-6)',105,22,{align:'center'});
 let y=38;p.setDrawColor(208,182,192);p.setLineWidth(.2);
 secs(d).forEach(s=>{p.setFillColor(70,16,36);p.rect(L,y,W,7,'F');p.setTextColor(255,255,255);p.setFont('helvetica','bold');p.setFontSize(10);p.text(s.t,L+3,y+5);y+=7;
  s.r.forEach(r=>{const lines=p.splitTextToSize(cl(r[1]),W-LW-6),h=Math.max(9*(r[2]||1),lines.length*5+4);
   p.setFillColor(249,239,243);p.rect(L,y,LW,h,'FD');p.rect(L+LW,y,W-LW,h);
   p.setTextColor(61,30,41);p.setFont('helvetica','bold');p.setFontSize(9.5);p.text(cl(r[0]),L+3,y+6);p.setFont('helvetica','normal');p.text(lines,L+LW+3,y+6);y+=h});y+=6});
 p.setFont('helvetica','bold');p.setFontSize(10);p.setTextColor(70,16,36);p.text('PERSETUJUAN',L,y+2);y+=6;p.setTextColor(61,30,41);
 [[L+25,'Orang tua/wali',cl(d.ortu)],[L+W-25-35,'Guru bimbel / Admin','']].forEach(c=>{const cx=c[0]+17.5;p.setFont('helvetica','normal');p.setFontSize(9.5);p.text(c[1],cx,y+3,{align:'center'});p.line(c[0]-8,y+27,c[0]+43,y+27);p.text(c[2]?'( '+c[2]+' )':'(                                 )',cx,y+32,{align:'center'});p.text('Tanggal: ..................',cx,y+38,{align:'center'})});
 return p.output('arraybuffer')}

const waMsg=d=>`PENDAFTARAN SISWA BARU — Miss Rima Bimbel

Assalamu'alaikum warahmatullahi wabarakatuh.

Berikut kami sampaikan data pendaftaran siswa:
Nama siswa: ${d.nama}
Jenjang: ${d.jenjang}
Kelas: ${d.kelas} (siswa SD/MI kelas 1–6)
Orang tua/wali: ${d.ortu}
Nomor WhatsApp: ${d.wa}
Program: ${d.program}
Preferensi jadwal: ${d.jadwal}
Catatan: ${d.catatan}
Nomor registrasi: ${d.reg}

Dokumen pendaftaran tersedia dalam format PDF untuk diperiksa serta dikoreksi apabila terdapat kesalahan data.

Mohon guru bimbel melakukan verifikasi data dan memberikan koreksi jika diperlukan.

Terima kasih.
Miss Rima Bimbel`;

function hasil(d){const out=$('#out'),sb=$('#sb');let pdf;
 try{if(!window.jspdf)throw 0;pdf=makePDF(d);if(!pdf.byteLength)throw 0}
 catch{out.innerHTML='<div class="msg err" style="margin-top:18px">Dokumen gagal dibuat. Periksa koneksi internet, muat ulang halaman, lalu coba lagi. Data Anda belum dikirim ke mana pun.</div>';return}
 const msg=waMsg(d),name=fname(d,'pdf'),st={pdf:0,wa:0},link=waLink(msg);
 const w=window.open(link,'_blank');if(w){try{w.opener=null}catch{}st.wa=1}
 $('#f').hidden=true;
 out.innerHTML=`<div class="done"><h3>Pendaftaran dibuat</h3>
 <p style="margin:0 0 12px">Nomor registrasi: <b>${esc(d.reg)}</b> · Status: Menunggu konfirmasi</p>
 <div class="msg" style="background:#faeeea;color:#6b5400"><b>Belum terkirim.</b> WhatsApp tidak bisa mengirim otomatis. Di WhatsApp: ketuk ikon klip/+ → Dokumen → pilih file PDF di folder Unduhan, lalu tekan tombol kirim.</div>
 <div id="ck"></div>
 <div class="acts"><a class="btn wa" id="wa" href="${link}" target="_blank" rel="noopener">Buka WhatsApp lagi</a><button class="btn navy" id="dp">Unduh PDF lagi</button><button class="btn wa" id="sh" hidden>Bagikan PDF langsung (HP)</button><button class="btn ghost" id="nw">Isi pendaftaran baru</button></div></div>`;
 const ck=()=>$('#ck').innerHTML=`<div class="msg" style="background:var(--card);border:1px solid var(--line);color:var(--ink)">PDF: ${st.pdf?'✓ tersimpan ('+esc(name)+')':'menunggu penyimpanan…'}<br>WhatsApp: ${st.wa?'sudah dibuka. Pesan baru terkirim setelah Anda menekan kirim.':'belum terbuka (mungkin diblokir peramban). Klik “Buka WhatsApp lagi”.'}</div>`;ck();
 const save=async()=>{try{const dl=(typeof claude!=='undefined'&&claude.use)?await claude.use('downloads'):null;
   if(dl)await dl.save({filename:name,data:pdf});
   else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([pdf],{type:MIME.pdf}));a.download=name;document.body.appendChild(a);a.click();a.remove()}
   st.pdf=1;ck()}catch(e){if(!e||e.code!=='declined')$('#ck').insertAdjacentHTML('afterbegin','<div class="msg err">PDF gagal disimpan. Klik “Unduh PDF lagi”.</div>')}};
 save();
 $('#wa').onclick=()=>{st.wa=1;ck()};$('#dp').onclick=save;
 const file=()=>new File([pdf],name,{type:MIME.pdf});
 try{if(navigator.canShare&&navigator.canShare({files:[file()]})){const s=$('#sh');s.hidden=false;s.onclick=async()=>{try{await navigator.share({files:[file()],text:msg})}catch(e){if(e.name!=='AbortError')$('#ck').insertAdjacentHTML('afterbegin','<div class="msg err">Berbagi langsung tidak tersedia di perangkat ini.</div>')}}}}catch{}
 $('#nw').onclick=()=>daftar()}

function program(){const wa=p=>waLink(`Halo Miss Rima Bimbel, saya ingin bertanya tentang program ${p.nama} untuk siswa SD/MI.`);
$('#app').innerHTML=`<section class="sec"><div class="wrap"><h1 class="h">Program Bimbel SD/MI dan Les Baca</h1><p style="max-width:62ch">Temukan program yang sesuai kebutuhan anak kelas 1–6, dari les baca, Matematika, Bahasa Indonesia, dan Bahasa Inggris dasar hingga pendampingan PR dan persiapan ujian sekolah. Semua kegiatan belajar dilakukan tatap muka, jadi anak bisa bertanya langsung kepada pengajar.</p><div class="grid" style="margin-top:22px">
${PROGRAMS.map(p=>`<article class="card pc i-${p.id}${p.id==='baca'?' feat':''}" id="prog-${p.id}"><span class="tag">${esc(p.jenjang)}</span><h3>${esc(p.nama)}</h3><p>${esc(p.deskripsi)}</p>
<ul class="ul">${p.poin.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${p.catatan?`<p class="hint">${esc(p.catatan)}</p>`:''}
<dl><dt>Kegiatan belajar</dt><dd>${esc(p.kegiatan)}</dd><dt>Jadwal</dt><dd>${p.jadwal?esc(p.jadwal):'<span class="ph">Dikonfirmasi saat pendaftaran</span>'}</dd></dl>
<div class="acts"><a class="btn" href="#/daftar?program=${p.id}">Daftar Program</a><a class="btn ghost" href="${wa(p)}" target="_blank" rel="noopener">Tanya</a></div></article>`).join('')}</div></div></section>`}

function biaya(){const wa=n=>waLink(`Halo Miss Rima Bimbel, saya ingin konsultasi tentang ${n} untuk siswa SD/MI dan menanyakan informasi biayanya.`);
$('#app').innerHTML=`<section class="sec"><div class="wrap"><h1 class="h">Informasi Biaya Bimbel SD/MI</h1><p style="max-width:62ch">Lihat biaya pendaftaran, biaya belajar bulanan, dan paket belajar di satu tempat. Masih ragu memilih paket? Konsultasikan lewat WhatsApp.</p>
<div class="grid" style="margin-bottom:26px"><div class="card i-form"><h3>Biaya pendaftaran</h3><div class="price">${rp(BIAYA.daftar)}</div></div><div class="card i-cal"><h3>Biaya belajar bulanan</h3><div class="price">${rp(BIAYA.bulanan)}</div></div></div>
<h2>Pilihan paket</h2><div class="grid">${PAKET.map(k=>`<article class="card pc"><span class="tag">${esc(k.untuk)}</span><h3>${esc(k.nama)}</h3><div class="price">${rp(k.harga)}${k.harga?'<small style="font-size:.5em;font-weight:600"> / bulan</small>':''}</div>
<ul class="ul">${k.fasilitas.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><div class="acts"><a class="btn" href="#/daftar${k.program?'?program='+k.program:''}">Daftar</a><a class="btn wa" href="${wa(k.nama)}" target="_blank" rel="noopener">Konsultasi</a></div></article>`).join('')}</div></div></section>
<section class="sec alt"><div class="wrap"><div class="grid"><div><h2>Metode pembayaran</h2>${METODE.length?`<ul class="ul">${METODE.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>`:'<p class="ph">Informasi metode pembayaran akan diberikan oleh pihak bimbel. Silakan tanyakan lewat WhatsApp.</p>'}</div>
<div><h2>Ketentuan pembayaran</h2>${KETENTUAN.length?`<ul class="ul">${KETENTUAN.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>`:'<p class="ph">Ketentuan pembayaran akan dijelaskan saat pendaftaran.</p>'}</div></div></div></section>`}

function kontak(){const B=BIMBEL,na='<span class="ph">Belum tersedia</span>',tel=B.telp.replace(/[^\d+]/g,''),so=Object.entries(B.sosmed).filter(([,u])=>/^https?:\/\//.test(u));
$('#app').innerHTML=`<section class="sec"><div class="wrap"><h1 class="h">Kontak &amp; Lokasi Miss Rima Bimbel</h1><p style="max-width:62ch">Ada pertanyaan tentang program, jadwal, atau pendaftaran? Hubungi kami lewat WhatsApp, kami siap membantu.</p>
<div class="grid" style="align-items:start;margin-top:20px"><ul class="pg">
<li><b>WhatsApp</b><a href="${waLink('Halo Miss Rima Bimbel, saya ingin bertanya.')}" target="_blank" rel="noopener" style="text-decoration:underline">0${WA_NUMBER.slice(2)}</a></li>
<li><b>Telepon</b>${tel?`<a href="tel:${esc(tel)}">${esc(B.telp)}</a>`:na}</li>
<li><b>Email</b>${B.email?`<a href="mailto:${esc(B.email)}">${esc(B.email)}</a>`:na}</li>
<li><b>Alamat</b>${B.alamat?esc(B.alamat):na}</li>

<li><b>Jam operasional</b>${B.jam?esc(B.jam):na}</li>
<li><b>Media sosial</b>${so.length?so.map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener" style="text-decoration:underline;margin-right:12px">${esc(n)}</a>`).join(''):na}</li></ul>
<div>${B.mapsQuery?`<iframe class="map" title="Peta lokasi Miss Rima Bimbel" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(B.mapsQuery)}&output=embed"></iframe><p><a class="btn ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(B.mapsQuery)}" target="_blank" rel="noopener">Buka di Google Maps</a></p>`:'<div class="card"><h3>Peta lokasi</h3><p class="ph">Peta akan tampil setelah alamat bimbel diisi.</p></div>'}</div></div>
<div class="acts"><a class="btn wa" href="${waLink('Halo Miss Rima Bimbel, saya ingin bertanya.')}" target="_blank" rel="noopener">Chat WhatsApp</a><a class="btn ghost" href="#/daftar">Isi formulir pendaftaran</a></div></div></section>`}
function privasi(){$('#app').innerHTML=`<section class="sec"><div class="wrap" style="max-width:700px"><h1 class="h">Kebijakan privasi</h1><p>Situs ini tidak menyimpan data formulir di server. Data yang Anda isi hanya diolah di perangkat Anda untuk dibuat menjadi file PDF, dan baru terkirim ketika Anda sendiri mengirimnya lewat WhatsApp.</p></div></section>`}
/* ===== Animasi: muncul saat di-scroll + hiasan hero + header menyusut ===== */
const RM=!window.matchMedia||matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=!RM&&'IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
let rt;
function textFx(){clearTimeout(rt);const r=$('#rot');
 if(r){const L=PROGRAMS.map(p=>p.nama);if(RM)r.textContent=L.join(' · ');else{let i=0,c=0,del=false;const tick=()=>{if(!r.isConnected)return;const t=L[i];c+=del?-1:1;r.textContent=t.slice(0,c);let d=del?30:75;if(!del&&c===t.length){del=true;d=1700}else if(del&&c===0){del=false;i=(i+1)%L.length;d=350}rt=setTimeout(tick,d)};tick()}}
 if(RM)return;
 const sw=(el,k)=>[...el.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t))return f.append(' ');const w=document.createElement('span'),x=document.createElement('span');w.className='w';x.textContent=t;x.style.setProperty('--i',k.n++);w.append(x);f.append(w)});n.replaceWith(f)}else if(n.nodeType===1&&n.tagName!=='BR')sw(n,k)});
 const h=$('#app .hero h1');if(h&&!h.classList.contains('sp')){h.setAttribute('aria-label',h.textContent.replace(',',', '));sw(h,{n:0});h.classList.add('sp')}
 document.querySelectorAll('#app .sec :is(h2,h1.h)').forEach(e=>{if(!e.querySelector('.w')){e.setAttribute('aria-label',e.textContent);sw(e,{n:0})}})}
function animate(){textFx();if(!io)return;
 document.querySelectorAll('#app .sec :is(h2,h1.h,.card,.steps li,details,.pg li,.cta,.kom,.map,p.ph,.wrap>p)').forEach((el,i,a)=>{if(el.closest('.hero'))return;el.classList.add('rv');el.style.setProperty('--d',(i%4)*.08+'s');io.observe(el)});
 const h=$('#app .hero');if(h&&!h.querySelector('.orb'))h.insertAdjacentHTML('afterbegin','<i class="orb" style="width:90px;height:90px;top:12%;left:4%"></i><i class="orb sq" style="width:46px;height:46px;top:62%;left:42%;animation-delay:-3s"></i><i class="orb" style="width:36px;height:36px;top:22%;left:48%;animation-delay:-5s"></i><i class="orb sq" style="width:70px;height:70px;bottom:10%;right:6%;animation-delay:-2s"></i>')}
$('#fwa').href=waLink('Halo Miss Rima Bimbel, saya ingin bertanya.');
addEventListener('scroll',()=>document.querySelector('header.top').classList.toggle('sc',scrollY>20),{passive:true});

route();

/* ===== Kilau bintang hero ===== */
(()=>{
 
 const star='<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor"/></svg>';
 const add=()=>{const h=document.querySelector('#app .hero');if(!h||h.querySelector('.bsp'))return;
  [[8,12,18,0],[78,8,14,1.2],[90,55,22,2.4],[45,82,12,.6],[20,60,10,3],[62,30,10,1.8]].forEach(([x,y,z,t])=>{const e=document.createElement('i');e.className='bsp';e.style.cssText=`left:${x}%;top:${y}%;width:${z}px;height:${z}px;animation-delay:${t}s`;e.innerHTML=star;h.appendChild(e)})};
 add();new MutationObserver(add).observe(document.getElementById('app'),{childList:true});
})();

/* ===== Efek premium ===== */
(()=>{const B=document.body;
 const sp=document.createElement('div');sp.id='sp';B.appendChild(sp);
 addEventListener('scroll',()=>{const h=document.documentElement;sp.style.width=(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+'%'},{passive:true});
 try{if(!sessionStorage.getItem('intro1')){sessionStorage.setItem('intro1','1');
  const i=document.createElement('div');i.id='intro';
  i.innerHTML='<div><div class="ring"><img alt="" src="'+document.querySelector('.logo img').src+'"></div><b>MISS RIMA</b><span>Bimbel · Teman Belajar, Langkah Menuju Prestasi</span></div>';
  B.appendChild(i);setTimeout(()=>i.classList.add('out'),2300);setTimeout(()=>i.remove(),3600)}}catch(e){}
 const words=['Matematika','Bahasa Indonesia','Bahasa Inggris Dasar','Pendampingan PR','Les Baca','SD/MI Kelas 1–6','Belajar Tatap Muka','Percaya Diri','Berprestasi'];
 const row=words.map(w=>w+' <i>✦</i>').join(' ');
 const deco=()=>{const h=document.querySelector('#app .hero');if(!h||h.querySelector('#spot'))return;
  h.insertAdjacentHTML('afterbegin','<div id="spot"></div>');
  h.addEventListener('pointermove',e=>{const r=h.getBoundingClientRect();h.style.setProperty('--mx',(e.clientX-r.left)+'px');h.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
  if(!document.querySelector('.mq'))h.insertAdjacentHTML('afterend','<div class="mq" aria-hidden="true"><div>'+row+' '+row+' '+row+' '+row+'</div></div>')};
 deco();new MutationObserver(deco).observe(document.getElementById('app'),{childList:true});
})();
