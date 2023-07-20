window.addEventListener("DOMContentLoaded", async () => {
    const fromDiv = document.querySelector("#from");
    const toDiv = document.querySelector("#to");

    const { from, to } = await chrome.storage.local.get(["from", "to"]);
    fromDiv.innerText = from || "Japanese";
    toDiv.innerText = to || "English";

    document.querySelector("button").addEventListener("click", () => {
        const a = fromDiv.innerText;
        fromDiv.innerText = toDiv.innerText;
        toDiv.innerText = a;
        chrome.storage.local.set({
            from: fromDiv.innerText,
            to: toDiv.innerText,
        });
    });
});