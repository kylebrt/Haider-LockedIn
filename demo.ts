// Activeer de voorbeelden
voorbeeld1();
voorbeeld2();
voorbeeld3();

// Voorbeeld #1
function voorbeeld1(): void {
    const knopElement: HTMLButtonElement = document.querySelector("#voorbeeld1-knop")!;
    const resultaatElement: HTMLDivElement = document.querySelector("#voorbeeld1-resultaat")!;

    let aantalKliks: number = 0;

    knopElement.addEventListener("click", () => {
        aantalKliks++;

        resultaatElement.innerHTML = `Je hebt ${aantalKliks} geklikt!`;
    });
}

// Voorbeeld #2
function voorbeeld2(): void {
    const naamElement: HTMLInputElement = document.querySelector("#voorbeeld2-naam")!;
    const knopElement: HTMLButtonElement = document.querySelector("#voorbeeld2-knop")!;
    const resultaatElement: HTMLDivElement = document.querySelector("#voorbeeld2-resultaat")!;

    knopElement.addEventListener("click", () => {
        if (!naamElement.value) {
            resultaatElement.classList.add("error");
            resultaatElement.innerHTML = "Dat is geen geldige naam!";
        }
        else {
            resultaatElement.classList.remove("error");
            resultaatElement.innerHTML = `Hallo, ${naamElement.value}!`;
        }
    });
}

// Voorbeeld #3
function voorbeeld3(): void {
    const knopElement: HTMLButtonElement = document.querySelector("#voorbeeld3-knop")!;
    const resultaatElement: HTMLDivElement = document.querySelector("#voorbeeld3-resultaat")!;

    knopElement.addEventListener("click", () => {
        // Verwijder de bestaande inhoud van de pagina
        resultaatElement.replaceChildren();

        // Maak een image element en stel de Dokkie-afbeelding uit de ./wwwroot/public in
        const imageElement: HTMLImageElement = document.createElement("img");
        imageElement.width = 100;
        imageElement.height = 100;
        imageElement.src = "/dokkie.png";

        // Voeg het element aan de pagina toe
        resultaatElement.appendChild(imageElement);
    });
}
