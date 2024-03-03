document.getElementById('createPostForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard'); // Redirect to dashboard on success
        } else {
            alert('Failed to create post.');
        }
    }
});
