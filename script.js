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
    renderForm() {

        const formsDiv = document.createElement('div')
        formsDiv.className = 'container form-container'

        const numberInput = this.renderInput('number', 'numberOfUsers')
        const textInput = this.renderInput('text', 'genderOfUsers') //10wywoływanie inputa gdzie i ile razy, w tym przypadku x2, i nadanie typów// 14 przypisanie numbers and gender
        const loadButton = this.renderButton('Załaduj', this.loadUsers.bind(this)) // 19 odniesienie do renderButton // 24 odniesienie z loadUSers //  26 zmiana z samo load.. bo pokazywalo w console.logu Załąduj,              

        formsDiv.appendChild(numberInput)
        formsDiv.appendChild(textInput)
        formsDiv.appendChild(loadButton)

        this.container.appendChild(formsDiv)
        
        if (this.focusedElement === 'numberOfUsers') numberInput.focus()
        if (this.focusedElement === 'genderOfUsers') textInput.focus()
    }
        
        render() {
            this.container.innerHTML = '' //5czyszczenie kontenera 
    
            this.renderForm()
    
            this.renderContent() // 40 zeby sie urochomiła funkcja rendercontent
    
    
        }
        
        
    renderContent() {// 35 tworzenie nowego diva
        const renderUser = (user) => {
            const userDiv = document.createElement('div')
            
            const avatarDiv = document.createElement('div')
            const avatar = document.createElement('img')
            const dataDiv = document.createElement('div')
            const nameDiv = document.createElement('div')
            const emailDiv = document.createElement('div')
      
            userDiv.className = 'user__container'
            avatarDiv.className = 'user__avatar-container'
            avatar.className = 'user__avatar'
            dataDiv.className = 'user__data-container'
            nameDiv.className = 'user__name'
            emailDiv.className = 'user__email'
      
            nameDiv.innerText = `${user.name.first} ${user.name.last}`
            emailDiv.innerText = user.email
            avatar.setAttribute('src', user.picture.thumbnail)
      
            avatarDiv.appendChild(avatar)
      
            dataDiv.appendChild(nameDiv)
            dataDiv.appendChild(emailDiv)
      
            userDiv.appendChild(avatarDiv)
            userDiv.appendChild(dataDiv)
      
            return userDiv
          }

        const renderUsers = () => {
            const usersContainerDiv = document.createElement('div')

            this.users.forEach(
                user => {
                    const userDiv = document.createElement('div')
                    userDiv.innerText = `${user.name.first} ${user.name.last}`
                    usersContainerDiv.appendChild(renderUser(user)// 45 tworzenie całego for Each

                    )

                }
            )
            return usersContainerDiv
        }
        const getContent = () => {  //42 tworzenie bo nie pokazuje się ładuje podczas ładowania stron//
         
            if (this.isLoading) {
                return document.createTextNode("Ładuje...")  // 36 jeśli łąduje strone to do diva wcisnij ładuje//
            }
            if (this.isError) {
                return document.createTextNode('Wystąpił błąd! Spróbuje ponownie!') // 37jeśli nie łąduje strone to do diva wcisnij ładuje//
            }
            if (this.users === null) {
                return document.createTextNode('Kliknij przycisk żeby załadować') // 38//
            }
            if (this.users && this.users.length === 0) {
                return document.createTextNode('Nie ma żadnych użytkowników!') // 39//
            }
            if (this.users) {
                return renderUsers() // 41 wyświetlanie komunikatu jesli załadowane// // 46 zmiana nazwy na renderUser()
            }
        }
        const div = document.createElement('div')// przeniesienie tego z góry tutaj, i dodatnie div innerTexy= get Content
        div.className = 'container content-container'

        div.appendChild(getContent()) // 43

        this.container.appendChild(div)
    }
    renderButton(label, onClick) { // 16tworzenie przycisku (to co napisane, to co bedzie robił)
        const button = document.createElement('button')
        button.className = 'button' // 17 tworzenie buttona 
        button.innerText = label // 18

        button.addEventListener(
            'click',
            onClick
        )
        return button // 18 tworzenie akcji i dodawanie go do kontenera 
    }
    renderInput(type, propName) { // 14 najpeirw type, potem name po kroku 13 (krok 15)
        const input = document.createElement('input')
        input.className = 'input' // 7tworzenie inputa
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
        return input//8w czym umieszczony
        if (this.focusedElement === propName) input.focus()// 21 owłowanie do construcotra


    }


}

//odwołanie do właściowości w obiekcie w [] np car[propName] (print screen!!!)