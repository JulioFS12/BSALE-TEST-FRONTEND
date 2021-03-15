const productView = document.getElementById('products-section');
const categoryView = document.getElementById('cars');
const form = document.getElementById('form');
const btnLeft = document.getElementById('pg-left');
const btnRight = document.getElementById('pg-right');
var pgCounter = 0;
var category = -1;

const showDocument = ({data}) => {

    productView.innerHTML = '';

    if (data.length <= 0) {
        return productView.innerHTML += `<h4>NO RESULTS</h4>`
    }

    for (let i = 0; i < data.length ; i++) {

        productView.innerHTML += `
        <div class="main-container__card">
            <img src="${data[i].url_image.length < 5? `../assets/empty.jpeg` : data[i].url_image}" class="desing" alt="product">
                <div class="main-container__card__info">
                    <p class="">${!data[i].name ? `empty` : data[i].name}</p>
                    <p class="money">$ ${!data[i].price ? `empty` : data[i].price}</p>
                    <button class="products-section__button">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </div>
        </div>`;
    }

}

const showComboBox = ({data}) => {

    for (let i = 0; i < data.length; i++) {
        const { id, name } = data[i];
        categoryView.innerHTML += `<option value="${id}">${name}</option>`;        
    }

}

const fecthApi = (option, key, second_key) => {

    const options = {
        method: "GET"
    };

    switch (option) {
        case 'allProducts':

            fetch(`http://localhost:5000/products/all?limit=${key}&set=${second_key}`, options)
                .then(response => response.json())
                .then(data => {
                    showDocument(data);
                }).
                catch( res => console.log(res) );
            break;

        case 'categories':

            fetch(`http://localhost:5000/category/all`, options)
                .then(response => response.json())
                .then(data => {
                    showComboBox(data);
                }).
                catch( res => console.log(res) );
            break;

        case 'byName':

            fetch(`http://localhost:5000/products/byname?name=${key}`, options)
                .then(response => response.json())
                .then(data => {
                    showDocument(data);
                }).
                catch( res => console.log(res) );
            break;

        case 'bycategory':

            fetch(`http://localhost:5000/products/bycategory?idCategory=${second_key}&name=${key}`, options)
                .then(response => response.json())
                .then(data => {
                    showDocument(data);
                }).
                catch( res => console.log(res) );
            break;
    }
}


const getAllProducts = () => {
    productView.innerHTML = `WAIT A MINUTE...!`;
    fecthApi('allProducts', 10, 10 * pgCounter);
}

const getByName = (e) => {
    e.preventDefault();
    productView.innerHTML = `WAIT A MINUTE...!`;
    const key = document.getElementById('name').value;

    fecthApi('byName', key, '');

}

const getAllCategories = () => {
    fecthApi('categories', '', '')
}

const getByCategory = (e) => {
    e.preventDefault();
    productView.innerHTML = `WAIT A MINUTE...!`;
    const key = document.getElementById('name').value;

    fecthApi('bycategory', key, category)

}

categoryView.addEventListener('change', (e) => {
    category = categoryView.value;
});

const showRight = () => {
    pgCounter += 1;
    getAllProducts();
}

const showLeft = () => {
    pgCounter -= 1;
    getAllProducts();
}

const start = (e) => {
    e.preventDefault();

    category < 0
        ?getByName(e)
        :getByCategory(e);
}

getAllCategories();
getAllProducts();
btnRight.addEventListener('click', showRight);
btnLeft.addEventListener('click', showLeft);
form.addEventListener('submit', start);


