export function passwordIsValid(password: string) {
    const upperRegex = /[A-Z]/
    const numberRegex = /\d/
    if (upperRegex.test(password) && numberRegex.test(password)) {
        return true;
    }
    return false;
}