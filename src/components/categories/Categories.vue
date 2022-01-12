<template>
  <div>
    <!-- <CreateEmployee @handleHide="hideCreateEmployee" :createEmployeeVisible="createEmployeeVisible" />
    <UpdateEmployee :employee="employee" @handleHide="hideUpdateEmployee" :updateEmployeeVisible="updateEmployeeVisible" /> -->

    <div class="loading-spinner" v-if="loading">
      <a-spin />
    </div>

    <div v-if="!loading">
        <a-row :style="{ display: 'flex' }">
            <a-col :span="12" :style="{ border: '', padding: '12px' }">
                <h1 :style="{ margin: '', fontSize: '24px' }">Categories</h1>
            </a-col>

            <a-col :span="12" :style="{ border: '', padding: '12px', margin:'', display: 'flex' }">
                <a-button @click.prevent="openCreateCategory" type="primary" icon="plus" :style="{ margin: 'auto 0 auto auto', border: '' }">
                    Create Category
                </a-button>
            </a-col>
        </a-row>

      <div :style="{ margin: '12px 12px 0' }">
          <a-table
          :data-source="allCategories"
          :columns="columns"
          >
            <span slot="category_name" slot-scope="category_name" :style="{ fontSize: '12px' }">
                {{ category_name }}
            </span>

            <span slot="updated_at" slot-scope="updated_at" :style="{ fontSize: '12px' }">
                {{ updated_at }}
            </span>

            <span slot="created_at" slot-scope="created_at" :style="{ fontSize: '12px' }">
                {{ created_at }}
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
                        <span @click.prevent="openUpdateCategory(record)">
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
//   import CreateEmployee from "../../data_entry/create/CreateEmployee"
//   import UpdateEmployee from "../../data_entry/update/UpdateEmployee"

  const allCategories = [
    {
      key: "1",
      category_name: "Mouse",
      updated_at: "2022-01-11",
      created_at: "2022-01-11",
    },

    {
      key: "2",
      category_name: "Mouse",
      updated_at: "2022-01-11",
      created_at: "2022-01-11",
    },

    {
      key: "3",
      category_name: "Mouse",
      updated_at: "2022-01-11",
      created_at: "2022-01-11",
    },
  ];

  export default {
    name: "Categories",

    components: {
    //   CreateEmployee,
    //   UpdateEmployee,
    },

    data() {
      return {
        loading: false,
        createBtnDisabled: true,
        createCategoryVisible: false,
        updateCategoryVisible: false,
        actionButton: "action",
        actionLoading: false,
        allCategories,
        category: null,
        searchText: "",
        searchInput: null,
        searchedColumn: "",
        columns: [
          {
            title: "Category Name",
            dataIndex: "category_name",
            key: "category_name",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "category_name",
            },

            onFilter: (value, record) =>
              record.category_name
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
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "created_at",
            },
            onFilter: (value, record) =>
              record.created_at
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

      openCreateCategory(){
        this.createCategoryVisible = true
        // console.log("Create employee")
      },

      hideCreateCategory(){
        this.createCategoryVisible = false
      },

      openUpdateCategory(category){
        this.category = {...category}
        this.updateCategoryVisible = true
        // console.log("Create employee")
      },

      hideUpdateCategory(){
        this.updateCategoryVisible = false
      },

      async openCategoryDescription(category){
        console.log(category)
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
