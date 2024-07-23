module.exports = {
  apps : [{
    name: "service-comments",
    script: 'nodemon', // Utilisez nodemon pour exécuter le script
    args: './service-auth/server.js', // Le chemin vers votre fichier server.js
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456",
      "PORT": "3005"
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
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456",
      "PORT": "3000"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  },{
    name: "service-auth",
    script: "./service-auth/server.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456",
      "PORT": "3002"
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
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456",
      "PORT": "3003"
    },
    env_production: {
      "NODE_ENV": "production",
      "ACCESS_TOKEN_SECRET": "totoHedenLevi123456"
    }
  }]
}