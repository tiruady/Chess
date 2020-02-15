import {
  MatchHistoryGameWithDetails,
  MatchHistoryGameWithTurnCount,
} from '../../interfaces/MatchHistoryGame/MatchHistoryGameBase';

export interface MatchHistoryState {
  readonly matches: {
    data: MatchHistoryGameWithTurnCount[];
    isLoading: boolean;
  };
  readonly matchDetails: {
    data: { [key: number]: MatchHistoryGameWithDetails };
    isLoading: boolean;
  };
}

export enum MatchHistoryActionTypes {
  GET_MATCH_DETAILS_REQUESTED = 'GET_MATCH_DETAILS_REQUESTED',
  GET_MATCH_DETAILS_SUCCEEDED = 'GET_MATCH_DETAILS_SUCCEEDED',
  GET_MATCH_DETAILS_FAILED = 'GET_MATCH_DETAILS_FAILED',
  GET_MATCH_HISTORY_REQUESTED = 'GET_MATCH_HISTORY_REQUESTED',
  GET_MATCH_HISTORY_SUCCEEDED = 'GET_MATCH_HISTORY_SUCCEEDED',
  GET_MATCH_HISTORY_FAILED = 'GET_MATCH_HISTORY_FAILED',
  CLEAR_MATCH_HISTORY = 'CLEAR_MATCH_HISTORY',
}

export interface GetMatchDetailsRequestedAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_DETAILS_REQUESTED;
  payload: {
    gameId: number;
  };
}

export interface GetMatchDetailsSucceededAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_DETAILS_SUCCEEDED;
  payload: {
    historyGame: MatchHistoryGameWithDetails;
  };
}

export interface GetMatchDetailsFailedAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_DETAILS_FAILED;
  payload: {
    error: string;
  };
}

export interface GetMatchHistoryRequestedAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_HISTORY_REQUESTED;
}

export interface GetMatchHistoryFailedAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_HISTORY_FAILED;
  payload: {
    error: string;
  };
}

export interface GetMatchHistorySucceededAction {
  type: typeof MatchHistoryActionTypes.GET_MATCH_HISTORY_SUCCEEDED;
  payload: {
    historyGames: MatchHistoryGameWithTurnCount[];
  };
}

export interface ClearMatchHistoryAction {
  type: typeof MatchHistoryActionTypes.CLEAR_MATCH_HISTORY;
}

export type MatchHistoryActions =
  | GetMatchDetailsRequestedAction
  | GetMatchDetailsSucceededAction
  | GetMatchDetailsFailedAction
  | GetMatchHistoryRequestedAction
  | GetMatchHistoryFailedAction
  | GetMatchHistorySucceededAction
  | ClearMatchHistoryAction;
