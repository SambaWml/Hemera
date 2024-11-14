module.exports = {
  projectId: 'cgcokq',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};

// cypress.config.js ou cypress.config.ts
module.exports = {
  projectId: 'w5u8bs',
  e2e: {
    baseUrl: 'http://localhost:3000', // ou a URL da sua aplicação
    viewportWidth: 1920,  // Definir a largura do viewport para 1920px
    viewportHeight: 1080, // Definir a altura do viewport para 1080px
  },
};
