<template>
  <div>
    <CreateUser @handleHide="hideCreateUser" :createUserVisible="createUserVisible" />
    <!-- <UpdateEmployee :employee="employee" @handleHide="hideUpdateEmployee" :updateEmployeeVisible="updateEmployeeVisible" /> -->

    <div class="loading-spinner" v-if="loading">
      <a-spin />
    </div>

    <div v-if="!loading">
      <a-row :style="{ display: 'flex' }">
            <a-col :span="12" :style="{ border: '', padding: '12px' }">
                <h1 :style="{ margin: '', fontSize: '24px' }">Users</h1>
            </a-col>

            <a-col :span="12" :style="{ border: '', padding: '12px', margin:'', display: 'flex' }">
                <a-button @click.prevent="openCreateUser" type="primary" icon="plus" :style="{ margin: 'auto 0 auto auto', border: '' }">
                    Create User
                </a-button>
            </a-col>
        </a-row>

      <div :style="{ margin: '12px 12px 0' }">
          <a-table
          :data-source="allUsers"
          :columns="columns"
          >
            <span slot="first_name" slot-scope="first_name" :style="{ fontSize: '12px' }">
                {{ first_name }}
            </span>

            <span slot="last_name" slot-scope="last_name" :style="{ fontSize: '12px' }">
                {{ last_name }}
            </span>

            <span slot="email" slot-scope="email" :style="{ fontSize: '12px' }">
                {{ email }}
            </span>

            <span slot="contact_number" slot-scope="contact_number" :style="{ fontSize: '12px' }">
                {{ contact_number }}
            </span>

            <span slot="role" slot-scope="role" :style="{ fontSize: '12px' }">
                {{ role }}
            </span>

            <span slot="updated_at" slot-scope="updated_at" :style="{ fontSize: '12px' }">
                <!-- {{ moment(updated_at).format("YYYY-MM-DD HH:mm:ss") }} -->
                {{ updated_at }}
            </span>

            <span slot="action" slot-scope="record">
                  <a-dropdown :trigger="['click']">
                    <span class="ant-drop-down-link" :style="{ cursor: 'pointer' }">
                        <a-button :loading="actionLoading" title="More..." :style="{ marginRight: '4px' }">
                          <a-icon v-if="!actionLoading" type="more" style="color: rgba(0,0,0,.25)" />
                        </a-button>
                    </span>

                    <a-menu slot="overlay">
                      <!-- <a-menu-item>
                        <span @click.prevent="openEmployeeDescription(record)">
                          <a-icon type="eye" style="color: rgba(0,0,0,.25)" />
                          view
                        </span>
                      </a-menu-item> -->

                      <a-menu-item>
                        <span @click.prevent="openUpdateUser(record)">
                          <a-icon type="edit" style="color: rgba(0,0,0,.25)" />
                          update
                        </span>
                      </a-menu-item>

                      <a-menu-item>
                        <span @click.prevent="">
                          <a-icon type="delete" style="color: rgba(0,0,0,.25)" />
                          delete
                        </span>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                <!-- <a-button icon="delete" type="danger"></a-button> -->
            </span>
            <!-- <a-button slot="action" slot-scope="record" type="primary" @click.prevent="openProjectDetails(record)">view</a-button> -->
            <div
                slot="filterDropdown"
                slot-scope="{
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                column,
                }"
                style="padding: 8px"
            >
                <a-input
                v-ant-ref="(c) => (searchInput = c)"
                :placeholder="`Search ${column.title}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block;"
                @change="
                    (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @pressEnter="
                    () => handleSearch(selectedKeys, confirm, column.dataIndex)
                "
                />
                <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                Search
                </a-button>
                <a-button
                size="small"
                style="width: 90px"
                @click="() => handleReset(clearFilters)"
                >
                    Reset
                </a-button>
            </div>

            <a-icon
                slot="filterIcon"
                slot-scope="filtered"
                type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <template slot="customRender" slot-scope="text, record, index, column">
                <span v-if="searchText && searchedColumn === column.dataIndex">
                <template
                    v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                    <mark
                        v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                        :key="i"
                        class="highlight"
                    >{{ fragment }}</mark
                    >
                    <template v-else>{{ fragment }}</template>
                </template>
                </span>
                <template v-else>
                {{ text }}
                </template>
            </template>
          </a-table>
      </div>
    </div>
  </div>
</template>

<script>
//   import { mapActions, mapGetters } from "vuex"
  import CreateUser from "../../data_entry/create/CreateUser"
//   import UpdateEmployee from "../../data_entry/update/UpdateEmployee"

  const allUsers = [
    {
      key: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@productcatalog.net",
      contact_number: "+00000",
      role: "SUPER_ADMIN",
      updated_at: "2022-01-11",
    },

    {
      key: "2",
      first_name: "John",
      last_name: "Doe",
      email: "john@productcatalog.net",
      contact_number: "+00000",
      role: "SUPPLIER",
      updated_at: "2022-01-11",
    },

    {
      key: "3",
      first_name: "John",
      last_name: "Doe",
      email: "john@productcatalog.net",
      contact_number: "+00000",
      role: "CUSTOMER",
      updated_at: "2022-01-11",
    },
  ];

  export default {
    name: "Users",

    components: {
      CreateUser,
    //   UpdateEmployee,
    },

    data() {
      return {
        loading: false,
        createBtnDisabled: true,
        createUserVisible: false,
        updateUserVisible: false,
        actionButton: "action",
        actionLoading: false,
        allUsers,
        user: null,
        searchText: "",
        searchInput: null,
        searchedColumn: "",
        columns: [
          {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "first_name",
            },

            onFilter: (value, record) =>
              record.first_name
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },

          {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "last_name",
            },

            onFilter: (value, record) =>
              record.last_name
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },

          {
            title: "Contact Number",
            dataIndex: "contact_number",
            key: "contact_number",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "contact_number",
            },

            onFilter: (value, record) =>
              record.contact_number
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },

          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "role",
            },

            onFilter: (value, record) =>
              record.role
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },

          {
            title: "Updated at",
            dataIndex: "updated_at",
            key: "updated_at",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "updated_at",
            },
            onFilter: (value, record) =>
              record.updated_at
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },

          {
            title: "Action",
            dataIndex: "",
            key: "x",
            scopedSlots: {
              customRender: "action"
            },
          },
        ],
      };
    },

    methods: {
    //   ...mapActions(["fetchAllEmployees", "refreshEmployeeDescription"]),

      openCreateUser(){
        this.createUserVisible = true
        // console.log("Create employee")
      },

      hideCreateUser(){
        this.createUserVisible = false
      },

      openUpdateUser(user){
        this.user = {...user}
        this.updateUserVisible = true
        // console.log("Create employee")
      },

      hideUpdateUsers(){
        this.updateUserVisible = false
      },

      async openUserDescription(user){
        console.log(user)
        this.actionLoading = true
        // await this.refreshUserDescription(user).then((response) => {
        //   if(response["status"] === "success"){
        //     this.$router.push({ name: "User Description" })
        //   }

        //   else if(response["status"] === "error"){
        //     this.$message.error(response["message"])
        //   }
        // })
        this.actionLoading = false
      },

      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },

      handleReset(clearFilters) {
        clearFilters();
        this.searchText = "";
      },
    },

    async created(){
    //   this.loading = true
    //   await this.fetchAllEmployees(this.getActiveUser["company"])
    //   this.allEmployees = this.getAllEmployees
    //   this.loading = false
    },

    // mounted(){
    //   if(this.getActiveUser["role"]["role_name"] === "Manager"){
    //     this.createBtnDisabled = false
    //   }

    //   else{
    //     this.createBtnDisabled = true
    //   }
    // },

    // computed: mapGetters(["getAllEmployees", "getAllCompanies", "getAllDepartments", "getActiveUser"])
  }
</script>

<style scoped>
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
</style>
