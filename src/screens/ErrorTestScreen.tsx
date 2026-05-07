import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../services/api';

type Status = 'idle' | 'loading' | 'error' | 'empty';

export default function ErrorTestScreen() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerError = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await api.get('/rota-inexistente');
      if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
        setStatus('empty');
      } else {
        setStatus('idle');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido.';
      setErrorMessage(`Erro HTTP capturado: ${message}`);
      setStatus('error');
    }
  }, []);

  return (
    <View style={styles.container}>
      {status === 'loading' && <ActivityIndicator size="large" color="#e94560" />}

      {status === 'idle' && (
        <Text style={styles.hint}>Pressione o botão para disparar um erro HTTP.</Text>
      )}

      {status === 'error' && (
        <>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </>
      )}

      {status === 'empty' && (
        <Text style={styles.hint}>Nenhum dado retornado.</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={triggerError}
        disabled={status === 'loading'}
      >
        <Text style={styles.buttonText}>
          {status === 'loading' ? 'Carregando...' : '🔥 Disparar Erro HTTP'}
        </Text>
      </TouchableOpacity>

      {status === 'error' && (
        <TouchableOpacity style={[styles.button, styles.retryButton]} onPress={triggerError}>
          <Text style={styles.buttonText}>🔄 Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0e17', justifyContent: 'center', alignItems: 'center', padding: 24 },
  hint: { color: '#888', fontSize: 15, textAlign: 'center', marginBottom: 24 },
  errorIcon: { fontSize: 48, marginBottom: 12 },
  errorText: { color: '#e94560', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  button: {
    backgroundColor: '#e94560', borderRadius: 10, paddingVertical: 14,
    paddingHorizontal: 28, marginTop: 12,
  },
  retryButton: { backgroundColor: '#333' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
