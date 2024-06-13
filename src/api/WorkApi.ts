import axios from "../../node_modules/axios/index";
import { LocalStorage } from "../LocalStorage";
import { Album } from "../Models/AlbumsModel";
import { Artist } from "../Models/ArtistsModel";
import { Playlist } from "../Models/PlaylistsModel";
import { Song } from "../Models/TracksModel";
import { User } from "../Models/UsersModel";

const url = 'http://localhost:3000/api/';
const token = LocalStorage.getData('lol-token');
console.log(token);

type LoginRequestBody = {
  username: string;
  password: string;
}

type RegisterRequestBody = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

type Response = {
  access_token: string;
}

type UserLikesResponse = {
  artistLikes: Artist[];
  albumLikes: Album[];
  songLikes: Song[];
}

export class WorkApi {

  static async register(body: RegisterRequestBody): Promise<Response> {
    return await axios.post(`${url}auth/register`, body)
    .then(response => response.data);
  }

  static async login(body: LoginRequestBody): Promise<Response> {
    return await axios.post(`${url}auth/login`, body)
      .then(response => response.data);
  }

  static async getUsers(): Promise<User[]> {
    // Вообще в аргументах нужен токен
    return await axios.get(`${url}users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async getPlaylists(): Promise<Playlist[]> {
    return await axios.get(`${url}users/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async getPlaylist(playlistId: number): Promise<Playlist> {
    return await axios.get(`${url}playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async getTracks(): Promise<Song[]> {
    return await axios.get(`${url}songs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async getTrack(songId: number): Promise<Song> {
    return await axios.get(`${url}songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async like(songId: number): Promise<void> {
    return await axios.post(`${url}songs/${songId}/like`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async unlike(songId: number): Promise<void> {
    return await axios.post(`${url}songs/${songId}/unlike`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }

  static async addTrackInPlaylist(playlistId: number, songId: number): Promise<void> {
    return await axios.post(`${url}playlists/${playlistId}/add/${songId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }

  static async deleteTrackFromPlaylist(playlistId: number, songId: number): Promise<void> {
    return await axios.post(`${url}playlists/${playlistId}/remove/${songId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
  }

  static async getUserLikes(): Promise<UserLikesResponse> {
    return await axios.get(`${url}users/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }

  static async downloadTrack(path: string): Promise<ArrayBuffer> {
    return await axios.get(`http://localhost:3000${path}`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);
  }
}