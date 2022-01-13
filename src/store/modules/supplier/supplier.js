import axios from "axios"

const state = {
    stock: []
}

const getters = {
    getStock: (state) => state.stock,
}

const actions = {
    async fetchSupplierStock({ commit }, supplier_id){
        try{
            let response = await axios.get(`get-supplier-stock?supplier=${supplier_id}`)
            
            if(response["data"]["status"] === "200"){
                let stock = response["data"]["data"]
                // console.log(response["data"])
                commit("setStock", stock)

                return{
                    "status": "success",
                    "message": "Stock successfully fetched",
                    "data": stock
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch stock"
                }
            }
        }

        catch(error){
            // console.log(error)
            return{
                "status": "error",
                "message": "Server technical problem"
            }
        }
    },

    async createProduct({ commit }, product){
        let product_name = product["product_name"]
        let category = product["category"]
        let quantity_available = product["quantity_available"]
        let unit_price = product["unit_price"]
        let supplier = product["supplier"]
        let product_image = product["product_image"]

        product = new FormData()
        product.append("product_name", product_name)
        product.append("category", category)
        product.append("quantity_available", quantity_available)
        product.append("unit_price", unit_price)
        product.append("supplier", supplier)
        product.append("product_image", product_image)

        try{
            const response = await axios.post(`create-product`, product)
            
            if(response["data"]["status"] === "200"){
                product = response["data"]["data"]
                // console.log(response["data"]["data"])
                commit("addProduct", product)

                return{
                    "status": "success",
                    "message": "Product successfully created"
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to create product"
                }
            }
        }
        
        catch(error){
            // console.log(error)
            return{
                "status": "error",
                "message": "Server technical problem"
            }
        }
    }
}

const mutations = {
    setStock: (state, stock) => (state.stock = stock),
    setSearchedProducts: (state, products) => (state.searched_products = products),
    addProduct: (state, product) => (state.stock.unshift(product[0])),
}

export default{
    state,
    getters,
    actions,
    mutations
}