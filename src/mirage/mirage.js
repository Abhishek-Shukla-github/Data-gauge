import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";
    this.timing = 4000;

    this.get("/emailsCount", () => {
      return {
        count: 89756432,
        delta: "14%",
        progress: 0.4
      };
    });
    
    this.get("/salesCount", () => {
      return {
        count: 431225,
        delta: "21%",
        progress: 0.7
      };
    });

    this.get("/newClientsCount", () => {
      return {
        count: 57,
        delta: "3%",
        progress: 0.5
      };
    });

    this.passthrough("https://api.escuelajs.co/**")
    this.passthrough("https://randomuser.me/**")
  },
});
