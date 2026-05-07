# Checkpoint 2 — Consumo de API no React Native

## 🚀 Como rodar

```bash
npm install
npx expo start
```

Abra no Expo Go (Android/iOS) ou emulador.

---

## 📁 Estrutura

```
src/
  services/    # api.ts · userService.ts · postService.ts
  hooks/       # useUsers.ts · usePosts.ts
  screens/     # todas as telas
  components/  # Loading · ErrorMessage · EmptyState · UserCard · PostCard
  navigation/  # AppNavigator · types.ts
  types/       # user.ts · post.ts
```

---

## ✅ Exercícios implementados

| # | Exercício | Tela |
|---|-----------|------|
| 1 | Fetch API | `UsersFetchScreen` |
| 2 | POST | `CreatePostScreen` |
| 3 | Axios + Service Layer + Custom Hooks | `services/` + `hooks/` |
| 4 | Tratamento de erro + retry | `ErrorTestScreen` |
| 5 | Axios Interceptors (header + logs) | `services/api.ts` |
| 6 | Projeto principal + TanStack Query | Todas as telas |

---

## 🔧 Tecnologias

- React Native + Expo
- TypeScript (`strict: true`, sem `any`)
- Axios com Interceptors
- TanStack Query (`useQuery`, `useMutation`, `QueryClientProvider`)
- React Navigation (Native Stack)
- AsyncStorage (configurado via `@react-native-async-storage/async-storage`)

---

## 📡 API

`https://jsonplaceholder.typicode.com`

## 👥 Grupo

> Adicione os nomes dos integrantes aqui.
