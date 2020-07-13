
const cities = []
const DOM = {}
const displayFunctions = {
    card: drawCard
}
function createCity(cityName, cityImage) {
    return {
        id: Math.round(Math.random() * 999999),
        cityName,
        cityImage,
        likes: 0
    }
}

(function () {
    DOM.cityNameInput = $('#cityNameInput')
    DOM.cityImageInput = $('#cityImageInput')
    DOM.addCityButton = $('#addCityButton')
    DOM.citiesDiv = $('#citiesDiv')

    DOM.addCityButton.click(function () {
        if (!cityNameInput.value || !cityImageInput.value) return alert("Please enter all the fields.")
        cities.push(createCity(cityNameInput.value, cityImageInput.value))
        draw(cities, DOM.citiesDiv, "card")
    })

}())

function draw(data, containerDiv, displayType) {
    if (!Array.isArray(data)) return
    if (typeof containerDiv !== 'object') return
    if (typeof displayType !== 'string') return
    clearDom()
    const relevantFunction = displayFunctions[displayType]
    cities.forEach(city => {
        containerDiv.append(relevantFunction(city))
    })

}

function clearDom() {
    DOM.citiesDiv.html('')
}

function drawCard(cityDetails) {
    const { cityName, cityImage, id, likes } = cityDetails
    let mainCityDiv = document.createElement('div')
    mainCityDiv.id = id
    mainCityDiv.classList.add('card')
    mainCityDiv.style.width = '18 rem'

    let mainCityImage = document.createElement('img')
    mainCityImage.classList.add('card-img-top')
    mainCityImage.src = cityImage
    mainCityDiv.append(mainCityImage)

    let secondCityDiv = document.createElement('div')
    secondCityDiv.classList.add('card-body')
    mainCityDiv.append(secondCityDiv)

    let cityNameH = document.createElement('h5')
    cityNameH.classList.add('card-title')
    cityNameH.innerHTML = cityName
    secondCityDiv.append(cityNameH)

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('btn')
    deleteButton.classList.add('btn-danger')
    deleteButton.innerHTML = "🗑"
    deleteButton.addEventListener("click", function () {
        deleteCityFromArray(id)
    })
    secondCityDiv.append(deleteButton)

    let likeButton = document.createElement("button")
    likeButton.classList.add("btn")
    likeButton.classList.add("btn-primary")
    likeButton.innerHTML = `👍`
    likeButton.addEventListener("click", function () {
        handleLikes(id)
    })
    secondCityDiv.append(likeButton)

    let dislikeButton = document.createElement("button")
    dislikeButton.classList.add("btn")
    dislikeButton.classList.add("btn-info")
    dislikeButton.innerHTML = "👎"
    dislikeButton.addEventListener("click", function(){
        const selectedCity = cities.find(city => city.id === id)
        selectedCity.likes = selectedCity.likes - 1
        setTimeout(() => {
            draw(cities, DOM.citiesDiv, "card")
        }, 2000);

    })
    secondCityDiv.append(dislikeButton)

    const likesView = document.createElement("span")
    likesView.innerHTML = likes
    secondCityDiv.append(likesView)

   
    
    return mainCityDiv


}

function handleLikes(id) {
    const selectedCity = cities.find(city => city.id === id)
    selectedCity.likes = selectedCity.likes + 1
    setTimeout(() => {
        draw(cities, DOM.citiesDiv, "card")
    }, 2000);
}

function deleteCityFromArray(id) {
    const selectedCityIndex = cities.findIndex(city => city.id === id)
    cities.splice(selectedCityIndex, 1)
    draw(cities, DOM.citiesDiv, "card")

}

