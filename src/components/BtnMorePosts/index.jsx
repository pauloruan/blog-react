import props from 'prop-types';
import './styles.css';

export const BtnMorePosts = ({ text, onClick, disabled = false }) => (
  <button className="btn-more-posts" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

BtnMorePosts.defaultProps = {
  disabled: false,
};

BtnMorePosts.propTypes = {
  text: props.string.isRequired,
  onClick: props.func.isRequired,
  disabled: props.bool,
};
