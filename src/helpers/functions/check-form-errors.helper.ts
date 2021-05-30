import {AxiosError} from "axios";

export const checkFormErrorsHelper = (errors: AxiosError, action: any) => {
    if (errors && errors.response && errors.response.data && errors.response.data.errors) {
        if (errors.response.data.errors.length > 0) {
            const {errors: responseErrors} = errors.response.data;
            responseErrors.forEach((error: any) => {
                const {field, errors} = error;
                action(field, errors[0])
            })
        }
    }
}

