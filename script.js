document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const book = document.getElementById('book');
  const scene = document.getElementById('scene');

  // Ordena a sobreposição inicial das páginas
  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
  });

  // Função para verificar se o livro está aberto e ajustar a posição central
  function updateBookPosition() {
    const hasFlippedPages = document.querySelectorAll('.page.flipped').length > 0;
    if (hasFlippedPages) {
      book.classList.add('is-open');
    } else {
      book.classList.remove('is-open');
    }
  }

  pages.forEach((page, index) => {
    page.addEventListener('click', () => {
      page.style.pointerEvents = 'none';
      setTimeout(() => page.style.pointerEvents = 'auto', 1200);

      if (page.classList.contains('flipped')) {
        page.classList.remove('flipped');
        setTimeout(() => {
          page.style.zIndex = pages.length - index;
          updateBookPosition();
        }, 600);
      } else {
        page.classList.add('flipped');
        setTimeout(() => {
          page.style.zIndex = index + 1;
        }, 600);
      }
      updateBookPosition();
    });
  });

  // Movimento do mouse
  scene.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 480) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      
      // Mantém a translação do livro aberto durante o efeito 3D do mouse
      const translateX = book.classList.contains('is-open') ? '50%' : '0%';
      book.style.transform = `translateX(${translateX}) rotateX(${10 + yAxis}deg) rotateY(${xAxis - 5}deg)`;
    }
  });

  scene.addEventListener('mouseleave', () => {
    if (window.innerWidth > 480) {
      const translateX = book.classList.contains('is-open') ? '50%' : '0%';
      book.style.transform = `translateX(${translateX}) rotateX(10deg) rotateY(-5deg)`;
    }
  });
});