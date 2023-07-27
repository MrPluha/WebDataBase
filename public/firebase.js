
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// код для инициализации Firebase и других функций
const firebaseConfig = {
    apiKey: "AIzaSyAtxmRfC7FDDxJJ3J9XdoelS75H6JpJfEA",
    authDomain: "data-collection-website-ba175.firebaseapp.com",
    databaseURL: "https://data-collection-website-ba175-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "data-collection-website-ba175",
    storageBucket: "data-collection-website-ba175.appspot.com",
    messagingSenderId: "113458601245",
    appId: "1:113458601245:web:c48f4d4cb146cabf9c95f4",
    measurementId: "G-PTTB7LY9K2"
};

  // Инициализация Firebase

firebase.initializeApp(firebaseConfig);

import {getDatabase, set, get, update, remove, ref, child} 
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"



  var enteredPassword = ""; // Переменная для хранения введенного пароля

function checkPassword() {
    enteredPassword = document.getElementById("passwordInput").value;

    // Здесь можно добавить код для проверки пароля.
    // Например, можно сравнить введенный пароль с заранее заданным паролем.

    // Если пароль правильный, отображаем форму для ввода данных о транспорте.
    if (enteredPassword === "ваш_пароль") { // Замените "ваш_пароль" на реальный пароль
    document.getElementById("transportForm").style.display = "block";
    } else {
    alert("Неправильный пароль! Попробуйте еще раз.");
    }
}

function submitForm() {
    var transport = document.getElementById("transportInput").value;
    var mileage = document.getElementById("mileageInput").value;

    // Получаем ссылку на коллекцию "транспорт" в Firestore
    var db = firebase.firestore();
    var transportRef = db.collection("транспорт");

    // Добавляем данные о транспорте в коллекцию "транспорт"
    transportRef.add({
    модель: transport,
    пробег: mileage
    })
    .then((docRef) => {
    console.log("Данные успешно отправлены! ID документа:", docRef.id);
    })
    .catch((error) => {
    console.error("Ошибка при отправке данных:", error);
    });
}