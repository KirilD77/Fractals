class Serpinsky {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.iter = 1000;
  }

  render() {
    this.points = [
      { x: this.canvasWidth / 2, y: 10 },
      { x: 10, y: this.canvasHeight - 50 },
      { x: this.canvasWidth - 10, y: this.canvasHeight - 50 }
    ];

    this.canvas.h = h;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'aqua';

    for (let i = 0; i < this.iter; i++) {
      var randVertex = Math.floor(Math.random() * 3);
      var randPoint = Math.floor(Math.random() * this.points.length);

      var x =
        this.points[randVertex].x +
        (this.points[randPoint].x - this.points[randVertex].x) / 2;

      var y =
        this.points[randVertex].y +
        (this.points[randPoint].y - this.points[randVertex].y) / 2;

      this.ctx.fillRect(x, y, 2, 2);

      this.points.push({ x, y });
    }
  }

  prepare() {
    const container = document.createElement('div');
    container.classList.add('inputContainer');

    const input = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');

    label.textContent = 'Num of iterations: ';
    button.textContent = 'Submit';

    const group = document.createElement('div');
    group.append(label, input);

    button.addEventListener('click', () => {
      this.iter = +input.value;
    });

    container.append(group, button);

    return container;
  }
}
