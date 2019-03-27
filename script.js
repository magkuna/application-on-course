class App {
    constructor(selector) {
        this.container = document.querySelector(selector || document.body) // 1gdzie wyświetla
        this.numberOfUsers = 10 //2
        this.genderOfUsers = 'male' //3
        this.searchTerm = ''  //4
        this.focusedElement = null //20 elemtn któy aktualnie jest wybrany bedzie zarzadzany ze stanu
        this.users = null // 5zadeklarowana nazwa zmiennej ale nic narazie w niej nie ma

        this.render()   // 6wywoływanie rendera
    }
    loadUsers() {
        console.log('LOADING') //TWORZENIE CONSOLELOGA NA PRZYCISK 
    }
    render() {
        this.container.innerHTML = '' //5czyszczenie kontenera 
        this.renderInput('number', 'numberOfUsers')
        this.renderInput('type', 'genderOfUsers') //10wywoływanie inputa gdzie i ile razy, w tym przypadku x2, i nadanie typów// 14 przypisanie numbers and gender
        this.renderButton('Załaduj', () => { }) // 19 odniesienie do renderButton                           

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

    renderButton(label, onClick) { // 16tworzenie przycisku (to co napisane, to co bedzie robił)
        const button = document.createElement('button') // 17 tworzenie buttona 
        button.innerText = label // 18

        button.addEventListener(
            'click',
            onClick
        )
        this.container.appendChild(button) // 18 tworzenie akcji i dodawanie go do kontenera 
    }

}

//odwołanie do właściowości w obiekcie w [] np car[propName] (print screen!!!)