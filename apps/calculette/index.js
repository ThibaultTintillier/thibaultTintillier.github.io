const app = {

    keyPressedArray: [],
    operatorClick : false,

    init() {
        // On ajout un listener sur le bouton reset
        const resetElement = document.getElementById("reset");
        resetElement.addEventListener("click", app.resetResult);

        // On ajoute un listener sur l'ensemble des touches (keys)
        const keysElement = document.querySelectorAll(".key");
        keysElement.forEach(keyElement => {
            keyElement.addEventListener("click", app.pressedKey);
        })

        // On ajoute un listener sur le bouton égal (keys)
        const equalElement = document.getElementById("key=");
        equalElement.addEventListener("click", app.pressEqual);
    },

    /**
     * Réinitialise la calculette
     */
    resetResult() {
        const resultElement = document.getElementById("result");
        resultElement.textContent = 0;

        app.keyPressedArray = [];
        app.operatorClick = false;
    },

    /**
     * Action quand on appuie sur une des touches de la calculette
     */
    pressedKey() {
        const resultElement = document.getElementById("result");

        // Si le dernier élément est un opérateur et que l'on ajout de nouveau un opérateur, celui-ci le remplace
        if (this.classList.contains("operator") && (app.keyPressedArray[app.keyPressedArray.length - 1] === "+" || app.keyPressedArray[app.keyPressedArray.length - 1] === "-" || app.keyPressedArray[app.keyPressedArray.length - 1] === "*" || app.keyPressedArray[app.keyPressedArray.length - 1] === "/")) {
            app.keyPressedArray.pop();
            app.keyPressedArray.push(this.textContent);
            resultElement.textContent = app.keyPressedArray.join("");
            return;
        }

        // On calcule le résultat ou on ajoute la valeur de la touche appuyée
        if (this.classList.contains("operator") && app.operatorClick === true) {
            const result = app.calculateResult();

            if (isNaN(result)) {
                resultElement.textContent = "Erreur"
                return
            }

            app.keyPressedArray = [];
            app.keyPressedArray.push(result, this.textContent);
        } else if (this.classList.contains("operator")) {
            app.operatorClick = true;
            app.keyPressedArray.push(this.textContent);
        } else {
            app.keyPressedArray.push(this.textContent);
        };

        // On fait apparaître les éléments du tableau des touches appuyés dans la partie "résultat" de la calculette
        resultElement.textContent = app.keyPressedArray.join("");
    },

    /**
     * Action quand on appuie que la touche "égale" de la calculette
     */
    pressEqual() {
        const resultElement = document.getElementById("result");
        
        const result = app.calculateResult();

        if (isNaN(result)) {
            resultElement.textContent = "Erreur"
            return
        }

        resultElement.textContent = result;

        app.keyPressedArray = [result];
        app.operatorClick = false;
    },

    /**
     * Calcule le résutat des deux nombres insérés dans la calculette
     * @returns Résultat du calcul (addition, soustraction, multiplication ou division en fonction)
     */
    calculateResult() {
        const sumIndex = app.keyPressedArray.indexOf("+");
        const substractIndex = app.keyPressedArray.indexOf("-");
        const multiplyIndex = app.keyPressedArray.indexOf("*");
        const divideIndex = app.keyPressedArray.indexOf("/");

        const index = Math.max(sumIndex, substractIndex, multiplyIndex, divideIndex)

        const firstNumber = app.keyPressedArray.slice(0, index).join("");
        const secondNumber = app.keyPressedArray.slice(index+1).join("");

        if (sumIndex > 0 ) {
            return Number(firstNumber) + Number(secondNumber);
        }

        if (substractIndex > 0 ) {
            return Number(firstNumber) - Number(secondNumber);
        }

        if (multiplyIndex > 0 ) {
            return Number(firstNumber) * Number(secondNumber);
        }

        if (divideIndex > 0 ) {
            return Number(firstNumber) / Number(secondNumber);
        }
    }
}

document.addEventListener("DOMContentLoaded", app.init());
