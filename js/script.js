/* ==========================================================================
   Scroll Reveal Animation (スクロールに合わせてふわっと表示)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画面内に入ったら 'is-visible' クラスを付与
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除（何度も動かさない場合）
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 10%が見えたら発動
        rootMargin: '0px 0px -50px 0px' // 画面の一番下より50px手前で発動（余裕を持たせる）
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

/* スムーススクロール（ヘッダーの高さを考慮） */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;

        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

/* ロゴ（# または ページトップ）をクリックした時もスムーススクロールさせる */
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

// .section-title も監視対象にする
document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

