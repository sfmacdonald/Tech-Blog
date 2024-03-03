document.getElementById('commentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const postId = document.getElementById('postId').value;
    const commentText = document.getElementById('commentText').value.trim();

    if (commentText) {
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentText }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload(); // Reload the page to show the new comment
        } else {
            alert('Failed to add comment.');
        }
    }
});
