<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <a-spin />
        </div>

        <div v-if="!loading">
            <h1 :style="{ margin: '12px 12px 0' }">Products</h1>
            
            <a-layout-content :style="{ margin: '12px 12px 0' }">
                <div :style="{ background: '#fff' }">

                    <div :style="{ background: '', padding: '12px', textAlign: 'center' }">
                        <a-row :gutter="16" :style="{ margin: '12px 0' }">
                            <a-col :span="8">
                                <a-card hoverable style="width: 300px" @click="openProductDetails">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        src="http://res.cloudinary.com/dk8b24l10/image/upload/v1641908136/product-catalog/product_image_klmdi3.jpg"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <a-rate v-model="rating_value" />
                                        <!-- <a-icon key="edit" type="edit" /> -->
                                        <a-icon key="ellipsis" type="heart" title="add to your favorites" />
                                    </template>

                                    <a-card-meta title="Mouse" description="Supplier: VSC">
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <a-col :span="8">
                                <a-card hoverable style="width: 300px">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <a-icon key="setting" type="setting" />
                                        <a-icon key="edit" type="edit" />
                                        <a-icon key="ellipsis" type="ellipsis" />
                                    </template>

                                    <a-card-meta title="Card title" description="This is the description">
                                        <!-- <a-avatar
                                            slot="avatar"
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        /> -->
                                    </a-card-meta>
                                </a-card>
                            </a-col>

                            <a-col :span="8">
                                <a-card hoverable style="width: 300px">
                                    <img
                                        :style="{ width: '100%', height: '240px', border: '' }"
                                        slot="cover"
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />

                                    <template slot="actions" class="ant-card-actions">
                                        <a-icon key="setting" type="setting" />
                                        <a-icon key="edit" type="edit" />
                                        <a-icon key="ellipsis" type="ellipsis" />
                                    </template>

                                    <a-card-meta title="Card title" description="This is the description">
                                        <!-- <a-avatar
                                            slot="avatar"
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        /> -->
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
    // import { mapActions } from "vuex"

    export default{
        name: "Products",

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                rating_value: 3,
            }
        },

        methods: {
            // ...mapActions(["fetchAllCompanies", "fetchAllDepartments"]),

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            openProductDetails(){
                this.$router.push({ name: "Product Details" })
            }
        },

        async created(){
            this.loading = true
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
    }
</script>