class Gulia {
  constructor(canvas, ctx, n, c) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.p = this.canvas.width / 2;
    this.scale = this.p / 2;
    this.n = n;

    this.c = c;

    this.colors = [167, 100, 220];
    this.exp = 2;
  }

  render() {
    for (let y = -this.p; y < this.p; y++) {
      for (let x = -this.p; x < this.p; x++) {
        let a = x / this.scale;
        let b = y / this.scale;

        let z = new Complex(a, b);
        let isValid = true;
        let i = 0;
        for (i = 0; i < this.n; i++) {
          z = z.pow(this.exp);
          z = z.sum(this.c);
          let abs = Math.sqrt(z.x ** 2, z.y ** 2);
          if (abs > this.exp) {
            isValid = false;
            break;
          }
        }
        if (isValid) {
          this.ctx.fillStyle = 'white';
          this.ctx.fillRect(x + this.p, y + this.p, 1, 1);
        } else {
          let r = (i * this.colors[0]) % 255;
          let g = (i * this.colors[1]) % 255;
          let b = (i * this.colors[2]) % 255;
          this.ctx.fillStyle = `rgba(${r}, ${g}, ${b})`;
          this.ctx.fillRect(x + this.p, y + this.p, 1, 1);
        }
      }
    }
  }

  prepare() {
    const container = document.createElement('div');
    container.classList.add('inputContainer');
    let rgb = 'rgb';
    for (let i = 0; i < 4; i++) {
      const input = document.createElement('input');
      const label = document.createElement('label');

      label.textContent = `${rgb[i]}: `;

      if (i === 3) {
        label.textContent = 'Power of complex: ';
      }
      const group = document.createElement('div');
      group.classList.add('formGroup');
      group.append(label, input);
      container.append(group);
    }

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.inputContainer input');

      inputs.forEach((input, idx) => {
        if (idx === 3) {
          this.exp = +input.value;
          return;
        }

        this.colors[idx] = +input.value;
      });
      console.log(this.colors);
    });

    container.appendChild(submitBtn);

    return container;
  }
}
