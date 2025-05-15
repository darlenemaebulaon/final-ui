import { useState, useRef } from 'react';



export default function PostItem({ post, onEdit, onDelete }) {
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState([]);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);

  const handleReply = () => {
    if (comment.trim()) {
      setReplies([...replies, comment]);
      setComment('');
    }
  };

  return (
    <div className="tweet-container">
      {/* Profile Section */}
      <div className="tweet-profile">
    <img
      src={post.authorImageUrl || 'https://images.icon-icons.com/3150/PNG/512/user_profile_female_icon_192701.png'}
      alt={post.author}
      className="avatar-sm"
    />
    <div>
      <strong>{post.author}</strong> <span className="username">@{post.author.toLowerCase()}</span>
      <div className="tweet-time">{new Date(post.createdAt).toLocaleString()}</div>
      </div>
    </div>

      {/* Post Content Section */}
      <div className="tweet-content">
        <div className="text">{post.content}</div>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Media"
            className="post-media"
            onError={(e) => (e.target.style.display = 'none')}
          />
        )}

        <div className="actions">
          <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
          <button onClick={() => commentInputRef.current?.focus()}>💬 {replies.length}</button>
          <button onClick={() => onEdit(post)}>✏️</button>
          <button onClick={() => onDelete(post.id)}>🗑️</button>
        </div>

        <div className="comment-box">
          <input
            type="text"
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={commentInputRef}
          />
          <button onClick={handleReply}>Send</button>
        </div>

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((r, i) => (
              <div key={i} className="reply">{r}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
