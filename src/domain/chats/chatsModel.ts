import HTTPTransport from "../../core/httpTransport";
import coreDomain from "../coreDomain";

const profileApi = new HTTPTransport();

export default class Chats {
  async getChats(
    data: { offset?: string; limit?: string } = {}
  ): Promise<XMLHttpRequest> {
    return profileApi.get(`https://${coreDomain}/api/v2/chats`, {
      data: {
        offset: data.offset || "0",
        limit: data.limit || "30",
      },
    });
  }

  async searchChats(data: Record<string, string>): Promise<XMLHttpRequest> {
    return profileApi.get(`https://${coreDomain}/api/v2/chats`, {
      data: {
        offset: data.offset,
        limit: data.limit,
        title: data.title,
      },
    });
  }

  async createChat(data: {
    title: FormDataEntryValue;
  }): Promise<XMLHttpRequest> {
    return profileApi.post(`https://${coreDomain}/api/v2/chats`, {
      data: { title: data.title },
    });
  }

  async deleteChat(data: number): Promise<XMLHttpRequest> {
    return profileApi.delete(`https://${coreDomain}/api/v2/chats`, {
      data: { chatId: data },
    });
  }

  async addUser(data: Record<string, number>): Promise<XMLHttpRequest> {
    return profileApi.put(`https://${coreDomain}/api/v2/chats/users`, {
      data: {
        users: data.users,
        chatId: data.chatId,
      },
    });
  }

  async removeUser(data: Record<string, string>): Promise<XMLHttpRequest> {
    return profileApi.delete(`https://${coreDomain}/api/v2/chats/users`, {
      data: {
        users: data.users,
        chatId: data.chatId,
      },
    });
  }

  async searchUser(data: {
    login: FormDataEntryValue;
  }): Promise<XMLHttpRequest> {
    return profileApi.post(`https://${coreDomain}/api/v2/user/search`, {
      data: {
        login: data.login,
      },
    });
  }

  async getChatUsers(data: Record<string, number>): Promise<XMLHttpRequest> {
    return profileApi.get(
      `https://${coreDomain}/api/v2/chats/${data.id}/users`
    );
  }

  async updateChatAvatar(formData: FormData): Promise<XMLHttpRequest> {
    return profileApi.put(`https://${coreDomain}/api/v2/chats/avatar`, {
      data: formData,
    });
  }

  async getChatToken(data: Record<string, number>): Promise<XMLHttpRequest> {
    return profileApi.post(
      `https://${coreDomain}/api/v2/chats/token/${data.chatId}`
    );
  }
}
