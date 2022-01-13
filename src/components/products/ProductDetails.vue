<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <a-skeleton active />
        </div>

        <div v-if="!loading">
            <a-row :style="{ padding: '0 12px', border: '' }">
                <h1 :style="{ fontSize: '24px', margin: 'auto 0', border: '' }">Product Details</h1>
            </a-row>
            
            <a-layout-content :style="{ margin: '12px 12px 0' }">
                <div :style="{ background: '#fff' }">

                    <div :style="{ background: '', padding: '12px', textAlign: 'center' }">
                        <a-list item-layout="vertical" size="large" :data-source="product_details">
                            <a-list-item slot="renderItem" key="item.title" slot-scope="product_details">
                                <img
                                    slot="extra"
                                    width="272"
                                    alt="logo"
                                    :src="product_details['image_url']"
                                />
                                <a-list size="small">
                                    <a-list-item>Product name: {{ product_details["product_name"] }}</a-list-item>
                                    <a-list-item>Category: {{ product_details["category"]["category_name"] }}</a-list-item>
                                    <a-list-item>Stock available: {{ product_details["quantity_available"] }}</a-list-item>
                                    <a-list-item>Unit Price: ${{ product_details["unit_price"] }}</a-list-item>
                                    <a-list-item>Supplier: {{ product_details["supplier"]["first_name"] }} {{ product_details["supplier"]["last_name"] }}</a-list-item>
                                    <a-list-item>Supplier contact number: {{ product_details["supplier"]["contact_number"] }}</a-list-item>
                                    <a-list-item>
                                        <span>Rating:</span>
                                        <a-rate v-if="!load_rating" v-model="rating_value" title="click to rate the product" @change="toRateProduct(product_details)" />
                                        <a-spin v-if="load_rating" />
                                    </a-list-item>
                                </a-list>
                            </a-list-item>
                        </a-list>
                    </div>
                </div>
            </a-layout-content>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"

    export default{
        name: "ProductDetails",

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                product_details: {},
                rating_value: 0,
                load_rating: false,
            }
        },

        methods: {
            ...mapActions(["rateProduct"]),

            async toRateProduct(product){
                this.load_rating = true
                product["rating"] = this.rating_value
                await this.rateProduct(product).then((response) => {
                    if(response["status"] === "success"){
                        // this.product_details = this.getProductDetails
                        this.rating_value = this.getProductDetails["rating"]
                        this.$message.success(response["message"]);
                    }
                
                    if(response["status"] === "error"){
                        this.$message.error(response["message"]);
                    }
                })
                this.load_rating = false
            }
        },

        async created(){
            this.loading = true
            this.product_details = [this.getProductDetails]
            this.rating_value = this.getProductDetails["rating"]
            console.log(this.product_details)
            this.loading = false
        },

        computed: mapGetters(["getProductDetails"])
    }
</script>