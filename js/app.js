const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');
canvas.width = w / 2;
canvas.height = h;
const ctx = canvas.getContext('2d');

let currentChoise = 0;

const renderers = [
  new Gulia(canvas, ctx, 10, new Complex(-0.2, 0.75)),
  new Mandelbrot(canvas, ctx, 10),
  new Serpinsky(canvas, ctx),
  new Newton(canvas, ctx)
];

let controller = renderers[currentChoise].prepare();
document.querySelector('.controllers').append(controller);

const submit = document.querySelector('#submit');
const fractalOptions = document.querySelectorAll('.chooseBox');

fractalOptions.forEach((option, idx) => {
  option.addEventListener('click', () => {
    if (currentChoise === idx) {
      return;
    }

    currentChoise = idx;

    document.querySelector('.controllers').removeChild(controller);
    controller = renderers[currentChoise].prepare();
    document.querySelector('.controllers').append(controller);

    // set info block
    document.querySelector('.name').textContent =
      DescriptionData[currentChoise].name;
    document.querySelector('.desc').textContent =
      DescriptionData[currentChoise].description;
    document.querySelector('.link').src =
      DescriptionData[currentChoise].wikipediaLink;

    option.classList.toggle('active');
    fractalOptions.forEach((fractal) => {
      if (option !== fractal) {
        fractal.classList.remove('active');
      }
    });
  });
});

submit.addEventListener('click', () => {
  console.log(`submit ${currentChoise}`);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderers[currentChoise].render();
});
