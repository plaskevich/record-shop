<template>
  <div>
    <sidebar-menu
      hideToggle
      @item-click="onItemClick"
      style="width: 15%"
      :menu="menu"
    />
  </div>
</template>

<script>
import store from "../store";
import { clientLogout } from "../auth";

export default {
  data() {
    return {
      user: {
        name: "Alex",
      },

      menu: [
        {
          header: true,
          title: "Record Shop",
        },
        {
          href: "/collection",
          title: "All Collection",
          icon: "fa fa-stream",
        },
        {
          href: "/collection/inStock",
          title: "In Stock",
          icon: "fas fa-store",
        },
        {
          href: "/collection/sold",
          title: "Sold",
          icon: "fas fa-wallet",
        },
        // {
        //   href: "/statistics",
        //   title: "Statistics",
        //   icon: "fas fa-chart-pie",
        // },
        {
          href: "/management",
          title: "Management",
          icon: "fas fa-users-cog",
        },
        // {
        //   href: '/settings',
        //   title: 'Settings',
        //   icon: 'fas fa-cogs',
        // },
        {
          title: "Logout",
          icon: "fas fa-sign-out-alt",
        },
      ],
    };
  },

  watch: {
    authenticated() {
      if (!this.authenticated) {
        this.$router.push({ name: "login" });
      }
    },
  },

  methods: {
    onItemClick(event, item) {
      if (item.title === "Logout") {
        clientLogout();
      }
    },
  },

  computed: {
    authenticated() {
      return store.state.authenticated;
    },
  },
};
</script>
