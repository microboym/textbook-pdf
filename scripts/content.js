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

window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    // Delay 3 secs
    setTimeout(() => {
        // Insert a div button to .toolBar-module_wrapper_NU9GV
        const toolBar = document.querySelector('.toolBar-module_wrapper_NU9GV');
        if (toolBar) {
            const div = document.createElement('div');
            div.innerHTML = '<span>下载</span>';
            div.className = 'index-module_to-teach_sxbbq  toTeach-module_play-warpper_dL5cW';
            div.onclick = () => {
                const iframe = document.querySelector('iframe');
                const title = document.querySelector('.index-module_title_bnE9V');
                if (iframe) {
                    const src = iframe.getAttribute('src');
                    downloadPDF(src, title.innerText + '.pdf');
                }
            };
            toolBar.appendChild(div);
        }
    }, 1000);
}, false);