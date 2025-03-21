import HTTPTransport from "../../core/httpTransport";

const profileApi = new HTTPTransport();

export default class Profile {
  async updateAvatar(formData): Promise<XMLHttpRequest> {
    return profileApi.put(
      "https://ya-praktikum.tech/api/v2/user/profile/avatar",
      { data: formData }
    );
  }

  async updateProfile(formData): Promise<XMLHttpRequest> {
    return profileApi.put("https://ya-praktikum.tech/api/v2/user/profile", {
      data: formData,
    });
  }

  async updatePassword(formData): Promise<XMLHttpRequest> {
    return profileApi.put("https://ya-praktikum.tech/api/v2/user/password", {
      data: formData,
    });
  }
}
