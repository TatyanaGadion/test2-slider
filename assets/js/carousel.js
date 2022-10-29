class Carousel {
  constructor(params) {
    const setting = this._initConfig(params);  

    this.container = document.querySelector(setting.containerID);
    this.slides = this.container.querySelectorAll(setting.slideID);  
    this.interval = setting.interval;
    this.isPlaying = setting.isPlaying;
  }

  _initConfig(op) {
    const dp = {containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true};

    return {...dp, ...op};
  }   

  _initProps() { 
    this.currentSlide = 0;     
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';     
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control-pause" id="pause">
                      ${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}
                   </span>`;
    const PREV = `<span class="control control-prev" id="prev">${this.FA_PREV}</span>`;
    const NEXT = `<span class="control control-next" id="next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.container.append(indicators);
    
    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.indContainer.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this._prev.bind(this));
    this.nextBtn.addEventListener('click', this._next.bind(this));
    this.indContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _pause() {
    this.isPlaying = false;
    clearInterval(this.timerID);
    this.pauseBtn.innerHTML = this.FA_PLAY;
  }

  _play() {
    this.isPlaying = true;    
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this._tick();
  }

  _prev() {
    this._gotoPrev();
    this._pause();
  }

  _next() {
    this._gotoNext();
    this._pause();
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.dataset.slideTo;      

      if (isNaN(dataSlide)) return;
      this._pause();
      this._gotoNth(dataSlide);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this._prev();
    if (e.code === this.CODE_RIGHT_ARROW) this._next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  pausePlay() {
    if (this.isPlaying) {
      this._pause();
    } else {
      this._play();
    }
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;


