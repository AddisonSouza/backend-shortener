<p align="center">
  <img src="https://img.icons8.com/fluency/96/link.png" width="100" alt="URL Shortener Logo"/>
</p>

<h1 align="center">🔗 Backend URL Shortener</h1>

<p align="center">
  <strong>Um encurtador de URLs de alta performance construído para escalar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Cassandra-1287B1?style=for-the-badge&logo=apache-cassandra&logoColor=white" alt="Cassandra"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-blue?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/license-UNLICENSED-red?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square" alt="Node"/>
</p>

---

## 📋 Índice

- [🎯 O que é este projeto?](#-o-que-é-este-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Como Rodar](#-como-rodar)
- [📡 API Endpoints](#-api-endpoints)
- [🧗 Desafios & Soluções](#-desafios--soluções)

---

## 🎯 O que é este projeto?

Este é um **serviço de encurtamento de URLs** robusto e escalável que transforma URLs longas em links curtos e memoráveis. Projetado com foco em **alta performance** e **escalabilidade horizontal**, utilizando as melhores práticas de arquitetura de microsserviços.

```
https://www.exemplo.com/pagina/muito/longa/com/parametros?id=123&ref=456
                              ↓
                    http://localhost:3000/a1B2c3
```

### 💡 Por que usar?

- **🚀 Performance**: Cache Redis para respostas em milissegundos
- **📈 Escalável**: Cassandra como banco distribuído, pronto para milhões de URLs
- **🔒 Seguro**: Proteção por API Key nos endpoints de criação
- **🐳 Containerizado**: Deploy com um único comando usando Docker

---

## ✨ Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🔗 **Encurtamento** | Gera códigos únicos de 6+ caracteres usando Base62 |
| ⚡ **Redirecionamento Rápido** | Cache Redis com TTL de 24h para máxima velocidade |
| 🔐 **API Key Guard** | Proteção contra uso não autorizado |
| 🌐 **CORS Configurável** | Suporte completo para diferentes origens |
| 📊 **IDs Sequenciais** | Redis garante unicidade com `INCR` atômico |
| 🐳 **Docker Ready** | Infraestrutura completa com docker-compose |

---

## 🛠️ Tecnologias Utilizadas

### Core
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **NestJS** | v11 | Framework backend modular e escalável |
| **TypeScript** | v5.7 | Tipagem estática e melhor DX |
| **Node.js** | ≥18 | Runtime JavaScript |

### Banco de Dados & Cache
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Apache Cassandra** | v5 | Banco NoSQL distribuído para armazenamento persistente |
| **Redis** | v7 | Cache em memória + geração de IDs atômicos |

### Bibliotecas
| Biblioteca | Propósito |
|------------|-----------|
| **Hashids** | Encoding de IDs em strings Base62 únicas |
| **ioredis** | Cliente Redis de alta performance |
| **cassandra-driver** | Driver oficial do Cassandra para Node.js |
| **class-validator** | Validação de DTOs |

### DevOps
| Ferramenta | Propósito |
|------------|-----------|
| **Docker** | Containerização da aplicação |
| **Docker Compose** | Orquestração de múltiplos containers |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                           │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🛡️ API KEY GUARD                             │
│              (Protege endpoints de criação)                     │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   📦 SHORTENER CONTROLLER                       │
│         POST / → Criar URL    |    GET /:code → Redirect        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ⚙️ SHORTENER SERVICE                          │
│    • Gera short codes com Hashids (Base62)                      │
│    • Gerencia cache Redis                                       │
│    • Orquestra persistência                                     │
└─────────────────────────────────────────────────────────────────┘
                    │                         │
                    ▼                         ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│      🗃️ CASSANDRA         │    │      ⚡ REDIS              │
│  • Persistência de URLs  │    │  • Cache (TTL 24h)       │
│  • Alta disponibilidade  │    │  • ID Sequencial (INCR)  │
│  • Escalabilidade        │    │  • Respostas rápidas     │
└──────────────────────────┘    └──────────────────────────┘
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### 🐳 Método Rápido (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd backend-shortener

# Suba toda a stack com Docker
docker-compose up -d

# A aplicação estará disponível em:
# http://localhost:3000
```

> ⏳ **Nota**: O Cassandra pode levar ~60 segundos para inicializar completamente.

### 💻 Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp local.env.example .env

# Suba apenas os serviços de infraestrutura
docker-compose up -d cassandra redis cassandra-init

# Rode a aplicação em modo desenvolvimento
npm run start:dev
```

### 📝 Variáveis de Ambiente

| Variável | Descrição | Default |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `CASSANDRA_ADRESS` | Host do Cassandra | `localhost` |
| `CASSANDRA_KEYSPACE` | Keyspace do Cassandra | `shortener` |
| `REDIS_HOST` | Host do Redis | `localhost` |
| `REDIS_PORT` | Porta do Redis | `6379` |
| `SALT_BASE_62` | Salt para geração de hashes | `defaultsalt` |
| `API_KEY` | Chave de API para proteção | `calamiao` |

---

## 📡 API Endpoints

### Criar URL Curta

```http
POST /
Content-Type: application/json
x-api-key: sua-api-key

{
  "originalUrl": "https://www.exemplo.com/url-muito-longa"
}
```

**Resposta (201 Created):**
```json
{
  "success": true,
  "data": "http://localhost:3000/a1B2c3",
  "message": "Short URL created successfully"
}
```

### Acessar URL Original

```http
GET /:shortCode
```

**Resposta:** Redirecionamento 302 para a URL original

---

## 🧗 Desafios & Soluções

### 1. 🔢 Geração de IDs Únicos em Sistema Distribuído

**Desafio:** Garantir IDs únicos sem colisões em um ambiente que pode escalar horizontalmente.

**Solução:** Utilizamos o comando `INCR` do Redis, que é **atômico** e garante sequencialidade mesmo com múltiplas instâncias da aplicação. O ID numérico é então convertido para Base62 usando Hashids.

```typescript
private async generateShortCode(): Promise<string> {
  const id = await this.redisService.incr(KEY_SHORTENER_REDIS);
  return this.hashids.encode(id);
}
```

---

### 2. ⚡ Performance em Leituras de Alta Frequência

**Desafio:** URLs curtas são acessadas muito mais vezes do que são criadas (proporção ~100:1). Como otimizar?

**Solução:** Implementamos uma estratégia de **cache-aside** com Redis:
- ✅ Cache hit → Resposta em ~1ms
- ❌ Cache miss → Busca no Cassandra + popula cache (TTL 24h)

```typescript
async getOriginalUrl(shortCode: string): Promise<string | null> {
  const cachedUrl = await this.redisService.get(REDIS_KEY_PREFIX + shortCode);
  if (cachedUrl) return cachedUrl; // Cache HIT! 🚀
  
  const originalUrl = await this.repository.getOriginalUrl(shortCode);
  this.redisService.set(REDIS_KEY_PREFIX + shortCode, originalUrl, REDIS_EXPIRATION_TIME);
  return originalUrl;
}
```

---

### 3. 🔒 Proteção Contra Uso Indevido

**Desafio:** Evitar que qualquer pessoa crie URLs curtas sem autorização, prevenindo spam e abuso.

**Solução:** Implementamos um Guard customizado do NestJS que valida a presença e validade de uma API Key no header `x-api-key` antes de permitir a criação de novas URLs.

---

### 4. 🐳 Orquestração de Serviços com Dependências

**Desafio:** Cassandra demora para inicializar e a aplicação falhava ao tentar conectar antes do banco estar pronto.

**Solução:** Utilizamos **healthchecks** e **depends_on com conditions** no Docker Compose:

```yaml
app:
  depends_on:
    cassandra:
      condition: service_healthy
    redis:
      condition: service_healthy
```

---

### 5. 🌐 CORS para Múltiplas Origens

**Desafio:** Suportar diferentes ambientes de frontend (dev, staging, prod) com origens variadas.

**Solução:** CORS totalmente configurável via variáveis de ambiente, permitindo múltiplas origens separadas por vírgula.

---

## 📜 Scripts Disponíveis

```bash
npm run start          # Inicia em produção
npm run start:dev      # Inicia em modo watch (desenvolvimento)
npm run start:debug    # Inicia com debugger
npm run build          # Compila o projeto
npm run lint           # Executa ESLint
npm run test           # Executa testes unitários
npm run test:e2e       # Executa testes e2e
npm run test:cov       # Gera relatório de cobertura
```

---

<p align="center">
  <sub>Feito com ❤️ usando NestJS, Cassandra e Redis</sub>
</p>
