class Api {
    get(url,query) {
        return new Promise(res => {
            query.data = makePersons(50);
            res(query);
        })
    }
}

function makePersons(length) {
    let result = [];
    let i = 0;
    while ( i < length) {
        result.push({
            name: makeid(),
            fathername: makeid(),
            surname: makeid()
        })
        i++;
    }
    return result;
}

function makeid() {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    var randomLength = Math.floor(Math.random() * (10 - 3 + 1) + 3);
    for ( var i = 0; i < randomLength; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.charAt(0).toUpperCase() + result.slice(1);
 }


const api = new Api();
let page = 1;
const people = document.getElementById('people');


function getPage(page) {
    api.get('people', {page}).then(response => {
        response.data.forEach(element => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${element.name}</td>
                <td>${element.fathername}</td>
                <td>${element.surname}</td>
            `;
            people.appendChild(row);
        });
    });
    page++;
}

getPage(page);

window.addEventListener("scroll", function(){
    let contentHeight = document.body.offsetHeight;
    let yOffset       = window.pageYOffset;
    let window_height = window.innerHeight;
    let y             = yOffset + window_height;

    if(y >= contentHeight && (page * 50) < 10000000) {
        page++;
        getPage(page);
    }
});


