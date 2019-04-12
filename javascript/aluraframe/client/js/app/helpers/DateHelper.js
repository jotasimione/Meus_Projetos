class DateHelper {
    constructor() {
        throw new Error("Esta classe não pode ser instanciada!");
    }

    static dateToString(date){
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static stringToDate(string){
        if (!/\d{4}-\d{2}-\d{2}/.test(string)){
            throw new Error("Data invalida! Utilize o formato: yyyy-mm-dd");
        }
        return new Date(string.split("-"))
    }
}