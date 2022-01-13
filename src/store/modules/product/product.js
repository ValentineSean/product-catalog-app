import axios from "axios"

const state = {
    products: [],
    product_details: {}
}

const getters = {
    getProducts: (state) => state.products,
    getProductDetails: (state) => state.product_details,
}

const actions = {
    async fetchProducts({ commit }){
        try{
            let response = await axios.get(`get-products`)
            
            if(response["data"]["status"] === "200"){
                let products = response["data"]["data"]
                console.log(products)
                commit("setProducts", products)

                return{
                    "status": "success",
                    "message": "Products successfully fetched",
                    "data": products
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch products"
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

    async searchProducts({ commit }, search_product){
        let search_string = search_product["search_string"]
        let search_criteria = search_product["search_criteria"]

        try{
            let response = await axios.post(`search-products?search_criteria=${search_criteria}`, {
                search_string
            })
            
            if(response["data"]["status"] === "200"){
                let products = response["data"]["data"]
                // console.log(response["data"])
                commit("setSearchedProducts", products)

                return{
                    "status": "success",
                    "message": "Products successfully fetched",
                    "data": products
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch products"
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

    async refreshProductDetails({ commit }, product){
        try{
            commit("setProductDetails", product)

            return{
                "status": "success",
                "message": "Product details successfully refreshed",
                "data": product
            }
        }

        catch(error){
            // console.log(error)
            return{
                "status": "error",
                "message": "Error encountered while refreshing product"
            }
        }
    },

    async rateProduct({ commit }, product){
        let product_id = product["_id"]["$oid"]
        let rating = product["rating"]

        try{
            let response = await axios.put(`rate-product`, {
                product_id,
                rating
            })
            
            if(response["data"]["status"] === "200"){
                product = response["data"]["data"]
                // console.log(response["data"]["data"])
                commit("setRatedProduct", product)

                return{
                    "status": "success",
                    "message": "Product successfully rated"
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to rate product"
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

    // async createProduct({ commit }, product){
    //     let product_name = product["product_name"]
    //     let category = product["category"]
    //     let quantity_available = product["quantity_available"]
    //     let unit_price = product["unit_price"]
    //     let supplier = product["supplier"]
    //     let product_image = product["product_image"]

    //     product = new FormData()
    //     product.append("product_name", product_name)
    //     product.append("category", category)
    //     product.append("quantity_available", quantity_available)
    //     product.append("unit_price", unit_price)
    //     product.append("supplier", supplier)
    //     product.append("product_image", product_image)

    //     try{
    //         const response = await axios.post(`create-product`, product)
            
    //         if(response["data"]["status"] === "200"){
    //             product = response["data"]["data"]
    //             // console.log(response["data"]["data"])
    //             commit("addProduct", product)

    //             return{
    //                 "status": "success",
    //                 "message": "Product successfully created"
    //             }
    //         }

    //         else{
    //             return{
    //                 "status": "error",
    //                 "message": "Failed to create product"
    //             }
    //         }
    //     }
        
    //     catch(error){
    //         // console.log(error)
    //         return{
    //             "status": "error",
    //             "message": "Server technical problem"
    //         }
    //     }
    // }


const mutations = {
    setProducts: (state, products) => (state.products = products),
    setSearchedProducts: (state, products) => (state.searched_products = products),
    setProductDetails: (state, product) => (state.product_details = product),
    // setRatedProduct: (state, product) => (state.products = product),

    setRatedProduct: (state, product) => {
        const index = state.products.findIndex(x => x._id === product["_id"])

        if(index !== -1){
            state.products.splice(index, 1, product)
        }
    },
    // addProduct: (state, product) => (state.products.unshift(product[0])),
}

export default{
    state,
    getters,
    actions,
    mutations
}