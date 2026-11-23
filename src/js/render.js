export function renderBoard(board, state, activeFormColumn) {
  board.innerHTML = `
    ${['todo', 'inProgress', 'done'].map(key => {
      const cards = state[key];
      return `
      <div class="column" data-column=${key}">
      <div class="column-title">${key.toUpperCase()}</div>
      <div class="cards-container">
      ${cards.map(card => 
        `<div class = "card" draggable="true" data-id="${card.id}">
          ${card.text}
          <button class ="card-delete" data-action="delete">x</button>
          </div>
        `).join('')}
        </div>
      </div>
    `;
      }).join('')}
  `;
} 