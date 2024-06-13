import { Album } from "./AlbumsModel";
import { Artist } from "./ArtistsModel";
import { Playlist } from "./PlaylistsModel";
import { User } from "./UsersModel";

export type Song = {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: Album;
  artist: Artist;
  playlists: Playlist[];
  likes: User[];
}

export class TracksModel {
  private _data: Song[] = [];

  public setTracks(tracks: Song[]): void {
    this._data = [...tracks];
  }

  public getTrack(id: number): Song | undefined {
    return this._data.find((track) => track.id === id);
  }

  public getElements(filter: string = ''): Song[] {
    return this._data.filter((track) => {
      return track.name.toLowerCase().includes(filter.toLowerCase());
    })
  }
}