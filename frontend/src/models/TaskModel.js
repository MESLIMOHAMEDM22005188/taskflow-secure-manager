import api from "../api/axios";

export default class TaskModel {
  async getTasks() {
    const res = await api.get("/tasks");
    return res.data.tasks;
  }

  async createTask(title) {
    await api.post("/tasks", { title });
  }
  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
}
async updateTask(id, data) {
    await api.patch(`/tasks/${id}`, data);
}

}
