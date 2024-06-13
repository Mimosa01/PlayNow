import { UsersModel } from "../../Models/UsersModel";
import { insertComponent } from "../../Utils/insertComponent";
import { UserView } from "../../Views/Header/UserView";

export class UserPresenter {
  private _userView: UserView | null = null;
  private _root: Element;
  private _userModel: UsersModel;

  constructor(root: Element, userModel: UsersModel) {
    this._root = root;
    this._userModel = userModel;
  }

  public render(): void {
    const user = this._userModel.getUser(1); // Ну пока так

    if (user) {
      this._userView = new UserView({ firstName: user.firstName, lastName: user.lastName });
      insertComponent(this._root, this._userView.getElement(), 'beforeend');
    } 
  }

  public remove(): void {
    this._userView?.removeElement();
  }
}