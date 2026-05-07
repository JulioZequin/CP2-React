import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useUser } from '../hooks/useUsers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserDetails'>;
  route: RouteProp<RootStackParamList, 'UserDetails'>;
};

export default function UserDetailsScreen({ navigation, route }: Props) {
  const { userId } = route.params;
  const { data: user, isLoading, isError, error, refetch } = useUser(userId);

  if (isLoading) return <Loading />;
  if (isError || !user) return <ErrorMessage message={error?.message ?? 'Usuário não encontrado.'} onRetry={refetch} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name[0]}</Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>

      <View style={styles.section}>
        {[
          { icon: '✉️', label: 'Email', value: user.email },
          { icon: '📞', label: 'Telefone', value: user.phone },
          { icon: '🌐', label: 'Website', value: user.website },
          { icon: '🏢', label: 'Empresa', value: user.company.name },
        ].map(({ icon, label, value }) => (
          <View key={label} style={styles.row}>
            <Text style={styles.rowIcon}>{icon}</Text>
            <View>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserPosts', { userId: user.id, userName: user.name })}
      >
        <Text style={styles.buttonText}>Ver Posts do Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  content: { alignItems: 'center', padding: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e94560', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 32 },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  username: { color: '#e94560', marginBottom: 24 },
  section: { width: '100%', backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  rowIcon: { fontSize: 20, marginRight: 12 },
  rowLabel: { color: '#888', fontSize: 12 },
  rowValue: { color: '#fff', fontSize: 15 },
  button: { backgroundColor: '#e94560', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 32 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
