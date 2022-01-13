<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <!-- <a-spin /> -->
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
                                <!-- http://res.cloudinary.com/dk8b24l10/image/upload/v1641954749/product-catalog/product_image_fiklox.jpg -->

                                <!-- <a-list-item-meta :description="item.description">
                                    <a slot="title" :href="item.href">{{ item.title }}</a>
                                    <a-avatar slot="avatar" :src="item.avatar" />
                                </a-list-item-meta> -->
                                <a-list size="small">
                                    <a-list-item>Product name: {{ product_details["product_name"] }}</a-list-item>
                                    <a-list-item>Category: {{ product_details["category"]["category_name"] }}</a-list-item>
                                    <a-list-item>Stock available: {{ product_details["quantity_available"] }}</a-list-item>
                                    <a-list-item>Unit Price: ${{ product_details["unit_price"] }}</a-list-item>
                                    <a-list-item>Supplier: {{ product_details["supplier"]["first_name"] }} {{ product_details["supplier"]["last_name"] }}</a-list-item>
                                    <a-list-item>Supplier contact number: {{ product_details["supplier"]["contact_number"] }}</a-list-item>
                                    <a-list-item>
                                        <span>Rating:</span>
                                        <a-rate v-if="!load_rating" v-model="product_details['rating']" title="click to rate the product" @change="toRateProduct(product_details)" />
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

    // const listData = [];
    // for (let i = 0; i < 1; i++) {
    //     listData.push({
    //         href: 'https://www.antdv.com/',
    //         title: `ant design vue part ${i}`,
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //         description:
    //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    //         content:
    //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    //     });
    // }

    export default{
        name: "ProductDetails",

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                product_details: {},
                rating_value: 3,
                load_rating: false,

                // listData,
                // pagination: {
                //     onChange: page => {
                //     console.log(page);
                //     },
                //     pageSize: 3,
                // },
                // actions: [
                //     { type: 'star-o', text: '156' },
                //     { type: 'like-o', text: '156' },
                //     { type: 'message', text: '2' },
                // ],
            }
        },

        methods: {
            // ...mapActions(["fetchAllCompanies", "fetchAllDepartments"]),
            ...mapActions(["rateProduct"]),

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            toRateProduct(product){
                this.load_rating = true
                this.rateProduct(product).then((response) => {
                    if(response["status"] === "success"){
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
            console.log(this.product_details)
            // await this.fetchAllCompanies().then((response) => {
            //     // if(response.status === "info"){
            //     //     this.$message.info(response.message);
            //     // }
                
            //     // else if(response.status === "success"){
            //     //     this.$message.success(response.message);
            //     // }
                
            //     // else if(response.status === "warn"){
            //     //     this.$message.warn(response.message);
            //     // }
                
            //     if(response.status === "error"){
            //         this.$message.error(response.message);
            //     }
            // })

            // await this.fetchAllDepartments().then((response) => {
            //     // if(response.status === "info"){
            //     //     this.$message.info(response.message);
            //     // }
                
            //     // else if(response.status === "success"){
            //     //     this.$message.success(response.message);
            //     // }
                
            //     // else if(response.status === "warn"){
            //     //     this.$message.warn(response.message);
            //     // }
                
            //     if(response.status === "error"){
            //         this.$message.error(response.message);
            //     }
            // })
            this.loading = false
        },

        // mounted(){
        //     if(this.getActiveUser["role"]["role_name"].toLowerCase() === "manager"){
        //         this.createBtnDisabled = false
        //     }

        //     else{
        //         this.createBtnDisabled = true
        //     }
        // },

        // computed: mapGetters(["getDashboard", "getActiveUser"])
        computed: mapGetters(["getProductDetails"])
    }
</script>