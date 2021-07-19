import axios from "axios"
import Constant from "../../material/constant"
import { getTokenData } from "../account_process"

export async function getStatusDataOrder(position){
    var response = []
    var token = await getTokenData()
    await axios.get(Constant.requestStatusOrder + position, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            response = resource.data
        })
        .catch(err => {
            response = err
        })

        return response
}