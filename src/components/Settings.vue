<template>
  <div id="">
    <b-alert
      style="width: 85%"
      class="float-right text-center"
      v-model="showDismissibleAlert"
      variant="success"
      dismissible
    >
      Password changed successfully!
    </b-alert>
    <div style="width: 85%; float:right">
      <div class="form-group row">
        <h4 class="mt-3 offset-lg-1 col">Change password</h4>
      </div>
      <b-card class="col-lg-6 offset-lg-1 mt-3">
        <div class="col-sm-12 mb-3">
          <a href="javascript:history.go(-1)"
            ><i class="fas fa-angle-left"></i> Back</a
          >
        </div>
        <form @submit.prevent="submit" class=" col-md-12 rounded pt-4 pb-2">
          <div class="form-group row">
            <label class="col-sm-5 col-form-label">New password</label>
            <div class="col-sm-7">
              <input
                type="password"
                class="form-control"
                required
                v-model="newPass"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-5 col-form-label">Confirm password</label>
            <div class="col-sm-7">
              <input
                type="password"
                class="form-control"
                required
                v-model="confirmPass"
              />
            </div>
          </div>
          <div class="form-group text-center">
            <small class="text-danger" v-if="this.error">
              {{ error }}
            </small>
          </div>

          <div class="mt-4 text-right">
            <button
              type="submit"
              class="btn btn-dark col-md-3"
              :disabled="isLoading"
              style="margin-right: 10px; height: 44px"
            >
              <span :style="this.dots">Save</span>
              <div v-if="this.isLoading" class="loader loader--style8">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="24px"
                  height="30px"
                  viewBox="0 0 24 30"
                  style="enable-background:new 0 0 50 50;"
                  xml:space="preserve"
                >
                  <rect
                    x="0"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect
                    x="8"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0.15s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect
                    x="16"
                    y="10"
                    width="4"
                    height="10"
                    fill="#333"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="opacity"
                      attributeType="XML"
                      values="0.2; 1; .2"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="height"
                      attributeType="XML"
                      values="10; 20; 10"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      attributeType="XML"
                      values="10; 5; 10"
                      begin="0.3s"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>
              </div>
            </button>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      current: '',
      newPass: '',
      confirmPass: '',
      error: null,
      showDismissibleAlert: false,
      isLoading: false,
      dots: '',
    };
  },

  methods: {
    submit() {},
  },

  validations: {
    newPass: { required },
    confirmPass: { required, sameAsPassword: sameAs('newPass') },
  },
};
</script>
