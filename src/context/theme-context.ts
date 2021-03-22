import React from 'react';

type Theme = Record<ThemeType, ColorType>;

export interface ColorType {
  foreground: string;
  background: string;
}
enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

export const themes: Theme = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
