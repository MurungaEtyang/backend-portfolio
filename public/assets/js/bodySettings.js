fetch('/api/kenf/management/body-setting/retrieve-body-settings', {
    method: 'get',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        body {
            background-color: ${data.color};
            font-family: ${data.font_family};
            font-size: ${data.font_size};
            color: ${data.text_color};
            line-height: ${data.line_height};
            text-align: ${data.text_align};
        }
    `;
        document.head.appendChild(styleTag);
    })
    .catch(error => {
        console.error('Error fetching body settings:', error);
    });