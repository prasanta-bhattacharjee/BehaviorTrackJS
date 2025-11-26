(function () {
    let lastInteraction = Date.now();

    function sendEvent(type, data) {
        const form = new FormData();
        form.append("event_type", type);
        form.append("event_data", JSON.stringify(data));

        fetch("api/save_event.php", {
            method: "POST",
            body: form
        });
    }

    // Click tracking
    document.addEventListener("click", e => {
        lastInteraction = Date.now();
        sendEvent("click", { x: e.clientX, y: e.clientY });
    });

    // Mouse movement (rate limited)
    let lastMove = 0;
    document.addEventListener("mousemove", e => {
        const now = Date.now();
        if (now - lastMove > 300) {
            lastMove = now;
            lastInteraction = now;
            sendEvent("mouse_move", { x: e.clientX, y: e.clientY });
        }
    });

    // Scroll depth
    document.addEventListener("scroll", () => {
        lastInteraction = Date.now();
        const scrollTop = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const percent = Math.round((scrollTop / maxScroll) * 100);

        sendEvent("scroll", { scroll_percent: percent });
    });

    // Time spent (every 5 seconds)
    setInterval(() => {
        sendEvent("time_spent", { seconds: 5 });
    }, 5000);

    // Idle time (every 8 seconds)
    setInterval(() => {
        const idleSeconds = Math.round((Date.now() - lastInteraction) / 1000);
        sendEvent("idle_time", { seconds: idleSeconds });
    }, 8000);

})();
