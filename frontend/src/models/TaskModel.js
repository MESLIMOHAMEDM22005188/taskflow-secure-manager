import api from "../api/axios";

export default class TaskModel {

  async getTasks() {
    const res = await api.get("/tasks");
    return res.data.tasks;
  }

  async createTask(data) {
    const res = await api.post("/tasks", data);
    return res.data.task;
  }

  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  }

  async updateTask(id, data) {
    await api.patch(`/tasks/${id}`, data);
  }

}
