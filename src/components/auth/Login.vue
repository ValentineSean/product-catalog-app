<template>
    <div :style="{ minHeight: '100vh', display: 'flex' }">
        <div :style="{ margin: 'auto', border: '' }">
            <a-card class="login-card" :style="{ borderRadius: '4px' }">
                <a-row :style="{ display: 'flex', border: '',  margin: 'auto', minHeight: '100%' }">
                    <a-col :span="24" :style="{ display: '', minHeight: '100%', margin: 'auto', border: '' }">
                        <h3 :style="{ textAlign: 'center', fontWeight: 'bold' }">Login to Product Catalog</h3>
                
                        <a-form
                            id="components-form-demo-normal-login"
                            :form="form"
                            class="login-form"
                            @submit="handleSubmit"
                            :style="{ padding: '12px', margin: '' }"
                        >
                            <a-form-item>
                                    <a-input
                                        v-model="email"
                                        placeholder="Email"
                                    >
                                        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                                    </a-input>
                            </a-form-item>

                            <a-form-item>
                                    <a-input-password
                                        v-model="password"
                                        type="password"
                                        placeholder="Password"
                                    >
                                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                                    </a-input-password>
                            </a-form-item>

                            <a-form-item>
                                <a-button type="primary" html-type="submit" class="login-form-button" :loading="loginBtnLoading" @click.prevent="authenticate">
                                    Log in
                                </a-button>
                                
                            </a-form-item>

                            <!-- <a-form-item :style="{ textAlign: 'center' }">
                                <a-button type="default" :style="{ width: '50%', margin: 'auto' }">
                                    Register
                                </a-button>
                            </a-form-item> -->
                        </a-form>
                    </a-col>
                </a-row>
            </a-card>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    // import { mapActions } from "vuex"

    export default {
        name: "Login",

        components: {},
        
        data(){
            return{
                registerBtnLoading: false,
                loginBtnLoading: false,
                email: "",
                password: "",
            }
        },
        
        methods: {
            ...mapActions(["login"]),

            handleSubmit() {
                console.log("Handle submit")
            },

            async authenticate(){
                this.loginBtnLoading = true

                let user = {
                    email: this.email,
                    password: this.password
                }

                await this.login(user).then((response) => {
                    if(response["status"] === "success"){

                        if(this.getActiveUser["role"] === "CUSTOMER"){
                            this.$router.push({ name: "Products" })
                        }

                        else if(this.getActiveUser["role"] === "SUPPLIER"){
                            this.$router.push({ name: "Stock" })
                        }

                        this.$message.success(response["message"])
                    }

                    else if(response["status"] === "error"){
                        this.$message.error(response["message"])
                    }
                })

                this.loginBtnLoading = false
            },
        },

        created(){
            // console.log(this.getLoggedIn)
            // if(this.getLoggedIn){
            //     console.log(this.getLoggedIn)
            //     this.$router.replace({ name: "Dashboard" })
            // }
        },

        computed: mapGetters(["getActiveUser"])
    }
</script>
<style>
    #components-form-demo-normal-login .login-form {
    max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
    float: right;
    }
    #components-form-demo-normal-login .login-form-button {
    width: 100%;
    }

    .login-card{
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
</style>
