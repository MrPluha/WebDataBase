const users = {
    user1: {
        // здесь может быть дополнительная информация о пользователе
    },
    // добавьте здесь других пользователей, если нужно
};

let currentUser;

function checkLogin() {
    const login = document.getElementById("login").value;

    if (users[login]) {
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("dataDiv").style.display = "block";
        currentUser = login; // Save the current user
    } else {
        alert("Неверный логин");
    }
}

// Функция для заполнения выпадающего списка транспортными средствами
function populateVehiclesSelect() {
    var select = document.getElementById("vehicleSelect");

    // Очищаем список перед заполнением
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    // Добавляем плейсхолдер
    var placeholder = document.createElement("option");
    placeholder.text = "Выберите транспорт";
    placeholder.value = "";
    select.add(placeholder);

    // Получаем ссылку на узел транспортных средств в базе данных
    var dbRef = firebase.database().ref('Tehnikas nosaukums');

    // Получаем все доступные транспортные средства
    dbRef.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // Добавляем каждое транспортное средство в выпадающий список
            var option = document.createElement("option");
            option.text = childData.name; // Используем имя транспортного средства, предполагая, что у вас есть поле "name" для каждого транспорта
            option.value = childKey;
            select.add(option);
        });
    });
}

// Вызываем эту функцию при загрузке страницы
window.onload = populateVehiclesSelect;


function showInputFields() {
    const vehicle = document.getElementById("vehicleSelect").value;

    if (vehicle) {
        document.getElementById("inputFields").style.display = "block";
    } else {
        document.getElementById("inputFields").style.display = "none";
    }
}

function submitData() {
    const vehicle = document.getElementById("vehicleSelect").value;
    const mileage = document.getElementById("mileage").value;
    const fuel = document.getElementById("fuel").value;
    const date = new Date().toISOString(); // Get the current date and time

    const data = {
        user: currentUser,
        vehicle: vehicle,
        mileage: mileage,
        fuel: fuel,
        date: date
    };

    // Send the data to Firebase
    firebase.database().ref('Data').push(data);
}
