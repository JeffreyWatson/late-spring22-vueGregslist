import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    logger.log('-getHouses-', res.data)
    AppState.houses = res.data
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    logger.log('-createHouse-', res.data)
    AppState.houses.push(res.data)
  }

  async deleteHouse(id) {
    const res = await api.delete('api/houses/' + id)
    logger.log('-deleteHouse-', res.data)
    AppState.cars = AppState.cars.filter(h => h.id != id)
  }

  async editHouse(houseData) {
    const res = await api.put('api/houses/' + houseData.id, houseData)
    logger.log('-editCar-', res.data)
  }
}

export const housesService = new HousesService()