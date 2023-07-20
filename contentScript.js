// Respond to requests to close the dialog box
let dialog;
const body = document.querySelector("body");

window.addEventListener("click", () => {
    if (dialog) {
        dialog.remove();
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog) {
        dialog.remove();
    }
});


//Display dialog box with translation
function showDialog(translation) {
    // Get selection to know where to position the dialog
    const selection = window.getSelection();
    if (!selection) {
        console.log("Nothing was selected");
        return;
    }
    const dialogHtml = `${translation}
  
    .
  `;
    dialog = document.querySelector("#my-dialog");
    if (dialog) {
        dialog.remove();
    }
    dialog = document.createElement("dialog");
    dialog.innerHTML = dialogHtml;
    dialog.id = "my-dialog";
    dialog.open = true;
    dialog.style = "font-size: 16px; border: 1px solid #cccccc; z-index:999;";
    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentNode;
    parent.appendChild(dialog);
    dialog.addEventListener("click", () => {
        dialog.remove();
    });
}

// Receive clicks on context menu option
chrome.runtime.onMessage.addListener((message) => {
    console.log(message.msg);
    showDialog(`${message.msg}`);
});