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
                        <a-select v-model="category_id" placeholder="Category">
                            <a-select-option v-for="category in getCategories" :key="category['_id']['$oid']" :value="category['_id']['$oid']">{{ category['category_name'] }}</a-select-option>
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
                    <a-form-item class="a-form-item" label="Unit Price ($)" :style="{ marginRight: '6px' }">
                        <a-input
                            type="number"
                            v-model="unit_price"
                            placeholder="Unit Price ($)"
                        />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="24">
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
    import { mapActions, mapGetters } from "vuex"
    
    export default {
        name: "CreateProduct",

        data() {
            return {
                createBtnLoading: false,
                disabled: true,

                // Product details
                product_name: "",
                category_id: "",
                quantity_available: 0,
                unit_price: 0,
                supplier: "61df5f9eaabc8e81b416507d",
                product_image: null
                // company: this.getActiveUser["company"],
            };
        },

        props: {
            createProductVisible: Boolean,
        },

        emits: ["handleHide"],

        methods: {
            ...mapActions(["createProduct"]),

            // showModal() {
            //     this.visible = true;
            // },

            previewImage(event){
                this.product_image = event.target.files[0]
            },

            //   Create Product
            async saveProduct(){
                this.createBtnLoading = true

                let product = {
                    product_name: this.product_name,
                    category: this.category_id,
                    quantity_available: this.quantity_available,
                    unit_price: this.unit_price,
                    supplier: this.supplier,
                    product_image: this.product_image,
                }

                // console.log(product)

                await this.createProduct(product).then((response) => {
                    // if(response.status === "info"){
                    //     this.$message.info(response.message);
                    // }
                    
                    if(response.status === "success"){
                        this.$message.success(response.message);
                    }
                    
                    // else if(response.status === "warn"){
                    //     this.$message.warn(response.message);
                    // }
                    
                    else if(response.status === "error"){
                        this.$message.error(response.message);
                    }
                })

                this.createBtnLoading = false
                this.$emit('handleHide')
            },
            
            handleCancel() {
                console.log('Clicked cancel button');
                this.visible = false;
            },
        },

        computed: mapGetters(["getCategories"]),
    };
</script>