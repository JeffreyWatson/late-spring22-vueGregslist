<template>
  <div class="container-fluid">
    <div class="row g-3 my-2">
      <House v-for="h in houses" :key="h.id" :house="h" />
    </div>
  </div>
  <Modal id="house-form">
    <template #header>List your Home</template>
    <template #body><HouseForm /></template>
  </Modal>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    onMounted(async () => {
      try {
        await housesService.getHouses();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      houses: computed(() => AppState.houses),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
