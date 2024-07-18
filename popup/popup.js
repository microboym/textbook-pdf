const keys = ['autoDownloadPDF', 'autoCloseTab'];
window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);
        chrome.storage.sync.get(keys, (result) => {
                console.log(result);
                keys.forEach((key) => {
                        var checkbox = document.querySelector('#' + key);
                        if (result[key] != undefined) {
                            checkbox.checked = result[key];
                        }
                        checkbox.onclick = () =>
                                chrome.storage.sync.set(JSON.parse('{"' + key + '":' + checkbox.checked + '}'), () => { console.log(key); });
                    });
            });
    }, false);
