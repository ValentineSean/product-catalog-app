<template>
    <div>
        <div class="loading-spinner" v-if="loading">
            <a-spin />
        </div>

        <div v-if="!loading">
            <h1 :style="{ margin: '12px 12px 0' }">Mouse</h1>
            
            <a-layout-content :style="{ margin: '12px 12px 0' }">
                <div :style="{ background: '#fff' }">

                    <div :style="{ background: '', padding: '12px', textAlign: 'center' }">
                        <a-list item-layout="vertical" size="large" :data-source="listData">
                            <a-list-item slot="renderItem" key="item.title" slot-scope="">
                                <img
                                    slot="extra"
                                    width="272"
                                    alt="logo"
                                    src="http://res.cloudinary.com/dk8b24l10/image/upload/v1641954749/product-catalog/product_image_fiklox.jpg"
                                />
                                <!-- http://res.cloudinary.com/dk8b24l10/image/upload/v1641954749/product-catalog/product_image_fiklox.jpg -->

                                <!-- <a-list-item-meta :description="item.description">
                                    <a slot="title" :href="item.href">{{ item.title }}</a>
                                    <a-avatar slot="avatar" :src="item.avatar" />
                                </a-list-item-meta> -->
                                <a-list size="small">
                                    <a-list-item>Product name: Mouse100</a-list-item>
                                    <a-list-item>Category: Mouse</a-list-item>
                                    <a-list-item>Stock available: 4</a-list-item>
                                    <a-list-item>Unit Price: $400</a-list-item>
                                    <a-list-item>Supplier: Vale</a-list-item>
                                    <a-list-item>Supplier contact number: 77700</a-list-item>
                                    <a-list-item>
                                        <span>Rating:</span>
                                        <a-rate v-if="!load_rating" v-model="rating_value" title="click to rate the product" @change="toRateProduct" />
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
    // import { mapActions } from "vuex"

    const listData = [];
    for (let i = 0; i < 1; i++) {
        listData.push({
            href: 'https://www.antdv.com/',
            title: `ant design vue part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    export default{
        name: "ProductDetails",

        data(){
            return{
                loading: false,
                createBtnDisabled: true,
                rating_value: 3,
                load_rating: false,

                listData,
                pagination: {
                    onChange: page => {
                    console.log(page);
                    },
                    pageSize: 3,
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        },

        methods: {
            // ...mapActions(["fetchAllCompanies", "fetchAllDepartments"]),

            // openCreateSchedule(){
            //     this.$router.push({ name: "CreateProject" })
            // },

            toRateProduct(){
                console.log("Product rated", this.rating_value)
                this.load_rating = true
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