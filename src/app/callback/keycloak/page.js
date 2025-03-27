'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const KeycloakCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Obtém o código de autorização

    if (code) {
      // Trocar o código pelo token
      fetchToken(code)
        .then((token) => {
          // Armazenar o token em um cookie ou em algum lugar seguro
          document.cookie = `keycloak-token=${token}; path=/`;
          router.push('/dashboard'); // Redireciona para a página principal
        })
        .catch((err) => {
          console.error('Erro ao trocar o código por token:', err);
        });
    }
  }, [router]);

  // Função para obter o token de acesso usando o código de autorização
  const fetchToken = async (code) => {
    const response = await fetch('http://localhost:8080/realms/myrealm/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'frontend', // Seu clientId
        client_secret: 'CLIENT_SECRET', // Seu client secret
        code: code,
        redirect_uri: 'http://localhost:3000/callback/keycloak',
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    return data.access_token; // Retorna o token de acesso
  };

  return <div>Carregando...</div>;
};

export default KeycloakCallback;
