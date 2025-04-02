export async function getUserOrganizations(accessToken) {
    try {
      const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/admin/realms/${process.env.KEYCLOAK_REALM}/organizations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!response.ok) {
        console.error("Erro ao buscar organizações:", response.statusText);
        return [];
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar organizações:", error);
      return [];
    }
  }
  