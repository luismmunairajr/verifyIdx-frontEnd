export async function getUserInfo(accessToken) {
    try {
      const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar informações do usuário");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      return null;
    }
  }
  