export default class ThemeModel {
  constructor(token) {
    this.token = token;
    this.baseUrl = "http://localhost:3000/api/themes";
  }

  async getThemes() {
    const res = await fetch(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch themes");
    }

    const data = await res.json();
    return data.themes;
  }

  async createTheme(data) {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Theme creation failed");
    }

    return result.theme;
  }

  async deleteTheme(id) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to delete theme");
    }
  }
}
