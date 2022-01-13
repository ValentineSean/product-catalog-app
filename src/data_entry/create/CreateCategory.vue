<template>
  <div>

    <a-modal
      title="New Category Form"
      :visible="createCategoryVisible"
      @cancel="$emit('handleHide')"
      :footer="null"
    >
      <div  :style="{ margin: '12px 12px 0' }">
        <a-form>
            <a-row>
                <a-col :span="24">
                    <a-form-item class="a-form-item" label="Category Name" :style="{ marginRight: '6px' }">
                        <a-input
                            type="text"
                            v-model="category_name"
                            placeholder="Category Name"
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
                        <a-button type="primary" @click.prevent="saveCategory" :loading="createBtnLoading">save</a-button>
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
        name: "CreateCategory",

        data() {
            return {
                createBtnLoading: false,
                disabled: true,

                // Category details
                category_name: "",
            };
        },

        props: {
            createCategoryVisible: Boolean,
        },

        emits: ["handleHide"],

        methods: {
            // ...mapActions(["createCategory"]),

            // showModal() {
            //     this.visible = true;
            // },

            //   Create Category
            async saveCategory(){
                this.createBtnLoading = true

                // let category = {
                //     category_name: this.category_name,
                // }

                // console.log(category)

                // await this.createCategory(category).then((response) => {
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