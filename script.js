document.addEventListener("DOMContentLoaded", () => {
    const noButton = document.querySelector(".no");
    const yesButton = document.querySelector(".yes");
    const message = document.getElementById("message");
    const body = document.body;
    const title = document.querySelector(".title");
    const valentineText = document.querySelector(".center");
    const helloKittyImg = document.querySelector(".hello_kitty_img");
    const youCantSayNoText = document.getElementById("message");
    const audio = document.getElementById("background-music");

    let skullOverlay = null;

    // Function to try playing the audio
    function tryPlayAudio() {
        audio.play().catch(error => {
            console.log("Autoplay blocked:", error);
        });
    }

    // Attempt autoplay after page load
    tryPlayAudio();

    // If blocked, play on first user interaction
    document.addEventListener("click", tryPlayAudio, { once: true });

    noButton.addEventListener("click", () => {
        noButton.style.display = "none"; // Hide "No" button
        yesButton.style.margin = "0 auto"; // Instantly center "Yes" button
        yesButton.style.display = "block"; // Ensure it's visible

        hideElements(); // Hide all text and Hello Kitty image
        fadeInText(youCantSayNoText); // Slowly reveal the "You can't say no" text
        fadeBackgroundToBlack(); // Gradually fade background to black
        fadeInSkullBackground(); // Smoothly transition only the background
        fadeOutAudio(); // Fade out audio when "No" is clicked
    });

    yesButton.addEventListener("click", () => {
            window.location.href = "yes.html";
       

        if (audio.paused) {
            window.location.href = "yes.html";
        }
    });

    function hideElements() {
        title.style.display = "none"; // Hide the title
        valentineText.style.display = "none"; // Hide the Valentine text
        helloKittyImg.style.display = "none"; // Hide the Hello Kitty image
    }

    function fadeInText(element) {
        let opacity = 0;
        element.style.display = "block";
        let fadeIn = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(fadeIn);
            } else {
                opacity += 0.04; // Smooth fade-in for text
                element.style.opacity = opacity;
            }
        }, 50);
    }

    function fadeBackgroundToBlack() {
        let step = 0;
        let maxSteps = 50; // Controls fade speed
        let startColor = [255, 192, 203]; // RGB for pink (#ffc0cb)
        let endColor = [0, 0, 0]; // RGB for black

        let fadeInterval = setInterval(() => {
            if (step >= maxSteps) {
                clearInterval(fadeInterval);
                body.style.backgroundColor = "black"; // Ensure fully black
            } else {
                step++;
                let newColor = startColor.map((start, i) => 
                    Math.round(start + (endColor[i] - start) * (step / maxSteps))
                );
                body.style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
            }
        }, 50);
    }

    function fadeInSkullBackground() {
        skullOverlay = document.createElement("div");
        skullOverlay.style.position = "fixed";
        skullOverlay.style.top = "0";
        skullOverlay.style.left = "0";
        skullOverlay.style.width = "100%";
        skullOverlay.style.height = "100%";
        skullOverlay.style.backgroundImage = "url('skull.gif')";
        skullOverlay.style.backgroundSize = "30px 30px";
        skullOverlay.style.backgroundRepeat = "repeat";
        skullOverlay.style.opacity = "0";
        skullOverlay.style.pointerEvents = "none"; // Ensure it doesn't interfere with clicks
        skullOverlay.style.zIndex = "-1"; // Keep it behind everything

        body.appendChild(skullOverlay);

        let opacity = 0;
        let fadeSkull = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(fadeSkull);
            } else {
                opacity += 0.02; // Smooth transition
                skullOverlay.style.opacity = opacity;
            }
        }, 50);
    }

    function fadeOutAudio() {
        let volume = 1;
        let fadeInterval = setInterval(() => {
            if (volume <= 0) {
                clearInterval(fadeInterval);
                audio.pause();
            } else {
                volume -= 0.02;
                audio.volume = volume;
            }
        }, 50);
    }
});
