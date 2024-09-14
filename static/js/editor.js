function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function applyFontSize(select) {
    let size;
    switch (select.value) {
        case 'small':
            size = '12px';
            break;
        case 'medium':
            size = '16px';
            break;
        case 'large':
            size = '20px';
            break;
        case 'huge':
            size = '24px';
            break;
    }
    document.execCommand('fontSize', false, '7');
    let elements = document.querySelectorAll("font[size='7']");
    elements.forEach(el => {
        el.removeAttribute('size');
        el.style.fontSize = size;
    });
}

function applyFontFamily(select) {
    let font = select.value;
    document.execCommand('fontName', false, font);
}

function saveDocument() {
    let content = document.getElementById('editor').innerHTML;
    let filename = document.getElementById('filename').value;

    if (!filename) {
        alert('Please enter a filename!');
        return;
    }

    fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `content=${encodeURIComponent(content)}&filename=${encodeURIComponent(filename)}`
    })
    .then(response => response.text())
    .then(data => alert(data));
}

function searchFile(event) {
    let searchQuery = event.target.value;
    if (event.key === 'Enter' && searchQuery) {
        fetch(`/search?query=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('search-results').innerHTML = data.results.map(file => `<div onclick="loadFile('${file}')">${file}</div>`).join('');
                document.getElementById('search-results').style.display = 'block';
            });
    }
}

function showSearchResults() {
    let searchQuery = document.getElementById('search-bar').value;
    if (searchQuery) {
        fetch(`/search?query=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('search-results').innerHTML = data.results.map(file => `<div onclick="loadFile('${file}')">${file}</div>`).join('');
                document.getElementById('search-results').style.display = 'block';
            });
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
}

function loadFile(filename) {
    fetch(`/load?filename=${encodeURIComponent(filename)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('editor').innerHTML = data.content;
            document.getElementById('filename').value = data.filename;
            document.getElementById('search-results').style.display = 'none';
        });
}

function uploadImage() {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function() {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            execCmd('insertImage', e.target.result);
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}
