/**
 * Functions to validate user inputs, make sure each field is not empty, validate the email address and password.
 * After validation, it returns the success variable and the error object.
 */

export function isEmpty(str) {
    return (!str || 0 === str.length);
}

export function validnum(a) { 
    if(a < 18 || a > 65) 
        return false;
    else 
        return true;
} 

export function validateEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(email)) return true;

    return false;
}

export function validatePassword(password) {
    if (password.length > 6) return true;

    return false;
}

export function validate(form) {
    let error = {};
    let success = true;

    var keys = Object.keys(form);
    var length = keys.length;

    keys.slice(0, length).map(field => {
        if (field !== "error" && field !== "submitted"){
            var { type, value } = form[field];
            if (isEmpty(value)){
                error[field] = 'Your ' + field + ' is required';
                success = false;
            }else{
                error[field] = '';

                if (type === "email" && !validateEmail(value)) {
                    error[field] = 'Enter a valid email address';
                    success = false;
                }else if (type === "password" && !validatePassword(value)) {
                    error[field] = 'Password must be at least 6 characters';
                    success = false;
                }
            }
        }
    });

    return {success, error};
}
