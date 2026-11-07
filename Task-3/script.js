const temperatureInput = document.getElementById("temperature");
const convertButton = document.getElementById("convert-button");
const errorMessage = document.getElementById("error-message");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

const unitButtons = document.querySelectorAll(".unit-button");

let selectedUnit = "celsius";

unitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        unitButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedUnit = button.dataset.unit;

        errorMessage.textContent = "";
    });
});

function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = "";
}

function formatTemperature(value) {
    return Number(value).toFixed(2);
}

function convertTemperature() {
    const inputValue = temperatureInput.value.trim();

    if (inputValue === "") {
        showError("Please enter a temperature value.");
        return;
    }

    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid number.");
        return;
    }

    let celsius;

    if (selectedUnit === "celsius") {
        celsius = temperature;
    }

    if (selectedUnit === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    }

    if (selectedUnit === "kelvin") {
        celsius = temperature - 273.15;
    }

    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero (−273.15°C).");
        return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = formatTemperature(celsius);
    fahrenheitResult.textContent = formatTemperature(fahrenheit);
    kelvinResult.textContent = formatTemperature(kelvin);

    clearError();
}

convertButton.addEventListener("click", convertTemperature);

temperatureInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        convertTemperature();
    }
});