function downloadPDF(url, filename) {
    console.log(url);
    const urlObj = new URL(url, window.location.href);
    const params = new URLSearchParams(urlObj.search);
    const pdfUrl = params.get('file');
    const headers_str = params.get('headers');
    console.log(pdfUrl, headers_str);

    if (pdfUrl) {
        const headers = JSON.parse(headers_str);
        fetch(pdfUrl, {
            headers,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename || 'textbook.pdf';
                link.click();
            });
    } else {
        alert('PDF URL not found');
    }
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

// Function to execute when the iframe's content window finishes loading
function iframeContentLoaded() {
    console.log('Iframe content loaded!');
    // Insert a div button to .index-module_title_bnE9V
    const title = document.querySelector('.index-module_title_bnE9V');
    if (title) {
        filename = title.innerText + '.pdf'
        const div = document.createElement('div');
        div.innerHTML = '<button class="github-button">下载</button>';
        div.onclick = () => {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                const src = iframe.getAttribute('src');
                downloadPDF(src, filename);
            }
        };
        title.appendChild(div);
    }
}

window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    insertStyle();
    // Delay 2 secs
    setTimeout(() => {
        // Get a reference to the iframe
        const iframe = document.querySelector('iframe');
        // Check if the iframe has already finished loading
        if (iframe.contentWindow.document.readyState === 'complete') {
            iframeContentLoaded();
        } else {
            // If not loaded, add an event listener to execute when the iframe's content window finishes loading
            iframe.contentWindow.addEventListener("load", iframeContentLoaded);
        }
    }, 2000);
}, false);
