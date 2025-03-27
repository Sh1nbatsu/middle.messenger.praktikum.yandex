import HTTPTransport from "../../core/httpTransport";
import { updateData } from "./profileController";

const profileApi = new HTTPTransport();

export default class Profile {
  async updateAvatar(formData: FormData): Promise<XMLHttpRequest> {
    return profileApi.put(
      "https://ya-praktikum.tech/api/v2/user/profile/avatar",
      { data: formData }
    );
  }

  async updateProfile(formData: updateData): Promise<XMLHttpRequest> {
    return profileApi.put("https://ya-praktikum.tech/api/v2/user/profile", {
      data: formData,
    });
  }

  async updatePassword(formData: FormData): Promise<XMLHttpRequest> {
    return profileApi.put("https://ya-praktikum.tech/api/v2/user/password", {
      data: formData,
    });
  }
}
