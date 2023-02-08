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
        name: "Leanne Graham",
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

type SortedBy<T> = {
    filedName: keyof T
    direction: 'asc' | 'desc'
}

export const usersRepository = {
    // простой способ сортировки
    sort() {
        // два разных способа сортировки

        // asc (ascending, по возрастанию)
        // return [...users].sort((a,b) => a.age < b.age ? -1 : 1)

        // desc (descending, по убыванию)
        return [...users].sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1)

        // return [...users].sort((a,b) => a.address.city.localeCompare(b.address.city))
    },

    // подробная запись
    /*sortedBy<T>(items: T[], sortBy: SortedBy<T>, thenBy: SortedBy<T>) {
        return [...items].sort((a,b) => {
            if (a[sortBy.filedName] < b[sortBy.filedName]) {
                return sortBy.direction === 'asc' ? -1: 1
            } else {
                return 1
            }
            if (a[sortBy.filedName] > b[sortBy.filedName]) {
                return sortBy.direction === 'asc' ? 1: -1
            } else {
                return 1
            }

            // сортировка по второму свойству

            if (a[thenBy.filedName] < b[thenBy.filedName]) {
                return thenBy.direction === 'asc' ? -1: 1
            } else {
                return 1
            }

            if (a[thenBy.filedName] > b[thenBy.filedName]) {
                return thenBy.direction === 'asc' ? 1: -1
            } else {
                return 1
            }
        })
    }*/

    // более короткая запись через цикл
    // с помощью rest-оператора можем передавать любое количество объектов без массива
    sortedBy<T>(items: T[], ...sortBy: SortedBy<T>[]) {

        return [...items].sort((a, b) => {
            for (let sortConfig of sortBy) {
                if (a[sortConfig.filedName] < b[sortConfig.filedName]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.filedName] > b[sortConfig.filedName]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
            }
            return 0
        })
    }
}

// yarn ts-node .\src\repositories\users-repository.ts - запустить консоль
// console.log(usersRepository.sort())

console.log(usersRepository.sortedBy(users,
        // сперва идет сортировка по имени
        {filedName: 'name', direction: 'asc'},
        // далее по возрасту (в случае, если значение первого свойства совпали)
        {filedName: 'age', direction: 'desc'}
    )
)