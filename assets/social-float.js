
class SocialFloat {
  constructor(element) {
    this.element = element
    this.rem = parseInt(getComputedStyle(this.element).fontSize)
    this.scrollEvent = this.scrollEvent.bind(this)
    window.addEventListener('scroll', this.scrollEvent)
    this.scrollEvent()
  }
  static setup() {
    return new SocialFloat(document.getElementById('social-float'))
  }

  scrollEvent() {
    this.element.style.bottom = `${4 * this.rem - window.scrollY / 10}px`
    this.element.style.opacity = Math.max(0, 1 - window.scrollY / 250)
  }
}