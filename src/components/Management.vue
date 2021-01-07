<template>
  <div>
    <div style="width: 85%; float: right">
      <b-card class="col-lg-9 offset-lg-1 mt-5">
        <div class="col-sm-12 mb-5">
          <router-link to="/collection"
            ><i class="fas fa-angle-left"></i> Back</router-link
          >
        </div>
        <div class="form-group row pb-5">
          <div class="col-sm-3 offset-md-4">
            <input
              placeholder="Email"
              type="email"
              class="form-control"
              v-model="newUserEmail"
            />
          </div>
          <button
            type="button"
            style="height: 2rem; line-height: 1.2rem"
            @click="addUser"
            class="btn btn-dark"
          >
            Add user
          </button>
        </div>
        <b-table
          no-sort-reset
          :items="getShopUsers"
          :fields="fields"
          :filter="filter"
          sticky-header
        >
          <template v-slot:cell(role)="data">
            <select
              @change="changeUserRole(data.item.id, data.item.role)"
              v-model="data.item.role"
            >
              <option value="admin">Admin</option>
              <option value="regular">Regular</option>
            </select>
          </template>
          <template v-slot:cell(remove)="data">
            <div @click="removeUser(data.item.id)" style="cursor: pointer">
              <i class="fas fa-trash"></i>
            </div>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      newUserEmail: null,
      fields: [
        {
          key: "name",
        },
        {
          key: "email",
        },
        {
          key: "role",
        },
        {
          key: "remove",
          label: "",
        },
      ],
      getShopUsers: null,
      filter: null,
    };
  },

  methods: {
    addUser() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation addUserToShop($email: String!, $role: UserRole!) {
            addUserToShop(email: $email, role: $role)
          }
        `,
        variables: {
          email: this.newUserEmail,
          role: "regular",
        },
        fetchPolicy: "no-cache",
      });
    },

    changeUserRole(userId, role) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation changeUserRole($userId: String!, $role: UserRole!) {
            changeUserRole(userId: $userId, role: $role)
          }
        `,
        variables: {
          userId,
          role,
        },
        fetchPolicy: "no-cache",
      });
    },

    removeUser(userId) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation removeUser($userId: String!) {
            removeUser(userId: $userId)
          }
        `,
        variables: {
          userId,
        },
        fetchPolicy: "no-cache",
      });
    },
  },

  apollo: {
    getShopUsers: {
      query: gql`
        query getShopUsers {
          getShopUsers {
            id
            name
            email
            role
          }
        }
      `,
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: 800;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #b1b1b1;
}

.form-group {
  margin-bottom: 0 !important;
}
</style>
