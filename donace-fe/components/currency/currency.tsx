function formatCurrency(value: number | undefined) {
    if (value == undefined) return "0 đ";
    const formattedValue = parseFloat(value.toString()).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    // Thêm ký tự 'đ' ở cuối số
    return formattedValue.replace(/\₫/g, "") + " đ";
}

export default formatCurrency;