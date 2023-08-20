import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader({ onInputPost,onUpdatePost,onDeletePost }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Planner
      </h1>
      <p>
        <button className={classes.button} onClick={onInputPost}>
          <MdPostAdd size={15} />
          New Schedule
        </button>

        <button className={classes.button} onClick={onUpdatePost}>
          <MdPostAdd size={15} />
          Update Schedule
        </button>

        <button className={classes.button} onClick={onDeletePost}>
          <MdPostAdd size={15} />
          Delete Schedule
        </button>
      </p>
    </header>
  );
}

export default MainHeader;