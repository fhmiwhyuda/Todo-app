//mendapatkan semua element yang dibutuhkan
const inputBox = document.querySelector(".inputfield input");
const addButton = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todolist");
const clearAll = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //mendapatkan nilai yang diinputkan user
    if(userData.trim() != 0){ //jika nilai yang diinputkan hanya berupa space
        addButton.classList.add("active"); //mengaktifkan tombol add
    }else{
        addButton.classList.remove("active"); //menonaktifkan tombol add
    }
}

showTask(); //memanggil function

//jika user menklik tombol add
addButton.onclick = ()=> {
    let userData = inputBox.value; //mendapatkan nilai yang diinputkan user
    let getLocalStorage = localStorage.getItem("Task Baru"); //mengambil penyimpanan local
    if(getLocalStorage == null){ //jika penyimpanan local kosong
        listArr = []; //membuat array baru
    }else{
        listArr = JSON.parse(getLocalStorage); //mengubah string json menjadi objek js
    }
    listArr.push(userData); //menambahkan data user
    localStorage.setItem("Task Baru", JSON.stringify(listArr)); //mengubah objek js menjadi string json
    showTask(); //memanggil function
    addButton.classList.remove("active"); //menonaktifkan tombol add
}

//function untuk menambahkan tasklisk dalam tag ul
function showTask() {
    let getLocalStorage = localStorage.getItem("Task Baru"); //mengambil penyimpanan local
    if(getLocalStorage == null){ //jika penyimpanan local kosong
        listArr = []; //membuat array baru
    }else{
        listArr = JSON.parse(getLocalStorage); //mengubah string json menjadi objek js
    }
    const pending = document.querySelector(".pending");
    pending.textContent = listArr.length; //jumlah task yang belum diselesaikan
    if (listArr.length > 0) { //jika array berjumlah 0
        clearAll.classList.add("active"); //mengaktifkan tombol clear all
    }else{
        clearAll.classList.remove("active"); //menonaktifkan tombol clear all
    }
    let newliTag = '';
    listArr.forEach((element, index) => {
        newliTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newliTag; //menambahkan li tag dalam tag ul pada html
    inputBox.value = ""; //setelah tugas ditambahkan, set inputfield menjadi kosong
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Task Baru"); //mengambil penyimpanan local
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //hapus li yang diindeks tertentu
    //setelah menghapus li perbarui penyimpanan lokal
    localStorage.setItem("Task Baru", JSON.stringify(listArr)); //mengubah objek js menjadi string json
    showTask(); //memanggil function
}

//clear all function
clearAll.onclick =()=> {
    listArr = []; //mengosongkan array
    //setelah menghapus semua tugas perbarui penyimpanan lokal
    localStorage.setItem("Task Baru", JSON.stringify(listArr)); //mengubah objek js menjadi string json
    showTask(); //memanggil function
}