// FUNCTION TO TOGGLE LIGHT / DARK MODE
const chk = document.getElementById('checkIt');
chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

// REFERENCES DOM ELEMENTS
const seedColor = document.querySelector("#seed-color");
const seedScheme = document.querySelector("#seed-scheme");
const paletteContainer = document.querySelector(".palette-container");
const hexContainer = document.querySelector(".hex-container");
const btnScheme = document.querySelector(".btn-scheme");

// EVENT LISTENER FOR THE "GET COLOR" SCHEME
btnScheme.addEventListener("click", generateColorScheme);

// GENERATE COLOR SCHEME
function generateColorScheme() {
    const colorSelected = seedColor.value;
    const modeSelected = seedScheme.value;

    const encodedColor = encodeURIComponent(colorSelected);
    const encodedMode = encodeURIComponent(modeSelected);

    fetch(
        `https://www.thecolorapi.com/scheme?hex=${encodedColor}&mode=${encodedMode}&count=5`,
        { method: "GET" }
    )
        .then((res) => res.json())
        .then((data) => {
            renderColorScheme(data);
        });
}

// REFERENCES COLOR SCHEME AND RENDERS IT TO THE DOM
function renderColorScheme(data) {
    paletteContainer.innerHTML = "";
    hexContainer.innerHTML = "";

    data.colors.forEach((color) => {
        paletteContainer.innerHTML += `
      <div class="palette-div" style="background-color: ${color.hex.value};">
      <p class="copy-inner">${color.hex.value}</p>
        </div>
      `;
        // REFERENCES HEX CODE AND RENDERS IT TO THE DOM
        hexContainer.innerHTML += `
    <p class="copy">${color.hex.value}</p>
  `;
    });

    // ADD EVENT LISTENER FOR COPYING HEX CODES TO CLIPBOARD
    const btnCopy = document.querySelectorAll(".copy");
    const btnCopyInner = document.querySelectorAll(".copy-inner");

    btnCopy.forEach((btn) => {
        btn.addEventListener("click", copyHexCode);
    });

    btnCopyInner.forEach((btn) => {
        btn.addEventListener("click", copyHexCode);
    });
}

const copyHexCode = (event) => {
    const hexCode = event.target.textContent;

    navigator.clipboard.writeText(hexCode)
        .then(() => {
            alert(`Copied "${hexCode}" to the clipboard`);
        })
};