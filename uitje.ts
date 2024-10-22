interface Uitje {
    title: string;
    deelnemers: string[];
}

const uitjeForm: HTMLFormElement = document.getElementById("uitjeForm") as HTMLFormElement;
const resetButton: HTMLButtonElement = document.getElementById("resetButton") as HTMLButtonElement;

uitjeForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const title: string = (document.getElementById("title") as HTMLInputElement).value;

    if (title) {
        const newTrip: Uitje = {
            title,
            deelnemers: [],
        };

        localStorage.setItem("currentUitje", JSON.stringify(newTrip));

        window.location.href = "deelnemers.html";
    }
});

resetButton.addEventListener("click", function () {
    localStorage.removeItem("currentUitje");
    alert("The current trip has been cleared.");
});
