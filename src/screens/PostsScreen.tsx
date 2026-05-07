import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function PostsScreen() {
  const { data: posts, isLoading, isError, error, refetch } = usePosts();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error?.message ?? 'Erro ao carregar posts.'} onRetry={refetch} />;
  if (!posts?.length) return <EmptyState message="Nenhum post encontrado." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  list: { paddingVertical: 12 },
});
