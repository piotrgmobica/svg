/**
 * Class DrawAline accepts {} as options
 * @param {String} fillColor  it's gonna fill a SVG element, by default is set to #fff
 * @param {String} strokeColor  it's gonna stroke of SVG element, by default is set to #000
 * @param {Number} degree  it's gonna create line depends of this degree
 */

class DrawALine {
  constructor(options = { drawOneLine: false, isMouseMove: true, fillColor: '#fff', strokeColor: '#000', degree: 22.5 }) {
    this.options = options;
    this.lastPoint = undefined;
    this.line = undefined;
    this.polyline = undefined;

    this.state = {};

    this.init();
  }

  get svg() {
    return document.querySelector('#svg');
  }

  init() {
    this.polyline = this.createSVGElement('polyline');

    this.createLineByClick();
  }

  createSVGElement(element) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', element);
    el.setAttribute('fill', this.options.fillColor);
    el.setAttribute('stroke', this.options.strokeColor);
    el.setAttribute('stroke-width', 1);

    this.svg.appendChild(el);

    return el;
  }

  createAngle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;

    return theta;
  }

  createLineByClick() {
    const { left, top, width, height } = document.body.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    this.line;

    this.svg.addEventListener('click', (e) => {
      const { clientX, clientY } = e;

      const angle = this.createAngle(centerX, centerY, clientX, clientY);
      this.line = this.createSVGElement('line');
      let x2, y2;

      const a = centerX - clientX;
      const b = centerY - clientY;

      if (Math.round(angle / this.options.degree) * this.options.degree === 0) {
        x2 = centerX + Math.cos(0) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        y2 = centerY + Math.sin(0) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        this.line.setAttribute('x2', Math.round(x2));
        this.line.setAttribute('y2', Math.round(y2));
      } else {
        x2 =
          centerX +
          Math.cos((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        y2 =
          centerY +
          Math.sin((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        this.line.setAttribute('x2', Math.round(x2));
        this.line.setAttribute('y2', Math.round(y2));
      }

      this.line.setAttribute('x1', centerX);
      this.line.setAttribute('y1', centerY);
    });

    this.svg.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      if (this.line === undefined) return;

      const angle = this.createAngle(centerX, centerY, clientX, clientY);

      const a = centerX - clientX;
      const b = centerY - clientY;

      const e1 =
        centerX +
        Math.cos((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      const e2 =
        centerY +
        Math.sin((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

      this.line.setAttribute('x2', e1);
      this.line.setAttribute('y2', e2);
    });
  }
}
