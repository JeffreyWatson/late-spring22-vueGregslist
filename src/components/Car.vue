<template>
  <div class="col-md-3">
    <div class="bg-white elevation-2 rounded position-relative">
      <!-- NOTE data binding IN the tag you use ':' -->
      <img :src="car.imgUrl" class="img-fluid" alt="" />
      <div class="p-2">
        <!-- NOTE data binding IN-BETWEEN the tags you use '{{}}' -->
        <p class="text-center">
          {{ car.make }} | {{ car.model }} | {{ car.year }}
        </p>
        <p>{{ car.description }}</p>
        <b>${{ car.price }}</b>
        <p class="mb-0">
          <!-- NOTE sometimes the elvis operator is handy for digging deeper into objects that aren't here yet -->
          <b class="text-info">{{ car.creator?.name }}</b>
        </p>
        <p class="mb-0">{{ formatDate(car.createdAt) }}</p>
      </div>
      <button
        v-show="car.creatorId == account.id"
        class="delete-button btn selectable"
        @click="deleteCar"
      >
        <i class="mdi mdi-delete-forever"></i>
      </button>
      <!-- NOTE rendering a modal per car, means we have to have unique id's per modal -->
      <Modal v-if="car.creatorId == account.id" :id="'edit-car' + car.id">
        <template #header>Edit {{ car.make }} {{ car.model }}</template>
        <template #body> <CarForm :editCar="car" /></template>
        <template #button>
          <button
            type="button"
            class="btn btn-warning edit-button position-absolute"
            data-bs-toggle="modal"
            :data-bs-target="'#edit-car' + car.id"
          >
            <i class="mdi mdi-pencil"></i>
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { carsService } from "../services/CarsService";
export default {
  props: { car: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteCar() {
        try {
          // NOTE to access props in setup, the setup has to take props in
          await carsService.deleteCar(props.car.id);
          Pop.toast("car deleted", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
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
  color: var(--bs-dark);
  border: 0;
}
</style>
