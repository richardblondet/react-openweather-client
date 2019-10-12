import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import './App.css';
import { StoreProvider } from "./contextStore";
import Logo from "./Logo";
import Search from "./Search";
import Widget from "./WeatherWidget";
import EmptyState from "./EmptyState";

function App() {
  return (
    <StoreProvider>
      <Logo />
      <Search />
      <Widget />
      <EmptyState />
    </StoreProvider>
  );
}

export default App;
