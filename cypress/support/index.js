Cypress.on('uncaught:exception', (err, runnable) => {
    // Se o erro específico for encontrado, ignore-o
    if (err.message.includes("Cannot convert undefined or null to object")) {
      return false;
    }
    // Para outros erros, o Cypress pode continuar falhando
  });