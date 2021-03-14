const tasksView = document.getElementById('products-section');

const showDocument = ({ data }) => {

    tasksView.innerHTML = '';

    if(data.length <= 0){
        return tasksView.innerHTML += `NO RESULTS`
    }

    for (let i = 0; i < 20; i++) {

        const { url_image = '', name, price } = data[i];

        tasksView.innerHTML += `
        <div class="main-container__card">
            <img src="${!url_image?`../assets/empty.jpeg`:url_image}" class="desing" alt="product">
                <div class="main-container__card__info">
                    <p class="">${!name?`empty`:name}</p>
                    <p class="money">$ ${!price?`empty`:price}</p>
                    <button class="products-section__button">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </div>
        </div>`;
    }

}

const getAll = () => {
    tasksView.innerHTML = `WAIT A MINUTE...!`;
    fecthApi('all', '');
}

const getByName = (e) => {
    e.preventDefault();
    tasksView.innerHTML = `WAIT A MINUTE...!`;
    const key = document.getElementById('name').value;

    fecthApi('byName', key);
}

const fecthApi = (option, key) => {

    const options = {
        method: "GET"
    };

    switch (option) {
        case 'all':

            fetch(`http://localhost:5000/products/all`, options)
                .then(response => response.json())
                .then(data => {
                    showDocument(data)
                })
                .catch(err => {
                    console.log(err);
                })
            break;

        case 'byName':

            fetch(`http://localhost:5000/products/byname?name=${key}`, options)
                .then(response => response.json())
                .then(data => {
                    showDocument(data);
                })
                .catch(err => {
                    // showErrorDocument();
                });
            break;

        case 'bycategory':

            fetch(`http://localhost:5000/products/bycategory?idCategory=${key}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err);
                });
            break;
    }
}

// getAll();
document.getElementById('form').addEventListener('submit', getByName);

