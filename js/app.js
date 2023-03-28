const som = document.querySelector("#som")
const usd = document.querySelector("#usd")
const euro = document.querySelector("#euro")


// som.addEventListener("input", (e) => {
//     console.log(e.target.value);
//     const request = new XMLHttpRequest ()
//     request.open("GET", "data.json")
//     request.setRequestHeader("Content-Type", "application/json")
//     request.send()
//     request.addEventListener("load", () => {
//         console.log(request.response);
//         const data = JSON.parse(request.response)
//         usd.value = (e.target.value / data.usd).toFixed(2)
//     })
// })


const convert = (elem, target, target2) => {
    elem.addEventListener("input", () => {
        const request = new XMLHttpRequest()
        request.open("GET", "data.json")
        request.setRequestHeader("Content-Type", "application/json")
        request.send()
        request.addEventListener("load", () => {
            const data = JSON.parse(request.response)
            if(elem === som){
                target.value = (elem.value / data.usd).toFixed(2)
                target2.value = (elem.value / data.euro).toFixed(2)
            } else if (elem === usd){
                target.value = (elem.value * data.usd).toFixed(2)
                target2.value = (elem.value * data.usd / data.euro).toFixed(2)
            } else if (elem === euro) {
                target.value = (elem.value * data.euro).toFixed(2);
                target2.value = (elem.value * data.euro / data.usd).toFixed(2)
            }
            elem.value === "" ? ((target.value = "")(target2.value = "")) : null;
            // elem.value === "" ? ((target.value = "") && (target2.value = "")) : null;

        })
    })
}

convert(som, usd, euro)
convert(usd, som, euro)
convert(euro, som, usd)



function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(data)
    })
    .then(response => {
    if (response.ok) {
        $('#modalTitle').text('Успех');
        $('#modalBody').text('Данные успешно отправлены');
        $('#exampleModal').modal('show');
    } else if (response.status === 400) {
        $('#modalTitle').text('Ошибка');
        $('#modalBody').text('Неверный запрос');
        $('#exampleModal').modal('show');
    } else {
        $('#modalTitle').text('Ошибка');
        $('#modalBody').text('Произошла ошибка на сервере');
        $('#exampleModal').modal('show');
        }
    })
    .catch(error => {
        $('#modalTitle').text('Ошибка');
        $('#modalBody').text('Произошла ошибка при отправке запроса');
        $('#exampleModal').modal('show');
    });
}

  // Пример использования функции postData
    const data = { name: 'John', email: 'john@example.com' };
    postData('/api/users', data);



