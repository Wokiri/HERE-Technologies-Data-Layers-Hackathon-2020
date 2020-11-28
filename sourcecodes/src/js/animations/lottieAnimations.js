import './lottiePlayer'
const animationData = require('./hereAnimPath.json')

const hereAnimDiv = document.querySelector("#hereAnimDiv")
const hereAnimParams = {
    container: hereAnimDiv,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData
}
lottie.loadAnimation(hereAnimParams)