// import { WorkApi } from "../api/WorkApi";
import { Album } from "./AlbumsModel";
import { Artist } from "./ArtistsModel";
import { Playlist } from "./PlaylistsModel";
import { Song } from "./TracksModel";

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  playlists: Playlist[];
  artistLikes: Artist[];
  albumLikes: Album[];
  songLikes: Song[];
}

export class UsersModel {
  private _data: User[] = [];

  public setUsers(users: User[]): void {
    this._data = [...users];
  }

  public getUser(id: number): User | undefined {
    return this._data.find((user) => user.id === id);
  }

  public update(updatedUser: User): void {
    const elementIndex = this._data.findIndex((e) => e.id === updatedUser.id);
    if (elementIndex !== -1) {
      this._data[elementIndex] = updatedUser;
    }
  }
}