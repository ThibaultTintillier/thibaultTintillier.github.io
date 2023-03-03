const app = {
    init: () => {
        app.drawBoard();
        app.listenKeyboardEvents();
    },

    // Propriétés liés au joueur
    player: {
    x: 0,
    y: 0,
    direction: "right"
    },

    // Propriété liée à la victoire du joueur
    playerHasWon: false,

    // Propriétés lié à la cellule à atteindre
    targetCell: {
    x: 5,
    y: 3
    },

    /**
     * Création du cadrillage du jeu
     */
    drawBoard: () => {
        const boardElement = document.querySelector(".board");

        // Ajout des lignes (rwo)
        for (let rowIndex = 0; rowIndex < 4 ; rowIndex++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");

            // Ajout des cellules dans chaque div "row"
            for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");

                rowElement.appendChild(cellElement);

                // Recherche de la position du joueur (player)
                if (rowIndex === app.player.y && cellIndex === app.player.x) {
                    const playerElement = document.createElement("div");
                    playerElement.classList.add("player");

                    // On fait pointer la flèche dans la bonne direction
                    switch (app.player.direction) {
                        case "right":
                            playerElement.classList.add("right")
                            break;
                    
                        case "up":
                            playerElement.classList.add("up")
                            break;

                        case "left":
                            playerElement.classList.add("left")
                            break;

                        case "down":
                            playerElement.classList.add("down")
                            break;
                    }

                    cellElement.appendChild(playerElement);
                };

                // Recherche de la position d'arrivée (targetCell)
                if (rowIndex === app.targetCell.y && cellIndex === app.targetCell.x) {
                    cellElement.classList.add("target");
                };
            }

            // Ajout des lignes dans la div "board"
            boardElement.appendChild(rowElement);
        }
    },

    /**
     * Reset du cadrillage
     */
    clearBoard: () => {
        const boardElement = document.querySelector(".board");
        boardElement.innerHTML = "";
    },

    /**
     * Redessine le cadrillage après avoir supprimé l'ancien puis vérifie si la partie est terminée
     */
    redrawBoard: () => {
        app.clearBoard();
        app.drawBoard();
        app.isPlayerWon();
    },

    /**
     * Permet de tourner le personnage à gauche
     */
    turnLeft: () => {
        if (app.playerHasWon === true) {
            return
        };

        const playerElement = document.querySelector(".player");

        switch (app.player.direction) {
            case "right":
                app.player.direction = "up";
                playerElement.classList.remove("right");
                playerElement.classList.add("up");
                break;
        
            case "up":
                app.player.direction = "left";
                playerElement.classList.remove("up");
                playerElement.classList.add("left");
                break;

            case "left":
                app.player.direction = "down";
                playerElement.classList.remove("left");
                playerElement.classList.add("down");
                break;

            case "down":
                app.player.direction = "right";
                playerElement.classList.remove("down");
                playerElement.classList.add("right");
                break;
        };
    },

    /**
     * Permet de tourner le personnage à gauche
     */
    turnRight: () => {
        if (app.playerHasWon === true) {
            return
        };

        const playerElement = document.querySelector(".player");

        switch (app.player.direction) {
            case "right":
                app.player.direction = "down";
                playerElement.classList.remove("right");
                playerElement.classList.add("down");
                break;
        
            case "down":
                app.player.direction = "left";
                playerElement.classList.remove("down");
                playerElement.classList.add("left");
                break;

            case "left":
                app.player.direction = "up";
                playerElement.classList.remove("left");
                playerElement.classList.add("up");
                break;

            case "up":
                app.player.direction = "right";
                playerElement.classList.remove("up");
                playerElement.classList.add("right");
                break;
        };
    },

    /**
     * Permet de faire avancer le personnage
     */

    moveForward: () => {
        if (app.playerHasWon === true) {
            return
        };

        switch (app.player.direction) {
            case "right":
                if (app.player.x < 5) {
                    app.player.x++;
                }
                break;

            case "down":
                if (app.player.y < 3) {
                    app.player.y++;
                }
                break;

            case "left":
                if (app.player.x > 0) {
                    app.player.x--;
                }
                break;

            case "up":
                if (app.player.y > 0) {
                    app.player.y--;
                }
                break;
        };

        app.redrawBoard();
    },

    /**
     * Permet d'écouter les touches pour faire avancer le personnage
     * @param {*} event 
     */
    listenKeyboardEvents: (event) => {
        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 38:
                    app.moveForward();
                    break;
            
                case 37:
                    app.turnLeft();
                    break;

                case 39:
                    app.turnRight();
                    break;
            };
        });
    },

    /**
     * Vérifie si le joueur a gagné.
     */
    isPlayerWon: () => {
        if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
            // Modification de la propriété
            app.playerHasWon = true;

            // Affichage du message de victoire
            const messageElement = document.querySelector(".message");
            messageElement.textContent = "Vous avez gagné !"
        }
    }
}

app.init();
