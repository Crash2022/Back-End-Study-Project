// users repository - sorting data

const users: UsersType[] = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        age: 23,
        email: "Sincere@april.biz",
        address: {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
        }
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        age: 32,
        email: "Shanna@melissa.tv",
        address: {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
        }
    },
    {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        age: 19,
        email: "Nathan@yesenia.net",
        address: {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
        }
    },
    {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        age: 41,
        email: "Julianne.OConner@kory.org",
        address: {
            "street": "Hoeger Mall",
            "suite": "Apt. 692",
            "city": "South Elvis",
            "zipcode": "53919-4257",
        }
    },
    {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        age: 54,
        email: "Lucio_Hettinger@annie.ca",
        address: {
            "street": "Skiles Walks",
            "suite": "Suite 351",
            "city": "Roscoeview",
            "zipcode": "33263",
        }
    }
]

type UsersType = {
    id: number,
    name: string
    username: string
    age: number
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
    }
}

export const usersRepository = {

    sort() {
        // sort
    }

}