const schema = fetch("http://localhost:7340/api/v1/schema").then((response) => response.json());

export default await schema