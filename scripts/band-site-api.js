class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
  }
  async getComments() {
    try {
      console.log(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
      const response = await axios.get(
        `${this.baseUrl}/comments?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }
  async postComment(comment) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/comments?api_key=${this.apiKey}`,
        comment
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getShows(comment) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/showdates?api_key=${this.apiKey}`,
        comment
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching shows:", error);
    }
  }

  // Diving deaper
  async likeComment(commentId) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/comments/${commentId}/like?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.log("Error liking comment:", error);
    }
  }

  async deleteComment(commentId) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/comments/${commentId}?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }
}
