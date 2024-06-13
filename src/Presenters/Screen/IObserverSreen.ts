export enum ScreenState {
  Tracks,
  Playlist,
  PlaylistsList,
  Likes
}

export interface IObserverScreen {
  switchScreen(value: ScreenState, playlistId?: number): void;
  filter(value: string): void;
}