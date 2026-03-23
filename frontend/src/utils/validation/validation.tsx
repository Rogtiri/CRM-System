import * as Yup from 'yup'

export const validationRegister = Yup.object().shape({
    username: Yup.string()
    .required('Імя обовязкове')
    .min(6, 'Імя має містити не менше 6 символів'),

    email: Yup.string()
    .required('Email обовязковий')
    .matches(
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
    'Некоректне написання email'),

    password: Yup.string()
    .required('Пароль обовязковий')
    .min(8)
    .matches(/[A-Z]/, 'Пароль має містити хоча б одну велику літеру')
    .matches(/[a-z]/, 'Пароль має містити хоча б одну маленьку літеру')
    .matches(/[0-9]/, 'Пароль має містити хоча б одну цифру')
    .matches(/[!@$#*&?%]/, 'Пароль має містити хоча б один спецсимвол'),

    confirmPassword: Yup.string()
    .required('Пароль обовязковий')
    .oneOf([Yup.ref('password')], 'Паролі мають співпадати'),
    
    agreeToTerms: Yup.boolean()
    .oneOf([true], 'Необхідно погодитись з умовами')
})

export const validationLogin = Yup.object().shape({
    email: Yup.string()
    .required('Email обовязковий')
    .matches(
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
    'Некоректне написання email'),

    password: Yup.string()
    .required('Ви не введи пароль')
})



