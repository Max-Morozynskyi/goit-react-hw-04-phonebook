import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onFilter }) => {
  return (
    <div className={css.formField}>
      <label className={css.formLabel} htmlFor="search">
        Search with name:
      </label>
      <input
        type="text"
        className={css.formInput}
        name="filter"
        id="search"
        value={value}
        onChange={onFilter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
