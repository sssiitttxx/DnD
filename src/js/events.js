import { saveState } from './store.js';
import { renderBoard } from './render.js';

export function setupEvents(board, app) {
  const updateAndRender = () => {
    saveState(app.state);
    renderBoard(board, app.state, app.activeFormColumn);
  };
// Удаление формы
  board.addEventListener('click' , (e) => {
    const target = e.target;
    if(target.dataset.action === 'delete'){
      const cardId = target.closest('.card').dataset.id;
      for (const key in app.state) {
        app.state[key] = app.state[key].filter(c => c.id !== cardId);
      }

      updateAndRender();
    }
 // Открыть форму
    if(target.dataset.action === 'add') {
      app.activeFormColumn = target.closest('.column').dataset.column;
      renderBoard(board, app.state, app.activeFormColumn);
      setTimeout(() => document.querySelector('.form-input')?.focus(), 0);
    }

  // Отмена формы
    if(target.dataset.action === 'cancel') {
      app.activeFormColumn = null;
      renderBoard(board, app.state, app.activeFormColumn);
    }


// Добавить карточку
    if(target.dataset.action === 'submit') {
      const input = document.querySelector('.form-input');
      const text = input.value.trim();
      if(text) {
        app.state[app.activeFormColumn].push({ id: Date.now().toString(), text});
        app.activeFormColumn = null;
        updateAndRender();
      }
    }
  });
}
