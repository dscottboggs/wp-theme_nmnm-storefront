
function applyToAll(selector, cb) {
    document.querySelectorAll('.wch-otd-' + selector).forEach(cb)
}
function recursivelyDisplay(element) {
    element.style.display = element.dataset.showAsDisplay ?? 'auto'
    for (var child of element.children) {
        recursivelyDisplay(child)
    }
}
document.addEventListener('readystatechange', async function () {
    if (document.readyState === "interactive") {
        console.log('started')
        const result = await fetch('https://wch-otd-api.nomugsnomasters.com/today/one-random')
        if (result.ok) {
            applyToAll('error', el => el.style.display = 'none')
            const data = await result.json()
            applyToAll('title', el => el.innerText += data.title)
            applyToAll('content', el => el.innerHTML = data.content)
            applyToAll('excerpt', el => el.innerHTML = data.excerpt)
            applyToAll('story-link', el => el.href = data.url)
            if (data.media) {
                applyToAll('media-placeholder', el => {
                    const img = document.createElement('img')
                    img.src = data.media.url
                    img.alt = data.media.caption
                    el.appendChild(img)
                })
            }
            console.log('done')
        } else {
            const body = await result.text()
            applyToAll('error', errDisplay => {
                errDisplay.innerText = body
            })
            applyToAll('loaded-wrapper', el => el.style.display = 'none')
            console.log('error')
        }
    }
})