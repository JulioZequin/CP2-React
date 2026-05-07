import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const MENU_ITEMS: { label: string; screen: keyof RootStackParamList; description: string }[] = [
  { label: '📡 Fetch API', screen: 'UsersFetch', description: 'Buscar usuários com fetch nativo' },
  { label: '👥 Usuários (Axios)', screen: 'Users', description: 'Service Layer + TanStack Query' },
  { label: '📝 Posts', screen: 'Posts', description: 'Listar os primeiros 20 posts' },
  { label: '✏️ Criar Post', screen: 'CreatePost', description: 'POST com validação e loading' },
  { label: '❌ Teste de Erro', screen: 'ErrorTest', description: 'Rota inexistente + retry' },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Checkpoint 2</Text>
      <Text style={styles.subtitle}>React Native · API · TypeScript</Text>

      {MENU_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.card}
          onPress={() => navigation.navigate(item.screen as never)}
          activeOpacity={0.8}
        >
          <Text style={styles.cardLabel}>{item.label}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  content: { padding: 20 },
  title: { color: '#e94560', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
  subtitle: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 32 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  cardLabel: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cardDescription: { color: '#888', fontSize: 13, marginTop: 4 },
});
