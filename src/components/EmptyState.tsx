import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message?: string;
}

export default function EmptyState({ message = 'Nenhum item encontrado.' }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0e17' },
  icon: { fontSize: 48, marginBottom: 12 },
  message: { color: '#888', fontSize: 16 },
});
