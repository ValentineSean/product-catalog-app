<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <!-- <a-spin /> -->
            <a-skeleton active />
        </div>

        <div v-if="!loading">
            <a-row :style="{ border: '', display: 'flex', margin: '' }">
                <a-col :span="12" :style="{ border: '', padding: '12px' }">
                    <h1 :style="{ fontSize: '24px', margin: 'auto 0', border: '' }">Products</h1>
                </a-col>

                <a-col :span="12" :style="{ border: '', padding: '12px', margin:'auto 0', display: 'flex' }">
                    <span :style="{ marginLeft: 'auto' }">
                        <a-form>
                            <a-row  :style="{ display: '' }">
                                <a-col :span="12" :style="{ border: '' }">
                                    <form-item label="Search criteria">
                                        <a-select v-model="search_criteria" @change="checkCriteria" placeholder="Search criteria">
                                            <a-select-option value="product">Product</a-select-option>
                                            <a-select-option value="category">Category</a-select-option>
                                            <a-select-option value="supplier">Supplier</a-select-option>
                                        </a-select>
                                    </form-item>
                                </a-col>

                                <a-col :span="12" :style="{ border: '', marginLeft: 'auto'}">
                                    <form-item :style="{ display: 'flex', border: '', marginLeft: '24px' }" label="Search string">
                                        <a-auto-complete
                                            v-model="search_string"
                                            :data-source="search_source"
                                            style="width: 400px"
                                            placeholder="search string..."
                                            @select="onSelect"
                                            @search="onSearch"
                                            @change="onChange"
                                            :style="{ border: '', marginLeft: 'auto' }"
                                        >   
                                            <a-input>
                                                <a-button
                                                    slot="suffix"
                                                    style="margin-right: -12px"
                                                    class="search-btn"
                                                    size="medium"
                                                    type="primary"
                                                    @click.prevent="toSearchProducts"
                                                >
                                                    <a-icon type="search" />
                                                </a-button>
                                            </a-input>
                                        </a-auto-complete>
                                    </form-item>
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
                            <a-col :span="8" v-for="product in products" :key="product['_id']" :style="{ margin: '12px auto' }">
                                <a-card hoverable style="width: 300px" @click="openProductDetails(product)" :style="{ border: '' }">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        :src="product['image_url']"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <span :style="{ display: 'flex', border: '', padding: '0 24px' }">
                                            <a-rate v-model="product['rating']" disabled />
                                            <a-icon
                                                key="ellipsis"
                                                type="heart"
                                                title="add to your favorites"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                                v-if="!load_favorite"
                                            />
                                            <a-spin v-if="load_favorite" :style="{ fontSize: '24px', color: 'red', marginLeft: 'auto' }" />
                                        </span>
                                    </template>

                                    <a-card-meta :title="product['product_name']" :description="'Supplier: ' + product['supplier']['first_name'] + ' ' + product['supplier']['last_name']">
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <!-- <a-col :span="8" :style="{ margin: '12px auto' }">
                                <a-card hoverable style="width: 300px" @click="openProductDetails">
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
                                                key="ellipsis"
                                                type="heart"
                                                title="add to your favorites"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta title="Mouse" description="Supplier: VSC">
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <a-col :span="8" :style="{ margin: '12px auto' }">
                                <a-card hoverable style="width: 300px" @click="openProductDetails">
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
                                                key="ellipsis"
                                                type="heart"
                                                title="add to your favorites"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta title="Mouse" description="Supplier: VSC">
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

    const searchAll = (items, term, criteria) =>{
        if(term){
            if(criteria === "product"){
                return items.filter(item => 
                    ((item !== undefined && item !== null) && item.toLowerCase().includes(term.toLowerCase()))
                )
            }

            if(criteria === "category"){
                return items.filter(item =>
                    ((item !== undefined && item !== null) && item.toLowerCase().includes(term.toLowerCase()))
                )
            }

            if(criteria === "supplier"){
                return items.filter(item =>
                    ((item !== undefined && item !== null) && item.toLowerCase().includes(term.toLowerCase()))
                )
            }
        }

        return items
    }

    export default{
        name: "Products",

        data(){
            return{
                loading: false,
                load_favorite: false,
                createBtnDisabled: true,
                search_criteria: "",
                filled: "filled",
                non_filled: "",
                products: [],
                rating_value: 4,
                search_string: "",
                data_source: [],
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
            ...mapActions(["fetchProducts", "refreshProductDetails", "fetchUsers", "fetchCategories", "searchProducts"]),

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            openProductDetails(product){
                this.refreshProductDetails(product).then((response) => {
                    if(response.status === "success"){
                        // this.$message.success(response.message);
                        this.$router.push({ name: "Product Details" })
                    }

                    if(response.status === "error"){
                        this.$message.error(response.message);
                    }
                })
            },

            toFavorites(){
                console.log("To favorites")
            },

            checkCriteria(){
                this.data_source = null
                this.search_string = ""
                
                if(this.search_criteria === "product"){
                    let search_products = []
                    for(let product of this.products){
                        search_products.push(product["product_name"])
                    }

                    this.data_source = search_products
                }

                else if(this.search_criteria === "category"){
                    let search_categories = []
                    for(let category of this.getCategories){
                        search_categories.push(category["category_name"])
                    }

                    this.data_source = search_categories
                }

                else if(this.search_criteria === "supplier"){
                    let search_suppliers = []
                    for(let supplier of this.getSuppliers){
                        search_suppliers.push(supplier["first_name"])
                    }

                    this.data_source = search_suppliers
                }

                console.log(this.data_source)
            },

            onSearch(search_text) {
                // this.search_source = !search_text ? [] : [search_text, search_text.repeat(2), search_text.repeat(3)];
                this.search_source = searchAll(this.data_source, search_text, this.search_criteria)
            },

            onSelect(value) {
                console.log('onSelect', value);
            },

            onChange(value) {
                console.log('onChange', value);
            },

            async toSearchProducts(){
                this.loading = true

                let search_product = {
                    search_criteria: this.search_criteria,
                    search_string: this.search_string
                }

                await this.searchProducts(search_product).then((response) => {
                    if(response.status === "success"){
                        // this.products = this.getProducts
                        this.$router.push({ name: "Search Results" })
                    }
                    
                    // else if(response.status === "warn"){
                    //     this.$message.warn(response.message);
                    // }
                    
                    if(response.status === "error"){
                        this.$message.error(response.message);
                    }
                })

                this.loading = false
            }
        },

        async created(){
            this.loading = true
            await this.fetchProducts().then((response) => {
                // if(response.status === "info"){
                //     this.$message.info(response.message);
                // }
                
                if(response.status === "success"){
                    this.products = this.getProducts
                }
                
                // else if(response.status === "warn"){
                //     this.$message.warn(response.message);
                // }
                
                else if(response.status === "error"){
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

            await this.fetchUsers().then((response) => {
                // if(response.status === "info"){
                //     this.$message.info(response.message);
                // }
                
                if(response.status === "success"){
                    this.$message.success("Products are ready");
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
        computed: mapGetters(["getProducts", "getSuppliers", "getCategories"])
    }
</script>