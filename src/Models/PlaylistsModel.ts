import { WorkApi } from "../api/WorkApi";
import { Song } from "./TracksModel";
import { User } from "./UsersModel";

export type Playlist = {
  id: number;
  name: string;
  createdAt: string;
  user: User;
  songs: Song[];
}

export class PlaylistsModel {
  private _data: Playlist[] = [];

  public setPlaylists(playlists: Playlist[]): void {
    this._data = [...playlists];
  }

  public getPlaylist(id: number): Playlist | undefined {
    return this._data.find((Playlist) => Playlist.id === id);
  }

  public getElements(filter: string = ''): Playlist[] {
    return this._data.filter((playlist) => {
      return playlist.name.toLowerCase().includes(filter.toLowerCase());
    })
  }

  public async update(): Promise<void> {
    this._data = await WorkApi.getPlaylists();
  }
}