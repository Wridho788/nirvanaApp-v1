'use strict'



//var mainUrl = "http://192.168.100.22:8080"
var mainUrl = "https://api.nirvanastore.id"
var mainApi = mainUrl + "/api/v1"
var mainApi2 = mainUrl + "/api/v2"
var baseMain = mainApi+ "/main"
var nirvanaUrl = 'https://nirvanastore.id'
var baseUrl = ''
var nysBaseUrl = 'https://admin-strapi.nirvanastore.id/bulletins'
const Constant = {
    
    baseUrl : mainUrl,
    baseApi: mainApi,
    highlightProduct: mainApi + "/home/highlight",
    homeProduct: mainApi + "/home/product",
    listCategory: mainApi + "/main/category",
    detailProduct: mainApi + "/product/get/detail/",
    provinceList: baseMain + "/province?country_code=",
    cityList: baseMain + "/city?province=",
    origin: nirvanaUrl,
    loadAddress: `${mainApi}/shipment/get`,
    deleteAddress: `${mainApi}/shipment/disable/`,
    registerProcess: mainApi + "/customer/utils/register",
    loginProcess: mainApi + "/customer/auth/login",
    profileDetail: mainApi + "/customer/profile/get/",
    urlClass: mainApi+ "/customer/profile/class/get?classid=",
    editAddress: `${mainApi}/shipment/update/`,
    addNewAddress: mainApi + "/shipment/create",
    detailAddress: `${mainApi}/shipment/get/`,
    setDefaultAddress: `${mainApi}/shipment/set/default/`,
    captchaSiteKey: '6Lfms-QZAAAAAAHxtApTi7VQHb2-RD5xl0TnSk7e',
    changePassword: `${mainApi}/customer/profile/password/set`,
    shopProduct: `${mainApi}/shop/products/get/`,
    forgotPassword: `${mainApi}/customer/utils/forgot`,

    //v2 register
    registerProcessv2: `${mainApi2}/register/pre`,
    resendOtpUrl: `${mainApi2}/register/resend`,
    validateOtpUrl: `${mainApi2}/register`,

    //Cart process
    urlListCart: `${mainApi}/product/get/min`,

    //url
    checkPricingUrl: `${mainApi}/checkout/pricing`,
    
    //url untuk checkout (post) dan get token (get)
    urlCheckout: `${mainApi}/checkout/`,

    //Midtrans
    midtransMain: `https://api.midtrans.com/v2/`, // + order id

    //bagian payment
    urlPayment: `${mainApi}/order/get/`, //+ kode orderid
    dataBank: `${mainApi}/payment/manual_transfer/`,
    urlnewPayment: `${mainApi}/payment/main/get/`, //+ kode orderid

    //request payment
    requestMidtrans: `${mainApi}/payment/midtrans/create`, //POST
    requestBank: `${mainApi}/payment/manual_transfer/create`, //POST
    webHook: `${mainUrl}/webhook/v1/midtrans`, //WEBHOOK

    //bagian invoicce
    invoiceData: `${mainApi}/order/get/`, //++ order id
    changeOrder: `${mainApi}/order/status/change/`, //untuk cancel dll

    //status order load
    requestStatusOrder: `${mainApi}/order/get?status=`, // + position kaya 0, 1, 2

    //coupon
    getCoupon: `${mainApi}/coupon/customer/get`,

    //Mat
    getMatData: `${mainApi}/mnm/preview?code=`, // Check mat data (+ kode mat)
    addMatData: `${mainApi}/mnm`, //GET untuk dapatkan data, POST untuk add
    inputTraining: `${mainApi}/mnm/training`, //POST for input

    //NYS section
    baseNys: nysBaseUrl,


    //LINKING URL
    termUrl: `${nirvanaUrl}/terms-and-condition`,
    privacyUrl: `${nirvanaUrl}/privacy-and-policy`,
    faqsUrl: `${nirvanaUrl}/faq`,
    disclaimerUrl: `${nirvanaUrl}/disclaimer`,
    shippingInfoUrl: `${nirvanaUrl}/faq/shipping`,
    aboutUrl : `${nirvanaUrl}/about`,
    sizeGuideUrl: `${nirvanaUrl}/faq/product`,
    bulletinUrl: `${nirvanaUrl}/bulletin`,
    contactNumber: 'https://wa.me/6281263200080',

}

export default Constant