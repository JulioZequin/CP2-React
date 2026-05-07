import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { useCreatePost } from '../hooks/usePosts';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createdId, setCreatedId] = useState<number | null>(null);

  const { mutate: createPost, isPending } = useCreatePost();

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Validação', 'O título é obrigatório.');
      return;
    }
    if (!body.trim()) {
      Alert.alert('Validação', 'O conteúdo é obrigatório.');
      return;
    }

    createPost(
      { userId: 1, title: title.trim(), body: body.trim() },
      {
        onSuccess: (data) => {
          setCreatedId(data.id);
          setTitle('');
          setBody('');
        },
        onError: (err) => {
          Alert.alert('Erro', err.message ?? 'Não foi possível criar o post.');
        },
      }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título..."
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Conteúdo *</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={body}
        onChangeText={setBody}
        placeholder="Digite o conteúdo..."
        placeholderTextColor="#555"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        {isPending
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Criar Post</Text>
        }
      </TouchableOpacity>

      {createdId !== null && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✅ Post criado com ID: #{createdId}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17' },
  content: { padding: 24 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#1a1a2e', color: '#fff', borderRadius: 10,
    padding: 14, fontSize: 15, borderWidth: 1, borderColor: '#2a2a3e',
  },
  textarea: { height: 120 },
  button: {
    backgroundColor: '#e94560', borderRadius: 10, paddingVertical: 16,
    alignItems: 'center', marginTop: 28,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  successBox: {
    marginTop: 20, backgroundColor: '#1a2e1a', borderRadius: 10,
    padding: 16, borderLeftWidth: 4, borderLeftColor: '#4caf50',
  },
  successText: { color: '#4caf50', fontWeight: 'bold', fontSize: 15 },
});
