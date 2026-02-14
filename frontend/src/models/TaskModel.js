import api from "../api/axios";

export default class TaskModel {

  constructor() {
    this.api = api;
  }

  async getTasks() {
    const res = await this.api.get("/tasks");
    return res.data.tasks;
  }

  async createTask(data) {
    const res = await this.api.post("/tasks", data);
    return res.data.task;
  }

  async deleteTask(id) {
    await this.api.delete(`/tasks/${id}`);
  }

  async updateTask(id, data) {
    await this.api.patch(`/tasks/${id}`, data);
  }
}
