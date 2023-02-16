const app = {
    // fonction d'initialisation, lancée au chargement de la page
    init() {
        app.addListenerToActions();
    },

    addListenerToActions () {
        // Ajout d'un listener sur le menu Burger
        const burgerElement = document.querySelector(".burger");
        burgerElement.addEventListener("click", app.displayMenu)
    },

    displayMenu () {
        // Affichage du menu        
        const navElement = document.getElementById("nav");
        const navListElement = document.getElementById("nav__list");


        if (navElement.classList.contains("activeMenu")) {
            navElement.setAttribute("style", "height: 0");
            navListElement.setAttribute("style", "top: -120px");
        } else {
            navElement.setAttribute("style", "height: 40%");
            navListElement.setAttribute("style", "top: 50%");
        }

        navElement.classList.toggle("activeMenu")

        // Transformation du menu burger en croix (et inversement)
        const firstBarElement = document.querySelector(".burger__line:nth-child(1)")
        const secondBarElement = document.querySelector(".burger__line:nth-child(2)")
        const thirdBarElement = document.querySelector(".burger__line:nth-child(3)")

        firstBarElement.classList.toggle("crossModeBarOne");
        secondBarElement.classList.toggle("crossModeBarTwo");
        thirdBarElement.classList.toggle("crossModeBarThree");
    }
}

document.addEventListener('DOMContentLoaded', app.init);
