import Auth from "./authModel";

const authApi = new Auth();

export const loginService = async (data: Record<string, string>) => {
  window.store.setState({ isLoading: true });

  console.log(data);

  try {
    const response = await authApi.login(data);

    if (response.status == 401) {
      console.log(JSON.parse(response.responseText));
    }
    if (response.status >= 400) {
      const errorData = JSON.parse(response.responseText);
      console.log(errorData);
    } else if (response.status === 200) {
      await getUserController();
      window.router.go("/messenger");
    }
  } catch (error) {
    console.log(error);
  } finally {
    window.store.setState({ isLoading: false });
  }
};

export const signUpSerivce = async (data: Record<string, string>) => {
  window.store.setState({ isLoading: true });

  console.log(data);

  try {
    window.store.setState({ isLoading: true });

    const response = await authApi.signup(data);

    if (response.status >= 400) {
      const errorData = JSON.parse(response.responseText);
      console.log(errorData);
    } else if (response.status === 200) {
      window.router.go("messenger");
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    window.store.setState({ isLoading: false });
  }
};

export const getUserController = async () => {
  if (window.store.getState().user) {
    return;
  }

  try {
    const response = await authApi.profile();
    if (response.status === 200) {
      const user = JSON.parse(response.responseText);
      console.log(user);
      window.store.setState({ user });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logoutController = async () => {
  window.store.setState({ user: null });

  try {
    authApi.logout();
  } catch (error) {
    console.log(error);
  } finally {
    window.router.go("/");
  }
};
