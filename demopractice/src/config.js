let backendUrl = "";

if (window.location.hostname === "localhost") {
  // Development
  backendUrl = "http://localhost:2001";
} else {
  // Production (Jenkins/Tomcat)
  backendUrl = "http://localhost:2030/userpractice";
}

const config = {
  url: backendUrl
};

export default config;
