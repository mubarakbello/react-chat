const autoGenerateID = () => (Math.random() * 20).toFixed(0)

const autoGeneratePrice = () => {
    const price = (Math.random() * 100000).toFixed(0)
    return `NGN ${price}`
}

const autoGenerateUploadDate = () => {
    const day = ((Math.random() + 0.1) * 30).toFixed(0)
    const month = (Math.random() * 12).toFixed(0)
    return `${day}/${month}/2018`
}

const autoGenerateNumberOfLikes = () => ((Math.random() + 0.1) * 100).toFixed(0)

const autoGenerateNumberOfDislikes = () => ((Math.random() + 0.1) * 100).toFixed(0)

const selectRandomAvatar = () => "./path/to/avatar.png"

const ProductNames = [
    "16-inch LG Plasma TV",
    "Samsung J5 screen guard",
    "Lenovo ThinkPad E430C",
    "Tecno Camon CX Pro",
    "Tecno DroiPad 7C Pro",
    "Toyota Camry 2008",
    "EP20 earpiece",
]

const returnProducts = () => {
    const products = ProductNames.map((Product) => (
        {
            ProductName: Product,
            ProductID: autoGenerateID(),
            ProductPrice: autoGeneratePrice(),
            ProductAvatar: selectRandomAvatar(),
            ProductUploadDate: autoGenerateUploadDate(),
            ProductLikes: autoGenerateNumberOfLikes(),
            ProductDislikes: autoGenerateNumberOfDislikes()
        }
    ))
    return products
}

const Products = returnProducts()

export default Products
