class App {
    constructor(selector) {
        this.container = document.querySelector(selector || document.body) // 1gdzie wyświetla
        this.numberOfUsers = 10 //2
        this.genderOfUsers = 'male' //3
        this.searchTerm = ''  //4
        this.focusedElement = null //20 elemtn któy aktualnie jest wybrany bedzie zarzadzany ze stanu
        this.users = null // 5zadeklarowana nazwa zmiennej ale nic narazie w niej nie ma
        this.isLoading = false   //28 czy tanasza aplikacja w tym momencie ładuje dane
        this.isError = false               //32
        this.render()   // 6wywoływanie rendera
    }
    loadUsers() {
        if (this.isLoading) return // 30

        this.isLoading = true //29
        this.isError = false // 31
        this.render() // 42


        fetch(
            'https://randomuser.me/api' +
            '?results=' + this.numberOfUsers + //27 ile razy ma się wyświetlić
            '&gender=' + this.genderOfUsers
        )  // 25 tworzenie fetcha bo najpierw było loading
            .then(response => response.json())
            .then(data => {
                this.users = data.results
                console.log(this)
                this.isLoading = false // 29
            })      // //23TWORZENIE CONSOLELOGA NA PRZYCISK

            .catch(() => this.isError = true) //33
            .finally(() => {

                this.Loading = false//34   szybkie nacisniecie przycisku ale pokazuje pojedynczo
                this.render() // 43 odniesienie do loadUsers
            })

    }
    render() {
        this.container.innerHTML = '' //5czyszczenie kontenera 
        this.renderInput('number', 'numberOfUsers')
        this.renderInput('type', 'genderOfUsers') //10wywoływanie inputa gdzie i ile razy, w tym przypadku x2, i nadanie typów// 14 przypisanie numbers and gender
        this.renderButton('Załaduj', this.loadUsers.bind(this)) // 19 odniesienie do renderButton // 24 odniesienie z loadUSers //  26 zmiana z samo load.. bo pokazywalo w console.logu Załąduj,              
        this.renderContent() // 40 zeby sie urochomiła funkcja rendercontent
    }
    renderContent() { // 35 tworzenie nowego diva
        const getContent = () => {  //42 tworzenie bo nie pokazuje się ładuje podczas ładowania stron//
        
            if (this.isLoading) {
                return "Ładuje..."  // 36 jeśli łąduje strone to do diva wcisnij ładuje//
            }
            if (this.isError) {
               return 'Wystąpił błąd! Spróbuje ponownie!' // 37jeśli nie łąduje strone to do diva wcisnij ładuje//
            }
            if (this.users === null) {
                return 'Kliknij przycisk żeby załadować' // 38//
            }
            if (this.users && this.users.length === 0) {
                return 'Nie ma żadnych użytkowników!' // 39//
            }
            if (this.users) {
                return 'OK!'// 41 wyświetlanie komunikatu jesli załadowane//
            }
        }
        const div = document.createElement('div')// przeniesienie tego z góry tutaj, i dodatnie div innerTexy= get Content

        div.innerText = getContent() // 

        this.container.appendChild(div)
    }
    renderButton(label, onClick) { // 16tworzenie przycisku (to co napisane, to co bedzie robił)
        const button = document.createElement('button') // 17 tworzenie buttona 
        button.innerText = label // 18

        button.addEventListener(
            'click',
            onClick
        )
        this.container.appendChild(button) // 18 tworzenie akcji i dodawanie go do kontenera 
    }
    renderInput(type, propName) { // 14 najpeirw type, potem name po kroku 13 (krok 15)
        const input = document.createElement('input') // 7tworzenie inputa
        input.setAttribute('type', type) // 9nadanie typu inputowi
        input.value = this[propName]     //13przypisanie wartości this numberofusers //15 przypisanie własciwoani w obiekcie

        input.addEventListener(
            'input',
            (event) => {
                this[propName] = event.target.value //12 dobieramy się do numberofusers// zmiana do zmiany 15
                this.focusedElement = propName // 22 odwołanie do this.focusedElement
                this.render() // 16 wyrenderowanie 
            }

        )         // 11co ma robić input
        this.container.appendChild(input)//8w czym umieszczony
        if (this.focusedElement === propName) input.focus()// 21 owłowanie do construcotra


    }


}

//odwołanie do właściowości w obiekcie w [] np car[propName] (print screen!!!)