<template>
  <div class="col-md-3">
    <div class="bg-white elevation-2 rounded position-relative">
      <img :src="house.imgUrl" class="img-fluid" alt="" />
      <div class="p-2">
        <p class="text-center">
          Rooms: {{ house.bedrooms }}| Bathrooms: {{ house.bathrooms }}
        </p>
        <p class="text-center">Levels: {{ house.levels }}</p>
        <p class="d-flex justify-content-between">
          <b>Year: {{ house.year }}</b>
          <b>Price: ${{ house.price }}</b>
        </p>
        <p>{{ house.description }}</p>
        <p class="mb-0">
          <b class="text-success">{{ house.Creator?.name }}</b>
        </p>
        <p class="mb-0">{{ formatDate(house.createdAt) }}</p>
        <button
          v-show="house.creatorId == account.id"
          @click="deleteHouse"
          class="delete-button btn selectable"
        >
          <i class="mdi mdi-delete"></i>
        </button>
        <modal
          v-if="house.creatorId == account.id"
          :id="'edit-house' + house.id"
        >
          <template #header>Edit your home</template>
          <template #body><HouseForm :editHouse="house" /></template>
          <template #button>
            <button
              type="button"
              class="btn btn-warning edit-button position-absolute"
              data-bs-toggle="modal"
              :data-bs-target="'#edit-house' + house.id"
            >
              <i class="mdi mdi-pencil"></i>
            </button>
          </template>
        </modal>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { housesService } from "../services/HousesService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: { house: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteHouse() {
        try {
          await housesService.deleteHouse(props.house.id);
          Pop.toast("Listing deleted", "success");
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      formatDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.delete-button {
  position: absolute;
  top: 0.25em;
  right: 0.25em;
  width: 40px;
  height: 40px;
  border-radius: 50em;
  background: var(--bs-dark);
  color: var(--bs-light);
  border: 0;
}

.edit-button {
  position: absolute;
  top: 0.25em;
  left: 0.25em;
  width: 40px;
  height: 40px;
  border-radius: 50em;
  background: var(--bs-success);
  color: var(--bs-light);
  border: 0;
}
</style>