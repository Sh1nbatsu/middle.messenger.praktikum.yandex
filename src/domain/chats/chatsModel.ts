import HTTPTransport from "../../core/httpTransport";

const profileApi = new HTTPTransport();

export default class Chats {
  async getChats(
    data: { offset?: string; limit?: string } = {}
  ): Promise<XMLHttpRequest> {
    return profileApi.get("https://ya-praktikum.tech/api/v2/chats", {
      data: {
        offset: data.offset || "0",
        limit: data.limit || "10",
      },
    });
  }

  async searchChats(data): Promise<XMLHttpRequest> {
    return profileApi.get("https://ya-praktikum.tech/api/v2/chats", {
      offset: data.offset,
      limit: data.limit,
      title: data.title,
    });
  }

  async createChat(data): Promise<XMLHttpRequest> {
    return profileApi.post("https://ya-praktikum.tech/api/v2/chats", {
      data: { title: data.title },
    });
  }

  async deleteChat(data): Promise<XMLHttpRequest> {
    return profileApi.post("https://ya-praktikum.tech/api/v2/chats", {
      chatId: data.chatId,
    });
  }

  async addUser(data): Promise<XMLHttpRequest> {
    return profileApi.put("https://ya-praktikum.tech/api/v2/chats/users", {
      users: data.users,
      chatId: data.chatId,
    });
  }
}
