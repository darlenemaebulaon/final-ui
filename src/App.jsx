import { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { getPosts, createPost, updatePost, deletePost } from './api';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const currentAuthor = "Darlene";

  const loadPosts = async () => {
  const res = await getPosts();
  const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  setPosts(sorted);
  };


  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (postData) => {
    if (editingPost) {
      await updatePost(editingPost.id, postData);
    } else {
      await createPost(postData);
    }
    setEditingPost(null);
    loadPosts();
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormVisible(true);
    setShowForm(true);
  };

  const filteredPosts = posts.filter(
  (post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      {/* Left Sidebar */}
      <aside className="sidebar-left">
        <div className="logo">🐈</div>
        <nav className="nav">
          <ul>
            <li onClick={() => console.log('Home clicked')} className="clickable-item active">Home</li>
            <li onClick={() => console.log('Explore clicked')} className="clickable-item">Explore</li>
            <li onClick={() => console.log('Notifications clicked')} className="clickable-item">Notifications</li>
          </ul>
        </nav>

        <button className="tweet-button" onClick={() => setShowForm(true)}>Add Post</button>

      </aside>

      {/* Center Feed */}
      <main className="feed">
        <header className="feed-header">Home</header>

        {/* Profile Container */}
        <div className="profile-container">
          <div className="profile-section">
            <img src="https://i.pinimg.com/originals/aa/ea/ed/aaeaed647bae9a7650986673986df052.jpg" alt="Cover" className="profile-banner"/>
            <div className="profile-info">
              <img src="https://images.icon-icons.com/3150/PNG/512/user_profile_female_icon_192701.png" alt="Profile" className="avatar"/>
              <div className="user-details">
                <strong>{currentAuthor}</strong>
                <span>@darlene</span>
                <p>Hello World!</p>
                <p>20 Following • 20 Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Container */}
        <div className="posts-container">
          {showForm && (
            <PostForm
              onSubmit={handleSubmit}
              initialData={editingPost}
              onClose={() => {
                setEditingPost(null);
                setShowForm(false);
              }}
            />
          )}

          {posts.length === 0 ? (
            <div className="empty-posts-message">Upload your first post!</div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-posts-message">No post found!</div>
          ) : (
            <PostList posts={filteredPosts} onEdit={handleEdit} onDelete={handleDelete} />
          )}

        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar-right">
        <input type="text" placeholder="Search..." className="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="who-to-follow">
          <h3>Who to follow</h3>

          <div className="user-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/3135/3135823.png"
              alt="Jane Doe"
              className="avatar-sm"
            />
            <div>
              <strong>Jane Doe</strong>
              <span>@janedoe</span>
            </div>
            <button className="follow-btn">Follow</button>
          </div>

          <div className="user-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjrczte6yvNuWvwDwnPb6WbYVA4ALhpzLKUbp33CUMCbg9BqHCH9EVy1dunPjVe1IGkA&usqp=CAU"
              alt="Juan Cruz"
              className="avatar-sm"
            />
            <div>
              <strong>Juan Cruz</strong>
              <span>@juancruz</span>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        </div>

      </aside>
    </div>
  );
}

export default App;
