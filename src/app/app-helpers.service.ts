import { Injectable } from '@angular/core';

@Injectable()
export class AppHelpersService {

  private profilePictureUpdateCallbacks:Function[] = [];
  private profilePicture: string;

  constructor() { }

  subscribeToProfilePictureUpdate (callback) {
    this.profilePictureUpdateCallbacks.push(callback);
  }

  updateProfilePicture (profilePicture) {
    this.profilePicture = profilePicture;
    this.profilePictureUpdateCallbacks.forEach((cb) => {
      cb(this.profilePicture);
    });
  }

}
