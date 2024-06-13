import { Album } from "./AlbumsModel";
import { User } from "./UsersModel";

export type Artist = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: Album[];
  likes: User[];
}

export class ArtistsModel {
  private _data: Artist[] = [];

  public setArtists(artists: Artist[]): void {
    this._data = [...artists];
  }

  public getArtist(id: number): Artist | undefined {
    return this._data.find((artist) => artist.id === id);
  }
}