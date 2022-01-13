<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{ minHeight: '100vh', maxHeight: '100vh' }">
    <a-layout-sider class="layout-sider"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :style="{ background: 'rgb(3, 3, 67)' }"
    >
      <div class="logo" :style="{ border: '', height: '6%' }">
          <h1 v-if="!collapsed" :style="{ color: 'rgb(191, 120, 20)', margin: 'auto 0', fontWeight: 'bold', fontSize: '18px' }">Product Catalog</h1>

          <img v-if="collapsed" :style="{ width: '100%', height: '100%', borderRadius: '50%' }" src="logo.png" alt="">
      </div>

      <a-menu class="layout-sider-menu" theme="dark" mode="inline" :style="{ background: 'rgb(3, 3, 67)' }">
        <a-menu-item key="1" @click="toProducts" v-if="getActiveUser['role'] === 'CUSTOMER'" :style="{ background: 'rgb(3, 3, 67)' }">
            <a-icon :style="{ fontSize: '24px', color: 'rgb(191, 120, 20)' }" type="shop" />
            <span :style="{ color: 'white', fontSize: '12px', fontWeight: 'bold' }">Products</span>
        </a-menu-item>

        <!-- <a-menu-item key="2" @click="toFavorites">
            <a-icon type="heart" />
            <span>Favorites</span>
        </a-menu-item> -->

        <a-menu-item key="3" @click="toStock" v-if="getActiveUser['role'] === 'SUPPLIER'">
            <a-icon :style="{ fontSize: '24px', color: 'rgb(191, 120, 20)' }" type="gold" />
            <span :style="{ color: 'white', fontSize: '12px', fontWeight: 'bold' }">Stock</span>
        </a-menu-item>

        <!-- <a-menu-item key="4" @click="toCategories" v-if="getActiveUser['role'] === 'SUPPLIER'">
            <a-icon :style="{ fontSize: '24px', color: 'rgb(191, 120, 20)' }" type="cluster" />
            <span :style="{ color: 'white', fontSize: '12px', fontWeight: 'bold' }">Categories</span>
        </a-menu-item> -->

        <!-- <a-menu-item key="5" @click="toUsers" v-if="getActiveUser['role'] === 'S'">
            <a-icon type="team" />
            <span>Users</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: '0', display: 'flex' }">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

        <h1 class="user-profile-description" :style="{ margin: 'auto 12px auto auto' }">
            <a-icon :style="{fontSize: '20px'}" slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            <a-dropdown :trigger="['click']">
              <span class="ant-drop-down-link" :style="{ cursor: 'pointer' }">
                {{ getActiveUser["first_name"] }} {{ getActiveUser["last_name"] }}
                <!-- {{ getActiveUser["email"] }} -->
                <!-- John Doe -->
                <a-icon type="caret-down" style="color: rgba(0,0,0,.25)" />
              </span>

              <a-menu slot="overlay">
                <a-menu-item>
                  <span @click.prevent="logout">
                    logout
                  </span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
        </h1>
      </a-layout-header>

      <a-layout-content
        :style="{ margin: '12px 12px', padding: '12px', background: '#fff', overflowY: 'scroll' }"
      >
        <div class="loading-spinner" v-if="loading">
          <a-spin />
        </div>

        <slot v-if="!loading" />
      </a-layout-content>

      <a-layout-footer :style="{ textAlign: 'center', color: 'rgb(3, 3, 67)' }">
        Valentine Sean Chanengeta ©2022 MongoDB Atlas Hackathon
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  import { mapGetters } from "vuex"

  export default {
    data() {
      return {
        loading: false,
        collapsed: false,
        // default_tab: null,
        // default_sub_tab: null,
      };
    },

    methods: {
        // ...mapActions(["fetchDepartments", "fetchRoles", "fetchUsers", "fetchFeeds", "activate"]),
        // ...mapActions(["logoutUser"]),

        toProducts(){
            this.$router.replace({ name: "Products" })
        },

        toStock(){
            this.$router.replace({ name: "Stock" })
        },

        toFavorites(){
            this.$router.replace({ name: "Favorites" })
        },

        toUsers(){
            this.$router.replace({ name: "Users" })
        },

        toCategories(){
            this.$router.replace({ name: "Categories" })
        },

        // LOGOUT
        async logout(){
          // this.loading = true
          // this.logoutUser(false)
          // window.sessionStorage.removeItem('vuex');
          // window.sessionStorage.clear()
          this.$router.replace({ name: 'Login' });
          // this.$message.info("You have successfully logged out")
          // this.loading = false
        }
    },

    created(){
        // Created hook
    },

    mounted(){
        // Mounted hook
    },

    computed: mapGetters(["getActiveUser"])
  };
</script>
<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 12px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 16px;
    display: flex;
  }

  .layout-sider-menu{
  }
</style>
