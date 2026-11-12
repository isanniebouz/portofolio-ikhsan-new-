/**
 * Main JavaScript File for Ikhsan Mulia Apriana Portfolio
 * SMKN 1 Kawali - Rekayasa Perangkat Lunak (RPL)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING EFFECT
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'Junior Web Developer',
      'lulusan RPL SMKN 1 Kawali',
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 110;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 2. THEME TOGGLE (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Beralih ke mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} ✨`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon text-amber-500';
    } else {
      themeIcon.className = 'fas fa-sun text-yellow-400';
    }
  }

  // 3. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenuBtn.innerHTML = isOpen 
        ? '<i class="fas fa-times text-xl"></i>' 
        : '<i class="fas fa-bars text-xl"></i>';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      });
    });
  }

  // 4. ACTIVE NAVIGATION LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-blue-400', 'font-semibold');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });

  // 5. PROJECT FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/25');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'hover:text-white');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/25');
      btn.classList.remove('bg-slate-800/60', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. CONTACT FORM ACTIONS
  const contactForm = document.getElementById('contact-form');
  const sendWhatsAppBtn = document.getElementById('send-wa-btn');
  const sendEmailBtn = document.getElementById('send-email-btn');

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const senderContact = document.getElementById('contact-info').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan pesan Anda ya! 🙏', 'warning');
        return;
      }

      const phoneNumber = '6288298381231';
      const text = `Halo Ikhsan Mulia Apriana (SMKN 1 Kawali),%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Kontak:* ${encodeURIComponent(senderContact || '-')}%0A*Perihal:* ${encodeURIComponent(subject || 'Portfolio Inquiry')}%0A%0A*Pesan:*%0A${encodeURIComponent(message)}%0A%0A_Terkirim via Web Portfolio_`;

      const waUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp... Terima kasih telah menghubungi! 🚀');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const senderContact = document.getElementById('contact-info').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Pesan dari Pengunjung Portfolio';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan pesan Anda ya! 🙏', 'warning');
        return;
      }

      const body = `Halo Ikhsan,\n\nNama: ${name}\nKontak/Email: ${senderContact}\n\nPesan:\n${message}\n\n---\nDikirim melalui Web Portfolio`;
      const mailtoUrl = `mailto:muliaikhsan412@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast('Membuka aplikasi Email... 📧');
    });
  }

  // 7. COPY TO CLIPBOARD HELPER
  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} berhasil disalin! 📋`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} berhasil disalin! 📋`);
    } catch (err) {
      showToast('Gagal menyalin otomatis', 'warning');
    }
    document.body.removeChild(textArea);
  }

  // 8. TOAST NOTIFICATION
  function showToast(message, type = 'success') {
    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolio-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all duration-300 transform translate-y-16 opacity-0';
      document.body.appendChild(toast);
    }

    if (type === 'warning') {
      toast.style.backgroundColor = '#f59e0b';
      toast.style.color = '#1f2937';
      toast.innerHTML = `<i class="fas fa-exclamation-circle text-base"></i> <span>${message}</span>`;
    } else {
      toast.style.backgroundColor = '#10b981';
      toast.style.color = '#ffffff';
      toast.innerHTML = `<i class="fas fa-check-circle text-base"></i> <span>${message}</span>`;
    }

    // Show
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    // Hide after 3.2s
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-16', 'opacity-0');
    }, 3200);
  }

  // 9. PROJECT MODAL POPUP
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalFeatures = document.getElementById('modal-features');
  const modalDemoLink = document.getElementById('modal-demo-link');

  const projectData = {
    'project-1': {
      title: 'Web Company Profile - Project Uji Kompetensi Keahlian (UKK)',
      category: 'Uji Kompetensi Keahlian (UKK) RPL',
      desc: 'Website company profile interaktif dan modern yang dibangun sebagai pemenuhan syarat Uji Kompetensi Keahlian (UKK) bidang Rekayasa Perangkat Lunak SMKN 1 Kawali. Aplikasi ini menyajikan profil perusahaan yang profesional, katalog layanan, portofolio kerja, serta back-office/CMS untuk pembaruan konten secara mudah dan dinamis.',
      tags: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'HTML5 Semantic', 'SEO Friendly'],
      features: [
        'Desain responsif, clean UI modern, dan struktur navigasi intuitif',
        'Panel Content Management System (CMS) Admin untuk kelola konten & artikel dinamis',
        'Katalog produk/layanan dan etalase galeri portofolio instansi',
        'Formulir kontak & konsultasi online terhubung langsung',
        'Struktur database relasional terstandar Uji Kompetensi Keahlian (UKK)'
      ],
      demoLink: 'https://wa.me/6288298381231?text=Halo%20Ikhsan,%20saya%20tertarik%20dengan%20proyek%20Web%20Company%20Profile%20(UKK)%20kamu!'
    },
    'project-2': {
      title: 'Web Pembukuan Akuntansi - Project Tugas PKKwu',
      category: 'Tugas Produk Kreatif & Kewirausahaan (PKKwu)',
      desc: 'Sistem informasi akuntansi dan pencatatan kas bisnis berbasis website yang dirancang untuk pemenuhan tugas mata pelajaran Produk Kreatif dan Kewirausahaan (PKKwu). Membantu unit wirausaha sekolah atau UMKM mendokumentasikan setiap arus kas (cash flow) masuk dan keluar secara terstruktur dan akurat.',
      tags: ['PHP', 'MySQL', 'Bootstrap 5', 'Chart.js', 'Ajax', 'Akuntansi Digital'],
      features: [
        'Pencatatan kas masuk dan kas keluar dengan multi-kategori transaksi',
        'Penyusunan jurnal umum, buku besar, dan neraca kas secara otomatis',
        'Kalkulasi otomatis neraca laba rugi usaha harian hingga bulanan',
        'Visualisasi grafik performa finansial interaktif menggunakan Chart.js',
        'Fitur cetak dan ekspor rekapitulasi laporan keuangan usaha siap pakai'
      ],
      demoLink: 'https://wa.me/6288298381231?text=Halo%20Ikhsan,%20saya%20tertarik%20dengan%20proyek%20Web%20Pembukuan%20Akuntansi%20(PKKwu)%20kamu!'
    },
    'project-3': {
      title: 'Sistem Web Kasir (POS) - Tugas Akhir Kelas 11',
      category: 'Tugas Akhir Kenaikan Kelas 11 RPL',
      desc: 'Aplikasi kasir dan manajemen penjualan Point of Sale (POS) berbasis website yang dikembangkan sebagai proyek Tugas Akhir kenaikan kelas 11 di jurusan RPL SMKN 1 Kawali. Dirancang untuk mempercepat proses transaksi ritel, pencatatan penjualan, monitoring inventaris stok secara real-time, serta pencetakan struk pembayaran.',
      tags: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Ajax', 'Struk Thermal'],
      features: [
        'Antarmuka kasir cepat dengan dukungan input barcode dan navigasi responsif',
        'Kalkulasi subtotal, diskon produk, pajak, dan nominal kembalian seketika',
        'Manajemen stok gudang dengan notifikasi otomatis jika persediaan menipis',
        'Fitur cetak struk belanja ramah printer thermal langsung dari browser',
        'Laporan rekapitulasi penjualan harian, bulanan, dan produk terlaris'
      ],
      demoLink: 'https://wa.me/6288298381231?text=Halo%20Ikhsan,%20saya%20tertarik%20dengan%20proyek%20Sistem%20Web%20Kasir%20(Tugas%20Akhir)%20kamu!'
    }
  };

  window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    if (modalDemoLink && data.demoLink) {
      modalDemoLink.href = data.demoLink;
    }

    // Tags
    modalTags.innerHTML = data.tags.map(tag => 
      `<span class="px-2.5 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">${tag}</span>`
    ).join('');

    // Features
    modalFeatures.innerHTML = data.features.map(f => 
      `<li class="flex items-start gap-2 text-sm text-slate-300">
        <i class="fas fa-check-circle text-emerald-400 mt-1 flex-shrink-0"></i>
        <span>${f}</span>
      </li>`
    ).join('');

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });
});

