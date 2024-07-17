function downloadPDF(filename) {
    // get pdf Url
    const params = new URLSearchParams(window.location.search);
    const pdfUrl = 'https://r2-ndr-private.ykt.cbern.com.cn/edu_product/esp/assets/' + params.get('contentId') + '.pkg/pdf.pdf';

    const headers_str = '{"X-ND-AUTH":"MAC id=\\"7F938B205F876FC39BD5FD64A3C82167BAEF3FE82B88BD84BBB19B9EC75AF02D59C7A6D3A23E5A44203AD7FB59BFDC8A331CDC568F1B2757\\",nonce=\\"1721099029299:2DYSEZNO\\",mac=\\"d2R1T9ZTksHlEwD7 cwcTEmpSKP2IpXg2j26ZcoJQnc=\\""}'
    const headers = JSON.parse(headers_str);
    
    fetch(pdfUrl, { headers })
        .then((response) => response.blob())
        .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename || 'textbook.pdf';
                link.click();
            });
}

function insertStyle() {
  // Create a <style> element
  var styleElement = document.createElement('style');

  // Set the CSS content
  styleElement.innerHTML = `
    .github-button {
      color: #1e62ec;
      border: none;
      text-align: center;
      cursor: pointer;
      background-color: initial;
    }

    .github-button:hover {
      color: #04366c;
    }
  `;

  // Append the <style> element to the <head> of the document
  document.head.appendChild(styleElement);
}

window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);

        insertStyle();

        // remove the fish modal
        const fishObserver = new MutationObserver((mutationList) => {
                const fish = document.querySelector(".fish-modal-root");
                if (fish) {
                    fish.remove();
                    fishObserver.disconnect();
                }
            });
        fishObserver.observe(document.body, { childList: true, subtree: true });

        const titleObserver = new MutationObserver((mutationList) => {
                // get title
                const title = document.querySelector("#zxxcontent > div.web-breadcrumb > div > span:nth-child(3) > span.fish-breadcrumb-link");
                if (title) {
                    const filename = title.innerText + '.pdf'

                    // add download button
                    const span = document.createElement('span');
                    span.innerHTML = '<button class="github-button">下载</button>';
                    span.onclick = () => { downloadPDF(filename); };
                    title.parentElement.parentElement.appendChild(span);

                    titleObserver.disconnect();
                }
            });
        titleObserver.observe(document.querySelector("#zxxcontent"), { childList: true, subtree: true });
    }, false);
