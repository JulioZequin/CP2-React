import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types/user';

interface Props {
  user: User;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.company}>🏢 {user.company.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#e94560',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  info: { flex: 1 },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  email: { color: '#aaa', fontSize: 13, marginTop: 2 },
  company: { color: '#e94560', fontSize: 12, marginTop: 4 },
});
