export const EMAIL_REGEX =
  /^(?!.*\.{2})[^.\s][a-zA-Z0-9._%+-]*[^.\s]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const PASSWORD_REGEX =
  /^(?=.{8,}$)(?=.*[A-Z])(?=.*\W)(?!.*\s)[a-zA-Z\d\W]+$/;
