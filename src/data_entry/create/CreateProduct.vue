<template>
  <div>

    <a-modal
      title="New Product Form"
      :visible="createProductVisible"
      @cancel="$emit('handleHide')"
      :footer="null"
    >
      <div  :style="{ margin: '12px 12px 0' }">
        <a-form>
            <a-row>
                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Product Name" :style="{ marginRight: '6px' }">
                        <a-input
                            type="text"
                            v-model="product_name"
                            placeholder="Product Name"
                        />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Category" :style="{ marginRight: '6px' }">
                        <a-select v-model="category" placeholder="Category">
                            <a-select-option value="61dd03372eec2bd87482e740">Mouse</a-select-option>
                            <a-select-option value="61dd03372eec2bd87482e740">Keyboard</a-select-option>
                            <a-select-option value="61dd03372eec2bd87482e740">Earphones</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Quantity Available" :style="{ marginRight: '6px' }">
                        <a-input
                            type="number"
                            v-model="quantity_available"
                            placeholder="Quantity Available"
                        />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Product Image" :style="{ marginRight: '6px' }">
                        <a-input
                            type="file"
                            @change="previewImage"
                            placeholder="Product Image"
                        />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">
                    <a-form-item>
                        <a-button type="danger" @click.prevent="$emit('handleHide')">cancel</a-button>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item :style="{ float: 'right' }">
                        <a-button type="primary" @click.prevent="saveProduct" :loading="createBtnLoading">save</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
    // import { mapActions, mapGetters } from "vuex"
    
    export default {
        name: "CreateProduct",

        data() {
            return {
                createBtnLoading: false,
                disabled: true,

                // Product details
                product_name: "",
                category: "",
                quantity_available: 0,
                supplier: "61dd0130e4a7d4b89e277739",
                product_image: null
                // company: this.getActiveUser["company"],
            };
        },

        props: {
            createProductVisible: Boolean,
        },

        emits: ["handleHide"],

        methods: {
            // ...mapActions(["createProduct"]),

            // showModal() {
            //     this.visible = true;
            // },

            previewImage(event){
                this.product_image = event.target.files[0]
            },

            //   Create Product
            async saveProduct(){
                this.createBtnLoading = true

                // let product = {
                //     product_name: this.product_name,
                //     category: this.category,
                //     quantity_available: this.quantity_available,
                //     supplier: this.supplier,
                //     product_image: this.product_image,
                // }

                // console.log(product)

                // await this.createProduct(product).then((response) => {
                //     if(response.status === "info"){
                //         this.$message.info(response.message);
                //     }
                    
                //     else if(response.status === "success"){
                //         this.$message.success(response.message);
                //     }
                    
                //     else if(response.status === "warn"){
                //         this.$message.warn(response.message);
                //     }
                    
                //     else if(response.status === "error"){
                //         this.$message.error(response.message);
                //     }
                // })

                this.createBtnLoading = false
                this.$emit('handleHide')
            },
            
            handleCancel() {
                console.log('Clicked cancel button');
                this.visible = false;
            },
        },

        // computed: mapGetters(["getAllDepartments", "getActiveUser"]),
    };
</script>