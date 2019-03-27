class App {
    constructor(selector){
        this.container = dpcument.querySelector(selector ||document.body) // gdzie wyświetla
        this.numberOfUsers = 10
        this.genderOfUsers = ''
        this.searchTerm = ''
        this.users = null // zadeklarowana nazwa zmiennej ale nic narazie w niej nie ma

        this.render()// wywoływanie rendera
    }
    render (){
        this.container.innerHTML = '' //czyszczenie kontenera 
        this.renderInput('number')
        this.renderInput('type') //wywoływanie inputa gdzie i ile razy, w tym przypadku x2, i nadanie typów
                                    
        
    }
    renderInput(type){
        const input = document.createElement('input') // tworzenie inputa
        input.setAttribute('type', type) // nadanie typu inputowi
        this.container.appendChild(input)//w czym umieszony
    
       
    
    }
}