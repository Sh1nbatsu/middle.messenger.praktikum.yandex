import Profile from "./profileModel";

const profileApi = new Profile();

export interface updateData {
  email: FormDataEntryValue;
  login: FormDataEntryValue;
  first_name: FormDataEntryValue;
  second_name: FormDataEntryValue;
  display_name: FormDataEntryValue;
  phone: FormDataEntryValue;
}

export const updatePfp = async (data: Record<string, Blob>) => {
  window.store.setState({ isLoading: true });

  console.log(data);

  const formData = new FormData();
  formData.append("avatar", data.avatar);

  try {
    console.log(formData);

    const response = await profileApi.updateAvatar(formData);

    if (response.status === 200) {
      console.log("Success");
      window.store.setState({ user: JSON.parse(response.responseText) });
    }

    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  } finally {
    window.store.setState({ isLoading: false });
  }
};

export const updateData = async (data: updateData) => {
  console.log(data);

  try {
    const response = await profileApi.updateProfile(data);

    if (response.status === 200) {
      console.log("Success", response.responseText);
      window.router.go("settings");
      window.location.reload();
    }
    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data: FormData) => {
  console.log(data);

  try {
    const response = await profileApi.updatePassword(data);

    if (response.status === 200) {
      console.log("Success");
      console.log(response.responseText);
    }
    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  }
};
