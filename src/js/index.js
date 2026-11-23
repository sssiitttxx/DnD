import './style.css';

import { loadState } from './store';
import { renderBoard } from './render';
import { setupEvents } from './events';
import { setupDragAndDrop } from './drag';

const board = document.getElementById('board');

const app = {
  state: loadState(),
  activeFormColumn: null
};

renderBoard(board, app.state, activeFormColumn);

setupEvents(board, app);
setupDragAndDrop(board, app);