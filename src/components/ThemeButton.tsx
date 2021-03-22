import React from 'react';
import { ThemeContext } from '../context/theme-context';

// eslint-disable-next-line react/prefer-stateless-function
class ThemedButton extends React.Component {
  render() {
    const { props } = this;
    const theme = this.context;
    return (
      <button
        type="button"
        {...props}
        style={{ backgroundColor: theme.background }}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
