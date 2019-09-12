const remoteURL = "http://localhost:5002"
//json-server -p 5002 -w database.json  

export default {
    getAll() {
        return fetch(`${remoteURL}/user`).then(result => result.json())
    },
    get(id) {
        return fetch(`${remoteURL}/user/${id}`).then(result => result.json())
      },
    post(newUser) {
        return fetch(`${remoteURL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    },
    update(editedUser) {
        return fetch(`${remoteURL}/user/${editedUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedUser)
        }).then(data => data.json());
    }
}