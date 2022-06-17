<template>
  <form class="row" action="">
    <div class="col-4">
      <label for="">Attach a Photo</label>
      <input class="form-control" type="text" v-model="houseData.imgUrl" />
    </div>
    <div class="col-4">
      <label for="">Bedrooms</label>
      <input class="form-control" type="number" v-model="houseData.bedrooms" />
    </div>
    <div class="col-4">
      <label for="">Bathrooms</label>
      <input class="form-control" type="number" v-model="houseData.bathrooms" />
    </div>
    <div class="col-4">
      <label for="">Levels</label>
      <input class="form-control" type="number" v-model="houseData.levels" />
    </div>
    <div class="col-4">
      <label for="">Year</label>
      <input class="form-control" type="number" v-model="houseData.year" />
    </div>
    <div class="col-4">
      <label for="">Price</label>
      <input class="form-control" type="number" v-model="houseData.price" />
    </div>
    <div class="col-12">
      <label for="">Description</label>
      <textarea
        class="form-control mb-2"
        type="text"
        name=""
        id=""
        cols="30"
        rows="5"
        v-model="houseData.description"
      ></textarea>
    </div>
    <div class="col-6">
      <button
        v-if="houseData.id"
        type="button"
        class="btn btn-primary"
        @click="editHouse"
      >
        Edit house
      </button>
      <button v-else type="button" class="btn btn-success" @click="createHouse">
        Create listing
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import { housesService } from "../services/HousesService";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: { editHouse: { type: Object, required: false, default: {} } },
  setup(props) {
    const houseData = ref({});
    watchEffect(() => {
      logger.log(props.editHouse);
      houseData.value = props.editHouse;
    });
    return {
      houseData,
      async createHouse() {
        try {
          await housesService.createHouse(houseData.value);
          houseData.value = {};
          Modal.getOrCreateInstance(
            document.getElementById("house-form")
          ).hide();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async editHouse() {
        try {
          await housesService.editHouse(houseData.value);
          Modal.getOrCreateInstance(
            document.getElementById("edit-house" + houseData.value.id)
          ).hide();
          Pop.toast("edited car", "success");
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>