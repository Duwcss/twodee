// Xử lý sự kiện khi trang web được tải
document.addEventListener("DOMContentLoaded", function () {
    // Lấy dữ liệu từ Local Storage (nếu có)
    var existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Hiển thị thông tin sản phẩm lên trang thanh toán
    displayCheckout(existingProducts);
});

// Hàm hiển thị thông tin sản phẩm lên trang thanh toán
function displayCheckout(products) {
    var checkoutList = document.getElementById("checkoutList");

    // Xóa nội dung cũ của danh sách thanh toán
    checkoutList.innerHTML = "";

    var totalAmount = 0;

    // Thêm từng sản phẩm vào danh sách thanh toán
    products.forEach(function (product) {
        var row = checkoutList.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = '<img src="' + product.img + '" alt="Ảnh Sản Phẩm" style="width: 50px; height: 50px;">';
            cell2.textContent = product.name;
            cell3.textContent = product.price;
            cell4.textContent = product.size;
            cell5.textContent = product.quantity;

            totalAmount += parseFloat(product.price) * parseInt(product.quantity)*1000 ;
    });
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('de-DE');
}

$(document).ready(function(){
    var i =1;
    //kiểm tra tên
    var txtTen = $("#txtTen");
    var tbTen = $("#tbTen");
    function KiemtraTen(){
        var re = /^[A-Z][a-z]{1,8}( [A-Z][a-z]{1,8})*$/;
        if(txtTen.val() == ""){
            tbTen.html("* Bắt buộc nhập");
            return false;
        }
        if(!re.test(txtTen.val())){
            tbTen.html("* Tên không dấu: Xxx Xxx Xxx");
            return false;
        }
        tbTen.html("*");
        return true;
    }
    txtTen.blur(KiemtraTen);

    //Kiểm tra email
    var txtEmail = $("#txtEmail");
    var tbEmail = $("#tbEmail")
    function KiermtraEmail(){
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
        if(txtEmail.val() == ""){
            tbEmail.html("* Bắt buộc nhập");
            return false;
        }
        if(!re.test(txtEmail.val())){
            tbEmail.html("* Nhập đúng định dạng!");
            return false;
        }
        tbEmail.html("*")
        return true;
    }
    txtEmail.blur(KiermtraEmail);

    //Kiểm tra số điện thoại
    var txtSdt = $("#txtSdt")
    var tbSdt = $("#tbSdt")
    function KiemtraSdt(){
        var re = /^(03|07|08|09){1}[0-9]{8}$/;
        if(txtSdt.val()==""){
            tbSdt.html("* Bắt buộc nhập");
            return false;
        }
        if(!re.test(txtSdt.val())){
            tbSdt.html("*Nhập theo định dạng:03xxx/07xxx/08xxx/09xxx !");
            return false;
        }
        tbSdt.html("*");
        return true;
    }
    txtSdt.blur(KiemtraSdt);

    //Kiểm tra địa chỉ
    var txtDC = $("#txtDC");
    var tbDC = $("#tbDC");
    function KiemtraDC(){
        if(txtDC.val()==""){
            tbDC.html("* Bắt buộc nhập");
            return false;
        }
        tbDC.html("*");
        return true;
    }
    txtDC.blur(KiemtraDC);

    $("#btnSave").click(function() {
        if (!KiemtraTen() || !KiermtraEmail() || !KiemtraSdt() || !KiemtraDC()) {
            $("#thongbao").html("Mời bạn nhập đúng và đẩy đủ thông tin");
            return false;
        }
        var hoten = txtTen.val();
        var email = txtEmail.val();
        var sdt = txtSdt.val();
        var diachi = txtDC.val();
        var phuongThuc = document.querySelector(".phuongThuc:checked").value;
        var them = "<tr><td>" + (i++) + "</td><td>" + hoten + "</td><td>" + email + "</td><td>" + sdt + "</td><td>" + diachi +"</td><td>"+ totalAmount.innerHTML +"<sup>đ</sup></td><td>"+ phuongThuc+"</td></tr>";
        $("table #save").append(them);
        alert("Đặt hàng thành công");
        //Trở về trang chủ sau khi đặt hàng
        // setTimeout(function() {
        //     window.location.href = "../html/Trangchu.html";
        // }, 3000);
        return false;
        
    });
});