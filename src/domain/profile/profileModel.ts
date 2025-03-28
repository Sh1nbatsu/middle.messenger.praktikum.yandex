import HTTPTransport from "../../core/httpTransport";
import { passwordData, updateData } from "./profileController";
import coreDomain from "../coreDomain";

const profileApi = new HTTPTransport();

export default class Profile {
  async updateAvatar(formData: FormData): Promise<XMLHttpRequest> {
    return profileApi.put(`https://${coreDomain}/api/v2/user/profile/avatar`, {
      data: formData,
    });
  }

  async updateProfile(formData: updateData): Promise<XMLHttpRequest> {
    return profileApi.put(`https://${coreDomain}/api/v2/user/profile`, {
      data: formData,
    });
  }

  async updatePassword(formData: passwordData): Promise<XMLHttpRequest> {
    return profileApi.put(`https://${coreDomain}/api/v2/user/password`, {
      data: formData,
    });
  }
}
