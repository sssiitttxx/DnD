const STORAGE_KEY = 'trello-state';
const initialState = {
  todo: [
    { id: '1', text: 'Добро пожаловать в Trello!' },
    { id: '2', text: 'Это карточка' }
  ],
  inProgress: [
    { id: '3', text: 'Перетащите людей на карточку, чтобы указать' }
  ],
  done: [
    { id: '4', text: 'Чтобы узнать больше о трюках, ознакомьтесь с руководством' }
  ]
};

export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  } catch (e) {
    console.error('Ошибка при чтении из localStorage: ', e)
    return initialState;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}