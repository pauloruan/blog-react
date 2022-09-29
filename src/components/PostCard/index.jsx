import props from 'prop-types';
import './styles.css';

export const PostCard = ({ title, cover, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: props.string.isRequired,
  cover: props.string.isRequired,
  body: props.string.isRequired,
};
