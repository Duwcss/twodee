
function saveProduct() {
    // Lấy giá trị từ các trường input
    var productImg = document.getElementById("img-product").src
    var productName = document.getElementById("productName").innerText;
    var productPrice = document.getElementById("productPrice").innerText;
    // var productSize = document.getElementsByClassName("productSize").value;
    var selectedSize = document.querySelector('input[name="productSize"]:checked');
    var productSize = selectedSize ? selectedSize.value : null;
    var productQuantity = document.getElementById("quantity").value;

    if (productSize == null) {
        alert("Vui lòng chọn kích thước sản phẩm!");
        return; // Dừng hàm nếu size rỗng
    }

    // Tạo đối tượng chứa thông tin sản phẩm
    var product = {
        img: productImg,
        name: productName,
        price: productPrice,
        size: productSize,
        quantity: productQuantity
    };

    // Lấy dữ liệu từ Local Storage (nếu có)
    var existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Thêm sản phẩm mới vào danh sách
    existingProducts.push(product);

    // Lưu danh sách sản phẩm vào Local Storage
    localStorage.setItem("products", JSON.stringify(existingProducts));

    // Hiển thị thông báo
    alert("Thêm vào giỏ hàng thành công!");

    window.location.href = "../../GioHang.html";
}
function testToTalAmount() {
    var test = document.getElementById("totalAmount").innerText
    console.log(test)
    if (test == 0) {
        alert("Chưa có sản phẩm nào trong giỏ hàng!");
        return false;
    }
        // Chuyển hướng đến trang ThanhToan.html nếu có sản phẩm trong giỏ hàng
        window.location.href = "../html/ThanhToan.html";
}
document.addEventListener("DOMContentLoaded", function () {
    // Lấy dữ liệu từ Local Storage (nếu có)
    var existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Hiển thị thông tin sản phẩm lên trang web
    displayProducts(existingProducts);

});

function displayProducts(products) {
    var productList = document.getElementById("productList");

    // Xóa nội dung cũ của danh sách sản phẩm
    productList.innerHTML = "";

    var totalAmount = 0;

    // Thêm từng sản phẩm vào danh sách
    products.forEach(function (product) {

        var row = productList.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);


        cell1.innerHTML = '<img src="' + product.img + '" alt="Ảnh Sản Phẩm" style="width: 50px; height: 50px;">';
        cell2.textContent = product.name;
        cell3.textContent = product.price;
        cell4.textContent = product.size;
        cell5.textContent = product.quantity;
        cell6.innerHTML = '<button class="delete-cart" style="cursor: pointer; width: 30px; height: 20px; background-color: red; color: white ">Xóa</button>'

        totalAmount += parseFloat(product.price) * parseInt(product.quantity) * 1000;
    })
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('de-DE');
}
// updateCart();

document.addEventListener("DOMContentLoaded", function () {
    // ... (các mã khác)

    function deleteProduct(indexToRemove) {
        // Lấy danh sách sản phẩm từ Local Storage
        var existingProducts = JSON.parse(localStorage.getItem("products")) || [];

        // Kiểm tra xem indexToRemove có hợp lệ không

        // Xóa sản phẩm khỏi danh sách theo indexToRemove
        existingProducts.splice(indexToRemove, 1);

        // Cập nhật danh sách sản phẩm vào Local Storage
        localStorage.setItem("products", JSON.stringify(existingProducts));

        // Hiển thị lại danh sách sản phẩm
        displayProducts(existingProducts);
        window.location.href = "../html/GioHang.html";


    }

    // Gắn sự kiện xóa cho tất cả các nút "Xóa"
    var deleteButtons = document.querySelectorAll(".delete-cart");
    deleteButtons.forEach(function (deleteButton) {
        deleteButton.addEventListener("click", function () {
            // Lấy index của sản phẩm trong danh sách từ data-index của nút xóa
            var indexToRemove = parseInt(this.getAttribute("data-index"));
            // Gọi hàm xóa sản phẩm với index cần xóa
            deleteProduct(indexToRemove);
        });
    });
});


