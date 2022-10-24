import props from 'prop-types';
import './styles.css';

export const PostCard = ({ title, cover, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: props.string.isRequired,
  cover: props.string.isRequired,
  body: props.string.isRequired,
};
