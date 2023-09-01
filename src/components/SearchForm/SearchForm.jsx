import propTypes from 'prop-types';

import { Form, Icon, Button } from './SearchForm.styled';
import { useState } from 'react';

export const SearchForm = ({ value, onSubmit }) => {
  const [text, setText] = useState(value || '');
  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please select your movie');
      return;
    }
    onSubmit(text);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Movie Search</h2>
      <input
        onChange={e => {
          setText(e.target.value);
        }}
        type="text"
        name="query"
        value={text}
        placeholder="type here"
      />
      <Button type="submit">
        <Icon />
      </Button>
    </Form>
  );
};

SearchForm.propTypes = {
  value: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
};
