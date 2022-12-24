export class DanhSachSinhVien{
    constructor() {
        this.dssv = [];
    }

    themSV(SinhVien){
        if(this.dssv.length === 0){
            this.dssv.push(SinhVien);
        }
        else {
            for(let i = 0; i < this.dssv.length; i++){
                if(this.dssv[i].maSV !== SinhVien.maSV){
                    this.dssv.push(SinhVien);
                }
                else {
                    alert('Sinh vien da ton tai');
                }
            }
        }
    };

    xoaSV(index){
        this.dssv.splice(index, 1);
    }

    inDanhSach(){
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
                        <button type="button" data-action="edit" id="${index}">EDIT</button>
                        <button type="button" data-action="delete" id="${index}">DELETE</button>
                    </td>
                 </tr>
                `;
                return tdContent;
        }, '');

        return content;
    }
}