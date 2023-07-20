// Create context menu option
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate-menu",
        title: "Translate %s",
        contexts: ["selection"],
    });
});

// Call DeepL API
async function callTranslator(selected_text, source_lang, target_lang) {
    const languageCodes = {
        English: "en",
        Japanese: "ja",
    };
    
    // Text Translator API by Devisty
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'PASTE YOUR KEY',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: languageCodes[source_lang],
            target_language: languageCodes[target_lang],
            text: selected_text
        })
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.translatedText);
        return result.data.translatedText;
    } catch (error) {
        console.error(error);
    }
}

// Respond to translation requests
chrome.contextMenus.onClicked.addListener(
    async (info, tabs) => {
        let { from, to } = await chrome.storage.local.get(["from", "to"]);
        from = from || "Japanese";
        to = to || "English";
        const translation = await callTranslator(info.selectionText, from, to);
        chrome.tabs.sendMessage(tabs.id, { msg: translation });
    });