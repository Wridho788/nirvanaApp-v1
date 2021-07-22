import AsyncStorage from "@react-native-async-storage/async-storage"
import { showSnackBar } from "../../functions/helper"


export async function isFirstTime(){
    return await AsyncStorage.getItem('first')
}

export async function insertProductToDatabase(qty, stockId, productId,  final_price) {
    if (String(stockId).length > 0) {
            let dataCart = {
                stokId: stockId,
                quantity: qty,
                hargaSatuan: final_price,
                productId: productId,
                note: ''
            }
            var getAll = await getAllStockCartItem()
            if(!getAll.stockIdData.includes(stockId)){
                await AsyncStorage.getItem('cart')
                .then((cart) => {
                    const c = cart ? JSON.parse(cart) : []
                    c.push(dataCart)
                    AsyncStorage.setItem('cart', JSON.stringify(c))

                })
                showSnackBar('Produk dimasukkan ke keranjang')
                return "success"
            }else{
                showSnackBar('Produk dimasukkan ke keranjang')
                return "avail"
            }
    } else {
        showSnackBar('Please select color or size')
        return "fail"
    }
}

export async function getAllCartItem() {
    return await AsyncStorage.getItem('cart')
}

export async function getAllStockCartItem() {
    var cartFromSqlite = JSON.parse(await getAllCartItem())
    var cartLength = (cartFromSqlite == null || cartFromSqlite.length == 0) ? 0 : cartFromSqlite.length
    var stockData = []
    var quantityData = []
    var availableStok = []
    var noteData = []
    var totalHarga = []
    for (let i = 0; i < cartLength; i++) {
        var dataSt = cartFromSqlite[i]
        if (!availableStok.includes(dataSt.stokId)) {
            availableStok.push(dataSt.stokId)
            quantityData.push(dataSt.quantity)
            stockData.push(dataSt.stokId)
            noteData.push(dataSt.note)
            totalHarga.push(dataSt.hargaSatuan)
        }
    }

    let returnData = {
        stockIdData: stockData,
        quantityData: quantityData,
        noteDataCart: noteData,
        priceTotal: totalHarga
    }
    return returnData
}

export async function getTotalHargaCart(){
    var total = 0
    var data = await getAllStockCartItem()
    var cartFromSqlite = JSON.parse(await getAllCartItem())
    for(var i = 0; i < cartFromSqlite.length; i++){
        var priceData = data.priceTotal[i]
        var quantity = data.quantityData[i]
        total += priceData * quantity
    }

    return total
}

export async function updateQtyCart(stockId, newQty) {
    await AsyncStorage.getItem('cart')
        .then(data => {
            var jsonData = JSON.parse(data)
            for (let i = 0; i < jsonData.length; i++) {
                var dataJ = jsonData[i]
                if (dataJ.stokId == stockId) {
                    dataJ.quantity = newQty
                    AsyncStorage.setItem('cart', JSON.stringify(jsonData))
                }
            }

        })

        return true
}

export async function updateNoteCart(stockId, newNote){
    await AsyncStorage.getItem('cart')
    .then(data => {
        var jsonData = JSON.parse(data)
        for (let i = 0; i < jsonData.length; i++) {
            var dataJ = jsonData[i]
            if (dataJ.stokId == stockId) {
                dataJ.note = newNote
                AsyncStorage.setItem('cart', JSON.stringify(jsonData))
            }
        }

    })

    return true
}

export async function deleteItemCart(stockId) {
    await AsyncStorage.getItem('cart')
        .then(data => {
            var jsonData = JSON.parse(data)
            for (let i = 0; i < jsonData.length; i++) {
                var dataJ = jsonData[i]
                if (dataJ.stokId == stockId) {
                    jsonData.splice(i, 1)
                    AsyncStorage.setItem('cart', JSON.stringify(jsonData))
                }
            }

        })
    return true    
}


export async function getCartDataObject(){
    var stockId = await getAllStockCartItem()
    var dataCart = {}
    for( let i = 0; i < stockId.stockIdData.length; i++){
        var cartItem = stockId.stockIdData[i]
        dataCart[`${cartItem}`] = stockId.quantityData[i]
    }
    return dataCart
}

export async function getNoteDataObject(){
    var stockId = await getAllStockCartItem()
    var dataNote = {}
    for( let i = 0; i < stockId.stockIdData.length; i++){
        var cartItem = stockId.stockIdData[i]
        dataNote[`${cartItem}`] = stockId.noteDataCart[i]
    }
    return dataNote
}