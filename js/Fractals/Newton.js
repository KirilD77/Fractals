/* const complex1_mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const complex1_sub = ([a, b], [c, d]) => [a - c, b - d];
const complex1_add = ([a, b], [c, d]) => [a + c, b + d];
const complex1_sqdist = ([a, b], [c, d]) => (a - c) ** 2 + (b - d) ** 2;

const complex1_div = ([a, b], [c, d]) => {
  let den = c ** 2 + d ** 2;
  return [(a * c + b * d) / den, (b * c - a * d) / den];
};

const complex1_pow = ([a, b], [c, d]) => {
  let r = Math.sqrt(a ** 2 + b ** 2);
  let theta = Math.atan2(b, a);
  let x = r ** c * Math.exp(-d * theta);
  let y = c * theta + d * Math.log(r);
  return [x * Math.cos(y), x * Math.sin(y)];
};

function newtonsMethod(f, fp, x0, steps) {
  let xn = x0;
  for (let i = 0; i < steps; i++) {
    xn = complex1_sub(xn, complex1_div(f(xn), fp(xn)));
  }
  return xn;
}

class Newton {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.colors = [255, 255, 255];
  }

  render() {
    let f = (x) => complex1_add(complex1_pow(x, [3, 0]), [3, 0]);
    let fp = (x) => complex1_mul([3, 0], complex1_pow(x, [1 , 0]));

    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        let pos = [
          (x - this.canvas.width / 2) / this.canvas.height,
          (y - this.canvas.height / 2) / this.canvas.height
        ];

        let convergingRoot = newtonsMethod(f, fp, pos, 20);

        if (complex1_sqdist(convergingRoot, [0.5, 0.866]) <= 0.1) {
          this.ctx.fillStyle = `rgb(${this.colors[0]}, 0, 0)`;
        } else if (complex1_sqdist(convergingRoot, [0.5, -0.866]) <= 0.1) {
          this.ctx.fillStyle = `rgb(0, ${this.colors[1]}, 0)`;
        } else if (complex1_sqdist(convergingRoot, [-1, 0]) <= 0.1) {
          this.ctx.fillStyle = `rgb(0, 0, ${this.colors[2]})`;
        } else {
          this.ctx.fillStyle = `rgb(255, 255, 255)`;
        }

        // Draw the pixel
        this.ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  prepare() {
    const container = document.createElement('div');
    container.classList.add('inputContainer');
    let rgb = 'rgb';
    for (let i = 0; i < 3; i++) {
      const input = document.createElement('input');
      const label = document.createElement('label');

      label.textContent = `${rgb[i]}: `;
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
        if (input.value && +input.value >= 0) {
          this.colors[idx] = +input.value;
        } else {
          this.colors[idx] = 255;
        }
      });
    });

    container.appendChild(submitBtn);

    return container;
  }
}
 */

function Complex1(r, i) {
  this.r = r;
  this.i = i;
}
Complex1.prototype.add = function (other) {
  return new Complex1(this.r + other.r, this.i + other.i);
};
Complex1.prototype.sub = function (other) {
  return new Complex1(this.r - other.r, this.i - other.i);
};
Complex1.prototype.mul = function (other) {
  return new Complex1(
    this.r * other.r - this.i * other.i,
    this.i * other.r + this.r * other.i
  );
};
Complex1.prototype.div = function (other) {
  let denominator = other.r * other.r + other.i * other.i;
  return new Complex1(
    (this.r * other.r + this.i * other.i) / denominator,
    (this.i * other.r - this.r * other.i) / denominator
  );
};

function setFillStyle(ctx, r, g, b, a) {
  ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

class Newton {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.colors = [21, 81, 133];

    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  render() {
    let one = new Complex1(1, 0);
    let three = new Complex1(3, 0);
    let f = function (z) {
      return z.mul(z).mul(z).sub(one);
    };
    let fPrime = function (z) {
      return three.mul(z).mul(z);
    };
    let N = function (z) {
      return z.sub(f(z).div(fPrime(z)));
    };

    let bottom = Math.floor(this.canvas.height / 2);
    let top = -bottom;
    let right = Math.floor(this.canvas.width / 2);
    let left = -right;

    setFillStyle(this.ctx, 255, 255, 255, 1);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let x = left - 10; x < right + 10; x++) {
      for (let y = top - 10; y < bottom + 10; y++) {
        let yo = new Complex1(x / 500, y / 500);
        let ayy = N(yo);
        let ayy2 = N(ayy);
        let n = 0;
        while (Math.abs(ayy2.r - ayy.r) > 0.000001) {
          ayy = ayy2;
          ayy2 = N(ayy2);
          n++;
        }
        if (Math.abs(ayy.r - 1) < 0.001) {
          setFillStyle(
            this.ctx,
            this.colors[0],
            this.colors[1],
            this.colors[2],
            n / 20
          );
        } else if (Math.abs(ayy.r + 0.5) < 0.001) {
          setFillStyle(this.ctx, 0, 0, 0, n / 20);
        } else {
          setFillStyle(this.ctx, 255, 255, 255, 1);
        }
        this.ctx.fillRect(x - left, y - top, 1, 1);
      }
    }
  }

  prepare() {
    const container = document.createElement('div');
    container.classList.add('inputContainer');
    let rgb = 'rgb';
    for (let i = 0; i < 3; i++) {
      const input = document.createElement('input');
      const label = document.createElement('label');

      label.textContent = `${rgb[i]}: `;
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
        if (input.value && +input.value >= 0) {
          this.colors[idx] = +input.value % 255;
        } else {
          this.colors[idx] = 255;
        }
      });
    });

    container.appendChild(submitBtn);

    return container;
  }
}
