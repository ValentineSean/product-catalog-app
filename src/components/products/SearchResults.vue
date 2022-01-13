<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <!-- <a-spin /> -->
            <a-skeleton active />
        </div>

        <div v-if="!loading">
            <a-row :style="{ border: '', display: 'flex', margin: '' }">
                <a-col :span="12" :style="{ border: '', padding: '12px' }">
                    <h1 :style="{ fontSize: '24px', margin: 'auto 0', border: '' }">Search results</h1>
                </a-col>

                <a-col :span="12" :style="{ border: '', padding: '12px', margin:'auto 0', diplay: 'flex' }">
                    <span :style="{ marginLeft: 'auto' }">
                        <a-form>
                            <a-row  :style="{ display: 'flex', border: '' }">
                                <!-- <a-col :span="12" :style="{ border: '' }">
                                    <form-item label="Search criteria">
                                        <a-select placeholder="Search criteria">
                                            <a-select-option value="product">Product</a-select-option>
                                            <a-select-option value="category">Category</a-select-option>
                                            <a-select-option value="supplier">Supplier</a-select-option>
                                        </a-select>
                                    </form-item>
                                </a-col> -->

                                <a-col :span="12" :style="{ border: '', marginLeft: 'auto'}">
                                    <form-item :style="{ display: 'flex', border: '', marginLeft: '24px' }">
                                        <a-input
                                            v-model="filter_string"
                                            placeholder="filter..."
                                            :style="{ border: '', marginLeft: 'auto' }"
                                            @input="filterResults"
                                        >
                                        <a-icon type="filter" slot="suffix"></a-icon>
                                        </a-input>
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
                            <a-col :span="8" v-for="product in search_source" :key="product['_id']" :style="{ margin: '12px auto' }">
                                <a-card hoverable style="width: 300px" @click="openProductDetails" :style="{ border: '' }">
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
                                                key="ellipsis"
                                                type="heart"
                                                title="add to your favorites"
                                                v-on:click.stop="toFavorites"
                                                :style="{ fontSize: '24px', color: 'blue', marginLeft: 'auto' }"
                                            />
                                        </span>
                                    </template>

                                    <a-card-meta :title="product['product_name']" :description="'Supplier: ' + product['supplier']['first_name'] + ' ' + product['supplier']['last_name']">
                                    </a-card-meta>
                                </a-card>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-layout-content>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    const searchAll = (items, term) =>{
        if(term){
            return items.filter(item =>
                ((item !== undefined && item !== null) && item["product_name"].toLowerCase().includes(term.toLowerCase()))
            )
        }

        return items
    }

    export default{
        name: "SearchResults",

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                filter_string: "",
                searched_products: [],
                rating_value: 3,
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

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            openProductDetails(){
                this.$router.push({ name: "Product Details" })
            },

            toFavorites(){
                console.log("To favorites")
            },

            // onSearch(search_text) {
            //     this.search_source = searchAll(this.searched_products, search_text)
            // },

            filterResults(){
                this.search_source = searchAll(this.searched_products, this.filter_string)
            }
        },

        async created(){
            this.loading = true
            this.searched_products = this.getSearchedProducts
            this.search_source = this.searched_products
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
        computed: mapGetters(["getSearchedProducts"])
    }
</script>