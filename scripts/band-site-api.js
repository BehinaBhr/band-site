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
      //   const sortedComments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

// "api_key":"496b1df2-b95b-4686-b99a-bdd3bba2a765"}
