import { combineReducers } from 'redux';
import game from './game/game.reducer';
import user from './user/user.reducer';
import chat from './chat/chat.reducer';
import queue from './queue/queue.reducer';
import history from './history/history.reducer';

export const rootReducer = combineReducers({
  game,
  user,
  chat,
  queue,
  history,
});

export type AppState = ReturnType<typeof rootReducer>;
