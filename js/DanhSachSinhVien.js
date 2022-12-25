export class DanhSachSinhVien {
    constructor() {
        this.dssv = [];
    }

    themSV(SinhVien) {
        this.dssv.push(SinhVien);
    };

    xoaSV(index) {
        this.dssv.splice(index, 1);
    }

    suaSV(index, sinhVien) {
        this.dssv[index].maSV = sinhVien.maSV || this.dssv[index].maSV;
        this.dssv[index].hoTen = sinhVien.hoTen || this.dssv[index].hoTen;
        this.dssv[index].lop = sinhVien.lop || this.dssv[index].lop;
        this.dssv[index].ngaySinh = sinhVien.ngaySinh || this.dssv[index].ngaySinh;
        this.dssv[index].email = sinhVien.email || this.dssv[index].email;
        this.dssv[index].gpa = sinhVien.gpa || this.dssv[index].gpa;
    }

    inDanhSach() {
        let content = '';

        content = this.dssv.reduce((tdContent, item, index) => {
            tdContent += `
                <tr id=${index}>
                    <td>${item.maSV}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.lop}</td>
                    <td>${item.ngaySinh}</td>
                    <td>${item.email}</td>
                    <td>${item.gpa}</td>
                    <td>
                        <button type="button" data-action="edit" id="${index}"><i class="fa-regular fa-pen-to-square"></i>Edit</button>
                        <button type="button" data-action="delete" id="${index}"><i class="fa-solid fa-trash-can"></i>Delete</button>
                    </td>
                 </tr>
                `;
            return tdContent;
        }, '');

        return content;
    }
}