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

let editId = -1;

const saveSinhVien = () => {
    let maSV = maSVInput.value;
    let hoTen = hoTenInput.value;
    let lop = lopInput.value;
    let ns = nsInput.value;
    let email = emailInput.value;
    let gpa = gpaInput.value;

    let isDuplicate = listSinhVien.dssv.some((sv) => sv.maSV.toUpperCase() === maSV.toUpperCase());

    if(maSV === '' || hoTen === '' || lop === '' || ns === '' || gpa === ''){
        alert('Ban can dien du cac truong');
    }
    else{
        if(editId >= 0){
            const updateSinhVien = new SinhVien(maSV, hoTen, lop, ns, email, gpa);
            listSinhVien.suaSV(editId, updateSinhVien);
           
            showDanhSach(tdBody);
            setLocalStorage();
    
            editId = -1;
        }
        else {
            if(isDuplicate){
                alert("sinh vien da ton tai");
            }
            else {
                const sinhVien = new SinhVien(maSV, hoTen, lop, ns, email, gpa);
                listSinhVien.themSV(sinhVien);
                showDanhSach(tdBody);
                
                setLocalStorage();
            }
        }
    };
    
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

console.log(listSinhVien);

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

const editSinhVien = (id) => {
    maSVInput.value = listSinhVien.dssv[id].maSV;
    hoTenInput.value = listSinhVien.dssv[id].hoTen;
    lopInput.value = listSinhVien.dssv[id].lop;
    nsInput.value = listSinhVien.dssv[id].ngaySinh;
    emailInput.value = listSinhVien.dssv[id].email;
    gpaInput.value = listSinhVien.dssv[id].gpa;

    editId = id;
}
