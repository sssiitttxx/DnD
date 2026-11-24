export function renderBoard(board, state, activeFormColumn) {
  board.innerHTML = `
    ${['todo', 'inProgress', 'done'].map(key => {
      const cards = state[key];
      const title = key === 'todo' ? 'TODO' : key === 'inProgress' ? 'IN PROGRESS' : 'DONE';
      
      return `
        <div class="column" data-column="${key}">
          <div class="column-title">${title}</div>
          <div class="cards-container">
            ${cards.map(card => `
              <div class="card" draggable="true" data-id="${card.id}">
                ${card.text}
                <button class="card-delete" data-action="delete">✕</button>
              </div>
            `).join('')}
          </div>
          
          ${activeFormColumn === key 
            ? `
              <div class="add-card-form">
                <textarea class="form-input" placeholder="Enter a title..."></textarea>
                <div class="form-actions">
                  <button class="btn-add" data-action="submit">Add Card</button>
                  <button class="btn-cancel" data-action="cancel">✕</button>
                </div>
              </div>
            ` 
            : `<button class="add-card-btn" data-action="add">+ Add another card</button>`}
            
        </div>
      `;
    }).join('')}
  `;
}