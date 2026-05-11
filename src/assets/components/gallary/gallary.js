const imgBoxes = document.querySelectorAll('.img-box img');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlayImg');
const closeBtn = document.getElementById('closeBtn');

imgBoxes.forEach(img => {
  img.addEventListener('click', () => {
    overlay.style.display = 'flex';
    overlayImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});
