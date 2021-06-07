/**
 * Class DrawAline accepts {} as options
 * @param {Boolean} drawOneLine  it's gonna create one line or multiple depends on the set, by default is set to true
 * @param {Boolean} isMouseMove  it's gonna create a line with mousemove event listener, by default is set to true
 * @param {String} fillColor  it's gonna fill a SVG element, by default is set to #fff
 * @param {String} strokeColor  it's gonna stroke of SVG element, by default is set to #000
 */

class DrawALine {
  constructor(options = { drawOneLine: true, isMouseMove: true, fillColor: '#fff', strokeColor: '#000' }) {
    this.options = options;
    this.lastPoint = undefined;
    this.line = undefined;
    this.polyline = undefined;

    this.init();
  }

  get svg() {
    return document.querySelector('#svg');
  }

  init() {
    this.polyline = this.createSVGElement('polyline');

    this.createLineByClick();

    if (this.options.isMouseMove) {
      this.line = this.createSVGElement('line');
      this.createLinesWithMouseMove();
    }
  }

  createSVGElement(element) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', element);
    el.setAttribute('fill', this.options.fillColor);
    el.setAttribute('stroke', this.options.strokeColor);
    el.setAttribute('stroke-width', 1);

    this.svg.appendChild(el);

    return el;
  }

  createLineByClick() {
    const { isMouseMove, drawOneLine } = this.options;
    const num = !isMouseMove && drawOneLine ? 3 : 2;

    this.svg.addEventListener('click', ({ clientX, clientY }) => {
      let points = this.polyline.getAttribute('points') || '';
      const newPoint = `${clientX},${clientY} `;

      points += newPoint;

      if (points.split(' ').filter(Boolean).length >= num && drawOneLine) {
        points = '';
        points += newPoint;
      }

      this.polyline.setAttribute('points', points);
      this.lastPoint = [clientX, clientY];
    });
  }

  createLinesWithMouseMove() {
    this.svg.addEventListener('mousemove', ({ clientX, clientY }) => {
      if (this.lastPoint === undefined) return;

      this.line.setAttribute('x1', this.lastPoint[0]);
      this.line.setAttribute('y1', this.lastPoint[1]);
      this.line.setAttribute('x2', clientX);
      this.line.setAttribute('y2', clientY);
    });
  }
}
