const remoteURL = "http://localhost:5002"
//json-server -p 5002 -w database.json  

export default {

    getHerd(id) {
      return fetch(`${remoteURL}/herd/${id}`).then(result => result.json())
  },
    post(newHerd) {
      return fetch(`${remoteURL}/herd`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newHerd)
      }).then(data => data.json())
  },
    getHerdOptions() {
      return fetch(`${remoteURL}/herd/`).then(result => result.json())
    },
  }