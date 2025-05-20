const defaultLoader = {
    script: 'js/yogurt.js',
    style: 'css/yogurt.css',
    audio: ['audio/yogurt.mp3', 'audio/yogurt.ogg'],
    him: 'img/yogurt.gif',
};

const specialLoaders = [
    { dayRange: { start: { month: 12 }, end: { month: 12 } }, config: {
        script: 'js/special/christmas.js',
        style: 'css/special/christmas.css',
        him: 'img/special/christmas.gif',
        audio: [],
    }},
];

const today = new Date();
for (const loader of specialLoaders) {
    const startDay = loader.dayRange.start.day || 1; // Default to the 1st of the month if not defined
    const endDay = loader.dayRange.end.day || new Date(today.getFullYear(), loader.dayRange.end.month, 0).getDate(); // Default to the last day of the month if not defined

    const start = new Date(today.getFullYear(), loader.dayRange.start.month - 1, startDay);
    const end = new Date(today.getFullYear(), loader.dayRange.end.month - 1, endDay);

    if (today >= start && today <= end) {
        console.log("Special loader detected");
        // Script
        if (loader.config.script) {
            const scriptElement = document.createElement("script");
            scriptElement.src = loader.config.script;
            document.head.appendChild(scriptElement);
        }

        // Style
        if (loader.config.style) {
            const styleElement = document.createElement("link");
            styleElement.rel = "stylesheet";
            styleElement.href = loader.config.style;
            document.head.appendChild(styleElement);
        }

        // Audio
        if (loader.config.audio) {
            const audioElement = document.getElementById("yogurt-audio");
            for (const audio of loader.config.audio) {
                const sourceElement = document.createElement("source");
                sourceElement.src = audio;
                audioElement.appendChild(sourceElement);
            }
        }

        // Him
        if (loader.config.him) {
            const himElement = document.getElementById("him");
            himElement.src = loader.config.him;
        }
    }
}

const audio = document.getElementById("yogurt-audio");

function playAudio() {
    audio.play();
}

audio.volume = 0.5;
window.addEventListener("DOMContentLoaded", event => {
    audio.play().catch(error => {
        if (error.name === "NotAllowedError") {
            console.error("Permission denied to play audio", error);
        } else if (error.name === "NotFoundError") {
            console.error("Audio file not found", error);
        } else {
            console.error("Failed to play audio", error);
        }
        document.getElementById("backup-button").style.display = "block";
    });
});
window.addEventListener("click", event => {
    audio.play()
});

audio.addEventListener('play', () => {
    audio.controls = false;
    console.log("Audio is playing");
    document.getElementById("backup-button").style.display = "none";
    document.getElementById("attr").style.display = "show";
});