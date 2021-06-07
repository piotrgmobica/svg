/**
 * Class DrawAline accepts {} as options
 * @param {Boolean} drawOneLine  it's gonna create one line or multiple depends on the set, by default is set to true
 * @param {Boolean} isMouseMove  it's gonna create a line with mousemove event listener, by default is set to true
 * @param {String} fillColor  it's gonna fill a SVG element, by default is set to #fff
 * @param {String} strokeColor  it's gonna stroke of SVG element, by default is set to #000
 */

class DrawALine {
  constructor(
    options = { drawOneLine: false, isMouseMove: true, fillColor: '#fff', strokeColor: '#000', degree: 22.5 }
  ) {
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

    // if (this.options.isMouseMove) {
    //   this.line = this.createSVGElement('line');
    //   this.createLinesWithMouseMove();
    // }

    //this.jumpToAnotherAngle();

    //this.createLinesOnStart();
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

    this.svg.addEventListener('click', (e) => {
      let x2, y2;

      const { clientX, clientY } = e;

      const angle = this.createAngle(centerX, centerY, clientX, clientY);
      const createtNewLine = this.createSVGElement('line');

      if (Math.round(angle / this.options.degree) * this.options.degree === 0) {
        x2 = centerX + Math.cos(0) * 350;
        y2 = centerY + Math.sin(0) * 350;

        createtNewLine.setAttribute('x2', Math.round(x2));
        createtNewLine.setAttribute('y2', Math.round(y2));
      } else {
        x2 = centerX + Math.cos((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * 350;
        y2 = centerY + Math.sin((Math.PI * Math.round(angle / this.options.degree) * this.options.degree) / 180) * 350;

        createtNewLine.setAttribute('x2', Math.round(x2));
        createtNewLine.setAttribute('y2', Math.round(y2));
      }

      createtNewLine.setAttribute('x1', centerX);
      createtNewLine.setAttribute('y1', centerY);
    });
  }

  // createLinesWithMouseMove() {
  //   this.svg.addEventListener('mousemove', (e) => {
  //     if (this.lastPoint === undefined) return;

  //     this.line.setAttribute('x1', e.clientX);
  //     this.line.setAttribute('y1', e.clientY);
  //     this.line.setAttribute('Math.round(x2', e.clientX);
  //     this.line.setAttribute('y2', e.clientY);
  //   });
  // }
}
