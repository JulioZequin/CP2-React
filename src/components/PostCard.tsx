import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../types/post';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>#{post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body} numberOfLines={2}>{post.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  id: { color: '#e94560', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 15, textTransform: 'capitalize', marginBottom: 6 },
  body: { color: '#888', fontSize: 13, lineHeight: 18 },
});
