import { saveState } from './store.js';
import { renderBoard } from './render.js';

export function setupDragAndDrop(board, app) {
  board.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.card');
   if (!card) return;
    e.dataTransfer.setData('text/plain', card.dataset.id);

    setTimeout(() => card.classList.add('dragging'), 0);
  });

  board.addEventListener('dragover', (e) => {
    e.preventDefault();

    const container = e.target.closest('.cards-container');
    if (!container) return;
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;

    const afterElement = getDragAfterElement(container, e.clientY);

    if(afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
    board.addEventListener('drop', (e) => {
      e.preventDefault();

      const newState = { todo: [], inProgress: [], done: [] };
      document.querySelectorAll('.column').forEach(colEl => {
        const colKey = colEl.dataset.column;

        colEl.querySelectorAll('.card').forEach(cardEl => {
          const id = cardEl.dataset.id;

          let text = '';
          for (const k in app.state) {
            const found = app.state[k].find(c => c.id === id);
            if(found) {text = found.text; break; }
          }
          newState[colKey].push({ id, text});
        });
      });
        app.state = newState;
        saveState(app.state);
        renderBoard(board, app.state, app.activeFormColumn);
    });

    function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll('.card:not(.dragging)')];
  
  return elements.reduce((closest, child) => {
    
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };  
    }
    return closest; 
    
  }, { offset: Number.NEGATIVE_INFINITY }).element;  
}
}