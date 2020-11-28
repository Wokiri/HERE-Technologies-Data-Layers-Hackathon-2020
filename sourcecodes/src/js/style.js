const introDivInfo = document.querySelector('#introDivInfo')
const mainNav = document.querySelector('#mainNav')
const mainNavLinks = mainNav.querySelectorAll('.mainNavLinks')

for (let num = 0; num < mainNavLinks.length; num++) {
    introDivInfo.addEventListener('mouseover', () => {
        mainNavLinks[num].style.color = `rgb(0, 68, 102)`
    })
    introDivInfo.addEventListener('mouseleave', () => {
        mainNavLinks[num].style.color = ` rgb(153, 221, 255)`
    })
}

const projectConcept = document.querySelector("#projectConcept")

const sectionsObserverOptions = {
    root: null,
    rootMargin: "50px 0px 50px 0px",
    threshold: 0.4
}

const animateSections = () => {
    const animatedSections = projectConcept.querySelectorAll(".sections")
    let observerSections = new IntersectionObserver(function(sectionsEntry) {
            sectionsEntry.forEach((entry) => {

                if (!entry.isIntersecting) {
                    entry.target.classList.remove("normal")
                    return
                }

                entry.target.classList.add("normal")
            })
        },
        sectionsObserverOptions)

    animatedSections.forEach(appear => {
        observerSections.observe(appear)
    })

}

window.addEventListener("load", () => {
    if (projectConcept) animateSections()
}, false)