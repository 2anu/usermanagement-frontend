import * as yup from 'yup';

export const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    status: yup.string().required(),
    mobileNumber: yup.string().max(10).required(),
    dob: yup.date().required(),
    address: yup.string().required(),
});
