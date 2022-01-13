<template>
    <div>
        <CreateProduct @handleHide="hideCreateProduct" :createProductVisible="createProductVisible" />
        <!-- <UpdateProduct :product="product" @handleHide="hideUpdateProduct" :updateProductVisible="updateProductVisible" /> -->
        <div class="loading-spinner" v-if="loading">
            <!-- <a-spin /> -->
            <a-skeleton active />
        </div>

        <div v-if="!loading">
            <a-row :style="{ border: '', display: 'flex', margin: '' }">
                <a-col :span="8" :style="{ border: '', padding: '12px' }">
                    <h1 :style="{ fontSize: '24px', margin: 'auto 0', border: '' }">Stock</h1>
                </a-col>

                <a-col :span="16" :style="{ border: '', padding: '12px', margin:'auto 0', display: 'flex' }">
                    <span :style="{ marginLeft: 'auto' }">
                        <a-form>
                            <a-row  :style="{ display: '' }">
                                <a-col :span="8" :style="{ display: 'flex', marginLeft: 'auto', border: '', padding: '' }">
                                    <a-button type="primary" :style="{ marginLeft: 'auto', border: '' }" @click.prevent="openCreateProduct">Create Product</a-button>
                                </a-col>
                            </a-row>
                        </a-form>
                    </span>
                </a-col>
            </a-row>
            
            <a-layout-content :style="{ margin: '0 12px', border: '' }">
                <div :style="{ background: '#fff' }">

                    <div :style="{ background: '', padding: '', textAlign: '' }">
                        <a-row :gutter="16" :style="{ margin: '12px auto 0 auto', border: '' }">
                            <a-col :span="8" v-for="product in stock" :key="product['_id']" :style="{ margin: '12px auto' }">
                                <a-card style="width: 300px" :title="product['product_name']">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        :src="product['image_url']"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <span :style="{ display: 'flex', border: '', padding: '0 24px' }">
                                            <a-rate v-model="product['rating']" disabled />
                                            <!-- <a-icon key="edit" type="edit" /> -->
                                            <a-icon
                                                type="edit"
                                                title="edit product information"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />

                                            <a-icon
                                                type="delete"
                                                title="delete product"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'red', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta :title="'$'+product['unit_price']" :description="'Stock Available: ' +  product['quantity_available']">
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <!-- <a-col :span="8" :style="{ margin: '12px auto' }">
                                <a-card style="width: 300px">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        src="http://res.cloudinary.com/dk8b24l10/image/upload/v1641908136/product-catalog/product_image_klmdi3.jpg"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <span :style="{ display: 'flex', border: '', padding: '0 24px' }">
                                            <a-rate v-model="rating_value" disabled />
                                            <a-icon
                                                type="edit"
                                                title="edit product information"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />

                                            <a-icon
                                                type="delete"
                                                title="delete product"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'red', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta title="Mouse" description="Stock available: 4">
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <a-col :span="8" :style="{ margin: '12px auto' }">
                                <a-card style="width: 300px">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        src="http://res.cloudinary.com/dk8b24l10/image/upload/v1641908136/product-catalog/product_image_klmdi3.jpg"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <span :style="{ display: 'flex', border: '', padding: '0 24px' }">
                                            <a-rate v-model="rating_value" disabled />
                                            <a-icon
                                                type="edit"
                                                title="edit product information"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />

                                            <a-icon
                                                type="delete"
                                                title="delete product"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'red', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta title="Mouse" description="Stock available: 4">
                                    </a-card-meta>
                                </a-card>
                            </a-col> -->
                        </a-row>
                    </div>
                </div>
            </a-layout-content>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import CreateProduct from "../../data_entry/create/CreateProduct"
    //   import UpdateEmployee from "../../data_entry/update/UpdateEmployee"

    const searchAll = (items, term) =>{
        if(term){
            return items.filter(item =>
                ((item !== undefined && item !== null) && item.toLowerCase().includes(term.toLowerCase()))
            )
        }

        return items
    }

    export default{
        name: "Stock",

        components: {
          CreateProduct,
        //   UpdateEmployee,
        },

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                createProductVisible: false,
                stock: [],
                rating_value: 3,
                search_string: "",
                data_source: ["mango", "banana", "orange", "lemon", "lime"],
                search_source: [],
            }
        },

        watch: {
            search_string(val) {
                console.log('value', val);
            },
        },

        methods: {
            // ...mapActions(["fetchAllCompanies", "fetchAllDepartments"]),
            ...mapActions(["fetchStock", "fetchCategories"]),

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            openProductDetails(){
                this.$router.push({ name: "Product Details" })
            },

            toFavorites(){
                console.log("To favorites")
            },

            onSearch(search_text) {
                // this.search_source = !search_text ? [] : [search_text, search_text.repeat(2), search_text.repeat(3)];
                this.search_source = searchAll(this.data_source, search_text)
            },

            onSelect(value) {
                console.log('onSelect', value);
            },

            onChange(value) {
                console.log('onChange', value);
            },

            openCreateProduct(){
                this.createProductVisible = true
                // console.log("Create employee")
            },

            hideCreateProduct(){
                this.createProductVisible = false
            },
        },

        async created(){
            this.loading = true
            await this.fetchStock("61df5f9eaabc8e81b416507d").then((response) => {
                // if(response.status === "info"){
                //     this.$message.info(response.message);
                // }
                
                if(response.status === "success"){
                    // this.$message.success(response.message);
                    this.stock = this.getStock
                }
                
                // else if(response.status === "warn"){
                //     this.$message.warn(response.message);
                // }
                
                if(response.status === "error"){
                    this.$message.error(response.message);
                }
            })

            await this.fetchCategories().then((response) => {
                // if(response.status === "info"){
                //     this.$message.info(response.message);
                // }
                
                if(response.status === "success"){
                    // this.$message.success(response.message);
                }
                
                // else if(response.status === "warn"){
                //     this.$message.warn(response.message);
                // }
                
                if(response.status === "error"){
                    this.$message.error(response.message);
                }
            })

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
        computed: mapGetters(["getStock"])
    }
</script>