import { SinhVien } from "./SinhVien.js";
import { DanhSachSinhVien } from "./DanhSachSinhVien.js";

let listSinhVien = new DanhSachSinhVien();

const maSVInput = document.getElementById('maSV');
const hoTenInput= document.getElementById('hoTen');
const lopInput = document.getElementById('lop');
const nsInput = document.getElementById('ns');
const emailInput = document.getElementById('email');
const gpaInput = document.getElementById('gpa');

let tdBody = document.getElementById('sinhVien');

const saveSinhVien = () => {
    let maSV = maSVInput.value;
    let hoTen = hoTenInput.value;
    let lop = lopInput.value;
    let ns = nsInput.value;
    let email = emailInput.value;
    let gpa = gpaInput.value;

    if(maSV === '' || hoTen === '' || email === '' || lop === '' || ns === '' || gpa === ''){
        alert('Ban can dien du cac truong');
    }
    else{
        const sinhVien = new SinhVien(maSV, hoTen, lop, ns, email, gpa);
        listSinhVien.themSV(sinhVien);
        showDanhSach(tdBody);

        setLocalStorage();
    }
    
    maSVInput.value = '';
    hoTenInput.value = '';
    lopInput.value = '';
    nsInput.value = '';
    emailInput.value = '';
    gpaInput.value = '';
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    saveSinhVien();
});

const showDanhSach = (domSinhVien) => {
    domSinhVien.innerHTML = listSinhVien.inDanhSach();
}

const setLocalStorage = () => {
    let danhSachSinhVien = listSinhVien.dssv;
    localStorage.setItem('listSV', JSON.stringify(danhSachSinhVien));
}

const getLocalStorage = () => {
    let danhSachSinhVien = localStorage.getItem('listSV');
    if(danhSachSinhVien){
        listSinhVien.dssv = JSON.parse(danhSachSinhVien);
        showDanhSach(tdBody);
    }
}
getLocalStorage();

const listSV = document.getElementById('sinhVien');

listSV.addEventListener('click', (e) => {
    const target = e.target;
    
    const action = target.dataset.action;

    const idSinhVien = Number(e.target.id);

    action === "edit" && editSinhVien(idSinhVien);
    action === "delete" && deleteSinhVien(idSinhVien);
})

const deleteSinhVien = (id) => {
    listSinhVien.xoaSV(id);
    setLocalStorage();
    showDanhSach(tdBody);
}

