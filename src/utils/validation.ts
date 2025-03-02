const loginRegexp = /^(?!\d+$)[a-zA-Z0-9\-_]+$/;

const letterRegexp = /[a-zA-Z]+/;

const passwordRegexp = /^(?=.*[A-Z])(?=.*\d).+$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameRegex = /^(?:([A-Z])([a-z-]*)|([А-ЯЁ])([а-яё-]*))$/;

const phoneRegex = /^\+?\d{10,15}$/;

export function validateLogin(login: string): boolean {
  if (!login) {
    return false;
  }

  if (login.length < 3 || login.length > 20) {
    return false;
  }

  if (!loginRegexp.test(login) || !letterRegexp.test(login)) {
    return false;
  }

  return true;
}

function validatePassword(password: string): boolean {
  if (!password) {
    return false;
  }

  if (password.length < 8 || password.length > 40) {
    return false;
  }

  if (!passwordRegexp.test(password)) {
    return false;
  }

  return true;
}

function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  if (email.length < 5 || email.length > 40) {
    return false;
  }

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

function validateName(name: string): boolean {
  if (!name) {
    return false;
  }

  if (name.length < 2 || name.length > 40) {
    return false;
  }

  if (!nameRegex.test(name)) {
    return false;
  }

  return true;
}

function validatePhone(phone: string): boolean {
  if (!phone) {
    return false;
  }

  if (!phoneRegex.test(phone)) {
    return false;
  }

  return true;
}

export function validateAll(input: HTMLInputElement): {
  isPassed: boolean;
  inputType: string | null;
} {
  const passwordInput = document.querySelector(
    "input[name='password']"
  ) as HTMLInputElement;

  switch (input.name) {
    case "email":
      if (validateEmail(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "display_name":
    case "login":
      if (validateLogin(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "first_name":
      if (validateName(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "second_name":
      if (validateName(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "phone":
      if (validatePhone(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "password":
      if (validatePassword(input.value)) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    case "confirm_password":
      if (input.value === passwordInput.value) {
        return { isPassed: true, inputType: "email" };
      }
      break;
    default:
      return { isPassed: false, inputType: null };
  }

  return { isPassed: false, inputType: null };
}

// Функция validateAll возвращает объект с двумя полями: isPassed и inputType. Я пока оставлю функцию в таком виде, так как изначально планировал использовать ее же для валидации формы в edit_data, но решил изменить подход к демонстрации пользователю полей с ошибками. Возвращать объект планировалось для указания пользователю в каком именно поле допущена ошибка. Если данная логика не понадобится в будущем - я ее удалю
