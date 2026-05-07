import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUsers } from '../hooks/useUsers';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
};

export default function UsersScreen({ navigation }: Props) {
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error?.message ?? 'Erro ao carregar usuários.'} onRetry={refetch} />;
  if (!users?.length) return <EmptyState message="Nenhum usuário encontrado." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  list: { paddingVertical: 12 },
});
