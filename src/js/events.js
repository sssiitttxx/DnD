import { saveState } from './store.js';
import { renderBoard } from './render.js';

export function setupEvents(board, app) {
  const updateAndRender = () => {
    saveState(app.state);
    renderBoard(board, app.state, app.activeFormColumn);
  };

  board.addEventListener('click' , (e) => {
    const target = e.target;
    if(target.dataset.action === 'delete'){
      const cardId = target.closest('.card').dataset.id;
      for (const key in app.state) {
        app.state[key] = app.state[key].filter(c => c.id !== cardId);
      }

      updatAndRender();
    }
  });
}
