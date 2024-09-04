
enum GENDER {
    MALE = "Male",
    FEMALE = "Female",
}


export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    gender: GENDER
    SSN?: string;
}