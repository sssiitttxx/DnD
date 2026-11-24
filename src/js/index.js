import '../style.css';

import { loadState } from './store.js';
import { renderBoard } from './render.js';
import { setupEvents } from './events.js';
import { setupDragAndDrop } from './drag.js';

const board = document.getElementById('board');

const app = {
  state: loadState(),
  activeFormColumn: null
};

renderBoard(board, app.state, app.activeFormColumn);

setupEvents(board, app);
setupDragAndDrop(board, app);