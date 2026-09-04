// ごちそう日和 LP

document.addEventListener('DOMContentLoaded', () => {
  // スクロールで要素をふわっと表示
  const fadeEls = document.querySelectorAll('.fade-in');

  // 画像は読み込み完了を待ってから表示する（フェード中の空白を防ぐ）
  const show = (el) => {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (img && !img.complete) {
      const reveal = () => el.classList.add('is-visible');
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
      return;
    }
    el.classList.add('is-visible');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // ヒーローの小さい画像を一定時間ごとに切り替える
  const dishSlides = document.querySelectorAll('.hero__dish-img');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (dishSlides.length > 1 && !prefersReducedMotion) {
    let current = 0;
    setInterval(() => {
      dishSlides[current].classList.remove('is-active');
      current = (current + 1) % dishSlides.length;
      dishSlides[current].classList.add('is-active');
    }, 4000);
  }

  // スクロール時にヘッダーへ影をつける
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });

  // スマホ用ハンバーガーメニュー
  const menuBtn = document.getElementById('menuBtn');
  const gnav = document.getElementById('gnav');

  menuBtn.addEventListener('click', () => {
    const isOpen = gnav.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // メニュー内リンクを押したら閉じる
  gnav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      gnav.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
});
