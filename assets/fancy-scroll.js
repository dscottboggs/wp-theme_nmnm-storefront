function window_scrollY_in_vh() {
    if (window.scrollY === 0)
        // can't divide by 0
        return 0
    return window.scrollY / (window.innerHeight / 100)
}

const DEFAULT_SCROLL_INTERVAL = 1
class FancyScrolled {
    constructor(id, inAt, outAt, interval = DEFAULT_SCROLL_INTERVAL) {
        this.element = document.getElementById(id)
        this.inAt = inAt
        this.outAt = outAt
        this.interval = interval
        this.fullyInAt = inAt + interval * 100
        this.startFadingOutAt = outAt - interval * 100
        this.opacity = this.opacity.bind(this)
        this.setOpacity = this.setOpacity.bind(this)
        this.handleScrollEvent = this.handleScrollEvent.bind(this)
        this.setHook = this.setHook.bind(this)
        this.hook = null
    }

    opacity(yPos) {
        const $yPos = window_scrollY_in_vh(yPos)
        if ($yPos > this.inAt && $yPos <= this.fullyInAt) {
            return Math.floor(Math.max(0, Math.min(($yPos - this.inAt) / this.interval, 100)))
        } else if ($yPos > this.fullyInAt && $yPos < this.startFadingOutAt) {
            return 100
        } else if ($yPos > this.startFadingOutAt && $yPos <= this.outAt) {
            return Math.floor(Math.max(0, Math.min(100, (this.outAt - $yPos) / this.interval)))
        }
        return 0
    }

    setOpacity(yPos) {
        this.element.style.opacity = `${this.opacity(yPos)}%`
    }

    handleScrollEvent() {
        this.setOpacity(window.scrollY)
        if (this.hook) this.hook(window.scrollY)
    }
    setHook(hook) {
        this.hook = hook.bind(this)
    }
}

FancyScrolled.manageClass = function (className) {
    const $elements = document.getElementsByClassName(className)
    const elements = Array.prototype.map.call(
        $elements,
        element => new FancyScrolled(element.id, Number(element.dataset.fadeInAt), Number(element.dataset.fadeOutAt), Number(element.dataset.interval ?? DEFAULT_SCROLL_INTERVAL))
    )
    window.addEventListener('scroll', event => {
        for (var element of elements)
            element.handleScrollEvent(event)
    })
    // set initial position
    for (var element of elements)
        element.handleScrollEvent()

    return elements
}
