import { LocalStorage } from './LocalStorage';
import { PlaylistsModel } from './Models/PlaylistsModel';
import { TracksModel } from './Models/TracksModel';
import { UsersModel } from './Models/UsersModel';
import { InputSearchPresenter } from './Presenters/Header/InputSearchPresenter';
import { UserPresenter } from './Presenters/Header/UserPresenter';
import { ModalService } from './Presenters/Modal/ModalService';
import { PlayerPresenter } from './Presenters/Player/PlayerPresenter';
import { ScreenPresenter } from './Presenters/Screen/ScreenPresenter';
import { SidebarPresenter } from './Presenters/Sidebar/SidebarPresenter';
import { setAttributes } from './Utils/setAtributes';
import { HeaderView } from './Views/Header/HeaderView';
import { LogoView } from './Views/Header/LogoView';
import { WorkApi } from './api/WorkApi';
import './css/style.css';

if (!LocalStorage.getItemData('lol-token')) {
  const token = await WorkApi.register({
    username: 'Mimosa',
    password: '1234',
    firstName: 'Kirill',
    lastName: 'Tarachov'
  });

  LocalStorage.setItemData('lol-token', token.access_token);
  location.reload();
}

// root containers app
const root = document.createElement('div');
const contentWrap = document.createElement('div');
const sectionContainer = document.createElement('main');
root.classList.add('over-wrapper');
contentWrap.classList.add('content-wrap', 'flex');
sectionContainer.classList.add('main');
setAttributes(root, { 'position': 'relative', 'overflow': 'hidden' });

// render page
const users = await WorkApi.getUsers();
const playlists = await WorkApi.getPlaylists();
const tracks = await WorkApi.getTracks();

const usersModel = new UsersModel();
const playlistsModel = new PlaylistsModel();
const tracksModel = new TracksModel();

usersModel.setUsers(users);
playlistsModel.setPlaylists(playlists);
tracksModel.setTracks(tracks);

// Simple Views
const headerView = new HeaderView().getElement();
const logoView = new LogoView().getElement();

headerView.append(logoView);
contentWrap.append(sectionContainer);
root.append(headerView, contentWrap);

// Modal Add Track
ModalService.getInstance().render(document.body);
ModalService.getInstance().playlists = playlistsModel.getElements();

// Presenters
const inputSearchPresenter = new InputSearchPresenter(headerView);
const userPresenter = new UserPresenter(headerView, usersModel);
const sidebarPresenter = new SidebarPresenter(contentWrap, playlistsModel);
const playerPresenter = new PlayerPresenter(root, tracksModel.getTrack(1)!, tracksModel.getElements()); // Ну пока так
const screenPresenter = new ScreenPresenter(
  tracksModel, 
  playlistsModel, 
  playerPresenter,
  usersModel.getUser(1)!, 
  sectionContainer
);

inputSearchPresenter.subscribe(screenPresenter);
sidebarPresenter.subscribe(screenPresenter);

inputSearchPresenter.render();
userPresenter.render();
sidebarPresenter.render();
screenPresenter.render();
playerPresenter.render();

// Root append
document.body.append(root);
