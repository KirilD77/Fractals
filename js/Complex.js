class Complex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mod = mod;
    this.arg = arg;
    this.sm = sm;
    this.sum = sum;
    this.sub = sub;
    this.mul = mul;
    this.div = div;
    this.pow = pow;
    this.exp = exp;
    this.log = log;
    this.sin = sin;
    this.cos = cos;
    this.tg = tg;
    this.ctg = ctg;
    this.stp = stp;
    this.asin = asin;
    this.acos = acos;
    this.atg = atg;
  }
}

function mod() {
  let t = this.x * this.x + this.y * this.y;
  return Math.sqrt(t);
}

function arg() {
  if (this.x > 0 && this.y >= 0) return Math.atan(this.y / this.x);
  else if (this.x < 0) return Math.atan(this.y / this.x) + Math.PI;
  else if (this.x > 0 && this.y < 0)
    return Math.atan(this.y / this.x) + 2 * Math.PI;
  else if (this.x == 0 && this.y > 0) return Math.PI / 2;
  else if (this.x == 0 && this.y < 0) return (3 * Math.PI) / 2;
  else return 0;
}

function sum(obj) {
  let u = this.x + obj.x;
  let v = this.y + obj.y;
  return new Complex(u, v);
}

function sub(obj) {
  let u = this.x - obj.x;
  let v = this.y - obj.y;
  return new Complex(u, v);
}

function mul(obj) {
  let r1 = this.mod(),
    r2 = obj.mod();
  let p1 = this.arg(),
    p2 = obj.arg();
  let u = r1 * r2 * Math.cos(p1 + p2);
  let v = r1 * r2 * Math.sin(p1 + p2);
  return new Complex(u, v);
}

function div(obj) {
  let r1 = this.mod(),
    r2 = obj.mod();
  let p1 = this.arg(),
    p2 = obj.arg();
  let u = (r1 / r2) * Math.cos(p1 - p2);
  let v = (r1 / r2) * Math.sin(p1 - p2);
  return new Complex(u, v);
}

function pow(n) {
  let r = this.mod(),
    p = this.arg();
  let u = Math.pow(r, n) * Math.cos(n * p);
  let v = Math.pow(r, n) * Math.sin(n * p);
  return new Complex(u, v);
}

function exp() {
  with (Math) {
    let u = exp(this.x) * cos(this.y);
    let v = exp(this.x) * sin(this.y);
    return new Complex(u, v);
  }
}

function log() {
  with (Math) {
    let u = log(this.mod());
    let v = this.arg();
    return new Complex(u, v);
  }
}

function sm() {
  return new Complex(this.x, -this.y);
}

function sin() {
  let i = new Complex(0, 1);
  let t = new Complex(2, 0);
  let tm1 = i.mul(this).exp();
  let tm2 = i.sm().mul(this).exp();
  let tm3 = i.mul(t);
  return tm1.sub(tm2).div(tm3);
}

function cos() {
  let i = new Complex(0, 1);
  let t = new Complex(2, 0);
  let tm1 = i.mul(this).exp();
  let tm2 = i.sm().mul(this).exp();
  return tm1.sum(tm2).div(t);
}

function tg() {
  return this.sin().div(this.cos());
}

function ctg() {
  return this.cos().div(this.sin());
}

function stp(obj) {
  return obj.mul(this.log()).exp();
}

function asin() {
  let i = new Complex(0, 1);
  let t = new Complex(1, 0);
  let tm1 = t.sub(this.pow(2)).pow(0.5);
  let tm2 = i.mul(this).sum(tm1);
  return tm2.log().div(i);
}

function acos() {
  let i = new Complex(0, 1);
  let t = new Complex(1, 0);
  let tm1 = this.pow(2).sub(t).pow(0.5);
  let tm2 = this.sum(tm1);
  return tm2.log().div(i);
}

function atg() {
  let i = new Complex(0, 1);
  let t = new Complex(1, 0);
  let tm1 = t.sum(i.mul(this));
  let tm2 = t.sub(i.mul(this));
  return tm1.div(tm2).log().div(i.sum(i));
}
