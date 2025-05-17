  import { useState, useEffect } from 'react';

  export default function PostForm({ onSubmit, initialData, onClose }) {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const author = 'Darlene'; // Simulate logged-in user

    useEffect(() => {
      setContent(initialData?.content || '');
      setImageUrl(initialData?.imageUrl || '');
    }, [initialData]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ content, imageUrl, author });
      setContent('');
      setImageUrl('');
      onClose();
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="post-form">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit">{initialData ? 'Update' : 'Post'}</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
