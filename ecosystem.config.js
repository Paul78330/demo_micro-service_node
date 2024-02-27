module.exports = {
  apps : [{
    name: "service-auth",
    script: "./service-auth/server.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  },{
    name: "service-albums",
    script: "./service-albums/index.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  },{
    name: "service-comments",
    script: "./service-comments/index.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  },{
    name: "service-templates",
    script: "./service-templates/index.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  }]
}