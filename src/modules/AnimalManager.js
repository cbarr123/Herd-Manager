const remoteURL = "http://localhost:5002"
//json-server -p 5002 -w database.json  

export default {
    getAll() {
        return fetch(`${remoteURL}/animals`).then(result => result.json())
    },
    get(id) {
        return fetch(`${remoteURL}/animals/${id}`).then(result => result.json())
    },
    update(editedAnimal) {
        return fetch(`${remoteURL}/animals/${editedAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAnimal)
        }).then(data => data.json());
    }

}

