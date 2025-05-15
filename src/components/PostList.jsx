import PostItem from './PostItem';

export default function PostList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
  return <div className="empty-posts-message">Upload your first post!</div>;
  }


  return posts.map((post) => (
    <PostItem key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
  ));
}
