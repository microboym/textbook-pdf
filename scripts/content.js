// get pdf Url
const params = new URLSearchParams(window.location.search);
const pdfUrl = 'https://r2-ndr-private.ykt.cbern.com.cn/edu_product/esp/assets/' + params.get('contentId') + '.pkg/pdf.pdf';

const headers_str = '{"X-ND-AUTH":"MAC id=\\"7F938B205F876FC39BD5FD64A3C82167BAEF3FE82B88BD84BBB19B9EC75AF02D59C7A6D3A23E5A44203AD7FB59BFDC8A331CDC568F1B2757\\",nonce=\\"1721099029299:2DYSEZNO\\",mac=\\"d2R1T9ZTksHlEwD7 cwcTEmpSKP2IpXg2j26ZcoJQnc=\\""}'
const headers = JSON.parse(headers_str);

function downloadPDF(filename) {
    fetch(pdfUrl, { headers })
        .then((response) => response.blob()
                .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = (filename || 'textbook') + '.pdf';
                        link.click();
                        link.remove();
                        if (document.querySelector('.index-module_user_Zhwre')) setTimeout(window.close,1000);
                        else chrome.storage.sync.get(['autoCloseTab'], (result) => {
                                if (result['autoCloseTab']) setTimeout(window.close,1000);
                            });
                    }));
}

function insertStyle() {
    // Create a <style> element
    var styleElement = document.createElement('style');

    // Set the CSS content
    styleElement.innerHTML = `
    .github-button {
        background-color: #2ea44f;
        color: #ffffff;
        border: none;
        text-align: center;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(46, 164, 79, 0.4);
        transition: background-color 0.3s ease;
    }
    .github-button:hover {
        background-color: #22863a;
    }
    .github-button:focus {
        outline: none;
    }
    .github-button:active {
        background-color: #195d27;
    }
    `;

    // Append the <style> element to the <head> of the document
    document.head.appendChild(styleElement);
}

window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);

        if (document.querySelector("#header > div > div.index-module_header_QeURD.theme-menu-normal > div.index-module_menu-container_yzk8Y > div.index-module_menu-right_RHjOa > div.index-module_user_Zhwre")) {
            const observer = new MutationObserver((mutationList) => {
                    const title = document.querySelector("#zxxcontent > div.web-breadcrumb > div > span:nth-child(3) > span.fish-breadcrumb-link");
                    if (title) {
                        observer.disconnect();
                        downloadPDF(title.innerText);
                    }
                });
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            const oserver = new MutationObserver((mutationList) => {
                    const title = document.querySelector('.index-module_title_bnE9V');
                    if (title) {
                        chrome.storage.sync.get(['autoDownloadPDF'], (result) => {
                                });
                        oserver.disconnect();
                        // add download button
                        insertStyle();
                        const div = document.createElement('div');
                        div.innerHTML = '<button class="github-button">下载</button>';
                        div.onclick = () => { downloadPDF(title.innerText); };
                        title.appendChild(div);
                    }
                });
            oserver.observe(document.querySelector("#zxxcontent"), { childList: true, subtree: true });
        }
    }, false);
