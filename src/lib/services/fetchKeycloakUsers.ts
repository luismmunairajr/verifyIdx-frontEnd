export async function fetchKeycloakUsers() {
    const response = await fetch("/api/keycloak/users");
  
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
  
    return response.json();
  }
  