import { Artist } from "./ArtistsModel";
import { Song } from "./TracksModel";
import { User } from "./UsersModel";

export type Album = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  songs: Song[];
  artist: Artist[];
  likes: User[];
}

export class AlbumsModel {
  private _data: Album[] = [];

  public setAlbums(albums: Album[]): void {
    this._data = [...albums];
  }

  public getAlbum(id: number): Album | undefined {
    return this._data.find((album) => album.id === id);
  }
}