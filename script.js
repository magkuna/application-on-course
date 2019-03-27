class App {
    constructor(selector){
        this.container = document.querySelector(selector ||document.body) // 1gdzie wyświetla
        this.numberOfUsers = 10 //2
        this.genderOfUsers = '' //3
        this.searchTerm = ''  //4
        this.users = null // 5zadeklarowana nazwa zmiennej ale nic narazie w niej nie ma

        this.render()   // 6wywoływanie rendera
    }
    render (){
        this.container.innerHTML = '' //5czyszczenie kontenera 
        this.renderInput('number', 'numberOfUsers')
        this.renderInput('type', 'genderOfUsers') //10wywoływanie inputa gdzie i ile razy, w tym przypadku x2, i nadanie typów// 14 przypisanie numbers and gender
                                    
        
    }
    renderInput(type,propName){ // 14 najpeirw type, potem name po kroku 13
        const input = document.createElement('input') // 7tworzenie inputa
        input.setAttribute('type', type) // 9nadanie typu inputowi
        input.value.this[propName]     //13przypisanie wartości this numberofusers //15 przypisanie własciwoani w obiekcie

        input.addEventListener(
            'input',
            () => this.numberOfUsers = event.target.value //12 dobieramy się do numberofusers

        )         // 11co ma robić input
        this.container.appendChild(input)//8w czym umieszczony
    
       
    
    }
}

//odwołanie do właściowości w obiekcie w [] np car[propName] (print screen!!!)