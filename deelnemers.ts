interface Uitje {
    title: string;
    deelnemers: string[];
}

const savedTripsList: HTMLUListElement = document.getElementById("savedTrips") as HTMLUListElement;
const addDeelnemerForm: HTMLElement = document.getElementById("addDeelnemerForm") as HTMLFormElement;
const newDeelnemerInput: HTMLInputElement = document.getElementById("newDeelnemer") as HTMLInputElement;

function getTripFromLocalStorage(): Uitje | null {
    const savedTrip: string = localStorage.getItem("currentUitje");
    return savedTrip ? JSON.parse(savedTrip) : null;
}

function saveTripToLocalStorage(trip: Uitje): void {
    localStorage.setItem("currentUitje", JSON.stringify(trip));
}

function displaySavedTrip(): void {
    const trip = getTripFromLocalStorage();

    savedTripsList.innerHTML = "";

    if (trip) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${trip.title}</strong> - Deelnemers: ${trip.deelnemers.join(", ")}`;
        savedTripsList.appendChild(li);
    }
    else {
        savedTripsList.innerHTML = "<li>No trip saved</li>";
    }
}

addDeelnemerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newDeelnemer = newDeelnemerInput.value.trim();

    if (newDeelnemer) {
        const currentTrip = getTripFromLocalStorage();

        if (currentTrip) {
            if (currentTrip.deelnemers.includes(newDeelnemer)) {
                alert("Participant with this name already exists.");
            }
            else {
                currentTrip.deelnemers.push(newDeelnemer);

                saveTripToLocalStorage(currentTrip);

                displaySavedTrip();
                newDeelnemerInput.value = "";
            }
        }
        else {
            alert("No current trip found to add participants.");
        }
    }
    else {
        alert("Please enter a valid participant name.");
    }
});

window.onload = function () {
    displaySavedTrip();
};
