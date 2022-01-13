<template>
  <div>

    <a-modal
      title="New User Form"
      :visible="createUserVisible"
      @cancel="$emit('handleHide')"
      :footer="null"
    >
      <div  :style="{ margin: '12px 12px 0' }">
        <a-form>
            <a-row>
                <a-col :span="12">
                    <a-form-item class="a-form-item" label="First Name" :style="{ marginRight: '6px' }">
                        <a-input
                            type="text"
                            v-model="first_name"
                            placeholder="First Name"
                        />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Last Name" :style="{ marginRight: '6px' }">
                        <a-input
                            type="text"
                            v-model="last_name"
                            placeholder="Last Name"
                        />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Email" :style="{ marginRight: '6px' }">
                        <a-input
                            type="email"
                            v-model="email"
                            placeholder="Email"
                        />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Contact Number" :style="{ marginRight: '6px' }">
                        <a-input
                            type="text"
                            v-model="contact_number"
                            placeholder="Contact Number"
                        />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Role" :style="{ marginRight: '6px' }">
                        <a-select v-model="role" placeholder="Role">
                            <a-select-option value="SUPER_ADMIN">Super Admin</a-select-option>
                            <a-select-option value="CUSTOMER">Customer</a-select-option>
                            <a-select-option value="SUPPLIER">Supplier</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item class="a-form-item" label="Password" :style="{ marginRight: '6px' }">
                        <a-input
                            type="password"
                            v-model="password"
                            placeholder="Password"
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
                        <a-button type="primary" @click.prevent="saveUser" :loading="createBtnLoading">save</a-button>
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
        name: "CreateUser",

        data() {
            return {
                createBtnLoading: false,
                disabled: true,

                // User details
                first_name: "",
                last_name: "",
                email: "",
                contact_number: "",
                role: "",
                password: "",
            };
        },

        props: {
            createUserVisible: Boolean,
        },

        emits: ["handleHide"],

        methods: {
            // ...mapActions(["createUser"]),

            // showModal() {
            //     this.visible = true;
            // },

            //   Create User
            async saveUser(){
                this.createBtnLoading = true

                // let user = {
                //     first_name: this.first_name,
                //     last_name: this.last_name,
                //     email: this.email,
                //     contact_number: this.contact_number,
                //     role: this.role,
                //     password: this.password,
                // }

                // console.log(user)

                // await this.createUser(user).then((response) => {
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