// Task 1: Fetch Data with fetch()
document.getElementById('fetchButtonFetch').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        })
        .catch(error => {
            const output = document.getElementById('output');
            output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        });
});

// Task 2: Fetch Data with XMLHttpRequest
document.getElementById('fetchButtonXHR').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const output = document.getElementById('output');
            output.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
        } else {
            const output = document.getElementById('output');
            output.innerHTML = `<p style="color: red;">Error: ${xhr.statusText}</p>`;
        }
    };
    xhr.onerror = function() {
        const output = document.getElementById('output');
        output.innerHTML = `<p style="color: red;">Error: Network issue</p>`;
    };
    xhr.send();
});

// Task 3: Send Data Using POST
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        const output = document.getElementById('output');
        output.innerHTML = `<h3>Post Created</h3><p>Title: ${data.title}</p><p>Body: ${data.body}</p>`;
    })
    .catch(error => {
        const output = document.getElementById('output');
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});


document.getElementById('putForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('postId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const output = document.getElementById('output');
            output.innerHTML = `<h3>Post Updated</h3><p>Title: ${data.title}</p><p>Body: ${data.body}</p>`;
        } else {
            const output = document.getElementById('output');
            output.innerHTML = `<p style="color: red;">Error: ${xhr.statusText}</p>`;
        }
    };
    xhr.onerror = function() {
        const output = document.getElementById('output');
        output.innerHTML = `<p style="color: red;">Error: Network issue</p>`;
    };
    xhr.send(JSON.stringify({ title, body }));
});
