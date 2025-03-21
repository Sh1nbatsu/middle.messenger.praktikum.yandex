import Profile from "./profileModel";

const profileApi = new Profile();

export const updatePfp = async (data) => {
  window.store.setState({ isLoading: true });

  console.log(data);

  const formData = new FormData();
  formData.append("avatar", data.avatar);

  try {
    console.log(formData);

    const response = await profileApi.updateAvatar(formData);

    if (response.status === 200) {
      console.log("success");
    }

    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  } finally {
    window.store.setState({ isLoading: false });
    window.location.reload();
  }
};

export const updateData = async (data) => {
  console.log(data);

  try {
    const response = await profileApi.updateProfile(data);

    if (response.status === 200) {
      console.log("success", response.responseText);
      window.router.go("settings");
      window.location.reload();
    }
    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data) => {
  console.log(data);

  try {
    const response = await profileApi.updatePassword(data);

    if (response.status === 200) {
      console.log("success");
      console.log(response.responseText);
    }
    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  }
};
