import WPAPI from 'wpapi'

let endpoint = 'https://www.wired.com/wp-json'
if (typeof window !== 'undefined') {
  endpoint = `https://cors-anywhere.herokuapp.com/${endpoint}`
}

const api = new WPAPI({ endpoint })
export default api
