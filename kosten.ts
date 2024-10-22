interface Uitje {
    title: string;
    deelnemers: string[];
}

interface Kost {
    datum: string;
    omschrijving: string;
    bedrag: number;
    deelnemer: string;
}

const kostenForm: HTMLFormElement = document.getElementById("kostenForm") as HTMLFormElement;
const uitjeTitle: HTMLElement = document.getElementById("uitjeTitle") as HTMLElement;
const deelnemerSelect: HTMLSelectElement = document.getElementById("deelnemer") as HTMLSelectElement;
const savedCostsList: HTMLUListElement = document.getElementById("savedCosts") as HTMLUListElement;

function getTripFromLocalStorage(): Uitje {
    const savedTrip = localStorage.getItem("currentUitje");
    return savedTrip ? JSON.parse(savedTrip) : null;
}

function saveCostsToLocalStorage(costs: Kost[]): void {
    localStorage.setItem("kosten", JSON.stringify(costs));
}

function getCostsFromLocalStorage(): Kost[] {
    const savedCosts = localStorage.getItem("kosten");
    return savedCosts ? JSON.parse(savedCosts) : [];
}

function displayTripAndParticipants(): void {
    const trip = getTripFromLocalStorage();

    if (trip && uitjeTitle && deelnemerSelect) {
        uitjeTitle.textContent = `Kosten voor: ${trip.title}`;
        deelnemerSelect.innerHTML = "";

        trip.deelnemers.forEach(deelnemer => {
            const option = document.createElement("option");
            option.value = deelnemer;
            option.textContent = deelnemer;
            deelnemerSelect.appendChild(option);
        });
    }
    else {
        alert("Geen uitje gevonden.");
    }
}

function displaySavedCosts(): void {
    const costs = getCostsFromLocalStorage();
    savedCostsList.innerHTML = "";

    if (costs.length > 0) {
        costs.forEach(cost => {
            const li = document.createElement("li");
            li.textContent = `${cost.datum}: ${cost.omschrijving} - €${cost.bedrag.toFixed(2)} (Betaald door: ${cost.deelnemer})`;
            savedCostsList.appendChild(li);
        });
    }
    else {
        savedCostsList.innerHTML = "<li>Geen kosten opgeslagen</li>";
    }
}

if (kostenForm) {
    kostenForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const datum = (document.getElementById("datum") as HTMLInputElement).value;
        const omschrijving = (document.getElementById("omschrijving") as HTMLInputElement).value;
        const bedrag = parseFloat((document.getElementById("bedrag") as HTMLInputElement).value);
        const deelnemer = (document.getElementById("deelnemer") as HTMLSelectElement).value;

        if (!datum || !omschrijving || bedrag <= 0 || !deelnemer) {
            alert("Vul alle velden correct in en zorg dat het bedrag positief is.");
            return;
        }

        const newCost: Kost = { datum, omschrijving, bedrag, deelnemer };

        const savedCosts = getCostsFromLocalStorage();
        savedCosts.push(newCost);

        saveCostsToLocalStorage(savedCosts);
        displaySavedCosts();
    });
}

window.onload = function () {
    displayTripAndParticipants();
    displaySavedCosts();
};
