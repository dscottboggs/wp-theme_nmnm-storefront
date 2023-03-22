function window_scrollY_in_vh() {
    if (window.scrollY === 0)
        // can't divide by 0
        return 0
    return window.scrollY / (window.innerHeight / 100)
}

const DEFAULT_SCROLL_INTERVAL = 1
class FancyScrolled {
    constructor(
        id, landscapeInAt, landscapeOutAt, portraitInAt, portraitOutAt,
        landscapeFadeInInterval = DEFAULT_SCROLL_INTERVAL,
        portraitFadeInInterval = DEFAULT_SCROLL_INTERVAL,
        landscapeFadeOutInterval = DEFAULT_SCROLL_INTERVAL,
        portraitFadeOutInterval = DEFAULT_SCROLL_INTERVAL
    ) {
        this.element = document.getElementById(id)
        this.landscapeInAt = landscapeInAt
        this.landscapeOutAt = landscapeOutAt
        this.portraitInAt = portraitInAt
        this.portraitOutAt = portraitOutAt
        this.landscapeFadeInInterval = landscapeFadeInInterval
        this.landscapeFadeOutInterval = landscapeFadeOutInterval
        this.portraitFadeInInterval = portraitFadeInInterval
        this.portraitFadeOutInterval = portraitFadeOutInterval
        this.landscapeFullyInAt = landscapeInAt + landscapeFadeInInterval * 100
        this.landscapeStartFadingOutAt = landscapeOutAt - landscapeFadeOutInterval * 100
        this.portraitFullyInAt = portraitInAt + landscapeFadeInInterval * 100
        this.portraitStartFadingOutAt = portraitOutAt - landscapeFadeOutInterval * 100
        this.opacity = this.opacity.bind(this)
        this.setOpacity = this.setOpacity.bind(this)
        this.handleScrollEvent = this.handleScrollEvent.bind(this)
        this.setHook = this.setHook.bind(this)
        this.hook = null
    }

    opacity(yPos) {
        const $yPos = window_scrollY_in_vh(yPos)
        let orientation = screen?.orientation?.type
        if (orientation?.startsWith('landscape') || !orientation) {
            if ($yPos > this.landscapeInAt && $yPos <= this.landscapeFullyInAt) {
                return Math.floor(Math.max(0, Math.min(($yPos - this.landscapeInAt) / this.landscapeFadeInInterval, 100)))
            } else if ($yPos > this.landscapeFullyInAt && $yPos < this.landscapeStartFadingOutAt) {
                return 100
            } else if ($yPos > this.landscapeStartFadingOutAt && $yPos <= this.landscapeOutAt) {
                return Math.floor(Math.max(0, Math.min(100, (this.landscapeOutAt - $yPos) / this.landscapeFadeOutInterval)))
            }
        } else {
            if ($yPos > this.portraitInAt && $yPos <= this.portraitFullyInAt) {
                return Math.floor(Math.max(0, Math.min(($yPos - this.portraitInAt) / this.portraitFadeInInterval, 100)))
            } else if ($yPos > this.portraitFullyInAt && $yPos < this.portraitStartFadingOutAt) {
                return 100
            } else if ($yPos > this.portraitStartFadingOutAt && $yPos <= this.portraitOutAt) {
                return Math.floor(Math.max(0, Math.min(100, (this.portraitOutAt - $yPos) / this.portraitFadeOutInterval)))
            }
        }
        return 0
    }

    setOpacity(yPos) {
        this.element.style.opacity = `${this.opacity(yPos)}%`
    }

    handleScrollEvent() {
        this.setOpacity(window.scrollY)
        this.hook?.call(this, window.scrollY)
    }
    setHook(hook) {
        this.hook = hook
    }
}

FancyScrolled.manageClass = function (className) {
    const $elements = document.getElementsByClassName(className)
    const elements = Array.prototype.map.call(
        $elements,
        element => new FancyScrolled(
            element.id,
            Number(element.dataset.landscapeFadeInAt ?? element.dataset.fadeInAt),
            Number(element.dataset.landscapeFadeOutAt ?? element.dataset.fadeOutAt),
            Number(element.dataset.portraitFadeInAt ?? element.dataset.fadeInAt),
            Number(element.dataset.portraitFadeOutAt ?? element.dataset.fadeOutAt),
            Number(element.dataset.landscapeIntervalIn ?? element.dataset.intervalIn ?? element.dataset.interval ?? DEFAULT_SCROLL_INTERVAL),
            Number(element.dataset.landscapeIntervalOut ?? element.dataset.intervalOut ?? element.dataset.interval ?? DEFAULT_SCROLL_INTERVAL),
            Number(element.dataset.portraitIntervalIn ?? element.dataset.intervalIn ?? element.dataset.interval ?? DEFAULT_SCROLL_INTERVAL),
            Number(element.dataset.portraitIntervalOut ?? element.dataset.intervalOut ?? element.dataset.interval ?? DEFAULT_SCROLL_INTERVAL)
        )
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
