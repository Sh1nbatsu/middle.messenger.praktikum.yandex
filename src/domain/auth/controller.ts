import Auth from "./model";

const authApi = new Auth();

export const loginService = async (data) => {
  window.store.setState({ isLoading: true });

  console.log(data);

  try {
    window.store.setState({ isLoading: true });

    const response = await authApi.login(data);

    if (response.status >= 400) {
      const errorData = JSON.parse(response.responseText);
      console.log(errorData);
    } else if (response.status === 200) {
      window.router.go("messenger");
    }
  } catch (error) {
    console.log(error);
  } finally {
    window.store.setState({ isLoading: false });
  }
};

export const signUpSerivce = async (data) => {
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

  window.store.setState({ isLoading: true });

  try {
    const response = await authApi.profile();
    const user = JSON.parse(response.responseText);
    console.log(user);
    // window.router.go("messenger");
    window.store.setState({ user });
  } catch (error) {
    console.error(error);
  } finally {
    window.store.setState({ isLoading: false });
  }
};
