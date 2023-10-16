import i18next from 'i18next';
import * as yup from 'yup';
import {requireField} from '../formats';

export const REGEX_EMAIL =
  /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const REGEX_PASSWORD = /^[aA-zZ0-9]+$/;
export const REGEX_KATAKANA = /^[\u30A0-\u30FF\u3005]+$/i;
export const REGEX_NUMBER = /^[0-9]+$/;
export const REGEX_BASE64 =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 20;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 17;

export const yupValidate = {
  name: () =>
    yup
      .string()
      .required(() => requireField('Name'))
      .trim(i18next.t('error.trimSpace'))
      .strict(true),
  // .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
  // .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),

  email: () =>
    yup
      .string()
      .required(() => requireField('email'))
      .email(i18next.t('error.emailInvalid'))
      .matches(REGEX_EMAIL, i18next.t('error.emailInvalid')),

  phone: () =>
    yup
      .string()
      .required(() => requireField('Phone'))
      .matches(REGEX_PHONE, i18next.t('error.phoneInvalid')),

  /**
   * @param ref : the name of StyledInputForm want to compare
   * @param isMatchCurrentPassword
   * password() : input password
   * password(ref) : input passwordConfirm, have to be the same with password
   * password(ref, false) : input newPassword, have not to be the same with currentPassword
   */
  password: (ref?: string, isMatchCurrentPassword = true): any => {
    if (ref) {
      // NEW PASSWORD
      if (!isMatchCurrentPassword) {
        // return yupValidate.password();
        // .not([yup.ref(ref), null], i18next.t('error.duplicatePassword'));
        return yup
          .string()
          .required(() => requireField('New password'))
          .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordLength'))
          .test('match', i18next.t('error.passExistSpace'), (val: any) => {
            if (val?.indexOf(' ') >= 0) {
              return false;
            }
            return true;
          });
      }

      // CONFIRM PASSWORD
      return yup
        .string()
        .required(() => requireField('Repeat new password'))
        .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordLength'))
        .oneOf([yup.ref(ref), null], i18next.t('error.passwordNotMatch'));
    }

    return (
      yup
        .string()
        .required(() => requireField('Password'))
        // .trim(i18next.t('error.trimSpace'))
        // .strict(true)
        .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordLength'))
        // .max(PASSWORD_MAX_LENGTH, i18next.t('error.passwordLength'))
        // .matches(REGEX_PASSWORD, i18next.t('error.validatePassword'))
        .test('match', i18next.t('error.passExistSpace'), (val: any) => {
          if (val?.indexOf(' ') >= 0) {
            return false;
          }
          return true;
        })
    );
  },

  firstName: () =>
    yup
      .string()
      .required(() => requireField('First name'))
      .trim(i18next.t('error.trimSpace'))
      .strict(true),
  // .matches(REGEX_KATAKANA, i18next.t('error.katakana')),

  lastName: () =>
    yup
      .string()
      .required(() => requireField('Last name'))
      .trim(i18next.t('error.trimSpace'))
      .strict(true)
      .matches(REGEX_KATAKANA, i18next.t('error.katakana')),

  editFirstName: () =>
    yup.string().trim(i18next.t('error.trimSpace')).strict(true),

  editLastName: () =>
    yup.string().trim(i18next.t('error.trimSpace')).strict(true),
  // .matches(REGEX_KATAKANA, i18next.t('error.katakana')),

  birthday: () => yup.string().required(() => requireField('birthday')),

  age: () =>
    yup
      .string()
      .required(() => requireField('Age'))
      .strict(true)
      .matches(REGEX_NUMBER, i18next.t('error.number')),

  style: () => yup.string().required(() => requireField('Style')),

  formerJob: () => yup.string().required(() => requireField('Former Job')),

  message: () => yup.string().required(() => requireField('Message')),

  blood: () => yup.string().required(() => requireField('Blood')),

  tobacco: () => yup.string().required(() => requireField('Tobacco')),

  sex: () => yup.string().required(() => requireField('Sex')),

  birthPlace: () => yup.string().required(() => requireField('Birth place')),

  clubId: () => yup.string().required(),

  reserveDate: () => yup.string().required(),

  reserveStartTime: () => yup.string().required(),

  reserveNote: () => yup.string().notRequired(),

  reserveTick: () =>
    yup
      .boolean()
      .required()
      .test('match', '', (val: any) => {
        if (val) {
          return true;
        }
        return false;
      }),

  link: () =>
    yup
      .string()
      .required(() => requireField('Url'))
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        i18next.t('error.url'),
      ),
};
